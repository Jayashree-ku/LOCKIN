'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg(null);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Failed to send reset link.');
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center p-6">
      <div className="w-full max-w-md cream-container p-8 sm:p-10 shadow-2xl">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-midnight/70 hover:text-midnight mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to login</span>
        </Link>

        {submitted ? (
          <div className="flex flex-col items-center text-center gap-3 py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-800 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-midnight">Check your inbox</h2>
            <p className="text-xs text-midnight/70">
              We've dispatched password reset instructions to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-extrabold text-midnight tracking-tight">
              Reset your password
            </h1>
            <p className="text-xs text-midnight/60 mt-1 mb-6">
              Enter your student email address and we'll send you a recovery link.
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/15 text-red-900 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <Mail className="w-4 h-4 text-midnight/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-midnight/15 bg-white/60 focus:bg-white text-midnight text-xs font-medium focus:outline-none focus:ring-2 focus:ring-midnight/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-midnight text-cream hover:bg-black font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Sending link...' : 'Send Reset Link'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
