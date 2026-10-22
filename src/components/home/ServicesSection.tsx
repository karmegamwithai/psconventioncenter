import React from 'react';
import { UtensilsCrossed, Sparkles, PackageCheck, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../../data/venueData';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-[#234D3C]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#234D3C]" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6 text-[#234D3C]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-6 h-6 text-[#234D3C]" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
            EXCLUSIVE HOSPITALITY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
            Thoughtful Services for <br />
            <span className="italic font-semibold">Seamless Celebrations.</span>
          </h2>
        </div>

        {/* 4 Premium Cards with Thin Gold Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white p-8 border border-[#C5A45D]/50 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:border-[#234D3C]"
            >
              <div>
                <div className="w-12 h-12 bg-[#FAF8F2] border border-[#C5A45D]/40 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {getIcon(srv.icon)}
                </div>

                <h3 className="text-base font-bold text-[#234D3C] mb-3 tracking-wide">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                  {srv.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
