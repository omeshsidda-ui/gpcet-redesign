'use client';

import React, { useEffect, useRef, useState } from 'react';

interface EditorialRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}

export default function EditorialReveal({
  children,
  delayMs,
  className = '',
}: EditorialRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    let settled = false;
    let observer: IntersectionObserver | null = null;

    const reveal = () => {
      if (settled) return;
      settled = true;
      setRevealed(true);
      observer?.disconnect();
    };

    const checkInView = () => {
      if (el.getBoundingClientRect().top <= window.innerHeight + 40) {
        reveal();
      }
    };

    checkInView();
    if (settled) return;

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight + 40) {
            reveal();
            break;
          }
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(el);
    window.addEventListener('scroll', checkInView, { passive: true });
    window.addEventListener('resize', checkInView, { passive: true });

    const safetyTimer = window.setTimeout(checkInView, 600);

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', checkInView);
      window.removeEventListener('resize', checkInView);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  const combinedClassName = className
    ? `reveal-on-scroll ${className}`
    : 'reveal-on-scroll';

  return (
    <div
      ref={ref}
      className={combinedClassName}
      data-revealed={revealed ? 'true' : 'false'}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
