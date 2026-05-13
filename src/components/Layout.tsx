import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  Trophy,
  Swords,
  Layers,
  Gift,
  UserCircle2,
  Sparkles,
  Bell,
  Search,
  Wallet,
} from 'lucide-react';
import { cn } from '../lib/cn';
import { userProfile, fanTokens } from '../data/mock';

const nav = [
  { to: '/squad', label: 'Pitch', icon: Layers },
  { to: '/rivals', label: 'Rivals', icon: Swords },
  { to: '/matchup', label: 'Matchup', icon: Sparkles },
  { to: '/leaderboard', label: 'League', icon: Trophy },
  { to: '/rewards', label: 'Rewards', icon: Gift },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
];

export default function Layout() {
  const totalBoost = fanTokens.reduce((m, t) => Math.max(m, t.boost), 1);
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-[240px] shrink-0 border-r border-white/[0.06] bg-ink-950/60 backdrop-blur-md flex-col">
        <Link
          to="/"
          className="flex items-center gap-2.5 px-6 py-6 border-b border-white/[0.06]"
        >
          <div className="relative h-9 w-9 grid place-items-center rounded-xl bg-accent shadow-glow">
            <Swords size={18} className="text-white" />
          </div>
          <div>
            <div className="font-display text-base font-semibold tracking-tight text-white leading-none">
              Squad Rivals
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-300 mt-1">
              by Socios
            </div>
          </div>
        </Link>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition',
                  isActive
                    ? 'bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]'
                    : 'text-ink-200 hover:text-white hover:bg-white/[0.03]',
                )
              }
            >
              <n.icon size={17} strokeWidth={2} />
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="m-3 surface-inset p-3">
          <div className="flex items-center justify-between">
            <span className="stat-label">Fan boost</span>
            <span className="text-xs font-mono text-emerald">+{((totalBoost - 1) * 100).toFixed(0)}%</span>
          </div>
          <div className="mt-2 space-y-1.5">
            {fanTokens.slice(0, 3).map((t) => (
              <div
                key={t.symbol}
                className="flex items-center justify-between text-xs"
              >
                <span className="font-mono text-ink-100">{t.symbol}</span>
                <span className="text-ink-300">{t.balance}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-ink-950/80 backdrop-blur-md border-b border-white/[0.06]">
          <div className="flex items-center gap-3 px-5 lg:px-8 py-3.5">
            <div className="relative flex-1 max-w-md">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300"
              />
              <input
                type="text"
                placeholder="Search players, rivals, clubs..."
                className="w-full pl-9 pr-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm placeholder:text-ink-400 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <button className="btn-ghost">
              <Wallet size={15} />
              <span className="hidden sm:inline">0x9F2…b41</span>
            </button>
            <button className="relative btn-ghost px-2.5">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>
            <Link
              to="/profile"
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-white/[0.04] transition"
            >
              <div
                className="h-8 w-8 rounded-full grid place-items-center text-xs font-semibold text-white"
                style={{ background: `hsl(${340} 65% 38%)` }}
              >
                BP
              </div>
              <span className="text-sm font-medium text-white hidden sm:inline">
                {userProfile.handle}
              </span>
            </Link>
          </div>
        </header>

        <div className="px-5 lg:px-8 py-6 lg:py-8 max-w-[1280px] mx-auto">
          <Outlet />
        </div>

        <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-ink-950/95 backdrop-blur border-t border-white/[0.06]">
          <div className="flex items-stretch justify-around">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    'flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium',
                    isActive ? 'text-white' : 'text-ink-300',
                  )
                }
              >
                <n.icon size={18} strokeWidth={2} />
                <span>{n.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="md:hidden h-16" aria-hidden />
      </main>
    </div>
  );
}
