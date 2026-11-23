import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Calendar,
  ChevronRight,
  ChevronDown,
  Phone,
  MapPin,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string, sectionId?: string) => void;
  onOpenBlogs?: () => void;
}

const SERVICE_SUBMENU_ITEMS = [
  { label: 'Hall - 3', route: '/facility/hall-3' },
  { label: 'Lawn', route: '/facility/lawn' },
  { label: 'Rooms', route: '/facility/rooms' },
  { label: 'Dining & Catering', route: '/facility/dining-catering' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSolid = isScrolled || currentRoute !== '/';

  // Dynamic logo selection: without scroll show "logo png-23.png", while scroll show "logo png-18.png"
  const isWhiteNav = isSolid && theme !== 'dark';
  const logoSrc = isWhiteNav
    ? '/assets/aistudio/logo_png-18_361e3e3b.png'
    : '/assets/aistudio/logo_png-23_edd56dd7.png';

  const navItemClass = isSolid
    ? 'text-[#234D3C] dark:text-gray-100 hover:text-[#C5A45D] dark:hover:text-[#C5A45D]'
    : 'text-white/95 hover:text-[#C5A45D]';

  const handleNavClick = (route: string, sectionId?: string) => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
    onNavigate(route, sectionId);
  };

  return (
    <>
      {/* Hidden preloads so scroll logo swap is instantaneous */}
      <div className="hidden" aria-hidden="true">
        <img src="/assets/aistudio/logo_png-23_edd56dd7.png" alt="" />
        <img src="/assets/aistudio/logo_png-18_361e3e3b.png" alt="" />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolid
            ? 'bg-white/95 dark:bg-[#07150e]/95 backdrop-blur-md shadow-md border-b border-[#e2d8c3]/60 dark:border-[#C5A45D]/30 py-2.5 sm:py-3 text-[#202823] dark:text-gray-100'
            : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-3 sm:py-4 text-white'
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

          {/* Desktop Main Header Navigation: Home, About, Services (dropdown), Expos & Corporate Events */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8"
          >
            <button
              onClick={() => handleNavClick('/')}
              className={`text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer ${
                currentRoute === '/' ? navItemClass : navItemClass
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('/', 'about')}
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
                  className={`w-3.5 h-3.5 text-[#C5A45D] transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 w-56 z-50">
                  <div className="bg-white dark:bg-[#07150e] border border-[#e2d8c3] dark:border-[#C5A45D]/40 border-t-2 border-t-[#C5A45D] shadow-2xl py-1.5">
                    {SERVICE_SUBMENU_ITEMS.map((subItem) => {
                      const isActive = currentRoute === subItem.route;
                      return (
                        <button
                          key={subItem.route}
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
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('/', 'events')}
              className={`text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer whitespace-nowrap ${navItemClass}`}
            >
              Expos &amp; Corporate Events
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 sm:p-2.5 border flex items-center justify-center transition-all cursor-pointer ${
                isSolid
                  ? 'border-gray-200 dark:border-[#C5A45D]/40 bg-white/80 dark:bg-[#0c2317] text-[#11614F] dark:text-[#C5A45D] hover:border-[#C5A45D]'
                  : 'border-white/30 bg-black/40 text-[#C5A45D] hover:border-[#C5A45D]'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A45D] transition-transform duration-300 hover:rotate-90" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#11614F] transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Prominent Gold-Accented BOOK YOUR EVENT Button */}
            <button
              onClick={() => handleNavClick('/booking')}
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[#C5A45D] text-[#0e241b] text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] font-semibold hover:bg-[#d8bc7a] transition-all shadow-md flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0e241b] shrink-0" />
              <span className="hidden sm:inline">BOOK YOUR EVENT</span>
              <span className="sm:hidden font-bold">BOOK</span>
            </button>

            {/* Mobile Menu Button (Visible below lg breakpoint) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden px-2.5 sm:px-3.5 py-1.5 sm:py-2 border flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                isSolid
                  ? 'border-gray-300 dark:border-[#C5A45D]/40 bg-white dark:bg-[#0c2317] text-[#234D3C] dark:text-gray-100 hover:border-[#C5A45D]'
                  : 'border-white/40 bg-black/40 text-white hover:border-[#C5A45D] hover:text-[#C5A45D]'
              }`}
              aria-label="Toggle menu navigation"
            >
              {menuOpen ? (
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A45D]" />
              ) : (
                <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A45D]" />
              )}
              <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Expandable Menu Panel */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[52px] sm:top-[64px] bg-white dark:bg-[#07150e] border-b-2 border-[#C5A45D] shadow-2xl z-50 max-h-[calc(100dvh-52px)] sm:max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 pb-20 sm:pb-8">
              {/* Top metadata info & Dark Mode quick toggle */}
              <div className="pb-3 mb-4 sm:pb-4 sm:mb-6 border-b border-gray-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 gap-2">
                <span className="flex items-center gap-1.5 font-medium text-[#234D3C] dark:text-[#C5A45D]">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A45D] shrink-0" /> Palur Village, Tamil Nadu (12 km from Chengalpattu)
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 font-medium text-[#234D3C] dark:text-gray-300">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A45D] shrink-0" /> +91 94432 18920
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-[#C5A45D]/40 text-[#234D3C] dark:text-[#C5A45D] bg-[#FAF8F2] dark:bg-[#0c2317] hover:border-[#C5A45D] transition-colors cursor-pointer"
                  >
                    {theme === 'dark' ? <Sun className="w-3 h-3 text-[#C5A45D]" /> : <Moon className="w-3 h-3 text-[#11614F]" />}
                    <span>{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
                  </button>
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
                  onClick={() => handleNavClick('/', 'about')}
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
                        <button
                          key={subItem.route}
                          onClick={() => handleNavClick(subItem.route)}
                          className="w-full px-5 py-3 text-left text-xs uppercase font-semibold tracking-wider text-[#234D3C] dark:text-gray-200 hover:bg-[#FAF8F2] dark:hover:bg-[#0c2317] hover:text-[#C5A45D] flex items-center justify-between cursor-pointer"
                        >
                          <span>{subItem.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#C5A45D]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleNavClick('/', 'events')}
                  className="w-full p-3.5 sm:p-4 bg-[#FAF8F2] dark:bg-[#0b1f15] hover:bg-[#E8F2E8] dark:hover:bg-[#122e20] border border-gray-200 dark:border-white/10 hover:border-[#C5A45D] text-left flex items-center justify-between group transition-all cursor-pointer"
                >
                  <span className="text-xs uppercase font-bold tracking-wider text-[#234D3C] dark:text-gray-200 group-hover:text-[#C5A45D]">
                    Expos &amp; Corporate Events
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C5A45D] shrink-0" />
                </button>
              </div>

              {/* Quick Action inside Menu */}
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 italic text-center sm:text-left">
                  The Grand Stage for Prestigious Celebrations.
                </div>
                <button
                  onClick={() => handleNavClick('/booking')}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-semibold tracking-[0.15em] sm:tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#C5A45D] dark:text-[#07150e]" />
                  <span>Book Your Event</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Mobile Bottom Booking CTA */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-40">
        <button
          onClick={() => handleNavClick('/booking')}
          className="w-full bg-[#1b3d30] dark:bg-[#07150e] text-white py-3 px-4 shadow-2xl flex items-center justify-between border border-[#C5A45D]/60 backdrop-blur-md font-semibold text-xs uppercase tracking-wider cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5A45D]" />
            <span className="text-[11px]">Check Availability</span>
          </span>
          <span className="bg-[#C5A45D] text-[#0e241b] px-3 py-1 text-[10px] font-bold tracking-wider">
            BOOK NOW
          </span>
        </button>
      </div>
    </>
  );
};
