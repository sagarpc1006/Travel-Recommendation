import { useMemo, useState } from "react";
import { Icon, type IconName } from "../components/icons";
import { Button, Logo, Badge, TONE } from "../components/ui";

type Go = (route: string) => void;

const STEP_COUNT = 7;

const TRAVEL_OPTS: [IconName, string][] = [
  ["Leaf", "Nature"],
  ["Compass", "Culture"],
  ["Route", "Adventure"],
  ["Weather", "Relaxation"],
  ["Location", "City Exploration"],
  ["Money", "Food & Local"],
];

const SUSTAIN_OPTS = ["Not a priority", "Somewhat important", "Important", "Very important", "Top priority"];

const ACCESS_OPTS: [IconName, string][] = [
  ["Accessibility", "Step-free access"],
  ["Wheelchair", "Wheelchair-friendly routes"],
  ["Location", "Accessible accommodation"],
  ["Bus", "Accessible transport"],
  ["Walk", "Minimal walking"],
  ["Check", "No specific requirement"],
];

const CONV_LABELS = ["Maximum convenience", "Balanced", "Greener choices"];

function usePrefersReducedMotion() {
  return useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
}

/* header with progress */
function ProgressHeader({ step, go }: { step: number; go: Go }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-warm-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-4">
        <Logo size="sm" />
        <div className="flex flex-1 items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-soft-gray">
            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: `${((step + 1) / STEP_COUNT) * 100}%`,
                transition: "width 350ms cubic-bezier(.16,1,.3,1)",
              }}
            />
          </div>
          <span className="font-mono text-xs text-medium-gray">
            {step + 1} / {STEP_COUNT}
          </span>
        </div>
        <button onClick={() => go("landing")} className="text-medium-gray hover:text-forest-700" aria-label="Exit onboarding">
          <Icon.Close size={20} />
        </button>
      </div>
    </header>
  );
}

/* selectable chip */
function Chip({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: IconName;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const I = Icon[icon];
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center gap-2.5 rounded-xl border-2 p-4 text-left text-sm font-medium transition-all duration-200 ease-[cubic-bezier(.16,1,.3,1)] ${
        selected
          ? "border-primary bg-sage-100 text-forest-700"
          : "border-border bg-card text-charcoal hover:border-emerald-400"
      }`}
    >
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${selected ? "bg-primary text-white" : "bg-soft-gray text-slate-gray"}`}>
        <I size={18} />
      </span>
      <span className="flex-1">{label}</span>
      {selected && <Icon.Check size={16} className="text-forest-700" />}
    </button>
  );
}

