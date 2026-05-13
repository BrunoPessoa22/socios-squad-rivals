import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Sparkles,
  Trophy,
  Coins,
  Flame,
  Clock,
  ChevronRight,
  Star,
} from 'lucide-react';
import { PageHeader, Avatar, PositionBadge } from '../components/ui';
import { cn } from '../lib/cn';
import { players, suggestedSquad, settlement, upcomingMatchup } from '../data/mock';
import type { Player } from '../data/types';

type View = 'preview' | 'settlement';

export default function Matchup() {
  const [view, setView] = useState<View>('preview');
  return (
    <>
      <PageHeader
        eyebrow={view === 'preview' ? 'Kickoff in 2h 14m' : 'Final · 12 May'}
        title={view === 'preview' ? 'Matchup preview' : 'Settlement'}
        subtitle={
          view === 'preview'
            ? 'Compare squads side-by-side. Boosts apply at kickoff.'
            : 'Player-by-player breakdown and rewards.'
        }
        right={
          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {(['preview', 'settlement'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'px-3.5 py-1.5 text-xs font-medium rounded-lg transition',
                  view === v
                    ? 'bg-accent text-white shadow-glow'
                    : 'text-ink-200 hover:text-white',
                )}
              >
                {v === 'preview' ? 'Preview' : 'Settlement'}
              </button>
            ))}
          </div>
        }
      />

      {view === 'preview' ? <Preview /> : <Settlement />}
    </>
  );
}

function Preview() {
  const myXi = Object.values(suggestedSquad)
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean) as Player[];
  // Mock rival XI
  const rivalXi: Player[] = [players[1], players[5], players[9], players[13], players[11]];
  return (
    <>
      <div className="surface p-6 lg:p-8 mb-5">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <SideHeader
            handle="bruno.eth"
            label="You · #5"
            hue={340}
            align="left"
          />
          <div className="text-center">
            <div className="stat-label text-ink-300">VS</div>
            <div className="font-display text-5xl text-white tracking-tighter mt-1">
              {upcomingMatchup.prediction.you}
              <span className="text-ink-400 mx-2">·</span>
              {upcomingMatchup.prediction.them}
            </div>
            <div className="text-[11px] text-ink-300 mt-1">
              Predicted score
            </div>
          </div>
          <SideHeader
            handle={upcomingMatchup.opponent.handle}
            label={`Rival · #${upcomingMatchup.opponent.rank}`}
            hue={upcomingMatchup.opponent.avatarHue}
            align="right"
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
          <div className="surface-inset p-3">
            <Clock size={14} className="mx-auto text-ink-300" />
            <div className="font-mono text-white mt-1">{upcomingMatchup.kickoff}</div>
            <div className="stat-label !text-[10px] mt-0.5">Kickoff</div>
          </div>
          <div className="surface-inset p-3">
            <Coins size={14} className="mx-auto text-gold" />
            <div className="font-mono text-white mt-1">
              {upcomingMatchup.pot} {upcomingMatchup.stakeToken}
            </div>
            <div className="stat-label !text-[10px] mt-0.5">Pot</div>
          </div>
          <div className="surface-inset p-3">
            <Flame size={14} className="mx-auto text-accent" />
            <div className="font-mono text-emerald mt-1">
              +{upcomingMatchup.prediction.edge} pts
            </div>
            <div className="stat-label !text-[10px] mt-0.5">Your edge</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <SquadColumn title="Your squad" players={myXi} captainIdx={2} accent />
        <SquadColumn title="Rival squad" players={rivalXi} captainIdx={3} />
      </div>

      <div className="mt-5 surface p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-accent" />
          <h3 className="font-display text-base text-white">
            Key boosts active
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <BoostRow
            symbol="$PSG"
            count={3}
            multiplier={1.25}
            side="you"
          />
          <BoostRow
            symbol="$BAR"
            count={1}
            multiplier={1.18}
            side="you"
          />
          <BoostRow
            symbol="$JUV"
            count={2}
            multiplier={1.1}
            side="rival"
          />
          <BoostRow
            symbol="$CITY"
            count={1}
            multiplier={1.05}
            side="rival"
          />
        </div>
      </div>
    </>
  );
}

