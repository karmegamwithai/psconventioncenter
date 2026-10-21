import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ChevronRight, Phone, Clock, MapPin, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentRoute: '/' | '/booking';
  onNavigate: (route: '/' | '/booking', sectionId?: string) => void;
  onOpenBlogs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenBlogs }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3 text-[#202823]'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setMenuOpen(false);
              onNavigate('/');
            }}
            className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
          >
            <div className="bg-white px-2 py-1 rounded-sm shadow-sm border border-[#C5A45D]/40 flex items-center justify-center">
              <img
                src="/assets/aistudio/image_d32710d1.png"
                alt="Padmasena PS Convention Center Logo"
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors ${
                  isSolid ? 'text-[#234D3C]' : 'text-white'
                }`}
              >
                PS Convention Center
              </span>
              <span
                className={`text-[9px] tracking-[0.2em] uppercase font-medium ${
                  isSolid ? 'text-gray-500' : 'text-gray-300'
                }`}
              >
                Palur Village &bull; Tamil Nadu
              </span>
            </div>
          </button>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Book Your Event Button */}
            <button
              onClick={() => {
                setMenuOpen(false);
                onNavigate('/booking');
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer ${
                isSolid
                  ? 'bg-[#234D3C] text-white hover:bg-[#17372a]'
                  : 'bg-[#C5A45D] text-[#17372a] hover:bg-white hover:text-[#234D3C] shadow-lg'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A45D] group-hover:text-current" />
              <span className="hidden sm:inline">BOOK YOUR EVENT</span>
              <span className="sm:hidden">BOOK</span>
            </button>

            {/* Menu Bar Button (Click to show menus) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`px-3.5 py-2 rounded-sm border flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                isSolid
                  ? 'border-gray-300 bg-white text-[#234D3C] hover:border-[#234D3C] hover:bg-[#E8F2E8]'
                  : 'border-white/40 bg-black/30 text-white hover:border-[#C5A45D] hover:text-[#C5A45D]'
              }`}
              aria-label="Toggle menu bar"
            >
              {menuOpen ? <X className="w-4 h-4 text-[#C5A45D]" /> : <Menu className="w-4 h-4 text-[#C5A45D]" />}
              <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Menu Panel (Shows when Menu Bar is clicked) */}
        {menuOpen && (
          <div className="fixed inset-x-0 top-[62px] bg-white border-b border-gray-200 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Top metadata info */}
              <div className="pb-4 mb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
                <span className="flex items-center gap-1.5 font-medium text-[#234D3C]">
                  <MapPin className="w-4 h-4 text-[#C5A45D]" /> Palur Village, Tamil Nadu (12 km from Chengalpattu)
                </span>
                <span className="flex items-center gap-1.5 font-medium text-[#234D3C]">
                  <Phone className="w-4 h-4 text-[#C5A45D]" /> Enquiry: +91 94432 18920
                </span>
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {navLinks.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleLinkClick(item)}
                    className="p-3.5 rounded-sm bg-[#FAF8F2] hover:bg-[#E8F2E8] border border-gray-200/80 hover:border-[#C5A45D] text-left flex items-center justify-between group transition-all cursor-pointer"
                  >
                    <span className="text-xs uppercase font-bold tracking-wider text-[#234D3C] group-hover:text-[#234D3C]">
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C5A45D] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              {/* Quick Action inside Menu */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500 italic">
                  Where Beautiful Celebrations Become Timeless Memories.
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigate('/booking');
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#234D3C] text-white text-xs uppercase font-bold tracking-widest rounded-sm hover:bg-[#17372a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[#C5A45D]" />
                  <span>Check Date Availability Calendar</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Mobile Bottom Booking CTA */}
      <div className="sm:hidden fixed bottom-3 inset-x-4 z-40">
        <button
          onClick={() => onNavigate('/booking')}
          className="w-full bg-[#234D3C] text-white py-3.5 px-4 rounded-full shadow-2xl flex items-center justify-between border border-[#C5A45D]/40 backdrop-blur-md font-semibold text-xs uppercase tracking-wider"
        >
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5A45D]" />
            <span>Check Availability</span>
          </span>
          <span className="bg-[#C5A45D] text-[#234D3C] px-3 py-1 rounded-full text-[10px] font-bold">
            BOOK NOW
          </span>
        </button>
      </div>
    </>
  );
};
