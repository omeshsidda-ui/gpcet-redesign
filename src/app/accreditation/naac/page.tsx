import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Award, ExternalLink, FileText } from 'lucide-react';
import CriteriaMatrixGrid from '@/components/naac/CriteriaMatrixGrid';
import { getAllNaacMetrics, getNaacCriteriaGroups } from '@/lib/naac-data';

export const metadata: Metadata = {
  title: 'NAAC SSR Criteria 1–7 Explorer',
  description:
    'NAAC Grade A+ (3.38 CGPA, Cycle 2) Self Study Report explorer mapping 48 institutional metric pages across Criteria 1 to 7 at GPCET Kurnool.',
};

export default function NaacHubPage() {
  const groups = getNaacCriteriaGroups();
  const totalMetrics = getAllNaacMetrics().length;

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <Link
            href="/accreditation"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Accreditation Gateway</span>
          </Link>
        </div>

        <header className="section-masthead pb-6 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--distinction-ink)]">
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>NAAC CYCLE 2 · GRADE &apos;A+&apos; (3.38 CGPA)</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[var(--ink)] mt-2">
              NAAC SSR Accreditation Hub (Criteria 1–7)
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[var(--muted)] max-w-[66ch]">
              Comprehensive Institutional Self Study Report (SSR) dossier indexing all{' '}
              {totalMetrics} verified metric and criterion pages across Curricular Aspects,
              Teaching-Learning, Research, Infrastructure, Student Progression, Governance, and
              Best Practices.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
            <a
              href="https://www.gpcet.ac.in/wp-content/uploads/2023/06/NAAC-LATEST-CERTIFICATE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[var(--brand-crimson)] hover:bg-[var(--burgundy)] text-white text-xs font-semibold transition-colors"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>NAAC &apos;A+&apos; Certificate (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <Link
              href="/accreditation/iqac"
              className="text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]"
            >
              Internal Quality Assurance Cell (IQAC) →
            </Link>
          </div>
        </header>

        <CriteriaMatrixGrid groups={groups} totalMetrics={totalMetrics} />
      </div>
    </div>
  );
}
