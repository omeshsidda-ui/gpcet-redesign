'use client';

import React, { useState, useTransition } from 'react';
import { RefreshCw, Database, Globe, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { CmsSyncMode } from '@/lib/auth/admin-auth';
import {
  setCmsSyncModeAction,
  triggerManualSyncAction,
} from '@/lib/actions/admin-actions';

interface CmsModeToggleProps {
  initialMode: CmsSyncMode;
  initialLastSyncAt: string | null;
  canSwitchMode: boolean;
}

export default function CmsModeToggle({
  initialMode,
  initialLastSyncAt,
  canSwitchMode,
}: CmsModeToggleProps) {
  const [mode, setMode] = useState<CmsSyncMode>(initialMode);
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(initialLastSyncAt);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isPendingMode, startModeTransition] = useTransition();
  const [isPendingSync, startSyncTransition] = useTransition();

  const handleModeChange = (nextMode: CmsSyncMode) => {
    if (nextMode === mode || !canSwitchMode) return;
    setFeedback(null);

    startModeTransition(async () => {
      const res = await setCmsSyncModeAction(nextMode);
      if (res.success) {
        setMode(res.data?.mode ?? nextMode);
        setFeedback({ type: 'success', text: res.message });
      } else {
        setFeedback({ type: 'error', text: res.error });
      }
    });
  };

  const handleManualSync = () => {
    setFeedback(null);
    startSyncTransition(async () => {
      const res = await triggerManualSyncAction();
      if (res.success) {
        setLastSyncAt(res.data?.syncedAt ?? new Date().toISOString());
        setFeedback({ type: 'success', text: res.message });
      } else {
        setFeedback({ type: 'error', text: res.error });
      }
    });
  };

  return (
    <section
      id="cutover-settings"
      aria-labelledby="cutover-heading"
      className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-5 border-b border-[var(--rule)]">
        <div>
          <h2
            id="cutover-heading"
            className="font-serif text-xl font-semibold text-[var(--ink)] tracking-tight"
          >
            Production CMS Cutover Mode
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)] max-w-2xl">
            Control the institutional publishing source of truth between legacy WordPress polling
            and native Supabase authoring. See{' '}
            <code className="font-mono text-xs bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--rule)] text-[var(--ink)]">
              ADR-006
            </code>{' '}
            for cutover and rollback governance.
          </p>
        </div>

        <button
          type="button"
          onClick={handleManualSync}
          disabled={isPendingSync}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded text-xs font-semibold border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--bg)] disabled:opacity-60 transition-colors cursor-pointer shrink-0"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isPendingSync ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          {isPendingSync ? 'Revalidating Cache...' : 'Trigger Manual Sync & Purge'}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4" role="radiogroup" aria-label="CMS Source of Truth Mode">
        {/* Mode 1: Scraper Sync Mode */}
        <button
          type="button"
          role="radio"
          aria-checked={mode === 'scraper'}
          disabled={!canSwitchMode || isPendingMode}
          onClick={() => handleModeChange('scraper')}
          className={`text-left p-4 rounded-md border transition-colors ${
            mode === 'scraper'
              ? 'border-[var(--primary-navy)] bg-[var(--primary-navy)]/5'
              : 'border-[var(--rule)] bg-[var(--surface)]/50 hover:bg-[var(--surface)]'
          } ${!canSwitchMode ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
              <Globe className="w-4 h-4 text-[var(--primary-navy)]" aria-hidden="true" />
              Scraper Sync Mode
            </span>
            <span
              className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
                mode === 'scraper'
                  ? 'bg-[var(--primary-navy)] text-white'
                  : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--rule)]'
              }`}
            >
              {mode === 'scraper' ? 'ACTIVE' : 'STANDBY'}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
            Polls legacy WordPress (<code className="font-mono">www.gpcet.ac.in</code>) via durable
            Vercel Workflow cron jobs and reconciles notices and PDF circulars into cache.
          </p>
        </button>

        {/* Mode 2: Native CMS Mode */}
        <button
          type="button"
          role="radio"
          aria-checked={mode === 'native'}
          disabled={!canSwitchMode || isPendingMode}
          onClick={() => handleModeChange('native')}
          className={`text-left p-4 rounded-md border transition-colors ${
            mode === 'native'
              ? 'border-[var(--brand-crimson)] bg-[var(--brand-crimson)]/5'
              : 'border-[var(--rule)] bg-[var(--surface)]/50 hover:bg-[var(--surface)]'
          } ${!canSwitchMode ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
              <Database className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
              Native CMS Mode
            </span>
            <span
              className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
                mode === 'native'
                  ? 'bg-[var(--brand-crimson)] text-white'
                  : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--rule)]'
              }`}
            >
              {mode === 'native' ? 'ACTIVE' : 'STANDBY'}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
            Direct PostgreSQL authoring through this Staff CMS with RLS enforcement, audit logs,
            and instant <code className="font-mono">revalidateTag</code> edge invalidation.
          </p>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <div className="font-mono tabular-nums">
          Last manual cache sync:{' '}
          <span className="text-[var(--ink)]">
            {lastSyncAt ? new Date(lastSyncAt).toLocaleString('en-IN') : 'Not triggered in session'}
          </span>
        </div>
        {!canSwitchMode && (
          <span>
            Mode switching requires <code className="font-mono text-[var(--ink)]">admin</code> role.
          </span>
        )}
      </div>

      {feedback && (
        <div
          role={feedback.type === 'error' ? 'alert' : 'status'}
          className={`mt-4 flex items-start gap-2.5 p-3 rounded border text-xs ${
            feedback.type === 'error'
              ? 'bg-[var(--brand-crimson)]/5 border-[var(--brand-crimson)]/30 text-[var(--brand-crimson)]'
              : 'bg-[var(--primary-navy)]/5 border-[var(--primary-navy)]/20 text-[var(--primary-navy)]'
          }`}
        >
          {feedback.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}
    </section>
  );
}
