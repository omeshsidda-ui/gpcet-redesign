import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  ContentFrontmatter,
  ContentPage,
  TableOfContentsItem,
  BreadcrumbItem,
  validateContentFrontmatter,
} from './validations/content.schema';

/**
 * Route parameter object conforming to Next.js 15 generateStaticParams() contract.
 */
export interface ContentRouteParam {
  slug: string[];
  [index: number]: string;
  path: string;
}

// In-memory route and page cache
let cachedRoutes: ContentRouteParam[] | null = null;
let routeToFileMap: Map<string, string> | null = null;
let allFilesCache: string[] | null = null;

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Recursively retrieves all markdown (.md) file paths within a directory.
 */
function crawlMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) {
    return results;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(crawlMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Normalizes route string or slug array into clean path segments without leading/trailing slashes.
 */
export function normalizeSlugPath(slugInput: string[] | string): string[] {
  if (Array.isArray(slugInput)) {
    return slugInput.map((s) => s.trim().replace(/^\/+|\/+$/g, '')).filter(Boolean);
  }
  return slugInput
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Builds and caches the bidirectional mapping between route paths and filesystem markdown files.
 */
function initializeRouteIndex(): {
  routes: ContentRouteParam[];
  map: Map<string, string>;
  files: string[];
} {
  if (cachedRoutes && routeToFileMap && allFilesCache) {
    return { routes: cachedRoutes, map: routeToFileMap, files: allFilesCache };
  }

  const files = crawlMarkdownFiles(CONTENT_DIR);
  const map = new Map<string, string>();
  const routeParamMap = new Map<string, ContentRouteParam>();

  for (const filePath of files) {
    const relativeToContent = path
      .relative(CONTENT_DIR, filePath)
      .replace(/\\/g, '/')
      .replace(/\.md$/, '');

    // Map exact relative file path
    const fileSlug = normalizeSlugPath(relativeToContent);
    const fileKey = fileSlug.join('/');
    if (!map.has(fileKey)) {
      map.set(fileKey, filePath);
    }

    // Try reading frontmatter route for canonical slug mapping
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(fileContent);
      const data = parsed.data;

      if (data && typeof data === 'object') {
        if (data.route && typeof data.route === 'string') {
          const frontmatterSlug = normalizeSlugPath(data.route);
          const routeKey = frontmatterSlug.join('/');

          if (routeKey) {
            // If conflict, prefer non-index or earlier canonical match
            if (!map.has(routeKey) || relativeToContent.endsWith('/index')) {
              map.set(routeKey, filePath);
            }

            if (!routeParamMap.has(routeKey)) {
              const param: any = {
                slug: frontmatterSlug,
                path: `/${routeKey}`,
              };
              frontmatterSlug.forEach((seg, idx) => {
                param[idx] = seg;
              });
              routeParamMap.set(routeKey, param as ContentRouteParam);
            }
          }
        }
      }
    } catch {
      // Continue indexing remaining files if single frontmatter fails
    }

    // Also register the file slug path directly if not already registered
    if (!routeParamMap.has(fileKey)) {
      const param: any = {
        slug: fileSlug,
        path: `/${fileKey}`,
      };
      fileSlug.forEach((seg, idx) => {
        param[idx] = seg;
      });
      routeParamMap.set(fileKey, param as ContentRouteParam);
    }
  }

  cachedRoutes = Array.from(routeParamMap.values());
  routeToFileMap = map;
  allFilesCache = files;

  return { routes: cachedRoutes, map: routeToFileMap, files: allFilesCache };
}

/**
 * Returns all valid slug paths for Next.js 15 App Router generateStaticParams().
 * Returns an array of objects conforming to [{ slug: string[] }].
 */
export function getAllContentRoutes(): ContentRouteParam[] {
  const { routes } = initializeRouteIndex();
  return routes;
}

/**
 * Resolves a markdown file path from a slug array or route string.
 */
export function resolveContentFilePath(slugInput: string[] | string): string | null {
  const { map } = initializeRouteIndex();
  const slug = normalizeSlugPath(slugInput);
  const routeKey = slug.join('/');

  if (!routeKey) {
    return null;
  }

  // 1. Direct match in route map
  if (map.has(routeKey)) {
    return map.get(routeKey)!;
  }

  // 2. Direct filesystem file path (content/<routeKey>.md)
  const directPath = path.join(CONTENT_DIR, `${routeKey}.md`);
  if (fs.existsSync(directPath)) {
    return directPath;
  }

  // 3. Directory index (content/<routeKey>/index.md)
  const indexPath = path.join(CONTENT_DIR, routeKey, 'index.md');
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }

  // 4. Try archive-or-orphan directory
  const orphanKey = `archive-or-orphan/${routeKey}`;
  if (map.has(orphanKey)) {
    return map.get(orphanKey)!;
  }

  return null;
}

/**
 * Extracts H2 and H3 headings for sticky anchor navigation.
 * Generates unique slugified anchor IDs and cleans raw markdown markers.
 */
export function generateTableOfContents(markdownBody: string): TableOfContentsItem[] {
  if (!markdownBody || typeof markdownBody !== 'string') {
    return [];
  }

  const lines = markdownBody.split('\n');
  const toc: TableOfContentsItem[] = [];
  const slugCounts = new Map<string, number>();
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Skip code blocks
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) {
      continue;
    }

    const headingMatch = line.match(/^(#{2,3})\s+(.*)$/);
    if (!headingMatch) {
      continue;
    }

    const level = headingMatch[1].length as 2 | 3;
    let headingText = headingMatch[2].trim();

    // Clean inline markdown: bold, italic, links, badges
    headingText = headingText
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .trim();

    if (!headingText) {
      continue;
    }

    // Generate unique slugified ID
    let slugId = headingText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (!slugId) {
      slugId = `section-${toc.length + 1}`;
    }

    const count = slugCounts.get(slugId) || 0;
    slugCounts.set(slugId, count + 1);
    if (count > 0) {
      slugId = `${slugId}-${count}`;
    }

    toc.push({
      id: slugId,
      text: headingText,
      level,
    });
  }

  return toc;
}

/**
 * Department and academic acronym label dictionary.
 */
const LABEL_MAP: Record<string, string> = {
  academics: 'Academics',
  accreditation: 'Accreditation',
  administration: 'Administration',
  admissions: 'Admissions',
  'archive-or-orphan': 'Archive',
  'campus-life': 'Campus Life',
  departments: 'Departments',
  examinations: 'Examinations',
  placements: 'Placements',
  research: 'Research & Innovation',
  naac: 'NAAC SSR',
  nba: 'NBA Accreditation',
  aicte: 'AICTE Approvals',
  iqac: 'IQAC',
  bos: 'Board of Studies',
  cse: 'CSE',
  ai: 'CSE (AI)',
  ece: 'ECE',
  eee: 'EEE',
  me: 'Mechanical Engineering',
  civil: 'Civil Engineering',
  hs: 'Humanities & Sciences',
  mba: 'MBA',
  faculty: 'Faculty Directory',
  laboratories: 'Laboratories',
  syllabus: 'Syllabus & Regulations',
};

/**
 * Formats a single slug segment into an authoritative institutional label.
 */
function formatSegmentLabel(segment: string): string {
  const lower = segment.toLowerCase();
  if (LABEL_MAP[lower]) {
    return LABEL_MAP[lower];
  }
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Builds a hierarchical breadcrumb trail from a slug path.
 */
export function getCategoryBreadcrumbs(
  slugInput: string[] | string,
  pageTitle?: string
): BreadcrumbItem[] {
  const slugs = normalizeSlugPath(slugInput);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
  ];

  let cumulativeHref = '';
  for (let i = 0; i < slugs.length; i++) {
    const segment = slugs[i];
    cumulativeHref += `/${segment}`;

    const isLast = i === slugs.length - 1;
    const label = isLast && pageTitle ? pageTitle : formatSegmentLabel(segment);

    breadcrumbs.push({
      label,
      href: cumulativeHref,
    });
  }

  return breadcrumbs;
}

/**
 * Ingests, validates, and returns a content page dossier by its slug path.
 * Returns null if the page does not exist.
 */
export function getContentBySlug(slugInput: string[] | string): ContentPage | null {
  const slug = normalizeSlugPath(slugInput);
  const filePath = resolveContentFilePath(slug);

  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  const rawFile = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(rawFile);
  const frontmatter = validateContentFrontmatter(parsed.data);
  const content = parsed.content.trim();
  const toc = generateTableOfContents(content);
  const breadcrumbs = getCategoryBreadcrumbs(slug, frontmatter.title);

  return {
    frontmatter,
    content,
    filePath,
    slugPath: slug,
    toc,
    breadcrumbs,
  };
}

/**
 * Computes Levenshtein distance between two strings for typo resilience.
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  const aLen = a.length;
  const bLen = b.length;

  for (let i = 0; i <= aLen; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= bLen; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= aLen; i++) {
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[aLen][bLen];
}

/**
 * Finds the closest matching routes for 404 recovery suggestions.
 */
export function findClosestRoutes(
  targetSlugInput: string[] | string,
  maxSuggestions = 5
): Array<{ path: string; label: string; score: number }> {
  const target = normalizeSlugPath(targetSlugInput).join('/');
  if (!target) {
    return [];
  }

  const { routes } = initializeRouteIndex();
  const scored: Array<{ path: string; label: string; score: number }> = [];

  for (const route of routes) {
    const routeStr = route.slug.join('/');
    // Check direct substring inclusion
    if (routeStr.includes(target) || target.includes(routeStr)) {
      scored.push({
        path: route.path,
        label: formatSegmentLabel(route.slug[route.slug.length - 1] || 'Page'),
        score: 0,
      });
      continue;
    }

    const dist = levenshteinDistance(target, routeStr);
    const maxLen = Math.max(target.length, routeStr.length);
    const similarity = 1 - dist / maxLen;

    if (similarity > 0.45) {
      scored.push({
        path: route.path,
        label: formatSegmentLabel(route.slug[route.slug.length - 1] || 'Page'),
        score: similarity,
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxSuggestions);
}
