import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import AiCommandCenter from "../components/AiCommandCenter";
import { DestinationCard } from "../components/DestinationCard";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, ProgressBar } from "../components/ui";
import { DESTINATIONS, type Destination } from "../data/destinations";
import { useAuth } from "../context/AuthContext";
import { discoverPlaces } from "../services/discoverAPI";
import { getEcoImpact, getRecentTrips, getUserPreferences } from "../services/tripAPI";
import { apiPlaceToDestination } from "../services/adapters";

type Go = (route: string) => void;

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <h2 className="text-xl font-semibold tracking-tight text-near-black">{title}</h2>
      {action && (
        <button onClick={onAction} className="inline-flex items-center gap-1 text-sm font-medium text-emerald-500 hover:underline">
          {action} <Icon.Chevron size={14} />
        </button>
      )}
    </div>
  );
}

export default function Home({ go, onExplore }: { go: Go; onExplore: (d: Destination) => void }) {
  const { user, profile } = useAuth();
  const firstName = (user?.displayName || profile?.name || (user?.email ? user.email.split('@')[0] : 'Traveler')).split(' ')[0];

  const [destList, setDestList] = useState<Destination[]>(DESTINATIONS);
  const [ecoImpact, setEcoImpact] = useState({
    carbonAvoidedKg: 127,
    sustainableChoices: 6,
    tripsOptimized: 4,
  });
  const [latestTrip, setLatestTrip] = useState<any>(null);
  const [ecoPriorityLabel, setEcoPriorityLabel] = useState("high sustainability, step-free preferred");

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch live destinations from backend
    discoverPlaces()
      .then((res) => {
        if (isMounted && res?.success && Array.isArray(res.places) && res.places.length > 0) {
          const mapped = res.places.map(apiPlaceToDestination);
          setDestList(mapped);
        }
      })
      .catch((err) => {
        console.debug("Discover API fallback on Home:", err);
      });

    // 2. Fetch real eco impact
    getEcoImpact()
      .then((impact) => {
        if (isMounted && impact) {
          setEcoImpact({
            carbonAvoidedKg: impact.carbonAvoidedKg || 127,
            sustainableChoices: impact.sustainableChoices || 6,
            tripsOptimized: impact.tripsOptimized || 4,
          });
        }
      })
      .catch(() => {});

    // 3. Fetch latest trip for "Continue planning"
    getRecentTrips()
      .then((trips) => {
        if (isMounted && Array.isArray(trips) && trips.length > 0) {
          setLatestTrip(trips[0]);
        }
      })
      .catch(() => {});

    // 4. Fetch user preferences
    getUserPreferences()
      .then((p) => {
        if (isMounted && p) {
          const prio = p.ecoPriority ? `${p.ecoPriority.toLowerCase()} sustainability` : 'high sustainability';
          const acc = p.accessibility ? 'step-free preferred' : 'convenient transit';
          setEcoPriorityLabel(`${prio}, ${acc}`);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const recommended = destList.filter((d) => d.recommended);
  const explore = destList.filter((d) => !d.recommended).slice(0, 3);
  const displayRecommended = recommended.length > 0 ? recommended.slice(0, 4) : destList.slice(0, 4);
  const displayExplore = explore.length > 0 ? explore : destList.slice(4, 7);

  return (
    <AppShell active="home" go={go}>
      <main className="mx-auto max-w-6xl px-6 py-8 lg:py-10">
        {/* Greeting */}
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-500">{greeting()}, {firstName}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-near-black md:text-5xl">
            Where will you go next?
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-gray">
            Tell EcoTrail what you're planning. We'll help you find a smarter way there.
          </p>
        </div>

        {/* AI Command Center — the primary experience */}
        <div className="mt-6">
          <AiCommandCenter go={go} />
        </div>

        {/* Continue planning + Eco impact + Weather — secondary row */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {/* Continue planning */}
          <div className="rounded-xl border border-border bg-card p-5 elev-card">
            <SectionTitle title="Continue planning" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative h-24 w-full overflow-hidden rounded-lg bg-sage-200 sm:w-36 sm:shrink-0">
                <img
                  src={latestTrip?.coverImage || destList[1]?.image || DESTINATIONS[1].image}
                  alt={latestTrip?.destination || "Goa"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-near-black">
                    {latestTrip?.title || `${latestTrip?.origin || 'Pune'} → ${latestTrip?.destination || 'Goa'}`}
                  </h3>
                  <Badge icon="Clock" label="In progress" tone={TONE.estimated} />
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-medium-gray">
                  <Icon.Calendar size={13} /> {latestTrip?.travelDates || '14–17 Nov'} · 2 travellers
                </div>
                <div className="mt-3">
                  <ProgressBar value={45} label="Trip progress" detail="Comparing routes" />
                </div>
              </div>
              <Button size="md" icon="Route" className="sm:self-end" onClick={() => go("planner")}>
                Continue
              </Button>
            </div>
          </div>

          {/* Eco impact */}
          <div className="rounded-xl border border-border bg-gradient-to-br from-forest-800 to-forest-700 p-5 text-primary-foreground elev-card">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-sage-200">Your eco impact</h2>
              <Icon.Leaf size={18} className="text-emerald-400" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                [`${ecoImpact.carbonAvoidedKg} kg`, "CO₂e avoided"],
                [`${ecoImpact.sustainableChoices}`, "Lower-impact choices"],
                [`${ecoImpact.tripsOptimized}`, "Trips optimized"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-mono text-2xl font-bold text-emerald-400">{v}</div>
                  <div className="mt-0.5 text-[11px] leading-tight text-sage-200">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-sage-300">
              Every greener choice adds up. Illustrative figures based on your recent plans.
            </p>
          </div>
        </div>

        {/* Recommended for you */}
        <section className="mt-12">
          <SectionTitle title="Recommended for you" action="See all" onAction={() => go("discover")} />
          <p className="-mt-2 mb-4 flex items-center gap-1.5 text-xs text-medium-gray">
            <Icon.AI size={13} className="text-ai" /> Matched to your priorities: {ecoPriorityLabel}.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {displayRecommended.map((d) => (
              <DestinationCard key={d.id} d={d} onExplore={onExplore} />
            ))}
          </div>
        </section>

        {/* Explore destinations */}
        <section className="mt-12">
          <SectionTitle title="Explore destinations" action="Open Discover" onAction={() => go("discover")} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayExplore.map((d) => (
              <DestinationCard key={d.id} d={d} onExplore={onExplore} />
            ))}
          </div>
        </section>

        {/* Weather + Recent activity — quiet footer row */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          {/* Weather */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-medium-gray">Travel conditions</h2>
              <Badge icon="Weather" label="OpenWeather" tone={TONE.weather} />
            </div>
            <div className="mt-4 space-y-3">
              {destList.slice(0, 2).map((d) => (
                <div key={d.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-weather-soft text-weather">
                    <Icon.Weather size={20} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-near-black">{d.name}</span>
                      <span className="font-mono text-sm text-charcoal">{d.weather.temp}</span>
                      <span className="text-xs text-medium-gray">{d.weather.condition}</span>
                    </div>
                    {d.weather.note && (
                      <div className="mt-0.5 flex items-center gap-1 text-[11px] text-estimated">
                        <Icon.Info size={12} /> {d.weather.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-medium-gray">Recent activity</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {(
                [
                  ["Search", "Recently searched", ["Goa", "Accessible Kerala"]],
                  ["Location", "Recently viewed", ["Munnar", "Coorg"]],
                  ["Leaf", "Saved", ["Udaipur"]],
                ] as [IconName, string, string[]][]
              ).map(([icon, title, items]) => {
                const I = Icon[icon];
                return (
                  <div key={title}>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-medium-gray">
                      <I size={13} /> {title}
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {items.map((it) => (
                        <li key={it}>
                          <button onClick={() => go("discover")} className="text-sm text-charcoal hover:text-forest-700 hover:underline">
                            {it}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
