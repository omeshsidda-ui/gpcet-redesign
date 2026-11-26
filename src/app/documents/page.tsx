import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import DocumentVaultClient from '@/components/documents/DocumentVaultClient';
import type { VaultDocumentItem } from '@/components/documents/DocumentRow';
import { decodeHtmlEntities } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'Central Syllabus & Document Vault',
  description:
    'Search and download 5,822 official GPCET autonomous academic syllabi (R26, R23, R20, R19, R18), examination timetables, academic calendars, NAAC SSR documents, and statutory forms.',
};

function loadCatalogedDocuments(): {
  items: VaultDocumentItem[];
  categories: Record<string, number>;
  totalCount: number;
} {
  const manifestPath = path.join(process.cwd(), 'src', 'data', 'media-manifest.json');
  const raw = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const items: VaultDocumentItem[] = (raw.items || []).map((item: any) => ({
    id: String(item.id),
    title: decodeHtmlEntities(item.title || item.filename || 'Document'),
    filename: item.filename || '',
    category: item.category || 'other',
    fileUrl: String(item.sourceUrl || '').replace(/^http:\/\//i, 'https://'),
    fileSize: typeof item.fileSize === 'number' ? item.fileSize : 0,
    mimeType: item.mimeType || 'application/pdf',
    date: item.date || '',
  }));

  return {
    items,
    categories: raw.categories || {},
    totalCount: raw.totalMediaCount || items.length,
  };
}

function VaultSkeleton() {
  return (
    <div className="p-8 border border-[var(--rule)] rounded-md bg-[var(--surface-raised)] text-sm text-[var(--muted)]">
      Loading 5,822 cataloged institutional documents...
    </div>
  );
}

export default function DocumentsVaultPage() {
  const { items, categories, totalCount } = loadCatalogedDocuments();

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Institutional Vault Header */}
        <header className="pb-6 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[var(--ink)]">
              Central Syllabus &amp; Document Vault
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[var(--muted)] max-w-[66ch]">
              Direct, indexed access to {totalCount.toLocaleString('en-US')} autonomous curriculum
              guides, R18–R26 syllabi, academic calendars, examination timetables, NAAC evidence,
              and statutory forms.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-4 pt-4 lg:pt-0 lg:border-l lg:border-[var(--rule)] lg:pl-6 font-mono tabular-nums">
            <div>
              <div className="text-xl font-bold text-[var(--ink)]">
                {(categories.syllabus || 382).toLocaleString('en-US')}
              </div>
              <div className="text-[11px] text-[var(--muted)] font-sans">Syllabi</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--primary-navy)]">
                {(categories.academic_calendar || 42).toLocaleString('en-US')}
              </div>
              <div className="text-[11px] text-[var(--muted)] font-sans">Calendars</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--brand-crimson)]">
                {(categories.exam_timetable || 20).toLocaleString('en-US')}
              </div>
              <div className="text-[11px] text-[var(--muted)] font-sans">Timetables</div>
            </div>
          </div>
        </header>

        {/* Client Search & Pagination wrapped in Suspense for Next.js 15 useSearchParams */}
        <Suspense fallback={<VaultSkeleton />}>
          <DocumentVaultClient
            items={items}
            categoryCounts={categories}
            totalCount={totalCount}
          />
        </Suspense>
      </div>
    </div>
  );
}
