import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ChevronRight, Phone, MapPin, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  currentRoute: '/' | '/booking';
  onNavigate: (route: '/' | '/booking', sectionId?: string) => void;
  onOpenBlogs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenBlogs }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = isScrolled || currentRoute === '/booking';

  const navLinks = [
    { label: 'HOME', route: '/' as const, section: '' },
    { label: 'ABOUT US', route: '/' as const, section: 'about' },
    { label: 'FACILITIES & AMENITIES', route: '/' as const, section: 'facilities' },
    { label: 'SERVICES', route: '/' as const, section: 'services' },
    { label: 'EVENTS & OCCASIONS', route: '/' as const, section: 'events' },
    { label: 'GALLERY', route: '/' as const, section: 'gallery' },
    { label: 'BLOGS & UPDATES', isBlog: true },
    { label: 'CONTACT & ENQUIRY', route: '/' as const, section: 'contact' },
  ];

  const handleLinkClick = (item: typeof navLinks[0]) => {
    setMenuOpen(false);
    if (item.isBlog) {
      onOpenBlogs();
      return;
    }
    if (item.route) {
      onNavigate(item.route, item.section);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolid
            ? 'bg-white/95 dark:bg-[#07150e]/95 backdrop-blur-md shadow-md border-b border-[#e2d8c3]/60 dark:border-[#C5A45D]/30 py-2.5 sm:py-3 text-[#202823] dark:text-gray-100'
            : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-3 sm:py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <button
            onClick={() => {
              setMenuOpen(false);
              onNavigate('/');
            }}
            className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none cursor-pointer shrink-0"
            aria-label="PS Convention Center Home"
          >
            <div className="bg-white p-1 sm:p-1.5 shadow-sm border border-[#C5A45D]/50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
              <img
                src="/assets/aistudio/image_d32710d1.png"
                alt="PS Convention Center Logo"
                className="h-8 sm:h-11 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`logo-title text-xs sm:text-base transition-colors truncate ${
                  !isSolid ? '!text-white' : 'dark:!text-[#F7E7BE]'
                }`}
              >
                PS Convention Center
              </span>
              <span
                className={`logo-subtitle text-[8px] sm:text-[10px] uppercase transition-colors truncate ${
                  !isSolid ? '!text-[#C5A45D]' : 'dark:!text-[#C5A45D]'
                }`}
              >
                Palur Village &bull; Tamil Nadu
              </span>
            </div>
          </button>

          {/* Right Header Navigation & Actions */}
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
              onClick={() => {
                setMenuOpen(false);
                onNavigate('/booking');
              }}
              className="px-3 sm:px-6 py-2 sm:py-2.5 bg-[#C5A45D] text-[#0e241b] text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold hover:bg-[#d8bc7a] transition-all shadow-md flex items-center gap-1.5 sm:gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0e241b] shrink-0" />
              <span className="hidden sm:inline">BOOK YOUR EVENT</span>
              <span className="sm:hidden font-bold">BOOK</span>
            </button>

            {/* Menu Bar Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 border flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                isSolid
                  ? 'border-gray-300 dark:border-[#C5A45D]/40 bg-white dark:bg-[#0c2317] text-[#234D3C] dark:text-gray-100 hover:border-[#C5A45D]'
                  : 'border-white/40 bg-black/40 text-white hover:border-[#C5A45D] hover:text-[#C5A45D]'
              }`}
              aria-label="Toggle menu navigation"
            >
              {menuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A45D]" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A45D]" />}
              <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Menu Panel (Responsive scrollable drawer) */}
        {menuOpen && (
          <div className="fixed inset-x-0 top-[52px] sm:top-[64px] bg-white dark:bg-[#07150e] border-b-2 border-[#C5A45D] shadow-2xl z-50 max-h-[calc(100dvh-52px)] sm:max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 pb-20 sm:pb-8">
              {/* Top metadata info & Dark Mode quick toggle in drawer */}
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

              {/* Menu Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                {navLinks.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleLinkClick(item)}
                    className="p-3.5 sm:p-4 bg-[#FAF8F2] dark:bg-[#0b1f15] hover:bg-[#E8F2E8] dark:hover:bg-[#122e20] border border-gray-200 dark:border-white/10 hover:border-[#C5A45D] dark:hover:border-[#C5A45D] text-left flex items-center justify-between group transition-all cursor-pointer"
                  >
                    <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-[#234D3C] dark:text-gray-200 group-hover:text-[#C5A45D]">
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C5A45D] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>

              {/* Quick Action inside Menu */}
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 italic text-center sm:text-left">
                  The Grand Stage for Prestigious Celebrations.
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate('/booking');
                  }}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#07150e] text-xs uppercase font-semibold tracking-[0.15em] sm:tracking-[0.2em] hover:bg-[#163b2c] dark:hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#C5A45D] dark:text-[#07150e]" />
                  <span>Check Date Availability Calendar</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Mobile Bottom Booking CTA */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-40">
        <button
          onClick={() => onNavigate('/booking')}
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
