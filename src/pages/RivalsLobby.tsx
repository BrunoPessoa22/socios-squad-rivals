import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Swords,
  Search,
  Eye,
  X,
  TrendingUp,
  ShieldHalf,
  Coins,
  ChevronRight,
} from 'lucide-react';
import { PageHeader, Avatar, FormPips, StatusDot } from '../components/ui';
import { cn } from '../lib/cn';
import { rivals } from '../data/mock';
import type { Rival } from '../data/types';

const stakeOptions = [10, 25, 50, 100];

export default function RivalsLobby() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'nearby' | 'top' | 'online'>(
    'all',
  );
  const [scouting, setScouting] = useState<Rival | null>(null);

  const filtered = useMemo(() => {
    let list = rivals;
    if (filter === 'online')
      list = list.filter((r) => r.status === 'online');
    if (filter === 'top') list = [...list].sort((a, b) => b.rating - a.rating);
    if (filter === 'nearby')
      list = list.filter((r) => Math.abs(r.rating - 1842) < 100);
    if (query)
      list = list.filter((r) =>
        r.handle.toLowerCase().includes(query.toLowerCase()),
      );
    return list;
  }, [filter, query]);

  return (
    <>
      <PageHeader
        eyebrow="Rivals"
        title="Find a match"
        subtitle="Scout opponents, set your stake, then challenge."
        right={
          <button className="btn-primary">
            <Swords size={14} /> Quick match
          </button>
        }
      />

      <div className="surface p-4 mb-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by handle..."
              className="w-full pl-9 pr-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm placeholder:text-ink-400 focus:outline-none focus:border-white/[0.12]"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {(['all', 'online', 'nearby', 'top'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-full font-medium transition',
                  filter === f
                    ? 'bg-accent text-white'
                    : 'bg-white/[0.04] text-ink-200 hover:bg-white/[0.07]',
                )}
              >
                {f === 'all'
                  ? 'All'
                  : f === 'online'
                    ? 'Online'
                    : f === 'nearby'
                      ? 'Near your rating'
                      : 'Top rated'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((r) => (
          <RivalCard key={r.id} rival={r} onScout={() => setScouting(r)} />
        ))}
      </div>

      <AnimatePresence>
        {scouting && (
          <ScoutDrawer rival={scouting} onClose={() => setScouting(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function RivalCard({ rival, onScout }: { rival: Rival; onScout: () => void }) {
  return (
    <div className="surface p-4 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <Avatar
          initials={rival.handle.slice(0, 2).toUpperCase()}
          hue={rival.avatarHue}
          size={44}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base text-white truncate">
              {rival.handle}
            </h3>
            <span className="pill text-[10px] !py-0 !px-1.5">
              #{rival.rank}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-xs text-ink-300">
              {rival.club}
            </span>
            <span className="text-ink-400">·</span>
            <StatusDot status={rival.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="surface-inset py-2">
          <div className="font-mono text-base text-white">{rival.rating}</div>
          <div className="stat-label !text-[9px] mt-0.5">Rating</div>
        </div>
        <div className="surface-inset py-2">
          <div className="font-mono text-base text-emerald">
            {Math.round(
              (rival.wins / (rival.wins + rival.losses + rival.draws)) * 100,
            )}
            %
          </div>
          <div className="stat-label !text-[9px] mt-0.5">Win rate</div>
        </div>
        <div className="surface-inset py-2">
          <div className="font-mono text-base text-white">
            {rival.squadStrength}
          </div>
          <div className="stat-label !text-[9px] mt-0.5">Squad</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-300">Recent form</span>
        <FormPips form={rival.recentForm} />
      </div>

      <div className="flex gap-2">
        <button onClick={onScout} className="flex-1 btn-ghost text-sm">
          <Eye size={14} /> Scout
        </button>
        <button className="flex-1 btn-primary text-sm">
          <Swords size={14} /> Challenge
        </button>
      </div>
    </div>
  );
}

function ScoutDrawer({
  rival,
  onClose,
}: {
  rival: Rival;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [stake, setStake] = useState(rival.stake);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-40 bg-ink-950/80 backdrop-blur-sm flex justify-end"
    >
      <motion.aside
        initial={{ x: 480 }}
        animate={{ x: 0 }}
        exit={{ x: 480 }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[460px] h-full bg-ink-900 border-l border-white/[0.06] overflow-y-auto"
      >
        <div className="sticky top-0 bg-ink-900/95 backdrop-blur border-b border-white/[0.06] px-5 py-4 flex items-center justify-between">
          <div className="stat-label text-accent">Scout report</div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] grid place-items-center"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5 py-6">
          <div className="flex items-center gap-4">
            <Avatar
              initials={rival.handle.slice(0, 2).toUpperCase()}
              hue={rival.avatarHue}
              size={56}
            />
            <div>
              <h2 className="h-display text-xl">{rival.handle}</h2>
              <div className="text-sm text-ink-300 mt-0.5">
                {rival.club} · Rank #{rival.rank} · Rating {rival.rating}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-200 italic">"{rival.bio}"</p>

          <div className="grid grid-cols-3 gap-2 mt-5">
            <ScoutStat
              label="Wins"
              value={rival.wins}
              tone="emerald"
            />
            <ScoutStat
              label="Draws"
              value={rival.draws}
              tone="muted"
            />
            <ScoutStat
              label="Losses"
              value={rival.losses}
              tone="crimson"
            />
          </div>

          <h3 className="mt-7 font-display text-base text-white">
            Strengths
          </h3>
          <ul className="mt-2 space-y-2 text-sm">
            <ScoutInsight
              icon={TrendingUp}
              label="Hot streak"
              value={`${rival.recentForm.filter((f) => f === 'W').length} wins in last 5`}
              tone="emerald"
            />
            <ScoutInsight
              icon={ShieldHalf}
              label="Top boost"
              value={`${rival.topToken} · primary fan token`}
              tone="white"
            />
            <ScoutInsight
              icon={Coins}
              label="Squad strength"
              value={`${rival.squadStrength} OVR · top 15%`}
              tone="white"
            />
          </ul>

          <h3 className="mt-7 font-display text-base text-white">
            Set your stake
          </h3>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {stakeOptions.map((s) => (
              <button
                key={s}
                onClick={() => setStake(s)}
                className={cn(
                  'py-2 rounded-lg border text-sm font-mono transition',
                  stake === s
                    ? 'border-accent/50 bg-accent/[0.08] text-white'
                    : 'border-white/[0.06] bg-white/[0.02] text-ink-200 hover:bg-white/[0.04]',
                )}
              >
                {s} $PSG
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-300">Pot</span>
              <span className="font-mono text-white">
                {stake * 2} $PSG
              </span>
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-ink-300">Predicted edge</span>
              <span className="font-mono text-emerald">+4.2 pts</span>
            </div>
          </div>

          <button
            className="mt-6 w-full btn-primary py-3"
            onClick={() => navigate('/matchup')}
          >
            <Swords size={15} /> Challenge {rival.handle}
            <ChevronRight size={15} />
          </button>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function ScoutStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'emerald' | 'crimson' | 'muted';
}) {
  const cls =
    tone === 'emerald'
      ? 'text-emerald'
      : tone === 'crimson'
        ? 'text-crimson'
        : 'text-ink-100';
  return (
    <div className="surface-inset p-3 text-center">
      <div className={cn('font-mono text-xl', cls)}>{value}</div>
      <div className="stat-label !text-[9px] mt-0.5">{label}</div>
    </div>
  );
}

function ScoutInsight({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  tone: 'emerald' | 'white' | 'muted';
}) {
  const iconCls = tone === 'emerald' ? 'text-emerald' : 'text-ink-100';
  return (
    <li className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
      <Icon size={15} className={iconCls} />
      <div className="flex-1 min-w-0">
        <div className="text-ink-100">{value}</div>
        <div className="text-[11px] text-ink-300">{label}</div>
      </div>
    </li>
  );
}
