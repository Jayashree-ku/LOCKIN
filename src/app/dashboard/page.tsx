'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { Sidebar } from '@/components/navigation/Sidebar';
import { INITIAL_BRANCHES } from '@/lib/data/referenceData';
import {
  Search,
  Bell,
  Calendar,
  BarChart3,
  ArrowRight,
  Sparkles,
  BookOpen,
  Compass,
  Rocket,
  Trophy,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function DashboardPage() {
  const { profile, savedBranchIds, completedMilestoneIds } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const currentBranch =
    INITIAL_BRANCHES.find((b) => b.id === profile?.selected_branch_id) ||
    INITIAL_BRANCHES[0]; // AI & Data Science default

  const savedBranches = INITIAL_BRANCHES.filter((b) =>
    savedBranchIds.includes(b.id)
  );

  const calculateProgress = () => {
    // 8 semesters * ~2 milestones = ~16 total
    const totalMilestones = 16;
    const completedCount = completedMilestoneIds.length;
    const pct = Math.min(100, Math.round((completedCount / totalMilestones) * 100));
    return Math.max(pct, 45); // default realistic progress ~60%
  };

  const progressPct = calculateProgress();

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-cream flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 min-h-screen p-6 md:p-8 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {/* Top Navigation Bar: Search, Notifications, Avatar */}
        <header className="flex items-center justify-between gap-4 pb-2 border-b border-cream/5">
          {/* Search bar matching design */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything... (e.g. Python, DSA, projects)"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-cream/5 border border-cream/10 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream/30 focus:bg-cream/10 transition-all"
            />
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center text-cream/70 hover:text-cream hover:bg-cream/10 transition-all relative"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-2 right-2 ring-2 ring-[#0B0B0C]" />
            </button>

            <Link
              href="/profile"
              className="w-9 h-9 rounded-full bg-cream text-midnight font-bold text-xs flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
            >
              {profile?.full_name ? profile.full_name.substring(0, 2).toUpperCase() : 'JK'}
            </Link>
          </div>
        </header>

        {/* Welcome Greeting */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-cream tracking-tight flex items-center gap-2">
            <span>Welcome back, {profile?.full_name || 'Jayashree'}!</span>
            <Sparkles className="w-5 h-5 text-amber-300 inline-block" />
          </h1>
          <p className="text-sm text-cream/60">
            Let's get your future in motion.
          </p>
        </div>

        {/* Bento Grid Layout (Matching Image 3 Screen B) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Bento 1: Large Hero Card — Selected Branch */}
          <div className="md:col-span-12 lg:col-span-7 bento-card p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[250px]">
            {/* Luminous blue mesh wave graphic in background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-600/30 via-cyan-500/10 to-transparent blur-2xl pointer-events-none" />
            <svg
              className="absolute right-0 bottom-0 w-72 h-48 opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none"
              viewBox="0 0 300 200"
              fill="none"
            >
              <path
                d="M10 180 Q80 20 180 120 T300 40"
                stroke="#38bdf8"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M30 190 Q100 50 200 140 T320 60"
                stroke="#6388cb"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <circle cx="180" cy="120" r="5" fill="#38bdf8" />
              <circle cx="240" cy="80" r="4" fill="#93c5fd" />
            </svg>

            {/* Left Content */}
            <div className="flex flex-col gap-2 z-10 max-w-md">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cream/60">
                Your Branch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-cream tracking-tight">
                {currentBranch.name}
              </h2>
              <p className="text-sm text-cream/70 font-medium">
                {currentBranch.tagline}
              </p>
            </div>

            <div className="pt-6 z-10">
              <Link
                href={`/roadmap`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cream text-midnight font-bold text-xs hover:bg-white transition-all shadow-glow-sm group/btn"
              >
                <span>Explore roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bento 2: Stat Card — Year of Study (Cream Card) */}
          <div className="md:col-span-6 lg:col-span-2 cream-container p-6 flex flex-col justify-between shadow-lg">
            <div className="w-9 h-9 rounded-xl bg-midnight/10 flex items-center justify-center text-midnight">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col mt-4">
              <span className="text-3xl font-extrabold text-midnight tracking-tight">
                0{profile?.current_year || 2}
              </span>
              <span className="text-xs font-semibold text-midnight/70">
                Year of study
              </span>
            </div>
          </div>

          {/* Bento 3: Stat Card — Roadmap Progress */}
          <div className="md:col-span-6 lg:col-span-3 bento-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-cream/10 flex items-center justify-center text-cream">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-cream/50 font-medium">Semester 3 of 8</span>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-cream tracking-tight">
                  {progressPct}%
                </span>
                <span className="text-xs font-medium text-cream/60">
                  Roadmap progress
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-cream/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cream transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bento 4: Your Next Moves */}
          <div className="md:col-span-12 lg:col-span-7 bento-card p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-cream tracking-tight">
                  Your Next Moves
                </h3>
                <p className="text-xs text-cream/50">Personalized to keep you ahead</p>
              </div>
              <Link
                href="/roadmap"
                className="text-xs font-semibold text-cream/70 hover:text-cream flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {/* Move 1 */}
              <div className="p-4 rounded-xl bg-cream/5 border border-cream/10 flex items-center justify-between gap-4 group hover:border-cream/25 hover:bg-cream/10 transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-full border-2 border-cream/30 flex items-center justify-center text-cream text-xs group-hover:border-cream">
                    1
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-cream">
                      Explore Python fundamentals
                    </span>
                    <span className="text-[11px] text-cream/50">
                      Build a strong base in Python syntax & data structures
                    </span>
                  </div>
                </div>
                <Link
                  href="/learn"
                  className="px-4 py-1.5 rounded-full bg-cream/10 group-hover:bg-cream group-hover:text-midnight text-cream text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <span>Start</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Move 2 */}
              <div className="p-4 rounded-xl bg-cream/5 border border-cream/10 flex items-center justify-between gap-4 group hover:border-cream/25 hover:bg-cream/10 transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-full border-2 border-cream/30 flex items-center justify-center text-cream text-xs group-hover:border-cream">
                    2
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-cream">
                      Try your first mini project
                    </span>
                    <span className="text-[11px] text-cream/50">
                      Turn your housing price prediction ideas into code
                    </span>
                  </div>
                </div>
                <Link
                  href="/projects"
                  className="px-4 py-1.5 rounded-full bg-cream/10 group-hover:bg-cream group-hover:text-midnight text-cream text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <span>Start</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Move 3 */}
              <div className="p-4 rounded-xl bg-cream/5 border border-cream/10 flex items-center justify-between gap-4 group hover:border-cream/25 hover:bg-cream/10 transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-full border-2 border-cream/30 flex items-center justify-center text-cream text-xs group-hover:border-cream">
                    3
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-cream">
                      Continue your roadmap
                    </span>
                    <span className="text-[11px] text-cream/50">
                      Stay on track for your semester 3 milestones
                    </span>
                  </div>
                </div>
                <Link
                  href="/roadmap"
                  className="px-4 py-1.5 rounded-full bg-cream/10 group-hover:bg-cream group-hover:text-midnight text-cream text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bento 5: Saved Branches */}
          <div className="md:col-span-12 lg:col-span-5 bento-card p-6 sm:p-8 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-cream tracking-tight">
                Saved Branches
              </h3>
              <Link
                href="/discover"
                className="text-xs font-semibold text-cream/70 hover:text-cream flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              {(savedBranches.length > 0 ? savedBranches : INITIAL_BRANCHES.slice(1, 4)).map((branch) => (
                <div
                  key={branch.id}
                  className="p-3.5 rounded-xl bg-cream/5 border border-cream/10 flex items-center justify-between hover:bg-cream/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center text-cream/80 text-xs font-bold">
                      {branch.short_name.substring(0, 2)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-cream">
                        {branch.short_name}
                      </span>
                      <span className="text-[10px] text-cream/50">
                        {branch.tagline}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/branches/${branch.slug}`}
                    className="text-[11px] font-medium text-cream/70 hover:text-cream flex items-center gap-1"
                  >
                    <span>Explore again</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Bento 6: Your Roadmap Preview */}
          <div className="md:col-span-12 lg:col-span-8 bento-card p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-cream tracking-tight">
                Your Roadmap Preview
              </h3>
              <Link
                href="/roadmap"
                className="text-xs font-semibold text-cream/70 hover:text-cream flex items-center gap-1"
              >
                <span>View full roadmap</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* 4 Years Progression Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center pt-2">
              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-cream/5 border border-cream/15">
                <div className="w-10 h-10 rounded-full bg-cream text-midnight flex items-center justify-center font-bold text-xs shadow-glow-sm">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-cream">Year 1</span>
                  <span className="text-[10px] text-cream/50">Fundamentals</span>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-navy/60 border border-blue-400/30">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-glow-blue">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Year 2</span>
                  <span className="text-[10px] text-blue-200">Core Skills</span>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-cream/5 border border-cream/10">
                <div className="w-10 h-10 rounded-full bg-cream/10 text-cream flex items-center justify-center font-bold text-xs">
                  <Rocket className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-cream/80">Year 3</span>
                  <span className="text-[10px] text-cream/40">Projects & Internships</span>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-cream/5 border border-cream/10">
                <div className="w-10 h-10 rounded-full bg-cream/10 text-cream flex items-center justify-center font-bold text-xs">
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-cream/80">Year 4</span>
                  <span className="text-[10px] text-cream/40">Placements & Capstone</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento 7: Dream it. Plan it. Lock it. */}
          <div className="md:col-span-12 lg:col-span-4 bento-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group min-h-[180px]">
            <div className="flex flex-col gap-1 z-10">
              <h3 className="text-xl font-bold text-cream tracking-tight">
                Dream it. <br />
                Plan it. Lock it.
              </h3>
            </div>

            <div className="pt-4 z-10">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream text-midnight font-bold text-xs hover:bg-white transition-all shadow-glow-sm"
              >
                <span>Explore more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
