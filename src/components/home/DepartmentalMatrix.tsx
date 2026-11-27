'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronUp, Users, Mail, BookOpen, FlaskConical, FileText, X } from 'lucide-react';
import type { EnrichedDepartment } from '@/lib/institutional-content';

interface DepartmentalMatrixProps {
  departments: EnrichedDepartment[];
}

export default function DepartmentalMatrix({ departments }: DepartmentalMatrixProps) {
  const [selectedDept, setSelectedDept] = useState<EnrichedDepartment | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDept(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const totalFaculty = departments.reduce((sum, d) => sum + d.facultyCount, 0);

  return (
    <section
      aria-labelledby="departments-register-heading"
      className="bg-[var(--bg)] py-16 sm:py-20 border-b border-[var(--rule)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header organized along the 42% axis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b border-[var(--rule)] items-end">
          <div className="lg:col-span-5">
            <h2
              id="departments-register-heading"
              className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[var(--ink)]"
            >
              Academic Departments
            </h2>
            <p className="mt-2.5 text-[15px] text-[var(--muted)] leading-relaxed">
              Eight autonomous disciplines uniting foundational sciences, core engineering, and management.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[13.5px] text-[var(--muted)] tabular-nums">
              <span>
                <strong className="font-semibold text-[var(--ink)]">{departments.length}</strong> Disciplines
              </span>
              <span>
                <strong className="font-semibold text-[var(--ink)]">{totalFaculty}</strong> Verified Faculty
              </span>
              <span>
                <strong className="font-semibold text-[var(--ruby)]">5</strong> NBA Accredited
              </span>
            </div>

            <Link
              href="/departments"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] underline underline-offset-4 decoration-[var(--ruby)]/30 hover:decoration-[var(--brand-crimson)] transition-colors"
            >
              <span>Full Departmental Directory</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Desktop Monolithic Tabular Register */}
        <div className="hidden md:block overflow-x-auto bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--surface)] border-b border-[var(--rule)] text-[13px] font-semibold text-[var(--ink)]">
                <th scope="col" className="py-3.5 px-4">Code</th>
                <th scope="col" className="py-3.5 px-4">Department</th>
                <th scope="col" className="py-3.5 px-4">Degrees</th>
                <th scope="col" className="py-3.5 px-4">Intake</th>
                <th scope="col" className="py-3.5 px-4">Faculty</th>
                <th scope="col" className="py-3.5 px-4">Accreditation</th>
                <th scope="col" className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rule)] text-[14px]">
              {departments.map((dept) => {
                const isSelected = selectedDept?.code === dept.code;
                return (
                  <tr
                    key={dept.code}
                    className={`transition-colors ${
                      isSelected ? 'bg-[var(--surface)]' : 'hover:bg-[var(--surface)]/55'
                    }`}
                  >
                    <td className="py-4 px-4 font-sans text-[13px] font-semibold tracking-[0.04em] text-[var(--ruby)] tabular-nums whitespace-nowrap">
                      {dept.deptNumber} · <span className="font-mono">{dept.shortName}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        href={`/departments/${dept.code}`}
                        className="text-[15px] font-semibold text-[var(--ink)] hover:text-[var(--ruby)] transition-colors"
                      >
                        {dept.name}
                      </Link>
                      <div className="text-[13px] text-[var(--muted)] mt-0.5">
                        HOD: {dept.hodName} · Estd.{' '}
                        <span className="font-sans tabular-nums">{dept.establishedYear}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[13.5px] text-[var(--ink)] whitespace-nowrap">
                      {dept.degrees}
                    </td>
                    <td className="py-4 px-4 font-sans text-[13.5px] text-[var(--ink)] tabular-nums whitespace-nowrap">
                      {dept.intakeLabel}
                    </td>
                    <td className="py-4 px-4 font-sans text-[13.5px] text-[var(--ink)] tabular-nums whitespace-nowrap">
                      <Link
                        href={`/departments/${dept.code}/faculty`}
                        className="hover:text-[var(--ruby)] underline decoration-[var(--rule)] underline-offset-4"
                      >
                        {dept.facultyCount} Members
                      </Link>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-sm font-sans text-xs font-medium border ${
                          dept.nbaAccredited
                            ? 'bg-[#B8860B]/10 text-[var(--distinction-ink)] border-[#B8860B]/30'
                            : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--rule)]'
                        }`}
                      >
                        {dept.nbaStatusLabel}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedDept(isSelected ? null : dept)}
                          aria-expanded={isSelected}
                          aria-controls="dept-quick-drawer"
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-medium rounded-sm border transition-colors ${
                            isSelected
                              ? 'border-[var(--ruby)] bg-[var(--surface-raised)] text-[var(--ruby)]'
                              : 'border-[var(--rule)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--ruby)] hover:bg-[var(--surface)]'
                          }`}
                        >
                          <span>Quick View</span>
                          {isSelected ? (
                            <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                        </button>
                        <Link
                          href={`/departments/${dept.code}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-[13px] font-semibold rounded-sm bg-[var(--ruby)] hover:bg-[var(--burgundy)] text-white transition-colors"
                        >
                          <span>Portal</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Structured Register List (No clipped tables) */}
        <div className="md:hidden mt-8 divide-y divide-[var(--rule)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm bg-[var(--surface-raised)]">
          {departments.map((dept) => {
            const isSelected = selectedDept?.code === dept.code;
            return (
              <div key={dept.code} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-sans text-xs font-semibold tracking-[0.04em] text-[var(--ruby)] tabular-nums">
                      {dept.deptNumber} · <span className="font-mono">{dept.shortName}</span>
                    </span>
                    <h3 className="font-serif text-lg font-medium text-[var(--ink)] mt-0.5 leading-snug">
                      <Link href={`/departments/${dept.code}`}>{dept.name}</Link>
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 font-sans text-[11px] font-semibold tracking-[0.05em] px-2 py-0.5 rounded-sm border ${
                      dept.nbaAccredited
                        ? 'bg-[#B8860B]/10 text-[var(--distinction-ink)] border-[#B8860B]/30'
                        : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--rule)]'
                    }`}
                  >
                    {dept.nbaAccredited ? 'NBA' : dept.shortName}
                  </span>
                </div>

                <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[var(--muted)] font-sans tabular-nums">
                  <span>{dept.degrees}</span>
                  <span>Intake: {dept.intakeLabel}</span>
                  <span>{dept.facultyCount} Faculty</span>
                </div>

                <div className="mt-3.5 flex items-center gap-2">
                  <Link
                    href={`/departments/${dept.code}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-[13px] font-semibold rounded-sm bg-[var(--ruby)] text-white"
                  >
                    Open Portal
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedDept(isSelected ? null : dept)}
                    aria-expanded={isSelected}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium rounded-sm border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)]"
                  >
                    HOD &amp; Summary
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accessible Quick-View HOD & Summary Dossier Drawer */}
        {selectedDept && (
          <div
            id="dept-quick-drawer"
            role="region"
            aria-label={`${selectedDept.name} quick summary`}
            className="mt-5 p-6 sm:p-7 bg-[var(--surface)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm"
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--rule)]">
              <div>
                <div className="font-sans text-xs text-[var(--ruby)] font-semibold tracking-[0.04em] tabular-nums">
                  <span className="font-mono">{selectedDept.shortName}</span> · Estd. {selectedDept.establishedYear}
                </div>
                <h3 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] mt-1 leading-snug">
                  {selectedDept.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDept(null)}
                aria-label="Close department quick view"
                className="p-2 rounded-sm border border-[var(--rule)] bg-[var(--surface-raised)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)]/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
              <div className="lg:col-span-7 space-y-3">
                <div>
                  <div className="font-sans text-xs font-semibold tracking-wide text-[var(--muted)]">
                    Department Vision
                  </div>
                  <p className="text-[15px] text-[var(--ink)] leading-relaxed mt-1.5 max-w-[66ch]">
                    {selectedDept.vision}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-[13px] text-[var(--muted)]">
                  <span className="inline-flex items-center gap-1.5 text-[var(--ink)] font-medium">
                    <Users className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
                    Head of Department: {selectedDept.hodName} ({selectedDept.hodDesignation})
                  </span>
                  <a
                    href={`mailto:${selectedDept.contactEmail}`}
                    className="inline-flex items-center gap-1.5 hover:text-[var(--ruby)] underline underline-offset-4 decoration-[var(--rule)] hover:decoration-[var(--ruby)]"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    {selectedDept.contactEmail}
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 self-start">
                <Link
                  href={`/departments/${selectedDept.code}/faculty`}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-sm border border-[var(--rule)] bg-[var(--surface-raised)] hover:border-[var(--ruby)] text-[13px] font-semibold text-[var(--ink)] transition-colors"
                >
                  <Users className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />
                  <span>Faculty ({selectedDept.facultyCount})</span>
                </Link>
                <Link
                  href={`/departments/${selectedDept.code}/laboratories`}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-sm border border-[var(--rule)] bg-[var(--surface-raised)] hover:border-[var(--ruby)] text-[13px] font-semibold text-[var(--ink)] transition-colors"
                >
                  <FlaskConical className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />
                  <span>Laboratories</span>
                </Link>
                <Link
                  href={`/departments/${selectedDept.code}/board-of-studies`}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-sm border border-[var(--rule)] bg-[var(--surface-raised)] hover:border-[var(--ruby)] text-[13px] font-semibold text-[var(--ink)] transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />
                  <span>Board of Studies</span>
                </Link>
                <Link
                  href={`/departments/${selectedDept.code}/syllabus`}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-sm border border-[var(--rule)] bg-[var(--surface-raised)] hover:border-[var(--ruby)] text-[13px] font-semibold text-[var(--ink)] transition-colors"
                >
                  <FileText className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
                  <span>Syllabus &amp; R20</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
