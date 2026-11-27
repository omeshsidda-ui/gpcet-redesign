import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, Users } from 'lucide-react';
import { getEnrichedDepartments } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'Academic Departments',
  description:
    'Explore all 8 academic departments at G. Pullaiah College of Engineering & Technology (Autonomous), Kurnool — CSE, AI & DS, ECE, EEE, ME, Civil, H&S, and MBA.',
};

export default async function DepartmentsIndexPage() {
  const departments = await getEnrichedDepartments();
  const totalFaculty = departments.reduce((sum, d) => sum + d.facultyCount, 0);

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <header className="section-masthead pb-8 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
              Academic Departments &amp; Faculties
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[64ch]">
              Eight autonomous academic departments delivering AICTE-approved UG &amp; PG programs
              affiliated with JNTU Anantapur, supported by {totalFaculty} verified faculty scholars.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-5 pt-5 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-7 font-sans tabular-nums">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ink)] tabular-nums">{departments.length}</div>
              <div className="text-xs text-[var(--muted)] mt-1">Departments</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ruby)] tabular-nums">{totalFaculty}</div>
              <div className="text-xs text-[var(--muted)] mt-1">Faculty Roster</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-normal text-[var(--distinction-ink)] tabular-nums">5</div>
              <div className="text-xs text-[var(--muted)] mt-1">NBA Programs</div>
            </div>
          </div>
        </header>

        {/* Monolithic Department Register */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm overflow-hidden">
          {departments.map((dept) => (
            <article
              key={dept.code}
              className="bg-[var(--surface-raised)] p-6 sm:p-8 flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-xs font-semibold tracking-[0.04em] text-[var(--ruby)] tabular-nums">
                    CODE {dept.deptNumber} · <span className="font-mono">{dept.shortName}</span> · ESTD. {dept.establishedYear}
                  </span>
                  {dept.nbaAccredited && (
                    <span className="inline-flex items-center gap-1 font-sans text-[11px] font-semibold tracking-[0.06em] px-2 py-0.5 rounded-sm bg-[#B8860B]/10 border border-[#B8860B]/30 text-[var(--distinction-ink)]">
                      <Award className="w-3 h-3" aria-hidden="true" />
                      NBA
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] mt-2.5 leading-snug">
                  <Link
                    href={`/departments/${dept.code}`}
                    className="hover:text-[var(--ruby)] transition-colors"
                  >
                    {dept.name}
                  </Link>
                </h2>

                <p className="text-[14.5px] text-[var(--muted)] leading-relaxed mt-2.5">
                  {dept.vision}
                </p>
              </div>

              <div className="space-y-4 pt-5 border-t border-[var(--rule)]">
                <div className="grid grid-cols-3 gap-4 font-sans text-[13px] tabular-nums">
                  <div>
                    <div className="font-semibold text-[var(--ink)]">{dept.degrees}</div>
                    <div className="text-xs text-[var(--muted)] mt-0.5">Programs</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--ink)]">{dept.intakeLabel}</div>
                    <div className="text-xs text-[var(--muted)] mt-0.5">Intake</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--ruby)]">
                      {dept.facultyCount} Members
                    </div>
                    <div className="text-xs text-[var(--muted)] mt-0.5">Faculty</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-[13px]">
                  <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                    <Users className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
                    HOD: <strong className="text-[var(--ink)] font-semibold">{dept.hodName}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/departments/${dept.code}/faculty`}
                      className="px-3 py-1.5 rounded-sm border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] hover:bg-[var(--bg)] font-semibold text-[var(--ink)] transition-colors"
                    >
                      Faculty
                    </Link>
                    <Link
                      href={`/departments/${dept.code}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[var(--ruby)] hover:bg-[var(--burgundy)] text-white font-semibold transition-colors"
                    >
                      <span>Open Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
