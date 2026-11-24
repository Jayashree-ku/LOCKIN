import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isSupabaseConfigured, getSupabaseUrl, getSupabaseAnonKey } from './client';

// Public authentication routes
const PUBLIC_AUTH_ROUTES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/auth/callback',
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = PUBLIC_AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  let isAuthenticated = false;

  if (isSupabaseConfigured()) {
    const supabaseUrl = getSupabaseUrl();
    const supabaseKey = getSupabaseAnonKey();

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // IMPORTANT: Verify session with Supabase server
    const {
      data: { user },
    } = await supabase.auth.getUser();

    isAuthenticated = Boolean(user);
  } else {
    // Local offline/demo mode testing session check
    const demoCookie = request.cookies.get('lockin_session')?.value;
    isAuthenticated = demoCookie === 'true';
  }

  // Case 1: Unauthenticated visitor accessing root '/' -> redirect to /login
  if (!isAuthenticated && pathname === '/') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    const redirectResponse = NextResponse.redirect(redirectUrl);

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return redirectResponse;
  }

  // Case 2: Authenticated visitor accessing root '/' -> redirect to /dashboard
  if (isAuthenticated && pathname === '/') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    const redirectResponse = NextResponse.redirect(redirectUrl);

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return redirectResponse;
  }

  // Case 3: Unauthenticated user accessing a protected route -> redirect to /login
  if (!isAuthenticated && !isAuthRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set(
      'next',
      request.nextUrl.pathname + request.nextUrl.search
    );
    const redirectResponse = NextResponse.redirect(redirectUrl);

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return redirectResponse;
  }

  // Case 4: Authenticated user visiting /login or /signup -> redirect to /dashboard
  if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    const nextParam = request.nextUrl.searchParams.get('next');
    const targetPath =
      nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')
        ? nextParam
        : '/dashboard';
    const redirectUrl = new URL(targetPath, request.url);
    const redirectResponse = NextResponse.redirect(redirectUrl);

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return redirectResponse;
  }

  return supabaseResponse;
}
