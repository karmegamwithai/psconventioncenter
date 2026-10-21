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
    <div className="max-w-2xl mx-auto my-10 bg-white rounded-sm border border-[#C5A45D]/40 shadow-xl overflow-hidden">
      {/* Top Banner */}
      <div className="bg-[#234D3C] text-white p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#E8F2E8] text-[#234D3C] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9 text-emerald-700" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Your Enquiry Has Been Received!
        </h2>

        <p className="text-xs sm:text-sm text-gray-200 mt-2 max-w-md mx-auto leading-relaxed">
          Thank you for choosing PS Convention Center. Our team will review your request and contact you regarding availability and package details.
        </p>

        {/* Reference Code */}
        <div className="mt-5 inline-block bg-black/30 border border-[#C5A45D] px-5 py-2 rounded-sm">
          <span className="text-[10px] uppercase tracking-wider text-gray-300 block">Unique Enquiry Reference</span>
          <span className="text-xl font-mono font-bold text-[#C5A45D] tracking-wider">
            {data.reference}
          </span>
        </div>
      </div>

      {/* Confirmation Summary Body */}
      <div className="p-6 sm:p-8 space-y-5 bg-[#FAF8F2]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded border border-gray-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1">
              Requested Event Date
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#234D3C]">
              <Calendar className="w-4 h-4 text-[#C5A45D]" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-gray-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1">
              Event Type
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#234D3C]">
              <Users className="w-4 h-4 text-[#C5A45D]" />
              <span>{data.eventType}</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-gray-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1">
              Selected Session
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#234D3C]">
              <Clock className="w-4 h-4 text-[#C5A45D]" />
              <span>{getSessionLabel(data.session)}</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-gray-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1">
              Enquiry Status
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Pending</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-6 py-3 rounded-sm bg-white text-[#234D3C] border border-[#234D3C] text-xs uppercase font-bold tracking-wider hover:bg-[#E8F2E8] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>

          <button
            onClick={onNewEnquiry}
            className="w-full sm:w-auto px-6 py-3 rounded-sm bg-[#234D3C] text-white text-xs uppercase font-bold tracking-wider hover:bg-[#17372a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <RefreshCw className="w-4 h-4 text-[#C5A45D]" />
            <span>MAKE ANOTHER ENQUIRY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
