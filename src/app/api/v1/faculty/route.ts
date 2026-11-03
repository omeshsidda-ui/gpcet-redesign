import { FacultyQuerySchema } from '@/lib/validations/faculty.schema.js';
import { getFacultyRoster } from '@/lib/data/faculty.js';
import { validationProblem, toProblemResponse, createProblemDetails } from '@/lib/api/problem.js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawParams: Record<string, string> = {};

  url.searchParams.forEach((value, key) => {
    rawParams[key] = value;
  });

  const parsed = FacultyQuerySchema.safeParse(rawParams);
  if (!parsed.success) {
    return toProblemResponse(validationProblem(parsed.error, url.pathname + url.search));
  }

  try {
    const { department, cadre, q, limit, offset } = parsed.data;
    const result = await getFacultyRoster({ department, cadre, q, limit, offset });

    const payload = {
      success: true,
      data: result.data,
      meta: result.meta
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Vary': 'Accept-Encoding'
      }
    });
  } catch (err: any) {
    const problem = createProblemDetails({
      status: 500,
      detail: `Failed to retrieve faculty roster: ${err.message || 'Internal database error'}`,
      instance: url.pathname + url.search
    });
    return toProblemResponse(problem);
  }
}
