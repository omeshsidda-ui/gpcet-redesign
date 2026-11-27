import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import AdmissionsInquiryForm from '@/components/admissions/AdmissionsInquiryForm';
import { getCleanedContent, getEnrichedDepartments } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'Admissions 2026–27 (EAPCET Code: PULE)',
  description:
    'B.Tech, M.Tech, and MBA admissions at G. Pullaiah College of Engineering & Technology (Autonomous), Kurnool. EAPCET Code: PULE. Intake matrix, fee structure, scholarships, and online inquiry.',
};

export default async function AdmissionsPage() {
  const [departments, procedureMd, feeMd, scholarshipMd] = await Promise.all([
    getEnrichedDepartments(),
    Promise.resolve(getCleanedContent(['admissions', 'admission-procedure'])),
    Promise.resolve(getCleanedContent(['admissions', 'fee-structure'])),
    Promise.resolve(getCleanedContent(['admissions', 'scholarships-2'])),
  ]);

  const degreeDepartments = departments.filter((d) => d.intakeUg > 0 || d.intakePg > 0);

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <header className="section-masthead pb-8 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
              Admissions 2026–27
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[64ch]">
              Undergraduate (B.Tech), Lateral Entry (ECET), and Postgraduate (M.Tech &amp; MBA)
              admissions under JNTUA and APSCHE norms. Counseling Code:{' '}
              <strong className="font-mono text-[var(--ruby)]">PULE</strong>.
            </p>
            <a
              href="#inquiry"
              className="mt-5 inline-flex py-1.5 text-[14px] font-semibold underline underline-offset-4 decoration-[var(--ruby)]/40 hover:decoration-[var(--ruby)] text-[var(--ruby)]"
            >
              Ask the admissions desk
            </a>
          </div>

          <div className="lg:col-span-4 grid grid-cols-3 gap-5 pt-5 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-7 font-sans tabular-nums">
            <div>
              <div className="font-mono text-2xl font-semibold text-[var(--ruby)]">PULE</div>
              <div className="text-xs text-[var(--muted)] mt-1">EAPCET Code</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] tabular-nums">70%</div>
              <div className="text-xs text-[var(--muted)] mt-1">Convenor Quota</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ruby)] tabular-nums">30%</div>
              <div className="text-xs text-[var(--muted)] mt-1">Mgmt / NRI</div>
            </div>
          </div>
        </header>

        {/* Intake Matrix + Inquiry Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm overflow-hidden">
              <div className="px-6 py-4 bg-[var(--surface)] border-b border-[var(--rule)]">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--ink)]">
                  Sanctioned Program Intake Matrix
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[14px]">
                  <thead>
                    <tr className="border-b border-[var(--rule)] text-[13px] font-semibold text-[var(--ink)] bg-[var(--surface)]/50">
                      <th scope="col" className="py-3.5 px-4">Code</th>
                      <th scope="col" className="py-3.5 px-4">Program / Branch</th>
                      <th scope="col" className="py-3.5 px-4">Intake</th>
                      <th scope="col" className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--rule)]">
                    {degreeDepartments.map((dept) => (
                      <tr key={dept.code} className="hover:bg-[var(--surface)]/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-[13px] font-semibold text-[var(--ruby)]">
                          {dept.shortName}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-[var(--ink)]">
                          <Link
                            href={`/departments/${dept.code}`}
                            className="hover:text-[var(--ruby)] transition-colors"
                          >
                            {dept.name}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 font-sans text-[13px] tabular-nums text-[var(--ink)]">
                          {dept.intakeLabel}
                        </td>
                        <td className="py-3.5 px-4 font-sans text-xs text-[var(--muted)]">
                          {dept.nbaStatusLabel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {feeMd && (
              <div className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm p-6 sm:p-7">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
                  Fee Structure (APHERMC Norms)
                </h2>
                <MarkdownRenderer content={feeMd.content} />
              </div>
            )}
          </div>

          <div id="inquiry" className="lg:col-span-6">
            <AdmissionsInquiryForm />
          </div>
        </section>

        {/* Eligibility & Admission Procedure */}
        {procedureMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-8">
            <h2 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
              Eligibility Criteria &amp; Admission Procedure
            </h2>
            <MarkdownRenderer content={procedureMd.content} />
          </section>
        )}

        {/* Scholarships */}
        {scholarshipMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-8">
            <h2 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
              Scholarships &amp; Financial Assistance
            </h2>
            <MarkdownRenderer content={scholarshipMd.content} />
          </section>
        )}
      </div>
    </div>
  );
}
