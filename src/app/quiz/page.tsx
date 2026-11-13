'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/navigation/Sidebar';
import { QUIZ_QUESTIONS } from '@/lib/data/quizData';
import { INITIAL_BRANCHES } from '@/lib/data/referenceData';
import { useAuth } from '@/lib/context/AuthContext';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Trophy,
} from 'lucide-react';

export default function CareerQuizPage() {
  const router = useRouter();
  const { updateBranchSelection } = useAuth();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (optionIdx: number) => {
    setSelectedOptions((prev) => ({ ...prev, [currentIdx]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setSelectedOptions({});
    setCurrentIdx(0);
    setQuizFinished(false);
  };

  // Calculate results
  const computeResults = () => {
    const scores: Record<string, number> = {};

    QUIZ_QUESTIONS.forEach((q, qIndex) => {
      const selectedOptIdx = selectedOptions[qIndex];
      if (selectedOptIdx !== undefined) {
        const option = q.options[selectedOptIdx];
        if (option && option.branchWeights) {
          Object.entries(option.branchWeights).forEach(([slug, weight]) => {
            scores[slug] = (scores[slug] || 0) + weight;
          });
        }
      }
    });

    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([slug, score]) => {
        const branch = INITIAL_BRANCHES.find((b) => b.slug === slug);
        return {
          branch,
          score,
          matchPct: Math.min(98, 70 + score * 3),
        };
      })
      .filter((item) => Boolean(item.branch));

    return sorted.slice(0, 3);
  };

  const results = quizFinished ? computeResults() : [];

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-cream flex">
      <Sidebar />

      <main className="flex-1 md:pl-64 min-h-screen p-6 md:p-8 lg:p-10 flex flex-col gap-8 max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col gap-1 pb-4 border-b border-cream/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cream/50 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cream" />
                Branch Discovery Assessment
              </span>
            </div>
            {quizFinished && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-cream/60 hover:text-cream flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-cream tracking-tight">
            Engineering Branch Suitability Quiz
          </h1>
          <p className="text-xs sm:text-sm text-cream/60">
            Answer 4 intuitive questions about your curiosity, problem-solving style, and future ambitions.
          </p>
        </header>

        {!quizFinished ? (
          <div className="flex flex-col gap-6">
            {/* Question Progress bar */}
            <div className="flex items-center justify-between text-xs text-cream/50 font-medium">
              <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-cream/10 overflow-hidden">
              <div
                className="h-full bg-cream transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="cream-container p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg sm:text-xl font-bold text-midnight leading-snug">
                  {currentQ.question}
                </h2>
                <p className="text-xs text-midnight/60">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedOptions[currentIdx] === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelect(i)}
                      className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'border-midnight bg-white text-midnight shadow-md ring-2 ring-midnight/15'
                          : 'border-midnight/15 bg-white/50 text-midnight/80 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-xs sm:text-sm font-bold text-midnight">
                          {opt.label}
                        </span>
                        <span className="text-[11px] sm:text-xs text-midnight/70 leading-relaxed">
                          {opt.description}
                        </span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-midnight bg-midnight text-cream'
                            : 'border-midnight/30'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-midnight text-cream" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="pt-4 border-t border-midnight/10 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={handlePrev}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold text-midnight/60 hover:text-midnight transition-colors ${
                    currentIdx === 0 ? 'opacity-0 pointer-events-none' : ''
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  disabled={selectedOptions[currentIdx] === undefined}
                  onClick={handleNext}
                  className={`px-7 py-3 rounded-full bg-midnight text-cream font-bold text-xs transition-all shadow-md flex items-center gap-2 group ${
                    selectedOptions[currentIdx] === undefined
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:bg-black'
                  }`}
                >
                  <span>
                    {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Calculate Match' : 'Next Question'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Results Screen */
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="bento-card p-8 md:p-10 flex flex-col gap-4 text-center items-center">
              <div className="w-14 h-14 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shadow-glow-sm">
                <Trophy className="w-7 h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-cream">
                Your Engineering Affinity Profile
              </h2>
              <p className="text-xs sm:text-sm text-cream/70 max-w-xl">
                Based on your problem-solving choices and scientific curiosities, here are the top 3 branches that align with your natural inclinations:
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {results.map((res, index) => {
                const branch = res.branch!;
                const isTopMatch = index === 0;

                return (
                  <div
                    key={branch.id}
                    className={`bento-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all ${
                      isTopMatch ? 'border-cream/40 bg-[#14213D]/80 shadow-glow-sm' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4 max-w-xl">
                      <div className="w-12 h-12 rounded-2xl bg-cream/10 border border-cream/20 flex items-center justify-center font-extrabold text-lg text-cream shrink-0">
                        #{index + 1}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-cream tracking-tight">
                            {branch.short_name}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                            {res.matchPct}% Match
                          </span>
                        </div>
                        <p className="text-xs text-cream/80 font-medium">
                          {branch.tagline}
                        </p>
                        <p className="text-xs text-cream/60 leading-relaxed mt-1">
                          {branch.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                      <Link
                        href={`/branches/${branch.slug}`}
                        className="px-4 py-2 rounded-full border border-cream/20 text-cream/80 hover:text-cream text-xs font-semibold hover:bg-cream/10 transition-all"
                      >
                        Details
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          updateBranchSelection(branch.id);
                          router.push('/roadmap');
                        }}
                        className="px-5 py-2.5 rounded-full bg-cream text-midnight font-bold text-xs hover:bg-white transition-all shadow-glow-sm flex items-center gap-1.5"
                      >
                        <span>Lock In Branch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
