import { NoticeQuerySchema } from '@/lib/validations/notice.schema.js';
import { getActiveNotices } from '@/lib/data/notices.js';
import { validationProblem, toProblemResponse, createProblemDetails } from '@/lib/api/problem.js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawParams: Record<string, string> = {};

  url.searchParams.forEach((value, key) => {
    rawParams[key] = value;
  });

  const parsed = NoticeQuerySchema.safeParse(rawParams);
  if (!parsed.success) {
    return toProblemResponse(validationProblem(parsed.error, url.pathname + url.search));
  }

  try {
    const { tickerOnly, category, limit } = parsed.data;
    const notices = await getActiveNotices({ tickerOnly, category, limit });

    const payload = {
      success: true,
      data: notices
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600'
      }
    });
  } catch (err: any) {
    const problem = createProblemDetails({
      status: 500,
      detail: `Failed to retrieve institutional notices: ${err.message || 'Internal database error'}`,
      instance: url.pathname + url.search
    });
    return toProblemResponse(problem);
  }
}
