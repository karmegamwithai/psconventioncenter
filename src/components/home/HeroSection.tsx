import React from 'react';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onCheckAvailability: () => void;
  onExploreVenue: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability, onExploreVenue }) => {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#07150e] text-white">
      {/* Background cinematic photography with imperial dark overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=90"
          alt="PS Convention Center Grand Regal Ballroom"
          className="w-full h-full object-cover object-center scale-105"
        />
        
        {/* Multilayered luxury gradient overlays tailored for bottom-left editorial style */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#05130b] via-[#07170f]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05130b] via-[#07170f]/80 to-[#07150e]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05130b]/95 via-[#07170f]/60 to-transparent" />
        
        {/* Subtle radial chandelier warmth on top-right for high-end atmospheric contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(197,164,93,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Architectural Gold Filigree Framing (Delicate luxury accents) */}
      <div className="absolute top-28 right-6 sm:right-12 w-16 sm:w-24 h-16 sm:h-24 border-t border-r border-[#C5A45D]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-12 right-6 sm:right-12 w-16 sm:w-24 h-16 sm:h-24 border-b border-r border-[#C5A45D]/40 pointer-events-none hidden md:block" />

      {/* Main Hero Content - Bottom Left Corner Style */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20 pt-28 sm:pt-36 w-full text-left flex flex-col items-start">
        
        {/* Subtle Architectural Gold Accent Rule */}
        <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
          <span className="w-8 sm:w-12 h-px bg-[#C5A45D]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A45D]" />
        </div>

        {/* Grand Headline (Poppins with Gold Gradient Accent, No Subtitle) */}
        <div className="relative">
          {/* Subtle vertical architectural bar */}
          <div className="absolute -left-3 sm:-left-4 top-1 bottom-1 w-0.5 bg-gradient-to-b from-[#C5A45D] via-[#C5A45D]/40 to-transparent hidden sm:block" />
          
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.06] max-w-4xl text-left">
            Where Grandeur Meets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7BE] via-[#C5A45D] to-[#E3C985] drop-shadow-md">
              Celebration.
            </span>
          </h1>
        </div>

        {/* Dual Premium CTAs - Refined Luxury Styling */}
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={onCheckAvailability}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-gradient-to-r from-[#C5A45D] via-[#D8BC7A] to-[#C5A45D] text-[#07150e] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-xl hover:shadow-[#C5A45D]/30 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
          >
            <Calendar className="w-4 h-4 text-[#07150e] shrink-0" />
            <span>BOOK YOUR EVENT</span>
          </button>

          <button
            onClick={onExploreVenue}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/40 hover:border-[#C5A45D] text-white hover:text-[#C5A45D] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group shadow-sm"
          >
            <span>EXPLORE VENUE</span>
            <ChevronRight className="w-4 h-4 text-[#C5A45D] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Subtle Live Date Status Indicator */}
        <div className="mt-5 sm:mt-6 flex items-center gap-2 text-[11px] sm:text-xs text-gray-300/90 font-light tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>2025 &ndash; 2026 Auspicious Muhurtham &amp; Executive Dates Available</span>
        </div>

      </div>

      {/* Architectural Vertical Scroll Cue on Bottom Right */}
      <button
        onClick={onExploreVenue}
        className="absolute bottom-10 right-8 sm:right-14 z-10 hidden lg:flex flex-col items-center gap-3 text-gray-400 hover:text-[#C5A45D] transition-colors cursor-pointer group"
        aria-label="Scroll down to explore venue"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] rotate-90 origin-center translate-y-3 font-medium text-gray-400 group-hover:text-[#C5A45D]">
          SCROLL
        </span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden mt-6">
          <div className="w-full h-1/2 bg-[#C5A45D] animate-pulse" />
        </div>
      </button>
    </section>
  );
};
