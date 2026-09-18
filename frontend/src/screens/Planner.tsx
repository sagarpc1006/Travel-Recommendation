import { useEffect, useMemo, useRef, useState } from "react";
import AppShell from "../components/AppShell";
import Sheet from "../components/Sheet";
import { Icon, type IconName } from "../components/icons";
import {
  Button,
  Badge,
  TONE,
  CircularScore,
  ProgressBar,
  ComparisonBar,
  AiThinking,
} from "../components/ui";
import {
  OPTIONS,
  TRIP,
  EVIDENCE_META,
  DEFAULT_WEIGHTS,
  weightedScore,
  type TripOption,
  type Evidence,
} from "../data/tripOptions";
import { saveTrip as apiSaveTrip } from "../services/tripAPI";
import {
  generateRecommendations,
  getRecommendations,
  type RecommendationRequest,
} from "../services/recommendationAPI";
import { apiRecommendationToTripOption } from "../services/adapters";

type Go = (route: string) => void;
type Weights = { carbon: number; access: number; cost: number; time: number };
type RequestStatus = "idle" | "generating" | "success" | "error";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function normalizeWeights(w: Weights): { carbon: number; accessibility: number; cost: number; time: number } {
  const sum = (w.carbon || 0) + (w.access || 0) + (w.cost || 0) + (w.time || 0);
  if (sum <= 0) {
    return { carbon: 0.40, accessibility: 0.30, cost: 0.15, time: 0.15 };
  }
  const c = Math.round((w.carbon / sum) * 10000) / 10000;
  const a = Math.round((w.access / sum) * 10000) / 10000;
  const co = Math.round((w.cost / sum) * 10000) / 10000;
  const t = Math.round((1.0 - (c + a + co)) * 10000) / 10000;
  return { carbon: c, accessibility: a, cost: co, time: t };
}

function usePrefersReducedMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setRm(mq.matches);
    const on = () => setRm(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return rm;
}

function weightLabel(v: number) {
  return v >= 30 ? "High" : v >= 15 ? "Medium" : "Low";
}

