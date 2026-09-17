// EcoTrail Recommendation Service
// Connects directly to Django REST Framework POST /api/recommendations/

// @ts-ignore - api.js is existing JavaScript Axios client
import api from './api.js';

export interface RecommendationWeights {
  carbon: number;
  accessibility: number;
  cost: number;
  time: number;
}

export interface RecommendationRequest {
  origin: string;
  destination: string;
  budget?: number | null;
  currency?: string;
  travel_dates?: string | null;
  eco_priority?: string | null;
  accessibility_required?: boolean;
  weights?: RecommendationWeights;
}

export interface ComponentScores {
  carbon: number;
  accessibility: number;
  cost: number;
  time: number;
}

export interface ShowYourMathData {
  weights?: RecommendationWeights;
  scores?: ComponentScores;
  inputs?: Record<string, any>;
  contributions?: Record<string, number>;
  calculation?: {
    carbon_contribution: number;
    accessibility_contribution: number;
    cost_contribution: number;
    time_contribution: number;
    final_score: number;
    formula?: string;
  };
  rounded_score?: number;
  sources?: {
    carbon?: Record<string, any>;
    accessibility?: Record<string, any>;
    cost?: Record<string, any>;
    time?: Record<string, any>;
  };
}

export interface RecommendationResult {
  id: string;
  rank?: number;
  title: string;
  transport?: {
    mode?: string;
    label?: string;
    [key: string]: any;
  } | string;
  green_accessible_score: number;
  scores: ComponentScores;
  weights?: RecommendationWeights;
  price?: {
    amount: number;
    currency: string;
  };
  duration_minutes?: number;
  distance_km?: number;
  carbon?: {
    kg_co2e: number;
    method?: string;
    [key: string]: any;
  };
  accessibility?: {
    rating?: number;
    score?: number;
    status?: string;
    status_label?: string;
    verified?: boolean;
    evidence_details?: any[];
    [key: string]: any;
  };
  show_your_math?: ShowYourMathData;
  explanation?: {
    why_recommended?: string[];
    comparison?: {
      carbon_reduction_percent?: number;
      cost_difference?: number;
      time_difference_minutes?: number;
      accessibility_difference?: number;
      [key: string]: any;
    };
    [key: string]: any;
  };
  within_budget?: boolean;
  over_budget?: boolean;
  [key: string]: any;
}

export interface RecommendationResponse {
  success: boolean;
  intent?: Record<string, any>;
  travel_data?: Record<string, any>;
  recommendations: {
    weights: RecommendationWeights;
    results: RecommendationResult[];
  };
  error?: string;
}

/**
 * Calls the Django recommendation engine (POST /api/recommendations/)
 * to generate deterministically scored and ranked multi-modal travel options.
 */
export async function getRecommendations(
  payload: RecommendationRequest
): Promise<RecommendationResponse> {
  const response = await api.post('/api/recommendations/', payload);
  return response.data;
}

export default {
  getRecommendations,
};
