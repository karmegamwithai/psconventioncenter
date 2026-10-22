import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

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
        {/* Layered luxury dark overlays weighted toward bottom-left for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07150e] via-[#07150e]/70 to-[#07150e]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07150e]/95 via-[#07150e]/60 to-transparent" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Subtle architectural gold framing lines */}
      <div className="absolute top-24 right-6 sm:right-12 w-16 sm:w-24 h-16 sm:h-24 border-t border-r border-[#C5A45D]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-12 right-6 sm:right-12 w-16 sm:w-24 h-16 sm:h-24 border-b border-r border-[#C5A45D]/40 pointer-events-none hidden md:block" />

      {/* Main Hero Content - Bottom Left Corner Style (Simple, Premium, No Subtitle) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20 pt-28 sm:pt-36 w-full text-left flex flex-col items-start">
        
        {/* Grand Headline (Poppins) */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl text-left">
          Where Grandeur Meets <br />
          <span className="text-[#C5A45D]">Celebration.</span>
        </h1>

        {/* Dual Premium CTAs - Left Aligned & Uncluttered */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={onCheckAvailability}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-[#C5A45D] text-[#07150e] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-[#d8bc7a] transition-all duration-300 shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
          >
            <Calendar className="w-4 h-4 text-[#07150e] shrink-0" />
            <span>BOOK YOUR EVENT</span>
          </button>

          <button
            onClick={onExploreVenue}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 border border-white/60 hover:border-[#C5A45D] text-white hover:text-[#C5A45D] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>EXPLORE VENUE</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>


      </div>
    </section>
  );
};
