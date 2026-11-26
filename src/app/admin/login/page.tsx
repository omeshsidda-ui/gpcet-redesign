import React from 'react';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getAdminSession } from '@/lib/auth/admin-auth';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import AdminForbidden from '@/components/admin/AdminForbidden';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Staff Sign In',
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session.authenticated && session.isStaff) {
    redirect('/admin');
  }

  if (session.authenticated && !session.isStaff) {
    return (
      <AdminForbidden
        userEmail={session.user?.email}
        currentRole={session.user?.role}
        requiredRoles={['admin', 'editor', 'hod', 'counselor']}
      />
    );
  }

  return (
    <div className="px-4 sm:px-6 py-12 sm:py-16">
      <AdminLoginForm supabaseConfigured={session.configured} />
    </div>
  );
}
