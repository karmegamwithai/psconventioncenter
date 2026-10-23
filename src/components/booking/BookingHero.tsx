import React from 'react';
import { ChevronRight, Home, Calendar } from 'lucide-react';

interface BookingHeroProps {
  onGoHome: () => void;
}

export const BookingHero: React.FC<BookingHeroProps> = ({ onGoHome }) => {
  return (
    <section className="pt-28 pb-14 bg-[#E8F2E8] dark:bg-[#07150e] border-b border-[#cfdfcf]/70 dark:border-[#C5A45D]/30 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-5 font-medium">
          <button
            onClick={onGoHome}
            className="hover:text-[#234D3C] dark:hover:text-[#C5A45D] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-[#C5A45D]" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#234D3C] dark:text-[#C5A45D] font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#C5A45D]" />
            <span>Book Your Event</span>
          </span>
        </nav>

        {/* Hero Content */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-px bg-[#C5A45D]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
              RESERVATIONS & AVAILABILITY
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight">
            Select Your <span className="italic font-semibold text-[#C5A45D]">Date.</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl font-light">
            Live venue availability calendar for PS Convention Center.
          </p>
        </div>
      </div>
    </section>
  );
};