/* ============================================================ */
export default function Planner({ go }: { go: Go }) {
  const reduced = usePrefersReducedMotion();
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);
  const [recalc, setRecalc] = useState<"idle" | "updating" | "updated">("idle");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editReq, setEditReq] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [toast, setToast] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");

  // Dynamic Trip Requirement state
  const [tripReq, setTripReq] = useState({
    origin: TRIP.origin,
    destination: TRIP.destination,
    duration: TRIP.duration,
    travelers: TRIP.travelers,
    dates: TRIP.dates,
    budget: TRIP.budget,
    eco_priority: "High",
    accessibility_required: true,
  });

  // Recommendation Engine state
  const [plannerOptions, setPlannerOptions] = useState<TripOption[]>(OPTIONS);
  const [isLiveRecs, setIsLiveRecs] = useState<boolean>(false);
  const [loadingRecs, setLoadingRecs] = useState<boolean>(false);
  const [recError, setRecError] = useState<string | null>(null);

  // Overlays
  const [showCompare, setShowCompare] = useState(false);
  const [mathFor, setMathFor] = useState<TripOption | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);
  const [breakdown, setBreakdown] = useState<"cost" | "time" | null>(null);
  const [generating, setGenerating] = useState(false);

  // Function to call Django POST /api/recommendations/
  async function fetchRecommendations(currentWeights: Weights, reqData = tripReq) {
    setRequestStatus("generating");
    setLoadingRecs(true);
    setRecError(null);
    try {
      const normalizedWeights = normalizeWeights(currentWeights);

      const budgetNumber = typeof reqData.budget === "string"
        ? parseInt(reqData.budget.replace(/[^0-9]/g, ""), 10) || 10000
        : typeof reqData.budget === "number" ? reqData.budget : 10000;

      const payload: RecommendationRequest = {
        origin: reqData.origin || "Pune",
        destination: reqData.destination || "Goa",
        budget: budgetNumber,
        currency: "INR",
        travel_dates: reqData.dates || "14-17 Nov",
        eco_priority: reqData.eco_priority || "High",
        accessibility_required: reqData.accessibility_required !== undefined ? reqData.accessibility_required : true,
        weights: normalizedWeights,
      };

      const response = await generateRecommendations(payload);
      if (response?.recommendations?.results && Array.isArray(response.recommendations.results) && response.recommendations.results.length > 0) {
        const converted = response.recommendations.results.map((r, i) =>
          apiRecommendationToTripOption(
            r,
            i,
            response.recommendations.results.length,
            reqData.origin,
            reqData.destination
          )
        );
        setPlannerOptions(converted);
        setIsLiveRecs(true);
        setRequestStatus("success");
        setRecError(null);
      } else {
        throw new Error("No recommendation results received from backend recommendation engine.");
      }
    } catch (err: any) {
      console.warn("Backend recommendation fetch failed:", err);
      let errMsg = "Could not reach recommendation engine.";
      if (err?.response?.status === 401) {
        errMsg = "Unauthorized: Please sign in or check your credentials.";
      } else if (err?.response?.status === 400) {
        errMsg = err?.response?.data?.errors ? JSON.stringify(err.response.data.errors) : "Bad request parameters.";
      } else if (err?.response?.status === 500) {
        errMsg = "Server error while calculating travel recommendations.";
      } else if (err?.message) {
        errMsg = err.message;
      }
      setRecError(errMsg);
      setIsLiveRecs(false);
      setRequestStatus("error");
    } finally {
      setLoadingRecs(false);
    }
  }

  // Initial fetch and debounced weight changes
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      fetchRecommendations(DEFAULT_WEIGHTS, tripReq);
      return;
    }
    setRecalc("updating");
    const debounceTimer = window.setTimeout(() => {
      fetchRecommendations(weights, tripReq).then(() => {
        setRecalc("updated");
      });
    }, reduced ? 300 : 700);
    return () => window.clearTimeout(debounceTimer);
  }, [weights]);

  // Options ranked: if live, backend authoritative scoring & rank is preserved; if fallback, weighted client scoring is used
  const ranked = useMemo(() => {
    if (isLiveRecs) {
      return plannerOptions.map((o) => ({ o, s: o.score }));
    }
    return [...plannerOptions]
      .map((o) => ({ o, s: weightedScore(o, weights) }))
      .sort((x, y) => y.s - x.s);
  }, [plannerOptions, isLiveRecs, weights]);

  const recommended = ranked[0]?.o || plannerOptions[0];
  const recScore = ranked[0]?.s || recommended?.score || 90;
  const standard = plannerOptions.find((o) => o.tag === "standard") || plannerOptions[plannerOptions.length - 1] || recommended;
  const ecoTwin = plannerOptions.find((o) => o.tag === "eco-twin") || plannerOptions[0] || recommended;
  const selected = plannerOptions.find((o) => o.id === selectedId) ?? null;

  // Highlight superlatives
  const superlatives = useMemo(() => {
    if (plannerOptions.length === 0) {
      return { best: "", carbon: "", value: "", access: "", fast: "" };
    }
    const by = <K extends keyof TripOption>(k: K, dir: "min" | "max") =>
      [...plannerOptions].sort((a, b) => (dir === "min" ? (a[k] as number) - (b[k] as number) : (b[k] as number) - (a[k] as number)))[0].id;
    return {
      best: recommended.id,
      carbon: by("carbonKg", "min"),
      value: by("cost", "min"),
      access: by("access", "max"),
      fast: by("timeMin", "min"),
    };
  }, [plannerOptions, recommended.id]);

  function changeWeight(key: keyof Weights, value: number) {
    setWeights((w) => ({ ...w, [key]: value }));
  }

  async function saveTrip() {
    setSaveState("saving");
    const optionToSave = selected || recommended;
    const isVerifiedAcc = optionToSave.accessItems?.some((a) => a.status === "verified") ?? false;
    const transportTitle = optionToSave.transport || optionToSave.label || "Eco Transit";
    const payload = {
      title: `${tripReq.origin} to ${tripReq.destination} via ${transportTitle}`,
      origin: tripReq.origin,
      destination: tripReq.destination,
      duration_days: 3,
      travel_dates: tripReq.dates,
      transport_mode: transportTitle,
      total_cost: optionToSave.cost,
      currency: "INR",
      eco_score: optionToSave.score || recScore || 90,
      carbon_emissions: optionToSave.carbonKg,
      carbon_saved: `${carbonCut}% vs standard`,
      accessibility_rating: optionToSave.access,
      accessibility_verified: isVerifiedAcc,
      status: "planned",
      cover_image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
      stays: "Verified Coastal Eco Stay",
      recommendation_data: {
        id: optionToSave.id,
        transport: optionToSave.transport,
        score: optionToSave.score,
        sub: optionToSave.sub,
        why_recommended: optionToSave.reasons,
      },
      eco_twin_data: ecoTwin ? {
        id: ecoTwin.id,
        transport: ecoTwin.transport,
        carbonKg: ecoTwin.carbonKg,
        cost: ecoTwin.cost,
        score: ecoTwin.score,
        carbonCut: `${carbonCut}%`,
      } : {},
      show_your_math_data: optionToSave.rawShowYourMath || null,
    };

    try {
      const res = await apiSaveTrip(payload);
      setSaveState("saved");
      setToast(res?.message || "Trip saved to your collection.");
      window.setTimeout(() => {
        setToast(null);
        setSaveState("idle");
      }, 3000);
    } catch (err: any) {
      console.warn("Could not save trip to backend:", err);
      setSaveState("error");
      const errDetail = err?.response?.data?.error || err?.response?.data?.detail || "Could not save trip to backend.";
      setToast(errDetail);
      window.setTimeout(() => {
        setToast(null);
        setSaveState("idle");
      }, 4000);
    }
  }

  const carbonCut = recommended?.explanation?.comparison?.carbon_reduction_percent
    ?? (standard && ecoTwin && standard.carbonKg > 0
      ? Math.max(0, Math.round(((standard.carbonKg - ecoTwin.carbonKg) / standard.carbonKg) * 100))
      : 0);

  return (
    <AppShell active="planner" go={go}>
      {/* ---- Header ---- */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <button onClick={() => go("home")} className="inline-flex items-center gap-1 text-sm text-medium-gray hover:text-charcoal">
            <Icon.Chevron size={15} className="rotate-180" /> Back
          </button>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-near-black">
                  {tripReq.origin} <span className="text-emerald-500">→</span> {tripReq.destination}
                </h1>
                <Badge
                  icon="AI"
                  label={isLiveRecs ? "Live Engine" : "Planning"}
                  tone={isLiveRecs ? TONE.verified : TONE.ai}
                />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-gray">
                <span className="flex items-center gap-1"><Icon.Calendar size={14} /> {tripReq.duration}</span>
                <span className="flex items-center gap-1"><Icon.Profile size={14} /> {tripReq.travelers} Travelers</span>
                <span className="flex items-center gap-1"><Icon.Clock size={14} /> Dates {tripReq.dates}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" icon="Sliders" onClick={() => setEditReq((v) => !v)}>Edit</Button>
              <Button
                variant="secondary"
                icon={saveState === "saved" ? "Check" : "Plus"}
                loading={saveState === "saving"}
                onClick={saveTrip}
              >
                {saveState === "saved" ? "Saved" : "Save Trip"}
              </Button>
              <Button variant="tertiary" icon="Route" onClick={() => { setToast("Share link copied."); setTimeout(() => setToast(null), 2200); }}>
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Planning progress & loading banner ---- */}
      <div className="border-b border-border bg-warm-white">
        <div className="mx-auto max-w-6xl px-6 py-3 space-y-2">
          <PlanningProgress />
          {loadingRecs && (
            <div className="flex items-center gap-2 py-1 text-xs text-forest-700 font-medium">
              <AiThinking label="Fetching real-time scored recommendations from Django backend…" />
            </div>
          )}
          {recError && (
            <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <Icon.Warning size={15} className="text-amber-600 shrink-0" />
                <span>{recError}</span>
                <span className="text-amber-700">(Using demonstration fallback options)</span>
              </div>
              <Button size="sm" variant="secondary" onClick={() => fetchRecommendations(weights, tripReq)}>Retry</Button>
            </div>
          )}
        </div>
      </div>

      {/* ---- Workspace ---- */}
      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[320px_1fr]">
        {/* LEFT RAIL — order after main on mobile so recommendation leads */}
        <aside className="order-2 space-y-5 lg:order-1">
          <RequirementSummary
            tripReq={tripReq}
            editing={editReq}
            onToggle={() => setEditReq((v) => !v)}
            onApply={(newReq) => {
              setTripReq(newReq);
              setEditReq(false);
              fetchRecommendations(weights, newReq);
            }}
            go={go}
          />
          <ScoreWeights weights={weights} onChange={changeWeight} recalc={recalc} />
          <AccessibilityEvidence option={recommended} onView={() => setShowEvidence(true)} />
          <WeatherContext />
          <ProvenancePanel />
        </aside>

        {/* MAIN */}
        <div className="order-1 space-y-8 lg:order-2">
          <RecommendedCard
            option={recommended}
            score={recScore}
            recalc={recalc}
            selected={selectedId === recommended.id}
            onSelect={() => setSelectedId(recommended.id)}
            onCompare={() => setShowCompare(true)}
            onMath={() => setMathFor(recommended)}
          />

          <EcoTwinSection standard={standard} ecoTwin={ecoTwin} carbonCut={carbonCut} />

          <ScoreCard option={recommended} score={recScore} />

          {/* All travel options */}
          <section>
            <SectionTitle
              title="All travel options"
              note={isLiveRecs ? "Live ranked options from EcoTrail backend recommendation engine." : "Illustrative demonstration values — backend offline."}
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {plannerOptions.map((o) => (
                <OptionCard
                  key={o.id}
                  option={o}
                  labels={labelsFor(o.id, superlatives)}
                  selected={selectedId === o.id}
                  isRecommended={o.id === recommended.id}
                  onSelect={() => setSelectedId(o.id)}
                  onDetails={() => setBreakdown("cost")}
                  onMath={() => setMathFor(o)}
                />
              ))}
            </div>
          </section>

          {/* Show your math + breakdowns */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowYourMathCard option={recommended} onExpand={() => setMathFor(recommended)} />
            <div className="space-y-6">
              <BreakdownTeaser option={recommended} kind="cost" onOpen={() => setBreakdown("cost")} />
              <BreakdownTeaser option={recommended} kind="time" onOpen={() => setBreakdown("time")} />
            </div>
          </div>

          <RouteMap
            standard={standard}
            ecoTwin={ecoTwin}
            recommendedId={recommended.id}
            origin={tripReq.origin}
            destination={tripReq.destination}
          />
        </div>
      </main>

      {/* ---- Sticky selection bar ---- */}
      {selected && (
        <div className="sticky bottom-16 z-30 lg:bottom-0" style={{ animation: reduced ? undefined : "sheet-rise 260ms cubic-bezier(.16,1,.3,1)" }}>
          <div className="mx-auto max-w-6xl px-6 pb-4">
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-forest-700 bg-card p-3 elev-modal">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-forest-700 text-primary-foreground"><Icon.Check size={18} /></span>
              <div className="mr-auto">
                <div className="text-xs font-medium uppercase tracking-wide text-emerald-500">Selected</div>
                <div className="text-sm font-semibold text-near-black">{selected.transport} · {selected.time} · {inr(selected.cost)}</div>
              </div>
              <Button variant="tertiary" onClick={() => setShowCompare(true)}>Compare Again</Button>
              <Button icon="Route" onClick={() => setGenerating(true)}>Build My Itinerary</Button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Toast ---- */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 lg:bottom-8" role="status">
          <div className="flex items-center gap-2 rounded-full bg-near-black px-4 py-2.5 text-sm font-medium text-warm-white elev-modal">
            <Icon.Check size={16} className="text-emerald-400" /> {toast}
          </div>
        </div>
      )}

      {/* ---- Overlays ---- */}
      {showCompare && (
        <ComparisonSheet
          options={plannerOptions}
          superlatives={superlatives}
          weights={weights}
          onClose={() => setShowCompare(false)}
          onSelect={(id) => { setSelectedId(id); setShowCompare(false); }}
          selectedId={selectedId}
        />
      )}
      {mathFor && <ShowYourMathSheet option={mathFor} onClose={() => setMathFor(null)} />}
      {showEvidence && <EvidenceSheet option={recommended} onClose={() => setShowEvidence(false)} />}
      {breakdown && <BreakdownSheet option={recommended} kind={breakdown} onClose={() => setBreakdown(null)} />}
      {generating && (
        <ItineraryGeneration
          reduced={reduced}
          onDone={() => setGenerating(false)}
          onBuild={() => { setGenerating(false); go("itinerary"); }}
          option={selected ?? recommended}
          destination={tripReq.destination}
        />
      )}
    </AppShell>
  );
}

