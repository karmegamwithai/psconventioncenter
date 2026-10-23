import React, { useEffect, useRef } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

interface HeroSectionProps {
  onCheckAvailability: () => void;
  onExploreVenue: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability, onExploreVenue }) => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  // GSAP Text Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background image subtle zoom-in entrance
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.08, opacity: 0.8 },
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

  // Cursor-driven perspective tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroSectionRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalized offset from center (-1 to 1)
    const normX = (clientX / innerWidth - 0.5) * 2;
    const normY = (clientY / innerHeight - 0.5) * 2;

    // Perspective tilt on text container
    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        x: normX * 18,
        y: normY * 14,
        rotateY: normX * 4,
        rotateX: -normY * 4,
        transformPerspective: 1200,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Subtle counter-parallax on background image for grand 3D depth
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        x: -normX * 12,
        y: -normY * 10,
        scale: 1.03,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  return (
    <section
      ref={heroSectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#07150e] text-white"
    >
      {/* Background cinematic photography - Grandly Visible with 3D Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2400&q=95"
          alt="PS Convention Center Grand Regal Ballroom"
          className="w-full h-full object-cover object-center will-change-transform"
        />
        
        {/* Soft luxury gradient: Weighted toward bottom-left for crisp text while chandeliers shine bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent" />
      </div>

      {/* Main Hero Content - Bottom Left Corner Style with GSAP Perspective */}
      <div
        ref={textContainerRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20 pt-28 w-full text-left flex flex-col items-start will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
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
