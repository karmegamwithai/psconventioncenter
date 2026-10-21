import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQS } from '../../data/venueData';

export const BookingFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#FAF8F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C5A45D] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLARITY & ASSISTANCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#234D3C] tracking-tight">
            Frequently Asked <span className="font-serif italic font-semibold">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Everything you need to know about date availability, reservation terms, and catering guidelines at PS Convention Center.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-sm border border-gray-200/90 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#E8F2E8]/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#C5A45D] shrink-0" />
                    <span className="text-sm font-bold text-[#234D3C]">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#234D3C] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#C5A45D]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-[#FAF8F2]/60 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Coordinator Contact Card */}
        <div className="mt-12 text-center p-6 rounded bg-white border border-[#C5A45D]/40 shadow-sm space-y-2">
          <p className="text-xs text-gray-600">
            Have a specialized custom requirement or high-profile VIP delegation?
          </p>
          <p className="text-xs sm:text-sm font-semibold text-[#234D3C]">
            Speak directly with our General Manager at <span className="text-[#C5A45D] font-bold">+91 94432 18920</span> or email <span className="text-[#C5A45D] font-bold">enquiry@psconventioncenter.com</span>
          </p>
        </div>
      </div>
    </section>
  );
};
