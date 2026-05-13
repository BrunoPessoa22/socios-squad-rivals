import { Link, useLocation } from 'react-router-dom';
import { Swords } from 'lucide-react';

export default function TopBar() {
  const loc = useLocation();
  const onPlay = loc.pathname === '/play';
  return (
    <header className="sticky top-0 z-20 bg-black/85 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 grid place-items-center rounded-md bg-white text-black">
            <Swords size={14} strokeWidth={2.5} />
          </div>
          <span className="font-body font-extrabold tracking-tight text-white text-[13px] uppercase">
            Squad Rivals
          </span>
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-[12px] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-cobalt animate-pulse" />
          <span>
            Matchday 1 · locks in{' '}
            <span className="font-mono text-white/85">28d 21h 19m</span>
          </span>
        </div>
        <div className="flex items-center">
          {!onPlay ? (
            <Link to="/play" className="btn-sm bg-cobalt text-white">
              Sign in to play
            </Link>
          ) : (
            <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/[0.04]">
              <div
                className="h-7 w-7 rounded-full grid place-items-center text-[11px] font-bold text-white"
                style={{ background: 'hsl(340 65% 38%)' }}
              >
                BP
              </div>
              <span className="text-[13px] text-white/85 hidden sm:inline">bruno</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
