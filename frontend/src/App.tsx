import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
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

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [preview, setPreview] = useState<Destination | null>(null);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [demo, setDemo] = useState<{ key: string; i: number } | null>(null);

  const go = (target: string) => {
    if (!target) return;
    if (target === "landing") {
      navigate("/");
    } else if (target.startsWith("/")) {
      navigate(target);
    } else {
      navigate(`/${target}`);
    }
  };

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
          {/* Public Pages */}
          <Route path="/" element={<Landing go={go} />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Auth initial="login" go={go} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Auth initial="signup" go={go} />
              )
            }
          />
          <Route path="/forgot" element={<Auth initial="forgot" go={go} />} />

          {/* Protected Screens */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home go={go} onExplore={onExplore} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding go={go} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discover"
            element={
              <ProtectedRoute>
                <Discover go={go} onExplore={onExplore} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/planner"
            element={
              <ProtectedRoute>
                <Planner go={go} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/itinerary"
            element={
              <ProtectedRoute>
                <Itinerary tripId={activeTripId} go={go} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mytrips"
            element={
              <ProtectedRoute>
                <MyTrips go={go} onOpenTrip={onOpenTrip} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trip-detail"
            element={
              <ProtectedRoute>
                <TripDetail tripId={activeTripId} go={go} onOpenTrip={onOpenTrip} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <ProtectedRoute>
                <EcoInsights go={go} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile go={go} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accessibility"
            element={
              <ProtectedRoute>
                <AccessibilityProfile go={go} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <ProtectedRoute>
                <PhotoVerification go={go} />
              </ProtectedRoute>
            }
          />
          <Route path="/accessibility-verify" element={<Navigate to="/verify" replace />} />

          {/* Presentation & Prototype Showcase Routes */}
          <Route path="/presentation" element={<Presentation go={go} />} />
          <Route path="/resilience" element={<Resilience go={go} />} />
          <Route path="/handoff" element={<Handoff go={go} />} />
          <Route path="/blueprint" element={<Blueprint go={go} />} />
          <Route path="/prototype" element={<PrototypeHub go={go} startDemo={startDemo} />} />
          <Route path="/design-freeze" element={<DesignFreeze go={go} />} />
          <Route path="/design-system" element={<DesignSystem onBack={() => go("landing")} />} />

          {/* Catch-all fallback */}
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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
