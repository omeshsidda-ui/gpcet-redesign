import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { FileText, ExternalLink, Hash } from 'lucide-react';

/**
 * Strict institutional sanitization schema prohibiting XSS while
 * allowing structured academic data tables, media, and navigation anchors.
 */
export const academicSanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'table',
    'thead',
    'tbody',
    'tfoot',
    'tr',
    'th',
    'td',
    'caption',
    'colgroup',
    'col',
    'abbr',
    'details',
    'summary',
    'mark',
    'sub',
    'sup',
    'kbd',
    'section',
  ],
  attributes: {
    ...defaultSchema.attributes,
    '*': ['className', 'class', 'id', 'role', 'ariaLabel', 'ariaHidden', 'title', 'tabIndex'],
    a: ['href', 'title', 'target', 'rel', 'download'],
    th: ['align', 'valign', 'colSpan', 'rowSpan', 'scope'],
    td: ['align', 'valign', 'colSpan', 'rowSpan'],
    table: ['summary', 'border'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: ['http', 'https', 'mailto', 'tel'],
    src: ['http', 'https', 'data'],
  },
};

const LEGACY_CAMPUS_HOSTS = new Set([
  '103.24.127.196',
  '103.24.127.194',
  '103.206.112.59',
]);

/**
 * Detects dead private-IP or legacy campus intranet URLs that fail over HTTPS
 * or outside the college LAN so they render as unavailable archive notices.
 */
function isDeadIntranetUrl(href: string): boolean {
  if (!href) return false;
  let host = '';
  try {
    const parsed = new URL(href);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    host = parsed.hostname.toLowerCase();
  } catch {
    const match = href.match(/^https?:\/\/([^/:?#\s]+)/i);
    if (!match) return false;
    host = match[1].toLowerCase();
  }

  if (LEGACY_CAMPUS_HOSTS.has(host)) return true;
  if (/^(10\.|192\.168\.|127\.|169\.254\.)/.test(host)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return true;
  return false;
}

/**
 * Preprocesses markdown to repair Avada scraped single-line table rows (`| |` -> `|\n|`)
 * while preserving empty table cells (`|  |` or multi-line tables).
 */
export function normalizeMarkdownTables(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }
  // Convert compressed pipe-table row separators into standard markdown newlines
  return markdown
    .split('\n')
    .map((line) => {
      if (/\|[ \t]+\|[ \t]*:?-{3,}/.test(line)) {
        return line.replace(/\| \|[ \t]*(?!$)/g, '|\n| ');
      }
      return line;
    })
    .join('\n');
}

function extractHeadingText(node: unknown): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractHeadingText).join('');
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const props = (node as { props?: { children?: unknown } }).props;
    if (props?.children) return extractHeadingText(props.children);
  }
  return '';
}

/**
 * Helper to slugify heading text into a valid HTML id anchor.
 */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Production Markdown & Table AST rendering pipeline.
 * Guarantees zero XSS vulnerabilities, wraps all academic tables in an accessible
 * horizontal-scroll container with a sticky first column, and auto-links PDF assets.
 */
