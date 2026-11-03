'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Building2,
  Briefcase,
  Award,
  ChevronRight,
  FileText,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  items?: {
    title: string;
    description: string;
    href: string;
    badge?: string;
    code?: string;
  }[];
}

const NAVIGATION_SECTIONS: NavItem[] = [
  {
    label: 'Academics',
    items: [
      {
        title: 'Academic Regulations',
        description: 'Autonomous curriculum guidelines for R20, R19, and R18 series.',
        href: '/academics/regulations',
        code: 'R20/R19',
      },
      {
        title: 'Academic Calendars',
        description: 'Official semester schedules, examination dates, and instruction periods.',
        href: '/documents?category=calendar',
        code: '2026-27',
      },
      {
        title: 'Curriculum & Syllabi Vault',
        description: 'Complete course structures and subject syllabi across all branches.',
        href: '/documents?category=syllabus',
      },
      {
        title: 'Examination Cell',
        description: 'End-semester timetables, hall ticket circulars, and grade evaluations.',
        href: '/documents?category=timetable',
        badge: 'Exam Cell',
      },
      {
        title: 'Academic Council & BoS',
        description: 'Statutory board of studies meeting minutes and curriculum resolutions.',
        href: '/academics/council',
      },
    ],
  },
  {
    label: 'Departments',
    items: [
      {
        title: 'Computer Science & Engineering',
        description: 'UG & PG programs, state-of-the-art computational clusters.',
        href: '/departments/cse',
        code: 'CSE',
        badge: 'NBA · 360 Seats',
      },
      {
        title: 'Artificial Intelligence & Data Science',
        description: 'Machine learning labs, GPU infrastructure, algorithmic innovation.',
        href: '/departments/ai',
        code: 'AI & DS',
        badge: '180 Seats',
      },
      {
        title: 'Electronics & Communication',
        description: 'VLSI design, digital signal processing, satellite communications.',
        href: '/departments/ece',
        code: 'ECE',
        badge: 'NBA · 180 Seats',
      },
      {
        title: 'Electrical & Electronics',
        description: 'Power systems, smart grid testbeds, EV battery engineering.',
        href: '/departments/eee',
        code: 'EEE',
        badge: 'NBA · 60 Seats',
      },
      {
        title: 'Mechanical Engineering',
        description: 'Robotics, advanced manufacturing, thermal & fluid research labs.',
        href: '/departments/me',
        code: 'ME',
        badge: 'NBA · 60 Seats',
      },
      {
        title: 'Civil Engineering',
        description: 'Structural engineering, CAD suites, GIS, geotechnical testing.',
        href: '/departments/civil',
        code: 'CIVIL',
        badge: 'NBA · 60 Seats',
      },
      {
        title: 'Humanities & Sciences',
        description: 'Mathematics, Physics, Chemistry, and Professional English communication.',
        href: '/departments/hs',
        code: 'H&S',
        badge: 'Core Faculty',
      },
      {
        title: 'Management Studies (MBA)',
        description: 'Master of Business Administration: Finance, Marketing, HR disciplines.',
        href: '/departments/mba',
        code: 'MBA',
        badge: 'PG · 180 Seats',
      },
    ],
  },
  {
    label: 'Admissions',
    items: [
      {
        title: 'B.Tech Admissions 2026-27',
        description: 'Eligibility criteria, EAPCET counseling code PULE, and seat matrix.',
        href: '/admissions',
        badge: 'Code: PULE',
      },
      {
        title: 'Lateral Entry (ECET)',
        description: 'Second-year B.Tech admissions for diploma holders.',
        href: '/admissions/lateral-entry',
      },
      {
        title: 'M.Tech & MBA Admissions',
        description: 'Postgraduate admissions via PGECET and ICET state examinations.',
        href: '/admissions/pg',
      },
      {
        title: 'Fee Structure & Scholarships',
        description: 'Tuition fees, government JVD reimbursement, and institutional merit aid.',
        href: '/admissions/fees',
      },
      {
        title: 'Online Admission Inquiry',
        description: 'Submit an inquiry directly to the GPCET admissions desk.',
        href: '/admissions/inquiry',
      },
    ],
  },
  {
    label: 'Placements & Research',
    items: [
      {
        title: 'Training & Placements Cell',
        description: 'Verified recruitment statistics, corporate drives, and tier-1 recruiters.',
        href: '/placements',
        badge: 'Career Cell',
      },
      {
        title: 'AICTE IDEA Lab',
        description: 'Institutional fabrication, 3D printing, and rapid prototyping hub.',
        href: '/research/idea-lab',
        badge: 'AICTE Supported',
      },
      {
        title: 'Research & Development Cell',
        description: 'Faculty publications, Scopus citations, and funded patent grants.',
        href: '/research',
      },
      {
        title: 'IEEE & Professional Bodies',
        description: 'IEEE Student Branch, CSI, and ISTE collegiate chapters.',
        href: '/research/chapters',
      },
    ],
  },
  {
    label: 'Accreditation',
    items: [
      {
        title: 'NAAC SSR Portfolio (Cycle 2)',
        description: 'Grade "A+" (3.38 CGPA). Explore Criteria 1 to 7 metrics and evidence.',
        href: '/accreditation/naac',
        badge: 'NAAC A+',
      },
      {
        title: 'NBA Tier-1 Accreditation',
        description: 'Outcome-based education compliance for 5 engineering disciplines.',
        href: '/accreditation/nba',
        badge: 'NBA Verified',
      },
      {
        title: 'UGC Autonomous Status',
        description: 'Conferment orders, university affiliations, and autonomy extensions.',
        href: '/accreditation/autonomous',
      },
      {
        title: 'AICTE Mandatory Disclosure',
        description: 'Comprehensive annual institutional compliance report.',
        href: '/statutory/mandatory-disclosure',
      },
      {
        title: 'IQAC Cell',
        description: 'Internal Quality Assurance Cell protocols, feedback reports, and audits.',
        href: '/accreditation/iqac',
      },
    ],
  },
];

