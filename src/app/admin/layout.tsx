import React from 'react';
import type { Metadata } from 'next';
import { getAdminSession } from '@/lib/auth/admin-auth';
import AdminSidebarNav from '@/components/admin/AdminSidebarNav';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Staff CMS & Governance',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAdminSession();

  // CRITICAL: Do NOT redirect inside admin/layout.tsx because this layout wraps /admin/login.
  // Unauthenticated or non-staff requests pass through to child routes where /admin/login
  // renders HTTP 200 cleanly and protected pages invoke requireStaffSession().
  if (!session.authenticated || !session.isStaff || !session.user?.staffRole) {
    return (
      <div className="min-h-[calc(100vh-14rem)] bg-[var(--bg)]">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-14rem)] bg-[var(--bg)] flex flex-col lg:flex-row">
      <AdminSidebarNav
        userEmail={session.user.email}
        staffRole={session.user.staffRole}
        departmentCode={session.user.departmentCode}
        configured={session.configured}
      />
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
