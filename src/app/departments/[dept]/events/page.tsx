import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getDepartmentMarkdownSection, getEnrichedDepartment } from '@/lib/institutional-content';

interface DeptEventsPageProps {
  params: Promise<{ dept: string }>;
}

export async function generateMetadata({ params }: DeptEventsPageProps): Promise<Metadata> {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);
  if (!department) return { title: 'Events & Student Activities' };
  return {
    title: `Events & Activities — ${department.shortName}`,
    description: `Technical workshops, guest lectures, symposia, and student club activities in the Department of ${department.name}.`,
  };
}

export default async function DepartmentEventsPage({ params }: DeptEventsPageProps) {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);
  if (!department) notFound();

  const eventsMd = getDepartmentMarkdownSection(department.code, [
    'events-2',
    'events',
    'events-3',
  ]);
  const activitiesMd = getDepartmentMarkdownSection(department.code, [
    'student-activities',
    'student-activities-2',
    'student-activities-3',
  ]);

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-[var(--rule)]">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--ink)]">
          Events, Workshops &amp; Student Activities
        </h2>
        <p className="text-sm text-[var(--muted)] mt-1">
          Seminars, technical symposia, guest lectures, and professional chapter events organized by{' '}
          {department.name}.
        </p>
      </div>

      {eventsMd && (
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
          <h3 className="font-serif text-xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
            Departmental Events &amp; Workshops
          </h3>
          <MarkdownRenderer content={eventsMd.content} />
        </section>
      )}

      {activitiesMd && (
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
          <h3 className="font-serif text-xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
            Student Associations &amp; Co-Curricular Initiatives
          </h3>
          <MarkdownRenderer content={activitiesMd.content} />
        </section>
      )}

      {!eventsMd && !activitiesMd && (
        <section className="bg-[var(--surface)] border border-[var(--rule)] rounded-md p-6">
          <p className="text-sm text-[var(--muted)]">
            Departmental technical symposia, hackathons, and workshops are announced through the
            Institutional Gazette and Student Chapters portal.
          </p>
        </section>
      )}
    </div>
  );
}
