import React from 'react';
import { notFound } from 'next/navigation';
import DepartmentHeader from '@/components/departments/DepartmentHeader';
import DepartmentTabs from '@/components/departments/DepartmentTabs';
import { getEnrichedDepartment, getEnrichedDepartments } from '@/lib/institutional-content';

export async function generateStaticParams() {
  const departments = await getEnrichedDepartments();
  return departments.map((d) => ({ dept: d.code }));
}

export default async function DepartmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ dept: string }>;
}) {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);

  if (!department) {
    notFound();
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <DepartmentHeader department={department} />
      <DepartmentTabs deptCode={department.code} facultyCount={department.facultyCount} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">{children}</div>
    </div>
  );
}
