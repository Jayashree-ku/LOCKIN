'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/navigation/Sidebar';
import { INITIAL_PROJECTS, INITIAL_BRANCHES } from '@/lib/data/referenceData';
import {
  Search,
  FolderGit2,
  ExternalLink,
  Code2,
  CheckCircle2,
  Clock,
  Circle,
  Filter,
  Sparkles,
} from 'lucide-react';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');

  // Local student project status tracker
  const [projectStatuses, setProjectStatuses] = useState<Record<string, string>>({
    '77777777-0001-0000-0000-000000000001': 'completed',
    '77777777-0001-0000-0000-000000000002': 'in_progress',
  });

  const toggleStatus = (projectId: string) => {
    setProjectStatuses((prev) => {
      const current = prev[projectId] || 'not_started';
      let next = 'in_progress';
      if (current === 'in_progress') next = 'completed';
      else if (current === 'completed') next = 'not_started';
      return { ...prev, [projectId]: next };
    });
  };

  const filteredProjects = INITIAL_PROJECTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.required_technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesDiff = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
    const matchesBranch = selectedBranch === 'all' || p.branch_id === selectedBranch;

    return matchesSearch && matchesDiff && matchesBranch;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-cream flex">
      <Sidebar />

      <main className="flex-1 md:pl-64 min-h-screen p-6 md:p-8 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col gap-2 pb-6 border-b border-cream/10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-cream/50 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Curated Engineering Projects
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-cream tracking-tight">
            Portfolio Project Ideas
          </h1>
          <p className="text-xs sm:text-sm text-cream/60 max-w-2xl">
            Hands-on technical projects that recruiters actually care about. Complete with step-by-step guidance, tech stacks, and starter references.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or technologies..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-cream/5 border border-cream/10 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* Branch selector */}
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 rounded-xl bg-cream/5 border border-cream/15 text-cream/80 focus:outline-none"
            >
              <option value="all" className="bg-[#14213D]">All Branches</option>
              {INITIAL_BRANCHES.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#14213D]">
                  {b.short_name}
                </option>
              ))}
            </select>

            {/* Difficulty selector */}
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
          </div>
        </div>

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const status = projectStatuses[project.id] || 'not_started';

            return (
              <div
                key={project.id}
                className="bento-card p-6 flex flex-col justify-between gap-6"
              >
                {/* Header */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-bold text-cream/50 uppercase tracking-wider">
                      Year {project.year_recommended} • {project.difficulty}
                    </span>

                    {/* Status Pill Button */}
                    <button
                      type="button"
                      onClick={() => toggleStatus(project.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                        status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : status === 'in_progress'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-cream/10 text-cream/60 border border-cream/15 hover:text-cream'
                      }`}
                    >
                      {status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                      {status === 'in_progress' && <Clock className="w-3 h-3" />}
                      {status === 'not_started' && <Circle className="w-3 h-3" />}
                      <span>
                        {status === 'completed'
                          ? 'Completed'
                          : status === 'in_progress'
                          ? 'In Progress'
                          : 'Not Started'}
                      </span>
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-cream tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cream/70 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack & Learning Guidance */}
                <div className="flex flex-col gap-3 pt-3 border-t border-cream/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-cream/40 uppercase">
                      Required Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.required_technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-cream/5 border border-cream/10 text-[10px] text-cream/80 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-cream/5 border border-cream/10 text-[11px] text-cream/70 leading-relaxed">
                    <strong className="text-cream font-semibold">Guidance: </strong>
                    {project.learning_guidance}
                  </div>

                  {project.starter_repo_url && (
                    <div className="flex justify-end pt-1">
                      <a
                        href={project.starter_repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-cream/80 hover:text-cream font-medium"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Starter Repo</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </div>
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
