import React from 'react';
import { CalendarSearch, FileText, ClipboardCheck, Award } from 'lucide-react';
import { CursorPerspectiveCard } from '../common/CursorPerspectiveCard';

export const BookingSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Date',
      desc: 'Select your preferred date and session from the live calendar.',
      icon: <CalendarSearch className="w-5 h-5 text-[#234D3C] dark:text-[#C5A45D]" />
    },
    {
      num: '02',
      title: 'Share Your Details',
      desc: 'Provide celebration specifications and guest requirements.',
      icon: <FileText className="w-5 h-5 text-[#234D3C] dark:text-[#C5A45D]" />
    },
    {
      num: '03',
      title: 'Venue Team Review',
      desc: 'Our coordinator verifies hall scheduling and catering logistics.',
      icon: <ClipboardCheck className="w-5 h-5 text-[#234D3C] dark:text-[#C5A45D]" />
    },
    {
      num: '04',
      title: 'Booking Confirmation',
      desc: 'Final reservation confirmation and agreement issuance.',
      icon: <Award className="w-5 h-5 text-[#234D3C] dark:text-[#C5A45D]" />
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#07150e] border-y border-gray-100 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
            RESERVATION WORKFLOW
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight">
            Booking <span className="italic font-semibold text-[#C5A45D]">Process</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <CursorPerspectiveCard key={i} maxRotation={7} className="h-full">
              <div className="bg-[#FAF8F2] dark:bg-[#0c2317] p-6 sm:p-8 border border-[#e2d8c3]/60 dark:border-[#C5A45D]/30 shadow-sm hover:shadow-xl transition-all duration-300 relative group h-full flex flex-col justify-between">
                <span className="absolute top-4 right-4 text-3xl font-black text-gray-200 dark:text-gray-800 group-hover:text-[#C5A45D]/30 transition-colors pointer-events-none">
                  {st.num}
                </span>

                <div>
                  <div className="w-12 h-12 bg-white dark:bg-[#07150e] border border-[#C5A45D]/40 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    {st.icon}
                  </div>

                  <h3 className="text-base font-bold text-[#234D3C] dark:text-[#f3eedd] mb-2 tracking-wide">
                    {st.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                    {st.desc}
                  </p>
                </div>
              </div>
            </CursorPerspectiveCard>
          ))}
        </div>
      </div>
    </section>
  );
};
