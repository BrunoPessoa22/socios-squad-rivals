import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  Inbox,
  Wallet,
  Swords,
  Coins,
} from 'lucide-react';
import { assistants, fanTokens } from '../data/mock';
import { cn } from '../lib/cn';
import { useGame } from '../lib/store';

const STYLE_COLORS: Record<string, string> = {
  punter: 'text-crimson border-crimson/40 bg-crimson/10',
  banker: 'text-blue-300 border-blue-400/40 bg-blue-400/10',
  analyst: 'text-emerald border-emerald/40 bg-emerald/10',
  diversifier: 'text-violet-200 border-violet-300/40 bg-violet-300/10',
  loyalist: 'text-cyan-200 border-cyan-300/40 bg-cyan-300/10',
  'form-chaser': 'text-gold border-gold/40 bg-gold/10',
};

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const navigate = useNavigate();
  const {
    assistantId,
    userName,
    homeClub,
    setAssistant,
    setUserName,
    setHomeClub,
    completeOnboarding,
  } = useGame();
  const [tokensOn, setTokensOn] = useState<Record<string, boolean>>(
    Object.fromEntries(fanTokens.map((t) => [t.symbol, true])),
  );

  const totalSteps = 5;
  const assistant = assistants[carouselIdx];
  const chosen = assistants.find((a) => a.id === assistantId) ?? assistants[0];

  const next = () => {
    if (step === 0) setAssistant(assistant.id);
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      navigate('/squad');
    }
  };
  const back = () => step > 0 && setStep(step - 1);

  const canContinue =
    (step !== 1 || userName.trim().length >= 2) &&
    (step !== 2 || homeClub.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-ink-950">
      <header className="px-5 lg:px-10 py-5 flex items-center justify-between border-b border-white/[0.04]">
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
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1 rounded-full transition-all',
                  i < step
                    ? 'w-2 bg-emerald'
                    : i === step
                      ? 'w-8 bg-accent'
                      : 'w-2 bg-white/10',
                )}
              />
            ))}
          </div>
          <button
            onClick={() => {
              completeOnboarding();
              navigate('/squad');
            }}
            className="text-sm text-ink-300 hover:text-white"
          >
            Skip
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-5 lg:px-12 py-10 lg:py-14">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepAssistant
              key="assistant"
              idx={carouselIdx}
              setIdx={setCarouselIdx}
            />
          )}
          {step === 1 && (
            <StepName
              key="name"
              assistant={chosen}
              name={userName}
              setName={setUserName}
            />
          )}
          {step === 2 && (
            <StepClub
              key="club"
              assistant={chosen}
              userName={userName}
              club={homeClub}
              setClub={setHomeClub}
            />
          )}
          {step === 3 && (
            <StepTokens
              key="tokens"
              assistant={chosen}
              userName={userName}
              tokensOn={tokensOn}
              setTokensOn={setTokensOn}
            />
          )}
          {step === 4 && (
            <StepWelcome key="welcome" assistant={chosen} userName={userName} />
          )}
        </AnimatePresence>
      </div>

      <footer className="px-5 lg:px-12 py-5 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className={cn(
              'btn-ghost px-4',
              step === 0 && 'opacity-30 cursor-not-allowed',
            )}
          >
            <ChevronLeft size={15} /> Back
          </button>
          <div className="text-[11px] text-ink-300 flex items-center gap-1.5">
            <Wallet size={11} />
            0x9F2…b41 · 4 tokens detected
          </div>
          <button
            onClick={next}
            disabled={!canContinue}
            className={cn(
              'btn-primary px-5',
              !canContinue && 'opacity-40 cursor-not-allowed',
            )}
          >
            {step === totalSteps - 1 ? (
              <>
                Enter Squad Rivals <ChevronRight size={15} />
              </>
            ) : (
              <>
                Next <ChevronRight size={15} />
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.25 },
};

