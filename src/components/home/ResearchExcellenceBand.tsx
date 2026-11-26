import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Library, Award, FileText } from 'lucide-react';

export default function ResearchExcellenceBand() {
  return (
    <section
      aria-labelledby="research-excellence-heading"
      className="bg-[var(--bg)] py-14 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header aligned to 42% axis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b border-[var(--rule)] items-end">
          <div className="lg:col-span-5">
            <h2
              id="research-excellence-heading"
              className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[var(--ink)]"
            >
              Research, Library &amp; Prototyping
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[var(--muted)] max-w-[62ch]">
              Campus research infrastructure spanning the AICTE IDEA Lab, Central &amp; Digital
              Libraries, IEEE Student Branch, and NAAC-verified research publications.
            </p>
            <Link
              href="/research/research-home"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] transition-colors"
            >
              <span>Research &amp; Development Cell</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Asymmetric Two-Column Showcase */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: AICTE IDEA Lab + Campus Building Visual */}
          <div className="lg:col-span-7 bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md overflow-hidden">
            <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--surface)] border-b border-[var(--rule)]">
              <img
                src="/assets/campus/GPCET-building.jpg"
                alt="G. Pullaiah College of Engineering & Technology Academic Campus, Kurnool"
                width={960}
                height={540}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[var(--ruby)]">
                  <Cpu className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
                  <span>AICTE IDEA LAB · R&amp;D CELL · IEEE STUDENT BRANCH</span>
                </div>
                <span className="font-mono text-xs text-[var(--muted)] tabular-nums">
                  48 NAAC SSR Metrics
                </span>
              </div>

              <h3 className="font-serif text-2xl font-medium text-[var(--ink)] mt-3">
                AICTE IDEA Lab &amp; Applied Engineering Research
              </h3>

              <p className="text-sm text-[var(--muted)] leading-relaxed mt-2.5 max-w-[68ch]">
                Equipped with 3D printers, laser cutters, IoT prototyping kits, and multidisciplinary
                fabrication benches, the AICTE IDEA Lab bridges classroom theory and product
                development under Chief Mentor Dr. C. Srinivasa Rao and Coordinator Dr. K. C. T. Swamy.
              </p>

              <div className="mt-6 pt-5 border-t border-[var(--rule)] grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/accreditation/aicte-idea-lab"
                  className="group flex items-center justify-between p-3 rounded border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] transition-colors"
                >
                  <span className="text-xs font-semibold text-[var(--ink)]">AICTE IDEA Lab</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ruby)]" aria-hidden="true" />
                </Link>
                <Link
                  href="/accreditation/naac/3-4-3"
                  className="group flex items-center justify-between p-3 rounded border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] transition-colors"
                >
                  <span className="text-xs font-semibold text-[var(--ink)]">Publications (3.4.3)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ruby)]" aria-hidden="true" />
                </Link>
                <Link
                  href="/research/research-funds"
                  className="group flex items-center justify-between p-3 rounded border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] transition-colors"
                >
                  <span className="text-xs font-semibold text-[var(--ink)]">Funded Grants</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ruby)]" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Central Library, Digital Library & Accreditation Links */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Central Library Panel */}
            <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md overflow-hidden">
              <div className="grid grid-cols-2 border-b border-[var(--rule)]">
                <div className="aspect-[16/10] overflow-hidden border-r border-[var(--rule)] bg-[var(--surface)]">
                  <img
                    src="/assets/campus/1-CENTRAL-LIBRARY.jpg"
                    alt="GPCET Central Library Reading Hall"
                    width={400}
                    height={250}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-[16/10] overflow-hidden bg-[var(--surface)]">
                  <img
                    src="/assets/campus/2-DIGITAL-LIBRARY.jpg"
                    alt="GPCET Digital Library and E-Journal Terminals"
                    width={400}
                    height={250}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--ruby)]">
                  <Library className="w-4 h-4" aria-hidden="true" />
                  <span>Central &amp; Digital Library</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 py-3 border-y border-[var(--rule)] font-mono tabular-nums">
                  <div>
                    <div className="text-lg font-bold text-[var(--ink)]">36,808</div>
                    <div className="text-[11px] text-[var(--muted)] font-sans">Volumes</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--ink)]">3,118</div>
                    <div className="text-[11px] text-[var(--muted)] font-sans">Online Journals</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--ink)]">500</div>
                    <div className="text-[11px] text-[var(--muted)] font-sans">Reading Seats</div>
                  </div>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed mt-3">
                  Subscriptions include IEEE/IET Electronic Library (IEL), J-Gate Engineering &amp;
                  Technology, DELNET inter-library loan, INFLIBNET N-LIST, and NPTEL video archives.
                </p>
                <div className="mt-4">
                  <Link
                    href="/campus-life"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] transition-colors"
                  >
                    <span>Explore Campus &amp; Library Facilities</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* NAAC & Research Quick Register */}
            <div className="bg-[var(--surface)] border border-[var(--rule)] rounded-md p-5">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--rule)]">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink)]">
                  <Award className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />
                  <span>Statutory &amp; Accreditation Index</span>
                </span>
                <span className="font-mono text-[11px] text-[var(--muted)]">Cycle 2</span>
              </div>

              <ul className="divide-y divide-[var(--rule)] text-xs mt-1">
                <li>
                  <Link
                    href="/accreditation/naac"
                    className="py-2.5 flex items-center justify-between text-[var(--ink)] hover:text-[var(--brand-crimson)] transition-colors"
                  >
                    <span className="font-medium">NAAC SSR Criteria 1–7 Portfolio</span>
                    <span className="font-mono text-[11px] text-[var(--muted)]">48 Metrics →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accreditation/nba"
                    className="py-2.5 flex items-center justify-between text-[var(--ink)] hover:text-[var(--brand-crimson)] transition-colors"
                  >
                    <span className="font-medium">NBA Tier-1 Accredited Programs</span>
                    <span className="font-mono text-[11px] text-[var(--muted)]">5 Branches →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/placements"
                    className="py-2.5 flex items-center justify-between text-[var(--ink)] hover:text-[var(--brand-crimson)] transition-colors"
                  >
                    <span className="font-medium">Placements, Internships &amp; MoUs</span>
                    <span className="font-mono text-[11px] text-[var(--muted)]">Records →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documents?category=accreditation_doc"
                    className="py-2.5 flex items-center justify-between text-[var(--ink)] hover:text-[var(--brand-crimson)] transition-colors"
                  >
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <FileText className="w-3.5 h-3.5 text-[var(--brand-crimson)]" aria-hidden="true" />
                      Mandatory &amp; Statutory Disclosures
                    </span>
                    <span className="font-mono text-[11px] text-[var(--muted)]">Vault →</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
