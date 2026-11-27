import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getCleanedContent } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'IEEE, IEI & ISTE Professional Chapters',
  description:
    'Collegiate professional society chapters at GPCET Kurnool: IEEE Student Chapter, Institution of Engineers (India) (IEI), Indian Society for Technical Education (ISTE), and CSI.',
};

export default function ResearchChaptersPage() {
  const ieeeMd = getCleanedContent(['archive-or-orphan', 'ieee']);
  const ieiMd = getCleanedContent(['archive-or-orphan', 'iei']);
  const isteMd = getCleanedContent(['archive-or-orphan', 'iste']);
  const csiMd = getCleanedContent(['archive-or-orphan', 'csi']);

  const chapters = [
    {
      code: 'IEEE',
      name: 'IEEE Student Chapter',
      href: '/archive-or-orphan/ieee',
      content: ieeeMd?.content,
    },
    {
      code: 'IEI',
      name: 'Institution of Engineers (India) — IEI',
      href: '/archive-or-orphan/iei',
      content: ieiMd?.content,
    },
    {
      code: 'ISTE',
      name: 'Indian Society for Technical Education — ISTE',
      href: '/archive-or-orphan/iste',
      content: isteMd?.content,
    },
    {
      code: 'CSI',
      name: 'Computer Society of India — CSI',
      href: '/archive-or-orphan/csi',
      content: csiMd?.content,
    },
  ].filter((c) => Boolean(c.content));

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Research &amp; Development</span>
          </Link>
        </div>

        <header className="section-masthead pb-8 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
              IEEE &amp; Professional Engineering Chapters
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[64ch]">
              Active collegiate technical chapters connecting GPCET students and faculty with
              national and global engineering societies including IEEE, IE(I), ISTE, and CSI.
            </p>
          </div>
          <div className="lg:col-span-4 lg:border-l lg:border-[var(--rule)] lg:pl-7 flex flex-wrap gap-3">
            <Link
              href="/accreditation/aicte-idea-lab"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[var(--ruby)] hover:bg-[var(--burgundy)] text-white text-[13px] font-semibold transition-colors"
            >
              <span>AICTE IDEA Lab</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/campus-life"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-[var(--rule)] bg-[var(--surface-raised)] hover:border-[var(--ruby)] text-[13px] font-semibold text-[var(--ink)] transition-colors"
            >
              <span>Student Clubs</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </header>

        {/* Monolithic Chapters Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chapters.map((chapter) => (
            <section
              key={chapter.code}
              className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm p-6 sm:p-8 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--rule)]">
                  <span className="font-mono text-xs font-semibold text-[var(--ruby)] bg-[var(--surface)] border border-[var(--rule)] px-2 py-0.5 rounded-sm">
                    {chapter.code}
                  </span>
                  <Link
                    href={chapter.href}
                    className="text-xs font-semibold text-[var(--ruby)] hover:underline underline-offset-4"
                  >
                    Archival Record →
                  </Link>
                </div>
                <h2 className="font-serif text-2xl font-normal text-[var(--ink)]">
                  {chapter.name}
                </h2>
                {chapter.content && <MarkdownRenderer content={chapter.content} />}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
