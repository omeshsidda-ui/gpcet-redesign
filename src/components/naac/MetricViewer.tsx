import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, FileText, Table2, Calendar } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import type { NaacMetricItem } from '@/lib/naac-data';

interface MetricViewerProps {
  metric: NaacMetricItem;
  content: string;
  siblingMetrics: NaacMetricItem[];
}

export default function MetricViewer({
  metric,
  content,
  siblingMetrics,
}: MetricViewerProps) {
  return (
    <div className="space-y-8">
      {/* Breadcrumb & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/accreditation/naac"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to NAAC Criteria 1–7 Explorer</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-2.5 py-1 rounded-sm bg-[#B8860B]/10 border border-[#B8860B]/30 text-[var(--distinction-ink)]">
          <Award className="w-3.5 h-3.5" aria-hidden="true" />
          Criterion {metric.criterionNumber} · NAAC &apos;A+&apos; SSR
        </span>
      </div>

      {/* Metric Header */}
      <header className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
        <div className="font-mono text-xs text-[var(--ruby)] font-semibold">
          NAAC SELF STUDY REPORT · CRITERION {metric.criterionNumber}
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[var(--ink)] mt-2">
          {metric.title}
        </h1>

        <div className="mt-4 pt-4 border-t border-[var(--rule)] flex flex-wrap items-center gap-6 font-mono text-xs text-[var(--muted)] tabular-nums">
          {metric.pdfsCount > 0 && (
            <span className="inline-flex items-center gap-1.5 text-[var(--brand-crimson)] font-semibold">
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              {metric.pdfsCount} Supporting PDF{metric.pdfsCount > 1 ? 's' : ''}
            </span>
          )}
          {metric.tablesCount > 0 && (
            <span className="inline-flex items-center gap-1.5 text-[var(--ruby)] font-semibold">
              <Table2 className="w-3.5 h-3.5" aria-hidden="true" />
              {metric.tablesCount} Verified Data Table{metric.tablesCount > 1 ? 's' : ''}
            </span>
          )}
          {metric.modified && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              Updated {metric.modified.slice(0, 10)}
            </span>
          )}
        </div>
      </header>

      {/* Main Content + Criterion Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-8 bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
          <MarkdownRenderer content={content} />
        </section>

        <aside
          aria-label={`Criterion ${metric.criterionNumber} metrics`}
          className="lg:col-span-4 bg-[var(--surface)] border border-[var(--rule)] rounded-md p-5 sticky top-24"
        >
          <div className="font-mono text-xs font-semibold text-[var(--ruby)] pb-3 border-b border-[var(--rule)]">
            CRITERION {metric.criterionNumber} METRICS ({siblingMetrics.length})
          </div>
          <ul className="divide-y divide-[var(--rule)] mt-1 max-h-[60vh] overflow-y-auto">
            {siblingMetrics.map((item) => {
              const isCurrent = item.slug === metric.slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/accreditation/naac/${item.slug}`}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`block py-2.5 text-xs transition-colors ${
                      isCurrent
                        ? 'font-bold text-[var(--brand-crimson)]'
                        : 'text-[var(--ink)] hover:text-[var(--ruby)]'
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
