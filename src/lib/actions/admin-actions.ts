'use server';

import { cookies, headers } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';
import {
  CMS_LAST_SYNC_COOKIE,
  CMS_MODE_COOKIE,
  CUTOVER_ADMIN_ROLES,
  FACULTY_EDITOR_ROLES,
  NOTICE_EDITOR_ROLES,
  type CmsSyncMode,
  isSupabasePublicConfigured,
  requireStaffSession,
} from '@/lib/auth/admin-auth';
import { NoticeCreateSchema } from '@/lib/validations/notice.schema.js';
import { DepartmentCodeEnum, FacultyCadreEnum } from '@/lib/validations/faculty.schema.js';

export type ActionResult<T = unknown> =
  | {
      success: true;
      message: string;
      data?: T;
    }
  | {
      success: false;
      status: number;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

export interface NoticeMutationInput {
  departmentCode?: string | null;
  title: string;
  slug?: string;
  summary?: string | null;
  contentMarkdown: string;
  category: string;
  priority: string;
  isTicker: boolean;
  isPinned: boolean;
  attachmentUrl?: string | null;
  attachmentSizeBytes?: number | null;
  publishedAt?: string;
  expiresAt?: string | null;
  isActive?: boolean;
}

export interface FacultyUpdateInput {
  id: string;
  departmentCode?: string;
  designation: string;
  cadre: string;
  highestQualification: string;
  experienceYears?: number;
  isHod?: boolean;
  isActive: boolean;
}

const FacultyUpdateSchema = z.object({
  id: z.string().trim().min(1, 'Faculty record ID is required'),
  departmentCode: DepartmentCodeEnum.optional(),
  designation: z.string().trim().min(2, 'Designation must be at least 2 characters').max(150),
  cadre: FacultyCadreEnum,
  highestQualification: z.string().trim().max(255).default(''),
  experienceYears: z.coerce.number().min(0).max(60).optional(),
  isHod: z.boolean().optional(),
  isActive: z.boolean(),
});

const CmsModeSchema = z.enum(['scraper', 'native']);

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * CSRF protection for Server Actions: verifies request Origin/Referer matches Host header.
 */
async function verifyCsrfOrigin(): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const headerStore = await headers();
    const rawHost = headerStore.get('x-forwarded-host') || headerStore.get('host');
    const host = rawHost?.split(',')[0]?.trim().toLowerCase();

    if (!host) {
      return { ok: false, error: 'CSRF validation failed: Missing Host header.' };
    }

    const secFetchSite = headerStore.get('sec-fetch-site')?.toLowerCase();
    if (secFetchSite && secFetchSite !== 'same-origin' && secFetchSite !== 'none') {
      return { ok: false, error: 'CSRF validation failed: Cross-site request blocked.' };
    }

    const origin = headerStore.get('origin');
    if (origin) {
      try {
        const originHost = new URL(origin).host.toLowerCase();
        if (originHost !== host) {
          return { ok: false, error: 'CSRF validation failed: Origin host mismatch.' };
        }
        return { ok: true };
      } catch {
        return { ok: false, error: 'CSRF validation failed: Malformed Origin header.' };
      }
    }

    const referer = headerStore.get('referer');
    if (referer) {
      try {
        const refererHost = new URL(referer).host.toLowerCase();
        if (refererHost !== host) {
          return { ok: false, error: 'CSRF validation failed: Referer host mismatch.' };
        }
        return { ok: true };
      } catch {
        return { ok: false, error: 'CSRF validation failed: Malformed Referer header.' };
      }
    }

    if (secFetchSite === 'same-origin') {
      return { ok: true };
    }

    return { ok: false, error: 'CSRF validation failed: Missing Origin and Referer headers.' };
  } catch {
    return { ok: false, error: 'CSRF validation failed: Unable to inspect request headers.' };
  }
}

function slugifyTitle(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
  return base || `notice-${Date.now()}`;
}

function normalizeIsoDateTime(value?: string | null): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return trimmed;
  }
  return parsed.toISOString();
}

function normalizeNoticePayload(input: NoticeMutationInput) {
  return {
    departmentCode: input.departmentCode?.trim() ? input.departmentCode.trim().toLowerCase() : null,
    title: input.title,
    slug: input.slug?.trim() ? input.slug.trim().toLowerCase() : slugifyTitle(input.title),
    summary: input.summary?.trim() ? input.summary.trim() : null,
    contentMarkdown: input.contentMarkdown,
    category: input.category,
    priority: input.priority,
    isTicker: Boolean(input.isTicker),
    isPinned: Boolean(input.isPinned),
    attachmentUrl: input.attachmentUrl?.trim() ? input.attachmentUrl.trim() : null,
    attachmentSizeBytes:
      typeof input.attachmentSizeBytes === 'number' && !Number.isNaN(input.attachmentSizeBytes)
        ? input.attachmentSizeBytes
        : null,
    publishedAt: normalizeIsoDateTime(input.publishedAt) ?? new Date().toISOString(),
    expiresAt: normalizeIsoDateTime(input.expiresAt) ?? null,
  };
}

