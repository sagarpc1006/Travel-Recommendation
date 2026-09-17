import type { IconName } from "../components/icons";

/* ============================================================
   Phase 4 — Planner demonstration data.
   NOTE: All figures below are illustrative demonstration values,
   not live data. UI must label estimated / evidence states.
   ============================================================ */

export type Evidence =
  | "verified"
  | "business"
  | "supported"
  | "ai"
  | "unknown"
  | "conflicting"
  | "needsreview";

export const EVIDENCE_META: Record<
  Evidence,
  { label: string; tone: string; icon: IconName; explain: string }
> = {
  verified: { label: "Verified", tone: "verified", icon: "Verified", explain: "Supported by submitted visual evidence." },
  business: { label: "Business declared", tone: "carbon", icon: "Info", explain: "Accessibility information provided by the property." },
  supported: { label: "OSM supported", tone: "access", icon: "Map", explain: "Accessibility-related map data is available." },
  ai: { label: "AI supported", tone: "ai", icon: "AI", explain: "Inferred by AI — a helpful signal, not proof." },
  unknown: { label: "Unknown", tone: "neutral", icon: "Warning", explain: "Accessibility information could not be confirmed." },
  conflicting: { label: "Conflicting", tone: "warning", icon: "Warning", explain: "Different sources provide inconsistent information." },
  needsreview: { label: "Needs review", tone: "estimated", icon: "Info", explain: "Submitted evidence needs a closer look before it's confirmed." },
};

export type Segment = {
  mode: string;
  icon: IconName;
  distanceKm: number;
  factor: number; // kg CO2e per passenger-km
  co2: number; // kg CO2e (rounded display value)
};

export type SubScore = { key: string; label: string; value: number; weightPct: number; explain: string };

export type TripOption = {
  id: string;
  label: string;
  transport: string;
  icons: IconName[];
  route: string;
  time: string;
  timeMin: number;
  cost: number;
  carbonKg: number;
  access: number; // out of 5
  score: number;
  // sub-scores drive the weighted Green & Accessible Score
  sub: { carbon: number; access: number; cost: number; time: number };
  subDetail: SubScore[];
  costBreakdown: { label: string; value: number }[];
  timeBreakdown: { label: string; value: string }[];
  segments: Segment[];
  accessItems: { label: string; status: Evidence }[];
  reasons: string[];
  tag?: "standard" | "eco-twin";
};

export const TRIP = {
  origin: "Pune",
  destination: "Goa",
  duration: "3 Days",
  travelers: 2,
  dates: "Flexible",
  budget: "Moderate",
};

