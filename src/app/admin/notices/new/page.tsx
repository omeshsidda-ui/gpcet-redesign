import React from 'react';
import { NOTICE_EDITOR_ROLES, requireStaffSession } from '@/lib/auth/admin-auth';
import AdminForbidden from '@/components/admin/AdminForbidden';
import NoticeEditorForm from '@/components/admin/NoticeEditorForm';

export const dynamic = 'force-dynamic';

export default async function AdminNewNoticePage() {
  const auth = await requireStaffSession(NOTICE_EDITOR_ROLES);

  if (!auth.authorized) {
    return (
      <AdminForbidden
        userEmail={auth.session.user?.email}
        currentRole={auth.session.user?.role}
        requiredRoles={NOTICE_EDITOR_ROLES}
      />
    );
  }

  return <NoticeEditorForm mode="create" isLiveDatabase={auth.session.configured} />;
}
