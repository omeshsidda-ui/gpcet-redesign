import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { validateContentFrontmatter } from './validations/content.schema.js';

let cachedRoutes = null;
let routeToFileMap = null;
let allFilesCache = null;

const CONTENT_DIR = path.join(process.cwd(), 'content');

function crawlMarkdownFiles(dir) {
  let results = [];
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

export function normalizeSlugPath(slugInput) {
  if (Array.isArray(slugInput)) {
    return slugInput.map((s) => String(s).trim().replace(/^\/+|\/+$/g, '')).filter(Boolean);
  }
  return String(slugInput || '')
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);
}

function initializeRouteIndex() {
  if (cachedRoutes && routeToFileMap && allFilesCache) {
    return { routes: cachedRoutes, map: routeToFileMap, files: allFilesCache };
  }

  const files = crawlMarkdownFiles(CONTENT_DIR);
  const map = new Map();
  const routeParamMap = new Map();

  for (const filePath of files) {
    const relativeToContent = path
      .relative(CONTENT_DIR, filePath)
      .replace(/\\/g, '/')
      .replace(/\.md$/, '');

    const fileSlug = normalizeSlugPath(relativeToContent);
    const fileKey = fileSlug.join('/');
    if (!map.has(fileKey)) {
      map.set(fileKey, filePath);
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(fileContent);
      const data = parsed.data;

      if (data && typeof data === 'object') {
        if (data.route && typeof data.route === 'string') {
          const frontmatterSlug = normalizeSlugPath(data.route);
          const routeKey = frontmatterSlug.join('/');

          if (routeKey) {
            if (!map.has(routeKey) || relativeToContent.endsWith('/index')) {
              map.set(routeKey, filePath);
            }

            if (!routeParamMap.has(routeKey)) {
              const param = {
                slug: frontmatterSlug,
                path: `/${routeKey}`,
              };
              frontmatterSlug.forEach((seg, idx) => {
                param[idx] = seg;
              });
              routeParamMap.set(routeKey, param);
            }
          }
        }
      }
    } catch {
      // Continue indexing remaining files
    }

    if (!routeParamMap.has(fileKey)) {
      const param = {
        slug: fileSlug,
        path: `/${fileKey}`,
      };
      fileSlug.forEach((seg, idx) => {
        param[idx] = seg;
      });
      routeParamMap.set(fileKey, param);
    }
  }

  cachedRoutes = Array.from(routeParamMap.values());
  routeToFileMap = map;
  allFilesCache = files;

  return { routes: cachedRoutes, map: routeToFileMap, files: allFilesCache };
}

export function getAllContentRoutes() {
  const { routes } = initializeRouteIndex();
  return routes;
}

export function resolveContentFilePath(slugInput) {
  const { map } = initializeRouteIndex();
  const slug = normalizeSlugPath(slugInput);
  const routeKey = slug.join('/');

  if (!routeKey) {
    return null;
  }

  if (map.has(routeKey)) {
    return map.get(routeKey);
  }

  const directPath = path.join(CONTENT_DIR, `${routeKey}.md`);
  if (fs.existsSync(directPath)) {
    return directPath;
  }

  const indexPath = path.join(CONTENT_DIR, routeKey, 'index.md');
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }

  const orphanKey = `archive-or-orphan/${routeKey}`;
  if (map.has(orphanKey)) {
    return map.get(orphanKey);
  }

  return null;
}

export function generateTableOfContents(markdownBody) {
  if (!markdownBody || typeof markdownBody !== 'string') {
    return [];
  }

  const lines = markdownBody.split('\n');
  const toc = [];
  const slugCounts = new Map();
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

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

    const level = headingMatch[1].length;
    let headingText = headingMatch[2].trim();

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

const LABEL_MAP = {
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

function formatSegmentLabel(segment) {
  const lower = segment.toLowerCase();
  if (LABEL_MAP[lower]) {
    return LABEL_MAP[lower];
  }
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function getCategoryBreadcrumbs(slugInput, pageTitle) {
  const slugs = normalizeSlugPath(slugInput);
  const breadcrumbs = [
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

export function getContentBySlug(slugInput) {
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

function levenshteinDistance(a, b) {
  const matrix = [];
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
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[aLen][bLen];
}

export function findClosestRoutes(targetSlugInput, maxSuggestions = 5) {
  const target = normalizeSlugPath(targetSlugInput).join('/');
  if (!target) {
    return [];
  }

  const { routes } = initializeRouteIndex();
  const scored = [];

  for (const route of routes) {
    const routeStr = route.slug.join('/');
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
