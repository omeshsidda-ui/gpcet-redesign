import { getAllDepartments, getDepartmentByCode } from '@/lib/data/departments.js';
import { getFacultyRoster, getDepartmentHod } from '@/lib/data/faculty.js';
import { getContentBySlug } from '@/lib/content';

export interface DepartmentRecord {
  code: string;
  name: string;
  shortName: string;
  establishedYear: number;
  intakeUg: number;
  intakePg: number;
  nbaAccredited: boolean;
  vision: string;
  mission: string[];
  contactEmail: string;
  contactPhone: string;
}

export interface EnrichedDepartment extends DepartmentRecord {
  deptNumber: string;
  degrees: string;
  intakeLabel: string;
  nbaStatusLabel: string;
  facultyCount: number;
  hodName: string;
  hodDesignation: string;
}

const DEPT_NUMBER_MAP: Record<string, string> = {
  cse: '05',
  ai: '43',
  ece: '04',
  eee: '02',
  me: '03',
  civil: '01',
  hs: 'H&S',
  mba: 'MBA',
};

const DEPT_DEGREES_MAP: Record<string, string> = {
  cse: 'B.Tech, M.Tech',
  ai: 'B.Tech',
  ece: 'B.Tech, M.Tech',
  eee: 'B.Tech, M.Tech',
  me: 'B.Tech',
  civil: 'B.Tech',
  hs: 'Basic Sciences',
  mba: 'MBA (PG)',
};

const VERIFIED_HOD_MAP: Record<string, { name: string; designation: string }> = {
  cse: { name: 'Dr. M. Srilakshmi', designation: 'Professor & Dean' },
  ai: { name: 'Dr. P. Suman Prakash', designation: 'Professor & Dean' },
  ece: { name: 'Dr. T. Tirupal', designation: 'Professor & Dean' },
  eee: { name: 'Dr. G. Panduranga Reddy', designation: 'Professor & Dean' },
  me: { name: 'Dr. G. Praveen Kumar', designation: 'Professor & Dean' },
  civil: { name: 'Dr. H. S. Abzal Basha', designation: 'Professor & Dean' },
  hs: { name: 'Dr. B. Suneetha', designation: 'Professor & Dean' },
  mba: { name: 'Dr. C. Naga Ganesh', designation: 'Professor & Dean' },
};

/**
 * Decodes common HTML character entities left over from WordPress exports.
 */
