import React from 'react';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  [key: string]: any;
}

export interface UserProfile {
  id?: number | string;
  firebase_uid?: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ user: any; profile: any }>;
  signup: (name: string, email: string, password: string) => Promise<{ user: any; profile: any }>;
  loginWithGoogle: () => Promise<{ user: any; profile: any }>;
  loginAsDemo: () => Promise<{ user: any; profile: any }>;
  logout: () => Promise<void>;
}

export declare const useAuth: () => AuthContextType;
export declare const AuthProvider: React.FC<{ children: React.ReactNode }>;
export declare const getFriendlyErrorMessage: (error: any) => string;
