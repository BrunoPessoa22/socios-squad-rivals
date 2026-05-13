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

## 13. Open questions (need answers before Phase 2)

1. **Wallet binding** — does Squad Rivals authenticate the user's actual Socios wallet, or use a connected wallet pattern (RainbowKit)? FTI `wallet_balance` needs the on-chain address.
2. **FTI API key strategy** — coach-api uses a single service-account key against FTI (don't pass user-issued tokens). Need an `ti_live_xxx` key with `read` scope provisioned for the service.
3. **National-team token availability** — confirm with FTI: are all national-team tokens (e.g. $BRA, $ARG, $POR, $ESP) supported in `token_metadata` with `nation` field? If not, add the mapping.
4. **Cost** — at 1k DAU calling Coach 1×/day with Sonnet 4.6, prompt cache hot: ~$8/day. Acceptable. Re-estimate at 10k DAU.

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
