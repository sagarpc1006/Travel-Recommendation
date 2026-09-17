import { Icon, type IconName } from "./icons";
import { Button } from "./ui";

/* ============================================================
   Phase 5 — reusable Loading / Error / Empty / Offline states.
   ============================================================ */

export function EmptyState({
  icon = "Compass",
  title,
  body,
  action,
  onAction,
}: {
  icon?: IconName;
  title: string;
  body: string;
  action?: string;
  onAction?: () => void;
}) {
  const I = Icon[icon];
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-mist bg-card/60 px-6 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sage-100 text-forest-700">
        <I size={26} />
      </span>
      <h3 className="mt-4 font-semibold text-near-black">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-gray">{body}</p>
      {action && (
        <div className="mt-5">
          <Button icon="Route" onClick={onAction}>{action}</Button>
        </div>
      )}
    </div>
  );
}

export function ErrorState({
  title,
  body,
  onRetry,
  onContinue,
}: {
  title: string;
  body: string;
  onRetry?: () => void;
  onContinue?: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-warning/30 bg-warning-soft/50 px-6 py-12 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-warning-soft text-warning">
        <Icon.Warning size={26} />
      </span>
      <h3 className="mt-4 font-semibold text-near-black">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-gray">{body}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {onRetry && <Button icon="Route" onClick={onRetry}>Try Again</Button>}
        {onContinue && <Button variant="tertiary" onClick={onContinue}>Continue With Available Data</Button>}
      </div>
    </div>
  );
}

/* Skeleton block — respects reduced motion via CSS (below). */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg bg-soft-gray ${className}`} />;
}

export function OfflineBanner({ state, onDismiss }: { state: "offline" | "syncing" | "synced"; onDismiss?: () => void }) {
  const map = {
    offline: { icon: "Info" as IconName, text: "You're offline. Your saved itinerary is still available.", tone: "bg-soft-gray text-charcoal" },
    syncing: { icon: "Route" as IconName, text: "Back online — syncing your latest changes…", tone: "bg-weather-soft text-weather" },
    synced: { icon: "Check" as IconName, text: "Everything's up to date.", tone: "bg-success-soft text-success" },
  }[state];
  const I = Icon[map.icon];
  return (
    <div className={`flex items-center gap-2 px-6 py-2 text-sm font-medium ${map.tone}`} role="status">
      <I size={16} className={state === "syncing" ? "animate-spin" : ""} />
      {map.text}
      {onDismiss && (
        <button onClick={onDismiss} className="ml-auto rounded p-0.5 hover:bg-black/5" aria-label="Dismiss">
          <Icon.Close size={15} />
        </button>
      )}
    </div>
  );
}
