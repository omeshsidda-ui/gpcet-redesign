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
        <header className="pb-6 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[var(--ink)]">
              Admissions 2026–27
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[var(--muted)] max-w-[66ch]">
              Undergraduate (B.Tech), Lateral Entry (ECET), and Postgraduate (M.Tech &amp; MBA)
              admissions under JNTUA and APSCHE norms. Counseling Code:{' '}
              <strong className="font-mono text-[var(--brand-crimson)]">PULE</strong>.
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-3 gap-4 pt-4 lg:pt-0 lg:border-l lg:border-[var(--rule)] lg:pl-6 font-mono tabular-nums">
            <div>
              <div className="text-xl font-bold text-[var(--brand-crimson)]">PULE</div>
              <div className="text-[11px] text-[var(--muted)] font-sans">EAPCET Code</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--ink)]">70%</div>
              <div className="text-[11px] text-[var(--muted)] font-sans">Convenor Quota</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--primary-navy)]">30%</div>
              <div className="text-[11px] text-[var(--muted)] font-sans">Mgmt / NRI</div>
            </div>
          </div>
        </header>

        {/* Intake Matrix + Inquiry Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md overflow-hidden">
              <div className="px-5 py-4 bg-[var(--surface)] border-b border-[var(--rule)]">
                <h2 className="font-serif text-xl font-medium text-[var(--ink)]">
                  Sanctioned Program Intake Matrix
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[var(--rule)] text-xs font-semibold text-[var(--muted)]">
                      <th scope="col" className="py-3 px-4 font-mono">Code</th>
                      <th scope="col" className="py-3 px-4">Program / Branch</th>
                      <th scope="col" className="py-3 px-4 font-mono">Intake</th>
                      <th scope="col" className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--rule)]">
                    {degreeDepartments.map((dept) => (
                      <tr key={dept.code}>
                        <td className="py-3 px-4 font-mono text-xs font-semibold text-[var(--primary-navy)]">
                          {dept.shortName}
                        </td>
                        <td className="py-3 px-4 font-medium text-[var(--ink)]">
                          <Link
                            href={`/departments/${dept.code}`}
                            className="hover:text-[var(--brand-crimson)]"
                          >
                            {dept.name}
                          </Link>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs tabular-nums text-[var(--ink)]">
                          {dept.intakeLabel}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-[var(--muted)]">
                          {dept.nbaStatusLabel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {feeMd && (
              <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6">
                <h2 className="font-serif text-xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-3">
                  Fee Structure (APHERMC Norms)
                </h2>
                <MarkdownRenderer content={feeMd.content} />
              </div>
            )}
          </div>

          <div className="lg:col-span-6">
            <AdmissionsInquiryForm />
          </div>
        </section>

        {/* Eligibility & Admission Procedure */}
        {procedureMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
              Eligibility Criteria &amp; Admission Procedure
            </h2>
            <MarkdownRenderer content={procedureMd.content} />
          </section>
        )}

        {/* Scholarships */}
        {scholarshipMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
              Scholarships &amp; Financial Assistance
            </h2>
            <MarkdownRenderer content={scholarshipMd.content} />
          </section>
        )}
      </div>
    </div>
  );
}
