import { createClient } from '@supabase/supabase-js';

// Institutional notices data adapter with verified active fallback circulars from gpcet.ac.in
const SEED_NOTICES = [
  {
    id: 'not_002',
    departmentCode: null,
    title: 'IV B.Tech VII & VIII Semester Academic Calendar 2026–27',
    slug: 'iv-btech-academic-calendar-2026-27',
    summary: 'Official autonomous academic calendar for IV B.Tech VII and VIII semesters covering classwork, mid-term examinations, and end-semester schedules.',
    contentMarkdown:
      'The Office of Academic Affairs has published the **IV B.Tech Academic Calendar 2026–27** for VII and VIII semesters.\n\n- **Download Official Calendar**: [IV B.Tech Academic Calendar 2026-27 (PDF)](https://www.gpcet.ac.in/wp-content/uploads/2026/11/IV-B.Tech-Academic-Calendar-2026-27-1.pdf)',
    category: 'academic_calendar',
    priority: 'high',
    isTicker: true,
    isPinned: true,
    attachmentUrl: 'https://www.gpcet.ac.in/wp-content/uploads/2026/11/IV-B.Tech-Academic-Calendar-2026-27-1.pdf',
    attachmentSizeBytes: 360328,
    publishedAt: '2026-11-26T05:17:59.000Z',
    expiresAt: null
  },
  {
    id: 'not_003',
    departmentCode: null,
    title: 'M.Tech I Year (I & II Semester) Academic Calendar 2026–27',
    slug: 'mtech-i-year-academic-calendar-2026-27',
    summary: 'Official 2026–27 academic calendar for M.Tech I Year programs (CSE, DECS, and EPS) detailing instructional spells and assessment dates.',
    contentMarkdown:
      'G. Pullaiah College of Engineering & Technology (Autonomous) has released the **M.Tech I Year Academic Calendar 2026–27** for Computer Science & Engineering, Digital Electronics & Communication Systems, and Electrical Power Systems.\n\n- **Download Official Calendar**: [M.Tech I Year Academic Calendar 2026-27 (PDF)](https://www.gpcet.ac.in/wp-content/uploads/2026/11/M.-Tech-I-Year-Academic-Calendar-2026-27.pdf)',
    category: 'academic_calendar',
    priority: 'high',
    isTicker: true,
    isPinned: false,
    attachmentUrl: 'https://www.gpcet.ac.in/wp-content/uploads/2026/11/M.-Tech-I-Year-Academic-Calendar-2026-27.pdf',
    attachmentSizeBytes: 418050,
    publishedAt: '2026-11-13T05:20:41.000Z',
    expiresAt: null
  },
  {
    id: 'not_004',
    departmentCode: null,
    title: 'B.Tech R26 Autonomous Regulations & Branch-Wise Syllabi Published',
    slug: 'btech-r26-autonomous-regulations-syllabi-2026',
    summary: 'Updated R26 autonomous curriculum and syllabus handbooks published for CSE, CSE (AI), ECE, EEE, Civil, and Mechanical Engineering.',
    contentMarkdown:
      'Updated **R26 Autonomous Regulations and Syllabi** are now available for all six B.Tech engineering branches:\n\n- [Computer Science and Engineering (PDF)](https://www.gpcet.ac.in/wp-content/uploads/2026/11/Computer-Science-Engineering.pdf)\n- [Computer Science and Engineering (AI) (PDF)](https://www.gpcet.ac.in/wp-content/uploads/2026/11/Computer-Science-Engineering-AI.pdf)\n- [Electronics and Communication Engineering (PDF)](https://www.gpcet.ac.in/wp-content/uploads/2026/11/Electronics-and-Communication-Engineering.pdf)\n- [Electrical and Electronics Engineering (PDF)](https://www.gpcet.ac.in/wp-content/uploads/2026/11/Electrical-and-Electronics-Engineering.pdf)\n- [Civil Engineering (PDF)](https://www.gpcet.ac.in/wp-content/uploads/2026/11/Civil-Engineering.pdf)\n- [Mechanical Engineering (PDF)](https://www.gpcet.ac.in/wp-content/uploads/2026/11/Mechanical-Engineering.pdf)',
    category: 'circular',
    priority: 'normal',
    isTicker: false,
    isPinned: false,
    attachmentUrl: 'https://www.gpcet.ac.in/wp-content/uploads/2026/11/Computer-Science-Engineering.pdf',
    attachmentSizeBytes: 2923526,
    publishedAt: '2026-11-11T03:43:43.000Z',
    expiresAt: null
  },
  {
    id: 'not_33900',
    departmentCode: null,
    title: 'IEEE International Conference on Emerging Trends in Electronics, Computing and Intelligent Systems (ETECIS 2026) on Dec 18–19, 2026',
    slug: 'ieee-international-conference-on-emerging-trends-in-electronics-computing-and-intelligent-systems-etecis-2026-on-dec-18-dec-19-2026',
    summary: 'GPCET hosts ETECIS 2026 on December 18–19, 2026, bringing together researchers in electronics, computing, and intelligent systems.',
    contentMarkdown:
      'G. Pullaiah College of Engineering & Technology (Autonomous), Kurnool is hosting the **IEEE International Conference on Emerging Trends in Electronics, Computing and Intelligent Systems (ETECIS 2026)** on **December 18–19, 2026**.\n\n- **Conference Portal**: [ETECIS 2026 Official Conference Page](https://www.gpcet.ac.in/conf/index.html)',
    category: 'event',
    priority: 'urgent',
    isTicker: true,
    isPinned: true,
    attachmentUrl: 'https://www.gpcet.ac.in/conf/index.html',
    attachmentSizeBytes: null,
    publishedAt: '2026-11-06T07:00:18.000Z',
    expiresAt: null
  },
  {
    id: 'not_001',
    departmentCode: null,
    title: 'EAPCET / ECET 2026 Admissions Counseling Schedule & Helpline Centers',
    slug: 'eapcet-admissions-schedule-2026',
    summary: 'Reporting guidelines, certificate verification details, and sanctioned intake matrix (1,110 total seats) under EAPCET Counseling Code PULE.',
    contentMarkdown:
      'G. Pullaiah College of Engineering & Technology (Autonomous) announces reporting and certificate verification guidelines for EAPCET, ECET, and ICET 2026 admissions across 6 UG and 4 PG programs (total annual intake: 1,110).\n\n- **Counseling Code**: **PULE**\n- **Admissions Helpline**: `08518-285088` · `+91 86397 56663`\n- **Required Documents**: Hall Ticket, Rank Card, SSC/Intermediate Marks Memos, Transfer Certificate, and Category/Income Certificates (if applicable).',
    category: 'admissions',
    priority: 'urgent',
    isTicker: true,
    isPinned: false,
    attachmentUrl: null,
    attachmentSizeBytes: null,
    publishedAt: '2026-10-15T09:00:00.000Z',
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
