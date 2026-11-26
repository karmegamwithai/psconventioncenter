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
  Phone,
  ShieldCheck,
  Award,
  Layers
} from 'lucide-react';
import { HALL_PACKAGES, HallPackageId, VENUE_INFO } from '../data/venueData';
import { CursorPerspectiveCard } from '../components/common/CursorPerspectiveCard';

interface HallPackageDetailPageProps {
  packageId: HallPackageId;
  onNavigate: (route: string, sectionId?: string) => void;
  onEnquirePackage: (packageName: string) => void;
}

export const HallPackageDetailPage: React.FC<HallPackageDetailPageProps> = ({
  packageId,
  onNavigate,
  onEnquirePackage
}) => {
  const pkg = HALL_PACKAGES.find((p) => p.id === packageId) || HALL_PACKAGES[0];
  const otherPackages = HALL_PACKAGES.filter((p) => p.id !== pkg.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [packageId]);

  return (
    <div className="min-h-screen bg-[#FAF8F2] dark:bg-[#06140e] text-[#202823] dark:text-gray-100 transition-colors duration-300">
      {/* Page Hero Banner */}
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
              onClick={() => onNavigate('/facility/hall-3')}
              className="hover:text-[#234D3C] dark:hover:text-[#C5A45D] transition-colors cursor-pointer"
            >
              Hall
            </button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-[#234D3C] dark:text-[#C5A45D] font-semibold">
              {pkg.title}
            </span>
          </nav>

          {/* Hero Title & Enquire Now Action */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-px bg-[#C5A45D]" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
                  HALL PACKAGE &bull; {pkg.tierLabel.toUpperCase()}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-light text-[#234D3C] dark:text-[#f3eedd] tracking-tight">
                {pkg.title}
              </h1>

              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl font-light">
                {pkg.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('/facility/hall-3')}
                className="px-5 py-3 bg-white dark:bg-[#0c2317] border border-gray-300 dark:border-[#C5A45D]/40 text-[#234D3C] dark:text-gray-100 text-xs uppercase font-semibold tracking-[0.16em] hover:border-[#C5A45D] transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#C5A45D]" />
                <span>Back to Hall</span>
              </button>
              <button
                onClick={() => onEnquirePackage(pkg.title)}
                className="px-6 py-3 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-semibold tracking-[0.18em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A45D] dark:text-[#07150e]" />
                <span>Enquire Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16">
        {/* Section 1: Package Explanation & Featured Images */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Images Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-[#0c2317] border border-[#e2d8c3]/80 dark:border-[#C5A45D]/30 p-2 sm:p-3 shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-black">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#234D3C]/95 dark:bg-[#07150e]/95 border border-[#C5A45D]/60 px-3.5 py-1">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#C5A45D]">
                    {pkg.hallName} &bull; {pkg.tierLabel}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-[#234D3C]/95 dark:bg-[#07150e]/95 border border-[#C5A45D]/50 px-3.5 py-1.5 text-white text-xs font-semibold tracking-wide flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C5A45D]" />
                  <span>{pkg.capacity}</span>
                </div>
              </div>
            </div>

            {/* Secondary Venue Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pkg.secondaryImages.map((imgItem, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-[#C5A45D]/25 p-2 shadow-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-black">
                    <img
                      src={imgItem.src}
                      alt={imgItem.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-2 px-1 leading-snug">
                    {imgItem.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Package Explanation & Direct Enquire CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D] block">
                PACKAGE OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#234D3C] dark:text-[#f3eedd] tracking-tight">
                About the {pkg.title}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {pkg.description}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {pkg.packageOverview}
              </p>
            </div>

            {/* Specifications Box */}
            <div className="bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-[#C5A45D]/30 p-5 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#C5A45D] block">
                KEY SPECIFICATIONS
              </span>
              <div className="divide-y divide-gray-100 dark:divide-white/10">
                {pkg.specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#234D3C] dark:text-gray-100 sm:text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Occasions */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#234D3C] dark:text-[#C5A45D] block">
                Ideal Occasions
              </span>
              <div className="flex flex-wrap gap-2">
                {pkg.idealFor.map((occasion, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#0c2317] border border-[#e2d8c3] dark:border-[#C5A45D]/30 text-[#234D3C] dark:text-gray-200"
                  >
                    {occasion}
                  </span>
                ))}
              </div>
            </div>

            {/* Enquire Now CTA Box */}
            <div className="bg-white dark:bg-[#0c2317] border-2 border-[#C5A45D]/60 p-5 space-y-3.5 shadow-md">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                <span className="font-semibold uppercase tracking-wider text-[#234D3C] dark:text-[#C5A45D]">
                  Reservation &amp; Package Desk
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#C5A45D]" />
                  {VENUE_INFO.contact.phone}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Event pricing is customized based on your selected package, session timing, and event requirements.
              </p>
              <button
                onClick={() => onEnquirePackage(pkg.title)}
                className="w-full py-3.5 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#C5A45D] dark:text-[#07150e]" />
                <span>ENQUIRE NOW</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Package Facilities & Included Services */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Facilities Included */}
          <div className="lg:col-span-6 bg-[#234D3C] dark:bg-[#081710] border border-[#C5A45D]/40 p-6 sm:p-8 text-white space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D] block">
                  VENUE INFRASTRUCTURE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Package Facilities
                </h3>
              </div>
              <Layers className="w-6 h-6 text-[#C5A45D]" />
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {pkg.facilities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-black/20 border border-white/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C5A45D] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-100 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Included Services */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-[#C5A45D]/30 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D] block">
                    HOSPITALITY &amp; SUPPORT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#234D3C] dark:text-[#f3eedd] mt-1">
                    Included Services
                  </h3>
                </div>
                <ShieldCheck className="w-6 h-6 text-[#C5A45D]" />
              </div>

              <div className="space-y-4">
                {pkg.includedServices.map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#FAF8F2] dark:bg-[#07150e] border border-[#e2d8c3] dark:border-[#C5A45D]/25 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A45D] shrink-0" />
                      <h4 className="text-sm font-bold text-[#234D3C] dark:text-[#f3eedd] uppercase tracking-wider">
                        {srv.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-white/10">
              <button
                onClick={() => onEnquirePackage(pkg.title)}
                className="w-full py-3.5 bg-[#C5A45D] text-[#07150e] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#07150e]" />
                <span>ENQUIRE NOW FOR {pkg.title.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Package Benefits */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-px bg-[#C5A45D]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
                WHY CHOOSE THIS PLAN
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-[#234D3C] dark:text-[#f3eedd]">
              Key Benefits of the{' '}
              <span className="italic font-semibold text-[#C5A45D]">{pkg.title}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pkg.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-[#C5A45D]/30 p-6 space-y-3 shadow-sm hover:border-[#C5A45D] transition-all"
              >
                <div className="w-10 h-10 bg-[#FAF8F2] dark:bg-[#07150e] border border-[#C5A45D]/40 flex items-center justify-center text-[#234D3C] dark:text-[#C5A45D]">
                  <Award className="w-5 h-5 text-[#C5A45D]" />
                </div>
                <h4 className="text-base font-bold text-[#234D3C] dark:text-[#f3eedd]">
                  {benefit.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Compare & Explore Other Hall Packages */}
        <section className="pt-8 border-t border-[#e2d8c3] dark:border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C5A45D] block">
                HALL PACKAGE OPTIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-[#234D3C] dark:text-[#f3eedd]">
                Explore Other <span className="italic font-semibold text-[#C5A45D]">Hall Plans</span>
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/facility/hall-3')}
              className="text-xs uppercase font-semibold tracking-[0.18em] text-[#234D3C] dark:text-[#C5A45D] hover:underline cursor-pointer self-start sm:self-auto"
            >
              View All Hall Plans &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPackages.map((other) => (
              <CursorPerspectiveCard key={other.id} maxRotation={5} className="h-full">
                <div
                  onClick={() => onNavigate(`/package/${other.id}`)}
                  className="group bg-white dark:bg-[#0c2317] border border-gray-200 dark:border-[#C5A45D]/30 hover:border-[#C5A45D] transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden cursor-pointer flex flex-col sm:flex-row h-full"
                >
                  <div className="sm:w-2/5 aspect-[16/10] sm:aspect-auto overflow-hidden bg-gray-100 dark:bg-black">
                    <img
                      src={other.image}
                      alt={other.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 sm:w-3/5 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#C5A45D] block">
                        {other.tierLabel} &bull; {other.capacity}
                      </span>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-lg font-bold text-[#234D3C] dark:text-[#f3eedd] group-hover:text-[#C5A45D] transition-colors">
                          {other.title}
                        </h4>
                        <ArrowUpRight className="w-4 h-4 text-[#C5A45D] shrink-0" />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                        {other.description}
                      </p>
                    </div>
                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#234D3C] dark:text-[#C5A45D] group-hover:underline">
                      View {other.title} Details &rarr;
                    </span>
                  </div>
                </div>
              </CursorPerspectiveCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
