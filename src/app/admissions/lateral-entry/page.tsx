import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getCleanedContent, getEnrichedDepartments } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'Lateral Entry Admissions (ECET)',
  description:
    'Direct second-year B.Tech Lateral Entry admissions via AP ECET for Diploma holders at G. Pullaiah College of Engineering & Technology (Autonomous), Kurnool. Counseling Code: PULE.',
};

export default async function LateralEntryAdmissionsPage() {
  const [departments, procedureLatestMd, procedureLegacyMd, feeMd, scholarshipsMd] =
    await Promise.all([
      getEnrichedDepartments(),
      Promise.resolve(getCleanedContent(['admissions', 'admissionprocedure'])),
      Promise.resolve(getCleanedContent(['admissions', 'admission-procedure'])),
      Promise.resolve(getCleanedContent(['admissions', 'fee-structure'])),
      Promise.resolve(getCleanedContent(['admissions', 'scholarships-2'])),
    ]);

  const ugDepartments = departments.filter((d) => d.intakeUg > 0);

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
              Lateral Entry Admissions (ECET)
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[64ch]">
              Direct admission into the Second Year (III Semester) of the four-year B.Tech
              program for Engineering Diploma holders through Andhra Pradesh ECET web
              counseling under APSCHE and JNTUA guidelines. Counseling Code:{' '}
              <strong className="font-mono text-[var(--ruby)]">PULE</strong>.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link
                href="/admissions#inquiry"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[var(--ruby)] hover:bg-[var(--burgundy)] text-white text-[13.5px] font-semibold transition-colors"
              >
                <span>Submit ECET Admission Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/admissions/fee-structure"
                className="text-[13.5px] font-semibold text-[var(--ruby)] underline underline-offset-4 decoration-[var(--ruby)]/40 hover:decoration-[var(--ruby)]"
              >
                Fee Structure &amp; APHERMC Norms
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-5 pt-5 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-7 font-sans tabular-nums">
            <div>
              <div className="font-mono text-2xl font-semibold text-[var(--ruby)]">PULE</div>
              <div className="text-xs text-[var(--muted)] mt-1">ECET Code</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] tabular-nums">
                II Year
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">Direct Entry</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] tabular-nums">
                ₹60,900
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">Annual Fee</div>
            </div>
          </div>
        </header>

        {/* Eligible Engineering Branches */}
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm overflow-hidden">
          <div className="px-6 py-4 bg-[var(--surface)] border-b border-[var(--rule)] flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--ink)]">
              Eligible B.Tech Branches for Lateral Entry
            </h2>
            <span className="font-sans text-xs font-medium text-[var(--muted)] tabular-nums">
              {ugDepartments.length} Undergraduate Engineering Disciplines
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-[var(--rule)] text-[13px] font-semibold text-[var(--ink)] bg-[var(--surface)]/50">
                  <th scope="col" className="py-3.5 px-4">Code</th>
                  <th scope="col" className="py-3.5 px-4">Engineering Branch</th>
                  <th scope="col" className="py-3.5 px-4">Entry Pathway</th>
                  <th scope="col" className="py-3.5 px-4">Accreditation</th>
                  <th scope="col" className="py-3.5 px-4 text-right">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--rule)]">
                {ugDepartments.map((dept) => (
                  <tr key={dept.code} className="hover:bg-[var(--surface)]/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[13px] font-semibold text-[var(--ruby)]">
                      {dept.shortName}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[var(--ink)]">
                      B.Tech in {dept.name}
                    </td>
                    <td className="py-3.5 px-4 text-[13px] text-[var(--muted)]">
                      AP ECET (II Year Direct)
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[var(--muted)]">
                      {dept.nbaStatusLabel}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/departments/${dept.code}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)] hover:underline underline-offset-4"
                      >
                        <span>Syllabus &amp; Labs</span>
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* APSCHE Admission Guidelines & Fee Norms */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {(procedureLatestMd || procedureLegacyMd) && (
            <section className="lg:col-span-7 bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
                APSCHE Admission Procedure &amp; ECET Norms
              </h2>
              <MarkdownRenderer
                content={(procedureLatestMd || procedureLegacyMd)!.content}
              />
            </section>
          )}

          <div className="lg:col-span-5 space-y-6">
            {feeMd && (
              <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-7">
                <h2 className="font-serif text-xl font-normal text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
                  APHERMC Fee Reference
                </h2>
                <MarkdownRenderer content={feeMd.content} />
              </section>
            )}

            <section className="bg-[var(--surface)] border border-[var(--rule)] rounded-sm p-6 space-y-3">
              <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
                Admissions Helpdesk (Kurnool)
              </h2>
              <p className="text-[14px] text-[var(--muted)] leading-relaxed">
                For ECET certificate verification, lateral entry spot admissions, and Jnanabhumi
                fee reimbursement queries, contact our admissions counselors or submit an online
                inquiry.
              </p>
              <div className="text-[13.5px] text-[var(--ink)] space-y-1 font-sans tabular-nums">
                <div>Dr. M. Giridhar Kumar: +91 8639756663</div>
                <div>Prof. G. Sashi Kumar: +91 8639756669</div>
                <div>Helpline: 08518-285088 · principal@gpcet.ac.in</div>
              </div>
              <div className="pt-2">
                <Link
                  href="/admissions#inquiry"
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--ruby)] hover:underline underline-offset-4"
                >
                  <span>Go to Online Admissions Inquiry Form</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </section>
          </div>
        </div>

        {/* Scholarships */}
        {scholarshipsMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
              State &amp; Central Government Scholarships
            </h2>
            <MarkdownRenderer content={scholarshipsMd.content} />
          </section>
        )}
      </div>
    </div>
  );
}
