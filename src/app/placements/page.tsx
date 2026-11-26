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
        <header className="pb-6 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--primary-navy)]">
              <Briefcase className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
              <span>PLACEMENT &amp; TRAINING CENTER (PAT) · CAREERS &amp; EMPLOYABILITY CENTER</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[var(--ink)] mt-2">
              Placements, Internships &amp; Industry MoUs
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[var(--muted)] max-w-[66ch]">
              Campus recruitment drives, full-semester industry internships, competitive exam
              preparation, and corporate Memoranda of Understanding across core engineering and IT
              enterprises.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap gap-2.5 lg:justify-end">
            <Link
              href="/placements/internship"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[var(--rule)] bg-[var(--surface-raised)] hover:bg-[var(--surface)] text-xs font-semibold text-[var(--ink)]"
            >
              <span>Internship Archives</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/accreditation/naac/5-3-1"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[var(--primary-navy)] text-white text-xs font-semibold"
            >
              <span>NAAC Student Progression</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </header>

        {/* PAT & CEC Overview */}
        {introMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
            <MarkdownRenderer content={introMd.content} />
          </section>
        )}

        {/* Placement Records Tables */}
        {recordsMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
              Verified Campus Placement Records
            </h2>
            <MarkdownRenderer content={recordsMd.content} />
          </section>
        )}

        {/* Academic & Industrial MoUs */}
        {mouMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--primary-navy)] mb-2">
              <Building2 className="w-4 h-4 text-[var(--brass-gold)]" aria-hidden="true" />
              <span>CORPORATE &amp; ACADEMIC COLLABORATIONS</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
              Memoranda of Understanding (MoUs)
            </h2>
            <MarkdownRenderer content={mouMd.content} />
          </section>
        )}
      </div>
    </div>
  );
}
