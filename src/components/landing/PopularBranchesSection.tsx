import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, BrainCircuit, Radio, Settings, Zap, HardHat } from 'lucide-react';

const POPULAR_BRANCHES = [
  {
    name: 'Computer Science',
    slug: 'computer-science',
    icon: Code2,
  },
  {
    name: 'AI & Data Science',
    slug: 'ai-data-science',
    icon: BrainCircuit,
  },
  {
    name: 'Electronics & Communication',
    slug: 'electronics-communication',
    icon: Radio,
  },
  {
    name: 'Mechanical Engineering',
    slug: 'mechanical-engineering',
    icon: Settings,
  },
  {
    name: 'Electrical & Electronics',
    slug: 'electrical-electronics',
    icon: Zap,
  },
  {
    name: 'Civil Engineering',
    slug: 'civil-engineering',
    icon: HardHat,
  },
];

export const PopularBranchesSection: React.FC = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-cream tracking-tight">
              Explore Popular Branches
            </h2>
            <p className="text-sm text-cream/60">
              Find your interest. Discover your path.
            </p>
          </div>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-cream/20 text-cream/90 hover:bg-cream/10 hover:text-white transition-all w-fit"
          >
            <span>View all branches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6 Category Pill Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {POPULAR_BRANCHES.map((branch) => {
            const Icon = branch.icon;
            return (
              <Link
                key={branch.slug}
                href={`/branches/${branch.slug}`}
                className="bento-card p-5 flex flex-col items-center text-center justify-center gap-3 group hover:border-cream/30 transition-all hover:bg-navy/70"
              >
                <div className="w-11 h-11 rounded-xl bg-cream/5 border border-cream/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-cream group-hover:text-midnight text-cream transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-cream/90 leading-tight">
                  {branch.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
