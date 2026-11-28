import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onCheckAvailability?: () => void;
  onExploreVenue: () => void;
  onExplore3DTour?: () => void;
}

const HERO_VIDEO_SRC =
  '/assets/aistudio/padmasena_website_video___1__fb266d3d.mp4';

// 15-second virtual animation timeline mapped to the 10-second source video (0.6667x slow-motion)
const HERO_TIMELINE_DURATION = 15;
const SOURCE_FALLBACK_DURATION = 10;

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCheckAvailability,
  onExploreVenue,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoTransformRef = useRef<HTMLDivElement>(null);
  const actionsBarRef = useRef<HTMLDivElement>(null);

  // Target & smoothed positions on the 15-second virtual timeline (0.0s -> 15.0s)
  const targetTimelineRef = useRef<number>(0);
  const currentTimelineRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const lastSeekTimestampRef = useRef<number>(0);
  const [buttonsInteractive, setButtonsInteractive] = useState<boolean>(false);
  const buttonsInteractiveRef = useRef<boolean>(false);

  // Initialize first video frame & slow-motion default playback rate (10s -> 15s = 0.6667x)
  const handleVideoLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      const duration =
        video.duration && !Number.isNaN(video.duration)
          ? video.duration
          : SOURCE_FALLBACK_DURATION;
      const slowMotionRate = Number((duration / HERO_TIMELINE_DURATION).toFixed(4));
      video.defaultPlaybackRate = slowMotionRate;
      video.playbackRate = slowMotionRate;
      video.pause();
      video.currentTime = 0.02;
    } catch {
      // Safe fallback if media element is not ready to seek
    }
  };

  useEffect(() => {
    let rafId = 0;

    // Compute normalized scroll progress (0 -> 1) through the sticky hero container
    const updateScrollTarget = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollTravel = Math.max(1, section.offsetHeight - window.innerHeight);
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollTravel);
      const progress = scrolled / scrollTravel;

      targetTimelineRef.current = progress * HERO_TIMELINE_DURATION;
    };

    // High-frequency 60fps loop synchronizing the 15s timeline, slow-motion video, and end buttons
    const animateTimeline = (now: number) => {
      const prevTime = lastFrameTimeRef.current || now;
      const dtSeconds = Math.min(Math.max((now - prevTime) / 1000, 0.001), 0.1);
      lastFrameTimeRef.current = now;

      updateScrollTarget();

      // Frame-rate-independent exponential damping for silky-smooth bidirectional scroll response
      const smoothing = 1 - Math.exp(-dtSeconds * 7.0);
      const targetTimeline = targetTimelineRef.current;
      let currentTimeline =
        currentTimelineRef.current +
        (targetTimeline - currentTimelineRef.current) * smoothing;

      if (Math.abs(targetTimeline - currentTimeline) < 0.002) {
        currentTimeline = targetTimeline;
      }
      currentTimelineRef.current = currentTimeline;

      // Normalized progress along the 15-second timeline (0.0 -> 1.0)
      const timelineProgress = Math.min(
        Math.max(currentTimeline / HERO_TIMELINE_DURATION, 0),
        1
      );

      // 1. Synchronize Background Video using hybrid slow-motion playback + non-blocking guarded seek
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        const videoDuration =
          video.duration && !Number.isNaN(video.duration)
            ? video.duration
            : SOURCE_FALLBACK_DURATION;

        // 10s video stretched smoothly across 15s timeline (~0.6667x slow motion)
        const baseSlowMotionRate = videoDuration / HERO_TIMELINE_DURATION;
        const desiredVideoTime = Math.min(
          Math.max(currentTimeline * baseSlowMotionRate, 0.02),
          Math.max(0.05, videoDuration - 0.03)
        );

        const timeDiff = desiredVideoTime - video.currentTime;

        if (timeDiff > 0.014 && timeDiff <= 0.65) {
          // Forward scroll: use hardware-decoded slow-motion playback for zero frame drops or seek freezes
          const adaptiveRate = Math.min(
            1.85,
            Math.max(0.45, baseSlowMotionRate + timeDiff * 2.1)
          );
          if (Math.abs(video.playbackRate - adaptiveRate) > 0.03) {
            video.playbackRate = adaptiveRate;
          }
          if (video.paused && !video.ended) {
            video.play().catch(() => {
              // Fallback to guarded seek if play is prevented
              if (!video.seeking) {
                video.currentTime = desiredVideoTime;
              }
            });
          }
        } else if (Math.abs(timeDiff) <= 0.014) {
          // Reached target frame: rest smoothly on the current frame
          if (!video.paused) {
            video.pause();
          }
        } else {
          // Reverse scroll (scrolling up) or larger scroll jump: pause and step frames only when decoder is free
          if (!video.paused) {
            video.pause();
          }
          if (!video.seeking || now - lastSeekTimestampRef.current > 85) {
            try {
              video.currentTime = desiredVideoTime;
              lastSeekTimestampRef.current = now;
            } catch {
              // Ignore transient seek errors
            }
          }
        }
      }

      // 2. Subtle, natural scale transition on the background video (1.0 -> 1.025 over 15s, no artificial camera tilts)
      if (videoTransformRef.current) {
        const scale = 1 + timelineProgress * 0.025;
        videoTransformRef.current.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;
      }

      // 3. Gradual reveal of Explore & Book Event buttons at the end of the 15s timeline (11.25s -> 14.4s)
      const buttonRevealStart = 11.25;
      const buttonRevealEnd = 14.4;
      const rawButtonProgress =
        (currentTimeline - buttonRevealStart) /
        (buttonRevealEnd - buttonRevealStart);
      const clampedButtonProgress = Math.min(Math.max(rawButtonProgress, 0), 1);
      // Smooth cubic ease-out curve
      const easedButtonProgress = 1 - Math.pow(1 - clampedButtonProgress, 3);

      if (actionsBarRef.current) {
        const translateY = (1 - easedButtonProgress) * 24;
        actionsBarRef.current.style.opacity = easedButtonProgress.toFixed(3);
        actionsBarRef.current.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      }

      const shouldEnableButtons = easedButtonProgress > 0.25;
      if (shouldEnableButtons !== buttonsInteractiveRef.current) {
        buttonsInteractiveRef.current = shouldEnableButtons;
        setButtonsInteractive(shouldEnableButtons);
      }

      rafId = requestAnimationFrame(animateTimeline);
    };

    updateScrollTarget();
    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', updateScrollTarget, { passive: true });
    rafId = requestAnimationFrame(animateTimeline);

    return () => {
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', updateScrollTarget);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative w-full h-[205vh] md:h-[225vh] bg-[#07150e] text-white select-none"
    >
      {/* Native sticky viewport — zero scroll locking, smooth bidirectional scrolling, natural handoff to next section */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#07150e]">
        {/* Background Video Layer */}
        <div
          ref={videoTransformRef}
          className="absolute inset-0 z-0 will-change-transform"
          style={{ transform: 'scale3d(1, 1, 1)' }}
        >
          <video
            ref={videoRef}
            src={`${HERO_VIDEO_SRC}#t=0.02`}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={handleVideoLoadedMetadata}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Subtle dark vignette for button legibility while keeping venue visuals clean */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
          />
        </div>

        {/* End-of-Timeline Action Buttons: Only Explore & Book Event */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end items-center pb-12 sm:pb-16 md:pb-20 pointer-events-none">
          <div
            ref={actionsBarRef}
            aria-hidden={!buttonsInteractive}
            style={{ opacity: 0, transform: 'translate3d(0, 24px, 0)' }}
            className={`will-change-transform flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none ${
              buttonsInteractive ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <button
              type="button"
              tabIndex={buttonsInteractive ? 0 : -1}
              onClick={onExploreVenue}
              className="w-full sm:w-auto min-w-[215px] px-9 py-4 bg-[#C5A45D] text-[#07150e] font-bold text-xs sm:text-sm tracking-[0.22em] uppercase hover:bg-[#d8bc7a] transition-colors duration-300 shadow-[0_14px_38px_rgba(0,0,0,0.55)] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>EXPLORE</span>
              <ChevronRight className="w-4 h-4 text-[#07150e] shrink-0" />
            </button>

            <button
              type="button"
              tabIndex={buttonsInteractive ? 0 : -1}
              onClick={onCheckAvailability}
              className="w-full sm:w-auto min-w-[215px] px-9 py-4 bg-[#07150e]/75 backdrop-blur-md border border-[#C5A45D] text-white font-bold text-xs sm:text-sm tracking-[0.22em] uppercase hover:bg-[#C5A45D] hover:text-[#07150e] transition-colors duration-300 shadow-[0_14px_38px_rgba(0,0,0,0.55)] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>BOOK EVENT</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
