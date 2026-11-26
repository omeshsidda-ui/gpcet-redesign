'use client';

import React, { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import {
  FilePlus2,
  Search,
  Pin,
  Radio,
  Pencil,
  Paperclip,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { toggleNoticeTickerAction } from '@/lib/actions/admin-actions';

export interface AdminNoticeItem {
  id: string;
  departmentCode: string | null;
  title: string;
  slug: string;
  summary: string | null;
  category: string;
  priority: string;
  isTicker: boolean;
  isPinned: boolean;
  attachmentUrl: string | null;
  publishedAt: string;
  isActive: boolean;
}

interface NoticeListClientProps {
  initialNotices: AdminNoticeItem[];
  isLiveDatabase: boolean;
}

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'circular', label: 'Circular' },
  { value: 'examination', label: 'Examination' },
  { value: 'admissions', label: 'Admissions' },
  { value: 'recruitment', label: 'Recruitment' },
  { value: 'academic_calendar', label: 'Academic Calendar' },
  { value: 'event', label: 'Event' },
  { value: 'tender', label: 'Tender' },
  { value: 'statutory', label: 'Statutory' },
];

const PRIORITIES = [
  { value: 'all', label: 'All Priorities' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'normal', label: 'Normal' },
];

export default function NoticeListClient({
  initialNotices,
  isLiveDatabase,
}: NoticeListClientProps) {
  const [notices, setNotices] = useState<AdminNoticeItem[]>(initialNotices);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [priority, setPriority] = useState('all');
  const [tickerOnly, setTickerOnly] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return notices.filter((n) => {
      if (category !== 'all' && n.category !== category) return false;
      if (priority !== 'all' && n.priority !== priority) return false;
      if (tickerOnly && !n.isTicker) return false;
      if (q) {
        const hay = `${n.title} ${n.summary ?? ''} ${n.slug}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [notices, search, category, priority, tickerOnly]);

  const handleToggleTicker = (notice: AdminNoticeItem) => {
    setFeedback(null);
    const nextValue = !notice.isTicker;
    setPendingId(notice.id);

    startTransition(async () => {
      const res = await toggleNoticeTickerAction(notice.id, nextValue);
      setPendingId(null);

      if (res.success) {
        setNotices((prev) =>
          prev.map((item) =>
            item.id === notice.id ? { ...item, isTicker: res.data?.isTicker ?? nextValue } : item
          )
        );
        setFeedback({ type: 'success', text: res.message });
      } else {
        setFeedback({ type: 'error', text: res.error });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight">
            Notices &amp; Circulars Register
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Manage official announcements, examination schedules, and homepage marquee ticker items.
          </p>
        </div>

        <Link
          href="/admin/notices/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold bg-[var(--brand-crimson)] text-white hover:bg-[var(--burgundy)] transition-colors shrink-0"
        >
          <FilePlus2 className="w-4 h-4" aria-hidden="true" />
          Publish New Circular
        </Link>
      </div>

      {!isLiveDatabase && (
        <div
          role="note"
          className="flex items-start gap-3 p-4 rounded-md border border-[var(--ruby)]/40 bg-[var(--ruby)]/10 text-xs text-[var(--ink)]"
        >
          <Info className="w-4 h-4 text-[var(--ruby)] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold">Offline Seed Preview Mode</p>
            <p className="mt-0.5 text-[var(--muted)]">
              Showing institutional seed circulars from{' '}
              <code className="font-mono text-[var(--ink)]">src/lib/data/notices.js</code>. Connect
              Supabase PostgreSQL to persist live edits and homepage ticker toggles.
            </p>
          </div>
        </div>
      )}

      {feedback && (
        <div
          role={feedback.type === 'error' ? 'alert' : 'status'}
          className={`flex items-start gap-2.5 p-3.5 rounded border text-xs ${
            feedback.type === 'error'
              ? 'bg-[var(--brand-crimson)]/5 border-[var(--brand-crimson)]/30 text-[var(--brand-crimson)]'
              : 'bg-[var(--ruby)]/5 border-[var(--ruby)]/20 text-[var(--ruby)]'
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

      {/* Filter Bar */}
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        <div className="md:col-span-5">
          <label htmlFor="notice-search" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Search Circulars
          </label>
          <div className="relative">
            <Search
              className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="notice-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title, slug, or summary..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--ruby)]"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <label htmlFor="notice-category" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Category
          </label>
          <select
            id="notice-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="notice-priority" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Priority
          </label>
          <select
            id="notice-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex items-center h-9">
          <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--ink)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={tickerOnly}
              onChange={(e) => setTickerOnly(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--rule)] accent-[var(--ruby)]"
            />
            <span>Ticker only</span>
          </label>
        </div>
      </div>

      {/* Notices Table */}
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--rule)] bg-[var(--surface)]/60 flex items-center justify-between text-xs text-[var(--muted)]">
          <span className="font-mono tabular-nums">
            Showing {filtered.length} of {notices.length} circulars
          </span>
          <span>Click Ticker status to toggle homepage marquee visibility</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--rule)] bg-[var(--surface)] text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
                <th scope="col" className="px-4 py-3">Circular Title</th>
                <th scope="col" className="px-4 py-3">Category</th>
                <th scope="col" className="px-4 py-3">Priority</th>
                <th scope="col" className="px-4 py-3">Published</th>
                <th scope="col" className="px-4 py-3">Homepage Ticker</th>
                <th scope="col" className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rule)]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-[var(--muted)]">
                    No notices match the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map((notice) => {
                  const isBusy = pendingId === notice.id;
                  return (
                    <tr key={notice.id} className="hover:bg-[var(--surface)]/40 transition-colors">
                      <td className="px-4 py-3.5 align-top max-w-md">
                        <div className="flex items-start gap-2">
                          {notice.isPinned && (
                            <Pin
                              className="w-3.5 h-3.5 text-[var(--brand-crimson)] shrink-0 mt-1"
                              aria-label="Pinned notice"
                            />
                          )}
                          <div>
                            <div className="font-semibold text-[var(--ink)] leading-snug">
                              {notice.title}
                            </div>
                            {notice.summary && (
                              <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">
                                {notice.summary}
                              </p>
                            )}
                            <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-[11px] text-[var(--muted)]">
                              <span>/{notice.slug}</span>
                              {notice.departmentCode && (
                                <span className="uppercase px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--rule)] text-[var(--ink)]">
                                  {notice.departmentCode}
                                </span>
                              )}
                              {notice.attachmentUrl && (
                                <span className="inline-flex items-center gap-1 text-[var(--ruby)]">
                                  <Paperclip className="w-3 h-3" aria-hidden="true" />
                                  PDF
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 align-top whitespace-nowrap">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--rule)] text-[var(--ink)]">
                          {notice.category}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 align-top whitespace-nowrap">
                        <span
                          className={`font-mono text-xs font-semibold uppercase px-2 py-0.5 rounded ${
                            notice.priority === 'urgent'
                              ? 'bg-[var(--brand-crimson)] text-white'
                              : notice.priority === 'high'
                              ? 'bg-[var(--ruby)]/20 text-[var(--ink)] border border-[var(--ruby)]/40'
                              : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--rule)]'
                          }`}
                        >
                          {notice.priority}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 align-top whitespace-nowrap font-mono text-xs text-[var(--muted)] tabular-nums">
                        {new Date(notice.publishedAt).toISOString().slice(0, 10)}
                      </td>

                      <td className="px-4 py-3.5 align-top whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleTicker(notice)}
                          disabled={isBusy}
                          aria-pressed={notice.isTicker}
                          aria-label={`${notice.isTicker ? 'Remove from' : 'Add to'} homepage ticker: ${notice.title}`}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border transition-colors cursor-pointer disabled:opacity-50 ${
                            notice.isTicker
                              ? 'bg-[var(--ruby)] text-white border-[var(--ruby)]'
                              : 'bg-[var(--bg)] text-[var(--muted)] border-[var(--rule)] hover:text-[var(--ink)]'
                          }`}
                        >
                          <Radio className="w-3 h-3" aria-hidden="true" />
                          <span>{isBusy ? 'Saving...' : notice.isTicker ? 'Ticker On' : 'Ticker Off'}</span>
                        </button>
                      </td>

                      <td className="px-4 py-3.5 align-top whitespace-nowrap text-right">
                        <Link
                          href={`/admin/notices/${notice.id}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ruby)] transition-colors"
                        >
                          <Pencil className="w-3 h-3" aria-hidden="true" />
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