function StepAssistant({
  idx,
  setIdx,
}: {
  idx: number;
  setIdx: (n: number) => void;
}) {
  const total = assistants.length;
  const a = assistants[idx];
  return (
    <motion.div {...fade} className="w-full max-w-xl">
      <div className="text-center">
        <h1 className="font-display font-bold text-2xl lg:text-3xl text-white tracking-tight uppercase">
          Let's choose your assistant
        </h1>
        <p className="mt-3 text-sm text-ink-200 max-w-md mx-auto">
          Each assistant uses the same FTI data but a different scoring
          formula. They will pick different lineups. Switch anytime.
        </p>
      </div>

      <div className="mt-10 flex items-center gap-3 justify-center">
        <button
          onClick={() => setIdx((idx - 1 + total) % total)}
          className="h-11 w-11 rounded-full border border-white/10 grid place-items-center hover:bg-white/[0.05]"
        >
          <ChevronLeft size={18} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={a.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="surface w-[280px] sm:w-[300px] overflow-hidden ring-2 ring-accent/50 shadow-glow"
          >
            <div className="relative aspect-[3/4]">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, hsl(${a.accentHue} 60% 30%), hsl(${(a.accentHue + 40) % 360} 60% 18%))`,
                }}
              />
              <img
                src={a.photo}
                alt={a.name}
                className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-95"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute top-3 right-3 h-7 w-7 grid place-items-center rounded-full bg-accent shadow-glow">
                <Check size={14} className="text-white" strokeWidth={3} />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                <div className="font-display text-xl text-white">
                  {a.name}
                </div>
                <div className="text-xs text-ink-200 mt-0.5">
                  {a.age}y/o · {a.countryFlag} {a.country}
                </div>
              </div>
            </div>
            <div className="p-4">
              <div
                className={cn(
                  'inline-flex items-center text-[10px] uppercase tracking-[0.14em] font-medium px-2 py-0.5 rounded-full border',
                  STYLE_COLORS[a.style],
                )}
              >
                {a.styleLabel}
              </div>
              <div className="mt-2 font-medium text-white text-sm">
                {a.tagline}
              </div>
              <p className="mt-1.5 text-xs text-ink-300 leading-relaxed">
                {a.bio}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setIdx((idx + 1) % total)}
          className="h-11 w-11 rounded-full border border-white/10 grid place-items-center hover:bg-white/[0.05]"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-1.5">
        {assistants.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={cn(
              'h-1.5 rounded-full transition-all',
              i === idx ? 'w-6 bg-accent' : 'w-1.5 bg-white/15 hover:bg-white/30',
            )}
            aria-label={`Pick assistant ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function AssistantHeader({
  assistant,
  message,
  question,
}: {
  assistant: (typeof assistants)[number];
  message?: string;
  question: string;
}) {
  return (
    <>
      <div className="surface flex items-center gap-4 p-4 max-w-sm mx-auto">
        <div
          className="h-14 w-14 rounded-full overflow-hidden shrink-0 ring-2"
          style={{ background: `hsl(${assistant.accentHue} 60% 30%)` }}
        >
          <img
            src={assistant.photo}
            alt={assistant.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display text-lg text-white">{assistant.name}</div>
          <div className="text-xs text-ink-200 mt-0.5">
            {assistant.age}y/o · {assistant.countryFlag} {assistant.country}
          </div>
        </div>
      </div>
      {message && (
        <p className="mt-8 text-lg lg:text-xl font-display text-white text-center leading-snug">
          {message}
        </p>
      )}
      <p className="mt-5 text-base font-display text-ink-100 text-center">
        {question}
      </p>
    </>
  );
}

function StepName({
  assistant,
  name,
  setName,
}: {
  assistant: (typeof assistants)[number];
  name: string;
  setName: (n: string) => void;
}) {
  return (
    <motion.div {...fade} className="w-full max-w-xl">
      <AssistantHeader
        assistant={assistant}
        message={assistant.intro}
        question="What should I call you?"
      />
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="mt-5 mx-auto block w-full max-w-md py-3.5 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-center text-lg font-display text-white placeholder:text-ink-400 focus:outline-none focus:border-accent/60 focus:bg-white/[0.06]"
      />
      <p className="mt-3 text-[11px] text-ink-300 text-center">
        Only used by your assistant in messages. Never shared.
      </p>
    </motion.div>
  );
}

function StepClub({
  assistant,
  userName,
  club,
  setClub,
}: {
  assistant: (typeof assistants)[number];
  userName: string;
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
    <motion.div {...fade} className="w-full max-w-xl">
      <AssistantHeader
        assistant={assistant}
        message={`Thanks, ${userName || 'boss'}. Nice to meet you.`}
        question="Which club is home for you?"
      />
      <p className="mt-1 text-xs text-ink-300 text-center">
        I auto-detected these from your wallet — pick the one you bleed for.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 max-w-md mx-auto">
        {options.map((o) => {
          const active = club === o.code;
          return (
            <button
              key={o.code}
              onClick={() => setClub(o.code)}
              className={cn(
                'text-left rounded-xl border p-4 transition relative overflow-hidden',
                active
                  ? 'border-accent/60 bg-accent/[0.06] shadow-glow'
                  : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]',
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-lg text-white">{o.code}</div>
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

function StepTokens({
  assistant,
  userName,
  tokensOn,
  setTokensOn,
}: {
  assistant: (typeof assistants)[number];
  userName: string;
  tokensOn: Record<string, boolean>;
  setTokensOn: (t: Record<string, boolean>) => void;
}) {
  const active = Object.values(tokensOn).filter(Boolean).length;
  return (
    <motion.div {...fade} className="w-full max-w-xl">
      <AssistantHeader
        assistant={assistant}
        message={`Excellent, ${userName || 'boss'}. Let me confirm which boosts I should activate.`}
        question={`${active} of ${fanTokens.length} tokens enabled`}
      />
      <p className="mt-1 text-xs text-ink-300 text-center">
        Each token boosts that club's players in your matchday lineup.
      </p>

      <ul className="mt-6 space-y-2 max-w-md mx-auto">
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
                  <div className="font-medium text-white truncate">{t.club}</div>
                  <div className="text-xs text-ink-300">
                    {t.balance} {t.symbol} · +
                    {((t.boost - 1) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              <button
                onClick={() => setTokensOn({ ...tokensOn, [t.symbol]: !on })}
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

      <div className="mt-5 text-xs text-ink-300 flex items-start gap-2 max-w-md mx-auto">
        <Coins size={13} className="mt-0.5 shrink-0 text-ink-300" />
        Boosts apply automatically when a player's club matches an active token.
        You can change this anytime in Settings.
      </div>
    </motion.div>
  );
}

function StepWelcome({
  assistant,
  userName,
}: {
  assistant: (typeof assistants)[number];
  userName: string;
}) {
  return (
    <motion.div {...fade} className="w-full max-w-xl text-center">
      <AssistantHeader
        assistant={assistant}
        question={`Excellent! I'm sure you'll do ${userName || 'us'} proud, ${userName || 'boss'}.`}
      />
      <div className="mt-8 surface p-5 max-w-md mx-auto text-left">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/15 grid place-items-center shrink-0">
            <Inbox size={17} className="text-accent" />
          </div>
          <div>
            <div className="font-medium text-white">
              Keep an eye on your inbox.
            </div>
            <p className="mt-1 text-sm text-ink-200 leading-relaxed">
              That's where I'll be in touch from now on — Coach's pick before
              every matchday, scout reports on tap, post-match breakdowns.
            </p>
          </div>
        </div>
        <div className="mt-4 px-3 py-2 rounded-lg bg-emerald/[0.08] border border-emerald/20 text-xs text-emerald flex items-center gap-2">
          <Sparkles size={12} />I've just sent you your first message.
        </div>
      </div>
      <p className="mt-6 text-sm text-ink-300 italic">
        {assistant.signaturePhrase}
      </p>
    </motion.div>
  );
}
