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
  onExploreVenue,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetVideoTimeRef = useRef<number>(0.05);
  const [showEndButtons, setShowEndButtons] = useState(false);

  // High-frequency smooth RAF frame scrubber synced directly to the 10-second video timeline
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
        if (Math.abs(diff) > 0.006) {
          video.currentTime += diff * 0.26;
        }
      }
      rafId = requestAnimationFrame(syncVideoFrame);
    };

    rafId = requestAnimationFrame(syncVideoFrame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Subtle interactive pointer parallax that blends naturally with the 3D scroll perspective
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl || typeof window === 'undefined') return;

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    const xTo = gsap.quickTo('.hero-3d-parallax-wrap', 'rotateY', {
      duration: 0.9,
      ease: 'power3.out',
    });
    const yTo = gsap.quickTo('.hero-3d-parallax-wrap', 'rotateX', {
      duration: 0.9,
      ease: 'power3.out',
    });
    const frameXTo = gsap.quickTo('.hero-3d-depth-frame', 'x', {
      duration: 0.9,
      ease: 'power3.out',
    });
    const frameYTo = gsap.quickTo('.hero-3d-depth-frame', 'y', {
      duration: 0.9,
      ease: 'power3.out',
    });

    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      xTo(nx * 1.65);
      yTo(-ny * 1.35);
      frameXTo(-nx * 10);
      frameYTo(-ny * 8);
    };

    const handlePointerLeave = () => {
      xTo(0);
      yTo(0);
      frameXTo(0);
      frameYTo(0);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
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

  // Synchronized 10-second 3D Scroll Timeline + 00:08–00:10 Final Buttons Reveal
  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
        (context) => {
          const isDesktop = Boolean(context.conditions?.isDesktop);
          const scrollEndDistance = isDesktop ? '+=3800' : '+=2600';

          // Initial 3D state for the video plane, depth frame, lighting sweep, and 00:08-00:10 buttons
          gsap.set('.hero-3d-camera', {
            scale: isDesktop ? 1.04 : 1.02,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            z: 0,
            yPercent: 0,
            transformOrigin: '50% 50%',
            force3D: true,
          });

          gsap.set('.hero-3d-depth-frame', {
            scale: 1.015,
            rotateX: 0,
            rotateY: 0,
            z: isDesktop ? 45 : 22,
            opacity: 0.35,
            force3D: true,
          });

          gsap.set('.hero-3d-light-sheen', {
            xPercent: -35,
            opacity: 0.14,
          });

          gsap.set('.hero-actions-bar', {
            opacity: 0,
            y: 44,
            z: isDesktop ? 70 : 30,
            rotateX: -16,
            scale: 0.95,
            transformOrigin: '50% 100%',
            force3D: true,
          });

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top top',
              end: scrollEndDistance,
              pin: true,
              scrub: 0.65,
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
              },
            },
          });

          // Phase 1 (00:00 -> 00:03.5): Smooth 3D dolly-in & gentle upward tilt
          tl.to(
            '.hero-3d-camera',
            {
              scale: isDesktop ? 1.09 : 1.055,
              rotateX: isDesktop ? 2.4 : 1.2,
              rotateY: isDesktop ? -1.8 : -0.7,
              rotateZ: isDesktop ? -0.35 : 0,
              z: isDesktop ? 48 : 20,
              yPercent: isDesktop ? -1.4 : -0.8,
              duration: 3.5,
              ease: 'power1.inOut',
            },
            0
          )
            // Phase 2 (00:03.5 -> 00:07.5): Sweeping lateral 3D perspective glide & parallax shift
            .to(
              '.hero-3d-camera',
              {
                scale: isDesktop ? 1.11 : 1.065,
                rotateX: isDesktop ? -1.6 : -0.8,
                rotateY: isDesktop ? 2.1 : 0.8,
                rotateZ: isDesktop ? 0.35 : 0,
                z: isDesktop ? 64 : 26,
                yPercent: isDesktop ? 1.2 : 0.6,
                duration: 4.0,
                ease: 'sine.inOut',
              },
              3.5
            )
            // Phase 3 (00:07.5 -> 00:10.0): Majestic 3D settle as buttons elevate into foreground focus
            .to(
              '.hero-3d-camera',
              {
                scale: isDesktop ? 1.03 : 1.015,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                z: 0,
                yPercent: 0,
                duration: 2.5,
                ease: 'power2.out',
              },
              7.5
            );

          // Synchronized counter-parallax on the 3D spatial depth frame across the 10-second timeline
          tl.to(
            '.hero-3d-depth-frame',
            {
              scale: 0.985,
              rotateX: isDesktop ? -1.6 : -0.6,
              rotateY: isDesktop ? 1.4 : 0.5,
              z: isDesktop ? 75 : 32,
              opacity: 0.65,
              duration: 5.0,
              ease: 'sine.inOut',
            },
            0
          ).to(
            '.hero-3d-depth-frame',
            {
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              z: isDesktop ? 40 : 18,
              opacity: 0.45,
              duration: 5.0,
              ease: 'power2.out',
            },
            5.0
          );

          // Subtle ambient golden light sweep across the 3D stage (00:00 -> 00:10)
          tl.to(
            '.hero-3d-light-sheen',
            {
              xPercent: 35,
              opacity: 0.24,
              duration: 6.5,
              ease: 'sine.inOut',
            },
            0
          ).to(
            '.hero-3d-light-sheen',
            {
              xPercent: 5,
              opacity: 0.12,
              duration: 3.5,
              ease: 'power2.out',
            },
            6.5
          );

          // 00:08 to 00:10 sec -> Reveal EXPLORE and BOOK YOUR EVENT buttons with 3D elevation
          tl.to(
            '.hero-actions-bar',
            {
              opacity: 1,
              y: 0,
              z: isDesktop ? 90 : 36,
              rotateX: 0,
              scale: 1,
              duration: 1.15,
              ease: 'power3.out',
            },
            7.85
          ).to(
            '.hero-actions-bar',
            {
              opacity: 1,
              y: 0,
              z: isDesktop ? 90 : 36,
              rotateX: 0,
              scale: 1,
              duration: 1.0,
            },
            9.0
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
      id="hero-section"
      ref={triggerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[#07150e] text-white select-none"
      style={{ perspective: '1400px' }}
    >
      {/* 3D Spatial Parallax Stage */}
      <div
        ref={stageRef}
        className="hero-3d-parallax-wrap relative w-full h-full will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 3D Interactive Camera Background Plane with Smooth Scroll-Scrubbed 10s Video */}
        <div
          className="hero-3d-camera absolute inset-0 z-0 will-change-transform"
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
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

          {/* Subtle ambient depth vignette */}
          <div
            aria-hidden="true"
            className="hero-3d-light-sheen pointer-events-none absolute -inset-1/4 bg-[radial-gradient(circle_at_50%_40%,rgba(197,164,93,0.14),transparent_60%)] will-change-transform"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_62%,rgba(0,0,0,0.42)_100%)]"
          />
        </div>

        {/* Subtle 3D Counter-Parallax Plane */}
        <div
          aria-hidden="true"
          className="hero-3d-depth-frame pointer-events-none absolute inset-0 z-10 will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        />

        {/* Foreground 3D Action Layer — Buttons Revealed Strictly at 00:08 to 00:10 Sec */}
        <div
          className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end items-center pb-12 sm:pb-16 md:pb-20 pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
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
              className="w-full sm:w-auto min-w-[215px] px-9 py-4 bg-[#C5A45D] text-[#07150e] font-bold text-xs sm:text-sm tracking-[0.22em] uppercase hover:bg-[#d8bc7a] transition-all duration-300 shadow-[0_14px_38px_rgba(0,0,0,0.55)] flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>EXPLORE</span>
              <ChevronRight className="w-4 h-4 text-[#07150e] shrink-0" />
            </button>

            <button
              type="button"
              tabIndex={showEndButtons ? 0 : -1}
              onClick={onCheckAvailability}
              className="w-full sm:w-auto min-w-[215px] px-9 py-4 bg-[#07150e]/75 backdrop-blur-md border border-[#C5A45D] text-white font-bold text-xs sm:text-sm tracking-[0.22em] uppercase hover:bg-[#C5A45D] hover:text-[#07150e] transition-all duration-300 shadow-[0_14px_38px_rgba(0,0,0,0.55)] flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>BOOK YOUR EVENT</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
