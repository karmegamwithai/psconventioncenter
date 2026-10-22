import React, { useState } from 'react';
import { ChevronRight, Maximize2, X } from 'lucide-react';

interface AboutSectionProps {
  onDiscoverMore: () => void;
}

interface VenueSpace {
  title: string;
  tag: string;
  capacity: string;
  image: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onDiscoverMore }) => {
  const [selectedImage, setSelectedImage] = useState<VenueSpace | null>(null);

  const venueSpaces: VenueSpace[] = [
    {
      title: 'Grand Ballroom',
      tag: 'Main Convention Hall',
      capacity: '1,000 Guests • Centralized AC',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85',
    },
    {
      title: 'Imperial Dining Hall',
      tag: 'Banquets & Receptions',
      capacity: '500 Guests • Live Kitchen Ready',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
    },
    {
      title: 'Royal Bridal Suites',
      tag: 'Private Dressing & Lounge',
      capacity: 'Luxury AC Suites • Private Elevator',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
    },
    {
      title: 'Temple Courtyard',
      tag: 'Ceremonial & Open Air',
      capacity: 'Ganesha Temple • Sacred Lawn',
      image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=85',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF8F2] border-b border-[#e2d8c3]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple & Premium Header (Low Context) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#C5A45D]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
                THE VENUE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
              Grand Spaces. <span className="font-semibold italic">Refined Luxury.</span>
            </h2>
          </div>

          <button
            onClick={onDiscoverMore}
            className="self-start md:self-end px-6 py-3 bg-[#234D3C] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#18392c] transition-all flex items-center gap-2 cursor-pointer shadow-sm group"
          >
            <span>EXPLORE ALL SPACES</span>
            <ChevronRight className="w-4 h-4 text-[#C5A45D] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Minimalist 4-Space Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {venueSpaces.map((space, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(space)}
              className="group relative bg-white border border-[#C5A45D]/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col"
            >
              {/* Photo Stage */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                
                {/* Expand icon on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white p-2">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C5A45D]" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#C5A45D] block">
                    {space.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {space.title}
                  </h3>
                </div>
              </div>

              {/* Minimal Specs Footer (Low Context) */}
              <div className="p-3.5 sm:p-4 bg-white border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] sm:text-xs text-gray-600 font-medium tracking-wide">
                  {space.capacity}
                </span>
                <ChevronRight className="w-4 h-4 text-[#C5A45D] group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Minimalist Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-[#C5A45D] p-2 transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-8 h-8" />
          </button>
          <div 
            className="max-w-5xl w-full text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[78vh] mx-auto object-contain border border-[#C5A45D]/40 shadow-2xl"
            />
            <div className="text-white space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A45D] font-semibold">
                {selectedImage.tag}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold">{selectedImage.title}</h4>
              <p className="text-xs sm:text-sm text-gray-300 font-light">{selectedImage.capacity}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
