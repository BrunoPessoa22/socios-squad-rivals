import { useMemo, useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  TrendingDown,
  Flame,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader, FormPips } from '../components/ui';
import { cn } from '../lib/cn';
import { leaderboard } from '../data/mock';

const DIVISIONS = ['D1 · Diamond', 'D2 · Platinum', 'D3 · Gold', 'D4 · Silver'];

export default function Leaderboard() {
  const [division, setDivision] = useState(2);

  const sorted = useMemo(
    () => [...leaderboard].sort((a, b) => a.rank - b.rank),
    [],
  );
  const user = sorted.find((r) => r.isUser)!;
  const userIdx = sorted.indexOf(user);
  const above = sorted[userIdx - 1];
  const pointsToPromotion = sorted[2].points - user.points + 1;
  const inPromotionZone = user.rank <= 3;
  const inRelegationZone = user.rank > sorted.length - 3;

  return (
    <>
      <PageHeader
        eyebrow="League"
        title={DIVISIONS[division]}
        subtitle="Top 3 promote · Bottom 3 relegate · Season ends in 6 matchdays."
        right={
          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {DIVISIONS.map((d, i) => (
              <button
                key={d}
                onClick={() => setDivision(i)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap',
                  division === i
                    ? 'bg-accent text-white shadow-glow'
                    : 'text-ink-200 hover:text-white',
                )}
              >
                {d.split(' · ')[0]}
              </button>
            ))}
          </div>
        }
      />

      {/* Tension banner */}
      <div
        className={cn(
          'surface p-5 mb-5 flex flex-wrap items-center gap-5 relative overflow-hidden',
          inPromotionZone
            ? 'ring-1 ring-emerald/30'
            : inRelegationZone
              ? 'ring-1 ring-crimson/30'
              : '',
        )}
      >
        <div
          className={cn(
            'absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl opacity-20',
            inPromotionZone
              ? 'bg-emerald'
              : inRelegationZone
                ? 'bg-crimson'
                : 'bg-accent',
          )}
        />
        <div className="relative">
          <div className="stat-label text-accent">Your position</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-3xl text-white">
              #{user.rank}
            </span>
            <span className="text-ink-300 text-sm">of {sorted.length}</span>
          </div>
        </div>
        <div className="hidden lg:block h-12 w-px bg-white/[0.06]" />
        <div className="relative">
          <div className="stat-label">To promotion</div>
          <div className="mt-1 font-display text-2xl text-emerald">
            {pointsToPromotion > 0 ? `${pointsToPromotion} pts` : 'Locked in'}
          </div>
        </div>
        <div className="hidden sm:block h-12 w-px bg-white/[0.06]" />
        <div className="relative">
          <div className="stat-label">Above you</div>
          <div className="mt-1 text-sm text-ink-100">
            <span className="font-mono">{above?.handle}</span> ·
            <span className="font-mono text-ink-300 ml-1">
              {above ? above.points - user.points : 0}
            </span>{' '}
            ahead
          </div>
        </div>
        <div className="relative ml-auto">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-accent" />
            <span className="font-mono text-sm text-white">3-game streak</span>
          </div>
          <div className="text-[11px] text-ink-300 mt-1">
            Win 2 more for surge bonus
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="surface overflow-hidden">
        <div className="hidden sm:grid grid-cols-[60px_1fr_60px_60px_60px_70px_100px_50px] gap-3 px-5 py-3 stat-label border-b border-white/[0.06] bg-white/[0.02]">
          <div>Rank</div>
          <div>Player</div>
          <div className="text-center">P</div>
          <div className="text-center">W</div>
          <div className="text-center">L</div>
          <div className="text-right">Pts</div>
          <div>Form</div>
          <div className="text-center">±</div>
        </div>

        <ul>
          {sorted.map((row, i) => {
            const promotion = row.rank <= 3;
            const relegation = row.rank > sorted.length - 3;
            const showPromotionDivider = i === 3;
            const showRelegationDivider = i === sorted.length - 3;
            return (
              <div key={row.rank}>
                {showPromotionDivider && <ZoneDivider type="promotion" />}
                {showRelegationDivider && <ZoneDivider type="relegation" />}
                <li
                  className={cn(
                    'sm:grid sm:grid-cols-[60px_1fr_60px_60px_60px_70px_100px_50px] gap-3 px-5 py-3.5 items-center border-b border-white/[0.04] transition-colors',
                    row.isUser
                      ? 'bg-accent/[0.05] ring-1 ring-inset ring-accent/30'
                      : 'hover:bg-white/[0.02]',
                  )}
                >
                  {/* Rank */}
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'h-7 w-7 rounded-lg grid place-items-center font-display text-sm font-bold',
                        promotion
                          ? 'bg-emerald/15 text-emerald'
                          : relegation
                            ? 'bg-crimson/15 text-crimson'
                            : 'bg-white/[0.04] text-ink-200',
                      )}
                    >
                      {row.rank}
                    </span>
                  </div>
                  {/* Player */}
                  <div className="min-w-0 mt-1.5 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'font-medium truncate',
                          row.isUser ? 'text-white' : 'text-ink-100',
                        )}
                      >
                        {row.handle}
                      </span>
                      {row.isUser && (
                        <span className="pill !text-[9px] !py-0 !px-1.5 !border-accent/40 !text-accent !bg-accent/10">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-ink-300 font-mono">
                      {row.club}
                    </div>
                  </div>
                  {/* Stats */}
                  <div className="hidden sm:block text-center font-mono text-sm text-ink-200">
                    {row.played}
                  </div>
                  <div className="hidden sm:block text-center font-mono text-sm text-emerald">
                    {row.won}
                  </div>
                  <div className="hidden sm:block text-center font-mono text-sm text-crimson">
                    {row.lost}
                  </div>
                  <div className="hidden sm:block text-right font-display text-base text-white">
                    {row.points}
                  </div>
                  <div className="hidden sm:flex items-center">
                    <FormPips form={row.form} />
                  </div>
                  <div className="hidden sm:flex items-center justify-center">
                    <Movement n={row.movement} />
                  </div>

                  {/* mobile inline stats */}
                  <div className="sm:hidden mt-2 flex items-center gap-3 text-xs text-ink-300">
                    <span>
                      <span className="font-mono text-white">{row.points}</span>{' '}
                      pts
                    </span>
                    <span>
                      <span className="font-mono text-emerald">{row.won}</span>{' '}
                      W
                    </span>
                    <span>
                      <span className="font-mono text-crimson">{row.lost}</span>{' '}
                      L
                    </span>
                    <FormPips form={row.form} />
                    <Movement n={row.movement} />
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function Movement({ n }: { n: number }) {
  if (n > 0)
    return (
      <span className="inline-flex items-center gap-0.5 font-mono text-xs text-emerald">
        <ArrowUp size={12} /> {n}
      </span>
    );
  if (n < 0)
    return (
      <span className="inline-flex items-center gap-0.5 font-mono text-xs text-crimson">
        <ArrowDown size={12} /> {Math.abs(n)}
      </span>
    );
  return (
    <span className="inline-flex items-center font-mono text-xs text-ink-400">
      <Minus size={12} />
    </span>
  );
}

function ZoneDivider({ type }: { type: 'promotion' | 'relegation' }) {
  const Icon = type === 'promotion' ? TrendingUp : TrendingDown;
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-5 py-2 text-[10px] uppercase tracking-[0.18em] font-medium border-b',
        type === 'promotion'
          ? 'bg-emerald/[0.06] text-emerald border-emerald/20'
          : 'bg-crimson/[0.06] text-crimson border-crimson/20',
      )}
    >
      <Icon size={11} />
      {type === 'promotion' ? 'Promotion zone — top 3' : 'Relegation zone — bottom 3'}
      {type === 'relegation' && (
        <AlertTriangle size={11} className="ml-auto opacity-70" />
      )}
    </div>
  );
}
