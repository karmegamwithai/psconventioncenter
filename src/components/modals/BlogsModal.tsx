import React from 'react';
import { X, Calendar, Sparkles, BookOpen, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckDates: () => void;
}

export const BlogsModal: React.FC<BlogsModalProps> = ({ isOpen, onClose, onCheckDates }) => {
  if (!isOpen) return null;

  const articles = [
    {
      title: 'Auspicious Tamil Muhurtham Dates for 2026–2027 (Valarpirai Guide)',
      category: 'Muhurtham Guide',
      date: 'Updated Oct 2026',
      readTime: '4 min read',
      summary: 'A curated astrological compilation of prime Shubha Muhurtham dates in the Tamil calendar (Chithirai through Panguni) recommended for grand weddings at PS Convention Center.',
      highlights: ['Nov 12, 18, 26, 2026 (Karthigai Muhurtham)', 'Dec 06, 14, 2026 (Margazhi Shubha Lagna)', 'Jan & Feb 2027 (Thai & Maasi Prime Dates)']
    },
    {
      title: 'Mandap & Floral Stage Decor Trends for South Indian Weddings',
      category: 'Decor & Design',
      date: 'Sept 2026',
      readTime: '3 min read',
      summary: 'Explore trending temple-inspired floral Mandaps, jasmine flower chandeliers, brass urlis with floating candles, and seamless LED backdrop configurations suited for our 22-foot high ceiling hall.',
      highlights: ['Tuberose & Lotus Floral Canopies', 'Warm Tungsten + Chandelier Ambience', 'Ergonomic Seating with Pillar-Free Sightlines']
    },
    {
      title: 'Catering Guide: Traditional Banana Leaf Feasts vs. Contemporary Buffets',
      category: 'Culinary & Dining',
      date: 'Aug 2026',
      readTime: '5 min read',
      summary: 'How our separate 300-seat centralized AC dining hall and dual indoor/outdoor kitchens cater to both traditional pure vegetarian Vratham feasts and modern celebratory non-vegetarian dinners.',
      highlights: ['Dedicated hygienic indoor vegetarian kitchen', 'Separate outdoor non-veg preparation block', 'Direct food service corridors without hall traffic']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-[#0c1f17] text-[#1c1917] dark:text-[#f4f1ea] w-full max-w-3xl max-h-[92dvh] rounded-sm shadow-2xl border border-[#C5A45D]/40 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#234D3C] dark:bg-[#081710] text-white p-4 sm:p-6 flex items-center justify-between border-b border-[#C5A45D]/30">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-[#E8F2E8] dark:bg-[#122e22] text-[#234D3C] dark:text-[#C5A45D] flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#C5A45D] block font-['Cinzel',serif]">
                PS CONVENTION CENTER JOURNAL
              </span>
              <h3 className="text-base sm:text-xl font-bold font-['Bodoni_Moda',serif]">Muhurtham Dates & Venue Insights</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 bg-[#FAF8F2] dark:bg-[#08150f]">
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            Welcome to the PS Convention Center updates portal. Auspicious Muhurtham calendars, interior stage setups, and culinary guidelines to help families plan celebrations in Palur.
          </p>

          <div className="space-y-3 sm:space-y-4">
            {articles.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#0e241b] p-4 sm:p-5 rounded-sm border border-gray-200 dark:border-[#C5A45D]/20 shadow-sm hover:border-[#C5A45D] transition-colors space-y-2.5 sm:space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 gap-1">
                  <span className="flex items-center gap-1 font-semibold text-[#C5A45D] uppercase tracking-wider font-['Cinzel',serif]">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.readTime}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-[#234D3C] dark:text-[#d3e5dc] font-['Bodoni_Moda',serif]">
                  {item.title}
                </h4>

                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.summary}
                </p>

                <div className="bg-[#E8F2E8]/60 dark:bg-[#122e22]/50 p-2.5 sm:p-3 rounded text-[11px] text-[#234D3C] dark:text-[#d4e4db] space-y-1 border border-[#C5A45D]/15">
                  <span className="font-bold uppercase tracking-wider text-[9px] sm:text-[10px] text-[#C5A45D] block font-['Cinzel',serif]">
                    Featured Highlights:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-gray-800 dark:text-gray-200">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-white dark:bg-[#0a1b13] border-t border-gray-200 dark:border-[#C5A45D]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
            Ready to inspect the venue for an upcoming Muhurtham date?
          </span>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 dark:border-gray-700 rounded text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer text-center font-['Cinzel',serif]"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onCheckDates();
              }}
              className="flex-1 sm:flex-initial px-4 sm:px-5 py-2 bg-[#234D3C] dark:bg-[#C5A45D] text-white dark:text-[#0e241b] rounded text-xs uppercase font-bold tracking-wider hover:bg-[#17372a] dark:hover:bg-[#d4b56c] transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer text-center font-['Cinzel',serif]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A45D] dark:text-[#0e241b] shrink-0" />
              <span>Check Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
