import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Plus,
  Sparkles,
  RefreshCw,
  X,
  Filter,
  TrendingUp,
  AlertTriangle,
  Brain,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader, PositionBadge, Stat } from '../components/ui';
import { cn } from '../lib/cn';
import { players, suggestedSquad } from '../data/mock';
import type { Player, Position } from '../data/types';

type Slot = {
  id: string;
  position: Position;
  x: number;
  y: number;
};

const formation: Slot[] = [
  { id: 'GK', position: 'GK', x: 50, y: 88 },
  { id: 'DEF-1', position: 'DEF', x: 30, y: 65 },
  { id: 'MID', position: 'MID', x: 50, y: 45 },
  { id: 'FWD-1', position: 'FWD', x: 30, y: 18 },
  { id: 'FWD-2', position: 'FWD', x: 70, y: 18 },
];

export default function SquadBuilder() {
  const [squad, setSquad] = useState<Record<string, string | null>>(
    Object.fromEntries(formation.map((s) => [s.id, suggestedSquad[s.id] ?? null])),
  );
  const [captain, setCaptain] = useState<string>('MID');
  const [pickerFor, setPickerFor] = useState<Slot | null>(null);

  const filled = Object.values(squad).filter(Boolean).length;
  const selectedIds = useMemo(
    () => new Set(Object.values(squad).filter(Boolean) as string[]),
    [squad],
  );

  const stats = useMemo(() => {
    const lineup = Object.entries(squad)
      .map(([slot, id]) => ({
        slot,
        player: players.find((p) => p.id === id),
      }))
      .filter((s) => s.player) as { slot: string; player: Player }[];
    const cost = lineup.reduce((acc, l) => acc + l.player.price, 0);
    const avg =
      lineup.length === 0
        ? 0
        : lineup.reduce((a, l) => a + l.player.rating, 0) / lineup.length;
    const boostPts = lineup.reduce(
      (a, l) =>
        a + l.player.rating * (l.player.boost - 1) * (l.slot === captain ? 2 : 1),
      0,
    );
    const predicted = avg * 0.7 + boostPts * 0.4;
    return { cost, avg, boostPts, predicted, lineup };
  }, [squad, captain]);

  return (
    <>
      <PageHeader
        eyebrow="Pitch"
        title="Build your five"
        subtitle="Five players. One captain. Token boosts power your edge."
        right={
          <>
            <Link
              to="/coach"
              className="btn-ghost border-accent/40 text-accent hover:bg-accent/[0.06]"
            >
              <Brain size={14} /> Ask Coach
            </Link>
            <button
              className="btn-ghost"
              onClick={() =>
                setSquad(
                  Object.fromEntries(
                    formation.map((s) => [s.id, suggestedSquad[s.id] ?? null]),
                  ),
                )
              }
            >
              <RefreshCw size={14} /> Auto-pick
            </button>
            <button className="btn-primary">
              <Sparkles size={14} /> Save squad
            </button>
          </>
        }
      />

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Pitch */}
        <div className="surface p-4 lg:p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="pill">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                Formation 1-1-2-2
              </span>
              <span className="pill">
                <Crown size={11} className="text-gold" />
                Captain · 2× boost
              </span>
            </div>
            <div className="text-xs text-ink-300">
              <span className="font-mono text-white">{filled}</span>
              <span className="text-ink-400"> / 5 picked</span>
            </div>
          </div>

          <div
            className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.06]"
            style={{
              background:
                'linear-gradient(180deg, #0d3b22 0%, #0a2e1b 60%, #062014 100%)',
            }}
          >
            <div className="absolute inset-0 bg-pitch-stripes" />
            {/* Pitch markings */}
            <PitchMarkings />

            {formation.map((slot) => {
              const playerId = squad[slot.id];
              const player = playerId
                ? players.find((p) => p.id === playerId)
                : null;
              const isCaptain = captain === slot.id;
              return (
                <div
                  key={slot.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                >
                  {player ? (
                    <PlayerToken
                      player={player}
                      captain={isCaptain}
                      onCaptain={() => setCaptain(slot.id)}
                      onPick={() => setPickerFor(slot)}
                    />
                  ) : (
                    <button
                      onClick={() => setPickerFor(slot)}
                      className="block"
                    >
                      <EmptySlot position={slot.position} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Stat
              label="Predicted score"
              value={stats.predicted.toFixed(1)}
              hint="League avg 54.1"
              trend="up"
            />
            <Stat
              label="Avg OVR"
              value={stats.avg ? stats.avg.toFixed(1) : '—'}
              hint={`${stats.cost.toFixed(1)} budget`}
            />
          </div>

          <div className="surface p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-base text-white">
                Token boosts active
              </h3>
              <Sparkles size={14} className="text-accent" />
            </div>
            <div className="space-y-2.5">
              {stats.lineup.map((l) => (
                <div
                  key={l.slot}
                  className="flex items-center gap-3 text-sm"
                >
                  <PositionBadge position={l.player.position} />
                  <div className="flex-1 min-w-0">
                    <div className="text-ink-100 truncate">
                      {l.player.shortName}
                    </div>
                    <div className="text-[11px] text-ink-300">
                      {l.player.clubToken}
                    </div>
                  </div>
                  <span
                    className={cn(
                      'font-mono text-xs',
                      l.player.boost > 1.15
                        ? 'text-emerald'
                        : l.player.boost > 1.05
                          ? 'text-ink-100'
                          : 'text-ink-300',
                    )}
                  >
                    +{((l.player.boost - 1) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface p-5">
            <div className="flex items-center gap-2 mb-2.5">
              <TrendingUp size={14} className="text-emerald" />
              <h3 className="font-display text-base text-white">
                Coach's note
              </h3>
            </div>
            <p className="text-sm text-ink-200 leading-relaxed">
              Vitinha is your captain pick — boosted{' '}
              <span className="font-mono text-emerald">+25%</span> and on form
              <span className="font-mono text-emerald"> 8.2</span>. Watch
              Raphinha — flagged injury risk.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {pickerFor && (
          <PlayerPicker
            slot={pickerFor}
            selectedIds={selectedIds}
            currentId={squad[pickerFor.id]}
            onPick={(id) => {
              setSquad({ ...squad, [pickerFor.id]: id });
              setPickerFor(null);
            }}
            onClear={() => {
              setSquad({ ...squad, [pickerFor.id]: null });
              setPickerFor(null);
            }}
            onClose={() => setPickerFor(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function PitchMarkings() {
  return (
    <svg
      viewBox="0 0 100 125"
      className="absolute inset-0 w-full h-full opacity-30"
      preserveAspectRatio="none"
    >
      <rect
        x="2"
        y="2"
        width="96"
        height="121"
        fill="none"
        stroke="white"
        strokeWidth="0.3"
      />
      <line x1="2" y1="62.5" x2="98" y2="62.5" stroke="white" strokeWidth="0.3" />
      <circle cx="50" cy="62.5" r="8" fill="none" stroke="white" strokeWidth="0.3" />
      <circle cx="50" cy="62.5" r="0.6" fill="white" />
      <rect x="28" y="2" width="44" height="14" fill="none" stroke="white" strokeWidth="0.3" />
      <rect x="38" y="2" width="24" height="6" fill="none" stroke="white" strokeWidth="0.3" />
      <rect x="28" y="109" width="44" height="14" fill="none" stroke="white" strokeWidth="0.3" />
      <rect x="38" y="117" width="24" height="6" fill="none" stroke="white" strokeWidth="0.3" />
    </svg>
  );
}

function EmptySlot({ position }: { position: Position }) {
  return (
    <div className="group cursor-pointer">
      <div className="h-14 w-14 rounded-full border-2 border-dashed border-white/30 grid place-items-center bg-black/20 group-hover:border-accent transition">
        <Plus size={18} className="text-white/60 group-hover:text-accent" />
      </div>
      <div className="mt-1.5 text-center">
        <PositionBadge position={position} />
      </div>
    </div>
  );
}

function PlayerToken({
  player,
  captain,
  onCaptain,
  onPick,
}: {
  player: Player;
  captain: boolean;
  onCaptain: () => void;
  onPick: () => void;
}) {
  return (
    <div className="relative">
      {captain && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-gold grid place-items-center shadow-lg z-10">
          <Crown size={12} className="text-ink-900" strokeWidth={2.5} />
        </div>
      )}
      <button
        onClick={onPick}
        className={cn(
          'h-14 w-14 rounded-full grid place-items-center relative font-display font-bold text-white text-lg shadow-lg transition',
          captain
            ? 'bg-gradient-to-br from-gold to-yellow-700 ring-2 ring-gold/50'
            : 'bg-gradient-to-br from-accent to-red-900 group-hover:ring-2 group-hover:ring-accent/40',
        )}
      >
        {player.jerseyNumber}
        {player.boost > 1.1 && !captain && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald grid place-items-center text-[9px] font-mono">
            <Sparkles size={9} className="text-ink-900" />
          </span>
        )}
        {player.injured && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-crimson grid place-items-center">
            <AlertTriangle size={9} className="text-white" />
          </span>
        )}
      </button>
      <div className="mt-1.5 text-center">
        <div className="text-[10px] font-medium text-white bg-ink-950/80 px-1.5 py-0.5 rounded font-mono">
          {player.shortName.split(' ').slice(-1)[0]}
        </div>
      </div>
      {!captain && (
        <button
          onClick={onCaptain}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 mt-1 text-[9px] text-ink-300 hover:text-gold opacity-0 group-hover:opacity-100 transition whitespace-nowrap"
        >
          Make captain
        </button>
      )}
    </div>
  );
}

function PlayerPicker({
  slot,
  selectedIds,
  currentId,
  onPick,
  onClear,
  onClose,
}: {
  slot: Slot;
  selectedIds: Set<string>;
  currentId: string | null;
  onPick: (id: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const [filter, setFilter] = useState<'all' | 'boosted'>('all');
  const eligible = players.filter((p) => p.position === slot.position);
  const filtered =
    filter === 'boosted' ? eligible.filter((p) => p.boost > 1.05) : eligible;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-ink-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        exit={{ y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl surface p-5 lg:p-6 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="stat-label text-accent">Pick a {slot.position}</div>
            <h3 className="h-display text-xl mt-1">Choose for {slot.id}</h3>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] grid place-items-center"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Filter size={13} className="text-ink-300" />
          {(['all', 'boosted'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'text-xs px-3 py-1 rounded-full transition',
                filter === f
                  ? 'bg-accent text-white'
                  : 'bg-white/[0.04] text-ink-200 hover:bg-white/[0.07]',
              )}
            >
              {f === 'all' ? 'All' : 'Boosted only'}
            </button>
          ))}
          {currentId && (
            <button
              onClick={onClear}
              className="ml-auto text-xs text-crimson hover:underline"
            >
              Remove from slot
            </button>
          )}
        </div>

        <ul className="space-y-2">
          {filtered.map((p) => {
            const used = selectedIds.has(p.id) && p.id !== currentId;
            return (
              <li key={p.id}>
                <button
                  disabled={used}
                  onClick={() => onPick(p.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl border text-left transition',
                    p.id === currentId
                      ? 'border-accent/50 bg-accent/[0.06]'
                      : used
                        ? 'border-white/[0.04] bg-white/[0.01] opacity-40 cursor-not-allowed'
                        : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]',
                  )}
                >
                  <div className="h-10 w-10 rounded-lg bg-white/[0.05] grid place-items-center font-mono text-xs">
                    {p.jerseyNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate">
                      {p.name}
                    </div>
                    <div className="text-xs text-ink-300 flex items-center gap-2">
                      <span>{p.club}</span>·
                      <span className="font-mono">OVR {p.rating}</span>·
                      <span className="font-mono">{p.price.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className={cn(
                        'font-mono text-xs',
                        p.boost > 1.15
                          ? 'text-emerald'
                          : p.boost > 1.05
                            ? 'text-ink-100'
                            : 'text-ink-300',
                      )}
                    >
                      +{((p.boost - 1) * 100).toFixed(0)}%
                    </div>
                    {p.injured && (
                      <div className="text-[10px] text-crimson mt-0.5">
                        Injury risk
                      </div>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
}
