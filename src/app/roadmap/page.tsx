'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/navigation/Sidebar';
import { INITIAL_BRANCHES, INITIAL_ROADMAPS } from '@/lib/data/referenceData';
import { useAuth } from '@/lib/context/AuthContext';
import {
  Compass,
  CheckCircle2,
  Circle,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Briefcase,
  Trophy,
  Filter,
} from 'lucide-react';

export default function RoadmapPage() {
  const { profile, completedMilestoneIds, toggleCompleteMilestone } = useAuth();

  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>('ai-data-science');
  const [selectedYear, setSelectedYear] = useState<number>(0); // 0 = all years
  const [filterType, setFilterType] = useState<string>('all'); // all, skill, project, internship, career_prep

  const currentBranch =
    INITIAL_BRANCHES.find((b) => b.slug === selectedBranchSlug) || INITIAL_BRANCHES[0];

  const currentRoadmap =
    INITIAL_ROADMAPS[selectedBranchSlug] || INITIAL_ROADMAPS['ai-data-science'];

  const semesters = currentRoadmap.semesters || [];

  const filteredSemesters = semesters.filter((sem) => {
    if (selectedYear !== 0 && sem.year_number !== selectedYear) return false;
    return true;
  });

  const getMilestoneTypeBadge = (type: string) => {
    switch (type) {
      case 'skill':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/20';
      case 'technology':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20';
      case 'project':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20';
      case 'internship':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/20';
      case 'career_prep':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/20';
      default:
        return 'bg-cream/10 text-cream border-cream/15';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-cream flex">
      <Sidebar />

      <main className="flex-1 md:pl-64 min-h-screen p-6 md:p-8 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {/* Header with Branch Selector */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cream/10">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-cream/50">
              4-Year Undergraduate Pathway
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-cream tracking-tight">
              {currentBranch.short_name} Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-cream/60">
              Structured semester-by-semester milestones, core subjects, projects, and interview preparation.
            </p>
          </div>

          {/* Branch Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-cream/50 hidden sm:inline">Switch branch:</label>
            <select
              value={selectedBranchSlug}
              onChange={(e) => setSelectedBranchSlug(e.target.value)}
              className="px-4 py-2 rounded-xl bg-cream/10 border border-cream/20 text-xs font-semibold text-cream focus:outline-none"
            >
              {INITIAL_BRANCHES.map((b) => (
                <option key={b.slug} value={b.slug} className="bg-[#14213D] text-cream">
                  {b.short_name}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Filter Bar: Year Tabs & Milestone Types */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Year Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-cream/5 border border-cream/10">
            {['All Years', 'Year 1', 'Year 2', 'Year 3', 'Year 4'].map((yr, i) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedYear === i
                    ? 'bg-cream text-midnight shadow-sm'
                    : 'text-cream/60 hover:text-cream'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Milestone Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-cream/40" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-cream/5 border border-cream/15 text-xs text-cream/80 focus:outline-none"
            >
              <option value="all" className="bg-[#14213D]">All Milestones</option>
              <option value="skill" className="bg-[#14213D]">Skills</option>
              <option value="technology" className="bg-[#14213D]">Technologies</option>
              <option value="project" className="bg-[#14213D]">Projects</option>
              <option value="internship" className="bg-[#14213D]">Internships</option>
              <option value="career_prep" className="bg-[#14213D]">Career Prep</option>
            </select>
          </div>
        </div>

        {/* Semester Progression List */}
        <div className="flex flex-col gap-6">
          {filteredSemesters.map((sem) => {
            const milestones = (sem.milestones || []).filter(
              (m) => filterType === 'all' || m.milestone_type === filterType
            );

            return (
              <div
                key={sem.id}
                className="bento-card p-6 sm:p-8 flex flex-col gap-6 transition-all"
              >
                {/* Semester Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cream/10">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-cream text-midnight font-bold text-xs flex items-center justify-center shadow-sm">
                      S{sem.semester_number}
                    </span>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold text-cream">
                        {sem.title}
                      </h3>
                      <span className="text-xs text-cream/60">
                        Focus: {sem.focus_area}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-cream/50 bg-cream/5 px-3 py-1 rounded-full border border-cream/10 w-fit">
                    Year {sem.year_number} Undergraduate
                  </span>
                </div>

                {/* Milestones List */}
                <div className="flex flex-col gap-3">
                  {milestones.length === 0 ? (
                    <div className="text-xs text-cream/40 py-2 italic">
                      No milestones matching the active filter in this semester.
                    </div>
                  ) : (
                    milestones.map((m) => {
                      const isDone = completedMilestoneIds.includes(m.id);

                      return (
                        <div
                          key={m.id}
                          className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                            isDone
                              ? 'bg-cream/10 border-cream/30'
                              : 'bg-cream/5 border-cream/10 hover:border-cream/20'
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            {/* Checkbox */}
                            <button
                              type="button"
                              onClick={() => toggleCompleteMilestone(m.id)}
                              className="mt-0.5 text-cream/40 hover:text-cream transition-colors"
                              aria-label={isDone ? 'Mark milestone incomplete' : 'Mark milestone complete'}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                              ) : (
                                <Circle className="w-5 h-5 text-cream/40 hover:text-cream" />
                              )}
                            </button>

                            <div className="flex flex-col gap-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`text-xs font-bold ${
                                    isDone ? 'line-through text-cream/50' : 'text-cream'
                                  }`}
                                >
                                  {m.title}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getMilestoneTypeBadge(
                                    m.milestone_type
                                  )}`}
                                >
                                  {m.milestone_type.replace('_', ' ')}
                                </span>
                                {m.importance === 'essential' && (
                                  <span className="text-[10px] text-amber-300/80 font-medium">
                                    ★ Essential
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-cream/60 leading-relaxed max-w-2xl">
                                {m.description}
                              </p>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <Link
                              href="/learn"
                              className="px-3.5 py-1.5 rounded-lg bg-cream/10 hover:bg-cream hover:text-midnight text-cream text-[11px] font-semibold transition-all flex items-center gap-1"
                            >
                              <span>Learn</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
