import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, AiThinking } from "../components/ui";

type Go = (route: string) => void;
type Step = "upload" | "preview" | "details" | "processing" | "result";

const DEMONSTRATES = ["Entrance", "Ramp", "Elevator", "Accessible bathroom", "Parking", "Room access", "Other"];

type ResultKind = "verified" | "needsreview" | "insufficient" | "conflicting" | "unable";
const RESULTS: Record<ResultKind, { label: string; tone: string; icon: IconName; detected: string; uncertain: string; next: string }> = {
  verified: { label: "Verified", tone: "verified", icon: "Verified", detected: "A step-free entrance with a level threshold.", uncertain: "Door width couldn't be measured from the photo.", next: "Nothing needed — this evidence now supports the listing." },
  needsreview: { label: "Needs review", tone: "estimated", icon: "Info", detected: "A ramp is visible near the entrance.", uncertain: "The gradient and handrail can't be confirmed.", next: "We'll review it shortly, or you can add a clearer photo." },
  insufficient: { label: "Insufficient evidence", tone: "neutral", icon: "Warning", detected: "The feature isn't clearly visible.", uncertain: "The relevant area is out of frame or too dark.", next: "Try another photo showing the full feature in good light." },
  conflicting: { label: "Conflicting", tone: "warning", icon: "Warning", detected: "The photo suggests a step, but the listing says step-free.", uncertain: "Sources disagree on this feature.", next: "Add context or another angle so we can reconcile it." },
  unable: { label: "Unable to verify", tone: "neutral", icon: "Warning", detected: "We couldn't analyze this image.", uncertain: "The format or content couldn't be processed.", next: "Retry with a JPG or PNG under 10 MB." },
};

export default function PhotoVerification({ go }: { go: Go }) {
  const [step, setStep] = useState<Step>("upload");
  const [consent, setConsent] = useState(false);
  const [demo, setDemo] = useState<string>("");
  const [note, setNote] = useState("");
  const [result, setResult] = useState<ResultKind>("verified");

  return (
    <AppShell active="profile" go={go}>
      <main className="mx-auto max-w-2xl px-6 py-8">
        <button onClick={() => go("accessibility")} className="inline-flex items-center gap-1 text-sm text-medium-gray hover:text-charcoal">
          <Icon.Chevron size={15} className="rotate-180" /> Accessibility profile
        </button>
        <div className="mt-3">
          <h1 className="text-2xl font-bold tracking-tight text-near-black">Accessibility evidence</h1>
          <p className="mt-1 text-slate-gray">Submitting a photo can help verify a feature. AI assists the review — it isn't the final authority.</p>
        </div>

        {/* Stepper */}
        <StepBar step={step} />

        <div className="mt-6">
          {step === "upload" && (
            <div className="rounded-2xl border border-border bg-card p-6 elev-card">
              <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-mist bg-warm-white px-6 py-12 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sage-100 text-forest-700"><Icon.Plus size={26} /></span>
                <h3 className="mt-4 font-semibold text-near-black">Upload accessibility photo</h3>
                <p className="mt-1 text-sm text-medium-gray">Drag & drop, or choose how to add a photo.</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" icon="Plus" onClick={() => setStep("preview")}>Upload file</Button>
                  <Button variant="tertiary" icon="Location" onClick={() => setStep("preview")}>Use camera</Button>
                </div>
                <p className="mt-3 text-[11px] text-medium-gray">Supported formats: JPG, PNG · up to 10 MB</p>
              </div>

              <div className="mt-4 rounded-lg bg-soft-gray p-3 text-xs text-slate-gray">
                <span className="font-medium text-charcoal">Privacy:</span> Photos are used only to assess accessibility features. Avoid capturing people or identifying details. You can remove submitted evidence anytime.
              </div>

              <label className="mt-4 flex items-start gap-2.5 text-sm text-charcoal">
                <button
                  onClick={() => setConsent((v) => !v)}
                  role="checkbox"
                  aria-checked={consent}
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border-2 transition-colors ${consent ? "border-primary bg-primary text-white" : "border-mist"}`}
                >
                  {consent && <Icon.Check size={13} />}
                </button>
                I consent to my photo being used to assess accessibility features.
              </label>

              <Button className="mt-4 w-full" disabled={!consent} onClick={() => setStep("preview")}>Continue</Button>
            </div>
          )}

          {step === "preview" && (
            <div className="rounded-2xl border border-border bg-card p-6 elev-card">
              <h3 className="font-semibold text-near-black">Photo preview</h3>
              <div className="mt-3 grid aspect-video place-items-center overflow-hidden rounded-xl border border-border bg-sage-100 text-forest-700">
                <div className="text-center">
                  <Icon.Location size={40} className="mx-auto opacity-40" />
                  <p className="mt-2 text-xs text-medium-gray">entrance-photo.jpg · 2.4 MB</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-gray">Make sure the accessibility feature is clearly visible and well lit.</p>
              <div className="mt-4 flex gap-2">
                <Button variant="tertiary" className="flex-1" onClick={() => setStep("upload")}>Replace photo</Button>
                <Button className="flex-1" onClick={() => setStep("details")}>Looks good</Button>
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="rounded-2xl border border-border bg-card p-6 elev-card">
              <h3 className="font-semibold text-near-black">What does this photo show?</h3>
              <p className="mt-1 text-sm text-medium-gray">This helps us assess the right feature.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {DEMONSTRATES.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDemo(d)}
                    aria-pressed={demo === d}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${demo === d ? "border-forest-700 bg-sage-100 text-forest-700" : "border-border text-charcoal hover:border-emerald-400"}`}
                  >
                    {demo === d && <Icon.Check size={13} />} {d}
                  </button>
                ))}
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                aria-label="Additional context for this photo"
                placeholder="Add any helpful context (optional)"
                className="mt-4 w-full rounded-lg border border-mist bg-warm-white p-3 text-sm text-near-black placeholder:text-medium-gray focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
              <Button className="mt-4 w-full" disabled={!demo} onClick={() => setStep("processing")}>Submit for verification</Button>
            </div>
          )}

          {step === "processing" && <Processing onDone={() => setStep("result")} />}

          {step === "result" && (
            <ResultCard
              kind={result}
              demo={demo || "Entrance"}
              onChangeKind={setResult}
              onRetry={() => setStep("upload")}
              onDone={() => go("accessibility")}
            />
          )}
        </div>
      </main>
    </AppShell>
  );
}

