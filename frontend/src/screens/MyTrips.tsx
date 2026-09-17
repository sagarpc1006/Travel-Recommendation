import { useState } from "react";
import AppShell from "../components/AppShell";
import { Icon } from "../components/icons";
import { Button, Badge, TONE } from "../components/ui";
import { EmptyState } from "../components/states";
import { TRIPS, STATUS_META, ACCESS_READY_META, type Trip, type TripStatus } from "../data/trips";

type Go = (route: string) => void;

const TABS: { key: string; label: string; match: (t: Trip) => boolean }[] = [
  { key: "all", label: "All", match: () => true },
  { key: "upcoming", label: "Upcoming", match: (t) => t.status === "upcoming" || t.status === "planned" },
  { key: "ongoing", label: "Ongoing", match: (t) => t.status === "ongoing" },
  { key: "completed", label: "Completed", match: (t) => t.status === "completed" },
  { key: "saved", label: "Saved", match: (t) => t.status === "saved" },
];

export default function MyTrips({ go, onOpenTrip }: { go: Go; onOpenTrip: (id: string, route: string) => void }) {
  const [tab, setTab] = useState("all");
  const active = TABS.find((t) => t.key === tab)!;
  const trips = TRIPS.filter(active.match);

  return (
    <AppShell active="mytrips" go={go}>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-near-black md:text-4xl">My Trips</h1>
            <p className="mt-2 text-slate-gray">Plan, follow and revisit your greener journeys.</p>
          </div>
          <Button icon="Route" onClick={() => go("planner")}>Plan a Trip</Button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
          {TABS.map((t) => {
            const count = TRIPS.filter(t.match).length;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative shrink-0 px-3.5 py-2.5 text-sm font-medium transition-colors ${tab === t.key ? "text-forest-700" : "text-medium-gray hover:text-charcoal"}`}
              >
                {t.label} <span className="text-xs text-medium-gray">{count}</span>
                {tab === t.key && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-forest-700" />}
              </button>
            );
          })}
        </div>

        {trips.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              icon="Calendar"
              title={`No ${active.label.toLowerCase()} trips`}
              body="Your next journey will appear here once you start planning."
              action="Plan a Trip"
              onAction={() => go("planner")}
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((t) => (
              <TripCard key={t.id} t={t} onOpen={() => onOpenTrip(t.id, "trip-detail")} onItinerary={() => onOpenTrip(t.id, "itinerary")} />
            ))}
          </div>
        )}
      </main>
    </AppShell>
  );
}

function TripCard({ t, onOpen, onItinerary }: { t: Trip; onOpen: () => void; onItinerary: () => void }) {
  const st = STATUS_META[t.status];
  const ar = ACCESS_READY_META[t.accessReady];
  const cut = Math.round(((t.standardCarbonKg - t.carbonKg) / t.standardCarbonKg) * 100);
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card elev-card transition-all hover:-translate-y-1 hover:elev-raised">
      <button onClick={onOpen} className="relative aspect-[16/10] overflow-hidden bg-sage-200 text-left">
        <img src={t.image} alt={`${t.destination}, ${t.region}`} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-warm-white/95 px-2 py-1 text-[11px] font-semibold text-charcoal backdrop-blur">
            <Icon.Location size={11} /> {t.region}
          </span>
          <Badge icon={st.icon} label={st.label} tone={TONE[st.tone]} />
        </div>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-near-black">{t.destination}</h3>
          <span className="inline-flex items-center gap-1 rounded-md bg-forest-700 px-1.5 py-0.5 text-primary-foreground">
            <Icon.Leaf size={11} /> <span className="font-mono text-[11px] font-semibold">{t.score}</span>
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-medium-gray">
          <span className="flex items-center gap-1"><Icon.Calendar size={12} /> {t.dates}</span>
          <span className="flex items-center gap-1"><Icon.Profile size={12} /> {t.travelers}</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border border-border bg-warm-white p-2">
            <div className="flex items-center gap-1 text-medium-gray"><Icon.Carbon size={12} /> Est. CO₂e</div>
            <div className="mt-0.5 font-mono font-semibold text-carbon">{t.carbonKg} kg</div>
          </div>
          <div className="rounded-lg border border-border bg-warm-white p-2">
            <div className="flex items-center gap-1 text-medium-gray"><Icon.Leaf size={12} /> vs standard</div>
            <div className="mt-0.5 font-mono font-semibold text-success">−{cut}%</div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {t.ecoTwin && <Badge icon="Leaf" label="Eco-Twin" tone={TONE.verified} />}
          <Badge icon={ar.icon} label={ar.label} tone={TONE[ar.tone]} />
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <Button size="sm" className="flex-1" icon="Calendar" onClick={onItinerary}>Itinerary</Button>
          <Button size="sm" variant="tertiary" onClick={onOpen}>Details</Button>
        </div>
      </div>
    </div>
  );
}
