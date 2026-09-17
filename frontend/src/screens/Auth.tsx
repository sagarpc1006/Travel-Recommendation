import { useState } from "react";
import { Icon } from "../components/icons";
import { Button, Field, inputBase, Logo, Badge, TONE } from "../components/ui";

type Go = (route: string) => void;
type Mode = "login" | "signup" | "forgot" | "sent" | "verify";

/* Split-panel shell: brand story on the left, form on the right */
function AuthShell({
  go,
  children,
}: {
  go: Go;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-forest-800 lg:block">
        <img
          src="https://images.unsplash.com/photo-1761432325952-004375921fbb?w=900&h=1200&fit=crop&auto=format"
          alt="A train travelling through a lush green forest toward mountains"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/40 to-forest-800/60" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <button onClick={() => go("landing")} className="w-fit">
            <span className="flex items-center gap-2.5 text-primary-foreground">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-foreground/15">
                <Icon.Leaf size={18} />
              </span>
              <span className="text-[15px] font-semibold">EcoTrail</span>
              <span className="font-mono text-[11px] text-emerald-400">2.0</span>
            </span>
          </button>
          <div>
            <h2 className="max-w-sm text-3xl font-semibold leading-tight text-primary-foreground">
              Travel greener. Explore smarter.
            </h2>
            <p className="mt-3 max-w-sm leading-relaxed text-sage-200">
              Plan trips around what matters to you — with recommendations you can actually trust.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge icon="Carbon" label="Carbon-aware" tone={TONE.verified} />
              <Badge icon="Accessibility" label="Accessible" tone={TONE.access} />
              <Badge icon="AI" label="AI-powered" tone={TONE.ai} />
            </div>
          </div>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-6 py-5 lg:hidden">
          <button onClick={() => go("landing")}><Logo /></button>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </main>
    </div>
  );
}

function GoogleButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-card text-sm font-medium text-charcoal transition-colors hover:bg-soft-gray focus:outline-none focus:ring-2 focus:ring-ring/60"
    >
      <svg width="17" height="17" viewBox="0 0 18 18" aria-hidden="true">
        <path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.5h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.6Z" />
        <path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18Z" />
        <path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8l3-2.3Z" />
        <path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6Z" />
      </svg>
      {label}
    </button>
  );
}

function pwStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s; // 0..4
}

