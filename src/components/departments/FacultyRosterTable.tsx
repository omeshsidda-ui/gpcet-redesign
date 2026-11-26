'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, LayoutGrid, Table2, ArrowRight, X } from 'lucide-react';

export interface FacultyMemberItem {
  id: string;
  sno: number;
  name: string;
  slug: string;
  departmentCode: string;
  department: string;
  designation: string;
  cadre: string;
  highestQualification: string;
  photoUrl: string | null;
  profileRoute: string | null;
  isHod: boolean;
}

interface FacultyRosterTableProps {
  faculty: FacultyMemberItem[];
  deptCode: string;
  deptName: string;
}

const CADRE_FILTERS = [
  { id: 'all', label: 'All Cadres' },
  { id: 'professor_hod', label: 'Professors & HOD' },
  { id: 'professor', label: 'Professors' },
  { id: 'associate_professor', label: 'Associate Professors' },
  { id: 'assistant_professor', label: 'Assistant Professors' },
];

function getInitials(name: string): string {
  const cleaned = name.replace(/^(dr\.|mr\.|mrs\.|ms\.|prof\.)\s*/i, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'GP';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function formatCadreLabel(cadre: string): string {
  switch (cadre) {
    case 'professor_hod':
      return 'Professor & HOD / Dean';
    case 'professor':
      return 'Professor';
    case 'associate_professor':
      return 'Associate Professor';
    case 'assistant_professor':
      return 'Assistant Professor';
    case 'technical_staff':
      return 'Technical Staff';
    default:
      return 'Faculty';
  }
}

export default function FacultyRosterTable({
  faculty,
  deptCode,
  deptName,
}: FacultyRosterTableProps) {
  const [query, setQuery] = useState('');
  const [cadre, setCadre] = useState('all');
  const [qualificationFilter, setQualificationFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'dossier'>('table');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faculty.filter((member) => {
      if (cadre !== 'all' && member.cadre !== cadre) return false;
      if (qualificationFilter === 'phd') {
        const qual = (member.highestQualification || '').toLowerCase();
        const nameLower = member.name.toLowerCase();
        if (!qual.includes('ph.d') && !qual.includes('phd') && !nameLower.startsWith('dr')) {
          return false;
        }
      } else if (qualificationFilter === 'mtech') {
        const qual = (member.highestQualification || '').toLowerCase();
        if (!qual.includes('m.tech') && !qual.includes('mtech') && !qual.includes('m.e')) {
          return false;
        }
      }
      if (q) {
        return (
          member.name.toLowerCase().includes(q) ||
          member.designation.toLowerCase().includes(q) ||
          (member.highestQualification || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [faculty, query, cadre, qualificationFilter]);

  return (
    <div className="space-y-6">
      {/* Filter & View Controls */}
      <div className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search
              className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${deptName} faculty by name, designation, or degree...`}
              aria-label="Search department faculty"
              className="w-full pl-9 pr-9 py-2.5 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary-navy)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear faculty search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[var(--muted)] hover:text-[var(--ink)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Qualification & View Mode */}
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              aria-label="Filter by qualification"
              value={qualificationFilter}
              onChange={(e) => setQualificationFilter(e.target.value)}
              className="px-3 py-2 text-xs font-medium bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)]"
            >
              <option value="all">All Qualifications</option>
              <option value="phd">Ph.D. / Doctorate</option>
              <option value="mtech">M.Tech / M.E.</option>
            </select>

            <div className="inline-flex rounded border border-[var(--rule)] bg-[var(--surface)] p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                aria-pressed={viewMode === 'table'}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                  viewMode === 'table'
                    ? 'bg-[var(--surface-raised)] text-[var(--ink)] shadow-2xs'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                <Table2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Table</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('dossier')}
                aria-pressed={viewMode === 'dossier'}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-sm transition-colors ${
                  viewMode === 'dossier'
                    ? 'bg-[var(--surface-raised)] text-[var(--ink)] shadow-2xs'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Dossier Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cadre Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--rule)]" role="group" aria-label="Filter by academic cadre">
          {CADRE_FILTERS.map((f) => {
            const active = cadre === f.id;
            const count =
              f.id === 'all' ? faculty.length : faculty.filter((m) => m.cadre === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setCadre(f.id)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                  active
                    ? 'bg-[var(--primary-navy)] text-white border-[var(--primary-navy)]'
                    : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--rule)] hover:border-[var(--primary-navy)]/50'
                }`}
              >
                <span>{f.label}</span>
                <span className={`font-mono text-[11px] tabular-nums ${active ? 'text-slate-200' : 'text-[var(--muted)]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Count Readout */}
      <div className="text-xs font-mono text-[var(--muted)] tabular-nums">
        Displaying <strong className="text-[var(--ink)]">{filtered.length}</strong> of{' '}
        <strong className="text-[var(--ink)]">{faculty.length}</strong> department faculty records
      </div>

      {/* Table View (Default) */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--surface)] border-b border-[var(--rule)] text-xs font-semibold text-[var(--muted)]">
                <th scope="col" className="py-3 px-4 font-mono">S.No</th>
                <th scope="col" className="py-3 px-4">Faculty Member</th>
                <th scope="col" className="py-3 px-4">Designation</th>
                <th scope="col" className="py-3 px-4">Qualification</th>
                <th scope="col" className="py-3 px-4">Cadre</th>
                <th scope="col" className="py-3 px-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rule)] text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 px-4 text-center text-sm text-[var(--muted)]">
                    No faculty records match the active filter.
                  </td>
                </tr>
              ) : (
                filtered.map((member, index) => (
                  <tr key={member.id} className="hover:bg-[var(--surface)]/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-[var(--muted)] tabular-nums">
                      {member.sno || index + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/departments/${deptCode}/faculty/${member.slug}`}
                        className="font-semibold text-[var(--ink)] hover:text-[var(--brand-crimson)] transition-colors"
                      >
                        {member.name}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[var(--ink)]">
                      {member.designation}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[var(--muted)]">
                      {member.highestQualification || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex px-2 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--rule)] text-[11px] font-medium text-[var(--primary-navy)]">
                        {formatCadreLabel(member.cadre)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/departments/${deptCode}/faculty/${member.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary-navy)] hover:text-[var(--brand-crimson)]"
                      >
                        <span>Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Dossier Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((member) => {
            const safePhoto = member.photoUrl ? member.photoUrl.replace(/^http:\/\//i, 'https://') : null;
            return (
              <Link
                key={member.id}
                href={`/departments/${deptCode}/faculty/${member.slug}`}
                className="group bg-[var(--surface-raised)] border border-[var(--rule)] hover:border-[var(--primary-navy)] rounded-md p-4 flex items-start gap-3.5 transition-colors"
              >
                {safePhoto ? (
                  <img
                    src={safePhoto}
                    alt={member.name}
                    width={52}
                    height={52}
                    className="w-13 h-13 rounded-full object-cover border border-[var(--rule)] shrink-0 bg-[var(--surface)]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-13 h-13 rounded-full bg-[var(--surface)] border border-[var(--rule)] flex items-center justify-center font-mono text-xs font-bold text-[var(--primary-navy)] shrink-0">
                    {getInitials(member.name)}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--brand-crimson)] transition-colors truncate">
                    {member.name}
                  </div>
                  <div className="text-xs text-[var(--muted)] mt-0.5 truncate">
                    {member.designation}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--primary-navy)] mt-1.5">
                    {member.highestQualification || deptCode.toUpperCase()}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
