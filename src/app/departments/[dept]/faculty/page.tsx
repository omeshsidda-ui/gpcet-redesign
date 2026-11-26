import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFacultyRoster } from '@/lib/data/faculty.js';
import { getEnrichedDepartment } from '@/lib/institutional-content';
import FacultyRosterTable, { type FacultyMemberItem } from '@/components/departments/FacultyRosterTable';

interface FacultyDirectoryPageProps {
  params: Promise<{ dept: string }>;
}

export async function generateMetadata({ params }: FacultyDirectoryPageProps): Promise<Metadata> {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);
  if (!department) return { title: 'Faculty Directory' };
  return {
    title: `Faculty Directory — ${department.shortName}`,
    description: `Complete roster of ${department.facultyCount} faculty members in the Department of ${department.name} at GPCET Kurnool.`,
  };
}

export default async function DepartmentFacultyPage({ params }: FacultyDirectoryPageProps) {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);

  if (!department) {
    notFound();
  }

  const result = await getFacultyRoster({ department: department.code, limit: 250 });
  const faculty = result.data as FacultyMemberItem[];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[var(--rule)]">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--ink)]">
          Faculty Directory
        </h2>
        <p className="text-sm text-[var(--muted)] mt-1">
          Verified academic roster for the Department of {department.name} ({faculty.length} members).
        </p>
      </div>

      <FacultyRosterTable
        faculty={faculty}
        deptCode={department.code}
        deptName={department.name}
      />
    </div>
  );
}
