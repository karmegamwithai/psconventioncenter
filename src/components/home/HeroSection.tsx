import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onCheckAvailability: () => void;
  onExploreVenue: () => void;
  onExplore3DTour?: () => void;
}

interface StoryChapter {
  id: string;
  eyebrow: string;
  headlineTop: string;
  headlineAccent: string;
  subtitle: string;
  isFinalCta?: boolean;
  isWelcome?: boolean;
}

const HERO_VIDEO_SRC =
  '/assets/aistudio/padmasena_convention_center_Cinematic_video_ad8de83f.mp4';

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'welcome',
    eyebrow: 'WELCOME',
    headlineTop: 'Welcome to Padmasena',
    headlineAccent: 'Convention Center.',
    subtitle:
      'An iconic destination of refined South Indian hospitality, stately architecture, and timeless elegance in Palur Village.',
    isWelcome: true
  },
  {
    id: 'celebrations',
    eyebrow: 'MEMORABLE CELEBRATIONS',
    headlineTop: 'Unforgettable Moments.',
    headlineAccent: 'Exceptional Experiences.',
    subtitle:
      'Every sacred wedding, joyful reception, family milestone, and executive summit is orchestrated with warmth, grandeur, and enduring memories.'
  },
  {
    id: 'convention-halls',
    eyebrow: 'CONVENTION HALLS',
    headlineTop: 'Expansive Halls Crafted',
    headlineAccent: 'for Grand Celebrations.',
    subtitle:
      'Discover generous pillarless spaces, centralized HVAC comfort, refined acoustics, and seamless hospitality designed for gatherings of every scale.'
  },
  {
    id: 'premium-hall',
    eyebrow: 'THE PREMIUM HALL',
    headlineTop: 'The Premium Hall.',
    headlineAccent: 'Unrivaled Royal Luxury.',
    subtitle:
      'Soaring coffered ceilings, luminous crystal chandeliers, HD LED stage displays, private VIP elevator access, and bridal suites for prestigious occasions.'
  },
  {
    id: 'lawn',
    eyebrow: 'THE GRAND LAWN',
    headlineTop: 'Under Starlit Skies.',
    headlineAccent: 'Beautiful Outdoor Events.',
    subtitle:
      'Manicured open-air greenery illuminated with warm golden lights and graced by our traditional Ganesha shrine for enchanting evening celebrations.'
  },
  {
    id: 'explore',
    eyebrow: 'DISCOVER THE VENUE',
    headlineTop: 'Experience Every Space',
    headlineAccent: 'at Padmasena.',
    subtitle:
      'Explore our three distinct convention halls, landscaped lawn, luxury guest rooms, dining wing, open terrace, and dedicated venue facilities.',
    isFinalCta: true
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCheckAvailability,
  onExploreVenue,
  onExplore3DTour
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetVideoTimeRef = useRef<number>(0.05);

  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  // Smooth RAF frame scrubber synced directly to the uploaded video timeline
  useEffect(() => {
    let rafId = 0;

    const syncVideoFrame = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2 && video.duration && !Number.isNaN(video.duration)) {
        const clampedTarget = Math.min(Math.max(targetVideoTimeRef.current, 0.01), video.duration - 0.02);
        const diff = clampedTarget - video.currentTime;
        if (Math.abs(diff) > 0.012) {
          video.currentTime += diff * 0.24;
        }
      }
      rafId = requestAnimationFrame(syncVideoFrame);
    };

    rafId = requestAnimationFrame(syncVideoFrame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Ensure first video frame renders crisply on initial mount
  const handleVideoLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.pause();
      video.currentTime = 0.05;
    } catch {
      // safe fallback
    }
  };

  // GSAP ScrollTrigger 3D Interactive Scroll + Pure Down-to-Up Text Animations
  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Initial smooth down-to-up entrance for the opening welcome copy
      gsap.fromTo(
        '.hero-welcome-inner',
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1.05, ease: 'power3.out' }
      );

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)'
        },
        (context) => {
          const isDesktop = Boolean(context.conditions?.isDesktop);
          const scrollEndDistance = isDesktop ? '+=4200' : '+=3000';

          // Opening chapter (00:01) starts centered & visible
          gsap.set('.hero-chapter-0', {
            opacity: 1,
            y: 0,
            z: 0
          });

          // Subsequent chapters start below viewport offset (pure down-to-up entrance)
          for (let i = 1; i < STORY_CHAPTERS.length; i++) {
            gsap.set(`.hero-chapter-${i}`, {
              opacity: 0,
              y: 95,
              z: -60
            });
          }

          const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top top',
              end: scrollEndDistance,
              pin: true,
              scrub: 1.05,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;

                // Keep active chapter synchronized with 00:01 -> 00:10 video timestamps
                let idx = 0;
                if (p < 0.17) idx = 0; // 00:01
                else if (p < 0.37) idx = 1; // 00:02–00:03
                else if (p < 0.57) idx = 2; // 00:04–00:05
                else if (p < 0.76) idx = 3; // 00:06–00:07
                else if (p < 0.91) idx = 4; // 00:08–00:09
                else idx = 5; // 00:10
                setActiveChapterIdx(idx);

                // Synchronize uploaded video playback position to scroll progress
                const video = videoRef.current;
                if (video && video.duration && !Number.isNaN(video.duration)) {
                  targetVideoTimeRef.current = Math.max(0.05, p * video.duration);
                }
              }
            }
          });

          // Subtle 3D interactive camera depth on the cinematic video stage
          tl.to(
            '.hero-3d-camera',
            {
              scale: isDesktop ? 1.08 : 1.05,
              rotateX: isDesktop ? 2.5 : 1,
              rotateY: isDesktop ? -2.0 : 0,
              z: isDesktop ? 50 : 20,
              duration: 5,
              ease: 'none'
            },
            0
          ).to(
            '.hero-3d-camera',
            {
              scale: 1.02,
              rotateX: isDesktop ? -1.5 : 0,
              rotateY: isDesktop ? 1.5 : 0,
              z: 10,
              duration: 5,
              ease: 'none'
            },
            5
          );

          // 00:01 -> Welcome exits smoothly upward
          tl.to(
            '.hero-chapter-0',
            {
              opacity: 0,
              y: -90,
              z: 40,
              duration: 0.65,
              ease: 'power2.in'
            },
            1.35
          );

          // 00:02–00:03 -> Enters down-to-up, exits upward
          tl.to(
            '.hero-chapter-1',
            {
              opacity: 1,
              y: 0,
              z: 0,
              duration: 0.75,
              ease: 'power3.out'
            },
            1.8
          ).to(
            '.hero-chapter-1',
            {
              opacity: 0,
              y: -90,
              z: 40,
              duration: 0.65,
              ease: 'power2.in'
            },
            3.35
          );

          // 00:04–00:05 -> Convention Halls enters down-to-up, exits upward
          tl.to(
            '.hero-chapter-2',
            {
              opacity: 1,
              y: 0,
              z: 0,
              duration: 0.75,
              ease: 'power3.out'
            },
            3.8
          ).to(
            '.hero-chapter-2',
            {
              opacity: 0,
              y: -90,
              z: 40,
              duration: 0.65,
              ease: 'power2.in'
            },
            5.35
          );

          // 00:06–00:07 -> Premium Hall enters down-to-up, exits upward
          tl.to(
            '.hero-chapter-3',
            {
              opacity: 1,
              y: 0,
              z: 0,
              duration: 0.75,
              ease: 'power3.out'
            },
            5.8
          ).to(
            '.hero-chapter-3',
            {
              opacity: 0,
              y: -90,
              z: 40,
              duration: 0.65,
              ease: 'power2.in'
            },
            7.35
          );

          // 00:08–00:09 -> Lawn enters down-to-up, exits upward
          tl.to(
            '.hero-chapter-4',
            {
              opacity: 1,
              y: 0,
              z: 0,
              duration: 0.7,
              ease: 'power3.out'
            },
            7.8
          ).to(
            '.hero-chapter-4',
            {
              opacity: 0,
              y: -90,
              z: 40,
              duration: 0.55,
              ease: 'power2.in'
            },
            8.9
          );

          // 00:10 -> Explore CTA enters down-to-up and holds smoothly before unpinning
          tl.to(
            '.hero-chapter-5',
            {
              opacity: 1,
              y: 0,
              z: 0,
              duration: 0.7,
              ease: 'power3.out'
            },
            9.15
          ).to('.hero-chapter-5', { opacity: 1, duration: 0.55 }, 9.85);
        }
      );
    }, triggerRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={triggerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[#07150e] text-white"
      style={{ perspective: '1400px' }}
    >
      {/* 3D Interactive Camera Background Stage with Uploaded Cinematic Video */}
      <div
        className="hero-3d-camera absolute inset-0 z-0 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <video
          ref={videoRef}
          src={`${HERO_VIDEO_SRC}#t=0.05`}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleVideoLoadedMetadata}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Editorial Contrast Gradients so Typography Remains Razor-Sharp Over Video */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#05110b]/90 via-black/35 to-black/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#05110b]/80 via-black/30 to-transparent" />
      </div>

      {/* Foreground Content Layer */}
      <div
        className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-between pt-24 sm:pt-28 pb-16 sm:pb-12"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {/* Top Row: 3D Virtual Tour Trigger Only (No Timeline Bar/Clock) */}
        <div className="flex items-center justify-start">
          <button
            onClick={onExplore3DTour || onExploreVenue}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/45 hover:bg-black/70 border border-[#C5A45D]/60 hover:border-[#C5A45D] text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] backdrop-blur-md transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#C5A45D] animate-ping" />
            <span className="text-[#C5A45D]">3D VIRTUAL TOUR AVAILABLE</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C5A45D]" />
          </button>
        </div>

        {/* Synchronized Down-to-Up Animated Storytelling Text Chapters */}
        <div
          className="relative flex-1 flex items-center my-4"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {STORY_CHAPTERS.map((chapter, idx) => {
            const isActive = activeChapterIdx === idx;
            return (
              <div
                key={chapter.id}
                className={`hero-chapter-${idx} absolute inset-x-0 max-w-4xl will-change-transform ${
                  isActive ? 'pointer-events-auto z-20' : 'pointer-events-none z-10'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`space-y-4 sm:space-y-5 ${chapter.isWelcome ? 'hero-welcome-inner' : ''}`}>
                  {/* Eyebrow */}
                  <div className="flex items-center gap-3">
                    <span className="w-8 sm:w-10 h-px bg-[#C5A45D]" />
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A45D]">
                      {chapter.eyebrow}
                    </span>
                  </div>

                  {/* Editorial Serif Headline */}
                  <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-2xl">
                    <span className="block font-normal">{chapter.headlineTop}</span>
                    <span className="block text-[#C5A45D] italic font-semibold mt-1">
                      {chapter.headlineAccent}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base md:text-lg text-gray-200/95 max-w-2xl leading-relaxed font-light drop-shadow">
                    {chapter.subtitle}
                  </p>

                  {/* Opening Actions */}
                  {chapter.isWelcome && (
                    <div className="pt-2 flex flex-wrap items-center gap-3.5">
                      <button
                        onClick={onCheckAvailability}
                        className="px-6 sm:px-8 py-3.5 bg-[#C5A45D] text-[#07150e] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#d8bc7a] transition-all shadow-2xl flex items-center gap-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-[#07150e]" />
                        <span>BOOK YOUR EVENT</span>
                      </button>
                      <button
                        onClick={onExploreVenue}
                        className="px-6 sm:px-8 py-3.5 bg-black/45 hover:bg-black/70 border border-white/60 hover:border-[#C5A45D] text-white hover:text-[#C5A45D] font-semibold text-xs tracking-[0.2em] uppercase transition-all backdrop-blur-sm flex items-center gap-2 cursor-pointer"
                      >
                        <span>EXPLORE FACILITIES</span>
                        <ChevronRight className="w-4 h-4 text-[#C5A45D]" />
                      </button>
                    </div>
                  )}

                  {/* Final Explore Call-To-Action */}
                  {chapter.isFinalCta && (
                    <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
                      <button
                        onClick={onExploreVenue}
                        className="w-full sm:w-auto px-8 sm:px-11 py-4 bg-[#C5A45D] text-[#07150e] font-bold text-xs sm:text-sm tracking-[0.22em] uppercase hover:bg-[#d8bc7a] transition-all duration-300 shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
                      >
                        <span>EXPLORE</span>
                        <ChevronRight className="w-4 h-4 text-[#07150e] shrink-0" />
                      </button>

                      <button
                        onClick={onCheckAvailability}
                        className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-black/45 hover:bg-black/70 border border-white/70 hover:border-[#C5A45D] text-white hover:text-[#C5A45D] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-[#C5A45D]" />
                        <span>BOOK YOUR EVENT</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Bottom Scroll Indicator (Timeline Bar & Timestamp Markers Removed) */}
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onExploreVenue}
            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-300 hover:text-[#C5A45D] transition-colors cursor-pointer"
          >
            <span>
              {activeChapterIdx === STORY_CHAPTERS.length - 1
                ? 'Explore Facilities'
                : 'Scroll to Experience'}
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C5A45D] animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
