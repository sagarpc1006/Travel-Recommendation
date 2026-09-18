// EcoTrail Accessibility Service
// Connects directly to Django REST Framework:
// GET /api/accessibility/profile/
// PATCH /api/accessibility/profile/
// POST /api/accessibility/verify-photo/

// @ts-ignore - client.js is existing JavaScript Axios client
import apiClient from '../api/client.js';

export interface AccessibilityProfileData {
  user_id?: number;
  client_id?: string;
  wheelchair_required: boolean;
  step_free_required: boolean;
  accessible_vehicle_required: boolean;
  accessible_venue_required: boolean;
  accessible_toilet_preferred: boolean;
  elevator_preferred: boolean;
  reduced_walking: boolean;
  updated_at?: string;
  created_at?: string;
}

export interface AccessibilityProfileResponse {
  success: boolean;
  profile: AccessibilityProfileData;
  errors?: Record<string, any>;
}

export interface PhotoVerificationData {
  id: number;
  claim_type: string;
  detected: boolean;
  confidence: number;
  status: 'verified' | 'ai_supported' | 'needsreview' | 'insufficient' | 'conflicting' | 'unknown' | 'unable' | string;
  evidence: string;
  limitations?: string;
}

export interface PhotoVerificationResponse {
  success: boolean;
  verification?: PhotoVerificationData;
  errors?: Record<string, any>;
  message?: string;
}

/**
 * Retrieves the user's accessibility profile from PostgreSQL/Django.
 * GET /api/accessibility/profile/
 */
export async function getAccessibilityProfile(): Promise<AccessibilityProfileResponse> {
  const response = await apiClient.get('/api/accessibility/profile/');
  return response.data;
}

/**
 * Updates the user's accessibility requirements in PostgreSQL/Django.
 * PATCH /api/accessibility/profile/
 */
export async function updateAccessibilityProfile(
  data: Partial<AccessibilityProfileData>
): Promise<AccessibilityProfileResponse> {
  const response = await apiClient.patch('/api/accessibility/profile/', data);
  return response.data;
}

/**
 * Uploads an accessibility feature photo to be analyzed by the vision verification pipeline.
 * POST /api/accessibility/verify-photo/
 */
export async function verifyAccessibilityPhoto(
  formData: FormData
): Promise<PhotoVerificationResponse> {
  const response = await apiClient.post('/api/accessibility/verify-photo/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export default {
  getAccessibilityProfile,
  updateAccessibilityProfile,
  verifyAccessibilityPhoto,
};
