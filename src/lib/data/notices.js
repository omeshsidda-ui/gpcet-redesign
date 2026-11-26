import { createClient } from '@supabase/supabase-js';

// Institutional notices data adapter with fallback circulars
const SEED_NOTICES = [
  {
    id: 'not_001',
    departmentCode: null,
    title: 'EAPCET / ECET 2026 Admissions Counseling Schedule & Helpline Centers',
    slug: 'eapcet-admissions-schedule-2026',
    summary: 'Detailed reporting dates, certificate verification centers, and B.Tech convenor quota seat intake matrix.',
    contentMarkdown:
      'G. Pullaiah College of Engineering & Technology (Autonomous) announces the reporting schedule and document verification guidelines for EAPCET and ECET 2026 convenor quota admissions.\n\n- **Counseling Code**: **GPCET**\n- **Required Documents**: Hall Ticket, Rank Card, SSC/Intermediate Marks Memos, Transfer Certificate, and Category/Income Certificates (if applicable).',
    category: 'admissions',
    priority: 'urgent',
    isTicker: true,
    isPinned: true,
    attachmentUrl: 'https://www.gpcet.ac.in/wp-content/uploads/2026/10/admissions-notice.pdf',
    attachmentSizeBytes: null,
    publishedAt: '2026-10-15T09:00:00.000Z',
    expiresAt: null
  },
  {
    id: 'not_002',
    departmentCode: null,
    title: 'JNTUA Autonomous End Semester Examinations Schedule (R20 & R23)',
    slug: 'jntua-autonomous-end-sem-exams-schedule',
    summary: 'Timetable for regular and supplementary examinations across all B.Tech branches.',
    contentMarkdown:
      'The Office of the Controller of Examinations has released the autonomous end-semester examination timetables for B.Tech R20 and R23 regulations across CSE, AI, ECE, EEE, ME, and Civil Engineering.',
    category: 'examination',
    priority: 'high',
    isTicker: true,
    isPinned: true,
    attachmentUrl: 'https://www.gpcet.ac.in/wp-content/uploads/2026/10/exam-timetable.pdf',
    attachmentSizeBytes: null,
    publishedAt: '2026-10-12T09:00:00.000Z',
    expiresAt: null
  },
  {
    id: 'not_003',
    departmentCode: 'cse',
    title: 'National Level Technical Symposium & Hackathon - GPCET Invenio 2026',
    slug: 'gpcet-invenio-technical-symposium-2026',
    summary: 'Department of Computer Science & AI invites student registrations for 36-hour hackathon and paper presentations.',
    contentMarkdown:
      'The Departments of Computer Science & Engineering and Artificial Intelligence invite undergraduate students to participate in **GPCET Invenio 2026**, featuring a 36-hour hackathon, technical paper presentations, and coding contests.',
    category: 'event',
    priority: 'normal',
    isTicker: false,
    isPinned: false,
    attachmentUrl: null,
    attachmentSizeBytes: null,
    publishedAt: '2026-10-10T09:00:00.000Z',
    expiresAt: null
  }
];

let supabaseClient = null;

function isConfiguredValue(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.includes('your-project-id') || trimmed.includes('placeholder')) return false;
  return true;
}

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (isConfiguredValue(url) && isConfiguredValue(key)) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
        supabaseClient = createClient(url, key);
        return supabaseClient;
      }
    } catch {
      return null;
    }
  }
  return null;
}

function mapNoticeRow(row) {
  return {
    id: row.id,
    departmentCode: row.department_code ?? null,
    title: row.title,
    slug: row.slug,
    summary: row.summary ?? null,
    contentMarkdown: row.content_markdown ?? '',
    category: row.category,
    priority: row.priority,
    isTicker: Boolean(row.is_ticker),
    isPinned: Boolean(row.is_pinned),
    attachmentUrl: row.attachment_url ?? null,
    attachmentSizeBytes: row.attachment_size_bytes ?? null,
    publishedAt: row.published_at,
    expiresAt: row.expires_at ?? null
  };
}

async function runWithNoticeCache(keyParts, fn) {
  try {
    const { unstable_cache } = await import('next/cache');
    const cachedFn = unstable_cache(fn, keyParts, {
      revalidate: 300,
      tags: ['notices']
    });
    return await cachedFn();
  } catch {
    return await fn();
  }
}

function filterSeedNotices({ tickerOnly = false, category = 'all', department = 'all', limit = 10, offset = 0 }) {
  let list = SEED_NOTICES;

  if (tickerOnly) {
    list = list.filter(n => n.isTicker);
  }

  if (category && category !== 'all') {
    list = list.filter(n => n.category === category);
  }

  if (department && department !== 'all') {
    list = list.filter(n => n.departmentCode === department.toLowerCase());
  }

  return list.slice(offset, offset + limit);
}

/**
 * Fail-Safe Hybrid Read for Institutional Notices
 * Queries Supabase `notices` table when configured, falling back to SEED_NOTICES.
 */
export async function getActiveNotices({
  tickerOnly = false,
  category = 'all',
  department = 'all',
  limit = 10,
  offset = 0
} = {}) {
  return runWithNoticeCache(
    ['notices', String(tickerOnly), String(category), String(department), String(limit), String(offset)],
    async () => {
      const supabase = getSupabaseClient();

      if (supabase) {
        try {
          const nowIso = new Date().toISOString();
          let query = supabase
            .from('notices')
            .select(
              'id, department_code, title, slug, summary, content_markdown, category, priority, is_ticker, is_pinned, attachment_url, attachment_size_bytes, published_at, expires_at'
            )
            .eq('is_active', true)
            .lte('published_at', nowIso)
            .or(`expires_at.is.null,expires_at.gt.${nowIso}`)
            .order('is_pinned', { ascending: false })
            .order('published_at', { ascending: false });

          if (tickerOnly) {
            query = query.eq('is_ticker', true);
          }

          if (category && category !== 'all') {
            query = query.eq('category', category);
          }

          if (department && department !== 'all') {
            query = query.eq('department_code', department.toLowerCase());
          }

          query = query.range(offset, offset + limit - 1);
          const { data, error } = await query;

          if (!error && Array.isArray(data) && data.length > 0) {
            return data.map(mapNoticeRow);
          }
        } catch {
          // Graceful fallback to offline seed notices on any database error
        }
      }

      return filterSeedNotices({ tickerOnly, category, department, limit, offset });
    }
  );
}

/**
 * Retrieve active marquee ticker notices
 */
export async function getTickerNotices(limit = 5) {
  return getActiveNotices({ tickerOnly: true, limit });
}

/**
 * Retrieve a single active notice by slug
 */
export async function getNoticeBySlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) return null;

  return runWithNoticeCache(['notice-by-slug', normalizedSlug], async () => {
    const supabase = getSupabaseClient();

    if (supabase) {
      try {
        const nowIso = new Date().toISOString();
        const { data, error } = await supabase
          .from('notices')
          .select(
            'id, department_code, title, slug, summary, content_markdown, category, priority, is_ticker, is_pinned, attachment_url, attachment_size_bytes, published_at, expires_at'
          )
          .eq('slug', normalizedSlug)
          .eq('is_active', true)
          .lte('published_at', nowIso)
          .or(`expires_at.is.null,expires_at.gt.${nowIso}`)
          .maybeSingle();

        if (!error && data) {
          return mapNoticeRow(data);
        }
      } catch {
        // Fallback to seed notices
      }
    }

    return SEED_NOTICES.find(n => n.slug === normalizedSlug) || null;
  });
}
