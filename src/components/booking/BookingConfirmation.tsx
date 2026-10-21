import React, { useEffect } from 'react';
import { CheckCircle2, Calendar, Clock, User, Phone, Mail, Users, Utensils, ArrowLeft, RefreshCw, Printer, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BookingSubmissionResponse } from '../../types/booking';

interface BookingConfirmationProps {
  data: BookingSubmissionResponse;
  onGoHome: () => void;
  onNewEnquiry: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ data, onGoHome, onNewEnquiry }) => {
  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
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
        return 'Full Day (6:00 AM – 11:00 PM)';
      case 'MORNING':
        return 'Morning Session (6:00 AM – 2:00 PM)';
      case 'EVENING':
        return 'Evening Session (3:00 PM – 11:00 PM)';
      default:
        return s;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto my-12 bg-white rounded-sm border border-[#C5A45D]/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      {/* Top Banner */}
      <div className="bg-[#234D3C] text-white p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A45D]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-full bg-[#E8F2E8] text-[#234D3C] flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-[#C5A45D]/40">
          <CheckCircle2 className="w-10 h-10 text-emerald-700" />
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C5A45D] font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OFFICIAL ENQUIRY ACKNOWLEDGEMENT</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          Your Enquiry Has Been Received!
        </h2>

        <p className="text-xs sm:text-sm text-gray-200 mt-2 max-w-lg mx-auto font-light leading-relaxed">
          Thank you for choosing PS Convention Center. Our reservation management team will review your request and contact you within 24 hours regarding package details and next steps.
        </p>

        {/* Reference Code Pill */}
        <div className="mt-6 inline-block bg-black/30 border border-[#C5A45D] px-6 py-2.5 rounded-sm">
          <span className="text-[10px] uppercase tracking-wider text-gray-300 block">Unique Enquiry Reference</span>
          <span className="text-xl sm:text-2xl font-mono font-bold text-[#C5A45D] tracking-widest">
            {data.reference}
          </span>
        </div>
      </div>

      {/* Confirmation Summary Body */}
      <div className="p-8 space-y-6 bg-[#FAF8F2]">
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
              Selected Session
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#234D3C]">
              <Clock className="w-4 h-4 text-[#C5A45D]" />
              <span>{getSessionLabel(data.session)}</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-gray-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1">
              Occasion & Guest Count
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#234D3C]">
              <Users className="w-4 h-4 text-[#C5A45D]" />
              <span>{data.eventType} &bull; ~{data.expectedGuests} Guests</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-gray-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-1">
              Enquiry Status
            </span>
            <div className="flex items-center gap-2 text-sm font-bold text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Pending Venue Review</span>
            </div>
          </div>
        </div>

        {/* Customer Details Snapshot */}
        <div className="bg-white p-5 rounded border border-gray-200 space-y-2 text-xs">
          <h4 className="font-bold text-[#234D3C] uppercase tracking-wider text-[11px] border-b pb-2">
            Client Contact Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-gray-700 pt-1">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C5A45D]" />
              <span className="font-medium truncate">{data.customerName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C5A45D]" />
              <span>{data.mobileNumber}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C5A45D]" />
              <span className="truncate">{data.email}</span>
            </div>
          </div>
        </div>

        {/* Critical Notice */}
        <div className="p-4 rounded bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Important Reservation Policy Note:</p>
            <p className="leading-relaxed">
              Submitting an enquiry does not automatically block or finalize a confirmed booking. Our team will verify venue schedules, review auspicious Muhurtham alignments, and invite you for an in-person site walk-through before formalizing the advance agreement.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-6 py-3 rounded-sm bg-white text-[#234D3C] border border-[#234D3C] text-xs uppercase font-bold tracking-wider hover:bg-[#E8F2E8] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="px-4 py-3 rounded-sm bg-white border border-gray-300 text-gray-700 text-xs uppercase font-bold tracking-wider hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Print Summary Slip"
            >
              <Printer className="w-4 h-4 text-gray-500" />
              <span>Print Slip</span>
            </button>

            <button
              onClick={onNewEnquiry}
              className="flex-1 sm:flex-none px-6 py-3 rounded-sm bg-[#234D3C] text-white text-xs uppercase font-bold tracking-wider hover:bg-[#17372a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <RefreshCw className="w-4 h-4 text-[#C5A45D]" />
              <span>MAKE ANOTHER ENQUIRY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