export const OPTIONS: TripOption[] = [
  {
    id: "a",
    label: "Option A",
    transport: "Flight + Taxi",
    icons: ["Flight", "Car"],
    route: "Pune ✈ Dabolim → Taxi to coast",
    time: "3h 10m",
    timeMin: 190,
    cost: 8400,
    carbonKg: 142,
    access: 2,
    score: 44,
    sub: { carbon: 18, access: 40, cost: 70, time: 95 },
    subDetail: [
      { key: "carbon", label: "Carbon", value: 18, weightPct: 40, explain: "Flying produces far higher estimated emissions than rail." },
      { key: "access", label: "Accessibility", value: 40, weightPct: 30, explain: "Limited step-free evidence for the taxi transfer." },
      { key: "cost", label: "Cost", value: 70, weightPct: 15, explain: "Higher fares than surface options." },
      { key: "time", label: "Time", value: 95, weightPct: 15, explain: "Fastest door-to-door option." },
    ],
    costBreakdown: [
      { label: "Transport", value: 6200 },
      { label: "Accommodation", value: 1600 },
      { label: "Local mobility", value: 400 },
      { label: "Other estimated", value: 200 },
    ],
    timeBreakdown: [
      { label: "Transit", value: "1h 20m" },
      { label: "Transfers", value: "45m" },
      { label: "Walking", value: "20m" },
      { label: "Waiting", value: "45m" },
    ],
    segments: [
      { mode: "Flight", icon: "Flight", distanceKm: 430, factor: 0.246, co2: 132 },
      { mode: "Taxi", icon: "Car", distanceKm: 30, factor: 0.171, co2: 10 },
    ],
    accessItems: [
      { label: "Step-free route", status: "unknown" },
      { label: "Accessible transport", status: "conflicting" },
      { label: "Accessible stay", status: "supported" },
    ],
    reasons: ["Fastest door-to-door time", "Widely available departures"],
    tag: "standard",
  },
  {
    id: "b",
    label: "Option B",
    transport: "Train + Shared EV Shuttle",
    icons: ["Train", "EV"],
    route: "Pune → Madgaon → Shared EV to coast",
    time: "3h 55m",
    timeMin: 235,
    cost: 7650,
    carbonKg: 31,
    access: 5,
    score: 91,
    sub: { carbon: 92, access: 100, cost: 88, time: 72 },
    subDetail: [
      { key: "carbon", label: "Carbon", value: 92, weightPct: 40, explain: "Lower estimated emissions than the conventional option." },
      { key: "access", label: "Accessibility", value: 100, weightPct: 30, explain: "Step-free route with accessible transport supported." },
      { key: "cost", label: "Cost", value: 88, weightPct: 15, explain: "Lower estimated cost than flying." },
      { key: "time", label: "Time", value: 72, weightPct: 15, explain: "Slightly longer, with fewer transfers." },
    ],
    costBreakdown: [
      { label: "Transport", value: 4200 },
      { label: "Accommodation", value: 2600 },
      { label: "Local mobility", value: 500 },
      { label: "Other estimated", value: 350 },
    ],
    timeBreakdown: [
      { label: "Transit", value: "2h 45m" },
      { label: "Transfers", value: "20m" },
      { label: "Walking", value: "15m" },
      { label: "Waiting", value: "35m" },
    ],
    segments: [
      { mode: "Train", icon: "Train", distanceKm: 520, factor: 0.045, co2: 23.4 },
      { mode: "Shared EV shuttle", icon: "EV", distanceKm: 120, factor: 0.063, co2: 7.6 },
    ],
    accessItems: [
      { label: "Step-free route", status: "supported" },
      { label: "Accessible transport", status: "verified" },
      { label: "Accessible stay", status: "supported" },
    ],
    reasons: ["78% lower estimated carbon", "Better accessibility support", "Lower estimated cost"],
    tag: "eco-twin",
  },
  {
    id: "c",
    label: "Option C",
    transport: "Train + Bus",
    icons: ["Train", "Bus"],
    route: "Pune → Madgaon → State bus to coast",
    time: "4h 40m",
    timeMin: 280,
    cost: 6100,
    carbonKg: 38,
    access: 3,
    score: 78,
    sub: { carbon: 85, access: 70, cost: 95, time: 60 },
    subDetail: [
      { key: "carbon", label: "Carbon", value: 85, weightPct: 40, explain: "Low estimated emissions on shared surface transport." },
      { key: "access", label: "Accessibility", value: 70, weightPct: 30, explain: "Bus step-free access varies by service." },
      { key: "cost", label: "Cost", value: 95, weightPct: 15, explain: "Lowest estimated cost of the three options." },
      { key: "time", label: "Time", value: 60, weightPct: 15, explain: "Longest total travel time." },
    ],
    costBreakdown: [
      { label: "Transport", value: 3100 },
      { label: "Accommodation", value: 2400 },
      { label: "Local mobility", value: 400 },
      { label: "Other estimated", value: 200 },
    ],
    timeBreakdown: [
      { label: "Transit", value: "3h 20m" },
      { label: "Transfers", value: "25m" },
      { label: "Walking", value: "20m" },
      { label: "Waiting", value: "35m" },
    ],
    segments: [
      { mode: "Train", icon: "Train", distanceKm: 520, factor: 0.045, co2: 23.4 },
      { mode: "State bus", icon: "Bus", distanceKm: 130, factor: 0.112, co2: 14.6 },
    ],
    accessItems: [
      { label: "Step-free route", status: "unknown" },
      { label: "Accessible transport", status: "ai" },
      { label: "Accessible stay", status: "supported" },
    ],
    reasons: ["Lowest estimated cost", "Low estimated carbon"],
  },
];

/* Weighted Green & Accessible Score from user priority weights (0–100 each). */
export function weightedScore(o: TripOption, w: { carbon: number; access: number; cost: number; time: number }) {
  const total = w.carbon + w.access + w.cost + w.time || 1;
  return Math.round(
    (o.sub.carbon * w.carbon + o.sub.access * w.access + o.sub.cost * w.cost + o.sub.time * w.time) / total,
  );
}

export const DEFAULT_WEIGHTS = { carbon: 40, access: 30, cost: 15, time: 15 };
