'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Check, Copy, ExternalLink } from 'lucide-react';

export default function TopInstitutionalBar() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('PULE');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside
      aria-label="Institutional credentials and quick student portals"
      className="bg-[var(--ruby)] text-stone-100 border-b border-white/10 text-xs py-1.5 px-4 sm:px-6 relative z-30 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between gap-2">
        {/* Left: Civic Credentials & Autonomous Recognition */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs">
          <span className="inline-flex items-center font-semibold text-white tracking-wider">
            UGC AUTONOMOUS
          </span>

          <span className="text-white/40 hidden sm:inline" aria-hidden="true">|</span>

          <span className="text-stone-200">
            Affiliated to <span className="text-white font-medium">JNTUA</span> · Approved by AICTE
          </span>

          <div className="hidden xl:flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-[#FFDF88]">
              <Award className="w-3.5 h-3.5" aria-hidden="true" />
              NAAC &apos;A+&apos; Grade (3.38 CGPA)
            </span>
            <span className="inline-flex items-center gap-1 text-stone-200">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-300" aria-hidden="true" />
              NBA Accredited (Tier-1)
            </span>
          </div>
        </div>

        {/* Right: EAPCET Code Badge & Direct Portals */}
        <div className="flex flex-wrap items-center justify-between xl:justify-end gap-x-4 gap-y-1.5">
          {/* Official EAPCET Code */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-2 py-0.5 rounded border border-white/15 transition-colors">
            <span className="text-[11px] text-stone-200 font-medium">EAPCET CODE:</span>
            <span className="font-mono font-bold text-rose-100 tracking-wider">PULE</span>
            <button
              type="button"
              onClick={handleCopyCode}
              title="Copy EAPCET Code PULE"
              aria-label={copied ? 'Code copied to clipboard' : 'Copy EAPCET Code PULE'}
              className="text-stone-200 hover:text-white ml-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-300 rounded"
            >
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400" aria-hidden="true" />
              ) : (
                <Copy className="w-3 h-3" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Quick Portals Links */}
          <nav
            aria-label="Institutional quick links"
            className="flex items-center whitespace-nowrap gap-x-3 text-[11px] sm:text-xs text-stone-200"
          >
            <Link
              href="/documents?category=timetable"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Exam Cell
            </Link>
            <span className="text-white/45" aria-hidden="true">·</span>
            <Link
              href="/documents"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Document vault
            </Link>
            <span className="text-white/45 hidden sm:inline" aria-hidden="true">·</span>
            <Link
              href="/statutory/rti"
              className="hidden sm:inline hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              RTI Act
            </Link>
            <span className="text-white/45 hidden md:inline" aria-hidden="true">·</span>
            <Link
              href="/statutory/grievance"
              className="hidden md:inline hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Grievance
            </Link>
            <span className="text-white/45" aria-hidden="true">·</span>
            <Link
              href="/contact"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
