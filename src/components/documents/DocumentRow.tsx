import React from 'react';
import { ExternalLink, FileText, Image as ImageIcon, Film, FileSpreadsheet } from 'lucide-react';

export interface VaultDocumentItem {
  id: string;
  title: string;
  filename: string;
  category: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  date: string;
}

export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function inferRegulation(title: string, filename: string): string | null {
  const text = `${title} ${filename}`.toUpperCase();
  const match = text.match(/\bR[-_]?(26|23|20|19|18|15|13)\b/);
  if (match) return `R${match[1]}`;
  return null;
}

export function inferDepartmentLabel(title: string, filename: string): string | null {
  const text = ` ${title} ${filename} `.toLowerCase();
  if (text.includes('cse') || text.includes('computer science')) return 'CSE';
  if (text.includes('cai') || text.includes('artificial') || /\bai\b/.test(text)) return 'AI & DS';
  if (text.includes('ece') || text.includes('electronics & comm')) return 'ECE';
  if (text.includes('eee') || text.includes('electrical')) return 'EEE';
  if (text.includes('mech') || /\bme\b/.test(text)) return 'ME';
  if (text.includes('civil') || /\bce\b/.test(text)) return 'CIVIL';
  if (text.includes('mba') || text.includes('management')) return 'MBA';
  if (text.includes('h&s') || text.includes('humanities')) return 'H&S';
  return null;
}

export function getCategoryDisplayLabel(category: string): string {
  switch (category) {
    case 'syllabus':
      return 'Syllabus';
    case 'academic_calendar':
      return 'Academic Calendar';
    case 'exam_timetable':
      return 'Exam Timetable';
    case 'accreditation_doc':
      return 'NAAC / Accreditation';
    case 'form_affidavit':
      return 'Forms & Affidavits';
    case 'circular':
      return 'Circular';
    case 'lecture_presentation':
      return 'Lecture Notes';
    case 'general_pdf':
      return 'Institutional PDF';
    case 'campus_photo':
    case 'faculty_photo':
    case 'general_image':
    case 'logo_badge':
      return 'Media Asset';
    case 'video':
      return 'Video';
    default:
      return 'Document';
  }
}

export function getMimeBadge(mimeType: string, filename: string): { label: string; kind: 'pdf' | 'img' | 'video' | 'doc' } {
  const lowerMime = (mimeType || '').toLowerCase();
  const lowerName = (filename || '').toLowerCase();
  if (lowerMime.includes('pdf') || lowerName.endsWith('.pdf')) {
    return { label: 'PDF', kind: 'pdf' };
  }
  if (lowerMime.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif|svg)$/.test(lowerName)) {
    return { label: 'IMG', kind: 'img' };
  }
  if (lowerMime.startsWith('video/') || /\.(mp4|webm|mov)$/.test(lowerName)) {
    return { label: 'VID', kind: 'video' };
  }
  if (/\.(xlsx?|csv)$/.test(lowerName)) {
    return { label: 'XLS', kind: 'doc' };
  }
  if (/\.(pptx?|ppt)$/.test(lowerName)) {
    return { label: 'PPT', kind: 'doc' };
  }
  return { label: 'FILE', kind: 'doc' };
}

function MimeIcon({ kind }: { kind: 'pdf' | 'img' | 'video' | 'doc' }) {
  if (kind === 'pdf') return <FileText className="w-3.5 h-3.5 text-[var(--brand-crimson)] shrink-0" aria-hidden="true" />;
  if (kind === 'img') return <ImageIcon className="w-3.5 h-3.5 text-[var(--primary-navy)] shrink-0" aria-hidden="true" />;
  if (kind === 'video') return <Film className="w-3.5 h-3.5 text-[var(--brass-gold)] shrink-0" aria-hidden="true" />;
  return <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" aria-hidden="true" />;
}

export default function DocumentRow({ item }: { item: VaultDocumentItem }) {
  const reg = inferRegulation(item.title, item.filename);
  const dept = inferDepartmentLabel(item.title, item.filename);
  const mime = getMimeBadge(item.mimeType, item.filename);
  const sizeLabel = formatFileSize(item.fileSize);
  const dateLabel = item.date ? item.date.slice(0, 10) : '—';
  const safeHref = item.fileUrl.replace(/^http:\/\//i, 'https://');

  return (
    <tr className="hover:bg-[var(--surface)]/70 transition-colors">
      <td className="py-3.5 px-4 align-top">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5">
            <MimeIcon kind={mime.kind} />
          </div>
          <div className="min-w-0">
            <a
              href={safeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--brand-crimson)] transition-colors leading-snug block"
            >
              {item.title || item.filename}
            </a>
            <div className="font-mono text-[11px] text-[var(--muted)] mt-0.5 break-all">
              {item.filename}
            </div>
          </div>
        </div>
      </td>

      <td className="py-3.5 px-4 align-top whitespace-nowrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--rule)] text-[11px] font-medium text-[var(--ink)]">
          {getCategoryDisplayLabel(item.category)}
        </span>
      </td>

      <td className="py-3.5 px-4 align-top whitespace-nowrap font-mono text-xs text-[var(--muted)]">
        <div className="flex items-center gap-1.5">
          {dept && (
            <span className="px-1.5 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--rule)] text-[var(--primary-navy)] font-semibold text-[11px]">
              {dept}
            </span>
          )}
          {reg && (
            <span className="px-1.5 py-0.5 rounded-sm bg-[#B8860B]/10 border border-[#B8860B]/30 text-[var(--brass-gold)] font-semibold text-[11px]">
              {reg}
            </span>
          )}
          {!dept && !reg && <span>Institutional</span>}
        </div>
      </td>

      <td className="py-3.5 px-4 align-top whitespace-nowrap font-mono text-xs text-[var(--muted)] tabular-nums">
        {dateLabel}
      </td>

      <td className="py-3.5 px-4 align-top whitespace-nowrap">
        <div className="flex items-center gap-1.5 font-mono text-xs tabular-nums">
          <span className="px-1.5 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--rule)] text-[10px] font-semibold text-[var(--ink)]">
            {mime.label}
          </span>
          <span className="text-[var(--muted)]">{sizeLabel}</span>
        </div>
      </td>

      <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
        <a
          href={safeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[var(--primary-navy)] hover:bg-[#08192e] text-white transition-colors"
        >
          <span>Open</span>
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
      </td>
    </tr>
  );
}
