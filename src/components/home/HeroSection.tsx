import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onCheckAvailability: () => void;
  onExploreVenue: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability, onExploreVenue }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0e241b] text-white">
      {/* Background cinematic imagery with regal dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85"
          alt="PS Convention Center Grand Wedding Hall"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Multilayered luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e241b] via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(197,164,93,0.15),transparent_70%)]" />
      </div>

      {/* Decorative Architectural Gold Framing */}
      <div className="absolute top-28 left-8 sm:left-12 w-28 h-28 border-t border-l border-[#C5A45D]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-24 right-8 sm:right-12 w-28 h-28 border-b border-r border-[#C5A45D]/40 pointer-events-none hidden md:block" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 w-full">
        <div className="max-w-3xl space-y-7">
          {/* Typographic Eyebrow - Zero Pill Discipline */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#C5A45D]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A45D]">
              WELCOME TO PS CONVENTION CENTER
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]">
            <span className="text-white block font-normal">Beautiful Moments.</span>
            <span className="italic font-semibold text-[#C5A45D] block mt-2 drop-shadow-md">
              Timeless Memories.
            </span>
          </h1>

          {/* Supporting Description - Reduced & High Class */}
          <p className="text-base sm:text-lg text-gray-200 font-light max-w-2xl leading-relaxed">
            Celebrate life's most meaningful occasions in an elegant setting designed for unforgettable experiences.
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onExploreVenue}
              className="px-8 py-4 border border-white/80 text-white font-semibold text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0e241b] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>EXPLORE OUR VENUE</span>
              <ChevronRight className="w-4 h-4 text-[#C5A45D]" />
            </button>
            <button
              onClick={onCheckAvailability}
              className="px-8 py-4 bg-[#C5A45D] text-[#0e241b] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#d8bc7a] transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <Calendar className="w-4 h-4 text-[#0e241b]" />
              <span>CHECK AVAILABILITY</span>
            </button>
          </div>
        </div>
      </div>

      {/* Elegant Scroll Cue */}
      <button
        onClick={onExploreVenue}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gray-400 hover:text-[#C5A45D] transition-colors cursor-pointer group"
        aria-label="Scroll to explore venue"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] mb-2 font-medium">
          EXPLORE
        </span>
        <div className="w-5 h-9 rounded-full border border-gray-400 group-hover:border-[#C5A45D] flex items-start justify-center p-1 transition-colors">
          <div className="w-1.5 h-2.5 bg-[#C5A45D] rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
};
