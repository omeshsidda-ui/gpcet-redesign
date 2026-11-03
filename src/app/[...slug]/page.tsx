import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllContentRoutes,
  getContentBySlug,
} from '@/lib/content';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import {
  ChevronRight,
  Calendar,
  Table2,
  FileText,
  Compass,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * Next.js 15 App Router generateStaticParams for all 936+ content routes.
 */
export async function generateStaticParams() {
  const routes = getAllContentRoutes();
  return routes.map((r) => ({
    slug: r.slug,
  }));
}

/**
 * Dynamic SEO metadata generation with OpenGraph and canonical links.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getContentBySlug(slug);

  if (!page) {
    return {
      title: 'Document Not Found | GPCET Kurnool',
      description: 'The requested academic document could not be located in the institutional repository.',
    };
  }

  const title = `${page.frontmatter.title} | G. Pullaiah College of Engineering & Technology`;
  const description = `Official institutional portal for ${page.frontmatter.title} at G. Pullaiah College of Engineering & Technology (Autonomous), Kurnool.`;
  const canonical =
    page.frontmatter.canonical_url ||
    `https://www.gpcet.ac.in/${page.slugPath.join('/')}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'G. Pullaiah College of Engineering & Technology (Autonomous)',
      type: 'article',
      publishedTime: page.frontmatter.date,
      modifiedTime: page.frontmatter.modified,
    },
  };
}

/**
 * Institutional Catch-All Page Renderer for scraped markdown pages.
 */
export default async function CatchAllContentPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getContentBySlug(slug);

  if (!page) {
    notFound();
  }

  const { frontmatter, content, toc, breadcrumbs } = page;
  const hasToc = toc.length >= 2;

  // Format date cleanly
  const formattedDate = frontmatter.modified
    ? new Date(frontmatter.modified).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <article className="space-y-8">
      {/* Hierarchical Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <div key={crumb.href} className="inline-flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />}
              {isLast ? (
                <span className="font-semibold text-slate-800" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-slate-900 underline underline-offset-2 decoration-slate-300 hover:decoration-slate-800 transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Institutional Document Header */}
      <header className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200 uppercase tracking-wider font-mono">
            {frontmatter.section}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Autonomous Verified
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          {frontmatter.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
          {formattedDate && (
            <div className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span>Last updated {formattedDate}</span>
            </div>
          )}

          {frontmatter.tables_count > 0 && (
            <div className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
              <Table2 className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span>{frontmatter.tables_count} Academic Table{frontmatter.tables_count > 1 ? 's' : ''}</span>
            </div>
          )}

          {frontmatter.pdfs_count > 0 && (
            <div className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
              <FileText className="w-3.5 h-3.5 text-red-600" aria-hidden="true" />
              <span>{frontmatter.pdfs_count} Verified PDF{frontmatter.pdfs_count > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Layout with Sticky Anchor TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Document Body */}
        <section
          className={
            hasToc
              ? 'lg:col-span-8 xl:col-span-9'
              : 'lg:col-span-12 max-w-4xl'
          }
        >
          <MarkdownRenderer content={content} />
        </section>

        {/* Sticky Table of Contents Navigation */}
        {hasToc && (
          <aside
            aria-label="Table of contents"
            className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24 space-y-4"
          >
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-1.5 pb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-900">
                <Compass className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span>On This Page</span>
              </div>

              <ul className="mt-3 space-y-2 text-xs">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={item.level === 3 ? 'pl-3 text-slate-500 border-l border-slate-100' : ''}
                  >
                    <a
                      href={`#${item.id}`}
                      className="group flex items-center justify-between text-slate-600 hover:text-slate-950 font-medium transition-colors"
                    >
                      <span className="truncate">{item.text}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400 shrink-0 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
