import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { revalidateTag } from 'next/cache';
import { RetryableError, getStepMetadata } from 'workflow';
import { createAdminClient } from '@/lib/supabase/admin';

const WP_POSTS_ENDPOINT = 'https://www.gpcet.ac.in/wp-json/wp/v2/posts';
const DEFAULT_FETCH_TIMEOUT_MS = 10_000;

export type NoticeCategory =
  | 'circular'
  | 'examination'
  | 'admissions'
  | 'recruitment'
  | 'academic_calendar'
  | 'event'
  | 'tender'
  | 'statutory';

export type NoticePriority = 'urgent' | 'high' | 'normal';

export interface WordPressPost {
  id: number;
  date?: string;
  date_gmt?: string;
  slug?: string;
  link?: string;
  title?: { rendered?: string } | string;
  excerpt?: { rendered?: string } | string;
  content?: { rendered?: string } | string;
  categories?: number[];
}

export interface NormalizedNotice {
  wpPostId: number;
  departmentCode: string | null;
  title: string;
  slug: string;
  summary: string | null;
  contentMarkdown: string;
  category: NoticeCategory;
  priority: NoticePriority;
  isTicker: boolean;
  isPinned: boolean;
  attachmentUrl: string | null;
  attachmentUrls: string[];
  publishedAt: string;
}

export interface UpsertNoticeResult {
  slug: string;
  status: 'upserted' | 'skipped' | 'error';
  id?: string;
  reason?: string;
}

export interface RevalidateTagsResult {
  revalidated: boolean;
  tags: string[];
  reason?: string;
}

export interface SyncNoticesSummary {
  status: 'completed' | 'offline_fallback';
  fetchedCount: number;
  upsertedCount: number;
  skippedCount: number;
  errorCount: number;
  revalidated: boolean;
  warning?: string;
}

function isSupabaseAdminConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return false;
  if (url.includes('your-project-id') || serviceKey.includes('placeholder')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function normalizeHttpUrl(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl.trim());
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    const hostname = parsed.hostname.toLowerCase();
    if (
      parsed.protocol === 'http:' &&
      (hostname === 'gpcet.ac.in' || hostname.endsWith('.gpcet.ac.in'))
    ) {
      parsed.protocol = 'https:';
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function isPdfUrl(candidate: string): boolean {
  try {
    const parsed = new URL(candidate);
    return parsed.pathname.toLowerCase().endsWith('.pdf');
  } catch {
    return false;
  }
}

function getRenderedField(field: { rendered?: string } | string | undefined): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return typeof field.rendered === 'string' ? field.rendered : '';
}

function stripAvadaShortcodes(input: string): string {
  return input
    .replace(/\[\/?fusion_[^\]]*\]/gi, '')
    .replace(/\[\/?vc_[^\]]*\]/gi, '');
}

function slugifyTitle(title: string, fallbackId: number): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
  return base || `wp-notice-${fallbackId}`;
}

function inferNoticeCategory(text: string): NoticeCategory {
  const lower = text.toLowerCase();
  if (/\b(exam|examination|timetable|time table|supplementary|hall ticket|results?)\b/.test(lower)) {
    return 'examination';
  }
  if (/\b(admission|eapcet|ecet|icet|counseling|counselling|seat intake)\b/.test(lower)) {
    return 'admissions';
  }
  if (/\b(recruit|faculty|walk-in|interview|career|vacancy|vacancies)\b/.test(lower)) {
    return 'recruitment';
  }
  if (/\b(academic calendar|almanac)\b/.test(lower)) {
    return 'academic_calendar';
  }
  if (/\b(tender|quotation|procurement|rfp)\b/.test(lower)) {
    return 'tender';
  }
  if (/\b(naac|nba|iqac|nirf|statutory|ugc|aicte|rti|disclosure)\b/.test(lower)) {
    return 'statutory';
  }
  if (/\b(symposium|hackathon|workshop|seminar|conference|fest|invenio|webinar)\b/.test(lower)) {
    return 'event';
  }
  return 'circular';
}

