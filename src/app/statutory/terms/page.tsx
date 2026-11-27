import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use governing academic regulations, statutory records, admissions notices, and digital services of G. Pullaiah College of Engineering & Technology (Autonomous), Kurnool.',
};

export default function TermsOfUsePage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <header className="section-masthead pb-7 border-b border-[var(--rule)]">
          <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wide text-[var(--ruby)] mb-2.5">
            <FileText className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
            <span>Institutional Terms · Sri Sai Krishna Educational Society</span>
          </div>
          <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
            Terms of Use
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[66ch]">
            Conditions governing public and student access to official circulars, autonomous
            syllabi, accreditation disclosures, and inquiry services published by G. Pullaiah
            College of Engineering &amp; Technology (Autonomous).
          </p>
        </header>

        <article className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-10 space-y-8 text-[15.5px] leading-[1.72] text-[var(--ink)]">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              1. Institutional Authority
            </h2>
            <p className="max-w-[68ch]">
              This website serves as the official digital repository of{' '}
              <strong>G. Pullaiah College of Engineering &amp; Technology (Autonomous)</strong>,
              sponsored by <strong>Sri Sai Krishna Educational Society</strong>, permanently
              affiliated to <strong>JNTUA, Ananthapuramu</strong>, and approved by{' '}
              <strong>AICTE, New Delhi</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              2. Academic Regulations, Examinations &amp; Admissions
            </h2>
            <ul className="list-disc pl-6 space-y-2 max-w-[68ch]">
              <li>
                Published autonomous curriculum regulations (<span className="font-mono">R26</span>,{' '}
                <span className="font-mono">R25</span>, <span className="font-mono">R24</span>,{' '}
                <span className="font-mono">R23</span>, <span className="font-mono">R20</span>,{' '}
                <span className="font-mono">R19</span>, <span className="font-mono">R18</span>),
                academic calendars, and examination timetables are subject to resolutions of the
                GPCET Academic Council, Boards of Studies, and JNTUA notifications.
              </li>
              <li>
                Admissions counseling under EAPCET / ECET / PGECET / ICET code{' '}
                <span className="font-mono font-semibold text-[var(--ruby)]">PULE</span> and
                tuition fee schedules follow Government of Andhra Pradesh, APSCHE, and APHERMC
                orders in force at the time of admission.
              </li>
              <li>
                In the event of any discrepancy between a web summary and a signed PDF circular or
                gazette order issued by the Principal or Controller of Examinations, the signed
                official PDF governs.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              3. Permitted Use &amp; Intellectual Property
            </h2>
            <p className="max-w-[68ch]">
              Students, faculty, parents, and regulatory reviewers may view and download syllabi,
              question papers, NAAC Self Study Report documents, and circulars for bona fide
              academic and verification purposes. Automated bulk scraping, unauthorized framing,
              misrepresentation of institutional approvals, or abuse of inquiry endpoints is
              prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              4. Governing Law &amp; Clarifications
            </h2>
            <p className="max-w-[68ch]">
              These terms are governed by the laws of India, with jurisdiction vested in courts at
              Kurnool, Andhra Pradesh. Official clarifications regarding circulars or statutory
              filings may be directed to:
            </p>
            <div className="bg-[var(--surface)] border border-[var(--rule)] rounded-sm p-5 text-[14px] space-y-1.5 font-sans tabular-nums">
              <div className="font-semibold text-[var(--ink)]">
                G. Pullaiah College of Engineering &amp; Technology (Autonomous)
              </div>
              <div className="text-[var(--muted)]">
                Nandikotkur Road, Kurnool – 518 452, Andhra Pradesh
              </div>
              <div className="text-[var(--ink)]">
                Helpline: <strong>08518-285088</strong> · Email:{' '}
                <a
                  href="mailto:principal@gpcet.ac.in"
                  className="text-[var(--ruby)] underline underline-offset-4"
                >
                  principal@gpcet.ac.in
                </a>
              </div>
            </div>
          </section>

          <div className="pt-4 border-t border-[var(--rule)] flex flex-wrap gap-5 text-[13.5px] font-semibold">
            <Link
              href="/statutory/privacy"
              className="inline-flex items-center gap-1 text-[var(--ruby)] hover:underline underline-offset-4"
            >
              <span>Privacy Policy</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/statutory/accessibility"
              className="inline-flex items-center gap-1 text-[var(--ruby)] hover:underline underline-offset-4"
            >
              <span>Accessibility (WCAG AA)</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/statutory/mandatory-disclosure"
              className="inline-flex items-center gap-1 text-[var(--ruby)] hover:underline underline-offset-4"
            >
              <span>AICTE Mandatory Disclosure</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
