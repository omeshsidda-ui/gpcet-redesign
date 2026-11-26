'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Paperclip,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import MarkdownRenderer from '@/components/content/MarkdownRenderer';
import {
  createNoticeAction,
  updateNoticeAction,
} from '@/lib/actions/admin-actions';

export interface NoticeEditorInitialData {
  id: string;
  departmentCode: string | null;
  title: string;
  slug: string;
  summary: string | null;
  contentMarkdown: string;
  category: string;
  priority: string;
  isTicker: boolean;
  isPinned: boolean;
  attachmentUrl: string | null;
  attachmentSizeBytes: number | null;
  publishedAt: string;
  expiresAt: string | null;
  isActive: boolean;
}

interface NoticeEditorFormProps {
  mode: 'create' | 'edit';
  initialNotice?: NoticeEditorInitialData;
  isLiveDatabase: boolean;
}

const DEPARTMENTS = [
  { code: '', label: 'All Institution (Central)' },
  { code: 'cse', label: 'CSE — Computer Science & Engineering' },
  { code: 'ai', label: 'AI & DS — Artificial Intelligence & Data Science' },
  { code: 'ece', label: 'ECE — Electronics & Communication' },
  { code: 'eee', label: 'EEE — Electrical & Electronics' },
  { code: 'me', label: 'ME — Mechanical Engineering' },
  { code: 'civil', label: 'CIVIL — Civil Engineering' },
  { code: 'hs', label: 'H&S — Humanities & Sciences' },
  { code: 'mba', label: 'MBA — Master of Business Administration' },
];

const CATEGORIES = [
  'circular',
  'examination',
  'admissions',
  'recruitment',
  'academic_calendar',
  'event',
  'tender',
  'statutory',
];

const PRIORITIES = ['normal', 'high', 'urgent'];