export default function InstitutionalNavbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Close menus on route navigation
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const openSearchModal = () => {
    window.dispatchEvent(new CustomEvent('open-search-modal'));
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--surface-raised)] border-b border-[var(--rule)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Institutional Brand Crest & Collegiate Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-navy)] rounded-md py-1"
          >
            {/* Collegiate Crest Emblem SVG */}
            <div className="relative w-11 h-11 flex-shrink-0 bg-[#0C2340] rounded-md flex items-center justify-center text-white border border-[#1A3B66] shadow-sm transition-transform group-hover:scale-[1.02]">
              <svg
                viewBox="0 0 48 48"
                className="w-7 h-7 text-[#D4AF37]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {/* Shield Outline */}
                <path d="M24 4L8 10v14c0 11.05 6.84 21.41 16 24 9.16-2.59 16-12.95 16-24V10L24 4z" fill="#0C2340" />
                {/* Lamp of Knowledge / Book */}
                <path d="M16 26c2.5-1.5 5-1.5 8 0 3-1.5 5.5-1.5 8 0" stroke="#FFFFFF" />
                <path d="M24 16v10" stroke="#FFFFFF" />
                {/* Academic Sunburst */}
                <circle cx="24" cy="14" r="2.5" fill="#D4AF37" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-[17px] sm:text-[19px] font-bold tracking-tight text-[#0C2340] leading-tight">
                G. Pullaiah College of Engineering &amp; Technology
              </span>
              <span className="text-[11px] sm:text-xs text-[var(--muted)] font-medium flex items-center gap-1.5 mt-0.5">
                <span className="text-[var(--primary-navy)] font-semibold">Autonomous</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span>Estd. 2007</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-[#8A1538] font-semibold">NAAC &apos;A+&apos;</span>
                <span className="text-slate-300 hidden sm:inline" aria-hidden="true">·</span>
                <span className="hidden sm:inline">Kurnool</span>
              </span>
            </div>
          </Link>

          {/* Desktop Hierarchical Navigation */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAVIGATION_SECTIONS.map((section) => {
              const isOpen = activeMenu === section.label;
              return (
                <div
                  key={section.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(section.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setActiveMenu(isOpen ? null : section.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-navy)] ${
                      isOpen
                        ? 'text-[#0C2340] bg-[var(--surface)]'
                        : 'text-[var(--ink)] hover:text-[#0C2340] hover:bg-[var(--surface)]'
                    }`}
                  >
                    {section.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[var(--muted)] transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#0C2340]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Mega-Menu Flyout Panel */}
                  {isOpen && (
                    <div
                      role="menu"
                      aria-label={`${section.label} menu`}
                      className={`absolute top-full left-0 mt-1 bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md shadow-lg p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-120 ${
                        section.label === 'Departments' ? 'w-[580px] grid grid-cols-2 gap-2' : 'w-[360px] flex flex-col gap-1'
                      }`}
                    >
                      {section.items?.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          role="menuitem"
                          className="flex flex-col p-2.5 rounded hover:bg-[var(--surface)] transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary-navy)]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold text-[var(--ink)] group-hover:text-[#0C2340] flex items-center gap-1.5">
                              {item.code && (
                                <span className="font-mono text-[10px] px-1.5 py-0.2 bg-[var(--surface)] border border-[var(--rule)] rounded text-[var(--muted)] font-medium">
                                  {item.code}
                                </span>
                              )}
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--brand-crimson)] border border-[var(--rule)]">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--muted)] leading-relaxed mt-1 line-clamp-1">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Elements: Cmd+K Search Trigger & Primary Admissions CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              type="button"
              onClick={openSearchModal}
              title="Search institutional vault (Cmd + K)"
              aria-label="Search documents and faculty (Press Cmd+K)"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-md border border-[var(--rule)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-navy)]"
            >
              <Search className="w-3.5 h-3.5 text-[var(--muted)]" aria-hidden="true" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 font-mono text-[10px] bg-[var(--surface-raised)] border border-[var(--rule)] rounded text-[var(--muted)]">
                ⌘K
              </kbd>
            </button>

            {/* Document Vault Link */}
            <Link
              href="/documents"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-raised)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-navy)]"
            >
              <FileText className="w-3.5 h-3.5 text-[#0C2340]" aria-hidden="true" />
              Vault
            </Link>

            {/* Admissions 2026 Primary CTA */}
            <Link
              href="/admissions"
              className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#8A1538] hover:bg-[#72112e] text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#8A1538]"
            >
              Admissions 2026
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 rounded-md text-[var(--ink)] hover:bg-[var(--surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-navy)]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Sheet Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-[calc(40px+5rem)] z-50 lg:hidden bg-black/40 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-full max-w-sm h-full bg-[var(--surface-raised)] border-l border-[var(--rule)] shadow-2xl p-5 overflow-y-auto flex flex-col gap-4 animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Bar at top of Mobile Sheet */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openSearchModal();
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-md border border-[var(--rule)] bg-[var(--surface)] text-[var(--muted)]"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>Search documents &amp; faculty...</span>
              </div>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-[var(--surface-raised)] border border-[var(--rule)] rounded">
                ⌘K
              </kbd>
            </button>

            {/* Accordion Navigation Groups */}
            <nav className="flex flex-col divide-y divide-[var(--rule)]">
              {NAVIGATION_SECTIONS.map((section) => {
                const isExpanded = mobileExpanded === section.label;
                return (
                  <div key={section.label} className="py-2">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(isExpanded ? null : section.label)}
                      className="w-full flex items-center justify-between py-2 text-sm font-bold text-[var(--ink)]"
                      aria-expanded={isExpanded}
                    >
                      <span>{section.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[var(--muted)] transition-transform duration-150 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-2 pt-1 pb-2 flex flex-col gap-2">
                        {section.items?.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex flex-col py-1.5 px-2 rounded hover:bg-[var(--surface)] transition-colors"
                          >
                            <span className="text-xs font-semibold text-[#0C2340] flex items-center justify-between">
                              <span>{item.title}</span>
                              {item.badge && (
                                <span className="font-mono text-[10px] text-[var(--brand-crimson)]">
                                  {item.badge}
                                </span>
                              )}
                            </span>
                            <span className="text-[11px] text-[var(--muted)] line-clamp-1 mt-0.5">
                              {item.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Quick Action Buttons in Mobile Sheet */}
            <div className="mt-auto pt-4 border-t border-[var(--rule)] flex flex-col gap-2">
              <Link
                href="/documents"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-md border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)]"
              >
                <FileText className="w-4 h-4 text-[#0C2340]" />
                Access Document Vault (5,822 items)
              </Link>
              <Link
                href="/admissions"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center py-2.5 text-xs font-semibold rounded-md bg-[#8A1538] text-white"
              >
                B.Tech Admissions (EAPCET: PULE)
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
