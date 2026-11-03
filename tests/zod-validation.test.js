import test from 'node:test';
import assert from 'node:assert';
import { FacultyQuerySchema, FacultyCreateSchema } from '../src/lib/validations/faculty.schema.js';
import { DocumentQuerySchema } from '../src/lib/validations/document.schema.js';
import { NoticeQuerySchema, NoticeCreateSchema } from '../src/lib/validations/notice.schema.js';
import { InquirySubmissionSchema } from '../src/lib/validations/inquiry.schema.js';

test('FacultyQuerySchema validates and applies defaults', () => {
  const parsed = FacultyQuerySchema.parse({});
  assert.strictEqual(parsed.department, 'all');
  assert.strictEqual(parsed.cadre, 'all');
  assert.strictEqual(parsed.limit, 50);
  assert.strictEqual(parsed.offset, 0);

  const custom = FacultyQuerySchema.parse({
    department: 'cse',
    cadre: 'professor',
    q: 'Sreenivasulu',
    limit: '20',
    offset: '10'
  });
  assert.strictEqual(custom.department, 'cse');
  assert.strictEqual(custom.cadre, 'professor');
  assert.strictEqual(custom.q, 'Sreenivasulu');
  assert.strictEqual(custom.limit, 20);
  assert.strictEqual(custom.offset, 10);

  // Invalid department
  const invalid = FacultyQuerySchema.safeParse({ department: 'invalid_dept' });
  assert(!invalid.success);
});

test('DocumentQuerySchema enforces bounded limits and valid categories', () => {
  const parsed = DocumentQuerySchema.parse({
    category: 'syllabus',
    department: 'ece',
    limit: 15
  });
  assert.strictEqual(parsed.category, 'syllabus');
  assert.strictEqual(parsed.department, 'ece');
  assert.strictEqual(parsed.limit, 15);

  const outOfBounds = DocumentQuerySchema.safeParse({ limit: 500 });
  assert(!outOfBounds.success, 'Limit > 100 should be rejected');
});

test('InquirySubmissionSchema validates admissions payload and rejects spam', () => {
  const validPayload = {
    studentName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+919876543210',
    desiredDepartment: 'cse',
    program: 'B.Tech',
    eamcetRank: 12450,
    message: 'Interested in CSE seats.',
    botCheck: '' // empty honeypot
  };

  const parsed = InquirySubmissionSchema.safeParse(validPayload);
  assert(parsed.success, 'Valid submission should pass');

  // Honeypot tripped by bot
  const botSpam = { ...validPayload, botCheck: 'https://spam-bot.site' };
  const botResult = InquirySubmissionSchema.safeParse(botSpam);
  assert(!botResult.success, 'Spam bot filling honeypot must be rejected');

  // Invalid phone number (< 10 chars)
  const badPhone = { ...validPayload, phone: '123' };
  const phoneResult = InquirySubmissionSchema.safeParse(badPhone);
  assert(!phoneResult.success, 'Invalid short phone number must be rejected');

  // Negative rank
  const badRank = { ...validPayload, eamcetRank: -50 };
  const rankResult = InquirySubmissionSchema.safeParse(badRank);
  assert(!rankResult.success, 'Negative rank must be rejected');
});

test('NoticeCreateSchema validates announcement creation fields', () => {
  const validNotice = {
    title: 'Mid-term Examination Timetable 2026',
    contentMarkdown: 'Detailed schedule for B.Tech mid-term examinations is published below.',
    category: 'examination',
    priority: 'high',
    isTicker: true
  };

  const res = NoticeCreateSchema.safeParse(validNotice);
  assert(res.success);
});
