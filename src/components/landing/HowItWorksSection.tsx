import React from 'react';
import Link from 'next/link';
import { Search, BookOpen, CheckCircle, Rocket, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      title: 'Discover',
      subtitle: 'Explore branches',
      icon: Search,
    },
    {
      title: 'Understand',
      subtitle: 'Learn what it means',
      icon: BookOpen,
    },
    {
      title: 'Plan',
      subtitle: 'Build your roadmap',
      icon: CheckCircle,
    },
    {
      title: 'Build',
      subtitle: 'Achieve your goals',
      icon: Rocket,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: 4-Step Journey */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-8 bento-card p-8 md:p-10">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold text-cream tracking-tight">
              How LOCKIN Works?
            </h2>
            <p className="text-sm text-cream/60">
              A simple journey to a clear future.
            </p>
          </div>

          {/* Stepper with connecting arrows */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex flex-col items-center text-center gap-3 relative">
                  {/* Step icon */}
                  <div className="w-12 h-12 rounded-full bg-cream/5 border border-cream/15 flex items-center justify-center text-cream">
                    <Icon className="w-5 h-5" />
                  </div>
                  {/* Step label */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-cream">
                      {step.title}
                    </span>
                    <span className="text-xs text-cream/50">
                      {step.subtitle}
                    </span>
                  </div>
                  {/* Connector arrow between steps on desktop */}
                  {idx < steps.length - 1 && (
                    <div className="hidden sm:block absolute -right-4 top-5 text-cream/30 text-xs">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-xs text-cream/40 border-t border-cream/10">
            Backed by structured curriculum benchmarks, verified tech stacks, and career insights.
          </div>
        </div>

        {/* Right Column: CTA Bento Card with Space Horizon */}
        <div className="lg:col-span-5 bento-card p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group min-h-[300px]">
          {/* Earth/Space Horizon Graphic */}
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-700/30 via-cyan-500/20 to-transparent blur-xl pointer-events-none" />
          <svg
            className="absolute bottom-0 right-0 w-full h-44 pointer-events-none select-none opacity-40 group-hover:opacity-60 transition-opacity"
            viewBox="0 0 400 200"
            fill="none"
          >
            <path
              d="M-50 220 Q200 40 450 220"
              stroke="#6388CB"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M-50 230 Q200 60 450 230"
              stroke="#F4EDE0"
              strokeWidth="1"
              strokeOpacity="0.4"
              fill="none"
            />
          </svg>

          <div className="flex flex-col gap-2 z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-cream tracking-tight">
              Your future <br />
              won't plan itself.
            </h3>
            <p className="text-sm text-cream/70">
              Let's get you on the right track.
            </p>
          </div>

          <div className="pt-6 z-10">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream text-midnight font-bold text-sm hover:bg-white transition-all shadow-glow-sm group/btn"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
