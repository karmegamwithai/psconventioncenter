import React, { useEffect } from 'react';
import { CheckCircle2, Calendar, Clock, Users, ArrowLeft, RefreshCw, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BookingSubmissionResponse } from '../../types/booking';

interface BookingConfirmationProps {
  data: BookingSubmissionResponse;
  onGoHome: () => void;
  onNewEnquiry: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ data, onGoHome, onNewEnquiry }) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#234D3C', '#C5A45D', '#E8F2E8', '#ffffff']
      });
    } catch {
      // safe fallback
    }
  }, []);

  const formattedDate = new Date(data.eventDate + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getSessionLabel = (s: string) => {
    switch (s) {
      case 'FULL_DAY':
        return 'Full Day';
      case 'MORNING':
        return 'Morning';
      case 'EVENING':
        return 'Evening';
      default:
        return s;
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-6 sm:my-10 bg-white dark:bg-[#0c1f17] rounded-sm border border-[#C5A45D]/40 shadow-xl overflow-hidden transition-colors duration-300">
      {/* Top Banner */}
      <div className="bg-[#234D3C] dark:bg-[#07160e] text-white p-5 sm:p-8 text-center border-b border-[#C5A45D]/20">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E8F2E8] dark:bg-[#122e22] text-[#234D3C] dark:text-[#C5A45D] flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-600 dark:text-emerald-400" />
        </div>

        <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight font-['Bodoni_Moda',serif]">
          Your Enquiry Has Been Received!
        </h2>

        <p className="text-xs sm:text-sm text-gray-200 dark:text-gray-300 mt-2 max-w-md mx-auto leading-relaxed">
          Thank you for choosing PS Convention Center. Our team will review your request and contact you regarding availability and package details.
        </p>

        {/* Reference Code */}
        <div className="mt-4 sm:mt-5 inline-block bg-black/30 dark:bg-black/50 border border-[#C5A45D] px-4 sm:px-5 py-2 rounded-sm">
          <span className="text-[10px] uppercase tracking-wider text-gray-300 block font-['Cinzel',serif]">Unique Enquiry Reference</span>
          <span className="text-lg sm:text-xl font-bold text-[#C5A45D] tracking-widest font-['Bodoni_Moda',serif]">
            {data.reference}
          </span>
        </div>
      </div>

      {/* Confirmation Summary Body */}
      <div className="p-4 sm:p-8 space-y-4 sm:space-y-5 bg-[#FAF8F2] dark:bg-[#091710]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#0e241b] p-4 rounded border border-gray-200 dark:border-[#C5A45D]/20">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400 block mb-1 font-['Cinzel',serif]">
              Requested Event Date
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#234D3C] dark:text-[#d3e5dc]">
              <Calendar className="w-4 h-4 text-[#C5A45D]" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0e241b] p-4 rounded border border-gray-200 dark:border-[#C5A45D]/20">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400 block mb-1 font-['Cinzel',serif]">
              Event Type
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#234D3C] dark:text-[#d3e5dc]">
              <Users className="w-4 h-4 text-[#C5A45D]" />
              <span>{data.eventType}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0e241b] p-4 rounded border border-gray-200 dark:border-[#C5A45D]/20">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400 block mb-1 font-['Cinzel',serif]">
              Selected Session
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#234D3C] dark:text-[#d3e5dc]">
              <Clock className="w-4 h-4 text-[#C5A45D]" />
              <span>{getSessionLabel(data.session)}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0e241b] p-4 rounded border border-gray-200 dark:border-[#C5A45D]/20">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400 block mb-1 font-['Cinzel',serif]">
              Enquiry Status
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Pending</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-6 py-3 rounded-sm bg-white dark:bg-[#0e241b] text-[#234D3C] dark:text-gray-200 border border-[#234D3C] dark:border-[#C5A45D]/40 text-xs uppercase font-bold tracking-wider hover:bg-[#E8F2E8] dark:hover:bg-[#153427] transition-colors flex items-center justify-center gap-2 cursor-pointer font-['Cinzel',serif]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>

          <button
            onClick={onNewEnquiry}
            className="w-full sm:w-auto px-6 py-3 rounded-sm bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#0e241b] text-xs uppercase font-bold tracking-wider hover:bg-[#17372a] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md font-['Cinzel',serif]"
          >
            <RefreshCw className="w-4 h-4 text-[#C5A45D] dark:text-[#0e241b]" />
            <span>MAKE ANOTHER ENQUIRY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
