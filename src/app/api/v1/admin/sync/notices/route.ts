import crypto from 'node:crypto';
import { createServerClient } from '@/lib/supabase/server';
import { createProblemDetails, toProblemResponse } from '@/lib/api/problem.js';
import { syncNoticesWorkflow } from '@/lib/workflow/sync-notices';

export const dynamic = 'force-dynamic';

const ALLOWED_SYNC_ROLES = new Set(['admin', 'editor']);

function safeTokenCompare(provided: string, expected: string): boolean {
  const providedBuf = Buffer.from(provided, 'utf8');
  const expectedBuf = Buffer.from(expected, 'utf8');
  if (providedBuf.length !== expectedBuf.length || providedBuf.length === 0) {
    return false;
  }
  return crypto.timingSafeEqual(providedBuf, expectedBuf);
}

function isValidBearerToken(authHeader: string | null): { present: boolean; valid: boolean } {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { present: false, valid: false };
  }

  const token = authHeader.slice('Bearer '.length).trim();
  if (!token) {
    return { present: true, valid: false };
  }

  const candidates = [process.env.ADMIN_SYNC_TOKEN, process.env.CRON_SECRET].filter(
    (value): value is string => typeof value === 'string' && value.trim().length > 0
  );

  for (const candidate of candidates) {
    if (safeTokenCompare(token, candidate.trim())) {
      return { present: true, valid: true };
    }
  }

  return { present: true, valid: false };
}

function isSupabaseSsrConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return false;
  if (url.includes('your-project-id') || anonKey.includes('placeholder')) return false;
  return true;
}

async function authorizeRequest(request: Request): Promise<Response | null> {
  const instance = new URL(request.url).pathname;

  // 1. Check Bearer token authentication (ADMIN_SYNC_TOKEN / CRON_SECRET)
  const bearer = isValidBearerToken(request.headers.get('authorization'));
  if (bearer.valid) {
    return null;
  }
  if (bearer.present) {
    return toProblemResponse(
      createProblemDetails({
        status: 401,
        detail: 'Invalid bearer synchronization token.',
        instance
      })
    );
  }

  // 2. Check authenticated Supabase SSR session with admin/editor role in app_metadata
  if (isSupabaseSsrConfigured()) {
    try {
      const supabase = await createServerClient();
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (error || !user) {
        return toProblemResponse(
          createProblemDetails({
            status: 401,
            detail: 'Authentication required to trigger institutional notice synchronization.',
            instance
          })
        );
      }

      const role = typeof user.app_metadata?.role === 'string' ? user.app_metadata.role : '';
      if (!ALLOWED_SYNC_ROLES.has(role)) {
        return toProblemResponse(
          createProblemDetails({
            status: 403,
            detail: 'Administrator or editor privileges are required to trigger notice synchronization.',
            instance
          })
        );
      }

      return null;
    } catch {
      return toProblemResponse(
        createProblemDetails({
          status: 401,
          detail: 'Unable to verify authentication session.',
          instance
        })
      );
    }
  }

  return toProblemResponse(
    createProblemDetails({
      status: 401,
      detail: 'Missing valid authorization credentials for notice synchronization.',
      instance
    })
  );
}

export async function POST(request: Request) {
  const instance = new URL(request.url).pathname;

  const authErrorResponse = await authorizeRequest(request);
  if (authErrorResponse) {
    return authErrorResponse;
  }

  try {
    let workflowRunId: string;

    try {
      const { start } = await import('workflow/api');
      const run = await start(syncNoticesWorkflow);
      workflowRunId = run.runId;
    } catch {
      // Fallback when invoked outside a compiled Workflow runtime (e.g. unit tests)
      workflowRunId = `wf_run_${crypto.randomUUID()}`;
      void syncNoticesWorkflow().catch((err) => {
        console.error('[sync-notices] Background fallback execution error:', err);
      });
    }

    const payload = {
      success: true,
      data: {
        workflowRunId,
        status: 'accepted',
        message: 'Durable notice synchronization workflow initiated.'
      }
    };

    return new Response(JSON.stringify(payload), {
      status: 202,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected workflow trigger error.';
    return toProblemResponse(
      createProblemDetails({
        status: 500,
        detail: `Failed to initiate notice synchronization workflow: ${message}`,
        instance
      })
    );
  }
}
