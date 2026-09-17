export interface UserPreferences {
  ecoPriority: string;
  budget: string;
  transportPreference: string;
  accessibility: string;
  [key: string]: any;
}

export interface EcoImpactData {
  carbonAvoidedKg: number;
  sustainableChoices: number;
  tripsOptimized: number;
  [key: string]: any;
}

export interface EcoScoreData {
  score: number;
  tier: string;
  breakdown?: any;
  [key: string]: any;
}

export declare function getRecentTrips(): Promise<any[]>;
export declare function saveTrip(tripData: Record<string, any>): Promise<any>;
export declare function deleteTrip(tripId: string | number): Promise<any>;
export declare function getTripById(tripId: string | number): Promise<any>;
export declare function getUserPreferences(): Promise<UserPreferences>;
export declare function getEcoImpact(): Promise<EcoImpactData>;
export declare function getEcoScore(): Promise<EcoScoreData>;

declare const tripAPI: {
  getRecentTrips: typeof getRecentTrips;
  saveTrip: typeof saveTrip;
  deleteTrip: typeof deleteTrip;
  getTripById: typeof getTripById;
  getUserPreferences: typeof getUserPreferences;
  getEcoImpact: typeof getEcoImpact;
  getEcoScore: typeof getEcoScore;
};

export default tripAPI;
