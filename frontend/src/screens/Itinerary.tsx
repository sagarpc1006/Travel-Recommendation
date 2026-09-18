import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/AppShell";
import Sheet from "../components/Sheet";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, CircularScore, AiThinking } from "../components/ui";
import { OfflineBanner } from "../components/states";
import { EVIDENCE_META } from "../data/tripOptions";
import {
  TRIPS,
  CATEGORY_META,
  type Trip,
  type ItineraryItem,
  type ItineraryDay,
} from "../data/trips";
import { getTripById, getRecentTrips } from "../services/tripAPI";
import { apiTripToTrip } from "../services/adapters";

type Go = (route: string) => void;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function useReducedMotion() {
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

/* Real connectivity state — itinerary stays available offline (cached), then syncs on reconnect. */
function useConnectivity() {
  const [banner, setBanner] = useState<"offline" | "syncing" | "synced" | null>(
    typeof navigator !== "undefined" && !navigator.onLine ? "offline" : null,
  );
  useEffect(() => {
    let t1: number, t2: number;
    const goOffline = () => setBanner("offline");
    const goOnline = () => {
      setBanner("syncing");
      t1 = window.setTimeout(() => setBanner("synced"), 1200);
      t2 = window.setTimeout(() => setBanner(null), 3200);
    };
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);
  return { banner, dismiss: () => setBanner(null) };
}

export default function Itinerary({ tripId, go }: { tripId: string | null; go: Go }) {
  const fallbackTrip = TRIPS.find((t) => String(t.id) === String(tripId)) ?? TRIPS[0];
  const [trip, setTrip] = useState<Trip>(fallbackTrip);
  const reduced = useReducedMotion();
  const { banner, dismiss } = useConnectivity();

  const [days, setDays] = useState<ItineraryDay[]>(fallbackTrip.days);
  const [dayIdx, setDayIdx] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [toast, setToast] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadItinerary() {
      try {
        if (tripId) {
          const res = await getTripById(tripId);
          if (active && res?.success && res?.trip) {
            const adapted = apiTripToTrip(res.trip);
            setTrip(adapted);
            setDays(adapted.days);
            return;
          }
        }
        const recent = await getRecentTrips();
        if (active && Array.isArray(recent) && recent.length > 0) {
          const matched = tripId
            ? recent.find((r: any) => String(r.id) === String(tripId))
            : recent[0];
          if (matched) {
            const adapted = matched.days ? (matched as Trip) : apiTripToTrip(matched);
            setTrip(adapted);
            setDays(adapted.days);
          }
        }
      } catch (err) {
        console.warn("Could not load trip itinerary from backend, using fallback:", err);
      }
    }
    loadItinerary();
    return () => {
      active = false;
    };
  }, [tripId]);

  // Guard navigation when the itinerary has unsaved edits (§16).
  const guardedGo = (r: string) => (dirty ? setPendingRoute(r) : go(r));

  // sheets
  const [accessItem, setAccessItem] = useState<ItineraryItem | null>(null);
  const [detailItem, setDetailItem] = useState<ItineraryItem | null>(null);
  const [mapMobile, setMapMobile] = useState(false);

  const day = days[dayIdx] || days[0] || fallbackTrip.days[0];
  const dayCarbon = useMemo(() => (day ? day.items.reduce((n, i) => n + (i.carbonKg ?? 0), 0) : 0), [day]);
  const dayCost = useMemo(() => (day ? day.items.reduce((n, i) => n + (i.cost ?? 0), 0) : 0), [day]);

  function flash(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }
  function save() {
    setSaveState("saving");
    window.setTimeout(() => { setSaveState("saved"); setDirty(false); flash("Schedule updated for current session."); }, 600);
  }

  function mutateDay(fn: (items: ItineraryItem[]) => ItineraryItem[]) {
    setDays((ds) => ds.map((d, i) => (i === dayIdx ? { ...d, items: fn(d.items) } : d)));
    setDirty(true);
    setSaveState("idle");
  }
  const removeItem = (id: string) => mutateDay((items) => items.filter((i) => i.id !== id));
  const moveItem = (id: string, dir: -1 | 1) =>
    mutateDay((items) => {
      const idx = items.findIndex((i) => i.id === id);
      const j = idx + dir;
      if (idx < 0 || j < 0 || j >= items.length) return items;
      const copy = [...items];
      [copy[idx], copy[j]] = [copy[j], copy[idx]];
      return copy;
    });
  const addFreeTime = () =>
    mutateDay((items) => [
      ...items,
      { id: `add-${Date.now()}`, time: "—", title: "Free time", category: "Free Time", location: "At leisure", duration: "—", coords: { x: 50, y: 50 } },
    ]);

  return (
    <AppShell active="mytrips" go={guardedGo}>
      {banner && <OfflineBanner state={banner} onDismiss={banner === "offline" ? undefined : dismiss} />}
      {/* Trip header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <button onClick={() => guardedGo("mytrips")} className="inline-flex items-center gap-1 text-sm text-medium-gray hover:text-charcoal">
            <Icon.Chevron size={15} className="rotate-180" /> My Trips
          </button>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-near-black">
                  {trip.origin} <span className="text-emerald-500">→</span> {trip.destination}
                </h1>
                {trip.ecoTwin && <Badge icon="Leaf" label="Eco-Twin trip" tone={TONE.verified} />}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-gray">
                <span className="flex items-center gap-1"><Icon.Calendar size={14} /> {trip.dates}</span>
                <span className="flex items-center gap-1"><Icon.Profile size={14} /> {trip.travelers} travelers</span>
                <span className="flex items-center gap-1"><Icon.Carbon size={14} /> {trip.carbonKg} kg est. CO₂e</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-forest-700 px-2.5 py-1.5 text-primary-foreground">
                <Icon.Leaf size={14} /> <span className="font-mono text-sm font-semibold">{trip.score}</span><span className="text-[10px] opacity-70">/100</span>
              </span>
              <Button variant={editMode ? "secondary" : "ghost"} icon="Sliders" onClick={() => setEditMode((v) => !v)}>{editMode ? "Done editing" : "Edit"}</Button>
              <Button variant="secondary" icon={saveState === "saved" ? "Check" : "Plus"} loading={saveState === "saving"} onClick={save}>
                {saveState === "saved" ? "Saved" : "Save Trip"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Day navigation */}
      <div className="sticky top-[57px] z-30 border-b border-border bg-warm-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-6 py-2.5">
          {days.map((d, i) => (
            <button
              key={d.day}
              onClick={() => { setDayIdx(i); setSelectedItem(null); }}
              className={`shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${i === dayIdx ? "bg-forest-700 text-primary-foreground" : "text-slate-gray hover:bg-soft-gray"}`}
            >
              Day {d.day} · {d.label}
              <span className={`ml-1.5 text-[11px] ${i === dayIdx ? "text-sage-200" : "text-medium-gray"}`}>{d.date}</span>
            </button>
          ))}
          <Button size="sm" variant="tertiary" icon="Map" className="ml-auto shrink-0 lg:hidden" onClick={() => setMapMobile(true)}>Map</Button>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[1fr_380px]">
        {/* Timeline */}
        <div>
          <AiRegenerate dayLabel={`Day ${day.day}`} reduced={reduced} onApply={() => { addFreeTime(); flash("AI suggestion applied to Day " + day.day + "."); }} />

          <ol className="relative mt-6 space-y-3 border-l-2 border-border pl-6">
            {day.items.map((item, i) => (
              <TimelineRow
                key={item.id}
                item={item}
                selected={selectedItem === item.id}
                editMode={editMode}
                first={i === 0}
                last={i === day.items.length - 1}
                onSelect={() => setSelectedItem(item.id)}
                onAccess={() => setAccessItem(item)}
                onDetail={() => setDetailItem(item)}
                onRemove={() => removeItem(item.id)}
                onMove={(d) => moveItem(item.id, d)}
              />
            ))}
          </ol>

          {editMode && (
            <Button variant="tertiary" icon="Plus" className="mt-4" onClick={addFreeTime}>Add activity</Button>
          )}
        </div>

        {/* Right: map + summary */}
        <aside className="space-y-5">
          <div className="hidden lg:block">
            <ItineraryMap day={day} selected={selectedItem} onSelect={setSelectedItem} />
          </div>
          <TripSummary trip={trip} dayCarbon={dayCarbon} dayCost={dayCost} onInsights={() => go("insights")} />
        </aside>
      </main>

      {/* Sticky CTA */}
      <div className="sticky bottom-16 z-30 lg:bottom-0">
        <div className="mx-auto max-w-6xl px-6 pb-4">
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-3 elev-card">
            <Icon.Check size={18} className="text-emerald-500" />
            <span className="mr-auto text-sm text-charcoal">Your trip is ready. Details still need confirmation where marked.</span>
            <Button variant="tertiary" onClick={() => go("trip-detail")}>Trip details</Button>
            <Button icon="Calendar" onClick={() => { save(); go("mytrips"); }}>Save & view trips</Button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 lg:bottom-8" role="status">
          <div className="flex items-center gap-2 rounded-full bg-near-black px-4 py-2.5 text-sm font-medium text-warm-white elev-modal">
            <Icon.Check size={16} className="text-emerald-400" /> {toast}
          </div>
        </div>
      )}

      {/* Sheets */}
      {accessItem && <AccessDetailSheet item={accessItem} onClose={() => setAccessItem(null)} />}
      {detailItem && <ActivityDetailSheet item={detailItem} onClose={() => setDetailItem(null)} onAccess={() => { setAccessItem(detailItem); setDetailItem(null); }} />}
      {mapMobile && (
        <Sheet title={`Day ${day.day} map`} onClose={() => setMapMobile(false)}>
          <ItineraryMap day={day} selected={selectedItem} onSelect={setSelectedItem} />
        </Sheet>
      )}
      {pendingRoute && (
        <Sheet
          title="Discard changes?"
          onClose={() => setPendingRoute(null)}
          footer={
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="tertiary" onClick={() => setPendingRoute(null)}>Keep editing</Button>
              <Button
                variant="secondary"
                icon="Check"
                onClick={() => { save(); const r = pendingRoute; setPendingRoute(null); go(r); }}
              >
                Save &amp; leave
              </Button>
              <Button
                onClick={() => { const r = pendingRoute; setDirty(false); setPendingRoute(null); go(r); }}
              >
                Discard changes
              </Button>
            </div>
          }
        >
          <p className="text-sm text-slate-gray">
            You have unsaved edits to this itinerary. If you leave now, your changes to the day-by-day plan won't be kept.
          </p>
        </Sheet>
      )}
    </AppShell>
  );
}

