import React, { useEffect } from 'react';
import {
  Home,
  ChevronRight,
  Calendar,
  Briefcase,
  Presentation,
  Award,
  Rocket,
  PartyPopper,
  Users,
  CheckCircle2,
  Monitor,
  Wind,
  ShieldCheck,
  Car,
  UtensilsCrossed,
  Building2,
  Phone,
} from 'lucide-react';
import { CursorPerspectiveCard } from '../components/common/CursorPerspectiveCard';
import { VENUE_INFO } from '../data/venueData';

interface CorporateEventsPageProps {
  onNavigate: (route: string, sectionId?: string) => void;
  onBookCorporateEvent: (eventName: string) => void;
}

const CORPORATE_EVENT_CATEGORIES = [
  {
    id: 'corporate-meetings',
    title: 'Corporate Meetings',
    subtitle: 'Executive Boardrooms & Strategy Sessions',
    icon: Briefcase,
    capacity: 'Up to 250 – 600 Seated',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85',
    description:
      'Host focused executive meetings, regional leadership reviews, and shareholder gatherings in a quiet, climate-controlled environment with clear acoustics and uninterrupted power backup.',
    highlights: [
      'Pillarless seating configurations (Theater, Classroom, or U-Shape)',
      'Dedicated PA audio system and wireless microphones',
      'Refreshment, tea/coffee, and executive lunch service in our AC dining hall',
    ],
  },
  {
    id: 'conferences',
    title: 'Conferences',
    subtitle: 'Large-Scale Conventions & Industry Seminars',
    icon: Presentation,
    capacity: '600 Seated • 1,000 Floating',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
    description:
      'Designed for full-day conferences, medical symposia, academic conventions, and industry summits requiring grand stage visibility, high-definition LED displays, and smooth delegate flow.',
    highlights: [
      'Wide elevated stage with integrated HD LED display wall backdrop',
      'Acoustic coffered ceilings for crisp keynote speech intelligibility',
      'Separate registration concourse and dual-gate vehicle arrival',
    ],
  },
  {
    id: 'business-events',
    title: 'Business Events',
    subtitle: 'Trade Expos, Dealer Meets & Networking Summits',
    icon: Building2,
    capacity: 'Multi-Hall & Open Courtyard Lawn',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
    description:
      'Combine our air-conditioned convention halls with our manicured courtyard lawn and first-floor open terrace for trade exhibitions, B2B dealer meets, and business networking conclaves.',
    highlights: [
      'Flexible exhibition stall layouts across indoor hall and courtyard lawn',
      '100% heavy-duty diesel generator backup for continuous exhibition lighting',
      '6 AC guest suites with lift access for visiting speakers and VIP dignitaries',
    ],
  },
  {
    id: 'product-launches',
    title: 'Product Launches',
    subtitle: 'High-Impact Brand & Automobile Showcases',
    icon: Rocket,
    capacity: 'HD LED Stage & Grand Portico Access',
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
    description:
      'Make a commanding impression with dramatic chandelier lighting, an expansive stage for product reveals, and spacious outdoor courtyard displays for media, partners, and customers.',
    highlights: [
      'High-definition LED backdrop wall for brand films and live presentations',
      'Custom stage lighting and appointed decor coordination',
      'Dedicated media and VIP hospitality lounge rooms',
    ],
  },
  {
    id: 'corporate-celebrations',
    title: 'Corporate Celebrations',
    subtitle: 'Milestone Galas, Award Nights & Festive Banquets',
    icon: PartyPopper,
    capacity: 'Up to 1,000 Floating Guests',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85',
    description:
      'Celebrate company milestones, excellence awards, and festive dinners in a regal ballroom ambiance paired with multi-cuisine vegetarian and non-vegetarian banquet arrangements.',
    highlights: [
      '300-seat centralized AC dining hall (500 floating per batch)',
      'Separate pure-vegetarian indoor and non-vegetarian outdoor kitchens',
      'Breezy first-floor open terrace for evening networking dinners',
    ],
  },
  {
    id: 'annual-day-functions',
    title: 'Annual Day Functions',
    subtitle: 'Corporate, Institutional & Cultural Annual Galas',
    icon: Award,
    capacity: '600+ Auditorium Seating & Green Rooms',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
    description:
      'Host grand annual day celebrations for enterprises, manufacturing hubs, and educational institutions with a full-width stage, performer green rooms, and comfortable family seating.',
    highlights: [
      'Spacious elevated stage for cultural performances and trophy distributions',
      'Air-conditioned backstage dressing rooms and 6 guest suites',
      '24/7 CCTV surveillance, security personnel, and organized parking',
    ],
  },
];

