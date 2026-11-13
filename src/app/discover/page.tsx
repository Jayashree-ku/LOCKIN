'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/navigation/Sidebar';
import { INITIAL_BRANCHES } from '@/lib/data/referenceData';
import { useAuth } from '@/lib/context/AuthContext';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Compass,
  Code2,
  Brain,
  Radio,
  Settings,
  Zap,
  HardHat,
  Database,
  Sparkles,
} from 'lucide-react';

export default function DiscoverPage() {
  const { savedBranchIds, toggleSaveBranch } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Computer Science',
    'Core Engineering',
    'Electronics',
    'Mechanical',
    'Civil',
  ];

  const filteredBranches = INITIAL_BRANCHES.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.short_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Core Engineering') {
      return (
        matchesSearch &&
        (branch.category === 'Mechanical' || branch.category === 'Civil')
      );
    }
    return matchesSearch && branch.category === selectedCategory;
  });

  const getBranchIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return Code2;
      case 'Brain':
        return Brain;
      case 'Radio':
        return Radio;
      case 'Settings':
        return Settings;
      case 'Zap':
        return Zap;
      case 'HardHat':
        return HardHat;
      default:
        return Database;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-cream flex">
      <Sidebar />

      <main className="flex-1 md:pl-64 min-h-screen p-6 md:p-8 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {/* Top bar with search and avatar */}
        <header className="flex items-center justify-between gap-4 pb-2 border-b border-cream/5">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search branches... (e.g. AI, Mechanical, Electronics)"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-cream/5 border border-cream/10 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream/30 focus:bg-cream/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/profile"
              className="w-9 h-9 rounded-full bg-cream text-midnight font-bold text-xs flex items-center justify-center shadow-sm"
            >
              JK
            </Link>
          </div>
        </header>

        {/* Hero Banner: Explore Branches & 3D Saturn/Rings graphic */}
        <div className="bento-card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex flex-col gap-2 max-w-xl z-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-cream/60 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Explore Branches
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-cream tracking-tight">
              Find the branch that fits you.
            </h1>
            <p className="text-sm text-cream/70 leading-relaxed">
              Discover engineering branches, explore what they offer, career paths, salaries, and choose your path with confidence.
            </p>
          </div>

          {/* 3D Planet / Saturn SVG Artwork matching Image 4 */}
          <div className="w-44 h-44 shrink-0 relative select-none pointer-events-none">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full drop-shadow-2xl">
              <defs>
                <radialGradient id="saturnSphere" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#4A6572" />
                  <stop offset="40%" stopColor="#23395B" />
                  <stop offset="85%" stopColor="#14213D" />
                  <stop offset="100%" stopColor="#0B0B0C" />
                </radialGradient>
              </defs>
              {/* Back Ring */}
              <ellipse cx="100" cy="100" rx="90" ry="30" transform="rotate(-25 100 100)" stroke="#F4EDE0" strokeWidth="2.5" strokeOpacity="0.4" />
              {/* Main Sphere */}
              <circle cx="100" cy="100" r="42" fill="url(#saturnSphere)" />
              {/* Front Ring */}
              <path
                d="M 22 136 A 90 30 0 0 0 178 64"
                transform="rotate(-25 100 100)"
                stroke="#6388CB"
                strokeWidth="3"
                strokeOpacity="0.8"
              />
              <circle cx="140" cy="70" r="6" fill="#F4EDE0" opacity="0.9" />
            </svg>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-cream text-midnight shadow-sm'
                    : 'bg-cream/5 border border-cream/15 text-cream/70 hover:bg-cream/10 hover:text-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Link
            href="/quiz"
            className="text-xs font-semibold text-cream/80 hover:text-cream flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream/10 border border-cream/15"
          >
            <span>Compare Branches</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Grid of Branch Cards (Matching Image 4 Screen A) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredBranches.map((branch) => {
            const Icon = getBranchIcon(branch.icon_name);
            const isSaved = savedBranchIds.includes(branch.id);

            return (
              <div
                key={branch.id}
                className="bento-card p-6 flex flex-col justify-between gap-5 relative group"
              >
                {/* Top header of card */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-navy/80 border border-cream/10 flex items-center justify-center text-cream group-hover:bg-cream group-hover:text-midnight transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-cream tracking-tight group-hover:text-white">
                          {branch.short_name}
                        </h3>
                        {branch.is_popular && (
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-cream/50 font-medium">
                        {branch.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={() => toggleSaveBranch(branch.id)}
                    aria-label={isSaved ? 'Remove from saved' : 'Save branch'}
                    className="p-2 rounded-full text-cream/40 hover:text-cream hover:bg-cream/10 transition-colors"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-5 h-5 text-amber-300" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-cream/60 line-clamp-2 leading-relaxed">
                  {branch.description}
                </p>

                {/* Bottom tags & navigate arrow */}
                <div className="flex items-center justify-between pt-3 border-t border-cream/10">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {branch.tools_technologies.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-cream/5 border border-cream/10 text-[10px] text-cream/70 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/branches/${branch.slug}`}
                    className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center text-cream group-hover:bg-cream group-hover:text-midnight transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Career Quiz Banner (Matching Image 4 Screen A) */}
        <div className="bento-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#14213D] via-[#101c33] to-[#0B0B0C] border border-cream/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center text-cream shrink-0">
              <Compass className="w-6 h-6 text-cream" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-base sm:text-lg font-bold text-cream">
                Still confused?
              </h4>
              <p className="text-xs sm:text-sm text-cream/70">
                Take our quick career quiz to find your ideal engineering branch based on your natural skills.
              </p>
            </div>
          </div>

          <Link
            href="/quiz"
            className="px-6 py-3 rounded-full bg-cream text-midnight font-bold text-xs hover:bg-white transition-all shadow-glow-sm flex items-center gap-2 shrink-0"
          >
            <span>Take Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
