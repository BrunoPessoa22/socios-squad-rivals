import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Sparkles,
  Trophy,
  X,
  Coins,
  Award,
  Lock,
  Check,
} from 'lucide-react';
import { PageHeader } from '../components/ui';
import { cn } from '../lib/cn';
import { packs, rewardHistory, tierLadder, userProfile } from '../data/mock';
import type { Pack } from '../data/types';

const tierMeta: Record<
  Pack['tier'],
  { color: string; bg: string; ring: string; label: string }
> = {
  bronze: {
    color: 'text-amber-600',
    bg: 'from-amber-700/40 to-amber-900/40',
    ring: 'ring-amber-700/40',
    label: 'Bronze',
  },
  silver: {
    color: 'text-slate-200',
    bg: 'from-slate-400/30 to-slate-700/40',
    ring: 'ring-slate-300/40',
    label: 'Silver',
  },
  gold: {
    color: 'text-gold',
    bg: 'from-yellow-500/30 to-amber-700/40',
    ring: 'ring-gold/40',
    label: 'Gold',
  },
  platinum: {
    color: 'text-cyan-200',
    bg: 'from-cyan-300/25 to-blue-700/30',
    ring: 'ring-cyan-300/40',
    label: 'Platinum',
  },
  diamond: {
    color: 'text-violet-200',
    bg: 'from-violet-400/30 to-fuchsia-700/30',
    ring: 'ring-violet-300/40',
    label: 'Diamond',
  },
};

