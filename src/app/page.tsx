import React from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { DualTrackSection } from '@/components/landing/DualTrackSection';
import { PopularBranchesSection } from '@/components/landing/PopularBranchesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-cream flex flex-col selection:bg-cream selection:text-midnight">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <DualTrackSection />
        <PopularBranchesSection />
        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  );
}
