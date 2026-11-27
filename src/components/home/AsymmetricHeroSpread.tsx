import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LiveAcademicGazette, { GazetteDocument, GazetteNotice } from './LiveAcademicGazette';

interface AsymmetricHeroSpreadProps {
  notices: GazetteNotice[];
  keyDocuments: GazetteDocument[];
  totalFacultyCount: number;
  totalDocumentCount: number;
}

export default function AsymmetricHeroSpread({
  notices, keyDocuments, totalFacultyCount, totalDocumentCount,
}: AsymmetricHeroSpreadProps) {
  return (
    <section aria-labelledby="hero-institutional-title">
      <div className="campus-spread">
        <div className="campus-intro">
          <h1 id="hero-institutional-title" className="font-serif font-normal animate-masked-headline">
            Engineering in <em className="italic font-normal">Rayalaseema.</em>
          </h1>
          <p className="text-[16px] sm:text-[17px] leading-[1.65]">
            Since 2007, G. Pullaiah College of Engineering &amp; Technology has educated engineers in
            Kurnool, Andhra Pradesh—uniting autonomous academic rigor with applied research.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              href="/departments"
              className="campus-action rounded-[2px] text-sm font-semibold tracking-tight transition-colors"
            >
              <span>Explore departments</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/admissions"
              className="text-sm font-semibold text-[#FBEDE9] underline underline-offset-4 decoration-[#FBEDE9]/60 hover:text-white hover:decoration-white transition-colors"
            >
              Admissions 2026
            </Link>
          </div>
        </div>
        <figure className="campus-plate">
          <img
            src="/assets/campus/GPCET-building.jpg"
            width={1920}
            height={1080}
            fetchPriority="high"
            alt="GPCET campus buildings in Kurnool"
          />
          <figcaption className="font-mono tracking-tight">
            <span>GPCET Campus</span>
            <span>Kurnool, Andhra Pradesh</span>
          </figcaption>
        </figure>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-[4fr_7fr] gap-10 lg:gap-16 items-start">
        <div className="border-t-2 border-[var(--ink)] pt-5">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[var(--ink)] mb-6">
            College at a glance
          </h2>
          <dl className="border-t-2 border-[var(--ruby)]">
            {[
              ['NAAC Cycle 2', 'A+ · 3.38'],
              ['NBA-accredited B.Tech programs', '5'],
              ['Annual CSE intake', '360'],
              ['Faculty members', totalFacultyCount.toLocaleString('en-US')],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 py-4 border-b border-[var(--rule)]"
              >
                <dt className="text-[15px] text-[var(--muted)] leading-snug">{label}</dt>
                <dd className="font-mono text-2xl sm:text-[1.65rem] font-semibold text-[var(--ruby)] tabular-nums shrink-0">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href="/documents"
            className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--ruby)] hover:text-[var(--brand-crimson)] font-semibold underline underline-offset-4 decoration-[var(--ruby)]/30 hover:decoration-[var(--brand-crimson)] transition-colors"
          >
            <span>Access document vault</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <LiveAcademicGazette
          notices={notices}
          keyDocuments={keyDocuments}
          totalCatalogedCount={totalDocumentCount}
        />
      </div>
    </section>
  );
}
