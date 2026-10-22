import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onCheckAvailability: () => void;
  onExploreVenue: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability, onExploreVenue }) => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#07150e] text-white">
      {/* Background cinematic photography with imperial dark overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=90"
          alt="PS Convention Center Grand Regal Ballroom"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Layered luxury emerald & champagne gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05110b]/90 via-[#07150e]/75 to-[#07150e]/95" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,164,93,0.12),transparent_70%)]" />
      </div>

      {/* Subtle architectural gold framing lines */}
      <div className="absolute top-28 left-6 sm:left-12 w-16 sm:w-24 h-16 sm:h-24 border-t border-l border-[#C5A45D]/40 pointer-events-none hidden md:block" />
      <div className="absolute top-28 right-6 sm:right-12 w-16 sm:w-24 h-16 sm:h-24 border-t border-r border-[#C5A45D]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-16 left-6 sm:left-12 w-16 sm:w-24 h-16 sm:h-24 border-b border-l border-[#C5A45D]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-16 right-6 sm:right-12 w-16 sm:w-24 h-16 sm:h-24 border-b border-r border-[#C5A45D]/40 pointer-events-none hidden md:block" />

      {/* Main Hero Content - Simple, Premium & Majestic (No Subtitle) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full text-center flex flex-col items-center">
        
        {/* Minimalist Top Gold Accent */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-8 sm:w-12 h-px bg-[#C5A45D]/60" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A45D]">
            EXCLUSIVE DESTINATION
          </span>
          <span className="w-8 sm:w-12 h-px bg-[#C5A45D]/60" />
        </div>

        {/* Grand Headline (Poppins) */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl">
          Where Grandeur Meets <br />
          <span className="text-[#C5A45D]">Celebration.</span>
        </h1>

        {/* Dual Premium CTAs - Direct & Uncluttered */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md sm:max-w-none">
          <button
            onClick={onCheckAvailability}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 bg-[#C5A45D] text-[#07150e] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-[#d8bc7a] transition-all duration-300 shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
          >
            <Calendar className="w-4 h-4 text-[#07150e] shrink-0" />
            <span>BOOK YOUR EVENT</span>
          </button>

          <button
            onClick={onExploreVenue}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 border border-white/60 hover:border-[#C5A45D] text-white hover:text-[#C5A45D] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>EXPLORE VENUE</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Minimalist Key Metric Line */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 w-full max-w-2xl flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] sm:text-xs text-gray-300 tracking-[0.15em] uppercase font-light">
          <span>1,000+ Guests Capacity</span>
          <span className="text-[#C5A45D]">&bull;</span>
          <span>Centralized AC</span>
          <span className="text-[#C5A45D]">&bull;</span>
          <span>150+ Valet Parking</span>
          <span className="text-[#C5A45D]">&bull;</span>
          <span>Royal Bridal Suites</span>
        </div>

      </div>

      {/* Refined Minimalist Scroll Down Cue */}
      <button
        onClick={onExploreVenue}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-gray-400 hover:text-[#C5A45D] transition-colors cursor-pointer"
        aria-label="Scroll to explore venue"
      >
        <div className="w-5 h-8 rounded-full border border-gray-400/60 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#C5A45D] rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
};
