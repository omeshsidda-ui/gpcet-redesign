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

/**
 * Preprocesses markdown to repair Avada scraped single-line table rows (`| |` -> `|\n|`)
 * and normalize empty cell gaps.
 */
export function normalizeMarkdownTables(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }
  // Convert compressed pipe-table row separators into standard markdown newlines
  let cleaned = markdown.replace(/\|\s+\|\s*/g, '|\n| ');
  return cleaned;
}

/**
 * Helper to slugify heading text into a valid HTML id anchor.
 */
function slugifyHeading(children: React.ReactNode): string {
  const extractText = (node: any): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node.props?.children) return extractText(node.props.children);
    return '';
  };

  const text = extractText(children);
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
              className="my-6 w-full overflow-x-auto rounded-md border border-[var(--rule)] bg-white shadow-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
              tabIndex={0}
              role="region"
              aria-label="Academic data table"
            >
              <table
                className="w-full text-left text-sm border-collapse divide-y divide-[var(--rule)]"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead
              className="bg-[var(--surface)] text-xs font-semibold uppercase tracking-wider text-[var(--muted)]"
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              scope="col"
              className="px-4 py-3 text-left font-semibold text-[var(--muted)] uppercase tracking-wider border-b border-[var(--rule)] first:sticky first:left-0 first:z-10 first:bg-[var(--surface)] first:shadow-[1px_0_0_0_var(--rule)]"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-3 text-sm text-[var(--ink)] tabular-nums border-b border-[var(--rule)] align-top first:sticky first:left-0 first:z-10 first:bg-white first:shadow-[1px_0_0_0_var(--rule)]"
              {...props}
            />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-[var(--surface)]/70 transition-colors" {...props} />
          ),
          a: ({ node, href, children, ...props }) => {
            let safeHref = href || '';
            // Protocol upgrade per GPCET Business Logic
            if (safeHref.startsWith('http://www.gpcet.ac.in/')) {
              safeHref = safeHref.replace('http://', 'https://');
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
                  className="inline-flex items-baseline gap-1 text-red-800 hover:text-red-950 font-medium underline underline-offset-2 decoration-red-300 hover:decoration-red-800 transition-colors"
                  {...props}
                >
                  <FileText className="inline-block w-3.5 h-3.5 self-center text-red-700 shrink-0" aria-hidden="true" />
                  <span>{children}</span>
                  <span className="text-[10px] font-mono uppercase bg-red-50 text-red-800 px-1 py-0.2 rounded border border-red-200 shrink-0">
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
                  className="inline-flex items-baseline gap-1 text-[var(--ruby)] hover:text-[var(--ruby)] font-medium underline underline-offset-2 decoration-slate-300 hover:decoration-slate-800 transition-colors"
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
                className="text-[var(--ink)] hover:text-[var(--ruby)] font-medium underline underline-offset-2 decoration-slate-300 hover:decoration-slate-800 transition-colors"
                {...props}
              >
                {children}
              </a>
            );
          },
          h2: ({ node, children, ...props }) => {
            const id = slugifyHeading(children);
            return (
              <h2
                id={id}
                className="group flex items-center gap-2 font-serif text-3xl font-medium tracking-tight text-[var(--ink)] mt-10 mb-4 scroll-mt-20 border-b border-[var(--rule)] pb-2"
                {...props}
              >
                <span>{children}</span>
                {id && (
                  <a
                    href={`#${id}`}
                    aria-label={`Link to ${children}`}
                    className="opacity-0 focus-visible:opacity-100 group-hover:opacity-100 text-[var(--muted)] hover:text-[var(--muted)] transition-opacity"
                  >
                    <Hash className="w-4 h-4" />
                  </a>
                )}
              </h2>
            );
          },
          h3: ({ node, children, ...props }) => {
            const id = slugifyHeading(children);
            return (
              <h3
                id={id}
                className="group flex items-center gap-2 font-serif text-2xl font-medium tracking-tight text-[var(--ink)] mt-8 mb-3 scroll-mt-20"
                {...props}
              >
                <span>{children}</span>
                {id && (
                  <a
                    href={`#${id}`}
                    aria-label={`Link to ${children}`}
                    className="opacity-0 focus-visible:opacity-100 group-hover:opacity-100 text-[var(--muted)] hover:text-[var(--muted)] transition-opacity"
                  >
                    <Hash className="w-3.5 h-3.5" />
                  </a>
                )}
              </h3>
            );
          },
          p: ({ node, ...props }) => (
            <p className="text-base leading-relaxed text-[var(--muted)] my-4 max-w-prose" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-outside pl-6 my-4 space-y-2 text-[var(--muted)]" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-outside pl-6 my-4 space-y-2 text-[var(--muted)]" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-2 border-[var(--brand-crimson)] pl-4 py-1 my-5 italic text-[var(--muted)] bg-[var(--surface)]/70 rounded-r-md"
              {...props}
            />
          ),
          code: ({ node, className, children, ...props }) => (
            <code
              className="font-mono text-xs bg-[var(--surface)] text-[var(--ruby)] px-1.5 py-0.5 rounded border border-[var(--rule)] tabular-nums"
              {...props}
            >
              {children}
            </code>
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-[var(--rule)]" {...props} />
          ),
        }}
      >
        {preprocessed}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
