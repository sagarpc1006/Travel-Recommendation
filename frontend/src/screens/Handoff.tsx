import { useState } from "react";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, Logo } from "../components/ui";
import { EVIDENCE_META, DEFAULT_WEIGHTS } from "../data/tripOptions";
import { STATUS_META } from "../data/trips";

type Go = (route: string) => void;

/* ============================================================
   Phase 9 — Production UI specification & developer handoff.
   Design → Component → State → Data → API → Action → Response.
   Documentation only. No product functionality, no invented
   endpoints (labelled "implementation reference"), no fake data.
   ============================================================ */

const SECTIONS: { id: string; label: string }[] = [
  { id: "inventory", label: "Inventory" },
  { id: "specs", label: "Screen specs" },
  { id: "components", label: "Components" },
  { id: "variants", label: "Variants" },
  { id: "boundary", label: "API boundary" },
  { id: "auth", label: "Auth" },
  { id: "ai", label: "AI flow" },
  { id: "data", label: "Data mapping" },
  { id: "score", label: "Score & math" },
  { id: "state-matrix", label: "State matrix" },
  { id: "offline", label: "Offline" },
  { id: "responsive", label: "Responsive" },
  { id: "a11y", label: "Accessibility" },
  { id: "motion", label: "Motion" },
  { id: "privacy", label: "Privacy" },
  { id: "guidance", label: "Impl. guidance" },
  { id: "qa", label: "Design QA" },
];

/* Provenance tags used across data-mapping tables. */
const TAG: Record<string, { label: string; tone: keyof typeof TONE }> = {
  user: { label: "USER INPUT", tone: "access" },
  calc: { label: "CALCULATED", tone: "verified" },
  ext: { label: "EXTERNAL", tone: "weather" },
  ai: { label: "AI EXPLANATION", tone: "ai" },
};

