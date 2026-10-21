import React from 'react';
import { UtensilsCrossed, Sparkles, PackageCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../../data/venueData';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-7 h-7 text-[#234D3C]" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-[#234D3C]" />;
      case 'PackageCheck':
        return <PackageCheck className="w-7 h-7 text-[#234D3C]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-7 h-7 text-[#234D3C]" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#FAF8F2] relative border-y border-[#e2d8c3]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A45D] text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXEMPLARY HOSPITALITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
            Thoughtful Services for <br />
            <span className="font-serif italic font-semibold">Seamless Celebrations.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
            Enjoy full autonomy with your trusted vendors while benefiting from our dedicated venue coordinators, separate cooking blocks, and 100% uninterrupted power backup.
          </p>
        </div>

        {/* 4 Premium Icon Cards with Thin Gold Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-sm border border-[#C5A45D]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#E8F2E8] rounded-bl-full pointer-events-none group-hover:bg-[#C5A45D]/20 transition-colors" />

              <div>
                {/* Icon box with forest green icon */}
                <div className="w-14 h-14 rounded-full bg-[#E8F2E8] border border-[#234D3C]/20 flex items-center justify-center mb-6 group-hover:border-[#C5A45D] group-hover:scale-105 transition-all">
                  {getIcon(srv.icon)}
                </div>

                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A45D] block mb-1">
                  {srv.tag}
                </span>

                <h3 className="text-lg font-bold text-[#234D3C] mb-2 tracking-wide">
                  {srv.title}
                </h3>

                <p className="text-xs font-semibold text-gray-700 mb-3">
                  {srv.summary}
                </p>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-2 text-[11px] text-[#234D3C] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A45D]" />
                <span>Verified Facility Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
