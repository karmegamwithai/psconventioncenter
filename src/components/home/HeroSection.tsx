import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onCheckAvailability?: () => void;
  onExploreVenue: () => void;
  onExplore3DTour?: () => void;
}

const HERO_VIDEO_SRC =
  '/assets/aistudio/padmasena_convention_center_Cinematic_video_ad8de83f.mp4';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCheckAvailability,
  onExploreVenue
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetVideoTimeRef = useRef<number>(0.05);
  const [showEndButtons, setShowEndButtons] = useState(false);

  // High-frequency smooth RAF frame scrubber synced directly to the video timeline
  useEffect(() => {
    let rafId = 0;

    const syncVideoFrame = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2 && video.duration && !Number.isNaN(video.duration)) {
        const clampedTarget = Math.min(
          Math.max(targetVideoTimeRef.current, 0.01),
          video.duration - 0.02
        );
        const diff = clampedTarget - video.currentTime;
        if (Math.abs(diff) > 0.008) {
          video.currentTime += diff * 0.28;
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

  // GSAP ScrollTrigger Smooth Interactive Video Scroll + 00:08–00:10 Final Buttons Reveal
  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)'
        },
        (context) => {
          const isDesktop = Boolean(context.conditions?.isDesktop);
          const scrollEndDistance = isDesktop ? '+=3800' : '+=2800';

          // Keep buttons hidden until video reaches 00:08
          gsap.set('.hero-actions-bar', {
            opacity: 0,
            y: 50,
            scale: 0.96
          });

          const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top top',
              end: scrollEndDistance,
              pin: true,
              scrub: 0.75,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;
                const video = videoRef.current;
                const duration =
                  video && video.duration && !Number.isNaN(video.duration)
                    ? video.duration
                    : 10;

                const targetTime = Math.max(0.05, p * duration);
                targetVideoTimeRef.current = targetTime;

                // Enable button interactivity strictly during the 00:08 to 00:10 window
                const isAtEndSegment = targetTime >= 7.8 || p >= 0.78;
                setShowEndButtons(isAtEndSegment);
              }
            }
          });

          // Smooth 3D interactive camera depth across the 10-second timeline (0 -> 10)
          tl.to(
            '.hero-3d-camera',
            {
              scale: isDesktop ? 1.07 : 1.04,
              rotateX: isDesktop ? 2.0 : 0.8,
              rotateY: isDesktop ? -1.6 : 0,
              z: isDesktop ? 42 : 16,
              duration: 5,
              ease: 'none'
            },
            0
          ).to(
            '.hero-3d-camera',
            {
              scale: 1.01,
              rotateX: isDesktop ? -1.0 : 0,
              rotateY: isDesktop ? 1.0 : 0,
              z: 8,
              duration: 5,
              ease: 'none'
            },
            5
          );

          // 00:08 to 00:10 sec -> Reveal EXPLORE and BOOK YOUR EVENT buttons at the end
          tl.to(
            '.hero-actions-bar',
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: 'power3.out'
            },
            7.85
          ).to(
            '.hero-actions-bar',
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.05
            },
            8.95
          );
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
      {/* 3D Interactive Camera Background Stage with Smooth Scroll-Scrubbed Video */}
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
      </div>

      {/* Foreground Action Layer — Buttons Placed Only at 00:08 to 00:10 Sec */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end items-center pb-12 sm:pb-16 md:pb-20 pointer-events-none">
        <div
          aria-hidden={!showEndButtons}
          className={`hero-actions-bar will-change-transform flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none ${
            showEndButtons ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <button
            type="button"
            tabIndex={showEndButtons ? 0 : -1}
            onClick={onExploreVenue}
            className="w-full sm:w-auto min-w-[215px] px-9 py-4 bg-[#C5A45D] text-[#07150e] font-bold text-xs sm:text-sm tracking-[0.22em] uppercase hover:bg-[#d8bc7a] transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>EXPLORE</span>
            <ChevronRight className="w-4 h-4 text-[#07150e] shrink-0" />
          </button>

          <button
            type="button"
            tabIndex={showEndButtons ? 0 : -1}
            onClick={onCheckAvailability}
            className="w-full sm:w-auto min-w-[215px] px-9 py-4 bg-[#07150e]/75 backdrop-blur-md border border-[#C5A45D] text-white font-bold text-xs sm:text-sm tracking-[0.22em] uppercase hover:bg-[#C5A45D] hover:text-[#07150e] transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>BOOK YOUR EVENT</span>
          </button>
        </div>
      </div>
    </section>
  );
};