export default function Auth({ initial, go }: { initial: Mode; go: Go }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agree, setAgree] = useState(false);
  const [resending, setResending] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const strength = pwStrength(pw);

  function fakeAsync(label: string, done: () => void, ms = 1300) {
    setError(null);
    setLoading(label);
    setTimeout(() => {
      setLoading(null);
      done();
    }, ms);
  }

  /* ---------- LOGIN ---------- */
  if (mode === "login") {
    return (
      <AuthShell go={go}>
        <h1 className="text-2xl font-semibold tracking-tight text-near-black">Welcome back</h1>
        <p className="mt-1.5 text-sm text-slate-gray">Log in to keep planning smarter journeys.</p>

        <form
          className="mt-7 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!emailValid) return setError("Enter a valid email address.");
            fakeAsync("Signing you in…", () => go("onboarding"));
          }}
        >
          <Field label="Email" state={error ? "error" : undefined}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputBase} ${error ? "border-error focus:ring-error/40" : "border-border"}`}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Field>
          <Field label="Password">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className={`${inputBase} border-border pr-10`}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-medium-gray hover:bg-soft-gray"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <Icon.Close size={16} /> : <Icon.Search size={16} />}
              </button>
            </div>
          </Field>
          <div className="flex justify-end">
            <button type="button" onClick={() => setMode("forgot")} className="text-sm font-medium text-emerald-500 hover:underline">
              Forgot password?
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-error-soft px-3 py-2.5 text-sm text-error">
              <Icon.Warning size={16} /> {error}
            </div>
          )}
          <Button type="submit" className="w-full" size="lg" loading={loading === "Signing you in…"}>
            {loading === "Signing you in…" ? loading : "Log In"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-medium-gray">
          <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
        </div>
        <GoogleButton label="Continue with Google" onClick={() => fakeAsync("Signing you in…", () => go("onboarding"))} />

        <p className="mt-7 text-center text-sm text-slate-gray">
          Don't have an account?{" "}
          <button onClick={() => { setMode("signup"); setError(null); }} className="font-medium text-emerald-500 hover:underline">
            Create one
          </button>
        </p>
      </AuthShell>
    );
  }

  /* ---------- SIGN UP ---------- */
  if (mode === "signup") {
    const mismatch = pw2.length > 0 && pw !== pw2;
    const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["var(--color-error)", "var(--color-error)", "var(--color-warning)", "var(--color-emerald-500)", "var(--color-success)"];
    return (
      <AuthShell go={go}>
        <h1 className="text-2xl font-semibold tracking-tight text-near-black">Create your EcoTrail account</h1>
        <p className="mt-1.5 text-sm text-slate-gray">Start planning greener trips in a few taps.</p>

        <form
          className="mt-7 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!emailValid) return setError("Enter a valid email address.");
            if (strength < 2) return setError("Please choose a stronger password.");
            if (mismatch) return setError("Passwords don't match.");
            if (!agree) return setError("Please accept the terms to continue.");
            fakeAsync("Creating your account…", () => setMode("verify"));
          }}
        >
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputBase} border-border`}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Field>
          <Field label="Password">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className={`${inputBase} border-border pr-10`}
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-medium-gray hover:bg-soft-gray"
                aria-label="Toggle password visibility"
              >
                {showPw ? <Icon.Close size={16} /> : <Icon.Search size={16} />}
              </button>
            </div>
            {pw.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="h-1 flex-1 rounded-full"
                      style={{ background: i < strength ? strengthColors[strength] : "var(--color-mist)" }}
                    />
                  ))}
                </div>
                <span className="mt-1 block text-xs" style={{ color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
          </Field>
          <Field label="Confirm password" hint={mismatch ? "Passwords don't match" : undefined} state={mismatch ? "error" : undefined}>
            <input
              type={showPw ? "text" : "password"}
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              className={`${inputBase} ${mismatch ? "border-error focus:ring-error/40" : "border-border"}`}
              placeholder="Re-enter password"
              autoComplete="new-password"
            />
          </Field>

          <button type="button" onClick={() => setAgree((v) => !v)} className="flex items-start gap-2.5 text-left text-sm text-slate-gray">
            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border-2 transition-colors ${agree ? "border-primary bg-primary text-white" : "border-mist"}`}>
              {agree && <Icon.Check size={13} />}
            </span>
            <span>
              I agree to EcoTrail's <a href="#" className="text-emerald-500 hover:underline">Terms</a> and{" "}
              <a href="#" className="text-emerald-500 hover:underline">Privacy Policy</a>.
            </span>
          </button>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-error-soft px-3 py-2.5 text-sm text-error">
              <Icon.Warning size={16} /> {error}
            </div>
          )}
          <Button type="submit" className="w-full" size="lg" loading={loading === "Creating your account…"}>
            {loading === "Creating your account…" ? loading : "Create Account"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-medium-gray">
          <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
        </div>
        <GoogleButton label="Continue with Google" onClick={() => fakeAsync("Creating your account…", () => go("onboarding"))} />

        <p className="mt-7 text-center text-sm text-slate-gray">
          Already have an account?{" "}
          <button onClick={() => { setMode("login"); setError(null); }} className="font-medium text-emerald-500 hover:underline">
            Log in
          </button>
        </p>
      </AuthShell>
    );
  }

  /* ---------- FORGOT PASSWORD ---------- */
  if (mode === "forgot") {
    return (
      <AuthShell go={go}>
        <button onClick={() => setMode("login")} className="mb-6 inline-flex items-center gap-1.5 text-sm text-medium-gray hover:text-forest-700">
          <Icon.Chevron size={14} className="rotate-180" /> Back to login
        </button>
        <h1 className="text-2xl font-semibold tracking-tight text-near-black">Reset your password</h1>
        <p className="mt-1.5 text-sm text-slate-gray">Enter your email and we'll send you a reset link.</p>

        <form
          className="mt-7 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!emailValid) return setError("Enter a valid email address.");
            fakeAsync("Sending reset link…", () => setMode("sent"));
          }}
        >
          <Field label="Email" hint={error ?? undefined} state={error ? "error" : undefined}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputBase} ${error ? "border-error focus:ring-error/40" : "border-border"}`}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Field>
          <Button type="submit" className="w-full" size="lg" loading={loading === "Sending reset link…"}>
            {loading === "Sending reset link…" ? loading : "Send Reset Link"}
          </Button>
        </form>
      </AuthShell>
    );
  }

  /* ---------- RESET LINK SENT ---------- */
  if (mode === "sent") {
    return (
      <AuthShell go={go}>
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success-soft text-success">
            <Icon.Notification size={26} />
          </span>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-near-black">Check your inbox</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-gray">
            We've sent a password reset link to{" "}
            <span className="font-medium text-charcoal">{email || "your email"}</span>.
            It may take a minute to arrive.
          </p>
          <div className="mt-7 space-y-3">
            <Button className="w-full" size="lg" onClick={() => setMode("login")}>Back to login</Button>
            <button
              onClick={() => fakeAsync("Resending…", () => {})}
              className="text-sm font-medium text-emerald-500 hover:underline"
            >
              {loading === "Resending…" ? "Resending…" : "Resend email"}
            </button>
          </div>
          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-medium-gray">
            <Icon.Info size={13} /> Didn't get it? Check spam or try another email.
          </p>
        </div>
      </AuthShell>
    );
  }

  /* ---------- EMAIL VERIFICATION ---------- */
  return (
    <AuthShell go={go}>
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ai-soft text-ai">
          <Icon.Verified size={26} />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-near-black">Verify your email</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-gray">
          We've sent a verification link to{" "}
          <span className="font-medium text-charcoal">{email || "your email"}</span>. Confirming
          your email keeps your account secure and lets us save your trips.
        </p>
      </div>

      {resending && (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-success-soft px-3 py-2.5 text-sm text-success">
          <Icon.Check size={16} /> Verification email resent.
        </div>
      )}

      <div className="mt-7 space-y-3">
        <Button className="w-full" size="lg" icon="Check" onClick={() => go("onboarding")}>
          Continue
        </Button>
        <Button
          className="w-full"
          size="lg"
          variant="tertiary"
          loading={loading === "Resending…"}
          onClick={() => fakeAsync("Resending…", () => { setResending(true); setTimeout(() => setResending(false), 2500); })}
        >
          {loading === "Resending…" ? "Resending…" : "Resend Email"}
        </Button>
        <button onClick={() => setMode("signup")} className="block w-full text-center text-sm font-medium text-slate-gray hover:text-forest-700">
          Change email
        </button>
      </div>
    </AuthShell>
  );
}
