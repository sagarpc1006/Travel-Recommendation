import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/AppShell";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, ProgressBar } from "../components/ui";
import { INSIGHTS, TRIPS, type Trip } from "../data/trips";
import { getRecentTrips } from "../services/tripAPI";
import { apiTripToTrip } from "../services/adapters";

type Go = (route: string) => void;

export default function EcoInsights({ go }: { go: Go }) {
  const [range, setRange] = useState<"year" | "month">("year");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadTrips() {
      try {
        const data = await getRecentTrips();
        if (active && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: any) =>
            item.days ? (item as Trip) : apiTripToTrip(item)
          );
          setTrips(mapped);
        }
      } catch (err) {
        console.warn("Could not fetch trips for eco insights:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadTrips();
    return () => {
      active = false;
    };
  }, []);

  const effectiveTrips = trips.length > 0 ? trips : TRIPS;

  const totalEstimatedKg = useMemo(() => {
    if (trips.length > 0) {
      return Math.round(trips.reduce((sum, t) => sum + (t.carbonKg || 0), 0));
    }
    return INSIGHTS.totalEstimatedKg;
  }, [trips]);

  const lifetimeAvoidedKg = useMemo(() => {
    if (trips.length > 0) {
      return Math.round(
        trips.reduce((sum, t) => sum + Math.max(0, (t.standardCarbonKg || 0) - (t.carbonKg || 0)), 0)
      );
    }
    return INSIGHTS.lifetimeAvoidedKg;
  }, [trips]);

  const sustainableChoices = useMemo(() => {
    if (trips.length > 0) {
      return trips.filter((t) => (t.score && t.score >= 80) || t.ecoTwin).length;
    }
    return INSIGHTS.sustainableChoices;
  }, [trips]);

  const tripsOptimizedCount = trips.length > 0 ? trips.length : INSIGHTS.tripsOptimized;

  const modesData = useMemo(() => {
    if (trips.length === 0) return INSIGHTS.modes;

    let railKg = 0;
    let busKg = 0;
    let evKg = 0;

    trips.forEach((t) => {
      const modeLower = (t.region || "").toLowerCase();
      const kg = t.carbonKg || 0;
      if (modeLower.includes("train") || modeLower.includes("rail")) {
        railKg += kg;
      } else if (modeLower.includes("bus") || modeLower.includes("coach")) {
        busKg += kg;
      } else if (modeLower.includes("ev") || modeLower.includes("electric")) {
        evKg += kg;
      } else {
        railKg += kg * 0.6;
        evKg += kg * 0.25;
        busKg += kg * 0.15;
      }
    });

    const list = [
      { mode: "Train & Rail", kg: Math.round(railKg), color: "var(--color-emerald-500)" },
      { mode: "Electric / EV", kg: Math.round(evKg), color: "var(--color-forest-700)" },
      { mode: "Bus & Coach", kg: Math.round(busKg), color: "var(--color-slate-gray)" },
    ].filter((m) => m.kg > 0);

    return list.length > 0 ? list : INSIGHTS.modes;
  }, [trips]);

  const totalModes = modesData.reduce((n, m) => n + m.kg, 0) || 1;
  const maxStd = Math.max(...INSIGHTS.monthly.map((m) => m.std));

  return (
    <AppShell active="insights" go={go}>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-near-black md:text-4xl">Eco Insights</h1>
          <p className="mt-2 text-slate-gray">Understand the estimated environmental impact of your travel choices — measured honestly, never exaggerated.</p>
        </div>

        {/* Headline stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard icon="Leaf" label="Est. CO₂e avoided (lifetime)" value={`${lifetimeAvoidedKg} kg`} accent hint="vs standard equivalents" />
          <StatCard icon="Carbon" label="Est. CO₂e this year" value={`${totalEstimatedKg} kg`} hint="across your EcoTrail trips" />
          <StatCard icon="Route" label="Sustainable choices" value={`${sustainableChoices}`} hint={`${tripsOptimizedCount} trips optimized`} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Carbon trend */}
          <section className="rounded-2xl border border-border bg-card p-5 elev-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-near-black">Carbon trend</h2>
                <p className="text-xs text-medium-gray">Estimated CO₂e — standard equivalent vs your EcoTrail plans.</p>
              </div>
              <div className="flex overflow-hidden rounded-lg border border-border text-sm">
                {(["year", "month"] as const).map((r) => (
                  <button key={r} onClick={() => setRange(r)} className={`px-3 py-1.5 font-medium capitalize transition-colors ${range === r ? "bg-sage-100 text-forest-700" : "text-medium-gray hover:bg-soft-gray"}`}>{r}</button>
                ))}
              </div>
            </div>

            {/* grouped bar chart */}
            <div className="mt-6 flex items-end gap-3 overflow-x-auto pb-2" style={{ height: 200 }}>
              {INSIGHTS.monthly.map((m) => (
                <div key={m.m} className="flex min-w-[34px] flex-1 flex-col items-center gap-1">
                  <div className="flex h-full w-full items-end justify-center gap-1">
                    <div className="w-1/2 rounded-t bg-mist" style={{ height: `${maxStd ? (m.std / maxStd) * 100 : 0}%` }} title={`Standard ${m.std} kg`} />
                    <div className="w-1/2 rounded-t bg-emerald-500" style={{ height: `${maxStd ? (m.eco / maxStd) * 100 : 0}%` }} title={`EcoTrail ${m.eco} kg`} />
                  </div>
                  <span className="text-[10px] text-medium-gray">{m.m}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-medium-gray">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-mist" /> Standard equivalent</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Your EcoTrail plan</span>
            </div>
            <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-success-soft/50 p-3 text-xs text-success">
              <Icon.Info size={13} className="mt-px shrink-0" /> Choosing rail instead of air travel can significantly reduce estimated trip emissions.
            </p>
          </section>

          {/* Transport mode contribution */}
          <section className="rounded-2xl border border-border bg-card p-5 elev-card">
            <h2 className="text-lg font-semibold text-near-black">Transport mode contribution</h2>
            <p className="text-xs text-medium-gray">Estimated CO₂e by how you travelled.</p>
            {/* stacked bar */}
            <div className="mt-4 flex h-4 overflow-hidden rounded-full">
              {modesData.map((m) => (
                <div key={m.mode} style={{ width: `${(m.kg / totalModes) * 100}%`, background: m.color }} title={`${m.mode} ${m.kg} kg`} />
              ))}
            </div>
            <ul className="mt-4 space-y-2.5">
              {modesData.map((m) => (
                <li key={m.mode} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-charcoal"><span className="h-3 w-3 rounded-sm" style={{ background: m.color }} /> {m.mode}</span>
                  <span className="font-mono text-medium-gray">{m.kg} kg · {Math.round((m.kg / totalModes) * 100)}%</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Recent trip impact */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-5 elev-card">
          <h2 className="text-lg font-semibold text-near-black">Recent trip impact</h2>
          <div className="mt-4 space-y-4">
            {effectiveTrips.slice(0, 3).map((t) => {
              const cut = t.standardCarbonKg > 0
                ? Math.round(((t.standardCarbonKg - t.carbonKg) / t.standardCarbonKg) * 100)
                : 40;
              return (
                <div key={t.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-charcoal">{t.origin} → {t.destination}</span>
                    <span className="font-mono text-xs text-medium-gray">{t.carbonKg} kg vs {t.standardCarbonKg} kg</span>
                  </div>
                  <div className="mt-1.5"><ProgressBar value={100 - cut} label="" detail={`~${cut}% less estimated carbon`} /></div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Methodology */}
        <section className="mt-6 rounded-2xl border border-border bg-warm-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-near-black">How we calculate this</h2>
            <Badge icon="Info" label="Estimated" tone={TONE.estimated} />
          </div>
          <p className="mt-1 text-sm text-slate-gray">EcoTrail estimates emissions using travel activity data and mode-specific emission factors — not live measurements.</p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-center text-xs">
            <span className="flex-1 rounded-lg border border-border bg-card px-3 py-3 font-medium text-charcoal">Activity data<br /><span className="text-medium-gray">distance / travel activity</span></span>
            <Icon.Close size={16} className="rotate-45 text-medium-gray" />
            <span className="flex-1 rounded-lg border border-border bg-card px-3 py-3 font-medium text-charcoal">Emission factor<br /><span className="text-medium-gray">mode-specific</span></span>
            <span className="text-medium-gray">=</span>
            <span className="flex-1 rounded-lg border border-carbon/30 bg-carbon-soft px-3 py-3 font-semibold text-carbon">Estimated CO₂e</span>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-medium-gray">Example</div>
            <div className="mt-1.5 font-mono text-sm text-charcoal">520 km (train) × 0.045 kg/km = <span className="font-semibold text-carbon">23.4 kg CO₂e</span></div>
            <p className="mt-1 text-xs text-medium-gray">Based on activity data and emission factors from published environmental datasets.</p>
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <Button variant="tertiary" icon="Calendar" onClick={() => go("mytrips")}>Back to my trips</Button>
        </div>
      </main>
    </AppShell>
  );
}

function StatCard({ icon, label, value, hint, accent }: { icon: IconName; label: string; value: string; hint?: string; accent?: boolean }) {
  const I = Icon[icon];
  return (
    <div className={`rounded-2xl border p-5 elev-card ${accent ? "border-forest-700 bg-gradient-to-br from-forest-800 to-forest-700 text-primary-foreground" : "border-border bg-card"}`}>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold uppercase tracking-wide ${accent ? "text-sage-200" : "text-medium-gray"}`}>{label}</span>
        <I size={18} className={accent ? "text-emerald-400" : "text-emerald-500"} />
      </div>
      <div className={`mt-3 font-mono text-3xl font-bold ${accent ? "text-emerald-400" : "text-near-black"}`}>{value}</div>
      {hint && <div className={`mt-1 text-xs ${accent ? "text-sage-300" : "text-medium-gray"}`}>{hint}</div>}
    </div>
  );
}
