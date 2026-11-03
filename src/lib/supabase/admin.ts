import { createClient } from '@supabase/supabase-js';

/**
 * Creates an administrative Supabase client using the SUPABASE_SERVICE_ROLE_KEY.
 * STRICTLY for server-side background tasks, durable scraper workflows, and migrations.
 * NEVER expose or invoke this client within Client Components or client-accessible bundles.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase administrative configuration. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export { createAdminClient as createClient };