/* ---- AI regeneration bar ---- */
function AiRegenerate({ dayLabel, reduced, onApply }: { dayLabel: string; reduced: boolean; onApply: () => void }) {
  const [phase, setPhase] = useState<"idle" | "thinking" | "suggestion">("idle");
  const [q, setQ] = useState("");
  function run(text: string) {
    setQ(text);
    setPhase("thinking");
    window.setTimeout(() => setPhase("suggestion"), reduced ? 350 : 1100);
  }
  return (
    <div className="rounded-xl border border-ai-border bg-ai-soft/50 p-4">
      <div className="flex items-center gap-2">
        <Icon.AI size={16} className="text-ai" />
        <span className="text-sm font-semibold text-near-black">Adjust {dayLabel} with AI</span>
      </div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label={`Ask AI to adjust ${dayLabel}`}
          placeholder="e.g. Make this day less tiring"
          className="h-10 flex-1 rounded-lg border border-mist bg-card px-3 text-sm text-near-black placeholder:text-medium-gray focus:border-ai focus:outline-none focus:ring-2 focus:ring-ai/30"
        />
        <Button icon="AI" onClick={() => run(q || "Make this day less tiring")}>Ask AI</Button>
      </div>
      {phase === "idle" && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Make this day less tiring", "More step-free options", "Add a rest break"].map((s) => (
            <button key={s} onClick={() => run(s)} className="rounded-full border border-ai-border bg-card px-2.5 py-1 text-xs text-ai hover:bg-ai-soft">{s}</button>
          ))}
        </div>
      )}
      {phase === "thinking" && <div className="mt-3"><AiThinking label="Understanding your request…" /></div>}
      {phase === "suggestion" && (
        <div className="mt-3 rounded-lg border border-ai-border bg-card p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-ai"><Icon.AI size={13} /> AI suggestion</div>
          <p className="mt-1.5 text-sm text-charcoal">
            To ease the pace, I'd add a rest break in the afternoon and keep transfers step-free. Timings, prices and accessibility are unchanged — those come from verified data, not AI.
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" icon="Check" onClick={() => { onApply(); setPhase("idle"); setQ(""); }}>Apply</Button>
            <Button size="sm" variant="tertiary" onClick={() => setPhase("idle")}>Edit</Button>
            <Button size="sm" variant="ghost" onClick={() => { setPhase("idle"); setQ(""); }}>Dismiss</Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Timeline row ---- */
function TimelineRow({
  item, selected, editMode, first, last, onSelect, onAccess, onDetail, onRemove, onMove,
}: {
  item: ItineraryItem; selected: boolean; editMode: boolean; first: boolean; last: boolean;
  onSelect: () => void; onAccess: () => void; onDetail: () => void; onRemove: () => void; onMove: (d: -1 | 1) => void;
}) {
  const cat = CATEGORY_META[item.category];
  const CatIcon = Icon[cat.icon];
  const ev = item.access ? EVIDENCE_META[item.access.status] : null;
  return (
    <li className="relative">
      <span className="absolute -left-[31px] top-3 grid h-6 w-6 place-items-center rounded-full border-2 border-card bg-sage-100 text-forest-700">
        <CatIcon size={13} />
      </span>
      <div
        onClick={onSelect}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(); } }}
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={`${item.time} — ${item.title}. Select to show on map.`}
        className={`cursor-pointer rounded-xl border bg-card p-3.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${selected ? "border-forest-700 elev-card" : "border-border hover:border-emerald-400"}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-near-black">{item.time}</span>
              <span className="rounded-md bg-soft-gray px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-gray">{item.category}</span>
            </div>
            <h3 className="mt-1 font-semibold text-near-black">{item.title}</h3>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-medium-gray">
              <span className="flex items-center gap-1"><Icon.Location size={12} /> {item.location}</span>
              {item.duration !== "—" && <span className="flex items-center gap-1"><Icon.Clock size={12} /> {item.duration}</span>}
              {item.cost != null && <span className="flex items-center gap-1"><Icon.Money size={12} /> {inr(item.cost)}</span>}
              {item.carbonKg != null && item.carbonKg > 0 && <span className="flex items-center gap-1 text-carbon"><Icon.Carbon size={12} /> {item.carbonKg} kg</span>}
            </div>
          </div>
          {editMode && (
            <div className="flex shrink-0 items-center gap-0.5">
              <button onClick={(e) => { e.stopPropagation(); onMove(-1); }} disabled={first} className="grid h-7 w-7 place-items-center rounded text-medium-gray hover:bg-soft-gray disabled:opacity-30" aria-label="Move up"><Icon.Chevron size={14} className="-rotate-90" /></button>
              <button onClick={(e) => { e.stopPropagation(); onMove(1); }} disabled={last} className="grid h-7 w-7 place-items-center rounded text-medium-gray hover:bg-soft-gray disabled:opacity-30" aria-label="Move down"><Icon.Chevron size={14} className="rotate-90" /></button>
              <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="grid h-7 w-7 place-items-center rounded text-error hover:bg-error/10" aria-label="Remove"><Icon.Close size={15} /></button>
            </div>
          )}
        </div>

        {item.access && ev && (
          <button
            onClick={(e) => { e.stopPropagation(); onAccess(); }}
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-opacity hover:opacity-80"
            style={{ color: TONE[ev.tone].fg, background: TONE[ev.tone].bg, borderColor: TONE[ev.tone].bd }}
          >
            <Icon.Accessibility size={13} /> {item.access.label} — {ev.label}
            <Icon.Chevron size={12} />
          </button>
        )}
      </div>
    </li>
  );
}

/* ---- Itinerary map ---- */
function ItineraryMap({ day, selected, onSelect }: { day: ItineraryDay; selected: string | null; onSelect: (id: string) => void }) {
  const pts = day.items.filter((i) => i.category !== "Free Time");
  return (
    <div className="rounded-xl border border-border bg-card p-3 elev-card">
      <div className="flex items-center justify-between px-1 pb-2">
        <h3 className="text-sm font-semibold text-near-black">Day {day.day} route</h3>
        <Badge icon="Map" label="OpenStreetMap" tone={TONE.access} />
      </div>
      <div className="relative h-64 overflow-hidden rounded-lg border border-border bg-sage-100" role="group" aria-label={`Map of Day ${day.day}. Locations are listed in the timeline.`}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="imap-grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#00000008" /></pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#imap-grid)" />
          <polyline
            points={pts.map((p) => `${p.coords.x}%,${p.coords.y}%`).join(" ")}
            fill="none" stroke="var(--color-emerald-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 7"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {pts.map((p, i) => {
          const on = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%`, zIndex: on ? 20 : 10 }}
              aria-label={p.title}
            >
              <span className={`grid place-items-center rounded-full text-white ring-2 ring-white transition-all ${on ? "h-8 w-8 bg-forest-700" : "h-6 w-6 bg-emerald-500"}`}>
                <span className="font-mono text-[11px] font-semibold">{i + 1}</span>
              </span>
              {on && <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-card px-1.5 py-0.5 text-[11px] font-semibold text-near-black shadow">{p.title}</span>}
            </button>
          );
        })}
      </div>
      <p className="px-1 pt-2 text-[11px] text-medium-gray">Route shown for orientation. We don't imply turn-by-turn routing.</p>
    </div>
  );
}

