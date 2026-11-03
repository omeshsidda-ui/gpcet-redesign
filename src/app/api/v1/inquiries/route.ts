import crypto from 'node:crypto';
import { InquirySubmissionSchema } from '@/lib/validations/inquiry.schema.js';
import {
  createProblemDetails,
  validationProblem,
  rateLimitProblem,
  toProblemResponse
} from '@/lib/api/problem.js';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// In-memory sliding-window store for IP rate limiting (10-minute window)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestHistory = new Map<string, number[]>();

// Periodic cleanup of expired rate limit entries
function cleanupRateLimits(now: number) {
  if (ipRequestHistory.size > 1000) {
    for (const [ip, timestamps] of ipRequestHistory.entries()) {
      const active = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        ipRequestHistory.delete(ip);
      } else {
        ipRequestHistory.set(ip, active);
      }
    }
  }
}

/**
 * Check and record sliding window rate limit
 */
async function checkRateLimit(ipHash: string): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  // If Upstash Redis credentials are provided, use Upstash REST API
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const key = `ratelimit:inquiries:${ipHash}`;
      const now = Date.now();
      const windowStart = now - RATE_LIMIT_WINDOW_MS;

      // Sliding window using sorted set in Upstash
      const pipelineRes = await fetch(`${upstashUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          ['ZREMRANGEBYSCORE', key, 0, windowStart],
          ['ZCARD', key],
          ['ZADD', key, now, `${now}-${Math.random()}`],
          ['EXPIRE', key, Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)]
        ])
      });

      if (pipelineRes.ok) {
        const results = await pipelineRes.json();
        const currentCount = results[1]?.result || 0;
        if (currentCount >= MAX_REQUESTS_PER_WINDOW) {
          return { allowed: false, retryAfterSeconds: 60 };
        }
        return { allowed: true, retryAfterSeconds: 0 };
      }
    } catch {
      // Fallback to in-memory sliding window on Upstash error
    }
  }

  // Resilient In-Memory Sliding Window
  const now = Date.now();
  cleanupRateLimits(now);

  const timestamps = ipRequestHistory.get(ipHash) || [];
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = validTimestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  validTimestamps.push(now);
  ipRequestHistory.set(ipHash, validTimestamps);
  return { allowed: true, retryAfterSeconds: 0 };
}

export async function POST(request: Request) {
  const url = new URL(request.url);

  // Extract client IP and hash with SHA-256 for privacy compliance
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const clientIp = forwardedFor.split(',')[0].trim() || request.headers.get('x-real-ip') || '127.0.0.1';
  const ipHash = crypto.createHash('sha256').update(clientIp).digest('hex');

  // 1. Sliding-Window Rate Limit Check (5 requests / 10 minutes)
  const rateLimitResult = await checkRateLimit(ipHash);
  if (!rateLimitResult.allowed) {
    return toProblemResponse(rateLimitProblem(rateLimitResult.retryAfterSeconds, url.pathname));
  }

  // 2. Parse request JSON body
  let body: any;
  try {
    body = await request.json();
  } catch {
    const problem = createProblemDetails({
      status: 400,
      title: 'Bad Request',
      code: 'BAD_REQUEST',
      detail: 'Malformed JSON payload in request body.',
      instance: url.pathname
    });
    return toProblemResponse(problem);
  }

  // 3. Honeypot Bot Check: botCheck field must be completely empty
  if (body.botCheck && typeof body.botCheck === 'string' && body.botCheck.trim().length > 0) {
    const problem = createProblemDetails({
      status: 422,
      title: 'Validation Failed',
      code: 'VALIDATION_FAILED',
      detail: 'Admissions inquiry form data contains invalid fields.',
      instance: url.pathname,
      errors: [
        {
          field: 'botCheck',
          message: 'Invalid submission detected'
        }
      ]
    });
    return toProblemResponse(problem);
  }

  // 4. Validate payload against Zod InquirySubmissionSchema
  const parsed = InquirySubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return toProblemResponse(
      validationProblem(
        parsed.error,
        url.pathname,
        'Admissions inquiry form data contains invalid fields.'
      )
    );
  }

  const { studentName, email, phone, desiredDepartment, program, eamcetRank, message } = parsed.data;
  const inquiryId = crypto.randomUUID();

  // 5. Database Insertion (if Supabase is configured)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from('admissions_inquiries').insert({
        id: inquiryId,
        student_name: studentName,
        email,
        phone,
        desired_department: desiredDepartment,
        program,
        eamcet_rank: eamcetRank ?? null,
        message: message ?? null,
        ip_hash: ipHash,
        user_agent: request.headers.get('user-agent') || null,
        status: 'new'
      });
    } catch {
      // In offline/test mode, inquiry is still confirmed with generated ID
    }
  }

  const payload = {
    success: true,
    data: {
      inquiryId,
      status: 'received',
      message: 'Thank you for contacting GPCET Admissions. Our admissions counselor will contact you within 24 hours.'
    }
  };

  return new Response(JSON.stringify(payload), {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
