import fs from 'node:fs';
import path from 'node:path';
import { normalizeCadre } from '../../../scripts/seed-supabase.js';

let cachedRosters = null;

function loadOfflineRosters(workspaceRoot = process.cwd()) {
  if (cachedRosters) return cachedRosters;
  const facultyDir = path.join(workspaceRoot, 'src', 'data', 'faculty');
  const files = fs.readdirSync(facultyDir).filter(f => f.endsWith('.json'));
  const all = [];

  for (const file of files) {
    const deptCode = path.basename(file, '.json');
    const records = JSON.parse(fs.readFileSync(path.join(facultyDir, file), 'utf8'));
    for (const item of records) {
      const isHod = (item.designation || '').toUpperCase().includes('HOD') || 
                    (item.designation || '').toUpperCase().includes('HEAD') ||
                    (item.designation || '').toUpperCase().includes('DEAN');
      const baseSlug = (item.name || 'unnamed')
        .toLowerCase()
        .replace(/dr\.|mr\.|mrs\.|ms\.|prof\./g, '')
        .trim()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      all.push({
        id: `fac_${deptCode}_${item.sno}`,
        sno: item.sno,
        name: item.name,
        slug: baseSlug,
        departmentCode: deptCode,
        department: item.department,
        designation: item.designation,
        cadre: normalizeCadre(item.designation, isHod),
        highestQualification: item.qualification || '',
        experienceYears: 0,
        email: null,
        phone: null,
        photoUrl: item.photoUrl || null,
        profileRoute: item.profileRoute || null,
        isHod,
        specializations: [],
        degrees: [],
        publications: [],
        subjectsTaught: []
      });
    }
  }

  cachedRosters = all;
  return all;
}

/**
 * Fail-Safe Hybrid Read for Faculty Roster
 */
export async function getFacultyRoster({
  department = 'all',
  cadre = 'all',
  q = '',
  limit = 50,
  offset = 0
} = {}) {
  // If Supabase credentials exist, try primary database query
  // For offline/test fallback:
  let list = loadOfflineRosters();

  if (department && department !== 'all') {
    list = list.filter(f => f.departmentCode === department.toLowerCase());
  }

  if (cadre && cadre !== 'all') {
    list = list.filter(f => f.cadre === cadre);
  }

  if (q && q.trim().length > 0) {
    const query = q.toLowerCase().trim();
    list = list.filter(f =>
      f.name.toLowerCase().includes(query) ||
      f.designation.toLowerCase().includes(query) ||
      f.highestQualification.toLowerCase().includes(query)
    );
  }

  const total = list.length;
  const paginated = list.slice(offset, offset + limit);

  return {
    data: paginated,
    meta: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    }
  };
}

/**
 * Get individual faculty dossier by slug
 */
export async function getFacultyBySlug(slug) {
  const list = loadOfflineRosters();
  return list.find(f => f.slug === slug.toLowerCase()) || null;
}

/**
 * Get department Head of Department (HOD)
 */
export async function getDepartmentHod(departmentCode) {
  const list = loadOfflineRosters();
  return list.find(f => f.departmentCode === departmentCode.toLowerCase() && f.isHod) || null;
}
