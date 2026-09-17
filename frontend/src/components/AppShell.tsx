import { useState } from "react";
import { Icon, type IconName } from "./icons";
import { Logo } from "./ui";

type Go = (route: string) => void;

const NAV: { key: string; label: string; icon: IconName }[] = [
  { key: "home", label: "Home", icon: "Compass" },
  { key: "discover", label: "Discover", icon: "Map" },
  { key: "planner", label: "Planner", icon: "Route" },
  { key: "mytrips", label: "My Trips", icon: "Calendar" },
  { key: "insights", label: "Eco Insights", icon: "Leaf" },
];

export default function AppShell({
  active,
  go,
  children,
}: {
  active: string;
  go: Go;
  children: React.ReactNode;
}) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      {/* Desktop / top nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-warm-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <button onClick={() => go("home")} aria-label="EcoTrail home">
            <Logo size="sm" />
          </button>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => go(n.key)}
                aria-current={active === n.key ? "page" : undefined}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active === n.key
                    ? "bg-sage-100 text-forest-700"
                    : "text-slate-gray hover:bg-soft-gray hover:text-charcoal"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <div className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="relative grid h-9 w-9 place-items-center rounded-lg text-slate-gray transition-colors hover:bg-soft-gray"
                aria-label="Notifications"
              >
                <Icon.Notification size={18} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-warm-white" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-11 w-72 rounded-xl border border-border bg-card p-2 elev-modal">
                  <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-medium-gray">
                    Notifications
                  </p>
                  {[
                    ["Leaf", "Your Goa route saved 127kg CO₂e"],
                    ["Accessibility", "Step-free data updated for Munnar"],
                    ["Weather", "Rain expected in Coorg this weekend"],
                  ].map(([ic, text]) => {
                    const I = Icon[ic as IconName];
                    return (
                      <div key={text} className="flex items-start gap-2.5 rounded-lg px-2 py-2 hover:bg-soft-gray">
                        <span className="mt-0.5 text-emerald-500"><I size={16} /></span>
                        <span className="text-sm text-charcoal">{text}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <button
              onClick={() => go("profile")}
              aria-current={active === "profile" ? "page" : undefined}
              className={`grid h-9 w-9 place-items-center rounded-full text-xs font-semibold text-forest-700 transition-colors ${
                active === "profile" ? "bg-sage-300 ring-2 ring-emerald-500" : "bg-sage-200 hover:bg-sage-300"
              }`}
              aria-label="Profile"
            >
              AK
            </button>
          </div>
        </div>
      </header>

      {children}

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-warm-white/95 backdrop-blur-md lg:hidden">
        <div className="grid grid-cols-5">
          {NAV.map((n) => {
            const I = Icon[n.icon];
            const on = active === n.key;
            return (
              <button
                key={n.key}
                onClick={() => go(n.key)}
                className={`flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                  on ? "text-forest-700" : "text-medium-gray"
                }`}
              >
                <span className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${on ? "bg-sage-100" : ""}`}>
                  <I size={19} />
                </span>
                {n.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
