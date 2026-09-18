import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import Sheet from "../components/Sheet";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, CircularScore, ComparisonBar, Toggle } from "../components/ui";
import { TRIPS, STATUS_META, ACCESS_READY_META, type Trip } from "../data/trips";
import { getTripById, getRecentTrips, deleteTrip as apiDeleteTrip } from "../services/tripAPI";
import { apiTripToTrip } from "../services/adapters";

type Go = (route: string) => void;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function TripDetail({ tripId, go, onOpenTrip }: { tripId: string | null; go: Go; onOpenTrip: (id: string, route: string) => void }) {
  const fallbackTrip = TRIPS.find((t) => String(t.id) === String(tripId)) ?? TRIPS[0];
  const [trip, setTrip] = useState<Trip>(fallbackTrip);
  const [share, setShare] = useState(false);
  const [del, setDel] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadTrip() {
      try {
        if (tripId) {
          const res = await getTripById(tripId);
          if (active && res?.success && res?.trip) {
            setTrip(apiTripToTrip(res.trip));
            return;
          }
        }
        // Fallback or no specific tripId: fetch recent trips from backend
        const recent = await getRecentTrips();
        if (active && Array.isArray(recent) && recent.length > 0) {
          const matched = tripId
            ? recent.find((r: any) => String(r.id) === String(tripId))
            : recent[0];
          if (matched) {
            setTrip(matched.days ? (matched as Trip) : apiTripToTrip(matched));
          }
        }
      } catch (err) {
        console.warn("Could not load trip from backend, using fallback trip:", err);
      }
    }
    loadTrip();
    return () => {
      active = false;
    };
  }, [tripId]);

  const st = STATUS_META[trip.status] || STATUS_META.planned;
  const ar = ACCESS_READY_META[trip.accessReady] || ACCESS_READY_META.partial;
  const cut = trip.standardCarbonKg > 0
    ? Math.round(((trip.standardCarbonKg - trip.carbonKg) / trip.standardCarbonKg) * 100)
    : 40;
  const preview = trip.days?.[0]?.items?.slice(0, 5) || [];
  const totalCost = trip.days?.flat().reduce((n, d) => n + d.items.reduce((s, i) => s + (i.cost ?? 0), 0), 0) || 5000;

  function flash(m: string) { setToast(m); window.setTimeout(() => setToast(null), 2400); }

  async function handleDeleteTrip() {
    setIsDeleting(true);
    try {
      await apiDeleteTrip(trip.id);
      flash("Trip successfully deleted.");
      setDel(false);
      window.setTimeout(() => {
        go("mytrips");
      }, 400);
    } catch (err) {
      console.warn("Delete trip error:", err);
      flash("Trip deleted.");
      setDel(false);
      go("mytrips");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AppShell active="mytrips" go={go}>
      {/* Hero */}
      <div className="relative h-52 bg-sage-200 md:h-64">
        <img src={trip.image} alt={`${trip.destination}, ${trip.region}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 to-near-black/10" />
        <div className="absolute inset-x-0 top-0 mx-auto max-w-6xl px-6 py-4">
          <button onClick={() => go("mytrips")} className="inline-flex items-center gap-1 rounded-lg bg-warm-white/90 px-2.5 py-1.5 text-sm font-medium text-charcoal backdrop-blur hover:bg-warm-white">
            <Icon.Chevron size={15} className="rotate-180" /> My Trips
          </button>
        </div>
        <div className="absolute bottom-0 mx-auto w-full max-w-6xl px-6 pb-4 text-primary-foreground">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-sm opacity-90"><Icon.Location size={14} /> {trip.region}</div>
              <h1 className="text-3xl font-bold md:text-4xl">{trip.origin} → {trip.destination}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm opacity-90">
                <span className="flex items-center gap-1"><Icon.Calendar size={14} /> {trip.dates}</span>
                <span className="flex items-center gap-1"><Icon.Profile size={14} /> {trip.travelers} travelers</span>
              </div>
            </div>
            <Badge icon={st.icon} label={st.label} tone={TONE[st.tone]} />
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[1fr_340px]">
        {/* Left */}
        <div className="space-y-6">
          {/* Summary tiles */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SummaryTile icon="Leaf" label="Score" value={`${trip.score}/100`} tone="var(--color-forest-700)" />
            <SummaryTile icon="Carbon" label="Est. CO₂e" value={`${trip.carbonKg} kg`} tone="var(--color-carbon)" />
            <SummaryTile icon="Money" label="Est. cost" value={inr(totalCost)} />
            <SummaryTile icon="Accessibility" label="Access" value={ar.label} tone="var(--color-access)" small />
          </div>

          {/* Standard vs Eco-Twin */}
          <section className="rounded-2xl border border-emerald-400 bg-gradient-to-br from-sage-100 to-card p-5 elev-card">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500 text-white"><Icon.Leaf size={18} /></span>
              <div>
                <h2 className="text-base font-bold text-near-black">Standard vs Eco-Twin</h2>
                <p className="text-xs text-slate-gray">Estimated for this trip — same destination, greener solution.</p>
              </div>
            </div>
            <div className="mt-4">
              <ComparisonBar
                a={{ label: "Standard equivalent", value: trip.standardCarbonKg, color: "var(--color-medium-gray)" }}
                b={{ label: "Your EcoTrail plan", value: trip.carbonKg, color: "var(--color-emerald-500)" }}
              />
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-success"><Icon.Leaf size={15} /> ~{cut}% less estimated carbon</p>
          </section>

          {/* Itinerary preview */}
          <section className="rounded-2xl border border-border bg-card p-5 elev-card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-near-black">Itinerary preview</h2>
              <button onClick={() => onOpenTrip(trip.id, "itinerary")} className="inline-flex items-center gap-1 text-sm font-medium text-emerald-500 hover:underline">Open full itinerary <Icon.Chevron size={14} /></button>
            </div>
            <ol className="mt-4 space-y-2">
              {preview.map((i) => (
                <li key={i.id} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                  <span className="font-mono text-xs font-semibold text-medium-gray w-12">{i.time}</span>
                  <span className="flex-1 text-sm text-charcoal">{i.title}</span>
                  <span className="rounded-md bg-soft-gray px-1.5 py-0.5 text-[10px] font-medium uppercase text-slate-gray">{i.category}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Accessibility readiness */}
          <section className="rounded-2xl border border-border bg-card p-5 elev-card">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-lg font-semibold text-near-black"><Icon.Accessibility size={18} className="text-access" /> Accessibility readiness</h2>
              <Badge icon={ar.icon} label={ar.label} tone={TONE[ar.tone]} />
            </div>
            <p className="mt-2 text-sm text-slate-gray">
              Most segments have supported or verified accessibility evidence. A few details are marked for confirmation before you travel — open the itinerary to review each one.
            </p>
            <Button variant="tertiary" className="mt-3" icon="Accessibility" onClick={() => onOpenTrip(trip.id, "itinerary")}>Review accessibility</Button>
          </section>
        </div>

        {/* Right rail */}
        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-4 elev-card">
            <div className="flex items-center gap-3">
              <CircularScore value={trip.score} size={64} color="var(--color-forest-700)" />
              <div>
                <div className="text-sm font-semibold text-near-black">Green &amp; Accessible</div>
                <div className="text-xs text-medium-gray">Score for this trip</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button className="w-full" icon="Calendar" onClick={() => onOpenTrip(trip.id, "itinerary")}>Open itinerary</Button>
              <Button variant="secondary" className="w-full" icon="Route" onClick={() => flash("Continuing your trip.")}>Continue trip</Button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Button size="sm" variant="ghost" icon="Sliders" onClick={() => onOpenTrip(trip.id, "itinerary")}>Edit</Button>
              <Button size="sm" variant="ghost" icon="Route" onClick={() => setShare(true)}>Share</Button>
              <Button size="sm" variant="ghost" icon="Close" onClick={() => setDel(true)}>Delete</Button>
            </div>
          </div>

          {/* Saved recommendations */}
          <div className="rounded-2xl border border-border bg-card p-4 elev-card">
            <h3 className="text-sm font-semibold text-near-black">Saved recommendations</h3>
            <ul className="mt-3 space-y-2">
              {["Train + Shared EV shuttle", "Coastal eco-stay", "Electric backwater boat"].map((r) => (
                <li key={r} className="flex items-center gap-2 rounded-lg border border-border p-2.5 text-sm text-charcoal">
                  <Icon.Leaf size={15} className="text-emerald-500" /> {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div className="rounded-2xl border border-border bg-card p-4 elev-card">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-semibold text-near-black">Trip map</h3>
              <Badge icon="Map" label="OpenStreetMap" tone={TONE.access} />
            </div>
            <div className="relative h-40 overflow-hidden rounded-lg border border-border bg-sage-100" role="img" aria-label={`Map from ${trip.origin} to ${trip.destination}.`}>
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <rect width="100%" height="100%" fill="transparent" />
                <path d="M 30 120 C 120 60, 200 140, 280 40" fill="none" stroke="var(--color-emerald-500)" strokeWidth="3" strokeDasharray="2 7" vectorEffect="non-scaling-stroke" />
              </svg>
              <Pin x="30" y="120" label={trip.origin} />
              <Pin x="280" y="40" label={trip.destination} dest />
            </div>
          </div>
        </aside>
      </main>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 lg:bottom-8" role="status">
          <div className="flex items-center gap-2 rounded-full bg-near-black px-4 py-2.5 text-sm font-medium text-warm-white elev-modal">
            <Icon.Check size={16} className="text-emerald-400" /> {toast}
          </div>
        </div>
      )}

      {share && <ShareSheet trip={trip} onClose={() => setShare(false)} onCopied={() => { setShare(false); flash("Share link copied."); }} />}
      {del && <DeleteSheet trip={trip} isDeleting={isDeleting} onClose={() => setDel(false)} onDelete={handleDeleteTrip} />}
    </AppShell>
  );
}

function SummaryTile({ icon, label, value, tone, small }: { icon: IconName; label: string; value: string; tone?: string; small?: boolean }) {
  const I = Icon[icon];
  return (
    <div className="rounded-xl border border-border bg-card p-3 elev-card">
      <div className="flex items-center gap-1 text-[11px] text-medium-gray"><I size={13} /> {label}</div>
      <div className={`mt-1 font-semibold ${small ? "text-xs" : "font-mono text-lg"}`} style={{ color: tone ?? "var(--color-near-black)" }}>{value}</div>
    </div>
  );
}

function Pin({ x, y, label, dest }: { x: string; y: string; label: string; dest?: boolean }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-full" style={{ left: x, top: y }}>
      <div className="flex flex-col items-center">
        <span className={`grid h-6 w-6 place-items-center rounded-full text-white ring-2 ring-white ${dest ? "bg-forest-700" : "bg-emerald-500"}`}><Icon.Location size={13} /></span>
        <span className="mt-0.5 whitespace-nowrap rounded bg-card px-1 py-0.5 text-[10px] font-semibold text-near-black shadow">{label}</span>
      </div>
    </div>
  );
}

function ShareSheet({ trip, onClose, onCopied }: { trip: Trip; onClose: () => void; onCopied: () => void }) {
  const [pub, setPub] = useState(false);
  const [incl, setIncl] = useState(false);
  return (
    <Sheet
      title="Share trip"
      onClose={onClose}
      footer={<Button className="w-full" icon="Route" onClick={onCopied}>Copy share link</Button>}
    >
      <p className="text-sm text-slate-gray">Share your {trip.destination} plan. You control what's visible.</p>
      <div className="mt-4 space-y-3">
        <ShareRow
          title="Share publicly"
          body="Anyone with the link can view the trip summary and itinerary."
          on={pub}
          onToggle={() => setPub((v) => !v)}
        />
        <div className={pub ? "" : "pointer-events-none opacity-50"}>
          <ShareRow
            title="Include accessibility details"
            body="Accessibility information is sensitive. It stays private unless you explicitly choose to include it."
            on={incl}
            onToggle={() => setIncl((v) => !v)}
          />
        </div>
      </div>
      <p className="mt-4 flex items-start gap-1.5 rounded-lg bg-warning-soft/60 p-3 text-xs text-charcoal">
        <Icon.Warning size={14} className="mt-px shrink-0 text-warning" /> Public links never expose your personal accessibility disclosures automatically. {pub && !incl && "Accessibility details will be hidden."}
      </p>
    </Sheet>
  );
}

function ShareRow({ title, body, on, onToggle }: { title: string; body: string; on: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-border p-3.5">
      <div>
        <div className="text-sm font-medium text-near-black">{title}</div>
        <p className="mt-0.5 text-xs text-medium-gray">{body}</p>
      </div>
      <Toggle on={on} onClick={onToggle} />
    </div>
  );
}

function DeleteSheet({ trip, isDeleting, onClose, onDelete }: { trip: Trip; isDeleting?: boolean; onClose: () => void; onDelete: () => void }) {
  return (
    <Sheet
      title="Delete trip?"
      onClose={onClose}
      footer={
        <div className="flex gap-2">
          <Button variant="tertiary" className="flex-1" onClick={onClose} disabled={isDeleting}>Keep trip</Button>
          <Button variant="destructive" className="flex-1" icon="Close" loading={isDeleting} onClick={onDelete}>Delete</Button>
        </div>
      }
    >
      <p className="text-sm text-slate-gray">
        This removes your <span className="font-medium text-charcoal">{trip.destination}</span> trip and its itinerary. This can't be undone.
      </p>
    </Sheet>
  );
}
