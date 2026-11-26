'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Search, Table2, X } from 'lucide-react';
import type { NaacCriterionGroup } from '@/lib/naac-data';

interface CriteriaMatrixGridProps {
  groups: NaacCriterionGroup[];
  totalMetrics: number;
}

export default function CriteriaMatrixGrid({ groups, totalMetrics }: CriteriaMatrixGridProps) {
  const [selectedCriterion, setSelectedCriterion] = useState<number | 'all'>('all');
  const [query, setQuery] = useState('');

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups
      .filter((g) => selectedCriterion === 'all' || g.number === selectedCriterion)
      .map((g) => ({
        ...g,
        metrics: q
          ? g.metrics.filter(
              (m) =>
                m.title.toLowerCase().includes(q) ||
                m.slug.toLowerCase().includes(q) ||
                `criterion ${g.number}`.includes(q)
            )
          : g.metrics,
      }))
      .filter((g) => (q ? g.metrics.length > 0 : true));
  }, [groups, selectedCriterion, query]);

  return (
    <div className="space-y-6">
      {/* Filter & Search Bar */}
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search
              className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter NAAC metrics by code (e.g., 3.4.3, 5.3.3, enrollment, alumni)..."
              aria-label="Filter NAAC SSR metrics"
              className="w-full pl-9 pr-9 py-2.5 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ruby)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear NAAC metric search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[var(--muted)] hover:text-[var(--ink)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="font-mono text-xs text-[var(--muted)] tabular-nums">
            <strong className="text-[var(--ink)]">{totalMetrics}</strong> Archived Metric Dossiers
          </div>
        </div>

        {/* Criterion Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--rule)]" role="group" aria-label="NAAC Criteria 1 to 7">
          <button
            type="button"
            onClick={() => setSelectedCriterion('all')}
            aria-pressed={selectedCriterion === 'all'}
            className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
              selectedCriterion === 'all'
                ? 'bg-[var(--ruby)] text-white border-[var(--ruby)]'
                : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--rule)] hover:border-[var(--ruby)]/50'
            }`}
          >
            All Criteria (1–7)
          </button>
          {groups.map((g) => {
            const active = selectedCriterion === g.number;
            return (
              <button
                key={g.number}
                type="button"
                onClick={() => setSelectedCriterion(g.number)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                  active
                    ? 'bg-[var(--ruby)] text-white border-[var(--ruby)]'
                    : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--rule)] hover:border-[var(--ruby)]/50'
                }`}
              >
                <span className="font-mono tabular-nums">C{g.number}</span>
                <span className={`font-mono text-[11px] tabular-nums ${active ? 'text-slate-200' : 'text-[var(--muted)]'}`}>
                  ({g.metrics.length})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Criteria 1-7 Matrix */}
      <div className="space-y-6">
        {filteredGroups.length === 0 ? (
          <div className="p-10 text-center bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md text-sm text-[var(--muted)]">
            No NAAC SSR metrics match your search.
          </div>
        ) : (
          filteredGroups.map((group) => (
            <section
              key={group.number}
              aria-labelledby={`criterion-${group.number}-heading`}
              className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md overflow-hidden"
            >
              <div className="px-5 py-4 bg-[var(--surface)] border-b border-[var(--rule)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-mono text-xs font-semibold text-[var(--distinction-ink)] tabular-nums">
                    CRITERION {group.number}
                  </div>
                  <h2
                    id={`criterion-${group.number}-heading`}
                    className="font-serif text-xl sm:text-2xl font-medium text-[var(--ink)] mt-0.5"
                  >
                    {group.title}
                  </h2>
                  <p className="text-xs text-[var(--muted)] mt-1">{group.focus}</p>
                </div>

                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-sm bg-[var(--surface-raised)] border border-[var(--rule)] text-[var(--ruby)] tabular-nums self-start sm:self-center shrink-0">
                  {group.metrics.length} Metrics
                </span>
              </div>

              <div className="divide-y divide-[var(--rule)]">
                {group.metrics.map((metric) => (
                  <Link
                    key={metric.slug}
                    href={`/accreditation/naac/${metric.slug}`}
                    className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[var(--surface)]/60 transition-colors group"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--brand-crimson)] transition-colors">
                        {metric.title}
                      </div>
                      <div className="font-mono text-[11px] text-[var(--muted)] mt-0.5">
                        /accreditation/naac/{metric.slug}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 font-mono text-xs text-[var(--muted)] tabular-nums">
                      {metric.pdfsCount > 0 && (
                        <span className="inline-flex items-center gap-1 text-[var(--brand-crimson)]">
                          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                          {metric.pdfsCount} PDF{metric.pdfsCount > 1 ? 's' : ''}
                        </span>
                      )}
                      {metric.tablesCount > 0 && (
                        <span className="inline-flex items-center gap-1 text-[var(--ruby)]">
                          <Table2 className="w-3.5 h-3.5" aria-hidden="true" />
                          {metric.tablesCount} Table{metric.tablesCount > 1 ? 's' : ''}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 font-sans font-semibold text-[var(--ruby)] group-hover:text-[var(--brand-crimson)]">
                        Inspect
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
