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
        <header className="section-masthead pb-8 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
              Institutional Accreditation &amp; Statutory Standing
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[64ch]">
              G. Pullaiah College of Engineering &amp; Technology (Autonomous) maintains national
              quality benchmarks across NAAC, NBA, UGC, AICTE, and NIRF frameworks.
            </p>
          </div>
          <div className="lg:col-span-4 pt-5 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-7 flex items-center gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm overflow-hidden">
          <article className="bg-[var(--surface-raised)] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wide text-[var(--distinction-ink)] tabular-nums">
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>NAAC Cycle 2 · Grade &apos;A+&apos; (3.38 CGPA)</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] mt-2.5 leading-snug">
                NAAC SSR Metrics Portfolio
              </h2>
              <p className="text-[15px] text-[var(--muted)] leading-relaxed mt-2.5">
                Browse all {naacMetricsCount} archived Self Study Report (SSR) metric disclosures
                spanning Criteria 1 through 7 with supporting PDFs and data tables.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 pt-5 border-t border-[var(--rule)]">
              <Link
                href="/accreditation/naac"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[var(--ruby)] text-white text-[13px] font-semibold hover:bg-[var(--burgundy)] transition-colors"
              >
                <span>Open NAAC Criteria 1–7 Hub</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <a
                href="https://www.gpcet.ac.in/wp-content/uploads/2023/06/NAAC-LATEST-CERTIFICATE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] underline underline-offset-4 decoration-[var(--ruby)]/30"
              >
                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                <span>NAAC Certificate PDF</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </article>

          <article className="bg-[var(--surface-raised)] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wide text-[var(--ruby)]">
                <ShieldCheck className="w-4 h-4 text-[var(--distinction-ink)]" aria-hidden="true" />
                <span>NBA Tier-1 Accredited · 5 UG Programs</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] mt-2.5 leading-snug">
                National Board of Accreditation (NBA)
              </h2>
              <p className="text-[15px] text-[var(--muted)] leading-relaxed mt-2.5">
                Outcome-Based Education (OBE) compliance verified across Computer Science (CSE),
                Electronics &amp; Communication (ECE), Electrical (EEE), Mechanical (ME), and Civil
                Engineering (CE).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 pt-5 border-t border-[var(--rule)]">
              <Link
                href="/accreditation/nba"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[var(--ruby)] text-white text-[13px] font-semibold hover:bg-[var(--burgundy)] transition-colors"
              >
                <span>View NBA Program Status</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <a
                href="https://www.gpcet.ac.in/wp-content/uploads/2023/06/NBA-Documents.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] underline underline-offset-4 decoration-[var(--ruby)]/30"
              >
                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                <span>NBA Documents PDF</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>

        {/* Statutory Links Table */}
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-8">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)]">
            Additional Quality &amp; Statutory Portals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 text-[14px]">
            <Link
              href="/accreditation/iqac"
              className="px-4 py-3.5 rounded-sm border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] transition-colors font-semibold text-[var(--ink)] flex items-center justify-between"
            >
              <span>IQAC Quality Cell</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
            </Link>
            <Link
              href="/accreditation/aicte-idea-lab"
              className="px-4 py-3.5 rounded-sm border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] transition-colors font-semibold text-[var(--ink)] flex items-center justify-between"
            >
              <span>AICTE IDEA Lab</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
            </Link>
            <Link
              href="/accreditation/nirf"
              className="px-4 py-3.5 rounded-sm border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] transition-colors font-semibold text-[var(--ink)] flex items-center justify-between"
            >
              <span>NIRF Data Submissions</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
            </Link>
            <Link
              href="/documents?category=accreditation_doc"
              className="px-4 py-3.5 rounded-sm border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] transition-colors font-semibold text-[var(--ink)] flex items-center justify-between"
            >
              <span>All Accreditation PDFs</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