function SideHeader({
  handle,
  label,
  hue,
  align,
}: {
  handle: string;
  label: string;
  hue: number;
  align: 'left' | 'right';
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3',
        align === 'right' && 'flex-row-reverse text-right',
      )}
    >
      <Avatar initials={handle.slice(0, 2).toUpperCase()} hue={hue} size={48} />
      <div>
        <div className="font-display text-lg text-white leading-tight">
          {handle}
        </div>
        <div className="text-[11px] text-ink-300 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function SquadColumn({
  title,
  players: list,
  captainIdx,
  accent,
}: {
  title: string;
  players: Player[];
  captainIdx: number;
  accent?: boolean;
}) {
  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-base text-white">{title}</h3>
        <span className="font-mono text-xs text-ink-300">
          OVR{' '}
          {(list.reduce((a, p) => a + p.rating, 0) / list.length).toFixed(1)}
        </span>
      </div>
      <ul className="space-y-1.5">
        {list.map((p, i) => (
          <li
            key={p.id}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg border',
              accent
                ? 'border-accent/15 bg-accent/[0.03]'
                : 'border-white/[0.06] bg-white/[0.02]',
            )}
          >
            <PositionBadge position={p.position} />
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <span className="font-medium text-white truncate">
                {p.shortName}
              </span>
              {i === captainIdx && (
                <Crown size={12} className="text-gold shrink-0" />
              )}
            </div>
            <span className="font-mono text-xs text-ink-200">{p.rating}</span>
            {p.boost > 1.1 && (
              <span className="font-mono text-[10px] text-emerald">
                +{((p.boost - 1) * 100).toFixed(0)}%
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BoostRow({
  symbol,
  count,
  multiplier,
  side,
}: {
  symbol: string;
  count: number;
  multiplier: number;
  side: 'you' | 'rival';
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
      <span
        className={cn(
          'h-8 w-8 rounded-lg grid place-items-center font-mono text-[10px] font-semibold',
          side === 'you'
            ? 'bg-accent/15 text-accent'
            : 'bg-white/[0.05] text-ink-200',
        )}
      >
        {symbol.replace('$', '')}
      </span>
      <div className="flex-1 text-sm">
        <div className="text-ink-100">
          {count} player{count > 1 && 's'} · {symbol}
        </div>
        <div className="text-[11px] text-ink-300">
          {side === 'you' ? 'Your boost' : 'Rival boost'}
        </div>
      </div>
      <span className="font-mono text-sm text-emerald">
        +{((multiplier - 1) * 100).toFixed(0)}%
      </span>
    </div>
  );
}

function Settlement() {
  const { score, mvp, rewards, playerBreakdown, opponent } = settlement;
  const won = score.you > score.them;
  return (
    <>
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'surface p-7 lg:p-9 mb-5 relative overflow-hidden',
          won
            ? 'ring-1 ring-emerald/30'
            : 'ring-1 ring-crimson/30',
        )}
      >
        <div
          className={cn(
            'absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl opacity-30',
            won ? 'bg-emerald' : 'bg-crimson',
          )}
        />
        <div className="relative text-center">
          <div
            className={cn(
              'inline-flex items-center gap-2 pill !text-[11px] !py-1',
              won
                ? 'border-emerald/40 !bg-emerald/10 !text-emerald'
                : 'border-crimson/40 !bg-crimson/10 !text-crimson',
            )}
          >
            {won ? (
              <>
                <Trophy size={12} /> Victory
              </>
            ) : (
              'Defeat'
            )}
          </div>
          <div className="mt-4 flex items-center justify-center gap-8">
            <SideHeader
              handle="bruno.eth"
              label="You"
              hue={340}
              align="left"
            />
            <div className="text-center">
              <div className="font-display text-6xl lg:text-7xl text-white tracking-tighter leading-none">
                {score.you}
                <span className="text-ink-500 mx-2">·</span>
                {score.them}
              </div>
            </div>
            <SideHeader
              handle={opponent.handle}
              label="Rival"
              hue={opponent.avatarHue}
              align="right"
            />
          </div>

          <div className="mt-6 inline-flex flex-wrap items-center gap-2 justify-center">
            {rewards.map((r) => (
              <span
                key={r}
                className="pill !border-gold/30 !bg-gold/10 !text-gold"
              >
                <Sparkles size={11} /> {r}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <div className="surface p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-base text-white">
              Player breakdown
            </h3>
            <span className="text-[11px] text-ink-300">
              Base × boost = points
            </span>
          </div>
          <ul className="space-y-1.5">
            {playerBreakdown.map((row) => {
              const p = players.find((p) => p.id === row.playerId)!;
              const isMvp = row.playerId === mvp;
              return (
                <li
                  key={row.playerId}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-lg border',
                    isMvp
                      ? 'border-gold/30 bg-gold/[0.04]'
                      : 'border-white/[0.06] bg-white/[0.02]',
                  )}
                >
                  <PositionBadge position={p.position} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white truncate">
                        {p.shortName}
                      </span>
                      {isMvp && (
                        <span className="pill !border-gold/40 !bg-gold/10 !text-gold !text-[10px] !py-0">
                          <Star size={10} /> MVP
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-ink-300 mt-0.5">
                      {row.key}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-white">
                      {row.points.toFixed(1)}
                    </div>
                    <div className="font-mono text-[10px] text-ink-300">
                      {row.base} × {row.boost.toFixed(2)}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="surface p-5">
            <h3 className="font-display text-base text-white mb-3">
              League impact
            </h3>
            <div className="space-y-3 text-sm">
              <Row label="Position" value="↑ #5 (was #6)" tone="emerald" />
              <Row label="Points" value="+3 league pts" tone="emerald" />
              <Row label="Streak" value="3 wins" tone="emerald" />
              <Row label="Rating" value="+24 elo" tone="emerald" />
            </div>
          </div>
          <button className="w-full btn-primary py-3">
            <ChevronRight size={15} /> Open rewards
          </button>
          <button className="w-full btn-ghost py-3">
            Replay highlights
          </button>
        </div>
      </div>
    </>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'emerald' | 'crimson' | 'muted';
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-300">{label}</span>
      <span
        className={cn(
          'font-mono',
          tone === 'emerald'
            ? 'text-emerald'
            : tone === 'crimson'
              ? 'text-crimson'
              : 'text-ink-100',
        )}
      >
        {value}
      </span>
    </div>
  );
}
