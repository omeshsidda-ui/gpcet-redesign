import test from 'node:test';
import assert from 'node:assert';
import { getFacultyRoster, getFacultyBySlug, getDepartmentHod } from '../src/lib/data/faculty.js';
import { searchDocuments, getDocumentStats } from '../src/lib/data/documents.js';
import { getAllDepartments, getDepartmentByCode } from '../src/lib/data/departments.js';
import { getActiveNotices } from '../src/lib/data/notices.js';

test('getFacultyRoster returns all 452 faculty on default hybrid read', async () => {
  const result = await getFacultyRoster({ limit: 500 });
  assert.strictEqual(result.meta.total, 452);
  assert.strictEqual(result.data.length, 452);
  assert.strictEqual(result.meta.hasMore, false);
});

test('getFacultyRoster filters by department correctly', async () => {
  const cseRes = await getFacultyRoster({ department: 'cse', limit: 100 });
  assert.strictEqual(cseRes.meta.total, 72);
  assert(cseRes.data.every(f => f.departmentCode === 'cse'));

  const civilRes = await getFacultyRoster({ department: 'civil', limit: 100 });
  assert.strictEqual(civilRes.meta.total, 96);
  assert(civilRes.data.every(f => f.departmentCode === 'civil'));
});

test('getFacultyRoster filters by query string', async () => {
  const queryRes = await getFacultyRoster({ q: 'Srilakshmi' });
  assert(queryRes.data.length >= 1);
  assert(queryRes.data.some(f => f.name.includes('SRILAKSHMI')));
});

test('getDepartmentHod returns department HOD or Dean', async () => {
  const cseHod = await getDepartmentHod('cse');
  assert(cseHod !== null);
  assert.strictEqual(cseHod.departmentCode, 'cse');
  assert(cseHod.isHod === true);
});

test('searchDocuments searches across 5,822 cataloged documents with pagination', async () => {
  const stats = await getDocumentStats();
  assert.strictEqual(stats.totalMediaCount, 5822);
  assert(stats.categories.syllabus > 0);

  const syllabusRes = await searchDocuments({ category: 'syllabus', limit: 10 });
  assert.strictEqual(syllabusRes.data.length, 10);
  assert(syllabusRes.meta.total >= 382);
  assert(syllabusRes.data.every(d => d.category === 'syllabus'));
});

test('getAllDepartments returns all 8 canonical departments', async () => {
  const depts = await getAllDepartments();
  assert.strictEqual(depts.length, 8);

  const cse = await getDepartmentByCode('cse');
  assert.strictEqual(cse.name, 'Computer Science and Engineering');
  assert.strictEqual(cse.nbaAccredited, true);
});

test('getActiveNotices filters ticker and categories', async () => {
  const allNotices = await getActiveNotices();
  assert(allNotices.length > 0);

  const tickerOnly = await getActiveNotices({ tickerOnly: true });
  assert(tickerOnly.every(n => n.isTicker));
});
