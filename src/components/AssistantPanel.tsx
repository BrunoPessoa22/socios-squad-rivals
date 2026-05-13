import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Crown,
  Sparkles,
  ChevronRight,
  Check,
  AlertTriangle,
  Info,
  Database,
  Zap,
  RefreshCw,
} from 'lucide-react';
import { cn } from '../lib/cn';
import {
  assistants,
  getRecommendation,
  tactics,
  teams,
  type Assistant,
  type AssistantRec,
} from '../data/mock';

export default function AssistantPanel({
  onClose,
  onApply,
}: {
  onClose: () => void;
  onApply: (rec: AssistantRec) => void;
}) {
  const [assistantId, setAssistantId] = useState('andrea');
  const assistant = assistants.find((a) => a.id === assistantId)!;
  const rec = getRecommendation(assistantId);
  const tactic = tactics.find((t) => t.id === rec.tacticId)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/85 backdrop-blur-sm flex justify-end"
    >
      <motion.aside
        initial={{ x: 540 }}
        animate={{ x: 0 }}
        exit={{ x: 540 }}
        transition={{ type: 'spring', damping: 30, stiffness: 240 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[520px] h-full bg-black border-l border-white/[0.06] overflow-y-auto relative"
      >
        {/* Glow strip on the left to telegraph "this is the AI layer" */}
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cobalt/60 via-cobalt/20 to-transparent" />

        <header className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-white/[0.06] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-cobalt/15 grid place-items-center">
              <Sparkles size={14} className="text-cobalt" />
            </div>
            <div>
              <div className="stat-label !text-[10px] !text-cobalt">
                AI Assistant · Powered by FTI
              </div>
              <div className="text-[11px] text-white/50">
                Mock recommendation — no live FTI call yet
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] grid place-items-center"
          >
            <X size={14} />
          </button>
        </header>

        <div className="p-5 space-y-5">
          {/* Assistant picker row */}
          <section>
            <div className="stat-label mb-2">Choose your style</div>
            <div className="grid grid-cols-3 gap-2">
              {assistants.map((a) => {
                const active = a.id === assistantId;
                return (
                  <button
                    key={a.id}
                    onClick={() => setAssistantId(a.id)}
                    className={cn(
                      'rounded-lg border p-2.5 text-left transition',
                      active
                        ? 'border-cobalt/50 bg-cobalt/[0.06]'
                        : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-7 w-7 rounded-full overflow-hidden shrink-0"
                        style={{
                          background: `hsl(${a.accentHue} 60% 30%)`,
                        }}
                      >
                        <img
                          src={a.photo}
                          alt={a.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              'none';
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-white truncate">
                          {a.name}
                        </div>
                        <div className="text-[10px] text-white/50 truncate">
                          {a.styleLabel.replace('The ', '')}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Active assistant card */}
          <AssistantHeader assistant={assistant} rec={rec} tactic={tactic} />

          {/* Picks */}
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="font-display font-bold text-white">
                Squad recommendation
              </h3>
              <span className="text-[11px] text-white/50">
                5 teams + captain
              </span>
            </div>
            <ul className="space-y-1.5">
              {rec.slots.map((s, i) => {
                const team = teams.find((t) => t.id === s.teamId);
                if (!team) return null;
                return (
                  <li
                    key={s.teamId}
                    className={cn(
                      'rounded-lg border px-3 py-2.5 flex items-start gap-3',
                      s.captain
                        ? 'border-gold/40 bg-gold/[0.04]'
                        : 'border-white/[0.06] bg-white/[0.02]',
                    )}
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[10px] text-white/50">
                        {i + 1}
                      </span>
                      <span className="text-xl">{team.flag}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white text-sm">
                          {team.code}
                        </span>
                        <span className="text-[10px] text-white/50">
                          {team.name}
                        </span>
                        {s.captain && (
                          <span className="inline-flex items-center gap-0.5 text-gold font-mono text-[10px] font-bold">
                            <Crown size={10} /> C
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[12px] text-white/70 leading-relaxed">
                        {s.reason}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-sm text-white">
                        {team.rating}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Tactic + tokens */}
          <section className="grid grid-cols-2 gap-3">
            <div className="surface-inset p-3">
              <div className="stat-label">Tactic</div>
              <div className="mt-1 font-display font-bold text-white">
                {tactic.name}
              </div>
              <div className="mt-1 text-[10px] text-white/50">
                {tactic.bonus}
              </div>
            </div>
            <div className="surface-inset p-3">
              <div className="stat-label">Tokens</div>
              <div className="mt-1 font-display font-bold text-white">
                {rec.tokensActivated.length} active
              </div>
              <div className="mt-1 text-[10px] text-white/50 truncate">
                {rec.tokensActivated.join(' · ')}
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="surface-inset p-4">
            <div className="flex items-start gap-2.5">
              <Info size={14} className="text-cobalt mt-0.5 shrink-0" />
              <p className="text-[13px] text-white/85 leading-relaxed">
                {rec.summary}
              </p>
            </div>
          </section>

          {/* Warnings */}
          {rec.warnings.length > 0 && (
            <section className="space-y-2">
              {rec.warnings.map((w) => (
                <div
                  key={w.title}
                  className={cn(
                    'flex items-start gap-2.5 rounded-lg border px-3 py-2.5',
                    w.severity === 'warn'
                      ? 'border-crimson/30 bg-crimson/[0.04]'
                      : 'border-white/[0.06] bg-white/[0.02]',
                  )}
                >
                  {w.severity === 'warn' ? (
                    <AlertTriangle
                      size={14}
                      className="text-crimson mt-0.5 shrink-0"
                    />
                  ) : (
                    <Info size={14} className="text-cobalt mt-0.5 shrink-0" />
                  )}
                  <div className="text-[12px]">
                    <div className="text-white font-medium">{w.title}</div>
                    <div className="text-white/70 mt-0.5 leading-relaxed">
                      {w.body}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Scoring tilt + confidence */}
          <section className="grid grid-cols-[1fr_auto] gap-3 items-stretch">
            <div className="surface-inset p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Zap size={12} className="text-gold" />
                <span className="stat-label !text-[10px]">Scoring tilt</span>
              </div>
              <ul className="space-y-1">
                {rec.scoringTilt.slice(0, 4).map((s) => (
                  <li
                    key={s.factor}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <span className="text-white/70 truncate pr-2">
                      {s.factor}
                    </span>
                    <span className="font-mono text-white/85">
                      {(s.weight * 100).toFixed(0)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-inset p-3 grid place-items-center min-w-[80px]">
              <div className="stat-label !text-[10px]">Confidence</div>
              <div className="font-display font-black text-white text-2xl mt-1">
                {rec.confidence}
              </div>
              <div className="text-[9px] text-white/50 -mt-0.5">/ 100</div>
            </div>
          </section>

          {/* FTI calls trace */}
          <section>
            <div className="flex items-center gap-1.5 mb-2">
              <Database size={12} className="text-cobalt" />
              <span className="stat-label !text-[10px]">
                FTI data consulted
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'wallet_balance',
                'token_metadata',
                'match_calendar',
                'sports_profile',
                'match_correlation',
                'signal_bundle',
              ].map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[10px] text-white/50 border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 rounded"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky footer CTA */}
        <footer className="sticky bottom-0 bg-black/95 backdrop-blur border-t border-white/[0.06] px-5 py-4 flex items-center gap-2">
          <button
            onClick={() => setAssistantId(assistants[(assistants.findIndex(a => a.id === assistantId) + 1) % assistants.length].id)}
            className="btn-ghost"
            title="Try a different style"
          >
            <RefreshCw size={13} /> Try another
          </button>
          <button
            onClick={() => onApply(rec)}
            className="btn-primary flex-1"
          >
            <Check size={14} /> Apply {assistant.name}'s pick
            <ChevronRight size={14} />
          </button>
        </footer>
      </motion.aside>
    </motion.div>
  );
}

function AssistantHeader({
  assistant,
  rec,
  tactic,
}: {
  assistant: Assistant;
  rec: AssistantRec;
  tactic: { name: string };
}) {
  return (
    <div
      className="surface p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, hsl(${assistant.accentHue} 60% 14%) 0%, rgba(0,0,0,0) 60%)`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="h-12 w-12 rounded-full overflow-hidden shrink-0 ring-2 ring-cobalt/40"
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
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-bold text-white">
              {assistant.name}
            </span>
            <span className="text-[10px] text-white/70">
              {assistant.age}y/o · {assistant.countryFlag} {assistant.country}
            </span>
          </div>
          <div className="text-[11px] text-cobalt font-medium uppercase tracking-[0.14em] mt-0.5">
            {assistant.styleLabel}
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-white/85 italic leading-relaxed">
        "{assistant.coachLine}. Tactic: {tactic.name}. Confidence{' '}
        {rec.confidence}/100."
      </p>
    </div>
  );
}
