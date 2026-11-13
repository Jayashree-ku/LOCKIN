import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id')
  );
};

let browserClient: SupabaseClient | null = null;

export const createClient = () => {
  if (!isSupabaseConfigured()) {
    // Return null or fallback when not configured
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(
      supabaseUrl!,
      supabaseAnonKey!
    );
  }

  return browserClient;
};
