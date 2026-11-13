import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cream/10 bg-[#0B0B0C] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-xl font-bold tracking-tight text-cream">lockin.</span>
          <p className="text-xs text-cream/50">Stop guessing. Start locking in.</p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-xs text-cream/70">
          <Link href="/discover" className="hover:text-cream transition-colors">
            Branches
          </Link>
          <Link href="/quiz" className="hover:text-cream transition-colors">
            Career Quiz
          </Link>
          <Link href="/roadmap" className="hover:text-cream transition-colors">
            Roadmaps
          </Link>
          <Link href="/learn" className="hover:text-cream transition-colors">
            Learn Hub
          </Link>
          <a href="#about" className="hover:text-cream transition-colors">
            About
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4 text-cream/60">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-cream transition-colors p-2 rounded-full hover:bg-cream/10"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-cream transition-colors p-2 rounded-full hover:bg-cream/10"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-cream transition-colors p-2 rounded-full hover:bg-cream/10"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-cream/5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} LOCKIN Technologies. Engineering branch discovery & career roadmaps.
      </div>
    </footer>
  );
};
