'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  FileText,
  Building2,
  GraduationCap,
  Users,
  Award,
  CornerDownLeft,
} from 'lucide-react';
import MiniSearch from 'minisearch';

interface SearchDoc {
  id: string;
  title: string;
  category: 'Portals' | 'Departments' | 'Documents' | 'Faculty' | 'Accreditation';
  description: string;
  href: string;
  badge?: string;
  keywords?: string;
}

const STATIC_CATALOG: SearchDoc[] = [
  // Portals & Major Gateways
  {
    id: 'p-vault',
    title: 'Central Syllabus & Document Vault',
    category: 'Portals',
    description: 'Direct access to 5,822 cataloged academic circulars, regulations, and timetables.',
    href: '/documents',
    badge: '5,822 Items',
    keywords: 'syllabus curriculum regulations pdfs downloads circulars notices',
  },
  {
    id: 'p-admissions',
    title: 'B.Tech Admissions 2026-27',
    category: 'Portals',
    description: 'EAPCET Counseling Code PULE, eligibility rules, fee structures, and seat matrix.',
    href: '/admissions',
    badge: 'Code: PULE',
    keywords: 'admissions eapcet eamcet pule seats lateral entry ecet fees scholarships',
  },
  {
    id: 'p-exam-cell',
    title: 'Autonomous Examination Cell',
    category: 'Portals',
    description: 'Semester timetables, results, hall tickets, and revaluation circulars.',
    href: '/documents?category=timetable',
    badge: 'Exam Cell',
    keywords: 'exams timetables hall tickets marks memos results autonomous controller',
  },
  {
    id: 'p-naac',
    title: 'NAAC SSR Portfolio (Grade A+)',
    category: 'Accreditation',
    description: 'Institutional Cycle 2 SSR documentation, metrics 1.1.2 through 7.3.1.',
    href: '/accreditation/naac',
    badge: '3.38 CGPA',
    keywords: 'naac ssr criteria a+ accreditation iqac assessment cycle 2 metrics',
  },
  {
    id: 'p-nba',
    title: 'NBA Tier-1 Accreditation',
    category: 'Accreditation',
    description: 'National Board of Accreditation for CSE, ECE, EEE, ME, and CE programs.',
    href: '/accreditation/nba',
    badge: 'Tier-1 NBA',
    keywords: 'nba outcome based education tier 1 compliance accreditation',
  },
  {
    id: 'p-idea-lab',
    title: 'AICTE IDEA Lab',
    category: 'Portals',
    description: 'Advanced prototyping facility, 3D printers, laser cutters, and student projects.',
    href: '/research/idea-lab',
    badge: 'Research',
    keywords: 'idea lab aicte 3d printing prototyping fabrication patents innovations',
  },
  {
    id: 'p-placements',
    title: 'Career Development & Placement Cell',
    category: 'Portals',
    description: 'Campus placement statistics, recruitment drives, and corporate partners.',
    href: '/placements',
    badge: 'Placements',
    keywords: 'placements jobs campus drives tcs infosys wipro packages offers',
  },
  {
    id: 'p-rti',
    title: 'Right to Information (RTI Act 2005)',
    category: 'Portals',
    description: 'Public Information Officers, Appellate Authority, and statutory disclosures.',
    href: '/statutory/rti',
    badge: 'Statutory',
    keywords: 'rti right to information pio legal compliance disclosure',
  },

  // 8 Engineering Departments
  {
    id: 'd-cse',
    title: 'Computer Science and Engineering (CSE)',
    category: 'Departments',
    description: 'Intake: 360 Seats · NBA Accredited · HOD: Dr. K. Sreenivasulu.',
    href: '/departments/cse',
    badge: '360 Seats',
    keywords: 'cse computer science software coding ai cloud hod sreenivasulu',
  },
  {
    id: 'd-ai',
    title: 'Artificial Intelligence & Data Science (AI & DS)',
    category: 'Departments',
    description: 'Intake: 180 Seats · Deep Learning, GPU clusters, and modern data pipelines.',
    href: '/departments/ai',
    badge: '180 Seats',
    keywords: 'ai ds data science machine learning python neural networks artificial intelligence',
  },
  {
    id: 'd-ece',
    title: 'Electronics & Communication Engineering (ECE)',
    category: 'Departments',
    description: 'Intake: 180 Seats · NBA Accredited · VLSI, Embedded Systems, Communications.',
    href: '/departments/ece',
    badge: '180 Seats',
    keywords: 'ece electronics communication vlsi embedded systems signal processing',
  },
  {
    id: 'd-eee',
    title: 'Electrical & Electronics Engineering (EEE)',
    category: 'Departments',
    description: 'Intake: 60 Seats · NBA Accredited · Power Systems, Smart Grids, EV Technology.',
    href: '/departments/eee',
    badge: '60 Seats',
    keywords: 'eee electrical electronics power grid ev electric vehicles renewable energy',
  },
  {
    id: 'd-me',
    title: 'Mechanical Engineering (ME)',
    category: 'Departments',
    description: 'Intake: 60 Seats · NBA Accredited · CAD/CAM, Robotics, Thermal Dynamics.',
    href: '/departments/me',
    badge: '60 Seats',
    keywords: 'mechanical me robotics cad cam manufacturing thermal engines fluid',
  },
  {
    id: 'd-civil',
    title: 'Civil Engineering (CE)',
    category: 'Departments',
    description: 'Intake: 60 Seats · NBA Accredited · Structural Design, Surveying, Green Concrete.',
    href: '/departments/civil',
    badge: '60 Seats',
    keywords: 'civil ce structures surveying construction geotechnical environment concrete',
  },
  {
    id: 'd-hs',
    title: 'Humanities & Sciences (H&S)',
    category: 'Departments',
    description: 'Basic Engineering Sciences: Mathematics, Physics, Chemistry, English Communication.',
    href: '/departments/hs',
    badge: 'Foundations',
    keywords: 'humanities sciences physics chemistry maths english basic sciences',
  },
  {
    id: 'd-mba',
    title: 'Master of Business Administration (MBA)',
    category: 'Departments',
    description: 'PG Management: Finance, Human Resources, and Marketing disciplines.',
    href: '/departments/mba',
    badge: '180 Seats',
    keywords: 'mba management business pg finance hr marketing icet',
  },

  // Key Academic Documents & Regulations
  {
    id: 'doc-r20',
    title: 'R20 Academic Regulations & Course Structures',
    category: 'Documents',
    description: 'Official autonomous curriculum framework for 4-year B.Tech degree programs.',
    href: '/documents?category=syllabus&q=R20',
    badge: 'R20 Regulation',
    keywords: 'r20 syllabus regulations credits grading course structure',
  },
  {
    id: 'doc-r19',
    title: 'R19 Academic Regulations & Curriculum',
    category: 'Documents',
    description: 'B.Tech autonomous curriculum guidelines for R19 batch scholars.',
    href: '/documents?category=syllabus&q=R19',
    badge: 'R19 Regulation',
    keywords: 'r19 regulations syllabus curriculum previous batches',
  },
  {
    id: 'doc-cal-26',
    title: 'Academic Calendar 2026-27 (UG & PG)',
    category: 'Documents',
    description: 'Instructional commencement, mid-term examinations, and semester closure dates.',
    href: '/documents?category=calendar',
    badge: 'Calendar 2026',
    keywords: 'calendar academic schedule holidays semester dates working days',
  },
  {
    id: 'doc-aicte-md',
    title: 'AICTE Mandatory Disclosure Report 2026',
    category: 'Documents',
    description: 'Official statutory disclosure for approvals, intake, facilities, and governance.',
    href: '/statutory/mandatory-disclosure',
    badge: 'AICTE Compliance',
    keywords: 'aicte mandatory disclosure approvals compliance land buildings library',
  },
];

