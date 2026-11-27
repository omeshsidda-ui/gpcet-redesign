'use client';

import React, { useEffect, useMemo, useState, useTransition } from 'react';
import {
  Search,
  Pencil,
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { updateFacultyAction } from '@/lib/actions/admin-actions';

export interface AdminFacultyItem {
  id: string;
  sno: number;
  name: string;
  slug: string;
  departmentCode: string;
  designation: string;
  cadre: string;
  highestQualification: string;
  experienceYears: number;
  isHod: boolean;
  isActive: boolean;
}

interface DepartmentOption {
  code: string;
  name: string;
  shortName: string;
}

interface FacultyEditorClientProps {
  initialFaculty: AdminFacultyItem[];
  departments: DepartmentOption[];
  isLiveDatabase: boolean;
  staffDepartmentCode: string | null;
  staffRole: string;
}

const CADRES = [
  { value: 'professor_hod', label: 'Professor & HOD' },
  { value: 'professor', label: 'Professor' },
  { value: 'associate_professor', label: 'Associate Professor' },
  { value: 'assistant_professor', label: 'Assistant Professor' },
  { value: 'adjunct_faculty', label: 'Adjunct Faculty' },
  { value: 'technical_staff', label: 'Technical Staff' },
  { value: 'administrative', label: 'Administrative' },
];

const PAGE_SIZE = 50;

export default function FacultyEditorClient({
  initialFaculty,
  departments,
  isLiveDatabase,
  staffDepartmentCode,
  staffRole,
}: FacultyEditorClientProps) {
  const [faculty, setFaculty] = useState<AdminFacultyItem[]>(initialFaculty);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState(
    staffRole === 'hod' && staffDepartmentCode ? staffDepartmentCode : 'all'
  );
  const [cadreFilter, setCadreFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [page, setPage] = useState(1);

  const [editing, setEditing] = useState<AdminFacultyItem | null>(null);
  const [editDesignation, setEditDesignation] = useState('');
  const [editCadre, setEditCadre] = useState('assistant_professor');
  const [editQualification, setEditQualification] = useState('');
  const [editExperience, setEditExperience] = useState('0');
  const [editIsHod, setEditIsHod] = useState(false);
  const [editIsActive, setEditIsActive] = useState(true);

  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faculty.filter((member) => {
      if (departmentFilter !== 'all' && member.departmentCode !== departmentFilter) return false;
      if (cadreFilter !== 'all' && member.cadre !== cadreFilter) return false;
      if (statusFilter === 'active' && !member.isActive) return false;
      if (statusFilter === 'inactive' && member.isActive) return false;
      if (q) {
        const hay = `${member.name} ${member.designation} ${member.highestQualification} ${member.departmentCode}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [faculty, search, departmentFilter, cadreFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, departmentFilter, cadreFilter, statusFilter]);

  useEffect(() => {
    if (!editing) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditing(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [editing]);

  const openEditor = (member: AdminFacultyItem) => {
    setFeedback(null);
    setEditing(member);
    setEditDesignation(member.designation);
    setEditCadre(member.cadre);
    setEditQualification(member.highestQualification);
    setEditExperience(String(member.experienceYears ?? 0));
    setEditIsHod(member.isHod);
    setEditIsActive(member.isActive);
  };

  const handleSaveFaculty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    setFeedback(null);

    const targetId = editing.id;
    const targetDept = editing.departmentCode;

    startTransition(async () => {
      const res = await updateFacultyAction({
        id: targetId,
        departmentCode: targetDept,
        designation: editDesignation,
        cadre: editCadre,
        highestQualification: editQualification,
        experienceYears: Number(editExperience) || 0,
        isHod: editIsHod,
        isActive: editIsActive,
      });

      if (res.success) {
        setFaculty((prev) =>
          prev.map((item) =>
            item.id === targetId
              ? {
                  ...item,
                  designation: editDesignation,
                  cadre: editCadre,
                  highestQualification: editQualification,
                  experienceYears: Number(editExperience) || 0,
                  isHod: editIsHod,
                  isActive: editIsActive,
                }
              : item
          )
        );
        setEditing(null);
        setFeedback({ type: 'success', text: res.message });
      } else {
        setFeedback({ type: 'error', text: res.error });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight">
            Faculty Directory Editor
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Maintain designations, academic cadres, qualifications, and active roster status across{' '}
            <span className="font-sans font-semibold tabular-nums text-[var(--ink)]">{faculty.length}</span>{' '}
            faculty profiles.
          </p>
        </div>
      </div>

      {!isLiveDatabase && (
        <div
          role="note"
          className="flex items-start gap-3 p-4 rounded-md border border-[var(--ruby)]/40 bg-[var(--ruby)]/10 text-xs text-[var(--ink)]"
        >
          <Info className="w-4 h-4 text-[var(--ruby)] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold">Offline Roster Preview Mode</p>
            <p className="mt-0.5 text-[var(--muted)]">
              Displaying verified offline faculty JSON manifests across all 8 departments. Saving
              edits requires Supabase PostgreSQL seeded via{' '}
              <code className="font-mono text-[var(--ink)]">npm run seed:generate</code>.
            </p>
          </div>
        </div>
      )}

      {feedback && (
        <div
          role={feedback.type === 'error' ? 'alert' : 'status'}
          className={`flex items-start gap-2.5 p-3.5 rounded border text-xs ${
            feedback.type === 'error'
              ? 'bg-[var(--brand-crimson)]/5 border-[var(--brand-crimson)]/30 text-[var(--brand-crimson)]'
              : 'bg-[var(--ruby)]/5 border-[var(--ruby)]/20 text-[var(--ruby)]'
          }`}
        >
          {feedback.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-4 grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-5">
          <label htmlFor="faculty-search" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Search Faculty
          </label>
          <div className="relative">
            <Search
              className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="faculty-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, qualification, designation..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <label htmlFor="faculty-dept" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Department
          </label>
          <select
            id="faculty-dept"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
          >
            <option value="all">All 8 Departments</option>
            {departments.map((d) => (
              <option key={d.code} value={d.code}>
                {d.shortName} — {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="faculty-cadre" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Cadre
          </label>
          <select
            id="faculty-cadre"
            value={cadreFilter}
            onChange={(e) => setCadreFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
          >
            <option value="all">All Cadres</option>
            {CADRES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="faculty-status" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Status
          </label>
          <select
            id="faculty-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--rule)] bg-[var(--surface)]/60 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted)]">
          <span className="font-sans tabular-nums">
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–
            {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} matching records
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              aria-label="Previous page"
              className="inline-flex items-center gap-1 px-2 py-1 rounded border border-[var(--rule)] bg-[var(--bg)] text-[var(--ink)] disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Prev
            </button>
            <span className="font-sans tabular-nums">
              Page {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              aria-label="Next page"
              className="inline-flex items-center gap-1 px-2 py-1 rounded border border-[var(--rule)] bg-[var(--bg)] text-[var(--ink)] disabled:opacity-40 cursor-pointer"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--rule)] bg-[var(--surface)] text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
                <th scope="col" className="px-4 py-3">S.No</th>
                <th scope="col" className="px-4 py-3">Faculty Member</th>
                <th scope="col" className="px-4 py-3">Dept</th>
                <th scope="col" className="px-4 py-3">Designation &amp; Cadre</th>
                <th scope="col" className="px-4 py-3">Qualification</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rule)]">
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-[var(--muted)]">
                    No faculty records match the current filters.
                  </td>
                </tr>
              ) : (
                pageItems.map((member) => (
                  <tr key={member.id} className="hover:bg-[var(--surface)]/40 transition-colors">
                    <td className="px-4 py-3 font-sans text-xs text-[var(--muted)] tabular-nums whitespace-nowrap">
                      {member.sno}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--ink)]">{member.name}</div>
                      {member.isHod && (
                        <span className="inline-block mt-0.5 font-sans text-[10px] font-semibold tracking-[0.05em] uppercase px-1.5 py-0.5 rounded bg-[var(--ruby)]/20 text-[var(--ink)] border border-[var(--ruby)]/40">
                          HOD
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--rule)] text-[var(--ink)]">
                        {member.departmentCode}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-[var(--ink)]">{member.designation}</div>
                      <div className="font-sans text-[11px] text-[var(--muted)]">{member.cadre}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--ink)] max-w-xs">
                      {member.highestQualification || '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`font-sans text-[11px] font-semibold tracking-[0.05em] uppercase px-2 py-0.5 rounded ${
                          member.isActive
                            ? 'bg-[var(--ruby)]/10 text-[var(--ruby)]'
                            : 'bg-[var(--brand-crimson)]/10 text-[var(--brand-crimson)]'
                        }`}
                      >
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        type="button"
                        onClick={() => openEditor(member)}
                        aria-label={`Edit ${member.name}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ruby)] transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" aria-hidden="true" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessible Modal Editor */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-faculty-heading"
        >
          <div className="w-full max-w-lg bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md shadow-lg overflow-hidden">
            <div className="px-5 py-4 bg-[var(--ruby)] text-white flex items-center justify-between gap-3">
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-200 tabular-nums">
                  {editing.departmentCode.toUpperCase()} · S.No {editing.sno}
                </p>
                <h2 id="edit-faculty-heading" className="font-serif text-lg font-semibold">
                  {editing.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="Close faculty editor"
                className="p-1 rounded hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSaveFaculty} className="p-5 space-y-4">
              <div>
                <label htmlFor="edit-designation" className="block text-xs font-semibold text-[var(--ink)] mb-1">
                  Designation
                </label>
                <input
                  id="edit-designation"
                  type="text"
                  required
                  value={editDesignation}
                  onChange={(e) => setEditDesignation(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-cadre" className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Normalized Cadre
                  </label>
                  <select
                    id="edit-cadre"
                    value={editCadre}
                    onChange={(e) => setEditCadre(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
                  >
                    {CADRES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="edit-experience" className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Experience (Years)
                  </label>
                  <input
                    id="edit-experience"
                    type="number"
                    step="0.5"
                    min={0}
                    max={60}
                    value={editExperience}
                    onChange={(e) => setEditExperience(e.target.value)}
                    className="w-full px-3 py-2 font-sans text-sm tabular-nums bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edit-qualification" className="block text-xs font-semibold text-[var(--ink)] mb-1">
                  Highest Qualification
                </label>
                <input
                  id="edit-qualification"
                  type="text"
                  value={editQualification}
                  onChange={(e) => setEditQualification(e.target.value)}
                  placeholder="e.g., Ph.D (CSE), M.Tech"
                  className="w-full px-3 py-2 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[var(--rule)]">
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--ruby)]"
                  />
                  <span>Active on Public Roster</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsHod}
                    onChange={(e) => setEditIsHod(e.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--ruby)]"
                  />
                  <span>Department HOD</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 rounded text-xs font-semibold border border-[var(--rule)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--bg)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded text-xs font-semibold bg-[var(--ruby)] text-white hover:bg-[var(--burgundy)] disabled:opacity-50 cursor-pointer"
                >
                  {isPending ? 'Saving...' : 'Save Faculty Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