const CORPORATE_FACILITY_HIGHLIGHTS = [
  {
    icon: Wind,
    title: '100% Centralized AC',
    description: 'High-capacity centralized HVAC climate control across main convention and dining halls.',
  },
  {
    icon: Monitor,
    title: 'HD LED Display & Audio',
    description: 'Integrated high-definition LED stage wall and acoustic ceiling design for presentations.',
  },
  {
    icon: Users,
    title: '600+ Seated / 1,000 Floating',
    description: 'Three versatile hall plans (Low Budget, High Budget, and Premium) tailored to delegate counts.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Executive Dining Wing',
    description: '300-seat AC dining hall supporting both vegetarian indoor and non-vegetarian outdoor catering.',
  },
  {
    icon: ShieldCheck,
    title: '100% DG Power & Security',
    description: 'Uninterrupted generator backup and 24/7 multi-angle CCTV surveillance across the campus.',
  },
  {
    icon: Car,
    title: 'Strategic Connectivity',
    description: 'Located in Palur (12 km from Chengalpattu) with 30-car parking and separate entry/exit gates.',
  },
];

export const CorporateEventsPage: React.FC<CorporateEventsPageProps> = ({
  onNavigate,
  onBookCorporateEvent,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F2] dark:bg-[#06140e] text-[#202823] dark:text-gray-100 transition-colors duration-300">
      {/* Page Hero Banner */}
      <section className="pt-28 pb-16 bg-[#E8F2E8] dark:bg-[#07150e] border-b border-[#cfdfcf]/70 dark:border-[#C5A45D]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-5 font-medium">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#234D3C] dark:hover:text-[#C5A45D] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#C5A45D]" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-[#234D3C] dark:text-[#C5A45D] font-semibold">
              Corporate Events
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-px bg-[#C5A45D]" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
                  CONFERENCES &bull; EXPOS &bull; CORPORATE GALAS
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight font-['Cormorant_Garamond',serif]">
                Distinguished Spaces for{' '}
                <span className="italic font-semibold text-[#C5A45D]">Corporate Events.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl font-light">
                From executive conferences and product launches to annual day celebrations, Padmasena Convention Center delivers world-class infrastructure in the heart of the Chengalpattu industrial and educational corridor.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/booking', 'booking-enquiry-form')}
              className="self-start lg:self-auto px-7 py-3.5 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4 text-[#C5A45D] dark:text-[#07150e]" />
              <span>Book Event</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        {/* SECTION 1: 6 Corporate Event Categories */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
              TAILORED BUSINESS HOSPITALITY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight font-['Cormorant_Garamond',serif]">
              Corporate Solutions for{' '}
              <span className="italic font-semibold text-[#C5A45D]">Every Occasion.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORPORATE_EVENT_CATEGORIES.map((item) => {
              const IconComponent = item.icon;
              return (
                <CursorPerspectiveCard key={item.id} maxRotation={6} className="h-full">
                  <div className="group bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-[#C5A45D]/30 hover:border-[#C5A45D] transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col h-full">
                    {/* Image Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0f251c]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 bg-[#234D3C]/95 border border-[#C5A45D]/50 px-3 py-1 flex items-center gap-1.5">
                        <IconComponent className="w-3.5 h-3.5 text-[#C5A45D]" />
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C5A45D]">
                          {item.capacity}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase tracking-widest text-[#C5A45D] font-bold block">
                          {item.subtitle}
                        </span>
                        <h3 className="text-xl font-bold font-['Cormorant_Garamond',serif]">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-4">
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>

                        <ul className="space-y-2 pt-2 border-t border-gray-100 dark:border-white/10">
                          {item.highlights.map((hl, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A45D] shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => onBookCorporateEvent('Premium Budget Plan – Hall')}
                        className="w-full py-3 px-4 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-[0.18em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C5A45D] dark:text-[#07150e]" />
                        <span>Book Event</span>
                      </button>
                    </div>
                  </div>
                </CursorPerspectiveCard>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: Corporate Facility Highlights */}
        <section className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/30 p-8 sm:p-12 space-y-10 shadow-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 dark:border-white/10 pb-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D] block">
                CORPORATE INFRASTRUCTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight font-['Cormorant_Garamond',serif] mt-1">
                Executive Facility{' '}
                <span className="italic font-semibold text-[#C5A45D]">Highlights.</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
              <Phone className="w-4 h-4 text-[#C5A45D]" />
              <span>Corporate Desk: {VENUE_INFO.contact.phone}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORPORATE_FACILITY_HIGHLIGHTS.map((feat, idx) => {
              const FeatIcon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-[#FAF8F2] dark:bg-[#07150e] border border-[#e2d8c3]/80 dark:border-[#C5A45D]/25 space-y-3"
                >
                  <div className="w-11 h-11 bg-[#234D3C] dark:bg-[#C5A45D] text-[#C5A45D] dark:text-[#07150e] flex items-center justify-center">
                    <FeatIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#234D3C] dark:text-[#f3eedd]">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: Bottom Corporate Enquiry CTA */}
        <section className="bg-[#234D3C] dark:bg-[#081710] border border-[#C5A45D]/40 p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A45D] font-bold">
              RESERVE YOUR CORPORATE DATES
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-['Cormorant_Garamond',serif]">
              Plan Your Next Conference or Corporate Celebration With Us
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              Submit your event enquiry online and our venue coordinator will prepare a customized corporate hall and catering package.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/booking', 'booking-enquiry-form')}
            className="px-8 py-4 bg-[#C5A45D] text-[#07150e] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#d8bc7a] transition-all flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Event</span>
          </button>
        </section>
      </div>
    </div>
  );
};
