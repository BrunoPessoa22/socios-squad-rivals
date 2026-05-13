import {
  Trophy,
  Award,
  Flame,
  Calendar,
  Wallet,
  TrendingUp,
  Share2,
  Edit3,
} from 'lucide-react';
import { PageHeader, Avatar, Stat } from '../components/ui';
import { cn } from '../lib/cn';
import { fanTokens, userProfile } from '../data/mock';

const tierColor: Record<string, string> = {
  bronze: 'text-amber-600',
  silver: 'text-slate-200',
  gold: 'text-gold',
  platinum: 'text-cyan-200',
  diamond: 'text-violet-200',
};

export default function Profile() {
  const u = userProfile;
  const winRate = Math.round((u.matches.won / u.matches.played) * 100);
  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title={u.handle}
        subtitle={`${u.club} fan · joined ${u.joined} · tier ${u.tier}`}
        right={
          <>
            <button className="btn-ghost">
              <Share2 size={14} /> Share
            </button>
            <button className="btn-ghost">
              <Edit3 size={14} /> Edit
            </button>
          </>
        }
      />

      {/* Hero card */}
      <div className="surface p-6 lg:p-8 mb-5 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl bg-accent/20" />
        <div className="relative flex flex-wrap items-start gap-6">
          <Avatar
            initials="BP"
            hue={340}
            size={96}
          />
          <div className="flex-1 min-w-[260px]">
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
              <span className={cn('font-medium', tierColor[u.tier])}>
                {u.tier} tier
              </span>
              <span className="text-ink-400">·</span>
              <span className="text-ink-300">Division 2</span>
              <span className="text-ink-400">·</span>
              <span className="text-emerald font-mono normal-case">
                +3 this week
              </span>
            </div>
            <h2 className="mt-1 h-display text-3xl">{u.displayName}</h2>
            <div className="mt-1 font-mono text-sm text-ink-300">
              {u.handle}
            </div>
            <p className="mt-3 text-sm text-ink-200 max-w-md">
              Country manager Brazil at Socios. Sports x AI x Blockchain.
              Currently chasing the D1 promotion.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-[240px]">
            <MiniStat label="Total points" value={u.totalPoints.toLocaleString()} />
            <MiniStat label="Win rate" value={`${winRate}%`} tone="emerald" />
            <MiniStat label="Streak" value={`${u.longestStreak} W`} tone="emerald" />
            <MiniStat label="Matches" value={u.matches.played} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        <div className="space-y-5">
          {/* Form stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat
              label="Won"
              value={u.matches.won}
              hint="+2 vs last season"
              trend="up"
            />
            <Stat
              label="Drawn"
              value={u.matches.drawn}
              hint="—"
            />
            <Stat
              label="Lost"
              value={u.matches.lost}
              hint="−1 vs last season"
              trend="up"
            />
            <Stat
              label="XP"
              value={u.xp.toLocaleString()}
              hint={`${(u.nextTierXp - u.xp).toLocaleString()} to platinum`}
            />
          </div>

          {/* Recent matches */}
          <div className="surface p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-base text-white">
                Recent matches
              </h3>
              <button className="text-xs text-ink-300 hover:text-white">
                See all →
              </button>
            </div>
            <ul className="space-y-1.5">
              {u.recentMatches.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02]"
                >
                  <span
                    className={cn(
                      'h-7 w-7 grid place-items-center rounded-lg font-display text-xs font-bold',
                      m.result === 'W'
                        ? 'bg-emerald/15 text-emerald'
                        : m.result === 'L'
                          ? 'bg-crimson/15 text-crimson'
                          : 'bg-ink-400/15 text-ink-200',
                    )}
                  >
                    {m.result}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white">
                      vs <span className="font-mono">{m.opponent}</span>
                    </div>
                    <div className="text-[11px] text-ink-300 mt-0.5 flex items-center gap-1">
                      <Calendar size={10} /> {m.date}
                    </div>
                  </div>
                  <span className="font-mono text-sm text-ink-100">
                    {m.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trophy cabinet */}
          <div className="surface p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base text-white">
                Trophy cabinet
              </h3>
              <Trophy size={14} className="text-gold" />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {u.trophies.map((t) => (
                <div
                  key={t.id}
                  className="surface-inset p-4 text-center relative overflow-hidden"
                >
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-24 rounded-full bg-gold/10 blur-2xl" />
                  <div className="relative">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gold/15 grid place-items-center">
                      <Award size={20} className="text-gold" />
                    </div>
                    <div className="mt-3 font-medium text-white text-sm">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-ink-300 mt-1">
                      {t.issued}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          {/* Wallet */}
          <div className="surface p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-base text-white">Wallet</h3>
              <Wallet size={14} className="text-ink-300" />
            </div>
            <div className="text-[11px] font-mono text-ink-300">0x9F2…b41</div>
            <ul className="mt-3 space-y-2">
              {fanTokens.map((t) => (
                <li
                  key={t.symbol}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-7 w-7 rounded-lg bg-white/[0.04] grid place-items-center font-mono text-[10px] text-ink-100">
                      {t.symbol.replace('$', '')}
                    </span>
                    <span className="text-ink-100">{t.symbol}</span>
                  </span>
                  <div className="text-right">
                    <div className="font-mono text-white">{t.balance}</div>
                    <div className="font-mono text-[10px] text-emerald">
                      +{((t.boost - 1) * 100).toFixed(0)}%
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Activity insight */}
          <div className="surface p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-emerald" />
              <h3 className="font-display text-base text-white">
                Form trend
              </h3>
            </div>
            <p className="text-sm text-ink-200 leading-relaxed">
              Up <span className="text-emerald font-mono">+24 elo</span> in
              your last 5 matches. Your win rate against{' '}
              <span className="font-mono">$PSG</span>-heavy squads is{' '}
              <span className="text-white font-mono">72%</span>.
            </p>
          </div>

          {/* Streak */}
          <div className="surface p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-accent/15 grid place-items-center">
              <Flame size={20} className="text-accent" />
            </div>
            <div>
              <div className="font-display text-xl text-white">3-game streak</div>
              <div className="text-xs text-ink-300 mt-0.5">
                Win 2 more for the Hot Streak badge
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone?: 'emerald';
}) {
  return (
    <div className="surface-inset p-3">
      <div className="stat-label">{label}</div>
      <div
        className={cn(
          'mt-1 font-display text-xl tracking-tight',
          tone === 'emerald' ? 'text-emerald' : 'text-white',
        )}
      >
        {value}
      </div>
    </div>
  );
}
