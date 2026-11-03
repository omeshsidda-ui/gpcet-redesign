import {
  createProblemDetails,
  notFoundProblem,
  toProblemResponse
} from '@/lib/api/problem.js';

export const dynamic = 'force-dynamic';

const ALLOWED_HOSTNAME_SUFFIX = 'gpcet.ac.in';

/**
 * Validates if the target hostname is authorized for proxying
 */
function isAllowedHostname(hostname: string): boolean {
  if (!hostname) return false;
  const lower = hostname.toLowerCase();

  // Block localhost, private IPs, and loopback addresses
  if (
    lower === 'localhost' ||
    lower === '127.0.0.1' ||
    lower === '::1' ||
    lower.startsWith('10.') ||
    lower.startsWith('192.168.') ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(lower)
  ) {
    return false;
  }

  return lower === ALLOWED_HOSTNAME_SUFFIX || lower.endsWith(`.${ALLOWED_HOSTNAME_SUFFIX}`);
}

export async function GET(request: Request) {
  const reqUrl = new URL(request.url);
  const targetUrlString = reqUrl.searchParams.get('url');

  if (!targetUrlString) {
    const problem = createProblemDetails({
      status: 400,
      title: 'Bad Request',
      code: 'BAD_REQUEST',
      detail: 'Missing required query parameter: url',
      instance: reqUrl.pathname
    });
    return toProblemResponse(problem);
  }

  let parsedTarget: URL;
  try {
    parsedTarget = new URL(targetUrlString);
  } catch {
    const problem = createProblemDetails({
      status: 400,
      title: 'Bad Request',
      code: 'BAD_REQUEST',
      detail: 'The provided url parameter is not a valid URL.',
      instance: reqUrl.pathname
    });
    return toProblemResponse(problem);
  }

  // Enforce HTTP / HTTPS protocol
  if (parsedTarget.protocol !== 'http:' && parsedTarget.protocol !== 'https:') {
    const problem = createProblemDetails({
      status: 400,
      title: 'Bad Request',
      code: 'BAD_REQUEST',
      detail: 'Only HTTP and HTTPS protocols are supported for media proxying.',
      instance: reqUrl.pathname
    });
    return toProblemResponse(problem);
  }

  // SSRF Protection: Hostname allowlist check
  if (!isAllowedHostname(parsedTarget.hostname)) {
    const problem = createProblemDetails({
      status: 403,
      title: 'Forbidden',
      code: 'FORBIDDEN',
      detail: `Target hostname '${parsedTarget.hostname}' is not permitted for media proxying. Allowed: *.${ALLOWED_HOSTNAME_SUFFIX}`,
      instance: reqUrl.pathname
    });
    return toProblemResponse(problem);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15-second timeout

    const upstreamRes = await fetch(parsedTarget.toString(), {
      signal: controller.signal,
      headers: {
        'User-Agent': 'GPCET-Media-Proxy/1.0 (+https://gpcet.ac.in)'
      }
    });

    clearTimeout(timeout);

    if (upstreamRes.status === 404) {
      return toProblemResponse(notFoundProblem('Asset', targetUrlString, reqUrl.pathname));
    }

    if (!upstreamRes.ok) {
      const problem = createProblemDetails({
        status: 502,
        title: 'Bad Gateway',
        code: 'BAD_GATEWAY',
        detail: `Upstream media server returned HTTP status ${upstreamRes.status}.`,
        instance: reqUrl.pathname
      });
      return toProblemResponse(problem);
    }

    // Prepare streaming response headers
    const contentType = upstreamRes.headers.get('content-type') || 'application/pdf';
    const contentLength = upstreamRes.headers.get('content-length');
    const contentDisposition = upstreamRes.headers.get('content-disposition');

    const responseHeaders: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
    };

    if (contentLength) {
      responseHeaders['Content-Length'] = contentLength;
    }

    if (contentDisposition) {
      responseHeaders['Content-Disposition'] = contentDisposition;
    }

    return new Response(upstreamRes.body, {
      status: 200,
      headers: responseHeaders
    });
  } catch (err: any) {
    const isTimeout = err.name === 'AbortError';
    const problem = createProblemDetails({
      status: 502,
      title: 'Bad Gateway',
      code: 'BAD_GATEWAY',
      detail: isTimeout
        ? 'Upstream media fetch timed out.'
        : `Upstream network error: ${err.message || 'Failed to fetch remote asset.'}`,
      instance: reqUrl.pathname
    });
    return toProblemResponse(problem);
  }
}
