import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { normalizeCadre, DEPARTMENTS, generateSeedSql } from '../scripts/seed-supabase.js';

test('Cadre normalization maps all real designations cleanly', () => {
  assert.strictEqual(normalizeCadre('Professor & Dean'), 'professor_hod');
  assert.strictEqual(normalizeCadre('Professor'), 'professor');
  assert.strictEqual(normalizeCadre('HOD CSE', true), 'professor_hod');
  assert.strictEqual(normalizeCadre('Associate Professor'), 'associate_professor');
  assert.strictEqual(normalizeCadre('ASSISTANT PROF'), 'assistant_professor');
  assert.strictEqual(normalizeCadre('TEACHING ASST'), 'assistant_professor');
  assert.strictEqual(normalizeCadre('Technical Assistant'), 'technical_staff');
  assert.strictEqual(normalizeCadre('Lab Programmer'), 'technical_staff');
  assert.strictEqual(normalizeCadre('Adjunct Faculty'), 'adjunct_faculty');
  assert.strictEqual(normalizeCadre(''), 'assistant_professor');
});

test('All 452 scraped faculty records have valid structure and normalize cleanly', () => {
  const facultyDir = path.join(process.cwd(), 'src', 'data', 'faculty');
  const files = fs.readdirSync(facultyDir).filter(f => f.endsWith('.json'));

  let totalCount = 0;
  for (const file of files) {
    const records = JSON.parse(fs.readFileSync(path.join(facultyDir, file), 'utf8'));
    assert(Array.isArray(records), `${file} should contain an array`);
    totalCount += records.length;

    for (const member of records) {
      assert(member.name && member.name.trim().length > 0, `Faculty member must have a name in ${file}`);
      assert(typeof member.sno === 'number', `Faculty member must have an integer sno`);
      const cadre = normalizeCadre(member.designation);
      assert(['professor_hod', 'professor', 'associate_professor', 'assistant_professor', 'adjunct_faculty', 'technical_staff', 'administrative'].includes(cadre));
    }
  }

  assert.strictEqual(totalCount, 452, 'Expected exactly 452 faculty records across 8 departments');
});

test('Canonical departments cover all 8 academic branches with valid data', () => {
  assert.strictEqual(DEPARTMENTS.length, 8);
  const codes = DEPARTMENTS.map(d => d.code);
  const expectedCodes = ['cse', 'ai', 'ece', 'eee', 'me', 'civil', 'hs', 'mba'];
  for (const exp of expectedCodes) {
    assert(codes.includes(exp), `Expected department code ${exp} to be present`);
  }

  for (const dept of DEPARTMENTS) {
    assert(dept.establishedYear >= 1990 && dept.establishedYear <= 2026);
    assert(dept.vision && dept.vision.length > 20);
    assert(Array.isArray(dept.mission) && dept.mission.length > 0);
    assert(dept.contactEmail.includes('@gpcet.ac.in'));
  }
});

test('Deterministic seed SQL generator produces non-empty output for all 452 faculty', () => {
  const res = generateSeedSql();
  assert.strictEqual(res.totalFaculty, 452);
  assert(res.totalPriorityDocs > 0);
  assert(res.sql.includes('INSERT INTO public.departments'));
  assert(res.sql.includes('INSERT INTO public.faculty'));
  assert(res.sql.includes('INSERT INTO public.academic_documents'));
});
