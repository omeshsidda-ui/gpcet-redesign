import test from 'node:test';
import assert from 'node:assert';
import { GET as getHealth } from '../src/app/api/v1/health/route.ts';
import { GET as getFaculty } from '../src/app/api/v1/faculty/route.ts';
import { GET as getFacultyBySlug } from '../src/app/api/v1/faculty/[slug]/route.ts';
import { GET as getDocuments } from '../src/app/api/v1/documents/route.ts';
import { GET as getNotices } from '../src/app/api/v1/notices/route.ts';
import { POST as postInquiry } from '../src/app/api/v1/inquiries/route.ts';
import { GET as getAssetProxy } from '../src/app/api/v1/assets/proxy/route.ts';

test('GET /api/v1/health returns liveness probe and offline cache status', async () => {
  const req = new Request('http://localhost:3000/api/v1/health');
  const res = await getHealth(req);

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.headers.get('content-type'), 'application/json');
  assert.strictEqual(res.headers.get('cache-control'), 'no-store, no-cache');

  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(['healthy', 'degraded'].includes(json.data.status));
  assert.strictEqual(json.data.version, '1.0.0');
  assert.strictEqual(json.data.offlineCache.facultyCount, 452);
  assert.strictEqual(json.data.offlineCache.documentCount, 5822);
  assert.ok(json.data.timestamp);
});

test('GET /api/v1/faculty returns paginated roster and adheres to cache headers', async () => {
  const req = new Request('http://localhost:3000/api/v1/faculty?limit=20');
  const res = await getFaculty(req);

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.headers.get('content-type'), 'application/json');
  assert.ok(res.headers.get('cache-control')?.includes('s-maxage=3600'));

  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.strictEqual(json.data.length, 20);
  assert.strictEqual(json.meta.total, 452);
  assert.strictEqual(json.meta.limit, 20);
  assert.strictEqual(json.meta.hasMore, true);
});

test('GET /api/v1/faculty filters by department and query', async () => {
  const cseReq = new Request('http://localhost:3000/api/v1/faculty?department=cse&limit=100');
  const cseRes = await getFaculty(cseReq);
  const cseJson = await cseRes.json();

  assert.strictEqual(cseJson.meta.total, 72);
  assert.ok(cseJson.data.every(f => f.departmentCode === 'cse'));

  const searchReq = new Request('http://localhost:3000/api/v1/faculty?q=sreenivasulu');
  const searchRes = await getFaculty(searchReq);
  const searchJson = await searchRes.json();
  assert.ok(searchJson.data.length >= 1);
});

test('GET /api/v1/faculty returns RFC 9457 Problem Details on invalid query parameters', async () => {
  const req = new Request('http://localhost:3000/api/v1/faculty?department=invalid_dept');
  const res = await getFaculty(req);

  assert.strictEqual(res.status, 422);
  assert.strictEqual(res.headers.get('content-type'), 'application/problem+json');

  const problem = await res.json();
  assert.strictEqual(problem.status, 422);
  assert.strictEqual(problem.code, 'VALIDATION_FAILED');
  assert.strictEqual(problem.type, 'https://gpcet.ac.in/problems/validation-error');
  assert.ok(Array.isArray(problem.errors));
  assert.strictEqual(problem.errors[0].field, 'department');
});

test('GET /api/v1/faculty/[slug] returns scholar dossier or RFC 9457 404', async () => {
  // 1. Existing faculty
  const reqValid = new Request('http://localhost:3000/api/v1/faculty/k-sreenivasulu');
  const resValid = await getFacultyBySlug(reqValid, { params: Promise.resolve({ slug: 'k-sreenivasulu' }) });

  assert.strictEqual(resValid.status, 200);
  const jsonValid = await resValid.json();
  assert.strictEqual(jsonValid.success, true);
  assert.ok(jsonValid.data.name.includes('SREENIVASULU'));

  // 2. Non-existing faculty
  const reqInvalid = new Request('http://localhost:3000/api/v1/faculty/non-existent-faculty-xyz');
  const resInvalid = await getFacultyBySlug(reqInvalid, { params: Promise.resolve({ slug: 'non-existent-faculty-xyz' }) });

  assert.strictEqual(resInvalid.status, 404);
  assert.strictEqual(resInvalid.headers.get('content-type'), 'application/problem+json');
  const problem = await resInvalid.json();
  assert.strictEqual(problem.code, 'NOT_FOUND');
  assert.strictEqual(problem.status, 404);
});

test('GET /api/v1/documents searches across 5,822 documents with pagination', async () => {
  const req = new Request('http://localhost:3000/api/v1/documents?category=syllabus&limit=15');
  const res = await getDocuments(req);

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.headers.get('content-type'), 'application/json');

  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.strictEqual(json.data.length, 15);
  assert.ok(json.meta.total >= 382);
  assert.ok(json.data.every(d => d.category === 'syllabus'));
});

