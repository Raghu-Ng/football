import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url' || supabaseAnonKey === 'your_supabase_anon_key') {
  console.warn('Supabase environment variables are not properly configured. Please update your .env file with actual Supabase credentials.');
  
  // Create a mock client that won't crash the app
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null })
    },
    from: (table: string) => ({
      select: (columns?: string) => ({
        order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
        eq: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null })
      }),
      insert: (data: any) => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      update: (data: any) => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
      }),
      delete: () => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
      })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export type Database = {
  public: {
    Tables: {
      jerseys: {
        Row: {
          id: string;
          name: string;
          price: number;
          image_url: string;
          description: string;
          category: string;
          sizes: string[];
          stock: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          image_url: string;
          description: string;
          category: string;
          sizes: string[];
          stock: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          image_url?: string;
          description?: string;
          category?: string;
          sizes?: string[];
          stock?: number;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          total_amount: number;
          status: string;
          stripe_payment_intent_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_amount: number;
          status: string;
          stripe_payment_intent_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_amount?: number;
          status?: string;
          stripe_payment_intent_id?: string;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          jersey_id: string;
          quantity: number;
          size: string;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          jersey_id: string;
          quantity: number;
          size: string;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          jersey_id?: string;
          quantity?: number;
          size?: string;
          price?: number;
          created_at?: string;
        };
      };
    };
  };
};