import type { MetadataRoute } from 'next';
import { getAllContentRoutes } from '@/lib/content';
import { getAllDepartments } from '@/lib/data/departments.js';

const BASE_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://gpcet-redesign.vercel.app').replace(
  /\/+$/,
  ''
);

const CORE_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/documents', changeFrequency: 'daily', priority: 0.9 },
  { path: '/departments', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/admissions', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/admissions/lateral-entry', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/admissions/pg', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/placements', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/research', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/research/chapters', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/accreditation', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/accreditation/naac', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/accreditation/nba', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/accreditation/autonomous', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/administration', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/campus-life', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/statutory/mandatory-disclosure', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/statutory/privacy', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/statutory/terms', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/statutory/accessibility', changeFrequency: 'yearly', priority: 0.5 },
];

const DEPARTMENT_SUBTABS = [
  'faculty',
  'laboratories',
  'board-of-studies',
  'syllabus',
  'events',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();

  const register = (
    routePath: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number
  ) => {
    const normalized = routePath === '/' ? '/' : `/${routePath.replace(/^\/+|\/+$/g, '')}`;
    if (entries.has(normalized)) return;
    entries.set(normalized, {
      url: normalized === '/' ? BASE_URL : `${BASE_URL}${normalized}`,
      lastModified: now,
      changeFrequency,
      priority,
    });
  };

  // 1. Core first-class App Router pages
  for (const route of CORE_ROUTES) {
    register(route.path, route.changeFrequency, route.priority);
  }

  // 2. All 8 academic department portals and sub-tabs
  const departments = (await getAllDepartments()) as Array<{ code: string }>;
  for (const dept of departments) {
    const code = dept.code.toLowerCase();
    register(`/departments/${code}`, 'weekly', 0.85);
    for (const tab of DEPARTMENT_SUBTABS) {
      register(`/departments/${code}/${tab}`, 'weekly', 0.75);
    }
  }

  // 3. All indexed scraped markdown content routes
  const contentRoutes = getAllContentRoutes();
  for (const route of contentRoutes) {
    if (!route.path || route.path.startsWith('/admin') || route.path.startsWith('/api')) {
      continue;
    }
    register(route.path, 'monthly', 0.6);
  }

  return Array.from(entries.values());
}
