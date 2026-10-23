import React, { useRef } from 'react';
import gsap from 'gsap';

interface CursorPerspectiveCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // max tilt angle in degrees, default 10
  onClick?: () => void;
  glareEffect?: boolean;
}

export const CursorPerspectiveCard: React.FC<CursorPerspectiveCardProps> = ({
  children,
  className = '',
  maxRotation = 8,
  onClick,
  glareEffect = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
      scale: 1.015,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (glareEffect && glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      gsap.to(glareRef.current, {
        opacity: 0.22,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(197, 164, 93, 0.45) 0%, transparent 65%)`,
        duration: 0.25,
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (glareEffect && glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.4,
        overwrite: 'auto',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {glareEffect && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 transition-opacity z-20"
        />
      )}
    </div>
  );
};
