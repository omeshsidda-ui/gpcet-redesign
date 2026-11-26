import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';

export const STAFF_ROLES = ['admin', 'editor', 'hod', 'counselor'] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

export const NOTICE_EDITOR_ROLES: readonly StaffRole[] = ['admin', 'editor'];
export const FACULTY_EDITOR_ROLES: readonly StaffRole[] = ['admin', 'editor', 'hod'];
export const CUTOVER_ADMIN_ROLES: readonly StaffRole[] = ['admin'];

export type CmsSyncMode = 'scraper' | 'native';

export const CMS_MODE_COOKIE = 'gpcet_cms_mode';
export const CMS_LAST_SYNC_COOKIE = 'gpcet_last_sync_at';

const PLACEHOLDER_URL_FRAGMENTS = [
  'placeholder.supabase.co',
  'your-project-id.supabase.co',
  'example.supabase.co',
  'localhost:0',
];

const PLACEHOLDER_KEY_FRAGMENTS = [
  'placeholder-anon-key',
  'your-anon-key-placeholder',
  'your-anon-key',
  'placeholder',
];

export interface AdminUser {
  id: string;
  email: string | null;
  role: string | null;
  staffRole: StaffRole | null;
  departmentCode: string | null;
}

export interface AdminSession {
  configured: boolean;
  authenticated: boolean;
  isStaff: boolean;
  user: AdminUser | null;
}

export interface AuthenticatedStaffSession extends AdminSession {
  authenticated: true;
  isStaff: true;
  user: AdminUser & { staffRole: StaffRole };
}

export type RequireStaffResult =
  | {
      authorized: true;
      session: AuthenticatedStaffSession;
    }
  | {
      authorized: false;
      status: 401 | 403;
      reason: 'unauthenticated' | 'not_staff' | 'insufficient_role';
      session: AdminSession;
    };

/**
 * Checks whether public Supabase environment variables are present and not placeholder values.
 * Does NOT inspect or reference SUPABASE_SERVICE_ROLE_KEY.
 */
export function isSupabasePublicConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return false;
  }

  const lowerUrl = url.toLowerCase();
  const lowerKey = anonKey.toLowerCase();

  if (PLACEHOLDER_URL_FRAGMENTS.some((fragment) => lowerUrl.includes(fragment))) {
    return false;
  }

  if (PLACEHOLDER_KEY_FRAGMENTS.some((fragment) => lowerKey.includes(fragment))) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function isStaffRole(role: unknown): role is StaffRole {
  return typeof role === 'string' && (STAFF_ROLES as readonly string[]).includes(role);
}

/**
 * Reads the current authenticated session via @supabase/ssr server cookies.
 * Strictly validates `user.app_metadata?.role` (never `user_metadata`).
 * Degrades gracefully without throwing if Supabase is unconfigured or unreachable.
 */
export async function getAdminSession(): Promise<AdminSession> {
  const configured = isSupabasePublicConfigured();

  if (!configured) {
    return {
      configured: false,
      authenticated: false,
      isStaff: false,
      user: null,
    };
  }

  try {
    const supabase = await createServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return {
        configured: true,
        authenticated: false,
        isStaff: false,
        user: null,
      };
    }

    // Security invariant (ADR-002): Authorization roles MUST come exclusively from app_metadata.
    const rawRole =
      typeof user.app_metadata?.role === 'string'
        ? user.app_metadata.role.trim().toLowerCase()
        : null;

    const staffRole = isStaffRole(rawRole) ? rawRole : null;
    const departmentCode =
      typeof user.app_metadata?.department_code === 'string'
        ? user.app_metadata.department_code.trim().toLowerCase()
        : null;

    return {
      configured: true,
      authenticated: true,
      isStaff: staffRole !== null,
      user: {
        id: user.id,
        email: user.email ?? null,
        role: rawRole,
        staffRole,
        departmentCode,
      },
    };
  } catch {
    return {
      configured: true,
      authenticated: false,
      isStaff: false,
      user: null,
    };
  }
}

/**
 * Enforces staff authentication and optional role allowlisting.
 * When `redirectOnUnauthenticated` is true (default for RSC pages), unauthenticated visitors
 * are redirected to `/admin/login`. Authenticated non-staff users receive `{ authorized: false, status: 403 }`.
 */
export async function requireStaffSession(
  allowedRoles?: readonly StaffRole[],
  options: { redirectOnUnauthenticated?: boolean } = {}
): Promise<RequireStaffResult> {
  const { redirectOnUnauthenticated = true } = options;
  const session = await getAdminSession();

  if (!session.authenticated || !session.user) {
    if (redirectOnUnauthenticated) {
      redirect('/admin/login');
    }
    return {
      authorized: false,
      status: 401,
      reason: 'unauthenticated',
      session,
    };
  }

  if (!session.isStaff || !session.user.staffRole) {
    return {
      authorized: false,
      status: 403,
      reason: 'not_staff',
      session,
    };
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(session.user.staffRole)) {
    return {
      authorized: false,
      status: 403,
      reason: 'insufficient_role',
      session,
    };
  }

  return {
    authorized: true,
    session: session as AuthenticatedStaffSession,
  };
}

/**
 * Reads the persisted CMS synchronization mode and last sync timestamp from cookies.
 */
export async function getCmsSyncState(): Promise<{
  mode: CmsSyncMode;
  lastSyncAt: string | null;
}> {
  try {
    const cookieStore = await cookies();
    const rawMode = cookieStore.get(CMS_MODE_COOKIE)?.value;
    const defaultMode: CmsSyncMode =
      process.env.CMS_SYNC_MODE === 'native' ? 'native' : 'scraper';
    const mode: CmsSyncMode =
      rawMode === 'native' || rawMode === 'scraper' ? rawMode : defaultMode;
    const lastSyncAt = cookieStore.get(CMS_LAST_SYNC_COOKIE)?.value ?? null;
    return { mode, lastSyncAt };
  } catch {
    return { mode: 'scraper', lastSyncAt: null };
  }
}
