'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface FieldError {
  field: string;
  message: string;
}

const DEPARTMENTS = [
  { code: 'cse', label: 'Computer Science & Engineering (CSE)' },
  { code: 'ai', label: 'Artificial Intelligence & Data Science (AI & DS)' },
  { code: 'ece', label: 'Electronics & Communication Engineering (ECE)' },
  { code: 'eee', label: 'Electrical & Electronics Engineering (EEE)' },
  { code: 'me', label: 'Mechanical Engineering (ME)' },
  { code: 'civil', label: 'Civil Engineering (CE)' },
  { code: 'mba', label: 'Master of Business Administration (MBA)' },
];

export default function AdmissionsInquiryForm() {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState<'B.Tech' | 'M.Tech' | 'MBA'>('B.Tech');
  const [desiredDepartment, setDesiredDepartment] = useState('cse');
  const [eamcetRank, setEamcetRank] = useState('');
  const [message, setMessage] = useState('');
  // Anti-spam honeypot field — must stay empty for human users
  const [botCheck, setBotCheck] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [confirmation, setConfirmation] = useState<{
    inquiryId: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorBanner(null);
    setFieldErrors([]);

    try {
      const rankNum = eamcetRank.trim() ? Number.parseInt(eamcetRank.trim(), 10) : null;
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          email,
          phone,
          program,
          desiredDepartment,
          eamcetRank: rankNum && !Number.isNaN(rankNum) ? rankNum : null,
          message: message.trim() || undefined,
          botCheck,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorBanner(json.detail || 'Unable to submit inquiry. Please verify your entries.');
        if (Array.isArray(json.errors)) {
          setFieldErrors(json.errors);
        }
        return;
      }

      setConfirmation({
        inquiryId: json.data?.inquiryId || 'CONFIRMED',
        message:
          json.data?.message ||
          'Thank you for contacting GPCET Admissions. Our counselor will respond within 24 hours.',
      });
      setStudentName('');
      setEmail('');
      setPhone('');
      setEamcetRank('');
      setMessage('');
    } catch {
      setErrorBanner('Network error submitting inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div
        role="status"
        className="bg-[var(--surface-raised)] border border-[var(--ruby)]/30 rounded-md p-6 sm:p-8 space-y-4"
      >
        <div className="flex items-center gap-2.5 text-[var(--ruby)]">
          <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
          <h3 className="font-serif text-xl font-medium text-[var(--ink)]">
            Admissions Inquiry Recorded
          </h3>
        </div>
        <p className="text-sm text-[var(--muted)] leading-relaxed">{confirmation.message}</p>
        <div className="font-mono text-xs bg-[var(--surface)] border border-[var(--rule)] rounded px-3 py-2 text-[var(--ink)]">
          Reference ID: {confirmation.inquiryId}
        </div>
        <button
          type="button"
          onClick={() => setConfirmation(null)}
          className="px-4 py-2 text-xs font-semibold rounded border border-[var(--rule)] bg-[var(--surface)] hover:bg-[var(--bg)] text-[var(--ink)]"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--surface-raised)] border border-[var(--rule)] rounded-md p-6 sm:p-8 space-y-5"
      noValidate
    >
      <div className="pb-3 border-b border-[var(--rule)]">
        <h3 className="font-serif text-2xl font-medium text-[var(--ink)]">
          Admissions Counseling Inquiry
        </h3>
        <p className="text-xs text-[var(--muted)] mt-1">
          Submit your EAPCET / ECET / ICET / Management quota inquiry directly to the GPCET
          Admissions Desk (Code: <span className="font-mono font-semibold">PULE</span>).
        </p>
      </div>

      {errorBanner && (
        <div
          role="alert"
          className="p-3.5 rounded border border-[var(--brand-crimson)]/40 bg-[var(--brand-crimson)]/5 text-xs text-[var(--brand-crimson)] space-y-1"
        >
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{errorBanner}</span>
          </div>
          {fieldErrors.length > 0 && (
            <ul className="list-disc pl-6 space-y-0.5">
              {fieldErrors.map((fe, idx) => (
                <li key={idx}>
                  <span className="font-mono">{fe.field}</span>: {fe.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Anti-spam honeypot input hidden from human visitors */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="botCheck">Leave this field empty</label>
        <input
          id="botCheck"
          name="botCheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={botCheck}
          onChange={(e) => setBotCheck(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inq-name" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Applicant Full Name *
          </label>
          <input
            id="inq-name"
            type="text"
            required
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g., K. Sai Kiran"
            className="w-full px-3 py-2.5 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
          />
        </div>

        <div>
          <label htmlFor="inq-email" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Email Address *
          </label>
          <input
            id="inq-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="applicant@example.com"
            className="w-full px-3 py-2.5 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
          />
        </div>

        <div>
          <label htmlFor="inq-phone" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Mobile Number (10 digits) *
          </label>
          <input
            id="inq-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 9876543210"
            className="w-full px-3 py-2.5 text-sm font-mono bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
          />
        </div>

        <div>
          <label htmlFor="inq-program" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Program Level *
          </label>
          <select
            id="inq-program"
            value={program}
            onChange={(e) => setProgram(e.target.value as 'B.Tech' | 'M.Tech' | 'MBA')}
            className="w-full px-3 py-2.5 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)]"
          >
            <option value="B.Tech">B.Tech (Undergraduate · 4 Years)</option>
            <option value="M.Tech">M.Tech (Postgraduate · 2 Years)</option>
            <option value="MBA">MBA (Management · 2 Years)</option>
          </select>
        </div>

        <div>
          <label htmlFor="inq-dept" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            Preferred Branch *
          </label>
          <select
            id="inq-dept"
            value={desiredDepartment}
            onChange={(e) => setDesiredDepartment(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)]"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d.code} value={d.code}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="inq-rank" className="block text-xs font-semibold text-[var(--ink)] mb-1">
            AP EAPCET / ECET / ICET Rank (Optional)
          </label>
          <input
            id="inq-rank"
            type="number"
            min={1}
            value={eamcetRank}
            onChange={(e) => setEamcetRank(e.target.value)}
            placeholder="e.g., 14500"
            className="w-full px-3 py-2.5 text-sm font-mono bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="inq-msg" className="block text-xs font-semibold text-[var(--ink)] mb-1">
          Questions / Hostel &amp; Scholarship Notes
        </label>
        <textarea
          id="inq-msg"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Specify queries on lateral entry, JVD reimbursement, transport, or branch availability..."
          className="w-full px-3 py-2.5 text-sm bg-[var(--bg)] border border-[var(--rule)] rounded text-[var(--ink)] focus:outline-none focus:border-[var(--ruby)]"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[var(--brand-crimson)] hover:bg-[var(--burgundy)] disabled:opacity-50 text-white text-sm font-semibold transition-colors"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
        <span>{submitting ? 'Submitting Inquiry...' : 'Submit Admissions Inquiry'}</span>
      </button>
    </form>
  );
}
