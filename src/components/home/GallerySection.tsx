import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/venueData';

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
    <section id="gallery" className="py-24 sm:py-32 bg-[#FAF8F2] relative border-t border-[#e2d8c3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
            A GLIMPSE OF OUR VENUE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
            Spaces That Inspire <br />
            <span className="italic font-semibold">Beautiful Memories.</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#234D3C] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-[#E8F2E8] hover:text-[#234D3C] border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIndex(GALLERY_ITEMS.findIndex(g => g.id === item.id))}
              className={`group relative overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto' : 'aspect-square'
              }`}
            >
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
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-[#C5A45D] p-2 bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white hover:text-[#C5A45D] p-3 bg-black/50 hover:bg-black/80 transition-colors z-50 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white hover:text-[#C5A45D] p-3 bg-black/50 hover:bg-black/80 transition-colors z-50 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Current Image & Caption */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={GALLERY_ITEMS[selectedImageIndex].image}
              alt={GALLERY_ITEMS[selectedImageIndex].title}
              className="max-h-[70vh] w-auto max-w-full object-contain shadow-2xl border border-white/10"
            />
            <div className="text-center mt-4 text-white max-w-xl space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#C5A45D] font-semibold">
                {GALLERY_ITEMS[selectedImageIndex].category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold">
                {GALLERY_ITEMS[selectedImageIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                {GALLERY_ITEMS[selectedImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
