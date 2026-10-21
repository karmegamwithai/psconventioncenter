import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

interface AboutSectionProps {
  onDiscoverMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onDiscoverMore }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Imagery Layout */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -top-3 -left-3 w-36 h-36 border-t-2 border-l-2 border-[#C5A45D]/60 pointer-events-none z-0" />
              <div className="absolute -bottom-3 -right-3 w-36 h-36 border-b-2 border-r-2 border-[#C5A45D]/60 pointer-events-none z-0" />

              {/* Main Vertical Architectural Image */}
              <div className="relative z-10 overflow-hidden rounded-sm shadow-xl aspect-[3/4] max-w-[85%]">
                <img
                  src="https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1000&q=80"
                  alt="PS Convention Center Architecture"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Smaller Overlapping Image */}
              <div className="absolute -bottom-6 -right-2 sm:-right-4 w-[60%] aspect-[4/3] z-20 overflow-hidden rounded-sm shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
                  alt="PS Convention Center Venue Ambience"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Main Content Only */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#C5A45D]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">
                DISCOVER OUR VENUE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] leading-tight">
              Where Every Celebration <br />
              <span className="font-serif italic font-semibold text-[#234D3C]">
                Becomes Extraordinary.
              </span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#202823] leading-relaxed">
              <p>
                PS Convention Center is a spacious and thoughtfully designed event venue located in Palur Village, approximately 12 km from Chengalpattu and 10 km from Walajabad.
              </p>
              <p>
                With modern facilities, centralised air conditioning, comfortable guest accommodation, and flexible event arrangements, the venue offers an inviting setting for weddings, receptions, traditional ceremonies, and special celebrations.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onDiscoverMore}
                className="px-6 py-3.5 rounded-sm bg-[#234D3C] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#17372a] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>DISCOVER MORE</span>
                <ChevronRight className="w-4 h-4 text-[#C5A45D]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
