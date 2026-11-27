import React from 'react';
import Link from 'next/link';
import {
  FilePlus2,
  Megaphone,
  Users,
  ArrowRight,
  Database,
  CheckCircle2,
} from 'lucide-react';
import {
  CUTOVER_ADMIN_ROLES,
  getCmsSyncState,
  requireStaffSession,
} from '@/lib/auth/admin-auth';
import { createServerClient } from '@/lib/supabase/server';
import { getActiveNotices } from '@/lib/data/notices.js';
import { getFacultyRoster } from '@/lib/data/faculty.js';
import { getAllDepartments } from '@/lib/data/departments.js';
import AdminForbidden from '@/components/admin/AdminForbidden';
import CmsModeToggle from '@/components/admin/CmsModeToggle';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const auth = await requireStaffSession();

  if (!auth.authorized) {
    return (
      <AdminForbidden
        userEmail={auth.session.user?.email}
        currentRole={auth.session.user?.role}
        requiredRoles={['admin', 'editor', 'hod', 'counselor']}
      />
    );
  }

  const syncState = await getCmsSyncState();
  const departments = await getAllDepartments();

  let noticeCount = 0;
  let tickerCount = 0;
  let facultyCount = 452;
  let isLiveDatabase = false;

  if (auth.session.configured) {
    try {
      const supabase = await createServerClient();
      const [noticesRes, tickerRes, facultyRes] = await Promise.all([
        supabase.from('notices').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase
          .from('notices')
          .select('id', { count: 'exact', head: true })
          .eq('is_active', true)
          .eq('is_ticker', true),
        supabase.from('faculty').select('id', { count: 'exact', head: true }).eq('is_active', true),
      ]);

      if (!noticesRes.error && noticesRes.count !== null) {
        noticeCount = noticesRes.count;
        isLiveDatabase = true;
      }
      if (!tickerRes.error && tickerRes.count !== null) {
        tickerCount = tickerRes.count;
      }
      if (!facultyRes.error && facultyRes.count !== null && facultyRes.count > 0) {
        facultyCount = facultyRes.count;
      }
    } catch {
      isLiveDatabase = false;
    }
  }

  if (!isLiveDatabase) {
    const seedNotices = await getActiveNotices({ limit: 50 });
    noticeCount = seedNotices.length;
    tickerCount = seedNotices.filter((n: { isTicker?: boolean }) => n.isTicker).length;
    const roster = await getFacultyRoster({ limit: 1 });
    facultyCount = roster.meta.total;
  }

  const canSwitchMode = (CUTOVER_ADMIN_ROLES as readonly string[]).includes(
    auth.session.user.staffRole
  );

  return (
    <div className="space-y-8">
      {/* Masthead */}
      <header className="border-b border-[var(--rule)] pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="font-sans text-xs font-semibold text-[var(--muted)] uppercase tracking-[0.06em]">
            GPCET Autonomous · Administration
          </p>
          <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold text-[var(--ink)] tracking-tight">
            Staff CMS Overview
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)] max-w-2xl">
            Manage official institutional circulars, homepage ticker announcements, faculty rosters,
            and production Supabase cutover state.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--rule)] bg-[var(--surface-raised)] text-xs">
          {isLiveDatabase ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span className="font-sans font-medium text-[var(--ink)]">Live Supabase Connected</span>
            </>
          ) : (
            <>
              <Database className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
              <span className="font-sans font-medium text-[var(--ink)]">Offline JSON Preview</span>
            </>
          )}
        </div>
      </header>

      {/* Tabular Institutional Metrics Register */}
      <section aria-label="CMS Operational Indicators">
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-[var(--rule)] rounded-md bg-[var(--surface-raised)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--rule)]">
          <div className="p-5">
            <div className="text-xs font-medium text-[var(--muted)]">Active Circulars</div>
            <div className="mt-2 font-serif text-3xl font-normal text-[var(--ink)] tabular-nums">
              {noticeCount}
            </div>
            <div className="mt-1 font-sans text-xs text-[var(--muted)]">
              Gazette &amp; Exam Cell
            </div>
          </div>

          <div className="p-5">
            <div className="text-xs font-medium text-[var(--muted)]">Homepage Ticker</div>
            <div className="mt-2 font-serif text-3xl font-normal text-[var(--brand-crimson)] tabular-nums">
              {tickerCount}
            </div>
            <div className="mt-1 font-sans text-xs text-[var(--muted)]">
              Pinned Marquee Items
            </div>
          </div>

          <div className="p-5">
            <div className="text-xs font-medium text-[var(--muted)]">Faculty Roster</div>
            <div className="mt-2 font-serif text-3xl font-normal text-[var(--ruby)] tabular-nums">
              {facultyCount}
            </div>
            <div className="mt-1 font-sans text-xs text-[var(--muted)]">
              Across {departments.length} Departments
            </div>
          </div>

          <div className="p-5">
            <div className="text-xs font-medium text-[var(--muted)]">CMS Source Mode</div>
            <div className="mt-2 font-serif text-2xl font-normal text-[var(--ink)]">
              {syncState.mode === 'native' ? 'Native CMS' : 'Scraper Sync'}
            </div>
            <div className="mt-1 font-sans text-xs text-[var(--muted)]">
              {syncState.mode === 'native' ? 'Direct Supabase' : 'WP Durable Poll'}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Editorial Actions */}
      <section aria-labelledby="quick-actions-heading" className="space-y-3">
        <h2
          id="quick-actions-heading"
          className="font-serif text-xl font-semibold text-[var(--ink)] tracking-tight"
        >
          Administrative Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/notices/new"
            className="group bg-[var(--surface-raised)] border border-[var(--rule)] hover:border-[var(--brand-crimson)] rounded-md p-5 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[var(--brand-crimson)]">
                <FilePlus2 className="w-5 h-5" aria-hidden="true" />
                <ArrowRight
                  className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-3 font-semibold text-sm text-[var(--ink)]">
                Author New Circular
              </h3>
              <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                Draft Markdown notices with sanitized live preview, PDF attachments, and instant
                cache invalidation.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/notices"
            className="group bg-[var(--surface-raised)] border border-[var(--rule)] hover:border-[var(--ruby)] rounded-md p-5 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[var(--ruby)]">
                <Megaphone className="w-5 h-5" aria-hidden="true" />
                <ArrowRight
                  className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-3 font-semibold text-sm text-[var(--ink)]">
                Manage Notices &amp; Ticker
              </h3>
              <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                Filter circulars by category or priority, edit existing content, and toggle
                homepage marquee visibility.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/faculty"
            className="group bg-[var(--surface-raised)] border border-[var(--rule)] hover:border-[var(--ruby)] rounded-md p-5 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[var(--ruby)]">
                <Users className="w-5 h-5" aria-hidden="true" />
                <ArrowRight
                  className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-3 font-semibold text-sm text-[var(--ink)]">
                Faculty Directory Editor
              </h3>
              <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                Search all 452 faculty profiles across 8 departments and update designations,
                cadres, and active statuses.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Cutover Mode Toggle */}
      <CmsModeToggle
        initialMode={syncState.mode}
        initialLastSyncAt={syncState.lastSyncAt}
        canSwitchMode={canSwitchMode}
      />
    </div>
  );
}
