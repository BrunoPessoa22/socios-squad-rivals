# AI Assistant Coach — implementation plan

**Owner:** Bruno (UX/UI) + Altug (Product/AI) · **Last updated:** 2026-05-13

## 1. Goal

A daily coach that picks the optimal 5-slot squad for each user based on what fan tokens they already hold, what fixtures are coming up, and how those teams are actually performing — grounded entirely in the Fan Token Intel (FTI) MCP.

**Non-goals:**

- ❌ Buy / sell token recommendations (legal + product risk)
- ❌ Generic fantasy advice; everything must be wallet-personalised
- ❌ Replacing the manual Squad Builder — Coach is a one-tap shortcut, not a wall

## 2. Why FTI is the unlock

| Coach needs | FTI tool | Replaces |
|---|---|---|
| User's holdings | `tokenintel_wallet_balance` | Custom wallet adapter |
| Token → club + national-team mapping | `tokenintel_token_metadata`, `tokenintel_token_chains` | Hand-curated graph |
| Upcoming fixtures (7-day window) | `tokenintel_match_calendar`, `tokenintel_sports_profile` | Football-Data.org / FBref scraping |
| Form, lineups, injuries | `tokenintel_sports_profile`, `tokenintel_match_results` | API-Football paid feed |
| "Does this match move price for this token?" | `tokenintel_match_correlation`, `tokenintel_token_sensitivity` | Doesn't exist anywhere else |
| Historical analog ("when X beat Y at home after 3 wins…") | `tokenintel_match_impact_history`, `tokenintel_historical_patterns` | Custom backtest engine |
| Current daily narrative per token | `tokenintel_briefing`, `tokenintel_signal_bundle` | Custom briefing pipeline |
| Live in-match boost adjustments | `tokenintel_live_match_impact` | Custom realtime layer |

Result: data layer is ~zero engineering effort. The Coach is a **thin LLM agent on top of work we've already shipped.**

## 3. UX surfaces in Squad Rivals

Three touch-points in the existing app:

1. **`/coach` (new screen)** — primary feature. Top 5 picks + captain + per-player strategy notes + confidence score.
2. **`/squad` (existing) — "Apply Coach's pick" button** next to the current "Auto-pick" CTA. One tap replaces the lineup. We don't remove the manual builder — Coach is opt-in.
3. **`/matchup` (existing) — Coach confidence banner**. Before kickoff: "Coach rated your lineup 87 / 100." After settlement: "Following Coach would have scored 79 (vs. your 74)." Drives Coach adoption via FOMO.

## 4. Architecture

### Phase 1 — request-time agent (start here)

```
client → coach-api (FastAPI on Railway) → Claude Sonnet 4.6 + FTI MCP → Redis cache → client
```

- New service `coach-api`. ~200 LOC Python.
- Takes `wallet_address` + `matchday_iso_date`.
- Uses Claude API with tool-use, FTI MCP attached as the tool layer.
- Caches result per `(wallet, matchday)`.

### Phase 2 — pre-computed digests (when traffic ≥10 rps)

```
cron (Aguia/EC2) → coach-batch → FTI + Claude → Postgres → coach-api reads cache
```

- Aguia runs nightly Saturday 06:00 UTC for all active wallets.
- coach-api becomes a thin DB read, no LLM call at request time.
- Live invalidation on injury news / lineup leak (subscribe to FTI `match_alerts`).

We do **Phase 1 only for MVP**. Phase 2 is post-launch, when adoption justifies the cost.

## 5. The FTI call sequence (per Coach request)

