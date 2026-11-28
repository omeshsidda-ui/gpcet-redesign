/**
 * Pure, client-safe Markdown artifact sanitizer shared by server-side content
 * loaders (`sanitizeScrapedMarkdown`) and `MarkdownRenderer` (defense-in-depth).
 *
 * Strips executable HTML vectors, SVG/GIF lazy-load placeholders, escaped and
 * unescaped WordPress/Magee/Avada/TablePress/WooCommerce/PSFB shortcodes, and
 * smart-quote URL tails while preserving inner academic/contact content.
 */

const SMART_QUOTE_CHARS = '["“”″\'‘’]';

function cleanShortcodeAttrValue(value: string): string {
  return value
    .replace(/\\_/g, '_')
    .replace(/\\/g, '')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function extractAttr(attrs: string, name: string): string {
  const attrRegex = new RegExp(
    `\\b${name}\\s*=\\s*(?:${SMART_QUOTE_CHARS}([^"“”″'‘’]*)${SMART_QUOTE_CHARS}|([^\\s\\]\\\\]+))`,
    'i'
  );
  const match = attrs.match(attrRegex);
  return cleanShortcodeAttrValue(match ? (match[1] ?? match[2] ?? '') : '');
}

function unwrapMsPanel(attrs: string, inner: string): string {
  const rawTitle = extractAttr(attrs, 'title');
  const body = inner.trim();
  if (!body) return '';

  const hasHeading = /^#{1,6}\s+/.test(body);
  const startsWithTitle =
    rawTitle.length > 0 && body.toLowerCase().startsWith(rawTitle.toLowerCase());

  if (rawTitle && !hasHeading && !startsWithTitle) {
    return `\n\n## ${rawTitle}\n\n${body}\n\n`;
  }
  return `\n\n${body}\n\n`;
}

function resolveMsImageFrame(attrs: string): string {
  const rawSrc = extractAttr(attrs, 'src')
    .replace(/^["'“”‘’″′]+|["'“”‘’″′]+$/g, '')
    .replace(/(?:%E2%80%9D|%E2%80%9C|%E2%80%99|%E2%80%98|%E2%80%B3|%E2%80%B2)+$/gi, '');

  if (
    !rawSrc ||
    /^data:/i.test(rawSrc) ||
    /\/v1\.1\/wp-content\/uploads\//i.test(rawSrc) ||
    !/^https?:\/\//i.test(rawSrc)
  ) {
    return '';
  }

  const normalizedSrc = rawSrc.replace(/^http:\/\/(?:www\.)?gpcet\.ac\.in\//i, 'https://www.gpcet.ac.in/');
  const alt = extractAttr(attrs, 'alt') || extractAttr(attrs, 'title');
  return `\n\n![${alt}](${normalizedSrc})\n\n`;
}

export function sanitizeMarkdownArtifacts(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';

  return (
    raw
      // Neutralize executable <script> and <iframe> blocks before Markdown AST rendering
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<\/?script\b[^>]*>/gi, '')
      .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
      .replace(/<\/?iframe\b[^>]*>/gi, '')
      // Neutralize javascript: URI schemes in Markdown links
      .replace(/\]\(\s*javascript:[^)]*\)/gi, '](#)')
      // Strip data:image/svg+xml and data:image/* lazy-load placeholders (linked, standalone, or raw HTML <img>)
      .replace(
        /\[[ \t\r\n]*!\[[^\[\]]*\]\(\s*data:image\/(?:[^()]|\([^()]*\))*\)[ \t\r\n]*\]\([^)]*\)/gi,
        ''
      )
      .replace(/!\[[^\[\]]*\]\(\s*data:image\/(?:[^()]|\([^()]*\))*\)/gi, '')
      .replace(
        /<img\b[^>]*\bsrc\s*=\s*["']\s*data:image\/(?:svg\+xml|gif)[^"']*["'][^>]*\/?>/gi,
        ''
      )
      // Unwrap paired Magee [ms_panel ...]...[/ms_panel] (escaped and unescaped), promoting title to H2 if missing
      .replace(
        /\\?\[ms(?:\\?_|\s)panel\b([^\]]*?)\\?\]([\s\S]*?)\\?\[\/ms(?:\\?_|\s)panel\\?\]/gi,
        (_match, attrs: string, inner: string) => unwrapMsPanel(attrs, inner)
      )
      // Handle unpaired opening/closing [ms_panel ...] if truncated
      .replace(/\\?\[ms(?:\\?_|\s)panel\b([^\]]*?)\\?\]/gi, (_match, attrs: string) => {
        const rawTitle = extractAttr(attrs, 'title');
        return rawTitle ? `\n\n## ${rawTitle}\n\n` : '\n\n';
      })
      .replace(/\\?\[\/ms(?:\\?_|\s)panel\\?\]/gi, '\n\n')
      // Strip whole [ms_widget_area ...]...[/ms_widget_area] blocks including widget fallback content
      .replace(
        /[ \t]*\\?\[ms(?:\\?_|\s)widget(?:\\?_|\s)area\b[^\]]*\\?\][\s\S]*?\\?\[\/ms(?:\\?_|\s)widget(?:\\?_|\s)area\\?\][ \t]*/gi,
        ''
      )
      // Handle [ms_image_frame ...]: drop empty/data/dead v1.1 URLs, promote valid image URLs
      .replace(
        /[ \t]*\\?\[ms(?:\\?_|\s)image(?:\\?_|\s)frame\b([^\]]*?)\\?\][ \t]*/gi,
        (_match, attrs: string) => resolveMsImageFrame(attrs)
      )
      .replace(/\\?\[\/ms(?:\\?_|\s)image(?:\\?_|\s)frame\\?\]/gi, '')
      // Unwrap [ms_custom_box ...]...[/ms_custom_box] (escaped, space-separated, or underscore-separated)
      .replace(
        /[ \t]*\\?\[\/?ms(?:\\?_|\s)custom(?:\\?_|\s)box\b[^\]]*\\?\](?!\()[ \t]*/gi,
        (_match, offset: number, full: string) => {
          const lineStart = full.lastIndexOf('\n', offset) + 1;
          const beforeOnLine = full.slice(lineStart, offset);
          return beforeOnLine.includes('|') ? '' : '\n\n';
        }
      )
      // Unwrap/strip remaining [ms_*], [fusion_*], [vc_*], [awb_*], and [woocommerce_*] shortcodes
      .replace(
        /[ \t]*\\?\[\/?(?:ms|fusion|vc|awb|woocommerce)(?:\\?_[a-z0-9-]+)+[^\]]*\\?\](?!\()[ \t]*/gi,
        (_match, offset: number, full: string) => {
          const lineStart = full.lastIndexOf('\n', offset) + 1;
          const beforeOnLine = full.slice(lineStart, offset);
          return beforeOnLine.includes('|') ? '' : '\n\n';
        }
      )
      // Strip [psfb ...] (escaped & unescaped) form shortcodes
      .replace(/[ \t]*\\?\[\/?psfb(?:\s+[^\]]*|\/)?\\?\](?!\()[ \t]*/gi, '')
      // Strip TablePress [table id=28 /] and [/table] shortcodes without touching prose [table] or [table ...](url)
      .replace(/[ \t]*\\?\[(?:\/table|table(?:\s+[^\]]*|\/))\\?\](?!\()[ \t]*/gi, '')
      // Strip trailing smart quotes attached to URLs (e.g. https://.../slider3.png”)
      .replace(/(https?:\/\/[^\s<>()\[\]"'“”‘’″′\\]+)[“”‘’″′]+/g, '$1')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}
