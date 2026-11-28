import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllContentRoutes,
  getContentBySlug,
} from '@/lib/content';
import { decodeHtmlEntities, sanitizeScrapedMarkdown } from '@/lib/institutional-content';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import {
  ChevronRight,
  Calendar,
  Table2,
  FileText,
  Compass,
  ArrowUpRight,
  ArrowRight,
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

function getSectionRecoveryLinks(section: string): Array<{ label: string; href: string }> {
  const normalized = section.toLowerCase();
  const links: Array<{ label: string; href: string }> = [];

  if (normalized.startsWith('departments/')) {
    const dept = normalized.split('/')[1];
    if (dept) {
      links.push({ label: `${dept.toUpperCase()} Department Portal`, href: `/departments/${dept}` });
    }
  } else if (normalized.startsWith('accreditation')) {
    links.push({ label: 'Accreditation & NAAC / NBA', href: '/accreditation' });
  } else if (normalized.startsWith('academics')) {
    links.push({ label: 'Academic Calendar', href: '/academics/academic-calendar' });
  } else if (normalized.startsWith('administration')) {
    links.push({ label: 'Administration & Governance', href: '/administration' });
  } else if (normalized.startsWith('examinations')) {
    links.push({ label: 'Examination Timetables', href: '/documents?category=exam_timetable' });
  } else if (normalized.startsWith('research')) {
    links.push({ label: 'Research & Innovation', href: '/research' });
  }

  links.push({ label: 'Institutional Document Vault', href: '/documents' });
  links.push({ label: 'Department Directory', href: '/departments' });
  return links;
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
  const cleanedContent = sanitizeScrapedMarkdown(content);
  const hasBody = cleanedContent.length > 0;
  const hasToc = hasBody && toc.length >= 2;
  const displayTitle = decodeHtmlEntities(frontmatter.title);
  const recoveryLinks = hasBody ? [] : getSectionRecoveryLinks(frontmatter.section);

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
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-[var(--muted)]">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <div key={crumb.href} className="inline-flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" aria-hidden="true" />}
              {isLast ? (
                <span className="font-semibold text-[var(--ruby)]" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-[var(--ink)] underline underline-offset-4 decoration-[var(--rule)] hover:decoration-[var(--ink)] transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Institutional Document Header */}
      <header className="section-masthead border-b border-[var(--rule)] pb-7">
        <div className="flex flex-wrap items-center gap-3 mb-3.5">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm font-sans text-[11px] font-semibold tracking-[0.06em] uppercase bg-[var(--surface)] text-[var(--ruby)] border border-[var(--rule)]">
            {frontmatter.section}
          </span>
          <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-[var(--muted)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--distinction-ink)]" aria-hidden="true" />
            <span>Autonomous Verified</span>
          </span>
        </div>

        <h1 className="font-serif font-normal tracking-tight text-[var(--ink)] mb-4">
          {displayTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[var(--muted)] tabular-nums">
          {formattedDate && (
            <div className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--muted)]" aria-hidden="true" />
              <span>Last updated {formattedDate}</span>
            </div>
          )}

          {frontmatter.tables_count > 0 && (
            <div className="inline-flex items-center gap-1.5 text-[var(--muted)] font-medium">
              <Table2 className="w-3.5 h-3.5 text-[var(--muted)]" aria-hidden="true" />
              <span>{frontmatter.tables_count} Academic Table{frontmatter.tables_count > 1 ? 's' : ''}</span>
            </div>
          )}

          {frontmatter.pdfs_count > 0 && (
            <div className="inline-flex items-center gap-1.5 text-[var(--muted)] font-medium">
              <FileText className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
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
          {hasBody ? (
            <MarkdownRenderer content={cleanedContent} />
          ) : (
            <div className="rounded-md border border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8 space-y-4">
              <h2 className="font-serif text-xl font-medium text-[var(--ink)]">
                Archived Section Reference
              </h2>
              <p className="text-[15px] leading-[1.68] text-[var(--muted)] max-w-[64ch]">
                This legacy WordPress route contains no standalone body text in the current
                institutional archive. Active circulars, syllabi, and departmental disclosures are
                available through the primary portals below.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {recoveryLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[var(--rule)] bg-[var(--surface-raised)] px-3.5 py-2 text-xs font-semibold text-[var(--ruby)] hover:border-[var(--ruby)]/50 hover:text-[var(--burgundy)] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Sticky Table of Contents Navigation */}
        {hasToc && (
          <aside
            aria-label="Table of contents"
            className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24 space-y-4"
          >
            <div className="rounded-sm border border-[var(--rule)] border-t-2 border-t-[var(--ruby)] bg-[var(--surface-raised)] p-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--rule)] text-[13px] font-semibold text-[var(--ink)]">
                <Compass className="w-4 h-4 text-[var(--ruby)]" aria-hidden="true" />
                <span>On This Page</span>
              </div>

              <ul className="mt-3.5 space-y-2.5 text-[13px] leading-snug">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={item.level === 3 ? 'pl-3 text-[var(--muted)] border-l border-[var(--rule)]' : ''}
                  >
                    <a
                      href={`#${item.id}`}
                      className="group flex items-center justify-between gap-2 text-[var(--muted)] hover:text-[var(--ruby)] font-medium transition-colors"
                    >
                      <span className="truncate">{item.text}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 focus-visible:opacity-100 group-hover:opacity-100 text-[var(--ruby)] shrink-0 transition-opacity" />
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
