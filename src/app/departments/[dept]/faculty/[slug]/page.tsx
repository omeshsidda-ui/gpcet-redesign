import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFacultyRoster, getFacultyBySlug } from '@/lib/data/faculty.js';
import { getCleanedContent, getEnrichedDepartment } from '@/lib/institutional-content';
import FacultyProfileView from '@/components/departments/FacultyProfileView';
import type { FacultyMemberItem } from '@/components/departments/FacultyRosterTable';

interface FacultyProfilePageProps {
  params: Promise<{ dept: string; slug: string }>;
}

export async function generateStaticParams() {
  const result = await getFacultyRoster({ department: 'all', limit: 1000 });
  const list = result.data as FacultyMemberItem[];
  return list.map((f) => ({
    dept: f.departmentCode,
    slug: f.slug,
  }));
}

async function resolveFacultyRecord(dept: string, slug: string): Promise<FacultyMemberItem | null> {
  const deptRoster = await getFacultyRoster({ department: dept, limit: 250 });
  const exactMatch = (deptRoster.data as FacultyMemberItem[]).find(
    (f) => f.slug.toLowerCase() === slug.toLowerCase()
  );
  if (exactMatch) return exactMatch;

  const fallback = (await getFacultyBySlug(slug)) as FacultyMemberItem | null;
  if (fallback && fallback.departmentCode === dept.toLowerCase()) {
    return fallback;
  }
  return null;
}

export async function generateMetadata({ params }: FacultyProfilePageProps): Promise<Metadata> {
  const { dept, slug } = await params;
  const faculty = await resolveFacultyRecord(dept, slug);
  if (!faculty) return { title: 'Scholar Profile' };
  return {
    title: `${faculty.name} — ${faculty.designation}`,
    description: `Scholar dossier for ${faculty.name}, ${faculty.designation} in the Department of ${faculty.department} at GPCET Kurnool.`,
  };
}

export default async function FacultyProfilePage({ params }: FacultyProfilePageProps) {
  const { dept, slug } = await params;
  const [department, faculty] = await Promise.all([
    getEnrichedDepartment(dept),
    resolveFacultyRecord(dept, slug),
  ]);

  if (!department || !faculty) {
    notFound();
  }

  const mdDossier = getCleanedContent(['departments', department.code, 'faculty', faculty.slug]);

  return (
    <FacultyProfileView
      faculty={faculty}
      deptCode={department.code}
      deptName={department.name}
      deptEmail={department.contactEmail}
      markdownContent={mdDossier?.content || null}
    />
  );
}
