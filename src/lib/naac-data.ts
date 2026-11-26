import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface NaacMetricItem {
  slug: string;
  title: string;
  criterionNumber: number;
  pdfsCount: number;
  tablesCount: number;
  modified?: string;
}

export interface NaacCriterionGroup {
  number: number;
  title: string;
  focus: string;
  metrics: NaacMetricItem[];
}

const CRITERION_DEFINITIONS: Array<{ number: number; title: string; focus: string }> = [
  {
    number: 1,
    title: 'Curricular Aspects',
    focus: 'Curriculum design, autonomous academic flexibility, skill enhancement, and stakeholder feedback.',
  },
  {
    number: 2,
    title: 'Teaching-Learning and Evaluation',
    focus: 'Student enrollment diversity, mentor-mentee ratio, ICT pedagogy, and outcome-based evaluation.',
  },
  {
    number: 3,
    title: 'Research, Innovations and Extension',
    focus: 'Funded grants, Scopus/IEEE publications, AICTE IDEA Lab innovation, and community outreach.',
  },
  {
    number: 4,
    title: 'Infrastructure and Learning Resources',
    focus: 'Central & Digital Library, smart classrooms, computing facilities, and campus maintenance.',
  },
  {
    number: 5,
    title: 'Student Support and Progression',
    focus: 'Government & merit scholarships, competitive examination coaching, placements, and alumni engagement.',
  },
  {
    number: 6,
    title: 'Governance, Leadership and Management',
    focus: 'Strategic planning, decentralized governance, financial audits, faculty welfare, and IQAC initiatives.',
  },
  {
    number: 7,
    title: 'Institutional Values and Best Practices',
    focus: 'Green campus audit, gender equity, renewable energy, code of conduct, and institutional distinctiveness.',
  },
];

function inferCriterionNumber(filename: string, title: string): number {
  const combined = `${filename} ${title}`.toLowerCase();
  const numMatch = combined.match(/(?:criteria|criterion)[-_ ]*([1-7])/) || combined.match(/^([1-7])[-_.]/);
  if (numMatch) {
    const parsed = Number.parseInt(numMatch[1], 10);
    if (parsed >= 1 && parsed <= 7) return parsed;
  }
  if (combined.includes('curriculum') || combined.includes('internship')) return 1;
  if (combined.includes('admission') || combined.includes('enrollment')) return 2;
  return 1;
}

function formatMetricTitle(rawTitle: string, slug: string): string {
  const clean = (rawTitle || slug).replace(/[_-]+/g, ' ').trim();
  if (/^\d+(\s+\d+)+$/.test(clean)) {
    return `Metric ${clean.replace(/\s+/g, '.')}`;
  }
  return clean;
}

/**
 * Reads all 48 rescued NAAC SSR markdown pages from `content/accreditation/naac/`
 * and organizes them under NAAC Criteria 1–7.
 */
export function getAllNaacMetrics(): NaacMetricItem[] {
  const naacDir = path.join(process.cwd(), 'content', 'accreditation', 'naac');
  if (!fs.existsSync(naacDir)) return [];

  const files = fs.readdirSync(naacDir).filter((f) => f.endsWith('.md')).sort();
  return files.map((file) => {
    const fileSlug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(naacDir, file), 'utf8');
    const parsed = matter(raw);
    const data = parsed.data || {};
    const slug = typeof data.slug === 'string' && data.slug.trim() ? data.slug.trim() : fileSlug;
    const title = formatMetricTitle(typeof data.title === 'string' ? data.title : fileSlug, fileSlug);

    return {
      slug,
      title,
      criterionNumber: inferCriterionNumber(file, title),
      pdfsCount: typeof data.pdfs_count === 'number' ? data.pdfs_count : 0,
      tablesCount: typeof data.tables_count === 'number' ? data.tables_count : 0,
      modified: typeof data.modified === 'string' ? data.modified : undefined,
    };
  });
}

export function getNaacCriteriaGroups(): NaacCriterionGroup[] {
  const metrics = getAllNaacMetrics();
  return CRITERION_DEFINITIONS.map((def) => ({
    ...def,
    metrics: metrics.filter((m) => m.criterionNumber === def.number),
  }));
}
