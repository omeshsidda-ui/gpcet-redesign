'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DepartmentTabsProps {
  deptCode: string;
  facultyCount: number;
}

export default function DepartmentTabs({ deptCode, facultyCount }: DepartmentTabsProps) {
  const pathname = usePathname();
  const basePath = `/departments/${deptCode}`;
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  const tabs = [
    { label: 'Overview', href: basePath, exact: true },
    { label: `Faculty Directory (${facultyCount})`, href: `${basePath}/faculty`, exact: false },
    { label: 'Laboratories', href: `${basePath}/laboratories`, exact: false },
    { label: 'Board of Studies', href: `${basePath}/board-of-studies`, exact: false },
    { label: 'Syllabus', href: `${basePath}/syllabus`, exact: false },
    { label: 'Events', href: `${basePath}/events`, exact: false },
  ];

  const activeTabHref =
    tabs.find((tab) => (tab.exact ? pathname === tab.href : pathname.startsWith(tab.href)))?.href ?? null;

  const measureIndicator = () => {
    if (!activeTabHref) {
      setIndicator((prev) => (prev.ready ? { ...prev, width: 0 } : prev));
      return;
    }
    const activeEl = tabRefs.current[activeTabHref];
    if (!activeEl) return;
    setIndicator({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
      ready: true,
    });
  };

  useLayoutEffect(() => {
    measureIndicator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabHref, facultyCount]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => measureIndicator());
    observer.observe(track);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabHref]);

  return (
    <nav
      aria-label="Department sections"
      className="lg:sticky top-0 z-30 bg-[var(--surface)] border-b border-[var(--rule)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
        <div ref={trackRef} className="relative flex items-center gap-6 w-max min-w-full">
          {tabs.map((tab) => {
            const isActive = tab.href === activeTabHref;
            return (
              <Link
                key={tab.href}
                ref={(el) => {
                  tabRefs.current[tab.href] = el;
                }}
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-3.5 text-[13.5px] font-semibold whitespace-nowrap transition-[color,translate] duration-150 ease-out hover:-translate-y-px active:translate-y-0 after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:transition-[scale,opacity] after:duration-200 after:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? indicator.ready
                      ? 'text-[var(--ruby)] after:scale-x-0 after:opacity-0'
                      : 'text-[var(--ruby)] after:bg-[var(--ruby)] after:scale-x-100'
                    : 'text-[var(--ink)]/70 hover:text-[var(--ink)] after:bg-[var(--ink)]/25 after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
          {indicator.ready && indicator.width > 0 && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-[var(--ruby)] transition-[transform,width] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: `${indicator.width}px`,
                transform: `translate3d(${indicator.left}px, 0, 0)`,
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
