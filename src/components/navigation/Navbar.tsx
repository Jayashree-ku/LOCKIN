'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { ArrowRight, LayoutDashboard, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, profile } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#0B0B0C]/75 border-b border-cream/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold tracking-tight text-cream">
            lockin<span className="text-cream/50 group-hover:text-cream transition-colors">.</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-cream/70">
          <Link href="/discover" className="hover:text-cream transition-colors">
            Explore
          </Link>
          <Link href="/#how-it-works" className="hover:text-cream transition-colors">
            How it works
          </Link>
          <Link href="/quiz" className="hover:text-cream transition-colors">
            Branch Quiz
          </Link>
          <Link href="/roadmap" className="hover:text-cream transition-colors">
            Roadmaps
          </Link>
          <Link href="/learn" className="hover:text-cream transition-colors">
            Learn Hub
          </Link>
          <Link href="/projects" className="hover:text-cream transition-colors">
            Projects
          </Link>
        </nav>

        {/* Auth / CTA Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-cream text-midnight font-semibold text-sm hover:bg-white transition-all shadow-glow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-full text-sm font-medium text-cream/90 hover:text-white hover:bg-cream/10 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/onboarding"
                className="px-5 py-2.5 rounded-full bg-cream text-midnight font-semibold text-sm hover:bg-white transition-all shadow-glow-sm flex items-center gap-1.5"
              >
                <span>Get started</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
