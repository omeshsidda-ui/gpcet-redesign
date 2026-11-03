import { getFacultyBySlug } from '@/lib/data/faculty.js';
import { notFoundProblem, toProblemResponse, createProblemDetails } from '@/lib/api/problem.js';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const url = new URL(request.url);
  const params = await props.params;
  const slug = params?.slug;

  if (!slug) {
    const problem = createProblemDetails({
      status: 400,
      detail: 'Missing required slug parameter in route path.',
      instance: url.pathname
    });
    return toProblemResponse(problem);
  }

  try {
    const faculty = await getFacultyBySlug(slug);

    if (!faculty) {
      return toProblemResponse(notFoundProblem('Faculty member', slug, url.pathname));
    }

    const payload = {
      success: true,
      data: faculty
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
      detail: `Failed to retrieve faculty profile: ${err.message || 'Internal database error'}`,
      instance: url.pathname
    });
    return toProblemResponse(problem);
  }
}
