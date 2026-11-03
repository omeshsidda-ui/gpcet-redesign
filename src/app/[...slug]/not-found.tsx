import React from 'react';
import Link from 'next/link';
import {
  FileQuestion,
  Home,
  BookOpen,
  Award,
  Building2,
  FileText,
  Search,
  ArrowRight,
} from 'lucide-react';

/**
 * Institutional 404 Recovery Page for missing or reorganized academic documents.
 */
export default function CatchAllNotFound() {
  const canonicalHubs = [
    {
      title: 'Academic Calendars & Regulations',
      href: '/academics/academic-calendar',
      description: 'Autonomous curriculum, R20/R19 academic regulations, and examination calendars.',
      icon: BookOpen,
    },
    {
      title: 'NAAC & NBA Accreditation Hub',
      href: '/accreditation/naac',
      description: "Cycle 2 'A+' Grade SSR criteria metrics, statutory disclosures, and compliance audits.",
      icon: Award,
    },
    {
      title: 'Engineering Departments',
      href: '/departments/cse',
      description: 'Explore the 8 academic branches (CSE, AI, ECE, EEE, ME, Civil, H&S, MBA).',
      icon: Building2,
    },
    {
      title: 'Placements & Corporate MoUs',
      href: '/placements/placement-record',
      description: 'Historical campus recruitment statistics, salary packages, and active industry MoUs.',
      icon: FileText,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="rounded-xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xs space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-semibold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200">
            <FileQuestion className="w-3.5 h-3.5 text-amber-700" />
            <span>404 - Document Not Found</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            The requested institutional record could not be located
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            The page you requested may have been reorganized during academic curriculum
            updates or consolidated under the autonomous portal modernization.
          </p>
        </div>

        {/* Major Institutional Hubs for Direct Recovery */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Primary Institutional Repositories</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {canonicalHubs.map((hub) => {
              const Icon = hub.icon;
              return (
                <Link
                  key={hub.href}
                  href={hub.href}
                  className="group flex flex-col justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:text-slate-950">
                      <Icon className="w-4 h-4 text-slate-500 group-hover:text-slate-800 transition-colors" />
                      <span>{hub.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal">
                      {hub.description}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-700 group-hover:text-slate-950">
                    <span>Explore Section</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Return Action */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Institutional Homepage</span>
          </Link>

          <span className="text-xs text-slate-500 font-mono">
            Autonomous Institution • JNTUA Affiliated
          </span>
        </div>
      </div>
    </div>
  );
}
