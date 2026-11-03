import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Award,
  ShieldCheck,
  FileText,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function InstitutionalFooter() {
  return (
    <footer
      aria-label="Institutional Footer and Statutory Disclosures"
      className="bg-[#0C2340] text-slate-300 border-t border-white/10 text-xs mt-auto transition-colors"
    >
      {/* Upper Footer: Core Coordinates & Structured Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Institutional Authority & Campus Coordinates (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white block">
                G. Pullaiah College of Engineering &amp; Technology
              </span>
              <span className="text-amber-300 font-semibold tracking-wider uppercase text-[11px] mt-1 block">
                Autonomous Institution · Estd. 2007
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Accredited with &apos;A+&apos; Grade by NAAC (3.38 CGPA) and recognized as an Autonomous
              Institution by UGC. Approved by AICTE, New Delhi and permanently affiliated to JNTUA, Ananthapuramu.
            </p>

            {/* Campus Coordinates */}
            <div className="flex flex-col gap-2.5 text-xs text-slate-300 pt-2 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Near Venkayapalli, Pasupula Village, Nandikotkur Road,<br />
                  Kurnool – 518 452, Andhra Pradesh, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 flex-shrink-0" aria-hidden="true" />
                <span>+91 9988776600 · 08518-285011</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-300 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:principal@gpcet.ac.in"
                  className="hover:text-white underline underline-offset-2 transition-colors"
                >
                  principal@gpcet.ac.in
                </a>
              </div>
            </div>

            {/* Counseling Codes */}
            <div className="flex items-center gap-3 pt-2 text-[11px] font-mono">
              <span className="px-2 py-1 rounded bg-white/10 border border-white/15 text-amber-300 font-semibold">
                EAPCET: PULE
              </span>
              <span className="px-2 py-1 rounded bg-white/10 border border-white/15 text-slate-200">
                COLLEGE CODE: GP
              </span>
            </div>
          </div>

          {/* Column 2: Academic & Autonomous Gateways */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-white text-sm tracking-wide border-b border-white/10 pb-2">
              Academic Vault
            </h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link
                  href="/documents?category=syllabus"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  Syllabi &amp; Curriculum (R20)
                </Link>
              </li>
              <li>
                <Link
                  href="/documents?category=timetable"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  Exam Cell Timetables
                </Link>
              </li>
              <li>
                <Link
                  href="/documents?category=calendar"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  Academic Calendars 2026-27
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/regulations"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  Autonomous Regulations
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/council"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  Board of Studies (BoS)
                </Link>
              </li>
              <li>
                <a
                  href="https://jntua.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  JNTUA University Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Departments & Branches */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-white text-sm tracking-wide border-b border-white/10 pb-2">
              Engineering Disciplines
            </h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link href="/departments/cse" className="hover:text-white transition-colors">
                  Computer Science (CSE)
                </Link>
              </li>
              <li>
                <Link href="/departments/ai" className="hover:text-white transition-colors">
                  Artificial Intelligence (AI &amp; DS)
                </Link>
              </li>
              <li>
                <Link href="/departments/ece" className="hover:text-white transition-colors">
                  Electronics &amp; Comm. (ECE)
                </Link>
              </li>
              <li>
                <Link href="/departments/eee" className="hover:text-white transition-colors">
                  Electrical &amp; Electronics (EEE)
                </Link>
              </li>
              <li>
                <Link href="/departments/me" className="hover:text-white transition-colors">
                  Mechanical Engineering (ME)
                </Link>
              </li>
              <li>
                <Link href="/departments/civil" className="hover:text-white transition-colors">
                  Civil Engineering (CE)
                </Link>
              </li>
              <li>
                <Link href="/departments/hs" className="hover:text-white transition-colors">
                  Humanities &amp; Sciences (H&amp;S)
                </Link>
              </li>
              <li>
                <Link href="/departments/mba" className="hover:text-white transition-colors">
                  Management Studies (MBA)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Statutory Disclosures & Compliance */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-white text-sm tracking-wide border-b border-white/10 pb-2">
              Statutory Disclosures
            </h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link
                  href="/statutory/rti"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  Right to Information (RTI Act)
                </Link>
              </li>
              <li>
                <Link
                  href="/statutory/mandatory-disclosure"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  AICTE Mandatory Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/accreditation/naac"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  NAAC SSR Portfolio (Cycle 2)
                </Link>
              </li>
              <li>
                <Link
                  href="/accreditation/nba"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  NBA Tier-1 Accreditation
                </Link>
              </li>
              <li>
                <Link
                  href="/statutory/anti-ragging"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-amber-300"
                >
                  <ChevronRight className="w-3 h-3 text-amber-300" aria-hidden="true" />
                  Anti-Ragging Committee
                </Link>
              </li>
              <li>
                <Link
                  href="/statutory/grievance"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  Grievance Redressal Mechanism
                </Link>
              </li>
              <li>
                <Link
                  href="/statutory/nirf"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  NIRF Data Submissions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Statutory Accreditation Seals Band */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-5 text-center">
            Recognitions, Accreditations &amp; Institutional Governance
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 items-center justify-items-center">
            {/* UGC Autonomous Seal */}
            <div className="bg-white p-2.5 rounded flex flex-col items-center justify-center w-full max-w-[130px] h-[72px] shadow-sm">
              <img
                src="/assets/brand/UGC_logo_s.png"
                alt="University Grants Commission (UGC) Autonomous Recognition"
                className="max-h-8 max-w-[100px] object-contain"
                loading="lazy"
                width={100}
                height={32}
              />
              <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase text-center leading-tight">
                UGC Autonomous
              </span>
            </div>

            {/* NAAC Seal */}
            <div className="bg-white p-2.5 rounded flex flex-col items-center justify-center w-full max-w-[130px] h-[72px] shadow-sm">
              <img
                src="/assets/brand/NAAC_logo_s.png"
                alt="NAAC A+ Grade Accreditation"
                className="max-h-8 max-w-[100px] object-contain"
                loading="lazy"
                width={100}
                height={32}
              />
              <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase text-center leading-tight">
                NAAC &apos;A+&apos; Grade
              </span>
            </div>

            {/* NBA Seal */}
            <div className="bg-white p-2.5 rounded flex flex-col items-center justify-center w-full max-w-[130px] h-[72px] shadow-sm">
              <img
                src="/assets/brand/NBA_logo_s.png"
                alt="National Board of Accreditation"
                className="max-h-8 max-w-[100px] object-contain"
                loading="lazy"
                width={100}
                height={32}
              />
              <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase text-center leading-tight">
                NBA Accredited
              </span>
            </div>

            {/* AICTE Seal */}
            <div className="bg-white p-2.5 rounded flex flex-col items-center justify-center w-full max-w-[130px] h-[72px] shadow-sm">
              <img
                src="/assets/brand/AICTE_logo.png"
                alt="All India Council for Technical Education"
                className="max-h-8 max-w-[100px] object-contain"
                loading="lazy"
                width={100}
                height={32}
              />
              <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase text-center leading-tight">
                AICTE Approved
              </span>
            </div>

            {/* JNTUA Seal */}
            <div className="bg-white p-2.5 rounded flex flex-col items-center justify-center w-full max-w-[130px] h-[72px] shadow-sm">
              <img
                src="/assets/brand/jntua_logo.png"
                alt="JNTU Anantapur Affiliation"
                className="max-h-8 max-w-[100px] object-contain"
                loading="lazy"
                width={100}
                height={32}
              />
              <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase text-center leading-tight">
                JNTUA Affiliated
              </span>
            </div>

            {/* AICTE Idea Lab Seal */}
            <div className="bg-white p-2.5 rounded flex flex-col items-center justify-center w-full max-w-[130px] h-[72px] shadow-sm">
              <img
                src="/assets/brand/ACITE_IdeaLab_logo_s.png"
                alt="AICTE IDEA Lab"
                className="max-h-8 max-w-[100px] object-contain"
                loading="lazy"
                width={100}
                height={32}
              />
              <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase text-center leading-tight">
                AICTE IDEA Lab
              </span>
            </div>

            {/* NIRF Seal */}
            <div className="bg-white p-2.5 rounded flex flex-col items-center justify-center w-full max-w-[130px] h-[72px] shadow-sm">
              <img
                src="/assets/brand/nirf_logo_s.png"
                alt="National Institutional Ranking Framework"
                className="max-h-8 max-w-[100px] object-contain"
                loading="lazy"
                width={100}
                height={32}
              />
              <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase text-center leading-tight">
                NIRF Participant
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal, Accessibility & Engineering Strip */}
      <div className="bg-[#071324] border-t border-white/5 py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span>© 2026 G. Pullaiah College of Engineering &amp; Technology (Autonomous).</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-400">
            <Link href="/statutory/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/statutory/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/statutory/accessibility" className="hover:text-white transition-colors">
              Accessibility (WCAG AA)
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
