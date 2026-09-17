import { useEffect, useState } from "react";
import { Icon, type IconName } from "../components/icons";
import {
  Button,
  Badge,
  TONE,
  Logo,
  ComparisonBar,
  CircularScore,
} from "../components/ui";
import { useAuth } from "../context/AuthContext";

type Go = (route: string) => void;

const NAV = ["How It Works", "Discover", "Eco-Twin", "Accessibility", "Impact"];

/* --- compact metric used in AI preview / eco-twin --- */
function Metric({
  icon,
  label,
  value,
  accent,
}: {
  icon: IconName;
  label: string;
  value: string;
  accent?: boolean;
}) {
  const I = Icon[icon];
  return (
    <div className={`rounded-lg border px-3 py-2.5 ${accent ? "border-emerald-400 bg-sage-100" : "border-border bg-card"}`}>
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-medium-gray">
        <I size={13} /> {label}
      </div>
      <div className={`mt-1 font-mono text-base font-semibold ${accent ? "text-forest-700" : "text-near-black"}`}>
        {value}
      </div>
    </div>
  );
}

export default function Landing({ go }: { go: Go }) {
  const { isAuthenticated } = useAuth();
  const [mobileNav, setMobileNav] = useState(false);
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ---------- Navbar ---------- */}
      <header className="sticky top-0 z-40 border-b border-border bg-warm-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <button onClick={() => go("landing")}>
            <Logo />
          </button>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase().replace(/[^a-z]/g, "")}`}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-gray transition-colors hover:bg-soft-gray hover:text-forest-700"
              >
                {n}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <Button size="md" onClick={() => go("home")}>
                Go to Dashboard →
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="md" onClick={() => go("login")}>
                  Log In
                </Button>
                <Button size="md" onClick={() => go("signup")}>
                  Get Started
                </Button>
              </>
            )}
          </div>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-charcoal hover:bg-soft-gray md:hidden"
            onClick={() => setMobileNav((v) => !v)}
            aria-label="Menu"
          >
            {mobileNav ? <Icon.Close size={20} /> : <Icon.Sliders size={20} />}
          </button>
        </div>
        {mobileNav && (
          <div className="border-t border-border bg-warm-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n}
                  href={`#${n.toLowerCase().replace(/[^a-z]/g, "")}`}
                  onClick={() => setMobileNav(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-gray hover:bg-soft-gray"
                >
                  {n}
                </a>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <Button variant="tertiary" onClick={() => go("login")}>Log In</Button>
              <Button onClick={() => go("signup")}>Get Started</Button>
            </div>
          </div>
        )}
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-14 pb-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pt-20">
          <div
            className="transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ opacity: enter ? 1 : 0, transform: enter ? "none" : "translateY(16px)" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-sage-100 px-3 py-1 text-xs font-medium text-forest-700">
              <Icon.AI size={14} /> AI-powered sustainable travel
            </span>
            <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.03] tracking-tight text-near-black sm:text-6xl">
              Travel Greener.
              <br />
              <span className="text-emerald-500">Explore Smarter.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-gray">
              Plan smarter journeys with AI-powered recommendations built around
              sustainability, accessibility, cost, and convenience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" icon="AI" onClick={() => go("login")}>
                Plan My Trip
              </Button>
              <Button size="lg" variant="tertiary" icon="Compass" onClick={() => go("signup")}>
                Explore Destinations
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-medium-gray">
              <span className="flex items-center gap-1.5"><Icon.Verified size={14} className="text-verified" /> Evidence-based accessibility</span>
              <span className="flex items-center gap-1.5"><Icon.Carbon size={14} className="text-carbon" /> Transparent carbon math</span>
            </div>
          </div>

          {/* Hero visual: layered image + AI planning preview */}
          <div
            className="relative transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{
              opacity: enter ? 1 : 0,
              transform: enter ? "none" : "translateY(24px)",
              transitionDelay: "120ms",
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-sage-200 elev-raised">
              <img
                src="https://images.unsplash.com/photo-1761432325952-004375921fbb?w=900&h=680&fit=crop&auto=format"
                alt="A train travelling through a lush green forest toward mountains"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/45 via-transparent to-transparent" />
              <div className="absolute left-4 top-4">
                <Badge icon="Leaf" label="Eco route · -72% CO₂e" tone={TONE.verified} />
              </div>
            </div>

            {/* Floating AI planning preview card */}
            <div className="absolute -bottom-8 -left-4 w-[86%] rounded-xl border border-border bg-card p-4 elev-modal sm:-left-8 sm:w-[78%]">
              <div className="flex items-center gap-2 text-xs font-medium text-ai">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-ai-soft"><Icon.AI size={14} /></span>
                EcoTrail plan · Pune → Goa
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Metric icon="Flight" label="Standard" value="Flight + Taxi" />
                <Metric icon="Train" label="Eco-Twin" value="Train + EV" accent />
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1.5 text-center">
                {[
                  ["Carbon", "44kg"],
                  ["Cost", "₹3.4k"],
                  ["Time", "12h"],
                  ["Access", "Step-free"],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-md bg-warm-white px-1 py-1.5">
                    <div className="text-[9px] uppercase tracking-wide text-medium-gray">{l}</div>
                    <div className="font-mono text-[11px] font-semibold text-forest-700">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- AI Planning Preview ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-2xl border border-border bg-card p-6 elev-card sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-500">Intelligent planning</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-near-black">
                Describe the trip. See the smarter way.
              </h2>
              <p className="mt-3 text-slate-gray leading-relaxed">
                EcoTrail turns a plain-language request into real, comparable options —
                weighing carbon, cost, time and accessibility so you decide with the full picture.
              </p>
              <div className="mt-6 rounded-xl border border-ai-border bg-ai-soft p-1.5">
                <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2.5">
                  <Icon.AI size={17} className="text-ai" />
                  <span className="text-sm text-charcoal">
                    Plan a sustainable 3-day trip from Pune to Goa.
                  </span>
                </div>
              </div>
            </div>

            {/* Response preview — an interface, not a chat bubble */}
            <div className="rounded-xl border border-border bg-warm-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-near-black">
                  <Icon.Route size={17} className="text-emerald-500" /> Pune → Goa
                </div>
                <Badge icon="AI" label="AI supported" tone={TONE.ai} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-card p-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-medium-gray">Standard</div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-sm text-charcoal">
                    <Icon.Flight size={15} /> Flight + Taxi
                  </div>
                </div>
                <div className="rounded-lg border border-emerald-400 bg-sage-100 p-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-forest-600">Eco-Twin</div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-forest-700">
                    <Icon.Train size={15} /> Train + EV Shuttle
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                <Metric icon="Carbon" label="CO₂e" value="44kg" accent />
                <Metric icon="Money" label="Cost" value="₹3.4k" />
                <Metric icon="Clock" label="Time" value="12h" />
                <Metric icon="Accessibility" label="Access" value="High" accent />
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-medium-gray">
                <Icon.Info size={13} /> Estimates combine rail data and OSM accessibility tags.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Why EcoTrail ---------- */}
      <section id="howitworks" className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-near-black md:text-4xl">
            Built for how people really travel.
          </h2>
          <p className="mt-3 text-slate-gray leading-relaxed">
            Four capabilities work together — you stay in control the whole way.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["AI", "AI Travel Planning", "Tell us what matters. We'll handle the planning and surface real options."],
              ["Leaf", "Sustainable Recommendations", "Find a lower-impact way to get there — without giving up the trip you want."],
              ["Accessibility", "Accessibility Intelligence", "Step-free routes and accessible stays, backed by evidence not guesswork."],
              ["Verified", "Transparent Decisions", "See why each option is recommended, and where every number comes from."],
            ] as [IconName, string, string][]
          ).map(([icon, title, body]) => {
            const I = Icon[icon];
            return (
              <div
                key={title}
                className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:border-emerald-400 hover:elev-card"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-sage-100 text-forest-700 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <I size={22} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-near-black">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-gray">{body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <Icon.Chevron size={14} />
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- Eco-Twin ---------- */}
      <section id="ecotwin" className="mx-auto max-w-6xl px-6 py-16">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-sage-100 to-card">
          <div className="grid gap-8 p-6 lg:grid-cols-[1fr_1fr] lg:items-center sm:p-10">
            <div>
              <Badge icon="Route" label="Eco-Twin" tone={TONE.verified} />
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-near-black md:text-4xl">
                See the better alternative.
              </h2>
              <p className="mt-3 text-slate-gray leading-relaxed">
                Eco-Twin compares a conventional plan with a lower-impact alternative —
                same destination, same requirements. You're not told what to choose.
                You're shown the trade-offs.
              </p>
              <Button className="mt-6" icon="Route" onClick={() => go("signup")}>
                See How Eco-Twin Works
              </Button>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 elev-card">
              <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
                <span className="text-medium-gray">Standard</span>
                <span className="font-mono text-medium-gray">vs</span>
                <span className="text-forest-700">Eco-Twin</span>
              </div>
              <div className="space-y-4">
                <ComparisonBar
                  a={{ label: "Carbon · Flight", value: 158, color: "var(--color-medium-gray)" }}
                  b={{ label: "Carbon · Rail", value: 44, color: "var(--color-emerald-500)" }}
                />
                <div className="grid grid-cols-3 gap-2 border-t border-border pt-4">
                  {[
                    ["Cost", "₹5.2k", "₹3.4k"],
                    ["Time", "9h", "12h"],
                    ["Access", "Medium", "High"],
                  ].map(([l, a, b]) => (
                    <div key={l} className="text-center">
                      <div className="text-[10px] uppercase tracking-wide text-medium-gray">{l}</div>
                      <div className="mt-1 font-mono text-xs text-medium-gray line-through">{a}</div>
                      <div className="font-mono text-sm font-semibold text-forest-700">{b}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Accessibility ---------- */}
      <section id="accessibility" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-access">Accessibility, seriously</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-near-black md:text-4xl">
              Accessible travel, backed by evidence.
            </h2>
            <p className="mt-3 text-slate-gray leading-relaxed">
              Accessibility is part of planning — not a filter added at the end. Every claim
              carries its level of confidence, so you always know how it was verified.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge icon="Verified" label="Verified" tone={TONE.verified} />
              <Badge icon="Profile" label="Business declared" tone={TONE.neutral} />
              <Badge icon="Map" label="OSM supported" tone={TONE.neutral} />
              <Badge icon="Info" label="Unknown" tone={TONE.warning} />
            </div>
            <p className="mt-4 flex items-start gap-1.5 text-xs text-medium-gray">
              <Icon.Info size={14} className="mt-px shrink-0 text-info" />
              EcoTrail never claims AI alone verifies accessibility — evidence and confidence are always shown.
            </p>
          </div>
          <div className="space-y-3">
            {(
              [
                ["Accessibility", "Step-free access", "Dresden Hbf", "verified"],
                ["Wheelchair", "Wheelchair accessible", "Hotel Verde, Lisbon", "verified"],
                ["Bus", "Accessible transport", "Coach route 44", "neutral"],
                ["Location", "Accessible stay", "Riverside B&B", "warning"],
              ] as [IconName, string, string, keyof typeof TONE][]
            ).map(([icon, title, place, tone]) => {
              const I = Icon[icon];
              const label = tone === "verified" ? "Verified" : tone === "warning" ? "Unknown" : "OSM supported";
              return (
                <div key={title} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-access-soft text-access">
                    <I size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-near-black">{title}</div>
                    <div className="truncate text-xs text-medium-gray">{place}</div>
                  </div>
                  <Badge icon={tone === "warning" ? "Info" : "Verified"} label={label} tone={TONE[tone]} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Show your math ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-border bg-card p-6 elev-card sm:p-10">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-carbon">Transparency</span>
            <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight text-near-black md:text-4xl">
              Know where the numbers come from.
            </h2>
          </div>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            {[
              ["Activity Data", "486 km", "carbon"],
              ["×", "", "op"],
              ["Emission Factor", "0.041 kg/km", "carbon"],
              ["=", "", "op"],
              ["Estimated CO₂e", "19.9 kg", "result"],
            ].map(([label, value, kind], i) =>
              kind === "op" ? (
                <span key={i} className="text-center font-mono text-2xl text-medium-gray">{label}</span>
              ) : (
                <div
                  key={i}
                  className={`flex-1 rounded-xl border p-4 text-center ${
                    kind === "result" ? "border-emerald-400 bg-sage-100" : "border-border bg-warm-white"
                  }`}
                >
                  <div className="text-[11px] font-medium uppercase tracking-wide text-medium-gray">{label}</div>
                  <div className={`mt-1 font-mono text-lg font-semibold ${kind === "result" ? "text-forest-700" : "text-near-black"}`}>
                    {value}
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Distance", "486 km"],
              ["Travel Mode", "Regional rail"],
              ["Emission Factor", "0.041 kg/km"],
              ["Source", "UK DEFRA 2024"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-lg border border-border p-3 text-center">
                <div className="text-[10px] uppercase tracking-wide text-medium-gray">{l}</div>
                <div className="mt-1 text-xs font-medium text-charcoal">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-near-black md:text-4xl">How it works</h2>
          <p className="mt-3 text-slate-gray">Four calm steps from idea to saved journey.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Tell us about your trip", "Where to, when, and what you care about."],
            ["02", "EcoTrail understands your priorities", "Sustainability, access, cost and convenience."],
            ["03", "Compare sustainable & accessible options", "See real trade-offs side by side."],
            ["04", "Build and save your journey", "Keep the plan that works for you."],
          ].map(([n, title, body]) => (
            <div key={n} className="rounded-xl border border-border bg-card p-5">
              <span className="font-mono text-2xl font-semibold text-emerald-400">{n}</span>
              <h3 className="mt-3 text-base font-semibold text-near-black">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-gray">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Impact ---------- */}
      <section id="impact" className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-forest-800 to-forest-700 p-8 text-primary-foreground sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Small choices, measured impact.
              </h2>
              <p className="mt-3 max-w-lg leading-relaxed text-sage-200">
                Every EcoTrail plan makes the greener, more accessible option easy to see —
                and easy to choose.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  ["-72%", "Lower-carbon travel"],
                  ["4", "Accessibility signals"],
                  ["100%", "Transparent recommendations"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="font-mono text-3xl font-bold text-emerald-400">{v}</div>
                    <div className="mt-1 text-xs text-sage-200">{l}</div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[11px] text-sage-300">Illustrative example figures — shown to demonstrate the experience.</p>
            </div>
            <div className="flex justify-center gap-6 rounded-xl bg-forest-900/40 p-6">
              <CircularScore value={82} label="" color="var(--color-emerald-400)" />
              <CircularScore value={94} label="" color="var(--color-sage-300)" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Trust ---------- */}
      <section id="discover" className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-near-black md:text-4xl">
            Built on trust, not hype.
          </h2>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["Verified", "Verified information", "Claims carry their evidence and confidence level."],
              ["Carbon", "Transparent calculations", "Every estimate shows its method and source."],
              ["Map", "Real-world travel data", "Grounded in operator and OpenStreetMap data."],
              ["Accessibility", "Accessibility evidence", "Access signals are sourced, never assumed."],
            ] as [IconName, string, string][]
          ).map(([icon, title, body]) => {
            const I = Icon[icon];
            return (
              <div key={title} className="rounded-xl border border-border bg-card p-5">
                <I size={22} className="text-emerald-500" />
                <h3 className="mt-3 text-base font-semibold text-near-black">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-gray">{body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card text-center elev-card">
          <img
            src="https://images.unsplash.com/photo-1524959725226-f4deb958e979?w=1200&h=500&fit=crop&auto=format"
            alt="Mist drifting over a green pine forest"
            className="absolute inset-0 h-full w-full object-cover opacity-15"
          />
          <div className="relative px-6 py-16 sm:py-20">
            <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-near-black md:text-5xl">
              Your next journey can be better.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-slate-gray">
              Plan a trip that works for you — and leaves a lighter footprint.
            </p>
            <Button size="lg" icon="AI" className="mt-8" onClick={() => go("signup")}>
              Start Planning
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-border bg-warm-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-gray">
                An AI-powered sustainable and accessible travel platform.
              </p>
              <p className="mt-4 font-mono text-xs text-medium-gray">Travel greener. Explore smarter.</p>
            </div>
            {[
              ["Product", ["Discover", "Planner", "Eco-Twin", "Accessibility"]],
              ["Company", ["About", "Impact", "Careers"]],
              ["Legal", ["Privacy", "Terms", "Contact"]],
            ].map(([title, links]) => (
              <div key={title as string}>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-medium-gray">{title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {(links as string[]).map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-slate-gray transition-colors hover:text-forest-700">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-medium-gray">
            <span>© 2026 EcoTrail. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <button onClick={() => go("presentation")} className="font-mono hover:text-forest-700">
                Presentation deck ↗
              </button>
              <button onClick={() => go("resilience")} className="font-mono hover:text-forest-700">
                Resilience ↗
              </button>
              <button onClick={() => go("handoff")} className="font-mono hover:text-forest-700">
                Developer handoff ↗
              </button>
              <button onClick={() => go("design-freeze")} className="font-mono hover:text-forest-700">
                Design freeze ↗
              </button>
              <button onClick={() => go("prototype")} className="font-mono hover:text-forest-700">
                Interactive prototype ↗
              </button>
              <button onClick={() => go("blueprint")} className="font-mono hover:text-forest-700">
                Implementation blueprint ↗
              </button>
              <button onClick={() => go("design-system")} className="font-mono hover:text-forest-700">
                Design system ↗
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