export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const preprocessed = normalizeMarkdownTables(content);

  return (
    <div className={`prose-institutional max-w-none text-[var(--ink)] ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, academicSanitizeSchema]]}
        components={{
          table: ({ node, ...props }) => (
            <div
              className="my-7 w-full overflow-x-auto rounded-md border border-[var(--rule)] bg-[var(--surface-raised)] focus-visible:outline-2 focus-visible:outline-[var(--ruby)]"
              tabIndex={0}
              role="region"
              aria-label="Academic data table"
            >
              <table
                className="w-full text-left text-[14.5px] leading-[1.55] border-collapse border-0"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead
              className="bg-[var(--surface)] text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)]"
              {...props}
            />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-[var(--rule)] [&_tr:last-child_td]:border-b-0" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              scope="col"
              className="px-4 py-3 text-left font-semibold text-[var(--muted)] border-b border-[var(--rule)] first:sticky first:left-0 first:z-10 first:bg-[var(--surface)] first:shadow-[1px_0_0_0_var(--rule)]"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-3.5 text-[14.5px] leading-[1.55] text-[var(--ink)] tabular-nums border-b border-[var(--rule)] align-top first:sticky first:left-0 first:z-10 first:bg-[var(--surface-raised)] first:shadow-[1px_0_0_0_var(--rule)]"
              {...props}
            />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-[var(--surface)]/65 transition-colors" {...props} />
          ),
          a: ({ node, href, children, ...props }) => {
            let safeHref = href || '';
            // Protocol upgrade per GPCET Business Logic
            if (safeHref.startsWith('http://www.gpcet.ac.in/')) {
              safeHref = safeHref.replace('http://', 'https://');
            } else if (safeHref.startsWith('http://gpcet.ac.in/')) {
              safeHref = safeHref.replace('http://', 'https://');
            }

            if (isDeadIntranetUrl(safeHref)) {
              return (
                <span
                  className="inline-flex flex-wrap items-baseline gap-1 text-[var(--muted)]"
                  title="Legacy campus intranet resource unavailable outside campus LAN"
                >
                  <span>{children}</span>
                  <span className="text-[11px] font-sans font-normal text-[var(--muted)]/85">
                    (Campus Intranet Archive)
                  </span>
                </span>
              );
            }

            const isPdf = /\.pdf(\?.*)?$/i.test(safeHref);
            const isExternal =
              safeHref.startsWith('http://') ||
              safeHref.startsWith('https://') ||
              isPdf;

            if (isPdf) {
              return (
                <a
                  href={safeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-1.5 text-[var(--ruby)] hover:text-[var(--burgundy)] font-medium underline underline-offset-[3px] decoration-[var(--ruby)]/35 hover:decoration-[var(--ruby)] transition-colors"
                  {...props}
                >
                  <FileText className="inline-block w-3.5 h-3.5 self-center text-[var(--brand-crimson)] shrink-0" aria-hidden="true" />
                  <span>{children}</span>
                  <span className="text-[10px] font-sans font-semibold tracking-[0.06em] uppercase bg-[var(--surface)] text-[var(--ruby)] px-1.5 py-px rounded-sm border border-[var(--rule)] shrink-0">
                    PDF
                  </span>
                </a>
              );
            }

            if (isExternal) {
              const imageOnly = node?.children.length === 1 && node.children[0].type === 'element'
                && node.children[0].tagName === 'img' && !node.children[0].properties.alt;
              const imageLabel = imageOnly ? `Open photograph: ${safeHref.split('/').pop()?.split('?')[0] || 'campus image'}` : undefined;
              return (
                <a
                  href={safeHref}
                  aria-label={imageLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-1 text-[var(--ruby)] hover:text-[var(--burgundy)] font-medium underline underline-offset-[3px] decoration-[var(--ruby)]/35 hover:decoration-[var(--ruby)] transition-colors"
                  {...props}
                >
                  <span>{children}</span>
                  <ExternalLink className="inline-block w-3 h-3 self-center text-[var(--muted)] shrink-0" aria-hidden="true" />
                </a>
              );
            }

            return (
              <a
                href={safeHref}
                className="text-[var(--ruby)] hover:text-[var(--burgundy)] font-medium underline underline-offset-[3px] decoration-[var(--ruby)]/35 hover:decoration-[var(--ruby)] transition-colors"
                {...props}
              >
                {children}
              </a>
            );
          },
          h2: ({ node, children, ...props }) => {
            const headingText = extractHeadingText(children);
            const id = slugifyHeading(headingText);
            return (
              <h2
                id={id}
                className="group flex items-center gap-2.5 font-serif text-[1.75rem] sm:text-[2rem] leading-[1.18] font-medium tracking-[-0.02em] text-[var(--ink)] mt-11 mb-4 first:mt-0 scroll-mt-24 border-b border-[var(--rule)] pb-2.5 text-balance"
                {...props}
              >
                <span>{children}</span>
                {id && (
                  <a
                    href={`#${id}`}
                    aria-label={`Link to ${headingText}`}
                    className="no-underline opacity-0 focus-visible:opacity-100 group-hover:opacity-100 text-[var(--muted)] hover:text-[var(--ruby)] transition-opacity"
                  >
                    <Hash className="w-4 h-4" />
                  </a>
                )}
              </h2>
            );
          },
          h3: ({ node, children, ...props }) => {
            const headingText = extractHeadingText(children);
            const id = slugifyHeading(headingText);
            return (
              <h3
                id={id}
                className="group flex items-center gap-2 font-serif text-[1.375rem] sm:text-[1.5rem] leading-[1.24] font-medium tracking-[-0.015em] text-[var(--ink)] mt-8 mb-3 first:mt-0 scroll-mt-24 text-balance"
                {...props}
              >
                <span>{children}</span>
                {id && (
                  <a
                    href={`#${id}`}
                    aria-label={`Link to ${headingText}`}
                    className="no-underline opacity-0 focus-visible:opacity-100 group-hover:opacity-100 text-[var(--muted)] hover:text-[var(--ruby)] transition-opacity"
                  >
                    <Hash className="w-3.5 h-3.5" />
                  </a>
                )}
              </h3>
            );
          },
          p: ({ node, ...props }) => (
            <p className="text-[16px] leading-[1.72] text-[var(--ink)] my-4 max-w-[68ch] text-pretty" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-outside pl-6 my-4 space-y-2 text-[16px] leading-[1.72] text-[var(--ink)] max-w-[68ch] marker:text-[var(--ruby)]/75 [&_ul]:my-2 [&_ol]:my-2"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-outside pl-6 my-4 space-y-2 text-[16px] leading-[1.72] text-[var(--ink)] max-w-[68ch] marker:text-[var(--ruby)] marker:font-medium [&_ul]:my-2 [&_ol]:my-2"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-[1.72] pl-1 text-pretty" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-2 border-[var(--ruby)] pl-5 pr-4 py-3 my-6 font-serif italic text-[17px] leading-[1.68] text-[var(--ink)] bg-[var(--surface)] rounded-r-sm max-w-[64ch]"
              {...props}
            />
          ),
          pre: ({ node, ...props }) => (
            <pre
              className="my-6 overflow-x-auto rounded-md border border-[var(--rule)] bg-[var(--surface)] p-4 font-mono text-[13px] leading-relaxed text-[var(--ink)] [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
              {...props}
            />
          ),
          code: ({ node, className, children, ...props }) => (
            <code
              className="font-mono text-[0.84em] bg-[var(--surface)] text-[var(--ruby)] px-1.5 py-0.5 rounded-sm border border-[var(--rule)] tabular-nums"
              {...props}
            >
              {children}
            </code>
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-9 border-0 border-t border-[var(--rule)]" {...props} />
          ),
        }}
      >
        {preprocessed}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
