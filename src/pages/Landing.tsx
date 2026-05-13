import { Link } from 'react-router-dom';
import { ArrowRight, Lock, Shield, Mail } from 'lucide-react';
import TopBar from '../components/TopBar';
import { tactics } from '../data/mock';

const heroCards = [
  { code: 'POR', name: 'Portugal',  rating: 88, flag: '🇵🇹', stripe: '#4561ff' },
  { code: 'ARG', name: 'Argentina', rating: 92, flag: '🇦🇷', stripe: '#75AADB' },
  { code: 'BRA', name: 'Brazil',    rating: 91, flag: '🇧🇷', stripe: '#fcd34d' },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      <TopBar />

      {/* HERO */}
      <section className="px-6 pt-6 pb-10">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_440px] gap-8 items-center">
          <div className="max-w-[460px]">
            <h1 className="font-display font-extrabold text-white text-[48px] leading-[0.95] tracking-[-0.01em]">
              Five teams.<br />
              One tactic.<br />
              <span className="gradient-crush">Crush your rivals.</span>
            </h1>
            <p className="mt-5 text-[15px] leading-[1.625] text-white/55">
              Async PVP fan-token strategy. Build a squad before each
              matchday, pick a tactic, and challenge other fans. No wagering.
              No seed phrases. Just the game.
            </p>
            <div className="mt-7 flex items-center gap-4 flex-wrap">
              <Link to="/play" className="btn-primary">
                Sign in to play <ArrowRight size={16} />
              </Link>
              <a
                href="#how"
                className="text-[14px] text-white/70 hover:text-white transition"
              >
                How it works →
              </a>
            </div>
          </div>

          {/* Hero pitch + cards */}
          <div
            className="relative aspect-[5/6] sm:aspect-[5/5.4] rounded-3xl overflow-hidden"
            style={{
              background:
                'linear-gradient(180deg, #0d3b22 0%, #0a2e1b 60%, #052013 100%)',
            }}
          >
            <PitchMarkings />
            <HeroCard {...heroCards[0]} className="absolute top-[14%] left-[16%]" />
            <HeroCard {...heroCards[1]} className="absolute top-[34%] right-[12%] z-10" highlighted />
            <HeroCard {...heroCards[2]} className="absolute bottom-[12%] left-[28%]" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 pb-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="stat-label">The game</div>
          <h2 className="font-display text-h2 text-white mt-1">A weekly loop.</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-3">
            <Step n={1} title="Build your squad" body="Pick five teams. Crown a captain (×2 points). Activate fan tokens for a +10% bonus per token." />
            <Step n={2} title="Challenge a rival" body="Three free tickets per matchday. Squads lock at kickoff. Real match results decide who wins." />
            <Step n={3} title="Climb the divisions" body="Points convert to fans (×100). Best 10 challenges count toward the weekly board. Top 5 promote." />
          </div>
        </div>
      </section>

      {/* SCORING */}
      <section className="px-6 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="stat-label">Scoring</div>
          <h2 className="font-display text-h2 text-white mt-1">What earns points.</h2>
          <p className="mt-3 text-[13px] text-white/50 max-w-md">
            Each slot scores from its team's real match — four components,
            added up. The captain doubles. Tactic and active tokens layer on
            bonuses.
          </p>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <ScoreCard value="+10 / +4 / 0" label="Match result" sub="Win · draw · loss" />
            <ScoreCard value="+4 → +10" label="Goals scored" sub="By goal-range band" />
            <ScoreCard value="+6" label="Clean sheet" sub="Concede zero" />
            <ScoreCard value="+5" label="Early opener" sub="Score in first 15′" />
          </div>
        </div>
      </section>

      {/* TACTICS */}
      <section className="px-6 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="stat-label">Tactics</div>
          <h2 className="font-display text-h2 text-white mt-1">Six ways to play.</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {tactics.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4"
              >
                <div className="font-display font-extrabold text-white text-[15px]">
                  {t.name}
                </div>
                <div className="mt-1 text-[12px] text-white/50">{t.tagline}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER STRIP */}
      <section className="px-6 pb-10">
        <div className="max-w-[1200px] mx-auto grid sm:grid-cols-3 gap-3">
          <Foot icon={Lock} title="No wagering" body="Tokens stay yours" />
          <Foot icon={Shield} title="On Chiliz" body="Native chain" />
          <Foot icon={Mail} title="No seed phrase" body="Email or Google" />
        </div>
        <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-white/[0.06] text-[11px] text-white/40 text-center">
          Socios Squad Rivals · Powered by Socios.com · Chiliz Chain
        </div>
      </section>
    </div>
  );
}

function PitchMarkings() {
  return (
    <svg
      viewBox="0 0 100 120"
      className="absolute inset-0 w-full h-full opacity-25"
      preserveAspectRatio="none"
    >
      <rect x="2" y="2" width="96" height="116" fill="none" stroke="white" strokeWidth="0.3" />
      <line x1="2" y1="60" x2="98" y2="60" stroke="white" strokeWidth="0.3" />
      <circle cx="50" cy="60" r="8" fill="none" stroke="white" strokeWidth="0.3" />
      <circle cx="50" cy="60" r="0.6" fill="white" />
      <rect x="28" y="2" width="44" height="14" fill="none" stroke="white" strokeWidth="0.3" />
      <rect x="28" y="104" width="44" height="14" fill="none" stroke="white" strokeWidth="0.3" />
    </svg>
  );
}

function HeroCard({
  code,
  name,
  rating,
  flag,
  stripe,
  className,
  highlighted,
}: {
  code: string;
  name: string;
  rating: number;
  flag: string;
  stripe: string;
  className?: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`${className} relative overflow-hidden`}
      style={{
        width: 112,
        height: 152,
        background: 'rgba(255,255,255,0.055)',
        borderRadius: 32,
        border: highlighted ? `1px solid ${stripe}80` : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: stripe }}
      />
      <div className="relative flex items-start justify-between px-2.5 pt-2.5">
        <div className="font-body font-extrabold tracking-tight text-[24px] text-gold-400 leading-none">
          {rating}
        </div>
        <span className="text-[18px]">{flag}</span>
      </div>
      <div className="absolute inset-x-0 bottom-2.5 text-center">
        <div className="font-body font-extrabold text-white text-[18px] tracking-tight leading-none">
          {code}
        </div>
        <div className="mt-1 text-[10px] text-white/55">{name}</div>
      </div>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-5">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-mono text-white/40">0{n}</span>
        <span className="h-px flex-1 bg-white/[0.08]" />
      </div>
      <h3 className="mt-3 font-display text-h3 text-white">{title}</h3>
      <p className="mt-2 text-[13px] leading-[1.55] text-white/50">{body}</p>
    </div>
  );
}

function ScoreCard({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
      <div className="font-display font-extrabold text-white text-[20px] leading-none">
        {value}
      </div>
      <div className="mt-3 text-[13px] text-white/85 font-semibold">{label}</div>
      <div className="mt-0.5 text-[11px] text-white/45">{sub}</div>
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
      <div className="h-8 w-8 rounded-lg bg-white/[0.04] grid place-items-center">
        <Icon size={14} className="text-white/70" />
      </div>
      <div>
        <div className="text-white text-[13px] font-semibold">{title}</div>
        <div className="text-[11px] text-white/45">{body}</div>
      </div>
    </div>
  );
}
