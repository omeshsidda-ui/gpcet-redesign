import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCleanedContent } from '@/lib/institutional-content';
import { getAllNaacMetrics } from '@/lib/naac-data';
import MetricViewer from '@/components/naac/MetricViewer';

interface NaacMetricPageProps {
  params: Promise<{ criteria: string }>;
}

export async function generateStaticParams() {
  const metrics = getAllNaacMetrics();
  return metrics.map((m) => ({ criteria: m.slug }));
}

export async function generateMetadata({ params }: NaacMetricPageProps): Promise<Metadata> {
  const { criteria } = await params;
  const metrics = getAllNaacMetrics();
  const matched = metrics.find((m) => m.slug.toLowerCase() === criteria.toLowerCase());
  if (!matched) return { title: 'NAAC SSR Metric' };
  return {
    title: `${matched.title} — NAAC Criterion ${matched.criterionNumber}`,
    description: `NAAC Cycle 2 SSR documentation and supporting evidence for ${matched.title} at G. Pullaiah College of Engineering & Technology.`,
  };
}

export default async function NaacMetricDetailPage({ params }: NaacMetricPageProps) {
  const { criteria } = await params;
  const allMetrics = getAllNaacMetrics();
  const metric = allMetrics.find((m) => m.slug.toLowerCase() === criteria.toLowerCase());
  const cleaned = getCleanedContent(['accreditation', 'naac', criteria]);

  if (!metric && !cleaned) {
    notFound();
  }

  const resolvedMetric = metric || {
    slug: criteria,
    title: cleaned?.title || criteria,
    criterionNumber: 1,
    pdfsCount: 0,
    tablesCount: 0,
    modified: cleaned?.modified,
  };

  const siblings = allMetrics.filter(
    (m) => m.criterionNumber === resolvedMetric.criterionNumber
  );

  return (
    <div className="bg-[var(--bg)] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <MetricViewer
          metric={resolvedMetric}
          content={cleaned?.content || `Supporting NAAC documentation for ${resolvedMetric.title}.`}
          siblingMetrics={siblings}
        />
      </div>
    </div>
  );
}
