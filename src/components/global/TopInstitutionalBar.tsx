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
      className="bg-[#0C2340] text-slate-200 border-b border-white/10 text-xs py-1.5 px-4 sm:px-6 relative z-30 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Left: Civic Credentials & Autonomous Recognition */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs">
          <span className="inline-flex items-center gap-1 font-semibold text-white tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            UGC AUTONOMOUS
          </span>

          <span className="text-slate-400 hidden sm:inline" aria-hidden="true">|</span>

          <span className="text-slate-300">
            Affiliated to <span className="text-white font-medium">JNTUA</span> · Approved by AICTE
          </span>

          <span className="text-slate-400 hidden lg:inline" aria-hidden="true">|</span>

          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-[#D4AF37]">
              <Award className="w-3.5 h-3.5" aria-hidden="true" />
              NAAC &apos;A+&apos; Grade (3.38 CGPA)
            </span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              NBA Accredited (Tier-1)
            </span>
          </div>
        </div>

        {/* Right: EAPCET Code Badge & Direct Portals */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-x-4 gap-y-1.5">
          {/* Official EAPCET Code */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-2 py-0.5 rounded border border-white/15 transition-colors">
            <span className="text-[11px] text-slate-300 font-medium">EAPCET CODE:</span>
            <span className="font-mono font-bold text-amber-300 tracking-wider">PULE</span>
            <button
              type="button"
              onClick={handleCopyCode}
              title="Copy EAPCET Code PULE"
              aria-label={copied ? 'Code copied to clipboard' : 'Copy EAPCET Code PULE'}
              className="text-slate-300 hover:text-white ml-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-300 rounded"
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
            className="flex items-center gap-x-3 text-[11px] sm:text-xs text-slate-300"
          >
            <Link
              href="/documents?category=timetable"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Exam Cell
            </Link>
            <span className="text-slate-500" aria-hidden="true">·</span>
            <Link
              href="/documents"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Vault (5,822 Docs)
            </Link>
            <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
            <Link
              href="/statutory/rti"
              className="hidden sm:inline hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              RTI Act
            </Link>
            <span className="text-slate-500 hidden md:inline" aria-hidden="true">·</span>
            <Link
              href="/statutory/grievance"
              className="hidden md:inline hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Grievance
            </Link>
            <span className="text-slate-500" aria-hidden="true">·</span>
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
