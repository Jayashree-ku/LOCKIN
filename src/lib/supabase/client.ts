import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

export const getSupabaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
};

export const getSupabaseAnonKey = (): string => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    ''
  );
};

export const isSupabaseConfigured = (): boolean => {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();

  return Boolean(
    url &&
    key &&
    url.trim().length > 0 &&
    key.trim().length > 0 &&
    url.startsWith('https://') &&
    !url.includes('your-project-id')
  );
};

let browserClient: SupabaseClient | null = null;

export const createClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(
      getSupabaseUrl(),
      getSupabaseAnonKey()
    );
  }

  return browserClient;
};
