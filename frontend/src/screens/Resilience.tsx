import { useState } from "react";
import { Icon, type IconName } from "../components/icons";
import { Button, Badge, TONE, Logo, AiThinking } from "../components/ui";
import { EmptyState, ErrorState, OfflineBanner } from "../components/states";
import { EVIDENCE_META } from "../data/tripOptions";

type Go = (route: string) => void;

/* ============================================================
   Phase 8 — Resilience & edge-case gallery.
   Real-world UX validation: no-results, conflicts, failures,
   offline/sync, requirement changes, destructive actions, trust.
   Reuses established components; adds no product functionality.
   ============================================================ */

const SECTIONS: { id: string; label: string }[] = [
  { id: "scenarios", label: "Scenarios" },
  { id: "no-results", label: "No results" },
  { id: "conflicts", label: "Conflicts" },
  { id: "unknown", label: "Unknown" },
  { id: "api", label: "API failures" },
  { id: "ai", label: "AI failures" },
  { id: "verify", label: "Verification" },
  { id: "offline", label: "Offline / sync" },
  { id: "changes", label: "Requirement changes" },
  { id: "forms", label: "Form validation" },
  { id: "destructive", label: "Destructive" },
  { id: "trust", label: "Trust & evidence" },
  { id: "recovery", label: "Recovery map" },
  { id: "mobile", label: "Mobile edge cases" },
  { id: "audit", label: "UX audit" },
];