function StepBar({ step }: { step: Step }) {
  const order: Step[] = ["upload", "preview", "details", "processing", "result"];
  const labels: Record<Step, string> = { upload: "Upload", preview: "Preview", details: "Details", processing: "Analyze", result: "Result" };
  const idx = order.indexOf(step);
  return (
    <ol className="mt-6 flex items-center gap-1.5">
      {order.map((s, i) => (
        <li key={s} className="flex flex-1 items-center gap-1.5">
          <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${i < idx ? "bg-forest-700 text-primary-foreground" : i === idx ? "border-2 border-emerald-500 text-forest-700" : "border-2 border-mist text-medium-gray"}`}>
            {i < idx ? <Icon.Check size={12} /> : i + 1}
          </span>
          <span className={`hidden text-xs sm:block ${i <= idx ? "font-medium text-charcoal" : "text-medium-gray"}`}>{labels[s]}</span>
          {i < order.length - 1 && <span className={`h-px flex-1 ${i < idx ? "bg-forest-700" : "bg-mist"}`} />}
        </li>
      ))}
    </ol>
  );
}

function Processing({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 1900);
    return () => window.clearTimeout(t);
  }, [onDone]);
  return (
    <div className="rounded-2xl border border-border bg-card p-10 text-center elev-card">
      <div className="flex justify-center"><AiThinking label="Analyzing accessibility evidence…" /></div>
      <p className="mt-4 text-sm text-medium-gray">Checking the photo against the feature you selected. This is an assistive check, not a guarantee.</p>
    </div>
  );
}

function ResultCard({ kind, demo, onChangeKind, onRetry, onDone }: { kind: ResultKind; demo: string; onChangeKind: (k: ResultKind) => void; onRetry: () => void; onDone: () => void }) {
  const r = RESULTS[kind];
  return (
    <div className="rounded-2xl border border-border bg-card p-6 elev-card">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: TONE[r.tone].bg, color: TONE[r.tone].fg }}>
          <Icon.Verified size={24} />
        </span>
        <div>
          <div className="text-xs text-medium-gray">{demo}</div>
          <div className="flex items-center gap-2"><h3 className="text-lg font-semibold text-near-black">{r.label}</h3><Badge icon={r.icon} label={r.label} tone={TONE[r.tone]} /></div>
        </div>
      </div>

      <dl className="mt-5 space-y-3">
        <ResultRow icon="Check" k="What we detected" v={r.detected} />
        <ResultRow icon="Info" k="What remains uncertain" v={r.uncertain} />
        <ResultRow icon="Route" k="What to do next" v={r.next} />
      </dl>

      <p className="mt-4 flex items-start gap-1.5 rounded-lg bg-soft-gray p-3 text-xs text-slate-gray">
        <Icon.Info size={14} className="mt-px shrink-0" /> AI verification isn't absolute. Verified evidence still reflects what could be confirmed from your photo.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button icon="Check" onClick={onDone}>Done</Button>
        <Button variant="tertiary" icon="Plus" onClick={onRetry}>Add another photo</Button>
      </div>

      {/* Demo control to preview each result state */}
      <div className="mt-5 border-t border-border pt-4">
        <div className="text-[11px] font-medium uppercase tracking-wide text-medium-gray">Preview result states</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(Object.keys(RESULTS) as ResultKind[]).map((k) => (
            <button key={k} onClick={() => onChangeKind(k)} className={`rounded-full border px-2.5 py-1 text-xs font-medium ${k === kind ? "border-forest-700 bg-sage-100 text-forest-700" : "border-border text-medium-gray hover:border-emerald-400"}`}>
              {RESULTS[k].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultRow({ icon, k, v }: { icon: IconName; k: string; v: string }) {
  const I = Icon[icon];
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-border p-3">
      <I size={16} className="mt-0.5 shrink-0 text-forest-700" />
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-medium-gray">{k}</dt>
        <dd className="mt-0.5 text-sm text-charcoal">{v}</dd>
      </div>
    </div>
  );
}
