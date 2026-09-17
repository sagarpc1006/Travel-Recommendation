import type { IconName } from "../components/icons";

export type EvidenceStatus = "verified" | "supported" | "unknown";

export type AccessItem = {
  icon: IconName;
  label: string;
  status: EvidenceStatus;
};

export type Destination = {
  id: string;
  name: string;
  region: string;
  bestFor: string[];
  description: string;
  score: number; // green & accessible, /100
  cost: string;
  time: string;
  distanceKm: number;
  carbonKg: number;
  publicTransport: boolean;
  ecoStays: boolean;
  access: AccessItem[];
  weather: { temp: string; condition: string; humidity?: string; note?: string };
  bestTime: string;
  image: string;
  recommended?: boolean;
  coords: { x: number; y: number }; // percentage placement on the flat map
};

const img = (id: string, w = 640, h = 420) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export const DESTINATIONS: Destination[] = [
  {
    id: "munnar",
    name: "Munnar",
    region: "Kerala · Western Ghats",
    bestFor: ["Nature", "Relaxation"],
    description: "Rolling tea estates and cool mountain air — an easy pick for slow, low-impact travel.",
    score: 88,
    cost: "₹9,400",
    time: "10h 20m",
    distanceKm: 612,
    carbonKg: 31,
    publicTransport: true,
    ecoStays: true,
    access: [
      { icon: "Accessibility", label: "Step-free access", status: "supported" },
      { icon: "Location", label: "Accessible stay", status: "verified" },
      { icon: "Bus", label: "Accessible transport", status: "unknown" },
    ],
    weather: { temp: "21°C", condition: "Misty", humidity: "78%", note: "Mist may affect hill views in the morning." },
    bestTime: "Sep – Mar",
    image: img("1711192702535-eac61a78ecb0"),
    recommended: true,
    coords: { x: 34, y: 78 },
  },
  {
    id: "goa",
    name: "Goa",
    region: "Konkan Coast",
    bestFor: ["Relaxation", "Food & Local"],
    description: "Coastal towns linked by rail and shared EV shuttles — a greener way to reach the beaches.",
    score: 82,
    cost: "₹7,650",
    time: "3h 55m",
    distanceKm: 448,
    carbonKg: 31,
    publicTransport: true,
    ecoStays: true,
    access: [
      { icon: "Accessibility", label: "Step-free access", status: "verified" },
      { icon: "Location", label: "Accessible stay", status: "supported" },
      { icon: "Bus", label: "Accessible transport", status: "verified" },
    ],
    weather: { temp: "28°C", condition: "Partly cloudy", humidity: "70%", note: "Rain may affect outdoor plans." },
    bestTime: "Nov – Feb",
    image: img("1652820330085-82a0c2b88d78"),
    recommended: true,
    coords: { x: 30, y: 60 },
  },
  {
    id: "coorg",
    name: "Coorg",
    region: "Karnataka · Western Ghats",
    bestFor: ["Nature", "Adventure"],
    description: "Misty coffee country with quiet trails and eco-stays tucked into the hills.",
    score: 84,
    cost: "₹8,100",
    time: "9h 10m",
    distanceKm: 560,
    carbonKg: 36,
    publicTransport: false,
    ecoStays: true,
    access: [
      { icon: "Accessibility", label: "Step-free access", status: "unknown" },
      { icon: "Location", label: "Accessible stay", status: "supported" },
      { icon: "Walk", label: "Minimal walking", status: "unknown" },
    ],
    weather: { temp: "23°C", condition: "Light rain", humidity: "82%", note: "Trails can be slippery after rain." },
    bestTime: "Oct – Mar",
    image: img("1676140428072-62fa84ba5800"),
    coords: { x: 33, y: 68 },
  },
  {
    id: "jaipur",
    name: "Jaipur",
    region: "Rajasthan",
    bestFor: ["Culture", "City Exploration"],
    description: "Historic city well-served by rail, with growing accessible-transport coverage.",
    score: 79,
    cost: "₹11,200",
    time: "16h 40m",
    distanceKm: 1180,
    carbonKg: 58,
    publicTransport: true,
    ecoStays: false,
    access: [
      { icon: "Accessibility", label: "Step-free access", status: "supported" },
      { icon: "Location", label: "Accessible stay", status: "verified" },
      { icon: "Bus", label: "Accessible transport", status: "supported" },
    ],
    weather: { temp: "31°C", condition: "Clear", humidity: "38%", note: "Midday heat — plan indoor visits at noon." },
    bestTime: "Oct – Mar",
    image: img("1524309784716-6a4be8299c7f"),
    coords: { x: 40, y: 30 },
  },
  {
    id: "udaipur",
    name: "Udaipur",
    region: "Rajasthan · Lake City",
    bestFor: ["Culture", "Relaxation"],
    description: "Lakeside palaces and walkable old town — reachable by an overnight low-carbon rail route.",
    score: 81,
    cost: "₹10,300",
    time: "14h 05m",
    distanceKm: 980,
    carbonKg: 49,
    publicTransport: true,
    ecoStays: true,
    access: [
      { icon: "Accessibility", label: "Step-free access", status: "unknown" },
      { icon: "Location", label: "Accessible stay", status: "supported" },
      { icon: "Bus", label: "Accessible transport", status: "unknown" },
    ],
    weather: { temp: "29°C", condition: "Sunny", humidity: "42%" },
    bestTime: "Sep – Mar",
    image: img("1642382218676-10f2890eac43"),
    coords: { x: 36, y: 34 },
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    region: "Uttarakhand · Himalaya foothills",
    bestFor: ["Adventure", "Nature"],
    description: "Riverside town in the foothills — best reached by rail then a shared shuttle transfer.",
    score: 77,
    cost: "₹12,600",
    time: "22h 30m",
    distanceKm: 1560,
    carbonKg: 71,
    publicTransport: true,
    ecoStays: true,
    access: [
      { icon: "Accessibility", label: "Step-free access", status: "unknown" },
      { icon: "Walk", label: "Minimal walking", status: "unknown" },
      { icon: "Location", label: "Accessible stay", status: "supported" },
    ],
    weather: { temp: "26°C", condition: "Partly cloudy", humidity: "60%", note: "River activities depend on flow conditions." },
    bestTime: "Sep – Nov",
    image: img("1600078254717-31759fe698de"),
    coords: { x: 46, y: 22 },
  },
];

export const EVIDENCE_META: Record<EvidenceStatus, { label: string; tone: string; icon: IconName }> = {
  verified: { label: "Verified", tone: "verified", icon: "Verified" },
  supported: { label: "OSM supported", tone: "neutral", icon: "Map" },
  unknown: { label: "Unknown", tone: "warning", icon: "Info" },
};