```python
# 1. What does the user hold?
holdings = fti.wallet_balance(wallet=wallet)
symbols = [h.symbol for h in holdings if h.balance > 0]

# 2. Token → entity mapping (club + national team)
entities = fti.token_metadata(symbols=symbols)
# e.g. $PSG -> {club: "Paris Saint-Germain", nation: null}
#      $BRA -> {club: null, nation: "Brazil"}

# 3. Upcoming matches in the window
fixtures = fti.match_calendar(symbols=symbols, window_days=7)

# 4. For each team playing: pull form + lineups + injuries
team_profiles = [fti.sports_profile(team=f.team, window=10) for f in fixtures]

# 5. Token-specific match impact context
impact_context = [
    fti.match_correlation(symbol=f.symbol, opponent=f.opponent)
    for f in fixtures
]

# 6. Daily briefing per held token (grounding for the LLM prose)
briefings = fti.briefing(symbols=symbols)

# 7. Per-token sensitivity multiplier for boost calculation
sensitivities = fti.token_sensitivity(symbols=symbols)
```

This payload is fed to the agent as a single context block. The agent doesn't re-query — we batch to keep latency under 6s.

## 6. Scoring — deterministic floor + LLM judgement on top

We do **not** ask the LLM to invent scores. We pre-compute, then the LLM only ranks + writes prose.

For each candidate player:

```
score = 0.25 * form_index          # last 5 matches, recency-weighted
      + 0.20 * fixture_difficulty  # inverse of opponent_strength_rating
      + 0.10 * home_away           # +1.0 home, -0.5 neutral, 0 away
      + 0.15 * minutes_likelihood  # rotation risk from sports_profile
      + 0.20 * boost_effective     # token_balance × sensitivity (FTI)
      + 0.10 * fti_signal_strength # signal_bundle.confidence
```

Weights live in `coach-api/config/weights.toml`. Tune via backtest, never expose to users.

The agent gets the top 12 scored players and is asked to pick 5 across positions (1/1/2/1) + captain. It can deviate from raw rank if it has a reason — but it must cite the reason from FTI data.

## 7. Agent prompt (v1)

```
SYSTEM:
You are the Squad Rivals AI Assistant Coach. The user holds these fan tokens:
{holdings}. Squad Rivals uses a 5-slot formation: 1 GK, 1 DEF, 2 MID, 1 FWD.
One player is captain (2× boost).

Pre-scored candidate players are provided. Your job:

1. Pick exactly 5 players, one per slot.
2. Designate one as captain.
3. Write one sentence per player. Each sentence MUST cite a specific stat from
   the FTI data provided (form, fixture, sensitivity, etc.). No generic claims.
4. Output a confidence score (0-100) for the overall lineup.

Constraints:
- Never suggest buying, selling, or rebalancing tokens.
- For dual-eligible players (club + national-team token), use the boost that
  matches the upcoming fixture type (club match vs. international break).
- If a player has injury risk flagged in sports_profile, either avoid or note
  the risk explicitly in the prose.

Output schema (strict JSON, no prose outside):
{
  "lineup": [
    { "slot": "GK", "player_id": "...", "captain": false, "note": "..." },
    ...
  ],
  "confidence": 0-100,
  "summary": "one-paragraph rationale for the whole squad"
}
```

Model: **Claude Sonnet 4.6** (cost/latency sweet spot for structured tool-using agents). Prompt caching enabled on the system prompt + FTI tool definitions — 90%+ hit rate once warm.

## 8. National-team boost logic

The boost question:

- Vitinha holds dual eligibility: $PSG (club) + $POR (national)
- During Ligue 1 weekend: $PSG boost active for Vitinha
- During UEFA Nations League window: $POR boost active for Vitinha

The Coach checks `tokenintel_match_calendar` for fixture type:

```python
if fixture.competition.is_international:
    boost_token = player.national_token  # if user holds it
else:
    boost_token = player.club_token      # if user holds it
```

Edge case: user holds **only** the club token, player is on international duty → no boost active this matchday. Coach surfaces this transparently ("Vitinha away on Portugal duty — your $PSG boost paused; consider Hakimi who's at PSG.")

This logic is what makes the Coach genuinely smart vs. a generic "pick high-form players" tool.

## 9. Caching

- **Key:** `coach:{wallet}:{matchday_iso}` (e.g. `coach:0x9F2…b41:2026-05-17`)
- **TTL:** until next matchday OR force-invalidate on FTI `match_alerts` for any team in the user's holdings
- **Storage:** Redis (Railway add-on) for Phase 1. Postgres in Phase 2.
- **Stale-while-revalidate:** if request comes in <6h before kickoff and cache is >24h old, re-run agent in background, serve stale.

