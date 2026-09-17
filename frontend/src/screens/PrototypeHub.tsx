import { Icon, type IconName } from "../components/icons";
import { Button, Logo, Badge, TONE } from "../components/ui";

type Go = (route: string) => void;

/* ============================================================
   Phase 12 — Interactive prototype entry point.
   A launcher over the REAL (already interactive) product
   screens: START HERE full demo, five focused flows, and a
   2–3 min Judge Demo. No screen redesign — this only guides
   navigation through the existing frozen product.
   ============================================================ */

export type DemoStep = { route: string; label: string; hint?: string };
export type DemoFlow = { key: string; title: string; desc: string; icon: IconName; steps: DemoStep[] };

export const DEMO_FLOWS: Record<string, DemoFlow> = {
  full: {
    key: "full", title: "Full product demo", icon: "Route",
    desc: "The complete journey: ask → understand → plan → compare → verify → choose → organize → save → understand impact.",
    steps: [
      { route: "landing", label: "Landing", hint: "Start with the product story." },
      { route: "login", label: "Sign in", hint: "Simulated auth — any details continue." },
      { route: "onboarding", label: "Onboarding", hint: "Set travel style. Accessibility disclosure is optional." },
      { route: "home", label: "Home + AI", hint: "Type: \"Plan a 3-day accessible trip from Pune to Goa under ₹15,000.\"" },
      { route: "planner", label: "Planner", hint: "Adjust priorities → score & ranking recalculate." },
      { route: "planner", label: "Eco-Twin & Show Your Math", hint: "Compare Standard vs Eco-Twin; expand the carbon math." },
      { route: "itinerary", label: "Itinerary", hint: "Select a day, open an activity, try Edit." },
      { route: "mytrips", label: "My Trips", hint: "Browse by Upcoming / Completed / Saved." },
      { route: "trip-detail", label: "Trip detail", hint: "Review score, readiness, Share (privacy-safe), Delete." },
      { route: "insights", label: "Eco Insights", hint: "See estimated impact vs a standard trip." },
    ],
  },
  ai: {
    key: "ai", title: "AI flow", icon: "AI",
    desc: "Natural-language request → progressive understanding → structured requirements → recommendation. AI assists; it never verifies.",
    steps: [
      { route: "home", label: "AI Command Center", hint: "Type a trip request and submit — watch the processing stages." },
      { route: "home", label: "AI failure & recovery", hint: "Type a request containing \"error\" to see Try Again / alternatives." },
      { route: "planner", label: "Continue in Planner", hint: "Requirements carry into the planning workspace." },
    ],
  },
  accessibility: {
    key: "accessibility", title: "Accessibility flow", icon: "Accessibility",
    desc: "Evidence with sources, Unknown that stays Unknown, and photo verification. AI Supported never implies verification.",
    steps: [
      { route: "planner", label: "Evidence detail", hint: "Open Accessibility → status, meaning, evidence, source." },
      { route: "verify", label: "Photo verification", hint: "Upload → type → processing → result. Preview each of the 5 outcomes." },
      { route: "itinerary", label: "In-itinerary access", hint: "Tap an accessibility badge for per-stop detail." },
    ],
  },
  ecotwin: {
    key: "ecotwin", title: "Eco-Twin flow", icon: "Leaf",
    desc: "A lower-impact alternative shown side-by-side with honest trade-offs and estimated CO₂e.",
    steps: [
      { route: "planner", label: "Standard vs Eco-Twin", hint: "Compare cost, time, CO₂e, accessibility and score." },
      { route: "planner", label: "Show Your Math", hint: "Expand the segment-by-segment carbon estimate." },
      { route: "trip-detail", label: "Eco-Twin on a trip", hint: "The comparison persists on a saved trip." },
    ],
  },
  failure: {
    key: "failure", title: "Failure / recovery flow", icon: "Warning",
    desc: "The product stays usable when data or services fail — the strongest trust demonstration.",
    steps: [
      { route: "home", label: "AI request fails", hint: "Type a request with \"error\" → Try Again / plan another way." },
      { route: "itinerary", label: "Offline & sync", hint: "Toggle your device offline — saved itinerary stays available, then syncs." },
      { route: "resilience", label: "Full edge-case gallery", hint: "Every no-results / conflict / unavailable state in one place." },
    ],
  },
  itinerary: {
    key: "itinerary", title: "Itinerary flow", icon: "Calendar",
    desc: "Build → review day-by-day → edit safely (no silent data loss) → save.",
    steps: [
      { route: "planner", label: "Build itinerary", hint: "Select an option → Build My Itinerary." },
      { route: "itinerary", label: "Edit & save", hint: "Reorder or remove an activity; leaving with unsaved changes is guarded." },
    ],
  },
};

