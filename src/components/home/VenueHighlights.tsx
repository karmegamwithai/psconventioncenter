import React from 'react';
import { Users, Armchair, Utensils, BedDouble, Car, Shield, Wind, Tv, Zap, Camera, Sparkles } from 'lucide-react';
import { VENUE_INFO } from '../../data/venueData';

export const VenueHighlights: React.FC = () => {
  const statIcons = [
    <Armchair className="w-5 h-5 text-[#C5A45D]" />,
    <Users className="w-5 h-5 text-[#C5A45D]" />,
    <Utensils className="w-5 h-5 text-[#C5A45D]" />,
    <Users className="w-5 h-5 text-[#C5A45D]" />,
    <BedDouble className="w-5 h-5 text-[#C5A45D]" />,
    <Car className="w-5 h-5 text-[#C5A45D]" />,
  ];

  const featureIcons = [
    <Wind className="w-6 h-6 text-[#C5A45D]" />,
    <Tv className="w-6 h-6 text-[#C5A45D]" />,
    <Zap className="w-6 h-6 text-[#C5A45D]" />,
    <Shield className="w-6 h-6 text-[#C5A45D]" />,
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#E8F2E8] border-y border-[#cfdfcf]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#234D3C]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A45D]" />
            <span>VENUE CAPACITIES & SPECIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
            Exceptional Spaces. <br />
            <span className="font-serif italic font-semibold">Memorable Experiences.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
            Thoughtfully engineered proportions allowing seamless flow between ceremonies, dining banquets, and guest relaxation.
          </p>
        </div>

        {/* Statistic Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
          {VENUE_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 border-t-2 border-[#C5A45D] text-center flex flex-col items-center justify-between group"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8F2E8] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {statIcons[idx]}
              </div>
              <div className="space-y-1">
                <span className="block text-3xl sm:text-4xl font-bold text-[#234D3C] tracking-tight font-serif">
                  {stat.value}
                </span>
                <span className="block text-[11px] sm:text-xs font-semibold text-[#202823] tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
              <span className="mt-3 text-[10px] text-gray-500 font-medium">
                {stat.unit}
              </span>
            </div>
          ))}
        </div>

        {/* Premium Feature Strip */}
        <div className="bg-[#234D3C] text-white rounded-sm shadow-xl p-8 lg:p-10 border border-[#C5A45D]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A45D]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VENUE_INFO.featureStrip.map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="p-3 rounded bg-white/10 shrink-0 border border-white/10">
                  {featureIcons[i]}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
