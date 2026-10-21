import React from 'react';
import { UtensilsCrossed, Sparkles, PackageCheck, ShieldCheck } from 'lucide-react';
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
    <section id="services" className="py-20 sm:py-28 bg-[#FAF8F2] relative border-y border-[#e2d8c3]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
            Thoughtful Services for <br />
            <span className="font-serif italic font-semibold">Seamless Celebrations.</span>
          </h2>
        </div>

        {/* 4 Premium Icon Cards with Thin Gold Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-sm border border-[#C5A45D]/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#E8F2E8] border border-[#234D3C]/20 flex items-center justify-center mb-5">
                  {getIcon(srv.icon)}
                </div>

                <h3 className="text-base font-bold text-[#234D3C] mb-2 tracking-wide">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
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
