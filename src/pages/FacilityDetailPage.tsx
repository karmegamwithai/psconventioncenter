import React, { useEffect } from 'react';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Users,
  Sparkles,
  Phone
} from 'lucide-react';
import { FACILITIES, FacilityId, VENUE_INFO } from '../data/venueData';
import { CursorPerspectiveCard } from '../components/common/CursorPerspectiveCard';

interface FacilityDetailPageProps {
  facilityId: FacilityId;
  onNavigate: (route: string, sectionId?: string) => void;
  onBookFacility: (eventOrHallName: string) => void;
}

export const FacilityDetailPage: React.FC<FacilityDetailPageProps> = ({
  facilityId,
  onNavigate,
  onBookFacility
}) => {
  const facility = FACILITIES.find((f) => f.id === facilityId) || FACILITIES[0];
  const otherFacilities = FACILITIES.filter((f) => f.id !== facility.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [facilityId]);

  const isHall3 = facility.id === 'hall-3' && facility.hallTiers && facility.hallTiers.length > 0;

  return (
    <div className="min-h-screen bg-[#FAF8F2] dark:bg-[#06140e] text-[#202823] dark:text-gray-100 transition-colors duration-300">
      {/* Page Hero Banner (Matches BookingHero Design) */}
      <section className="pt-28 pb-14 bg-[#E8F2E8] dark:bg-[#07150e] border-b border-[#cfdfcf]/70 dark:border-[#C5A45D]/30 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-5 font-medium">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#234D3C] dark:hover:text-[#C5A45D] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#C5A45D]" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <button
              onClick={() => onNavigate('/', 'facilities')}
              className="hover:text-[#234D3C] dark:hover:text-[#C5A45D] transition-colors cursor-pointer"
            >
              Explore Our Facilities
            </button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-[#234D3C] dark:text-[#C5A45D] font-semibold">
              {facility.title}
            </span>
          </nav>

          {/* Hero Title & Action */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-px bg-[#C5A45D]" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
                  FACILITY DETAILS
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight">
                {facility.title}
              </h1>

              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl font-light">
                {facility.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('/', 'facilities')}
                className="px-5 py-3 bg-white dark:bg-[#0c2317] border border-gray-300 dark:border-[#C5A45D]/40 text-[#234D3C] dark:text-gray-100 text-xs uppercase font-semibold tracking-[0.16em] hover:border-[#C5A45D] transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#C5A45D]" />
                <span>All Facilities</span>
              </button>
              <button
                onClick={() => onBookFacility(facility.title)}
                className="px-6 py-3 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-semibold tracking-[0.18em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A45D] dark:text-[#07150e]" />
                <span>Book / Enquire</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16">
        {/* Hall - 3 Special Showcase: Three Individual Cards (Low Budget, High Budget, Premium) */}
        {isHall3 && facility.hallTiers ? (
          <section className="space-y-10">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-px bg-[#C5A45D]" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
                  SELECT YOUR CONVENTION HALL
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight">
                Three Distinct Halls.{' '}
                <span className="italic font-semibold text-[#C5A45D]">Tailored to Your Celebration.</span>
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                {facility.overview}
              </p>
            </div>

            {/* Three Individual Hall Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {facility.hallTiers.map((tier) => (
                <CursorPerspectiveCard key={tier.id} maxRotation={6} className="h-full">
                  <div className="group bg-white dark:bg-[#0c2317] border border-gray-200/90 dark:border-[#C5A45D]/30 hover:border-[#C5A45D] transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col h-full">
                    {/* Hall Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-black">
                      <img
                        src={tier.image}
                        alt={tier.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <div className="absolute top-3 left-3 bg-[#234D3C]/95 dark:bg-[#07150e]/95 border border-[#C5A45D]/60 px-3 py-1">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#C5A45D]">
                          {tier.tierLabel}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                        <Users className="w-4 h-4 text-[#C5A45D] shrink-0" />
                        <span className="text-xs font-semibold tracking-wide">{tier.capacity}</span>
                      </div>
                    </div>

                    {/* Hall Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-2xl font-bold text-[#234D3C] dark:text-[#f3eedd] group-hover:text-[#C5A45D] transition-colors">
                            {tier.name}
                          </h3>
                          <Sparkles className="w-4 h-4 text-[#C5A45D] shrink-0 mt-1.5" />
                        </div>

                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {tier.description}
                        </p>

                        {/* Feature List */}
                        <ul className="pt-2 space-y-2 border-t border-gray-100 dark:border-white/10">
                          {tier.features.map((feat, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A45D] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2 text-[11px] text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-[#234D3C] dark:text-[#C5A45D] uppercase tracking-wider">
                            Ideal For:{' '}
                          </span>
                          {tier.idealFor}
                        </div>
                      </div>

                      <button
                        onClick={() => onBookFacility(tier.name)}
                        className="w-full py-3 px-4 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-semibold tracking-[0.18em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C5A45D] dark:text-[#07150e]" />
                        <span>Enquire for {tier.name}</span>
                      </button>
                    </div>
                  </div>
                </CursorPerspectiveCard>
              ))}
            </div>
          </section>
        ) : (
          /* Standard Dedicated Facility Showcase */
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Large Featured Photograph */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3]/80 dark:border-[#C5A45D]/30 p-2 sm:p-3 shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-black">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#234D3C]/95 dark:bg-[#07150e]/95 border border-[#C5A45D]/50 px-3.5 py-1.5 text-white text-xs font-semibold tracking-wide">
                    {facility.capacity}
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Overview & Direct Action */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D] block">
                  OVERVIEW
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#234D3C] dark:text-[#f3eedd] tracking-tight">
                  Crafted for Effortless Hospitality
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {facility.overview}
                </p>
              </div>

              {/* Ideal For Chips */}
              <div className="space-y-2.5 pt-2 border-t border-gray-200 dark:border-white/10">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#234D3C] dark:text-[#C5A45D] block">
                  Recommended For
                </span>
                <div className="flex flex-wrap gap-2">
                  {facility.idealFor.map((occasion, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/30 text-[#234D3C] dark:text-gray-200"
                    >
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Enquiry CTA Box */}
              <div className="bg-white dark:bg-[#0c2317] border border-[#C5A45D]/40 p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                  <span className="font-semibold uppercase tracking-wider text-[#234D3C] dark:text-[#C5A45D]">
                    Venue Desk
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-[#C5A45D]" />
                    {VENUE_INFO.contact.phone}
                  </span>
                </div>
                <button
                  onClick={() => onBookFacility(facility.title)}
                  className="w-full py-3.5 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#C5A45D] dark:text-[#07150e]" />
                  <span>ENQUIRE ABOUT {facility.title}</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Key Specifications & Highlights Grid (Shared Across All 6 Facility Pages) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Technical & Capacity Specs */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-[#C5A45D]/30 p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D] block">
                SPECIFICATIONS
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#234D3C] dark:text-[#f3eedd] mt-1">
                Key Details
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-white/10">
              {facility.details.map((spec, idx) => (
                <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                    {spec.label}
                  </span>
                  <span className="text-sm font-bold text-[#234D3C] dark:text-gray-100 sm:text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Amenities */}
          <div className="lg:col-span-7 bg-[#234D3C] dark:bg-[#081710] border border-[#C5A45D]/40 p-6 sm:p-8 text-white space-y-5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D] block">
                INCLUDED AMENITIES
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Facility Highlights
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {facility.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-black/20 border border-white/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C5A45D] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Other Facilities Switcher */}
        <section className="pt-8 border-t border-[#e2d8c3] dark:border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D] block">
                CONTINUE EXPLORING
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-[#234D3C] dark:text-[#f3eedd]">
                Other <span className="italic font-semibold text-[#C5A45D]">Facilities</span>
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/', 'facilities')}
              className="text-xs uppercase font-semibold tracking-[0.18em] text-[#234D3C] dark:text-[#C5A45D] hover:underline cursor-pointer self-start sm:self-auto"
            >
              View All on Home Page &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {otherFacilities.map((other) => (
              <button
                key={other.id}
                onClick={() => onNavigate(`/facility/${other.id}`)}
                className="group bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-white/10 hover:border-[#C5A45D] text-left transition-all duration-300 hover:shadow-lg overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-black">
                  <img
                    src={other.image}
                    alt={other.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3.5 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#234D3C] dark:text-[#f3eedd] group-hover:text-[#C5A45D] transition-colors">
                    {other.title}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#C5A45D] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
