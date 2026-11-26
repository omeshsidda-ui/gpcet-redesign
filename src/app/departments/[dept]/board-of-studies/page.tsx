import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import {
  decodeHtmlEntities,
  getDepartmentMarkdownSection,
  getEnrichedDepartment,
} from '@/lib/institutional-content';
import { searchDocuments } from '@/lib/data/documents.js';
import { FileText, ExternalLink } from 'lucide-react';

interface DeptBosPageProps {
  params: Promise<{ dept: string }>;
}

export async function generateMetadata({ params }: DeptBosPageProps): Promise<Metadata> {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);
  if (!department) return { title: 'Board of Studies' };
  return {
    title: `Board of Studies — ${department.shortName}`,
    description: `Statutory Board of Studies (BoS) composition and autonomous curriculum resolutions for ${department.name} at GPCET.`,
  };
}

export default async function DepartmentBosPage({ params }: DeptBosPageProps) {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);
  if (!department) notFound();

  const bosMd = getDepartmentMarkdownSection(department.code, [
    'board-of-studies',
    'board-of-studies-2',
  ]);

  const bosDocs = await searchDocuments({ q: 'board of studies', department: department.code, limit: 10 });

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-[var(--rule)]">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--ink)]">
          Board of Studies (BoS)
        </h2>
        <p className="text-sm text-[var(--muted)] mt-1">
          Autonomous statutory committee comprising JNTUA nominees, premier institute professors,
          industry representatives, alumni, and internal faculty chaired by {department.hodName}.
        </p>
      </div>

      {bosMd ? (
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
          <MarkdownRenderer content={bosMd.content} />
        </section>
      ) : (
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6">
          <p className="text-sm text-[var(--muted)]">
            Board of Studies chaired by {department.hodName} ({department.hodDesignation}).
          </p>
        </section>
      )}

      {bosDocs.data && bosDocs.data.length > 0 && (
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6">
          <h3 className="font-serif text-lg font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)]">
            Related BoS &amp; Curriculum Documents
          </h3>
          <ul className="divide-y divide-[var(--rule)] mt-2">
            {bosDocs.data.map((doc: any) => (
              <li key={doc.id} className="py-3 flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)]">
                  <FileText className="w-4 h-4 text-[var(--brand-crimson)] shrink-0" aria-hidden="true" />
                  {decodeHtmlEntities(doc.title || doc.filename)}
                </span>
                <a
                  href={String(doc.fileUrl || '').replace(/^http:\/\//i, 'https://')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)] shrink-0"
                >
                  <span>PDF</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div>
        <Link
          href="/academics/academic-council"
          className="text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]"
        >
          View Institutional Academic Council →
        </Link>
      </div>
    </div>
  );
}
