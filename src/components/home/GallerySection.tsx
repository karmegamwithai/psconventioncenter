import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/venueData';
import { CursorPerspectiveCard } from '../common/CursorPerspectiveCard';

export const GallerySection: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Main Hall', 'Wedding Stage', 'Dining Hall', 'Exterior', 'Guest Rooms', 'Open Terrace'];

  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#FAF8F2] dark:bg-[#06140e] relative border-t border-[#e2d8c3]/60 dark:border-[#C5A45D]/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
            A GLIMPSE OF OUR VENUE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight">
            Spaces That Inspire <br />
            <span className="italic font-semibold text-[#C5A45D]">Beautiful Memories.</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] shadow-md'
                  : 'bg-white dark:bg-[#0c2317] text-gray-700 dark:text-gray-200 hover:bg-[#E8F2E8] dark:hover:bg-[#122e20] hover:text-[#234D3C] dark:hover:text-[#C5A45D] border border-gray-200 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid with Cursor Perspective */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <CursorPerspectiveCard
              key={item.id}
              maxRotation={7}
              onClick={() => setSelectedImageIndex(GALLERY_ITEMS.findIndex(g => g.id === item.id))}
              className={`cursor-pointer ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto' : 'aspect-square'
              }`}
            >
              <div className="group relative overflow-hidden h-full w-full shadow-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#C5A45D]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A45D] font-bold">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold drop-shadow">{item.title}</h4>
                  <p className="text-xs text-gray-300 line-clamp-1 mt-0.5">{item.caption}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-[#C5A45D] font-semibold">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Fullsize</span>
                  </div>
                </div>
              </div>
            </CursorPerspectiveCard>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 text-white hover:text-[#C5A45D] p-2 bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white hover:text-[#C5A45D] p-2 sm:p-3 bg-black/60 hover:bg-black/80 transition-colors z-50 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white hover:text-[#C5A45D] p-2 sm:p-3 bg-black/60 hover:bg-black/80 transition-colors z-50 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Active Image Stage */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center relative p-2">
            <img
              src={GALLERY_ITEMS[selectedImageIndex].image}
              alt={GALLERY_ITEMS[selectedImageIndex].title}
              className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain border border-[#C5A45D]/40 shadow-2xl"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C5A45D] font-bold">
                {GALLERY_ITEMS[selectedImageIndex].category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold">
                {GALLERY_ITEMS[selectedImageIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light max-w-lg mx-auto">
                {GALLERY_ITEMS[selectedImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
