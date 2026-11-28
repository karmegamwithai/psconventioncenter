import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Calendar,
  ChevronRight,
  ChevronDown,
  Phone,
  MapPin,
} from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string, sectionId?: string) => void;
  onOpenBlogs?: () => void;
  onOpenContactUs?: () => void;
}

const SERVICE_SUBMENU_ITEMS = [
  {
    label: 'Hall',
    route: '/facility/hall-3',
    subPackages: [
      { label: 'Low Budget Plan', route: '/package/low-budget-plan' },
      { label: 'High Budget Plan', route: '/package/high-budget-plan' },
      { label: 'Premium Budget Plan', route: '/package/premium-budget-plan' },
    ],
  },
  { label: 'Lawn', route: '/facility/lawn' },
  { label: 'Rooms', route: '/facility/rooms' },
  { label: 'Dining & Catering', route: '/facility/dining-catering' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenContactUs,
}) => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (currentRoute !== '/') {
        setIsPastHero(true);
        return;
      }
      const heroEl = document.getElementById('hero-section');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setIsPastHero(rect.bottom <= 72);
      } else {
        setIsPastHero(window.scrollY > window.innerHeight * 0.85);
      }
    };

    checkScrollPosition();
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [currentRoute]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSolid = isPastHero || currentRoute !== '/';

  // White logo over the hero gradient, dark logo on solid white navbar
  const logoSrc = isSolid
    ? '/assets/aistudio/logo_png-18_361e3e3b.png'
    : '/assets/aistudio/logo_png-23_edd56dd7.png';

  const navItemClass = isSolid
    ? 'text-black hover:text-[#C5A45D]'
    : 'text-white/95 hover:text-[#C5A45D]';

  const handleNavClick = (route: string, sectionId?: string) => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
    onNavigate(route, sectionId);
  };

  const handleContactClick = () => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
    if (onOpenContactUs) {
      onOpenContactUs();
    }
  };

  const handleBookEventClick = () => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
    onNavigate('/booking', 'booking-enquiry-form');
  };

  return (
    <>
      {/* Preload both logos so transition is seamless */}
      <div className="hidden" aria-hidden="true">
        <img src="/assets/aistudio/logo_png-23_edd56dd7.png" alt="" />
        <img src="/assets/aistudio/logo_png-18_361e3e3b.png" alt="" />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isSolid
            ? 'bg-white shadow-md border-b border-gray-200/80 py-2.5 sm:py-3 text-black'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3 sm:py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center group text-left focus:outline-none cursor-pointer shrink-0 transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Padmasena Convention Center Home"
          >
            <img
              src={logoSrc}
              alt="Padmasena Convention Center Logo"
              className="h-7 sm:h-9 md:h-10 w-auto max-w-[160px] xs:max-w-[200px] sm:max-w-[240px] md:max-w-[260px] object-contain transition-all duration-300"
            />
          </button>

          {/* Desktop Main Header Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8"
          >
            <button
              onClick={() => handleNavClick('/')}
              className={`text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer ${navItemClass}`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('/about')}
              className={`text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer ${navItemClass}`}
            >
              About
            </button>

            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
                className={`text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 py-2 ${navItemClass}`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isSolid ? 'text-black' : 'text-[#C5A45D]'
                  } ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 w-64 z-50">
                  <div className="bg-white dark:bg-[#07150e] border border-[#e2d8c3] dark:border-[#C5A45D]/40 border-t-2 border-t-[#C5A45D] shadow-2xl py-1.5">
                    {SERVICE_SUBMENU_ITEMS.map((subItem) => {
                      const isActive = currentRoute === subItem.route;
                      return (
                        <div key={subItem.route}>
                          <button
                            onClick={() => handleNavClick(subItem.route)}
                            className={`w-full px-4 py-2.5 text-left text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-[#FAF8F2] dark:bg-[#0c2317] text-[#C5A45D]'
                                : 'text-[#234D3C] dark:text-gray-200 hover:bg-[#FAF8F2] dark:hover:bg-[#0c2317] hover:text-[#C5A45D]'
                            }`}
                          >
                            <span>{subItem.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#C5A45D] opacity-70" />
                          </button>

                          {subItem.subPackages && (
                            <div className="bg-[#FAF8F2]/80 dark:bg-[#0b1f15]/70 border-y border-gray-100 dark:border-white/5 py-1">
                              {subItem.subPackages.map((pkg) => {
                                const isPkgActive = currentRoute === pkg.route;
                                return (
                                  <button
                                    key={pkg.route}
                                    onClick={() => handleNavClick(pkg.route)}
                                    className={`w-full pl-7 pr-4 py-2 text-left text-[11px] uppercase tracking-[0.12em] font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                      isPkgActive
                                        ? 'text-[#C5A45D]'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-[#234D3C] dark:hover:text-[#C5A45D]'
                                    }`}
                                  >
                                    <span>&bull; {pkg.label}</span>
                                    <ChevronRight className="w-3 h-3 text-[#C5A45D] opacity-60" />
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('/corporate')}
              className={`text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer whitespace-nowrap ${navItemClass}`}
            >
              Corporate Events
            </button>

            <button
              type="button"
              onClick={handleContactClick}
              className={`text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer whitespace-nowrap ${navItemClass}`}
            >
              Contact
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Contact Button (Visible on tablet/mobile or quick access) */}
            <button
              type="button"
              onClick={handleContactClick}
              className={`lg:hidden px-2.5 sm:px-3.5 py-2 text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                isSolid
                  ? 'border-gray-300 bg-white text-black hover:border-[#C5A45D]'
                  : 'border-white/40 bg-black/40 text-white hover:border-[#C5A45D]'
              }`}
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>Contact</span>
            </button>

            {/* Prominent Gold-Accented BOOK EVENT Button */}
            <button
              type="button"
              onClick={handleBookEventClick}
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[#C5A45D] text-black text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] font-semibold hover:bg-[#d8bc7a] transition-all shadow-md flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-black shrink-0" />
              <span>Book Event</span>
            </button>

            {/* Mobile Menu Button (Visible below lg breakpoint) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden px-2.5 sm:px-3.5 py-1.5 sm:py-2 border flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                isSolid
                  ? 'border-gray-300 bg-white text-black hover:border-[#C5A45D]'
                  : 'border-white/40 bg-black/40 text-white hover:border-[#C5A45D] hover:text-[#C5A45D]'
              }`}
              aria-label="Toggle menu navigation"
            >
              {menuOpen ? (
                <X className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSolid ? 'text-black' : 'text-[#C5A45D]'}`} />
              ) : (
                <Menu className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSolid ? 'text-black' : 'text-[#C5A45D]'}`} />
              )}
              <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Expandable Menu Panel */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[52px] sm:top-[64px] bg-white dark:bg-[#07150e] border-b-2 border-[#C5A45D] shadow-2xl z-50 max-h-[calc(100dvh-52px)] sm:max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 pb-20 sm:pb-8">
              {/* Top metadata info */}
              <div className="pb-3 mb-4 sm:pb-4 sm:mb-6 border-b border-gray-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 gap-2">
                <span className="flex items-center gap-1.5 font-medium text-[#234D3C] dark:text-[#C5A45D]">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A45D] shrink-0" /> Palur Village, Tamil Nadu (12 km from Chengalpattu)
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 font-medium text-[#234D3C] dark:text-gray-300">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A45D] shrink-0" /> +91 94432 18920
                  </span>
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-2.5">
                <button
                  onClick={() => handleNavClick('/')}
                  className="w-full p-3.5 sm:p-4 bg-[#FAF8F2] dark:bg-[#0b1f15] hover:bg-[#E8F2E8] dark:hover:bg-[#122e20] border border-gray-200 dark:border-white/10 hover:border-[#C5A45D] text-left flex items-center justify-between group transition-all cursor-pointer"
                >
                  <span className="text-xs uppercase font-bold tracking-wider text-[#234D3C] dark:text-gray-200 group-hover:text-[#C5A45D]">
                    Home
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C5A45D] shrink-0" />
                </button>

                <button
                  onClick={() => handleNavClick('/about')}
                  className="w-full p-3.5 sm:p-4 bg-[#FAF8F2] dark:bg-[#0b1f15] hover:bg-[#E8F2E8] dark:hover:bg-[#122e20] border border-gray-200 dark:border-white/10 hover:border-[#C5A45D] text-left flex items-center justify-between group transition-all cursor-pointer"
                >
                  <span className="text-xs uppercase font-bold tracking-wider text-[#234D3C] dark:text-gray-200 group-hover:text-[#C5A45D]">
                    About
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C5A45D] shrink-0" />
                </button>

                {/* Mobile Services Accordion */}
                <div className="border border-gray-200 dark:border-white/10 bg-[#FAF8F2] dark:bg-[#0b1f15]">
                  <button
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between group transition-all cursor-pointer"
                  >
                    <span className="text-xs uppercase font-bold tracking-wider text-[#234D3C] dark:text-gray-200 group-hover:text-[#C5A45D]">
                      Services
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C5A45D] transition-transform duration-200 ${
                        mobileServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileServicesOpen && (
                    <div className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#07150e] divide-y divide-gray-100 dark:divide-white/5">
                      {SERVICE_SUBMENU_ITEMS.map((subItem) => (
                        <div key={subItem.route}>
                          <button
                            onClick={() => handleNavClick(subItem.route)}
                            className="w-full px-5 py-3 text-left text-xs uppercase font-semibold tracking-wider text-[#234D3C] dark:text-gray-200 hover:bg-[#FAF8F2] dark:hover:bg-[#0c2317] hover:text-[#C5A45D] flex items-center justify-between cursor-pointer"
                          >
                            <span>{subItem.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#C5A45D]" />
                          </button>
                          {subItem.subPackages && (
                            <div className="bg-[#FAF8F2]/70 dark:bg-[#0b1f15]/70 divide-y divide-gray-100/60 dark:divide-white/5">
                              {subItem.subPackages.map((pkg) => (
                                <button
                                  key={pkg.route}
                                  onClick={() => handleNavClick(pkg.route)}
                                  className="w-full pl-8 pr-5 py-2.5 text-left text-[11px] uppercase font-semibold tracking-wider text-gray-600 dark:text-gray-300 hover:text-[#234D3C] dark:hover:text-[#C5A45D] flex items-center justify-between cursor-pointer"
                                >
                                  <span>&bull; {pkg.label}</span>
                                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleNavClick('/corporate')}
                  className="w-full p-3.5 sm:p-4 bg-[#FAF8F2] dark:bg-[#0b1f15] hover:bg-[#E8F2E8] dark:hover:bg-[#122e20] border border-gray-200 dark:border-white/10 hover:border-[#C5A45D] text-left flex items-center justify-between group transition-all cursor-pointer"
                >
                  <span className="text-xs uppercase font-bold tracking-wider text-[#234D3C] dark:text-gray-200 group-hover:text-[#C5A45D]">
                    Corporate Events
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C5A45D] shrink-0" />
                </button>

                <button
                  onClick={handleContactClick}
                  className="w-full p-3.5 sm:p-4 bg-[#FAF8F2] dark:bg-[#0b1f15] hover:bg-[#E8F2E8] dark:hover:bg-[#122e20] border border-gray-200 dark:border-white/10 hover:border-[#C5A45D] text-left flex items-center justify-between group transition-all cursor-pointer"
                >
                  <span className="text-xs uppercase font-bold tracking-wider text-[#234D3C] dark:text-gray-200 group-hover:text-[#C5A45D]">
                    Contact
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C5A45D] shrink-0" />
                </button>
              </div>

              {/* Quick Actions inside Menu */}
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 italic text-center sm:text-left">
                  The Grand Stage for Prestigious Celebrations.
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={handleContactClick}
                    className="w-full sm:w-auto px-5 py-3 border border-[#234D3C] dark:border-[#C5A45D]/50 text-[#234D3C] dark:text-[#C5A45D] text-xs uppercase font-semibold tracking-[0.15em] hover:bg-[#E8F2E8] dark:hover:bg-[#122e22] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#C5A45D]" />
                    <span>Contact</span>
                  </button>
                  <button
                    onClick={handleBookEventClick}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-semibold tracking-[0.15em] sm:tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Calendar className="w-4 h-4 text-[#C5A45D] dark:text-[#07150e]" />
                    <span>Book Event</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Mobile Bottom Booking CTA */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-40">
        <button
          onClick={handleBookEventClick}
          className="w-full bg-[#1b3d30] dark:bg-[#07150e] text-white py-3 px-4 shadow-2xl flex items-center justify-between border border-[#C5A45D]/60 backdrop-blur-md font-semibold text-xs uppercase tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5A45D]" />
            <span className="text-[11px]">Check Availability</span>
          </span>
          <span className="bg-[#C5A45D] text-[#0e241b] px-3 py-1 text-[10px] font-bold tracking-wider">
            BOOK EVENT
          </span>
        </button>
      </div>
    </>
  );
};
