import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onCheckAvailability: () => void;
  onExploreVenue: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability, onExploreVenue }) => {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#05110a] text-white">
      {/* Background cinematic photography - Fully Visible & Grandly Displayed */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=95"
          alt="PS Convention Center Grand Regal Ballroom"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
        />
        
        {/* Transparent luxury gradient: Light in center/top so ballroom & chandeliers shine grandly */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </div>

      {/* Classic Outer Viewport Architectural Gold Border Frame */}
      <div className="absolute inset-4 sm:inset-6 lg:inset-8 border border-[#C5A45D]/30 pointer-events-none hidden md:block">
        {/* Classic corner accents */}
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#C5A45D]" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C5A45D]" />
        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[#C5A45D]" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#C5A45D]" />
      </div>

      {/* Main Content - Floating Gracefully in Lower Third (Unobstructed Chandelier & Hall View) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 lg:pb-24 pt-28 w-full text-center flex flex-col items-center">
        
        {/* Classic Diamond Finial Accent */}
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#C5A45D] to-[#C5A45D]" />
          <span className="w-2 h-2 rotate-45 bg-[#C5A45D] shadow-sm" />
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-[#C5A45D] to-[#C5A45D]" />
        </div>

        {/* Grand Headline (Poppins, Shimmering Champagne Gold, Pure Text Shadow) */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] max-w-5xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          Where Grandeur Meets <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2D1] via-[#C5A45D] to-[#E3C985]">
            Celebration.
          </span>
        </h1>

        {/* Cool, Premium, Classic Dual Actions */}
        <div className="mt-8 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md sm:max-w-none">
          <button
            onClick={onCheckAvailability}
            className="w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 bg-gradient-to-r from-[#C5A45D] via-[#D8BC7A] to-[#C5A45D] text-[#05110a] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl hover:shadow-[#C5A45D]/40 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.99]"
          >
            <Calendar className="w-4 h-4 text-[#05110a] shrink-0" />
            <span>BOOK YOUR EVENT</span>
          </button>

          <button
            onClick={onExploreVenue}
            className="w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 bg-black/40 hover:bg-black/60 border border-white/60 hover:border-[#C5A45D] text-white hover:text-[#C5A45D] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer shadow-lg group hover:scale-[1.03] active:scale-[0.99]"
          >
            <span>EXPLORE VENUE</span>
            <ChevronRight className="w-4 h-4 text-[#C5A45D] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
