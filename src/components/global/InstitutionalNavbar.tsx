'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  FileText,
} from 'lucide-react';

interface NavSubItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
  code?: string;
}

interface NavItem {
  label: string;
  matchPrefix: string;
  overviewHref: string;
  overviewLabel: string;
  items: NavSubItem[];
}

const NAVIGATION_SECTIONS: NavItem[] = [
  {
    label: 'Academics',
    matchPrefix: '/academics',
    overviewHref: '/documents',
    overviewLabel: 'Browse 5,822 Syllabi & Circulars',
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
    matchPrefix: '/departments',
    overviewHref: '/departments',
    overviewLabel: 'All 8 Academic Departments',
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
    matchPrefix: '/admissions',
    overviewHref: '/admissions',
    overviewLabel: 'Admissions Portal · Code: PULE',
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
    matchPrefix: '/placements',
    overviewHref: '/placements',
    overviewLabel: 'Career & Research Overview',
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
    matchPrefix: '/accreditation',
    overviewHref: '/accreditation',
    overviewLabel: 'Quality & Accreditation Hub',
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
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpenedRef = useRef<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close menus on route navigation
  useEffect(() => {
    hoverOpenedRef.current = null;
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    drawer.current?.showModal();
    return () => {
      menuButton.current?.focus({ preventScroll: true });
    };
  }, [mobileOpen]);

  // Handle escape key to close desktop flyout menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('dialog:modal')) {
        document
          .querySelector<HTMLButtonElement>('nav[aria-label="Main Navigation"] button[aria-expanded="true"]')
          ?.focus();
        hoverOpenedRef.current = null;
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)');
    const closeDrawer = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener('change', closeDrawer);
    return () => desktop.removeEventListener('change', closeDrawer);
  }, []);

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    if (activeMenu !== label) {
      hoverOpenedRef.current = label;
    }
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      hoverOpenedRef.current = null;
      setActiveMenu(null);
    }, 140);
  };

  const handleTriggerClick = (label: string) => {
    if (activeMenu === label) {
      if (hoverOpenedRef.current === label) {
        hoverOpenedRef.current = null;
        return;
      }
      setActiveMenu(null);
    } else {
      hoverOpenedRef.current = null;
      setActiveMenu(label);
    }
  };

  const openSearchModal = () => {
    window.dispatchEvent(new CustomEvent('open-search-modal'));
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--surface-raised)] border-b border-[var(--ink)]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Masthead Row */}
        <div className="flex items-center justify-between gap-3 py-2.5 sm:py-3">
          {/* Official Crest & Collegiate Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 sm:gap-3.5 group min-w-0 focus-visible:outline-none rounded-sm py-0.5"
          >
            <img
              src="/assets/brand/gpcet-logo.png"
              width={52}
              height={52}
              alt=""
              className="college-crest max-w-[44px] max-h-[44px] sm:max-w-[52px] sm:max-h-[52px]"
            />

            <div className="flex flex-col min-w-0">
              <span className="font-serif text-[16px] sm:text-[22px] lg:text-[21px] xl:text-[26px] font-medium tracking-[-0.02em] text-[var(--ink)] group-hover:text-[var(--ruby)] transition-colors duration-150 leading-[1.2]">
                G. Pullaiah College of Engineering &amp; Technology
              </span>
              <span className="hidden sm:block text-[12.5px] text-[var(--ink)]/70 font-normal tracking-[-0.005em] mt-0.5">
                Autonomous Institution · Est. 2007 · Kurnool
              </span>
            </div>
          </Link>

          {/* Right Utility Cluster */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={openSearchModal}
              title="Search institutional vault (Cmd + K)"
              aria-label="Search documents and faculty (Press Cmd+K)"
              className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-2 text-[13px] rounded-sm border border-[var(--ink)]/15 bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] hover:border-[var(--ink)]/30 transition-colors duration-120"
            >
              <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[var(--muted)]" aria-hidden="true" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 font-mono text-[10.5px] leading-none bg-[var(--surface-raised)] border border-[var(--ink)]/12 rounded-sm text-[var(--muted)]">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/documents"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-sm text-[var(--ink)] hover:text-[var(--ruby)] hover:bg-[var(--surface)] transition-colors duration-120 whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
              <span>Document Vault</span>
            </Link>

            <Link
              href="/admissions"
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-[13px] font-semibold rounded-sm bg-[var(--ruby)] hover:bg-[var(--burgundy)] text-white transition-colors duration-120 whitespace-nowrap"
            >
              Admissions 2026
            </Link>

            <button
              type="button"
              ref={menuButton}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 rounded-sm border border-[var(--ink)]/12 text-[var(--ink)] hover:bg-[var(--surface)] transition-colors duration-120"
            >
              {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Desktop Hierarchical Navigation Row */}
        <nav
          aria-label="Main Navigation"
          className="relative hidden lg:flex items-center justify-between gap-6 border-t border-[var(--rule)]"
        >
          <div className="flex items-center gap-5 xl:gap-7">
            {NAVIGATION_SECTIONS.map((section) => {
              const isOpen = activeMenu === section.label;
              const isRouteActive =
                pathname?.startsWith(section.matchPrefix) ||
                (section.label === 'Placements & Research' && pathname?.startsWith('/research'));
              const isDepartments = section.label === 'Departments';

              return (
                <div
                  key={section.label}
                  className={isDepartments ? 'static' : 'relative'}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      hoverOpenedRef.current = null;
                      setActiveMenu(null);
                    }
                  }}
                  onMouseEnter={() => handleMouseEnter(section.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => handleTriggerClick(section.label)}
                    aria-expanded={isOpen}
                    className={`relative inline-flex items-center gap-1.5 py-2.5 text-[13.5px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-150 after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:transition-colors after:duration-150 ${
                      isOpen
                        ? 'text-[var(--ruby)] after:bg-[var(--ruby)]'
                        : isRouteActive
                        ? 'text-[var(--ruby)] after:bg-[var(--ruby)]/55'
                        : 'text-[var(--ink)] hover:text-[var(--ruby)] after:bg-transparent hover:after:bg-[var(--ruby)]/30'
                    }`}
                  >
                    <span>{section.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-100 ${
                        isOpen ? 'rotate-180 text-[var(--ruby)]' : 'text-[var(--muted)]'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Handcrafted Architectural Mega-Menu Flyout */}
                  {isOpen && (
                    <div
                      aria-label={`${section.label} menu`}
                      className={`absolute top-full mt-px z-50 bg-[var(--surface-raised)] border border-[var(--ink)]/15 border-t-2 border-t-[var(--ruby)] shadow-xl rounded-sm overflow-hidden ${
                        isDepartments ? 'left-0 right-0 w-full' : 'left-0 w-[440px]'
                      }`}
                    >
                      {/* Top Header Strip */}
                      <div className="px-5 py-2.5 bg-[var(--surface)] border-b border-[var(--rule)] flex items-center justify-between gap-4">
                        <span className="font-serif text-[15px] font-medium text-[var(--ink)]">
                          {section.label}
                        </span>
                        <Link
                          href={section.overviewHref}
                          onClick={() => setActiveMenu(null)}
                          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[var(--ruby)] hover:text-[var(--burgundy)] hover:underline underline-offset-2 transition-colors duration-150"
                        >
                          <span>{section.overviewLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </div>

                      {/* Hairline-Divided Items */}
                      <div
                        className={
                          isDepartments
                            ? 'grid grid-cols-4'
                            : 'flex flex-col divide-y divide-[var(--rule)]'
                        }
                      >
                        {section.items.map((item, idx) => {
                          const isTopRow = idx < 4;
                          const deptCellBorders = isDepartments
                            ? `${idx % 4 !== 3 ? 'border-r border-[var(--rule)]' : ''} ${
                                isTopRow ? 'border-b border-[var(--rule)]' : ''
                              }`
                            : '';

                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => setActiveMenu(null)}
                              className={`group flex flex-col justify-start px-4 py-3.5 hover:bg-[var(--surface)]/75 transition-colors duration-150 focus-visible:outline-none focus-visible:bg-[var(--surface)] ${deptCellBorders}`}
                            >
                              {(item.code || item.badge) && (
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                  {item.code ? (
                                    <span className="font-mono text-[11px] font-semibold text-[var(--ruby)] bg-[var(--surface)] border border-[var(--rule)] px-1.5 py-0.5 rounded-sm whitespace-nowrap shrink-0">
                                      {item.code}
                                    </span>
                                  ) : (
                                    <span />
                                  )}
                                  {item.badge && (
                                    <span className="font-mono text-[11px] text-[var(--ink)]/70 tabular-nums shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                              )}
                              <span className="text-[13.5px] font-semibold text-[var(--ink)] group-hover:text-[var(--ruby)] leading-snug transition-colors duration-150">
                                {item.title}
                              </span>
                              <p className="text-[12.5px] text-[var(--muted)] leading-snug mt-1">
                                {item.description}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Contextual Anchor Strip */}
          <div className="flex items-center gap-4 text-[12.5px] text-[var(--ink)]/75 shrink-0">
            <Link
              href="/departments"
              className="inline-flex items-center gap-1.5 hover:text-[var(--ruby)] transition-colors duration-150 whitespace-nowrap"
            >
              <span className="font-semibold text-[var(--ink)] tabular-nums">8</span>
              <span>Departments</span>
            </Link>
            <span className="text-[var(--ink)]/25" aria-hidden="true">·</span>
            <Link
              href="/documents"
              className="inline-flex items-center gap-1.5 hover:text-[var(--ruby)] transition-colors duration-150 whitespace-nowrap"
            >
              <span className="font-semibold text-[var(--ink)] tabular-nums">5,822</span>
              <span>Cataloged Records</span>
            </Link>
          </div>
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
          className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none z-50 bg-transparent backdrop:bg-[#181112]/55"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-full max-w-sm h-full bg-[var(--surface-raised)] border-l border-[var(--ink)]/15 shadow-2xl p-5 overflow-y-auto flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--rule)]">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src="/assets/brand/gpcet-logo.png"
                  width={32}
                  height={32}
                  alt=""
                  className="size-8 object-contain shrink-0"
                />
                <span className="font-serif text-[16px] font-semibold text-[var(--ink)] truncate">
                  GPCET Directory
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] font-medium text-[var(--ink)] hover:text-[var(--ruby)] hover:bg-[var(--surface)] rounded-sm transition-colors duration-120"
              >
                <span>Close</span>
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Search Trigger in Mobile Sheet */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openSearchModal();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 text-[13px] rounded-sm border border-[var(--ink)]/15 bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-120"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>Search documents &amp; faculty...</span>
              </span>
              <kbd className="font-mono text-[10.5px] px-1.5 py-0.5 bg-[var(--surface-raised)] border border-[var(--ink)]/12 rounded-sm">
                ⌘K
              </kbd>
            </button>

            {/* Accordion Navigation Groups */}
            <nav aria-label="Mobile sections" className="flex flex-col divide-y divide-[var(--rule)]">
              {NAVIGATION_SECTIONS.map((section) => {
                const isExpanded = mobileExpanded === section.label;
                return (
                  <div key={section.label} className="py-1.5">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(isExpanded ? null : section.label)}
                      className="w-full flex items-center justify-between py-2.5 text-[14.5px] font-semibold text-[var(--ink)] hover:text-[var(--ruby)] transition-colors duration-120"
                      aria-expanded={isExpanded}
                    >
                      <span>{section.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[var(--muted)] transition-transform duration-120 ${
                          isExpanded ? 'rotate-180 text-[var(--ruby)]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-2 pt-1 pb-2.5 flex flex-col divide-y divide-[var(--rule)]">
                        {section.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex flex-col py-2.5 px-2 hover:bg-[var(--surface)] transition-colors duration-120"
                          >
                            <span className="text-[13px] font-semibold text-[var(--ink)] flex items-baseline justify-between gap-2">
                              <span className="flex items-baseline gap-2 min-w-0">
                                {item.code && (
                                  <span className="font-mono text-[10.5px] font-medium text-[var(--ruby)] whitespace-nowrap shrink-0">
                                    {item.code}
                                  </span>
                                )}
                                <span className="leading-snug">{item.title}</span>
                              </span>
                              {item.badge && (
                                <span className="font-mono text-[10.5px] font-normal text-[var(--muted)] whitespace-nowrap shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </span>
                            <span className="text-[12px] text-[var(--muted)] leading-snug mt-0.5">
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

            {/* Bottom Institutional Actions */}
            <div className="mt-auto pt-4 border-t border-[var(--rule)] flex flex-col gap-2">
              <Link
                href="/documents"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-[13px] font-semibold rounded-sm border border-[var(--ink)]/15 bg-[var(--bg)] text-[var(--ink)] hover:bg-[var(--surface)] transition-colors duration-120"
              >
                <FileText className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />
                <span>Access Document Vault (5,822 items)</span>
              </Link>
              <Link
                href="/admissions"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center py-2.5 px-3 text-[13px] font-semibold rounded-sm bg-[var(--ruby)] hover:bg-[var(--burgundy)] text-white transition-colors duration-120"
              >
                Admissions 2026 (EAPCET: PULE)
              </Link>
            </div>
          </div>
        </dialog>
      )}
    </header>
  );
}
