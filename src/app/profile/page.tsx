'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/navigation/Sidebar';
import { useAuth } from '@/lib/context/AuthContext';
import { INITIAL_BRANCHES, INITIAL_RESOURCES } from '@/lib/data/referenceData';
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Bookmark,
  CheckCircle2,
  Settings,
  LogOut,
  Save,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default function ProfilePage() {
  const {
    user,
    profile,
    preferences,
    savedResourceIds,
    completedMilestoneIds,
    signOut,
    updateBranchSelection,
  } = useAuth();

  const [fullName, setFullName] = useState(profile?.full_name || 'Jayashree');
  const [educationLevel, setEducationLevel] = useState(
    profile?.education_level || '2nd Year B.Tech'
  );
  const [currentYear, setCurrentYear] = useState(profile?.current_year || 2);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentBranch =
    INITIAL_BRANCHES.find((b) => b.id === profile?.selected_branch_id) ||
    INITIAL_BRANCHES[0];

  const savedResources = INITIAL_RESOURCES.filter((r) =>
    savedResourceIds.includes(r.id)
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-cream flex">
      <Sidebar />

      <main className="flex-1 md:pl-64 min-h-screen p-6 md:p-8 lg:p-10 flex flex-col gap-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col gap-1 pb-6 border-b border-cream/10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-cream/50">
            Student Account
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-cream tracking-tight">
            My Profile & Progress
          </h1>
          <p className="text-xs sm:text-sm text-cream/60">
            Manage your personal academic information, active branch roadmap, and saved learning resources.
          </p>
        </header>

        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile settings saved successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Personal Card & Form */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <div className="cream-container p-6 sm:p-8 shadow-xl flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-midnight text-cream text-xl font-bold flex items-center justify-center shadow-md">
                  {fullName ? fullName.substring(0, 2).toUpperCase() : 'JK'}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold text-midnight tracking-tight">
                    {fullName}
                  </h2>
                  <span className="text-xs text-midnight/60">
                    {user?.email || 'jayashree@student.lockin.dev'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSave} className="flex flex-col gap-4 pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-midnight/80">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="p-3 rounded-xl border border-midnight/15 bg-white text-midnight text-xs font-medium focus:outline-none focus:ring-2 focus:ring-midnight/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-midnight/80">
                      Education Level
                    </label>
                    <select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      className="p-3 rounded-xl border border-midnight/15 bg-white text-midnight text-xs font-medium focus:outline-none"
                    >
                      <option value="12th Grade">12th Grade / High School</option>
                      <option value="1st Year B.Tech">1st Year B.Tech</option>
                      <option value="2nd Year B.Tech">2nd Year B.Tech</option>
                      <option value="3rd Year B.Tech">3rd Year B.Tech</option>
                      <option value="4th Year B.Tech">4th Year B.Tech</option>
                      <option value="Diploma / Poly">Diploma / Polytechnic</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-midnight/80">
                      Current Year
                    </label>
                    <select
                      value={currentYear}
                      onChange={(e) => setCurrentYear(Number(e.target.value))}
                      className="p-3 rounded-xl border border-midnight/15 bg-white text-midnight text-xs font-medium focus:outline-none"
                    >
                      <option value={1}>Year 1</option>
                      <option value={2}>Year 2</option>
                      <option value={3}>Year 3</option>
                      <option value={4}>Year 4</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-midnight/80">
                    Selected Engineering Branch
                  </label>
                  <select
                    value={currentBranch.id}
                    onChange={(e) => updateBranchSelection(e.target.value)}
                    className="p-3 rounded-xl border border-midnight/15 bg-white text-midnight text-xs font-medium focus:outline-none"
                  >
                    {INITIAL_BRANCHES.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.short_name})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 rounded-xl bg-midnight text-cream hover:bg-black font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </form>
            </div>

            {/* Account Settings & Sign Out */}
            <div className="bento-card p-6 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-cream">Sign out of account</span>
                <span className="text-xs text-cream/50">End current browser session</span>
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out</span>
              </button>
            </div>
          </div>

          {/* Right Column: Roadmap Statistics & Saved Resources */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Quick Stats Bento */}
            <div className="bento-card p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-cream tracking-tight">
                Academic Snapshot
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-cream/5 border border-cream/10 flex flex-col">
                  <span className="text-2xl font-extrabold text-cream">
                    {completedMilestoneIds.length}
                  </span>
                  <span className="text-[10px] text-cream/50 uppercase font-semibold">
                    Completed Milestones
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-cream/5 border border-cream/10 flex flex-col">
                  <span className="text-2xl font-extrabold text-cream">
                    {savedResourceIds.length}
                  </span>
                  <span className="text-[10px] text-cream/50 uppercase font-semibold">
                    Saved Resources
                  </span>
                </div>
              </div>
            </div>

            {/* Saved Resources List */}
            <div className="bento-card p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cream tracking-tight">
                  Saved Resources ({savedResources.length})
                </h3>
                <Link
                  href="/learn"
                  className="text-[11px] font-semibold text-cream/60 hover:text-cream flex items-center gap-1"
                >
                  <span>Explore more</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="flex flex-col gap-2.5">
                {savedResources.length === 0 ? (
                  <p className="text-xs text-cream/40 italic py-2">
                    No resources saved yet. Visit the Learn Hub to bookmark materials.
                  </p>
                ) : (
                  savedResources.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 rounded-xl bg-cream/5 border border-cream/10 flex items-center justify-between gap-3 hover:bg-cream/10 transition-colors"
                    >
                      <div className="flex flex-col max-w-[200px]">
                        <span className="text-xs font-semibold text-cream truncate">
                          {res.title}
                        </span>
                        <span className="text-[10px] text-cream/50">
                          {res.provider} • {res.difficulty}
                        </span>
                      </div>

                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-cream/10 hover:bg-cream hover:text-midnight text-cream transition-colors"
                        title="Open Resource"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
