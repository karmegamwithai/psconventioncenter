import React from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Instagram, Facebook, Youtube, ChevronRight } from 'lucide-react';
import { VENUE_INFO } from '../../data/venueData';

interface FooterProps {
  onNavigate: (route: '/' | '/booking', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0f251c] text-white pt-20 pb-12 border-t-2 border-[#C5A45D]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="bg-white p-1.5 shadow-sm border border-[#C5A45D]/40">
                <img
                  src="/assets/aistudio/image_d32710d1.png"
                  alt="Padmasena PS Convention Center Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="block text-sm font-bold tracking-[0.15em] text-white uppercase">PS Convention Center</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A45D]">Palur Village &bull; Tamil Nadu</span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Palur's premier luxury destination for royal weddings, grand receptions, and executive conclaves.
            </p>
            <div className="pt-2 text-xs text-[#C5A45D] italic">
              "{VENUE_INFO.tagline}"
            </div>
            {/* Social Icons */}
            <div className="pt-3 flex items-center gap-3">
              <a
                href="#social"
                className="w-8 h-8 border border-[#C5A45D]/40 text-[#C5A45D] flex items-center justify-center hover:bg-[#C5A45D] hover:text-[#0f251c] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-8 h-8 border border-[#C5A45D]/40 text-[#C5A45D] flex items-center justify-center hover:bg-[#C5A45D] hover:text-[#0f251c] transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-8 h-8 border border-[#C5A45D]/40 text-[#C5A45D] flex items-center justify-center hover:bg-[#C5A45D] hover:text-[#0f251c] transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A45D] mb-5">Quick Links</h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('/', '')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/', 'about')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> About Venue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/', 'facilities')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> Facilities & Capacity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/', 'events')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> Events & Occasions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/', 'services')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/', 'gallery')}
                  className="hover:text-[#C5A45D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#C5A45D]" /> Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Specifications */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A45D] mb-5">Venue Highlights</h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A45D] shrink-0" />
                <span>600 Seated &bull; 1,000 Floating Main Hall</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A45D] shrink-0" />
                <span>300 Seated &bull; 500 Floating Dining Hall</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A45D] shrink-0" />
                <span>6 Guest Rooms with Elevator</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A45D] shrink-0" />
                <span>First-Floor Open Terrace</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A45D] shrink-0" />
                <span>Ganesha Temple & Courtyard</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C5A45D] shrink-0" />
                <span>30 Cars Parking & 100% DG Backup</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A45D] mb-5">Contact</h4>
            <div className="space-y-3.5 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A45D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Palur Village, Tamil Nadu</p>
                  <p className="text-[#C5A45D] text-[11px]">12 km from Chengalpattu</p>
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
                <Mail className="w-4 h-4 text-[#C5A45D]" />
                <p>{VENUE_INFO.contact.email}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A45D]" />
                <p>{VENUE_INFO.contact.hours}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/booking')}
                  className="w-full py-3 bg-[#C5A45D] text-[#0f251c] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#d8bc7a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>CHECK AVAILABILITY</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} PS Convention Center. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <span>Palur Village, Chengalpattu Dt.</span>
            <span>&bull;</span>
            <span>Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
