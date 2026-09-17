import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { Button, Badge, TONE, CircularScore, ComparisonBar } from "./ui";
import { EVIDENCE_META, type Destination } from "../data/destinations";

type Go = (route: string) => void;

export default function DestinationPreview({
  d,
  go,
  onClose,
}: {
  d: Destination;
  go: Go;
  onClose: () => void;
}) {
  const [saved, setSaved] = useState(false);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={`${d.name} preview`}>
      <button
        aria-label="Close preview"
        onClick={onClose}
        className="absolute inset-0 bg-near-black/40 backdrop-blur-[2px]"
        style={{ animation: "fade-in 200ms ease-out" }}
      />

      {/* Panel: bottom sheet on mobile, right rail on desktop */}
      <div
        className="absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-2xl bg-card sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[440px] sm:max-h-none sm:rounded-none sm:rounded-l-2xl elev-modal"
        style={{ animation: "sheet-up 300ms cubic-bezier(.16,1,.3,1)" }}
      >
        {/* drag handle (mobile) */}
        <div className="flex justify-center pt-2 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-mist" />
        </div>

        {/* Hero */}
        <div className="relative h-44 bg-sage-200">
          <img src={d.image} alt={`${d.name}, ${d.region}`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-near-black/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-warm-white/90 text-charcoal backdrop-blur transition-colors hover:bg-warm-white"
            aria-label="Close"
          >
            <Icon.Close size={18} />
          </button>
          <div className="absolute bottom-3 left-4 text-primary-foreground">
            <div className="flex items-center gap-1 text-xs opacity-90">
              <Icon.Location size={13} /> {d.region}
            </div>
            <h2 className="text-2xl font-bold">{d.name}</h2>
          </div>
        </div>

        <div className="space-y-6 p-5">
          {/* Score + best for */}
          <div className="flex items-center gap-4">
            <CircularScore value={d.score} label="" size={72} />
            <div>
              <div className="text-sm font-semibold text-near-black">Green &amp; Accessible</div>
              <div className="text-xs text-medium-gray">Full breakdown available in Planner</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {d.bestFor.map((t) => (
                  <span key={t} className="rounded-full bg-sage-100 px-2 py-0.5 text-[11px] font-medium text-forest-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-gray">{d.description}</p>

          {/* Accessibility snapshot */}
          <Block title="Accessibility">
            <div className="space-y-2">
              {d.access.map((a) => {
                const meta = EVIDENCE_META[a.status];
                const I = Icon[a.icon];
                return (
                  <div key={a.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-charcoal">
                      <I size={16} className="text-access" /> {a.label}
                    </span>
                    <Badge icon={meta.icon} label={meta.label} tone={TONE[meta.tone]} />
                  </div>
                );
              })}
            </div>
          </Block>

          {/* Sustainability snapshot */}
          <Block title="Sustainability">
            <ComparisonBar
              a={{ label: "Flight equivalent", value: Math.round(d.carbonKg * 3.4), color: "var(--color-medium-gray)" }}
              b={{ label: "EcoTrail route", value: d.carbonKg, color: "var(--color-emerald-500)" }}
            />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {d.publicTransport && <Badge icon="Train" label="Public transport friendly" tone={TONE.carbon} />}
              {d.ecoStays && <Badge icon="Leaf" label="Eco-friendly stays" tone={TONE.verified} />}
            </div>
          </Block>

          {/* Travel + weather + best time */}
          <div className="grid grid-cols-2 gap-3">
            <MiniStat icon="Clock" label="Est. travel time" value={d.time} />
            <MiniStat icon="Money" label="Approx. cost" value={d.cost} />
            <MiniStat icon="Calendar" label="Best time" value={d.bestTime} />
            <MiniStat icon="Weather" label="Weather" value={`${d.weather.temp} · ${d.weather.condition}`} />
          </div>
          {d.weather.note && (
            <p className="-mt-3 flex items-center gap-1.5 text-xs text-estimated">
              <Icon.Info size={13} /> {d.weather.note}
            </p>
          )}

          {/* Provenance */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-border bg-warm-white p-3 text-[11px] text-medium-gray">
            <span className="flex items-center gap-1"><Icon.Verified size={13} className="text-verified" /> Sources:</span>
            <span>Weather · OpenWeather</span>
            <span>Access · OSM</span>
            <span>Travel · rail data</span>
            <span>Carbon · DEFRA factors</span>
          </div>
        </div>

        {/* Sticky actions */}
        <div className="sticky bottom-0 flex gap-2 border-t border-border bg-card/95 px-5 py-4 backdrop-blur">
          <Button className="flex-1" size="lg" icon="Route" onClick={() => go("planner")}>
            Plan a Trip
          </Button>
          <Button
            variant={saved ? "secondary" : "tertiary"}
            size="lg"
            icon={saved ? "Check" : "Plus"}
            onClick={() => setSaved((v) => !v)}
          >
            {saved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sheet-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @media (min-width: 640px) {
          @keyframes sheet-up { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }
        }
      `}</style>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-medium-gray">{title}</h3>
      {children}
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: keyof typeof Icon; label: string; value: string }) {
  const I = Icon[icon];
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-center gap-1 text-[11px] text-medium-gray"><I size={12} /> {label}</div>
      <div className="mt-1 text-sm font-medium text-charcoal">{value}</div>
    </div>
  );
}
