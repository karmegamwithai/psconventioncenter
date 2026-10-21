import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { VenueHighlights } from '../components/home/VenueHighlights';
import { FacilitiesSection } from '../components/home/FacilitiesSection';
import { EventsSection } from '../components/home/EventsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { GallerySection } from '../components/home/GallerySection';
import { BookingCtaSection } from '../components/home/BookingCtaSection';
import { LocationContactSection } from '../components/home/LocationContactSection';

interface HomePageProps {
  onNavigate: (route: '/' | '/booking', sectionId?: string) => void;
  onSelectEventForBooking: (eventTitle: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectEventForBooking }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* 1. Cinematic Hero */}
      <HeroSection
        onCheckAvailability={() => onNavigate('/booking')}
        onExploreVenue={() => scrollToSection('about')}
      />

      {/* 2. About PS Convention Center */}
      <AboutSection
        onDiscoverMore={() => scrollToSection('facilities')}
      />

      {/* 3. Venue Highlights (Stats & Feature Strip) */}
      <VenueHighlights />

      {/* 4. Facilities & Amenities */}
      <FacilitiesSection
        onSelectFacilityForBooking={(facility) => {
          onNavigate('/booking');
        }}
      />

      {/* 5. Events & Occasions */}
      <EventsSection
        onSelectEvent={(eventTitle) => {
          onSelectEventForBooking(eventTitle);
        }}
      />

      {/* 6. Event Services (Catering, Stage, Packages, Security) */}
      <ServicesSection />

      {/* 7. Gallery Preview with Lightbox */}
      <GallerySection />

      {/* 8. Booking CTA */}
      <BookingCtaSection
        onGoToBooking={() => onNavigate('/booking')}
        onSendEnquiry={() => scrollToSection('contact')}
      />

      {/* 9. Location & Contact */}
      <LocationContactSection />
    </div>
  );
};
