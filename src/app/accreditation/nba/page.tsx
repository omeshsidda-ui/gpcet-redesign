import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Award, ExternalLink, FileText } from 'lucide-react';
import { getEnrichedDepartments } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'NBA Tier-1 Accreditation',
  description:
    'National Board of Accreditation (NBA) status across undergraduate B.Tech engineering programs at GPCET Kurnool.',
};

export default async function NbaAccreditationPage() {
  const departments = await getEnrichedDepartments();
  const nbaDepts = departments.filter((d) => d.nbaAccredited);

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

        <header className="section-masthead pb-6 border-b border-[var(--rule)] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--distinction-ink)]">
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>NATIONAL BOARD OF ACCREDITATION · OUTCOME-BASED EDUCATION</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[var(--ink)] mt-2">
              NBA Tier-1 Accredited Programs
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--muted)] max-w-[66ch]">
              Five core undergraduate B.Tech engineering disciplines at GPCET are accredited by the
              National Board of Accreditation (NBA), validating curriculum rigor, faculty cadence,
              and graduate outcomes.
            </p>
          </div>

          <a
            href="https://www.gpcet.ac.in/wp-content/uploads/2023/06/NBA-Documents.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[var(--brand-crimson)] hover:bg-[var(--burgundy)] text-white text-xs font-semibold shrink-0 transition-colors"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>Download Official NBA Documents</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </header>

        {/* NBA Program Register */}
        <div className="overflow-x-auto bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--surface)] border-b border-[var(--rule)] text-xs font-semibold text-[var(--muted)]">
                <th scope="col" className="py-3.5 px-4 font-mono">Code</th>
                <th scope="col" className="py-3.5 px-4">Accredited Engineering Program</th>
                <th scope="col" className="py-3.5 px-4 font-mono">Estd.</th>
                <th scope="col" className="py-3.5 px-4 font-mono">Intake</th>
                <th scope="col" className="py-3.5 px-4 font-mono">Faculty</th>
                <th scope="col" className="py-3.5 px-4">Head of Department</th>
                <th scope="col" className="py-3.5 px-4 text-right">Department Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rule)] text-sm">
              {nbaDepts.map((dept) => (
                <tr key={dept.code} className="hover:bg-[var(--surface)]/60 transition-colors">
                  <td className="py-4 px-4 font-mono text-xs font-semibold text-[var(--ruby)]">
                    {dept.deptNumber} · {dept.shortName}
                  </td>
                  <td className="py-4 px-4 font-semibold text-[var(--ink)]">
                    B.Tech in {dept.name}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[var(--muted)] tabular-nums">
                    {dept.establishedYear}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[var(--ink)] tabular-nums">
                    {dept.intakeLabel}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[var(--ink)] tabular-nums">
                    {dept.facultyCount}
                  </td>
                  <td className="py-4 px-4 text-xs text-[var(--muted)]">{dept.hodName}</td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      href={`/departments/${dept.code}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
