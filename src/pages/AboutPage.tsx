import React, { useEffect } from 'react';
import {
  Home,
  ChevronRight,
  Calendar,
  Award,
  Compass,
  Target,
  Sparkles,
  CheckCircle2,
  Quote,
  Building2,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react';
import { CursorPerspectiveCard } from '../components/common/CursorPerspectiveCard';
import { VENUE_INFO } from '../data/venueData';

interface AboutPageProps {
  onNavigate: (route: string, sectionId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
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
            <span className="text-[#234D3C] dark:text-[#C5A45D] font-semibold">About Us</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-px bg-[#C5A45D]" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
                  HERITAGE &bull; LEADERSHIP &bull; HOSPITALITY
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight font-['Cormorant_Garamond',serif]">
                The Story Behind{' '}
                <span className="italic font-semibold text-[#C5A45D]">
                  Padmasena Convention Center.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl font-light">
                Crafted in Palur Village as a timeless architectural landmark where traditional South Indian values meet grand modern celebrations.
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        {/* SECTION 1: FOUNDER'S MESSAGE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <CursorPerspectiveCard maxRotation={6}>
              <div className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/40 p-3 sm:p-4 shadow-2xl relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0f251c]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85"
                    alt="Founder of Padmasena Convention Center"
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#C5A45D] block">
                      Founder &amp; Chairman
                    </span>
                    <h3 className="text-2xl font-bold font-['Cormorant_Garamond',serif] mt-0.5">
                      Thiru. Padmasena
                    </h3>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Padmasena Convention Center, Palur
                    </p>
                  </div>
                </div>
              </div>
            </CursorPerspectiveCard>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#C5A45D]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
                FOUNDER&apos;S MESSAGE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight font-['Cormorant_Garamond',serif]">
              &ldquo;Building a Sanctuary Where Every Family Celebration Becomes a{' '}
              <span className="italic font-semibold text-[#C5A45D]">Cherished Legacy.</span>&rdquo;
            </h2>

            <div className="bg-white dark:bg-[#0c2317] border-l-4 border-l-[#C5A45D] p-6 sm:p-8 shadow-sm space-y-4 relative">
              <Quote className="w-8 h-8 text-[#C5A45D]/30 absolute top-5 right-6" />
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                When we envisioned Padmasena Convention Center in Palur Village, our dream was to create a distinguished venue where families from Chengalpattu, Kanchipuram, Walajabad, and Chennai could come together in comfort, dignity, and joy. In our culture, a wedding or milestone ceremony is not merely an event—it is a sacred union of generations.
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                Every pillarless hall, centralized air-conditioning system, pure vegetarian and non-vegetarian culinary arrangement, and the sanctified Ganesha shrine within our courtyard has been thoughtfully designed so hosts can welcome their guests with pride and complete peace of mind.
              </p>
              <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-[#234D3C] dark:text-[#f3eedd] font-['Cormorant_Garamond',serif]">
                    Thiru. Padmasena
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#C5A45D] font-semibold">
                    Founder &amp; Chairman
                  </div>
                </div>
                <Award className="w-6 h-6 text-[#C5A45D]" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CO-FOUNDER */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#C5A45D]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
                LEADERSHIP &amp; EXCELLENCE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight font-['Cormorant_Garamond',serif]">
              Co-Founder&apos;s{' '}
              <span className="italic font-semibold text-[#C5A45D]">Introduction.</span>
            </h2>

            <div className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/30 p-6 sm:p-8 shadow-sm space-y-4">
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                With a deep passion for modern hospitality management and guest experience, our Co-Founder leads the operational excellence, architectural upkeep, and personalized event coordination at Padmasena Convention Center.
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                By introducing three thoughtfully tiered hall packages—Low Budget Plan, High Budget Plan, and Premium Budget Plan—alongside seamless multi-date digital reservations and executive corporate event support, our leadership ensures that every celebration receives five-star care regardless of scale.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-200/80 dark:border-white/10 flex items-center gap-2.5 text-xs font-semibold text-[#234D3C] dark:text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A45D] shrink-0" />
                  <span>End-to-End Venue Operations</span>
                </div>
                <div className="p-3.5 bg-[#FAF8F2] dark:bg-[#07150e] border border-gray-200/80 dark:border-white/10 flex items-center gap-2.5 text-xs font-semibold text-[#234D3C] dark:text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A45D] shrink-0" />
                  <span>Client &amp; Corporate Hospitality</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-[#234D3C] dark:text-[#f3eedd] font-['Cormorant_Garamond',serif]">
                    Smt. Lakshmi Padmasena
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#C5A45D] font-semibold">
                    Co-Founder &amp; Managing Director
                  </div>
                </div>
                <Sparkles className="w-6 h-6 text-[#C5A45D]" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <CursorPerspectiveCard maxRotation={6}>
              <div className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/40 p-3 sm:p-4 shadow-2xl relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0f251c]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85"
                    alt="Co-Founder of Padmasena Convention Center"
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#C5A45D] block">
                      Co-Founder &amp; Managing Director
                    </span>
                    <h3 className="text-2xl font-bold font-['Cormorant_Garamond',serif] mt-0.5">
                      Smt. Lakshmi Padmasena
                    </h3>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Hospitality &amp; Venue Operations Lead
                    </p>
                  </div>
                </div>
              </div>
            </CursorPerspectiveCard>
          </div>
        </section>

        {/* SECTION 3 & 4: VISION & MISSION */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
              OUR GUIDING PURPOSE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight font-['Cormorant_Garamond',serif]">
              Our Vision &amp;{' '}
              <span className="italic font-semibold text-[#C5A45D]">Our Mission.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Vision Card */}
            <CursorPerspectiveCard maxRotation={5} className="h-full">
              <div className="bg-[#234D3C] dark:bg-[#081710] text-white border border-[#C5A45D]/40 border-t-4 border-t-[#C5A45D] p-8 sm:p-10 shadow-xl h-full flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white/10 border border-[#C5A45D]/50 flex items-center justify-center text-[#C5A45D]">
                      <Compass className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A45D]">
                      LONG-TERM ASPIRATION
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-['Cormorant_Garamond',serif] text-white">
                    Our Vision
                  </h3>

                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
                    To stand as Tamil Nadu&apos;s most trusted and admired destination for weddings, cultural milestones, and corporate conclaves—setting the benchmark for architectural elegance, inclusive package flexibility, and sustainable hospitality in the Chengalpattu–Kanchipuram corridor.
                  </p>

                  <ul className="space-y-3 pt-2">
                    {[
                      'Elevate regional event infrastructure with world-class centralized HVAC, acoustics, and HD LED visuals.',
                      'Offer accessible luxury across Low Budget, High Budget, and Premium Hall plans under one roof.',
                      'Preserve cultural heritage while embracing modern convenience and seamless digital booking.',
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A45D] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#C5A45D] uppercase tracking-widest font-semibold">
                  <Building2 className="w-4 h-4" />
                  <span>{VENUE_INFO.name} &bull; Palur Village</span>
                </div>
              </div>
            </CursorPerspectiveCard>

            {/* Mission Card */}
            <CursorPerspectiveCard maxRotation={5} className="h-full">
              <div className="bg-white dark:bg-[#0c2317] text-[#202823] dark:text-gray-100 border border-[#e2d8c3] dark:border-[#C5A45D]/40 border-t-4 border-t-[#234D3C] dark:border-t-[#C5A45D] p-8 sm:p-10 shadow-xl h-full flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-[#FAF8F2] dark:bg-[#07150e] border border-[#C5A45D]/50 flex items-center justify-center text-[#234D3C] dark:text-[#C5A45D]">
                      <Target className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5A45D]">
                      OUR DAILY COMMITMENT
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-['Cormorant_Garamond',serif] text-[#234D3C] dark:text-[#f3eedd]">
                    Our Mission
                  </h3>

                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    To deliver spotless hygiene, reliable infrastructure, warm personalized service, and complete customer satisfaction on every single event day—ensuring families and corporate organizers can focus wholly on their guests and memories.
                  </p>

                  <ul className="space-y-3 pt-2">
                    {[
                      'Maintain 100% power continuity, pristine air-conditioned halls, and well-appointed guest rooms with lift access.',
                      'Honor culinary traditions with dedicated indoor pure-vegetarian and separate outdoor non-vegetarian kitchens.',
                      'Provide transparent, responsive support from the first availability enquiry through the final guest departure.',
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A45D] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-[#234D3C] dark:text-[#C5A45D] uppercase tracking-widest font-semibold">
                    <HeartHandshake className="w-4 h-4 text-[#C5A45D]" />
                    <span>100% Guest Satisfaction</span>
                  </span>
                  <ShieldCheck className="w-5 h-5 text-[#C5A45D]" />
                </div>
              </div>
            </CursorPerspectiveCard>
          </div>
        </section>

        {/* Bottom CTA Strip */}
        <section className="bg-[#234D3C] dark:bg-[#081710] border border-[#C5A45D]/40 p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A45D] font-bold">
              PLAN YOUR MILESTONE WITH US
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-['Cormorant_Garamond',serif]">
              Ready to Host Your Event at Padmasena Convention Center?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              Explore our hall plans and facilities or reserve your preferred dates online in minutes.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <button
              onClick={() => onNavigate('/booking', 'booking-enquiry-form')}
              className="px-8 py-4 bg-[#C5A45D] text-[#07150e] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#d8bc7a] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Event</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
