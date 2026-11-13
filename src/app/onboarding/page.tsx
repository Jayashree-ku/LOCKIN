'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { INITIAL_BRANCHES } from '@/lib/data/referenceData';
import {
  Compass,
  CheckCircle2,
  Calculator,
  Code2,
  Cpu,
  Atom,
  Palette,
  Leaf,
  Brain,
  FlaskConical,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, updatePreferences, updateBranchSelection } = useAuth();

  const [step, setStep] = useState(1);
  const [hasChosenBranch, setHasChosenBranch] = useState<boolean | null>(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    '22222222-0001-0000-0000-000000000001' // default AI & DS
  );
  const [favouriteSubjects, setFavouriteSubjects] = useState<string[]>([
    'Maths',
    'Computer Science',
  ]);
  const [workInterests, setWorkInterests] = useState<string[]>([
    'Coding & Development',
    'AI & Data Science',
  ]);
  const [educationLevel, setEducationLevel] = useState<string>('12th Grade');

  const subjectsList = [
    { name: 'Maths', icon: Calculator },
    { name: 'Computer Science', icon: Code2 },
    { name: 'Electronics', icon: Cpu },
    { name: 'Physics', icon: Atom },
    { name: 'Design & Creativity', icon: Palette },
    { name: 'Biology', icon: Leaf },
  ];

  const workList = [
    { name: 'Coding & Development', icon: Code2 },
    { name: 'AI & Data Science', icon: Brain },
    { name: 'Hardware & Electronics', icon: Cpu },
    { name: 'Research & Innovation', icon: FlaskConical },
  ];

  const toggleSubject = (sub: string) => {
    setFavouriteSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const toggleWorkInterest = (work: string) => {
    setWorkInterests((prev) =>
      prev.includes(work) ? prev.filter((w) => w !== work) : [...prev, work]
    );
  };

  const handleFinish = () => {
    updatePreferences({
      has_chosen_branch: Boolean(hasChosenBranch),
      favourite_subjects: favouriteSubjects,
      work_interests: workInterests,
    });

    if (hasChosenBranch && selectedBranchId) {
      updateBranchSelection(selectedBranchId);
      router.push('/dashboard');
    } else {
      // Undecided student -> redirect to branch discovery or quiz
      router.push('/discover');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col justify-between p-6 md:p-10 select-none">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-cream/10">
        <Link href="/" className="text-2xl font-bold tracking-tight text-cream">
          lockin<span className="text-cream/50">.</span>
        </Link>

        {/* Stepper Progress */}
        <div className="hidden sm:flex items-center gap-6 text-xs text-cream/50">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cream text-midnight font-bold flex items-center justify-center text-[10px]">
              1
            </span>
            <span className="font-semibold text-cream">Basics</span>
          </div>
          <div className="w-8 h-px bg-cream/20" />
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cream/10 border border-cream/20 text-cream flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Interests</span>
          </div>
          <div className="w-8 h-px bg-cream/20" />
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cream/10 border border-cream/20 text-cream flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Preferences</span>
          </div>
          <div className="w-8 h-px bg-cream/20" />
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cream/10 border border-cream/20 text-cream flex items-center justify-center text-[10px]">
              4
            </span>
            <span>Done</span>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="text-xs font-semibold text-cream/70 hover:text-cream flex items-center gap-1"
        >
          <span>Skip for now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto w-full py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Editorial Introduction & 3D Artwork */}
        <div className="lg:col-span-4 flex flex-col gap-6 pt-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-cream tracking-tight leading-tight">
              Let's get to know you!
            </h1>
            <p className="text-sm text-cream/60 leading-relaxed">
              Help us personalize your LOCKIN experience. Whether you're totally undecided or already enrolled, we'll map your next moves.
            </p>
          </div>

          {/* 3D Planet & Orbital Ring illustration from design */}
          <div className="w-full flex items-center justify-center py-6">
            <div className="relative w-48 h-48 select-none">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full drop-shadow-xl">
                <defs>
                  <radialGradient id="onboardingPlanet" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#92ACDC" />
                    <stop offset="50%" stopColor="#283F83" />
                    <stop offset="90%" stopColor="#14213D" />
                    <stop offset="100%" stopColor="#0B0B0C" />
                  </radialGradient>
                </defs>
                {/* Orbit Rings */}
                <ellipse cx="100" cy="100" rx="90" ry="32" transform="rotate(-25 100 100)" stroke="#F4EDE0" strokeWidth="2" strokeOpacity="0.4" />
                <ellipse cx="100" cy="100" rx="90" ry="32" transform="rotate(35 100 100)" stroke="#6388CB" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4 6" />
                {/* Sphere */}
                <circle cx="100" cy="100" r="42" fill="url(#onboardingPlanet)" />
                {/* Mini Moon */}
                <circle cx="150" cy="65" r="8" fill="#F4EDE0" opacity="0.9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side: Cream Container Questionnaire (Matching Design Screen A) */}
        <div className="lg:col-span-8 cream-container p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col gap-8">
          {/* Question 1: Branch Choice */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-bold text-midnight tracking-tight">
                1. Have you chosen your engineering branch?
              </h2>
              <p className="text-xs text-midnight/60">
                It's okay if you're still figuring it out!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {/* Option A: Not yet */}
              <button
                type="button"
                onClick={() => setHasChosenBranch(false)}
                className={`p-5 rounded-2xl border flex flex-col items-center justify-center text-center gap-2.5 transition-all ${
                  hasChosenBranch === false
                    ? 'border-midnight bg-white shadow-md ring-2 ring-midnight/10'
                    : 'border-midnight/15 bg-white/40 hover:bg-white/70'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-midnight/5 flex items-center justify-center text-midnight">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-midnight">Not yet,</span>
                  <span className="text-[11px] text-midnight/70 font-medium">I'm exploring</span>
                </div>
              </button>

              {/* Option B: Yes, I have a branch */}
              <button
                type="button"
                onClick={() => setHasChosenBranch(true)}
                className={`p-5 rounded-2xl border flex flex-col items-center justify-center text-center gap-2.5 transition-all relative ${
                  hasChosenBranch === true
                    ? 'border-midnight bg-white shadow-md ring-2 ring-midnight/10'
                    : 'border-midnight/15 bg-white/40 hover:bg-white/70'
                }`}
              >
                {hasChosenBranch === true && (
                  <div className="absolute top-3 right-3 text-midnight">
                    <CheckCircle2 className="w-4 h-4 fill-midnight text-cream" />
                  </div>
                )}
                <div className="w-10 h-10 rounded-full bg-midnight/5 flex items-center justify-center text-midnight">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-midnight">Yes,</span>
                  <span className="text-[11px] text-midnight/70 font-medium">I have a branch</span>
                </div>
              </button>
            </div>

            {/* If branch chosen, show branch selector */}
            {hasChosenBranch && (
              <div className="mt-2 p-3.5 rounded-xl bg-midnight/5 border border-midnight/10 flex flex-col gap-1.5 animate-fadeIn">
                <label className="text-[11px] font-semibold text-midnight/80">
                  Select your current or intended engineering branch:
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-midnight/20 bg-white text-xs text-midnight font-medium focus:outline-none"
                >
                  {INITIAL_BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.short_name})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Question 2: Enjoyed Subjects */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-bold text-midnight tracking-tight">
                2. What subjects do you enjoy?
              </h2>
              <p className="text-xs text-midnight/60">
                Select all that apply.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {subjectsList.map((sub) => {
                const Icon = sub.icon;
                const isSelected = favouriteSubjects.includes(sub.name);
                return (
                  <button
                    key={sub.name}
                    type="button"
                    onClick={() => toggleSubject(sub.name)}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? 'border-midnight bg-white text-midnight font-semibold shadow-sm ring-1 ring-midnight/15'
                        : 'border-midnight/15 bg-white/40 text-midnight/70 hover:bg-white/70'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-midnight" />
                    <span className="text-xs">{sub.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 3: Work Interests */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-bold text-midnight tracking-tight">
                3. What kind of work interests you?
              </h2>
              <p className="text-xs text-midnight/60">
                Choose what excites you the most.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {workList.map((work) => {
                const Icon = work.icon;
                const isSelected = workInterests.includes(work.name);
                return (
                  <button
                    key={work.name}
                    type="button"
                    onClick={() => toggleWorkInterest(work.name)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
                      isSelected
                        ? 'border-midnight bg-white text-midnight font-semibold shadow-sm ring-1 ring-midnight/15'
                        : 'border-midnight/15 bg-white/40 text-midnight/70 hover:bg-white/70'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-midnight" />
                    <span className="text-[11px] leading-tight">{work.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-midnight/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-midnight/50">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Step 1 of 3</span>
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="px-8 py-3.5 rounded-full bg-midnight text-cream hover:bg-black font-semibold text-xs transition-all shadow-md flex items-center gap-2 group"
            >
              <span>{hasChosenBranch ? 'Unlock My Roadmap' : 'Discover My Branches'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Page Footer Note */}
      <div className="max-w-5xl mx-auto w-full pt-6 text-center text-[10px] tracking-widest uppercase text-cream/40 font-mono">
        LOCKIN. — STOP GUESSING. START LOCKING IN.
      </div>
    </div>
  );
}
