import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { generateSeedSql } from '../scripts/seed-supabase.js';

const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');

test('all four Supabase migrations exist and are non-empty', () => {
  const expectedMigrations = [
    '20261102000001_core_schema.sql',
    '20261102000002_indexes.sql',
    '20261102000003_rls_policies.sql',
    '20261102000004_triggers.sql'
  ];

  for (const mig of expectedMigrations) {
    const fullPath = path.join(migrationsDir, mig);
    assert.ok(fs.existsSync(fullPath), `Migration file ${mig} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert.ok(content.length > 500, `Migration ${mig} should be populated`);
  }
});

test('20261102000001_core_schema.sql defines all seven institutional tables and enums', () => {
  const content = fs.readFileSync(path.join(migrationsDir, '20261102000001_core_schema.sql'), 'utf8');
  assert.ok(content.includes('CREATE TABLE IF NOT EXISTS public.departments'));
  assert.ok(content.includes('CREATE TABLE IF NOT EXISTS public.academic_regulations'));
  assert.ok(content.includes('CREATE TABLE IF NOT EXISTS public.faculty'));
  assert.ok(content.includes('CREATE TABLE IF NOT EXISTS public.academic_documents'));
  assert.ok(content.includes('CREATE TABLE IF NOT EXISTS public.notices'));
  assert.ok(content.includes('CREATE TABLE IF NOT EXISTS public.admissions_inquiries'));
  assert.ok(content.includes('CREATE TABLE IF NOT EXISTS public.audit_logs'));

  // Verify full-text search tsvector generated columns
  assert.ok(content.includes('fts_vector tsvector GENERATED ALWAYS AS'));
  // Verify audit_logs record_id is TEXT (to support string code 'cse' and UUIDs)
  assert.ok(content.includes('record_id TEXT NOT NULL'));
});

test('20261102000003_rls_policies.sql enables RLS on all tables and uses secure app_metadata', () => {
  const content = fs.readFileSync(path.join(migrationsDir, '20261102000003_rls_policies.sql'), 'utf8');
  assert.ok(content.includes('ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY'));
  assert.ok(content.includes('ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY'));
  assert.ok(content.includes('ALTER TABLE public.admissions_inquiries ENABLE ROW LEVEL SECURITY'));
  assert.ok(content.includes("auth.jwt() -> 'app_metadata' ->> 'role'"));
  assert.ok(content.includes('CREATE POLICY "Public can submit inquiries"'));
});

test('generateSeedSql produces seed SQL with 452 faculty and 8 departments', () => {
  const seed = generateSeedSql();
  assert.strictEqual(seed.totalFaculty, 452);
  assert.strictEqual(seed.manifestTotal, 5822);
  assert.ok(seed.sql.includes("VALUES ('cse', 'Computer Science and Engineering'"));
  assert.ok(seed.sql.includes('INSERT INTO public.faculty'));
});
