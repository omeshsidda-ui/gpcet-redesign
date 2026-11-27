'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, AlertTriangle, ArrowRight, Info } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface AdminLoginFormProps {
  supabaseConfigured: boolean;
}

export default function AdminLoginForm({ supabaseConfigured }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!supabaseConfigured) {
      setErrorMsg(
        'Supabase authentication is not configured in this environment. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to sign in.'
      );
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMsg('Please enter both your institutional email address and password.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        setErrorMsg(error.message || 'Invalid credentials. Please verify your email and password.');
        setLoading(false);
        return;
      }

      router.refresh();
      router.push('/admin');
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Authentication service is temporarily unavailable. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md shadow-xs overflow-hidden">
        {/* Institutional Header Band */}
        <div className="bg-[var(--ruby)] text-white px-6 py-5 border-b border-white/10">
          <img src="/assets/brand/gpcet-logo.png" width={64} height={64} alt="" className="mb-4 size-16 object-contain bg-white p-1" />
          <div className="flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.06em] uppercase text-stone-200">
            <Lock className="w-3.5 h-3.5 text-rose-100" aria-hidden="true" />
            <span>GPCET Staff Authentication</span>
          </div>
          <h1 className="mt-1.5 font-serif text-2xl font-semibold tracking-tight text-white">
            Institutional CMS Portal
          </h1>
          <p className="mt-1 text-xs text-stone-200 leading-relaxed">
            Authorized access for Principals, HODs, Editors, and Admissions Counselors.
          </p>
        </div>

        <div className="p-6 space-y-5">
          {!supabaseConfigured && (
            <div
              role="note"
              className="flex items-start gap-3 p-3.5 rounded border border-[var(--ruby)]/40 bg-[var(--ruby)]/10 text-xs text-[var(--ink)]"
            >
              <Info className="w-4 h-4 text-[var(--ruby)] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <p className="font-semibold">Supabase Auth Environment Not Configured</p>
                <p className="text-[var(--muted)] leading-relaxed">
                  Public environment variables{' '}
                  <code className="font-mono text-[var(--ink)]">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
                  <code className="font-mono text-[var(--ink)]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{' '}
                  are missing or set to placeholders. Configure them in{' '}
                  <code className="font-mono text-[var(--ink)]">.env.local</code> to enable HttpOnly
                  cookie sign-in.
                </p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div
              role="alert"
              className="flex items-start gap-2.5 p-3.5 rounded border border-[var(--brand-crimson)]/30 bg-[var(--brand-crimson)]/5 text-xs text-[var(--brand-crimson)]"
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-[var(--ink)] mb-1.5"
              >
                Institutional Email
              </label>
              <div className="relative">
                <Mail
                  className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="hodcse@gpcet.ac.in"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--ruby)] disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-[var(--ink)] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="Enter staff password"
                  className="w-full pl-9 pr-10 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--ruby)] disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[var(--muted)] hover:text-[var(--ink)] rounded cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !supabaseConfigured}
              aria-disabled={loading || !supabaseConfigured}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded text-sm font-semibold bg-[var(--ruby)] text-white hover:bg-[var(--burgundy)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <span>{loading ? 'Verifying Staff Session...' : 'Sign In to Staff CMS'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>

          <div className="pt-4 border-t border-[var(--rule)] flex items-center justify-between text-xs text-[var(--muted)]">
            <span>HttpOnly SSR Cookie Auth</span>
            <Link href="/" className="font-medium text-[var(--ruby)] hover:underline">
              Back to Public Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
