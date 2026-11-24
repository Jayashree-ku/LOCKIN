import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { isSupabaseConfigured, getSupabaseUrl, getSupabaseAnonKey } from './client';

export const createServerSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = cookies();
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseAnonKey();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Can be ignored if middleware is refreshing sessions
        }
      },
    },
  });
};

// Canonical export for server usage
export const createClient = createServerSupabaseClient;
