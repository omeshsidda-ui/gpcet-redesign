import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink, FileText, ShieldCheck } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getCleanedContent } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'AICTE Mandatory Disclosure',
  description:
    'Official AICTE Mandatory Disclosure for G. Pullaiah College of Engineering & Technology (Autonomous), sponsored by Sri Sai Krishna Educational Society, Kurnool. JNTUA affiliation and AICTE EoA approvals.',
};

const INSTITUTIONAL_PARTICULARS = [
  {
    label: 'Name of the Institution',
    value: 'G. Pullaiah College of Engineering & Technology (Autonomous)',
  },
  {
    label: 'Trust / Sponsoring Society',
    value: 'Sri Sai Krishna Educational Society (Established 2007)',
  },
  {
    label: 'Campus Address',
    value:
      'Near Venkayapalli, Pasupula Village, Nandikotkur Road, Kurnool – 518 452, Andhra Pradesh, India',
  },
  {
    label: 'Official Contact',
    value: 'Landline / Helpline: 08518-285088 · 08518-285011 · Email: principal@gpcet.ac.in',
  },
  {
    label: 'Head of Institution',
    value: 'Dr. C. Srinivasa Rao, M.Tech., Ph.D. — Principal',
  },
  {
    label: 'Affiliating University',
    value:
      'Jawaharlal Nehru Technological University Anantapur (JNTUA), Ananthapuramu — Permanent Affiliation (Procds. No. JNTUA/DAAO/A2/Permanent Affiliation/AT/2018-19)',
  },
  {
    label: 'UGC Recognition & Autonomy',
    value:
      'UGC Autonomous Institution (2018–19 to 2027–28) · Recognized under Sections 2(f) & 12(B) of the UGC Act, 1956',
  },
  {
    label: 'AICTE Statutory Standing',
    value:
      'Approved by All India Council for Technical Education (AICTE), New Delhi with continuous Extension of Approval (2007–08 to 2026–27)',
  },
  {
    label: 'National Accreditations',
    value: "NAAC 'A+' Grade (Cycle 2, 3.38 CGPA) · NBA Tier-1 Accredited Programs · NIRF Participant",
  },
  {
    label: 'APSCHE Counseling Codes',
    value: 'EAPCET / ECET / PGECET / ICET Code: PULE · University College Code: GP',
  },
];

const STATUTORY_CELLS = [
  {
    title: 'Right to Information (RTI Act)',
    href: '/administration/rti',
    note: 'Statutory PIO and RTI compliance filing',
  },
  {
    title: 'Anti-Ragging Committee & Affidavit',
    href: '/administration/anti-ragging',
    note: 'Zero-tolerance anti-ragging cell',
  },
  {
    title: 'Grievance Redressal Cell',
    href: '/administration/women-grievance',
    note: 'Student & Women Grievance Redressal mechanism',
  },
  {
    title: 'UGC Autonomous & Affiliation Orders',
    href: '/accreditation/autonomous',
    note: 'Conferment letters & JNTUA permanent affiliation',
  },
  {
    title: 'Institutional Policy Documents',
    href: '/archive-or-orphan/policy-documents',
    note: 'Code of ethics, R&D policy, NEP 2020 & audits',
  },
  {
    title: 'NIRF Data Submissions',
    href: '/accreditation/nirf-2',
    note: 'National Institutional Ranking Framework PDFs (2018–2025)',
  },
];

export default function MandatoryDisclosurePage() {
  const aicteLettersMd = getCleanedContent(['accreditation', 'aicte-approval-letters']);

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Masthead */}
        <header className="section-masthead pb-8 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wide text-[var(--ruby)] mb-2.5">
              <ShieldCheck className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
              <span>AICTE Statutory Compliance · Sri Sai Krishna Educational Society</span>
            </div>
            <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
              AICTE Mandatory Disclosure
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[64ch]">
              Comprehensive statutory institutional particulars, governance details, JNTUA
              permanent affiliation, and AICTE Extension of Approval (EoA) filings for G. Pullaiah
              College of Engineering &amp; Technology (Autonomous), Kurnool.
            </p>
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-[var(--rule)] lg:pl-7 flex flex-col gap-2.5">
            <a
              href="https://www.gpcet.ac.in/wp-content/uploads/2025/12/Mandatory-Disclousre-25-26.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-[var(--ruby)] hover:bg-[var(--burgundy)] text-white text-[13px] font-semibold transition-colors"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Mandatory Disclosure 2025–26 (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <span className="font-sans text-xs text-[var(--muted)] tabular-nums">
              Helpline: 08518-285088 · principal@gpcet.ac.in
            </span>
          </div>
        </header>

        {/* Institutional Particulars Register */}
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm overflow-hidden">
          <div className="px-6 py-4 bg-[var(--surface)] border-b border-[var(--rule)]">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--ink)]">
              Statutory Institutional Particulars
            </h2>
          </div>

          <dl className="divide-y divide-[var(--rule)]">
            {INSTITUTIONAL_PARTICULARS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 px-6 py-4 text-[14.5px]"
              >
                <dt className="md:col-span-4 font-semibold text-[var(--ink)]">{row.label}</dt>
                <dd className="md:col-span-8 text-[var(--muted)] leading-relaxed tabular-nums">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related Statutory Cells */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-normal text-[var(--ink)]">
            Statutory Disclosures &amp; Governance Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--rule)] border border-[var(--rule)] rounded-sm overflow-hidden">
            {STATUTORY_CELLS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-[var(--surface-raised)] hover:bg-[var(--surface)] p-5 transition-colors flex flex-col justify-between gap-3"
              >
                <div>
                  <h3 className="font-serif text-lg font-medium text-[var(--ink)]">{item.title}</h3>
                  <p className="text-[13px] text-[var(--muted)] mt-1 leading-relaxed">{item.note}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ruby)]">
                  Open Document <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* AICTE EoA Letters Table */}
        {aicteLettersMd && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-3.5 border-b border-[var(--rule)] mb-5">
              AICTE Extension of Approval Letters (2007–2027)
            </h2>
            <MarkdownRenderer content={aicteLettersMd.content} />
          </section>
        )}
      </div>
    </div>
  );
}
