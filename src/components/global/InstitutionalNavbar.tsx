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
        href: '/admissions#inquiry',
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
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close menus on route navigation
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    drawer.current?.showModal();
    return () => menuButton.current?.focus({ preventScroll: true });
  }, [mobileOpen]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('dialog:modal')) {
        document.querySelector<HTMLButtonElement>('nav[aria-label="Main Navigation"] button[aria-expanded="true"]')?.focus();
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)');
    const closeDrawer = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener('change', closeDrawer);
    return () => desktop.removeEventListener('change', closeDrawer);
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
    <header className="relative z-40 bg-[var(--surface-raised)] border-b border-[var(--rule)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3">
          {/* Institutional Brand Crest & Collegiate Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ruby)] rounded-md py-1"
          >
            <img src="/assets/brand/gpcet-logo.png" width={72} height={72} alt="" className="college-crest" />

            <div className="flex flex-col">
              <span className="font-serif text-[17px] sm:text-[26px] lg:text-[30px] font-medium tracking-tight text-[var(--ruby)] leading-tight">
                G. Pullaiah College of Engineering &amp; Technology
              </span>
              <span className="text-[11px] sm:text-xs text-[var(--muted)] font-medium hidden sm:flex whitespace-nowrap items-center gap-1.5 mt-0.5">
                <span className="text-[var(--ruby)] font-semibold">Autonomous</span>
                <span className="text-[var(--muted)]/60" aria-hidden="true">·</span>
                <span>Estd. 2007</span>
                <span className="text-[var(--muted)]/60" aria-hidden="true">·</span>
                <span className="text-[var(--brand-crimson)] font-semibold">NAAC &apos;A+&apos;</span>
                <span className="text-[var(--muted)]/60 hidden sm:inline" aria-hidden="true">·</span>
                <span className="hidden sm:inline">Kurnool</span>
              </span>
            </div>
          </Link>

          {/* Right Action Elements: Cmd+K Search Trigger & Primary Admissions CTA */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              type="button"
              onClick={openSearchModal}
              title="Search institutional vault (Cmd + K)"
              aria-label="Search documents and faculty (Press Cmd+K)"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-md border border-[var(--rule)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ruby)]"
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
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-raised)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ruby)]"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
              Vault
            </Link>

            {/* Admissions 2026 Primary CTA */}
            <Link
              href="/admissions"
              className="hidden lg:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[var(--brand-crimson)] hover:bg-[var(--burgundy)] text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--brand-crimson)]"
            >
              Admissions 2026
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              ref={menuButton}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 rounded-md text-[var(--ink)] hover:bg-[var(--surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ruby)]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
          {/* Desktop Hierarchical Navigation */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 -ml-3 border-t border-[var(--rule)] py-1">
            {NAVIGATION_SECTIONS.map((section) => {
              const isOpen = activeMenu === section.label;
              return (
                <div
                  key={section.label}
                  className="relative group/nav"
                  onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActiveMenu(null); }}
                  onMouseEnter={() => handleMouseEnter(section.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setActiveMenu(isOpen ? null : section.label)}
                    aria-expanded={isOpen}
                    className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ruby)] ${
                      isOpen
                        ? 'text-[var(--ruby)] bg-[var(--surface)]'
                        : 'text-[var(--ink)] hover:text-[var(--ruby)] hover:bg-[var(--surface)]'
                    }`}
                  >
                    {section.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[var(--muted)] transition-transform duration-120 ${
                        isOpen ? 'rotate-180 text-[var(--ruby)]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Mega-Menu Flyout Panel */}
                  {isOpen && (
                    <div

                      aria-label={`${section.label} menu`}
                      className={`absolute top-full right-0 group-first/nav:left-0 group-first/nav:right-auto mt-1 bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md shadow-lg p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-120 ${
                        section.label === 'Departments' ? 'left-0 right-auto w-[580px] grid grid-cols-2 gap-2' : 'w-[360px] flex flex-col gap-1'
                      }`}
                    >
                      {section.items?.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}

                          className="flex flex-col p-2.5 rounded hover:bg-[var(--surface)] transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ruby)]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold text-[var(--ink)] group-hover:text-[var(--ruby)] flex items-center gap-1.5">
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

      </div>

      {/* Accessible Mobile Sheet Drawer */}
      {mobileOpen && (
        <dialog
          ref={drawer}
          onCancel={() => setMobileOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none z-50 bg-transparent backdrop:bg-black/50 animate-in fade-in duration-120"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-full max-w-sm h-full bg-[var(--surface-raised)] border-l border-[var(--rule)] shadow-2xl p-5 overflow-y-auto flex flex-col gap-4 animate-in slide-in-from-right duration-120"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" onClick={() => setMobileOpen(false)} className="self-end inline-flex items-center gap-2 py-2 text-sm">Close menu <X size={18} aria-hidden="true" /></button>
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
                        className={`w-4 h-4 text-[var(--muted)] transition-transform duration-120 ${
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
                            <span className="text-xs font-semibold text-[var(--ruby)] flex items-center justify-between">
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
                <FileText className="w-4 h-4 text-[var(--ruby)]" />
                Access Document Vault (5,822 items)
              </Link>
              <Link
                href="/admissions"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center py-2.5 text-xs font-semibold rounded-md bg-[var(--brand-crimson)] text-white"
              >
                B.Tech Admissions (EAPCET: PULE)
              </Link>
            </div>
          </div>
        </dialog>
      )}
    </header>
  );
}
