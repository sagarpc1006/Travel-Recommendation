import { Icon, type IconName } from "./icons";

/* ============================================================
   EcoTrail Phase 1 shared primitives.
   Reused across the design-system reference and Phase 2 screens.
   ============================================================ */

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-card p-6 elev-card ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-medium-gray">
      {children}
    </p>
  );
}

export function SectionHeader({
  index,
  title,
  desc,
}: {
  index: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs tracking-widest text-emerald-500">{index}</span>
        <span className="h-px w-8 bg-mist" />
        <span className="font-mono text-xs uppercase tracking-widest text-medium-gray">
          Reference
        </span>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-near-black md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-slate-gray leading-relaxed">{desc}</p>
    </div>
  );
}

/* ---- Buttons ---- */

export type BtnVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "destructive";
export type BtnSize = "sm" | "md" | "lg";

const BTN_VARIANT: Record<BtnVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-forest-800 active:bg-forest-900 shadow-[0_1px_2px_rgba(16,22,15,.12)]",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-sage-200 active:bg-sage-300 border border-sage-200",
  tertiary:
    "bg-transparent text-primary hover:bg-sage-100 active:bg-sage-200 border border-mist",
  ghost: "bg-transparent text-charcoal hover:bg-soft-gray active:bg-mist",
  destructive: "bg-error text-white hover:brightness-95 active:brightness-90",
};
const BTN_SIZE: Record<BtnSize, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-6 text-[15px] gap-2 rounded-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  loading,
  disabled,
  onClick,
  type = "button",
  className = "",
  children,
}: {
  variant?: BtnVariant;
  size?: BtnSize;
  icon?: IconName;
  iconRight?: IconName;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
}) {
  const I = icon ? Icon[icon] : null;
  const R = iconRight ? Icon[iconRight] : null;
  const s = size === "sm" ? 15 : 17;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] disabled:opacity-45 disabled:pointer-events-none ${BTN_VARIANT[variant]} ${BTN_SIZE[size]} ${className}`}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80" />
      ) : (
        I && <I size={s} />
      )}
      {children}
      {!loading && R && <R size={s} />}
    </button>
  );
}

/* ---- Badges ---- */

export type Tone = { fg: string; bg: string; bd: string };

export const TONE: Record<string, Tone> = {
  verified: { fg: "var(--color-verified)", bg: "var(--color-success-soft)", bd: "#bfe0cc" },
  carbon: { fg: "var(--color-carbon)", bg: "var(--color-carbon-soft)", bd: "#c9dbd1" },
  access: { fg: "var(--color-access)", bg: "var(--color-access-soft)", bd: "#bfe0e4" },
  estimated: { fg: "var(--color-estimated)", bg: "var(--color-warning-soft)", bd: "#ecd9ac" },
  ai: { fg: "var(--color-ai)", bg: "var(--color-ai-soft)", bd: "#d3d1f2" },
  weather: { fg: "var(--color-weather)", bg: "var(--color-weather-soft)", bd: "#c4dcee" },
  warning: { fg: "var(--color-warning)", bg: "var(--color-warning-soft)", bd: "#ecd9ac" },
  neutral: { fg: "var(--color-slate-gray)", bg: "var(--color-soft-gray)", bd: "var(--color-mist)" },
};

export function Badge({
  icon,
  label,
  tone,
}: {
  icon: IconName;
  label: string;
  tone: Tone;
}) {
  const I = Icon[icon];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{ color: tone.fg, background: tone.bg, borderColor: tone.bd }}
    >
      <I size={14} />
      {label}
    </span>
  );
}

/* ---- Data viz ---- */

export function CircularScore({
  value,
  label,
  color = "var(--color-emerald-500)",
  size = 96,
}: {
  value: number;
  label?: string;
  color?: string;
  size?: number;
}) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ height: size, width: size }}>
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="var(--color-soft-gray)" strokeWidth="7" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (value / 100) * c}
            style={{ transition: "stroke-dashoffset 600ms cubic-bezier(.16,1,.3,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-xl font-semibold text-near-black">{value}</span>
          <span className="text-[10px] text-medium-gray">/100</span>
        </div>
      </div>
      {label && <span className="text-xs font-medium text-slate-gray">{label}</span>}
    </div>
  );
}

export function ProgressBar({
  value,
  label,
  detail,
  color = "var(--color-emerald-500)",
}: {
  value: number;
  label: string;
  detail: string;
  color?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-charcoal">{label}</span>
        <span className="font-mono text-xs text-medium-gray">{detail}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-soft-gray">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: color,
            transition: "width 600ms cubic-bezier(.16,1,.3,1)",
          }}
        />
      </div>
    </div>
  );
}

export function ComparisonBar({
  a,
  b,
  unit = "kg CO₂e",
}: {
  a: { label: string; value: number; color: string };
  b: { label: string; value: number; color: string };
  unit?: string;
}) {
  const max = Math.max(a.value, b.value);
  return (
    <div className="space-y-3">
      {[a, b].map((row) => (
        <div key={row.label}>
          <div className="flex justify-between text-xs">
            <span className="text-charcoal">{row.label}</span>
            <span className="font-mono text-medium-gray">
              {row.value} {unit}
            </span>
          </div>
          <div className="mt-1.5 h-3 rounded-full bg-soft-gray">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(row.value / max) * 100}%`,
                background: row.color,
                transition: "width 600ms cubic-bezier(.16,1,.3,1)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- Forms ---- */

export const inputBase =
  "w-full h-11 rounded-lg border bg-card px-3 text-sm text-near-black placeholder:text-medium-gray transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/60 focus:border-emerald-500";

export function Field({
  label,
  children,
  hint,
  state,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  state?: "error" | "success";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-charcoal">{label}</span>
      {children}
      {hint && (
        <span
          className={`mt-1.5 flex items-center gap-1 text-xs ${
            state === "error"
              ? "text-error"
              : state === "success"
                ? "text-success"
                : "text-medium-gray"
          }`}
        >
          {state === "error" && <Icon.Warning size={13} />}
          {state === "success" && <Icon.Check size={13} />}
          {hint}
        </span>
      )}
    </label>
  );
}

export function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${on ? "bg-primary" : "bg-mist"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

export function AiThinking({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-ai-border bg-ai-soft px-3.5 py-2">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-ai"
            style={{ animation: "ai-pulse 1.2s infinite", animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </span>
      <span className="text-sm font-medium text-ai">{label}</span>
    </div>
  );
}

/* ---- Brand mark ---- */

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  return (
    <span className="flex items-center gap-2.5">
      <span className={`grid ${box} place-items-center rounded-lg bg-primary text-primary-foreground`}>
        <Icon.Leaf size={size === "sm" ? 16 : 18} />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-near-black">EcoTrail</span>
      <span className="font-mono text-[11px] text-emerald-500">2.0</span>
    </span>
  );
}
