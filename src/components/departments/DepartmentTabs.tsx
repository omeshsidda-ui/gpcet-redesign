'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DepartmentTabsProps {
  deptCode: string;
  facultyCount: number;
}

export default function DepartmentTabs({ deptCode, facultyCount }: DepartmentTabsProps) {
  const pathname = usePathname();
  const basePath = `/departments/${deptCode}`;

  const tabs = [
    { label: 'Overview', href: basePath, exact: true },
    { label: `Faculty Directory (${facultyCount})`, href: `${basePath}/faculty`, exact: false },
    { label: 'Laboratories', href: `${basePath}/laboratories`, exact: false },
    { label: 'Board of Studies', href: `${basePath}/board-of-studies`, exact: false },
    { label: 'Syllabus', href: `${basePath}/syllabus`, exact: false },
    { label: 'Events', href: `${basePath}/events`, exact: false },
  ];

  return (
    <nav
      aria-label="Department sections"
      className="sticky top-20 z-30 bg-[var(--surface)] border-b border-[var(--rule)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max py-1">
          {tabs.map((tab) => {
            const isActive = tab.exact
              ? pathname === tab.href
              : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3.5 py-2.5 text-xs sm:text-[13px] font-semibold rounded-sm transition-colors whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-[var(--brand-crimson)] text-[var(--ink)] bg-[var(--surface-raised)]'
                    : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)]/60'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
