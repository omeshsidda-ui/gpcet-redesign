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
        <header className="pb-6 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[var(--ink)]">
              Academic Departments &amp; Faculties
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[var(--muted)] max-w-[66ch]">
              Eight autonomous academic departments delivering AICTE-approved UG &amp; PG programs
              affiliated with JNTU Anantapur, supported by {totalFaculty} verified faculty scholars.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-4 pt-4 lg:pt-0 lg:border-l lg:border-[var(--rule)] lg:pl-6 font-mono tabular-nums">
            <div>
              <div className="text-xl font-bold text-[var(--ink)]">{departments.length}</div>
              <div className="text-[11px] text-[var(--muted)] font-sans">Departments</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--primary-navy)]">{totalFaculty}</div>
              <div className="text-[11px] text-[var(--muted)] font-sans">Faculty Roster</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--brass-gold)]">5</div>
              <div className="text-[11px] text-[var(--muted)] font-sans">NBA Programs</div>
            </div>
          </div>
        </header>

        {/* Monolithic Department Register */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)] rounded-md overflow-hidden">
          {departments.map((dept) => (
            <article
              key={dept.code}
              className="bg-[var(--surface-raised)] p-6 sm:p-7 flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-[var(--primary-navy)] tabular-nums">
                    CODE {dept.deptNumber} · {dept.shortName} · ESTD. {dept.establishedYear}
                  </span>
                  {dept.nbaAccredited && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-[#B8860B]/10 border border-[#B8860B]/30 text-[var(--brass-gold)]">
                      <Award className="w-3 h-3" aria-hidden="true" />
                      NBA
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-2xl font-medium text-[var(--ink)] mt-2">
                  <Link
                    href={`/departments/${dept.code}`}
                    className="hover:text-[var(--brand-crimson)] transition-colors"
                  >
                    {dept.name}
                  </Link>
                </h2>

                <p className="text-sm text-[var(--muted)] leading-relaxed mt-2">{dept.vision}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[var(--rule)]">
                <div className="grid grid-cols-3 gap-3 font-mono text-xs tabular-nums">
                  <div>
                    <div className="font-semibold text-[var(--ink)]">{dept.degrees}</div>
                    <div className="text-[11px] text-[var(--muted)] font-sans">Programs</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--ink)]">{dept.intakeLabel}</div>
                    <div className="text-[11px] text-[var(--muted)] font-sans">Intake</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--primary-navy)]">
                      {dept.facultyCount} Members
                    </div>
                    <div className="text-[11px] text-[var(--muted)] font-sans">Faculty</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                    <Users className="w-3.5 h-3.5 text-[var(--primary-navy)]" aria-hidden="true" />
                    HOD: <strong className="text-[var(--ink)]">{dept.hodName}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/departments/${dept.code}/faculty`}
                      className="px-2.5 py-1.5 rounded border border-[var(--rule)] bg-[var(--surface)] hover:bg-[var(--bg)] font-semibold text-[var(--ink)] transition-colors"
                    >
                      Faculty
                    </Link>
                    <Link
                      href={`/departments/${dept.code}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[var(--primary-navy)] hover:bg-[#08192e] text-white font-semibold transition-colors"
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
