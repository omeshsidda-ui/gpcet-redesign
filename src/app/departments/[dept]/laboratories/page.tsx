import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getDepartmentMarkdownSection, getEnrichedDepartment } from '@/lib/institutional-content';

interface DeptLabsPageProps {
  params: Promise<{ dept: string }>;
}

export async function generateMetadata({ params }: DeptLabsPageProps): Promise<Metadata> {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);
  if (!department) return { title: 'Laboratories' };
  return {
    title: `Laboratories — ${department.shortName}`,
    description: `Specialized engineering laboratories and computing facilities for the Department of ${department.name} at GPCET Kurnool.`,
  };
}

export default async function DepartmentLaboratoriesPage({ params }: DeptLabsPageProps) {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);
  if (!department) notFound();

  const labMd = getDepartmentMarkdownSection(department.code, [
    'laboratories',
    'laboratories-2',
    'laboratories-3',
  ]);

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-[var(--rule)] flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--ink)]">
            Laboratories &amp; Research Facilities
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Dedicated instructional and project laboratories in the Department of {department.name}.
          </p>
        </div>
        <Link
          href="/accreditation/aicte-idea-lab"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]"
        >
          <span>AICTE IDEA Lab Prototyping Hub</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {labMd ? (
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
          <MarkdownRenderer content={labMd.content} />
        </section>
      ) : (
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8 space-y-4">
          <h3 className="font-serif text-xl font-medium text-[var(--ink)]">
            Departmental Laboratory Infrastructure
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed max-w-[68ch]">
            The Department of {department.name} maintains AICTE-compliant laboratories equipped
            with licensed engineering software suites, experimental testbeds, and high-speed
            campus network access supporting R18, R19, R20, and R23 autonomous curricula.
          </p>
          <div className="pt-2">
            <Link
              href={`/departments/${department.code}/syllabus`}
              className="text-xs font-semibold text-[var(--brand-crimson)] hover:underline"
            >
              Inspect Lab Courses in Department Syllabus →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
