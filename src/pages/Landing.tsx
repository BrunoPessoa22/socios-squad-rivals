import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Lock,
  Shield,
  Mail,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { tactics, teams } from '../data/mock';

const heroTeams = teams.filter((t) =>
  ['arg', 'por', 'bra'].includes(t.id),
);

export default function Landing() {
  return (
    <div className="min-h-screen">
      <TopBar />

      {/* Hero */}
      <section className="px-5 lg:px-8 pt-12 lg:pt-20 pb-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
          <div>
            <h1 className="font-display font-black text-white text-[44px] sm:text-[58px] lg:text-[72px] leading-[0.95] tracking-[-0.03em]">
              Five teams.
              <br />
              One tactic.
              <br />
              <span className="text-accent">Crush your rivals.</span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] text-ink-200 leading-relaxed">
              Async PVP fan-token strategy. Build a squad before each
              matchday, pick a tactic, and challenge other fans. No wagering.
              No seed phrases. Just the game.
            </p>
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <Link to="/play" className="btn-primary">
                Sign in to play <ArrowRight size={14} />
              </Link>
              <a
                href="#how"
                className="btn-ghost"
              >
                How it works →
              </a>
            </div>
          </div>

          {/* 3 team cards floating over pitch */}
          <div className="relative aspect-[5/6] sm:aspect-[5/5] rounded-2xl overflow-hidden border border-white/[0.07]"
            style={{
              background:
                'linear-gradient(180deg, #0d3b22 0%, #0a2e1b 60%, #052013 100%)',
            }}
          >
            <div className="absolute inset-0 bg-pitch-stripes" />
            {/* pitch markings */}
            <svg
              viewBox="0 0 100 120"
              className="absolute inset-0 w-full h-full opacity-30"
              preserveAspectRatio="none"
            >
              <rect x="2" y="2" width="96" height="116" fill="none" stroke="white" strokeWidth="0.3" />
              <line x1="2" y1="60" x2="98" y2="60" stroke="white" strokeWidth="0.3" />
              <circle cx="50" cy="60" r="8" fill="none" stroke="white" strokeWidth="0.3" />
              <rect x="28" y="2" width="44" height="14" fill="none" stroke="white" strokeWidth="0.3" />
              <rect x="28" y="104" width="44" height="14" fill="none" stroke="white" strokeWidth="0.3" />
            </svg>

            <TeamCard team={heroTeams[1]} className="absolute top-[12%] left-[18%]" />
            <TeamCard team={heroTeams[0]} className="absolute top-[36%] right-[10%] z-10" big />
            <TeamCard team={heroTeams[2]} className="absolute bottom-[10%] left-[24%]" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-5 lg:px-8 py-16 lg:py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="stat-label text-ink-300">The game</div>
          <h2 className="h-display text-3xl lg:text-5xl mt-2">A weekly loop.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <Step n={1} title="Build your squad" body="Pick five teams. Crown a captain (×2 points). Activate fan tokens for a +10% bonus per token." />
            <Step n={2} title="Challenge a rival" body="Three free tickets per matchday. Squads lock at kickoff. Real match results decide who wins." />
            <Step n={3} title="Climb the divisions" body="Points convert to fans (×100). Best 10 challenges count toward the weekly board. Top 5 promote." />
          </div>
        </div>
      </section>

      {/* Scoring */}
      <section className="px-5 lg:px-8 py-16 lg:py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="stat-label text-ink-300">Scoring</div>
          <h2 className="h-display text-3xl lg:text-5xl mt-2">What earns points.</h2>
          <p className="mt-3 max-w-2xl text-ink-200 text-[15px]">
            Each slot scores from its team's real match — four components, added up. The captain doubles. Tactic and active tokens layer on bonuses.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Score value="+10 / +4 / 0" label="Match result · win / draw / loss" />
            <Score value="+4 → +10" label="Goals scored · by band" />
            <Score value="+6" label="Clean sheet · concede zero" />
            <Score value="+5" label="Early opener · score in first 15′" />
          </div>
        </div>
      </section>

      {/* Tactics */}
      <section className="px-5 lg:px-8 py-16 lg:py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="stat-label text-ink-300">Tactics</div>
          <h2 className="h-display text-3xl lg:text-5xl mt-2">Six ways to play.</h2>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {tactics.map((t) => (
              <div
                key={t.id}
                className="surface p-4"
              >
                <div className="font-display font-bold text-white text-base">
                  {t.name}
                </div>
                <div className="mt-1 text-[11px] text-ink-300">{t.tagline}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="px-5 lg:px-8 py-12 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-4 text-sm text-ink-300">
          <Foot icon={Lock} title="No wagering" body="Tokens stay yours" />
          <Foot icon={Shield} title="On Chiliz" body="Native chain" />
          <Foot icon={Mail} title="No seed phrase" body="Email or Google" />
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-white/[0.04] text-[11px] text-ink-400 text-center">
          Socios Squad Rivals · Powered by Socios.com · Chiliz Chain
        </div>
      </footer>
    </div>
  );
}

function TeamCard({
  team,
  className,
  big,
}: {
  team: typeof teams[number];
  className?: string;
  big?: boolean;
}) {
  return (
    <div
      className={`${className} rounded-xl border border-white/[0.1] bg-black/40 backdrop-blur-sm px-3 py-2.5 text-center shadow-lg`}
      style={{ minWidth: big ? 110 : 90 }}
    >
      <div className={`font-display font-black text-white ${big ? 'text-3xl' : 'text-2xl'} leading-none`}>
        {team.rating}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink-300">
        {team.code}
      </div>
      <div className="mt-1.5 flex items-center justify-center gap-1 text-[11px] text-ink-100">
        <span>{team.flag}</span>
        <span>{team.name}</span>
      </div>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="surface p-5">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-mono text-ink-300">0{n}</span>
        <span className="h-px flex-1 bg-white/[0.08]" />
      </div>
      <h3 className="mt-4 font-display font-bold text-white text-lg">{title}</h3>
      <p className="mt-2 text-sm text-ink-200 leading-relaxed">{body}</p>
    </div>
  );
}

function Score({ value, label }: { value: string; label: string }) {
  return (
    <div className="surface p-4">
      <div className="font-display font-bold text-white text-lg">{value}</div>
      <div className="mt-1.5 text-xs text-ink-300">{label}</div>
    </div>
  );
}

function Foot({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-lg bg-white/[0.04] grid place-items-center">
        <Icon size={16} className="text-electric" />
      </div>
      <div>
        <div className="text-white font-medium text-sm">{title}</div>
        <div className="text-xs text-ink-300">{body}</div>
      </div>
    </div>
  );
}
