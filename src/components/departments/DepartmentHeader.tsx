import React from 'react';
import Link from 'next/link';
import { Award, Mail, Users, Calendar } from 'lucide-react';
import type { EnrichedDepartment } from '@/lib/institutional-content';

interface DepartmentHeaderProps {
  department: EnrichedDepartment;
}

export default function DepartmentHeader({ department }: DepartmentHeaderProps) {
  return (
    <header className="bg-[var(--surface-raised)] border-b border-[var(--rule)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-[var(--muted)] flex items-center gap-2 mb-4">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/departments" className="hover:text-[var(--ink)] transition-colors">
            Departments
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-mono font-semibold text-[var(--primary-navy)]">
            {department.shortName}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--rule)] text-[var(--primary-navy)] tabular-nums">
                DEPT {department.deptNumber} · {department.shortName}
              </span>
              {department.nbaAccredited && (
                <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2 py-0.5 rounded-sm bg-[#B8860B]/10 border border-[#B8860B]/30 text-[var(--brass-gold)]">
                  <Award className="w-3.5 h-3.5" aria-hidden="true" />
                  NBA Accredited
                </span>
              )}
              <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--muted)] tabular-nums">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                Estd. {department.establishedYear}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[var(--ink)]">
              Department of {department.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5 text-[var(--ink)] font-medium">
                <Users className="w-3.5 h-3.5 text-[var(--primary-navy)]" aria-hidden="true" />
                HOD: {department.hodName} ({department.hodDesignation})
              </span>
              <a
                href={`mailto:${department.contactEmail}`}
                className="inline-flex items-center gap-1.5 hover:text-[var(--brand-crimson)] underline underline-offset-2"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                {department.contactEmail}
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-3 gap-3 pt-4 lg:pt-0 lg:border-l lg:border-[var(--rule)] lg:pl-6 font-mono tabular-nums">
            <div>
              <div className="text-lg font-bold text-[var(--ink)]">{department.intakeLabel}</div>
              <div className="text-[11px] text-[var(--muted)] font-sans">Annual Intake</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--primary-navy)]">
                {department.facultyCount}
              </div>
              <div className="text-[11px] text-[var(--muted)] font-sans">Faculty</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--ink)]">{department.degrees}</div>
              <div className="text-[11px] text-[var(--muted)] font-sans">Programs</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
