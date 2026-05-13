import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Crown,
  Plus,
  X,
  Sparkles,
  Search,
  Filter,
  ChevronRight,
  Sparkle,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import AssistantPanel from '../components/AssistantPanel';
import { cn } from '../lib/cn';
import {
  tactics,
  teams,
  userTokens,
} from '../data/mock';

type Slot = { id: 1 | 2 | 3 | 4 | 5; teamId: string | null };

const emptySquad: Slot[] = [
  { id: 1, teamId: null },
  { id: 2, teamId: null },
  { id: 3, teamId: null },
  { id: 4, teamId: null },
  { id: 5, teamId: null },
];

export default function Play() {
  const [squad, setSquad] = useState<Slot[]>(emptySquad);
  const [captainSlot, setCaptainSlot] = useState<number | null>(null);
  const [tacticId, setTacticId] = useState('balanced');
  const [activeTokens, setActiveTokens] = useState<Set<string>>(
    new Set(userTokens.map((t) => t.symbol)),
  );
  const [pickerForSlot, setPickerForSlot] = useState<number | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const tactic = tactics.find((t) => t.id === tacticId)!;

  const used = useMemo(
    () => new Set(squad.map((s) => s.teamId).filter(Boolean) as string[]),
    [squad],
  );
  const filled = squad.filter((s) => s.teamId).length;

  function pickTeam(slotId: number, teamId: string) {
    setSquad(squad.map((s) => (s.id === slotId ? { ...s, teamId } : s)));
    setPickerForSlot(null);
  }
  function clearSlot(slotId: number) {
    setSquad(squad.map((s) => (s.id === slotId ? { ...s, teamId: null } : s)));
    if (captainSlot === slotId) setCaptainSlot(null);
    setPickerForSlot(null);
  }

  function applyRecommendation(rec: {
    slots: { teamId: string; captain: boolean }[];
    tacticId: string;
    tokensActivated: string[];
  }) {
    setSquad(
      rec.slots.map((s, i) => ({ id: (i + 1) as Slot['id'], teamId: s.teamId })),
    );
    const captainIdx = rec.slots.findIndex((s) => s.captain);
    setCaptainSlot(captainIdx >= 0 ? captainIdx + 1 : null);
    setTacticId(rec.tacticId);
    setActiveTokens(new Set(rec.tokensActivated));
    setAssistantOpen(false);
  }

  // Mock predicted score
  const predicted = useMemo(() => {
    let base = 0;
    squad.forEach((s) => {
      const team = teams.find((t) => t.id === s.teamId);
      if (!team) return;
      const fixtureScore =
        (1 - team.nextFixture.difficulty) * 10 + team.rating * 0.2;
      const slotScore =
        fixtureScore * (s.id === captainSlot ? 2 : 1) *
        (activeTokens.has(team.fanToken) ? 1.1 : 1);
      base += slotScore;
    });
    // tactic micro-bump for the mock
    const tacticBump =
      tacticId === 'chaos' ? 1.15 : tacticId === 'fortress' ? 1.08 : 1;
    return Math.round(base * tacticBump * 100);
  }, [squad, captainSlot, activeTokens, tacticId]);

  return (
    <div className="min-h-screen">
      <TopBar />

      <main className="max-w-7xl mx-auto px-5 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="stat-label text-ink-300">Build squad</div>
            <h1 className="h-display text-3xl lg:text-[44px] mt-1">
              Matchday 1
            </h1>
            <p className="mt-1.5 text-sm text-ink-200">
              Pick 5 teams. Crown a captain. Choose a tactic. Lock in before
              kickoff.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAssistantOpen(true)}
              className="btn-ghost border-electric/40 text-electric hover:bg-electric/[0.06]"
            >
              <Sparkle size={14} /> Ask my assistant
            </button>
            <button
              className="btn-primary"
              disabled={filled < 5 || captainSlot === null}
            >
              Lock squad <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            {/* Slots */}
            <section className="surface p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-white">
                  Squad · {filled}/5
                </h2>
                <span className="text-[11px] text-ink-300">
                  Tap a slot to fill from FTI-indexed teams
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {squad.map((slot) => {
                  const team = teams.find((t) => t.id === slot.teamId);
                  const isCaptain = captainSlot === slot.id;
                  return (
                    <div key={slot.id} className="relative">
                      <button
                        onClick={() => setPickerForSlot(slot.id)}
                        className={cn(
                          'w-full aspect-[3/4] rounded-xl border p-3 flex flex-col items-center justify-between text-center transition relative overflow-hidden',
                          team
                            ? isCaptain
                              ? 'border-gold/50 bg-gold/[0.04] shadow-[0_0_20px_-8px_rgba(245,185,66,0.3)]'
                              : 'border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.05]'
                            : 'border-dashed border-white/[0.1] bg-white/[0.01] hover:border-electric/40',
                        )}
                      >
                        {team ? (
                          <>
                            <div className="text-[10px] font-mono text-ink-300">
                              Slot {slot.id}
                            </div>
                            <div className="text-3xl">{team.flag}</div>
                            <div className="font-display font-black text-white text-2xl leading-none">
                              {team.rating}
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-[0.14em] text-ink-300">
                                {team.code}
                              </div>
                              <div className="text-[11px] text-ink-200 mt-0.5">
                                {team.name}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-[10px] font-mono text-ink-300">
                              Slot {slot.id}
                            </div>
                            <Plus size={22} className="text-ink-300" />
                            <div className="text-[11px] text-ink-300">
                              Pick a team
                            </div>
                          </>
                        )}
                      </button>
                      {team && (
                        <button
                          onClick={() => setCaptainSlot(slot.id)}
                          className={cn(
                            'absolute -top-2 left-1/2 -translate-x-1/2 h-7 w-7 rounded-full grid place-items-center transition shadow-lg',
                            isCaptain
                              ? 'bg-gold text-ink-900'
                              : 'bg-ink-800 text-ink-300 hover:bg-gold hover:text-ink-900 border border-white/10',
                          )}
                          title={isCaptain ? 'Captain' : 'Make captain'}
                        >
                          <Crown size={13} strokeWidth={2.5} />
                        </button>
                      )}
                      {team && (
                        <button
                          onClick={() => clearSlot(slot.id)}
                          className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-black/60 hover:bg-crimson/40 grid place-items-center text-ink-300 hover:text-white opacity-0 group-hover:opacity-100"
                        >
                          <X size={10} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Tactic */}
            <section className="surface p-5">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h2 className="font-display font-bold text-white">
                    Tactic
                  </h2>
                  <p className="text-[11px] text-ink-300 mt-0.5">
                    One tactic for the whole squad. Bonus applies to every
                    slot.
                  </p>
                </div>
                <span className="pill !text-[10px] !py-0 !px-2">
                  {tactic.name} · {tactic.bonus}
                </span>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                {tactics.map((t) => {
                  const active = t.id === tacticId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTacticId(t.id)}
                      className={cn(
                        'rounded-xl border p-3 text-left transition',
                        active
                          ? 'border-electric/50 bg-electric/[0.06] text-white shadow-[0_0_24px_-12px_rgba(34,211,238,0.6)]'
                          : 'border-white/[0.08] bg-white/[0.02] text-ink-100 hover:bg-white/[0.05]',
                      )}
                    >
                      <div className="font-display font-bold text-white">
                        {t.name}
                      </div>
                      <div className="text-[10px] text-ink-300 mt-0.5 line-clamp-2">
                        {t.tagline}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-ink-300">
                {tactic.longBonus}
              </p>
            </section>

            {/* Tokens */}
            <section className="surface p-5">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h2 className="font-display font-bold text-white">
                    Fan tokens
                  </h2>
                  <p className="text-[11px] text-ink-300 mt-0.5">
                    +10% per activated token. Only applies to slots where the
                    team matches.
                  </p>
                </div>
                <span className="text-[11px] text-ink-300">
                  {activeTokens.size}/{userTokens.length} active
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {userTokens.map((t) => {
                  const on = activeTokens.has(t.symbol);
                  return (
                    <button
                      key={t.symbol}
                      onClick={() => {
                        const next = new Set(activeTokens);
                        if (on) next.delete(t.symbol);
                        else next.add(t.symbol);
                        setActiveTokens(next);
                      }}
                      className={cn(
                        'rounded-lg border px-3 py-2.5 text-left transition',
                        on
                          ? 'border-electric/40 bg-electric/[0.06]'
                          : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] opacity-60',
                      )}
                    >
                      <div className="font-mono text-xs text-white">
                        {t.symbol}
                      </div>
                      <div className="text-[10px] text-ink-300 mt-0.5">
                        {t.balance}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Side: predicted points + assistant teaser */}
          <aside className="space-y-4">
            <div className="surface p-5">
              <div className="stat-label">Predicted fans</div>
              <div className="mt-2 font-display font-black text-white text-4xl lg:text-5xl tracking-tight">
                {predicted.toLocaleString()}
              </div>
              <div className="mt-1 text-xs text-ink-300">
                Mock estimate. Real result locks at kickoff.
              </div>
              <div className="mt-4 pt-4 border-t border-white/[0.05] space-y-1.5 text-xs">
                <Row label="Slots filled" value={`${filled}/5`} />
                <Row
                  label="Captain"
                  value={captainSlot ? `Slot ${captainSlot}` : '—'}
                />
                <Row label="Tactic" value={tactic.name} />
                <Row label="Active tokens" value={`${activeTokens.size}`} />
              </div>
            </div>

            {/* The assistant teaser — entry point */}
            <button
              onClick={() => setAssistantOpen(true)}
              className="w-full surface p-5 text-left hover:bg-white/[0.04] transition group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-electric/15 grid place-items-center group-hover:bg-electric/25 transition">
                  <Sparkles size={18} className="text-electric" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm">
                    Not sure who to pick?
                  </div>
                  <div className="text-[11px] text-ink-300 mt-0.5">
                    Your AI assistant reads the fixtures and your wallet.
                  </div>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-electric font-medium">
                Open assistant <ChevronRight size={13} />
              </div>
            </button>

            <div className="surface p-5">
              <div className="stat-label">Challenge tickets</div>
              <div className="mt-2 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-7 w-9 rounded-md border border-electric/30 bg-electric/[0.06] flex items-center justify-center text-[11px] font-mono text-electric"
                  >
                    1
                  </span>
                ))}
              </div>
              <div className="mt-2 text-[11px] text-ink-300">
                3 free per matchday. Extra tickets cost CHZ.
              </div>
            </div>
          </aside>
        </div>
      </main>

      <AnimatePresence>
        {pickerForSlot !== null && (
          <TeamPicker
            slotId={pickerForSlot}
            usedTeamIds={used}
            currentTeamId={
              squad.find((s) => s.id === pickerForSlot)?.teamId ?? null
            }
            onPick={pickTeam}
            onClose={() => setPickerForSlot(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {assistantOpen && (
          <AssistantPanel
            onClose={() => setAssistantOpen(false)}
            onApply={applyRecommendation}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-300">{label}</span>
      <span className="text-ink-100 font-mono">{value}</span>
    </div>
  );
}

function TeamPicker({
  slotId,
  usedTeamIds,
  currentTeamId,
  onPick,
  onClose,
}: {
  slotId: number;
  usedTeamIds: Set<string>;
  currentTeamId: string | null;
  onPick: (slotId: number, teamId: string) => void;
  onClose: () => void;
}) {
  const [filter, setFilter] = useState<'all' | 'national' | 'club'>('all');
  const [query, setQuery] = useState('');
  const list = teams.filter((t) => {
    if (filter !== 'all' && t.type !== filter) return false;
    if (query && !`${t.code} ${t.name}`.toLowerCase().includes(query.toLowerCase()))
      return false;
    return true;
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
    >
      <motion.div
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        exit={{ y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl surface p-5 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="stat-label text-electric">Slot {slotId}</div>
            <h3 className="font-display font-bold text-white text-xl mt-1">
              Pick a team
            </h3>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] grid place-items-center"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ARG, Brazil, City…"
              className="w-full pl-9 pr-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm placeholder:text-ink-400 focus:outline-none focus:border-white/[0.12]"
            />
          </div>
          <Filter size={13} className="text-ink-300" />
          {(['all', 'national', 'club'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'text-xs px-3 py-1.5 rounded-full font-medium transition',
                filter === f
                  ? 'bg-electric text-ink-950'
                  : 'bg-white/[0.04] text-ink-200 hover:bg-white/[0.07]',
              )}
            >
              {f === 'all' ? 'All' : f === 'national' ? 'National' : 'Clubs'}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {list.map((t) => {
            const used = usedTeamIds.has(t.id) && t.id !== currentTeamId;
            return (
              <li key={t.id}>
                <button
                  disabled={used}
                  onClick={() => onPick(slotId, t.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl border text-left transition',
                    t.id === currentTeamId
                      ? 'border-electric/50 bg-electric/[0.06]'
                      : used
                        ? 'border-white/[0.04] bg-white/[0.01] opacity-40 cursor-not-allowed'
                        : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]',
                  )}
                >
                  <div className="text-2xl">{t.flag}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-white text-sm">
                        {t.code}
                      </span>
                      <span className="text-[10px] text-ink-300 uppercase tracking-[0.14em]">
                        {t.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-ink-300 truncate">
                      vs {t.nextFixture.opponent} · {t.nextFixture.kickoff}
                    </div>
                  </div>
                  <div className="font-mono text-white text-sm">{t.rating}</div>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
}
