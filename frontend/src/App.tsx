import { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Landing from "./screens/Landing";
import Auth from "./screens/Auth";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import Discover from "./screens/Discover";
import Planner from "./screens/Planner";
import Itinerary from "./screens/Itinerary";
import MyTrips from "./screens/MyTrips";
import TripDetail from "./screens/TripDetail";
import EcoInsights from "./screens/EcoInsights";
import Profile from "./screens/Profile";
import AccessibilityProfile from "./screens/AccessibilityProfile";
import PhotoVerification from "./screens/PhotoVerification";
import Presentation from "./screens/Presentation";
import Resilience from "./screens/Resilience";
import Handoff from "./screens/Handoff";
import DesignFreeze from "./screens/DesignFreeze";
import Blueprint from "./screens/Blueprint";
import PrototypeHub, { DemoBar, DEMO_FLOWS } from "./screens/PrototypeHub";
import DesignSystem from "./screens/DesignSystem";
import DestinationPreview from "./components/DestinationPreview";
import type { Destination } from "./data/destinations";

export function routeToPath(r: string): string {
  switch (r) {
    case "landing":
      return "/";
    case "login":
      return "/login";
    case "signup":
      return "/signup";
    case "forgot":
      return "/forgot";
    case "onboarding":
      return "/onboarding";
    case "home":
      return "/home";
    case "discover":
      return "/discover";
    case "planner":
      return "/planner";
    case "itinerary":
      return "/itinerary";
    case "mytrips":
      return "/trips";
    case "trip-detail":
      return "/trip-detail";
    case "insights":
      return "/insights";
    case "profile":
      return "/profile";
    case "accessibility":
      return "/accessibility";
    case "verify":
      return "/verify";
    case "presentation":
      return "/presentation";
    case "resilience":
      return "/resilience";
    case "handoff":
      return "/handoff";
    case "design-freeze":
      return "/design-freeze";
    case "blueprint":
      return "/blueprint";
    case "prototype":
      return "/prototype";
    case "design-system":
      return "/design-system";
    default:
      return r.startsWith("/") ? r : `/${r}`;
  }
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [preview, setPreview] = useState<Destination | null>(null);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [demo, setDemo] = useState<{ key: string; i: number } | null>(null);

  const go = useCallback(
    (r: string) => {
      navigate(routeToPath(r));
    },
    [navigate]
  );

  const startDemo = (key: string) => {
    const flow = DEMO_FLOWS[key];
    if (!flow) return;
    setDemo({ key, i: 0 });
    go(flow.steps[0].route);
  };

  const demoNav = (dir: 1 | -1) =>
    setDemo((d) => {
      if (!d) return d;
      const flow = DEMO_FLOWS[d.key];
      const ni = Math.min(flow.steps.length - 1, Math.max(0, d.i + dir));
      go(flow.steps[ni].route);
      return { ...d, i: ni };
    });

  const onExplore = (d: Destination) => setPreview(d);
  const onOpenTrip = (id: string, r: string) => {
    setActiveTripId(id);
    go(r);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <>
      <div key={location.pathname} className="page-enter">
        <Routes>
          {/* Public & Landing */}
          <Route path="/" element={<Landing go={go} />} />
          <Route path="/landing" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Auth initial="login" go={go} />} />
          <Route path="/signup" element={<Auth initial="signup" go={go} />} />
          <Route path="/forgot" element={<Auth initial="forgot" go={go} />} />

          {/* Main Product Screens */}
          <Route path="/onboarding" element={<Onboarding go={go} />} />
          <Route path="/home" element={<Home go={go} onExplore={onExplore} />} />
          <Route path="/dashboard" element={<Navigate to="/home" replace />} />
          <Route path="/discover" element={<Discover go={go} onExplore={onExplore} />} />
          <Route path="/planner" element={<Planner go={go} />} />
          <Route path="/itinerary" element={<Itinerary tripId={activeTripId} go={go} />} />
          <Route path="/trips" element={<MyTrips go={go} onOpenTrip={onOpenTrip} />} />
          <Route path="/mytrips" element={<Navigate to="/trips" replace />} />
          <Route path="/saved" element={<Navigate to="/trips" replace />} />
          <Route path="/trip-detail" element={<TripDetail tripId={activeTripId} go={go} onOpenTrip={onOpenTrip} />} />
          <Route path="/insights" element={<EcoInsights go={go} />} />
          <Route path="/profile" element={<Profile go={go} />} />
          <Route path="/accessibility" element={<AccessibilityProfile go={go} />} />
          <Route path="/verify" element={<PhotoVerification go={go} />} />

          {/* Showcase & Evaluation Screens */}
          <Route path="/presentation" element={<Presentation go={go} />} />
          <Route path="/resilience" element={<Resilience go={go} />} />
          <Route path="/handoff" element={<Handoff go={go} />} />
          <Route path="/design-freeze" element={<DesignFreeze go={go} />} />
          <Route path="/blueprint" element={<Blueprint go={go} />} />
          <Route path="/prototype" element={<PrototypeHub go={go} startDemo={startDemo} />} />
          <Route path="/design-system" element={<DesignSystem onBack={() => go("landing")} />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {preview && (
        <DestinationPreview
          d={preview}
          go={(r) => {
            setPreview(null);
            go(r);
          }}
          onClose={() => setPreview(null)}
        />
      )}

      {demo && (
        <DemoBar
          flow={DEMO_FLOWS[demo.key]}
          index={demo.i}
          onPrev={() => demoNav(-1)}
          onNext={() => demoNav(1)}
          onExit={() => setDemo(null)}
        />
      )}
    </>
  );
}