function formatZodFieldErrors(error: z.ZodError): Record<string, string[]> {
  const flat = error.flatten();
  const fieldErrors: Record<string, string[]> = {};
  for (const [key, messages] of Object.entries(flat.fieldErrors)) {
    if (Array.isArray(messages) && messages.length > 0) {
      fieldErrors[key] = messages.map(String);
    }
  }
  return fieldErrors;
}

function revalidateNoticePaths(noticeId?: string) {
  revalidateTag('notices');
  revalidatePath('/admin/notices');
  revalidatePath('/admin');
  revalidatePath('/');
  if (noticeId) {
    revalidatePath(`/admin/notices/${noticeId}`);
  }
}

export async function createNoticeAction(
  input: NoticeMutationInput
): Promise<ActionResult<{ id: string; slug: string }>> {
  const csrf = await verifyCsrfOrigin();
  if (!csrf.ok) {
    return { success: false, status: 403, error: csrf.error };
  }

  const auth = await requireStaffSession(NOTICE_EDITOR_ROLES, {
    redirectOnUnauthenticated: false,
  });
  if (!auth.authorized) {
    return {
      success: false,
      status: auth.status,
      error:
        auth.status === 401
          ? 'Staff authentication required.'
          : 'Forbidden: Only Admin and Editor roles can publish notices.',
    };
  }

  const normalized = normalizeNoticePayload(input);
  const parsed = NoticeCreateSchema.safeParse(normalized);
  if (!parsed.success) {
    return {
      success: false,
      status: 422,
      error: 'Validation failed. Please review highlighted fields.',
      fieldErrors: formatZodFieldErrors(parsed.error),
    };
  }

  if (!isSupabasePublicConfigured()) {
    return {
      success: false,
      status: 503,
      error:
        'Supabase is not configured in this environment. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to persist new notices.',
    };
  }

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('notices')
      .insert({
        department_code: parsed.data.departmentCode ?? null,
        title: parsed.data.title,
        slug: parsed.data.slug || slugifyTitle(parsed.data.title),
        summary: parsed.data.summary ?? null,
        content_markdown: parsed.data.contentMarkdown,
        category: parsed.data.category,
        priority: parsed.data.priority,
        is_ticker: parsed.data.isTicker,
        is_pinned: parsed.data.isPinned,
        attachment_url: parsed.data.attachmentUrl ?? null,
        attachment_size_bytes: parsed.data.attachmentSizeBytes ?? null,
        published_at: parsed.data.publishedAt ?? new Date().toISOString(),
        expires_at: parsed.data.expiresAt ?? null,
        author_id: auth.session.user.id,
        is_active: input.isActive ?? true,
      })
      .select('id, slug')
      .single();

    if (error) {
      return {
        success: false,
        status: error.code === '23505' ? 409 : 400,
        error:
          error.code === '23505'
            ? 'A circular with this URL slug already exists. Choose a unique slug.'
            : `Database rejected notice creation: ${error.message}`,
      };
    }

    revalidateNoticePaths(data.id);

    return {
      success: true,
      message: 'Circular published and homepage cache invalidated.',
      data: { id: data.id, slug: data.slug },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err instanceof Error ? err.message : 'Unexpected failure creating notice.',
    };
  }
}