/* ============================================================
   Shared bits
   ============================================================ */
function SectionTitle({ title, note, action, onAction }: { title: string; note?: string; action?: string; onAction?: () => void }) {
  return (
    <div className="mb-4">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-near-black">{title}</h2>
        {action && (
          <button onClick={onAction} className="inline-flex items-center gap-1 text-sm font-medium text-emerald-500 hover:underline">
            {action} <Icon.Chevron size={14} />
          </button>
        )}
      </div>
      {note && <p className="mt-1 flex items-center gap-1.5 text-xs text-medium-gray"><Icon.Info size={13} /> {note}</p>}
    </div>
  );
}

function MetricTile({ icon, label, value, sub, tone }: { icon: IconName; label: string; value: string; sub?: string; tone?: string }) {
  const I = Icon[icon];
  return (
    <div className="rounded-lg border border-border bg-warm-white p-3">
      <div className="flex items-center gap-1 text-[11px] text-medium-gray"><I size={13} /> {label}</div>
      <div className="mt-1 font-mono text-lg font-semibold" style={{ color: tone ?? "var(--color-near-black)" }}>{value}</div>
      {sub && <div className="text-[11px] text-medium-gray">{sub}</div>}
    </div>
  );
}

function TransportGlyphs({ icons }: { icons: IconName[] }) {
  return (
    <span className="inline-flex items-center gap-1 text-forest-700">
      {icons.map((ic, i) => {
        const I = Icon[ic];
        return (
          <span key={ic} className="inline-flex items-center gap-1">
            {i > 0 && <Icon.Plus size={11} className="text-medium-gray" />}
            <span className="grid h-7 w-7 place-items-center rounded-md bg-sage-100"><I size={16} /></span>
          </span>
        );
      })}
    </span>
  );
}

function AccessDots({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Accessibility ${n} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`h-1.5 w-3 rounded-full ${i <= n ? "bg-access" : "bg-mist"}`} />
      ))}
    </span>
  );
}

function EvidenceBadge({ status }: { status: Evidence }) {
  const m = EVIDENCE_META[status];
  return <Badge icon={m.icon} label={m.label} tone={TONE[m.tone]} />;
}

