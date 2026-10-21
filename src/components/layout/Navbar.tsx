import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ChevronRight, Phone, Clock, MapPin } from 'lucide-react';

interface NavbarProps {
  currentRoute: '/' | '/booking';
  onNavigate: (route: '/' | '/booking', sectionId?: string) => void;
  onOpenBlogs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenBlogs }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
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
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div
              className={`w-10 h-10 rounded-sm border flex items-center justify-center font-bold tracking-wider transition-all duration-300 ${
                isSolid
                  ? 'border-[#234D3C] text-[#234D3C] bg-[#E8F2E8]/60 group-hover:bg-[#234D3C] group-hover:text-white'
                  : 'border-[#C5A45D] text-[#C5A45D] bg-black/30 group-hover:bg-[#C5A45D] group-hover:text-[#234D3C]'
              }`}
            >
              PS
            </div>
            <div className="flex flex-col">
              <span
                className={`text-sm sm:text-base font-bold tracking-wider uppercase transition-colors ${
                  isSolid ? 'text-[#234D3C]' : 'text-white'
                }`}
              >
                PS Convention Center
              </span>
              <span
                className={`text-[9px] tracking-[0.22em] uppercase font-medium ${
                  isSolid ? 'text-gray-500' : 'text-gray-300'
                }`}
              >
                Palur Village &bull; Tamil Nadu
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navLinks.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(item)}
                className={`text-[12px] uppercase tracking-wider font-semibold relative py-1.5 transition-colors group cursor-pointer focus:outline-none ${
                  isSolid
                    ? 'text-[#202823] hover:text-[#C5A45D]'
                    : 'text-white hover:text-[#C5A45D]'
                }`}
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A45D] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onNavigate('/booking')}
              className={`px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer ${
                isSolid
                  ? 'bg-[#234D3C] text-white hover:bg-[#17372a] shadow-[#234D3C]/10'
                  : 'bg-[#C5A45D] text-[#234D3C] hover:bg-white hover:text-[#234D3C] shadow-lg'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A45D] group-hover:text-current" />
              <span>BOOK YOUR EVENT</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden p-2 rounded focus:outline-none ${
              isSolid ? 'text-[#234D3C]' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Fullscreen Overlay Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-[62px] bg-white border-b border-gray-200 shadow-2xl px-6 py-6 flex flex-col gap-3 text-[#202823] max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <div className="pb-3 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A45D]" /> Palur, Tamil Nadu
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C5A45D]" /> +91 94432 18920
              </span>
            </div>

            {navLinks.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(item)}
                className="text-left text-xs uppercase tracking-wider font-semibold border-b border-gray-100 py-2.5 flex justify-between items-center text-[#202823] hover:text-[#234D3C]"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#C5A45D]" />
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/booking');
              }}
              className="mt-3 w-full py-3.5 bg-[#234D3C] text-white text-center text-xs uppercase font-semibold tracking-widest rounded shadow-md hover:bg-[#17372a] flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#C5A45D]" />
              <span>Check Availability & Book</span>
            </button>
          </div>
        )}
      </header>

      {/* Fixed Mobile Bottom Booking CTA (only visible on mobile screens) */}
      <div className="sm:hidden fixed bottom-3 inset-x-4 z-40">
        <button
          onClick={() => onNavigate('/booking')}
          className="w-full bg-[#234D3C] text-white py-3.5 px-4 rounded-full shadow-2xl flex items-center justify-between border border-[#C5A45D]/40 backdrop-blur-md font-semibold text-xs uppercase tracking-wider"
        >
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C5A45D]" />
            <span>Check Date Availability</span>
          </span>
          <span className="bg-[#C5A45D] text-[#234D3C] px-3 py-1 rounded-full text-[10px] font-bold">
            BOOK NOW
          </span>
        </button>
      </div>
    </>
  );
};
