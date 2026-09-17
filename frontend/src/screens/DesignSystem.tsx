import { useState } from "react";
import { Icon, type IconName } from "../components/icons";
import {
  Panel,
  Eyebrow,
  SectionHeader,
  Button,
  Badge,
  TONE,
  CircularScore,
  ProgressBar,
  ComparisonBar,
  Field,
  inputBase,
  Toggle,
  AiThinking,
  Logo,
} from "../components/ui";

function Sparkline() {
  const pts = [16, 14, 15, 11, 12, 9, 10, 7, 8, 6, 5];
  const w = 200;
  const h = 56;
  const max = Math.max(...pts);
  const path = pts
    .map((v, i) => `${(i / (pts.length - 1)) * w},${h - (v / max) * (h - 6) - 3}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <polyline
        points={path}
        fill="none"
        stroke="var(--color-emerald-500)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon points={`${path} ${w},${h} 0,${h}`} fill="url(#spark)" opacity="0.18" />
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-emerald-500)" />
          <stop offset="100%" stopColor="var(--color-emerald-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function DesignSystem({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState("Plan");
  const [toggle, setToggle] = useState(true);
  const [checks, setChecks] = useState({ ev: true, rail: false });
  const [radio, setRadio] = useState("rail");
  const [slider, setSlider] = useState(65);

  const nav = ["Plan", "Explore", "Trips", "Impact"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-warm-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Logo />
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-medium-gray hover:text-forest-700"
          >
            <Icon.Chevron size={14} className="rotate-180" /> Back to product
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-24 px-6 py-16 pb-32">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-500">
            Phase 1 · Reference
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Design system</h1>
          <p className="mt-3 max-w-xl text-slate-gray">
            The single source of truth every EcoTrail screen is built from.
          </p>
        </div>

        {/* Color */}
        <section className="space-y-8">
          <SectionHeader
            index="01"
            title="Color system"
            desc="Neutral surfaces carry the interface; forest green is reserved for emphasis and action. Semantic and product tokens are always paired with an icon and label."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Panel>
              <Eyebrow>Brand & neutrals</Eyebrow>
              <div className="grid grid-cols-6 gap-2">
                {[
                  ["forest-800", "#123726"],
                  ["forest-700", "#1B4332"],
                  ["forest-500", "#2D6A4F"],
                  ["emerald-500", "#40916C"],
                  ["sage-300", "#95C4AB"],
                  ["sage-100", "#E4EFE8"],
                  ["near-black", "#10160F"],
                  ["charcoal", "#2B332F"],
                  ["slate-gray", "#5A655F"],
                  ["medium-gray", "#8B9691"],
                  ["mist", "#DFE4E1"],
                  ["warm-white", "#F8F8F4"],
                ].map(([name, hex]) => (
                  <div key={name}>
                    <div
                      className="h-14 rounded-lg border border-black/5"
                      style={{ background: `var(--color-${name})` }}
                    />
                    <div className="mt-1 truncate text-[10px] font-medium text-charcoal">{name}</div>
                    <div className="font-mono text-[9px] text-medium-gray">{hex}</div>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel>
              <Eyebrow>Semantic & product</Eyebrow>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  ["Success", "var(--color-success)"],
                  ["Warning", "var(--color-warning)"],
                  ["Error", "var(--color-error)"],
                  ["Info", "var(--color-info)"],
                  ["Carbon", "var(--color-carbon)"],
                  ["Accessibility", "var(--color-access)"],
                  ["AI", "var(--color-ai)"],
                  ["Weather", "var(--color-weather)"],
                ].map(([name, v]) => (
                  <div key={name} className="flex items-center gap-2.5 rounded-lg border border-border p-2">
                    <span className="h-8 w-8 shrink-0 rounded-md" style={{ background: v }} />
                    <span className="text-xs font-medium text-charcoal">{name}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-8">
          <SectionHeader
            index="02"
            title="Typography"
            desc="Inter across the board. Large headings read editorial and premium; body sizes stay quiet and legible. JetBrains Mono handles metrics and tokens."
          />
          <Panel className="divide-y divide-border">
            {[
              ["Display", "text-5xl md:text-6xl font-bold tracking-tight", "Travel greener"],
              ["H1", "text-4xl font-bold tracking-tight", "Plan a low-carbon journey"],
              ["H2", "text-3xl font-semibold tracking-tight", "Recommended eco-twins"],
              ["H3", "text-2xl font-semibold", "Accessibility at a glance"],
              ["Body", "text-base leading-relaxed text-charcoal", "Every recommendation shows its data source."],
              ["Caption", "text-xs text-medium-gray", "Last verified 12 Sep 2026 via OpenStreetMap"],
            ].map(([name, cls, sample]) => (
              <div key={name} className="flex items-baseline gap-6 py-4">
                <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-widest text-medium-gray">
                  {name}
                </span>
                <span className={`text-near-black ${cls}`}>{sample}</span>
              </div>
            ))}
          </Panel>
        </section>

        {/* Icons */}
        <section className="space-y-8">
          <SectionHeader
            index="03"
            title="Icon system"
            desc="One outline style on a 24px grid — travel, mobility, carbon, accessibility, AI and utility. Always paired with a text label in context."
          />
          <Panel>
            <div className="grid grid-cols-4 gap-y-6 sm:grid-cols-6 md:grid-cols-8">
              {(Object.keys(Icon) as IconName[]).map((name) => {
                const I = Icon[name];
                return (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-warm-white text-forest-700 transition-colors hover:border-emerald-400 hover:text-emerald-500">
                      <I size={20} />
                    </span>
                    <span className="text-[10px] text-medium-gray">{name}</span>
                  </div>
                );
              })}
            </div>
          </Panel>
        </section>

        {/* Buttons + forms */}
        <section className="space-y-8">
          <SectionHeader
            index="04"
            title="Buttons & forms"
            desc="Five button variants, three sizes, and inputs with clear focus, filled, error and success states."
          />
          <Panel className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" icon="AI">Primary</Button>
              <Button variant="secondary" icon="Leaf">Secondary</Button>
              <Button variant="tertiary" icon="Route">Tertiary</Button>
              <Button variant="ghost" icon="Sliders">Ghost</Button>
              <Button variant="destructive" icon="Close">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Panel>
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel className="space-y-5">
              <Field label="Search">
                <div className="relative">
                  <Icon.Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-medium-gray" />
                  <input className={`${inputBase} border-border pl-9`} placeholder="Where to?" />
                </div>
              </Field>
              <Field label="Error state" hint="Enter a valid destination" state="error">
                <input className={`${inputBase} border-error focus:ring-error/40 focus:border-error`} defaultValue="xyz" />
              </Field>
              <Field label="Success state" hint="Looks good" state="success">
                <input className={`${inputBase} border-success focus:ring-success/40`} defaultValue="Lisbon, Portugal" />
              </Field>
            </Panel>
            <Panel className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                <span className="text-sm text-charcoal">Prefer accessible routes</span>
                <Toggle on={toggle} onClick={() => setToggle((v) => !v)} />
              </div>
              <div className="space-y-2">
                {([["ev", "Include EV options"], ["rail", "Rail only"]] as const).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setChecks((c) => ({ ...c, [k]: !c[k] }))}
                    className="flex w-full items-center gap-2.5 text-sm text-charcoal"
                  >
                    <span className={`grid h-5 w-5 place-items-center rounded-[5px] border-2 transition-colors ${checks[k] ? "border-primary bg-primary text-white" : "border-mist"}`}>
                      {checks[k] && <Icon.Check size={13} />}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {[["rail", "Fastest low-carbon"], ["cheap", "Cheapest"]].map(([k, label]) => (
                  <button key={k} onClick={() => setRadio(k)} className="flex w-full items-center gap-2.5 text-sm text-charcoal">
                    <span className={`grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${radio === k ? "border-primary" : "border-mist"}`}>
                      {radio === k && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
              <Field label={`Slider · ${slider}% renewable`}>
                <input type="range" value={slider} onChange={(e) => setSlider(Number(e.target.value))} className="w-full accent-emerald-500" />
              </Field>
            </Panel>
          </div>
        </section>

        {/* Cards + badges */}
        <section className="space-y-8">
          <SectionHeader
            index="05"
            title="Cards, badges & trust"
            desc="Rich cards and verification signals. Information is never carried by color alone — every badge combines an icon, a label and a tone."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <Panel>
              <div className="flex items-center justify-between">
                <Eyebrow>Carbon this month</Eyebrow>
                <Badge icon="Leaf" label="-38%" tone={TONE.verified} />
              </div>
              <div className="font-mono text-4xl font-semibold text-near-black">
                42.6<span className="text-lg text-medium-gray"> kg</span>
              </div>
              <div className="mt-3"><Sparkline /></div>
            </Panel>
            <Panel className="flex flex-col">
              <span className="text-xs font-medium text-medium-gray">Upcoming trip</span>
              <h4 className="mt-1 text-lg font-semibold text-near-black">Paris → Amsterdam</h4>
              <div className="mt-3 flex items-center gap-2 text-sm text-charcoal">
                <Icon.Train size={16} className="text-emerald-500" /> Direct rail · 3h 20m
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <ProgressBar value={82} label="Green score" detail="82 / 100" />
              </div>
            </Panel>
            <Panel>
              <Eyebrow>Badges</Eyebrow>
              <div className="flex flex-wrap gap-2">
                <Badge icon="Verified" label="Verified" tone={TONE.verified} />
                <Badge icon="Carbon" label="Low carbon" tone={TONE.carbon} />
                <Badge icon="Accessibility" label="Step-free" tone={TONE.access} />
                <Badge icon="Info" label="Estimated" tone={TONE.estimated} />
                <Badge icon="AI" label="AI supported" tone={TONE.ai} />
                <Badge icon="Warning" label="Unverified" tone={TONE.warning} />
              </div>
            </Panel>
          </div>
        </section>

        {/* AI + data viz */}
        <section className="space-y-8">
          <SectionHeader
            index="06"
            title="AI & data visualization"
            desc="A distinct violet channel separates AI voice from the product's green, with calm working states and quiet metric primitives."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel className="space-y-4">
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  Plan me a low-carbon, wheelchair-accessible weekend from Berlin.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ai-soft text-ai">
                  <Icon.AI size={17} />
                </span>
                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-border bg-card px-4 py-2.5 text-sm text-charcoal">
                  Here are three step-free options by rail. The greenest is Berlin → Dresden,
                  <b className="text-forest-700"> 11.4kg CO₂e</b>.
                </div>
              </div>
              <AiThinking label="Calculating carbon across 3 routes…" />
            </Panel>
            <Panel>
              <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
                <div className="flex justify-center gap-6">
                  <CircularScore value={82} label="Green" />
                  <CircularScore value={94} label="Access" color="var(--color-access)" />
                </div>
                <div className="space-y-4">
                  <ProgressBar value={68} label="Carbon budget" detail="6.8 / 10 t" color="var(--color-carbon)" />
                  <ComparisonBar
                    a={{ label: "This trip", value: 44, color: "var(--color-emerald-500)" }}
                    b={{ label: "Average", value: 130, color: "var(--color-medium-gray)" }}
                  />
                </div>
              </div>
            </Panel>
          </div>
        </section>

        {/* Navigation */}
        <section className="space-y-8">
          <SectionHeader
            index="07"
            title="Navigation"
            desc="Premium and minimal — a desktop bar and a mobile bottom tab set with large touch targets."
          />
          <div className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3 elev-card">
            <Logo size="sm" />
            <nav className="flex gap-1">
              {nav.map((n) => (
                <button
                  key={n}
                  onClick={() => setTab(n)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    tab === n ? "bg-sage-100 text-forest-700" : "text-slate-gray hover:bg-soft-gray"
                  }`}
                >
                  {n}
                </button>
              ))}
            </nav>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sage-200 text-forest-700 text-xs font-semibold">
              AK
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