/* ---- Planning progress ---- */
function PlanningProgress() {
  const steps = [
    ["Understanding trip", "done"],
    ["Finding travel options", "done"],
    ["Checking accessibility", "done"],
    ["Comparing impact", "active"],
    ["Preparing recommendations", "todo"],
  ] as const;
  return (
    <ol className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
      {steps.map(([label, state], i) => (
        <li key={label} className="flex items-center gap-2">
          <span
            className={`grid h-4 w-4 place-items-center rounded-full ${
              state === "done" ? "bg-forest-700 text-primary-foreground" : state === "active" ? "border-2 border-emerald-500" : "border-2 border-mist"
            }`}
          >
            {state === "done" && <Icon.Check size={10} />}
            {state === "active" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" style={{ animation: "ai-pulse 1.4s infinite" }} />}
          </span>
          <span className={state === "todo" ? "text-medium-gray" : "font-medium text-charcoal"}>{label}</span>
          {i < steps.length - 1 && <span className="hidden h-px w-6 bg-mist sm:block" />}
        </li>
      ))}
    </ol>
  );
}

/* ---- Requirement summary (left rail) ---- */
function RequirementSummary({
  tripReq,
  editing,
  onToggle,
  onApply,
  go,
}: {
  tripReq: {
    origin: string;
    destination: string;
    duration: string;
    travelers: number;
    dates: string;
    budget: string;
    eco_priority: string;
    accessibility_required: boolean;
  };
  editing: boolean;
  onToggle: () => void;
  onApply: (newReq: any) => void;
  go: Go;
}) {
  const [formValues, setFormValues] = useState(tripReq);

  useEffect(() => {
    setFormValues(tripReq);
  }, [tripReq, editing]);

  const rows: [string, string, keyof typeof tripReq][] = [
    ["Origin", tripReq.origin, "origin"],
    ["Destination", tripReq.destination, "destination"],
    ["Duration", tripReq.duration, "duration"],
    ["Travelers", String(tripReq.travelers), "travelers"],
    ["Dates", tripReq.dates, "dates"],
    ["Budget", tripReq.budget, "budget"],
  ];
  const prefs: [string, string][] = [
    ["Sustainability", `${tripReq.eco_priority} priority`],
    ["Accessibility", tripReq.accessibility_required ? "Step-free required" : "Standard"],
    ["Convenience", "Balanced"],
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-4 elev-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-near-black">Trip requirements</h3>
        <button onClick={onToggle} className="text-xs font-medium text-emerald-500 hover:underline">{editing ? "Cancel" : "Edit"}</button>
      </div>
      <p className="mt-1 text-[11px] text-medium-gray">These values shape your recommendations.</p>

      <dl className="mt-3 space-y-2">
        {rows.map(([k, v, key]) => (
          <div key={k} className="flex items-center justify-between gap-2">
            <dt className="text-xs text-medium-gray">{k}</dt>
            {editing ? (
              <input
                value={formValues[key] as string}
                onChange={(e) => setFormValues((prev) => ({ ...prev, [key]: e.target.value }))}
                aria-label={k}
                className="h-7 w-32 rounded-md border border-mist bg-warm-white px-2 text-right text-xs text-near-black focus:border-emerald-500 focus:outline-none"
              />
            ) : (
              <dd className="text-xs font-medium text-charcoal">{v}</dd>
            )}
          </div>
        ))}
      </dl>

      <div className="mt-3 border-t border-border pt-3">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-medium-gray">Preferences</div>
        <ul className="mt-2 space-y-1.5">
          {prefs.map(([k, v]) => (
            <li key={k} className="flex items-center justify-between text-xs">
              <span className="text-medium-gray">{k}</span>
              <span className="font-medium text-forest-700">{v}</span>
            </li>
          ))}
        </ul>
      </div>

      {editing && (
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="tertiary" className="flex-1" onClick={() => go("home")}>Edit request</Button>
          <Button size="sm" className="flex-1" onClick={() => onApply(formValues)}>Apply</Button>
        </div>
      )}
    </div>
  );
}

/* ---- Score weights (interactive) ---- */
function ScoreWeights({ weights, onChange, recalc }: { weights: Weights; onChange: (k: keyof Weights, v: number) => void; recalc: string }) {
  const rows: [keyof Weights, string, IconName][] = [
    ["carbon", "Sustainability", "Leaf"],
    ["access", "Accessibility", "Accessibility"],
    ["cost", "Cost", "Money"],
    ["time", "Time / Convenience", "Clock"],
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-4 elev-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-near-black">Your priorities</h3>
        {recalc === "updating" ? (
          <span className="text-[11px] font-medium text-ai">Updating…</span>
        ) : recalc === "updated" ? (
          <span className="flex items-center gap-1 text-[11px] font-medium text-success"><Icon.Check size={12} /> Updated</span>
        ) : null}
      </div>
      <p className="mt-1 text-[11px] text-medium-gray">Adjust what matters most. Recommendations recalculate.</p>
      <div className="mt-3 space-y-3.5">
        {rows.map(([key, label, icon]) => {
          const I = Icon[icon];
          return (
            <div key={key}>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-charcoal"><I size={13} className="text-emerald-500" /> {label}</span>
                <span className="font-medium text-forest-700">{weightLabel(weights[key])}</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={weights[key]}
                onChange={(e) => onChange(key, Number(e.target.value))}
                className="mt-1.5 w-full accent-emerald-500"
                aria-label={`${label} priority`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Accessibility evidence (rail) ---- */
function AccessibilityEvidence({ option, onView }: { option: TripOption; onView: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 elev-card">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-near-black"><Icon.Accessibility size={16} className="text-access" /> Accessibility</h3>
        <span className="font-mono text-sm font-semibold text-access">{option.access}/5</span>
      </div>
      <ul className="mt-3 space-y-2">
        {option.accessItems.map((a) => (
          <li key={a.label} className="flex items-center justify-between gap-2">
            <span className="text-xs text-charcoal">{a.label}</span>
            <EvidenceBadge status={a.status} />
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-start gap-1.5 text-[11px] text-medium-gray">
        <Icon.Info size={13} className="mt-px shrink-0" /> AI-supported details are not equivalent to verified evidence.
      </p>
      <Button size="sm" variant="tertiary" className="mt-3 w-full" onClick={onView}>View Evidence</Button>
    </div>
  );
}

/* ---- Weather (rail) ---- */
function WeatherContext() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 elev-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-near-black">Weather context</h3>
        <Badge icon="Weather" label="OpenWeather" tone={TONE.weather} />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-weather-soft text-weather"><Icon.Weather size={22} /></span>
        <div>
          <div className="font-mono text-lg font-semibold text-near-black">29°C</div>
          <div className="text-xs text-medium-gray">Partly cloudy · Humidity 74%</div>
        </div>
      </div>
      <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-weather-soft/60 p-2 text-[11px] text-charcoal">
        <Icon.Info size={13} className="mt-px shrink-0 text-weather" /> Rain may increase walking difficulty on transfers.
      </p>
    </div>
  );
}

/* ---- Provenance (rail) ---- */
function ProvenancePanel() {
  const rows: [string, string, Evidence][] = [
    ["Travel data", "Government portals", "verified"],
    ["Emission factors", "Environmental factors", "verified"],
    ["Accessibility", "OSM + declared", "supported"],
    ["Weather", "OpenWeather (live)", "verified"],
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-4 elev-card">
      <h3 className="flex items-center gap-1.5 text-sm font-semibold text-near-black"><Icon.Verified size={16} className="text-verified" /> Data sources</h3>
      <ul className="mt-3 space-y-2.5">
        {rows.map(([k, src, status]) => (
          <li key={k} className="flex items-center justify-between gap-2">
            <div>
              <div className="text-xs font-medium text-charcoal">{k}</div>
              <div className="text-[11px] text-medium-gray">{src}</div>
            </div>
            <EvidenceBadge status={status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- Recommended card (hero) ---- */
function RecommendedCard({
  option, score, recalc, selected, onSelect, onCompare, onMath,
}: {
  option: TripOption; score: number; recalc: string; selected: boolean;
  onSelect: () => void; onCompare: () => void; onMath: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border-2 border-forest-700 bg-card elev-raised" aria-label="Recommended option">
      <div className="flex items-center justify-between bg-forest-700 px-5 py-2.5 text-primary-foreground">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide"><Icon.Leaf size={15} /> Recommended for you</span>
        <span className="text-[11px] text-sage-200">Best match for your priorities</span>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <TransportGlyphs icons={option.icons} />
            <div>
              <h3 className="text-lg font-semibold text-near-black">{option.transport}</h3>
              <div className="text-xs text-medium-gray">{option.route}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricTile icon="Carbon" label="Est. CO₂e" value={`${option.carbonKg} kg`} tone="var(--color-carbon)" />
            <MetricTile icon="Money" label="Est. cost" value={inr(option.cost)} />
            <MetricTile icon="Clock" label="Time" value={option.time} />
            <MetricTile icon="Accessibility" label="Access" value={`${option.access}/5`} tone="var(--color-access)" />
          </div>

          <div className="mt-4 rounded-lg border border-border bg-warm-white p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-charcoal"><Icon.AI size={14} className="text-ai" /> Why this option?</div>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {option.reasons.map((r) => (
                <li key={r} className="flex items-start gap-1.5 text-xs text-slate-gray"><Icon.Check size={13} className="mt-0.5 shrink-0 text-emerald-500" /> {r}</li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-medium-gray">Based on available travel, accessibility and environmental data.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 md:w-40">
          <CircularScore value={score} color="var(--color-forest-700)" size={96} />
          <div className="text-center text-xs font-medium text-slate-gray">Green &amp; Accessible Score</div>
          {recalc === "updating" && <span className="text-[11px] text-ai">Updating…</span>}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-4">
        <Button icon="Layers" onClick={onCompare}>Compare Options</Button>
        <Button variant={selected ? "secondary" : "tertiary"} icon={selected ? "Check" : "Plus"} onClick={onSelect}>
          {selected ? "Selected" : "Select"}
        </Button>
        <button onClick={onMath} className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-emerald-500 hover:underline">
          <Icon.Carbon size={15} /> Show Your Math
        </button>
      </div>
    </section>
  );
}

/* ---- Eco-Twin ---- */
function EcoTwinSection({ standard, ecoTwin, carbonCut }: { standard: TripOption; ecoTwin: TripOption; carbonCut: number }) {
  const comp = ecoTwin.explanation?.comparison;
  const dTime = comp?.time_difference_minutes !== undefined
    ? comp.time_difference_minutes
    : (ecoTwin.timeMin - standard.timeMin);
  const dCost = comp?.cost_difference !== undefined
    ? -comp.cost_difference
    : (standard.cost - ecoTwin.cost);
  const timeLabel = dTime >= 0 ? `+${dTime} min` : `${dTime} min`;
  const costLabel = dCost >= 0 ? `${inr(dCost)} less` : `${inr(Math.abs(dCost))} more`;
  const accDiff = comp?.accessibility_difference;
  const accLabel = accDiff !== undefined && accDiff > 0
    ? `+${accDiff} rating`
    : (ecoTwin.accessItems?.some((a) => a.status === "verified") ? "Fully accessible" : `${ecoTwin.access}/5 Access`);

  const reasonsList = Array.isArray(ecoTwin.explanation?.why_recommended) && ecoTwin.explanation.why_recommended.length > 0
    ? ecoTwin.explanation.why_recommended.slice(0, 3)
    : ["Lower estimated carbon", "Better accessibility", "Lower estimated cost"];

  return (
    <section className="rounded-2xl border border-emerald-400 bg-gradient-to-br from-sage-100 to-card p-5 elev-card">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500 text-white"><Icon.Leaf size={18} /></span>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-near-black">Meet your Eco-Twin.</h2>
          <p className="text-xs text-slate-gray">An alternative way to take the same trip, optimized around your priorities.</p>
        </div>
      </div>

      {/* Trade-off statement — authoritative backend calculations */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          [timeLabel, "travel difference", "Clock", "var(--color-estimated)"],
          [costLabel, "vs baseline", "Money", "var(--color-success)"],
          [`${carbonCut}% less`, "carbon", "Carbon", "var(--color-carbon)"],
          [accLabel, "accessibility", "Accessibility", "var(--color-access)"],
        ].map(([big, small, icon, color]) => {
          const I = Icon[icon as IconName];
          return (
            <div key={small} className="rounded-xl border border-border bg-card p-3 text-center">
              <I size={18} className="mx-auto" style={{ color }} />
              <div className="mt-1 text-sm font-bold text-near-black">{big}</div>
              <div className="text-[11px] text-medium-gray">{small}</div>
            </div>
          );
        })}
      </div>

      {/* Side-by-side comparison */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <TwinColumn title="Standard" option={standard} muted />
        <TwinColumn title="Eco-Twin" option={ecoTwin} />
      </div>

      <div className="mt-4 rounded-lg border border-border bg-card p-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-charcoal"><Icon.AI size={14} className="text-ai" /> Why is this my Eco-Twin?</div>
        <ul className="mt-2 grid gap-1 sm:grid-cols-3">
          {reasonsList.map((r: string) => (
            <li key={r} className="flex items-start gap-1.5 text-xs text-slate-gray"><Icon.Check size={13} className="mt-0.5 shrink-0 text-emerald-500" /> {r}</li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-medium-gray">
          EcoTrail kept your destination and trip requirements fixed while finding an alternative that better matches your priorities.
        </p>
      </div>
    </section>
  );
}

function TwinColumn({ title, option, muted }: { title: string; option: TripOption; muted?: boolean }) {
  const rows: [IconName, string, string][] = [
    ["Carbon", "CO₂e", `${option.carbonKg} kg`],
    ["Money", "Cost", inr(option.cost)],
    ["Clock", "Time", option.time],
    ["Accessibility", "Access", `${option.access}/5`],
  ];
  return (
    <div className={`rounded-xl border p-4 ${muted ? "border-border bg-warm-white" : "border-emerald-400 bg-card"}`}>
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-semibold uppercase tracking-wide ${muted ? "text-medium-gray" : "text-emerald-500"}`}>{title}</span>
        <TransportGlyphs icons={option.icons} />
      </div>
      <div className="mt-1 text-sm font-semibold text-near-black">{option.transport}</div>
      <dl className="mt-3 space-y-2">
        {rows.map(([icon, k, v]) => {
          const I = Icon[icon];
          return (
            <div key={k} className="flex items-center justify-between text-sm">
              <dt className="flex items-center gap-1.5 text-xs text-medium-gray"><I size={13} /> {k}</dt>
              <dd className="font-mono font-medium text-charcoal">{v}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

/* ---- Green & Accessible Score with breakdown ---- */
function ScoreCard({ option, score }: { option: TripOption; score: number }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-2xl border border-border bg-card p-5 elev-card">
      <div className="flex flex-wrap items-center gap-5">
        <CircularScore value={score} color="var(--color-emerald-500)" size={104} />
        <div className="min-w-[200px] flex-1">
          <h2 className="text-lg font-semibold text-near-black">Green &amp; Accessible Score</h2>
          <p className="text-sm text-slate-gray">How well this option matches your priorities.</p>
          <div className="mt-3 space-y-2.5">
            {option.subDetail.map((s) => (
              <div key={s.key}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-charcoal">{s.label} <span className="text-medium-gray">· {s.weightPct}%</span></span>
                  <span className="font-mono text-medium-gray">{s.value}/100</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-soft-gray">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${s.value}%`, transition: "width 500ms cubic-bezier(.16,1,.3,1)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => setOpen((v) => !v)} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-500 hover:underline">
        {open ? "Hide breakdown" : "View score detail"} <Icon.Chevron size={14} className={open ? "-rotate-90" : "rotate-90"} />
      </button>

      {open && (
        <div className="mt-3 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
          {option.subDetail.map((s) => (
            <div key={s.key} className="rounded-lg border border-border bg-warm-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-charcoal">{s.label} Score</span>
                <span className="font-mono text-sm font-semibold text-forest-700">{s.value}/100</span>
              </div>
              <p className="mt-1 text-xs text-slate-gray">{s.explain}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---- Option card (in the list) ---- */
function labelsFor(id: string, s: { best: string; carbon: string; value: string; access: string; fast: string }) {
  const out: [string, IconName][] = [];
  if (s.best === id) out.push(["Best overall", "Leaf"]);
  if (s.carbon === id) out.push(["Lowest carbon", "Carbon"]);
  if (s.value === id) out.push(["Best value", "Money"]);
  if (s.access === id) out.push(["Most accessible", "Accessibility"]);
  if (s.fast === id) out.push(["Fastest", "Clock"]);
  return out;
}

function OptionCard({
  option, labels, selected, isRecommended, onSelect, onDetails, onMath,
}: {
  option: TripOption; labels: [string, IconName][]; selected: boolean; isRecommended: boolean;
  onSelect: () => void; onDetails: () => void; onMath: () => void;
}) {
  return (
    <div className={`flex flex-col rounded-xl border bg-card p-4 transition-all ${selected ? "border-forest-700 elev-raised" : isRecommended ? "border-emerald-400 elev-card" : "border-border elev-card"}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-medium-gray">{option.label}</span>
        <span className="inline-flex items-center gap-1 rounded-md bg-forest-700 px-1.5 py-0.5 text-primary-foreground">
          <Icon.Leaf size={11} /> <span className="font-mono text-[11px] font-semibold">{option.score}</span>
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <TransportGlyphs icons={option.icons} />
        <h3 className="text-sm font-semibold text-near-black">{option.transport}</h3>
      </div>

      {labels.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {labels.map(([t, ic]) => {
            const I = Icon[ic];
            return (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-sage-100 px-2 py-0.5 text-[11px] font-medium text-forest-700">
                <I size={11} /> {t}
              </span>
            );
          })}
        </div>
      )}

      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <Row icon="Carbon" k="CO₂e" v={`${option.carbonKg} kg`} />
        <Row icon="Money" k="Cost" v={inr(option.cost)} />
        <Row icon="Clock" k="Time" v={option.time} />
        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-1 text-medium-gray"><Icon.Accessibility size={12} /> Access</dt>
          <dd><AccessDots n={option.access} /></dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center gap-2 pt-4">
        <Button size="sm" variant={selected ? "secondary" : "primary"} icon={selected ? "Check" : undefined} className="flex-1" onClick={onSelect}>
          {selected ? "Selected" : "Select"}
        </Button>
        <Button size="sm" variant="ghost" onClick={onMath} aria-label="Show your math"><Icon.Carbon size={15} /></Button>
        <Button size="sm" variant="ghost" onClick={onDetails} aria-label="View details"><Icon.Sliders size={15} /></Button>
      </div>
    </div>
  );
}

function Row({ icon, k, v }: { icon: IconName; k: string; v: string }) {
  const I = Icon[icon];
  return (
    <div className="flex items-center justify-between">
      <dt className="flex items-center gap-1 text-medium-gray"><I size={12} /> {k}</dt>
      <dd className="font-mono font-medium text-charcoal">{v}</dd>
    </div>
  );
}

/* ---- Show your math (inline card) ---- */
function ShowYourMathCard({ option, onExpand }: { option: TripOption; onExpand: () => void }) {
  const math = option.rawShowYourMath;
  return (
    <section className="rounded-2xl border border-border bg-card p-5 elev-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-near-black">Show Your Math</h2>
        <Badge
          icon={math?.calculation?.formula ? "Verified" : "Info"}
          label={math?.calculation?.formula ? "Authoritative" : "Estimated"}
          tone={math?.calculation?.formula ? TONE.verified : TONE.estimated}
        />
      </div>
      <p className="mt-1 text-sm text-slate-gray">
        {math?.calculation?.formula
          ? "Authoritative multi-criteria scoring calculation from Django backend."
          : "See how EcoTrail estimated the travel emissions."}
      </p>

      {math?.calculation?.formula ? (
        <div className="mt-4 rounded-lg border border-border bg-warm-white p-3 font-mono text-xs text-charcoal">
          <div className="text-[11px] font-semibold text-medium-gray mb-1 uppercase tracking-wide">Composite Formula</div>
          <div className="text-forest-700 font-semibold">{math.calculation.formula}</div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-warm-white p-3 text-center text-xs">
          <span className="flex-1 rounded-md bg-card px-2 py-2 font-medium text-charcoal">Activity data<br /><span className="text-medium-gray">distance × mode</span></span>
          <Icon.Close size={14} className="rotate-45 text-medium-gray" />
          <span className="flex-1 rounded-md bg-card px-2 py-2 font-medium text-charcoal">Emission factor<br /><span className="text-medium-gray">kg / km</span></span>
          <span className="text-medium-gray">=</span>
          <span className="flex-1 rounded-md bg-carbon-soft px-2 py-2 font-semibold text-carbon">Estimated CO₂e</span>
        </div>
      )}

      <div className="mt-3 font-mono text-2xl font-bold text-carbon">{option.carbonKg} kg <span className="text-sm font-normal text-medium-gray">total est.</span></div>
      <Button variant="tertiary" className="mt-3 w-full" icon="Carbon" onClick={onExpand}>View calculation</Button>
    </section>
  );
}

/* ---- Breakdown teaser (cost / time) ---- */
function BreakdownTeaser({ option, kind, onOpen }: { option: TripOption; kind: "cost" | "time"; onOpen: () => void }) {
  const isCost = kind === "cost";
  const total = isCost ? inr(option.cost) : option.time;
  return (
    <section className="rounded-2xl border border-border bg-card p-5 elev-card">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-near-black">
          {isCost ? <Icon.Money size={16} /> : <Icon.Clock size={16} />} {isCost ? "Cost breakdown" : "Time breakdown"}
        </h2>
        <span className="font-mono text-sm font-semibold text-near-black">{total}</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {(isCost ? option.costBreakdown.map((r) => [r.label, inr(r.value)] as [string, string]) : option.timeBreakdown.map((r) => [r.label, r.value] as [string, string])).map(([k, v]) => (
          <li key={k} className="flex items-center justify-between text-xs">
            <span className="text-medium-gray">{k}</span>
            <span className="font-mono text-charcoal">{v}</span>
          </li>
        ))}
      </ul>
      <button onClick={onOpen} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-500 hover:underline">
        View Breakdown <Icon.Chevron size={14} />
      </button>
    </section>
  );
}

/* ---- Route map ---- */
function RouteMap({
  standard,
  ecoTwin,
  recommendedId,
  origin = "Pune",
  destination = "Goa",
}: {
  standard: TripOption;
  ecoTwin: TripOption;
  recommendedId: string;
  origin?: string;
  destination?: string;
}) {
  const [route, setRoute] = useState<"standard" | "eco">(recommendedId === standard.id ? "standard" : "eco");
  const active = route === "eco" ? ecoTwin : standard;
  return (
    <section className="rounded-2xl border border-border bg-card p-5 elev-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-near-black">Route</h2>
        <div className="flex overflow-hidden rounded-lg border border-border text-sm">
          {(["standard", "eco"] as const).map((r) => (
            <button key={r} onClick={() => setRoute(r)} className={`px-3 py-1.5 font-medium transition-colors ${route === r ? "bg-sage-100 text-forest-700" : "text-medium-gray hover:bg-soft-gray"}`}>
              {r === "standard" ? "Standard" : "Eco-Twin"}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-4 h-72 overflow-hidden rounded-xl border border-border bg-sage-100" role="group" aria-label={`Map showing the ${route === "eco" ? "Eco-Twin" : "Standard"} route from ${standard.route}. A textual route description is provided below.`}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="pmap-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#00000008" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pmap-grid)" />
          {/* route path — dashed for standard, solid for eco (not color-only) */}
          <path
            d="M 60 210 C 180 120, 320 250, 470 90"
            fill="none"
            stroke={route === "eco" ? "var(--color-emerald-500)" : "var(--color-medium-gray)"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={route === "eco" ? "0" : "9 8"}
          />
        </svg>
        {/* origin / destination markers */}
        <Marker x={60} y={210} label={origin} kind="origin" />
        <Marker x={470} y={90} label={destination} kind="dest" />

        <div className="absolute left-3 top-3 rounded-lg border border-border bg-card/95 px-3 py-2 text-[11px] backdrop-blur">
          <div className="flex items-center gap-1.5 text-charcoal">
            <span className={`inline-block h-0.5 w-5 ${route === "eco" ? "bg-emerald-500" : "border-t-2 border-dashed border-medium-gray"}`} />
            {route === "eco" ? "Eco-Twin route" : "Standard route"}
          </div>
        </div>
        <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg border border-border bg-card">
          <button className="grid h-8 w-8 place-items-center border-b border-border text-charcoal hover:bg-soft-gray" aria-label="Zoom in"><Icon.Plus size={15} /></button>
          <button className="grid h-8 w-8 place-items-center text-charcoal hover:bg-soft-gray" aria-label="Layers"><Icon.Layers size={15} /></button>
        </div>
      </div>

      {/* textual alternative + segments */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        {active.icons.map((ic, i) => {
          const I = Icon[ic];
          return (
            <span key={ic} className="flex items-center gap-2">
              {i > 0 && <Icon.Chevron size={14} className="text-medium-gray" />}
              <span className="flex items-center gap-1.5 rounded-lg border border-border bg-warm-white px-2.5 py-1.5 text-charcoal"><I size={15} className="text-forest-700" /> {active.segments[i]?.mode}</span>
            </span>
          );
        })}
        <span className="ml-auto text-xs text-medium-gray">{active.route}</span>
      </div>
    </section>
  );
}

function Marker({ x, y, label, kind }: { x: number; y: number; label: string; kind: "origin" | "dest" }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-full" style={{ left: x, top: y }}>
      <div className="flex flex-col items-center">
        <span className={`grid h-7 w-7 place-items-center rounded-full text-white ring-4 ring-white ${kind === "dest" ? "bg-forest-700" : "bg-emerald-500"}`}>
          <Icon.Location size={15} />
        </span>
        <span className="mt-1 whitespace-nowrap rounded bg-card px-1.5 py-0.5 text-[11px] font-semibold text-near-black shadow">{label}</span>
      </div>
    </div>
  );
}

/* ============================================================
   Overlays / sheets
   ============================================================ */
function ComparisonSheet({
  options,
  superlatives,
  weights,
  onClose,
  onSelect,
  selectedId,
}: {
  options: TripOption[];
  superlatives: { best: string; carbon: string; value: string; access: string; fast: string };
  weights: Weights;
  onClose: () => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  return (
    <Sheet title="Compare options" size="lg" onClose={onClose}>
      <p className="-mt-1 mb-4 flex items-center gap-1.5 text-xs text-medium-gray"><Icon.Info size={13} /> Authoritative recommendation comparison. Highlights combine icon, text and emphasis — never color alone.</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-medium-gray">
              <th className="py-2 pr-3 font-medium">Option</th>
              <th className="py-2 pr-3 font-medium">Transport</th>
              <th className="py-2 pr-3 font-medium">CO₂e</th>
              <th className="py-2 pr-3 font-medium">Cost</th>
              <th className="py-2 pr-3 font-medium">Time</th>
              <th className="py-2 pr-3 font-medium">Access</th>
              <th className="py-2 pr-3 font-medium">Score</th>
              <th className="py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {options.map((o) => {
              const labels = labelsFor(o.id, superlatives);
              return (
                <tr key={o.id} className={`border-b border-border ${o.id === superlatives.best ? "bg-sage-100/50" : ""}`}>
                  <td className="py-3 pr-3">
                    <div className="font-semibold text-near-black">{o.label}</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {labels.map(([t, ic]) => {
                        const I = Icon[ic];
                        return <span key={t} className="inline-flex items-center gap-0.5 rounded-full bg-sage-100 px-1.5 py-0.5 text-[10px] font-medium text-forest-700"><I size={10} /> {t}</span>;
                      })}
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-charcoal">{o.transport}</td>
                  <td className="py-3 pr-3 font-mono">{o.carbonKg} kg</td>
                  <td className="py-3 pr-3 font-mono">{inr(o.cost)}</td>
                  <td className="py-3 pr-3 font-mono">{o.time}</td>
                  <td className="py-3 pr-3"><AccessDots n={o.access} /></td>
                  <td className="py-3 pr-3 font-mono font-semibold text-forest-700">{o.score ?? weightedScore(o, weights)}</td>
                  <td className="py-3">
                    <Button size="sm" variant={selectedId === o.id ? "secondary" : "primary"} onClick={() => onSelect(o.id)}>
                      {selectedId === o.id ? "Selected" : "Select"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Sheet>
  );
}

function ShowYourMathSheet({ option, onClose }: { option: TripOption; onClose: () => void }) {
  const total = option.segments.reduce((n, s) => n + s.co2, 0);
  const math = option.rawShowYourMath;
  return (
    <Sheet title="Show Your Math" onClose={onClose}>
      <p className="-mt-1 mb-4 text-sm text-slate-gray">
        Authoritative mathematical calculation for <span className="font-medium text-charcoal">{option.transport}</span>.
      </p>

      {math?.calculation && (
        <div className="mb-4 rounded-xl border border-border bg-warm-white p-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-forest-700">
            <span>Authoritative Scoring Formula</span>
            <span className="font-mono text-sm font-bold">{option.score}/100</span>
          </div>
          {math.calculation.formula && (
            <div className="mt-2 rounded-lg bg-card p-3 font-mono text-xs text-charcoal border border-border">
              {math.calculation.formula}
            </div>
          )}
          {math.contributions && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              <div className="rounded-lg bg-card p-2 text-center border border-border">
                <div className="text-[11px] text-medium-gray">Carbon Contrib.</div>
                <div className="font-mono font-semibold text-carbon">+{math.contributions.carbon}</div>
              </div>
              <div className="rounded-lg bg-card p-2 text-center border border-border">
                <div className="text-[11px] text-medium-gray">Access Contrib.</div>
                <div className="font-mono font-semibold text-access">+{math.contributions.accessibility}</div>
              </div>
              <div className="rounded-lg bg-card p-2 text-center border border-border">
                <div className="text-[11px] text-medium-gray">Cost Contrib.</div>
                <div className="font-mono font-semibold text-forest-700">+{math.contributions.cost}</div>
              </div>
              <div className="rounded-lg bg-card p-2 text-center border border-border">
                <div className="text-[11px] text-medium-gray">Time Contrib.</div>
                <div className="font-mono font-semibold text-charcoal">+{math.contributions.time}</div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {option.segments.map((s, i) => {
          const I = Icon[s.icon];
          return (
            <div key={s.mode}>
              <div className="rounded-xl border border-border bg-warm-white p-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-sage-100 text-forest-700"><I size={16} /></span>
                  <div className="font-medium text-near-black">Segment {i + 1} · {s.mode}</div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-card p-2"><div className="text-medium-gray">Distance</div><div className="mt-0.5 font-mono font-semibold text-charcoal">{s.distanceKm} km</div></div>
                  <div className="rounded-lg bg-card p-2"><div className="text-medium-gray">Factor</div><div className="mt-0.5 font-mono font-semibold text-charcoal">{s.factor}</div><div className="text-[10px] text-medium-gray">kg/km</div></div>
                  <div className="rounded-lg bg-carbon-soft p-2"><div className="text-carbon/70">Est. CO₂e</div><div className="mt-0.5 font-mono font-semibold text-carbon">{s.co2} kg</div></div>
                </div>
              </div>
              {i < option.segments.length - 1 && <div className="py-1 text-center text-lg text-medium-gray">+</div>}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border-2 border-carbon/30 bg-carbon-soft px-4 py-3">
        <span className="text-sm font-semibold text-carbon">Total trip CO₂e (estimated)</span>
        <span className="font-mono text-xl font-bold text-carbon">{Math.round(total)} kg</span>
      </div>
      <p className="mt-3 text-xs text-medium-gray">
        EcoTrail estimates emissions using travel activity data and mode-specific emission factors. Figures are estimated, not measured. Emission factors sourced from published environmental datasets.
      </p>
    </Sheet>
  );
}

function EvidenceSheet({ option, onClose }: { option: TripOption; onClose: () => void }) {
  return (
    <Sheet title="Accessibility evidence" onClose={onClose}>
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-border bg-warm-white p-4">
        <span className="font-mono text-2xl font-bold text-access">{option.access}/5</span>
        <div className="text-sm text-slate-gray">Accessibility score for <span className="font-medium text-charcoal">{option.transport}</span></div>
      </div>
      <ul className="space-y-3">
        {option.accessItems.map((a) => (
          <li key={a.label} className="rounded-xl border border-border p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-near-black">{a.label}</span>
              <EvidenceBadge status={a.status} />
            </div>
            <p className="mt-1.5 text-xs text-slate-gray">{evidenceExplain(a.status)}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-start gap-1.5 rounded-lg bg-soft-gray p-3 text-xs text-slate-gray">
        <Icon.Info size={14} className="mt-px shrink-0" /> Verified evidence comes from operators or on-site checks. AI-supported and OSM-supported details are helpful signals but are not equivalent to verified evidence.
      </p>
    </Sheet>
  );
}

function evidenceExplain(status: Evidence) {
  switch (status) {
    case "verified": return "Confirmed by the operator or an on-site check.";
    case "business": return "Declared by the business; not independently verified.";
    case "supported": return "Supported by OpenStreetMap community data.";
    case "ai": return "Inferred by AI from available descriptions — treat as a signal, not proof.";
    case "conflicting": return "Sources disagree. We recommend confirming before you travel.";
    default: return "No accessibility information is available for this item yet.";
  }
}

function BreakdownSheet({ option, kind, onClose }: { option: TripOption; kind: "cost" | "time"; onClose: () => void }) {
  const isCost = kind === "cost";
  const rows = isCost ? option.costBreakdown.map((r) => [r.label, inr(r.value)] as [string, string]) : option.timeBreakdown.map((r) => [r.label, r.value] as [string, string]);
  return (
    <Sheet title={isCost ? "Cost breakdown" : "Time breakdown"} onClose={onClose}>
      <p className="-mt-1 mb-4 text-sm text-slate-gray">
        {isCost ? "Estimated costs for two travelers." : "Total travel time, broken down by activity — useful for accessibility-sensitive planning."}
      </p>
      <ul className="divide-y divide-border rounded-xl border border-border">
        {rows.map(([k, v]) => (
          <li key={k} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-charcoal">{k}</span>
            <span className="font-mono font-medium text-near-black">{v}</span>
          </li>
        ))}
        <li className="flex items-center justify-between bg-warm-white px-4 py-3 text-sm font-semibold">
          <span className="text-near-black">Total {isCost ? "" : "travel time"}</span>
          <span className="font-mono text-forest-700">{isCost ? inr(option.cost) : option.time}</span>
        </li>
      </ul>
      {isCost && <p className="mt-3 flex items-center gap-1.5 text-xs text-estimated"><Icon.Info size={13} /> Estimated — actual prices vary by date and availability.</p>}
    </Sheet>
  );
}

/* ---- Itinerary generation transition ---- */
function ItineraryGeneration({
  option,
  reduced,
  onDone,
  onBuild,
  destination = "Goa",
}: {
  option: TripOption;
  reduced: boolean;
  onDone: () => void;
  onBuild: () => void;
  destination?: string;
}) {
  const steps = ["Planning travel timing", "Finding suitable activities", "Considering accessibility", "Optimizing route", "Preparing your itinerary"];
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step >= steps.length) { setDone(true); return; }
    const t = window.setTimeout(() => setStep((s) => s + 1), reduced ? 350 : 750);
    return () => window.clearTimeout(t);
  }, [step, reduced]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-near-black/50 backdrop-blur-sm p-6" role="dialog" aria-modal="true" aria-label="Building your itinerary">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 elev-modal" style={{ animation: reduced ? undefined : "sheet-rise 260ms cubic-bezier(.16,1,.3,1)" }}>
        {!done ? (
          <>
            <AiThinking label="Building your itinerary…" />
            <ul className="mt-5 space-y-3">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-sm">
                  <span className={`grid h-5 w-5 place-items-center rounded-full ${i < step ? "bg-forest-700 text-primary-foreground" : i === step ? "border-2 border-emerald-500" : "border-2 border-mist"}`}>
                    {i < step ? <Icon.Check size={12} /> : i === step ? <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" style={{ animation: "ai-pulse 1.2s infinite" }} /> : null}
                  </span>
                  <span className={i <= step ? "font-medium text-charcoal" : "text-medium-gray"}>{s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-medium-gray">Preparing your {option.transport} plan to {destination}.</p>
          </>
        ) : (
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success-soft text-success"><Icon.Check size={28} /></span>
            <h3 className="mt-4 text-lg font-semibold text-near-black">Your itinerary is ready to build.</h3>
            <p className="mt-1 text-sm text-slate-gray">We've assembled a day-by-day plan with accessibility details on every stop. You can review and adjust everything next.</p>
            <div className="mt-5 flex justify-center gap-2">
              <Button variant="tertiary" onClick={onDone}>Back to Planner</Button>
              <Button icon="Route" onClick={onBuild}>Build itinerary</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
