// EcoTrail Adapters Layer
// Converts Django backend responses into Figma UI domain models

import type { Destination, AccessItem } from '../data/destinations';
import type { Trip, TripStatus, ItineraryDay } from '../data/trips';
import type { ApiPlace } from './discoverAPI';

const KNOWN_COORDS: Record<string, { x: number; y: number }> = {
  munnar: { x: 34, y: 78 },
  goa: { x: 28, y: 62 },
  coorg: { x: 30, y: 72 },
  hampi: { x: 32, y: 64 },
  spiti: { x: 42, y: 22 },
  alleppey: { x: 33, y: 81 },
  tirupati: { x: 48, y: 68 },
  varanasi: { x: 62, y: 44 },
  manali: { x: 40, y: 24 },
  jaipur: { x: 38, y: 38 },
  ooty: { x: 33, y: 75 },
  rishikesh: { x: 44, y: 28 },
  gokarna: { x: 27, y: 66 },
  amritsar: { x: 34, y: 24 },
  mysore: { x: 34, y: 73 },
  wayanad: { x: 32, y: 75 },
  puri: { x: 68, y: 52 },
  varkala: { x: 34, y: 82 },
  paris: { x: 20, y: 30 },
  tokyo: { x: 80, y: 35 },
  london: { x: 18, y: 26 },
  bali: { x: 82, y: 82 },
  zurich: { x: 24, y: 32 },
};

function deterministicCoords(str: string): { x: number; y: number } {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  const x = 20 + (positiveHash % 60);
  const y = 25 + ((positiveHash >> 3) % 55);
  return { x, y };
}

/**
 * Converts a backend ApiPlace into a Figma Destination object
 */
export function apiPlaceToDestination(place: ApiPlace): Destination {
  const key = String(place.id || place.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  
  let coords = KNOWN_COORDS[key];
  if (!coords && place.lat && place.lon) {
    const x = Math.max(15, Math.min(85, Math.round(((place.lon - 68) / (95 - 68)) * 100)));
    const y = Math.max(15, Math.min(85, Math.round(((35 - place.lat) / (35 - 8)) * 100)));
    coords = { x, y };
  }
  if (!coords) {
    coords = deterministicCoords(place.name);
  }

  const isAccessible =
    Boolean(place.categories?.includes('♿ Accessible')) ||
    place.tag === 'Accessible';

  const access: AccessItem[] = isAccessible
    ? [
        { icon: 'Accessibility', label: 'Step-free access', status: 'verified' },
        { icon: 'Location', label: 'Accessible stay', status: 'verified' },
        { icon: 'Bus', label: 'Accessible transport', status: 'supported' },
      ]
    : [
        { icon: 'Accessibility', label: 'Step-free access', status: 'supported' },
        { icon: 'Location', label: 'Accessible stay', status: 'supported' },
        { icon: 'Bus', label: 'Accessible transport', status: 'unknown' },
      ];

  const rawTemp = place.weather?.temperature;
  const tempStr = rawTemp !== undefined ? `${Math.round(rawTemp)}°C` : '24°C';
  const conditionStr = place.weather?.condition || place.weather?.description || 'Pleasant';
  const humidityStr = place.weather?.humidity ? `${place.weather.humidity}%` : undefined;

  const cost = place.official_package?.price_inr
    ? `₹${place.official_package.price_inr.toLocaleString('en-IN')}`
    : '₹8,500';

  const regionStr = place.state
    ? place.state.includes('·')
      ? place.state
      : `${place.state} · India`
    : 'India';

  const categories = Array.isArray(place.categories) && place.categories.length > 0
    ? place.categories.filter((c) => c !== 'For you' && c !== '♿ Accessible')
    : ['Nature', 'Culture'];

  return {
    id: String(place.id || key),
    name: place.name,
    region: regionStr,
    bestFor: categories.length > 0 ? categories : ['Nature'],
    description:
      place.description ||
      (place.type
        ? `Explore ${place.name}: ${place.type}. Low-impact certified travel route.`
        : `Sustainable travel guide for ${place.name}.`),
    score: typeof place.eco_score === 'number' ? place.eco_score : 90,
    cost,
    time: place.transit_tip?.includes('(') ? '5h 30m' : '6h 15m',
    distanceKm: place.lat && place.lon
      ? Math.max(120, Math.round(Math.hypot(place.lat - 18.5204, place.lon - 73.8567) * 111))
      : 520,
    carbonKg: typeof place.co2_kg === 'number' ? place.co2_kg : 24,
    publicTransport: Boolean(place.transit_tip || true),
    ecoStays: Boolean(place.tag?.toLowerCase().includes('stay') || place.tag?.toLowerCase().includes('clean') || true),
    access,
    weather: {
      temp: tempStr,
      condition: conditionStr,
      humidity: humidityStr,
      note: place.transit_tip || undefined,
    },
    bestTime: 'Oct – Mar',
    image:
      place.img ||
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80',
    recommended: Boolean(
      place.categories?.includes('For you') || (place.eco_score && place.eco_score >= 92)
    ),
    coords,
  };
}

/**
 * Converts backend SavedTrip to Figma Trip model
 */
export function apiTripToTrip(apiTrip: any): Trip {
  const rawStatus = (apiTrip.status || 'planned').toLowerCase();
  const validStatus: TripStatus = ['draft', 'planned', 'upcoming', 'ongoing', 'completed', 'saved'].includes(rawStatus)
    ? (rawStatus as TripStatus)
    : 'planned';

  const carbon = typeof apiTrip.raw_carbon === 'number'
    ? apiTrip.raw_carbon
    : parseFloat(String(apiTrip.carbonEmissions || '25'));

  const standardCarbon = Math.round(carbon * 1.8);

  const days: ItineraryDay[] = Array.isArray(apiTrip.itinerary?.days)
    ? apiTrip.itinerary.days
    : [
        {
          day: 1,
          label: 'Day 1',
          date: apiTrip.travelDates || 'Upcoming',
          items: [
            {
              id: 'item-1',
              time: '09:00',
              title: `Journey: ${apiTrip.origin || 'Origin'} → ${apiTrip.destination || 'Destination'}`,
              category: 'Transport',
              location: apiTrip.origin || 'Transit Hub',
              duration: apiTrip.duration || 'Flexible',
              carbonKg: carbon,
              coords: { x: 30, y: 50 },
            },
          ],
        },
      ];

  return {
    id: String(apiTrip.id),
    destination: apiTrip.destination || 'Destination',
    region: apiTrip.stays || `${apiTrip.destination || 'India'} Region`,
    origin: apiTrip.origin || 'Origin',
    dates: apiTrip.travelDates || 'Upcoming Dates',
    travelers: 2,
    score: typeof apiTrip.ecoScore === 'number' ? apiTrip.ecoScore : 90,
    carbonKg: carbon,
    standardCarbonKg: standardCarbon,
    status: validStatus,
    ecoTwin: Boolean(apiTrip.eco_twin || apiTrip.carbonSaved),
    accessReady: apiTrip.accessibility?.verified ? 'ready' : 'partial',
    image:
      apiTrip.coverImage ||
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    days,
  };
}

/**
 * Maps Figma category strings to backend categories
 */
export function figmaCategoryToBackendCategory(figmaType: string): string | undefined {
  switch (figmaType) {
    case 'Nature':
      return 'Nature';
    case 'Culture':
      return 'Culture';
    case 'Adventure':
      return 'Nature';
    case 'Relaxation':
      return 'Beach';
    case 'City Exploration':
      return 'Culture';
    case 'Food & Local':
      return 'Culture';
    default:
      return undefined;
  }
}
