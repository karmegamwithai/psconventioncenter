import React from 'react';
import { CalendarSearch, FileText, ClipboardCheck, Award } from 'lucide-react';

export const BookingSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Date',
      desc: 'Explore the calendar and select a suitable date.',
      icon: <CalendarSearch className="w-6 h-6 text-[#234D3C]" />
    },
    {
      num: '02',
      title: 'Share Your Details',
      desc: 'Provide event information and contact details.',
      icon: <FileText className="w-6 h-6 text-[#234D3C]" />
    },
    {
      num: '03',
      title: 'Venue Team Review',
      desc: 'Our team reviews availability and requirements.',
      icon: <ClipboardCheck className="w-6 h-6 text-[#234D3C]" />
    },
    {
      num: '04',
      title: 'Booking Confirmation',
      desc: 'The venue team confirms the reservation after completing the necessary arrangements.',
      icon: <Award className="w-6 h-6 text-[#234D3C]" />
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#234D3C] tracking-tight">
            Booking <span className="font-serif italic font-semibold">Process</span>
          </h2>
        </div>

        {/* 4 Steps with Thin Gold Connecting Lines */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Decorative Connecting Line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-[#C5A45D]/40 -translate-y-8 z-0 pointer-events-none" />

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 bg-white p-6 rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-[#E8F2E8] border-2 border-[#C5A45D] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
                {step.icon}
              </div>

              <span className="text-[11px] font-mono font-bold tracking-widest text-[#C5A45D] uppercase mb-1">
                Step {step.num}
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