/* ---- Trip summary ---- */
function TripSummary({ trip, dayCarbon, dayCost, onInsights }: { trip: Trip; dayCarbon: number; dayCost: number; onInsights: () => void }) {
  const cut = Math.round(((trip.standardCarbonKg - trip.carbonKg) / trip.standardCarbonKg) * 100);
  return (
    <div className="rounded-xl border border-border bg-card p-4 elev-card">
      <div className="flex items-center gap-3">
        <CircularScore value={trip.score} size={64} color="var(--color-forest-700)" />
        <div>
          <h3 className="text-sm font-semibold text-near-black">Trip summary</h3>
          <p className="text-xs text-slate-gray">Green &amp; Accessible Score</p>
        </div>
      </div>
      <dl className="mt-4 space-y-2.5 text-sm">
        <Row k="This day · est. CO₂e" v={`${Math.round(dayCarbon)} kg`} />
        <Row k="This day · est. cost" v={inr(dayCost)} />
        <Row k="Trip total · est. CO₂e" v={`${trip.carbonKg} kg`} />
      </dl>
      <div className="mt-3 rounded-lg bg-success-soft/60 p-3 text-xs text-success">
        <div className="flex items-center gap-1.5 font-semibold"><Icon.Leaf size={13} /> ~{cut}% less carbon than a standard trip</div>
        <p className="mt-1 text-success/80">Estimated from your itinerary vs a flight-based equivalent.</p>
      </div>
      <Button variant="tertiary" className="mt-3 w-full" icon="Leaf" onClick={onInsights}>View eco insights</Button>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-medium-gray">{k}</dt>
      <dd className="font-mono font-medium text-charcoal">{v}</dd>
    </div>
  );
}

