import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

// Configure Turndown with GitHub-Flavored Markdown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*'
});
turndownService.use(gfm);

// Keep preformatted markdown tables without re-mangling
turndownService.addRule('preformattedTable', {
  filter: (node) => node.nodeName === 'DIV' && node.getAttribute('data-markdown-table') === 'true',
  replacement: (content, node) => {
    return '\n\n' + node.textContent.trim() + '\n\n';
  }
});

/**
 * Fuzzy matches table headers to common faculty/personnel schema keys.
 */
function normalizeHeaderKey(rawHeader) {
  const clean = rawHeader.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (/^(sno|slno|serialno|srno|sn)$/.test(clean)) return 'sno';
  if (/^(name|facultyname|nameofthefaculty|staffname|facultymember)$/.test(clean)) return 'name';
  if (/^(designation|cadre|post|position|role)$/.test(clean)) return 'designation';
  if (/^(qualification|highestqualification|degree)$/.test(clean)) return 'qualification';
  if (/^(email|emailid|mail|contactemail)$/.test(clean)) return 'email';
  if (/^(department|dept|branch)$/.test(clean)) return 'department';
  if (/^(experience|totalexperience|exp)$/.test(clean)) return 'experience';
  if (/^(specialization|areaofspecialization|researcharea)$/.test(clean)) return 'specialization';
  if (/^(dateofjoining|doj)$/.test(clean)) return 'dateOfJoining';
  if (/^(photo|image|picture)$/.test(clean)) return 'photo';
  // Fallback to camelCase or cleaned string
  return rawHeader.trim().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()).replace(/[^a-zA-Z0-9]/g, '') || 'column';
}

/**
 * Normalizes and upgrades URL protocols, stripping stray smart-quote artifacts.
 */
