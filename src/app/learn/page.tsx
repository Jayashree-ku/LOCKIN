'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/navigation/Sidebar';
import { INITIAL_RESOURCES, INITIAL_SKILLS } from '@/lib/data/referenceData';
import { useAuth } from '@/lib/context/AuthContext';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Youtube,
  BookOpen,
  GraduationCap,
  FileText,
  Code2,
  CheckCircle,
  Filter,
  Sparkles,
} from 'lucide-react';

export default function LearnHubPage() {
  const { savedResourceIds, toggleSaveResource } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedPricing, setSelectedPricing] = useState('all'); // all, free, paid

  const filteredResources = INITIAL_RESOURCES.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.provider.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || res.resource_type === selectedType;
    const matchesDiff = selectedDifficulty === 'all' || res.difficulty === selectedDifficulty;
    const matchesPrice =
      selectedPricing === 'all' ||
      (selectedPricing === 'free' && res.is_free) ||
      (selectedPricing === 'paid' && !res.is_free);

    return matchesSearch && matchesType && matchesDiff && matchesPrice;
  }).sort((a, b) => a.recommended_order - b.recommended_order);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return Youtube;
      case 'documentation':
        return FileText;
      case 'free_course':
      case 'paid_course':
        return GraduationCap;
      case 'practice_platform':
        return Code2;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-cream flex">
      <Sidebar />

      <main className="flex-1 md:pl-64 min-h-screen p-6 md:p-8 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col gap-2 pb-6 border-b border-cream/10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-cream/50 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              LOCKIN Learn Hub
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-cream tracking-tight">
            Verified Learning Resources
          </h1>
          <p className="text-xs sm:text-sm text-cream/60 max-w-2xl">
            Curated and verified documentation, university lectures, practice platforms, and courses organized in recommended learning order.
          </p>
        </header>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, topics, or providers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-cream/5 border border-cream/10 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* Resource Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-cream/5 border border-cream/15 text-cream/80 focus:outline-none"
            >
              <option value="all" className="bg-[#14213D]">All Types</option>
              <option value="free_course" className="bg-[#14213D]">Free Courses</option>
              <option value="paid_course" className="bg-[#14213D]">Paid Courses</option>
              <option value="documentation" className="bg-[#14213D]">Documentation</option>
              <option value="practice_platform" className="bg-[#14213D]">Coding Practice</option>
              <option value="youtube" className="bg-[#14213D]">YouTube</option>
              <option value="book" className="bg-[#14213D]">Books</option>
            </select>

            {/* Difficulty */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl bg-cream/5 border border-cream/15 text-cream/80 focus:outline-none"
            >
              <option value="all" className="bg-[#14213D]">All Difficulties</option>
              <option value="Beginner" className="bg-[#14213D]">Beginner</option>
              <option value="Intermediate" className="bg-[#14213D]">Intermediate</option>
              <option value="Advanced" className="bg-[#14213D]">Advanced</option>
            </select>

            {/* Pricing */}
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="px-3 py-2 rounded-xl bg-cream/5 border border-cream/15 text-cream/80 focus:outline-none"
            >
              <option value="all" className="bg-[#14213D]">All Pricing</option>
              <option value="free" className="bg-[#14213D]">Free Only</option>
              <option value="paid" className="bg-[#14213D]">Paid Only</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res) => {
            const Icon = getResourceIcon(res.resource_type);
            const isSaved = savedResourceIds.includes(res.id);

            return (
              <div
                key={res.id}
                className="bento-card p-6 flex flex-col justify-between gap-5 relative group"
              >
                {/* Top header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-navy/80 border border-cream/10 flex items-center justify-center text-cream">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-cream tracking-tight">
                        {res.title}
                      </h3>
                      <span className="text-[11px] text-cream/50">
                        Provider: {res.provider}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaveResource(res.id)}
                    className="p-2 text-cream/40 hover:text-cream transition-colors"
                    aria-label="Save resource"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-5 h-5 text-amber-300" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-cream/70 leading-relaxed">
                  {res.description}
                </p>

                {/* Footer tags and link */}
                <div className="flex items-center justify-between pt-3 border-t border-cream/10 text-[11px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cream/10 text-cream/80 font-medium">
                      {res.difficulty}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-semibold ${
                        res.is_free
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {res.pricing_label}
                    </span>
                    <span className="text-cream/40">
                      Step #{res.recommended_order}
                    </span>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cream/10 hover:bg-cream hover:text-midnight text-cream font-semibold transition-all"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