const JUDGE: DemoStep[] = [
  { route: "landing", label: "Landing" },
  { route: "home", label: "Home" },
  { route: "home", label: "AI request" },
  { route: "planner", label: "Planner" },
  { route: "planner", label: "Recommendations" },
  { route: "planner", label: "Green & Accessible Score" },
  { route: "planner", label: "Eco-Twin" },
  { route: "planner", label: "Show Your Math" },
  { route: "planner", label: "Accessibility evidence" },
  { route: "itinerary", label: "Itinerary" },
  { route: "insights", label: "Eco Insights" },
];

export default function PrototypeHub({ go, startDemo }: { go: Go; startDemo: (key: string) => void }) {
  const secondary = ["ai", "accessibility", "ecotwin", "failure", "itinerary"];
  return (
    <div className="min-h-screen bg-warm-white text-near-black">
      <header className="sticky top-0 z-40 border-b border-border bg-warm-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <button onClick={() => go("landing")} className="flex items-center gap-2" aria-label="EcoTrail home">
            <Logo size="sm" />
            <span className="hidden text-xs font-medium text-medium-gray sm:inline">Interactive prototype · Phase 12</span>
          </button>
          <Button size="sm" variant="tertiary" icon="Compass" onClick={() => go("presentation")}>Presentation</Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        {/* START HERE */}
        <section className="pt-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-forest-700"><Icon.Route size={13} /> Phase 12 · Interactive prototype</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-near-black md:text-4xl">Start here</h1>
          <p className="mt-2 max-w-2xl text-slate-gray">Every action produces an understandable system response. Launch a guided walkthrough of the real product — a floating stepper keeps you on track and you interact with the live screens.</p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-forest-700 bg-gradient-to-br from-forest-800 to-forest-600 p-8 text-primary-foreground">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-100"><Icon.Route size={14} /> Full product demo</div>
            <h2 className="mt-2 text-2xl font-bold">START HERE — full product demo</h2>
            <p className="mt-2 max-w-xl text-emerald-100">{DEMO_FLOWS.full.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="secondary" icon="Route" onClick={() => startDemo("full")}>Start guided demo</Button>
              <Button variant="ghost" icon="Compass" onClick={() => go("landing")}>Explore freely</Button>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-emerald-100/80"><Icon.Info size={13} /> Illustrative demo data throughout — nothing shown as live or booked.</p>
          </div>
        </section>

        {/* Judge demo */}
        <section className="pt-14">
          <div className="mb-5">
            <div className="flex items-baseline gap-3"><span className="font-mono text-sm text-emerald-500">01</span><h2 className="text-2xl font-bold tracking-tight text-near-black">Judge demo</h2></div>
            <p className="mt-1 text-slate-gray">The tightest 11-step story, ~2–3 minutes. Avoids side-trips.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 elev-card">
            <ol className="grid gap-2 sm:grid-cols-2">
              {JUDGE.map((s, i) => (
                <li key={i}>
                  <button onClick={() => go(s.route)} className="flex w-full items-center gap-3 rounded-xl border border-border bg-warm-white px-4 py-2.5 text-left transition-all hover:border-forest-600 hover:elev-card">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-700 font-mono text-xs font-semibold text-primary-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-sm font-medium text-charcoal">{s.label}</span>
                    <Icon.Chevron size={15} className="text-medium-gray" />
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-4">
              <Button variant="primary" icon="Route" onClick={() => startDemo("full")}>Run as guided demo</Button>
            </div>
          </div>
        </section>

        {/* Secondary flows */}
        <section className="pt-14">
          <div className="mb-5">
            <div className="flex items-baseline gap-3"><span className="font-mono text-sm text-emerald-500">02</span><h2 className="text-2xl font-bold tracking-tight text-near-black">Focused flows</h2></div>
            <p className="mt-1 text-slate-gray">Deep-dive a single capability. Each launches a short guided sequence.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {secondary.map((k) => {
              const f = DEMO_FLOWS[k];
              const I = Icon[f.icon];
              return (
                <div key={k} className="flex flex-col rounded-2xl border border-border bg-card p-5 elev-card">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-sage-100 text-forest-700"><I size={18} /></span>
                    <h3 className="font-semibold text-near-black">{f.title}</h3>
                  </div>
                  <p className="mt-2 flex-1 text-sm text-slate-gray">{f.desc}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-xs text-medium-gray">{f.steps.length} steps</span>
                    <Button size="sm" variant="secondary" iconRight="Chevron" onClick={() => startDemo(k)}>Start</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust reminder */}
        <section className="pt-14">
          <div className="rounded-2xl border border-mist bg-card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-charcoal"><Icon.Verified size={16} className="text-verified" /> What the prototype never implies</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {[
                "AI ≠ verified information",
                "Estimated carbon ≠ exact measurement",
                "Unknown accessibility ≠ accessible",
                "Business declaration ≠ independent verification",
                "Demo data ≠ live data",
                "Unavailable data ≠ zero",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-lg bg-warm-white px-3 py-2 text-sm text-charcoal"><Icon.Check size={13} className="shrink-0 text-success" /> {t}</div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge icon="Info" label="Illustrative demo data" tone={TONE.estimated} />
              <Badge icon="Verified" label="No fake values shown as live" tone={TONE.verified} />
            </div>
          </div>
          <p className="mt-6 text-center text-sm italic text-medium-gray">"Every user action should produce an understandable system response."</p>
        </section>
      </main>
    </div>
  );
}

/* Floating guided-demo controller — rendered by App above all screens. */
export function DemoBar({ flow, index, onPrev, onNext, onExit }: { flow: DemoFlow; index: number; onPrev: () => void; onNext: () => void; onExit: () => void }) {
  const step = flow.steps[index];
  const first = index === 0;
  const last = index === flow.steps.length - 1;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center p-3 sm:p-4">
      <div className="pointer-events-auto w-full max-w-2xl rounded-2xl border border-forest-700 bg-forest-800 text-primary-foreground shadow-2xl">
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest-600 font-mono text-xs font-semibold">{index + 1}/{flow.steps.length}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="truncate">{step.label}</span>
              <span className="hidden rounded-full bg-forest-700 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-100 sm:inline">{flow.title}</span>
            </div>
            {step.hint && <p className="mt-0.5 truncate text-xs text-emerald-100/90">{step.hint}</p>}
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={onPrev} disabled={first} className="grid h-8 w-8 place-items-center rounded-lg text-primary-foreground transition-colors hover:bg-forest-700 disabled:opacity-40" aria-label="Previous step">
              <Icon.Chevron size={16} className="rotate-180" />
            </button>
            {last ? (
              <button onClick={onExit} className="rounded-lg bg-primary-foreground px-3 py-1.5 text-sm font-semibold text-forest-800 transition-colors hover:bg-emerald-50">Finish</button>
            ) : (
              <button onClick={onNext} className="flex items-center gap-1 rounded-lg bg-primary-foreground px-3 py-1.5 text-sm font-semibold text-forest-800 transition-colors hover:bg-emerald-50">Next <Icon.Chevron size={15} /></button>
            )}
            <button onClick={onExit} className="grid h-8 w-8 place-items-center rounded-lg text-emerald-100 transition-colors hover:bg-forest-700" aria-label="Exit demo">
              <Icon.Close size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
