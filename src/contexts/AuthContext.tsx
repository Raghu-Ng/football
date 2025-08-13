import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from '../lib/supabase';


interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Timeout helper to prevent infinite waiting
const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), ms)
    ),
  ]);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  // Use the singleton supabase client from lib/supabase

  useEffect(() => {
    
    console.log("[AuthProvider] Getting initial session...");
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        console.log("[AuthProvider] Initial session:", session);
        setSession(session);
        setUser(session?.user ?? null);
      })
      .catch((err) => {
        console.error("[AuthProvider] getSession error:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("[AuthProvider] Auth state change:", _event, session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    console.log("[AuthProvider] Signing up...");
    const { error } = await withTimeout(
      supabase.auth.signUp({ email, password }),
      8000
    );
    if (error) throw error;
    console.log("[AuthProvider] Sign-up successful");
  };

  const signIn = async (email: string, password: string) => {
    
    console.log("[AuthProvider] Signing in...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    console.log("[AuthProvider] Sign-in successful");
  };

  const signOut = async () => {
    console.log("[AuthProvider] Signing out...");
    const { error } = await withTimeout(supabase.auth.signOut(), 5000);
    if (error) throw error;
    console.log("[AuthProvider] Signed out successfully");
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
