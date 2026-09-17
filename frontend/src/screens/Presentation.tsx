import { useState } from "react";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, CircularScore, Logo } from "../components/ui";
import { EVIDENCE_META, type Evidence } from "../data/tripOptions";

type Go = (route: string) => void;

/* ============================================================
   Phase 7 — Presentation / Judge deck.
   Documentation + demo-readiness. Reuses the established design
   system; adds no product functionality.
   ============================================================ */

const SECTIONS: { id: string; label: string }[] = [
  { id: "cover", label: "Cover" },
  { id: "overview", label: "Overview" },
  { id: "workflow", label: "Workflow" },
  { id: "differentiators", label: "Differentiators" },
  { id: "eco-twin", label: "Eco-Twin" },
  { id: "math", label: "Show Your Math" },
  { id: "trust", label: "Accessibility Trust" },
  { id: "ai-boundary", label: "AI Boundary" },
  { id: "journey", label: "User Journey" },
  { id: "inventory", label: "Screen Inventory" },
  { id: "tokens", label: "Design Tokens" },
  { id: "demo", label: "Demo Flow" },
  { id: "architecture", label: "Architecture" },
  { id: "handoff", label: "Handoff" },
  { id: "qa", label: "QA Checklist" },
];

export default function Presentation({ go }: { go: Go }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-warm-white text-near-black">
      {/* Deck top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-warm-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <button onClick={() => go("landing")} className="flex items-center gap-2" aria-label="EcoTrail home">
            <Logo size="sm" />
            <span className="hidden text-xs font-medium text-medium-gray sm:inline">Presentation deck</span>
          </button>
          <nav className="hidden items-center gap-1 overflow-x-auto lg:flex">
            {SECTIONS.slice(1).map((s) => (
              <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-slate-gray transition-colors hover:bg-soft-gray hover:text-charcoal">
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen((v) => !v)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-gray hover:bg-soft-gray lg:hidden" aria-label="Sections">
              <Icon.Sliders size={18} />
            </button>
            <Button size="sm" icon="Route" onClick={() => go("landing")}>Start prototype</Button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
            <div className="flex flex-wrap gap-1.5">
              {SECTIONS.slice(1).map((s) => (
                <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="rounded-md bg-soft-gray px-2.5 py-1 text-xs font-medium text-charcoal">{s.label}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* ---- Cover ---- */}
        <Frame id="cover" bare>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-forest-800 to-forest-600 p-10 text-primary-foreground elev-raised md:p-16">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sage-200">
                <Icon.Leaf size={13} /> Kurukshetra 2.0
              </span>
              <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">EcoTrail 2.0</h1>
              <p className="mt-4 text-lg text-sage-100 md:text-xl">Smart Sustainable &amp; Accessible Hospitality Recommendation Platform</p>
              <p className="mt-6 font-mono text-sm text-emerald-400">Travel greener. Explore smarter.</p>
              <div className="mt-8 flex flex-wrap gap-6 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wide text-sage-300">Team</div>
                  <div className="mt-0.5 font-semibold">Code Atlas</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-sage-300">Team ID</div>
                  <div className="mt-0.5 font-mono font-semibold">KH018</div>
                </div>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button icon="Route" onClick={() => go("landing")}>Start prototype</Button>
                <a href="#demo"><Button variant="secondary" icon="Compass">2–3 minute demo flow</Button></a>
              </div>
            </div>
            <Icon.Leaf size={340} className="pointer-events-none absolute -bottom-24 -right-16 text-white/5" />
          </div>
        </Frame>

        {/* ---- Overview ---- */}
        <Frame id="overview" n="01" title="Project overview" sub="One planning experience that balances what usually competes.">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 elev-card">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-medium-gray"><Icon.Warning size={16} className="text-warning" /> Problem</h3>
              <p className="mt-3 text-charcoal">Travel decisions are fragmented. Travelers struggle to balance:</p>
              <ul className="mt-3 space-y-2">
                {["Sustainability", "Accessibility", "Cost", "Convenience", "Reliable information"].map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-slate-gray"><Icon.Close size={13} className="text-medium-gray" /> {p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-forest-700 bg-sage-100/50 p-6 elev-card">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-forest-700"><Icon.Leaf size={16} /> Solution</h3>
              <p className="mt-3 text-charcoal">EcoTrail combines five layers into one experience:</p>
              <ul className="mt-3 space-y-2">
                {[
                  ["AI", "AI travel understanding"],
                  ["Map", "Real-world travel data"],
                  ["Accessibility", "Accessibility evidence"],
                  ["Carbon", "Deterministic carbon calculation"],
                  ["Info", "Explainable recommendations"],
                ].map(([ic, t]) => {
                  const I = Icon[ic as IconName];
                  return <li key={t} className="flex items-center gap-2 text-sm text-charcoal"><I size={15} className="text-forest-700" /> {t}</li>;
                })}
              </ul>
            </div>
          </div>
        </Frame>

        {/* ---- Workflow ---- */}
        <Frame id="workflow" n="02" title="Product workflow" sub="The core loop, end to end.">
          <div className="flex flex-wrap items-center gap-2">
            {["Discover", "Ask", "Understand", "Plan", "Compare", "Calculate", "Verify", "Choose", "Organize", "Travel", "Understand impact"].map((step, i, a) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-charcoal elev-subtle">{step}</span>
                {i < a.length - 1 && <Icon.Chevron size={14} className="text-emerald-500" />}
              </div>
            ))}
          </div>
        </Frame>

        {/* ---- Differentiators ---- */}
        <Frame id="differentiators" n="03" title="Key product differentiators" sub="What sets EcoTrail apart.">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["AI", "AI Travel Command Center", "Natural-language travel planning that extracts structured requirements."],
              ["Leaf", "Eco-Twin", "A greener alternative optimized for sustainability, accessibility, cost and convenience."],
              ["Verified", "Green & Accessible Score", "An explainable, multi-factor recommendation score with visible weights."],
              ["Carbon", "Show Your Math", "Transparent, deterministic carbon estimation — per segment."],
            ].map(([ic, t, d]) => {
              const I = Icon[ic as IconName];
              return (
                <div key={t} className="rounded-2xl border border-border bg-card p-6 elev-card">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-sage-100 text-forest-700"><I size={22} /></span>
                  <h3 className="mt-4 font-semibold text-near-black">{t}</h3>
                  <p className="mt-1 text-sm text-slate-gray">{d}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-2xl border border-access/30 bg-access-soft/40 p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-card text-access"><Icon.Accessibility size={22} /></span>
            <h3 className="mt-4 font-semibold text-near-black">Accessibility Evidence</h3>
            <p className="mt-1 text-sm text-slate-gray">Every accessibility claim carries a source: Verified · Business declared · OSM supported · AI supported · Unknown · Conflicting · Needs review.</p>
          </div>
        </Frame>

        {/* ---- Eco-Twin ---- */}
        <Frame id="eco-twin" n="04" title="Eco-Twin" sub="A standard option, and its greener, more accessible twin.">
          <div className="mb-4 flex justify-end"><Badge icon="Info" label="Illustrative demo values — not live travel data" tone={TONE.estimated} /></div>
          <div className="grid gap-4 md:grid-cols-2">
            <TwinCard
              tone="neutral" title="Standard option" mode="Flight + Taxi"
              rows={[["Estimated CO₂e", "142 kg"], ["Cost", "₹8,400"], ["Travel time", "3h 10m"], ["Accessibility", "2 / 5"]]}
              score={54}
            />
            <TwinCard
              tone="verified" title="Eco-Twin" mode="Train + Shared EV shuttle" recommended
              rows={[["Estimated CO₂e", "31 kg"], ["Cost", "₹7,650"], ["Travel time", "3h 55m"], ["Accessibility", "5 / 5"]]}
              score={91}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[["+45 min", "more"], ["₹750", "cheaper"], ["78%", "less carbon"], ["Fully", "accessible"]].map(([a, b]) => (
              <div key={b} className="rounded-xl border border-border bg-card p-4 text-center elev-subtle">
                <div className="font-mono text-lg font-bold text-forest-700">{a}</div>
                <div className="text-xs text-medium-gray">{b}</div>
              </div>
            ))}
          </div>
        </Frame>

        {/* ---- Show Your Math ---- */}
        <Frame id="math" n="05" title="Show Your Math" sub="Carbon you can check, not just trust.">
          <div className="flex flex-wrap items-center gap-2 text-center text-sm">
            <span className="flex-1 rounded-lg border border-border bg-card px-3 py-3 font-medium text-charcoal">Activity data<br /><span className="text-xs text-medium-gray">distance / travel activity</span></span>
            <Icon.Close size={16} className="rotate-45 text-medium-gray" />
            <span className="flex-1 rounded-lg border border-border bg-card px-3 py-3 font-medium text-charcoal">Emission factor<br /><span className="text-xs text-medium-gray">mode-specific</span></span>
            <span className="text-medium-gray">=</span>
            <span className="flex-1 rounded-lg border border-carbon/30 bg-carbon-soft px-3 py-3 font-semibold text-carbon">Estimated CO₂e</span>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-soft-gray text-left text-xs uppercase tracking-wide text-medium-gray">
                <tr><th className="px-4 py-2.5">Segment</th><th className="px-4 py-2.5">Distance × factor</th><th className="px-4 py-2.5 text-right">Estimated CO₂e</th></tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                <tr><td className="px-4 py-3 font-medium text-charcoal">Train</td><td className="px-4 py-3 font-mono text-slate-gray">520 km × 0.045</td><td className="px-4 py-3 text-right font-mono text-carbon">23.4 kg</td></tr>
                <tr><td className="px-4 py-3 font-medium text-charcoal">Shared EV shuttle</td><td className="px-4 py-3 font-mono text-slate-gray">60 km × 0.052</td><td className="px-4 py-3 text-right font-mono text-carbon">3.1 kg</td></tr>
                <tr className="bg-carbon-soft/50"><td className="px-4 py-3 font-semibold text-near-black">Total</td><td className="px-4 py-3" /><td className="px-4 py-3 text-right font-mono font-bold text-carbon">26.5 kg</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-medium-gray"><Icon.Info size={14} /> Methodology &amp; source: mode-specific emission factors from published environmental datasets. Values are <span className="font-medium text-charcoal">estimated</span>, never presented as laboratory-precise.</p>
        </Frame>

        {/* ---- Accessibility Trust ---- */}
        <Frame id="trust" n="06" title="Accessibility trust system" sub="Verified, not claimed.">
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(EVIDENCE_META) as Evidence[]).map((k) => {
              const m = EVIDENCE_META[k];
              return (
                <div key={k} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 elev-subtle">
                  <Badge icon={m.icon} label={m.label} tone={TONE[m.tone] ?? TONE.neutral} />
                  <p className="text-sm text-slate-gray">{m.explain}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-4 rounded-lg bg-soft-gray p-3 text-sm text-charcoal"><span className="font-semibold">Principle:</span> uncertain information is never styled to look as strong as verified evidence.</p>
        </Frame>

        {/* ---- AI Boundary ---- */}
        <Frame id="ai-boundary" n="07" title="AI boundary" sub="AI explains. Evidence and deterministic logic decide.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-ai-border bg-ai-soft/50 p-6">
              <h3 className="flex items-center gap-2 font-semibold text-ai"><Icon.AI size={18} /> AI handles</h3>
              <ul className="mt-3 space-y-2 text-sm text-charcoal">
                {["Natural-language understanding", "Requirement extraction", "Semantic matching", "Recommendation explanation", "Itinerary adjustment suggestions"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Icon.Check size={14} className="text-ai" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-forest-700 bg-sage-100/40 p-6">
              <h3 className="flex items-center gap-2 font-semibold text-forest-700"><Icon.Verified size={18} /> Data &amp; rules handle</h3>
              <ul className="mt-3 space-y-2 text-sm text-charcoal">
                {["Carbon calculation", "Accessibility evidence", "Official information", "Prices &amp; schedules", "Source / provenance"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Icon.Check size={14} className="text-forest-700" /> {t.replace("&amp;", "&")}</li>
                ))}
              </ul>
            </div>
          </div>
        </Frame>

        {/* ---- User Journey ---- */}
        <Frame id="journey" n="08" title="Complete user journey" sub="Landing to impact, one continuous path.">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {["Landing", "Auth", "Onboarding", "Home", "AI request", "Discover", "Destination", "Planner", "Recommendations", "Eco-Twin", "Show Your Math", "Select", "Itinerary", "Verify", "Save", "My Trips", "Eco Insights"].map((s, i, a) => (
              <div key={s} className="flex items-center gap-2">
                <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-forest-700">{s}</span>
                {i < a.length - 1 && <span className="text-emerald-500">→</span>}
              </div>
            ))}
          </div>
        </Frame>

        {/* ---- Screen inventory ---- */}
        <Frame id="inventory" n="09" title="Screen inventory" sub="Every major screen, grouped by journey. Click to open the live screen.">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Entry", [["Landing", "landing"], ["Login", "login"], ["Sign up", "signup"], ["Onboarding", "onboarding"]]],
              ["Discovery", [["Home", "home"], ["Discover", "discover"]]],
              ["Decision", [["Planner", "planner"]]],
              ["Travel", [["Itinerary", "itinerary"], ["My Trips", "mytrips"], ["Accessibility", "accessibility"], ["Verification", "verify"]]],
              ["Impact", [["Eco Insights", "insights"]]],
              ["Account", [["Profile", "profile"], ["Design system", "design-system"]]],
            ].map(([group, items]) => (
              <div key={group as string} className="rounded-2xl border border-border bg-card p-5 elev-card">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-medium-gray">{group as string}</h3>
                <div className="mt-3 flex flex-col gap-1.5">
                  {(items as [string, string][]).map(([label, route]) => (
                    <button key={label} onClick={() => go(route)} className="flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm font-medium text-charcoal transition-colors hover:bg-soft-gray">
                      {label}<Icon.Chevron size={15} className="text-medium-gray" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Frame>

        {/* ---- Design tokens ---- */}
        <Frame id="tokens" n="10" title="Design tokens" sub="The Phase 1 system — nothing new introduced.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-medium-gray">Colors</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  ["Primary", "bg-forest-700"], ["Accent", "bg-emerald-500"], ["Sage", "bg-sage-200"],
                  ["Success", "bg-success"], ["Warning", "bg-warning"], ["Error", "bg-error"],
                  ["Info", "bg-info"], ["Carbon", "bg-carbon"], ["Access", "bg-access"],
                ].map(([label, cls]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className={`h-7 w-7 rounded-md border border-border ${cls}`} />
                    <span className="text-xs text-charcoal">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-medium-gray">Type scale</h3>
              <div className="mt-2 space-y-1">
                <p className="text-3xl font-bold text-near-black">Heading</p>
                <p className="text-xl font-semibold text-near-black">Subheading</p>
                <p className="text-base text-charcoal">Body text</p>
                <p className="text-xs font-medium uppercase tracking-wide text-medium-gray">Label</p>
                <p className="font-mono text-sm text-carbon">Data · 26.5 kg</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-medium-gray">Spacing &amp; radius</h3>
              <div className="mt-3 flex items-end gap-2">
                {[4, 8, 12, 16, 24, 32, 48].map((s) => (
                  <div key={s} className="text-center">
                    <div className="bg-sage-300" style={{ width: 12, height: s }} />
                    <div className="mt-1 text-[10px] text-medium-gray">{s}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                {[["sm", "rounded-sm"], ["md", "rounded-md"], ["lg", "rounded-lg"], ["pill", "rounded-full"]].map(([l, c]) => (
                  <span key={l} className={`grid h-9 w-12 place-items-center border border-border bg-soft-gray text-[10px] text-medium-gray ${c}`}>{l}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-medium-gray">Elevation</h3>
              <div className="mt-4 flex items-center gap-3">
                {[["Subtle", "elev-subtle"], ["Medium", "elev-card"], ["Strong", "elev-raised"]].map(([l, c]) => (
                  <div key={l} className={`grid h-16 flex-1 place-items-center rounded-xl bg-card text-xs text-medium-gray ${c}`}>{l}</div>
                ))}
              </div>
            </div>
          </div>
        </Frame>

        {/* ---- Demo flow ---- */}
        <Frame id="demo" n="11" title="2–3 minute demo flow" sub="A judge-ready sequence. Each step opens the live screen.">
          <ol className="grid gap-3 md:grid-cols-2">
            {[
              ["Landing", "Show the problem and product positioning.", "landing"],
              ["AI Travel Command Center", "Enter a natural-language travel request.", "home"],
              ["Planner", "Show extracted requirements.", "planner"],
              ["Recommendations", "Show multiple options.", "planner"],
              ["Green & Accessible Score", "Show why the recommendation ranks highly.", "planner"],
              ["Eco-Twin", "Show Standard vs Eco-Twin.", "planner"],
              ["Show Your Math", "Explain carbon calculation.", "planner"],
              ["Accessibility", "Show evidence and verification status.", "verify"],
              ["Itinerary", "Show the selected journey.", "itinerary"],
              ["Eco Insights", "Show environmental impact.", "insights"],
            ].map(([title, desc, route], i) => (
              <li key={title} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 elev-subtle">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-700 text-xs font-bold text-primary-foreground">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-near-black">{title}</div>
                  <p className="mt-0.5 text-sm text-slate-gray">{desc}</p>
                </div>
                <Button size="sm" variant="tertiary" icon="Chevron" onClick={() => go(route)}>Open</Button>
              </li>
            ))}
          </ol>
        </Frame>

        {/* ---- Architecture ---- */}
        <Frame id="architecture" n="12" title="High-level architecture" sub="For viva — product-level, not a wiring diagram.">
          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl border border-border bg-card p-6 elev-card">
              <div className="flex flex-col gap-2">
                {["User", "React frontend", "Django REST API", "Intelligence / orchestration", "Data + external services", "Recommendation engine", "Explainable result"].map((n, i, a) => (
                  <div key={n} className="flex flex-col items-center">
                    <span className="w-full rounded-lg border border-border bg-warm-white px-4 py-2.5 text-center text-sm font-medium text-charcoal">{n}</span>
                    {i < a.length - 1 && <Icon.Chevron size={14} className="my-0.5 rotate-90 text-emerald-500" />}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 elev-card">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-medium-gray">Supporting services</h3>
              <ul className="mt-3 space-y-2 text-sm text-charcoal">
                {["Firebase Authentication", "Google Gemini", "OpenStreetMap / Overpass", "Weather API", "Carbon emission factors", "PostgreSQL"].map((s) => (
                  <li key={s} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Frame>

        {/* ---- Handoff mapping ---- */}
        <Frame id="handoff" n="13" title="Design → implementation mapping" sub="How each area maps to the stack.">
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-soft-gray text-left text-xs uppercase tracking-wide text-medium-gray">
                <tr><th className="px-4 py-2.5">Product area</th><th className="px-4 py-2.5">Implementation</th></tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {[
                  ["AI Command Center", "React component → Django REST API → Gemini"],
                  ["Authentication", "Firebase Authentication"],
                  ["Trips & itinerary", "Django REST API → PostgreSQL"],
                  ["Map", "Leaflet / OpenStreetMap"],
                  ["Accessibility", "OSM / Overpass + evidence workflow"],
                  ["Carbon", "Deterministic emission-factor calculation"],
                  ["Weather", "Weather API"],
                ].map(([a, b]) => (
                  <tr key={a}><td className="px-4 py-3 font-medium text-charcoal">{a}</td><td className="px-4 py-3 font-mono text-slate-gray">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>

        {/* ---- QA checklist ---- */}
        <Frame id="qa" n="14" title="Final QA checklist" sub="What we verified before presenting.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Design", ["Consistent typography", "Consistent spacing", "Consistent colors", "Consistent components"]],
              ["UX", ["Clear navigation", "Clear primary actions", "Empty states", "Error states", "Loading states"]],
              ["Accessibility", ["WCAG 2.2 AA", "Keyboard focus", "Contrast", "Touch targets", "Reduced motion"]],
              ["Responsiveness", ["Desktop", "Tablet", "Mobile"]],
              ["Trust", ["Evidence labels", "Estimated CO₂e", "AI boundaries", "Source context"]],
              ["Prototype", ["Main flow connected", "Secondary flows connected", "No dead ends"]],
            ].map(([group, items]) => (
              <div key={group as string} className="rounded-2xl border border-border bg-card p-5 elev-card">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-medium-gray">{group as string}</h3>
                <ul className="mt-3 space-y-1.5">
                  {(items as string[]).map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-charcoal"><Icon.Check size={14} className="text-success" /> {t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-forest-700 bg-gradient-to-br from-forest-800 to-forest-600 p-8 text-center text-primary-foreground">
            <p className="mx-auto max-w-3xl text-lg">EcoTrail is not just an AI travel chatbot. It is an explainable travel decision platform combining natural-language intelligence, real-world data, accessibility evidence, deterministic carbon calculation and Eco-Twin alternatives.</p>
            <div className="mt-6"><Button variant="secondary" icon="Route" onClick={() => go("landing")}>Start the prototype</Button></div>
          </div>
        </Frame>
      </main>
    </div>
  );
}

/* ---- Frame wrapper ---- */
function Frame({ id, n, title, sub, children, bare }: { id: string; n?: string; title?: string; sub?: string; children: React.ReactNode; bare?: boolean }) {
  return (
    <section id={id} className="scroll-mt-20 pt-14">
      {!bare && (
        <div className="mb-5">
          <div className="flex items-baseline gap-3">
            {n && <span className="font-mono text-sm text-emerald-500">{n}</span>}
            <h2 className="text-2xl font-bold tracking-tight text-near-black">{title}</h2>
          </div>
          {sub && <p className="mt-1 text-slate-gray">{sub}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

function TwinCard({ tone, title, mode, rows, score, recommended }: { tone: string; title: string; mode: string; rows: [string, string][]; score: number; recommended?: boolean }) {
  return (
    <div className={`rounded-2xl border bg-card p-6 elev-card ${recommended ? "border-forest-700" : "border-border"}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-near-black">{title}</h3>
            {recommended && <Badge icon="Leaf" label="Recommended" tone={TONE.verified} />}
          </div>
          <p className="mt-0.5 text-sm text-slate-gray">{mode}</p>
        </div>
        <CircularScore value={score} label="Score" size={72} color={recommended ? "var(--color-forest-700)" : "var(--color-medium-gray)"} />
      </div>
      <dl className="mt-4 space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between border-b border-border pb-2 text-sm last:border-0">
            <dt className="text-medium-gray">{k}</dt>
            <dd className="font-mono font-medium text-charcoal">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
