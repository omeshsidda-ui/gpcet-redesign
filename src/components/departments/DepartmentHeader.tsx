import React from 'react';
import Link from 'next/link';
import { Award, Mail, Users, Calendar } from 'lucide-react';
import type { EnrichedDepartment } from '@/lib/institutional-content';

interface DepartmentHeaderProps {
  department: EnrichedDepartment;
}

export default function DepartmentHeader({ department }: DepartmentHeaderProps) {
  return (
    <header className="section-masthead bg-[var(--surface)] border-b border-[var(--rule)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7 sm:py-9">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[13px] text-[var(--ink)]/70 flex items-center gap-2 mb-5">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/departments" className="hover:text-[var(--ink)] transition-colors">
            Departments
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-sans font-semibold text-[var(--ruby)]">
            {department.shortName}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 mb-3.5">
              <span className="font-sans text-[12px] font-semibold px-2.5 py-0.5 rounded-sm bg-[var(--surface-raised)] border border-[var(--rule)] text-[var(--ruby)] tabular-nums">
                Dept. {department.deptNumber} · {department.shortName}
              </span>
              {department.nbaAccredited && (
                <span className="inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold px-2.5 py-0.5 rounded-sm bg-[#B8860B]/10 border border-[#B8860B]/30 text-[var(--distinction-ink)]">
                  <Award className="w-3.5 h-3.5" aria-hidden="true" />
                  NBA Accredited
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 font-sans text-[12px] font-medium px-2.5 py-0.5 rounded-sm bg-[var(--surface-raised)] border border-[var(--rule)] text-[var(--ink)]/80 tabular-nums">
                <Calendar className="w-3.5 h-3.5 text-[var(--muted)]" aria-hidden="true" />
                Estd. {department.establishedYear}
              </span>
            </div>

            <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
              Department of {department.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-[var(--ink)]/80">
              <span className="inline-flex items-center gap-1.5 text-[var(--ink)] font-medium">
                <Users className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />
                HOD: {department.hodName} ({department.hodDesignation})
              </span>
              <a
                href={`mailto:${department.contactEmail}`}
                className="inline-flex items-center gap-1.5 hover:text-[var(--ruby)] underline underline-offset-4 decoration-[var(--rule)] hover:decoration-[var(--ruby)]"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {department.contactEmail}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-wrap items-start justify-between gap-x-8 gap-y-4 pt-5 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-7">
            <div>
              <div className="text-[18px] sm:text-xl font-semibold text-[var(--ink)] tabular-nums leading-snug whitespace-nowrap">
                {department.intakeLabel}
              </div>
              <div className="text-[12.5px] text-[var(--ink)]/70 mt-1">Annual Intake</div>
            </div>
            <div>
              <div className="text-[18px] sm:text-xl font-semibold text-[var(--ruby)] tabular-nums leading-snug">
                {department.facultyCount}
              </div>
              <div className="text-[12.5px] text-[var(--ink)]/70 mt-1">Faculty</div>
            </div>
            <div>
              <div className="text-[18px] sm:text-xl font-semibold text-[var(--ink)] leading-snug whitespace-nowrap">
                {department.degrees}
              </div>
              <div className="text-[12.5px] text-[var(--ink)]/70 mt-1">Programs</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
