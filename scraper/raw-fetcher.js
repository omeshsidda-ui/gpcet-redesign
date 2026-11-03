import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';
import { CONFIG } from './config.js';
import { client, sleep } from './client.js';

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetch all pages from a paginated WordPress REST API endpoint with progress logging.
 */
export async function fetchPaginatedEndpoint(endpointUrl, name, options = {}) {
  await ensureDir(CONFIG.PATHS.cache);
  const cacheFile = path.resolve(CONFIG.PATHS.cache, `${name}.json`);

  // Check if cache already exists and force is not set
  if (!options.force && (await fileExists(cacheFile))) {
    try {
      const cached = JSON.parse(await fs.readFile(cacheFile, 'utf8'));
      if (Array.isArray(cached) && cached.length > 0) {
        console.log(`[Cache Hit] Using cached ${name}.json (${cached.length} items). Pass --force to re-fetch.`);
        return cached;
      }
    } catch {
      console.warn(`[Cache Warning] Corrupted cache for ${name}.json. Re-fetching...`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Starting fetch for [${name}] from ${endpointUrl}`);
  console.log(`========================================`);

  const metaUrl = new URL(endpointUrl);
  metaUrl.searchParams.set('per_page', '1');
  metaUrl.searchParams.set('page', '1');

  const metaRes = await client.fetchWithRetry(metaUrl.toString(), { isJson: true });
  const total = parseInt(metaRes.headers.get('x-wp-total') || '0', 10);
  const totalPages = parseInt(metaRes.headers.get('x-wp-totalpages') || '0', 10);

  console.log(`[${name}] Remote reported total items: ${total}, total pages: ${totalPages}`);

  if (total === 0 || totalPages === 0) {
    console.log(`[${name}] No items found. Writing empty cache.`);
    await fs.writeFile(cacheFile, JSON.stringify([], null, 2), 'utf8');
    return [];
  }

  const allItems = [];
  const perPage = CONFIG.NETWORK.PER_PAGE;
  const actualPages = Math.ceil(total / perPage);

  for (let pageNum = 1; pageNum <= actualPages; pageNum++) {
    const pageUrl = new URL(endpointUrl);
    pageUrl.searchParams.set('per_page', String(perPage));
    pageUrl.searchParams.set('page', String(pageNum));

    process.stdout.write(`[${name}] Fetching page ${pageNum}/${actualPages} (items ${(pageNum - 1) * perPage + 1} - ${Math.min(pageNum * perPage, total)} of ${total})... `);

    try {
      const items = await client.getJson(pageUrl.toString());
      allItems.push(...items);
      console.log(`Done (+${items.length} items, total so far: ${allItems.length})`);
    } catch (err) {
      console.error(`\n[${name}] Failed to fetch page ${pageNum}: ${err.message}`);
      throw err;
    }

    if (pageNum < actualPages) {
      await sleep(CONFIG.NETWORK.DELAY_MS);
    }
  }

  // Save to cache
  await fs.writeFile(cacheFile, JSON.stringify(allItems, null, 2), 'utf8');
  console.log(`[${name}] Successfully cached ${allItems.length} items to ${cacheFile}`);
  return allItems;
}

/**
 * Scrape dynamic homepage DOM widgets (marquees, sliders, flash notifications, navigation).
 */
export async function fetchHomepageWidgets(options = {}) {
  await ensureDir(CONFIG.PATHS.cache);
  const rawHtmlFile = path.resolve(CONFIG.PATHS.cache, 'homepage.html');
  const widgetsFile = path.resolve(CONFIG.PATHS.cache, 'homepage_widgets.json');

  let html;
  if (!options.force && (await fileExists(rawHtmlFile))) {
    console.log(`[Cache Hit] Using cached homepage.html`);
    html = await fs.readFile(rawHtmlFile, 'utf8');
  } else {
    console.log(`[Homepage] Fetching live homepage HTML from ${CONFIG.BASE_URL}...`);
    html = await client.getText(CONFIG.BASE_URL);
    await fs.writeFile(rawHtmlFile, html, 'utf8');
    console.log(`[Homepage] Saved raw HTML (${html.length} bytes) to ${rawHtmlFile}`);
  }

  const $ = cheerio.load(html);

  // 1. Scrape Marquees (flashing/scrolling ticker news)
  const marquees = [];
  $('marquee').each((idx, el) => {
    const $el = $(el);
    const text = $el.text().replace(/\s+/g, ' ').trim();
    const links = [];
    $el.find('a').each((_, a) => {
      const href = $(a).attr('href');
      const linkText = $(a).text().trim();
      if (href) links.push({ text: linkText, href });
    });
    marquees.push({
      index: idx + 1,
      direction: $el.attr('direction') || 'left',
      behavior: $el.attr('behavior') || 'scroll',
      scrollAmount: $el.attr('scrollamount') || null,
      rawHtml: $el.html()?.trim(),
      text,
      links
    });
  });

  // 2. Scrape Hero Sliders / Carousels
  const sliders = [];
  $('.fusion-slider-container, .flexslider, .rev_slider, .awb-slider, [class*="slider"]').each((idx, el) => {
    const $slider = $(el);
    const slides = [];
    $slider.find('li, .slide, .fusion-slide').each((sIdx, sEl) => {
      const $slide = $(sEl);
      const img = $slide.find('img').attr('src') || $slide.find('img').attr('data-src');
      const title = $slide.find('h1, h2, h3, h4, .title, .fusion-title').text().trim();
      const caption = $slide.find('p, .caption, .fusion-content').text().trim();
      const ctaLink = $slide.find('a').attr('href');
      const ctaText = $slide.find('a').text().trim();

      if (img || title || caption) {
        slides.push({
          slideIndex: sIdx + 1,
          image: img || null,
          title: title || null,
          caption: caption || null,
          cta: ctaLink ? { text: ctaText, url: ctaLink } : null
        });
      }
    });

    if (slides.length > 0) {
      sliders.push({
        sliderIndex: idx + 1,
        className: $slider.attr('class') || '',
        slides
      });
    }
  });

  // 3. Scrape Flash Circulars & Notification Banners
  const flashCirculars = [];
  $('.fusion-alert, .fusion-notification, .alert, .notice, [class*="circular"], [class*="notification"]').each((_, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    const links = [];
    $(el).find('a').each((_, a) => {
      links.push({
        text: $(a).text().trim(),
        href: $(a).attr('href')
      });
    });
    if (text) {
      flashCirculars.push({ text, links });
    }
  });

  // Also collect any homepage link pointing to PDFs or circulars
  const directPdfAnnouncements = [];
  $('a[href*=".pdf"]').each((_, a) => {
    const text = $(a).text().replace(/\s+/g, ' ').trim();
    const href = $(a).attr('href');
    if (href && text && !directPdfAnnouncements.some(item => item.href === href)) {
      directPdfAnnouncements.push({ text, href });
    }
  });

  // 4. Scrape Navigation Tree from Mega-Menu
  const navigationTree = [];
  $('nav, .fusion-main-menu, .fusion-menu, ul#menu-main-menu, #menu-top-menu').first().find('> li, > ul > li').each((_, topLi) => {
    const $topLi = $(topLi);
    const $topLink = $topLi.find('> a').first();
    const topTitle = $topLink.text().replace(/<[^>]+>/g, '').trim();
    const topHref = $topLink.attr('href');

    if (!topTitle) return;

    const subItems = [];
    $topLi.find('ul.sub-menu > li, .sub-menu li').each((_, subLi) => {
      const $subLi = $(subLi);
      const $subLink = $subLi.find('> a').first();
      const subTitle = $subLink.text().replace(/<[^>]+>/g, '').trim();
      const subHref = $subLink.attr('href');
      if (subTitle && subHref) {
        subItems.push({ title: subTitle, href: subHref });
      }
    });

    navigationTree.push({
      title: topTitle,
      href: topHref || '#',
      subItems
    });
  });

  // 5. College Quick Info / Stats / Affiliation Badges
  const quickInfo = {
    title: $('title').text().trim(),
    metaDescription: $('meta[name="description"]').attr('content') || '',
    autonomousNotice: $('body').text().includes('Autonomous') || html.includes('Autonomous'),
    naacGrade: html.match(/NAAC\s*([A-Za-z+]+)/i)?.[0] || 'NAAC Accredited',
    aicteApproval: html.includes('AICTE')
  };

  const widgetsData = {
    scrapedAt: new Date().toISOString(),
    quickInfo,
    marquees,
    sliders,
    flashCirculars,
    directPdfAnnouncements,
    navigationTree
  };

  await fs.writeFile(widgetsFile, JSON.stringify(widgetsData, null, 2), 'utf8');
  console.log(`[Homepage] Extracted:
  - ${marquees.length} Marquee ticker(s)
  - ${sliders.length} Slider container(s)
  - ${flashCirculars.length} Flash alert(s)
  - ${directPdfAnnouncements.length} Direct PDF announcement(s)
  - ${navigationTree.length} Top-level navigation menu root(s)`);
  console.log(`[Homepage] Saved widgets data to ${widgetsFile}`);

  return widgetsData;
}

/**
 * Verify all endpoints and print counts without full downloading.
 */
export async function verifyEndpoints() {
  console.log('========================================');
  console.log('Verifying GPCET WordPress REST API Endpoints');
  console.log('========================================\n');

  const results = {};
  for (const [key, url] of Object.entries(CONFIG.ENDPOINTS)) {
    if (key === 'homepage') continue;
    try {
      process.stdout.write(`Checking [${key.padEnd(10)}] (${url})... `);
      const meta = await client.getEndpointMeta(url);
      console.log(`OK (Total Items: ${meta.total}, Total Pages: ${meta.totalPages})`);
      results[key] = { status: 'OK', total: meta.total, totalPages: meta.totalPages };
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      results[key] = { status: 'ERROR', error: err.message };
    }
  }

  // Check Homepage HTML
  try {
    process.stdout.write(`Checking [homepage  ] (${CONFIG.BASE_URL})... `);
    const html = await client.getText(CONFIG.BASE_URL);
    console.log(`OK (Received ${html.length} bytes)`);
    results['homepage'] = { status: 'OK', bytes: html.length };
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    results['homepage'] = { status: 'ERROR', error: err.message };
  }

  console.log('\nEndpoint verification complete!');
  return results;
}

/**
 * Main Stage 1 runner: pulls all raw endpoints and saves into /cache.
 */
export async function scrapeAllCache(options = {}) {
  console.log('\n========================================');
  console.log('Stage 1: Ingesting All GPCET Raw Data to /cache');
  console.log('========================================\n');

  const startTime = Date.now();

  // 1. Homepage & Dynamic Widgets
  await fetchHomepageWidgets(options);

  // 2. Pages (All 928 pages)
  const pages = await fetchPaginatedEndpoint(CONFIG.ENDPOINTS.pages, 'pages', options);

  // 3. Media (All 5,259 attachments)
  const media = await fetchPaginatedEndpoint(CONFIG.ENDPOINTS.media, 'media', options);

  // 4. Portfolio items
  const portfolio = await fetchPaginatedEndpoint(CONFIG.ENDPOINTS.portfolio, 'portfolio', options);

  // 5. FAQs
  const faqs = await fetchPaginatedEndpoint(CONFIG.ENDPOINTS.faqs, 'faqs', options);

  // 6. Posts
  const posts = await fetchPaginatedEndpoint(CONFIG.ENDPOINTS.posts, 'posts', options);

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n========================================');
  console.log('Stage 1 Complete: Cache Summary');
  console.log('========================================');
  console.log(`- Pages:       ${pages.length}`);
  console.log(`- Media:       ${media.length}`);
  console.log(`- Portfolio:   ${portfolio.length}`);
  console.log(`- FAQs:        ${faqs.length}`);
  console.log(`- Posts:       ${posts.length}`);
  console.log(`- Time elapsed: ${durationSec} seconds`);
  console.log(`All raw data is safely cached in: ${CONFIG.PATHS.cache}\n`);
}
