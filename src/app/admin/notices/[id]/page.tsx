import React from 'react';
import { notFound } from 'next/navigation';
import { NOTICE_EDITOR_ROLES, requireStaffSession } from '@/lib/auth/admin-auth';
import { createServerClient } from '@/lib/supabase/server';
import { getActiveNotices } from '@/lib/data/notices.js';
import AdminForbidden from '@/components/admin/AdminForbidden';
import NoticeEditorForm, {
  type NoticeEditorInitialData,
} from '@/components/admin/NoticeEditorForm';

export const dynamic = 'force-dynamic';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function AdminEditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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

  const { id } = await params;
  let initialNotice: NoticeEditorInitialData | null = null;
  let isLiveDatabase = false;

  if (auth.session.configured && UUID_REGEX.test(id)) {
    try {
      const supabase = await createServerClient();
      const { data, error } = await supabase
        .from('notices')
        .select(
          'id, department_code, title, slug, summary, content_markdown, category, priority, is_ticker, is_pinned, attachment_url, attachment_size_bytes, published_at, expires_at, is_active'
        )
        .eq('id', id)
        .single();

      if (!error && data) {
        isLiveDatabase = true;
        initialNotice = {
          id: data.id,
          departmentCode: data.department_code,
          title: data.title,
          slug: data.slug,
          summary: data.summary,
          contentMarkdown: data.content_markdown,
          category: data.category,
          priority: data.priority,
          isTicker: Boolean(data.is_ticker),
          isPinned: Boolean(data.is_pinned),
          attachmentUrl: data.attachment_url,
          attachmentSizeBytes: data.attachment_size_bytes,
          publishedAt: data.published_at,
          expiresAt: data.expires_at,
          isActive: Boolean(data.is_active),
        };
      }
    } catch {
      isLiveDatabase = false;
    }
  }

  if (!initialNotice) {
    const seedNotices = await getActiveNotices({ limit: 50 });
    const seedMatch = seedNotices.find((n: Record<string, unknown>) => String(n.id) === id);
    if (seedMatch) {
      initialNotice = {
        id: String(seedMatch.id),
        departmentCode: (seedMatch.departmentCode as string | null) ?? null,
        title: String(seedMatch.title ?? ''),
        slug: String(seedMatch.slug ?? ''),
        summary: (seedMatch.summary as string | null) ?? null,
        contentMarkdown:
          (seedMatch.contentMarkdown as string | undefined) ||
          `## ${String(seedMatch.title ?? 'Notice')}\n\n${String(seedMatch.summary ?? '')}`,
        category: String(seedMatch.category ?? 'circular'),
        priority: String(seedMatch.priority ?? 'normal'),
        isTicker: Boolean(seedMatch.isTicker),
        isPinned: Boolean(seedMatch.isPinned),
        attachmentUrl: (seedMatch.attachmentUrl as string | null) ?? null,
        attachmentSizeBytes: null,
        publishedAt: String(seedMatch.publishedAt ?? new Date().toISOString()),
        expiresAt: null,
        isActive: true,
      };
    }
  }

  if (!initialNotice) {
    notFound();
  }

  return (
    <NoticeEditorForm
      mode="edit"
      initialNotice={initialNotice}
      isLiveDatabase={isLiveDatabase}
    />
  );
}
