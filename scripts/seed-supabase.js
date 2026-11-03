import fs from 'node:fs';
import path from 'node:path';

// Decode HTML entities commonly found in WordPress dumps
function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

// Convert string to URL-safe slug
function slugify(text) {
  if (!text) return 'unnamed';
  return text
    .toString()
    .toLowerCase()
    .replace(/dr\.|mr\.|mrs\.|ms\.|prof\./g, '')
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item';
}

// Map freeform WordPress designations to PostgreSQL faculty_cadre enum
export function normalizeCadre(designation, isHod = false) {
  if (isHod) return 'professor_hod';
  const upper = (designation || '').toUpperCase();
  if (upper.includes('HOD') || upper.includes('HEAD') || upper.includes('DEAN')) return 'professor_hod';
  if (upper.includes('TECH') || upper.includes('LAB') || upper.includes('SYSTEM') || upper.includes('PROGRAMMER')) return 'technical_staff';
  if (upper.includes('ASSOCIATE')) return 'associate_professor';
  if (upper.includes('ASST') || upper.includes('ASSISTANT') || upper.includes('TEACHING') || upper.includes('LECTURER')) return 'assistant_professor';
  if (upper.includes('ADJUNCT')) return 'adjunct_faculty';
  if (upper.includes('PROFESSOR') || upper.includes('PRINCIPAL') || upper.includes('DIRECTOR')) return 'professor';
  return 'assistant_professor';
}

// Canonical GPCET Departments
export const DEPARTMENTS = [
  {
    code: 'cse',
    name: 'Computer Science and Engineering',
    shortName: 'CSE',
    establishedYear: 2007,
    intakeUg: 180,
    intakePg: 18,
    nbaAccredited: true,
    vision: 'To emerge as a Center of Excellence in Computer Science and Engineering by producing globally competent professionals.',
    mission: [
      'To provide quality education through innovative teaching-learning processes.',
      'To promote research, entrepreneurship, and industry-institute collaboration.',
      'To inculcate ethical values, leadership qualities, and lifelong learning.'
    ],
    contactEmail: 'hodcse@gpcet.ac.in',
    contactPhone: '+91 9988776601'
  },
  {
    code: 'ai',
    name: 'Artificial Intelligence & Data Science',
    shortName: 'AI & DS',
    establishedYear: 2020,
    intakeUg: 60,
    intakePg: 0,
    nbaAccredited: false,
    vision: 'To pioneer foundational and applied intelligence engineering solving modern societal challenges.',
    mission: [
      'To provide state-of-the-art computational infrastructure and curriculum in AI.',
      'To foster interdisciplinary problem-solving and ethical algorithmic development.'
    ],
    contactEmail: 'hodai@gpcet.ac.in',
    contactPhone: '+91 9988776602'
  },
  {
    code: 'ece',
    name: 'Electronics and Communication Engineering',
    shortName: 'ECE',
    establishedYear: 2007,
    intakeUg: 180,
    intakePg: 18,
    nbaAccredited: true,
    vision: 'To produce highly skilled electronics and communication engineers meeting global industry standards.',
    mission: [
      'To deliver robust theoretical and practical training in communications and VLSI.',
      'To encourage innovation and patents through dedicated project labs.'
    ],
    contactEmail: 'hodece@gpcet.ac.in',
    contactPhone: '+91 9988776603'
  },
  {
    code: 'eee',
    name: 'Electrical and Electronics Engineering',
    shortName: 'EEE',
    establishedYear: 2007,
    intakeUg: 120,
    intakePg: 0,
    nbaAccredited: true,
    vision: 'To lead the frontier of power systems, renewable energy, and electrical vehicle technology.',
    mission: [
      'To impart strong core engineering fundamentals and experimental skills.',
      'To conduct active research in sustainable energy systems.'
    ],
    contactEmail: 'hodeee@gpcet.ac.in',
    contactPhone: '+91 9988776604'
  },
  {
    code: 'me',
    name: 'Mechanical Engineering',
    shortName: 'ME',
    establishedYear: 2007,
    intakeUg: 60,
    intakePg: 0,
    nbaAccredited: true,
    vision: 'To nurture world-class mechanical engineers adept in modern manufacturing, thermal systems, and robotics.',
    mission: [
      'To deliver high-impact engineering education with state-of-the-art machine shops.',
      'To promote sustainability and energy efficiency in industrial applications.'
    ],
    contactEmail: 'hodme@gpcet.ac.in',
    contactPhone: '+91 9988776605'
  },
  {
    code: 'civil',
    name: 'Civil Engineering',
    shortName: 'CIVIL',
    establishedYear: 2007,
    intakeUg: 60,
    intakePg: 0,
    nbaAccredited: true,
    vision: 'To shape sustainable infrastructure leaders dedicated to societal welfare and modern structural design.',
    mission: [
      'To impart hands-on surveying, geotechnical, and environmental engineering training.',
      'To foster smart city and green infrastructure research.'
    ],
    contactEmail: 'hodcivil@gpcet.ac.in',
    contactPhone: '+91 9988776606'
  },
  {
    code: 'hs',
    name: 'Humanities and Sciences',
    shortName: 'H&S',
    establishedYear: 2007,
    intakeUg: 0,
    intakePg: 0,
    nbaAccredited: false,
    vision: 'To provide a robust foundation in basic sciences, mathematics, and communicative English for engineering excellence.',
    mission: [
      'To cultivate scientific temper, critical thinking, and mathematical modeling ability.',
      'To train students in professional communication and human values.'
    ],
    contactEmail: 'hodhs@gpcet.ac.in',
    contactPhone: '+91 9988776607'
  },
  {
    code: 'mba',
    name: 'Master of Business Administration',
    shortName: 'MBA',
    establishedYear: 2008,
    intakeUg: 0,
    intakePg: 120,
    nbaAccredited: false,
    vision: 'To develop ethical, innovative corporate leaders and entrepreneurs for dynamic global markets.',
    mission: [
      'To blend management theory with case study pedagogy and corporate internships.',
      'To foster strategic vision, financial acumen, and leadership capabilities.'
    ],
    contactEmail: 'hodmba@gpcet.ac.in',
    contactPhone: '+91 9988776608'
  }
];