export default function Rewards() {
  const [opening, setOpening] = useState<Pack | null>(null);
  const currentTier = tierLadder.find((t) => t.tier === userProfile.tier)!;
  const tierIdx = tierLadder.indexOf(currentTier);
  const progress =
    (userProfile.xp - currentTier.min) /
    (currentTier.max - currentTier.min);

  return (
    <>
      <PageHeader
        eyebrow="Rewards"
        title="Open packs. Climb tiers."
        subtitle="Every match feeds your tier. Tier unlocks better packs."
      />

      {/* Tier ladder */}
      <div className="surface p-5 lg:p-6 mb-5">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div>
            <div className="stat-label">Current tier</div>
            <div className="mt-1 flex items-baseline gap-3">
              <span
                className={cn(
                  'font-display text-2xl',
                  tierMeta[userProfile.tier].color,
                )}
              >
                {tierMeta[userProfile.tier].label}
              </span>
              <span className="text-sm text-ink-300 font-mono">
                {userProfile.xp.toLocaleString()} / {currentTier.max.toLocaleString()} XP
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="stat-label">To next tier</div>
            <div className="mt-1 font-display text-xl text-white">
              {(currentTier.max - userProfile.xp).toLocaleString()} XP
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 rounded-full bg-white/[0.04] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-gold"
          />
        </div>

        {/* Tier ladder */}
        <div className="mt-6 grid grid-cols-5 gap-2 lg:gap-3">
          {tierLadder.map((t, i) => {
            const m = tierMeta[t.tier];
            const reached = i <= tierIdx;
            const current = i === tierIdx;
            return (
              <div
                key={t.tier}
                className={cn(
                  'relative rounded-xl border p-3 lg:p-4 transition',
                  current
                    ? `border-white/20 bg-gradient-to-br ${m.bg} ring-1 ${m.ring}`
                    : reached
                      ? 'border-white/[0.06] bg-white/[0.02]'
                      : 'border-white/[0.04] bg-white/[0.01] opacity-50',
                )}
              >
                {current && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald shadow-[0_0_0_3px_rgba(34,201,138,0.2)]" />
                )}
                {!reached && (
                  <Lock
                    size={12}
                    className="absolute top-2.5 right-2.5 text-ink-400"
                  />
                )}
                <div className={cn('font-display text-sm', m.color)}>
                  {m.label}
                </div>
                <div className="mt-1 font-mono text-[10px] text-ink-300">
                  {t.min.toLocaleString()}+
                </div>
                <ul className="hidden lg:block mt-3 space-y-1">
                  {t.perks.slice(0, 2).map((p) => (
                    <li
                      key={p}
                      className="text-[10px] text-ink-200 flex items-start gap-1"
                    >
                      <Check
                        size={10}
                        className={cn(
                          'mt-0.5 shrink-0',
                          reached ? 'text-emerald' : 'text-ink-400',
                        )}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        {/* Pack inventory */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg text-white">Your packs</h2>
            <span className="text-xs text-ink-300">
              {packs.filter((p) => !p.opened).length} unopened
            </span>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {packs.map((p) => (
              <PackCard
                key={p.id}
                pack={p}
                onOpen={() => !p.opened && setOpening(p)}
              />
            ))}
          </div>
        </div>

        {/* History */}
        <aside className="surface p-5 h-fit">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-base text-white">
              Recent rewards
            </h3>
            <Trophy size={14} className="text-gold" />
          </div>
          <ul className="space-y-2.5">
            {rewardHistory.map((r) => (
              <li key={r.id} className="flex items-start gap-3">
                <span
                  className={cn(
                    'h-8 w-8 rounded-lg shrink-0 grid place-items-center',
                    r.type === 'pack'
                      ? 'bg-gold/15 text-gold'
                      : r.type === 'token'
                        ? 'bg-emerald/15 text-emerald'
                        : r.type === 'xp'
                          ? 'bg-accent/15 text-accent'
                          : 'bg-white/[0.05] text-ink-200',
                  )}
                >
                  {r.type === 'pack' ? (
                    <Gift size={14} />
                  ) : r.type === 'token' ? (
                    <Coins size={14} />
                  ) : r.type === 'badge' ? (
                    <Award size={14} />
                  ) : (
                    <Sparkles size={14} />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white">{r.label}</div>
                  <div className="text-[11px] text-ink-300 mt-0.5">
                    {r.value}
                    {r.matchup && ` · ${r.matchup}`}
                  </div>
                </div>
                <div className="text-[11px] text-ink-300 shrink-0">
                  {r.date}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <AnimatePresence>
        {opening && (
          <OpenPackModal pack={opening} onClose={() => setOpening(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function PackCard({ pack, onOpen }: { pack: Pack; onOpen: () => void }) {
  const m = tierMeta[pack.tier];
  return (
    <div
      className={cn(
        'surface p-5 relative overflow-hidden group transition-transform',
        !pack.opened && 'cursor-pointer hover:-translate-y-0.5',
        pack.opened && 'opacity-60',
      )}
      onClick={() => !pack.opened && onOpen()}
    >
      <div
        className={cn(
          'absolute -top-20 -right-20 h-44 w-44 rounded-full blur-3xl bg-gradient-to-br',
          m.bg,
        )}
      />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className={cn('stat-label', m.color)}>{m.label}</div>
          {pack.opened ? (
            <span className="pill !text-[10px] !py-0 !px-1.5 !bg-white/[0.04]">
              Opened
            </span>
          ) : (
            <Sparkles size={14} className={m.color} />
          )}
        </div>
        <h3 className="mt-1 font-display text-lg text-white">{pack.name}</h3>
        <p className="mt-1 text-xs text-ink-200">{pack.contents}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] text-ink-300">{pack.acquired}</span>
          {!pack.opened && (
            <span className="text-xs font-medium text-white inline-flex items-center gap-1 group-hover:text-accent transition">
              Open <Gift size={13} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function OpenPackModal({
  pack,
  onClose,
}: {
  pack: Pack;
  onClose: () => void;
}) {
  const m = tierMeta[pack.tier];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-40 bg-ink-950/85 backdrop-blur-md grid place-items-center p-6"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative surface p-8 w-full max-w-md text-center overflow-hidden ring-1',
          m.ring,
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 grid place-items-center rounded-lg hover:bg-white/[0.05]"
        >
          <X size={15} />
        </button>
        <div
          className={cn(
            'absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl bg-gradient-to-br opacity-50',
            m.bg,
          )}
        />
        <div className="relative">
          <div className={cn('stat-label', m.color)}>{m.label} pack</div>
          <h3 className="mt-2 h-display text-2xl">{pack.name}</h3>

          <motion.div
            animate={{ rotate: [0, -3, 3, -2, 2, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}
            className={cn(
              'mt-8 mx-auto h-44 w-32 rounded-xl bg-gradient-to-br grid place-items-center',
              m.bg,
            )}
          >
            <Gift size={50} className={m.color} />
          </motion.div>

          <p className="mt-6 text-sm text-ink-200">{pack.contents}</p>

          <button className="mt-6 w-full btn-primary py-3">
            <Sparkles size={15} /> Reveal contents
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