export function decodeHtmlEntities(input: string): string {
  if (!input) return '';
  return input
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Removes residual inline jQuery(function(){...}); / jQuery(document).ready(...)
 * marquee snippets left behind by WordPress/Avada scraping using balanced
 * parenthesis scanning so nested object literals never leave dangling `});`.
 */
function stripJQuerySnippets(text: string): string {
  const triggerRegex = /jQuery\s*\(\s*(?:function\s*\(|document\s*\)\s*\.ready\s*\(\s*function\s*\()/gi;
  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = triggerRegex.exec(text)) !== null) {
    const startIdx = match.index;
    const openParenIdx = text.indexOf('(', startIdx);
    if (openParenIdx === -1) break;

    let depth = 0;
    let inQuote: string | null = null;
    let escaped = false;
    let endIdx = -1;

    for (let i = openParenIdx; i < text.length; i++) {
      const ch = text[i];
      if (escaped) {
        escaped = false;
        continue;
      }
      if (inQuote) {
        if (ch === '\\') {
          escaped = true;
        } else if (ch === inQuote) {
          inQuote = null;
        }
        continue;
      }
      if (ch === "'" || ch === '"' || ch === '`') {
        inQuote = ch;
        continue;
      }
      if (ch === '(') {
        depth++;
      } else if (ch === ')') {
        depth--;
        if (depth === 0) {
          endIdx = i + 1;
          break;
        }
      }
    }

    if (endIdx !== -1) {
      // Consume optional trailing `;` and horizontal whitespace
      while (endIdx < text.length && (text[endIdx] === ';' || text[endIdx] === ' ' || text[endIdx] === '\t')) {
        endIdx++;
      }
      result += text.slice(lastIndex, startIdx);
      lastIndex = endIdx;
      triggerRegex.lastIndex = endIdx;
    } else {
      // Unbalanced single-line fallback: strip through end of current line
      const lineEnd = text.indexOf('\n', startIdx);
      const stopAt = lineEnd === -1 ? text.length : lineEnd;
      result += text.slice(lastIndex, startIdx);
      lastIndex = stopAt;
      triggerRegex.lastIndex = stopAt;
    }
  }

  result += text.slice(lastIndex);
  return result;
}

/**
 * Cleans legacy WordPress sidebar blocks, SVG lazy-load placeholders,
 * empty anchors, Avada #tab-* navigation blocks, inline jQuery snippets,
 * and raw shortcodes from scraped markdown content.
 */
export function sanitizeScrapedMarkdown(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';

  let text = raw
    // Neutralize executable <script> and <iframe> blocks before Markdown AST rendering
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/?script\b[^>]*>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<\/?iframe\b[^>]*>/gi, '')
    // Neutralize javascript: URI schemes in Markdown links
    .replace(/\]\(\s*javascript:[^)]*\)/gi, '](#)');

  // Strip residual jQuery(function(){...}); marquee snippets
  text = stripJQuerySnippets(text)
    // Strip data:image/svg+xml and 1x1 gif lazy-load placeholders (wrapped in links or standalone, single/multi-line)
    .replace(/\[[ \t\r\n]*!\[[^\[\]]*\]\(\s*data:image\/(?:[^()]|\([^()]*\))*\)[ \t\r\n]*\]\([^)]*\)/gi, '')
    .replace(/!\[[^\[\]]*\]\(\s*data:image\/(?:[^()]|\([^()]*\))*\)/gi, '')
    // Strip Avada #tab-* empty/navigation tab links (single-line or multi-line, optional bullets & bold markers)
    .replace(/(?:^|\n)[ \t]*(?:[-*+][ \t]+)?\*{0,4}\[[^\[\]]*\]\(#tab-[a-z0-9_-]+\)\*{0,4}[ \t]*(?=\n|$)/gi, '')
    .replace(/\*{0,4}\[[^\[\]]*\]\(#tab-[a-z0-9_-]+\)\*{0,4}/gi, '')
    // Strip empty anchor tags like [](# "Facebook"), [ ](#), or [](#)
    .replace(/\[\s*\]\(#[^)]*\)/g, '')
    // Strip WordPress/Avada [fusion_*], [vc_*], and [ms_*] shortcodes
    .replace(/\[\/?(?:ms|fusion|vc)_[^\]]*\]/gi, '')
    // Strip leading breadcrumb/banner lines injected by Avada theme
    .replace(/^[ \t]*Placements[ \t]*$/gm, '')
    .replace(/^[ \t]*Flash News[ \t]*$/gm, '')
    .replace(/^[ \t]*\[Welcome to G\.Pullaiah College[^\]]*\]\([^)]*\)[ \t]*$/gm, '')
    .replace(/^[ \t]*\[financial[_\\]*assistance[_\\]*letters\]\([^)]*\)[ \t]*$/gim, '')
    // Upgrade legacy http://www.gpcet.ac.in links
    .replace(/http:\/\/www\.gpcet\.ac\.in\//g, 'https://www.gpcet.ac.in/')
    .replace(/http:\/\/gpcet\.ac\.in\//g, 'https://gpcet.ac.in/');

  // Remove repeated legacy sidebar link blocks (e.g. "### **About GPCET**\n\n- [...]")
  const lines = text.split('\n');
  const cleanedLines: string[] = [];
  let skippingSidebar = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (
      /^#{2,4}\s+\*?\*?(About GPCET|Department of [A-Z&()\s]+|H&S Department|Student Resources|Research Resources|Placements)\*?\*?\s*$/i.test(
        trimmed
      )
    ) {
      // Check if followed by a bullet list of internal links
      const nextNonEmpty = lines.slice(i + 1).find((l) => l.trim().length > 0)?.trim() || '';
      if (nextNonEmpty.startsWith('-   [') || nextNonEmpty.startsWith('- [')) {
        skippingSidebar = true;
        continue;
      }
    }

    if (skippingSidebar) {
      if (
        trimmed === '' ||
        trimmed.startsWith('-   [') ||
        trimmed.startsWith('- [') ||
        /^#{2,4}\s+\*?\*?Department of/i.test(trimmed) ||
        /^#{2,4}\s+\*?\*?H&S Department/i.test(trimmed)
      ) {
        continue;
      }
      skippingSidebar = false;
    }

    // Skip any leftover Avada tab anchor fragments
    if (/^\]?\(#tab-[a-z0-9_-]+\)\*{0,4}$/i.test(trimmed)) {
      continue;
    }

    cleanedLines.push(line);
  }

  return cleanedLines
    .join('\n')
    // Clean up orphaned empty list bullets left behind after stripping placeholders
    .replace(/^[ \t]*[-*+][ \t]*$/gm, '')
    .replace(/^[ \t]*[-*+][ \t]+\*{2,}[ \t]*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Returns all 8 departments enriched with verified faculty counts and HOD metadata.
 */
export async function getEnrichedDepartments(): Promise<EnrichedDepartment[]> {
  const departments = (await getAllDepartments()) as DepartmentRecord[];

  return Promise.all(
    departments.map(async (dept) => {
      const roster = await getFacultyRoster({ department: dept.code, limit: 200 });
      const hodFromRoster = await getDepartmentHod(dept.code);
      const fallbackHod = VERIFIED_HOD_MAP[dept.code];

      const totalIntake = dept.intakeUg + dept.intakePg;
      const intakeLabel =
        totalIntake > 0
          ? dept.intakePg > 0 && dept.intakeUg > 0
            ? `${dept.intakeUg} UG + ${dept.intakePg} PG`
            : `${totalIntake} Seats`
          : 'Core Science';

      return {
        ...dept,
        deptNumber: DEPT_NUMBER_MAP[dept.code] || dept.shortName,
        degrees: DEPT_DEGREES_MAP[dept.code] || 'B.Tech',
        intakeLabel,
        nbaStatusLabel: dept.nbaAccredited
          ? 'NBA Accredited'
          : dept.code === 'hs'
          ? 'Supporting Dept'
          : 'AICTE Approved',
        facultyCount: roster.meta.total,
        hodName: fallbackHod?.name || hodFromRoster?.name || 'Department Head',
        hodDesignation: fallbackHod?.designation || hodFromRoster?.designation || 'Professor & HOD',
      };
    })
  );
}

/**
 * Returns a single enriched department by code, or null if invalid.
 */
export async function getEnrichedDepartment(code: string): Promise<EnrichedDepartment | null> {
  const dept = (await getDepartmentByCode(code)) as DepartmentRecord | null;
  if (!dept) return null;

  const roster = await getFacultyRoster({ department: dept.code, limit: 200 });
  const hodFromRoster = await getDepartmentHod(dept.code);
  const fallbackHod = VERIFIED_HOD_MAP[dept.code];
  const totalIntake = dept.intakeUg + dept.intakePg;

  return {
    ...dept,
    deptNumber: DEPT_NUMBER_MAP[dept.code] || dept.shortName,
    degrees: DEPT_DEGREES_MAP[dept.code] || 'B.Tech',
    intakeLabel:
      totalIntake > 0
        ? dept.intakePg > 0 && dept.intakeUg > 0
          ? `${dept.intakeUg} UG + ${dept.intakePg} PG`
          : `${totalIntake} Seats`
        : 'Core Science',
    nbaStatusLabel: dept.nbaAccredited
      ? 'NBA Accredited'
      : dept.code === 'hs'
      ? 'Supporting Dept'
      : 'AICTE Approved',
    facultyCount: roster.meta.total,
    hodName: fallbackHod?.name || hodFromRoster?.name || 'Department Head',
    hodDesignation: fallbackHod?.designation || hodFromRoster?.designation || 'Professor & HOD',
  };
}

/**
 * Finds and sanitizes the richest non-empty markdown file among candidate slugs
 * inside `content/departments/<dept>/`.
 */
export function getDepartmentMarkdownSection(
  deptCode: string,
  candidateSlugs: string[]
): { title: string; content: string; slug: string } | null {
  let bestMatch: { title: string; content: string; slug: string } | null = null;

  for (const slug of candidateSlugs) {
    const page = getContentBySlug(['departments', deptCode.toLowerCase(), slug]);
    if (!page) continue;

    const cleaned = sanitizeScrapedMarkdown(page.content);
    if (cleaned.length > 40) {
      if (!bestMatch || cleaned.length > bestMatch.content.length) {
        bestMatch = {
          title: page.frontmatter.title,
          content: cleaned,
          slug,
        };
      }
    }
  }

  return bestMatch;
}

/**
 * Reads and sanitizes any markdown page from `content/`.
 */
export function getCleanedContent(slugSegments: string[]): {
  title: string;
  content: string;
  modified?: string;
} | null {
  const page = getContentBySlug(slugSegments);
  if (!page) return null;
  const cleaned = sanitizeScrapedMarkdown(page.content);
  if (!cleaned) return null;
  return {
    title: page.frontmatter.title,
    content: cleaned,
    modified: page.frontmatter.modified || page.frontmatter.date,
  };
}
