'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { HeroStudentStairsArtwork } from '@/components/shared/StarrySkyBackground';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next');
  const { signIn, isConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getDestination = () => {
    if (nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')) {
      return nextParam;
    }
    return '/discover';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Login failed. Please check your credentials.');
    } else {
      router.push(getDestination());
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-md cream-container p-8 sm:p-10 md:p-12 shadow-2xl relative flex flex-col justify-between min-h-[580px]">
      {/* Top navigation helper */}
      <div className="flex items-center justify-end text-xs text-midnight/70 mb-4">
        <span>Don't have an account?</span>
        <Link
          href={nextParam ? `/signup?next=${encodeURIComponent(nextParam)}` : '/signup'}
          className="ml-1.5 font-bold text-midnight hover:underline flex items-center gap-0.5"
        >
          <span>Sign up</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Toggle pill: Login / Sign Up */}
      <div className="w-fit mb-6 bg-black/10 p-1 rounded-full flex items-center">
        <span className="px-5 py-1.5 rounded-full bg-midnight text-cream text-xs font-semibold shadow-sm">
          Login
        </span>
        <Link
          href={nextParam ? `/signup?next=${encodeURIComponent(nextParam)}` : '/signup'}
          className="px-5 py-1.5 rounded-full text-midnight/70 hover:text-midnight text-xs font-medium transition-colors"
        >
          Sign Up
        </Link>
      </div>

      {/* Headings */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-midnight tracking-tight">
          Welcome back!
        </h2>
        <p className="text-xs sm:text-sm text-midnight/60 mt-1">
          Let's get you back on track.
        </p>
      </div>

      {!isConfigured && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-600/30 text-amber-900 text-xs leading-relaxed">
          <strong>Offline / Demo Mode:</strong> Click Continue with Google or enter any credentials to explore LOCKIN. Add Supabase keys to <code className="font-mono">.env.local</code> for live persistence.
        </div>
      )}

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-600/30 text-red-900 text-xs">
          {errorMsg}
        </div>
      )}

      {/* Google Sign In */}
      <button
        type="button"
        onClick={async () => {
          setEmail('jayashree@student.lockin.dev');
          setPassword('password123');
          setLoading(true);
          const { error } = await signIn('jayashree@student.lockin.dev', 'password123');
          setLoading(false);
          if (!error) {
            router.push(getDestination());
            router.refresh();
          }
        }}
        className="w-full py-3 px-4 rounded-xl border border-midnight/15 bg-white/70 hover:bg-white text-midnight font-medium text-xs flex items-center justify-center gap-2.5 transition-all shadow-sm"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Divider */}
      <div className="my-5 flex items-center">
        <div className="flex-1 border-t border-midnight/15" />
        <span className="px-3 text-[11px] font-medium text-midnight/40 uppercase tracking-wider">or</span>
        <div className="flex-1 border-t border-midnight/15" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {/* Email */}
        <div className="relative">
          <Mail className="w-4 h-4 text-midnight/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-midnight/15 bg-white/60 focus:bg-white text-midnight placeholder:text-midnight/40 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-midnight/20 transition-all"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="w-4 h-4 text-midnight/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-midnight/15 bg-white/60 focus:bg-white text-midnight placeholder:text-midnight/40 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-midnight/20 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-midnight/40 hover:text-midnight"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Checkbox & Forgot Password */}
        <div className="flex items-center justify-between text-[11px] text-midnight/70 pt-0.5">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-midnight/30 text-midnight focus:ring-0"
            />
            <span>Remember me</span>
          </label>
          <Link href="/forgot-password" className="hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3.5 rounded-xl bg-midnight text-cream hover:bg-black font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 group"
        >
          <span>{loading ? 'Logging in...' : 'Log In'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      {/* Social Icons */}
      <div className="mt-6 pt-4 border-t border-midnight/10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase font-semibold tracking-wider text-midnight/40">
          Or continue with
        </span>
        <div className="flex items-center gap-3">
          {['Discord', 'GitHub', 'X'].map((prov) => (
            <button
              key={prov}
              type="button"
              onClick={async () => {
                const demoMail = `student.${prov.toLowerCase()}@lockin.dev`;
                setEmail(demoMail);
                setPassword('lockin123');
                setLoading(true);
                const { error } = await signIn(demoMail, 'lockin123');
                setLoading(false);
                if (!error) {
                  router.push(getDestination());
                  router.refresh();
                }
              }}
              className="w-9 h-9 rounded-xl border border-midnight/15 bg-white/40 hover:bg-white flex items-center justify-center text-midnight/70 hover:text-midnight text-xs font-bold transition-all"
              title={`Sign in with ${prov}`}
            >
              {prov[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col lg:flex-row items-stretch select-none">
      {/* Left Column: Visual Storytelling */}
      <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-[#14213D] via-[#0d162a] to-[#0B0B0C]">
        {/* Orbital and star elements */}
        <div className="absolute top-12 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand */}
        <Link href="/" className="inline-block z-10">
          <span className="text-3xl font-extrabold tracking-tight text-cream">
            lockin<span className="text-cream/50">.</span>
          </span>
        </Link>

        {/* Hero Copy & Visual Artwork */}
        <div className="my-auto py-8 z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cream leading-[1.1]">
              Stop guessing. <br />
              Start <span className="italic font-serif font-normal text-white">locking in.</span>
            </h1>
            <p className="text-cream/80 text-lg sm:text-xl font-medium">
              Your branch. Your journey. Your future.
            </p>
          </div>

          <div className="w-full flex items-center justify-center my-4">
            <HeroStudentStairsArtwork className="max-w-[400px]" />
          </div>
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="z-10 flex items-center justify-between pt-6 border-t border-cream/10">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-navy bg-amber-600 flex items-center justify-center text-[10px] font-bold text-white">
                AY
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-navy bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                RK
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-navy bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">
                SM
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-navy bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                JK
              </div>
            </div>
            <span className="text-xs text-cream/70 font-medium">
              Join <strong className="text-cream font-semibold">50K+ students</strong> on their engineering journey.
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 font-script text-xl text-cream/90">
            <span>Find your path</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      {/* Right Column: Cream Container Auth Card */}
      <div className="lg:w-1/2 p-6 sm:p-10 md:p-14 lg:p-16 flex items-center justify-center bg-[#0B0B0C]">
        <Suspense fallback={<div className="text-cream text-xs">Loading login...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