test('GET /api/v1/documents returns RFC 9457 Problem Details on invalid category', async () => {
  const req = new Request('http://localhost:3000/api/v1/documents?category=unknown_category');
  const res = await getDocuments(req);

  assert.strictEqual(res.status, 422);
  assert.strictEqual(res.headers.get('content-type'), 'application/problem+json');

  const problem = await res.json();
  assert.strictEqual(problem.code, 'VALIDATION_FAILED');
  assert.strictEqual(problem.errors[0].field, 'category');
});

test('GET /api/v1/notices returns active notices and filters ticker alerts', async () => {
  const reqAll = new Request('http://localhost:3000/api/v1/notices');
  const resAll = await getNotices(reqAll);
  assert.strictEqual(resAll.status, 200);
  const jsonAll = await resAll.json();
  assert.ok(jsonAll.data.length > 0);

  const reqTicker = new Request('http://localhost:3000/api/v1/notices?tickerOnly=true');
  const resTicker = await getNotices(reqTicker);
  const jsonTicker = await resTicker.json();
  assert.ok(jsonTicker.data.every(n => n.isTicker));
});

test('POST /api/v1/inquiries accepts valid admission submission', async () => {
  const payload = {
    studentName: 'Ananya Reddy',
    email: 'ananya.reddy@gmail.com',
    phone: '+919876543210',
    desiredDepartment: 'cse',
    program: 'B.Tech',
    eamcetRank: 8450,
    message: 'Seeking admission in CSE Artificial Intelligence and Machine Learning.',
    botCheck: ''
  };

  const req = new Request('http://localhost:3000/api/v1/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '203.0.113.195'
    },
    body: JSON.stringify(payload)
  });

  const res = await postInquiry(req);
  assert.strictEqual(res.status, 201);
  const json = await res.json();
  assert.strictEqual(json.success, true);
  assert.ok(json.data.inquiryId);
  assert.strictEqual(json.data.status, 'received');
});

test('POST /api/v1/inquiries rejects honeypot spam bot with RFC 9457 422', async () => {
  const botPayload = {
    studentName: 'Spam Bot',
    email: 'bot@spam.com',
    phone: '+919876543210',
    desiredDepartment: 'cse',
    program: 'B.Tech',
    botCheck: 'I am a malicious bot filling hidden fields'
  };

  const req = new Request('http://localhost:3000/api/v1/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '198.51.100.22'
    },
    body: JSON.stringify(botPayload)
  });

  const res = await postInquiry(req);
  assert.strictEqual(res.status, 422);
  assert.strictEqual(res.headers.get('content-type'), 'application/problem+json');

  const problem = await res.json();
  assert.strictEqual(problem.code, 'VALIDATION_FAILED');
  assert.strictEqual(problem.errors[0].field, 'botCheck');
});

test('POST /api/v1/inquiries returns RFC 9457 400 on malformed JSON', async () => {
  const req = new Request('http://localhost:3000/api/v1/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: '{"invalid-json: none'
  });

  const res = await postInquiry(req);
  assert.strictEqual(res.status, 400);
  assert.strictEqual(res.headers.get('content-type'), 'application/problem+json');
  const problem = await res.json();
  assert.strictEqual(problem.code, 'BAD_REQUEST');
});

test('GET /api/v1/assets/proxy enforces SSRF protection and hostname allowlist', async () => {
  // 1. Missing URL
  const reqMissing = new Request('http://localhost:3000/api/v1/assets/proxy');
  const resMissing = await getAssetProxy(reqMissing);
  assert.strictEqual(resMissing.status, 400);
  const probMissing = await resMissing.json();
  assert.strictEqual(probMissing.code, 'BAD_REQUEST');

  // 2. Disallowed Hostname (evil.com)
  const reqEvil = new Request('http://localhost:3000/api/v1/assets/proxy?url=https://evil.com/exploit.pdf');
  const resEvil = await getAssetProxy(reqEvil);
  assert.strictEqual(resEvil.status, 403);
  assert.strictEqual(resEvil.headers.get('content-type'), 'application/problem+json');
  const probEvil = await resEvil.json();
  assert.strictEqual(probEvil.code, 'FORBIDDEN');

  // 3. Subdomain confusion trick (attacker-gpcet.ac.in)
  const reqTrick = new Request('http://localhost:3000/api/v1/assets/proxy?url=https://attacker-gpcet.ac.in/fake.pdf');
  const resTrick = await getAssetProxy(reqTrick);
  assert.strictEqual(resTrick.status, 403);

  // 4. Localhost / internal IP address SSRF attempt
  const reqLocal = new Request('http://localhost:3000/api/v1/assets/proxy?url=http://127.0.0.1:8080/secret');
  const resLocal = await getAssetProxy(reqLocal);
  assert.strictEqual(resLocal.status, 403);
});
