import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { FileText, ExternalLink, Hash } from 'lucide-react';

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

export function normalizeMarkdownTables(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }
  return markdown.replace(/\|\s+\|\s*/g, '|\n| ');
}

function slugifyHeading(children) {
  const extractText = (node) => {
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

export function MarkdownRenderer({ content, className = '' }) {
  const preprocessed = normalizeMarkdownTables(content);

  return React.createElement(
    'div',
    { className: `prose-institutional max-w-none text-[var(--ink)] ${className}` },
    React.createElement(
      ReactMarkdown,
      {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypeSanitize, academicSanitizeSchema]],
        components: {
          table: ({ node, ...props }) =>
            React.createElement(
              'div',
              {
                className:
                  'my-6 w-full overflow-x-auto rounded-md border border-[var(--rule)] bg-white shadow-xs focus:outline-none focus:ring-1 focus:ring-slate-400',
                tabIndex: 0,
                role: 'region',
                'aria-label': 'Academic data table',
              },
              React.createElement('table', {
                className: 'w-full text-left text-sm border-collapse divide-y divide-[var(--rule)]',
                ...props,
              })
            ),
          thead: ({ node, ...props }) =>
            React.createElement('thead', {
              className: 'bg-[var(--surface)] text-xs font-semibold uppercase tracking-wider text-[var(--muted)]',
              ...props,
            }),
          th: ({ node, ...props }) =>
            React.createElement('th', {
              scope: 'col',
              className:
                'px-4 py-3 text-left font-semibold text-[var(--muted)] uppercase tracking-wider border-b border-[var(--rule)] first:sticky first:left-0 first:z-10 first:bg-[var(--surface)] first:shadow-[1px_0_0_0_var(--rule)]',
              ...props,
            }),
          td: ({ node, ...props }) =>
            React.createElement('td', {
              className:
                'px-4 py-3 text-sm text-[var(--ink)] tabular-nums border-b border-[var(--rule)] align-top first:sticky first:left-0 first:z-10 first:bg-white first:shadow-[1px_0_0_0_var(--rule)]',
              ...props,
            }),
          tr: ({ node, ...props }) =>
            React.createElement('tr', {
              className: 'hover:bg-[var(--surface)]/70 transition-colors',
              ...props,
            }),
          a: ({ node, href, children, ...props }) => {
            let safeHref = href || '';
            if (safeHref.startsWith('http://www.gpcet.ac.in/')) {
              safeHref = safeHref.replace('http://', 'https://');
            }

            const isPdf = /\.pdf(\?.*)?$/i.test(safeHref);
            const isExternal =
              safeHref.startsWith('http://') ||
              safeHref.startsWith('https://') ||
              isPdf;

            if (isPdf) {
              return React.createElement(
                'a',
                {
                  href: safeHref,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className:
                    'inline-flex items-baseline gap-1 text-red-800 hover:text-red-950 font-medium underline underline-offset-2 decoration-red-300 hover:decoration-red-800 transition-colors',
                  ...props,
                },
                React.createElement(FileText, {
                  className: 'inline-block w-3.5 h-3.5 self-center text-red-700 shrink-0',
                  'aria-hidden': 'true',
                }),
                React.createElement('span', null, children),
                React.createElement(
                  'span',
                  {
                    className:
                      'text-[10px] font-mono uppercase bg-red-50 text-red-800 px-1 py-0.2 rounded border border-red-200 shrink-0',
                  },
                  'PDF'
                )
              );
            }

            if (isExternal) {
              const imageOnly = node?.children.length === 1 && node.children[0].type === 'element'
                && node.children[0].tagName === 'img' && !node.children[0].properties.alt;
              const imageLabel = imageOnly ? `Open photograph: ${safeHref.split('/').pop()?.split('?')[0] || 'campus image'}` : undefined;
              return React.createElement(
                'a',
                {
                  href: safeHref,
                  'aria-label': imageLabel,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className:
                    'inline-flex items-baseline gap-1 text-[var(--ruby)] hover:text-[var(--ruby)] font-medium underline underline-offset-2 decoration-slate-300 hover:decoration-slate-800 transition-colors',
                  ...props,
                },
                React.createElement('span', null, children),
                React.createElement(ExternalLink, {
                  className: 'inline-block w-3 h-3 self-center text-[var(--muted)] shrink-0',
                  'aria-hidden': 'true',
                })
              );
            }

            return React.createElement(
              'a',
              {
                href: safeHref,
                className:
                  'text-[var(--ink)] hover:text-[var(--ruby)] font-medium underline underline-offset-2 decoration-slate-300 hover:decoration-slate-800 transition-colors',
                ...props,
              },
              children
            );
          },
          h2: ({ node, children, ...props }) => {
            const id = slugifyHeading(children);
            return React.createElement(
              'h2',
              {
                id,
                className:
                  'group flex items-center gap-2 font-serif text-3xl font-medium tracking-tight text-[var(--ink)] mt-10 mb-4 scroll-mt-20 border-b border-[var(--rule)] pb-2',
                ...props,
              },
              React.createElement('span', null, children),
              id
                ? React.createElement(
                    'a',
                    {
                      href: `#${id}`,
                      'aria-label': `Link to ${children}`,
                      className:
                        'opacity-0 focus-visible:opacity-100 group-hover:opacity-100 text-[var(--muted)] hover:text-[var(--muted)] transition-opacity',
                    },
                    React.createElement(Hash, { className: 'w-4 h-4' })
                  )
                : null
            );
          },
          h3: ({ node, children, ...props }) => {
            const id = slugifyHeading(children);
            return React.createElement(
              'h3',
              {
                id,
                className:
                  'group flex items-center gap-2 font-serif text-2xl font-medium tracking-tight text-[var(--ink)] mt-8 mb-3 scroll-mt-20',
                ...props,
              },
              React.createElement('span', null, children),
              id
                ? React.createElement(
                    'a',
                    {
                      href: `#${id}`,
                      'aria-label': `Link to ${children}`,
                      className:
                        'opacity-0 focus-visible:opacity-100 group-hover:opacity-100 text-[var(--muted)] hover:text-[var(--muted)] transition-opacity',
                    },
                    React.createElement(Hash, { className: 'w-3.5 h-3.5' })
                  )
                : null
            );
          },
          p: ({ node, ...props }) =>
            React.createElement('p', {
              className: 'text-base leading-relaxed text-[var(--muted)] my-4 max-w-prose',
              ...props,
            }),
          ul: ({ node, ...props }) =>
            React.createElement('ul', {
              className: 'list-disc list-outside pl-6 my-4 space-y-2 text-[var(--muted)]',
              ...props,
            }),
          ol: ({ node, ...props }) =>
            React.createElement('ol', {
              className: 'list-decimal list-outside pl-6 my-4 space-y-2 text-[var(--muted)]',
              ...props,
            }),
          li: ({ node, ...props }) =>
            React.createElement('li', { className: 'leading-relaxed', ...props }),
          blockquote: ({ node, ...props }) =>
            React.createElement('blockquote', {
              className:
                'border-l-2 border-[var(--brand-crimson)] pl-4 py-1 my-5 italic text-[var(--muted)] bg-[var(--surface)]/70 rounded-r-md',
              ...props,
            }),
          code: ({ node, className, children, ...props }) =>
            React.createElement(
              'code',
              {
                className:
                  'font-mono text-xs bg-[var(--surface)] text-[var(--ruby)] px-1.5 py-0.5 rounded border border-[var(--rule)] tabular-nums',
                ...props,
              },
              children
            ),
          hr: ({ node, ...props }) =>
            React.createElement('hr', { className: 'my-8 border-[var(--rule)]', ...props }),
        },
      },
      preprocessed
    )
  );
}

export default MarkdownRenderer;
