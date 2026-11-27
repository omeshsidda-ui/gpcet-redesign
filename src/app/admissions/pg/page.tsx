import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getCleanedContent } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'Postgraduate Admissions (M.Tech & MBA)',
  description:
    'M.Tech (CSE: 18, ECE: 6, EEE: 6) and MBA (60 seats) postgraduate admissions via GATE, AP PGECET, and AP ICET at GPCET Kurnool. Counseling Code: PULE.',
};

const PG_PROGRAMS = [
  {
    code: 'M.Tech CSE',
    deptSlug: 'cse',
    title: 'M.Tech — Computer Science and Engineering',
    intake: 18,
    exam: 'GATE / AP PGECET',
    eligibility: 'B.E. / B.Tech in CSE / IT with valid GATE score or AP PGECET rank',
    annualFee: '₹50,000',
  },
  {
    code: 'M.Tech ECE',
    deptSlug: 'ece',
    title: 'M.Tech — Digital Electronics and Communication Systems',
    intake: 6,
    exam: 'GATE / AP PGECET',
    eligibility: 'B.E. / B.Tech in ECE with valid GATE score or AP PGECET rank',
    annualFee: '₹50,000',
  },
  {
    code: 'M.Tech EEE',
    deptSlug: 'eee',
    title: 'M.Tech — Electrical Power Systems',
    intake: 6,
    exam: 'GATE / AP PGECET',
    eligibility: 'B.E. / B.Tech in EEE with valid GATE score or AP PGECET rank',
    annualFee: '₹50,000',
  },
  {
    code: 'MBA',
    deptSlug: 'mba',
    title: 'Master of Business Administration (Finance, Marketing, HR)',
    intake: 60,
    exam: 'AP ICET / Category B',
    eligibility: 'Bachelor’s degree (10+2+3 pattern); 70% Convenor via AP ICET, 30% Category B',
    annualFee: '₹35,000',
  },
];

export default function PostgraduateAdmissionsPage() {
  const procedureLatestMd = getCleanedContent(['admissions', 'admissionprocedure']);
  const procedureLegacyMd = getCleanedContent(['admissions', 'admission-procedure']);
  const researchCentersMd = getCleanedContent(['research', 'research-centers']);

  const totalPgSeats = PG_PROGRAMS.reduce((sum, p) => sum + p.intake, 0);

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Admissions 2026–27</span>
          </Link>
        </div>

        {/* Masthead */}
        <header className="section-masthead pb-8 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
              Postgraduate Admissions (M.Tech &amp; MBA)
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[64ch]">
              Two-year full-time postgraduate engineering (M.Tech) and management (MBA) programs
              under UGC Autonomous status and JNTUA curriculum. Admissions via GATE, AP PGECET,
              and AP ICET under counseling code{' '}
              <strong className="font-mono text-[var(--ruby)]">PULE</strong>.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link
                href="/admissions#inquiry"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[var(--ruby)] hover:bg-[var(--burgundy)] text-white text-[13.5px] font-semibold transition-colors"
              >
                <span>Submit PG Admission Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/research/research-centers"
                className="text-[13.5px] font-semibold text-[var(--ruby)] underline underline-offset-4 decoration-[var(--ruby)]/40 hover:decoration-[var(--ruby)]"
              >
                JNTUA Ph.D. Research Centers
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-5 pt-5 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-7 font-sans tabular-nums">
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] tabular-nums">
                {totalPgSeats}
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">Total PG Seats</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ruby)] tabular-nums">
                30 + 60
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">M.Tech + MBA</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-semibold text-[var(--ruby)]">PULE</div>
              <div className="text-xs text-[var(--muted)] mt-1">APSCHE Code</div>
            </div>
          </div>
        </header>

        {/* PG Sanctioned Intake Register */}
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm overflow-hidden">
          <div className="px-6 py-4 bg-[var(--surface)] border-b border-[var(--rule)] flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--ink)]">
              Postgraduate Program Intake &amp; Tuition Matrix
            </h2>
            <span className="font-sans text-xs font-medium text-[var(--muted)] tabular-nums">
              70% Convenor Quota (PGECET / ICET) · 30% Category B
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-[var(--rule)] text-[13px] font-semibold text-[var(--ink)] bg-[var(--surface)]/50">
                  <th scope="col" className="py-3.5 px-4">Code</th>
                  <th scope="col" className="py-3.5 px-4">Postgraduate Specialization</th>
                  <th scope="col" className="py-3.5 px-4">Intake</th>
                  <th scope="col" className="py-3.5 px-4">Entrance / Eligibility</th>
                  <th scope="col" className="py-3.5 px-4">Annual Tuition</th>
                  <th scope="col" className="py-3.5 px-4 text-right">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--rule)]">
                {PG_PROGRAMS.map((prog) => (
                  <tr key={prog.code} className="hover:bg-[var(--surface)]/50 transition-colors">
                    <td className="py-4 px-4 font-mono text-[13px] font-semibold text-[var(--ruby)] whitespace-nowrap">
                      {prog.code}
                    </td>
                    <td className="py-4 px-4 font-medium text-[var(--ink)]">{prog.title}</td>
                    <td className="py-4 px-4 font-sans font-semibold text-[var(--ink)] tabular-nums whitespace-nowrap">
                      {prog.intake} Seats
                    </td>
                    <td className="py-4 px-4 text-[13px] text-[var(--muted)]">
                      <div className="font-medium text-[var(--ink)]">{prog.exam}</div>
                      <div className="text-xs mt-0.5">{prog.eligibility}</div>
                    </td>
                    <td className="py-4 px-4 font-sans text-[13.5px] font-medium text-[var(--ink)] tabular-nums whitespace-nowrap">
                      {prog.annualFee}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/departments/${prog.deptSlug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)] hover:underline underline-offset-4"
                      >
                        <span>Portal</span>
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="md:hidden divide-y divide-[var(--rule)]">
            {PG_PROGRAMS.map((prog) => (
              <div key={prog.code} className="p-5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-[var(--ruby)]">
                    {prog.code}
                  </span>
                  <span className="font-sans text-xs font-semibold text-[var(--ink)] tabular-nums">
                    {prog.intake} Seats · {prog.annualFee}/yr
                  </span>
                </div>
                <div className="font-serif text-lg font-medium text-[var(--ink)]">{prog.title}</div>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{prog.eligibility}</p>
                <Link
                  href={`/departments/${prog.deptSlug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)] pt-1"
                >
                  <span>Department Portal</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Official APSCHE Procedure & JNTUA Doctoral Centers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {(procedureLatestMd || procedureLegacyMd) && (
            <section className="lg:col-span-7 bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
                PGECET &amp; ICET Admission Regulations
              </h2>
              <MarkdownRenderer content={(procedureLatestMd || procedureLegacyMd)!.content} />
            </section>
          )}

          {researchCentersMd && (
            <section className="lg:col-span-5 bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-8">
              <h2 className="font-serif text-xl font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
                JNTUA Ph.D. Research Admissions
              </h2>
              <MarkdownRenderer content={researchCentersMd.content} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