export function escapeSqlString(val) {
  if (val === null || val === undefined) return 'NULL';
  return `'${String(val).replace(/'/g, "''")}'`;
}

export function escapeSqlArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return "'{}'";
  const escaped = arr.map(item => `"${String(item).replace(/"/g, '\\"')}"`).join(',');
  return `'{${escaped}}'`;
}

export function generateSeedSql(workspaceRoot = process.cwd()) {
  const sqlLines = [];
  sqlLines.push('-- ============================================================================');
  sqlLines.push('-- supabase/seed.sql: Institutional Dataset Seed (Departments, Faculty, Documents)');
  sqlLines.push('-- Generated deterministically from raw scraper snapshot');
  sqlLines.push('-- ============================================================================\n');

  // 1. Departments
  sqlLines.push('-- 1. Seed Departments');
  for (const dept of DEPARTMENTS) {
    const values = [
      escapeSqlString(dept.code),
      escapeSqlString(dept.name),
      escapeSqlString(dept.shortName),
      dept.establishedYear,
      dept.intakeUg,
      dept.intakePg,
      dept.nbaAccredited ? 'TRUE' : 'FALSE',
      escapeSqlString(dept.vision),
      escapeSqlArray(dept.mission),
      escapeSqlString(dept.contactEmail),
      escapeSqlString(dept.contactPhone),
      'TRUE'
    ].join(', ');

    sqlLines.push(`INSERT INTO public.departments (code, name, short_name, established_year, intake_ug, intake_pg, nba_accredited, vision, mission, contact_email, contact_phone, is_active)
VALUES (${values})
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    intake_ug = EXCLUDED.intake_ug,
    intake_pg = EXCLUDED.intake_pg,
    nba_accredited = EXCLUDED.nba_accredited,
    vision = EXCLUDED.vision,
    mission = EXCLUDED.mission,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone;`);
  }
  sqlLines.push('\n');

  // 2. Faculty
  sqlLines.push('-- 2. Seed Faculty Records (452 profiles)');
  const facultyDir = path.join(workspaceRoot, 'src', 'data', 'faculty');
  const facultyFiles = fs.readdirSync(facultyDir).filter(f => f.endsWith('.json'));

  let totalFaculty = 0;
  for (const file of facultyFiles) {
    const deptCode = path.basename(file, '.json');
    const roster = JSON.parse(fs.readFileSync(path.join(facultyDir, file), 'utf8'));
    const seenSlugs = new Set();

    for (const member of roster) {
      totalFaculty++;
      let baseSlug = slugify(member.name);
      let uniqueSlug = baseSlug;
      if (seenSlugs.has(uniqueSlug)) {
        uniqueSlug = `${baseSlug}-${member.sno}`;
      }
      seenSlugs.add(uniqueSlug);

      const isHod = (member.designation || '').toUpperCase().includes('HOD') || 
                    (member.designation || '').toUpperCase().includes('HEAD') ||
                    (member.designation || '').toUpperCase().includes('DEAN');
      const cadre = normalizeCadre(member.designation, isHod);
      const designation = member.designation || 'Faculty Member';
      const qualification = member.qualification || '';
      const photoUrl = member.photoUrl ? escapeSqlString(member.photoUrl) : 'NULL';
      const profileRoute = member.profileRoute ? escapeSqlString(member.profileRoute) : 'NULL';

      const rowValues = [
        escapeSqlString(deptCode),
        member.sno || totalFaculty,
        escapeSqlString(member.name),
        escapeSqlString(uniqueSlug),
        escapeSqlString(cadre),
        escapeSqlString(designation),
        escapeSqlString(qualification),
        photoUrl,
        profileRoute,
        isHod ? 'TRUE' : 'FALSE',
        'TRUE'
      ].join(', ');

      sqlLines.push(`INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES (${rowValues})
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;`);
    }
  }
  sqlLines.push('\n');

  // 3. Academic Documents (Sample top 100 core institutional docs in SQL seed for instant bootstrapping)
  sqlLines.push('-- 3. Seed Core Academic Documents Manifest');
  const manifestPath = path.join(workspaceRoot, 'src', 'data', 'media-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Prioritize syllabus, academic calendars, and exam timetables for immediate DB bootstrap
  const priorityDocs = manifest.items
    .filter(item => ['syllabus', 'academic_calendar', 'exam_timetable', 'accreditation_doc', 'form_affidavit'].includes(item.category))
    .slice(0, 200);

  const seenDocSlugs = new Set();
  for (const doc of priorityDocs) {
    const decodedTitle = decodeHtmlEntities(doc.title);
    let baseDocSlug = slugify(doc.filename ? path.basename(doc.filename, path.extname(doc.filename)) : decodedTitle);
    let uniqueDocSlug = baseDocSlug;
    if (seenDocSlugs.has(uniqueDocSlug)) {
      uniqueDocSlug = `${baseDocSlug}-${doc.id}`;
    }
    seenDocSlugs.add(uniqueDocSlug);

    const docValues = [
      escapeSqlString(decodedTitle),
      escapeSqlString(uniqueDocSlug),
      escapeSqlString(doc.category),
      escapeSqlString(doc.sourceUrl),
      doc.fileSize || 0,
      escapeSqlString(doc.mimeType || 'application/pdf'),
      'TRUE'
    ].join(', ');

    sqlLines.push(`INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES (${docValues})
ON CONFLICT DO NOTHING;`);
  }

  return {
    sql: sqlLines.join('\n'),
    totalFaculty,
    totalPriorityDocs: priorityDocs.length,
    manifestTotal: manifest.totalMediaCount
  };
}

// CLI execution
if (process.argv[1] && process.argv[1].endsWith('seed-supabase.js')) {
  console.log('Generating deterministic Supabase seed SQL...');
  const res = generateSeedSql();
  const outPath = path.join(process.cwd(), 'supabase', 'seed.sql');
  fs.writeFileSync(outPath, res.sql, 'utf8');
  console.log(`Successfully generated ${outPath}:`);
  console.log(`  - 8 Institutional Departments`);
  console.log(`  - ${res.totalFaculty} Faculty Records`);
  console.log(`  - ${res.totalPriorityDocs} Core Priority Documents (from ${res.manifestTotal} cataloged items)`);
}
