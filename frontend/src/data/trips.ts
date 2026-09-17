import type { IconName } from "../components/icons";
import type { Evidence } from "./tripOptions";
import { DESTINATIONS } from "./destinations";

const photo = (id: string) => DESTINATIONS.find((d) => d.id === id)?.image ?? DESTINATIONS[0].image;

/* ============================================================
   Phase 5 — trips, itineraries and eco-impact demonstration data.
   All carbon/cost values are illustrative estimates, not live data.
   ============================================================ */

export type TripStatus = "draft" | "planned" | "upcoming" | "ongoing" | "completed" | "saved";

export const STATUS_META: Record<TripStatus, { label: string; tone: string; icon: IconName }> = {
  draft: { label: "Draft", tone: "neutral", icon: "Sliders" },
  planned: { label: "Planned", tone: "carbon", icon: "Route" },
  upcoming: { label: "Upcoming", tone: "ai", icon: "Calendar" },
  ongoing: { label: "Ongoing", tone: "access", icon: "Compass" },
  completed: { label: "Completed", tone: "verified", icon: "Check" },
  saved: { label: "Saved", tone: "neutral", icon: "Leaf" },
};

export type ItemCategory = "Transport" | "Accommodation" | "Activity" | "Meal" | "Free Time";

export const CATEGORY_META: Record<ItemCategory, { icon: IconName; tone: string }> = {
  Transport: { icon: "Train", tone: "carbon" },
  Accommodation: { icon: "Location", tone: "access" },
  Activity: { icon: "Compass", tone: "ai" },
  Meal: { icon: "Money", tone: "weather" },
  "Free Time": { icon: "Clock", tone: "neutral" },
};

export type ItineraryItem = {
  id: string;
  time: string;
  title: string;
  category: ItemCategory;
  location: string;
  duration: string;
  cost?: number;
  carbonKg?: number;
  access?: { label: string; status: Evidence };
  source?: string;
  coords: { x: number; y: number };
};

export type ItineraryDay = {
  day: number;
  label: string;
  date: string;
  items: ItineraryItem[];
};

export type Trip = {
  id: string;
  destination: string;
  region: string;
  origin: string;
  dates: string;
  travelers: number;
  score: number;
  carbonKg: number;
  standardCarbonKg: number;
  status: TripStatus;
  ecoTwin: boolean;
  accessReady: "ready" | "partial" | "unknown";
  image: string;
  days: ItineraryDay[];
};

const goaDays: ItineraryDay[] = [
  {
    day: 1,
    label: "Arrival",
    date: "Fri 14 Nov",
    items: [
      { id: "d1-1", time: "08:00", title: "Departure — Pune", category: "Transport", location: "Pune Junction", duration: "—", carbonKg: 0, access: { label: "Step-free platform", status: "verified" }, source: "Rail data", coords: { x: 12, y: 78 } },
      { id: "d1-2", time: "10:45", title: "Train arrival — Madgaon", category: "Transport", location: "Madgaon Station", duration: "2h 45m", carbonKg: 23.4, access: { label: "Step-free exit", status: "supported" }, source: "OSM", coords: { x: 68, y: 40 } },
      { id: "d1-3", time: "11:15", title: "Accessible EV shuttle", category: "Transport", location: "Station → Coast", duration: "45m", cost: 500, carbonKg: 7.6, access: { label: "Accessible transport", status: "verified" }, source: "Operator", coords: { x: 80, y: 30 } },
      { id: "d1-4", time: "12:00", title: "Hotel check-in", category: "Accommodation", location: "Coastal eco-stay", duration: "—", cost: 2600, access: { label: "Accessible room", status: "business" }, source: "Property", coords: { x: 84, y: 26 } },
      { id: "d1-5", time: "14:00", title: "Lunch — local kitchen", category: "Meal", location: "Near stay", duration: "1h", cost: 700, access: { label: "Step-free entrance", status: "supported" }, coords: { x: 82, y: 24 } },
      { id: "d1-6", time: "15:30", title: "Coastal walk", category: "Activity", location: "Shoreline path", duration: "1h 30m", access: { label: "Walking segment", status: "unknown" }, coords: { x: 86, y: 22 } },
      { id: "d1-7", time: "18:30", title: "Free time", category: "Free Time", location: "At leisure", duration: "—", coords: { x: 84, y: 26 } },
    ],
  },
  {
    day: 2,
    label: "Explore",
    date: "Sat 15 Nov",
    items: [
      { id: "d2-1", time: "09:00", title: "Breakfast", category: "Meal", location: "Eco-stay", duration: "45m", access: { label: "Accessible dining", status: "business" }, coords: { x: 84, y: 26 } },
      { id: "d2-2", time: "10:30", title: "Heritage quarter tour", category: "Activity", location: "Old town", duration: "2h 30m", cost: 1200, access: { label: "Elevator access", status: "supported" }, source: "OSM", coords: { x: 60, y: 34 } },
      { id: "d2-3", time: "13:30", title: "Lunch", category: "Meal", location: "Riverside", duration: "1h", cost: 850, coords: { x: 58, y: 36 } },
      { id: "d2-4", time: "16:00", title: "Backwater boat (electric)", category: "Activity", location: "Estuary", duration: "1h 30m", cost: 1400, carbonKg: 1.2, access: { label: "Boarding assistance", status: "needsreview" }, coords: { x: 72, y: 44 } },
      { id: "d2-5", time: "19:00", title: "Free time", category: "Free Time", location: "At leisure", duration: "—", coords: { x: 84, y: 26 } },
    ],
  },
  {
    day: 3,
    label: "Departure",
    date: "Sun 16 Nov",
    items: [
      { id: "d3-1", time: "10:00", title: "Check-out", category: "Accommodation", location: "Coastal eco-stay", duration: "—", access: { label: "Step-free exit", status: "verified" }, coords: { x: 84, y: 26 } },
      { id: "d3-2", time: "11:30", title: "Accessible EV shuttle", category: "Transport", location: "Coast → Station", duration: "45m", cost: 500, carbonKg: 7.6, access: { label: "Accessible transport", status: "verified" }, coords: { x: 70, y: 40 } },
      { id: "d3-3", time: "13:15", title: "Return train — Pune", category: "Transport", location: "Madgaon → Pune", duration: "2h 45m", carbonKg: 23.4, access: { label: "Step-free platform", status: "supported" }, source: "Rail data", coords: { x: 12, y: 78 } },
    ],
  },
];

