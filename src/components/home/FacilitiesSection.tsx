import React from 'react';
import { ArrowUpRight, Sparkles, Check } from 'lucide-react';
import { FACILITIES } from '../../data/venueData';

interface FacilitiesSectionProps {
  onSelectFacilityForBooking: (facilityTitle: string) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onSelectFacilityForBooking }) => {
  return (
    <section id="facilities" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-[#C5A45D] text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPLORE OUR FACILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
              Designed for Comfort. <br />
              <span className="font-serif italic font-semibold">Crafted for Celebrations.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md leading-relaxed">
            Every architectural element from the centralized air conditioning to bridal lift access has been integrated for effortless ceremonial grandeur.
          </p>
        </div>

        {/* Editorial Asymmetric Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((facility, index) => (
            <div
              key={facility.id}
              className="group bg-white rounded-sm overflow-hidden border border-gray-200/80 hover:border-[#C5A45D]/60 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              {/* Photo Container with Hover Zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute top-3 left-3 bg-[#234D3C]/90 text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm border border-[#C5A45D]/40 backdrop-blur-sm">
                  {facility.badge}
                </span>
                <span className="absolute bottom-3 left-3 text-white text-xs font-semibold drop-shadow">
                  {facility.capacity}
                </span>
              </div>

              {/* Content Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#234D3C] group-hover:text-[#C5A45D] transition-colors flex items-center justify-between">
                    <span>{facility.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#C5A45D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2.5">
                    {facility.description}
                  </p>
                </div>

                {/* Specs bullets */}
                <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px] text-[#202823]">
                  {facility.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3 h-3 text-[#C5A45D] shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Booking CTA for this facility */}
                <button
                  onClick={() => onSelectFacilityForBooking(facility.title)}
                  className="w-full mt-2 py-2.5 text-center text-[11px] uppercase tracking-wider font-semibold text-[#234D3C] bg-[#E8F2E8] hover:bg-[#234D3C] hover:text-white transition-colors rounded-sm cursor-pointer"
                >
                  Enquire for {facility.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
