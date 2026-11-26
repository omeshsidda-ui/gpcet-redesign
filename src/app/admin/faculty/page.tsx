import React from 'react';
import { FACULTY_EDITOR_ROLES, requireStaffSession } from '@/lib/auth/admin-auth';
import { createServerClient } from '@/lib/supabase/server';
import { getFacultyRoster } from '@/lib/data/faculty.js';
import { getAllDepartments } from '@/lib/data/departments.js';
import AdminForbidden from '@/components/admin/AdminForbidden';
import FacultyEditorClient, {
  type AdminFacultyItem,
} from '@/components/admin/FacultyEditorClient';

export const dynamic = 'force-dynamic';

interface SupabaseFacultyRow {
  id: string;
  sno: number;
  name: string;
  slug: string;
  department_code: string;
  designation: string;
  cadre: string;
  highest_qualification: string;
  experience_years: number;
  is_hod: boolean;
  is_active: boolean;
}

export default async function AdminFacultyPage() {
  const auth = await requireStaffSession(FACULTY_EDITOR_ROLES);

  if (!auth.authorized) {
    return (
      <AdminForbidden
        userEmail={auth.session.user?.email}
        currentRole={auth.session.user?.role}
        requiredRoles={FACULTY_EDITOR_ROLES}
      />
    );
  }

  const departments = await getAllDepartments();
  let faculty: AdminFacultyItem[] = [];
  let isLiveDatabase = false;

  if (auth.session.configured) {
    try {
      const supabase = await createServerClient();
      const { data, error } = await supabase
        .from('faculty')
        .select(
          'id, sno, name, slug, department_code, designation, cadre, highest_qualification, experience_years, is_hod, is_active'
        )
        .order('department_code', { ascending: true })
        .order('sno', { ascending: true })
        .limit(600);

      if (!error && Array.isArray(data) && data.length > 0) {
        isLiveDatabase = true;
        faculty = (data as SupabaseFacultyRow[]).map((row) => ({
          id: row.id,
          sno: row.sno,
          name: row.name,
          slug: row.slug,
          departmentCode: row.department_code,
          designation: row.designation,
          cadre: row.cadre,
          highestQualification: row.highest_qualification,
          experienceYears: Number(row.experience_years ?? 0),
          isHod: Boolean(row.is_hod),
          isActive: Boolean(row.is_active),
        }));
      }
    } catch {
      isLiveDatabase = false;
    }
  }

  if (!isLiveDatabase) {
    const roster = await getFacultyRoster({ limit: 500 });
    faculty = roster.data.map((item: Record<string, unknown>) => ({
      id: String(item.id),
      sno: Number(item.sno ?? 0),
      name: String(item.name ?? ''),
      slug: String(item.slug ?? ''),
      departmentCode: String(item.departmentCode ?? 'cse'),
      designation: String(item.designation ?? ''),
      cadre: String(item.cadre ?? 'assistant_professor'),
      highestQualification: String(item.highestQualification ?? ''),
      experienceYears: Number(item.experienceYears ?? 0),
      isHod: Boolean(item.isHod),
      isActive: true,
    }));
  }

  return (
    <FacultyEditorClient
      initialFaculty={faculty}
      departments={departments.map((d: Record<string, unknown>) => ({
        code: String(d.code),
        name: String(d.name),
        shortName: String(d.shortName),
      }))}
      isLiveDatabase={isLiveDatabase}
      staffDepartmentCode={auth.session.user.departmentCode}
      staffRole={auth.session.user.staffRole}
    />
  );
}
