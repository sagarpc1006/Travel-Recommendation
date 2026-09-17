import AppShell from "../components/AppShell";
import { Icon, type IconName } from "../components/icons";
import { Button, Eyebrow } from "../components/ui";

type Go = (route: string) => void;

const CONTENT: Record<string, { icon: IconName; eyebrow: string; title: string; body: string; points: string[] }> = {
  planner: {
    icon: "Route",
    eyebrow: "Coming in Phase 4",
    title: "Your travel planner is taking shape",
    body: "This is where EcoTrail turns a recommendation into a real itinerary — comparing routes side by side, showing the math behind each choice, and building a day-by-day plan you can trust.",
    points: ["Recommendation comparison", "Show-your-math transparency", "Day-by-day itinerary builder"],
  },
  mytrips: {
    icon: "Calendar",
    eyebrow: "Coming soon",
    title: "All your trips in one calm place",
    body: "Saved plans, upcoming journeys and past adventures will live here — each with its sustainability and accessibility record kept intact.",
    points: ["Upcoming & past trips", "Saved destinations", "Trip-level eco records"],
  },
  insights: {
    icon: "Leaf",
    eyebrow: "Coming soon",
    title: "Understand your impact over time",
    body: "A quiet, honest view of the greener choices you've made — carbon avoided, accessible journeys taken, and how it adds up across a year.",
    points: ["Carbon avoided over time", "Accessible journeys", "Yearly impact summary"],
  },
};

export default function Placeholder({ route, go }: { route: string; go: Go }) {
  const c = CONTENT[route] ?? CONTENT.planner;
  const I = Icon[c.icon];
  return (
    <AppShell active={route} go={go}>
      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-sage-100 text-forest-700 elev-subtle">
          <I size={30} />
        </span>
        <div className="mt-6">
          <Eyebrow>{c.eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-near-black md:text-4xl">{c.title}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-gray">{c.body}</p>

        <ul className="mt-8 grid w-full max-w-md gap-2 text-left">
          {c.points.map((p) => (
            <li key={p} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
              <Icon.Check size={18} className="text-emerald-500" />
              <span className="text-sm font-medium text-charcoal">{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex gap-3">
          <Button variant="secondary" icon="Compass" onClick={() => go("home")}>Back to Home</Button>
          <Button icon="Map" onClick={() => go("discover")}>Explore destinations</Button>
        </div>
      </main>
    </AppShell>
  );
}