## 10. Failure modes & edge cases

| Scenario | Handling |
|---|---|
| User holds no tokens | Render a "demo Coach" — top 5 by overall form across top-4 clubs, no boost story |
| All user's teams play each other (rare derby weekend) | Surface the conflict explicitly: "$PSG vs $JUV this weekend — Coach picked the boost-weighted optimum but it's a coin-flip" |
| FTI MCP downtime | Serve previous matchday's pick + banner: "Coach data is stale, refreshing soon" |
| LLM hallucinates a stat | Frontend cross-checks each cited stat (`form: 8.2`) against the FTI data block at render. If mismatch, fall back to a generic note without the stat. Log + alert. |
| Player injured between Coach run and matchday | FTI `match_alerts` invalidates cache → next Coach view re-runs |

## 11. Phased rollout

| Phase | What ships | Effort |
|---|---|---|
| **1 — Coach screen (UI only)** | New `/coach` route in Squad Rivals with mock data. Designs reviewed with Altug. | 1 day |
| **2 — Wire FTI for top 4 clubs** | `coach-api` service on Railway. Real data for $PSG / $BAR / $JUV / $CITY only. No national-team logic yet. | 2 days |
| **3 — Full token coverage + national-team logic + cache** | Coach works for every FTI-supported symbol. International-break handling. Redis cache. | 1 day |
| **4 — Settlement integration** | Matchup `/matchup` shows "Coach would have scored X" for users who didn't follow. Drives adoption. | 0.5 day |
| **5 — Live in-match (later)** | `tokenintel_live_match_impact` powers a live "switch captain" suggestion during play. Post-launch experiment. | 1 day |

**MVP scope = Phases 1–4. ≈ 4.5 days of focused work.**

## 12. Success metrics

Track from day 1:

- **Adoption:** % weekly-active users who open `/coach`
- **Apply-rate:** % who tap "Apply Coach's pick" after viewing
- **Outperformance:** mean points-per-matchday for Coach-followers vs. self-pickers (controlled: assign 50/50 for first 4 weeks before public rollout)
- **Retention lift:** D7 / D30 retention for users who used Coach ≥1 time vs. who didn't
- **Latency:** p50 / p95 Coach generation time (target: p95 < 8s cold, < 200ms cached)

## 13. Open questions — resolved (2026-05-13)

### Q1. Wallet binding — **RESOLVED**

**Decision:** Squad Rivals uses **WalletConnect / RainbowKit configured for Chiliz Chain** as the primary path. Native Socios SDK integration is Phase 5 (after the partnership conversation lands).

- Phase 1–4: any Chiliz Chain wallet connects (most Socios users already have one via Chiliz Wallet).
- The wallet address is passed to `tokenintel_wallet_balance(wallet=0x...)` as-is.
- No PII is stored in coach-api; just the address and the cached pick.

### Q2. FTI API key strategy — **RESOLVED**

**Decision:** Single FTI service-account key, server-side only.

- `coach-api` holds one `ti_live_xxx` key with `read` scope.
- Users never see, hold, or pass FTI tokens through their session.
- Issued via FTI's `/register` endpoint (or directly by Bruno from the FTI admin panel).
- Rate limits: monitor against FTI's plan; raise if Coach traffic warrants.

### Q3. National-team token availability — **RESOLVED**

**Verified in FTI source** (`v3/services/agent_story_engine.py:507-520`):

FTI ships hard-coded constants for both classes:

