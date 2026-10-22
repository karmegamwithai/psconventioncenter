import React from 'react';
import { Armchair, Users, Utensils, BedDouble, Car, Wind, Tv, Zap, Shield } from 'lucide-react';
import { VENUE_INFO } from '../../data/venueData';

export const VenueHighlights: React.FC = () => {
  const statIcons = [
    <Armchair key="0" className="w-5 h-5 text-[#C5A45D]" />,
    <Users key="1" className="w-5 h-5 text-[#C5A45D]" />,
    <Utensils key="2" className="w-5 h-5 text-[#C5A45D]" />,
    <Users key="3" className="w-5 h-5 text-[#C5A45D]" />,
    <BedDouble key="4" className="w-5 h-5 text-[#C5A45D]" />,
    <Car key="5" className="w-5 h-5 text-[#C5A45D]" />,
  ];

  const featureIcons = [
    <Wind key="0" className="w-5 h-5 text-[#C5A45D]" />,
    <Tv key="1" className="w-5 h-5 text-[#C5A45D]" />,
    <Zap key="2" className="w-5 h-5 text-[#C5A45D]" />,
    <Shield key="3" className="w-5 h-5 text-[#C5A45D]" />,
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#E8F2E8] border-y border-[#cfdfcf]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
            CAPACITY & SPECIFICATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
            Exceptional Spaces. <br />
            <span className="italic font-semibold">Memorable Experiences.</span>
          </h2>
        </div>

        {/* Statistic Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-12">
          {VENUE_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-t-2 border-[#C5A45D] text-center flex flex-col items-center justify-center group"
            >
              <div className="w-10 h-10 bg-[#FAF8F2] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {statIcons[idx]}
              </div>
              <div className="space-y-1">
                <span className="block text-3xl sm:text-4xl font-bold text-[#234D3C] tracking-tight">
                  {stat.value}
                </span>
                <span className="block text-[11px] font-semibold text-[#202823] tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Feature Strip */}
        <div className="bg-[#234D3C] text-white shadow-2xl p-6 lg:p-8 border border-[#C5A45D]/30">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {VENUE_INFO.featureStrip.map((feature, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="p-3 bg-white/10 shrink-0 border border-[#C5A45D]/30">
                  {featureIcons[i]}
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
