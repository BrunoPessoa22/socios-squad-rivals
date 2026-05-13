import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronRight,
  Wallet,
  Coins,
  Users,
  Sparkles,
  Swords,
} from 'lucide-react';
import { fanTokens, players, suggestedSquad } from '../data/mock';
import { cn } from '../lib/cn';
import { PositionBadge } from '../components/ui';

const steps = [
  {
    n: 1,
    title: 'Claim your club',
    sub: 'We detected your wallet holdings. Pick your home crest.',
    icon: Users,
  },
  {
    n: 2,
    title: 'Lock in your fan tokens',
    sub: 'Your token holdings power per-player boosts during matches.',
    icon: Coins,
  },
  {
    n: 3,
    title: 'Auto-pick your starting five',
    sub: 'A suggested squad based on your tokens and form. Edit anytime.',
    icon: Sparkles,
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [club, setClub] = useState('PSG');
  const [tokensOn, setTokensOn] = useState<Record<string, boolean>>(
    Object.fromEntries(fanTokens.map((t) => [t.symbol, true])),
  );
  const navigate = useNavigate();

  const next = () =>
    step < 2 ? setStep(step + 1) : navigate('/squad');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 lg:px-10 py-5 flex items-center justify-between border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 grid place-items-center rounded-xl bg-accent shadow-glow">
            <Swords size={18} className="text-white" />
          </div>
          <div>
            <div className="font-display font-semibold text-white leading-none">
              Squad Rivals
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-300 mt-1">
              by Socios
            </div>
          </div>
        </Link>
        <button
          onClick={() => navigate('/squad')}
          className="text-sm text-ink-300 hover:text-white"
        >
          Skip
        </button>
      </header>

      <div className="flex-1 grid lg:grid-cols-[1fr_540px] gap-10 px-5 lg:px-12 py-10 lg:py-14 max-w-[1280px] mx-auto w-full">
        {/* Left: stepper + intro */}
        <div>
          <div className="stat-label text-accent mb-3">Getting started</div>
          <h1 className="h-display text-3xl lg:text-[44px] leading-[1.05]">
            Three cards.
            <br />
            <span className="text-ink-200">You're playing in 60 seconds.</span>
          </h1>
          <p className="mt-4 text-ink-200 max-w-md text-[15px]">
            Squad Rivals plugs into your Socios wallet — we pre-fill every form
            so you can skip to the football.
          </p>

          <ol className="mt-10 space-y-3 max-w-md">
            {steps.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li
                  key={s.n}
                  className={cn(
                    'flex items-start gap-4 rounded-2xl border px-4 py-4 transition',
                    active
                      ? 'border-accent/40 bg-accent/[0.04]'
                      : done
                        ? 'border-white/[0.06] bg-white/[0.02]'
                        : 'border-white/[0.04] bg-white/[0.01] opacity-70',
                  )}
                >
                  <div
                    className={cn(
                      'h-9 w-9 grid place-items-center rounded-xl shrink-0',
                      done
                        ? 'bg-emerald/20 text-emerald'
                        : active
                          ? 'bg-accent text-white shadow-glow'
                          : 'bg-white/[0.05] text-ink-300',
                    )}
                  >
                    {done ? <Check size={17} /> : <s.icon size={17} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] uppercase tracking-[0.16em] text-ink-300 font-medium">
                        Step {s.n}
                      </span>
                      {done && (
                        <span className="text-[11px] text-emerald font-medium">
                          Done
                        </span>
                      )}
                    </div>
                    <div className="font-medium text-white mt-0.5">
                      {s.title}
                    </div>
                    <div className="text-xs text-ink-300 mt-1">{s.sub}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right: active card */}
        <div className="surface p-7 lg:p-8 h-fit lg:sticky lg:top-10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <ClubCard
                key="club"
                club={club}
                setClub={setClub}
              />
            )}
            {step === 1 && (
              <TokensCard
                key="tokens"
                tokensOn={tokensOn}
                setTokensOn={setTokensOn}
              />
            )}
            {step === 2 && <SquadCard key="squad" club={club} />}
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1 rounded-full transition-all',
                    i === step ? 'w-8 bg-accent' : 'w-2 bg-white/10',
                  )}
                />
              ))}
            </div>
            <button onClick={next} className="btn-primary">
              {step < 2 ? 'Continue' : 'Enter Squad Rivals'}
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 lg:px-12 py-5 border-t border-white/[0.06] text-xs text-ink-300 flex items-center gap-2 justify-center">
        <Wallet size={13} />
        Connected · 0x9F2…b41 · 4 fan tokens detected
      </div>
    </div>
  );
}

const cardMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.22 },
};

function ClubCard({
  club,
  setClub,
}: {
  club: string;
  setClub: (c: string) => void;
}) {
  const options = fanTokens.map((t) => ({
    code: t.symbol.replace('$', ''),
    name: t.club,
    balance: t.balance,
    boost: t.boost,
  }));
  return (
    <motion.div {...cardMotion}>
      <div className="stat-label text-accent">01 · Auto-detected</div>
      <h2 className="h-display text-2xl mt-1.5">Pick your home club</h2>
      <p className="text-sm text-ink-200 mt-1.5">
        Your top fan-token holding is highlighted.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {options.map((o) => {
          const active = club === o.code;
          return (
            <button
              key={o.code}
              onClick={() => setClub(o.code)}
              className={cn(
                'text-left rounded-xl border p-4 transition relative overflow-hidden',
                active
                  ? 'border-accent/50 bg-accent/[0.06] shadow-glow'
                  : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]',
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-lg text-white">
                    {o.code}
                  </div>
                  <div className="text-xs text-ink-300 mt-0.5">{o.name}</div>
                </div>
                {active && (
                  <span className="h-5 w-5 rounded-full bg-accent grid place-items-center">
                    <Check size={12} className="text-white" />
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ink-300">
                    Holdings
                  </div>
                  <div className="font-mono text-sm text-ink-100">
                    {o.balance} ${o.code}
                  </div>
                </div>
                <div className="font-mono text-xs text-emerald">
                  +{((o.boost - 1) * 100).toFixed(0)}%
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function TokensCard({
  tokensOn,
  setTokensOn,
}: {
  tokensOn: Record<string, boolean>;
  setTokensOn: (t: Record<string, boolean>) => void;
}) {
  return (
    <motion.div {...cardMotion}>
      <div className="stat-label text-accent">02 · Wallet sync</div>
      <h2 className="h-display text-2xl mt-1.5">Your fan tokens</h2>
      <p className="text-sm text-ink-200 mt-1.5">
        Each token boosts that club's players during matches.
      </p>

      <ul className="mt-6 space-y-2">
        {fanTokens.map((t) => {
          const on = tokensOn[t.symbol];
          return (
            <li
              key={t.symbol}
              className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-lg bg-white/[0.04] grid place-items-center">
                  <span className="font-mono text-xs text-ink-100">
                    {t.symbol.replace('$', '')}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-white truncate">
                    {t.club}
                  </div>
                  <div className="text-xs text-ink-300">
                    {t.balance} {t.symbol} · boost +
                    {((t.boost - 1) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  setTokensOn({ ...tokensOn, [t.symbol]: !on })
                }
                className={cn(
                  'relative h-6 w-11 rounded-full transition shrink-0',
                  on ? 'bg-accent' : 'bg-white/10',
                )}
                aria-pressed={on}
              >
                <span
                  className={cn(
                    'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform',
                    on && 'translate-x-5',
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 text-xs text-ink-300 flex items-start gap-2">
        <Coins size={13} className="mt-0.5 shrink-0 text-ink-300" />
        Boosts apply automatically when a player's club matches an active
        token. Hold more, boost more.
      </div>
    </motion.div>
  );
}

function SquadCard({ club }: { club: string }) {
  const picked = Object.values(suggestedSquad)
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean);
  return (
    <motion.div {...cardMotion}>
      <div className="stat-label text-accent">03 · Auto-pick</div>
      <h2 className="h-display text-2xl mt-1.5">Your starting five</h2>
      <p className="text-sm text-ink-200 mt-1.5">
        Suggested from form + your boosts. Customise next.
      </p>

      <div className="mt-6 space-y-2">
        {picked.map((p) => (
          <div
            key={p!.id}
            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
          >
            <PositionBadge position={p!.position} />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white truncate">
                {p!.shortName}
              </div>
              <div className="text-xs text-ink-300">
                {p!.club} · OVR {p!.rating}
              </div>
            </div>
            {p!.clubToken.replace('$', '') === club && (
              <span className="pill text-[10px] !py-0.5">
                <Sparkles size={11} className="text-accent" />
                Boost +25%
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-emerald/20 bg-emerald/[0.04] p-3 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-emerald/20 grid place-items-center">
          <Check size={15} className="text-emerald" />
        </div>
        <div className="text-sm">
          <div className="text-white font-medium">Squad ready</div>
          <div className="text-xs text-ink-200">
            Predicted score: <span className="font-mono">62.4</span> · league
            average <span className="font-mono">54.1</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
