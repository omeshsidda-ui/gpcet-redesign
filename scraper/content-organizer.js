import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';
import { CONFIG } from './config.js';
import { cleanHtmlAndConvertToMarkdown, normalizeUrl } from './html-parser.js';

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

/**
 * Creates clean, URL-friendly kebab-case slugs from titles.
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/&#8217;/g, '')
    .replace(/&#038;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'page';
}

/**
 * Normalize faculty names for robust deduplication.
 */
function normalizeName(name) {
  return (name || '')
    .toLowerCase()
    .replace(/^(dr\.?|mr\.?|mrs\.?|ms\.?|prof\.?|sri\.?|smt\.?)\s+/i, '')
    .replace(/[^a-z]/g, '');
}

/**
 * Detect individual faculty profile pages.
 */
function detectFacultyProfile(page) {
  const content = page.content?.rendered || '';
  const text = content.replace(/\s+/g, ' ');
  const title = (page.title?.rendered || '').trim();

  // Primary criteria: profile structure or appointment phrases
  const isProfile = (
    (/overview/i.test(text) && /qualification/i.test(text) && /subject.*taught/i.test(text)) ||
    (/name of degree/i.test(text) && /year of passing/i.test(text)) ||
    (/working as (assistant|associate|adjunct)?\s*professor/i.test(text)) ||
    (/currently (asst\.?|assistant|associate)?\s*professor/i.test(text))
  );

  if (!isProfile) return null;

  // Department detection from page text & slug
  let dept = 'cse'; // sensible default if unstated
  const combined = `${page.slug} ${text}`.toLowerCase();

  if (/electrical and electronics|eee\b/i.test(combined)) dept = 'eee';
  else if (/electronics and communication|ece\b/i.test(combined)) dept = 'ece';
  else if (/mechanical|mech\b/i.test(combined)) dept = 'me';
  else if (/civil\b|ce\b/i.test(combined)) dept = 'civil';
  else if (/business administration|mba\b/i.test(combined)) dept = 'mba';
  else if (/humanities|sciences|physics|chemistry|mathematics|english|bsh|hs\b/i.test(combined)) dept = 'hs';
  else if (/artificial intelligence|cai\b/i.test(combined)) dept = 'ai';
  else if (/computer science|cse\b/i.test(combined)) dept = 'cse';

  // Designation extraction
  let designation = 'Assistant Professor';
  if (/professor & (dean|principal|vice principal|hod)/i.test(text)) {
    designation = text.match(/professor & (dean|principal|vice principal|hod)/i)[0];
  } else if (/associate professor/i.test(text)) {
    designation = 'Associate Professor';
  } else if (/professor/i.test(text) && !/assistant|associate/i.test(text)) {
    designation = 'Professor';
  } else if (/assistant professor|asst\.?\s*professor/i.test(text)) {
    designation = 'Assistant Professor';
  }

  // Degree / Qualification extraction
  let qualification = '';
  const qualMatch = text.match(/\b(Ph\.?D|M\.?Tech|M\.?Sc|B\.?Tech|B\.?Sc|M\.?Phil|M\.?B\.?A|B\.?Ed)\b/gi);
  if (qualMatch) {
    qualification = Array.from(new Set(qualMatch.map(q => q.toUpperCase()))).join(', ');
  }

  // Photo extraction
  let photoUrl = null;
  const $ = cheerio.load(content);
  $('img').each((_, img) => {
    const origSrc = $(img).attr('data-orig-src');
    const src = $(img).attr('src') || '';
    const candidate = (origSrc && !origSrc.startsWith('data:')) ? origSrc : src;
    if (candidate && !candidate.startsWith('data:') && !candidate.includes('svg') && !candidate.includes('avatar')) {
      photoUrl = normalizeUrl(candidate);
    }
  });

  return {
    name: title.replace(/&#8217;/g, "'").trim(),
    designation,
    qualification,
    department: dept.toUpperCase(),
    deptCode: dept,
    photoUrl,
    pageId: page.id,
    slug: page.slug
  };
}

/**
 * Categorize a sub-page within a department based on title/slug keywords.
 */
function getDepartmentSubSection(title, slug) {
  const combined = `${title} ${slug}`.toLowerCase();

  // Specific faculty sub-sections first
  if (/faculty[-_]?(publication|paper)/.test(combined)) return 'faculty-publications';
  if (/faculty[-_]?award/.test(combined)) return 'faculty-awards';
  if (/faculty[-_]?patent/.test(combined)) return 'faculty-patents';
  if (/faculty[-_]?fdp/.test(combined)) return 'faculty-fdp';
  if (/peo|po|pso|objective|outcome/.test(combined)) return 'peos';

  // Main faculty roster
  const cleanSlug = slug.toLowerCase();
  if (/^(cse_faculty|faculty_ai|ece_faculty|eee_faculty|me_faculty|civil_faculty|faculty|mba-faculty|mba_faculty|hs_faculty)$/.test(cleanSlug) ||
      /^(faculty|faculty list|teaching staff)$/.test(title.trim().toLowerCase())) {
    return 'faculty';
  }

  if (/bos|board-of-studies|board of studies/.test(combined)) return 'board-of-studies';
  if (/lab|laborator|infrastructure/.test(combined)) return 'laboratories';
  if (/event|workshop|seminar|conference/.test(combined)) return 'events';
  if (/student|activit|association|club/.test(combined)) return 'student-activities';
  if (/resource|online-resource|material|notes/.test(combined)) return 'online-resources';
  if (/syllabus|curriculum|regulation/.test(combined)) return 'syllabus';
  if (/home|about|overview/.test(combined)) return 'index';

  return slugify(title);
}

/**
 * Breadth-First Search (BFS) graph-based classifier with secondary institutional rescue.
 */
export async function buildClassificationGraph(pages, homepageWidgets) {
  const pageByUrl = new Map();
  const pageBySlug = new Map();
  const pageById = new Map();

  pages.forEach(p => {
    const cleanUrl = normalizeUrl(p.link).replace(/\/$/, '');
    pageByUrl.set(cleanUrl, p);
    pageBySlug.set(p.slug.toLowerCase(), p);
    pageById.set(p.id, p);
  });

  // Build internal link adjacency graph
  const adjacency = new Map();
  pages.forEach(p => {
    const linksOnPage = new Set();
    const $ = cheerio.load(p.content?.rendered || '');
    $('a[href*="gpcet.ac.in"]').each((_, a) => {
      const href = $(a).attr('href');
      if (href) {
        const cleanHref = normalizeUrl(href).replace(/\/$/, '');
        const targetPage = pageByUrl.get(cleanHref);
        if (targetPage && targetPage.id !== p.id) {
          linksOnPage.add(targetPage.id);
        }
      }
    });
    adjacency.set(p.id, Array.from(linksOnPage));
  });

  // State maps
  const classification = new Map(); // pageId -> { section, subSection, cleanSlug, depth, source, facultyProfile }

  function classify(pageId, section, subSection, cleanSlug, depth, source, extra = {}) {
    if (classification.has(pageId)) {
      const existing = classification.get(pageId);
      if (existing.depth <= depth) return;
    }
    classification.set(pageId, { section, subSection, cleanSlug, depth, source, ...extra });
  }

  // 1. INDIVIDUAL FACULTY PROFILE CLASSIFICATION
  pages.forEach(p => {
    const prof = detectFacultyProfile(p);
    if (prof) {
      const cleanSlug = slugify(prof.name);
      classify(
        p.id,
        `departments/${prof.deptCode}/faculty`,
        cleanSlug,
        cleanSlug,
        1,
        'faculty-profile-detector',
        { facultyProfile: prof }
      );
    }
  });

  // 2. SEED BFS WITH DEPARTMENTS
  for (const dept of CONFIG.DEPARTMENTS) {
    const rootPage = pageBySlug.get(dept.homeSlug.toLowerCase());
    if (!rootPage) continue;

    const queue = [{ pageId: rootPage.id, depth: 0 }];
    const visited = new Set([rootPage.id]);

    classify(rootPage.id, `departments/${dept.code}`, 'index', 'index', 0, 'dept-root');

    while (queue.length > 0) {
      const { pageId, depth } = queue.shift();
      if (depth >= 3) continue;

      const neighborIds = adjacency.get(pageId) || [];
      for (const nId of neighborIds) {
        if (!visited.has(nId)) {
          visited.add(nId);
          const neighborPage = pageById.get(nId);
          // Don't overwrite if already a faculty profile
          if (!classification.get(nId)?.facultyProfile) {
            const subSec = getDepartmentSubSection(neighborPage.title?.rendered || '', neighborPage.slug);
            classify(nId, `departments/${dept.code}`, subSec, subSec, depth + 1, `dept-bfs-${dept.code}`);
            queue.push({ pageId: nId, depth: depth + 1 });
          }
        }
      }
    }
  }

  // 3. SEED BFS WITH HOMEPAGE MEGA-MENU CATEGORIES
  const menuTree = homepageWidgets?.navigationTree || [];
  for (const root of menuTree) {
    const rootTitle = (root.title || '').toLowerCase();
    let targetSection = 'campus-life';

    if (rootTitle.includes('academic')) targetSection = 'academics';
    else if (rootTitle.includes('placement')) targetSection = 'placements';
    else if (rootTitle.includes('research')) targetSection = 'research';
    else if (rootTitle.includes('about')) targetSection = 'administration';
    else if (rootTitle.includes('student')) targetSection = 'campus-life';
    else if (rootTitle.includes('contact')) targetSection = 'contact';

    for (const item of root.subItems || []) {
      const cleanHref = normalizeUrl(item.href).replace(/\/$/, '');
      const page = pageByUrl.get(cleanHref);
      if (page && !classification.has(page.id)) {
        const cleanSlug = slugify(item.title || page.slug);
        classify(page.id, targetSection, cleanSlug, cleanSlug, 1, 'mega-menu');

        const queue = [{ pageId: page.id, depth: 1 }];
        while (queue.length > 0) {
          const { pageId, depth } = queue.shift();
          if (depth >= 2) continue;
          for (const nId of (adjacency.get(pageId) || [])) {
            if (!classification.has(nId)) {
              const nPage = pageById.get(nId);
              const subSlug = slugify(nPage.title?.rendered || nPage.slug);
              classify(nId, targetSection, subSlug, subSlug, depth + 1, 'mega-menu-bfs');
              queue.push({ pageId: nId, depth: depth + 1 });
            }
          }
        }
      }
    }
  }

  // 4. SECONDARY RESCUE CLASSIFIER FOR REMAINING ORPHANS
  pages.forEach(p => {
    if (classification.has(p.id)) return;

    const slug = p.slug.toLowerCase();
    const title = (p.title?.rendered || '').toLowerCase();
    const combined = `${slug} ${title}`;

    // A. NAAC SSR Metric Pages (e.g. 5-3-3, 3.4.3, 2-2-1-ay, etc.)
    if (/^[1-7][-_.]\d+/i.test(slug) || /^[1-7][-_.]\d+/i.test(title) || /criterion|criteria/i.test(combined)) {
      classify(p.id, 'accreditation/naac', slugify(p.title?.rendered || p.slug), slugify(p.title?.rendered || p.slug), 4, 'rescue-naac-ssr');
      return;
    }

    // B. Department Matching (including short codes: cse, ece, eee, me, mech, ce, civil, hs, bsh, ai, cai, mba)
    const deptMatch = slug.match(/(?:^|[_-])(cse|ece|eee|me|mech|ce|civil|hs|bsh|ai|cai|csm|csd|mba)(?:$|[_-])/i);
    if (deptMatch) {
      let code = deptMatch[1].toLowerCase();
      if (code === 'mech') code = 'me';
      if (code === 'ce') code = 'civil';
      if (code === 'cai' || code === 'csm' || code === 'csd') code = 'ai';
      if (code === 'bsh') code = 'hs';

      const subSec = getDepartmentSubSection(p.title?.rendered || '', p.slug);
      classify(p.id, `departments/${code}`, subSec, subSec, 4, 'rescue-dept-slug');
      return;
    }

    // C. Accreditation, IQAC, AICTE, Autonomous, NBA, NIRF
    if (/naac|nba|nirf|iqac|aqar|autonomous|aicte|ariia|aria|idea-lab|audit|declaration/i.test(combined)) {
      classify(p.id, 'accreditation', slugify(p.title?.rendered || p.slug), slugify(p.title?.rendered || p.slug), 4, 'rescue-accreditation');
      return;
    }

    // D. Administration, Governance, Committees, BoS, Council
    if (/committee|grievance|anti-?ragging|icc|governing|academic-council|finance|bos|board-of-studies|rti|ombudsperson|affidavit|statutory|trust|management|principal|dean|director|mandatory-disclosure/i.test(combined)) {
      classify(p.id, 'administration', slugify(p.title?.rendered || p.slug), slugify(p.title?.rendered || p.slug), 4, 'rescue-administration');
      return;
    }

    // E. Campus Life, Facilities, Clubs, Hostel, Sports
    if (/hostel|canteen|sports|library|gym|medical|club|nss|ncc|transport|alumni|mentor/i.test(combined)) {
      classify(p.id, 'campus-life', slugify(p.title?.rendered || p.slug), slugify(p.title?.rendered || p.slug), 4, 'rescue-campus');
      return;
    }

    // F. Examination & Results
    if (/exam|result|timetable|hall-ticket|grade|notification/i.test(combined)) {
      classify(p.id, 'examinations', slugify(p.title?.rendered || p.slug), slugify(p.title?.rendered || p.slug), 4, 'rescue-exam');
      return;
    }

    // G. Placements
    if (/placement|recruit|mou|internship|training/.test(combined)) {
      classify(p.id, 'placements', slugify(p.title?.rendered || p.slug), slugify(p.title?.rendered || p.slug), 4, 'rescue-placement');
      return;
    }

    // H. Admissions
    if (/admission|fee|scholarship|eligibility|intake/.test(combined)) {
      classify(p.id, 'admissions', slugify(p.title?.rendered || p.slug), slugify(p.title?.rendered || p.slug), 4, 'rescue-admission');
      return;
    }

    // I. Research
    if (/research|fund|journal|patent|grant|supervisor|publication/.test(combined)) {
      classify(p.id, 'research', slugify(p.title?.rendered || p.slug), slugify(p.title?.rendered || p.slug), 4, 'rescue-research');
      return;
    }

    // J. True Legacy Orphan
    classify(p.id, 'archive-or-orphan', slugify(p.title?.rendered || p.slug), slugify(p.title?.rendered || p.slug), 5, 'true-orphan');
  });

  return classification;
}

/**
 * Main Stage 2 Runner: Parses content, rewrites internal URLs, aggregates multi-source faculty rosters, and writes Markdown & JSON.
 */
export async function organizeAndParseContent() {
  console.log('\n========================================');
  console.log('Stage 2: Enhanced Content Parsing & Rescue');
  console.log('========================================\n');

  const pagesFile = path.resolve(CONFIG.PATHS.cache, 'pages.json');
  const widgetsFile = path.resolve(CONFIG.PATHS.cache, 'homepage_widgets.json');

  const pages = JSON.parse(await fs.readFile(pagesFile, 'utf8'));
  const homepageWidgets = JSON.parse(await fs.readFile(widgetsFile, 'utf8'));

  console.log(`Loaded ${pages.length} cached pages.`);

  // 1. Run BFS & Secondary Rescue Classification
  console.log('Running BFS link-graph & secondary institutional rescue classification...');
  const classification = await buildClassificationGraph(pages, homepageWidgets);

  // 2. Build URL Rewrite Map
  const urlMap = {};
  const routeCounts = {};
  const classifiedPages = [];

  pages.forEach(p => {
    const info = classification.get(p.id);
    let finalSlug = info.cleanSlug;

    // Handle slug collisions inside same section
    const fullRouteKey = `${info.section}/${finalSlug}`;
    if (routeCounts[fullRouteKey]) {
      routeCounts[fullRouteKey]++;
      finalSlug = `${finalSlug}-${routeCounts[fullRouteKey]}`;
    } else {
      routeCounts[fullRouteKey] = 1;
    }

    const nextjsRoute = info.cleanSlug === 'index' 
      ? `/${info.section}` 
      : `/${info.section}/${finalSlug}`;

    const oldCanonical = normalizeUrl(p.link).replace(/\/$/, '');
    const oldWpUrlHttp = p.link.replace(/\/$/, '');

    urlMap[oldCanonical] = nextjsRoute;
    urlMap[oldWpUrlHttp] = nextjsRoute;
    urlMap[p.slug] = nextjsRoute;
    urlMap[`page-${p.id}`] = nextjsRoute;

    classifiedPages.push({
      page: p,
      info: { ...info, finalSlug, nextjsRoute }
    });
  });

  // Ensure directories exist
  await ensureDir(CONFIG.PATHS.content);
  await ensureDir(CONFIG.PATHS.data);
  await ensureDir(path.resolve(CONFIG.PATHS.data, 'faculty'));

  // Save url-map.json
  const urlMapFile = path.resolve(CONFIG.PATHS.data, 'url-map.json');
  await fs.writeFile(urlMapFile, JSON.stringify(urlMap, null, 2), 'utf8');
  console.log(`Saved URL rewrite map (${Object.keys(urlMap).length} mappings) to ${urlMapFile}`);

  // 3. Multi-source Faculty Roster Store (deptCode -> Map(normalizedName -> facultyObj))
  const facultyRosterByDept = {
    cse: new Map(),
    ai: new Map(),
    ece: new Map(),
    eee: new Map(),
    me: new Map(),
    civil: new Map(),
    hs: new Map(),
    mba: new Map()
  };

  const sectionCounts = {};
  let totalTablesParsed = 0;

  for (const { page, info } of classifiedPages) {
    const sectionDir = path.resolve(CONFIG.PATHS.content, info.section);
    await ensureDir(sectionDir);

    sectionCounts[info.section] = (sectionCounts[info.section] || 0) + 1;

    // Parse HTML and convert to Markdown
    const parsed = cleanHtmlAndConvertToMarkdown(page.content?.rendered || '', {
      title: page.title?.rendered,
      slug: page.slug
    });

    totalTablesParsed += parsed.tables.length;

    // A. Collect from Individual Faculty Profile Page
    if (info.facultyProfile) {
      const prof = info.facultyProfile;
      const deptCode = prof.deptCode;
      const normKey = normalizeName(prof.name);

      if (facultyRosterByDept[deptCode]) {
        const existing = facultyRosterByDept[deptCode].get(normKey);
        if (!existing) {
          facultyRosterByDept[deptCode].set(normKey, {
            name: prof.name,
            designation: prof.designation,
            qualification: prof.qualification,
            department: deptCode.toUpperCase(),
            photoUrl: prof.photoUrl,
            profileRoute: info.nextjsRoute,
            links: []
          });
        } else {
          // Enrich existing
          if (!existing.photoUrl && prof.photoUrl) existing.photoUrl = prof.photoUrl;
          if (!existing.qualification && prof.qualification) existing.qualification = prof.qualification;
          if (!existing.profileRoute) existing.profileRoute = info.nextjsRoute;
        }
      }
    }

    // B. Collect from Department Faculty Summary Tables
    if (info.section.startsWith('departments/') && (info.finalSlug === 'faculty' || page.slug.includes('faculty'))) {
      const deptCode = info.section.split('/')[1];
      if (facultyRosterByDept[deptCode] && parsed.tables.length > 0) {
        parsed.tables.forEach(t => {
          const hasName = t.normalizedHeaders.includes('name');
          const hasDesig = t.normalizedHeaders.includes('designation');
          if (hasName && hasDesig) {
            t.json.forEach(row => {
              const rawName = typeof row.name === 'string' ? row.name : row.name?.text || '';
              const desig = typeof row.designation === 'string' ? row.designation : row.designation?.text || '';
              const qual = typeof row.qualification === 'string' ? row.qualification : row.qualification?.text || '';

              if (rawName && !rawName.toLowerCase().includes('name of the faculty')) {
                const normKey = normalizeName(rawName);
                const existing = facultyRosterByDept[deptCode].get(normKey);
                if (!existing) {
                  facultyRosterByDept[deptCode].set(normKey, {
                    name: rawName.replace(/&#8217;/g, "'").trim(),
                    designation: desig || 'Faculty Member',
                    qualification: qual,
                    department: deptCode.toUpperCase(),
                    photoUrl: row.photoUrl || row.photo?.photoUrl || null,
                    profileRoute: null,
                    links: row.links || []
                  });
                } else {
                  if (!existing.designation || existing.designation === 'Faculty Member') existing.designation = desig;
                  if (!existing.qualification && qual) existing.qualification = qual;
                  if (!existing.photoUrl && row.photoUrl) existing.photoUrl = row.photoUrl;
                }
              }
            });
          }
        });
      }
    }

    // Step 4: Rewrite internal links in Markdown content
    let rewrittenMarkdown = parsed.markdown;

    rewrittenMarkdown = rewrittenMarkdown.replace(
      /https?:\/\/(?:www\.)?gpcet\.ac\.in(\/[^\s\)\"\'\>]*)/gi,
      (match, urlPath) => {
        const cleanOldUrl = `https://www.gpcet.ac.in${urlPath}`.replace(/\/$/, '');
        if (cleanOldUrl.includes('/wp-content/uploads/')) {
          return cleanOldUrl;
        }
        if (urlMap[cleanOldUrl]) {
          return urlMap[cleanOldUrl];
        }
        const slugCandidate = urlPath.split('/').filter(Boolean).pop();
        if (slugCandidate && urlMap[slugCandidate]) {
          return urlMap[slugCandidate];
        }
        return match;
      }
    );

    rewrittenMarkdown = rewrittenMarkdown.replace(
      /http:\/\/www\.gpcet\.ac\.in\/wp-content\/uploads\//g,
      'https://www.gpcet.ac.in/wp-content/uploads/'
    ).replace(
      /http:\/\/gpcet\.ac\.in\/wp-content\/uploads\//g,
      'https://www.gpcet.ac.in/wp-content/uploads/'
    );

    // Format Frontmatter
    const frontmatter = [
      '---',
      `id: ${page.id}`,
      `title: "${(page.title?.rendered || 'Untitled').replace(/"/g, '\\"')}"`,
      `slug: "${info.finalSlug}"`,
      `wp_slug: "${page.slug}"`,
      `section: "${info.section}"`,
      `route: "${info.nextjsRoute}"`,
      `date: "${page.date || ''}"`,
      `modified: "${page.modified || ''}"`,
      `canonical_url: "${normalizeUrl(page.link)}"`,
      `tables_count: ${parsed.tables.length}`,
      `pdfs_count: ${parsed.extractedPdfs.length}`,
      '---',
      '',
      rewrittenMarkdown
    ].join('\n');

    const mdFilePath = path.resolve(sectionDir, `${info.finalSlug}.md`);
    await fs.writeFile(mdFilePath, frontmatter, 'utf8');
  }

  // 4. Save Structured Faculty JSON Rosters
  const facultyCounts = {};
  for (const [deptCode, map] of Object.entries(facultyRosterByDept)) {
    const list = Array.from(map.values()).map((f, idx) => ({ sno: idx + 1, ...f }));
    facultyCounts[deptCode] = list.length;
    const facultyJsonPath = path.resolve(CONFIG.PATHS.data, 'faculty', `${deptCode}.json`);
    await fs.writeFile(facultyJsonPath, JSON.stringify(list, null, 2), 'utf8');
    console.log(`Saved ${list.length} faculty members for [${deptCode.toUpperCase()}] to ${facultyJsonPath}`);
  }

  // 5. Generate Classification Report
  const report = {
    generatedAt: new Date().toISOString(),
    totalPagesIngested: pages.length,
    totalPagesWritten: classifiedPages.length,
    totalTablesExtracted: totalTablesParsed,
    sectionDistribution: sectionCounts,
    orphanCount: sectionCounts['archive-or-orphan'] || 0,
    facultyCounts
  };

  const reportFile = path.resolve(CONFIG.PATHS.data, 'classification-report.json');
  await fs.writeFile(reportFile, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Saved classification report to ${reportFile}`);

  console.log('\n========================================');
  console.log('Stage 2 Complete: Classification & Content Summary');
  console.log('========================================');
  console.log(`Total Pages Processed: ${classifiedPages.length} (100% coverage guaranteed)`);
  console.log(`Total Tables Extracted: ${totalTablesParsed}`);
  console.log(`Remaining True Orphans: ${sectionCounts['archive-or-orphan'] || 0} (down from 478)`);
  console.log('Faculty Rosters:');
  Object.entries(facultyCounts).forEach(([dept, cnt]) => {
    console.log(`  - ${dept.toUpperCase().padEnd(6)} : ${cnt} faculty members`);
  });
  console.log('\nSection Breakdown:');
  Object.entries(sectionCounts).forEach(([sec, cnt]) => {
    console.log(`  - ${sec.padEnd(30)} : ${cnt} page(s)`);
  });
  console.log('\nAll Markdown files written to: ' + CONFIG.PATHS.content);
}
