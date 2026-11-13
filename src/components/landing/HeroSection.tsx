import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { HeroStudentStairsArtwork } from '../shared/StarrySkyBackground';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background glow and subtle orbital lines */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-navy/50 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream/10 border border-cream/15 text-cream/90 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-cream" />
              <span>Your Engineering Journey</span>
            </div>

            {/* Giant Editorial Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-cream leading-[1.08]">
              Stop guessing. <br />
              Start <span className="italic font-serif font-normal text-white">locking in.</span>
            </h1>

            {/* Tagline & Promise */}
            <div className="flex flex-col gap-2 max-w-xl">
              <p className="text-xl sm:text-2xl font-medium text-cream/90">
                Your branch. Your journey. Your future.
              </p>
              <p className="text-base text-cream/60 leading-relaxed">
                Explore engineering branches, find what clicks, and figure out your next move across all four years.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/quiz"
                className="px-7 py-3.5 rounded-full bg-cream text-midnight font-bold text-sm sm:text-base hover:bg-white transition-all shadow-glow-sm flex items-center gap-2 group"
              >
                <span>Find my direction</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/discover"
                className="px-7 py-3.5 rounded-full bg-navy/60 hover:bg-navy border border-cream/20 text-cream font-medium text-sm sm:text-base transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-cream/80" />
                <span>Explore branches</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Column (Matching design stairs & door) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroStudentStairsArtwork className="w-full max-w-md lg:max-w-none" />

            {/* Handwritten script annotation matching the design */}
            <div className="absolute top-12 right-2 md:right-8 transform rotate-[-8deg] pointer-events-none select-none">
              <p className="font-script text-2xl md:text-3xl text-cream/90 tracking-wide drop-shadow-md">
                Lock in <br />
                <span className="ml-4">your future.</span>
              </p>
              <svg className="w-12 h-8 ml-8 -mt-1 text-cream/70" viewBox="0 0 50 30" fill="none">
                <path d="M5 5 C 20 15, 30 5, 45 22 M 35 22 L 45 22 L 42 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
