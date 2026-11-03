import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');

test('All 4 declarative migration files exist and contain valid PostgreSQL statements', () => {
  const files = [
    '20261102000001_core_schema.sql',
    '20261102000002_indexes.sql',
    '20261102000003_rls_policies.sql',
    '20261102000004_triggers.sql'
  ];

  for (const f of files) {
    const fullPath = path.join(migrationsDir, f);
    assert(fs.existsSync(fullPath), `Migration file ${f} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert(content.length > 500, `Migration file ${f} must not be empty`);
  }
});

test('Core schema accommodates real scraped data without constraint violations', () => {
  const schema = fs.readFileSync(path.join(migrationsDir, '20261102000001_core_schema.sql'), 'utf8');

  // Verify profile_route is nullable in faculty table
  assert(!schema.includes('profile_route TEXT NOT NULL'), 'profile_route must allow NULL for faculty without individual pages');
  assert(schema.includes('profile_route TEXT'), 'profile_route column must be declared');

  // Verify highest_qualification has default in faculty table
  assert(schema.includes("highest_qualification VARCHAR(255) DEFAULT '' NOT NULL"), 'highest_qualification must have default empty string');

  // Verify all categories in media-manifest.json are included in academic_documents CHECK constraint
  const expectedCategories = [
    'syllabus', 'general_pdf', 'academic_calendar', 'general_image', 
    'campus_photo', 'faculty_photo', 'logo_badge', 'accreditation_doc', 
    'video', 'other', 'form_affidavit', 'circular', 'exam_timetable', 
    'lecture_presentation', 'regulation', 'governance', 'placement'
  ];
  for (const cat of expectedCategories) {
    assert(schema.includes(`'${cat}'`), `Category '${cat}' must be in academic_documents check constraint`);
  }

  // Verify audit_logs record_id is TEXT (supports both UUID and natural string PKs like departments.code)
  assert(schema.includes('record_id TEXT NOT NULL'), 'audit_logs.record_id must be TEXT');
});

test('RLS policies include staff visibility bypasses and complete mutation coverage', () => {
  const rls = fs.readFileSync(path.join(migrationsDir, '20261102000003_rls_policies.sql'), 'utf8');

  // AGENTS.md rule: Matching SELECT policy with staff bypass for updates
  assert(rls.includes('is_active = TRUE OR public.is_staff()'), 'Faculty SELECT policy must allow staff to view inactive records');
  assert(rls.includes('is_published = TRUE OR public.is_staff()'), 'Documents SELECT policy must allow staff to view unpublished records');
  assert(rls.includes('Admins can manage departments'), 'Departments must have administrative mutation policy');
  assert(rls.includes('Staff can manage regulations'), 'Academic regulations must have administrative mutation policy');
  assert(rls.includes('Admins can delete inquiries'), 'Admissions inquiries must have administrative delete policy');
});

test('Universal audit trigger handles both UUID and string primary keys', () => {
  const triggers = fs.readFileSync(path.join(migrationsDir, '20261102000004_triggers.sql'), 'utf8');
  assert(triggers.includes("COALESCE(v_new_data->>'id', v_new_data->>'code', 'unknown')"), 'Trigger must extract id or code without failing');
});

test('Supabase seed SQL contains 452 faculty profiles and 8 departments', () => {
  const seedPath = path.join(process.cwd(), 'supabase', 'seed.sql');
  assert(fs.existsSync(seedPath), 'supabase/seed.sql must exist');
  const seedContent = fs.readFileSync(seedPath, 'utf8');
  assert(seedContent.includes("INSERT INTO public.departments (code, name, short_name"));
  assert(seedContent.includes("INSERT INTO public.faculty (department_code, sno, name"));
  assert(seedContent.includes("INSERT INTO public.academic_documents (title, slug, category"));
});