export default function Handoff({ go }: { go: Go }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-warm-white text-near-black">
      <header className="sticky top-0 z-40 border-b border-border bg-warm-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <button onClick={() => go("landing")} className="flex items-center gap-2" aria-label="EcoTrail home">
            <Logo size="sm" />
            <span className="hidden text-xs font-medium text-medium-gray sm:inline">Developer handoff · Phase 9</span>
          </button>
          <nav className="hidden items-center gap-1 overflow-x-auto lg:flex">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-slate-gray transition-colors hover:bg-soft-gray hover:text-charcoal">{s.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen((v) => !v)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-gray hover:bg-soft-gray lg:hidden" aria-label="Sections">
              <Icon.Sliders size={18} />
            </button>
            <Button size="sm" variant="tertiary" icon="Layers" onClick={() => go("design-system")}>Tokens</Button>
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-forest-700"><Icon.Layers size={13} /> Phase 9 · Implementation-ready handoff</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-near-black md:text-4xl">Developer handoff</h1>
          <p className="mt-2 max-w-2xl text-slate-gray">A React + Django team should be able to read this and know what to build, what data each component needs, what happens on interaction, and what happens when something fails.</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-mist bg-card p-3 font-mono text-xs text-charcoal">
            {["DESIGN", "COMPONENT", "STATE", "DATA", "API", "ACTION", "RESPONSE"].map((s, i, a) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded bg-soft-gray px-2 py-1">{s}</span>
                {i < a.length - 1 && <Icon.Chevron size={12} className="text-emerald-500" />}
              </span>
            ))}
          </div>
        </section>

        {/* 01 Inventory */}
        <Frame id="inventory" n="01" title="Production screen inventory" sub="Every screen represented once. Built screens link to the running prototype.">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Entry", [["Landing", "landing"], ["Login", "login"], ["Signup", "signup"], ["Forgot password", "forgot"], ["Email verification", null], ["Reset confirmation", null]]],
              ["Onboarding", [["Welcome + preferences", "onboarding"], ["Sustainability", "onboarding"], ["Accessibility", "onboarding"], ["Budget", "onboarding"], ["Convenience", "onboarding"], ["Summary", "onboarding"]]],
              ["Core app", [["Home", "home"], ["AI Command Center", "home"], ["Discover", "discover"], ["Destination intelligence", "discover"]]],
              ["Planning", [["Planner", "planner"], ["Structured requirements", "planner"], ["Recommendations", "planner"], ["Green & Accessible Score", "planner"], ["Eco-Twin", "planner"], ["Show Your Math", "planner"]]],
              ["Travel", [["Build itinerary", "planner"], ["Itinerary", "itinerary"], ["Accessibility details", "itinerary"], ["Accessibility verification", "verify"], ["Trip detail", "mytrips"]]],
              ["Management", [["My Trips", "mytrips"], ["Saved / Upcoming / Completed", "mytrips"]]],
              ["Impact", [["Eco Insights", "insights"], ["Carbon breakdown", "insights"], ["Methodology", "insights"]]],
              ["Account", [["Profile", "profile"], ["Accessibility profile", "accessibility"], ["Privacy / Notifications", "profile"], ["Settings", "profile"]]],
              ["System states", [["Loading · Empty · Error", "resilience"], ["Offline · Sync", "resilience"], ["Unknown · Conflicting · Needs review", "resilience"]]],
            ].map(([group, rows]) => (
              <div key={group as string} className="rounded-2xl border border-border bg-card p-5 elev-card">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-forest-700">{group as string}</h3>
                <ul className="mt-3 space-y-1.5">
                  {(rows as [string, string | null][]).map(([name, route]) => (
                    <li key={name}>
                      {route ? (
                        <button onClick={() => go(route)} className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-sm text-charcoal transition-colors hover:bg-soft-gray">
                          {name} <Icon.Chevron size={13} className="text-medium-gray" />
                        </button>
                      ) : (
                        <span className="flex items-center justify-between px-2 py-1 text-sm text-medium-gray">{name} <span className="text-[10px] uppercase">spec only</span></span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Frame>

        {/* 02 Screen specs */}
        <Frame id="specs" n="02" title="Screen specification" sub="Compact developer annotations for the core screens.">
          <div className="space-y-4">
            {SCREEN_SPECS.map((s) => (
              <div key={s.name} className="rounded-2xl border border-border bg-card p-5 elev-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-near-black">{s.name}</h3>
                  <span className="text-xs text-medium-gray">{s.purpose}</span>
                </div>
                <div className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <Spec k="Primary action" v={s.primary} />
                  <Spec k="Secondary" v={s.secondary} />
                  <Spec k="Key components" v={s.components} />
                  <Spec k="Data" v={s.data} />
                  <Spec k="States" v={s.states} />
                  <Spec k="Responsive" v={s.responsive} />
                </div>
              </div>
            ))}
          </div>
        </Frame>

        {/* 03 Components */}
        <Frame id="components" n="03" title="Component architecture" sub="Actual primitives in src/components + data-driven cards. Reuse before building.">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Foundation", "index.css @theme", ["Colors", "Typography", "Spacing", "Radius", "Elevation (elev-*)", "Icons (icons.tsx)"]],
              ["Core", "ui.tsx", ["Button", "Field / inputBase", "Toggle", "Badge", "CircularScore", "ProgressBar", "ComparisonBar", "Panel"]],
              ["Travel", "screens + data", ["DestinationCard", "DestinationPreview", "Recommendation rail (Planner)", "TimelineRow (Itinerary)", "Trip card (MyTrips)"]],
              ["Intelligence", "AiCommandCenter + ui", ["AI input bar", "AiThinking", "Recommendation explanation", "Score (CircularScore)", "Eco-Twin compare", "Show Your Math"]],
              ["Accessibility", "tripOptions + ui", ["Accessibility badge", "Evidence badge (EVIDENCE_META)", "Evidence detail sheet", "Verification result (PhotoVerification)"]],
              ["System", "states.tsx + Sheet.tsx", ["Toast (inline role=status)", "Modal / Bottom Sheet (Sheet)", "Skeleton", "ErrorState", "EmptyState", "OfflineBanner"]],
            ].map(([group, src, items]) => (
              <div key={group as string} className="rounded-2xl border border-border bg-card p-5 elev-card">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-forest-700">{group as string}</h3>
                  <code className="text-[11px] text-medium-gray">{src as string}</code>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-charcoal">
                  {(items as string[]).map((i) => <li key={i} className="flex items-center gap-2"><Icon.Check size={12} className="text-success" /> {i}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-medium-gray"><Icon.Info size={13} /> Toast is currently an inline <code>role="status"</code> pattern repeated across screens — a candidate to consolidate into a shared component.</p>
        </Frame>

        {/* 04 Variants */}
        <Frame id="variants" n="04" title="Component variants" sub="Live variants rendered from the real design system.">
          <div className="space-y-4">
            <VariantRow label="Button">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="secondary">Secondary</Button>
              <Button size="sm" variant="tertiary">Tertiary</Button>
              <Button size="sm" variant="ghost">Ghost</Button>
              <Button size="sm" variant="destructive">Destructive</Button>
              <Button size="sm" loading>Loading</Button>
              <Button size="sm" disabled>Disabled</Button>
            </VariantRow>
            <VariantRow label="Input">
              <input readOnly placeholder="Default" className="rounded-lg border border-mist bg-card px-3 py-1.5 text-sm" />
              <input readOnly placeholder="Focus" className="rounded-lg border border-forest-600 bg-card px-3 py-1.5 text-sm ring-2 ring-forest-600/20" />
              <input readOnly value="Filled" className="rounded-lg border border-mist bg-card px-3 py-1.5 text-sm text-near-black" />
              <input readOnly value="Error" aria-invalid className="rounded-lg border border-error bg-error-soft/40 px-3 py-1.5 text-sm" />
              <input readOnly placeholder="Disabled" disabled className="rounded-lg border border-mist bg-soft-gray px-3 py-1.5 text-sm opacity-50" />
            </VariantRow>
            <VariantRow label="Evidence badge">
              {(Object.keys(EVIDENCE_META) as (keyof typeof EVIDENCE_META)[]).map((k) => (
                <Badge key={k} icon={EVIDENCE_META[k].icon} label={EVIDENCE_META[k].label} tone={TONE[EVIDENCE_META[k].tone] ?? TONE.neutral} />
              ))}
            </VariantRow>
            <VariantRow label="Trip status">
              {(Object.keys(STATUS_META) as (keyof typeof STATUS_META)[]).map((k) => (
                <Badge key={k} icon={STATUS_META[k].icon} label={STATUS_META[k].label} tone={TONE[STATUS_META[k].tone] ?? TONE.neutral} />
              ))}
            </VariantRow>
            <VariantRow label="AI state">
              {["Idle", "Understanding", "Searching", "Comparing", "Calculating", "Ready", "Error"].map((s) => (
                <span key={s} className="rounded-full border border-ai-border bg-ai-soft/50 px-2.5 py-1 text-xs font-medium text-ai">{s}</span>
              ))}
            </VariantRow>
          </div>
        </Frame>

        {/* 05 API boundary */}
        <Frame id="boundary" n="05" title="API / data boundary" sub="Endpoints are implementation references — not fabricated URLs.">
          <FlowColumn steps={["User interface", "React component", "Axios request", "Django REST Framework", "Application service / logic", "PostgreSQL / external source", "API response", "React UI"]} />
          <p className="mt-3 rounded-lg border border-mist bg-card p-3 text-xs text-slate-gray"><span className="font-mono font-medium text-charcoal">Backend endpoint — implementation reference.</span> Concrete routes are defined by the backend team; the UI contract (request intent + response shape) is what this handoff fixes.</p>
        </Frame>

        {/* 06 Auth */}
        <Frame id="auth" n="06" title="Authentication boundary" sub="Firebase authenticates; Django owns application data. No Django JWT introduced.">
          <div className="grid gap-4 lg:grid-cols-2">
            <FlowColumn steps={["User", "React auth UI", "Firebase Authentication", "Authenticated session (token)", "Django backend", "Application data"]} />
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-card p-4 elev-subtle">
                <div className="flex items-center gap-2 font-medium text-charcoal"><Icon.Verified size={16} className="text-verified" /> Firebase</div>
                <p className="mt-1 text-sm text-slate-gray">Identity & session: email/password, verification, reset. Issues the session token the frontend attaches to Django requests.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 elev-subtle">
                <div className="flex items-center gap-2 font-medium text-charcoal"><Icon.Layers size={16} className="text-forest-700" /> Django</div>
                <p className="mt-1 text-sm text-slate-gray">Application data & business logic: trips, itineraries, recommendations, scoring, evidence. Does not re-implement auth.</p>
              </div>
            </div>
          </div>
        </Frame>

        {/* 07 AI flow */}
        <Frame id="ai" n="07" title="AI data flow" sub="Language intelligence is separated from data & decision logic.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-ai-border bg-ai-soft/30 p-5">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-ai">Language intelligence</div>
              <FlowColumn dense steps={["User natural-language request", "React AI input", "Django REST API", "Requirement extraction / orchestration", "Gemini", "Structured travel intent"]} />
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-forest-700">Data & decision logic</div>
              <FlowColumn dense steps={["Travel / accessibility / weather data", "Recommendation logic (weightedScore)", "Explainable result", "React UI"]} />
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-forest-700 bg-forest-800 p-4 text-center text-sm text-primary-foreground">
            AI understands the request and explains the outcome. It does <span className="font-semibold">not</span> invent authoritative travel information or verify accessibility. Evidence and deterministic logic decide.
          </div>
        </Frame>

        {/* 08 Data mapping */}
        <Frame id="data" n="08" title="Data mapping" sub="Field provenance for the recommendation card, Eco-Twin, itinerary & trips.">
          <div className="mb-3 flex flex-wrap gap-2">
            {Object.values(TAG).map((t) => <Badge key={t.label} icon="Info" label={t.label} tone={TONE[t.tone] ?? TONE.neutral} />)}
          </div>
          <MapTable
            title="Recommendation card"
            rows={[
              ["Destination", "user"], ["Transport combination", "ext"], ["Accommodation", "ext"],
              ["Travel time", "ext"], ["Cost", "ext"], ["Estimated CO₂e", "calc"],
              ["Accessibility", "ext"], ["Evidence status", "ext"], ["Green & Accessible Score", "calc"], ["Recommendation explanation", "ai"],
            ]}
          />
          <MapTable
            title="Eco-Twin (standard vs eco-twin)"
            rows={[
              ["Inputs: origin/destination/dates/travelers/budget", "user"], ["Sustainability / accessibility / convenience preference", "user"],
              ["Transport combination & cost & time", "ext"], ["Estimated CO₂e", "calc"], ["Overall score", "calc"], ["\"Why this option?\"", "ai"],
            ]}
          />
          <MapTable
            title="Itinerary item"
            rows={[
              ["Time / duration / location", "user"], ["Category", "user"], ["Transport", "ext"],
              ["Cost", "ext"], ["Accessibility status", "ext"], ["Evidence status", "ext"], ["Estimated CO₂e", "calc"], ["Map location", "ext"],
            ]}
          />
          <MapTable
            title="Trip card (My Trips)"
            rows={[
              ["Trip name / destination / dates", "user"], ["Status (6 states)", "calc"], ["Green & Accessible Score", "calc"],
              ["Estimated CO₂e", "calc"], ["Eco-Twin indicator", "calc"], ["Accessibility readiness", "ext"],
            ]}
          />
          <p className="mt-3 flex items-center gap-1.5 text-xs text-medium-gray"><Icon.Warning size={13} className="text-medium-gray" /> AI interpretation ≠ independent verification. Carbon values are always estimated, never exact.</p>
        </Frame>

        {/* 09 Score & math */}
        <Frame id="score" n="09" title="Score & Show Your Math" sub="Real weights from the implementation. Demo numbers are labelled.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">Green &amp; Accessible Score weights</h3>
              <p className="mt-1 text-xs text-medium-gray">Source: <code>DEFAULT_WEIGHTS</code> in <code>tripOptions.ts</code></p>
              <div className="mt-4 space-y-2">
                {([["Sustainability", DEFAULT_WEIGHTS.carbon, "carbon"], ["Accessibility", DEFAULT_WEIGHTS.access, "access"], ["Cost", DEFAULT_WEIGHTS.cost, "estimated"], ["Time / Convenience", DEFAULT_WEIGHTS.time, "weather"]] as const).map(([label, pct, tone]) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm text-charcoal"><span>{label}</span><span className="font-mono font-medium">{pct}%</span></div>
                    <div className="mt-1 h-2 rounded-full bg-soft-gray">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: (TONE[tone] ?? TONE.neutral).fg }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg bg-soft-gray p-3 font-mono text-xs text-charcoal">
                <span>DEFAULT</span><Icon.Chevron size={12} /><span>USER ADJUST</span><Icon.Chevron size={12} /><span>RECALC</span><Icon.Chevron size={12} /><span>UPDATED SCORE</span>
              </div>
            </div>
            <div className="rounded-2xl border border-carbon/30 bg-carbon-soft/40 p-5">
              <h3 className="font-semibold text-near-black">Show Your Math</h3>
              <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-sm text-charcoal">
                <span className="rounded bg-card px-2 py-1">Activity data</span> ×
                <span className="rounded bg-card px-2 py-1">Emission factor</span> =
                <span className="rounded bg-card px-2 py-1 font-semibold text-carbon">Estimated CO₂e</span>
              </div>
              <p className="mt-3 text-sm text-slate-gray">Per segment show: activity, distance/amount, emission factor, estimated result, source/methodology. Multiple segments sum to a total estimate.</p>
              <div className="mt-3 flex items-center gap-2 font-mono text-xs text-medium-gray">
                <span className="rounded bg-card px-2 py-1">Seg 1</span> + <span className="rounded bg-card px-2 py-1">Seg 2</span> + <span className="rounded bg-card px-2 py-1">Seg 3</span> = <span className="rounded bg-card px-2 py-1">Total</span>
              </div>
              <Badge icon="Info" label="Numbers in the prototype are illustrative demo data" tone={TONE.estimated} />
            </div>
          </div>
        </Frame>

        {/* 10 State matrix */}
        <Frame id="state-matrix" n="10" title="Loading / empty / error / offline matrix" sub="Every major feature has a defined UX state.">
          <div className="overflow-x-auto rounded-2xl border border-border bg-card elev-card">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-medium-gray">
                  <th className="px-4 py-3">Feature</th><th className="px-4 py-3">Loading</th><th className="px-4 py-3">Empty</th><th className="px-4 py-3">Error</th><th className="px-4 py-3">Offline</th>
                </tr>
              </thead>
              <tbody>
                {STATE_MATRIX.map((r) => (
                  <tr key={r[0]} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-charcoal">{r[0]}</td>
                    {r.slice(1).map((c, i) => <td key={i} className="px-4 py-2.5 text-slate-gray">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>

        {/* 11 Offline */}
        <Frame id="offline" n="11" title="Offline data matrix" sub="What stays usable vs. what needs a connection.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-success/30 bg-success-soft/30 p-5">
              <div className="flex items-center gap-2 font-semibold text-near-black"><Icon.Check size={16} className="text-success" /> Available offline</div>
              <ul className="mt-3 space-y-1.5 text-sm text-charcoal">
                {["Saved itinerary", "Saved trip details", "Previously cached information"].map((i) => <li key={i} className="flex items-center gap-2"><Icon.Check size={12} className="text-success" /> {i}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-warning/40 bg-warning-soft/30 p-5">
              <div className="flex items-center gap-2 font-semibold text-near-black"><Icon.Warning size={16} className="text-warning" /> Requires connection</div>
              <ul className="mt-3 space-y-1.5 text-sm text-charcoal">
                {["New AI requests", "Fresh weather", "New recommendations", "Live external information", "New verification processing"].map((i) => <li key={i} className="flex items-center gap-2"><Icon.Info size={12} className="text-warning" /> {i}</li>)}
              </ul>
            </div>
          </div>
        </Frame>

        {/* 12 Responsive */}
        <Frame id="responsive" n="12" title="Responsive specification" sub="Breakpoints and layout behaviour for the key composed screens.">
          <div className="mb-4 flex flex-wrap gap-2">
            {["1440", "1280", "1024", "768", "430", "390"].map((b) => <span key={b} className="rounded-lg border border-mist bg-card px-3 py-1.5 font-mono text-xs text-charcoal">{b}px</span>)}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Planner", "3-col rail + detail", "2-col", "Single column, filters in sheet"],
              ["Recommendation comparison", "Side-by-side columns", "2-up", "Stacked cards / swipe"],
              ["Eco-Twin", "Two panels side-by-side", "Two panels", "Stacked, score first"],
              ["Itinerary", "Timeline + map", "Timeline, map collapsible", "Timeline, map in bottom sheet"],
              ["Accessibility", "Detail rail", "Reduced rail", "Full-width sheet"],
              ["Profile", "2-col settings", "Single column", "Single column, sectioned"],
            ].map(([name, d, t, m]) => (
              <div key={name} className="rounded-xl border border-border bg-card p-4 elev-subtle">
                <h3 className="font-semibold text-near-black">{name}</h3>
                <dl className="mt-2 space-y-1 text-sm">
                  <div className="flex gap-2"><dt className="w-16 shrink-0 text-xs uppercase text-medium-gray">Desktop</dt><dd className="text-slate-gray">{d}</dd></div>
                  <div className="flex gap-2"><dt className="w-16 shrink-0 text-xs uppercase text-medium-gray">Tablet</dt><dd className="text-slate-gray">{t}</dd></div>
                  <div className="flex gap-2"><dt className="w-16 shrink-0 text-xs uppercase text-medium-gray">Mobile</dt><dd className="text-slate-gray">{m}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </Frame>

        {/* 13 Accessibility */}
        <Frame id="a11y" n="13" title="Accessibility implementation notes" sub="WCAG 2.2 AA. Never rely on colour alone.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Focus", "Visible focus-visible ring on all interactive elements (index.css)"],
              ["Labels", "aria-label on icon-only & AI inputs; associated <label> on fields"],
              ["Errors", "aria-invalid + aria-describedby, message text beside field"],
              ["Touch target", "≥44px hit area on primary controls; bottom-nav sized for thumb"],
              ["Screen reader", "role=button + Enter/Space on custom rows; role=status on toasts"],
              ["Disabled", "Explicit disabled state, not just reduced opacity"],
              ["Not colour-only", "Evidence + status always pair an icon + label with tone"],
              ["Reduced motion", "prefers-reduced-motion disables page/AI transitions"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border bg-card p-4 elev-subtle">
                <div className="text-xs font-semibold uppercase tracking-wide text-forest-700">{k}</div>
                <p className="mt-1 text-sm text-slate-gray">{v}</p>
              </div>
            ))}
          </div>
        </Frame>

        {/* 14 Motion */}
        <Frame id="motion" n="14" title="Motion specification" sub="Only meaningful motion. Each honours reduced-motion.">
          <div className="overflow-x-auto rounded-2xl border border-border bg-card elev-card">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-medium-gray">
                  <th className="px-4 py-3">Trigger</th><th className="px-4 py-3">Purpose</th><th className="px-4 py-3">Behaviour</th><th className="px-4 py-3">Reduced motion</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Route change", "Orient to new screen", "Fade + 6px rise, 0.32s ease-out", "No animation"],
                  ["AI processing", "Show work in progress", "Shimmer / pulse loop", "Static label"],
                  ["Score recalculation", "Signal result changed", "Number + bar transition", "Instant update"],
                  ["Eco-Twin transition", "Compare options", "Cross-panel ease", "Instant"],
                  ["Modal / bottom sheet", "Focus attention", "Slide up / fade", "Fade only"],
                  ["Toast", "Confirm action", "Slide + auto-dismiss", "Appear / disappear"],
                  ["Verification processing", "Reassure during check", "AiThinking loop ~1.9s", "Static label"],
                ].map((r) => (
                  <tr key={r[0]} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-charcoal">{r[0]}</td>
                    <td className="px-4 py-2.5 text-slate-gray">{r[1]}</td>
                    <td className="px-4 py-2.5 text-slate-gray">{r[2]}</td>
                    <td className="px-4 py-2.5 text-slate-gray">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>

        {/* 15 Privacy */}
        <Frame id="privacy" n="15" title="Security & privacy UX" sub="Sensitive accessibility data is never exposed through public sharing.">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["Private", "Profile", "Only you", "verified"],
              ["Shared", "Trip via link", "People with the link — accessibility details off by default", "estimated"],
              ["Public", "Published trip", "Anyone — raw sensitive accessibility info withheld", "warning"],
            ].map(([level, ctx, who, tone]) => (
              <div key={level} className="rounded-2xl border border-border bg-card p-5 elev-card">
                <Badge icon="Profile" label={level} tone={TONE[tone as string] ?? TONE.neutral} />
                <div className="mt-2 text-sm font-medium text-charcoal">{ctx}</div>
                <p className="mt-1 text-sm text-slate-gray">{who}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-medium-gray"><Icon.Info size={13} /> Sharing accessibility details is an explicit opt-in toggle (TripDetail ShareSheet); nothing is published automatically.</p>
        </Frame>

        {/* 16 Implementation guidance */}
        <Frame id="guidance" n="16" title="Implementation guidance" sub="Figma area → React concept. Backend awareness. No service claimed unless it exists.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">Frontend mapping</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-charcoal">
                {[
                  ["Navigation", "Shared layout (AppShell)"],
                  ["AI Command Center", "Reusable AI component"],
                  ["Recommendation card", "Data-driven component"],
                  ["Eco-Twin", "Reusable comparison component"],
                  ["Itinerary item", "Reusable timeline component"],
                  ["Accessibility badge", "Status component (EVIDENCE_META)"],
                  ["Map", "Leaflet / React-Leaflet (not yet integrated)"],
                ].map(([a, b]) => (
                  <li key={a} className="flex items-center gap-2"><span className="text-charcoal">{a}</span><Icon.Chevron size={12} className="text-medium-gray" /><span className="text-slate-gray">{b}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">Backend awareness</h3>
              <FlowColumn dense steps={["React", "Axios", "Django REST Framework", "Application services", "PostgreSQL / external APIs"]} />
              <p className="mt-3 text-xs text-medium-gray">External context (referenced, not claimed as implemented): Gemini, OpenStreetMap / Overpass, Weather, official travel info, carbon factors.</p>
            </div>
          </div>
        </Frame>

        {/* 17 QA */}
        <Frame id="qa" n="17" title="Design QA & product rule" sub="Final consistency pass and the trust guarantee.">
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Consistent buttons / cards / badges / spacing", "No duplicate component definitions", "No missing loading / empty / error states",
              "No broken prototype links", "No inaccessible interactions", "No clipped mobile content / horizontal scroll",
              "No fake data presented as live", "No unsupported claims",
            ].map((c) => (
              <label key={c} className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-charcoal">
                <span className="grid h-5 w-5 place-items-center rounded border border-success bg-success-soft text-success"><Icon.Check size={13} /></span> {c}
              </label>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-forest-700 bg-gradient-to-br from-forest-800 to-forest-600 p-8 text-primary-foreground">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">Product philosophy</p>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-5">
              {["AI understands the traveler", "Data grounds the information", "Deterministic logic evaluates options", "Evidence communicates trust", "The traveler makes the final decision"].map((p, i) => (
                <div key={p} className="rounded-lg bg-white/10 p-3"><span className="font-mono text-emerald-200">{i + 1}</span><p className="mt-1">{p}</p></div>
              ))}
            </div>
            <p className="mt-5 max-w-2xl">The specification never implies capabilities the system doesn't provide: no booking, no verified accessibility without evidence, no exact carbon measurement, no authoritative AI, no live data when showing cached or demo information.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="secondary" icon="Compass" onClick={() => go("presentation")}>Presentation deck</Button>
              <Button variant="ghost" icon="Verified" onClick={() => go("resilience")}>Resilience</Button>
              <Button variant="ghost" icon="Layers" onClick={() => go("design-system")}>Design system</Button>
            </div>
          </div>
        </Frame>
      </main>
    </div>
  );
}

/* ---------- helpers ---------- */

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

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-medium-gray">{k}</dt>
      <dd className="text-charcoal">{v}</dd>
    </div>
  );
}

function VariantRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 elev-card">
      <div className="text-xs font-semibold uppercase tracking-wide text-forest-700">{label}</div>
      <div className="mt-3 flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function FlowColumn({ steps, dense }: { steps: string[]; dense?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-col items-start gap-1.5">
          <span className={`rounded-lg border border-mist bg-card px-3 ${dense ? "py-1.5 text-xs" : "py-2 text-sm"} font-medium text-charcoal`}>{s}</span>
          {i < steps.length - 1 && <Icon.Chevron size={13} className="ml-3 rotate-90 text-emerald-500" />}
        </div>
      ))}
    </div>
  );
}

function MapTable({ title, rows }: { title: string; rows: [string, keyof typeof TAG][] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card elev-card">
      <div className="border-b border-border px-4 py-2.5 text-sm font-semibold text-near-black">{title}</div>
      <ul>
        {rows.map(([field, tag]) => {
          const t = TAG[tag];
          return (
            <li key={field} className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-2 last:border-0">
              <span className="text-sm text-charcoal">{field}</span>
              <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase" style={{ color: (TONE[t.tone] ?? TONE.neutral).fg, background: (TONE[t.tone] ?? TONE.neutral).bg }}>{t.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- data ---------- */

type ScreenSpec = { name: string; purpose: string; primary: string; secondary: string; components: string; data: string; states: string; responsive: string };

const SCREEN_SPECS: ScreenSpec[] = [
  { name: "AI Command Center", purpose: "Natural-language trip request", primary: "Submit request", secondary: "Edit request · Explore", components: "AI input, AiThinking, result rail", data: "User query → structured intent → options", states: "Idle · processing · result · empty · error", responsive: "Full-width bar; results stack on mobile" },
  { name: "Planner", purpose: "Structured requirements → recommendations", primary: "Build itinerary", secondary: "Adjust priorities · Compare", components: "Requirement fields, priority sliders, recommendation rail, ScoreCard, Eco-Twin, Show Your Math", data: "Requirements, OPTIONS, weightedScore", states: "Default · updating · empty", responsive: "3-col → single column + filter sheet" },
  { name: "Itinerary", purpose: "Day-by-day plan management", primary: "Save changes", secondary: "AI adjust · Remove item", components: "TimelineRow, map, OfflineBanner, discard-guard sheet", data: "Trip → days → items", states: "Loading · offline · syncing · dirty", responsive: "Timeline + map → map in sheet" },
  { name: "Accessibility verification", purpose: "Submit photo evidence", primary: "Upload / add another photo", secondary: "Continue without verification", components: "Step bar, processing, ResultCard", data: "Photo, evidence type → result kind", states: "Upload · processing · 5 result kinds", responsive: "Single column, sheet on mobile" },
  { name: "My Trips", purpose: "Manage saved & planned trips", primary: "Open trip", secondary: "Filter by status", components: "Trip card, tabs, EmptyState", data: "Trips + status + score + readiness", states: "Populated · empty per tab", responsive: "Grid → single column" },
  { name: "Eco Insights", purpose: "Impact overview & methodology", primary: "View breakdown", secondary: "Read methodology", components: "Metric tiles, comparison, methodology", data: "Estimated CO₂e trend & contribution", states: "Populated · loading", responsive: "Multi-col → stacked" },
];

const STATE_MATRIX: string[][] = [
  ["AI", "Processing shimmer", "No options found", "Retry + manual", "Needs connection"],
  ["Discover", "Skeleton cards", "No destinations", "Retry", "Cached list"],
  ["Destination", "Skeleton", "—", "Retry", "Cached detail"],
  ["Planner", "Updating", "No options in budget", "Retry", "Needs connection"],
  ["Recommendations", "Updating", "No match", "Retry", "Cached"],
  ["Map", "Placeholder", "—", "Map unavailable", "Cached tiles"],
  ["Weather", "Loading", "—", "Couldn't load weather", "Last cached"],
  ["Accessibility", "Loading", "No evidence", "Data unavailable", "Cached evidence"],
  ["Verification", "Processing", "—", "Unable to verify", "Needs connection"],
  ["Itinerary", "Skeleton", "No items", "Retry", "Cached itinerary"],
  ["My Trips", "Skeleton", "No trips", "Retry", "Cached trips"],
  ["Eco Insights", "Loading", "No data yet", "Retry", "Cached"],
  ["Profile", "Loading", "—", "Retry", "Cached profile"],
];
