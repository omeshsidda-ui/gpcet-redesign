import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Library, Award, FileText } from 'lucide-react';
import EditorialReveal from '@/components/ui/EditorialReveal';

export default function ResearchExcellenceBand() {
  return (
    <section
      aria-labelledby="research-excellence-heading"
      className="bg-[var(--bg)] py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header aligned to 42% axis */}
        <EditorialReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b border-[var(--rule)] items-end">
            <div className="lg:col-span-5">
              <h2
                id="research-excellence-heading"
                className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[var(--ink)]"
              >
                Research, Library &amp; Prototyping
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[15px] text-[var(--muted)] leading-relaxed max-w-[62ch]">
                Campus research infrastructure spanning the AICTE IDEA Lab, Central &amp; Digital
                Libraries, IEEE Student Branch, and NAAC-verified research publications.
              </p>
              <Link
                href="/research/research-home"
                className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] underline underline-offset-4 decoration-[var(--ruby)]/30 hover:decoration-[var(--brand-crimson)] transition-colors active:scale-[0.985]"
              >
                <span>Research &amp; Development Cell</span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </EditorialReveal>

        {/* Asymmetric Two-Column Showcase */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: AICTE IDEA Lab + Campus Building Visual */}
          <EditorialReveal className="lg:col-span-7">
            <div className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm overflow-hidden">
              <div className="group aspect-[16/9] w-full overflow-hidden bg-[var(--surface)] border-b border-[var(--rule)]">
                <img
                  src="/assets/campus/GPCET-building.jpg"
                  alt="G. Pullaiah College of Engineering & Technology Academic Campus, Kurnool"
                  width={960}
                  height={540}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--rule)]">
                  <div className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wide text-[var(--ruby)]">
                    <Cpu className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />
                    <span>AICTE IDEA Lab · R&amp;D Cell · IEEE Student Branch</span>
                  </div>
                  <span className="font-sans text-xs font-medium text-[var(--muted)] tabular-nums">
                    48 NAAC SSR Metrics
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[1.75rem] font-normal text-[var(--ink)] mt-4 leading-snug">
                  AICTE IDEA Lab &amp; Applied Engineering Research
                </h3>

                <p className="text-[15px] text-[var(--muted)] leading-relaxed mt-3 max-w-[66ch]">
                  Equipped with 3D printers, laser cutters, IoT prototyping kits, and multidisciplinary
                  fabrication benches, the AICTE IDEA Lab bridges classroom theory and product
                  development under Chief Mentor Dr. C. Srinivasa Rao and Coordinator Dr. K. C. T. Swamy.
                </p>

                <div className="mt-6 pt-5 border-t border-[var(--rule)] grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    href="/accreditation/aicte-idea-lab"
                    className="group flex items-center justify-between px-3.5 py-3 rounded-sm border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] transition-all duration-150 active:scale-[0.985]"
                  >
                    <span className="text-[13px] font-semibold text-[var(--ink)]">AICTE IDEA Lab</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ruby)] group-hover:translate-x-0.5 transition-all duration-150"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    href="/accreditation/naac/3-4-3"
                    className="group flex items-center justify-between px-3.5 py-3 rounded-sm border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] transition-all duration-150 active:scale-[0.985]"
                  >
                    <span className="text-[13px] font-semibold text-[var(--ink)]">Publications (3.4.3)</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ruby)] group-hover:translate-x-0.5 transition-all duration-150"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    href="/research/research-funds"
                    className="group flex items-center justify-between px-3.5 py-3 rounded-sm border border-[var(--rule)] bg-[var(--surface)] hover:border-[var(--ruby)] transition-all duration-150 active:scale-[0.985]"
                  >
                    <span className="text-[13px] font-semibold text-[var(--ink)]">Funded Grants</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ruby)] group-hover:translate-x-0.5 transition-all duration-150"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </EditorialReveal>

          {/* Right 5 Cols: Central Library, Digital Library & Accreditation Links */}
          <EditorialReveal delayMs={90} className="lg:col-span-5">
            <div className="flex flex-col gap-6">
              {/* Central Library Panel */}
              <div className="bg-[var(--surface-raised)] border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] rounded-sm overflow-hidden">
                <div className="grid grid-cols-2 border-b border-[var(--rule)]">
                  <div className="group aspect-[16/10] overflow-hidden border-r border-[var(--rule)] bg-[var(--surface)]">
                    <img
                      src="/assets/campus/1-CENTRAL-LIBRARY.jpg"
                      alt="GPCET Central Library Reading Hall"
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <div className="group aspect-[16/10] overflow-hidden bg-[var(--surface)]">
                    <img
                      src="/assets/campus/2-DIGITAL-LIBRARY.jpg"
                      alt="GPCET Digital Library and E-Journal Terminals"
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 font-sans text-xs font-semibold tracking-wide text-[var(--ruby)]">
                    <Library className="w-4 h-4" aria-hidden="true" />
                    <span>Central &amp; Digital Library</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 py-4 border-y border-[var(--rule)] font-sans tabular-nums">
                    <div>
                      <div className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ink)] tabular-nums">36,808</div>
                      <div className="text-xs text-[var(--muted)] mt-0.5">Volumes</div>
                    </div>
                    <div>
                      <div className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ink)] tabular-nums">3,118</div>
                      <div className="text-xs text-[var(--muted)] mt-0.5">Online Journals</div>
                    </div>
                    <div>
                      <div className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ruby)] tabular-nums">500</div>
                      <div className="text-xs text-[var(--muted)] mt-0.5">Reading Seats</div>
                    </div>
                  </div>
                  <p className="text-[14px] text-[var(--muted)] leading-relaxed mt-4">
                    Subscriptions include IEEE/IET Electronic Library (IEL), J-Gate Engineering &amp;
                    Technology, DELNET inter-library loan, INFLIBNET N-LIST, and NPTEL video archives.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/campus-life"
                      className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] underline underline-offset-4 decoration-[var(--ruby)]/30 hover:decoration-[var(--brand-crimson)] transition-colors active:scale-[0.985]"
                    >
                      <span>Explore Campus &amp; Library Facilities</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* NAAC & Research Quick Register */}
              <div className="bg-[var(--surface)] border border-[var(--rule)] border-t-2 border-t-[var(--ink)] rounded-sm p-6">
                <div className="flex items-center justify-between pb-3.5 border-b border-[var(--rule)]">
                  <span className="inline-flex items-center gap-2 font-serif text-lg font-medium text-[var(--ink)]">
                    <Award className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />
                    <span>Statutory &amp; Accreditation Index</span>
                  </span>
                  <span className="font-sans text-xs font-semibold tracking-wide text-[var(--ruby)]">Cycle 2</span>
                </div>

                <ul className="divide-y divide-[var(--rule)] text-[14px] mt-1">
                  <li>
                    <Link
                      href="/accreditation/naac"
                      className="group py-3 flex items-center justify-between text-[var(--ink)] hover:text-[var(--ruby)] transition-colors"
                    >
                      <span className="font-medium">NAAC SSR Criteria 1–7 Portfolio</span>
                      <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[var(--muted)] group-hover:text-[var(--ruby)] tabular-nums transition-colors duration-150">
                        <span>48 Metrics</span>
                        <span aria-hidden="true" className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/accreditation/nba"
                      className="group py-3 flex items-center justify-between text-[var(--ink)] hover:text-[var(--ruby)] transition-colors"
                    >
                      <span className="font-medium">NBA Tier-1 Accredited Programs</span>
                      <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[var(--muted)] group-hover:text-[var(--ruby)] tabular-nums transition-colors duration-150">
                        <span>5 Branches</span>
                        <span aria-hidden="true" className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/placements"
                      className="group py-3 flex items-center justify-between text-[var(--ink)] hover:text-[var(--ruby)] transition-colors"
                    >
                      <span className="font-medium">Placements, Internships &amp; MoUs</span>
                      <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[var(--muted)] group-hover:text-[var(--ruby)] transition-colors duration-150">
                        <span>Records</span>
                        <span aria-hidden="true" className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/documents?category=accreditation_doc"
                      className="group py-3 flex items-center justify-between text-[var(--ink)] hover:text-[var(--ruby)] transition-colors"
                    >
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <FileText className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
                        Mandatory &amp; Statutory Disclosures
                      </span>
                      <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-[var(--muted)] group-hover:text-[var(--ruby)] transition-colors duration-150">
                        <span>Vault</span>
                        <span aria-hidden="true" className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}