export async function updateNoticeAction(
  id: string,
  input: NoticeMutationInput
): Promise<ActionResult<{ id: string; slug: string }>> {
  const csrf = await verifyCsrfOrigin();
  if (!csrf.ok) {
    return { success: false, status: 403, error: csrf.error };
  }

  const auth = await requireStaffSession(NOTICE_EDITOR_ROLES, {
    redirectOnUnauthenticated: false,
  });
  if (!auth.authorized) {
    return {
      success: false,
      status: auth.status,
      error:
        auth.status === 401
          ? 'Staff authentication required.'
          : 'Forbidden: Only Admin and Editor roles can edit notices.',
    };
  }

  if (!UUID_REGEX.test(id)) {
    return {
      success: false,
      status: 400,
      error:
        'Cannot update offline preview seed records directly. Connect Supabase to edit live database circulars.',
    };
  }

  const normalized = normalizeNoticePayload(input);
  const parsed = NoticeCreateSchema.safeParse(normalized);
  if (!parsed.success) {
    return {
      success: false,
      status: 422,
      error: 'Validation failed. Please review highlighted fields.',
      fieldErrors: formatZodFieldErrors(parsed.error),
    };
  }

  if (!isSupabasePublicConfigured()) {
    return {
      success: false,
      status: 503,
      error:
        'Supabase is not configured in this environment. Configure Supabase credentials to save circular edits.',
    };
  }

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('notices')
      .update({
        department_code: parsed.data.departmentCode ?? null,
        title: parsed.data.title,
        slug: parsed.data.slug || slugifyTitle(parsed.data.title),
        summary: parsed.data.summary ?? null,
        content_markdown: parsed.data.contentMarkdown,
        category: parsed.data.category,
        priority: parsed.data.priority,
        is_ticker: parsed.data.isTicker,
        is_pinned: parsed.data.isPinned,
        attachment_url: parsed.data.attachmentUrl ?? null,
        attachment_size_bytes: parsed.data.attachmentSizeBytes ?? null,
        published_at: parsed.data.publishedAt ?? new Date().toISOString(),
        expires_at: parsed.data.expiresAt ?? null,
        is_active: input.isActive ?? true,
      })
      .eq('id', id)
      .select('id, slug')
      .single();

    if (error) {
      return {
        success: false,
        status: 400,
        error: `Failed to update circular: ${error.message}`,
      };
    }

    revalidateNoticePaths(id);

    return {
      success: true,
      message: 'Circular updated and cache tags invalidated.',
      data: { id: data.id, slug: data.slug },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err instanceof Error ? err.message : 'Unexpected failure updating notice.',
    };
  }
}

export async function toggleNoticeTickerAction(
  id: string,
  isTicker: boolean
): Promise<ActionResult<{ id: string; isTicker: boolean }>> {
  const csrf = await verifyCsrfOrigin();
  if (!csrf.ok) {
    return { success: false, status: 403, error: csrf.error };
  }

  const auth = await requireStaffSession(NOTICE_EDITOR_ROLES, {
    redirectOnUnauthenticated: false,
  });
  if (!auth.authorized) {
    return {
      success: false,
      status: auth.status,
      error:
        auth.status === 401
          ? 'Staff authentication required.'
          : 'Forbidden: Only Admin and Editor roles can toggle ticker visibility.',
    };
  }

  if (!UUID_REGEX.test(id)) {
    return {
      success: false,
      status: 400,
      error: 'Ticker toggles require a live Supabase notice record (offline seed items are read-only).',
    };
  }

  if (!isSupabasePublicConfigured()) {
    return {
      success: false,
      status: 503,
      error: 'Supabase is not configured. Unable to persist ticker changes.',
    };
  }

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('notices')
      .update({ is_ticker: Boolean(isTicker) })
      .eq('id', id)
      .select('id, is_ticker')
      .single();

    if (error) {
      return {
        success: false,
        status: 400,
        error: `Failed to update ticker state: ${error.message}`,
      };
    }

    revalidateNoticePaths(id);

    return {
      success: true,
      message: data.is_ticker
        ? 'Notice pinned to homepage ticker.'
        : 'Notice removed from homepage ticker.',
      data: { id: data.id, isTicker: data.is_ticker },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err instanceof Error ? err.message : 'Unexpected error toggling ticker.',
    };
  }
}

export async function updateFacultyAction(
  input: FacultyUpdateInput
): Promise<ActionResult<{ id: string }>> {
  const csrf = await verifyCsrfOrigin();
  if (!csrf.ok) {
    return { success: false, status: 403, error: csrf.error };
  }

  const auth = await requireStaffSession(FACULTY_EDITOR_ROLES, {
    redirectOnUnauthenticated: false,
  });
  if (!auth.authorized) {
    return {
      success: false,
      status: auth.status,
      error:
        auth.status === 401
          ? 'Staff authentication required.'
          : 'Forbidden: Only Admin, Editor, and HOD roles can modify faculty records.',
    };
  }

  const parsed = FacultyUpdateSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      status: 422,
      error: 'Invalid faculty update payload.',
      fieldErrors: formatZodFieldErrors(parsed.error),
    };
  }

  // Scope HOD edits to their assigned department if departmentCode metadata is bound
  if (
    auth.session.user.staffRole === 'hod' &&
    auth.session.user.departmentCode &&
    parsed.data.departmentCode &&
    parsed.data.departmentCode !== auth.session.user.departmentCode
  ) {
    return {
      success: false,
      status: 403,
      error: `Forbidden: HOD accounts may only edit faculty within their assigned department (${auth.session.user.departmentCode.toUpperCase()}).`,
    };
  }

  if (!UUID_REGEX.test(parsed.data.id)) {
    return {
      success: false,
      status: 400,
      error:
        'Offline JSON roster records are read-only until seeded into Supabase PostgreSQL (`npm run seed:generate`).',
    };
  }

  if (!isSupabasePublicConfigured()) {
    return {
      success: false,
      status: 503,
      error: 'Supabase is not configured. Faculty updates cannot be persisted.',
    };
  }

  try {
    const supabase = await createServerClient();
    const updateFields: Record<string, unknown> = {
      designation: parsed.data.designation,
      cadre: parsed.data.cadre,
      highest_qualification: parsed.data.highestQualification,
      is_active: parsed.data.isActive,
    };

    if (typeof parsed.data.experienceYears === 'number') {
      updateFields.experience_years = parsed.data.experienceYears;
    }
    if (typeof parsed.data.isHod === 'boolean') {
      updateFields.is_hod = parsed.data.isHod;
    }

    const { data, error } = await supabase
      .from('faculty')
      .update(updateFields)
      .eq('id', parsed.data.id)
      .select('id')
      .single();

    if (error) {
      return {
        success: false,
        status: 400,
        error: `Failed to update faculty profile: ${error.message}`,
      };
    }

    revalidateTag('faculty');
    revalidatePath('/admin/faculty');
    revalidatePath('/admin');
    revalidatePath('/');

    return {
      success: true,
      message: 'Faculty directory entry updated and cache invalidated.',
      data: { id: data.id },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err instanceof Error ? err.message : 'Unexpected failure updating faculty profile.',
    };
  }
}