export default function Resilience({ go }: { go: Go }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-warm-white text-near-black">
      <header className="sticky top-0 z-40 border-b border-border bg-warm-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <button onClick={() => go("landing")} className="flex items-center gap-2" aria-label="EcoTrail home">
            <Logo size="sm" />
            <span className="hidden text-xs font-medium text-medium-gray sm:inline">Resilience &amp; edge cases</span>
          </button>
          <nav className="hidden items-center gap-1 overflow-x-auto lg:flex">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-slate-gray transition-colors hover:bg-soft-gray hover:text-charcoal">{s.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen((v) => !v)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-gray hover:bg-soft-gray lg:hidden" aria-label="Sections">
              <Icon.Sliders size={18} />
            </button>
            <Button size="sm" variant="tertiary" icon="Chevron" onClick={() => go("presentation")}>Deck</Button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
            <div className="flex flex-wrap gap-1.5">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="rounded-md bg-soft-gray px-2.5 py-1 text-xs font-medium text-charcoal">{s.label}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* Intro */}
        <section className="pt-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-forest-700"><Icon.Verified size={13} /> Phase 8 · Real-world UX validation</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-near-black md:text-4xl">Resilient by design</h1>
          <p className="mt-2 max-w-2xl text-slate-gray">Good travel technology doesn't hide uncertainty — it helps travelers understand it, make informed choices, and stay in control. These are the states EcoTrail shows when things are missing, uncertain, or failing.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[["LIVE", "verified"], ["ESTIMATED", "estimated"], ["DEMO", "ai"], ["CACHED", "neutral"], ["UNAVAILABLE", "warning"]].map(([l, t]) => (
              <Badge key={l} icon="Info" label={l} tone={TONE[t] ?? TONE.neutral} />
            ))}
          </div>
        </section>

        {/* 01 Scenarios */}
        <Frame id="scenarios" n="01" title="Real-world scenarios" sub="Five travelers, five priorities — the product must serve each honestly.">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Compass", "General traveler", "Destination, budget, dates, comfort, sustainable option.", "Always answers: what's happening, what are my options, what next."],
              ["Accessibility", "Accessibility-focused", "Step-free, accessible transport & stay.", "Requirements stay visible; never re-enter the same information."],
              ["Money", "Budget-constrained", "A strict budget.", "Shows in-budget, slightly-over, and trade-offs — no fake fit."],
              ["Leaf", "Sustainability-first", "Lowest impact.", "Estimated CO₂e & comparison; never claims 'zero carbon'."],
              ["Clock", "Convenience-first", "Shortest time, fewest transfers.", "Shows faster vs lower-impact; respects the user's choice."],
            ].map(([ic, t, want, principle]) => {
              const I = Icon[ic as IconName];
              return (
                <div key={t} className="rounded-2xl border border-border bg-card p-5 elev-card">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-sage-100 text-forest-700"><I size={20} /></span>
                  <h3 className="mt-3 font-semibold text-near-black">{t}</h3>
                  <p className="mt-1 text-sm text-slate-gray">{want}</p>
                  <p className="mt-3 flex items-start gap-1.5 border-t border-border pt-3 text-xs text-charcoal"><Icon.Check size={13} className="mt-0.5 shrink-0 text-success" /> {principle}</p>
                </div>
              );
            })}
          </div>
        </Frame>

        {/* 02 No results */}
        <Frame id="no-results" n="02" title="No-result experience" sub="Say what couldn't be found — then what to do next. Never a fake recommendation.">
          <div className="grid gap-4 lg:grid-cols-2">
            <EmptyState icon="Search" title="No option meets all your requirements" body="No trip currently matches your budget, dates and accessibility needs together." action="Adjust requirements" onAction={() => go("planner")} />
            <div className="rounded-xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">Useful alternatives</h3>
              <p className="mt-1 text-sm text-slate-gray">Instead of a dead end, offer concrete next steps:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Increase budget", "Relax accessibility requirement", "Change travel date", "Try another transport mode", "Explore nearby options"].map((a) => (
                  <span key={a} className="rounded-full border border-border bg-warm-white px-3 py-1.5 text-sm text-charcoal">{a}</span>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-medium-gray sm:grid-cols-4">
                {["No transport", "No accommodation", "No accessible option", "No Eco-Twin"].map((c) => (
                  <span key={c} className="flex items-center gap-1.5 rounded-lg bg-soft-gray px-2.5 py-2"><Icon.Info size={12} /> {c}</span>
                ))}
              </div>
            </div>
          </div>
        </Frame>

        {/* 03 Conflicts */}
        <Frame id="conflicts" n="03" title="Conflicting data" sub="When sources disagree, show all of them — never pick one silently.">
          <div className="rounded-2xl border border-warning/40 bg-warning-soft/40 p-5">
            <div className="flex items-center gap-2"><Icon.Warning size={18} className="text-warning" /><h3 className="font-semibold text-near-black">Accessibility information conflicts</h3></div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                ["Business declared", "Step-free entrance", "business"],
                ["OSM data", "No accessibility information", "unknown"],
                ["Photo evidence", "Needs review", "needsreview"],
              ].map(([src, claim, ev]) => {
                const m = EVIDENCE_META[ev as keyof typeof EVIDENCE_META];
                return (
                  <div key={src} className="rounded-xl border border-border bg-card p-4">
                    <div className="text-xs uppercase tracking-wide text-medium-gray">{src}</div>
                    <p className="mt-1 text-sm font-medium text-charcoal">"{claim}"</p>
                    <div className="mt-2"><Badge icon={m.icon} label={m.label} tone={TONE[m.tone] ?? TONE.neutral} /></div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-slate-gray"><span className="font-medium text-charcoal">What remains uncertain:</span> whether the entrance is genuinely step-free for the full path of travel.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button icon="Verified" onClick={() => go("verify")}>Review evidence</Button>
              <Button variant="tertiary" icon="Info">Continue with caution</Button>
            </div>
          </div>
        </Frame>

        {/* 04 Unknown */}
        <Frame id="unknown" n="04" title="Unknown data" sub="Unknown is not 'probably accessible' — and never styled green.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <div className="flex items-center justify-between">
                <span className="font-medium text-charcoal">Wheelchair-accessible bathroom</span>
                <Badge icon={EVIDENCE_META.unknown.icon} label={EVIDENCE_META.unknown.label} tone={TONE.neutral} />
              </div>
              <p className="mt-2 text-sm text-slate-gray">We couldn't confirm this requirement from available sources.</p>
            </div>
            <div className="rounded-2xl border border-dashed border-mist bg-card/60 p-5">
              <h3 className="text-sm font-semibold text-near-black">The rule</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-gray">
                <li className="flex items-center gap-2"><Icon.Close size={13} className="text-error" /> No "Probably accessible"</li>
                <li className="flex items-center gap-2"><Icon.Close size={13} className="text-error" /> No green/success styling for Unknown</li>
                <li className="flex items-center gap-2"><Icon.Check size={13} className="text-success" /> Neutral tone + clear explanation</li>
              </ul>
            </div>
          </div>
        </Frame>

        {/* 05 API failures */}
        <Frame id="api" n="05" title="API failures" sub="One service failing should never take down the product.">
          <div className="grid gap-4 lg:grid-cols-2">
            <ErrorState title="We couldn't load current weather" body="Your saved itinerary is still available. We'll try again automatically." onRetry={() => {}} onContinue={() => {}} />
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">Carbon estimate unavailable</h3>
              <p className="mt-1 text-sm text-slate-gray">We don't have a reliable emission factor for this segment.</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="rounded-lg bg-soft-gray px-3 py-2 text-center">
                  <div className="font-mono text-lg font-bold text-slate-gray">— kg</div>
                  <div className="text-[11px] text-medium-gray">Unavailable</div>
                </div>
                <Icon.Close size={16} className="text-medium-gray" />
                <div className="rounded-lg bg-soft-gray px-3 py-2 text-center opacity-60">
                  <div className="font-mono text-lg font-bold text-charcoal">0 kg</div>
                  <div className="text-[11px] text-medium-gray">Not the same as zero</div>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-medium-gray"><Icon.Info size={13} /> We never substitute a made-up number or show 0 kg for missing data.</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-medium-gray">
                {["Map unavailable", "Travel data unavailable", "Accessibility data unavailable"].map((c) => (
                  <span key={c} className="rounded-full bg-soft-gray px-2.5 py-1">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </Frame>

        {/* 06 AI failures */}
        <Frame id="ai" n="06" title="AI failures & ambiguity" sub="AI is never a single point of failure — a manual path always remains.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-ai-border bg-ai-soft/40 p-5">
              <div className="flex items-center gap-2"><Icon.AI size={18} className="text-ai" /><h3 className="font-semibold text-near-black">I couldn't understand that trip request</h3></div>
              <p className="mt-2 text-sm text-slate-gray">Try something like:</p>
              <p className="mt-1.5 rounded-lg bg-card p-3 text-sm text-charcoal">"Plan a 3-day accessible trip from Pune to Goa under ₹15,000."</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button icon="AI">Try again</Button>
                <Button variant="tertiary" icon="Route" onClick={() => go("planner")}>Use the planner instead</Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-medium-gray">
                {["AI unavailable", "Timeout", "Malformed response", "Too vague"].map((c) => <span key={c} className="rounded-full bg-card px-2.5 py-1">{c}</span>)}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">Progressive clarification</h3>
              <p className="mt-1 text-sm text-slate-gray">For "Plan me a cheap trip to Goa," ask only what's essential — one at a time, not ten at once.</p>
              <ol className="mt-3 space-y-2">
                {["When are you traveling?", "How many travelers?", "Approximate budget?"].map((q, i) => (
                  <li key={q} className="flex items-center gap-2.5 rounded-lg border border-border bg-warm-white px-3 py-2 text-sm text-charcoal">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-sage-100 text-[11px] font-semibold text-forest-700">{i + 1}</span> {q}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Frame>

        {/* 07 Verification */}
        <Frame id="verify" n="07" title="Accessibility verification failure" sub="Uploads that can't be confirmed never mark a place accessible.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft-gray text-slate-gray"><Icon.Warning size={22} /></span>
                <div>
                  <h3 className="font-semibold text-near-black">Unable to verify</h3>
                  <Badge icon="Warning" label="Not verified" tone={TONE.neutral} />
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-gray">The entrance is visible, but the full path to the entrance cannot be confirmed.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button icon="Plus" onClick={() => go("verify")}>Upload another photo</Button>
                <Button variant="tertiary">Continue without verification</Button>
                <Button variant="ghost" onClick={() => go("accessibility")}>Review requirements</Button>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 elev-card">
              <h3 className="font-semibold text-near-black">Photo quality issues</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {["Blurry image", "Too dark", "Wrong subject", "Partial evidence", "Conflicting photos", "Insufficient context"].map((c) => (
                  <li key={c} className="flex items-center gap-2 rounded-lg bg-soft-gray px-3 py-2 text-sm text-charcoal"><Icon.Info size={13} className="text-medium-gray" /> {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </Frame>

        {/* 08 Offline / sync */}
        <Frame id="offline" n="08" title="Offline & sync" sub="Cached trips stay usable; changes sync when the connection returns.">
          <div className="overflow-hidden rounded-2xl border border-border bg-card elev-card">
            <OfflineBanner state="offline" />
            <OfflineBanner state="syncing" />
            <OfflineBanner state="synced" />
            <div className="flex flex-wrap items-center gap-2 px-6 py-4 text-sm text-slate-gray">
              {["Online", "Offline", "Cached trip in use", "Reconnected", "Syncing", "Up to date"].map((s, i, a) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-full bg-soft-gray px-2.5 py-1 text-xs font-medium text-charcoal">{s}</span>
                  {i < a.length - 1 && <Icon.Chevron size={13} className="text-emerald-500" />}
                </span>
              ))}
            </div>
          </div>
        </Frame>

        {/* 09 Requirement changes */}
        <Frame id="changes" n="09" title="Requirement & score changes" sub="Stale recommendations are never kept silently.">
          <RequirementChangeDemo />
        </Frame>

        {/* 10 Form validation */}
        <Frame id="forms" n="10" title="Form validation" sub="Plain-language guidance, right next to the field.">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldError label="Email" value="aditi@" msg="This email address looks incomplete." />
            <FieldError label="Budget (₹)" value="-500" msg="Enter a budget greater than zero." />
            <FieldError label="Travel dates" value="12 Sep 2024" msg="This date is in the past — pick an upcoming date." />
            <FieldError label="Destination" value="" msg="Add a destination to continue." />
          </div>
          <p className="mt-3 text-xs text-medium-gray">Edge cases handled: same-day & multi-day trips, missing return date, far-future dates, one traveler vs. large groups, invalid ranges.</p>
        </Frame>

        {/* 11 Destructive */}
        <Frame id="destructive" n="11" title="Destructive actions" sub="Clear, specific confirmations — never a vague 'Are you sure?'">
          <div className="mx-auto max-w-md rounded-2xl border border-error/30 bg-card p-6 elev-raised">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-error-soft text-error"><Icon.Warning size={24} /></span>
            <h3 className="mt-4 text-lg font-semibold text-near-black">Delete this trip?</h3>
            <p className="mt-1 text-sm text-slate-gray">"Pune → Goa, 12–14 Oct" will be permanently removed. This cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="tertiary">Cancel</Button>
              <Button variant="destructive" icon="Close">Delete trip</Button>
            </div>
            <p className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-medium-gray"><Icon.Info size={13} /> Same pattern for removing evidence, saved destinations, and logout with unsaved changes.</p>
          </div>
        </Frame>

        {/* 12 Trust */}
        <Frame id="trust" n="12" title="Trust & evidence" sub="Every claim shows where it came from; uncertain never looks authoritative.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(EVIDENCE_META) as (keyof typeof EVIDENCE_META)[]).map((k) => {
              const m = EVIDENCE_META[k];
              return (
                <div key={k} className="rounded-xl border border-border bg-card p-4 elev-subtle">
                  <Badge icon={m.icon} label={m.label} tone={TONE[m.tone] ?? TONE.neutral} />
                  <p className="mt-2 text-xs text-slate-gray">{m.explain}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-2xl border border-carbon/30 bg-carbon-soft/50 p-5">
            <div className="flex items-center gap-2"><Icon.Carbon size={18} className="text-carbon" /><h3 className="font-semibold text-near-black">Carbon is always "estimated"</h3></div>
            <p className="mt-2 text-sm text-slate-gray">Scoped accessibility, too: "Step-free entrance — Verified", "Accessible bathroom — Unknown", "Elevator — Business declared." We avoid blanket "Fully accessible" without evidence for the specific requirement.</p>
          </div>
        </Frame>

        {/* 13 Recovery map */}
        <Frame id="recovery" n="13" title="Failure-recovery map" sub="Every branch has an honest, recoverable path.">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Check", "Normal flow", "Data available → recommendation → itinerary", "verified"],
              ["Warning", "Data unavailable", "Explain → retry or continue with saved info", "warning"],
              ["AI", "AI unavailable", "Fall back to the manual planner", "ai"],
              ["Info", "Accessibility unknown", "Show uncertainty → the user decides", "neutral"],
              ["Warning", "Conflicting data", "Show sources → review evidence", "estimated"],
              ["Route", "Offline", "Cached experience → sync later", "access"],
            ].map(([ic, t, d, tone]) => (
              <div key={t as string} className="rounded-xl border border-border bg-card p-4 elev-subtle">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium" style={{ color: (TONE[tone as string] ?? TONE.neutral).fg, background: (TONE[tone as string] ?? TONE.neutral).bg }}>
                  {(() => { const I = Icon[ic as IconName]; return <I size={13} />; })()} {t as string}
                </span>
                <p className="mt-2 text-sm text-charcoal">{d as string}</p>
              </div>
            ))}
          </div>
        </Frame>

        {/* 14 Mobile edge cases */}
        <Frame id="mobile" n="14" title="Mobile edge cases" sub="Long content and many badges must wrap — never overflow or clip.">
          <div className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-4 elev-card">
            <h3 className="font-semibold text-near-black">Kunjapanai Estate Heritage Homestay &amp; Wellness Retreat, Coonoor</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(["verified", "supported", "needsreview", "ai", "unknown", "conflicting"] as const).map((k) => (
                <Badge key={k} icon={EVIDENCE_META[k].icon} label={EVIDENCE_META[k].label} tone={TONE[EVIDENCE_META[k].tone] ?? TONE.neutral} />
              ))}
            </div>
            <p className="mt-3 break-words text-sm text-slate-gray">This accommodation reports a step-free entrance and an accessible ground-floor bathroom; the path from the parking area to the lobby could not be fully confirmed from available sources.</p>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-xs text-medium-gray">Estimated CO₂e</span>
              <span className="font-mono text-lg font-bold text-carbon">1,284,560 kg</span>
            </div>
            <Button className="mt-3 w-full" icon="Calendar">Save this trip</Button>
          </div>
          <p className="mt-3 text-center text-xs text-medium-gray">No horizontal overflow · no clipped text · primary action always reachable.</p>
        </Frame>

        {/* Final UX audit */}
        <Frame id="audit" n="15" title="Final UX audit" sub="Four questions every screen must answer.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Location", "Where am I?"],
              ["Info", "What matters?"],
              ["Route", "What can I do next?"],
              ["Verified", "Can I trust this?"],
            ].map(([ic, q]) => {
              const I = Icon[ic as IconName];
              return (
                <div key={q} className="rounded-2xl border border-border bg-card p-5 text-center elev-card">
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-sage-100 text-forest-700"><I size={22} /></span>
                  <p className="mt-3 font-semibold text-near-black">{q}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl border border-forest-700 bg-gradient-to-br from-forest-800 to-forest-600 p-8 text-center text-primary-foreground">
            <p className="mx-auto max-w-2xl text-lg">EcoTrail should not only work when everything goes perfectly. It should remain trustworthy when information is incomplete, services fail, requirements change, or evidence is uncertain.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button variant="secondary" icon="Route" onClick={() => go("landing")}>Start the prototype</Button>
              <Button variant="ghost" icon="Compass" onClick={() => go("presentation")}>Presentation deck</Button>
            </div>
          </div>
        </Frame>
      </main>
    </div>
  );
}

/* ---- Frame wrapper ---- */
function Frame({ id, n, title, sub, children }: { id: string; n: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 pt-14">
      <div className="mb-5">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-emerald-500">{n}</span>
          <h2 className="text-2xl font-bold tracking-tight text-near-black">{title}</h2>
        </div>
        <p className="mt-1 text-slate-gray">{sub}</p>
      </div>
      {children}
    </section>
  );
}

/* ---- Interactive requirement-change demo ---- */
function RequirementChangeDemo() {
  const [phase, setPhase] = useState<"before" | "updating" | "after">("before");
  const change = () => {
    setPhase("updating");
    window.setTimeout(() => setPhase("after"), 1200);
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-6 elev-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-medium-gray">Budget</div>
          <div className="font-mono text-lg font-semibold text-charcoal">
            {phase === "before" ? "₹10,000" : "₹7,000"}
          </div>
        </div>
        {phase !== "updating" && (
          <Button size="sm" variant={phase === "after" ? "tertiary" : "secondary"} icon="Sliders" onClick={() => (phase === "after" ? setPhase("before") : change())}>
            {phase === "after" ? "Reset demo" : "Lower budget to ₹7,000"}
          </Button>
        )}
      </div>

      <div className="mt-5 border-t border-border pt-5">
        {phase === "before" && <p className="text-sm text-slate-gray">Change a requirement above to see how EcoTrail responds — it recalculates rather than keeping stale results.</p>}
        {phase === "updating" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-charcoal"><Icon.Info size={15} className="text-info" /> Your requirements changed.</div>
            <AiThinking label="Updating recommendations & score…" />
          </div>
        )}
        {phase === "after" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-success"><Icon.Check size={15} /> Recommendations and Green &amp; Accessible Score updated for your new budget.</div>
            <div className="grid gap-2 sm:grid-cols-3">
              {[["Ranking", "Re-ordered"], ["Recommendation", "Explanation refreshed"], ["Eco-Twin", "Re-compared"]].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-soft-gray p-3">
                  <div className="text-[11px] text-medium-gray">{k}</div>
                  <div className="text-sm font-medium text-charcoal">{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-medium-gray"><Icon.Info size={13} /> Also applies to accessibility, dates, traveler count and priority changes.</p>
    </div>
  );
}

/* ---- Field-level validation demo ---- */
function FieldError({ label, value, msg }: { label: string; value: string; msg: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-charcoal">{label}</label>
      <input
        readOnly
        value={value}
        placeholder="—"
        aria-invalid
        aria-describedby={`${label}-err`}
        className="mt-1.5 w-full rounded-lg border border-error bg-error-soft/40 px-3 py-2 text-sm text-near-black focus:outline-none focus:ring-2 focus:ring-error/30"
      />
      <p id={`${label}-err`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-error"><Icon.Warning size={13} /> {msg}</p>
    </div>
  );
}
