import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { generateSearchIndex } from '../scripts/build-search-index.js';
import {
  loadSearchIndex,
  searchDocumentsClient,
  isSearchIndexLoaded,
  resetSearchClient
} from '../src/lib/search/search-client.ts';
import { getStoragePath, runAssetMigration } from '../scripts/migrate-assets-to-supabase.js';

test('build-search-index generates lean MiniSearch index under 180 KB', () => {
  const result = generateSearchIndex();

  assert.ok(fs.existsSync(result.outputPath));
  assert.ok(result.totalIndexed >= 700, `Expected at least 700 indexed docs, got ${result.totalIndexed}`);
  assert.ok(result.sizeKb < 180, `Expected search index < 180 KB, got ${result.sizeKb} KB`);
  assert.ok(result.sizeKb < 200, `Acceptance gate requires < 200 KB, got ${result.sizeKb} KB`);

  // Verify JSON structure is valid
  const raw = fs.readFileSync(result.outputPath, 'utf8');
  const parsed = JSON.parse(raw);
  assert.ok(parsed.index);
  assert.ok(parsed.documentIds);
});

test('search-client lazily loads and searches core documents in sub-15ms', async () => {
  resetSearchClient();
  assert.strictEqual(isSearchIndexLoaded(), false);

  const startLoad = performance.now();
  await loadSearchIndex();
  const loadDuration = performance.now() - startLoad;
  assert.strictEqual(isSearchIndexLoaded(), true);
  assert.ok(loadDuration < 100, `Index loading took ${loadDuration}ms`);

  // Keystroke query
  const startQuery = performance.now();
  const results = await searchDocumentsClient('syllabus');
  const queryDuration = performance.now() - startQuery;

  assert.ok(results.length > 0);
  assert.ok(queryDuration < 15, `Keystroke query took ${queryDuration}ms (expected < 15ms)`);

  // Category filter
  const calendarResults = await searchDocumentsClient('academic', { category: 'academic_calendar' });
  assert.ok(calendarResults.length > 0);
  assert.ok(calendarResults.every(r => r.category === 'academic_calendar'));

  // Department filter
  const cseResults = await searchDocumentsClient('computer', { dept: 'cse' });
  assert.ok(cseResults.every(r => r.dept === 'cse'));
});

test('migrate-assets-to-supabase formats paths and executes dry-run cleanly', async () => {
  // Test storage path normalization
  const path1 = getStoragePath({ id: 101, filename: 'CSE-R20-Syllabus.pdf', category: 'syllabus' });
  assert.strictEqual(path1, 'syllabus/CSE-R20-Syllabus.pdf');

  const path2 = getStoragePath({ id: 202, filename: 'Special! & Unsafe# Characters@.pdf', category: 'circular' });
  assert.strictEqual(path2, 'circular/Special____Unsafe__Characters_.pdf');

  // Test dry-run migration
  const summary = await runAssetMigration({ dryRun: true, limit: 15 });
  assert.strictEqual(summary.totalSelected, 15);
  assert.strictEqual(summary.uploaded, 15);
  assert.strictEqual(summary.failed, 0);
  assert.strictEqual(summary.errors.length, 0);
});