export function normalizeUrl(url) {
  if (!url) return '';
  let clean = url
    .trim()
    // Strip leading/trailing straight or curly quotes and percent-encoded smart quotes
    .replace(/^(?:["'“”‘’″]|%E2%80%9[CD89])+/gi, '')
    .replace(/(?:["'“”‘’″]|%E2%80%9[CD89])+$/gi, '')
    .trim();
  if (clean.startsWith('http://www.gpcet.ac.in')) {
    clean = clean.replace('http://www.gpcet.ac.in', 'https://www.gpcet.ac.in');
  } else if (clean.startsWith('http://gpcet.ac.in')) {
    clean = clean.replace('http://gpcet.ac.in', 'https://www.gpcet.ac.in');
  }
  return clean;
}

/**
 * Resolves the real non-data image URL from an <img> element,
 * prioritizing lazy-load attributes over data:image/* placeholders.
 */
export function resolveRealImgSrc($img) {
  if (!$img || $img.length === 0) return null;
  const candidates = [
    $img.attr('data-orig-src'),
    $img.attr('data-lazy-src'),
    $img.attr('data-src'),
    $img.attr('src')
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const trimmed = candidate.trim();
    if (!trimmed || /^data:/i.test(trimmed)) continue;
    return normalizeUrl(trimmed);
  }
  return null;
}

const IMAGE_EXT_RE = /\.(?:jpe?g|png|webp|gif|avif)(?:\?.*)?$/i;

/**
 * Parse an HTML table into both a clean Markdown table and structured JSON rows.
 * Preserves <a> links, <img> photos, and handles messy college table quirks.
 */
export function parseTable($table, $) {
  const rows = $table.find('tr');
  if (rows.length === 0) return { markdown: '', json: [], headers: [] };

  // Detect header row (first tr or thead tr)
  let headerRow = rows.first();
  let dataRows = rows.slice(1);

  // If the first row is empty or has only 1 cell spanning all columns (e.g. table title banner), check row 2
  if (headerRow.find('th, td').length <= 1 && rows.length > 2) {
    headerRow = rows.eq(1);
    dataRows = rows.slice(2);
  }

  const rawHeaders = [];
  const normalizedHeaders = [];

  headerRow.find('th, td').each((colIdx, cell) => {
    const rawText = $(cell).text().replace(/\s+/g, ' ').trim();
    const finalRaw = rawText || `Column_${colIdx + 1}`;
    rawHeaders.push(finalRaw);
    normalizedHeaders.push(normalizeHeaderKey(finalRaw));
  });

  const jsonRows = [];
  const mdRows = [];

  dataRows.each((_, tr) => {
    const $tr = $(tr);
    const cells = $tr.find('th, td');
    if (cells.length === 0) return;

    const rowObj = {};
    const mdCellTexts = [];

    cells.each((colIdx, td) => {
      const $td = $(td);
      const rawText = $td.text().replace(/\s+/g, ' ').trim();

      // 1. Extract links (PDFs, PPTs, external websites, profiles)
      const links = [];
      $td.find('a').each((_, a) => {
        const href = $(a).attr('href');
        const text = $(a).text().replace(/\s+/g, ' ').trim();
        if (href) {
          links.push({
            text: text || 'Link',
            url: normalizeUrl(href)
          });
        }
      });

      // 2. Extract photos/images (prioritizing lazy-load attrs over data: placeholder)
      const photoUrl = resolveRealImgSrc($td.find('img').first());

      // Populate structured JSON row
      const key = normalizedHeaders[colIdx] || `col_${colIdx + 1}`;
      rowObj[key] = {
        text: rawText,
        links,
        photoUrl: photoUrl || undefined
      };
      // Simplify if only plain text
      if (links.length === 0 && !photoUrl) {
        rowObj[key] = rawText;
      }

      // 3. Format cell for GitHub-Flavored Markdown table
      let mdCell = rawText;
      if (links.length > 0) {
        // If the cell text is mostly covered by the links, format as markdown links
        if (links.length === 1 && (rawText === links[0].text || rawText.toLowerCase().includes('pdf') || rawText.toLowerCase().includes('click'))) {
          mdCell = `[${links[0].text || 'Document'}](${links[0].url})`;
        } else {
          // Multiple links inside cell
          mdCell = links.map(l => `[${l.text}](${l.url})`).join(', ');
        }
      }
      if (photoUrl && !links.length) {
        mdCell = `![](${photoUrl})`;
      }

      // Flatten newlines and escape pipe characters so MD table structure never breaks
      mdCell = mdCell
        .replace(/\|/g, '\\|')
        .replace(/[\r\n]+/g, '<br />')
        .replace(/\s+/g, ' ')
        .trim();

      mdCellTexts.push(mdCell || '-');
    });

    // Only add row if it has some non-empty content
    if (mdCellTexts.some(c => c !== '-')) {
      // Pad cells if row has fewer cells than headers
      while (mdCellTexts.length < rawHeaders.length) {
        mdCellTexts.push('-');
      }
      mdRows.push(mdCellTexts);
      jsonRows.push(rowObj);
    }
  });

  if (rawHeaders.length === 0 || mdRows.length === 0) {
    return { markdown: '', json: [], headers: rawHeaders };
  }

  // Construct valid Markdown table
  const headerLine = `| ${rawHeaders.map(h => h.replace(/\|/g, '\\|')).join(' | ')} |`;
  const separatorLine = `| ${rawHeaders.map(() => '---').join(' | ')} |`;
  const dataLines = mdRows.map(row => `| ${row.join(' | ')} |`).join('\n');
  const markdownTable = `${headerLine}\n${separatorLine}\n${dataLines}`;

  return {
    markdown: markdownTable,
    json: jsonRows,
    headers: rawHeaders,
    normalizedHeaders
  };
}

function escapeHtmlAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Extracts an attribute value from a WordPress shortcode attribute string,
 * handling straight quotes, curly/smart quotes, and HTML-encoded quotes.
 */
function extractShortcodeAttr(attrText, attrName) {
  if (!attrText) return '';
  const normalized = attrText
    .replace(/&(?:ldquo|rdquo|quot|#8220|#8221|#34);/gi, '"')
    .replace(/&(?:lsquo|rsquo|#8216|#8217|#39);/gi, "'")
    .replace(/[“”″]/g, '"')
    .replace(/[‘’]/g, "'");
  const escapedName = attrName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const re = new RegExp(`(?:^|\\s)${escapedName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s\\]]+))`, 'i');
  const match = normalized.match(re);
  if (!match) return '';
  return (match[1] ?? match[2] ?? match[3] ?? '').trim();
}

/**
 * Strips or unwraps unexpanded WordPress / Avada / Magee shortcodes
 * ([fusion_*], [vc_*], [awb_*], [ms_*], [psfb], [table], [woocommerce_*]).
 */
export function stripShortcodes(text) {
  if (!text) return '';
  return text
    // 1. Unwrap [ms_panel ...]...[/ms_panel], preserving optional title as a heading
    .replace(/\\?\[ms(?:\\?_|\s|_)panel\b([^\]]*)\\?\]/gi, (_, attrs) => {
      const title = extractShortcodeAttr(attrs, 'title');
      return title ? `\n\n<h3>${escapeHtmlText(title)}</h3>\n\n` : '\n\n';
    })
    .replace(/\\?\[\/ms(?:\\?_|\s|_)panel\\?\]/gi, '\n\n')
    // 2. Unwrap [ms_custom_box ...]...[/ms_custom_box], preserving inner text (e.g., HOD contacts)
    .replace(/\\?\[ms(?:\\?_|\s|_)custom(?:\\?_|\s|_)box\b[^\]]*\\?\]/gi, '\n\n')
    .replace(/\\?\[\/ms(?:\\?_|\s|_)custom(?:\\?_|\s|_)box\\?\]/gi, '\n\n')
    // 3. Handle [ms_image_frame ...]: drop dead v1.1/data URIs, preserve valid images
    .replace(/\\?\[ms(?:\\?_|\s|_)image(?:\\?_|\s|_)frame\b([^\]]*)\\?\]/gi, (_, attrs) => {
      const src = normalizeUrl(extractShortcodeAttr(attrs, 'src'));
      if (!src || /^data:/i.test(src) || /\/v1\.1\/wp-content\/uploads\//i.test(src)) {
        return '';
      }
      const alt = extractShortcodeAttr(attrs, 'alt');
      const link = normalizeUrl(extractShortcodeAttr(attrs, 'link'));
      const imgTag = `<img src="${escapeHtmlAttr(src)}" alt="${escapeHtmlAttr(alt)}" />`;
      return link ? `<a href="${escapeHtmlAttr(link)}">${imgTag}</a>` : imgTag;
    })
    .replace(/\\?\[\/ms(?:\\?_|\s|_)image(?:\\?_|\s|_)frame\\?\]/gi, '')
    // 4. Strip [ms_widget_area ...]...[/ms_widget_area]
    .replace(/\\?\[ms(?:\\?_|\s|_)widget(?:\\?_|\s|_)area\b[^\]]*\\?\][\s\S]*?\\?\[\/ms(?:\\?_|\s|_)widget(?:\\?_|\s|_)area\\?\]/gi, '')
    .replace(/\\?\[\/?ms(?:\\?_|\s|_)widget(?:\\?_|\s|_)area\b[^\]]*\\?\]/gi, '')
    // 5. Unwrap any remaining [ms_*] shortcodes
    .replace(/\\?\[\/?ms(?:\\?_)[a-zA-Z0-9_\\-]+[^\]]*\\?\]/gi, '')
    // 6. Strip [psfb ...] (form builder), [table ...] (TablePress), and [woocommerce_*]
    .replace(/\\?\[\/?psfb\b[^\]]*\\?\]/gi, '')
    .replace(/\\?\[\/?table\b[^\]]*\\?\]/gi, '')
    .replace(/\\?\[\/?woocommerce(?:\\?_)[a-zA-Z0-9_\\-]+[^\]]*\\?\]/gi, '')
    // 7. Strip Avada / Visual Composer / AWB shortcodes
    .replace(/\\?\[\/?fusion_[a-zA-Z0-9_-]+[^\]]*\\?\]/gi, '')
    .replace(/\\?\[\/?vc_[a-zA-Z0-9_-]+[^\]]*\\?\]/gi, '')
    .replace(/\\?\[\/?awb_[a-zA-Z0-9_-]+[^\]]*\\?\]/gi, '');
}

