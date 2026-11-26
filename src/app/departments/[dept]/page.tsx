import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getDepartmentMarkdownSection, getEnrichedDepartment } from '@/lib/institutional-content';

interface DeptOverviewProps {
  params: Promise<{ dept: string }>;
}

export async function generateMetadata({ params }: DeptOverviewProps): Promise<Metadata> {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);
  if (!department) return { title: 'Department Not Found' };
  return {
    title: `Department of ${department.name}`,
    description: `Overview, Vision, Mission, PEOs, Faculty, Laboratories, and Syllabus for the Department of ${department.name} at GPCET Kurnool.`,
  };
}

export default async function DepartmentOverviewPage({ params }: DeptOverviewProps) {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);

  if (!department) {
    notFound();
  }

  const overviewMarkdown = getDepartmentMarkdownSection(department.code, [
    'index-2',
    'index',
    'index-3',
    'index-4',
    'civil-vision',
  ]);
  const peoMarkdown = getDepartmentMarkdownSection(department.code, ['peos-2', 'peos']);

  return (
    <div className="space-y-10">
      {/* Vision & Mission Editorial Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
        <div className="lg:col-span-5 lg:border-r lg:border-[var(--rule)] lg:pr-8">
          <h2 className="font-serif text-2xl font-medium text-[var(--ink)]">Department Vision</h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--ink)]">{department.vision}</p>
        </div>

        <div className="lg:col-span-7">
          <h2 className="font-serif text-2xl font-medium text-[var(--ink)]">Department Mission</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-[var(--muted)] leading-relaxed list-disc pl-5">
            {department.mission.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick Sub-Portal Navigation Register */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--rule)] border border-[var(--rule)] rounded-md overflow-hidden">
        <Link
          href={`/departments/${department.code}/faculty`}
          className="bg-[var(--surface-raised)] hover:bg-[var(--surface)] p-5 transition-colors flex flex-col justify-between gap-3"
        >
          <div>
            <div className="font-mono text-xs text-[var(--ruby)] font-semibold tabular-nums">
              {department.facultyCount} RECORDS
            </div>
            <div className="font-serif text-lg font-medium text-[var(--ink)] mt-1">
              Faculty Directory
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-crimson)]">
            Browse Roster <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </Link>

        <Link
          href={`/departments/${department.code}/laboratories`}
          className="bg-[var(--surface-raised)] hover:bg-[var(--surface)] p-5 transition-colors flex flex-col justify-between gap-3"
        >
          <div>
            <div className="font-mono text-xs text-[var(--ruby)] font-semibold">
              INFRASTRUCTURE
            </div>
            <div className="font-serif text-lg font-medium text-[var(--ink)] mt-1">
              Laboratories &amp; Facilities
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-crimson)]">
            Inspect Labs <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </Link>

        <Link
          href={`/departments/${department.code}/board-of-studies`}
          className="bg-[var(--surface-raised)] hover:bg-[var(--surface)] p-5 transition-colors flex flex-col justify-between gap-3"
        >
          <div>
            <div className="font-mono text-xs text-[var(--ruby)] font-semibold">
              AUTONOMOUS GOVERNANCE
            </div>
            <div className="font-serif text-lg font-medium text-[var(--ink)] mt-1">
              Board of Studies (BoS)
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-crimson)]">
            View Members <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </Link>

        <Link
          href={`/departments/${department.code}/syllabus`}
          className="bg-[var(--surface-raised)] hover:bg-[var(--surface)] p-5 transition-colors flex flex-col justify-between gap-3"
        >
          <div>
            <div className="font-mono text-xs text-[var(--ruby)] font-semibold">
              R18 – R26 SERIES
            </div>
            <div className="font-serif text-lg font-medium text-[var(--ink)] mt-1">
              Curriculum &amp; Syllabus
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-crimson)]">
            Download PDFs <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </Link>
      </section>

      {/* Authentic Department Markdown Overview */}
      {overviewMarkdown && (
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
            Department Profile &amp; Academic Facilities
          </h2>
          <MarkdownRenderer content={overviewMarkdown.content} />
        </section>
      )}

      {/* PEOs / POs / PSOs */}
      {peoMarkdown && (
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
            Program Educational Objectives (PEOs) &amp; Outcomes (POs / PSOs)
          </h2>
          <MarkdownRenderer content={peoMarkdown.content} />
        </section>
      )}
    </div>
  );
}
