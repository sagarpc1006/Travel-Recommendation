import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./icons";
import { Button, Badge, TONE } from "./ui";

type Go = (route: string) => void;

const SUGGESTED: { icon: IconName; label: string; prompt: string }[] = [
  { icon: "AI", label: "Plan a Trip", prompt: "Plan a sustainable 3-day trip to Goa" },
  { icon: "Accessibility", label: "Find Accessible Travel", prompt: "Find an accessible weekend trip from Pune" },
  { icon: "Leaf", label: "Travel Greener", prompt: "Show me a lower-carbon way to reach Mumbai" },
  { icon: "Compass", label: "Explore Nearby", prompt: "Weekend trips near Pune under 500km" },
  { icon: "Route", label: "Compare Routes", prompt: "Compare routes from Pune to Goa" },
  { icon: "Location", label: "Eco-Friendly Stays", prompt: "Find eco-friendly stays in Munnar" },
];

const RECENT = ["Sustainable trip to Goa", "Accessible stays in Kerala", "Lower-carbon route to Mumbai"];

const PIPELINE: { icon: IconName; label: string }[] = [
  { icon: "AI", label: "Understanding your trip" },
  { icon: "Search", label: "Checking travel options" },
  { icon: "Accessibility", label: "Checking accessibility" },
  { icon: "Leaf", label: "Comparing lower-impact alternatives" },
  { icon: "Carbon", label: "Calculating estimated emissions" },
];

const PROVENANCE: { icon: IconName; label: string }[] = [
  { icon: "Route", label: "Travel data" },
  { icon: "Weather", label: "Weather" },
  { icon: "Accessibility", label: "Accessibility" },
  { icon: "Carbon", label: "Emission factors" },
];

type Phase = "idle" | "processing" | "ready" | "empty" | "error";

