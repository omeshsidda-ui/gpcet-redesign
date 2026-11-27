import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Institutional Privacy Policy for the official digital portal of G. Pullaiah College of Engineering & Technology (Autonomous), sponsored by Sri Sai Krishna Educational Society, Kurnool.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <header className="section-masthead pb-7 border-b border-[var(--rule)]">
          <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wide text-[var(--ruby)] mb-2.5">
            <ShieldCheck className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
            <span>Statutory Legal Notice · Sri Sai Krishna Educational Society</span>
          </div>
          <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
            Institutional Privacy Policy
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[66ch]">
            Data stewardship and privacy standards governing the official web portal of G. Pullaiah
            College of Engineering &amp; Technology (Autonomous), Kurnool, affiliated to JNTUA and
            approved by AICTE, New Delhi.
          </p>
        </header>

        <article className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-10 space-y-8 text-[15.5px] leading-[1.72] text-[var(--ink)]">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              1. Institutional Scope &amp; Governance
            </h2>
            <p className="max-w-[68ch]">
              This digital portal is operated by G. Pullaiah College of Engineering &amp; Technology
              (Autonomous), established under the <strong>Sri Sai Krishna Educational Society</strong>{' '}
              at Near Venkayapalli, Pasupula Village, Nandikotkur Road, Kurnool – 518 452, Andhra
              Pradesh. It serves prospective applicants, enrolled students, faculty members,
              alumni, and statutory accreditation evaluators (NAAC, NBA, UGC, AICTE, and JNTUA).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              2. Information Collected
            </h2>
            <p className="max-w-[68ch]">
              Browsing public academic archives, syllabi, faculty profiles, and accreditation
              disclosures does not require registration or user profiling. Personal information is
              collected only when voluntarily submitted through official institutional workflows:
            </p>
            <ul className="list-disc pl-6 space-y-2 max-w-[68ch]">
              <li>
                <strong>Admissions Counseling Inquiries:</strong> Applicant name, email address,
                10-digit telephone number, preferred degree level (B.Tech, M.Tech, MBA), branch
                preference, optional AP EAPCET / ECET / ICET rank, and inquiry notes submitted on{' '}
                <Link
                  href="/admissions#inquiry"
                  className="text-[var(--ruby)] underline underline-offset-4"
                >
                  /admissions
                </Link>
                .
              </li>
              <li>
                <strong>Staff &amp; Faculty Administration:</strong> Authenticated session
                credentials strictly for authorized college administrators managing official notices
                and faculty records.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              3. Purpose, Retention &amp; Non-Disclosure
            </h2>
            <p className="max-w-[68ch]">
              Submitted inquiry data is used solely by the GPCET Admissions Desk for academic
              counseling, APSCHE seat matrix guidance (Counseling Code{' '}
              <span className="font-mono text-[var(--ruby)] font-semibold">PULE</span>), and
              statutory reporting required by JNTUA, APSCHE, or AICTE. The institution never sells,
              rents, or shares applicant or student contact details with third-party commercial
              advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              4. Cookies, Search &amp; Technical Safeguards
            </h2>
            <p className="max-w-[68ch]">
              Public document search operates locally in the browser without behavioral tracking
              cookies. Essential HTTP-only session cookies are issued only for authenticated staff
              administration workflows. All traffic is protected by HTTPS transport security,
              strict Content Security Policy (CSP) headers, input validation, and rate limiting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              5. Data Access &amp; Institutional Contact
            </h2>
            <p className="max-w-[68ch]">
              Applicants or stakeholders wishing to update or request removal of admissions inquiry
              records may contact the Office of the Principal:
            </p>
            <div className="bg-[var(--surface)] border border-[var(--rule)] rounded-sm p-5 text-[14px] space-y-1.5 font-sans tabular-nums">
              <div className="font-semibold text-[var(--ink)]">
                Office of the Principal — G. Pullaiah College of Engineering &amp; Technology
              </div>
              <div className="text-[var(--muted)]">
                Nandikotkur Road, Pasupula Village, Kurnool – 518 452, Andhra Pradesh
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
              href="/statutory/terms"
              className="inline-flex items-center gap-1 text-[var(--ruby)] hover:underline underline-offset-4"
            >
              <span>Terms of Use</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/statutory/accessibility"
              className="inline-flex items-center gap-1 text-[var(--ruby)] hover:underline underline-offset-4"
            >
              <span>Accessibility Statement (WCAG AA)</span>
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
