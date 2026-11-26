import type { NextConfig } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { withWorkflow } from 'workflow/next';

// First-class App Router routes that must never be shadowed by legacy WordPress redirects
const RESERVED_APP_ROUTES = new Set([
  '/',
  '/documents',
  '/departments',
  '/accreditation',
  '/accreditation/naac',
  '/accreditation/nba',
  '/administration',
  '/admissions',
  '/campus-life',
  '/placements',
  '/admin',
  '/admin/login',
  '/admin/notices',
  '/admin/faculty',
]);

function isReservedAppRoute(pathname: string): boolean {
  if (RESERVED_APP_ROUTES.has(pathname)) {
    return true;
  }
  if (pathname.startsWith('/api/') || pathname.startsWith('/admin/')) {
    return true;
  }
  if (/^\/departments\/(cse|ai|ece|eee|me|civil|hs|mba)(\/(faculty|laboratories|board-of-studies|syllabus|events))?$/.test(pathname)) {
    return true;
  }
  return false;
}

/**
 * Transforms the 2,784 legacy WordPress URL mappings from src/data/url-map.json
 * into Next.js edge-level 301 redirects, bypassing middleware execution overhead.
 */
function getLegacyRedirects(): Array<{ source: string; destination: string; permanent: boolean }> {
  try {
    const urlMapPath = path.join(process.cwd(), 'src', 'data', 'url-map.json');
    if (!fs.existsSync(urlMapPath)) {
      return [];
    }

    const rawData = fs.readFileSync(urlMapPath, 'utf8');
    const urlMap: Record<string, string> = JSON.parse(rawData);

    // Map to deduplicate normalized sources
    const redirectsMap = new Map<string, string>();

    for (const [key, dest] of Object.entries(urlMap)) {
      let source = key.trim();

      // Extract pathname if full URL is supplied
      if (source.startsWith('http://') || source.startsWith('https://')) {
        try {
          const parsed = new URL(source);
          source = parsed.pathname;
        } catch {
          continue;
        }
      } else if (!source.startsWith('/')) {
        source = `/${source}`;
      }

      // Normalize trailing slash (unless root '/')
      if (source.length > 1 && source.endsWith('/')) {
        source = source.slice(0, -1);
      }

      // Never shadow first-class App Router pages (e.g. '/', '/accreditation')
      if (isReservedAppRoute(source)) {
        continue;
      }

      let target = dest.trim();
      if (target.length > 1 && target.endsWith('/')) {
        target = target.slice(0, -1);
      }

      // Safeguard against self-redirect loops
      if (source && target && source !== target) {
        redirectsMap.set(source, target);
      }
    }

    return Array.from(redirectsMap.entries()).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  } catch (error) {
    console.error('[next.config.ts] Failed to load URL redirect mappings:', error);
    return [];
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Image optimization for institutional media and external assets
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gpcet.ac.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gpcet.ac.in',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Compiler and bundle optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@supabase/ssr',
      '@supabase/supabase-js',
    ],
  },

  // 2,784 legacy WordPress redirects executed at the edge
  async redirects() {
    return getLegacyRedirects();
  },
};

export default withWorkflow(nextConfig);