export async function setCmsSyncModeAction(
  mode: CmsSyncMode
): Promise<ActionResult<{ mode: CmsSyncMode }>> {
  const csrf = await verifyCsrfOrigin();
  if (!csrf.ok) {
    return { success: false, status: 403, error: csrf.error };
  }

  const auth = await requireStaffSession(CUTOVER_ADMIN_ROLES, {
    redirectOnUnauthenticated: false,
  });
  if (!auth.authorized) {
    return {
      success: false,
      status: auth.status,
      error:
        auth.status === 401
          ? 'Staff authentication required.'
          : 'Forbidden: Only Super-Admin accounts may switch production CMS cutover mode.',
    };
  }

  const parsed = CmsModeSchema.safeParse(mode);
  if (!parsed.success) {
    return {
      success: false,
      status: 422,
      error: 'Invalid CMS mode. Expected "scraper" or "native".',
    };
  }

  try {
    const cookieStore = await cookies();
    cookieStore.set(CMS_MODE_COOKIE, parsed.data, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/admin',
      maxAge: 60 * 60 * 24 * 30,
    });

    revalidateTag('notices');
    revalidateTag('faculty');
    revalidatePath('/admin');
    revalidatePath('/admin/notices');
    revalidatePath('/');

    return {
      success: true,
      message:
        parsed.data === 'native'
          ? 'Switched to Native CMS Mode (direct Supabase authoring).'
          : 'Switched to Scraper Sync Mode (legacy WordPress polling).',
      data: { mode: parsed.data },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err instanceof Error ? err.message : 'Failed to update CMS sync mode.',
    };
  }
}

export async function triggerManualSyncAction(): Promise<
  ActionResult<{ syncedAt: string; revalidatedTags: string[] }>
> {
  const csrf = await verifyCsrfOrigin();
  if (!csrf.ok) {
    return { success: false, status: 403, error: csrf.error };
  }

  const auth = await requireStaffSession(NOTICE_EDITOR_ROLES, {
    redirectOnUnauthenticated: false,
  });
  if (!auth.authorized) {
    return {
      success: false,
      status: auth.status,
      error:
        auth.status === 401
          ? 'Staff authentication required.'
          : 'Forbidden: Only Admin and Editor roles can trigger cache & sync refreshes.',
    };
  }

  try {
    const syncedAt = new Date().toISOString();
    const revalidatedTags = ['notices', 'documents', 'faculty'];

    for (const tag of revalidatedTags) {
      revalidateTag(tag);
    }
    revalidatePath('/admin');
    revalidatePath('/admin/notices');
    revalidatePath('/admin/faculty');
    revalidatePath('/');

    const cookieStore = await cookies();
    cookieStore.set(CMS_LAST_SYNC_COOKIE, syncedAt, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/admin',
      maxAge: 60 * 60 * 24 * 30,
    });

    return {
      success: true,
      message: 'On-demand cache invalidation executed for notices, documents, and faculty tags.',
      data: { syncedAt, revalidatedTags },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: err instanceof Error ? err.message : 'Failed to trigger manual sync.',
    };
  }
}

export async function signOutAdminAction(): Promise<void> {
  const csrf = await verifyCsrfOrigin();
  if (!csrf.ok) {
    redirect('/admin/login');
  }

  if (isSupabasePublicConfigured()) {
    try {
      const supabase = await createServerClient();
      await supabase.auth.signOut();
    } catch {
      // Proceed to login redirect even if remote signout fails
    }
  }

  redirect('/admin/login');
}
