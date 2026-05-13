import { Link, useLocation } from 'react-router-dom';
import { Swords } from 'lucide-react';
import { cn } from '../lib/cn';

export default function TopBar({ onSignIn }: { onSignIn?: () => void }) {
  const loc = useLocation();
  return (
    <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-7 w-7 grid place-items-center rounded-md bg-white text-black">
            <Swords size={15} strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold tracking-tight text-white text-sm uppercase">
            Squad Rivals
          </span>
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-ink-300">
          <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
          <span>
            <span className="text-ink-200">Matchday 1</span> · locks in{' '}
            <span className="font-mono text-white">28d 21h 19m</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {loc.pathname !== '/play' && (
            <Link to="/play" className="btn-primary text-sm">
              Sign in to play
            </Link>
          )}
          {loc.pathname === '/play' && (
            <button
              onClick={onSignIn}
              className={cn(
                'flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-white/[0.04] transition',
              )}
            >
              <div
                className="h-7 w-7 rounded-full grid place-items-center text-[11px] font-semibold text-white"
                style={{ background: 'hsl(340 65% 38%)' }}
              >
                BP
              </div>
              <span className="text-sm text-white hidden sm:inline">bruno</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
