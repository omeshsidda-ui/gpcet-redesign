import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const PLACEHOLDER_URL_FRAGMENTS = [
  'placeholder.supabase.co',
  'your-project-id.supabase.co',
  'example.supabase.co',
  'localhost:0',
];

const PLACEHOLDER_KEY_FRAGMENTS = [
  'placeholder-anon-key',
  'your-anon-key-placeholder',
  'your-anon-key',
  'placeholder',
];

/**
 * Edge-safe check for valid (non-placeholder) public Supabase credentials.
 * Does not reference SUPABASE_SERVICE_ROLE_KEY or Node-only APIs.
 */
export function isSupabaseMiddlewareConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return false;
  }

  const lowerUrl = url.toLowerCase();
  const lowerKey = anonKey.toLowerCase();

  if (PLACEHOLDER_URL_FRAGMENTS.some((fragment) => lowerUrl.includes(fragment))) {
    return false;
  }

  if (PLACEHOLDER_KEY_FRAGMENTS.some((fragment) => lowerKey.includes(fragment))) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Builds the strict institutional Content-Security-Policy header.
 * Note: 'nonce-...' is intentionally omitted so CSP2+ does not disable
 * 'unsafe-inline' for Next.js 15 statically prerendered SSG hydration scripts.
 * 'unsafe-eval' is enabled only in non-production dev mode for React HMR.
 */
export function buildContentSecurityPolicy(
  isDev: boolean = process.env.NODE_ENV !== 'production'
): string {
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";

  return [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https://www.gpcet.ac.in https://gpcet.ac.in blob:",
    "connect-src 'self' https://*.supabase.co https://www.gpcet.ac.in",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}

/**
 * Returns the complete set of HTTP security headers applied at the Edge.
 */
export function getSecurityHeaders(
  isDev: boolean = process.env.NODE_ENV !== 'production'
): Record<string, string> {
  return {
    'Content-Security-Policy': buildContentSecurityPolicy(isDev),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

function applySecurityHeaders(response: NextResponse): NextResponse {
  const headers = getSecurityHeaders();
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }
  return response;
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  // Refresh Supabase SSR HttpOnly session cookies cleanly on /admin routes (ADR-002)
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    isSupabaseMiddlewareConfigured()
  ) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!.trim();
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim();

    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set(name, value);
            });
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      });

      await supabase.auth.getUser();
    } catch {
      // Degrade cleanly if Supabase Auth is unreachable in offline/preview mode
    }
  }

  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|assets/|search-index\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|eot|css|js|map|pdf)$).*)',
  ],
};