export default function Onboarding({ go }: { go: Go }) {
  const reduce = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState(false);

  // preference model
  const [travel, setTravel] = useState<string[]>([]);
  const [sustain, setSustain] = useState(3);
  const [access, setAccess] = useState<string[]>([]);
  const [accessSkip, setAccessSkip] = useState(false);
  const [budget, setBudget] = useState(60);
  const [currency, setCurrency] = useState("INR");
  const [flexible, setFlexible] = useState(true);
  const [conv, setConv] = useState(1);

  function next() {
    setDir(1);
    setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
  }
  function back() {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggle(list: string[], set: (v: string[]) => void, v: string) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  const budgetLabel = budget < 34 ? "Budget" : budget < 67 ? "Moderate" : "Premium";
  const currencySymbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "€";
  const budgetRange =
    currency === "INR"
      ? budget < 34 ? "under ₹20k" : budget < 67 ? "₹20k – ₹60k" : "₹60k+"
      : budget < 34 ? `under ${currencySymbol}300` : budget < 67 ? `${currencySymbol}300 – ${currencySymbol}900` : `${currencySymbol}900+`;

  /* ---------- Personalization confirmation ---------- */
  if (done) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div
            className="w-full max-w-md text-center"
            style={reduce ? undefined : { animation: "ai-pulse 0s", opacity: 1 }}
          >
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success-soft text-success">
              <Icon.Check size={32} />
            </span>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-near-black">You're all set.</h1>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-slate-gray">
              EcoTrail will use these preferences to personalize your travel recommendations.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-left elev-card">
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {[
                  ["Travel", travel.slice(0, 2).join(" + ") || "Open to anything"],
                  ["Sustainability", SUSTAIN_OPTS[sustain]],
                  ["Accessibility", accessSkip || access.length === 0 ? "Not specified" : access.slice(0, 2).join(" + ")],
                  ["Budget", budgetLabel],
                  ["Convenience", CONV_LABELS[conv]],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[11px] font-medium uppercase tracking-wide text-medium-gray">{k}</div>
                    <div className="mt-0.5 text-sm font-medium text-charcoal">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button className="mt-8 w-full" size="lg" icon="Compass" onClick={() => go("home")}>
              Start Exploring
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Step bodies ---------- */
  const steps: React.ReactNode[] = [
    // 0 — Welcome
    <div key="welcome" className="text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-sage-100 text-forest-700">
        <Icon.Compass size={32} />
      </span>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-near-black md:text-4xl">
        Let's make EcoTrail work for you.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-slate-gray">
        Tell us what matters most when you travel. You can change these preferences anytime.
      </p>
      <Button className="mt-8" size="lg" iconRight="Chevron" onClick={next}>
        Let's Go
      </Button>
    </div>,

    // 1 — Travel style
    <div key="travel">
      <StepTitle small="About you" title="What kind of trips do you enjoy?" hint="Pick as many as you like." />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {TRAVEL_OPTS.map(([icon, label]) => (
          <Chip key={label} icon={icon} label={label} selected={travel.includes(label)} onClick={() => toggle(travel, setTravel, label)} />
        ))}
      </div>
    </div>,

    // 2 — Sustainability
    <div key="sustain">
      <StepTitle small="Priorities" title="How important is lower-impact travel?" hint="This helps EcoTrail balance greener options with your other preferences." />
      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-medium-gray">Not a priority</span>
          <span className="text-sm font-medium text-forest-700">{SUSTAIN_OPTS[sustain]}</span>
        </div>
        <input type="range" min={0} max={4} value={sustain} onChange={(e) => setSustain(Number(e.target.value))} className="w-full accent-emerald-500" />
        <div className="flex justify-between">
          {SUSTAIN_OPTS.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i <= sustain ? "bg-emerald-500" : "bg-mist"}`} />
          ))}
        </div>
      </div>
    </div>,

    // 3 — Accessibility
    <div key="access">
      <StepTitle small="Inclusive travel" title="What accessibility features should EcoTrail prioritize?" hint="These help us personalize recommendations. Share only what you're comfortable with." />
      <div className={`mt-6 grid gap-3 sm:grid-cols-2 ${accessSkip ? "pointer-events-none opacity-40" : ""}`}>
        {ACCESS_OPTS.map(([icon, label]) => (
          <Chip key={label} icon={icon} label={label} selected={access.includes(label)} onClick={() => toggle(access, setAccess, label)} />
        ))}
      </div>
      <button
        onClick={() => { setAccessSkip((v) => !v); setAccess([]); }}
        className="mt-4 flex items-center gap-2.5 text-sm text-slate-gray"
      >
        <span className={`grid h-5 w-5 place-items-center rounded-[5px] border-2 transition-colors ${accessSkip ? "border-primary bg-primary text-white" : "border-mist"}`}>
          {accessSkip && <Icon.Check size={13} />}
        </span>
        Prefer not to specify
      </button>
    </div>,

    // 4 — Budget
    <div key="budget">
      <StepTitle small="Planning" title="What is your typical travel budget?" hint="Keep it simple — you can refine per trip later." />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-medium-gray">Budget level</span>
          <span className="text-lg font-semibold text-forest-700">{budgetLabel}</span>
        </div>
        <input type="range" min={0} max={100} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="mt-3 w-full accent-emerald-500" />
        <div className="mt-1 text-center font-mono text-sm text-charcoal">{budgetRange}</div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <span className="mb-2 block text-[13px] font-medium text-charcoal">Currency</span>
            <div className="flex gap-2">
              {["INR", "USD", "EUR"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`h-9 flex-1 rounded-lg border text-sm font-medium transition-colors ${currency === c ? "border-primary bg-sage-100 text-forest-700" : "border-border text-slate-gray hover:bg-soft-gray"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="mb-2 block text-[13px] font-medium text-charcoal">Preference</span>
            <div className="flex gap-2">
              {[["Flexible", true], ["Strict", false]].map(([label, val]) => (
                <button
                  key={label as string}
                  onClick={() => setFlexible(val as boolean)}
                  className={`h-9 flex-1 rounded-lg border text-sm font-medium transition-colors ${flexible === val ? "border-primary bg-sage-100 text-forest-700" : "border-border text-slate-gray hover:bg-soft-gray"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,

    // 5 — Convenience
    <div key="conv">
      <StepTitle small="The trade-off" title="How much convenience would you trade for a greener option?" hint="This helps EcoTrail weigh your recommendations. You stay in control." />
      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-forest-700">
            <Icon.Route size={15} /> {CONV_LABELS[conv]}
          </span>
        </div>
        <input type="range" min={0} max={2} value={conv} onChange={(e) => setConv(Number(e.target.value))} className="w-full accent-emerald-500" />
        <div className="mt-3 flex justify-between text-xs text-medium-gray">
          {CONV_LABELS.map((l, i) => (
            <span key={l} className={`max-w-[30%] text-center ${i === conv ? "font-medium text-forest-700" : ""}`}>{l}</span>
          ))}
        </div>
      </div>
    </div>,

    // 6 — Summary
    <div key="summary">
      <StepTitle small="Review" title="Your EcoTrail profile" hint="Here's how we'll personalize your recommendations." />
      <div className="mt-6 space-y-3">
        {[
          ["Compass" as IconName, "Travel", travel.length ? travel.join(", ") : "Open to anything"],
          ["Leaf" as IconName, "Sustainability", SUSTAIN_OPTS[sustain]],
          ["Accessibility" as IconName, "Accessibility", accessSkip || !access.length ? "Not specified" : access.join(", ")],
          ["Money" as IconName, "Budget", `${budgetLabel} · ${flexible ? "Flexible" : "Strict"} (${currency})`],
          ["Route" as IconName, "Convenience", CONV_LABELS[conv]],
        ].map(([icon, k, v]) => {
          const I = Icon[icon as IconName];
          return (
            <div key={k as string} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sage-100 text-forest-700">
                <I size={18} />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-medium uppercase tracking-wide text-medium-gray">{k}</div>
                <div className="text-sm font-medium text-charcoal">{v}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>,
  ];

  const isFirst = step === 0;
  const isLast = step === STEP_COUNT - 1;
  const canNext =
    step === 1 ? travel.length > 0 : step === 3 ? access.length > 0 || accessSkip : true;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ProgressHeader step={step} go={go} />

      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl overflow-hidden">
          <div
            key={step}
            style={
              reduce
                ? undefined
                : {
                    animation: `slide-${dir > 0 ? "in-right" : "in-left"} 350ms cubic-bezier(.16,1,.3,1)`,
                  }
            }
          >
            {steps[step]}
          </div>
        </div>
      </div>

      {/* Footer nav (welcome has its own CTA) */}
      {!isFirst && (
        <footer className="sticky bottom-0 border-t border-border bg-warm-white/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-4 px-6 py-4">
            <Button variant="ghost" icon="Chevron" onClick={back} className="[&_svg]:rotate-180">
              Back
            </Button>
            <div className="flex items-center gap-3">
              {(step === 1 || step === 3) && !canNext && (
                <span className="hidden text-xs text-medium-gray sm:block">Select at least one</span>
              )}
              {step === 3 && (
                <Button variant="tertiary" onClick={next}>Skip</Button>
              )}
              {isLast ? (
                <Button icon="Check" onClick={() => setDone(true)}>Create My Travel Profile</Button>
              ) : (
                <Button iconRight="Chevron" disabled={!canNext} onClick={next}>Next</Button>
              )}
            </div>
          </div>
        </footer>
      )}

      <style>{`
        @keyframes slide-in-right { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }
        @keyframes slide-in-left { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}

function StepTitle({ small, title, hint }: { small: string; title: string; hint: string }) {
  return (
    <div>
      <span className="font-mono text-xs uppercase tracking-widest text-emerald-500">{small}</span>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-near-black md:text-3xl">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-gray">{hint}</p>
    </div>
  );
}
