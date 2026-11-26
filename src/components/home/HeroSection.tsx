import React, { useEffect, useRef } from 'react';
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

  // Smooth RAF frame scrubber synced directly to the uploaded video timeline
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

  // GSAP ScrollTrigger 3D Interactive Scroll & Button Entrance
  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-actions-bar',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)'
        },
        (context) => {
          const isDesktop = Boolean(context.conditions?.isDesktop);
          const scrollEndDistance = isDesktop ? '+=4200' : '+=3000';

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
      {/* 3D Interactive Camera Background Stage with Unobstructed Full-Visibility Video */}
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

      {/* Foreground Action Layer — Only the Two Requested Buttons */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end items-center pb-12 sm:pb-16 md:pb-20 pointer-events-none">
        <div className="hero-actions-bar pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none">
          <button
            type="button"
            onClick={onExploreVenue}
            className="w-full sm:w-auto min-w-[210px] px-9 py-4 bg-[#C5A45D] text-[#07150e] font-bold text-xs sm:text-sm tracking-[0.22em] uppercase hover:bg-[#d8bc7a] transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>EXPLORE</span>
            <ChevronRight className="w-4 h-4 text-[#07150e] shrink-0" />
          </button>

          <button
            type="button"
            onClick={onCheckAvailability}
            className="w-full sm:w-auto min-w-[210px] px-9 py-4 bg-[#07150e]/75 backdrop-blur-md border border-[#C5A45D] text-white font-bold text-xs sm:text-sm tracking-[0.22em] uppercase hover:bg-[#C5A45D] hover:text-[#07150e] transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>BOOK YOUR EVENT</span>
          </button>
        </div>
      </div>
    </section>
  );
};

