import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ExternalLink, FileText } from 'lucide-react';
import { searchDocuments } from '@/lib/data/documents.js';
import { decodeHtmlEntities, getEnrichedDepartment } from '@/lib/institutional-content';
import { formatFileSize, inferRegulation } from '@/components/documents/DocumentRow';

interface DeptSyllabusPageProps {
  params: Promise<{ dept: string }>;
}

export async function generateMetadata({ params }: DeptSyllabusPageProps): Promise<Metadata> {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);
  if (!department) return { title: 'Curriculum & Syllabus' };
  return {
    title: `Curriculum & Syllabus — ${department.shortName}`,
    description: `Download R26, R23, R20, R19, and R18 course structures and syllabi for the Department of ${department.name} at GPCET.`,
  };
}

export default async function DepartmentSyllabusPage({ params }: DeptSyllabusPageProps) {
  const { dept } = await params;
  const department = await getEnrichedDepartment(dept);
  if (!department) notFound();

  const [syllabusRes, allDeptDocsRes] = await Promise.all([
    searchDocuments({ category: 'syllabus', department: department.code, limit: 100 }),
    searchDocuments({ department: department.code, limit: 25 }),
  ]);

  const docs = (syllabusRes.data && syllabusRes.data.length > 0 ? syllabusRes.data : allDeptDocsRes.data) || [];

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-[var(--rule)] flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--ink)]">
            Autonomous Curriculum &amp; Syllabi
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Course structures, subject syllabi, and autonomous regulation documents for{' '}
            {department.name}.
          </p>
        </div>

        <Link
          href={`/documents?category=syllabus&dept=${department.code}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-crimson)] hover:underline"
        >
          <span>Filter in Full 5,822-Document Vault</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="overflow-x-auto bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--surface)] border-b border-[var(--rule)] text-xs font-semibold text-[var(--muted)]">
              <th scope="col" className="py-3 px-4">Syllabus / Curriculum Document</th>
              <th scope="col" className="py-3 px-4 font-mono">Regulation</th>
              <th scope="col" className="py-3 px-4 font-mono">Size</th>
              <th scope="col" className="py-3 px-4 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--rule)] text-sm">
            {docs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 px-4 text-center text-sm text-[var(--muted)]">
                  No syllabus PDFs matched directly for {department.shortName}. Browse the{' '}
                  <Link href="/documents?category=syllabus" className="underline text-[var(--primary-navy)]">
                    Central Syllabus Vault
                  </Link>
                  .
                </td>
              </tr>
            ) : (
              docs.map((doc: any) => {
                const title = decodeHtmlEntities(doc.title || doc.filename || 'Syllabus Document');
                const reg = inferRegulation(title, doc.filename || '');
                const safeUrl = String(doc.fileUrl || '').replace(/^http:\/\//i, 'https://');
                return (
                  <tr key={doc.id} className="hover:bg-[var(--surface)]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-2.5">
                        <FileText className="w-4 h-4 text-[var(--brand-crimson)] shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <a
                            href={safeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[var(--ink)] hover:text-[var(--brand-crimson)] transition-colors"
                          >
                            {title}
                          </a>
                          <div className="font-mono text-[11px] text-[var(--muted)] mt-0.5">
                            {doc.filename}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <span className="px-2 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--rule)] text-[var(--primary-navy)] font-semibold">
                        {reg || 'Autonomous'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[var(--muted)] tabular-nums">
                      {formatFileSize(doc.fileSizeBytes)}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <a
                        href={safeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[var(--primary-navy)] hover:bg-[#08192e] text-white text-xs font-semibold transition-colors"
                      >
                        <span>PDF</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
