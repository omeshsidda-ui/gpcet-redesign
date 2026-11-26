import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, ExternalLink, Calendar } from 'lucide-react';

export interface GazetteNotice {
  id: string;
  title: string;
  summary?: string;
  category: string;
  priority?: string;
  attachmentUrl?: string | null;
  publishedAt?: string;
}

export interface GazetteDocument {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  fileSizeBytes?: number;
  date?: string;
}

interface LiveAcademicGazetteProps {
  notices: GazetteNotice[];
  keyDocuments: GazetteDocument[];
  totalCatalogedCount: number;
}

function upgradeHttps(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.replace(/^http:\/\//i, 'https://');
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return 'PDF';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '2026';
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return '2026';
  return parsed.toISOString().slice(0, 10);
}

function categoryBadgeLabel(category: string): string {
  switch (category) {
    case 'admissions':
      return 'ADMISSIONS';
    case 'examination':
    case 'exam_timetable':
      return 'EXAM CELL';
    case 'academic_calendar':
      return 'CALENDAR';
    case 'syllabus':
      return 'SYLLABUS';
    case 'event':
      return 'SYMPOSIUM';
    default:
      return 'CIRCULAR';
  }
}

export default function LiveAcademicGazette({
  notices,
  keyDocuments,
  totalCatalogedCount,
}: LiveAcademicGazetteProps) {
  return (
    <aside
      aria-label="Live Academic Gazette and Official Circulars"
      className="flex flex-col justify-between h-full bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md"
    >
      <div>
        {/* Gazette Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--rule)] bg-[var(--surface)]">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[var(--ink)] tracking-tight">
              Academic Gazette &amp; Circulars
            </h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Autonomous Examination Cell &amp; Registrar Dispatches
            </p>
          </div>
          <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-[var(--surface-raised)] border border-[var(--rule)] text-[var(--primary-navy)] tabular-nums">
            2026–27
          </span>
        </div>

        {/* Active Notices Feed */}
        <ul className="divide-y divide-[var(--rule)]">
          {notices.map((notice) => {
            const safeUrl = upgradeHttps(notice.attachmentUrl);
            const isUrgent = notice.priority === 'urgent';
            return (
              <li key={notice.id} className="px-5 py-3.5 hover:bg-[var(--surface)]/60 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={`font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded-sm border ${
                      isUrgent
                        ? 'bg-[#8A1538]/10 text-[var(--brand-crimson)] border-[#8A1538]/25'
                        : 'bg-[var(--surface)] text-[var(--primary-navy)] border-[var(--rule)]'
                    }`}
                  >
                    {categoryBadgeLabel(notice.category)}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--muted)] tabular-nums inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {formatDate(notice.publishedAt)}
                  </span>
                </div>

                {safeUrl ? (
                  <a
                    href={safeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-3 focus-visible:outline-none focus-visible:underline"
                  >
                    <span className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--brand-crimson)] transition-colors leading-snug">
                      {notice.title}
                    </span>
                    <ExternalLink
                      className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--brand-crimson)] shrink-0 mt-1"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <Link
                    href="/documents"
                    className="group flex items-start justify-between gap-3 focus-visible:outline-none focus-visible:underline"
                  >
                    <span className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--primary-navy)] transition-colors leading-snug">
                      {notice.title}
                    </span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--primary-navy)] shrink-0 mt-1"
                      aria-hidden="true"
                    />
                  </Link>
                )}

                {notice.summary && (
                  <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2 leading-relaxed">
                    {notice.summary}
                  </p>
                )}
              </li>
            );
          })}

          {/* Key Exam Timetables & Academic Calendars from Vault */}
          {keyDocuments.map((doc) => {
            const safeUrl = upgradeHttps(doc.fileUrl);
            return (
              <li key={doc.id} className="px-5 py-3 hover:bg-[var(--surface)]/60 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded-sm bg-[var(--surface)] text-[var(--muted)] border border-[var(--rule)]">
                    {categoryBadgeLabel(doc.category)}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--muted)] tabular-nums">
                    {formatBytes(doc.fileSizeBytes)} · {formatDate(doc.date)}
                  </span>
                </div>

                {safeUrl ? (
                  <a
                    href={safeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-3"
                  >
                    <span className="text-[13px] font-medium text-[var(--ink)] group-hover:text-[var(--brand-crimson)] transition-colors leading-snug">
                      {doc.title}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--brand-crimson)] shrink-0 mt-0.5">
                      <FileText className="w-3 h-3" aria-hidden="true" />
                      PDF
                    </span>
                  </a>
                ) : (
                  <span className="text-[13px] font-medium text-[var(--ink)]">{doc.title}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Gazette Footer CTA */}
      <div className="px-5 py-3.5 bg-[var(--surface)] border-t border-[var(--rule)] flex items-center justify-between">
        <Link
          href="/documents"
          className="inline-flex items-center justify-between w-full text-xs font-semibold text-[var(--primary-navy)] hover:text-[var(--brand-crimson)] transition-colors"
        >
          <span>
            View All{' '}
            <span className="font-mono tabular-nums">
              {totalCatalogedCount.toLocaleString('en-US')}
            </span>{' '}
            Cataloged Documents
          </span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
