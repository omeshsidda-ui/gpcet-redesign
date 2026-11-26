import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, BookOpen, Building2, Mail } from 'lucide-react';
import { MarkdownRenderer } from '@/components/content/MarkdownRenderer';
import type { FacultyMemberItem } from './FacultyRosterTable';

interface FacultyProfileViewProps {
  faculty: FacultyMemberItem;
  deptCode: string;
  deptName: string;
  deptEmail: string;
  markdownContent: string | null;
}

function getInitials(name: string): string {
  const cleaned = name.replace(/^(dr\.|mr\.|mrs\.|ms\.|prof\.)\s*/i, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'GP';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function FacultyProfileView({
  faculty,
  deptCode,
  deptName,
  deptEmail,
  markdownContent,
}: FacultyProfileViewProps) {
  const safePhoto = faculty.photoUrl ? faculty.photoUrl.replace(/^http:\/\//i, 'https://') : null;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/departments/${deptCode}/faculty`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to {deptName} Faculty Directory</span>
        </Link>
      </div>

      {/* Scholar Dossier Masthead */}
      <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-[var(--rule)]">
          {safePhoto ? (
            <img
              src={safePhoto}
              alt={`${faculty.name}, ${faculty.designation}`}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover border border-[var(--rule)] bg-[var(--surface)] shrink-0"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[var(--surface)] border border-[var(--rule)] flex items-center justify-center font-serif text-2xl font-semibold text-[var(--ruby)] shrink-0">
              {getInitials(faculty.name)}
            </div>
          )}

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-sm bg-[var(--surface)] border border-[var(--rule)] text-[var(--ruby)]">
                {deptCode.toUpperCase()} · S.NO {faculty.sno}
              </span>
              {faculty.isHod && (
                <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2 py-0.5 rounded-sm bg-[var(--ruby)]/10 border border-[var(--ruby)]/30 text-[var(--ruby)]">
                  <Award className="w-3.5 h-3.5" aria-hidden="true" />
                  Department Head / Dean
                </span>
              )}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--ink)]">
              {faculty.name}
            </h2>
            <p className="text-sm font-semibold text-[var(--brand-crimson)]">
              {faculty.designation}
            </p>
            {faculty.highestQualification && (
              <p className="font-mono text-xs text-[var(--muted)]">
                Academic Credentials: {faculty.highestQualification}
              </p>
            )}
          </div>
        </div>

        {/* Structured Dossier Metadata */}
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-sm">
          <div>
            <dt className="text-xs font-semibold text-[var(--muted)] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
              Department
            </dt>
            <dd className="mt-1 font-medium text-[var(--ink)]">Department of {deptName}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-[var(--muted)] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
              Qualification
            </dt>
            <dd className="mt-1 font-mono text-xs text-[var(--ink)]">
              {faculty.highestQualification || 'Verified Institutional Faculty'}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-[var(--muted)] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[var(--ruby)]" aria-hidden="true" />
              Department Office
            </dt>
            <dd className="mt-1">
              <a
                href={`mailto:${deptEmail}`}
                className="text-xs font-medium text-[var(--ruby)] hover:text-[var(--brand-crimson)] underline underline-offset-2"
              >
                {deptEmail}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      {/* Academic Dossier Markdown (if available in content/departments/[dept]/faculty/[slug].md) */}
      {markdownContent ? (
        <section className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8">
          <h3 className="font-serif text-xl font-medium text-[var(--ink)] pb-3 border-b border-[var(--rule)] mb-4">
            Academic Dossier, Subjects &amp; Publications
          </h3>
          <MarkdownRenderer content={markdownContent} />
        </section>
      ) : (
        <section className="bg-[var(--surface)] border border-[var(--rule)] rounded-md p-6">
          <h3 className="font-serif text-lg font-medium text-[var(--ink)]">
            Institutional Academic Record
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed mt-2 max-w-[68ch]">
            {faculty.name} serves as {faculty.designation} in the Department of {deptName} at G.
            Pullaiah College of Engineering &amp; Technology (Autonomous), Kurnool. Departmental
            research publications and NAAC Criterion 3.4.3 proofs are indexed in the central
            accreditation archive.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/accreditation/naac/3-4-3"
              className="text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] underline underline-offset-2"
            >
              View NAAC 3.4.3 Department Publications →
            </Link>
            <Link
              href={`/departments/${deptCode}/syllabus`}
              className="text-xs font-semibold text-[var(--ruby)] hover:text-[var(--brand-crimson)] underline underline-offset-2"
            >
              Department Curriculum &amp; Syllabi →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
