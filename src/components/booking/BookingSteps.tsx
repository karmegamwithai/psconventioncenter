import React from 'react';
import { CalendarSearch, FileText, ClipboardCheck, Award } from 'lucide-react';

export const BookingSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Date',
      desc: 'Select your preferred date and session from the live calendar.',
      icon: <CalendarSearch className="w-5 h-5 text-[#234D3C]" />
    },
    {
      num: '02',
      title: 'Share Your Details',
      desc: 'Provide celebration specifications and guest requirements.',
      icon: <FileText className="w-5 h-5 text-[#234D3C]" />
    },
    {
      num: '03',
      title: 'Venue Team Review',
      desc: 'Our coordinator verifies hall scheduling and catering logistics.',
      icon: <ClipboardCheck className="w-5 h-5 text-[#234D3C]" />
    },
    {
      num: '04',
      title: 'Booking Confirmation',
      desc: 'Final reservation confirmation and agreement issuance.',
      icon: <Award className="w-5 h-5 text-[#234D3C]" />
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
            RESERVATION WORKFLOW
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#234D3C] tracking-tight">
            Booking <span className="italic font-semibold">Process</span>
          </h2>
        </div>

        {/* 4 Steps with Thin Gold Connecting Line on desktop */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-[#C5A45D]/30 -translate-y-8 z-0 pointer-events-none" />

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 bg-white p-7 border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 bg-[#FAF8F2] border-2 border-[#C5A45D] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
                {step.icon}
              </div>

              <span className="text-[10px] font-bold tracking-[0.2em] text-[#C5A45D] uppercase mb-1">
                STEP {step.num}
              </span>

              <h3 className="text-base font-bold text-[#234D3C] mb-2 tracking-wide">
                {step.title}
              </h3>

              <p className="text-xs text-gray-700 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
