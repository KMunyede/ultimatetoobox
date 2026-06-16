"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/wisdom/firebase";

export interface UserProfile {
  userId: string;
  currentStreak: number;
  longestStreak: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isPremium: true, // All features are free right now
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // MOCK STATE - Disabling paywall/auth logic for now as requested
  const isPremium = true;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // NOTE: Even if user is not logged in, we are treating them as premium/free
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Here we would normally fetch the user profile from Firestore
        // For now, we mock the profile
        setProfile({
          userId: firebaseUser.uid,
          currentStreak: 0,
          longestStreak: 0,
        });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // FORCE MOCK LOGGED IN USER FOR NOW SO FEATURES WORK WITHOUT LOGIN
  const effectiveUser = user || ({ uid: "mock-user-123", email: "mock@example.com" } as User);
  const effectiveProfile = profile || { userId: "mock-user-123", currentStreak: 5, longestStreak: 12 };

  return (
    <AuthContext.Provider value={{ 
      user: effectiveUser, 
      profile: effectiveProfile, 
      loading, // Use actual loading state
      isPremium 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

