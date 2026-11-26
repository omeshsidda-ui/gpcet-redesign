import test from 'node:test';
import assert from 'node:assert';
import {
  cleanAndNormalizePost,
  fetchLatestWpPosts,
  upsertNoticeRecord,
  revalidateApplicationTags,
  syncNoticesWorkflow
} from '../src/lib/workflow/sync-notices';
import { POST as postSyncNotices } from '../src/app/api/v1/admin/sync/notices/route';
import { getTickerNotices, getNoticeBySlug } from '../src/lib/data/notices.js';

test('cleanAndNormalizePost strips Avada shortcodes, extracts PDF links, and converts HTML to Markdown', async () => {
  const sampleWpPost = {
    id: 4210,
    date_gmt: '2026-10-20T10:30:00',
    slug: 'r23-end-semester-examination-timetable',
    title: { rendered: 'R23 End Semester <strong>Examination</strong> Timetable' },
    excerpt: { rendered: '<p>Download the R23 examination schedule for B.Tech CSE &amp; ECE.</p>' },
    content: {
      rendered: `
        [fusion_builder_container][fusion_builder_row][fusion_text]
        <h2>Autonomous Examination Notice</h2>
        <p>Students of <strong>CSE</strong> can download the timetable below.</p>
        [fusion_button link="http://www.gpcet.ac.in/wp-content/uploads/2026/10/r23-timetable.pdf"]Download PDF[/fusion_button]
        <p><a href="https://www.gpcet.ac.in/wp-content/uploads/2026/10/r23-timetable.pdf">Direct Link</a></p>
        <script>alert("xss")</script>
        [/fusion_text][/fusion_builder_row][/fusion_builder_container]
      `
    }
  };

  const normalized = await cleanAndNormalizePost(sampleWpPost);

  assert.strictEqual(normalized.slug, 'r23-end-semester-examination-timetable');
  assert.strictEqual(normalized.title, 'R23 End Semester Examination Timetable');
  assert.strictEqual(normalized.category, 'examination');
  assert.strictEqual(normalized.departmentCode, 'cse');
  assert.strictEqual(normalized.isTicker, true);
  assert.strictEqual(
    normalized.attachmentUrl,
    'https://www.gpcet.ac.in/wp-content/uploads/2026/10/r23-timetable.pdf'
  );
  assert.ok(!normalized.contentMarkdown.includes('[fusion_'));
  assert.ok(!normalized.contentMarkdown.includes('<script>'));
  assert.ok(normalized.contentMarkdown.includes('## Autonomous Examination Notice'));
  assert.ok(normalized.contentMarkdown.includes('**CSE**'));
});

test('fetchLatestWpPosts returns graceful offline fallback when endpoint is unreachable', async () => {
  const posts = await fetchLatestWpPosts({
    perPage: 5,
    endpointUrl: 'http://127.0.0.1:1/unreachable-wp-endpoint'
  });

  assert.ok(Array.isArray(posts));
  assert.strictEqual(posts.length, 0);
});

test('upsertNoticeRecord skips gracefully in offline mode', async () => {
  const result = await upsertNoticeRecord({
    wpPostId: 1,
    departmentCode: null,
    title: 'Offline Test Notice',
    slug: 'offline-test-notice',
    summary: 'Summary',
    contentMarkdown: 'Markdown body',
    category: 'circular',
    priority: 'normal',
    isTicker: false,
    isPinned: false,
    attachmentUrl: null,
    attachmentUrls: [],
    publishedAt: new Date().toISOString()
  });

  assert.strictEqual(result.status, 'skipped');
  assert.strictEqual(result.reason, 'offline_mode');
});

test('revalidateApplicationTags handles missing Next.js cache context cleanly', async () => {
  const result = await revalidateApplicationTags();
  assert.deepStrictEqual(result.tags, ['notices', 'documents']);
  assert.strictEqual(typeof result.revalidated, 'boolean');
});

test('notices data adapter exposes getTickerNotices and getNoticeBySlug with offline fallback', async () => {
  const ticker = await getTickerNotices(5);
  assert.ok(Array.isArray(ticker));
  assert.ok(ticker.length > 0);
  assert.ok(ticker.every(n => n.isTicker));

  const notice = await getNoticeBySlug('eapcet-admissions-schedule-2026');
  assert.ok(notice !== null);
  assert.strictEqual(notice.slug, 'eapcet-admissions-schedule-2026');
  assert.ok(typeof notice.contentMarkdown === 'string' && notice.contentMarkdown.length > 0);

  const missing = await getNoticeBySlug('non-existent-notice-slug');
  assert.strictEqual(missing, null);
});

test('POST /api/v1/admin/sync/notices rejects unauthenticated requests with RFC 9457 401', async () => {
  const req = new Request('http://localhost:3000/api/v1/admin/sync/notices', {
    method: 'POST'
  });

  const res = await postSyncNotices(req);
  assert.strictEqual(res.status, 401);
  assert.strictEqual(res.headers.get('content-type'), 'application/problem+json');

  const problem = await res.json();
  assert.strictEqual(problem.status, 401);
  assert.strictEqual(problem.code, 'UNAUTHORIZED');
});

test('POST /api/v1/admin/sync/notices accepts valid ADMIN_SYNC_TOKEN and returns 202 Accepted', async () => {
  const originalToken = process.env.ADMIN_SYNC_TOKEN;
  process.env.ADMIN_SYNC_TOKEN = 'test-sync-secret-token-12345';

  try {
    const badReq = new Request('http://localhost:3000/api/v1/admin/sync/notices', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer wrong-token'
      }
    });
    const badRes = await postSyncNotices(badReq);
    assert.strictEqual(badRes.status, 401);

    const goodReq = new Request('http://localhost:3000/api/v1/admin/sync/notices', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-sync-secret-token-12345'
      }
    });
    const goodRes = await postSyncNotices(goodReq);
    assert.strictEqual(goodRes.status, 202);

    const json = await goodRes.json();
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.status, 'accepted');
    assert.ok(typeof json.data.workflowRunId === 'string' && json.data.workflowRunId.length > 0);
  } finally {
    if (originalToken === undefined) {
      delete process.env.ADMIN_SYNC_TOKEN;
    } else {
      process.env.ADMIN_SYNC_TOKEN = originalToken;
    }
  }
});

test('syncNoticesWorkflow function exports cleanly', () => {
  assert.strictEqual(typeof syncNoticesWorkflow, 'function');
});
