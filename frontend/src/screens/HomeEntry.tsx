import { Icon } from "../components/icons";
import { Button, Logo, Badge, TONE } from "../components/ui";

type Go = (route: string) => void;

/* Placeholder Home entry — the full Home experience is a later phase. */
export default function HomeEntry({ go }: { go: Go }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-warm-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-lg text-slate-gray hover:bg-soft-gray">
              <Icon.Notification size={18} />
            </button>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sage-200 text-xs font-semibold text-forest-700">AK</span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <Badge icon="Check" label="Profile created" tone={TONE.verified} />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-near-black md:text-5xl">
          Welcome to EcoTrail, Aditi.
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-gray">
          Your personalized home is coming next. For now, here's where your smarter,
          greener journeys will begin.
        </p>

        <div className="mt-12 grid w-full gap-4 sm:grid-cols-3">
          {[
            ["AI", "Plan a trip", "Describe it — we'll do the rest."],
            ["Compass", "Discover", "Destinations matched to you."],
            ["Leaf", "Your impact", "See the difference you make."],
          ].map(([icon, title, body]) => {
            const I = Icon[icon as keyof typeof Icon];
            return (
              <div key={title} className="rounded-xl border border-dashed border-mist bg-card/60 p-6 text-left">
                <I size={22} className="text-emerald-500" />
                <h3 className="mt-3 font-semibold text-near-black">{title}</h3>
                <p className="mt-1 text-sm text-slate-gray">{body}</p>
                <span className="mt-3 inline-block font-mono text-[11px] text-medium-gray">Coming soon</span>
              </div>
            );
          })}
        </div>

        <Button variant="tertiary" className="mt-12" icon="Chevron" onClick={() => go("landing")}>
          <span className="rotate-180">↩</span> Back to landing
        </Button>
      </main>
    </div>
  );
}
