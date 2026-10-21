import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { EVENTS } from '../../data/venueData';

interface EventsSectionProps {
  onSelectEvent: (eventTitle: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onSelectEvent }) => {
  return (
    <section id="events" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 text-[#C5A45D] text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CELEBRATE WITH US</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] tracking-tight">
            Every Occasion Deserves <br />
            <span className="font-serif italic font-semibold">Something Special.</span>
          </h2>
        </div>

        {/* Responsive Image Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="group relative rounded-sm overflow-hidden aspect-[4/5] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => onSelectEvent(event.title)}
            >
              {/* Background Photo */}
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C5A45D]/80 transition-colors pointer-events-none rounded-sm" />

              {/* Event Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-2">
                <h3 className="text-xl font-bold tracking-wide group-hover:text-[#C5A45D] transition-colors">
                  {event.title}
                </h3>

                {/* Enquiry CTA inside card */}
                <div className="pt-1 flex items-center justify-between text-xs text-[#C5A45D] font-semibold">
                  <span className="group-hover:underline">Enquire</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
