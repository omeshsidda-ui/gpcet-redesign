import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';
import { signOutAdminAction } from '@/lib/actions/admin-actions';

interface AdminForbiddenProps {
  userEmail?: string | null;
  currentRole?: string | null;
  requiredRoles?: readonly string[];
}

export default function AdminForbidden({
  userEmail,
  currentRole,
  requiredRoles,
}: AdminForbiddenProps) {
  return (
    <section
      aria-labelledby="forbidden-heading"
      role="alert"
      className="max-w-2xl mx-auto px-4 sm:px-6 py-16"
    >
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-md bg-[var(--brand-crimson)]/10 border border-[var(--brand-crimson)]/20 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-[var(--brand-crimson)]" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs font-semibold text-[var(--brand-crimson)] tabular-nums">
              HTTP 403 · FORBIDDEN
            </p>
            <h1
              id="forbidden-heading"
              className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight"
            >
              Staff Authorization Required
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Your authenticated session does not carry the required institutional staff claim in{' '}
              <code className="font-mono text-xs bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--rule)] text-[var(--ink)]">
                app_metadata.role
              </code>{' '}
              to access this administrative module.
            </p>

            <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[var(--surface)] border border-[var(--rule)] rounded-md p-4 text-xs">
              <div>
                <dt className="text-[var(--muted)] font-medium">Signed-in Account</dt>
                <dd className="mt-0.5 font-sans font-medium text-[var(--ink)] truncate">
                  {userEmail || 'Unknown user'}
                </dd>
              </div>
              <div>
                <dt className="text-[var(--muted)] font-medium">Assigned Role Claim</dt>
                <dd className="mt-0.5 font-mono text-[var(--ink)]">
                  {currentRole || 'none (non-staff)'}
                </dd>
              </div>
              {requiredRoles && requiredRoles.length > 0 && (
                <div className="sm:col-span-2 pt-2 border-t border-[var(--rule)]">
                  <dt className="text-[var(--muted)] font-medium">Permitted Staff Roles</dt>
                  <dd className="mt-0.5 font-mono text-[var(--ink)]">
                    {requiredRoles.join(' · ')}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-raised)] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                Return to Public Portal
              </Link>

              <form action={signOutAdminAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded bg-[var(--ruby)] text-white hover:bg-[var(--burgundy)] transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  Sign Out &amp; Switch Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
