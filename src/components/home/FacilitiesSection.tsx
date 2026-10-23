import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FACILITIES } from '../../data/venueData';
import { CursorPerspectiveCard } from '../common/CursorPerspectiveCard';
import gsap from 'gsap';

interface FacilitiesSectionProps {
  onSelectFacilityForBooking: (facilityTitle: string) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onSelectFacilityForBooking }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.facility-card-item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="facilities" ref={sectionRef} className="py-24 sm:py-32 bg-white dark:bg-[#081710] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#C5A45D]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
              EXPLORE OUR FACILITIES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight">
            Designed for Comfort. <br />
            <span className="italic font-semibold text-[#C5A45D]">Crafted for Celebrations.</span>
          </h2>
        </div>

        {/* Editorial Asymmetric Card Grid with Cursor Perspective */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((facility) => (
            <CursorPerspectiveCard
              key={facility.id}
              maxRotation={8}
              onClick={() => onSelectFacilityForBooking(facility.title)}
              className="facility-card-item cursor-pointer"
            >
              <div className="group bg-white dark:bg-[#0c2317] border border-gray-200/90 dark:border-white/10 hover:border-[#C5A45D] dark:hover:border-[#C5A45D] transition-all duration-300 hover:shadow-2xl flex flex-col justify-between h-full">
                {/* Large Photograph with Smooth Hover Zoom */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-black">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-[#234D3C] dark:text-[#f3eedd] group-hover:text-[#C5A45D] transition-colors">
                      {facility.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-[#C5A45D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                    {facility.description}
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
