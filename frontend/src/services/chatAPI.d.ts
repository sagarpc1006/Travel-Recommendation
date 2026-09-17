export interface ChatResponse {
  success: boolean;
  message?: string;
  ai_response?: string;
  intent?: {
    origin?: string;
    destination?: string;
    travel_dates?: string;
    budget?: number;
    currency?: string;
    transport_mode?: string;
    eco_priority?: string;
    accessibility_required?: boolean;
    [key: string]: any;
  };
  travel_data?: {
    origin?: string;
    destination?: string;
    distance_km?: number;
    weather?: any;
    transit_options?: any[];
    eco_stays?: any[];
    [key: string]: any;
  };
  recommendations?: any[];
  eco_twin?: any;
  itinerary?: any;
  show_your_math?: any;
  official_links?: any[];
  [key: string]: any;
}

export declare function sendChatMessage(message: string): Promise<ChatResponse>;

declare const chatAPI: {
  sendChatMessage: typeof sendChatMessage;
};

export default chatAPI;
