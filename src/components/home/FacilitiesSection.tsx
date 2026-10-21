import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { FACILITIES } from '../../data/venueData';

interface FacilitiesSectionProps {
  onSelectFacilityForBooking: (facilityTitle: string) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onSelectFacilityForBooking }) => {
  return (
    <section id="facilities" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 text-[#C5A45D] text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXPLORE OUR FACILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
            Designed for Comfort. <br />
            <span className="font-serif italic font-semibold">Crafted for Celebrations.</span>
          </h2>
        </div>

        {/* Editorial Asymmetric Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((facility) => (
            <div
              key={facility.id}
              onClick={() => onSelectFacilityForBooking(facility.title)}
              className="group bg-white rounded-sm overflow-hidden border border-gray-200/80 hover:border-[#C5A45D]/60 transition-all duration-300 hover:shadow-xl flex flex-col justify-between cursor-pointer"
            >
              {/* Large Photograph with Smooth Hover Zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-bold text-[#234D3C] group-hover:text-[#C5A45D] transition-colors">
                    {facility.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-[#C5A45D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
