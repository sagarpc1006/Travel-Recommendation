// EcoTrail Adapters Layer
// Converts Django backend responses into Figma UI domain models

import type { Destination, AccessItem } from '../data/destinations';
import type { Trip, TripStatus, ItineraryDay } from '../data/trips';
import type { ApiPlace } from './discoverAPI';
import type { TripOption, Segment, Evidence } from '../data/tripOptions';
import type { IconName } from '../components/icons';
import type { RecommendationResult } from './recommendationAPI';

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

  const rawCost = typeof apiTrip.raw_cost === 'number'
    ? apiTrip.raw_cost
    : parseInt(String(apiTrip.totalCost || '5000').replace(/[^0-9]/g, '')) || 5000;

  const days: ItineraryDay[] = Array.isArray(apiTrip.itinerary?.days)
    ? apiTrip.itinerary.days
    : [
        {
          day: 1,
          label: 'Arrival & Eco Exploration',
          date: apiTrip.travelDates || 'Upcoming',
          items: [
            {
              id: 'item-1',
              time: '09:00',
              title: `Journey: ${apiTrip.origin || 'Origin'} → ${apiTrip.destination || 'Destination'} via ${apiTrip.transport || 'Eco Transit'}`,
              category: 'Transport',
              location: apiTrip.origin || 'Transit Hub',
              duration: apiTrip.duration || 'Flexible',
              carbonKg: Math.round(carbon * 0.8),
              cost: Math.round(rawCost * 0.45),
              coords: { x: 30, y: 50 },
              access: {
                status: apiTrip.accessibility?.verified ? 'verified' : 'supported',
                summary: 'Step-free transit access with low emissions.',
              },
            },
            {
              id: 'item-2',
              time: '14:00',
              title: `Check-in: ${apiTrip.stays || 'Verified Eco Stay'}`,
              category: 'Stay',
              location: apiTrip.destination || 'Destination',
              duration: 'Check-in',
              cost: Math.round(rawCost * 0.35),
              carbonKg: Math.round(carbon * 0.15),
              coords: { x: 50, y: 50 },
              access: {
                status: 'supported',
                summary: 'Level entrance with accessible amenities.',
              },
            },
            {
              id: 'item-3',
              time: '17:00',
              title: `Local Heritage & Nature Walk in ${apiTrip.destination || 'Destination'}`,
              category: 'Activity',
              location: apiTrip.destination || 'Nature Reserve',
              duration: '2h 30m',
              cost: Math.round(rawCost * 0.2),
              carbonKg: Math.round(carbon * 0.05),
              coords: { x: 70, y: 60 },
              access: {
                status: 'verified',
                summary: 'Paved, step-free scenic paths.',
              },
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

/**
 * Converts a backend RecommendationResult into a Figma TripOption
 */
export function apiRecommendationToTripOption(
  rec: RecommendationResult,
  index: number,
  totalCount: number,
  origin = 'Pune',
  destination = 'Goa'
): TripOption {
  const durMin = rec.duration_minutes || 180;
  const hours = Math.floor(durMin / 60);
  const mins = durMin % 60;
  const formattedTime = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  const modeStr = (
    typeof rec.transport === 'object' && rec.transport !== null
      ? rec.transport.mode || rec.transport.label || ''
      : String(rec.transport || rec.title || '')
  ).toLowerCase();

  let icons: IconName[] = ['Route', 'Leaf'];
  let tag: 'standard' | 'eco-twin' | undefined = undefined;

  if (modeStr.includes('flight') || modeStr.includes('air') || modeStr.includes('plane')) {
    icons = ['Flight', 'Car'];
    tag = 'standard';
  } else if (modeStr.includes('rail') || modeStr.includes('train')) {
    icons = ['Train', 'EV'];
    if (index === 0) tag = 'eco-twin';
  } else if (modeStr.includes('ev') || modeStr.includes('electric')) {
    icons = ['EV', 'Car'];
    if (index === 0) tag = 'eco-twin';
  } else if (modeStr.includes('bus') || modeStr.includes('coach')) {
    icons = ['Bus', 'Walk'];
  } else if (index === 0) {
    tag = 'eco-twin';
  }

  if (!tag && index === totalCount - 1 && totalCount > 1) {
    tag = 'standard';
  }

  const carbonVal = typeof rec.carbon?.kg_co2e === 'number'
    ? Math.round(rec.carbon.kg_co2e)
    : 30;

  const costVal = typeof rec.price?.amount === 'number'
    ? Math.round(rec.price.amount)
    : 7500;

  const rawAccRating =
    rec.accessibility?.rating ??
    rec.accessibility?.accessibility_rating ??
    (typeof rec.scores?.accessibility === 'number' ? Math.round(rec.scores.accessibility / 20) : 4);
  const accessRating = Math.max(1, Math.min(5, Math.round(rawAccRating)));

  const isVerified = Boolean(rec.accessibility?.verified ?? rec.accessibility?.accessibility_verified);
  const statusStr = (rec.accessibility?.status ?? rec.accessibility?.accessibility_status ?? '').toLowerCase();
  const accessStatus: Evidence = isVerified
    ? 'verified'
    : statusStr.includes('support')
      ? 'supported'
      : statusStr.includes('business')
        ? 'business'
        : 'unknown';

  const segments: Segment[] = modeStr.includes('flight')
    ? [
        { mode: 'Flight', icon: 'Flight', distanceKm: Math.round((rec.distance_km || 430) * 0.9), factor: 0.246, co2: Math.round(carbonVal * 0.9) },
        { mode: 'Taxi', icon: 'Car', distanceKm: 30, factor: 0.171, co2: Math.max(1, Math.round(carbonVal * 0.1)) },
      ]
    : modeStr.includes('rail') || modeStr.includes('train')
      ? [
          { mode: 'Electric Train', icon: 'Train', distanceKm: Math.round((rec.distance_km || 450) * 0.85), factor: 0.035, co2: Math.round(carbonVal * 0.8) },
          { mode: 'Shared EV Shuttle', icon: 'EV', distanceKm: 25, factor: 0.045, co2: Math.max(1, Math.round(carbonVal * 0.2)) },
        ]
      : [
          { mode: 'Electric Vehicle', icon: 'EV', distanceKm: Math.round(rec.distance_km || 450), factor: 0.045, co2: carbonVal },
        ];

  const carbonScore = rec.scores?.carbon ?? 90;
  const accessScore = rec.scores?.accessibility ?? 90;
  const costScore = rec.scores?.cost ?? 80;
  const timeScore = rec.scores?.time ?? 75;

  const sub = {
    carbon: carbonScore,
    access: accessScore,
    cost: costScore,
    time: timeScore,
  };

  const carbonWeight = Math.round((rec.weights?.carbon ?? 0.4) * 100);
  const accessWeight = Math.round((rec.weights?.accessibility ?? 0.3) * 100);
  const costWeight = Math.round((rec.weights?.cost ?? 0.15) * 100);
  const timeWeight = Math.round((rec.weights?.time ?? 0.15) * 100);

  const subDetail = [
    {
      key: 'carbon',
      label: 'Carbon',
      value: carbonScore,
      weightPct: carbonWeight,
      explain: rec.explanation?.why_recommended?.[0] || 'Lower emissions than conventional baseline.',
    },
    {
      key: 'access',
      label: 'Accessibility',
      value: accessScore,
      weightPct: accessWeight,
      explain: isVerified ? 'Verified step-free and accessible boarding.' : 'Accessible transit infrastructure.',
    },
    {
      key: 'cost',
      label: 'Cost',
      value: costScore,
      weightPct: costWeight,
      explain: rec.within_budget ? 'Within target budget.' : 'Transport and mobility evaluated.',
    },
    {
      key: 'time',
      label: 'Time',
      value: timeScore,
      weightPct: timeWeight,
      explain: `Door-to-door duration: ${formattedTime}.`,
    },
  ];

  const costBreakdown = [
    { label: 'Transport', value: Math.round(costVal * 0.65) },
    { label: 'Accommodation', value: Math.round(costVal * 0.25) },
    { label: 'Local mobility', value: Math.round(costVal * 0.1) },
  ];

  const timeBreakdown = [
    { label: 'Transit', value: `${Math.max(1, hours - 1)}h ${mins}m` },
    { label: 'Transfers', value: '30m' },
    { label: 'Walking / Boarding', value: '15m' },
  ];

  const reasons = Array.isArray(rec.explanation?.why_recommended) && rec.explanation.why_recommended.length > 0
    ? rec.explanation.why_recommended
    : ['Verified low-carbon route', 'Matches traveler priorities'];

  return {
    id: String(rec.id || `opt_${index}`),
    label: `Option ${String.fromCharCode(65 + index)}`,
    transport: rec.title || 'Sustainable Journey',
    icons,
    route: `${origin} → ${destination} (${rec.title || 'Transit'})`,
    time: formattedTime,
    timeMin: durMin,
    cost: costVal,
    carbonKg: carbonVal,
    access: accessRating,
    score: rec.green_accessible_score || Math.round(carbonScore * 0.4 + accessScore * 0.3 + costScore * 0.15 + timeScore * 0.15),
    sub,
    subDetail,
    costBreakdown,
    timeBreakdown,
    segments,
    accessItems: [
      { label: 'Step-free route', status: accessStatus },
      { label: 'Accessible transport', status: accessStatus },
      { label: 'Accessible stay', status: 'supported' as Evidence },
    ],
    reasons,
    tag,
    rawShowYourMath: rec.show_your_math,
    explanation: rec.explanation,
  };
}