const SHORT_CODE_BADGES = new Set(['CSE', 'AI', 'ECE', 'EEE', 'ME', 'CIVIL', 'H&S', 'MBA']);

export default function GlobalSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchDoc[]>(STATIC_CATALOG.slice(0, 8));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, startTransition] = useTransition();

  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const miniSearchRef = useRef<MiniSearch<SearchDoc> | null>(null);

  // Initialize MiniSearch Index with static catalog and lazy-load faculty records
  useEffect(() => {
    const miniSearch = new MiniSearch<SearchDoc>({
      fields: ['title', 'category', 'description', 'badge', 'keywords'],
      storeFields: ['id', 'title', 'category', 'description', 'href', 'badge'],
      searchOptions: {
        boost: { title: 3, badge: 2, keywords: 2, category: 1.5 },
        fuzzy: 0.2,
        prefix: true,
      },
    });

    miniSearch.addAll(STATIC_CATALOG);
    miniSearchRef.current = miniSearch;

    const loadExtraData = async () => {
      try {
        const depts = ['cse', 'ai', 'ece', 'eee', 'me', 'civil', 'hs', 'mba'];
        const extraDocs: SearchDoc[] = [];

        for (const dept of depts) {
          try {
            const data = await import(`../../data/faculty/${dept}.json`);
            if (Array.isArray(data.default)) {
              data.default.forEach((f: { name?: string; designation?: string; department?: string; qualification?: string }, idx: number) => {
                const slug = (f.name || '')
                  .toLowerCase()
                  .replace(/dr\.|mr\.|mrs\.|ms\.|prof\./g, '')
                  .trim()
                  .replace(/[\s\W-]+/g, '-');

                extraDocs.push({
                  id: `fac-${dept}-${idx}`,
                  title: `${f.name} (${f.designation || 'Faculty'})`,
                  category: 'Faculty',
                  description: `Department of ${f.department || dept.toUpperCase()} · ${f.qualification || 'M.Tech'}`,
                  href: `/departments/${dept}/faculty/${slug}`,
                  badge: dept.toUpperCase(),
                  keywords: `${f.name} ${f.designation} ${f.qualification} ${dept} professor hod`,
                });
              });
            }
          } catch {
            // Keep going if a department file is missing
          }
        }

        if (extraDocs.length > 0 && miniSearchRef.current) {
          miniSearchRef.current.addAll(extraDocs);
        }
      } catch (err) {
        console.warn('Deferred search index expansion:', err);
      }
    };

    if (typeof window !== 'undefined') {
      if (window.requestIdleCallback) {
        const idleId = window.requestIdleCallback(loadExtraData);
        return () => window.cancelIdleCallback?.(idleId);
      }
      const timeoutId = setTimeout(loadExtraData, 500);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-search-modal', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-search-modal', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input and reset query on modal open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults(STATIC_CATALOG.slice(0, 8));
      setSelectedIndex(0);
      const trigger = document.activeElement;
      dialog.current?.showModal();
      inputRef.current?.focus();
      return () => {
        if (trigger instanceof HTMLElement && trigger.isConnected) {
          trigger.focus({ preventScroll: true });
        }
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.getElementById(`search-result-${selectedIndex}`)?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, selectedIndex]);

  // Handle Query Changes with MiniSearch
  const handleQueryChange = (val: string) => {
    setQuery(val);
    startTransition(() => {
      if (!val.trim()) {
        setResults(STATIC_CATALOG.slice(0, 8));
        setSelectedIndex(0);
        return;
      }

      if (miniSearchRef.current) {
        const searchHits = miniSearchRef.current.search(val);
        const mapped = searchHits.slice(0, 12).map((hit) => hit as unknown as SearchDoc);
        setResults(mapped);
        setSelectedIndex(0);
      }
    });
  };

  // Keyboard Navigation inside Modal (Up / Down / Enter)
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.target !== inputRef.current) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        navigateTo(results[selectedIndex].href);
      }
    }
  };

  const navigateTo = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Portals':
        return <Building2 className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />;
      case 'Departments':
        return <GraduationCap className="w-4 h-4 text-[var(--brand-crimson)]" aria-hidden="true" />;
      case 'Documents':
        return <FileText className="w-4 h-4 text-[var(--ink)]" aria-hidden="true" />;
      case 'Faculty':
        return <Users className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />;
      case 'Accreditation':
        return <Award className="w-4 h-4 text-[var(--distinction-ink)]" aria-hidden="true" />;
      default:
        return <FileText className="w-4 h-4 text-[var(--muted)]" aria-hidden="true" />;
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialog}
      onCancel={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Institutional Search Command Palette"
      className="fixed inset-0 m-0 max-w-none max-h-none w-full h-dvh z-50 bg-transparent backdrop:bg-[#181112]/60 flex items-start justify-center pt-10 sm:pt-20 p-4"
      onClick={() => setIsOpen(false)}
      onKeyDown={handleModalKeyDown}
    >
      <div
        className="w-full max-w-2xl bg-[var(--surface-raised)] border border-[var(--ink)]/15 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-5 py-3.5 border-b-2 border-[var(--rule)] focus-within:border-[var(--ruby)] bg-[var(--bg)] gap-3 transition-colors duration-120">
          <Search className="w-4 h-4 text-[var(--muted)] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search documents, faculty, departments, regulations (e.g. R20, CSE)..."
            aria-label="Search query"
            role="combobox"
            aria-expanded="true"
            aria-activedescendant={results.length ? `search-result-${selectedIndex}` : undefined}
            aria-autocomplete="list"
            aria-controls="search-results-list"
            style={{ outline: 'none', boxShadow: 'none' }}
            className="flex-1 bg-transparent border-none text-[15px] leading-normal text-[var(--ink)] placeholder:text-[var(--muted)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                handleQueryChange('');
                inputRef.current?.focus();
              }}
              className="text-[12px] font-medium text-[var(--muted)] hover:text-[var(--ink)] px-2 py-1 rounded-sm hover:bg-[var(--surface)] transition-colors duration-120"
              aria-label="Clear search input"
            >
              Clear
            </button>
          )}
          <span className="h-4 w-px bg-[var(--rule)]" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close search"
            className="p-1.5 rounded-sm text-[var(--muted)] hover:text-[var(--ruby)] hover:bg-[var(--surface)] transition-colors duration-120"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Context Header Strip */}
        <div className="px-4 sm:px-5 py-2 bg-[var(--surface)] border-b border-[var(--rule)] flex items-center justify-between text-[12px] text-[var(--muted)]">
          <span>
            {query.trim()
              ? `${results.length} matching ${results.length === 1 ? 'record' : 'records'}`
              : 'Quick Institutional Index'}
          </span>
          <span className="hidden sm:inline font-sans text-[11.5px] tabular-nums">
            EAPCET: <span className="font-mono font-semibold text-[var(--ink)]">PULE</span>
          </span>
        </div>

        {/* Results Container */}
        <div
          ref={listRef}
          id="search-results-list"
          aria-label="Search results"
          role="listbox"
          className="overflow-y-auto divide-y divide-[var(--rule)] flex-1 max-h-[55vh]"
        >
          {results.length === 0 ? (
            <div className="py-12 px-6 text-center text-[14px] text-[var(--muted)]">
              <p className="font-semibold text-[var(--ink)]">No cataloged matches found</p>
              <p className="mt-1.5 text-[13px] max-w-md mx-auto leading-relaxed">
                Try searching by regulation code (R20, R19), course name, faculty name, or department acronym.
              </p>
            </div>
          ) : (
            results.map((doc, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={doc.id}
                  id={`search-result-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => navigateTo(doc.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-start justify-between gap-4 px-4 sm:px-5 py-3.5 cursor-pointer transition-colors duration-120 ${
                    isSelected ? 'bg-[var(--surface)]' : 'hover:bg-[var(--surface)]/60'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 p-1.5 rounded-sm bg-[var(--bg)] border border-[var(--rule)] shrink-0">
                      {getCategoryIcon(doc.category)}
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span
                          className={`text-[14.5px] font-semibold leading-snug ${
                            isSelected ? 'text-[var(--ruby)]' : 'text-[var(--ink)]'
                          }`}
                        >
                          {doc.title}
                        </span>
                        {doc.badge && (
                          <span
                            className={`text-[11px] px-1.5 py-0.5 rounded-sm bg-[var(--bg)] border border-[var(--rule)] text-[var(--muted)] tabular-nums ${
                              SHORT_CODE_BADGES.has(doc.badge)
                                ? 'font-mono font-semibold'
                                : 'font-sans font-medium'
                            }`}
                          >
                            {doc.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[12.5px] text-[var(--muted)] leading-relaxed mt-0.5">
                        {doc.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-center">
                    <span className="text-[11px] font-medium text-[var(--muted)]">
                      {doc.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Accessible Keyboard Hint Footer */}
        <div className="px-4 sm:px-5 py-2.5 bg-[var(--surface)] border-t border-[var(--rule)] flex items-center justify-between gap-4 text-[12px] text-[var(--muted)]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="font-mono text-[10.5px] px-1.5 py-0.5 bg-[var(--surface-raised)] border border-[var(--ink)]/12 rounded-sm">↑</kbd>
              <kbd className="font-mono text-[10.5px] px-1.5 py-0.5 bg-[var(--surface-raised)] border border-[var(--ink)]/12 rounded-sm">↓</kbd>
              <span>navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="font-mono text-[10.5px] px-1.5 py-0.5 bg-[var(--surface-raised)] border border-[var(--ink)]/12 rounded-sm">↵</kbd>
              <span>open</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <kbd className="font-mono text-[10.5px] px-1.5 py-0.5 bg-[var(--surface-raised)] border border-[var(--ink)]/12 rounded-sm">esc</kbd>
              <span>close</span>
            </span>
          </div>

          <div className="font-sans text-[12px] text-[var(--ink)] font-medium tabular-nums">
            GPCET Vault · 5,822 Items
          </div>
        </div>
      </div>
    </dialog>
  );
}