function inferNoticePriority(text: string): NoticePriority {
  const lower = text.toLowerCase();
  if (/\b(urgent|immediate|last date|deadline|important|schedule)\b/.test(lower)) {
    return 'urgent';
  }
  if (/\b(exam|examination|admission|timetable|notification)\b/.test(lower)) {
    return 'high';
  }
  return 'normal';
}

function inferDepartmentCode(text: string): string | null {
  const lower = text.toLowerCase();
  if (/\b(computer science|cse)\b/.test(lower)) return 'cse';
  if (/\b(artificial intelligence|ai\s*&\s*ml|cai)\b/.test(lower)) return 'ai';
  if (/\b(electronics|ece)\b/.test(lower)) return 'ece';
  if (/\b(electrical|eee)\b/.test(lower)) return 'eee';
  if (/\b(mechanical|mech)\b/.test(lower)) return 'me';
  if (/\bcivil\b/.test(lower)) return 'civil';
  if (/\bmba\b/.test(lower)) return 'mba';
  if (/\b(humanities|h&s|basic science)\b/.test(lower)) return 'hs';
  return null;
}

function isRunningInWorkflowStep(): { active: boolean; attempt: number } {
  try {
    const meta = getStepMetadata();
    return { active: true, attempt: meta.attempt };
  } catch {
    return { active: false, attempt: 1 };
  }
}

/**
 * Step 1: Poll the legacy WordPress REST API for the latest posts.
 * Retries transient HTTP 429/5xx errors inside Workflow SDK and falls back
 * gracefully to an empty list when WP is unreachable offline.
 */
