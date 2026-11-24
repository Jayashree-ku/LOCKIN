'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { HeroStudentStairsArtwork } from '@/components/shared/StarrySkyBackground';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next');
  const { signUp, isConfigured } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const getDestination = () => {
    if (nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')) {
      return nextParam;
    }
    return '/dashboard';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const { data, error } = await signUp(trimmedEmail, password, trimmedName);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Registration failed. Please check your information and try again.');
    } else {
      // Check if email confirmation is required by Supabase
      if (data?.user && !data?.session && isConfigured) {
        setSuccessMsg(
          'Registration successful! Please check your email to verify your account before logging in.'
        );
      } else {
        router.push(getDestination());
        router.refresh();
      }
    }
  };

  return (
    <div className="w-full max-w-md cream-container p-8 sm:p-10 md:p-12 shadow-2xl relative flex flex-col justify-between min-h-[580px]">
      {/* Top navigation helper */}
      <div className="flex items-center justify-end text-xs text-midnight/70 mb-4">
        <span>Already have an account?</span>
        <Link
          href={nextParam ? `/login?next=${encodeURIComponent(nextParam)}` : '/login'}
          className="ml-1.5 font-bold text-midnight hover:underline flex items-center gap-0.5"
        >
          <span>Log in</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Toggle pill */}
      <div className="w-fit mb-6 bg-black/10 p-1 rounded-full flex items-center">
        <Link
          href={nextParam ? `/login?next=${encodeURIComponent(nextParam)}` : '/login'}
          className="px-5 py-1.5 rounded-full text-midnight/70 hover:text-midnight text-xs font-medium transition-colors"
        >
          Login
        </Link>
        <span className="px-5 py-1.5 rounded-full bg-midnight text-cream text-xs font-semibold shadow-sm">
          Sign Up
        </span>
      </div>

      {/* Headings */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-midnight tracking-tight">
          Create your account
        </h2>
        <p className="text-xs sm:text-sm text-midnight/60 mt-1">
          Start your 4-year engineering discovery and roadmap.
        </p>
      </div>

      {!isConfigured && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-600/30 text-amber-900 text-xs leading-relaxed">
          <strong>Testing Mode:</strong> Supabase API keys are not detected in <code className="font-mono">.env.local</code>. You can register a test profile to explore the platform.
        </div>
      )}

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-600/30 text-red-900 text-xs leading-relaxed">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-600/30 text-emerald-950 text-xs leading-relaxed flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1.5">
            <span>{successMsg}</span>
            <Link
              href="/login"
              className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
            >
              Go to Sign In →
            </Link>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {/* Full Name */}
        <div className="relative">
          <User className="w-4 h-4 text-midnight/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            disabled={loading}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name (e.g. Jayashree K)"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-midnight/15 bg-white/60 focus:bg-white text-midnight placeholder:text-midnight/40 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-midnight/20 transition-all disabled:opacity-50"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="w-4 h-4 text-midnight/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-midnight/15 bg-white/60 focus:bg-white text-midnight placeholder:text-midnight/40 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-midnight/20 transition-all disabled:opacity-50"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="w-4 h-4 text-midnight/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 characters)"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-midnight/15 bg-white/60 focus:bg-white text-midnight placeholder:text-midnight/40 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-midnight/20 transition-all disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-midnight/40 hover:text-midnight"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-3.5 rounded-xl bg-midnight text-cream hover:bg-black font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-60"
        >
          <span>{loading ? 'Creating account...' : 'Create Account & Continue'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-midnight/10 text-center text-[11px] text-midnight/50">
        By creating an account, you agree to LOCKIN Terms of Service and Privacy Policy.
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col lg:flex-row items-stretch select-none">
      {/* Left Column: Visual Storytelling */}
      <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-[#14213D] via-[#0d162a] to-[#0B0B0C]">
        <div className="absolute top-12 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <Link href="/login" className="inline-block z-10">
          <span className="text-3xl font-extrabold tracking-tight text-cream">
            lockin<span className="text-cream/50">.</span>
          </span>
        </Link>

        <div className="my-auto py-8 z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cream leading-[1.1]">
              Stop guessing. <br />
              Start <span className="italic font-serif font-normal text-white">locking in.</span>
            </h1>
            <p className="text-cream/80 text-lg sm:text-xl font-medium">
              Join the new generation of engineers who know what to do next.
            </p>
          </div>

          <div className="w-full flex items-center justify-center my-4">
            <HeroStudentStairsArtwork className="max-w-[400px]" />
          </div>
        </div>

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
            </div>
            <span className="text-xs text-cream/70 font-medium">
              Join <strong className="text-cream font-semibold">50K+ students</strong> locking in their path.
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
        <Suspense fallback={<div className="text-cream text-xs">Loading signup...</div>}>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}
