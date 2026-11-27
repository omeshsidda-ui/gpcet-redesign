import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement (WCAG 2.1 AA)',
  description:
    'Digital Accessibility Statement conforming to WCAG 2.1 Level AA standards for G. Pullaiah College of Engineering & Technology (Autonomous), Kurnool.',
};

export default function AccessibilityStatementPage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <header className="section-masthead pb-7 border-b border-[var(--rule)]">
          <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wide text-[var(--ruby)] mb-2.5">
            <ShieldCheck className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
            <span>WCAG 2.1 Level AA Conformance · Sri Sai Krishna Educational Society</span>
          </div>
          <h1 className="font-serif font-normal tracking-tight text-[var(--ink)]">
            Digital Accessibility Statement
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-[var(--muted)] max-w-[66ch]">
            G. Pullaiah College of Engineering &amp; Technology (Autonomous), Kurnool is committed
            to ensuring inclusive digital access across academic catalogs, admissions portals, and
            statutory disclosures in alignment with WCAG 2.1 Level AA guidelines.
          </p>
        </header>

        <article className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6 sm:p-10 space-y-8 text-[15.5px] leading-[1.72] text-[var(--ink)]">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              1. Conformance &amp; Engineering Measures
            </h2>
            <p className="max-w-[68ch]">
              This portal is engineered to meet{' '}
              <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> across
              desktop, tablet, and mobile viewports:
            </p>
            <ul className="list-disc pl-6 space-y-2 max-w-[68ch]">
              <li>
                <strong>Color Contrast &amp; Legibility:</strong> Primary charcoal text (
                <span className="font-mono text-xs">#181112</span>) and crimson institutional rules (
                <span className="font-mono text-xs">#8B0E1A</span>) against ivory ground surfaces (
                <span className="font-mono text-xs">#FCF9F7</span>) maintain at least 4.5:1 text
                contrast.
              </li>
              <li>
                <strong>Semantic Landmarks &amp; Skip Navigation:</strong> Pages expose structured{' '}
                <span className="font-mono text-xs">&lt;header&gt;</span>,{' '}
                <span className="font-mono text-xs">&lt;nav&gt;</span>,{' '}
                <span className="font-mono text-xs">&lt;main id=&quot;main-content&quot;&gt;</span>
                , and <span className="font-mono text-xs">&lt;footer&gt;</span> landmarks alongside
                a keyboard-focusable Skip-to-Main-Content link.
              </li>
              <li>
                <strong>Keyboard &amp; Screen-Reader Navigation:</strong> Desktop mega-menus,
                command search (<span className="font-mono text-xs">⌘K</span> /{' '}
                <span className="font-mono text-xs">role=&quot;dialog&quot;</span>), and the native
                mobile navigation sheet (<span className="font-mono text-xs">showModal()</span>)
                support <span className="font-mono text-xs">Tab</span>, arrow-key selection,{' '}
                <span className="font-mono text-xs">Escape</span> dismissal, focus restoration, and
                dual-ring <span className="font-mono text-xs">:focus-visible</span> indicators.
              </li>
              <li>
                <strong>Accessible Data Tables &amp; Motion Respect:</strong> Academic tables wrap
                in scrollable <span className="font-mono text-xs">region</span> containers with
                explicit <span className="font-mono text-xs">scope=&quot;col&quot;</span> headers,
                and animations honor{' '}
                <span className="font-mono text-xs">prefers-reduced-motion: reduce</span>.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              2. Legacy Archival PDFs
            </h2>
            <p className="max-w-[68ch]">
              The Central Document Vault indexes over 5,822 legacy WordPress, JNTUA, AICTE, and
              NAAC circulars. Certain historical scanned PDFs (such as older approval letters or
              archived question papers) may predate modern PDF/UA tagging. When requested, the
              institution provides accessible text summaries or direct office assistance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-normal text-[var(--ink)] pb-2 border-b border-[var(--rule)]">
              3. Accessibility Feedback &amp; Alternate Formats
            </h2>
            <p className="max-w-[68ch]">
              If you encounter an accessibility barrier on any page or require an institutional
              document in an alternate format, please reach out directly:
            </p>
            <div className="bg-[var(--surface)] border border-[var(--rule)] rounded-sm p-5 text-[14px] space-y-1.5 font-sans tabular-nums">
              <div className="font-semibold text-[var(--ink)]">
                GPCET Institutional Web &amp; Accessibility Desk
              </div>
              <div className="text-[var(--muted)]">
                G. Pullaiah College of Engineering &amp; Technology (Sri Sai Krishna Educational
                Society), Nandikotkur Road, Kurnool – 518 452
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
              href="/statutory/mandatory-disclosure"
              className="inline-flex items-center gap-1 text-[var(--ruby)] hover:underline underline-offset-4"
            >
              <span>AICTE Mandatory Disclosure</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/statutory/privacy"
              className="inline-flex items-center gap-1 text-[var(--ruby)] hover:underline underline-offset-4"
            >
              <span>Privacy Policy</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/statutory/terms"
              className="inline-flex items-center gap-1 text-[var(--ruby)] hover:underline underline-offset-4"
            >
              <span>Terms of Use</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