```python
NATIONAL_TEAM_TOKENS = {
    "POR": "Portugal", "ARG": "Argentina", "BRA": "Brazil",
    "FRA": "France",  "ESP": "Spain",     "GER": "Germany",
    "ITA": "Italy",   "ENG": "England",   "NED": "Netherlands",
}  # 9 tokens

CLUB_TOKENS = {
    "PSG": "Paris Saint-Germain", "BAR": "Barcelona", "JUV": "Juventus",
    "CITY": "Manchester City",    "ACM": "AC Milan", "INTER": "Inter Milan",
    "ATM": "Atletico Madrid",     "AFC": "Arsenal",  "TOT": "Tottenham",
    "ASR": "AS Roma",             "NAP": "Napoli",   "GAL": "Galatasaray",
    "MENGO": "Flamengo",          "SANTOS": "Santos","SPFC": "Sao Paulo",
}  # 15 tokens
```

**Coverage: 24 tokens total**, with hard distinction between club + national. FTI also already enforces "clubs cannot play in national tournaments" in its narrative engine (`agent_story_engine.py:587-589`). The dual-eligibility logic the Coach needs is **production-grade and shipping**.

Gap to note: only 9 of FIFA's ~200 national teams are tokenised. The Coach silently no-ops national boosts for non-tokenised teams (e.g. user holds no $POR → Vitinha gets no national boost during Portugal duty). This is correct behavior, not a bug — it makes holding national-team tokens genuinely valuable.

### Q4. Cost — **RESOLVED**

Sonnet 4.6 with prompt caching active (90%+ hit rate on system prompt + FTI tool schemas):

| Per-call cost | Input | Output | Total |
|---|---|---|---|
| Tokens | 5k (cached) | 500 | 5.5k |
| Effective price | $0.30 / M | $15 / M | — |
| Cost | $0.0015 | $0.0075 | **$0.009 / call** |

| Scale | Calls/day | Cost/day | Cost/month |
|---|---|---|---|
| 1k DAU (1×/day) | 1,000 | $9 | $270 |
| 10k DAU | 10,000 | $90 | $2,700 |
| 100k DAU | 100,000 | $900 | $27,000 |

At 10k DAU, **roll out Phase 2 (pre-computed nightly digests on Aguia)** — drops cost by ~80% by running one batch job vs. per-request agent calls.

---

## 13b. Onboarding upgrade — assistant-as-character (decided 2026-05-13)

Bruno's product instinct: the AI Coach is **most powerful as a personality** the user picks and bonds with, not a settings panel. Inspired by **PlayMFL** and reinforced by the tracker task *"Build onboarding that introduces the AI assistant — user gets to select what kind of assistant he/she wants: aggressive, calm, safe, controlled etc."*

### Six assistants (ships in mock layer of `/onboarding`)

| ID | Name | Country | Style | Tagline |
|---|---|---|---|---|
| `andrea` | Andrea, 33 | 🇮🇹 Italy | Defensive | Catenaccio classicist |
| `sofia` | Sofia, 29 | 🇪🇸 Spain | Balanced | Tiki-taka believer |
| `marcus` | Marcus, 38 | 🇩🇪 Germany | Aggressive | Gegenpressing fanatic |
| `yuki` | Yuki, 31 | 🇯🇵 Japan | Counter | Counter-strike strategist |
| `khaled` | Khaled, 27 | 🇲🇦 Morocco | Calm | Vibes-based football |
| `olivia` | Olivia, 35 | 🇧🇷 Brazil | Attacking | Joga bonito |

Each has a portrait, a one-line bio, a tagline, philosophy bullets, a signature phrase, and a unique `accentHue`.

### New 5-step onboarding flow

1. **Choose your assistant** — carousel with pagination dots (PlayMFL pattern)
2. **"What should I call you?"** — name input, assistant uses it from now on
3. **"Thanks, {name}. Which club is home for you?"** — auto-detected from wallet
4. **"Excellent. Which boosts should I activate?"** — token toggles
5. **"I'm sure you'll do us proud, {name}."** — welcome + Inbox preview

Voice is first-person throughout. Choice is persisted in Zustand (`squad-rivals-state` localStorage key).

### Coach screen evolves

- Character card at top of `/coach`: photo + name + age + country + style chip
- Page title: `"{assistant.name}'s lineup"` (was: "AI Assistant Coach")
- Notes in first-person: *"Right, Bruno. Here's how I'd line you up this matchday."*
- Sidebar shows "Your assistant: {name}" with a switch-assistant CTA

