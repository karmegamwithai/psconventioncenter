import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const LuxuryCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.05,
          overwrite: 'auto',
        });
      }

      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, .interactive-card');
      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const onMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
    };
  }, []);

  useEffect(() => {
    if (!ringRef.current) return;
    if (isHovered) {
      gsap.to(ringRef.current, {
        scale: 1.8,
        borderColor: '#E7D3A0',
        backgroundColor: 'rgba(197, 164, 93, 0.12)',
        duration: 0.3,
        ease: 'power2.out',
      });
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          scale: 0.5,
          duration: 0.2,
        });
      }
    } else {
      gsap.to(ringRef.current, {
        scale: 1,
        borderColor: '#C5A45D',
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      });
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          scale: 1,
          duration: 0.2,
        });
      }
    }
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Center Gold Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-[#C5A45D] rounded-full pointer-events-none z-[9999] transition-opacity"
      />
      {/* Floating Follower Gold Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-[#C5A45D]/70 rounded-full pointer-events-none z-[9998] transition-opacity backdrop-blur-[0.5px]"
      />
    </>
  );
};