/**
 * Main cleaning and conversion function:
 * Converts raw WordPress / Avada HTML into clean Markdown while extracting structured tables.
 */
export function cleanHtmlAndConvertToMarkdown(rawHtml, pageMeta = {}) {
  if (!rawHtml || typeof rawHtml !== 'string') {
    return { markdown: '', tables: [], extractedPdfs: [], extractedImages: [] };
  }

  // Step 1: Strip unexpanded shortcodes
  let html = stripShortcodes(rawHtml);

  // Step 2: Load into Cheerio for DOM cleansing
  const $ = cheerio.load(html, { decodeEntities: true });

  // Collect all direct PDF and media links before stripping
  const extractedPdfs = [];
  $('a[href*=".pdf"]').each((_, a) => {
    const href = $(a).attr('href');
    const text = $(a).text().replace(/\s+/g, ' ').trim();
    if (href) {
      extractedPdfs.push({ text: text || 'PDF Document', url: normalizeUrl(href) });
    }
  });

  const extractedImages = [];
  $('img').each((_, img) => {
    const src = resolveRealImgSrc($(img));
    const alt = $(img).attr('alt') || '';
    if (src && !src.includes('fusion') && !src.includes('avatar')) {
      extractedImages.push({ alt, url: src });
    }
  });

  // Remove scripts, styles, iframes, and unwanted Avada layout noise
  $('script, style, noscript, meta, link, iframe').remove();
  $('.fusion-slider-container, .fusion-breadcrumbs, .fusion-footer, #slidingbar-area').remove();
  $('.fusion-separator, .fusion-clearfix, .fusion-builder-placeholder').remove();

  // Step 3: Parse and transform all <table> elements
  const tables = [];
  $('table').each((tblIdx, tbl) => {
    const $tbl = $(tbl);
    const parsed = parseTable($tbl, $);
    if (parsed.markdown) {
      tables.push({
        index: tblIdx + 1,
        headers: parsed.headers,
        normalizedHeaders: parsed.normalizedHeaders,
        json: parsed.json,
        markdown: parsed.markdown
      });

      // Replace <table> in DOM with a preformatted container that Turndown will preserve
      $tbl.replaceWith(`<div data-markdown-table="true">\n\n${parsed.markdown}\n\n</div>`);
    } else {
      $tbl.remove();
    }
  });

  // Step 4: Clean up attributes and strip noise tags
  $('*').each((_, el) => {
    const $el = $(el);
    // Strip inline styles and Avada class clutter
    $el.removeAttr('style');
    $el.removeAttr('data-awb-border-radius-top-left');
    $el.removeAttr('data-token');

    // Retain only href on a, src on img (dropping data:image/* lazy-load placeholders)
    if (el.tagName === 'a') {
      const href = $el.attr('href');
      if (href) $el.attr('href', normalizeUrl(href));
      $el.removeAttr('class').removeAttr('target').removeAttr('rel');
    } else if (el.tagName === 'img') {
      const realSrc = resolveRealImgSrc($el);
      if (!realSrc) {
        // If wrapped in an <a href="...image.jpg"> with no other text, record alt for parent promotion
        const $parent = $el.parent('a');
        if ($parent.length > 0 && !$parent.attr('data-had-img-alt')) {
          $parent.attr('data-had-img-alt', $el.attr('alt') || '');
        }
        $el.remove();
        return;
      }
      $el.attr('src', realSrc);
      $el
        .removeAttr('class')
        .removeAttr('srcset')
        .removeAttr('sizes')
        .removeAttr('loading')
        .removeAttr('data-orig-src')
        .removeAttr('data-lazy-src')
        .removeAttr('data-src');
    } else if (el.tagName !== 'div' || !$el.attr('data-markdown-table')) {
      $el.removeAttr('class');
    }
  });

  // Promote image-only links whose placeholder <img> was dropped when href is a real image,
  // and remove empty <a> tags so no [](...) or [](#) leaks into Markdown.
  $('a').each((_, a) => {
    const $a = $(a);
    const hasImg = $a.find('img').length > 0;
    const text = $a.text().trim();
    if (!hasImg && !text) {
      const href = normalizeUrl($a.attr('href') || '');
      const savedAlt = $a.attr('data-had-img-alt') || '';
      if (href && !/^data:/i.test(href) && IMAGE_EXT_RE.test(href)) {
        $a.replaceWith(`<img src="${escapeHtmlAttr(href)}" alt="${escapeHtmlAttr(savedAlt)}" />`);
      } else {
        $a.remove();
      }
    } else {
      $a.removeAttr('data-had-img-alt');
    }
  });

  // Remove empty spans, divs, and paragraphs that contain no text and no images
  $('span, div:not([data-markdown-table]), p, li').each((_, el) => {
    const $el = $(el);
    if ($el.children().length === 0 && !$el.text().trim() && !$el.find('img').length) {
      $el.remove();
    }
  });

  // Step 5: Convert cleaned HTML to Markdown using Turndown
  const cleanedHtml = $('body').html() || '';
  let markdown = turndownService.turndown(cleanedHtml);

  // Clean excessive empty newlines
  markdown = markdown
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    markdown,
    tables,
    extractedPdfs,
    extractedImages
  };
}
