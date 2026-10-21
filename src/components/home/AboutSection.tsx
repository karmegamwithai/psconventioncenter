import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, MapPin, Building2, Users } from 'lucide-react';

interface AboutSectionProps {
  onDiscoverMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onDiscoverMore }) => {
  const [showDetailedStory, setShowDetailedStory] = useState(false);

  return (
    <section id="about" className="py-24 sm:py-32 bg-white overflow-hidden relative">
      {/* Subtle Background Accent Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F2E8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Architectural Imagery Layout */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Thin gold decorative border accent */}
              <div className="absolute -top-4 -left-4 w-44 h-44 border-t-2 border-l-2 border-[#C5A45D]/60 pointer-events-none z-0" />
              <div className="absolute -bottom-4 -right-4 w-44 h-44 border-b-2 border-r-2 border-[#C5A45D]/60 pointer-events-none z-0" />

              {/* Main Vertical Architectural Image */}
              <div className="relative z-10 overflow-hidden rounded-sm shadow-xl border border-gray-100 aspect-[3/4] max-w-[85%] group">
                <img
                  src="https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1000&q=80"
                  alt="PS Convention Center Grand Architecture"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] tracking-widest uppercase text-[#C5A45D] font-semibold">Grand Façade</span>
                  <p className="text-sm font-medium">Palur Village Landmark</p>
                </div>
              </div>

              {/* Smaller Overlapping Image */}
              <div className="absolute -bottom-8 -right-2 sm:-right-4 w-[60%] aspect-[4/3] z-20 overflow-hidden rounded-sm shadow-2xl border-4 border-white group">
                <img
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
                  alt="Banquet and floral ambience"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-xs font-semibold text-[#C5A45D]">Royal Wedding Setups</p>
                </div>
              </div>

              {/* Trust Emblem */}
              <div className="absolute top-6 right-8 z-30 bg-[#234D3C] text-white p-3.5 rounded-sm shadow-xl border border-[#C5A45D]/40 text-center hidden sm:block">
                <span className="block text-2xl font-bold text-[#C5A45D] font-serif">1000+</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-200">Guest Capacity</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Venue Description */}
          <div className="lg:col-span-6 space-y-6 pt-6 lg:pt-0">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 text-[#C5A45D]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">
                DISCOVER OUR VENUE
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] leading-tight">
              Where Every Celebration <br />
              <span className="font-serif italic font-semibold text-[#234D3C]">
                Becomes Extraordinary.
              </span>
            </h2>

            {/* Descriptive Body Copy */}
            <div className="space-y-4 text-sm sm:text-base text-[#202823]/85 leading-relaxed font-normal">
              <p>
                <strong>PS Convention Center</strong> is a spacious and thoughtfully designed event venue located in <strong>Palur Village</strong>, approximately <strong>12 km from Chengalpattu</strong> and <strong>10 km from Walajabad</strong>.
              </p>
              <p>
                With modern facilities, centralised air conditioning, comfortable guest accommodation, and flexible event arrangements, the venue offers an inviting setting for weddings, receptions, traditional ceremonies, and special celebrations.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 border-l-2 border-[#C5A45D] pl-4 italic bg-[#FAF8F2] py-2.5 rounded-r">
                "Conceived to bridge the grandeur of classical Tamil Nadu wedding hospitality with cutting-edge architectural convenience and uninterrupted power backup."
              </p>
            </div>

            {/* Quick Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#202823] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#C5A45D] shrink-0" />
                <span>Centralized HVAC Throughout</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#202823] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#C5A45D] shrink-0" />
                <span>6 Guest Rooms with Lift Access</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#202823] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#C5A45D] shrink-0" />
                <span>Separate Dining & Cooking Zones</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#202823] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#C5A45D] shrink-0" />
                <span>Small Ganesha Temple & Courtyard</span>
              </div>
            </div>

            {/* Expandable story details */}
            {showDetailedStory && (
              <div className="p-4 rounded bg-[#E8F2E8]/60 border border-[#234D3C]/10 text-xs text-[#202823] space-y-2 animate-in fade-in duration-300">
                <p className="font-semibold text-[#234D3C]">Architectural Highlights:</p>
                <p>
                  The main convention hall boasts soaring 22-foot clear heights, eliminating obstruction pillars so every single guest has an unhindered view of the auspicious Mandap. The dedicated dining hall is positioned with direct kitchen corridors, allowing seamless banana leaf service without cross-traffic into the ceremonial arena.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setShowDetailedStory(!showDetailedStory);
                  if (!showDetailedStory) {
                    onDiscoverMore();
                  }
                }}
                className="px-6 py-3 rounded-sm bg-[#234D3C] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#17372a] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>{showDetailedStory ? 'VIEW FACILITIES' : 'DISCOVER MORE'}</span>
                <ChevronRight className="w-4 h-4 text-[#C5A45D]" />
              </button>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-4 h-4 text-[#C5A45D]" />
                <span>Palur &bull; Kanchipuram / Chengalpattu belt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
