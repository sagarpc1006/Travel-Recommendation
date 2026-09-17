import { useState } from "react";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, Logo } from "../components/ui";
import { EVIDENCE_META, DEFAULT_WEIGHTS } from "../data/tripOptions";

type Go = (route: string) => void;

/* ============================================================
   Phase 11 — Frontend implementation blueprint.
   App shell → component trees → contracts → state → responsive.
   Documentation only. Design is FROZEN: no redesign, no new
   tokens, no new components, no invented endpoints. Component
   names are the suggested PascalCase implementation names; the
   current source location is noted honestly where it differs.
   ============================================================ */

const SECTIONS: { id: string; label: string }[] = [
  { id: "shell", label: "App shell" },
  { id: "routes", label: "Routes" },
  { id: "trees", label: "Component trees" },
  { id: "contracts", label: "Contracts" },
  { id: "state", label: "State system" },
  { id: "matrix", label: "State matrix" },
  { id: "responsive", label: "Responsive" },
  { id: "tokens", label: "Tokens & icons" },
  { id: "patterns", label: "Patterns" },
  { id: "trust", label: "Trust legend" },
  { id: "boundary", label: "Boundary" },
  { id: "mapping", label: "Figma → code" },
  { id: "checklist", label: "Checklist" },
];

export default function Blueprint({ go }: { go: Go }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-warm-white text-near-black">
      <header className="sticky top-0 z-40 border-b border-border bg-warm-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <button onClick={() => go("landing")} className="flex items-center gap-2" aria-label="EcoTrail home">
            <Logo size="sm" />
            <span className="hidden text-xs font-medium text-medium-gray sm:inline">Implementation blueprint · Phase 11</span>
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-forest-700"><Icon.Layers size={13} /> Phase 11 · Frontend blueprint</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-near-black md:text-4xl">Implementation blueprint</h1>
          <p className="mt-2 max-w-2xl text-slate-gray">A direct bridge from the frozen design to the React build: what to build, how to compose it, what state it can enter, what data it expects, and how it responds on mobile.</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-mist bg-card p-3 font-mono text-xs text-charcoal">
            {["SCREEN", "TREE", "PROPS", "STATE", "ACTION", "DATA", "RESPONSIVE"].map((s, i, a) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded bg-soft-gray px-2 py-1">{s}</span>
                {i < a.length - 1 && <Icon.Chevron size={12} className="text-emerald-500" />}
              </span>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-medium-gray"><Icon.Info size={13} /> "Design once. Reuse everywhere. Make every state intentional." Design frozen — this is specification, not redesign.</p>
        </section>

        {/* App shell */}
        <Frame id="shell" n="01" title="Application shell" sub="AppShell wraps authenticated pages; public routes render standalone.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Tree title="Structure" lines={[
              ["App", 0], ["Public routes", 1], ["Landing · Login · Signup · Onboarding", 2],
              ["Authenticated app (AppShell)", 1], ["Navigation (top + bottom)", 2], ["Page content", 2], ["Global notifications (toasts)", 2], ["Global modals / sheets (Sheet)", 2],
            ]} />
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-card p-4 elev-subtle">
                <div className="flex items-center gap-2 font-medium text-charcoal"><Icon.Layers size={16} className="text-forest-700" /> Desktop shell</div>
                <p className="mt-1 text-sm text-slate-gray">Top navigation + main content, max content width, consistent margins.</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 elev-subtle">
                <div className="flex items-center gap-2 font-medium text-charcoal"><Icon.Location size={16} className="text-forest-700" /> Mobile shell</div>
                <p className="mt-1 text-sm text-slate-gray">Header + main content + fixed bottom navigation (5 items). Source: <code>AppShell.tsx</code>.</p>
              </div>
            </div>
          </div>
        </Frame>

        {/* Routes */}
        <Frame id="routes" n="02" title="Route / page inventory" sub="Current routing is state-based; URL paths below are suggested implementation routes.">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Public", [["Landing", "/"], ["Login", "/login"], ["Signup", "/signup"], ["Forgot password", "/forgot"], ["Email verification", "/verify-email"], ["Onboarding", "/onboarding"]]],
              ["Authenticated", [["Home", "/home"], ["Discover", "/discover"], ["Destination", "/destination/:id"], ["Planner", "/planner"], ["Recommendations", "/planner#results"], ["Eco-Twin", "/planner#eco-twin"], ["Itinerary", "/itinerary/:id"], ["My Trips", "/trips"], ["Trip Detail", "/trips/:id"], ["Eco Insights", "/insights"], ["Profile", "/profile"], ["Accessibility", "/profile/accessibility"], ["Privacy", "/profile/privacy"], ["Settings", "/profile/settings"]]],
            ].map(([group, rows]) => (
              <div key={group as string} className="rounded-2xl border border-border bg-card p-5 elev-card">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-forest-700">{group as string}</h3>
                <ul className="mt-3 space-y-1 font-mono text-xs">
                  {(rows as [string, string][]).map(([name, path]) => (
                    <li key={name} className="flex items-center justify-between gap-3 border-b border-border/40 py-1 last:border-0">
                      <span className="text-charcoal">{name}</span>
                      <span className="text-medium-gray">{path}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-medium-gray"><Icon.Info size={13} /> Labelled "suggested implementation route" — not yet established as URLs.</p>
        </Frame>

        {/* Component trees */}
        <Frame id="trees" n="03" title="Page component trees" sub="Composition of the approved screens. Reuse before building new.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Tree title="HomePage" src="Home.tsx + AiCommandCenter.tsx" lines={[
              ["HomePage", 0], ["Header · Greeting", 1], ["AICommandCenter", 1], ["QuickPrompts", 1], ["ContinuePlanning", 1], ["RecommendedTrips", 1], ["ExploreDestinations", 1], ["EcoImpactSummary · WeatherCard", 1], ["RecentActivity", 1],
            ]} />
            <Tree title="PlannerPage" src="Planner.tsx" lines={[
              ["PlannerPage", 0], ["RequirementSummary", 1], ["RequirementEditor", 1], ["MapPanel", 1], ["RecommendationList", 1], ["RecommendationCard", 2], ["ScorePanel (GreenAccessibleScore)", 1], ["EcoTwinComparison", 1], ["ShowYourMath", 1], ["PrimaryAction — Build itinerary", 1],
            ]} />
            <Tree title="ItineraryPage" src="Itinerary.tsx" lines={[
              ["ItineraryPage", 0], ["TripHeader · DateSelector", 1], ["DaySection", 1], ["ItineraryItem", 2], ["MapPanel", 1], ["AccessibilitySummary", 1], ["CarbonSummary", 1], ["EditControls", 1],
            ]} />
            <Tree title="AccessibilityProfilePage" src="AccessibilityProfile.tsx" lines={[
              ["AccessibilityProfilePage", 0], ["ProfileSummary", 1], ["MobilityPreferences", 1], ["SensoryPreferences", 1], ["AssistancePreferences", 1], ["AdditionalNotes", 1], ["PrivacyControls", 1], ["SaveChanges", 1],
            ]} />
            <Tree title="AccessibilityVerification" src="PhotoVerification.tsx" lines={[
              ["AccessibilityVerification", 0], ["Upload → Preview", 1], ["EvidenceType", 1], ["Processing", 1], ["Result (5 variants)", 1],
            ]} />
            <Tree title="MyTripsPage" src="MyTrips.tsx" lines={[
              ["MyTripsPage", 0], ["TripTabs · TripFilters", 1], ["TripCardList", 1], ["TripCard", 2], ["EmptyState", 1],
            ]} />
            <Tree title="EcoInsightsPage" src="EcoInsights.tsx" lines={[
              ["EcoInsightsPage", 0], ["ImpactSummary", 1], ["CarbonTrend", 1], ["StandardComparison", 1], ["TransportContribution", 1], ["Methodology", 1],
            ]} />
            <Tree title="ProfilePage" src="Profile.tsx" lines={[
              ["ProfilePage", 0], ["PersonalInfo", 1], ["TravelPreferences", 1], ["AccessibilityProfile (separated)", 1], ["TravelHistory · EcoImpact", 1], ["Privacy · Notifications · Settings", 1],
            ]} />
          </div>
        </Frame>

        {/* Contracts */}
        <Frame id="contracts" n="04" title="Component contracts" sub="Inputs, actions, states — and the trust boundary each must honour.">
          <div className="space-y-4">
            <Contract
              name="AICommandCenter" src="AiCommandCenter.tsx"
              inputs="User text · existing preferences · trip context"
              outputs="Structured requirements · recommendation request · explanation"
              actions="Submit · Edit request · Retry · Continue manually"
              states={["Idle", "Focused", "Typing", "Understanding", "Searching", "Comparing", "Calculating", "Ready", "No results", "Error"]}
              boundary="AI understands language. It does NOT establish official prices, schedules, carbon factors or accessibility verification."
            />
            <Contract
              name="RecommendationCard" src="inline in Planner.tsx"
              inputs="Destination · transport · accommodation · duration · cost · estimated CO₂e · accessibility · score · evidence · explanation"
              actions="View details · Compare · Select"
              states={["Default", "Hover", "Selected", "Loading", "Unavailable", "Partial data"]}
              boundary="Cost/time/accessibility are external; CO₂e & score are calculated; 'Why this option?' is AI explanation."
            />
            <Contract
              name="EcoTwinComparison" src="inline in Planner.tsx / TripDetail.tsx"
              inputs="Standard option · alternative option · score/carbon/accessibility/cost/time"
              actions="Select Standard · Select Eco-Twin · View details"
              states={["Standard vs Eco-Twin", "No meaningful Eco-Twin found"]}
              boundary="Eco-Twin is not guaranteed to exist — the empty state is a required variant."
            />
            <Contract
              name="GreenAccessibleScore" src="ui.tsx CircularScore + Planner"
              inputs={`Sub-scores + weights (Sustainability ${DEFAULT_WEIGHTS.carbon}% · Accessibility ${DEFAULT_WEIGHTS.access}% · Cost ${DEFAULT_WEIGHTS.cost}% · Time ${DEFAULT_WEIGHTS.time}%)`}
              actions="Adjust priorities → recalculate → updated ranking → updated score"
              states={["Default", "Updating", "Updated"]}
              boundary="Weighting model is fixed (DEFAULT_WEIGHTS); the score is preference-relative, not universally objective."
            />
            <Contract
              name="ShowYourMath" src="inline in Planner.tsx"
              inputs="Per segment: activity data × emission factor = estimated CO₂e; segments sum to total"
              actions="Expand segment · View methodology / source"
              states={["Collapsed", "Expanded"]}
              boundary="Always 'Estimated CO₂e'. Never imply laboratory precision; demo numbers labelled illustrative."
            />
            <Contract
              name="EvidenceStatus / AccessibilityBadge" src="EVIDENCE_META in tripOptions.ts"
              inputs="Status · meaning · evidence source"
              actions="View evidence · Review"
              states={Object.values(EVIDENCE_META).map((m) => m.label)}
              boundary="AI Supported must never visually imply independent verification; a single positive badge never implies the whole destination is accessible."
            />
          </div>
        </Frame>

        {/* State system */}
        <Frame id="state" n="05" title="Global state system" sub="The vocabulary every component draws from.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Global", ["Loading", "Success", "Error", "Empty", "Offline", "Syncing", "Synced"]],
              ["Data", ["Available", "Partial", "Estimated", "Unknown", "Conflicting", "Unavailable"]],
              ["AI", ["Idle", "Processing", "Ready", "Error"]],
              ["Accessibility", ["Verified", "Business declared", "OSM supported", "AI supported", "Unknown", "Conflicting", "Needs review"]],
            ].map(([group, items]) => (
              <div key={group as string} className="rounded-2xl border border-border bg-card p-5 elev-card">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-forest-700">{group as string}</h3>
                <ul className="mt-3 space-y-1 text-sm text-charcoal">
                  {(items as string[]).map((i) => <li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Frame>

        {/* State matrix */}
        <Frame id="matrix" n="06" title="Component state matrix" sub="Every reusable component defines these states.">
          <div className="overflow-x-auto rounded-2xl border border-border bg-card elev-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-medium-gray">
                  {["Component", "Default", "Loading", "Success", "Error", "Empty", "Disabled", "Mobile"].map((h) => <th key={h} className="px-3 py-3">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Button", "•", "spinner", "•", "—", "—", "•", "full-width"],
                  ["Input", "•", "—", "filled", "field error", "placeholder", "•", "•"],
                  ["Card", "•", "skeleton", "•", "retry", "—", "muted", "stacked"],
                  ["Recommendation", "•", "skeleton", "selected", "unavailable", "no match", "—", "stacked"],
                  ["AI", "idle", "processing", "ready", "error", "no results", "—", "sheet"],
                  ["Score", "•", "updating", "updated", "—", "—", "—", "compact"],
                  ["Eco-Twin", "compare", "updating", "•", "—", "none found", "—", "stacked"],
                  ["Map", "•", "placeholder", "•", "unavailable", "—", "—", "sheet"],
                  ["Itinerary", "•", "skeleton", "saved", "retry", "no items", "read-only", "timeline"],
                  ["Accessibility", "•", "loading", "•", "unavailable", "no evidence", "—", "sheet"],
                  ["Trip", "•", "skeleton", "•", "retry", "no trips", "—", "stacked"],
                  ["Notification", "•", "—", "success", "error", "—", "—", "top/bottom"],
                ].map((r) => (
                  <tr key={r[0]} className="border-b border-border/50 last:border-0">
                    <td className="px-3 py-2 font-medium text-charcoal">{r[0]}</td>
                    {r.slice(1).map((c, i) => <td key={i} className="px-3 py-2 text-slate-gray">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>

        {/* Responsive */}
        <Frame id="responsive" n="07" title="Responsive component rules" sub="Desktop → mobile transforms for the composed screens. No new layouts.">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Recommendation", "2–3 column grid", "Stacked cards"],
              ["Planner", "Requirements + Map + Results", "Requirements → Results → Map toggle"],
              ["Itinerary", "Timeline + Map", "Timeline + Map sheet"],
              ["Eco-Twin", "Side-by-side", "Stacked comparison"],
              ["Accessibility", "Detail rail", "Full-width bottom sheet"],
              ["Profile", "2-column settings", "Single column, sectioned"],
            ].map(([name, d, m]) => (
              <div key={name} className="rounded-xl border border-border bg-card p-4 elev-subtle">
                <h3 className="font-semibold text-near-black">{name}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="rounded bg-soft-gray px-2 py-1 text-charcoal">{d}</span>
                  <Icon.Chevron size={13} className="text-emerald-500" />
                  <span className="rounded bg-soft-gray px-2 py-1 text-charcoal">{m}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["1440", "1280", "1024", "768", "430", "390"].map((b) => <span key={b} className="rounded-lg border border-mist bg-card px-3 py-1.5 font-mono text-xs text-charcoal">{b}px</span>)}
          </div>
        </Frame>

        {/* Tokens & icons */}
        <Frame id="tokens" n="08" title="Design tokens & icons" sub="Existing tokens only (index.css @theme). No new values.">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-forest-700">Colors</h3>
              <ul className="mt-3 space-y-1 text-sm text-charcoal">
                {["Primary (forest)", "Surface / Background", "Text (near-black / slate)", "Muted", "Success", "Warning", "Error", "Info", "Product: carbon / access / verified / estimated / ai / weather"].map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-forest-700">Spacing & type</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => <span key={s} className="rounded bg-soft-gray px-2 py-1 font-mono text-xs text-charcoal">{s}</span>)}
              </div>
              <ul className="mt-3 space-y-1 text-sm text-charcoal">
                {["Display", "Heading", "Subheading", "Body", "Label", "Caption", "Data (mono)"].map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-forest-700">Icons</h3>
              <p className="mt-3 text-sm text-slate-gray">Single family in <code>icons.tsx</code>: consistent stroke &amp; sizing. No decorative overload. Icons never replace accessible labels — important actions keep text.</p>
            </div>
          </div>
        </Frame>

        {/* Patterns */}
        <Frame id="patterns" n="09" title="Forms · notifications · overlays · loading" sub="Behavioural contracts for the shared interaction patterns.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">Forms</h3>
              <p className="mt-1 text-sm text-slate-gray">Login · Signup · Onboarding · Planner · Accessibility · Profile · Settings.</p>
              <div className="mt-2 flex flex-wrap gap-1.5">{["Default", "Focus", "Filled", "Error", "Disabled", "Loading", "Success"].map((s) => <span key={s} className="rounded-full bg-soft-gray px-2.5 py-1 text-xs text-charcoal">{s}</span>)}</div>
              <p className="mt-2 text-xs text-medium-gray">Errors: specific, readable, beside the field.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">Notifications (Toast)</h3>
              <p className="mt-1 text-sm text-slate-gray">Types: Success · Info · Warning · Error · Offline · Sync. Structure: icon + message + optional action + dismiss.</p>
              <p className="mt-2 rounded bg-soft-gray px-2.5 py-1.5 text-xs text-charcoal">"Trip saved." · "Verification requires review." · "You're offline. Your saved itinerary is still available."</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">Modal vs Bottom sheet</h3>
              <p className="mt-1 text-sm text-slate-gray"><span className="font-medium text-charcoal">Modal:</span> confirmation, destructive action, important decision. <span className="font-medium text-charcoal">Sheet:</span> mobile details, map info, accessibility details, filters, secondary actions. Both: close action, focus management, keyboard. Source: <code>Sheet.tsx</code>.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">API loading &amp; offline</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-charcoal">
                <span className="rounded bg-soft-gray px-2 py-1">REQUEST</span><Icon.Chevron size={11} /><span className="rounded bg-soft-gray px-2 py-1">LOADING</span><Icon.Chevron size={11} /><span className="rounded bg-soft-gray px-2 py-1">SUCCESS / ERROR → RETRY</span>
              </div>
              <p className="mt-2 text-sm text-slate-gray">Partial services: render available data, mark the rest unavailable. Offline: cached itinerary stays accessible; live data never falsely shown as current. Use skeletons; avoid excessive animation &amp; deeply nested overlays.</p>
            </div>
          </div>
        </Frame>

        {/* Trust legend */}
        <Frame id="trust" n="10" title="Data trust legend" sub="Used consistently across every surface.">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["LIVE", "Data currently retrieved where supported", "weather"],
              ["ESTIMATED", "Calculated or inferred value", "estimated"],
              ["VERIFIED", "Evidence-backed status", "verified"],
              ["DECLARED", "Provided by a business", "carbon"],
              ["SUPPORTED", "Supported by external / map data", "access"],
              ["AI SUPPORTED", "AI-assisted interpretation", "ai"],
              ["UNKNOWN", "Could not be confirmed", "neutral"],
              ["CONFLICTING", "Sources disagree", "warning"],
              ["UNAVAILABLE", "Data could not be retrieved", "neutral"],
            ].map(([label, desc, tone]) => (
              <div key={label} className="rounded-xl border border-border bg-card p-4 elev-subtle">
                <Badge icon="Info" label={label as string} tone={TONE[tone as string] ?? TONE.neutral} />
                <p className="mt-2 text-xs text-slate-gray">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-medium-gray"><Icon.Warning size={13} className="text-medium-gray" /> Never turn uncertainty into confidence through visual design.</p>
        </Frame>

        {/* Boundary */}
        <Frame id="boundary" n="11" title="Frontend / backend boundary" sub="No invented services or endpoints.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Tree title="Technical flow" lines={[
              ["React", 0], ["Axios", 1], ["Django REST Framework", 2], ["Application logic", 3], ["Database / external services", 4], ["Response → React state → UI", 5],
            ]} />
            <div className="space-y-2">
              {[
                ["Authentication", "Firebase Authentication"],
                ["Application data", "Django + PostgreSQL"],
                ["AI", "Gemini"],
                ["Maps / accessibility", "OpenStreetMap / Overpass"],
                ["Weather", "Weather service"],
                ["Carbon", "Deterministic emission factors"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5 text-sm">
                  <span className="text-medium-gray">{k}</span><span className="font-medium text-charcoal">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Frame>

        {/* Figma → code mapping */}
        <Frame id="mapping" n="12" title="Naming standard & Figma → code" sub="PascalCase target names + honest current source location.">
          <div className="overflow-x-auto rounded-2xl border border-border bg-card elev-card">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-medium-gray">
                  <th className="px-4 py-3">Design</th><th className="px-4 py-3">Implementation component</th><th className="px-4 py-3">Current source</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["AI Command Center", "AICommandCenter", "AiCommandCenter.tsx"],
                  ["Recommendation Card", "RecommendationCard", "inline · Planner.tsx"],
                  ["Eco-Twin", "EcoTwinComparison", "inline · Planner / TripDetail"],
                  ["Score", "GreenAccessibleScore", "CircularScore · ui.tsx"],
                  ["Show Your Math", "ShowYourMath", "inline · Planner.tsx"],
                  ["Accessibility Evidence", "EvidenceStatus", "EVIDENCE_META · tripOptions.ts"],
                  ["Itinerary Item", "ItineraryItem", "TimelineRow · Itinerary.tsx"],
                  ["Trip Card", "TripCard", "inline · MyTrips.tsx"],
                  ["Eco Impact", "EcoImpactCard", "inline · EcoInsights.tsx"],
                ].map((r) => (
                  <tr key={r[0]} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-2.5 text-charcoal">{r[0]}</td>
                    <td className="px-4 py-2.5 font-mono text-xs font-medium text-forest-700">{r[1]}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-medium-gray">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>

        {/* Checklist */}
        <Frame id="checklist" n="13" title="Final implementation checklist" sub="The bridge from design to build is complete.">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Design", "Frozen"], ["Components", "Reusable"], ["States", "Defined"], ["Data", "Mapped"],
              ["Responsive", "Defined"], ["Accessibility", "Defined"], ["AI", "Boundary defined"],
              ["Carbon", "Methodology represented"], ["Trust", "Evidence states defined"], ["Prototype", "Connected"], ["Developer handoff", "Ready"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm">
                <span className="grid h-5 w-5 place-items-center rounded border border-success bg-success-soft text-success"><Icon.Check size={13} /></span>
                <span className="font-medium text-charcoal">{k}</span><span className="text-medium-gray">— {v}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-forest-700 bg-gradient-to-br from-forest-800 to-forest-600 p-8 text-primary-foreground">
            <p className="text-lg font-medium">Design once. Reuse everywhere. Make every state intentional.</p>
            <p className="mt-2 max-w-2xl text-emerald-100">The file bridges product design → frontend implementation → backend integration → real user experience.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="secondary" icon="Layers" onClick={() => go("handoff")}>Developer handoff</Button>
              <Button variant="ghost" icon="Verified" onClick={() => go("design-freeze")}>Design freeze</Button>
              <Button variant="ghost" icon="Route" onClick={() => go("landing")}>Start prototype</Button>
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

function Tree({ title, src, lines }: { title: string; src?: string; lines: [string, number][] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 elev-card">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-mono text-sm font-semibold text-forest-700">{title}</h3>
        {src && <code className="text-[11px] text-medium-gray">{src}</code>}
      </div>
      <ul className="mt-3 space-y-0.5 font-mono text-xs">
        {lines.map(([label, depth], i) => (
          <li key={i} className="flex items-center text-charcoal" style={{ paddingLeft: `${depth * 16}px` }}>
            {depth > 0 && <span className="mr-1.5 text-medium-gray">{"└─"}</span>}
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Contract({ name, src, inputs, outputs, actions, states, boundary }: { name: string; src: string; inputs: string; outputs?: string; actions: string; states: string[]; boundary: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 elev-card">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-mono font-semibold text-near-black">{name}</h3>
        <code className="text-[11px] text-medium-gray">{src}</code>
      </div>
      <div className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <Row k="Inputs" v={inputs} />
        {outputs && <Row k="Outputs" v={outputs} />}
        <Row k="Actions" v={actions} />
      </div>
      <div className="mt-3">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-medium-gray">States</div>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {states.map((s) => <span key={s} className="rounded-full bg-soft-gray px-2.5 py-0.5 text-xs text-charcoal">{s}</span>)}
        </div>
      </div>
      <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-ai-soft/40 p-2.5 text-xs text-charcoal"><Icon.Warning size={13} className="mt-0.5 shrink-0 text-ai" /> {boundary}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-medium-gray">{k}</dt>
      <dd className="text-charcoal">{v}</dd>
    </div>
  );
}
