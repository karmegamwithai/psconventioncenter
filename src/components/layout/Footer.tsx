import React from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Instagram, Facebook, Youtube, Share2, Sparkles, ChevronRight } from 'lucide-react';
import { VENUE_INFO } from '../../data/venueData';

interface FooterProps {
  onNavigate: (route: '/' | '/booking', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#17372a] text-white pt-16 pb-12 border-t border-[#C5A45D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded border border-[#C5A45D] text-[#C5A45D] flex items-center justify-center font-bold tracking-wider text-base bg-black/20">
                PS
              </div>
              <div>
                <span className="block text-base font-bold tracking-wider text-white uppercase">PS Convention Center</span>
                <span className="text-[10px] tracking-widest uppercase text-[#C5A45D]">Palur Village &bull; Tamil Nadu</span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              A premier architectural landmark designed for royal weddings, grand receptions, and cultural festivities. Offering 1,000+ guest capacity, centralized HVAC, plush suites, and banquet services.
            </p>
            <div className="pt-2 text-xs text-[#C5A45D] italic font-serif flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>"{VENUE_INFO.tagline}"</span>
            </div>
            {/* Social Icons */}
            <div className="pt-3 flex items-center gap-3">
              <a
                href="#social"
                className="w-8 h-8 rounded-full border border-[#C5A45D]/40 text-[#C5A45D] flex items-center justify-center hover:bg-[#C5A45D] hover:text-[#17372a] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-8 h-8 rounded-full border border-[#C5A45D]/40 text-[#C5A45D] flex items-center justify-center hover:bg-[#C5A45D] hover:text-[#17372a] transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-8 h-8 rounded-full border border-[#C5A45D]/40 text-[#C5A45D] flex items-center justify-center hover:bg-[#C5A45D] hover:text-[#17372a] transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-8 h-8 rounded-full border border-[#C5A45D]/40 text-[#C5A45D] flex items-center justify-center hover:bg-[#C5A45D] hover:text-[#17372a] transition-colors"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#C5A45D] mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('/', '')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/', 'about')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> About PS Convention Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/', 'facilities')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> Facilities & Capacities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/', 'events')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> Events & Occasions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/', 'services')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> Catering & Decor Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/', 'gallery')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/booking')}
                  className="text-[#C5A45D] hover:underline font-semibold text-left flex items-center gap-1.5 pt-1"
                >
                  <Calendar className="w-3.5 h-3.5" /> Interactive Booking Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Facilities & Spaces */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#C5A45D] mb-4">Venue Spaces</h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A45D] mt-1.5 shrink-0"></span>
                <span>Main AC Convention Hall (600 - 1,000 guests)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A45D] mt-1.5 shrink-0"></span>
                <span>Centralized AC Dining Hall (300 - 500 guests)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A45D] mt-1.5 shrink-0"></span>
                <span>6 Guest Rooms with Lift Accessibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A45D] mt-1.5 shrink-0"></span>
                <span>First-Floor Open Sunset Terrace</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A45D] mt-1.5 shrink-0"></span>
                <span>Ganesha Temple & Heritage Courtyard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A45D] mt-1.5 shrink-0"></span>
                <span>30+ Cars Parking & 100% DG Backup</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#C5A45D] mb-4">Venue & Contact</h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A45D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">PS Convention Center</p>
                  <p className="text-gray-300">Palur Village, Tamil Nadu - 603101</p>
                  <p className="text-[#C5A45D] text-[11px] mt-0.5">12 km from Chengalpattu | 10 km from Walajabad</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A45D] shrink-0" />
                <div>
                  <p>{VENUE_INFO.contact.phone}</p>
                  <p className="text-gray-400">{VENUE_INFO.contact.altPhone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A45D] shrink-0" />
                <p>{VENUE_INFO.contact.email}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A45D] shrink-0" />
                <p>{VENUE_INFO.contact.hours}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/booking')}
                  className="w-full py-2.5 border border-[#C5A45D] text-[#C5A45D] text-[11px] font-semibold tracking-wider uppercase rounded hover:bg-[#C5A45D] hover:text-[#17372a] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Check Date Availability</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} PS Convention Center. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Palur Village, Chengalpattu Dt.</span>
            <span>&bull;</span>
            <span>Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
