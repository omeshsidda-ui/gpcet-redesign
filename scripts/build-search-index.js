import fs from 'node:fs';
import path from 'node:path';
import MiniSearch from 'minisearch';

/**
 * Decode HTML entities commonly present in WordPress scrape data
 */
export function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
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
 * Extract academic regulation code (e.g., R23, R20, R19, R18, R15)
 */
export function extractRegulation(title = '', filename = '') {
  const combined = `${title} ${filename}`;
  const match = combined.match(/\bR[-_]?(\d{2})\b/i);
  return match ? `R${match[1]}` : '';
}

/**
 * Extract department code from title or filename
 */
export function extractDepartment(title = '', filename = '') {
  const s = `${title} ${filename}`.toLowerCase();
  if (s.includes('cse') || s.includes('computer science')) return 'cse';
  if (s.includes('ai') || s.includes('artificial intelligence') || s.includes('cai')) return 'ai';
  if (s.includes('ece') || s.includes('electronics') || s.includes('communication')) return 'ece';
  if (s.includes('eee') || s.includes('electrical')) return 'eee';
  if (s.includes('mech') || s.includes('me-') || s.includes('mechanical')) return 'me';
  if (s.includes('civil') || s.includes('ce-')) return 'civil';
  if (s.includes('mba') || s.includes('management')) return 'mba';
  if (s.includes('h&s') || s.includes('humanities') || s.includes('basic science')) return 'hs';
  return '';
}

/**
 * URL-friendly slug generator
 */
export function slugify(text = '') {
  return text
    .toString()
    .toLowerCase()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'document';
}

/**
 * Build-time Search Index Generator
 * Partition 2.43 MB manifest into a lean client-side MiniSearch index (<180 KB)
 */
export function generateSearchIndex(workspaceRoot = process.cwd()) {
  const manifestPath = path.join(workspaceRoot, 'src', 'data', 'media-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Media manifest not found at ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Core academic categories: syllabus, calendars, timetables, circulars, accreditation, etc.
  const coreCategories = new Set([
    'syllabus',
    'academic_calendar',
    'exam_timetable',
    'circular',
    'accreditation_doc',
    'form_affidavit',
    'lecture_presentation'
  ]);

  // Priority 1: All documents in core academic categories
  const coreItems = manifest.items.filter(item => coreCategories.has(item.category));

  // Priority 2: Curated recent general institutional PDFs
  const generalPdfs = manifest.items
    .filter(item => item.category === 'general_pdf')
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  // Bounded selection to strictly satisfy the <180 KB payload gate
  const selectedDocs = [...coreItems, ...generalPdfs.slice(0, 30)];

  // Deduplicate and map to lean searchable document structure
  const seenIds = new Set();
  const searchDocuments = [];

  for (const item of selectedDocs) {
    if (seenIds.has(item.id)) continue;
    seenIds.add(item.id);

    const cleanTitle = decodeHtmlEntities(item.title);
    const reg = extractRegulation(cleanTitle, item.filename);
    const dept = extractDepartment(cleanTitle, item.filename);
    const baseSlug = slugify(item.filename ? item.filename.replace(/\.pdf$/i, '') : cleanTitle);

    searchDocuments.push({
      id: item.id,
      title: cleanTitle,
      category: item.category,
      dept,
      reg,
      slug: baseSlug
    });
  }

  // Initialize and populate MiniSearch
  const miniSearch = new MiniSearch({
    fields: ['title', 'category', 'dept', 'reg'],
    storeFields: ['title', 'category', 'dept', 'reg', 'slug'],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      boost: { title: 2, reg: 1.5, dept: 1.2 }
    }
  });

  miniSearch.addAll(searchDocuments);

  const serializedIndex = JSON.stringify(miniSearch);
  const sizeBytes = Buffer.byteLength(serializedIndex, 'utf8');
  const sizeKb = parseFloat((sizeBytes / 1024).toFixed(2));

  const publicDir = path.join(workspaceRoot, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'search-index.json');
  fs.writeFileSync(outputPath, serializedIndex, 'utf8');

  return {
    outputPath,
    totalIndexed: searchDocuments.length,
    sizeBytes,
    sizeKb
  };
}

// CLI runner
if (process.argv[1] && process.argv[1].endsWith('build-search-index.js')) {
  console.log('Building lean MiniSearch client search index from media manifest...');
  const result = generateSearchIndex();
  console.log(`Successfully generated ${result.outputPath}:`);
  console.log(`  - Indexed documents: ${result.totalIndexed}`);
  console.log(`  - Total payload size: ${result.sizeKb} KB (Target < 180 KB)`);
  if (result.sizeKb > 180) {
    console.error(`ERROR: Payload size ${result.sizeKb} KB exceeds 180 KB limit!`);
    process.exit(1);
  } else {
    console.log(`  - Status: PASSED (<180 KB acceptance gate satisfied)`);
  }
}
