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
      className="flex flex-col justify-between h-full bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-[2px]"
    >
      <div>
        {/* Gazette Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[var(--rule)] bg-[var(--surface)]">
          <div>
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] tracking-tight leading-snug">
              Academic Gazette &amp; Circulars
            </h2>
            <p className="text-[13px] text-[var(--muted)] mt-1">
              Autonomous Examination Cell &amp; Registrar Dispatches
            </p>
          </div>
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-[2px] bg-[var(--surface-raised)] border border-[var(--rule)] text-[var(--ruby)] tabular-nums shrink-0">
            2026–27
          </span>
        </div>

        {/* Active Notices Feed */}
        <ul className="divide-y divide-[var(--rule)]">
          {notices.map((notice) => {
            const safeUrl = upgradeHttps(notice.attachmentUrl);
            const isUrgent = notice.priority === 'urgent';
            return (
              <li key={notice.id} className="px-6 py-4 hover:bg-[var(--surface)]/55 transition-colors">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span
                    className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded-[2px] border ${
                      isUrgent
                        ? 'bg-[var(--ruby)] text-white border-[var(--ruby)]'
                        : 'bg-[var(--surface)] text-[var(--ruby)] border-[var(--rule)]'
                    }`}
                  >
                    {categoryBadgeLabel(notice.category)}
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)] tabular-nums inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
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
                    <span className="text-[14px] font-semibold text-[var(--ink)] group-hover:text-[var(--ruby)] transition-colors leading-snug">
                      {notice.title}
                    </span>
                    <ExternalLink
                      className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--ruby)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <Link
                    href="/documents"
                    className="group flex items-start justify-between gap-3 focus-visible:outline-none focus-visible:underline"
                  >
                    <span className="text-[14px] font-semibold text-[var(--ink)] group-hover:text-[var(--ruby)] transition-colors leading-snug">
                      {notice.title}
                    </span>
                    <ArrowRight
                      className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--ruby)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                )}

                {notice.summary && (
                  <p className="text-[13.5px] text-[var(--muted)] mt-1.5 line-clamp-2 leading-relaxed">
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
              <li key={doc.id} className="px-6 py-4 hover:bg-[var(--surface)]/55 transition-colors">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-[2px] bg-[var(--surface)] text-[var(--muted)] border border-[var(--rule)]">
                    {categoryBadgeLabel(doc.category)}
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)] tabular-nums">
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
                    <span className="text-[13.5px] sm:text-[14px] font-medium text-[var(--ink)] group-hover:text-[var(--ruby)] transition-colors leading-snug">
                      {doc.title}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold px-2 py-0.5 rounded-[2px] border border-[var(--rule)] bg-[var(--surface)] text-[var(--ruby)] group-hover:border-[var(--ruby)] shrink-0 mt-0.5 transition-colors">
                      <FileText className="w-3 h-3" aria-hidden="true" />
                      PDF
                    </span>
                  </a>
                ) : (
                  <span className="text-[13.5px] sm:text-[14px] font-medium text-[var(--ink)]">
                    {doc.title}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Gazette Footer CTA */}
      <div className="px-6 py-4 bg-[var(--surface)] border-t border-[var(--rule)] flex items-center justify-between">
        <Link
          href="/documents"
          className="inline-flex items-center justify-between w-full text-[13.5px] font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] transition-colors"
        >
          <span>
            View All{' '}
            <span className="font-semibold tabular-nums">
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
