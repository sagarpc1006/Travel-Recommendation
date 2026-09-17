// EcoTrail Discover Service
// Thin wrapper over existing api.js to call Django Discover endpoints:
// GET /api/discover/?search=<query>&category=<category>
// GET /api/discover/<place_name>/

// @ts-ignore - api.js is existing JavaScript module
import api from './api.js';

export interface ApiWeather {
  temperature?: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  humidity?: number;
  condition?: string;
  description?: string;
  icon?: string;
  rain_probability?: number;
  city?: string;
  status?: string;
  [key: string]: any;
}

export interface ApiOfficialLink {
  title?: string;
  url?: string;
  provider?: string;
  is_official?: boolean;
  is_package?: boolean;
  badge?: string;
  category?: string;
  price_inr?: number;
  [key: string]: any;
}

export interface ApiPlace {
  id: string | number;
  name: string;
  state?: string;
  type?: string;
  tag?: string;
  rating?: string | number;
  img?: string;
  categories?: string[];
  eco_score?: number;
  co2_kg?: number;
  carbon_saved_percent?: number;
  transit_tip?: string;
  description?: string;
  highlights?: string[];
  weather?: ApiWeather;
  official_links?: ApiOfficialLink[];
  official_package?: ApiOfficialLink | null;
  has_official_package?: boolean;
  lat?: number;
  lon?: number;
  [key: string]: any;
}

export interface ApiDiscoverResponse {
  success: boolean;
  count: number;
  category?: string;
  search?: string;
  places: ApiPlace[];
}

export interface ApiPlaceDetailResponse {
  success: boolean;
  place: ApiPlace;
}

/**
 * Discovers places matching an optional search term and category.
 * Calls Django GET /api/discover/
 */
export async function discoverPlaces(
  search?: string,
  category?: string
): Promise<ApiDiscoverResponse> {
  const params: Record<string, string> = {};
  if (search && search.trim()) {
    params.search = search.trim();
  }
  if (category && category.trim() && category !== 'All') {
    params.category = category.trim();
  }

  const response = await api.get('/api/discover/', { params });
  return response.data;
}

/**
 * Fetches real-time destination details with live weather and official booking packages.
 * Calls Django GET /api/discover/<place_name>/
 */
export async function getPlaceDetail(placeName: string): Promise<ApiPlaceDetailResponse> {
  const cleanName = encodeURIComponent(placeName.trim());
  const response = await api.get(`/api/discover/${cleanName}/`);
  return response.data;
}

export default {
  discoverPlaces,
  getPlaceDetail,
};
