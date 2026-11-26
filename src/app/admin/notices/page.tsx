import React from 'react';
import { NOTICE_EDITOR_ROLES, requireStaffSession } from '@/lib/auth/admin-auth';
import { createServerClient } from '@/lib/supabase/server';
import { getActiveNotices } from '@/lib/data/notices.js';
import AdminForbidden from '@/components/admin/AdminForbidden';
import NoticeListClient, { type AdminNoticeItem } from '@/components/admin/NoticeListClient';

export const dynamic = 'force-dynamic';

interface SupabaseNoticeRow {
  id: string;
  department_code: string | null;
  title: string;
  slug: string;
  summary: string | null;
  category: string;
  priority: string;
  is_ticker: boolean;
  is_pinned: boolean;
  attachment_url: string | null;
  published_at: string;
  is_active: boolean;
}

export default async function AdminNoticesPage() {
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

  let notices: AdminNoticeItem[] = [];
  let isLiveDatabase = false;

  if (auth.session.configured) {
    try {
      const supabase = await createServerClient();
      const { data, error } = await supabase
        .from('notices')
        .select(
          'id, department_code, title, slug, summary, category, priority, is_ticker, is_pinned, attachment_url, published_at, is_active'
        )
        .order('is_pinned', { ascending: false })
        .order('published_at', { ascending: false })
        .limit(100);

      if (!error && Array.isArray(data)) {
        isLiveDatabase = true;
        notices = (data as SupabaseNoticeRow[]).map((row) => ({
          id: row.id,
          departmentCode: row.department_code,
          title: row.title,
          slug: row.slug,
          summary: row.summary,
          category: row.category,
          priority: row.priority,
          isTicker: Boolean(row.is_ticker),
          isPinned: Boolean(row.is_pinned),
          attachmentUrl: row.attachment_url,
          publishedAt: row.published_at,
          isActive: Boolean(row.is_active),
        }));
      }
    } catch {
      isLiveDatabase = false;
    }
  }

  if (!isLiveDatabase) {
    const seedNotices = await getActiveNotices({ limit: 50 });
    notices = seedNotices.map((n: Record<string, unknown>) => ({
      id: String(n.id),
      departmentCode: (n.departmentCode as string | null) ?? null,
      title: String(n.title ?? ''),
      slug: String(n.slug ?? ''),
      summary: (n.summary as string | null) ?? null,
      category: String(n.category ?? 'circular'),
      priority: String(n.priority ?? 'normal'),
      isTicker: Boolean(n.isTicker),
      isPinned: Boolean(n.isPinned),
      attachmentUrl: (n.attachmentUrl as string | null) ?? null,
      publishedAt: String(n.publishedAt ?? new Date().toISOString()),
      isActive: true,
    }));
  }

  return <NoticeListClient initialNotices={notices} isLiveDatabase={isLiveDatabase} />;
}