export const TRIPS: Trip[] = [
  {
    id: "goa",
    destination: "Goa",
    region: "Konkan Coast",
    origin: "Pune",
    dates: "14–16 Nov 2026",
    travelers: 2,
    score: 91,
    carbonKg: 62,
    standardCarbonKg: 284,
    status: "upcoming",
    ecoTwin: true,
    accessReady: "ready",
    image: photo("goa"),
    days: goaDays,
  },
  {
    id: "munnar",
    destination: "Munnar",
    region: "Western Ghats",
    origin: "Kochi",
    dates: "2–5 Dec 2026",
    travelers: 2,
    score: 88,
    carbonKg: 41,
    standardCarbonKg: 150,
    status: "planned",
    ecoTwin: true,
    accessReady: "partial",
    image: photo("munnar"),
    days: goaDays,
  },
  {
    id: "coorg",
    destination: "Coorg",
    region: "Karnataka",
    origin: "Bengaluru",
    dates: "8–10 Aug 2026",
    travelers: 3,
    score: 84,
    carbonKg: 38,
    standardCarbonKg: 121,
    status: "completed",
    ecoTwin: false,
    accessReady: "partial",
    image: photo("coorg"),
    days: goaDays,
  },
  {
    id: "udaipur",
    destination: "Udaipur",
    region: "Rajasthan",
    origin: "Ahmedabad",
    dates: "Saved",
    travelers: 2,
    score: 82,
    carbonKg: 55,
    standardCarbonKg: 190,
    status: "saved",
    ecoTwin: true,
    accessReady: "unknown",
    image: photo("udaipur"),
    days: goaDays,
  },
];

export const ACCESS_READY_META: Record<Trip["accessReady"], { label: string; tone: string; icon: IconName }> = {
  ready: { label: "Accessibility ready", tone: "verified", icon: "Verified" },
  partial: { label: "Some details to confirm", tone: "estimated", icon: "Info" },
  unknown: { label: "Accessibility unconfirmed", tone: "neutral", icon: "Warning" },
};

/* ---- Eco Insights ---- */
export const INSIGHTS = {
  lifetimeAvoidedKg: 892,
  totalEstimatedKg: 196,
  tripsOptimized: 4,
  sustainableChoices: 11,
  // monthly estimated CO2e: standard vs ecotrail
  monthly: [
    { m: "Apr", std: 120, eco: 40 },
    { m: "May", std: 0, eco: 0 },
    { m: "Jun", std: 150, eco: 41 },
    { m: "Jul", std: 0, eco: 0 },
    { m: "Aug", std: 121, eco: 38 },
    { m: "Sep", std: 90, eco: 26 },
    { m: "Oct", std: 0, eco: 0 },
    { m: "Nov", std: 284, eco: 62 },
  ],
  modes: [
    { mode: "Rail", kg: 94, color: "var(--color-carbon)" },
    { mode: "Shared EV", kg: 38, color: "var(--color-emerald-500)" },
    { mode: "Bus", kg: 41, color: "var(--color-access)" },
    { mode: "Taxi", kg: 23, color: "var(--color-estimated)" },
  ],
};
