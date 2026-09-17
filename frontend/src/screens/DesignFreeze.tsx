import { useState } from "react";
import { Icon } from "../components/icons";
import { Button, Badge, TONE, Logo } from "../components/ui";

type Go = (route: string) => void;

/* ============================================================
   Phase 10 — Final validation & DESIGN FREEZE.
   Organises the approved product into Final Approved Screens,
   Final Demo, Final Developer Handoff, a QA scorecard and the
   locked-design register. Documentation only — no redesign,
   no new visual language, no workflow change.
   ============================================================ */

const SECTIONS: { id: string; label: string }[] = [
  { id: "approved", label: "Approved screens" },
  { id: "demo", label: "Final demo" },
  { id: "developer", label: "Developer set" },
  { id: "scorecard", label: "QA scorecard" },
  { id: "locked", label: "Design freeze" },
];

export default function DesignFreeze({ go }: { go: Go }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-warm-white text-near-black">
      <header className="sticky top-0 z-40 border-b border-border bg-warm-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <button onClick={() => go("landing")} className="flex items-center gap-2" aria-label="EcoTrail home">
            <Logo size="sm" />
            <span className="hidden text-xs font-medium text-medium-gray sm:inline">Design freeze · Phase 10</span>
          </button>
          <nav className="hidden items-center gap-1 lg:flex">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-slate-gray transition-colors hover:bg-soft-gray hover:text-charcoal">{s.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen((v) => !v)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-gray hover:bg-soft-gray lg:hidden" aria-label="Sections">
              <Icon.Sliders size={18} />
            </button>
            <Button size="sm" variant="tertiary" icon="Layers" onClick={() => go("handoff")}>Handoff</Button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
            <div className="flex flex-wrap gap-1.5">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="rounded-md bg-soft-gray px-2.5 py-1 text-xs font-medium text-charcoal">{s.label}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* Intro */}
        <section className="pt-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-forest-700"><Icon.Verified size={13} /> Phase 10 · Final validation &amp; freeze</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-near-black md:text-4xl">Design frozen</h1>
          <p className="mt-2 max-w-2xl text-slate-gray">The approved EcoTrail experience, validated with realistic content, data density and failure conditions. The question is no longer "does this look good?" but "can a real traveler actually use this?" — yes.</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-mist bg-card p-3 font-mono text-xs text-charcoal">
            {["UNDERSTAND", "COMPARE", "VERIFY", "DECIDE", "TRAVEL", "LEARN"].map((s, i, a) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded bg-soft-gray px-2 py-1">{s}</span>
                {i < a.length - 1 && <Icon.Chevron size={12} className="text-emerald-500" />}
              </span>
            ))}
          </div>
        </section>

        {/* Final approved screens */}
        <Frame id="approved" n="01" title="Final approved screens" sub="The polished production set. States & edge cases live in their own sections.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Entry", "landing"], ["Auth", "login"], ["Onboarding", "onboarding"], ["Home", "home"],
              ["Discover", "discover"], ["Destination", "discover"], ["Planner", "planner"],
              ["Recommendations", "planner"], ["Eco-Twin", "planner"], ["Show Your Math", "planner"],
              ["Accessibility", "accessibility"], ["Itinerary", "itinerary"], ["My Trips", "mytrips"],
              ["Eco Insights", "insights"], ["Profile", "profile"], ["Settings", "profile"],
            ].map(([name, route]) => (
              <button key={name} onClick={() => go(route)} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left text-sm font-medium text-charcoal transition-all hover:border-forest-600 hover:elev-card">
                {name} <Icon.Chevron size={15} className="text-medium-gray" />
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="#" onClick={(e) => { e.preventDefault(); go("resilience"); }} className="text-sm font-medium text-forest-700 hover:underline">States &amp; edge cases ↗</a>
            <span className="text-medium-gray">·</span>
            <a href="#" onClick={(e) => { e.preventDefault(); go("handoff"); }} className="text-sm font-medium text-forest-700 hover:underline">Developer handoff ↗</a>
          </div>
        </Frame>

        {/* Final demo */}
        <Frame id="demo" n="02" title="Final demo sequence" sub="The strongest 10-step product story. Edge cases stay out of the main demo.">
          <ol className="grid gap-2 md:grid-cols-2">
            {[
              ["Landing", "landing"], ["Home + AI", "home"], ["Planner", "planner"], ["Recommendations", "planner"],
              ["Eco-Twin", "planner"], ["Show Your Math", "planner"], ["Accessibility evidence", "verify"],
              ["Itinerary", "itinerary"], ["My Trips", "mytrips"], ["Eco Insights", "insights"],
            ].map(([name, route], i) => (
              <li key={name}>
                <button onClick={() => go(route)} className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-all hover:border-forest-600 hover:elev-card">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-700 font-mono text-xs font-semibold text-primary-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-sm font-medium text-charcoal">{name}</span>
                  <Icon.Chevron size={15} className="text-medium-gray" />
                </button>
              </li>
            ))}
          </ol>
        </Frame>

        {/* Developer set */}
        <Frame id="developer" n="03" title="Final developer handoff" sub="Unchanged from Phase 9. Reuse the established implementation mapping.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["Design system", "Components", "Variants", "Responsive layouts", "Screen specifications", "State matrix", "Data mapping", "AI boundary", "Accessibility evidence", "Carbon methodology", "Prototype"].map((item) => (
              <button key={item} onClick={() => go(item === "Design system" ? "design-system" : "handoff")} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-charcoal transition-all hover:border-forest-600 hover:elev-card">
                {item} <Icon.Chevron size={14} className="text-medium-gray" />
              </button>
            ))}
          </div>
        </Frame>

        {/* QA scorecard */}
        <Frame id="scorecard" n="04" title="Final QA scorecard" sub="Every dimension validated against realistic conditions.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Design", ["Consistent", "Polished", "Responsive"]],
              ["UX", ["Clear", "Predictable", "Recoverable"]],
              ["Accessibility", ["WCAG 2.2 AA", "Inclusive", "Evidence-aware"]],
              ["Trust", ["Source-aware", "Estimated values labeled", "Uncertainty communicated"]],
              ["AI", ["Useful", "Explainable", "Not authoritative"]],
              ["Data", ["Realistic", "Partial-data tolerant", "Failure tolerant"]],
              ["Prototype", ["Complete", "No dead ends", "Demo-ready"]],
              ["Developer", ["Componentized", "Annotated", "Implementation-aware"]],
            ].map(([group, items]) => (
              <div key={group as string} className="rounded-2xl border border-border bg-card p-5 elev-card">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-forest-700">{group as string}</h3>
                <ul className="mt-3 space-y-1.5">
                  {(items as string[]).map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-charcoal"><Icon.Check size={13} className="shrink-0 text-success" /> {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Frame>

        {/* Locked */}
        <Frame id="locked" n="05" title="Design freeze register" sub="Locked after Phase 10. Future changes are implementation adjustments, not redesign.">
          <div className="flex flex-wrap gap-2">
            {["Brand", "Colors", "Typography", "Navigation", "Core components", "Main workflows", "Page hierarchy", "Eco-Twin experience", "Green & Accessible Score", "Show Your Math", "Accessibility evidence model", "Itinerary structure", "Responsive strategy"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-charcoal">
                <Icon.Verified size={13} className="text-verified" /> {item}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge icon="Info" label="Illustrative demo data throughout the prototype" tone={TONE.estimated} />
            <Badge icon="Verified" label="No fake values presented as live" tone={TONE.verified} />
          </div>

          <div className="mt-6 rounded-2xl border border-forest-700 bg-gradient-to-br from-forest-800 to-forest-600 p-8 text-primary-foreground">
            <p className="text-lg font-medium">"Don't hide complexity. Turn it into understandable decisions."</p>
            <p className="mt-3 max-w-2xl text-emerald-100">AI understands the traveler · data grounds the information · deterministic logic evaluates the options · evidence communicates trust · the traveler makes the final decision.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="secondary" icon="Route" onClick={() => go("landing")}>Start the prototype</Button>
              <Button variant="ghost" icon="Compass" onClick={() => go("presentation")}>Presentation deck</Button>
              <Button variant="ghost" icon="Layers" onClick={() => go("handoff")}>Developer handoff</Button>
            </div>
          </div>
        </Frame>
      </main>
    </div>
  );
}

function Frame({ id, n, title, sub, children }: { id: string; n: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 pt-14">
      <div className="mb-5">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-emerald-500">{n}</span>
          <h2 className="text-2xl font-bold tracking-tight text-near-black">{title}</h2>
        </div>
        <p className="mt-1 text-slate-gray">{sub}</p>
      </div>
      {children}
    </section>
  );
}
