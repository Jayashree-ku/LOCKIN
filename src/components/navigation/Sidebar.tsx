'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import {
  Compass,
  Home,
  Layers,
  Milestone,
  FolderGit2,
  Award,
  User,
  LogOut,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: Home },
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'My Branch', href: '/branches/ai-data-science', icon: Layers },
    { label: 'Roadmap', href: '/roadmap', icon: Milestone },
    { label: 'Projects', href: '/projects', icon: FolderGit2 },
    { label: 'Skills & Learn', href: '/learn', icon: Award },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0B0B0C] border-r border-cream/10 p-6 flex flex-col justify-between select-none fixed top-0 left-0 bottom-0 z-40 hidden md:flex">
      {/* Top brand & nav */}
      <div className="flex flex-col gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold tracking-tight text-cream">
            lockin<span className="text-cream/50 group-hover:text-cream transition-colors">.</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#14213D] text-cream border border-cream/20 shadow-glow-sm'
                    : 'text-cream/60 hover:text-cream hover:bg-cream/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cream' : 'text-cream/60'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-4">
        {/* Subtle mini card from design: "Your future is in progress." */}
        <Link
          href="/roadmap"
          className="bento-card p-4 flex items-center justify-between group hover:border-cream/30 transition-all text-xs"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-cream/50 uppercase tracking-widest text-[10px] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Keep Going
            </span>
            <span className="text-cream font-medium">Your future is in progress.</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-cream/10 flex items-center justify-center group-hover:bg-cream group-hover:text-midnight transition-colors">
            <ArrowRight className="w-3 h-3" />
          </div>
        </Link>

        {/* Logout button */}
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-cream/50 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
