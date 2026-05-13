import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Crown,
  Check,
  ChevronRight,
  AlertTriangle,
  Info,
  Database,
  Layers,
  Brain,
  Zap,
  Lock,
} from 'lucide-react';
import { PageHeader, PositionBadge } from '../components/ui';
import { cn } from '../lib/cn';
import { coachOutput, players, fanTokens } from '../data/mock';
import { useAssistant, useGame } from '../lib/store';

export default function Coach() {
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);
  const assistant = useAssistant();
  const userName = useGame((s) => s.userName);
  const addressee = userName || 'boss';

  return (
    <>
      <PageHeader
        eyebrow={`${assistant.name}'s pick · ${coachOutput.matchday}`}
        title={
          <span className="inline-flex items-center gap-3 flex-wrap">
            {assistant.name}'s lineup
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent border border-accent/40 bg-accent/10 px-2 py-0.5 rounded-full">
              Powered by FTI
            </span>
          </span>
        }
        subtitle={`${assistant.tagline}. I read your wallet, queried Fan Token Intel, and picked the optimal 5. I never recommend trades.`}
        right={
          <>
            <button
              className="btn-ghost"
              onClick={() => navigate('/squad')}
            >
              Manual override
            </button>
            <button
              className={cn(
                'btn-primary',
                applied && 'bg-emerald hover:bg-emerald shadow-none',
              )}
              onClick={() => {
                setApplied(true);
                setTimeout(() => navigate('/squad'), 800);
              }}
            >
              {applied ? (
                <>
                  <Check size={15} /> Applied
                </>
              ) : (
                <>
                  <Sparkles size={15} /> Apply Coach's pick
                </>
              )}
            </button>
          </>
        }
      />

      {/* Assistant character card */}
      <div className="surface p-5 mb-5 flex items-center gap-4">
        <div
          className="h-16 w-16 rounded-full overflow-hidden shrink-0 ring-2 ring-accent/50"
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
            <span className="font-display text-lg text-white">
              {assistant.name}
            </span>
            <span className="text-xs text-ink-200">
              {assistant.age}y/o · {assistant.countryFlag} {assistant.country}
            </span>
            <span className="pill !text-[10px] !py-0 !px-1.5">
              {assistant.style}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-ink-100 italic">
            "Right, {addressee}. Here's how I'd line you up this matchday."
          </p>
        </div>
        <button className="btn-ghost text-xs hidden sm:inline-flex">
          Switch assistant
        </button>
      </div>

      {/* Hero stripe — confidence + holdings */}
      <div className="surface p-5 lg:p-6 mb-5 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl bg-accent/20" />
        <div className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div>
            <div className="stat-label">Confidence</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-display text-5xl text-white tracking-tighter">
                {coachOutput.confidence}
              </span>
              <span className="font-mono text-sm text-ink-300">/ 100</span>
            </div>
            <p className="mt-2 text-xs text-ink-300">
              Higher confidence = more aligned data sources. Threshold ≥ 70.
            </p>
            <div className="mt-3 h-1.5 rounded-full bg-white/[0.04] overflow-hidden max-w-[260px]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${coachOutput.confidence}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-emerald via-gold to-accent"
              />
            </div>
          </div>

          <div className="hidden lg:block h-20 w-px bg-white/[0.06]" />

          <div>
            <div className="stat-label">Reading your wallet</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {fanTokens.map((t) => (
                <span
                  key={t.symbol}
                  className="inline-flex items-center gap-1.5 pill !text-[11px]"
                >
                  <span className="font-mono">{t.symbol}</span>
                  <span className="text-ink-300">{t.balance}</span>
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-300 flex items-center gap-1.5">
              <Lock size={11} className="text-emerald" />
              Read-only. Coach never recommends buying or selling.
            </p>
          </div>
        </div>
      </div>

      {/* Summary banner */}
      <div className="surface p-5 mb-5 flex items-start gap-3">
        <div className="h-9 w-9 rounded-lg bg-accent/15 grid place-items-center shrink-0">
          <Brain size={16} className="text-accent" />
        </div>
        <p className="text-sm text-ink-100 leading-relaxed">
          {coachOutput.summary}
        </p>
      </div>

      {/* Lineup */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        <div className="surface p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-base text-white">
              My pick · 5 players + captain
            </h3>
            <span className="text-[11px] text-ink-300">
              Generated {coachOutput.generatedAt}
            </span>
          </div>
          <ul className="space-y-2">
            {coachOutput.lineup.map((pick) => {
              const player = players.find((p) => p.id === pick.playerId)!;
              return (
                <li
                  key={pick.playerId}
                  className={cn(
                    'rounded-xl border px-4 py-4 transition',
                    pick.captain
                      ? 'border-gold/40 bg-gold/[0.04]'
                      : 'border-white/[0.06] bg-white/[0.02]',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 shrink-0 w-[80px]">
                      <PositionBadge position={pick.slot as never} />
                      {pick.captain && (
                        <span className="inline-flex items-center gap-0.5 text-gold font-mono text-[10px] font-bold">
                          <Crown size={11} /> C
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white">
                          {player.shortName}
                        </span>
                        <span className="text-[11px] text-ink-300 font-mono">
                          {player.club}
                        </span>
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 pill !text-[10px] !py-0',
                            pick.boostMultiplier > 1.15
                              ? '!border-emerald/40 !text-emerald !bg-emerald/10'
                              : '',
                          )}
                        >
                          <Sparkles size={9} />
                          {pick.boostToken} +
                          {((pick.boostMultiplier - 1) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-ink-100 leading-relaxed">
                        {pick.note}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-[11px] flex-wrap">
                        <span className="font-mono text-emerald bg-emerald/10 border border-emerald/20 px-2 py-0.5 rounded">
                          {pick.citedStat.label}:{' '}
                          <span className="text-white">{pick.citedStat.value}</span>
                        </span>
                        {pick.ftiSources.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-ink-300 inline-flex items-center gap-1"
                          >
                            <Database size={10} /> {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 rounded-xl border border-emerald/20 bg-emerald/[0.04] p-3 flex items-start gap-3">
            <Check size={16} className="text-emerald mt-0.5 shrink-0" />
            <div className="text-sm">
              <div className="text-white font-medium">
                Every stat above is verified against FTI before render.
              </div>
              <div className="text-xs text-ink-200 mt-0.5">
                If the LLM cites a number that doesn't match the FTI response, that
                line falls back to a generic note.
              </div>
            </div>
          </div>
        </div>

        {/* Side: warnings + how-it-works */}
        <aside className="space-y-4">
          {coachOutput.warnings.length > 0 && (
            <div className="surface p-5">
              <h3 className="font-display text-base text-white mb-3">
                Heads up
              </h3>
              <ul className="space-y-3">
                {coachOutput.warnings.map((w) => (
                  <li key={w.title} className="flex items-start gap-3">
                    <div
                      className={cn(
                        'h-8 w-8 rounded-lg grid place-items-center shrink-0',
                        w.severity === 'warn'
                          ? 'bg-crimson/15 text-crimson'
                          : 'bg-accent/15 text-accent',
                      )}
                    >
                      {w.severity === 'warn' ? (
                        <AlertTriangle size={14} />
                      ) : (
                        <Info size={14} />
                      )}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-white">{w.title}</div>
                      <div className="text-xs text-ink-200 mt-1 leading-relaxed">
                        {w.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="surface p-5">
            <h3 className="font-display text-base text-white mb-3 inline-flex items-center gap-2">
              <Zap size={14} className="text-gold" /> Scoring formula
            </h3>
            <ul className="space-y-1.5">
              {coachOutput.scoringBreakdown.map((s) => (
                <li
                  key={s.factor}
                  className="flex items-center justify-between text-[12px]"
                >
                  <span className="text-ink-200">{s.factor}</span>
                  <span className="font-mono text-ink-100">
                    {(s.weight * 100).toFixed(0)}%
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-ink-300 leading-relaxed">
              Pre-scoring is deterministic. The LLM only ranks the top 12 and
              writes prose grounded in FTI data.
            </p>
          </div>

          <div className="surface p-5">
            <h3 className="font-display text-base text-white mb-3 inline-flex items-center gap-2">
              <Layers size={14} className="text-accent" /> Data pulled
            </h3>
            <ul className="space-y-1">
              {coachOutput.ftiCallsSummary.map((c) => (
                <li
                  key={c.tool}
                  className="flex items-center justify-between text-[12px] font-mono"
                >
                  <span className="text-ink-200 truncate">{c.tool}</span>
                  <span className="text-ink-300">{c.latency}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-ink-300">
              Total {coachOutput.ftiCallsSummary.length} FTI calls · cached for
              this matchday.
            </p>
          </div>
        </aside>
      </div>

      {/* Footer CTA */}
      <div className="mt-6 surface p-5 flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h3 className="font-display text-lg text-white">
            Like what you see?
          </h3>
          <p className="text-sm text-ink-200 mt-1">
            One tap to apply this lineup. You can still edit any slot on the
            Pitch screen.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost" onClick={() => navigate('/squad')}>
            Edit on Pitch <ChevronRight size={14} />
          </button>
          <button
            className={cn(
              'btn-primary',
              applied && 'bg-emerald hover:bg-emerald shadow-none',
            )}
            onClick={() => {
              setApplied(true);
              setTimeout(() => navigate('/squad'), 800);
            }}
          >
            {applied ? (
              <>
                <Check size={15} /> Applied — opening Pitch…
              </>
            ) : (
              <>
                <Sparkles size={15} /> Apply Coach's pick
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
