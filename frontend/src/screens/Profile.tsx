import { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, Toggle } from "../components/ui";
import { TRIPS, INSIGHTS } from "../data/trips";
import { useAuth } from "../context/AuthContext";
import { getUserPreferences } from "../services/tripAPI";

type Go = (route: string) => void;

export default function Profile({ go }: { go: Go }) {
  const { user, profile, logout } = useAuth();

  const displayName = user?.displayName || profile?.name || (user?.email ? user.email.split('@')[0] : 'Eco Traveler');
  const displayEmail = user?.email || profile?.email || 'traveler@ecotrail.test';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'ET';

  const [prefs, setPrefs] = useState({
    aiPersonalization: true,
    accessForRecs: true,
    accessForVerification: false,
    shareActivity: false,
    notifTrips: true,
    notifEco: true,
  });

  const [travelPreferences, setTravelPreferences] = useState({
    style: "Nature & culture",
    budget: "Moderate",
    convenience: "Balanced",
    sustainability: "High priority",
  });

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getUserPreferences()
      .then((p: any) => {
        if (isMounted && p) {
          setTravelPreferences({
            style: p.transportPreference || "Nature & culture",
            budget: p.budget || "Moderate",
            convenience: p.accessibility ? "Accessibility aware" : "Balanced",
            sustainability: p.ecoPriority ? `${p.ecoPriority} priority` : "High priority",
          });
        }
      })
      .catch((e) => {
        console.debug("User preferences fallback:", e);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const toggle = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));
  function flash(m: string) {
    setToast(m);
    window.setTimeout(() => setToast(null), 2200);
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout error:", e);
    }
    go("login");
  };

  return (
    <AppShell active="profile" go={go}>
      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-sage-200 text-xl font-semibold text-forest-700">
            {initials}
          </span>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-near-black">{displayName}</h1>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-gray">
              <span className="flex items-center gap-1">
                <Icon.Profile size={14} /> {displayEmail}
              </span>
              <Badge icon="Verified" label="Authenticated session" tone={TONE.verified} />
            </div>
          </div>
          <Button variant="tertiary" icon="Sliders" onClick={() => flash("Edit profile preferences updated.")}>
            Edit profile
          </Button>
        </div>

        {/* Travel history stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            [String(TRIPS.length), "Trips", "Calendar"],
            [`${INSIGHTS.lifetimeAvoidedKg} kg`, "CO₂e avoided", "Leaf"],
            [String(INSIGHTS.sustainableChoices), "Green choices", "Route"],
          ].map(([v, l, ic]) => {
            const I = Icon[ic as IconName];
            return (
              <div key={l} className="rounded-xl border border-border bg-card p-4 text-center elev-card">
                <I size={18} className="mx-auto text-emerald-500" />
                <div className="mt-1.5 font-mono text-xl font-bold text-near-black">{v}</div>
                <div className="text-[11px] text-medium-gray">{l}</div>
              </div>
            );
          })}
        </div>

        {/* Travel preferences */}
        <Section title="Travel preferences" icon="Sliders">
          <div className="grid gap-3 sm:grid-cols-2">
            <PrefPill label="Travel style" value={travelPreferences.style} />
            <PrefPill label="Budget" value={travelPreferences.budget} />
            <PrefPill label="Convenience" value={travelPreferences.convenience} />
            <PrefPill label="Sustainability" value={travelPreferences.sustainability} />
          </div>
          <Button variant="tertiary" size="sm" className="mt-3" icon="Sliders" onClick={() => go("onboarding")}>
            Update preferences
          </Button>
        </Section>

        {/* Accessibility */}
        <Section title="Accessibility" icon="Accessibility">
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div>
              <div className="text-sm font-medium text-near-black">Accessibility profile</div>
              <p className="mt-0.5 text-xs text-medium-gray">Define needs that personalize recommendations. You control what's stored.</p>
              <div className="mt-2"><Badge icon="Info" label="Partially completed" tone={TONE.estimated} /></div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => go("accessibility")}>Manage</Button>
          </div>
        </Section>

        {/* AI personalization + privacy */}
        <Section title="AI & personalization" icon="AI">
          <ToggleRow label="AI personalization" body="Let AI tailor recommendations and explanations to your preferences." on={prefs.aiPersonalization} onToggle={() => toggle("aiPersonalization")} />
          <p className="mt-2 flex items-start gap-1.5 px-1 text-xs text-medium-gray"><Icon.Info size={13} className="mt-px shrink-0" /> AI helps explain and personalize — it's never the source for schedules, prices, carbon factors or accessibility verification.</p>
        </Section>

        {/* Privacy & data control */}
        <Section title="Privacy & data control" icon="Verified">
          <p className="mb-3 rounded-lg bg-soft-gray p-3 text-xs text-slate-gray">Accessibility information is sensitive. You control what is stored and shared.</p>
          <ToggleRow label="Use accessibility preferences for recommendations" body="Stored privately and used to personalize suggestions." on={prefs.accessForRecs} onToggle={() => toggle("accessForRecs")} sensitive />
          <ToggleRow label="Allow accessibility evidence to be used for verification" body="Only evidence you submit is used, and only to confirm accessibility." on={prefs.accessForVerification} onToggle={() => toggle("accessForVerification")} sensitive />
          <ToggleRow label="Share trip activity" body="Share anonymized eco-impact stats. Never includes accessibility disclosures." on={prefs.shareActivity} onToggle={() => toggle("shareActivity")} />
        </Section>

        {/* Notifications */}
        <Section title="Notifications" icon="Notification">
          <ToggleRow label="Trip updates" body="Reminders, changes and travel-day info." on={prefs.notifTrips} onToggle={() => toggle("notifTrips")} />
          <ToggleRow label="Eco insights" body="Occasional summaries of your travel impact." on={prefs.notifEco} onToggle={() => toggle("notifEco")} />
        </Section>

        {/* Account */}
        <Section title="Account" icon="Settings">
          <div className="divide-y divide-border rounded-xl border border-border">
            {[
              ["Security", "Password & sign-in", "Verified"],
              ["Connected services", "Firebase authentication", "Check"],
              ["Language & appearance", "English · Light theme", "Settings"],
            ].map(([t, s, ic]) => {
              const I = Icon[ic as IconName];
              return (
                <button key={t} onClick={() => flash(`${t} settings active.`)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-soft-gray">
                  <I size={17} className="text-slate-gray" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-near-black">{t}</div>
                    <div className="text-xs text-medium-gray">{s}</div>
                  </div>
                  <Icon.Chevron size={16} className="text-medium-gray" />
                </button>
              );
            })}
          </div>
          <Button variant="tertiary" className="mt-4" icon="Close" onClick={handleLogout}>
            Log out
          </Button>
        </Section>
      </main>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 lg:bottom-8" role="status">
          <div className="flex items-center gap-2 rounded-full bg-near-black px-4 py-2.5 text-sm font-medium text-warm-white elev-modal">
            <Icon.Check size={16} className="text-emerald-400" /> {toast}
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Section({ title, icon, children }: { title: string; icon: IconName; children: React.ReactNode }) {
  const I = Icon[icon];
  return (
    <section className="mt-6 rounded-2xl border border-border bg-card p-5 elev-card">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-near-black"><I size={18} className="text-forest-700" /> {title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function PrefPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-warm-white p-3">
      <div className="text-[11px] text-medium-gray">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-charcoal">{value}</div>
    </div>
  );
}

function ToggleRow({ label, body, on, onToggle, sensitive }: { label: string; body: string; on: boolean; onToggle: () => void; sensitive?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border py-3 last:border-0">
      <div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-near-black">
          {label}
          {sensitive && <Badge icon="Info" label="Sensitive" tone={TONE.estimated} />}
        </div>
        <p className="mt-0.5 text-xs text-medium-gray">{body}</p>
      </div>
      <Toggle on={on} onClick={onToggle} />
    </div>
  );
}
