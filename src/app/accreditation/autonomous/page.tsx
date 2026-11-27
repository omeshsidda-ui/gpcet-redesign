import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Award, ShieldCheck } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getCleanedContent } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'UGC Autonomous Status & JNTUA Affiliation',
  description:
    'UGC Autonomous conferment (2018–19 to 2027–28), Section 2(f) & 12(B) recognition, permanent affiliation to JNTUA Ananthapuramu, and 20 years of AICTE approvals for GPCET Kurnool.',
};

export default function AutonomousAccreditationPage() {
  const affiliationMd = getCleanedContent([
    'archive-or-orphan',
    'accreditation-and-affiliation',
  ]);
  const aicteLettersMd = getCleanedContent(['accreditation', 'aicte-approval-letters']);

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <Link
            href="/accreditation"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Accreditation Gateway</span>
          </Link>
        </div>

        {/* Masthead */}
        <header className="section-masthead pb-8 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
              UGC Autonomous Status &amp; JNTUA Affiliation
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[64ch]">
              Conferred Autonomous Status by the University Grants Commission (UGC) for a ten-year
              term from 2018–19 to 2027–28, permanently affiliated with Jawaharlal Nehru
              Technological University Anantapur (JNTUA), and approved by AICTE since inception in
              2007.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-5 pt-5 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--rule)] lg:pl-7 font-sans tabular-nums">
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] tabular-nums">
                2018–28
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">UGC Autonomy</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-semibold text-[var(--ruby)]">
                2(f)/12(B)
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">UGC Act 1956</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--distinction-ink)] tabular-nums">
                20 Years
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">AICTE EoA</div>
            </div>
          </div>
        </header>

        {/* Statutory Conferment Summary */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--rule)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm overflow-hidden">
          <div className="bg-[var(--surface-raised)] p-6 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--distinction-ink)]">
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>UGC Autonomous Conferment</span>
            </div>
            <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
              10-Year Autonomous Term
            </h2>
            <p className="text-[14px] text-[var(--muted)] leading-relaxed">
              Granted autonomy for 2018–19 through 2027–28 covering undergraduate B.Tech and
              postgraduate M.Tech &amp; MBA curriculum design and examination evaluation.
            </p>
            <Link
              href="/academics/academic-council"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)] pt-1"
            >
              <span>Academic Council &amp; BoS</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="bg-[var(--surface-raised)] p-6 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)]">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>JNTUA Ananthapuramu</span>
            </div>
            <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
              Permanent University Affiliation
            </h2>
            <p className="text-[14px] text-[var(--muted)] leading-relaxed">
              Permanently affiliated to JNTUA vide Procds. No.{' '}
              <span className="font-mono text-xs text-[var(--ink)]">
                JNTUA/DAAO/A2/Permanent Affiliation/AT/2018-19
              </span>
              , dated 03 Oct 2018.
            </p>
            <Link
              href="/academics/regulations-and-syllabus"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)] pt-1"
            >
              <span>Autonomous Regulations</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="bg-[var(--surface-raised)] p-6 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)]">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>UGC Section 2(f) &amp; 12(B)</span>
            </div>
            <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
              Central Assistance Eligibility
            </h2>
            <p className="text-[14px] text-[var(--muted)] leading-relaxed">
              Recognized under Sections 2(f) &amp; 12(B) of the UGC Act, 1956 (
              <span className="font-mono text-xs text-[var(--ink)]">
                F. No. 8-93/2016 (CPP-I/C)
              </span>
              , 12 May 2016).
            </p>
            <Link
              href="/statutory/mandatory-disclosure"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)] pt-1"
            >
              <span>AICTE Mandatory Disclosure</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Accreditation & Affiliation Details */}
        {affiliationMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
              Affiliation &amp; Accreditation Orders
            </h2>
            <MarkdownRenderer content={affiliationMd.content} />
          </section>
        )}

        {/* AICTE Approval Letters */}
        {aicteLettersMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
              AICTE Extension of Approval (EoA) Archive (2007–2027)
            </h2>
            <MarkdownRenderer content={aicteLettersMd.content} />
          </section>
        )}
      </div>
    </div>
  );
}
