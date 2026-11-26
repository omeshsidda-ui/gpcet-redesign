'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Megaphone,
  FilePlus2,
  Users,
  Settings2,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { signOutAdminAction } from '@/lib/actions/admin-actions';

interface AdminSidebarNavProps {
  userEmail: string | null;
  staffRole: string;
  departmentCode?: string | null;
  configured: boolean;
}

const NAV_ITEMS = [
  {
    href: '/admin',
    label: 'Overview',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: '/admin/notices',
    label: 'Notices & Circulars',
    icon: Megaphone,
    exact: false,
  },
  {
    href: '/admin/notices/new',
    label: 'New Notice',
    icon: FilePlus2,
    exact: true,
  },
  {
    href: '/admin/faculty',
    label: 'Faculty Directory',
    icon: Users,
    exact: false,
  },
  {
    href: '/admin#cutover-settings',
    label: 'Cutover Settings',
    icon: Settings2,
    exact: true,
  },
];

export default function AdminSidebarNav({
  userEmail,
  staffRole,
  departmentCode,
  configured,
}: AdminSidebarNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact: boolean) => {
    if (href.includes('#')) {
      return false;
    }
    if (exact) {
      return pathname === href;
    }
    if (href === '/admin/notices' && pathname === '/admin/notices/new') {
      return false;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile / Tablet Admin Subheader */}
      <div className="lg:hidden bg-[var(--surface-raised)] border-b border-[var(--rule)] px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <ShieldCheck className="w-4 h-4 text-[var(--primary-navy)] shrink-0" aria-hidden="true" />
          <span className="font-serif font-semibold text-sm text-[var(--ink)] truncate">
            Staff CMS
          </span>
          <span className="font-mono text-[11px] uppercase px-1.5 py-0.5 rounded bg-[var(--primary-navy)] text-white">
            {staffRole}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="admin-mobile-nav"
          aria-label={mobileOpen ? 'Close staff navigation menu' : 'Open staff navigation menu'}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--bg)]"
        >
          {mobileOpen ? (
            <>
              <X className="w-4 h-4" aria-hidden="true" />
              Close
            </>
          ) : (
            <>
              <Menu className="w-4 h-4" aria-hidden="true" />
              Menu
            </>
          )}
        </button>
      </div>

      {/* Mobile Collapsible Drawer */}
      {mobileOpen && (
        <nav
          id="admin-mobile-nav"
          aria-label="Mobile Staff CMS Navigation"
          className="lg:hidden bg-[var(--surface-raised)] border-b border-[var(--rule)] px-4 py-3 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[var(--primary-navy)] text-white'
                    : 'text-[var(--ink)] hover:bg-[var(--surface)]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 mt-2 border-t border-[var(--rule)] flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-[var(--muted)] truncate">
              {userEmail || 'Staff Session'}
            </span>
            <form action={signOutAdminAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-[var(--brand-crimson)] border border-[var(--brand-crimson)]/25 hover:bg-[var(--brand-crimson)]/5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                Sign Out
              </button>
            </form>
          </div>
        </nav>
      )}

      {/* Desktop Left Structural Sidebar */}
      <aside
        aria-label="Staff CMS Sidebar"
        className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-[var(--surface-raised)] border-r border-[var(--rule)]"
      >
        <div className="p-5 border-b border-[var(--rule)]">
          <div className="flex items-center gap-2 text-[var(--primary-navy)]">
            <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold tracking-wider uppercase">
              GPCET Staff CMS
            </span>
          </div>
          <p className="mt-2 font-serif text-base font-semibold text-[var(--ink)] leading-snug">
            Institutional Governance &amp; Publishing
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-[var(--primary-navy)] text-white">
              {staffRole}
            </span>
            {departmentCode && (
              <span className="font-mono text-[11px] font-semibold uppercase px-2 py-0.5 rounded border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)]">
                {departmentCode}
              </span>
            )}
            <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--rule)] text-[var(--muted)]">
              {configured ? 'Supabase Auth' : 'Preview'}
            </span>
          </div>
        </div>

        <nav aria-label="Staff CMS Navigation" className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2.5 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[var(--primary-navy)] text-white'
                    : 'text-[var(--ink)] hover:bg-[var(--surface)]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--rule)] bg-[var(--surface)]/60">
          <div className="text-xs text-[var(--muted)]">Signed in as</div>
          <div className="mt-0.5 font-mono text-xs font-medium text-[var(--ink)] truncate">
            {userEmail || 'Authenticated Staff'}
          </div>
          <form action={signOutAdminAction} className="mt-3">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-semibold border border-[var(--rule)] bg-[var(--surface-raised)] text-[var(--ink)] hover:border-[var(--brand-crimson)] hover:text-[var(--brand-crimson)] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
