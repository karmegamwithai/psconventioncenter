import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onCheckAvailability: () => void;
  onExploreVenue: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability, onExploreVenue }) => {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#07150e] text-white">
      {/* Background cinematic photography - Grandly Visible with Clear Chandelier View */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=95"
          alt="PS Convention Center Grand Regal Ballroom"
          className="w-full h-full object-cover object-center scale-100"
        />
        
        {/* Soft luxury gradient: Weighted toward bottom-left for crisp text while chandeliers shine bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent" />
      </div>

      {/* Main Hero Content - Bottom Left Corner Style with Italic Headline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20 pt-28 w-full text-left flex flex-col items-start">
        
        {/* Headline with Italic Styling (Poppins) */}
        <h1 className="text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl text-left drop-shadow-2xl">
          Where Grandeur Meets <br />
          <span className="text-[#C5A45D] italic font-semibold">Celebration.</span>
        </h1>

        {/* Dual Actions - Bottom Left Aligned & Responsive */}
        <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={onCheckAvailability}
            className="w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 bg-[#C5A45D] text-[#07150e] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-[#d8bc7a] transition-all duration-300 shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#07150e] shrink-0" />
            <span>BOOK YOUR EVENT</span>
          </button>

          <button
            onClick={onExploreVenue}
            className="w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 bg-black/40 hover:bg-black/60 border border-white/70 hover:border-[#C5A45D] text-white hover:text-[#C5A45D] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>EXPLORE VENUE</span>
            <ChevronRight className="w-4 h-4 text-[#C5A45D]" />
          </button>
        </div>

      </div>
    </section>
  );
};
