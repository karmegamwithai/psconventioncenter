import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
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
    <section id="gallery" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C5A45D] text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>A GLIMPSE OF OUR VENUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
            Spaces That Inspire <br />
            <span className="font-serif italic font-semibold">Beautiful Memories.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
            Take a visual tour through our grand air-conditioned auditorium, spacious dining hall, bridal accommodations, and scenic Palur surroundings.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#234D3C] text-white shadow-md'
                  : 'bg-[#FAF8F2] text-gray-700 hover:bg-[#E8F2E8] hover:text-[#234D3C]'
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
              className={`group relative overflow-hidden rounded-sm cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto' : 'aspect-square'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A45D] font-bold">
                  {item.category}
                </span>
                <h4 className="text-base font-bold drop-shadow">{item.title}</h4>
                <p className="text-xs text-gray-300 line-clamp-1">{item.caption}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-[#C5A45D] font-semibold">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand view</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 text-xs text-gray-400">
          Showing representative venue photographs and illustrative staging setups at PS Convention Center.
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-[#C5A45D] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white hover:text-[#C5A45D] p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white hover:text-[#C5A45D] p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Current Image & Caption */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={GALLERY_ITEMS[selectedImageIndex].image}
              alt={GALLERY_ITEMS[selectedImageIndex].title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-sm shadow-2xl border border-white/10"
            />
            <div className="text-center mt-4 text-white max-w-xl">
              <span className="text-[11px] uppercase tracking-widest text-[#C5A45D] font-semibold">
                {GALLERY_ITEMS[selectedImageIndex].category} &bull; Image {selectedImageIndex + 1} of {GALLERY_ITEMS.length}
              </span>
              <h3 className="text-lg sm:text-xl font-bold mt-1">
                {GALLERY_ITEMS[selectedImageIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                {GALLERY_ITEMS[selectedImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
