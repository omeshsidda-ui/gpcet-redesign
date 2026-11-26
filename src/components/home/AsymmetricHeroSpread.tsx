import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Building2 } from 'lucide-react';
import LiveAcademicGazette, { GazetteDocument, GazetteNotice } from './LiveAcademicGazette';

interface AsymmetricHeroSpreadProps {
  notices: GazetteNotice[];
  keyDocuments: GazetteDocument[];
  totalFacultyCount: number;
  totalDocumentCount: number;
}

export default function AsymmetricHeroSpread({
  notices,
  keyDocuments,
  totalFacultyCount,
  totalDocumentCount,
}: AsymmetricHeroSpreadProps) {
  return (
    <section
      aria-labelledby="hero-institutional-title"
      className="bg-[var(--bg)] border-b border-[var(--rule)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
        {/* 58% / 42% Editorial Split along the 42% axis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column (58% / 7 cols): Institutional Mandate */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:pr-8 lg:border-r lg:border-[var(--rule)]">
            <div>
              {/* Civic Credential Line (Clean typographic, no micro-kicker pill) */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[var(--muted)] pb-5 border-b border-[var(--rule)]">
                <span className="font-semibold text-[var(--primary-navy)]">
                  G. Pullaiah College of Engineering &amp; Technology
                </span>
                <span aria-hidden="true">·</span>
                <span>Kurnool, Andhra Pradesh</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-[var(--brass-gold)] font-semibold">
                  NAAC A+ (3.38 CGPA)
                </span>
              </div>

              {/* Masked Serif Headline Reveal */}
              <h1
                id="hero-institutional-title"
                className="mt-7 font-serif text-4xl sm:text-5xl lg:text-[3.35rem] font-medium tracking-[-0.025em] leading-[1.04] text-[var(--ink)]"
              >
                <span className="overflow-hidden block">
                  <span className="animate-masked-headline">An Autonomous Engineering</span>
                </span>
                <span className="overflow-hidden block mt-1">
                  <span className="animate-masked-headline-stagger">
                    Citadel in Rayalaseema.
                  </span>
                </span>
              </h1>

              {/* Institutional Standfirst */}
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--muted)] max-w-[62ch]">
                Grounded in academic rigor, technical invention, and civic responsibility since 2007.
                Conferred Autonomous status by UGC, permanently affiliated with JNTU Anantapur, and
                accredited across five core engineering disciplines by the National Board of
                Accreditation.
              </p>

              {/* Primary CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/documents"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-md bg-[var(--brand-crimson)] hover:bg-[#72112e] text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-navy)]"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>Access Document Vault</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/departments"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-md border border-[var(--primary-navy)] text-[var(--primary-navy)] bg-[var(--surface-raised)] hover:bg-[var(--surface)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-navy)]"
                >
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                  <span>Explore Departments</span>
                </Link>
              </div>
            </div>

            {/* Monolithic Tabular Stats Bar */}
            <div className="mt-10 pt-6 border-t border-[var(--rule)] grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--ink)] tabular-nums">
                  360
                </div>
                <div className="text-xs text-[var(--muted)] mt-1">CSE Annual Intake</div>
              </div>

              <div className="sm:border-l sm:border-[var(--rule)] sm:pl-5">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--brass-gold)] tabular-nums">
                  A+
                </div>
                <div className="text-xs text-[var(--muted)] mt-1">NAAC Cycle 2 (3.38)</div>
              </div>

              <div className="sm:border-l sm:border-[var(--rule)] sm:pl-5">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--primary-navy)] tabular-nums">
                  5
                </div>
                <div className="text-xs text-[var(--muted)] mt-1">NBA Accredited B.Tech</div>
              </div>

              <div className="sm:border-l sm:border-[var(--rule)] sm:pl-5">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--brand-crimson)] tabular-nums">
                  {totalFacultyCount}
                </div>
                <div className="text-xs text-[var(--muted)] mt-1">
                  Faculty · {totalDocumentCount.toLocaleString('en-US')} Docs
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (42% / 5 cols): Live Academic Gazette */}
          <div className="lg:col-span-5">
            <LiveAcademicGazette
              notices={notices}
              keyDocuments={keyDocuments}
              totalCatalogedCount={totalDocumentCount}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
