import React, { useEffect, useRef } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

interface HeroSectionProps {
  onCheckAvailability: () => void;
  onExploreVenue: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability, onExploreVenue }) => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  // GSAP Text Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background image subtle zoom-in entrance
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.05, opacity: 0.85 },
          { scale: 1, opacity: 1, duration: 2.2, ease: 'power2.out' }
        );
      }

      // Animate headline lines with blur-to-focus and slide
      gsap.fromTo(
        '.hero-line-1',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-line-2',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, delay: 0.45, ease: 'power3.out' }
      );

      // Animate CTA buttons
      gsap.fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.75, stagger: 0.15, ease: 'power2.out' }
      );
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#07150e] text-white"
    >
      {/* Background cinematic photography - Grandly Visible */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=95"
          alt="PS Convention Center Grand Regal Ballroom"
          className="w-full h-full object-cover object-center"
        />
        
        {/* Soft luxury gradient: Weighted toward bottom-left for crisp text while chandeliers shine bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent" />
      </div>

      {/* Main Hero Content - Bottom Left Corner Style */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20 pt-28 w-full text-left flex flex-col items-start"
      >
        
        {/* Headline with Italic Styling & GSAP Text Entrance */}
        <h1 className="text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl text-left drop-shadow-2xl">
          <span className="hero-line-1 block font-normal">
            Where Grandeur Meets
          </span>
          <span className="hero-line-2 text-[#C5A45D] italic font-semibold block mt-1">
            Celebration.
          </span>
        </h1>

        {/* Dual Actions - Bottom Left Aligned with GSAP Stagger */}
        <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={onCheckAvailability}
            className="hero-cta-btn w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 bg-[#C5A45D] text-[#07150e] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-[#d8bc7a] transition-all duration-300 shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#07150e] shrink-0" />
            <span>BOOK YOUR EVENT</span>
          </button>

          <button
            onClick={onExploreVenue}
            className="hero-cta-btn w-full sm:w-auto px-8 sm:px-11 py-4 sm:py-4.5 bg-black/40 hover:bg-black/60 border border-white/70 hover:border-[#C5A45D] text-white hover:text-[#C5A45D] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>EXPLORE VENUE</span>
            <ChevronRight className="w-4 h-4 text-[#C5A45D]" />
          </button>
        </div>

      </div>
    </section>
  );
};
