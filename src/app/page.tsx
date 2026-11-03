import Link from 'next/link';
import { Award, BookOpen, Building2, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Institutional Civic Masthead */}
      <header className="border-b border-[var(--rule)] bg-[var(--surface-raised)] py-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <div>
            <div className="text-xs font-semibold tracking-wider text-[var(--muted)] uppercase">
              Autonomous Institution · Estd. 2007 · Affiliated to JNTUA
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[var(--primary-navy)] sm:text-2xl">
              G. Pullaiah College of Engineering and Technology
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--brass-gold)] border border-[var(--rule)]">
              <Award className="h-4 w-4" />
              NAAC &apos;A+&apos; Grade (Cycle 2)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--brand-crimson)] border border-[var(--rule)]">
              NBA Accredited Programs
            </span>
          </div>
        </div>
      </header>

      {/* Hero & Institutional Architecture Section */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Asymmetric 58% Primary Editorial Column */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
              Excellence in Engineering, Innovation &amp; Research
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
              Accredited by NAAC with &apos;A+&apos; Grade and recognized as an Autonomous
              institution by UGC. Empowering over 3,000 undergraduate and postgraduate scholars with
              rigorous academic training, industry-aligned laboratories, and verified career outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center rounded-md bg-[var(--primary-navy)] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Admissions 2026-27
              </Link>
              <Link
                href="/academics"
                className="inline-flex items-center justify-center rounded-md border border-[var(--rule)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface-raised)]"
              >
                Academic Regulations &amp; Syllabi
              </Link>
            </div>
          </div>

          {/* 42% Structured Tabular Institutional Metrics */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <div className="rounded-lg border border-[var(--rule)] bg-[var(--surface-raised)] p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
                Verified Institutional Corpus
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-md border border-[var(--rule)] bg-[var(--surface)] p-4">
                  <div className="flex items-center gap-2 text-[var(--primary-navy)]">
                    <Users className="h-4 w-4" />
                    <span className="text-2xl font-bold">452</span>
                  </div>
                  <div className="mt-1 text-xs text-[var(--muted)]">Faculty Roster Records</div>
                </div>
                <div className="rounded-md border border-[var(--rule)] bg-[var(--surface)] p-4">
                  <div className="flex items-center gap-2 text-[var(--primary-navy)]">
                    <Building2 className="h-4 w-4" />
                    <span className="text-2xl font-bold">8</span>
                  </div>
                  <div className="mt-1 text-xs text-[var(--muted)]">Engineering Branches</div>
                </div>
                <div className="rounded-md border border-[var(--rule)] bg-[var(--surface)] p-4">
                  <div className="flex items-center gap-2 text-[var(--brass-gold)]">
                    <Award className="h-4 w-4" />
                    <span className="text-2xl font-bold">3.38</span>
                  </div>
                  <div className="mt-1 text-xs text-[var(--muted)]">NAAC CGPA Score</div>
                </div>
                <div className="rounded-md border border-[var(--rule)] bg-[var(--surface)] p-4">
                  <div className="flex items-center gap-2 text-[var(--brand-crimson)]">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-2xl font-bold">5,822</span>
                  </div>
                  <div className="mt-1 text-xs text-[var(--muted)]">Cataloged Documents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
