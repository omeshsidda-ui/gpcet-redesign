import { DEPARTMENTS } from '../../../scripts/seed-supabase.js';

/**
 * Get all canonical departments
 */
export async function getAllDepartments() {
  return DEPARTMENTS;
}

/**
 * Get department metadata by code
 */
export async function getDepartmentByCode(code) {
  if (!code) return null;
  return DEPARTMENTS.find(d => d.code === code.toLowerCase()) || null;
}