### Personality affecting picks — **Phase 3 work**

For MVP, assistant choice is cosmetic + voice flavour (matches PlayMFL's "won't change your gameplay" note). Phase 3 makes style affect picks:

- `aggressive` → weights `signal_bundle` & form harder; tolerates higher variance
- `defensive` → upweights `minutes_likelihood`; avoids injury risk
- `attacking` → 2 strikers always
- `balanced` → equal-weighted (default)
- `counter` → upweights `match_correlation` for fixture-specific reads
- `calm` → smooths week-over-week; minimises swap churn

Implemented as a `weights_modifier` config keyed by `assistant.style` applied to the deterministic scoring formula in §6.

---

## 13c. Chargeable functions surfaced in UX (tracker task)

The tracker task *"add chargeable functions"* enumerates four token-sinks. Phase 1 surfaces them in the UI (mock states only, no charging yet). Phase 2 wires them to the token contract.

| Function | UI surface | Mock state shown | Wire-up phase |
|---|---|---|---|
| **Slot activation** (buy fan token → activate slot, expires after 3 games) | Each `/squad` slot shows `contract: X/3 games left` badge + "Renew (5 $PSG)" button | One slot near expiry, one expired | Phase 2 |
| **Paid scouting** | `/rivals` scout-drawer "Reveal opponent's tactic & captain — 2 $PSG / 0.5 CHZ" button | Toggle gates the existing Strengths section | Phase 2 |
| **Challenge tickets** | `/rivals` shows `7/10 challenges left today · 0.5 CHZ for extra` counter | Counter in lobby header | Phase 2 |
| **Assistant Manager autopilot** | `/coach` "Let {name} pick for you every matchday" toggle | Off by default; on = "Auto-applied for Matchday 33" badge | Phase 2 |

## 14. Pitch framing for Altug + stakeholders

> Squad Rivals is the consumer front-end for FTI. The Coach proves it. We're not bolting AI onto a fantasy game — we're putting our existing token intelligence layer into the hands of fans, in a form they actually want to use. Nobody else can ship this because nobody else has FTI.

---

## Appendix A — file structure (when we build it)

```
coach-api/
├── main.py               # FastAPI entry, /coach/{wallet} endpoint
├── agent.py              # Claude tool-use agent
├── scoring.py            # Deterministic pre-scoring
├── fti_client.py         # Wraps FTI MCP HTTP calls
├── cache.py              # Redis interface
├── config/
│   └── weights.toml
├── prompts/
│   └── coach_v1.md
└── tests/
    └── test_national_break.py  # Critical edge case
```

## Appendix B — example Coach output (mock)

```json
{
  "lineup": [
    { "slot": "GK",  "player_id": "p1",  "captain": false, "note": "Donnarumma faces Reims at home — PSG conceded 0.4 xGA in last 5 home games. Your $PSG +25% boost applies." },
    { "slot": "DEF", "player_id": "p3",  "captain": false, "note": "Hakimi back from suspension; 2 assists in last 3 vs. Reims historically per FTI match_correlation." },
    { "slot": "MID", "player_id": "p7",  "captain": true,  "note": "Vitinha rated 8.2 over last 5. Captain = 2× the $PSG boost. PSG home vs. relegation zone — fixture difficulty 0.18." },
    { "slot": "FWD", "player_id": "p11", "captain": false, "note": "Dembélé scored in last 3 Reims meetings. FTI signal_bundle.confidence = 0.81 for PSG attackers." },
    { "slot": "FWD", "player_id": "p12", "captain": false, "note": "Yamal in 9.0 form. Barça home vs. Sevilla, fixture difficulty 0.31. $BAR +18% boost applies." }
  ],
  "confidence": 84,
  "summary": "Strong home weekend for your held clubs. Captain Vitinha for double the highest individual boost. Watch for Yamal — international duty rumored next week."
}
```
