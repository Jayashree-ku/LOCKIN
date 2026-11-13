import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const DualTrackSection: React.FC = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Track 1: Undecided Student */}
        <Link
          href="/discover"
          className="bento-card p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[220px]"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />

          {/* Left Text */}
          <div className="flex flex-col gap-2.5 z-10 max-w-xs">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-cream/50">
              Still figuring it out?
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-cream tracking-tight group-hover:text-white transition-colors">
              Explore Engineering Branches
            </h2>
            <div className="flex items-center gap-2 pt-2 text-sm text-cream/70 group-hover:text-cream transition-colors">
              <span>Discover what suits you best.</span>
              <div className="w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center group-hover:bg-cream group-hover:text-midnight transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Right Visual: 3D Gyroscopic Rings SVG */}
          <div className="absolute -right-4 bottom-2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-44 h-44 pointer-events-none select-none opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <ellipse cx="100" cy="100" rx="80" ry="35" transform="rotate(-30 100 100)" stroke="#F4EDE0" strokeWidth="2.5" strokeOpacity="0.4" />
              <ellipse cx="100" cy="100" rx="80" ry="35" transform="rotate(40 100 100)" stroke="#6388CB" strokeWidth="2" strokeOpacity="0.5" />
              <circle cx="100" cy="100" r="24" fill="url(#coreGradient)" />
              <circle cx="160" cy="65" r="10" fill="#F4EDE0" opacity="0.9" />
              <circle cx="45" cy="120" r="7" fill="#6388CB" opacity="0.9" />
              <defs>
                <radialGradient id="coreGradient" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#92ACDC" />
                  <stop offset="100%" stopColor="#14213D" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </Link>

        {/* Track 2: Selected Branch Student */}
        <Link
          href="/roadmap"
          className="bento-card p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[220px]"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />

          {/* Left Text */}
          <div className="flex flex-col gap-2.5 z-10 max-w-xs">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-cream/50">
              Already picked your branch?
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-cream tracking-tight group-hover:text-white transition-colors">
              Plan Your 4-Year Journey
            </h2>
            <div className="flex items-center gap-2 pt-2 text-sm text-cream/70 group-hover:text-cream transition-colors">
              <span>Get your roadmap and level up.</span>
              <div className="w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center group-hover:bg-cream group-hover:text-midnight transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Right Visual: Graduation Cap on Books SVG */}
          <div className="absolute -right-2 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-48 h-44 pointer-events-none select-none opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500">
            <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Stack of books */}
              {/* Book 1 (bottom) */}
              <rect x="30" y="130" width="130" height="24" rx="3" fill="#1b2844" stroke="#F4EDE0" strokeWidth="1" strokeOpacity="0.2" />
              <rect x="25" y="132" width="10" height="20" rx="2" fill="#2d4068" />
              {/* Book 2 (middle) */}
              <rect x="40" y="105" width="115" height="22" rx="3" fill="#14213D" stroke="#F4EDE0" strokeWidth="1" strokeOpacity="0.2" />
              <rect x="35" y="107" width="10" height="18" rx="2" fill="#3a5180" />
              {/* Mortarboard Graduation Cap */}
              <polygon points="100,50 170,72 100,94 30,72" fill="#0B0B0C" stroke="#F4EDE0" strokeWidth="1.5" strokeOpacity="0.4" />
              <path d="M60 85 L60 105 Q100 120 140 105 L140 85" fill="#0B0B0C" stroke="#F4EDE0" strokeWidth="1" strokeOpacity="0.3" />
              {/* Cap Tassel */}
              <circle cx="100" cy="72" r="3" fill="#F4EDE0" />
              <path d="M100 72 Q135 78 145 95 L147 115" stroke="#F4EDE0" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
              <polygon points="144,115 150,115 147,125" fill="#F4EDE0" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
};
