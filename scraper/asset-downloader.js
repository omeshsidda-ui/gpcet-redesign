import fs from 'fs/promises';
import path from 'path';
import { CONFIG } from './config.js';
import { client } from './client.js';
import { normalizeUrl } from './html-parser.js';

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

/**
 * Infer category from filename and title.
 */
function categorizeMedia(filename, title, mimeType) {
  const text = `${filename} ${title}`.toLowerCase();

  if (/syllabus|curriculum|regulation|r-?18|r-?19|r-?20/.test(text)) return 'syllabus';
  if (/calendar|academic-calendar/.test(text)) return 'academic_calendar';
  if (/timetable|time-table|mid-exam|exam-schedule/.test(text)) return 'exam_timetable';
  if (/circular|notice|notification|order|gazette/.test(text)) return 'circular';
  if (/affidavit|antiragging|undertaking|grievance|form|application/.test(text)) return 'form_affidavit';
  if (/logo|badge|crest|insignia|emblem/.test(text)) return 'logo_badge';
  if (/naac|nba|nirf|aicte|jntua|autonomous/.test(text)) return 'accreditation_doc';
  if (/faculty|staff|prof|dr-|dean|principal/.test(text) && mimeType.startsWith('image/')) return 'faculty_photo';
  if (/campus|block|lab|auditorium|ground|library|hostel|seminar/.test(text) && mimeType.startsWith('image/')) return 'campus_photo';
  if (mimeType.includes('presentation') || text.endsWith('.ppt') || text.endsWith('.pptx')) return 'lecture_presentation';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType === 'application/pdf') return 'general_pdf';
  if (mimeType.startsWith('image/')) return 'general_image';

  return 'other';
}

/**
 * Generate comprehensive media-manifest.json indexing both the WP media library
 * AND hardcoded /wp-content/uploads/ links discovered inside page bodies.
 */
