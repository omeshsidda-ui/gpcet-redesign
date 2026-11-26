'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import MiniSearch from 'minisearch';
import { Search, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import DocumentRow, {
  VaultDocumentItem,
  formatFileSize,
  getCategoryDisplayLabel,
  getMimeBadge,
  inferDepartmentLabel,
  inferRegulation,
} from './DocumentRow';

interface DocumentVaultClientProps {
  items: VaultDocumentItem[];
  categoryCounts: Record<string, number>;
  totalCount: number;
}

const CATEGORY_CHIPS = [
  { id: 'all', label: 'All Documents' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'academic_calendar', label: 'Academic Calendar' },
  { id: 'exam_timetable', label: 'Exam Timetable' },
  { id: 'accreditation_doc', label: 'NAAC Docs' },
  { id: 'form_affidavit', label: 'Forms' },
];

const CATEGORY_ALIAS_MAP: Record<string, string> = {
  all: 'all',
  syllabus: 'syllabus',
  calendar: 'academic_calendar',
  academic_calendar: 'academic_calendar',
  timetable: 'exam_timetable',
  exam_timetable: 'exam_timetable',
  naac: 'accreditation_doc',
  accreditation: 'accreditation_doc',
  accreditation_doc: 'accreditation_doc',
  forms: 'form_affidavit',
  form_affidavit: 'form_affidavit',
  circular: 'circular',
  general_pdf: 'general_pdf',
};

const DEPARTMENTS = [
  { code: 'all', label: 'All Departments' },
  { code: 'cse', label: 'CSE (Computer Science)' },
  { code: 'ai', label: 'AI & DS' },
  { code: 'ece', label: 'ECE' },
  { code: 'eee', label: 'EEE' },
  { code: 'me', label: 'Mechanical (ME)' },
  { code: 'civil', label: 'Civil (CE)' },
  { code: 'hs', label: 'Humanities & Sciences' },
  { code: 'mba', label: 'MBA' },
];

const REGULATIONS = ['all', 'R26', 'R23', 'R20', 'R19', 'R18'];
const PAGE_SIZES = [25, 50, 100];

function matchesDept(item: VaultDocumentItem, dept: string): boolean {
  if (!dept || dept === 'all') return true;
  const text = ` ${item.title} ${item.filename} `.toLowerCase();
  switch (dept) {
    case 'cse':
      return text.includes('cse') || text.includes('computer science');
    case 'ai':
      return text.includes('cai') || text.includes('artificial') || /\bai\b/.test(text);
    case 'ece':
      return text.includes('ece') || text.includes('electronics');
    case 'eee':
      return text.includes('eee') || text.includes('electrical');
    case 'me':
      return text.includes('mech') || /\bme[-_ ]/.test(text);
    case 'civil':
      return text.includes('civil') || /\bce[-_ ]/.test(text);
    case 'mba':
      return text.includes('mba') || text.includes('management');
    case 'hs':
      return text.includes('h&s') || text.includes('humanities') || text.includes('basic science');
    default:
      return true;
  }
}

function matchesReg(item: VaultDocumentItem, reg: string): boolean {
  if (!reg || reg === 'all') return true;
  const normalizedTarget = reg.toUpperCase().replace(/[-_]/g, '');
  const normalizedText = `${item.title} ${item.filename}`.toUpperCase().replace(/[-_]/g, '');
  return normalizedText.includes(normalizedTarget);
}

export default function DocumentVaultClient({
  items,
  categoryCounts,
  totalCount,
}: DocumentVaultClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = CATEGORY_ALIAS_MAP[searchParams.get('category') || 'all'] || 'all';
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(initialCategory);
  const [department, setDepartment] = useState((searchParams.get('dept') || 'all').toLowerCase());
  const [regulation, setRegulation] = useState((searchParams.get('reg') || 'all').toUpperCase() === 'ALL' ? 'all' : (searchParams.get('reg') || 'all').toUpperCase());
  const [pageSize, setPageSize] = useState<number>(25);
  const [page, setPage] = useState<number>(1);

  // Sync URL query params into state when navigating via navbar links
  useEffect(() => {
    const paramQ = searchParams.get('q') || '';
    const paramCat = CATEGORY_ALIAS_MAP[searchParams.get('category') || 'all'] || 'all';
    const paramDept = (searchParams.get('dept') || 'all').toLowerCase();
    const rawReg = searchParams.get('reg') || 'all';
    const paramReg = rawReg.toLowerCase() === 'all' ? 'all' : rawReg.toUpperCase();

    setQuery(paramQ);
    setCategory(paramCat);
    setDepartment(paramDept);
    setRegulation(paramReg);
    setPage(1);
  }, [searchParams]);

  // Build MiniSearch index once across all 5,822 items
  const miniSearch = useMemo(() => {
    const ms = new MiniSearch<VaultDocumentItem>({
      fields: ['title', 'filename', 'category'],
      storeFields: ['id'],
      searchOptions: {
        boost: { title: 3, filename: 2 },
        prefix: true,
        fuzzy: 0.15,
      },
    });
    ms.addAll(items);
    return ms;
  }, [items]);

  const itemLookup = useMemo(() => {
    const map = new Map<string, VaultDocumentItem>();
    for (const item of items) {
      map.set(item.id, item);
    }
    return map;
  }, [items]);

  const updateUrlParams = (next: {
    q?: string;
    category?: string;
    dept?: string;
    reg?: string;
  }) => {
    const params = new URLSearchParams();
    const nextQ = next.q !== undefined ? next.q : query;
    const nextCat = next.category !== undefined ? next.category : category;
    const nextDept = next.dept !== undefined ? next.dept : department;
    const nextReg = next.reg !== undefined ? next.reg : regulation;

    if (nextQ.trim()) params.set('q', nextQ.trim());
    if (nextCat && nextCat !== 'all') params.set('category', nextCat);
    if (nextDept && nextDept !== 'all') params.set('dept', nextDept);
    if (nextReg && nextReg !== 'all') params.set('reg', nextReg);

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // Instant <5ms client-side filter + search
  const filteredItems = useMemo(() => {
    let baseList = items;

    const trimmed = query.trim();
    if (trimmed.length > 0) {
      const lower = trimmed.toLowerCase();
      const hits = miniSearch.search(trimmed);
      const hitIds = new Set<string>();
      const orderedHits: VaultDocumentItem[] = [];

      for (const hit of hits) {
        const doc = itemLookup.get(String(hit.id));
        if (doc) {
          hitIds.add(doc.id);
          orderedHits.push(doc);
        }
      }

      // Append exact substring matches (e.g. course codes like 20A05401)
      for (const item of items) {
        if (hitIds.has(item.id)) continue;
        if (
          item.title.toLowerCase().includes(lower) ||
          item.filename.toLowerCase().includes(lower)
        ) {
          orderedHits.push(item);
        }
      }

      baseList = orderedHits;
    }

    return baseList.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (!matchesDept(item, department)) return false;
      if (!matchesReg(item, regulation)) return false;
      return true;
    });
  }, [items, itemLookup, miniSearch, query, category, department, regulation]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const visibleItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const handleResetFilters = () => {
    setQuery('');
    setCategory('all');
    setDepartment('all');
    setRegulation('all');
    setPage(1);
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Faceted Controls */}
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-4 sm:p-6 space-y-5">
        {/* Instant Search Input */}
        <div className="relative">
          <Search
            className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              setPage(1);
              updateUrlParams({ q: val });
            }}
            placeholder="Search by subject, code (e.g., 20A05401), regulation (R20, R23), or circular title..."
            aria-label="Search cataloged documents"
            className="w-full pl-10 pr-10 py-3 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded-md text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ruby)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setPage(1);
                updateUrlParams({ q: '' });
              }}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Document categories">
          {CATEGORY_CHIPS.map((chip) => {
            const count = chip.id === 'all' ? totalCount : categoryCounts[chip.id] || 0;
            const active = category === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setCategory(chip.id);
                  setPage(1);
                  updateUrlParams({ category: chip.id });
                }}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                  active
                    ? 'bg-[var(--ruby)] text-white border-[var(--ruby)]'
                    : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--rule)] hover:border-[var(--ruby)]/50'
                }`}
              >
                <span>{chip.label}</span>
                <span
                  className={`font-mono text-[11px] tabular-nums ${
                    active ? 'text-slate-200' : 'text-[var(--muted)]'
                  }`}
                >
                  {count.toLocaleString('en-US')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Department, Regulation & Page Size Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-[var(--rule)]">
          <div>
            <label htmlFor="vault-dept-select" className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Department Scope
            </label>
            <select
              id="vault-dept-select"
              value={department}
              onChange={(e) => {
                const val = e.target.value;
                setDepartment(val);
                setPage(1);
                updateUrlParams({ dept: val });
              }}
              className="w-full px-3 py-2 text-xs font-medium bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)]"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="vault-reg-select" className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Regulation Series
            </label>
            <select
              id="vault-reg-select"
              value={regulation}
              onChange={(e) => {
                const val = e.target.value;
                setRegulation(val);
                setPage(1);
                updateUrlParams({ reg: val });
              }}
              className="w-full px-3 py-2 text-xs font-medium bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)]"
            >
              {REGULATIONS.map((r) => (
                <option key={r} value={r}>
                  {r === 'all' ? 'All Regulations (R18–R26)' : `${r} Regulation`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="vault-pagesize-select" className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Rows per Page
            </label>
            <select
              id="vault-pagesize-select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs font-medium bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] font-mono"
            >
              {PAGE_SIZES.map((sz) => (
                <option key={sz} value={sz}>
                  {sz} items / page
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full px-3 py-2 text-xs font-semibold rounded border border-[var(--rule)] bg-[var(--surface)] hover:bg-[var(--bg)] text-[var(--ink)] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted)]">
        <div className="font-mono tabular-nums">
          Showing{' '}
          <strong className="text-[var(--ink)]">
            {filteredItems.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + pageSize, filteredItems.length)}
          </strong>{' '}
          of <strong className="text-[var(--ink)]">{filteredItems.length.toLocaleString('en-US')}</strong>{' '}
          matching documents (Total cataloged: {totalCount.toLocaleString('en-US')})
        </div>
        <div className="font-mono tabular-nums">
          Page {safePage} of {totalPages}
        </div>
      </div>

      {/* Desktop High-Density Document Table */}
      <div className="hidden md:block overflow-x-auto bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--surface)] border-b border-[var(--rule)] text-xs font-semibold text-[var(--muted)]">
              <th scope="col" className="py-3 px-4">Document Title &amp; File</th>
              <th scope="col" className="py-3 px-4">Category</th>
              <th scope="col" className="py-3 px-4">Dept / Reg</th>
              <th scope="col" className="py-3 px-4 font-mono">Date</th>
              <th scope="col" className="py-3 px-4 font-mono">Format &amp; Size</th>
              <th scope="col" className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--rule)]">
            {visibleItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 px-4 text-center text-sm text-[var(--muted)]">
                  No matching documents found for your active filters. Try clearing filters or searching a broader term.
                </td>
              </tr>
            ) : (
              visibleItems.map((item) => <DocumentRow key={item.id} item={item} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Document Register */}
      <div className="md:hidden divide-y divide-[var(--rule)] bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md">
        {visibleItems.length === 0 ? (
          <div className="py-10 px-4 text-center text-sm text-[var(--muted)]">
            No matching documents found.
          </div>
        ) : (
          visibleItems.map((item) => {
            const safeHref = item.fileUrl.replace(/^http:\/\//i, 'https://');
            const reg = inferRegulation(item.title, item.filename);
            const dept = inferDepartmentLabel(item.title, item.filename);
            const mime = getMimeBadge(item.mimeType, item.filename);

            return (
              <div key={item.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={safeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--brand-crimson)] leading-snug"
                  >
                    {item.title || item.filename}
                  </a>
                  <span className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--rule)] shrink-0">
                    {mime.label}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[var(--muted)] tabular-nums">
                  <span>{getCategoryDisplayLabel(item.category)}</span>
                  {dept && <span>· {dept}</span>}
                  {reg && <span>· {reg}</span>}
                  <span>· {formatFileSize(item.fileSize)}</span>
                </div>
                <div>
                  <a
                    href={safeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)]"
                  >
                    <span>Open Document</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <nav
          aria-label="Document vault pagination"
          className="flex items-center justify-between pt-2"
        >
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded border border-[var(--rule)] bg-[var(--surface-raised)] text-[var(--ink)] disabled:opacity-40 hover:bg-[var(--surface)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Previous</span>
          </button>

          <span className="font-mono text-xs text-[var(--muted)] tabular-nums">
            Page {safePage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded border border-[var(--rule)] bg-[var(--surface-raised)] text-[var(--ink)] disabled:opacity-40 hover:bg-[var(--surface)] transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}
