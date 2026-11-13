'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/navigation/Sidebar';
import { INITIAL_BRANCHES, INITIAL_PROJECTS } from '@/lib/data/referenceData';
import { useAuth } from '@/lib/context/AuthContext';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Brain,
  Code2,
  Briefcase,
  Layers,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export default function BranchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { savedBranchIds, toggleSaveBranch, updateBranchSelection } = useAuth();

  const slug = params?.slug as string;
  const branch =
    INITIAL_BRANCHES.find((b) => b.slug === slug) || INITIAL_BRANCHES[0];

  const [activeTab, setActiveTab] = useState<string>('Overview');

  const tabs = [
    'Overview',
    'Subjects',
    'Skills',
    'Careers',
    'Projects',
    'Higher Studies',
  ];

  const isSaved = savedBranchIds.includes(branch.id);
  const branchProjects = INITIAL_PROJECTS.filter((p) => p.branch_id === branch.id);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-cream flex">
      <Sidebar />

      <main className="flex-1 md:pl-64 min-h-screen p-6 md:p-8 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {/* Back Link & Actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cream/70 hover:text-cream transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Discover</span>
          </Link>

          <button
            type="button"
            onClick={() => toggleSaveBranch(branch.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-cream/20 text-xs font-medium text-cream hover:bg-cream/10 transition-all"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Saved to My Branches</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save Branch</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Banner: Glowing 3D Brain/Circuit Artwork matching Image 4 Screen B */}
        <div className="bento-card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="flex flex-col gap-3 max-w-xl z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cream tracking-tight">
              {branch.short_name}
            </h1>
            <p className="text-base sm:text-lg font-medium text-cream/90">
              {branch.tagline}
            </p>
            <p className="text-xs sm:text-sm text-cream/60 leading-relaxed">
              {branch.description}
            </p>

            {/* Keyword Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {branch.tools_technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-cream/5 border border-cream/15 text-[11px] text-cream/80 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Visual: Glowing Neural Brain SVG Artwork */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 shrink-0 relative select-none pointer-events-none">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full drop-shadow-2xl">
              <defs>
                <radialGradient id="neuralGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#2563EB" stopOpacity="0.5" />
                  <stop offset="80%" stopColor="#14213D" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0B0B0C" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="75" fill="url(#neuralGlow)" />

              {/* Connected node network mimicking brain hemispheres */}
              {/* Left Hemisphere */}
              <circle cx="70" cy="70" r="4" fill="#FFFFFF" />
              <circle cx="50" cy="90" r="3.5" fill="#38BDF8" />
              <circle cx="65" cy="115" r="4" fill="#93C5FD" />
              <circle cx="85" cy="135" r="3" fill="#FFFFFF" />
              <circle cx="80" cy="95" r="4.5" fill="#60A5FA" />
              {/* Right Hemisphere */}
              <circle cx="130" cy="70" r="4" fill="#FFFFFF" />
              <circle cx="150" cy="90" r="3.5" fill="#38BDF8" />
              <circle cx="135" cy="115" r="4" fill="#93C5FD" />
              <circle cx="115" cy="135" r="3" fill="#FFFFFF" />
              <circle cx="120" cy="95" r="4.5" fill="#60A5FA" />

              {/* Connecting synapsing lines */}
              <path d="M70 70 L50 90 L80 95 L65 115 L85 135 L100 120" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M70 70 L80 95 L100 80 L120 95 L130 70" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />
              <path d="M130 70 L150 90 L120 95 L135 115 L115 135 L100 120" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M80 95 L120 95 M100 80 L100 140" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-cream/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-cream text-midnight shadow-md'
                  : 'text-cream/60 hover:text-cream hover:bg-cream/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cream Container Content Area (Matching Design Screen B) */}
        <div className="cream-container p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col gap-8">
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Box 1: What is this branch? */}
              <div className="md:col-span-6 flex flex-col gap-2.5">
                <h3 className="text-lg font-bold text-midnight tracking-tight">
                  What is this branch?
                </h3>
                <p className="text-xs sm:text-sm text-midnight/80 leading-relaxed">
                  {branch.description}
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-midnight/60 uppercase tracking-wider">
                    Core Category
                  </span>
                  <p className="text-xs font-semibold text-midnight">{branch.category}</p>
                </div>
              </div>

              {/* Box 2: Why choose this branch? */}
              <div className="md:col-span-6 flex flex-col gap-2.5">
                <h3 className="text-lg font-bold text-midnight tracking-tight">
                  Why choose this branch?
                </h3>
                <ul className="flex flex-col gap-2">
                  {branch.why_choose.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-midnight/85">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-12 h-px bg-midnight/10 my-1" />

              {/* Box 3: Subjects You'll Study */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-midnight tracking-tight">
                  Subjects You'll Study
                </h3>
                <div className="flex flex-wrap gap-2">
                  {branch.subjects_overview.map((sub) => (
                    <span
                      key={sub}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-midnight/10 text-midnight text-xs font-medium shadow-xs"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box 4: Tools & Technologies */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-midnight tracking-tight">
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {branch.tools_technologies.map((tool) => (
                    <span
                      key={tool}
                      className="px-3.5 py-1.5 rounded-xl bg-midnight/5 border border-midnight/10 text-midnight text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-midnight/60" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-12 h-px bg-midnight/10 my-1" />

              {/* Box 5: Career Opportunities */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-midnight tracking-tight">
                  Career Opportunities
                </h3>
                <div className="flex flex-col gap-2">
                  {branch.career_opportunities.map((career) => (
                    <div
                      key={career.title}
                      className="p-3 rounded-xl bg-white/70 border border-midnight/10 flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-midnight">
                          {career.title}
                        </span>
                        <span className="text-[10px] text-midnight/60">
                          {career.description}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {career.avg_salary}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 6: Project Ideas */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-midnight tracking-tight">
                  Project Ideas
                </h3>
                <div className="flex flex-col gap-2">
                  {(branchProjects.length > 0 ? branchProjects : INITIAL_PROJECTS.slice(0, 3)).map((proj) => (
                    <div
                      key={proj.title}
                      className="p-3 rounded-xl bg-white/70 border border-midnight/10 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-midnight">
                          {proj.title}
                        </span>
                        <span className="text-[10px] font-medium text-midnight/60">
                          Year {proj.year_recommended} • {proj.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-midnight/70 line-clamp-1">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Subjects' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-midnight">Core Curriculum Syllabus Overview</h3>
              <p className="text-xs text-midnight/70">
                Key academic subjects taught over eight semesters aligned with AICTE and international university benchmarks:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {branch.subjects_overview.map((sub, i) => (
                  <div key={sub} className="p-4 rounded-xl bg-white border border-midnight/10 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-midnight/10 text-midnight text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-xs font-bold text-midnight">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Skills' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-midnight">Industry Tools & Frameworks</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {branch.tools_technologies.map((tool) => (
                  <div key={tool} className="p-4 rounded-xl bg-white border border-midnight/10 flex flex-col gap-1">
                    <span className="text-xs font-bold text-midnight">{tool}</span>
                    <span className="text-[10px] text-midnight/60">Verified Industry Standard</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Careers' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-midnight">Career Trajectories & Compensation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {branch.career_opportunities.map((c) => (
                  <div key={c.title} className="p-5 rounded-xl bg-white border border-midnight/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-midnight">{c.title}</span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {c.avg_salary}
                      </span>
                    </div>
                    <p className="text-xs text-midnight/70">{c.description}</p>
                    <span className="text-[11px] font-semibold text-midnight/60">Demand Growth: {c.growth}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Projects' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-midnight">Portfolio Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(branchProjects.length > 0 ? branchProjects : INITIAL_PROJECTS.slice(0, 4)).map((p) => (
                  <div key={p.id} className="p-5 rounded-xl bg-white border border-midnight/10 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-midnight">{p.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-midnight/10 text-midnight font-medium">
                        {p.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-midnight/80">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.required_technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-midnight/5 text-[10px] font-medium rounded text-midnight/70">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Higher Studies' && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-midnight">Postgraduate Paths & Research</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {branch.higher_studies.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-midnight/10 flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-midnight/70 shrink-0" />
                    <span className="text-xs font-semibold text-midnight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Banner: Ready to build your roadmap? (Matching Image 4 Screen B) */}
        <div className="bento-card p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-[#14213D] via-[#101c33] to-[#0B0B0C] border border-cream/20">
          <div className="flex flex-col gap-1.5 z-10">
            <h4 className="text-xl sm:text-2xl font-bold text-cream tracking-tight">
              Ready to build your roadmap?
            </h4>
            <p className="text-xs sm:text-sm text-cream/70">
              Get the curated 4-year undergraduate roadmap for {branch.short_name}.
            </p>
          </div>

          <div className="flex items-center gap-4 z-10">
            <button
              type="button"
              onClick={() => {
                updateBranchSelection(branch.id);
                router.push('/roadmap');
              }}
              className="px-7 py-3.5 rounded-full bg-cream text-midnight font-bold text-xs sm:text-sm hover:bg-white transition-all shadow-glow-sm flex items-center gap-2 group"
            >
              <span>Build my roadmap</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Upward chart graphic on right */}
          <div className="absolute right-6 bottom-0 opacity-15 pointer-events-none select-none">
            <TrendingUp className="w-32 h-32 text-cream" />
          </div>
        </div>
      </main>
    </div>
  );
}