export async function fetchLatestWpPosts(options?: {
  perPage?: number;
  endpointUrl?: string;
}): Promise<WordPressPost[]> {
  "use step";

  const perPage = Math.min(50, Math.max(1, options?.perPage ?? 10));
  const baseUrl = options?.endpointUrl ?? WP_POSTS_ENDPOINT;
  const targetUrl = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}per_page=${perPage}`;

  console.info(`[sync-notices] Polling WordPress posts: ${targetUrl}`);

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'GPCET-NoticeSync/1.0 (+https://www.gpcet.ac.in)'
      },
      signal: AbortSignal.timeout(DEFAULT_FETCH_TIMEOUT_MS)
    });

    if (response.status === 429) {
      const stepCtx = isRunningInWorkflowStep();
      if (stepCtx.active && stepCtx.attempt < 3) {
        throw new RetryableError('WordPress REST API rate limited (429)', { retryAfter: '1m' });
      }
      console.warn('[sync-notices] WordPress REST API returned 429; returning empty fallback.');
      return [];
    }

    if (response.status >= 500) {
      const stepCtx = isRunningInWorkflowStep();
      if (stepCtx.active && stepCtx.attempt < 3) {
        throw new RetryableError(`WordPress upstream HTTP ${response.status}`, { retryAfter: '30s' });
      }
      console.warn(`[sync-notices] WordPress returned HTTP ${response.status}; returning empty fallback.`);
      return [];
    }

    if (!response.ok) {
      console.warn(`[sync-notices] WordPress returned non-OK status ${response.status}; skipping.`);
      return [];
    }

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) {
      console.warn('[sync-notices] Unexpected non-array WordPress REST payload.');
      return [];
    }

    console.info(`[sync-notices] Fetched ${payload.length} WordPress post(s).`);
    return payload as WordPressPost[];
  } catch (err) {
    if (err instanceof RetryableError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : String(err);
    const stepCtx = isRunningInWorkflowStep();
    if (stepCtx.active && stepCtx.attempt < 3) {
      throw new RetryableError(`WordPress fetch failed: ${message}`, { retryAfter: '30s' });
    }
    console.warn(`[sync-notices] Offline fallback triggered while fetching WordPress posts: ${message}`);
    return [];
  }
}

/**
 * Step 2: Strip Avada [fusion_*] shortcodes, extract embedded PDF attachments,
 * and convert sanitized HTML into clean GitHub-flavored Markdown.
 */
export async function cleanAndNormalizePost(post: WordPressPost): Promise<NormalizedNotice> {
  "use step";

  const rawTitleHtml = getRenderedField(post.title);
  const rawContentHtml = getRenderedField(post.content);
  const rawExcerptHtml = getRenderedField(post.excerpt);

  const $title = cheerio.load(stripAvadaShortcodes(rawTitleHtml));
  const title = $title.text().replace(/\s+/g, ' ').trim() || `Institutional Notice #${post.id}`;

  // Collect PDF links from both Avada shortcode attributes and anchor tags before stripping
  const pdfUrls = new Set<string>();
  const rawPdfMatches = rawContentHtml.match(/https?:\/\/[^\s"'<>]+\.pdf(?:\?[^\s"'<>]*)?/gi) ?? [];
  for (const match of rawPdfMatches) {
    const normalized = normalizeHttpUrl(match);
    if (normalized && isPdfUrl(normalized)) {
      pdfUrls.add(normalized);
    }
  }

  const cleanedHtml = stripAvadaShortcodes(rawContentHtml);
  const $ = cheerio.load(cleanedHtml);

  // Remove executable / non-content tags prior to Markdown conversion
  $('script, style, iframe, object, embed, noscript').remove();

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    const normalized = normalizeHttpUrl(href);
    if (normalized) {
      $(el).attr('href', normalized);
      if (isPdfUrl(normalized)) {
        pdfUrls.add(normalized);
      }
    }
  });

  const turndown = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced'
  });
  turndown.use(gfm);

  const sanitizedBodyHtml = $('body').html() || $.root().html() || '';
  const contentMarkdown = turndown.turndown(sanitizedBodyHtml).trim() || title;

  const $excerpt = cheerio.load(stripAvadaShortcodes(rawExcerptHtml));
  $excerpt('script, style').remove();
  const excerptText = $excerpt.text().replace(/\s+/g, ' ').trim();
  const fallbackSummary = contentMarkdown.replace(/[#*_`>\[\]()!-]+/g, ' ').replace(/\s+/g, ' ').trim();
  const summarySource = excerptText || fallbackSummary;
  const summary = summarySource ? summarySource.slice(0, 500) : null;

  const combinedText = `${title} ${summary ?? ''} ${contentMarkdown}`;
  const category = inferNoticeCategory(combinedText);
  const priority = inferNoticePriority(combinedText);
  const departmentCode = inferDepartmentCode(combinedText);

  const rawSlug = typeof post.slug === 'string' && post.slug.trim() ? post.slug.trim() : '';
  const slug = (rawSlug || slugifyTitle(title, post.id)).slice(0, 500);

  const parsedDate = post.date_gmt || post.date;
  const publishedAt =
    parsedDate && !Number.isNaN(Date.parse(parsedDate))
      ? new Date(parsedDate).toISOString()
      : new Date().toISOString();

  const attachmentUrls = Array.from(pdfUrls);
  const attachmentUrl = attachmentUrls[0] ?? null;

  console.info(`[sync-notices] Normalized post "${slug}" (category=${category}, pdfs=${attachmentUrls.length})`);

  return {
    wpPostId: post.id,
    departmentCode,
    title: title.slice(0, 500),
    slug,
    summary,
    contentMarkdown,
    category,
    priority,
    isTicker: priority === 'urgent' || category === 'examination' || category === 'admissions',
    isPinned: priority === 'urgent',
    attachmentUrl,
    attachmentUrls,
    publishedAt
  };
}

/**
 * Step 3: Upsert a normalized notice record into the Supabase `notices` table.
 * Gracefully skips when Supabase administrative credentials are absent or placeholders.
 */
export async function upsertNoticeRecord(cleanedNotice: NormalizedNotice): Promise<UpsertNoticeResult> {
  "use step";

  if (!isSupabaseAdminConfigured()) {
    console.info(`[sync-notices] Offline mode: skipping Supabase upsert for "${cleanedNotice.slug}".`);
    return {
      slug: cleanedNotice.slug,
      status: 'skipped',
      reason: 'offline_mode'
    };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('notices')
      .upsert(
        {
          department_code: cleanedNotice.departmentCode,
          title: cleanedNotice.title.slice(0, 500),
          slug: cleanedNotice.slug.slice(0, 500),
          summary: cleanedNotice.summary ? cleanedNotice.summary.slice(0, 500) : null,
          content_markdown: cleanedNotice.contentMarkdown || cleanedNotice.title,
          category: cleanedNotice.category,
          priority: cleanedNotice.priority,
          is_ticker: cleanedNotice.isTicker,
          is_pinned: cleanedNotice.isPinned,
          attachment_url: cleanedNotice.attachmentUrl,
          published_at: cleanedNotice.publishedAt,
          is_active: true
        },
        { onConflict: 'slug' }
      )
      .select('id, slug')
      .single();

    if (error) {
      console.error(`[sync-notices] Supabase upsert error for "${cleanedNotice.slug}": ${error.message}`);
      return {
        slug: cleanedNotice.slug,
        status: 'error',
        reason: error.message
      };
    }

    console.info(`[sync-notices] Upserted notice "${cleanedNotice.slug}" (id=${data?.id}).`);
    return {
      slug: cleanedNotice.slug,
      status: 'upserted',
      id: data?.id
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[sync-notices] Failed upserting notice "${cleanedNotice.slug}": ${message}`);
    return {
      slug: cleanedNotice.slug,
      status: 'error',
      reason: message
    };
  }
}

/**
 * Step 4: Revalidate Next.js cache tags for notices and academic documents.
 * Safely handles invocation outside a Next.js request context (e.g., Node tests).
 */
export async function revalidateApplicationTags(): Promise<RevalidateTagsResult> {
  "use step";

  const tags = ['notices', 'documents'];
  try {
    revalidateTag('notices');
    revalidateTag('documents');
    console.info('[sync-notices] Revalidated Next.js cache tags: notices, documents.');
    return { revalidated: true, tags };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.info(`[sync-notices] Skipped revalidateTag outside Next.js runtime: ${message}`);
    return {
      revalidated: false,
      tags,
      reason: message
    };
  }
}

/**
 * Durable Workflow Orchestrator: Polls WordPress circulars, normalizes HTML/shortcodes
 * into Markdown, upserts into Supabase, and invalidates Next.js cache tags.
 */
export async function syncNoticesWorkflow(): Promise<SyncNoticesSummary> {
  "use workflow";

  console.info('[sync-notices] Starting durable WordPress notice sync workflow.');

  let posts: WordPressPost[] = [];
  try {
    posts = await fetchLatestWpPosts({ perPage: 10 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[sync-notices] Workflow caught upstream fetch error, returning offline fallback: ${message}`);
    return {
      status: 'offline_fallback',
      fetchedCount: 0,
      upsertedCount: 0,
      skippedCount: 0,
      errorCount: 0,
      revalidated: false,
      warning: message
    };
  }

  let upsertedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const post of posts) {
    const cleaned = await cleanAndNormalizePost(post);
    const result = await upsertNoticeRecord(cleaned);
    if (result.status === 'upserted') {
      upsertedCount += 1;
    } else if (result.status === 'skipped') {
      skippedCount += 1;
    } else {
      errorCount += 1;
    }
  }

  const revalidation = await revalidateApplicationTags();

  console.info(
    `[sync-notices] Sync complete: fetched=${posts.length}, upserted=${upsertedCount}, skipped=${skippedCount}, errors=${errorCount}`
  );

  return {
    status: posts.length === 0 ? 'offline_fallback' : 'completed',
    fetchedCount: posts.length,
    upsertedCount,
    skippedCount,
    errorCount,
    revalidated: revalidation.revalidated
  };
}