export default function AiCommandCenter({ go }: { go: Go }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("idle");
    setStep(0);
  }

  function run(q: string) {
    const text = q.trim();
    if (!text) return;
    setQuery(text);
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("processing");
    setStep(0);

    // demo branches: trigger edge states via keywords
    const lower = text.toLowerCase();
    const outcome: Phase = lower.includes("mars") || lower.includes("moon")
      ? "empty"
      : lower.includes("error") || lower.includes("fail")
        ? "error"
        : "ready";

    PIPELINE.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setStep(i), 550 * (i + 1)),
      );
    });
    timers.current.push(
      window.setTimeout(() => setPhase(outcome), 550 * (PIPELINE.length + 1)),
    );
  }

  return (
    <section aria-label="AI Travel Command Center" className="relative">
      <div
        className={`rounded-2xl border bg-card p-5 transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] sm:p-7 ${
          focused || phase !== "idle" ? "border-emerald-400 elev-raised" : "border-border elev-card"
        }`}
      >
        {/* Context row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-forest-700">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-sage-100">
              <Icon.AI size={16} />
            </span>
            Ask EcoTrail
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-medium-gray">Based on your preferences</span>
            <Badge icon="Leaf" label="High sustainability" tone={TONE.verified} />
            <Badge icon="Accessibility" label="Step-free preferred" tone={TONE.access} />
            <Badge icon="Route" label="Balanced convenience" tone={TONE.neutral} />
          </div>
        </div>

        {/* Input */}
        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            run(query);
          }}
        >
          <div
            className={`flex items-center gap-2 rounded-xl border-2 bg-warm-white px-3 py-2 transition-colors ${
              focused ? "border-emerald-500 bg-card" : "border-border"
            }`}
          >
            <Icon.Search size={20} className="shrink-0 text-medium-gray" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Where do you want to go?"
              aria-label="Describe your trip"
              className="h-9 flex-1 bg-transparent text-[15px] text-near-black placeholder:text-medium-gray focus:outline-none"
            />
            <button
              type="button"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-medium-gray transition-colors hover:bg-soft-gray"
              aria-label="Voice input"
            >
              <Icon.Notification size={18} />
            </button>
            <Button type="submit" size="md" icon="Chevron" className="shrink-0 [&_svg]:-rotate-90" disabled={!query.trim()}>
              <span className="sr-only sm:not-sr-only">Ask</span>
            </Button>
          </div>
        </form>

        {/* Idle: suggested prompts + recent */}
        {phase === "idle" && (
          <div className="mt-5">
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map((s) => {
                const I = Icon[s.icon];
                return (
                  <button
                    key={s.label}
                    onClick={() => run(s.prompt)}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-warm-white px-3 py-1.5 text-sm font-medium text-charcoal transition-all hover:border-emerald-400 hover:bg-sage-100 hover:text-forest-700 focus:outline-none focus:ring-2 focus:ring-ring/60"
                  >
                    <I size={15} className="text-emerald-500" />
                    {s.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-medium-gray">
              <span className="flex items-center gap-1"><Icon.Clock size={13} /> Recent:</span>
              {RECENT.map((r) => (
                <button key={r} onClick={() => run(r)} className="hover:text-forest-700 hover:underline">
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Processing pipeline */}
        {phase === "processing" && (
          <div className="mt-5 rounded-xl border border-ai-border bg-ai-soft/60 p-4">
            <div className="text-xs font-medium text-ai">Planning: “{query}”</div>
            <div className="mt-3 space-y-2">
              {PIPELINE.map((p, i) => {
                const I = Icon[p.icon];
                const state = i < step ? "done" : i === step ? "active" : "todo";
                return (
                  <div key={p.label} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-md transition-colors ${
                        state === "done"
                          ? "bg-emerald-500 text-white"
                          : state === "active"
                            ? "bg-ai text-white"
                            : "bg-card text-medium-gray"
                      }`}
                    >
                      {state === "done" ? (
                        <Icon.Check size={14} />
                      ) : state === "active" ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" style={{ animation: "ai-pulse 1s infinite" }} />
                      ) : (
                        <I size={13} />
                      )}
                    </span>
                    <span className={state === "todo" ? "text-medium-gray" : "text-charcoal"}>{p.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommendation ready */}
        {phase === "ready" && <Recommendation query={query} go={go} onReset={reset} />}

        {/* No results */}
        {phase === "empty" && (
          <div className="mt-5 rounded-xl border border-border bg-warm-white p-6 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-soft-gray text-medium-gray">
              <Icon.Search size={22} />
            </span>
            <h3 className="mt-3 font-semibold text-near-black">No options found for that request</h3>
            <p className="mt-1 text-sm text-slate-gray">Try a real-world destination, or broaden your dates.</p>
            <div className="mt-4 flex justify-center gap-2">
              <Button variant="tertiary" onClick={reset}>Edit Request</Button>
              <Button onClick={() => go("discover")} icon="Compass">Explore Destinations</Button>
            </div>
          </div>
        )}

        {/* Error */}
        {phase === "error" && (
          <div className="mt-5 rounded-xl border border-error/30 bg-error-soft p-6 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-error/10 text-error">
              <Icon.Warning size={22} />
            </span>
            <h3 className="mt-3 font-semibold text-near-black">EcoTrail couldn't complete the request right now</h3>
            <p className="mt-1 text-sm text-slate-gray">This is usually temporary. You can try again in a moment.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button onClick={() => run(query)} icon="Route">Try Again</Button>
              <Button variant="tertiary" onClick={reset}>Edit Request</Button>
              <Button variant="ghost" onClick={() => go("discover")}>Explore Destinations</Button>
            </div>
          </div>
        )}
      </div>

      {/* Provenance strip */}
      {(phase === "idle" || phase === "ready") && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1 text-[11px] text-medium-gray">
          <span className="flex items-center gap-1"><Icon.Info size={13} /> EcoTrail builds recommendations from:</span>
          {PROVENANCE.map((p) => {
            const I = Icon[p.icon];
            return (
              <span key={p.label} className="flex items-center gap-1">
                <I size={13} className="text-emerald-500" /> {p.label}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}

function Recommendation({ query, go, onReset }: { query: string; go: Go; onReset: () => void }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-emerald-400 bg-gradient-to-br from-sage-100/70 to-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sage-200 px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Icon.AI size={16} className="text-ai" />
          <span className="text-slate-gray">Here's a lower-impact starting point.</span>
        </div>
        <Badge icon="AI" label="AI supported" tone={TONE.ai} />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-base font-semibold text-near-black">
          <Icon.Train size={18} className="text-emerald-500" />
          Train + Shared EV Shuttle
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { icon: "Carbon" as IconName, label: "CO₂e", value: "31 kg", accent: true },
            { icon: "Money" as IconName, label: "Cost", value: "₹7,650" },
            { icon: "Clock" as IconName, label: "Time", value: "3h 55m" },
            { icon: "Accessibility" as IconName, label: "Access", value: "5 / 5", accent: true },
          ].map((m) => {
            const I = Icon[m.icon];
            return (
              <div key={m.label} className={`rounded-lg border px-3 py-2 ${m.accent ? "border-emerald-400 bg-sage-100" : "border-border bg-card"}`}>
                <div className="flex items-center gap-1 text-[11px] text-medium-gray"><I size={12} /> {m.label}</div>
                <div className={`mt-0.5 font-mono text-sm font-semibold ${m.accent ? "text-forest-700" : "text-near-black"}`}>{m.value}</div>
              </div>
            );
          })}
        </div>

        {/* Why this option */}
        <div className="mt-4 rounded-lg border border-border bg-card p-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-medium-gray">Why this option?</div>
          <ul className="mt-2 space-y-1.5 text-sm text-charcoal">
            {[
              "Lower estimated carbon than flying",
              "Better accessibility along the route",
              "Lower estimated cost overall",
            ].map((r) => (
              <li key={r} className="flex items-center gap-2">
                <Icon.Check size={15} className="text-verified" /> {r}
              </li>
            ))}
          </ul>
          <p className="mt-2 flex items-center gap-1 text-[11px] text-medium-gray">
            <Icon.Info size={12} /> Recommended because it matches your travel priorities. Demonstration data.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button icon="Route" onClick={() => go("planner")}>Compare Options</Button>
          <Button variant="tertiary" icon="Sliders" onClick={() => go("home")}>Adjust Preferences</Button>
          <button onClick={onReset} className="ml-auto text-sm font-medium text-medium-gray hover:text-forest-700">
            New request
          </button>
        </div>
      </div>
    </div>
  );
}
