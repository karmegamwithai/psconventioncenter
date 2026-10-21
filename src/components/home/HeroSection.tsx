import React from 'react';
import { Calendar, ArrowDown, ChevronRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onCheckAvailability: () => void;
  onExploreVenue: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability, onExploreVenue }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#17372a] text-white">
      {/* Background cinematic image with luxury gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85"
          alt="PS Convention Center Grand Wedding Hall"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17372a]/95 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(197,164,93,0.12),transparent_70%)]" />
      </div>

      {/* Decorative Gold Accent Borders */}
      <div className="absolute top-24 left-8 w-24 h-24 border-t border-l border-[#C5A45D]/30 pointer-events-none hidden md:block" />
      <div className="absolute bottom-24 right-8 w-24 h-24 border-b border-r border-[#C5A45D]/30 pointer-events-none hidden md:block" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl space-y-7">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C5A45D]/50 bg-black/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A45D]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A45D]">
              WELCOME TO PS CONVENTION CENTER
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.12]">
            <span className="text-white block font-sans">Beautiful Moments.</span>
            <span className="font-serif italic font-medium text-[#C5A45D] block mt-1 drop-shadow-sm">
              Timeless Memories.
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg text-gray-200 font-light max-w-2xl leading-relaxed">
            Celebrate life's most meaningful occasions in an elegant setting designed for unforgettable experiences. Located in scenic Palur Village, crafted for royal celebrations and cherished moments.
          </p>

          {/* Key Quick Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300 pt-1">
            <span className="px-3 py-1 rounded bg-white/10 backdrop-blur-sm border border-white/10">
              1,000+ Floating Capacity
            </span>
            <span className="px-3 py-1 rounded bg-white/10 backdrop-blur-sm border border-white/10">
              Centralized HVAC
            </span>
            <span className="px-3 py-1 rounded bg-white/10 backdrop-blur-sm border border-white/10">
              Palur &bull; Near Chengalpattu & Walajabad
            </span>
          </div>

          {/* CTA Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onExploreVenue}
              className="px-8 py-4 rounded-sm border border-white/80 text-white font-semibold text-xs tracking-widest uppercase hover:bg-white hover:text-[#234D3C] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>EXPLORE OUR VENUE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onCheckAvailability}
              className="px-8 py-4 rounded-sm bg-[#C5A45D] text-[#17372a] font-semibold text-xs tracking-widest uppercase hover:bg-[#d8bc7a] hover:shadow-xl transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4 text-[#17372a]" />
              <span>CHECK AVAILABILITY</span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Bottom Scroll Indicator */}
      <button
        onClick={onExploreVenue}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gray-300 hover:text-[#C5A45D] transition-colors group focus:outline-none cursor-pointer"
        aria-label="Scroll down to explore venue"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] mb-2 font-medium text-gray-300 group-hover:text-[#C5A45D]">
          EXPLORE VENUE
        </span>
        <div className="w-5 h-9 rounded-full border border-gray-400 group-hover:border-[#C5A45D] flex items-start justify-center p-1 transition-colors">
          <div className="w-1.5 h-2.5 bg-[#C5A45D] rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
};
