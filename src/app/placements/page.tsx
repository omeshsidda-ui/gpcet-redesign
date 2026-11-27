import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, Building2 } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getCleanedContent } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'Training, Placements & Industrial MoUs',
  description:
    'Placement & Training Center (PAT), Careers and Employability Center (CEC), historical placement records, internships, and industry MoUs at GPCET Kurnool.',
};

export default function PlacementsPage() {
  const introMd = getCleanedContent(['placements', 'placements-introduction']);
  const recordsMd = getCleanedContent(['placements', 'placement-records']);
  const mouMd = getCleanedContent(['placements', 'mou']);

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <header className="section-masthead pb-8 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--ruby)] mb-2.5">
              <Briefcase className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
              <span>Placement &amp; Training Center (PAT) · Careers &amp; Employability Center</span>
            </div>
            <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
              Placements, Internships &amp; Industry MoUs
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[64ch]">
              Campus recruitment drives, full-semester industry internships, competitive exam
              preparation, and corporate Memoranda of Understanding across core engineering and IT
              enterprises.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap gap-2.5 lg:justify-end pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-7">
            <Link
              href="/placements/internship"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-[var(--rule)] bg-[var(--surface-raised)] hover:border-[var(--ruby)] hover:bg-[var(--surface)] text-[13px] font-semibold text-[var(--ink)] transition-colors"
            >
              <span>Internship Archives</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/accreditation/naac/5-3-1"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[var(--ruby)] hover:bg-[var(--burgundy)] text-white text-[13px] font-semibold transition-colors"
            >
              <span>NAAC Student Progression</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </header>

        {/* PAT & CEC Overview */}
        {introMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-8">
            <MarkdownRenderer content={introMd.content} />
          </section>
        )}

        {/* Placement Records Tables */}
        {recordsMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm p-6 sm:p-8">
            <h2 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
              Verified Campus Placement Records
            </h2>
            <MarkdownRenderer content={recordsMd.content} />
          </section>
        )}

        {/* Academic & Industrial MoUs */}
        {mouMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--ruby)] mb-2">
              <Building2 className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />
              <span>Corporate &amp; Academic Collaborations</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
              Memoranda of Understanding (MoUs)
            </h2>
            <MarkdownRenderer content={mouMd.content} />
          </section>
        )}
      </div>
    </div>
  );
}
