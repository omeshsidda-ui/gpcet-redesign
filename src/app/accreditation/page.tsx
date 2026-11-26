import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, ShieldCheck, ExternalLink, FileText } from 'lucide-react';
import { getAllNaacMetrics } from '@/lib/naac-data';

export const metadata: Metadata = {
  title: 'Accreditation & Quality Assurance',
  description:
    'NAAC A+ Grade (Cycle 2, 3.38 CGPA), NBA Tier-1 accreditation across 5 engineering programs, UGC Autonomous conferment, AICTE approvals, and IQAC.',
};

export default function AccreditationGatewayPage() {
  const naacMetricsCount = getAllNaacMetrics().length;

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <header className="pb-6 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[var(--ink)]">
              Institutional Accreditation &amp; Statutory Standing
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[var(--muted)] max-w-[66ch]">
              G. Pullaiah College of Engineering &amp; Technology (Autonomous) maintains national
              quality benchmarks across NAAC, NBA, UGC, AICTE, and NIRF frameworks.
            </p>
          </div>
          <div className="lg:col-span-4 lg:border-l lg:border-[var(--rule)] lg:pl-6 flex items-center gap-3">
            <img
              src="/assets/brand/NAAC_logo_s.png"
              alt="NAAC A+ Accreditation"
              width={64}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <img
              src="/assets/brand/NBA_logo_s.png"
              alt="NBA Accreditation"
              width={64}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <img
              src="/assets/brand/UGC_logo_s.png"
              alt="UGC Autonomous"
              width={64}
              height={48}
              className="h-12 w-auto object-contain"
            />
          </div>
        </header>

        {/* Monolithic Accreditation Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)] rounded-md overflow-hidden">
          <article className="bg-[var(--surface-raised)] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--brass-gold)]">
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>NAAC CYCLE 2 · GRADE &apos;A+&apos; (3.38 CGPA)</span>
              </div>
              <h2 className="font-serif text-2xl font-medium text-[var(--ink)] mt-2">
                NAAC SSR Metrics Portfolio
              </h2>
              <p className="text-sm text-[var(--muted)] leading-relaxed mt-2">
                Browse all {naacMetricsCount} archived Self Study Report (SSR) metric disclosures
                spanning Criteria 1 through 7 with supporting PDFs and data tables.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--rule)]">
              <Link
                href="/accreditation/naac"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--primary-navy)] text-white text-xs font-semibold hover:bg-[#08192e] transition-colors"
              >
                <span>Open NAAC Criteria 1–7 Hub</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <a
                href="https://www.gpcet.ac.in/wp-content/uploads/2023/06/NAAC-LATEST-CERTIFICATE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-crimson)] hover:underline"
              >
                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                NAAC Certificate PDF
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </article>

          <article className="bg-[var(--surface-raised)] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--primary-navy)]">
                <ShieldCheck className="w-4 h-4 text-[var(--brass-gold)]" aria-hidden="true" />
                <span>NBA TIER-1 ACCREDITED · 5 UG PROGRAMS</span>
              </div>
              <h2 className="font-serif text-2xl font-medium text-[var(--ink)] mt-2">
                National Board of Accreditation (NBA)
              </h2>
              <p className="text-sm text-[var(--muted)] leading-relaxed mt-2">
                Outcome-Based Education (OBE) compliance verified across Computer Science (CSE),
                Electronics &amp; Communication (ECE), Electrical (EEE), Mechanical (ME), and Civil
                Engineering (CE).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--rule)]">
              <Link
                href="/accreditation/nba"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[var(--primary-navy)] text-white text-xs font-semibold hover:bg-[#08192e] transition-colors"
              >
                <span>View NBA Program Status</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <a
                href="https://www.gpcet.ac.in/wp-content/uploads/2023/06/NBA-Documents.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-crimson)] hover:underline"
              >
                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                NBA Documents PDF
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>

        {/* Statutory Links Table */}
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
          <h2 className="font-serif text-xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)]">
            Additional Quality &amp; Statutory Portals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs">
            <Link
              href="/accreditation/iqac"
              className="p-4 rounded border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--primary-navy)] transition-colors font-semibold text-[var(--ink)] flex items-center justify-between"
            >
              <span>IQAC Quality Cell</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/accreditation/aicte-idea-lab"
              className="p-4 rounded border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--primary-navy)] transition-colors font-semibold text-[var(--ink)] flex items-center justify-between"
            >
              <span>AICTE IDEA Lab</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/accreditation/nirf"
              className="p-4 rounded border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--primary-navy)] transition-colors font-semibold text-[var(--ink)] flex items-center justify-between"
            >
              <span>NIRF Data Submissions</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/documents?category=accreditation_doc"
              className="p-4 rounded border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--primary-navy)] transition-colors font-semibold text-[var(--ink)] flex items-center justify-between"
            >
              <span>All Accreditation PDFs</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