export async function generateMediaManifest() {
  console.log('\n========================================');
  console.log('Stage 3: Generating Comprehensive Media Manifest');
  console.log('========================================\n');

  const mediaFile = path.resolve(CONFIG.PATHS.cache, 'media.json');
  const pagesFile = path.resolve(CONFIG.PATHS.cache, 'pages.json');

  const mediaList = JSON.parse(await fs.readFile(mediaFile, 'utf8'));
  const pages = JSON.parse(await fs.readFile(pagesFile, 'utf8'));

  const manifestMap = new Map();

  // 1. Ingest all official WP media library items
  mediaList.forEach(m => {
    const rawUrl = m.source_url || m.guid?.rendered || '';
    if (!rawUrl) return;

    const sourceUrl = rawUrl.replace(/^http:\/\//i, 'https://');
    const filename = path.basename(new URL(sourceUrl).pathname);
    const mimeType = m.mime_type || 'application/octet-stream';
    const title = m.title?.rendered || filename;
    const category = categorizeMedia(filename, title, mimeType);

    manifestMap.set(sourceUrl, {
      id: m.id,
      title,
      filename,
      sourceUrl,
      mimeType,
      fileSize: m.media_details?.filesize || null,
      width: m.media_details?.width || null,
      height: m.media_details?.height || null,
      date: m.date || null,
      category,
      source: 'wp-media-library'
    });
  });

  // 2. Scan all 928 pages for FTP/hardcoded upload URLs outside WP media library
  let hardcodedFound = 0;
  pages.forEach(p => {
    const content = p.content?.rendered || '';
    const uploadMatches = content.match(/https?:\/\/(?:www\.)?gpcet\.ac\.in\/wp-content\/uploads\/[^\s\)\"\'\>]+/gi) || [];
    uploadMatches.forEach(url => {
      const cleanUrl = url.replace(/^http:\/\//i, 'https://').split('?')[0].split('#')[0];
      if (!manifestMap.has(cleanUrl)) {
        hardcodedFound++;
        const filename = path.basename(cleanUrl);
        const ext = path.extname(filename).toLowerCase();
        let inferredMime = 'application/octet-stream';
        if (ext === '.pdf') inferredMime = 'application/pdf';
        else if (ext === '.jpg' || ext === '.jpeg') inferredMime = 'image/jpeg';
        else if (ext === '.png') inferredMime = 'image/png';
        else if (ext === '.ppt' || ext === '.pptx') inferredMime = 'application/vnd.ms-powerpoint';
        else if (ext === '.doc' || ext === '.docx') inferredMime = 'application/msword';

        const category = categorizeMedia(filename, filename, inferredMime);
        manifestMap.set(cleanUrl, {
          id: `scanned-${hardcodedFound}`,
          title: filename,
          filename,
          sourceUrl: cleanUrl,
          mimeType: inferredMime,
          category,
          source: 'page-content-scan'
        });
      }
    });
  });

  console.log(`Discovered ${hardcodedFound} additional hardcoded media links from page bodies.`);
  const allMedia = Array.from(manifestMap.values());

  // Category counts
  const categoryCounts = {};
  allMedia.forEach(m => {
    categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
  });

  const manifestData = {
    generatedAt: new Date().toISOString(),
    totalMediaCount: allMedia.length,
    wpLibraryCount: mediaList.length,
    pageScanCount: hardcodedFound,
    categories: categoryCounts,
    items: allMedia
  };

  await ensureDir(CONFIG.PATHS.data);
  const manifestPath = path.resolve(CONFIG.PATHS.data, 'media-manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifestData, null, 2), 'utf8');

  console.log(`Successfully wrote media manifest (${allMedia.length} total items) to ${manifestPath}`);
  console.log('Category breakdown:');
  Object.entries(categoryCounts).forEach(([cat, cnt]) => {
    console.log(`  - ${cat.padEnd(25)} : ${cnt}`);
  });

  return manifestData;
}

/**
 * Download core brand assets, institutional logos, badges, and campus hero photos.
 */
export async function downloadCoreBrandAssets() {
  console.log('\n========================================');
  console.log('Stage 3: Downloading Core Brand & Campus Assets');
  console.log('========================================\n');

  const brandDir = path.resolve(CONFIG.PATHS.assets, 'brand');
  const campusDir = path.resolve(CONFIG.PATHS.assets, 'campus');
  const leadershipDir = path.resolve(CONFIG.PATHS.assets, 'leadership');

  await ensureDir(brandDir);
  await ensureDir(campusDir);
  await ensureDir(leadershipDir);

  // Load manifest
  const manifestPath = path.resolve(CONFIG.PATHS.data, 'media-manifest.json');
  let manifest;
  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  } catch {
    manifest = await generateMediaManifest();
  }

  // Filter candidates for core brand assets
  const downloadedAssets = {
    brand: [],
    campus: [],
    leadership: []
  };

  // 1. Brand candidates (Logos, NAAC, NBA, Autonomous)
  const brandKeywords = ['logo', 'naac', 'nba', 'crest', 'autonomous', 'aicte', 'jntua', 'header'];
  const campusKeywords = ['campus', 'building', 'ground', 'auditorium', 'library', 'gate', 'front'];
  const leadershipKeywords = ['principal', 'dean', 'chairman', 'director', 'srilakshmi'];

  const brandItems = manifest.items.filter(m => 
    m.mimeType.startsWith('image/') && 
    !m.sourceUrl.includes('2014/11') &&
    brandKeywords.some(kw => m.filename.toLowerCase().includes(kw) || m.title.toLowerCase().includes(kw))
  ).slice(0, 15);

  const campusItems = manifest.items.filter(m => 
    m.mimeType.startsWith('image/') && 
    !m.sourceUrl.includes('2014/11') &&
    campusKeywords.some(kw => m.filename.toLowerCase().includes(kw) || m.title.toLowerCase().includes(kw))
  ).slice(0, 15);

  const leadershipItems = manifest.items.filter(m => 
    m.mimeType.startsWith('image/') && 
    !m.sourceUrl.includes('2014/11') &&
    leadershipKeywords.some(kw => m.filename.toLowerCase().includes(kw) || m.title.toLowerCase().includes(kw))
  ).slice(0, 10);

  async function downloadBatch(items, destDir, groupName) {
    for (const item of items) {
      const destFile = path.resolve(destDir, item.filename);
      try {
        process.stdout.write(`Downloading [${groupName}] ${item.filename}... `);
        const res = await client.fetchWithRetry(item.sourceUrl, { isJson: false });
        const arrayBuffer = await res.arrayBuffer();
        await fs.writeFile(destFile, Buffer.from(arrayBuffer));
        console.log(`OK (${(arrayBuffer.byteLength / 1024).toFixed(1)} KB)`);
        downloadedAssets[groupName].push({
          filename: item.filename,
          localPath: `/assets/${groupName}/${item.filename}`,
          sourceUrl: item.sourceUrl,
          sizeBytes: arrayBuffer.byteLength
        });
      } catch (err) {
        console.log(`FAILED (${err.message})`);
      }
    }
  }

  console.log(`Downloading up to ${brandItems.length} brand assets...`);
  await downloadBatch(brandItems, brandDir, 'brand');

  console.log(`\nDownloading up to ${campusItems.length} campus assets...`);
  await downloadBatch(campusItems, campusDir, 'campus');

  console.log(`\nDownloading up to ${leadershipItems.length} leadership assets...`);
  await downloadBatch(leadershipItems, leadershipDir, 'leadership');

  // Save index of downloaded assets
  const indexFile = path.resolve(CONFIG.PATHS.data, 'downloaded-assets.json');
  await fs.writeFile(indexFile, JSON.stringify(downloadedAssets, null, 2), 'utf8');
  console.log(`\nDownloaded assets indexed at: ${indexFile}`);

  return downloadedAssets;
}
