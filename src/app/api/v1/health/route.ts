import { getDocumentStats } from '@/lib/data/documents.js';
import { getFacultyRoster } from '@/lib/data/faculty.js';
import { createProblemDetails, toProblemResponse } from '@/lib/api/problem.js';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const startTime = Date.now();
    let dbConnected = false;
    let latencyMs = 0;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const pingStart = Date.now();
        const { error } = await supabase.from('departments').select('code').limit(1);
        latencyMs = Date.now() - pingStart;
        dbConnected = !error;
      } catch {
        dbConnected = false;
        latencyMs = Date.now() - startTime;
      }
    }

    // Get counts from offline cache
    let facultyCount = 452;
    let documentCount = 5822;

    try {
      const facultyData = await getFacultyRoster({ limit: 1 });
      facultyCount = facultyData.meta.total;
      const docStats = await getDocumentStats();
      documentCount = docStats.totalMediaCount;
    } catch {
      // Retain defaults if offline load fails
    }

    const payload = {
      success: true,
      data: {
        status: dbConnected || !supabaseUrl ? 'healthy' : 'degraded',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'production',
        database: {
          connected: dbConnected,
          latencyMs
        },
        offlineCache: {
          facultyCount,
          documentCount
        },
        timestamp: new Date().toISOString()
      }
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache'
      }
    });
  } catch (err: any) {
    const problem = createProblemDetails({
      status: 500,
      detail: `Health check failure: ${err.message || 'Unknown internal error'}`,
      instance: new URL(request.url).pathname
    });
    return toProblemResponse(problem);
  }
}
