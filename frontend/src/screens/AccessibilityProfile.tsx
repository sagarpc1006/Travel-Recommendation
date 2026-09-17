import { useState } from "react";
import AppShell from "../components/AppShell";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, Toggle } from "../components/ui";

type Go = (route: string) => void;

type Group = {
  key: string;
  title: string;
  icon: IconName;
  options: string[];
  multi?: boolean;
};

const GROUPS: Group[] = [
  { key: "mobility", title: "Mobility preferences", icon: "Walk", options: ["Minimal walking", "Frequent rest stops", "Short transfers", "No preference"] },
  { key: "stepfree", title: "Step-free access", icon: "Accessibility", options: ["Step-free required", "Step-free preferred", "Not needed"] },
  { key: "wheelchair", title: "Wheelchair requirements", icon: "Wheelchair", options: ["Wheelchair user", "Wheelchair-accessible spaces", "Space for mobility aid", "Not applicable"] },
  { key: "elevator", title: "Elevator / lift preference", icon: "Layers", options: ["Elevator required", "Elevator preferred", "No preference"] },
  { key: "bathroom", title: "Accessible bathroom", icon: "Location", options: ["Accessible bathroom required", "Grab rails helpful", "No preference"] },
  { key: "transport", title: "Accessible transport", icon: "Bus", options: ["Accessible transport required", "Assistance boarding", "No preference"] },
  { key: "visual", title: "Visual accessibility", icon: "Info", options: ["High-contrast information", "Large text", "Audio guidance", "No preference"] },
  { key: "hearing", title: "Hearing accessibility", icon: "Info", options: ["Captions / text info", "Visual alerts", "Quiet options", "No preference"] },
  { key: "cognitive", title: "Cognitive / sensory", icon: "AI", options: ["Simple, clear steps", "Low-sensory settings", "Extra time", "No preference"] },
  { key: "assistance", title: "Assistance requirements", icon: "Profile", options: ["Travelling with support person", "Service animal", "On-site assistance helpful", "No preference"] },
];

export default function AccessibilityProfile({ go }: { go: Go }) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [skip, setSkip] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState("");
  const [usePersonalize, setUsePersonalize] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function pick(g: Group, opt: string) {
    setSkip((s) => ({ ...s, [g.key]: false }));
    setSelected((sel) => {
      const cur = sel[g.key] ?? [];
      if (g.multi) return { ...sel, [g.key]: cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt] };
      return { ...sel, [g.key]: cur[0] === opt ? [] : [opt] };
    });
  }
  function preferNot(g: Group) {
    setSkip((s) => ({ ...s, [g.key]: !s[g.key] }));
    setSelected((sel) => ({ ...sel, [g.key]: [] }));
  }
  function save() {
    setSaving(true);
    window.setTimeout(() => { setSaving(false); setSaved(true); window.setTimeout(() => setSaved(false), 2600); }, 850);
  }

  return (
    <AppShell active="profile" go={go}>
      <main className="mx-auto max-w-3xl px-6 py-8">
        <button onClick={() => go("profile")} className="inline-flex items-center gap-1 text-sm text-medium-gray hover:text-charcoal">
          <Icon.Chevron size={15} className="rotate-180" /> Profile
        </button>

        <div className="mt-3">
          <h1 className="text-3xl font-bold tracking-tight text-near-black">Accessibility profile</h1>
          <p className="mt-2 text-slate-gray">Your accessibility preferences are used to personalize recommendations. Sharing anything is entirely optional.</p>
        </div>

        {/* Privacy banner */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-sage-100/60 p-4">
          <Icon.Verified size={20} className="mt-0.5 shrink-0 text-forest-700" />
          <div className="text-sm text-charcoal">
            <span className="font-semibold">Accessibility information is sensitive.</span> You control what is stored and shared. It's never exposed publicly, and you can select <span className="font-medium">"Prefer not to specify"</span> for anything.
          </div>
        </div>

        {/* Groups */}
        <div className="mt-6 space-y-4">
          {GROUPS.map((g) => {
            const I = Icon[g.icon];
            const sel = selected[g.key] ?? [];
            const skipped = skip[g.key];
            return (
              <section key={g.key} className="rounded-xl border border-border bg-card p-4 elev-card">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-near-black"><I size={16} className="text-access" /> {g.title}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.options.map((opt) => {
                    const on = sel.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => pick(g, opt)}
                        aria-pressed={on}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${on ? "border-forest-700 bg-sage-100 text-forest-700" : "border-border text-charcoal hover:border-emerald-400"}`}
                      >
                        {on && <Icon.Check size={13} />} {opt}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => preferNot(g)}
                    aria-pressed={skipped}
                    className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5 text-sm font-medium transition-colors ${skipped ? "border-slate-gray bg-soft-gray text-slate-gray" : "border-mist text-medium-gray hover:border-slate-gray"}`}
                  >
                    Prefer not to specify
                  </button>
                </div>
              </section>
            );
          })}
        </div>

        {/* Additional notes */}
        <section className="mt-4 rounded-xl border border-border bg-card p-4 elev-card">
          <h2 className="text-sm font-semibold text-near-black">Additional notes</h2>
          <p className="mt-0.5 text-xs text-medium-gray">Anything else that helps us plan comfortable trips. Optional.</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            aria-label="Additional accessibility notes"
            placeholder="e.g. I prefer aisle seating and shorter walking distances between transfers."
            className="mt-3 w-full rounded-lg border border-mist bg-warm-white p-3 text-sm text-near-black placeholder:text-medium-gray focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </section>

        {/* Photo verification link */}
        <section className="mt-4 flex items-center justify-between rounded-xl border border-border bg-card p-4 elev-card">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-near-black"><Icon.Verified size={16} className="text-verified" /> Accessibility evidence</h2>
            <p className="mt-0.5 text-xs text-medium-gray">Optionally submit photos to help verify accessibility features.</p>
          </div>
          <Button variant="secondary" size="sm" icon="Plus" onClick={() => go("verify")}>Add evidence</Button>
        </section>

        {/* Sharing control */}
        <section className="mt-4 rounded-xl border border-border bg-card p-4 elev-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-near-black">Use preferences for recommendations <Badge icon="Info" label="Sensitive" tone={TONE.estimated} /></div>
              <p className="mt-0.5 text-xs text-medium-gray">Stored privately and used only to personalize your suggestions. Turn off anytime.</p>
            </div>
            <Toggle on={usePersonalize} onClick={() => setUsePersonalize((v) => !v)} />
          </div>
        </section>

        {/* Save */}
        <div className="sticky bottom-16 z-20 mt-6 lg:bottom-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card/95 p-3 backdrop-blur elev-card">
            {saved ? (
              <span className="flex items-center gap-1.5 text-sm font-medium text-success"><Icon.Check size={16} /> Profile updated</span>
            ) : (
              <span className="text-sm text-medium-gray">Changes are saved only when you choose to.</span>
            )}
            <Button className="ml-auto" icon={saved ? "Check" : "Plus"} loading={saving} onClick={save}>{saved ? "Saved" : "Save changes"}</Button>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
