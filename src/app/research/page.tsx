import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, FlaskConical, Award, BookOpen } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getCleanedContent } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'Research, Development & Innovation',
  description:
    'Research & Development Cell, AICTE IDEA Lab, SERB/ISRO/AICTE funded grants, JNTUA Ph.D. research centers, faculty publications, and IEEE/IEI/ISTE chapters at GPCET Kurnool.',
};

export default function ResearchGatewayPage() {
  const researchHomeMd = getCleanedContent(['research', 'research-home']);
  const researchFundsMd = getCleanedContent(['research', 'research-funds']);
  const rdCellMd = getCleanedContent(['research', 'research-development-cell']);
  const ideaLabMd = getCleanedContent(['accreditation', 'aicte-idea-lab']);

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <header className="section-masthead pb-8 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
              Research, Development &amp; Innovation
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[64ch]">
              Applied engineering research, extramural grants from AICTE, SERB, and ISRO, JNTUA
              doctoral research centers, the AICTE IDEA Lab fabrication hub, and collegiate
              professional chapters.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-5 pt-5 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-7 font-sans tabular-nums">
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] tabular-nums">
                ₹88.17L+
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">Funded Grants</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ruby)] tabular-nums">
                2 Centers
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">JNTUA Ph.D.</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--distinction-ink)] tabular-nums">
                15+
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">Patents Filed</div>
            </div>
          </div>
        </header>

        {/* Monolithic Research Directory Register */}
        <section aria-label="Research portals and chapters">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--rule)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm overflow-hidden">
            <Link
              href="/accreditation/aicte-idea-lab"
              className="bg-[var(--surface-raised)] hover:bg-[var(--surface)] p-6 transition-colors flex flex-col justify-between gap-4"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)]">
                  <Cpu className="w-4 h-4" aria-hidden="true" />
                  <span>AICTE Supported</span>
                </div>
                <h2 className="font-serif text-xl font-normal text-[var(--ink)] mt-2">
                  AICTE IDEA Lab
                </h2>
                <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mt-1.5">
                  3D printers, laser cutters, IoT prototyping kits, and interdisciplinary
                  fabrication labs.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)]">
                Open IDEA Lab <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/research/chapters"
              className="bg-[var(--surface-raised)] hover:bg-[var(--surface)] p-6 transition-colors flex flex-col justify-between gap-4"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)]">
                  <Award className="w-4 h-4" aria-hidden="true" />
                  <span>Student &amp; Faculty Bodies</span>
                </div>
                <h2 className="font-serif text-xl font-normal text-[var(--ink)] mt-2">
                  IEEE, IEI &amp; ISTE Chapters
                </h2>
                <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mt-1.5">
                  IEEE Student Branch, Institution of Engineers (India), ISTE, and CSI chapters.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)]">
                Explore Chapters <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/research/research-centers"
              className="bg-[var(--surface-raised)] hover:bg-[var(--surface)] p-6 transition-colors flex flex-col justify-between gap-4"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)]">
                  <FlaskConical className="w-4 h-4" aria-hidden="true" />
                  <span>Doctoral Studies</span>
                </div>
                <h2 className="font-serif text-xl font-normal text-[var(--ink)] mt-2">
                  JNTUA Research Centers
                </h2>
                <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mt-1.5">
                  Recognized Ph.D. centers in ECE &amp; EEE alongside registered university
                  supervisors.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)]">
                View Ph.D. Centers <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/accreditation/naac/3-4-3"
              className="bg-[var(--surface-raised)] hover:bg-[var(--surface)] p-6 transition-colors flex flex-col justify-between gap-4"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)]">
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>NAAC Metric 3.4.3</span>
                </div>
                <h2 className="font-serif text-xl font-normal text-[var(--ink)] mt-2">
                  Publications &amp; Policies
                </h2>
                <p className="text-[13.5px] text-[var(--muted)] leading-relaxed mt-1.5">
                  Faculty journal publications, seed money sanction orders, and conference records.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)]">
                View Publications <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>

        {/* Research & Development Home Overview */}
        {researchHomeMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[var(--rule)] mb-5">
              <h2 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)]">
                Research &amp; Development Overview
              </h2>
              <div className="flex flex-wrap gap-4 text-[13px] font-semibold">
                <Link
                  href="/research/research-supervisor"
                  className="text-[var(--ruby)] hover:underline underline-offset-4"
                >
                  Research Supervisors →
                </Link>
                <Link
                  href="/research/research-polices"
                  className="text-[var(--ruby)] hover:underline underline-offset-4"
                >
                  R&amp;D Policies →
                </Link>
              </div>
            </div>
            <MarkdownRenderer content={researchHomeMd.content} />
          </section>
        )}

        {/* Government Funded Research Projects */}
        {researchFundsMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[var(--rule)] mb-5">
              <h2 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)]">
                Government Funded Research Grants (AICTE, SERB, ISRO, IEI)
              </h2>
              <Link
                href="/archive-or-orphan/sanction-order"
                className="text-[13px] font-semibold text-[var(--ruby)] hover:underline underline-offset-4"
              >
                Seed Money Sanction Orders →
              </Link>
            </div>
            <MarkdownRenderer content={researchFundsMd.content} />
          </section>
        )}

        {/* R&D Cell Governance & AICTE IDEA Lab */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {ideaLabMd && (
            <section className="lg:col-span-6 bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[var(--rule)] mb-5">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--ink)]">
                  AICTE IDEA Lab Fabrication Center
                </h2>
                <Link
                  href="/accreditation/aicte-idea-lab"
                  className="text-[13px] font-semibold text-[var(--ruby)] hover:underline underline-offset-4"
                >
                  Full Page →
                </Link>
              </div>
              <MarkdownRenderer content={ideaLabMd.content} />
            </section>
          )}

          {rdCellMd && (
            <section className="lg:col-span-6 bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[var(--rule)] mb-5">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--ink)]">
                  R&amp;D Cell Functions &amp; Faculty Support
                </h2>
                <Link
                  href="/research/research-cohosted"
                  className="text-[13px] font-semibold text-[var(--ruby)] hover:underline underline-offset-4"
                >
                  Conferences →
                </Link>
              </div>
              <MarkdownRenderer content={rdCellMd.content} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