/* ---- Sheets ---- */
function AccessDetailSheet({ item, onClose }: { item: ItineraryItem; onClose: () => void }) {
  const a = item.access!;
  const ev = EVIDENCE_META[a.status];
  const rows: [string, string][] = [
    ["Requirement", a.label],
    ["Status", ev.label],
    ["Evidence", ev.explain],
    ["Source", item.source ?? "Community & declared data"],
    ["Last checked", a.status === "verified" ? "12 days ago" : "Not confirmed"],
  ];
  return (
    <Sheet title="Accessibility detail" onClose={onClose}>
      <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-warm-white p-4">
        <div>
          <div className="text-xs text-medium-gray">{item.title}</div>
          <div className="font-semibold text-near-black">{a.label}</div>
        </div>
        <Badge icon={ev.icon} label={ev.label} tone={TONE[ev.tone]} />
      </div>
      <dl className="divide-y divide-border rounded-xl border border-border">
        {rows.map(([k, v]) => (
          <div key={k} className="px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-medium-gray">{k}</dt>
            <dd className="mt-0.5 text-sm text-charcoal">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex items-start gap-1.5 rounded-lg bg-soft-gray p-3 text-xs text-slate-gray">
        <Icon.Info size={14} className="mt-px shrink-0" /> AI-supported and map-supported details are helpful signals, not verified evidence. We recommend confirming sensitive requirements before you travel.
      </p>
    </Sheet>
  );
}

function ActivityDetailSheet({ item, onClose, onAccess }: { item: ItineraryItem; onClose: () => void; onAccess: () => void }) {
  const cat = CATEGORY_META[item.category];
  const CatIcon = Icon[cat.icon];
  return (
    <Sheet title={item.title} onClose={onClose}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-sage-100 text-forest-700"><CatIcon size={22} /></span>
        <div>
          <div className="text-sm font-semibold text-near-black">{item.category}</div>
          <div className="text-xs text-medium-gray">{item.time} · {item.location}</div>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3">
        <Stat icon="Clock" k="Duration" v={item.duration} />
        {item.cost != null && <Stat icon="Money" k="Est. cost" v={inr(item.cost)} />}
        {item.carbonKg != null && <Stat icon="Carbon" k="Est. CO₂e" v={`${item.carbonKg} kg`} />}
        {item.source && <Stat icon="Verified" k="Source" v={item.source} />}
      </dl>
      {item.access && (
        <Button variant="tertiary" className="mt-4 w-full" icon="Accessibility" onClick={onAccess}>View accessibility detail</Button>
      )}
    </Sheet>
  );
}

function Stat({ icon, k, v }: { icon: IconName; k: string; v: string }) {
  const I = Icon[icon];
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-center gap-1 text-[11px] text-medium-gray"><I size={12} /> {k}</div>
      <div className="mt-0.5 text-sm font-medium text-charcoal">{v}</div>
    </div>
  );
}
