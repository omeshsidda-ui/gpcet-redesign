import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const STATUTORY_SEALS = [
  {
    src: '/assets/brand/UGC_logo_s.png',
    alt: 'University Grants Commission (UGC) Autonomous Recognition',
    label: 'UGC Autonomous',
  },
  {
    src: '/assets/brand/NAAC_logo_s.png',
    alt: 'NAAC A+ Grade Accreditation',
    label: "NAAC 'A+' Grade",
  },
  {
    src: '/assets/brand/NBA_logo_s.png',
    alt: 'National Board of Accreditation',
    label: 'NBA Accredited',
  },
  {
    src: '/assets/brand/AICTE_logo.png',
    alt: 'All India Council for Technical Education',
    label: 'AICTE Approved',
  },
  {
    src: '/assets/brand/jntua_logo.png',
    alt: 'JNTU Anantapur Affiliation',
    label: 'JNTUA Affiliated',
  },
  {
    src: '/assets/brand/ACITE_IdeaLab_logo_s.png',
    alt: 'AICTE IDEA Lab',
    label: 'AICTE IDEA Lab',
  },
  {
    src: '/assets/brand/nirf_logo_s.png',
    alt: 'National Institutional Ranking Framework',
    label: 'NIRF Participant',
  },
];

export default function InstitutionalFooter() {
  return (
    <footer
      aria-label="Institutional Footer and Statutory Disclosures"
      className="bg-[var(--ruby)] text-stone-100 border-t border-white/15 mt-auto"
    >
      {/* Upper Footer: Collegiate Identity & Structured Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Column 1: Institutional Authority & Campus Coordinates */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <img
                src="/assets/brand/gpcet-logo.png"
                width={60}
                height={60}
                alt=""
                className="size-14 sm:size-15 object-contain bg-white p-1 rounded-sm shrink-0"
              />
              <div>
                <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white leading-tight block">
                  G. Pullaiah College of Engineering &amp; Technology
                </span>
                <span className="text-[13px] text-rose-100/90 mt-1 block">
                  Autonomous Institution · Est. 2007 · Kurnool
                </span>
              </div>
            </div>

            <p className="text-[13.5px] sm:text-sm text-stone-100/90 leading-relaxed max-w-[46ch]">
              Accredited with &apos;A+&apos; Grade by NAAC (3.38 CGPA) and recognized as an Autonomous
              Institution by UGC. Approved by AICTE, New Delhi and permanently affiliated to JNTUA, Ananthapuramu.
            </p>

            {/* Campus Coordinates */}
            <div className="flex flex-col gap-3 text-[13px] sm:text-[13.5px] text-stone-100/90 pt-4 border-t border-white/15">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-100 shrink-0 mt-1" aria-hidden="true" />
                <span className="leading-relaxed">
                  Near Venkayapalli, Pasupula Village, Nandikotkur Road,
                  <br />
                  Kurnool – 518 002, Andhra Pradesh, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-100 shrink-0" aria-hidden="true" />
                <span className="font-sans text-[13.5px] tabular-nums">08518-285088 · +91 86397 56663</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-100 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:principal@gpcet.ac.in"
                  className="hover:text-white underline underline-offset-4 transition-colors duration-120"
                >
                  principal@gpcet.ac.in
                </a>
              </div>
            </div>

            {/* Counseling Codes */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-[12px]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/10 border border-white/20 text-white font-medium">
                <span className="text-rose-100">EAPCET:</span>
                <span className="font-mono font-semibold tracking-wide">PULE</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/10 border border-white/20 text-stone-100 font-medium">
                <span className="text-rose-100">College Code:</span>
                <span className="font-mono font-semibold tracking-wide text-white">GP</span>
              </span>
            </div>
          </div>

          {/* Column 2: Academic Vault */}
          <div className="flex flex-col gap-3.5">
            <h3 className="font-serif text-[17px] font-medium text-white border-b border-white/15 pb-2.5">
              Academic Vault
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13.5px] sm:text-sm text-stone-100/90">
              <li>
                <Link
                  href="/documents?category=syllabus"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  Syllabi &amp; Curriculum (R20)
                </Link>
              </li>
              <li>
                <Link
                  href="/documents?category=timetable"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  Exam Cell Timetables
                </Link>
              </li>
              <li>
                <Link
                  href="/documents?category=calendar"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  Academic Calendars 2026-27
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/regulations"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  Autonomous Regulations
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/council"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  Board of Studies (BoS)
                </Link>
              </li>
              <li>
                <a
                  href="https://jntua.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-rose-100 hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  <span>JNTUA University Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Engineering Disciplines */}
          <div className="flex flex-col gap-3.5">
            <h3 className="font-serif text-[17px] font-medium text-white border-b border-white/15 pb-2.5">
              Engineering Disciplines
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13.5px] sm:text-sm text-stone-100/90">
              <li>
                <Link href="/departments/cse" className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120">
                  Computer Science (CSE)
                </Link>
              </li>
              <li>
                <Link href="/departments/ai" className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120">
                  Artificial Intelligence (AI &amp; DS)
                </Link>
              </li>
              <li>
                <Link href="/departments/ece" className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120">
                  Electronics &amp; Comm. (ECE)
                </Link>
              </li>
              <li>
                <Link href="/departments/eee" className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120">
                  Electrical &amp; Electronics (EEE)
                </Link>
              </li>
              <li>
                <Link href="/departments/me" className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120">
                  Mechanical Engineering (ME)
                </Link>
              </li>
              <li>
                <Link href="/departments/civil" className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120">
                  Civil Engineering (CE)
                </Link>
              </li>
              <li>
                <Link href="/departments/hs" className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120">
                  Humanities &amp; Sciences (H&amp;S)
                </Link>
              </li>
              <li>
                <Link href="/departments/mba" className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120">
                  Management Studies (MBA)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Statutory Disclosures */}
          <div className="flex flex-col gap-3.5">
            <h3 className="font-serif text-[17px] font-medium text-white border-b border-white/15 pb-2.5">
              Statutory Disclosures
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13.5px] sm:text-sm text-stone-100/90">
              <li>
                <Link
                  href="/statutory/rti"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  Right to Information (RTI Act)
                </Link>
              </li>
              <li>
                <Link
                  href="/statutory/mandatory-disclosure"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  AICTE Mandatory Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/accreditation/naac"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  NAAC SSR Portfolio (Cycle 2)
                </Link>
              </li>
              <li>
                <Link
                  href="/accreditation/nba"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  NBA Tier-1 Accreditation
                </Link>
              </li>
              <li>
                <Link
                  href="/statutory/anti-ragging"
                  className="text-rose-100 hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  Anti-Ragging Committee
                </Link>
              </li>
              <li>
                <Link
                  href="/statutory/grievance"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  Grievance Redressal Mechanism
                </Link>
              </li>
              <li>
                <Link
                  href="/statutory/nirf"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
                >
                  NIRF Data Submissions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Statutory Accreditation Seals Grid */}
        <div className="mt-12 pt-8 border-t border-white/15">
          <p className="text-[13px] font-medium text-rose-100/90 mb-5 text-center sm:text-left">
            Recognitions, Accreditations &amp; Institutional Governance
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {STATUTORY_SEALS.map((seal) => (
              <div
                key={seal.src}
                className="bg-white rounded-sm px-3 py-3 flex flex-col items-center justify-between gap-2 h-[88px] border border-white/20"
              >
                <img
                  src={seal.src}
                  alt={seal.alt}
                  className="max-h-9 max-w-[110px] object-contain"
                  loading="lazy"
                  width={110}
                  height={36}
                />
                <span className="text-[11px] font-medium text-[var(--ink)] text-center leading-tight">
                  {seal.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Legal & Accessibility Strip */}
      <div className="bg-[var(--burgundy)] border-t border-white/10 py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-stone-200">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span>© 2026 G. Pullaiah College of Engineering &amp; Technology (Autonomous).</span>
            <span className="hidden sm:inline text-white/30" aria-hidden="true">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-stone-200">
            <Link
              href="/statutory/privacy"
              className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
            >
              Privacy Policy
            </Link>
            <span className="text-white/30" aria-hidden="true">·</span>
            <Link
              href="/statutory/terms"
              className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
            >
              Terms of Use
            </Link>
            <span className="text-white/30" aria-hidden="true">·</span>
            <Link
              href="/statutory/accessibility"
              className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
            >
              Accessibility (WCAG AA)
            </Link>
            <span className="text-white/30" aria-hidden="true">·</span>
            <Link
              href="/sitemap.xml"
              className="hover:text-white hover:underline underline-offset-4 transition-colors duration-120"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
