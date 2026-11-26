import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, FileText, ShieldCheck, Users } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import { getCleanedContent } from '@/lib/institutional-content';

export const metadata: Metadata = {
  title: 'Administration & Governance',
  description:
    'Governing Body, Management, Principal Desk, Academic Council, and Statutory Committees of G. Pullaiah College of Engineering & Technology (Autonomous).',
};

export default function AdministrationPage() {
  const governingBody = getCleanedContent(['administration', 'governing-body']);
  const academicCouncil = getCleanedContent(['administration', 'academic-council']);
  const management = getCleanedContent(['administration', 'our-management']);
  const principalMsg = getCleanedContent(['administration', 'message-from-principal']);

  const committeeLinks = [
    { label: 'Internal Quality Assurance Cell (IQAC)', href: '/administration/iqac' },
    { label: 'College Statutory Committees (19 Cells)', href: '/administration/college-committees' },
    { label: 'Anti-Ragging Committee', href: '/administration/anti-ragging' },
    { label: 'Women Grievance Redressal Cell', href: '/administration/women-grievance' },
    { label: 'Right to Information (RTI Act)', href: '/administration/rti' },
    { label: 'Departmental BoS Resolutions', href: '/administration/dept-bos-meetings' },
  ];

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <header className="pb-6 border-b border-[var(--rule)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[var(--ink)]">
              Administration &amp; Institutional Governance
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[var(--muted)] max-w-[66ch]">
              Autonomous statutory governance led by the Ravindra Educational Society Governing
              Body, Principal, Academic Council, and Internal Quality Assurance Cell.
            </p>
          </div>
          <div className="lg:col-span-4 lg:border-l lg:border-[var(--rule)] lg:pl-6 flex flex-col gap-2">
            <a
              href="https://www.gpcet.ac.in/wp-content/uploads/2025/12/Mandatory-Disclousre-25-26.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[var(--primary-navy)] hover:bg-[#08192e] text-white text-xs font-semibold transition-colors"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>AICTE Mandatory Disclosure (2025–26)</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </header>

        {/* Management & Principal Strip */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--primary-navy)]">
              <Users className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
              <span>FOUNDATION &amp; MANAGEMENT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-5 border-b border-[var(--rule)]">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/leadership/chairman.jpg"
                  alt="Sri G. Pullaiah"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border border-[var(--rule)]"
                />
                <div>
                  <div className="text-sm font-bold text-[var(--ink)]">Sri G. Pullaiah</div>
                  <div className="text-xs text-[var(--muted)]">Secretary &amp; Correspondent</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/leadership/Sri.-G-Vamsidhar-Vice-Chairman.jpg"
                  alt="Sri G. Vamsidhar"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border border-[var(--rule)]"
                />
                <div>
                  <div className="text-sm font-bold text-[var(--ink)]">Sri G. Vamsidhar</div>
                  <div className="text-xs text-[var(--muted)]">Vice-Chairman</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/leadership/principal.jpg"
                  alt="Dr. C. Srinivasa Rao"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border border-[var(--rule)]"
                />
                <div>
                  <div className="text-sm font-bold text-[var(--ink)]">Dr. C. Srinivasa Rao</div>
                  <div className="text-xs text-[var(--muted)]">Principal</div>
                </div>
              </div>
            </div>

            {management && <MarkdownRenderer content={management.content} />}
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* Principal's Desk */}
            <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6">
              <h2 className="font-serif text-xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
                Principal&apos;s Desk — Dr. C. Srinivasa Rao
              </h2>
              {principalMsg && <MarkdownRenderer content={principalMsg.content} />}
            </div>

            {/* Statutory Committees Index */}
            <div className="bg-[var(--surface)] border border-[var(--rule)] rounded-md p-6">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--primary-navy)] pb-3 border-b border-[var(--rule)]">
                <ShieldCheck className="w-4 h-4 text-[var(--brass-gold)]" aria-hidden="true" />
                <span>STATUTORY COMMITTEES &amp; CELLS</span>
              </div>
              <ul className="divide-y divide-[var(--rule)] mt-1 text-xs">
                {committeeLinks.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="py-2.5 flex items-center justify-between font-medium text-[var(--ink)] hover:text-[var(--brand-crimson)] transition-colors"
                    >
                      <span>{c.label}</span>
                      <span className="font-mono text-[var(--muted)]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Governing Body */}
        {governingBody && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
              Governing Body Constitution
            </h2>
            <MarkdownRenderer content={governingBody.content} />
          </section>
        )}

        {/* Academic Council */}
        {academicCouncil && (
          <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
              Autonomous Academic Council
            </h2>
            <MarkdownRenderer content={academicCouncil.content} />
          </section>
        )}
      </div>
    </div>
  );
}