function toDateTimeLocal(iso?: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const offsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

function slugifyInput(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

export default function NoticeEditorForm({
  mode,
  initialNotice,
  isLiveDatabase,
}: NoticeEditorFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(initialNotice?.title ?? '');
  const [slug, setSlug] = useState(initialNotice?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [departmentCode, setDepartmentCode] = useState(initialNotice?.departmentCode ?? '');
  const [category, setCategory] = useState(initialNotice?.category ?? 'circular');
  const [priority, setPriority] = useState(initialNotice?.priority ?? 'normal');
  const [summary, setSummary] = useState(initialNotice?.summary ?? '');
  const [contentMarkdown, setContentMarkdown] = useState(
    initialNotice?.contentMarkdown ??
      '## Circular Details\n\nAll students and faculty members are hereby informed that...\n\n| Program | Date | Venue |\n| --- | --- | --- |\n| B.Tech (All Branches) | 2026-12-01 | Main Academic Block |'
  );
  const [isTicker, setIsTicker] = useState(initialNotice?.isTicker ?? false);
  const [isPinned, setIsPinned] = useState(initialNotice?.isPinned ?? false);
  const [isActive, setIsActive] = useState(initialNotice?.isActive ?? true);
  const [attachmentUrl, setAttachmentUrl] = useState(initialNotice?.attachmentUrl ?? '');
  const [attachmentSizeBytes, setAttachmentSizeBytes] = useState<string>(
    initialNotice?.attachmentSizeBytes != null ? String(initialNotice.attachmentSizeBytes) : ''
  );
  const [selectedPdfName, setSelectedPdfName] = useState<string | null>(null);
  const [publishedAt, setPublishedAt] = useState(
    toDateTimeLocal(initialNotice?.publishedAt ?? new Date().toISOString())
  );
  const [expiresAt, setExpiresAt] = useState(toDateTimeLocal(initialNotice?.expiresAt));
  const [activeTab, setActiveTab] = useState<'split' | 'write' | 'preview'>('split');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugTouched) {
      setSlug(slugifyInput(val));
    }
  };

  const handlePdfMetadataInspect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedPdfName(file.name);
    setAttachmentSizeBytes(String(file.size));
    if (!attachmentUrl.trim()) {
      const cleanName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
      setAttachmentUrl(`https://www.gpcet.ac.in/wp-content/uploads/circulars/${cleanName}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);
    setFieldErrors({});

    const payload = {
      departmentCode: departmentCode || null,
      title,
      slug: slug || undefined,
      summary: summary || null,
      contentMarkdown,
      category,
      priority,
      isTicker,
      isPinned,
      isActive,
      attachmentUrl: attachmentUrl.trim() || null,
      attachmentSizeBytes: attachmentSizeBytes.trim() ? Number(attachmentSizeBytes) : null,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : undefined,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
    };

    startTransition(async () => {
      const res =
        mode === 'create'
          ? await createNoticeAction(payload)
          : await updateNoticeAction(initialNotice!.id, payload);

      if (res.success) {
        setFeedback({ type: 'success', text: res.message });
        router.refresh();
        if (mode === 'create' && res.data?.id) {
          router.push(`/admin/notices/${res.data.id}`);
        }
      } else {
        setFieldErrors(res.fieldErrors ?? {});
        setFeedback({ type: 'error', text: res.error });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/admin/notices"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-[var(--ink)] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Back to Notices Register
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight">
            {mode === 'create' ? 'Author New Institutional Circular' : 'Edit Circular'}
          </h1>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold bg-[var(--brand-crimson)] text-white hover:bg-[#70102d] disabled:opacity-60 transition-colors cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" aria-hidden="true" />
          {isPending
            ? 'Publishing...'
            : mode === 'create'
            ? 'Publish Circular & Purge Cache'
            : 'Save Changes & Purge Cache'}
        </button>
      </div>

      {!isLiveDatabase && (
        <div
          role="note"
          className="flex items-start gap-3 p-4 rounded-md border border-[var(--brass-gold)]/40 bg-[var(--brass-gold)]/10 text-xs text-[var(--ink)]"
        >
          <Info className="w-4 h-4 text-[var(--brass-gold)] shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            Live Supabase database persistence is unavailable in offline preview mode. You can draft
            and preview Markdown sanitization below; saving requires active Supabase credentials.
          </span>
        </div>
      )}

      {feedback && (
        <div
          role={feedback.type === 'error' ? 'alert' : 'status'}
          className={`flex items-start gap-2.5 p-3.5 rounded border text-xs ${
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

      {/* Core Metadata */}
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <label htmlFor="notice-title" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Circular Title <span className="text-[var(--brand-crimson)]">*</span>
          </label>
          <input
            id="notice-title"
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g., B.Tech R20 End Semester Supplementary Examination Fee Notification"
            className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
          />
          {fieldErrors.title && (
            <p className="mt-1 text-xs text-[var(--brand-crimson)]">{fieldErrors.title[0]}</p>
          )}
        </div>

        <div className="md:col-span-4">
          <label htmlFor="notice-slug" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            URL Slug
          </label>
          <input
            id="notice-slug"
            type="text"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            placeholder="auto-generated-slug"
            className="w-full px-3 py-2 font-mono text-xs bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
          />
          {fieldErrors.slug && (
            <p className="mt-1 text-xs text-[var(--brand-crimson)]">{fieldErrors.slug[0]}</p>
          )}
        </div>

        <div className="md:col-span-4">
          <label htmlFor="notice-dept" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Department Scope
          </label>
          <select
            id="notice-dept"
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d.code} value={d.code}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-4">
          <label htmlFor="notice-cat" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Category
          </label>
          <select
            id="notice-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-4">
          <label htmlFor="notice-prio" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Priority Level
          </label>
          <select
            id="notice-prio"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-12">
          <label htmlFor="notice-summary" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Executive Summary (max 500 characters)
          </label>
          <textarea
            id="notice-summary"
            rows={2}
            maxLength={500}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief 1-2 sentence digest displayed in the Academic Gazette feed..."
            className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
          />
        </div>

        <div className="md:col-span-6">
          <label htmlFor="notice-published-at" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Publish Timestamp
          </label>
          <input
            id="notice-published-at"
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="w-full px-3 py-2 font-mono text-xs bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
          />
        </div>

        <div className="md:col-span-6">
          <label htmlFor="notice-expires-at" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Expiration Timestamp (Optional)
          </label>
          <input
            id="notice-expires-at"
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full px-3 py-2 font-mono text-xs bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
          />
        </div>

        {/* Display Flags */}
        <div className="md:col-span-12 pt-2 border-t border-[var(--rule)] flex flex-wrap items-center gap-6">
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink)] cursor-pointer">
            <input
              type="checkbox"
              checked={isTicker}
              onChange={(e) => setIsTicker(e.target.checked)}
              className="w-4 h-4 rounded accent-[var(--primary-navy)]"
            />
            <span>Feature in Homepage Ticker</span>
          </label>

          <label className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink)] cursor-pointer">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-4 h-4 rounded accent-[var(--brand-crimson)]"
            />
            <span>Pin to Top of Gazette</span>
          </label>

          <label className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink)] cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded accent-[var(--primary-navy)]"
            />
            <span>Active / Publicly Visible</span>
          </label>
        </div>
      </div>

      {/* PDF Attachment & Metadata */}
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Paperclip className="w-4 h-4 text-[var(--primary-navy)]" aria-hidden="true" />
          <h2 className="font-serif text-lg font-semibold text-[var(--ink)]">
            PDF Circular Attachment Metadata
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <label htmlFor="notice-attachment-url" className="block text-xs font-semibold text-[var(--ink)] mb-1">
              Attachment URL (HTTPS Supabase Storage or Institutional PDF)
            </label>
            <input
              id="notice-attachment-url"
              type="url"
              value={attachmentUrl}
              onChange={(e) => setAttachmentUrl(e.target.value)}
              placeholder="https://www.gpcet.ac.in/wp-content/uploads/2026/10/notice.pdf"
              className="w-full px-3 py-2 font-mono text-xs bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
            />
            {fieldErrors.attachmentUrl && (
              <p className="mt-1 text-xs text-[var(--brand-crimson)]">{fieldErrors.attachmentUrl[0]}</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label htmlFor="notice-attachment-size" className="block text-xs font-semibold text-[var(--ink)] mb-1">
              File Size (Bytes)
            </label>
            <input
              id="notice-attachment-size"
              type="number"
              min={0}
              value={attachmentSizeBytes}
              onChange={(e) => setAttachmentSizeBytes(e.target.value)}
              placeholder="e.g., 245760"
              className="w-full px-3 py-2 font-mono text-xs tabular-nums bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
            />
          </div>

          <div className="md:col-span-3">
            <label htmlFor="notice-pdf-inspect" className="block text-xs font-semibold text-[var(--ink)] mb-1">
              Inspect Local PDF File
            </label>
            <input
              id="notice-pdf-inspect"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handlePdfMetadataInspect}
              className="block w-full text-xs text-[var(--muted)] file:mr-2 file:py-1.5 file:px-3 file:rounded file:border file:border-[var(--rule)] file:text-xs file:font-semibold file:bg-[var(--surface)] file:text-[var(--ink)] hover:file:bg-[var(--bg)] cursor-pointer"
            />
            {selectedPdfName && (
              <p className="mt-1 font-mono text-[11px] text-[var(--muted)] truncate">
                Read: {selectedPdfName} ({attachmentSizeBytes} B)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Markdown Editor + Sanitized Live Preview */}
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--rule)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[var(--primary-navy)]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[var(--ink)]">
              Circular Body (GFM Markdown · rehype-sanitize AST)
            </span>
          </div>

          <div className="inline-flex rounded border border-[var(--rule)] bg-[var(--bg)] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('split')}
              className={`px-2.5 py-1 rounded-sm font-medium cursor-pointer ${
                activeTab === 'split'
                  ? 'bg-[var(--primary-navy)] text-white'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              Split View
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('write')}
              className={`px-2.5 py-1 rounded-sm font-medium cursor-pointer ${
                activeTab === 'write'
                  ? 'bg-[var(--primary-navy)] text-white'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm font-medium cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-[var(--primary-navy)] text-white'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              Preview
            </button>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 ${
            activeTab === 'split' ? 'lg:grid-cols-2 lg:divide-x lg:divide-[var(--rule)]' : ''
          }`}
        >
          {activeTab !== 'preview' && (
            <div className="p-4">
              <label htmlFor="notice-markdown" className="sr-only">
                Circular Markdown Content
              </label>
              <textarea
                id="notice-markdown"
                required
                rows={16}
                value={contentMarkdown}
                onChange={(e) => setContentMarkdown(e.target.value)}
                className="w-full h-full min-h-[340px] p-3 font-mono text-xs leading-relaxed bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--primary-navy)]"
              />
              {fieldErrors.contentMarkdown && (
                <p className="mt-1.5 text-xs text-[var(--brand-crimson)]">
                  {fieldErrors.contentMarkdown[0]}
                </p>
              )}
            </div>
          )}

          {activeTab !== 'write' && (
            <div className="p-5 bg-[var(--bg)]/60 overflow-y-auto max-h-[460px]">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
                Sanitized Output Preview
              </div>
              <MarkdownRenderer content={contentMarkdown} />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
