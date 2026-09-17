import { Icon } from "./icons";
import { Badge, TONE } from "./ui";
import type { Destination } from "../data/destinations";
import { EVIDENCE_META } from "../data/destinations";

/* Best-verified accessibility signal for compact display */
function topAccess(d: Destination) {
  const best =
    d.access.find((a) => a.status === "verified") ??
    d.access.find((a) => a.status === "supported") ??
    d.access[0];
  return best;
}

function ScoreChip({ score }: { score: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-forest-700 px-2 py-1 text-primary-foreground">
      <Icon.Leaf size={13} />
      <span className="font-mono text-xs font-semibold">{score}</span>
      <span className="text-[10px] opacity-70">/100</span>
    </span>
  );
}

export function DestinationCard({
  d,
  onExplore,
  onHover,
  onLeave,
  active,
}: {
  d: Destination;
  onExplore: (d: Destination) => void;
  onHover?: (id: string) => void;
  onLeave?: () => void;
  active?: boolean;
}) {
  const acc = topAccess(d);
  const meta = EVIDENCE_META[acc.status];
  return (
    <button
      onClick={() => onExplore(d)}
      onMouseEnter={() => onHover?.(d.id)}
      onMouseLeave={() => onLeave?.()}
      className={`group flex w-full flex-col overflow-hidden rounded-xl border bg-card text-left transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:elev-raised focus:outline-none focus:ring-2 focus:ring-ring/60 ${
        active ? "border-emerald-500 elev-raised" : "border-border elev-card"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-sage-200">
        <img
          src={d.image}
          alt={`${d.name}, ${d.region}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {d.recommended ? (
            <span className="rounded-full bg-warm-white/95 px-2.5 py-1 text-[11px] font-semibold text-forest-700 backdrop-blur">
              Recommended for you
            </span>
          ) : (
            <span />
          )}
          <ScoreChip score={d.score} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1 text-xs text-medium-gray">
          <Icon.Location size={13} /> {d.region}
        </div>
        <h3 className="mt-1 text-lg font-semibold text-near-black">{d.name}</h3>
        <div className="mt-1 text-[11px] text-slate-gray">{d.bestFor.join(" · ")}</div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-gray">{d.description}</p>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <Badge icon={meta.icon} label={`${acc.label.split(" ")[0]} · ${meta.label}`} tone={TONE[meta.tone]} />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-500 transition-transform group-hover:translate-x-0.5">
            Explore <Icon.Chevron size={14} />
          </span>
        </div>
      </div>
    </button>
  );
}
