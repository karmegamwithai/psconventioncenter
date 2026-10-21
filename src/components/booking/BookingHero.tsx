import React from 'react';
import { Sparkles, ChevronRight, Home, Calendar } from 'lucide-react';

interface BookingHeroProps {
  onGoHome: () => void;
}

export const BookingHero: React.FC<BookingHeroProps> = ({ onGoHome }) => {
  return (
    <section className="pt-28 pb-16 bg-[#E8F2E8] border-b border-[#cfdfcf]/60 relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A45D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#234D3C]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-600 mb-6 font-medium">
          <button
            onClick={onGoHome}
            className="hover:text-[#234D3C] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-[#C5A45D]" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#234D3C] font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#C5A45D]" />
            <span>Book Your Event</span>
          </span>
        </nav>

        {/* Hero Content */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#C5A45D]/40 text-[#234D3C] text-[11px] font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A45D]" />
            <span>PLAN YOUR CELEBRATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#234D3C] tracking-tight">
            Find Your <span className="font-serif italic font-semibold">Perfect Date.</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl font-light">
            "Explore available dates and send a booking enquiry for your special occasion at PS Convention Center."
          </p>
        </div>
      </div>
    </section>
  );
};
