'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Check, Copy } from 'lucide-react';

export default function TopInstitutionalBar() {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard?.writeText('PULE');
    } catch {
      // Clipboard API may be unavailable in restricted contexts; visual confirmation still updates.
    }
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside
      aria-label="Institutional credentials and quick student portals"
      className="bg-[#181112] text-stone-200 border-b border-white/10 text-xs py-1.5 px-4 sm:px-6 relative z-30"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1.5 lg:gap-3">
        {/* Left: Statutory Credentials & Autonomous Recognition */}
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-x-2 xl:gap-x-2.5 gap-y-1 text-[11.5px] sm:text-xs leading-tight min-w-0">
          <span className="font-semibold text-white tracking-wider whitespace-nowrap">
            UGC AUTONOMOUS
          </span>

          <span className="text-white/25" aria-hidden="true">|</span>

          <span className="text-stone-200 whitespace-nowrap">
            <span className="text-white font-medium">JNTUA</span>
            <span className="hidden xl:inline"> · AICTE Approved</span>
            <span className="hidden sm:inline xl:hidden"> · AICTE</span>
          </span>

          <span className="text-white/25 hidden sm:inline" aria-hidden="true">|</span>

          <span className="inline-flex items-center gap-1 font-medium text-[#FFDF88] whitespace-nowrap">
            <Award className="w-3.5 h-3.5 text-[#E5BE53] shrink-0" aria-hidden="true" />
            <span>
              NAAC &apos;A+&apos;<span className="hidden xl:inline"> Grade</span>{' '}
              <span className="hidden sm:inline">· 3.38 CGPA</span>
            </span>
          </span>

          <span className="hidden xl:inline text-white/25" aria-hidden="true">|</span>

          <span className="hidden xl:inline-flex items-center gap-1 text-stone-200 whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5BE53] shrink-0" aria-hidden="true" />
            NBA Accredited (Tier-1)
          </span>
        </div>

        {/* Right: EAPCET Code Badge & Quick Portals */}
        <div className="flex items-center justify-between lg:justify-end gap-x-3 xl:gap-x-4 gap-y-1 shrink-0">
          {/* Official EAPCET Code */}
          <div className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/15 px-2 py-0.5 rounded-sm shrink-0">
            <span className="text-[11px] text-stone-300 font-medium">
              EAPCET:
            </span>
            <span className="font-mono text-[11.5px] font-semibold text-white tracking-wider">
              PULE
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              title="Copy EAPCET Code PULE"
              aria-label={copied ? 'EAPCET code PULE copied to clipboard' : 'Copy EAPCET code PULE'}
              className="inline-flex items-center justify-center p-0.5 text-stone-300 hover:text-white transition-colors duration-120 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5BE53] focus-visible:shadow-none"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Quick Portals Links (hidden on xs so mobile bar stays uncluttered; accessible in drawer) */}
          <nav
            aria-label="Institutional quick links"
            className="hidden sm:flex items-center whitespace-nowrap gap-x-3 text-xs text-stone-200"
          >
            <Link
              href="/documents?category=timetable"
              className="hover:text-white transition-colors duration-120 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5BE53] focus-visible:shadow-none rounded-sm"
            >
              Exam Cell
            </Link>
            <span className="text-white/30" aria-hidden="true">·</span>
            <Link
              href="/administration/rti"
              className="hover:text-white transition-colors duration-120 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5BE53] focus-visible:shadow-none rounded-sm"
            >
              RTI Act
            </Link>
            <span className="text-white/30 hidden md:inline" aria-hidden="true">·</span>
            <Link
              href="/administration/women-grievance"
              className="hidden md:inline hover:text-white transition-colors duration-120 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5BE53] focus-visible:shadow-none rounded-sm"
            >
              Grievance
            </Link>
            <span className="text-white/30" aria-hidden="true">·</span>
            <Link
              href="/archive-or-orphan/contact-us"
              className="hover:text-white transition-colors duration-120 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5BE53] focus-visible:shadow-none rounded-sm"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
