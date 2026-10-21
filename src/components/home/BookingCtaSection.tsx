import React from 'react';
import { Calendar, Mail, Sparkles, Clock, CheckCircle } from 'lucide-react';

interface BookingCtaSectionProps {
  onGoToBooking: () => void;
  onSendEnquiry: () => void;
}

export const BookingCtaSection: React.FC<BookingCtaSectionProps> = ({ onGoToBooking, onSendEnquiry }) => {
  return (
    <section className="py-24 sm:py-28 bg-[#234D3C] text-white relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-[#C5A45D] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[40px] border-[#C5A45D] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A45D]/40 bg-black/20 backdrop-blur-sm text-xs font-semibold tracking-widest text-[#C5A45D] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A45D]" />
          <span>PLAN YOUR SPECIAL OCCASION</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
          Your Perfect Celebration <br />
          <span className="font-serif italic font-semibold text-[#C5A45D]">
            Starts Here.
          </span>
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
          "Choose your preferred date and take the first step toward creating unforgettable memories."
        </p>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGoToBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#C5A45D] text-[#17372a] font-semibold text-xs tracking-widest uppercase hover:bg-[#d8bc7a] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#17372a]" />
            <span>VIEW BOOKING CALENDAR</span>
          </button>
          <button
            onClick={onSendEnquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-sm border border-white/60 text-white font-semibold text-xs tracking-widest uppercase hover:bg-white hover:text-[#234D3C] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>SEND AN ENQUIRY</span>
          </button>
        </div>
      </div>
    </section>
  );
};
