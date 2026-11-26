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
          <h1 id="hero-institutional-title" className="font-serif animate-masked-headline">
            Engineering in Rayalaseema.
          </h1>
          <p>Since 2007, G. Pullaiah College of Engineering &amp; Technology has educated engineers in Kurnool, Andhra Pradesh.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/departments" className="campus-action">Explore departments <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link href="/admissions" className="underline underline-offset-4 hover:text-rose-100">Admissions</Link>
          </div>
        </div>
        <figure className="campus-plate">
          <img src="/assets/campus/GPCET-building.jpg" width={1920} height={1080} fetchPriority="high" alt="GPCET campus buildings in Kurnool" />
          <figcaption><span>GPCET campus</span><span>Kurnool, Andhra Pradesh</span></figcaption>
        </figure>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 grid lg:grid-cols-[4fr_7fr] gap-8 lg:gap-20 items-start">
        <div>
          <h2 className="font-serif text-4xl tracking-tight mb-5">College at a glance</h2>
          <dl className="border-t-2 border-[var(--ruby)]">
            {[
              ['NAAC Cycle 2', 'A+ · 3.38'],
              ['NBA-accredited B.Tech programs', '5'],
              ['Annual CSE intake', '360'],
              ['Faculty members', totalFacultyCount.toLocaleString('en-US')],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 py-4 border-b border-[var(--rule)]">
                <dt className="text-sm text-[var(--muted)]">{label}</dt>
                <dd className="font-mono text-xl text-[var(--ruby)] tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/documents" className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--ruby)] font-semibold hover:underline">Access document vault <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <LiveAcademicGazette notices={notices} keyDocuments={keyDocuments} totalCatalogedCount={totalDocumentCount} />
      </div>
    </section>
  );
}
