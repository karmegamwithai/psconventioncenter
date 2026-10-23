import React from 'react';
import { Users, Utensils, Wind, Car, Zap, Shield, Sparkles, Building2 } from 'lucide-react';

export const VenueHighlights: React.FC = () => {
  const highlights = [
    {
      icon: <Users className="w-5 h-5 text-[#C5A45D]" />,
      value: '1,000+',
      label: 'Main Hall Capacity',
    },
    {
      icon: <Utensils className="w-5 h-5 text-[#C5A45D]" />,
      value: '500+',
      label: 'Dining Capacity',
    },
    {
      icon: <Wind className="w-5 h-5 text-[#C5A45D]" />,
      value: '100%',
      label: 'Centralized AC',
    },
    {
      icon: <Car className="w-5 h-5 text-[#C5A45D]" />,
      value: '150+',
      label: 'Valet Parking',
    },
  ];

  const features = [
    { icon: <Zap className="w-4 h-4 text-[#C5A45D]" />, text: '100% DG Power Backup' },
    { icon: <Building2 className="w-4 h-4 text-[#C5A45D]" />, text: 'VIP Elevator Access' },
    { icon: <Shield className="w-4 h-4 text-[#C5A45D]" />, text: '24/7 Monitored Security' },
    { icon: <Sparkles className="w-4 h-4 text-[#C5A45D]" />, text: 'Auspicious Ganesha Temple' },
  ];

  return (
    <section className="bg-[#234D3C] dark:bg-[#05140d] text-white py-12 sm:py-16 border-y border-[#C5A45D]/30 dark:border-[#C5A45D]/40 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple & Premium 4-Metric Grid (Low Context) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-10 border-b border-white/10">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-12 h-12 bg-black/25 border border-[#C5A45D]/40 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  {item.value}
                </span>
                <span className="block text-[10px] sm:text-xs text-gray-300 uppercase tracking-widest font-medium mt-0.5">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Refined Feature Line */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs text-gray-200">
          {features.map((feat, i) => (
            <div key={i} className="flex items-center gap-2.5">
              {feat.icon}
              <span className="font-light tracking-wide">{feat.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
