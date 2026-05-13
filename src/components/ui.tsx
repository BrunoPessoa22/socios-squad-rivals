import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  right,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-6 lg:mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="stat-label mb-2 text-accent">{eyebrow}</div>
        )}
        <h1 className="h-display text-2xl lg:text-[34px] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm lg:text-[15px] text-ink-200 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  trend,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  trend?: 'up' | 'down' | 'flat';
}) {
  return (
    <div className="surface p-4">
      <div className="stat-label">{label}</div>
      <div className="mt-1.5 font-display text-2xl text-white tracking-tight">
        {value}
      </div>
      {hint && (
        <div
          className={cn(
            'mt-1 text-xs',
            trend === 'up'
              ? 'text-emerald'
              : trend === 'down'
                ? 'text-crimson'
                : 'text-ink-300',
          )}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

export function FormPips({ form }: { form: ('W' | 'L' | 'D')[] }) {
  return (
    <div className="flex items-center gap-1">
      {form.map((r, i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            r === 'W'
              ? 'bg-emerald'
              : r === 'L'
                ? 'bg-crimson'
                : 'bg-ink-300',
          )}
        />
      ))}
    </div>
  );
}

export function Avatar({
  initials,
  hue = 340,
  size = 40,
}: {
  initials: string;
  hue?: number;
  size?: number;
}) {
  return (
    <div
      className="rounded-full grid place-items-center text-xs font-semibold text-white shrink-0"
      style={{
        height: size,
        width: size,
        background: `linear-gradient(135deg, hsl(${hue} 70% 42%), hsl(${(hue + 30) % 360} 70% 28%))`,
        fontSize: Math.max(10, size * 0.3),
      }}
    >
      {initials}
    </div>
  );
}

export function StatusDot({
  status,
}: {
  status: 'online' | 'idle' | 'in-match';
}) {
  const cls =
    status === 'online'
      ? 'bg-emerald'
      : status === 'in-match'
        ? 'bg-accent'
        : 'bg-ink-400';
  const label =
    status === 'online' ? 'Online' : status === 'in-match' ? 'In match' : 'Idle';
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-200">
      <span className={cn('h-1.5 w-1.5 rounded-full', cls)} />
      {label}
    </span>
  );
}

export function PositionBadge({ position }: { position: string }) {
  const color =
    position === 'GK'
      ? 'bg-gold/15 text-gold border-gold/30'
      : position === 'DEF'
        ? 'bg-emerald/15 text-emerald border-emerald/30'
        : position === 'MID'
          ? 'bg-blue-400/15 text-blue-300 border-blue-400/30'
          : 'bg-accent/15 text-accent border-accent/30';
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center min-w-[36px] h-5 px-1.5 rounded-md text-[10px] font-bold tracking-wider border',
        color,
      )}
    >
      {position}
    </span>
  );
}
