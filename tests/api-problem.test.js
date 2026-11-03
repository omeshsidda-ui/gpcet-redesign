import test from 'node:test';
import assert from 'node:assert';
import { z } from 'zod';
import {
  PROBLEM_TYPES,
  createProblemDetails,
  formatZodError,
  validationProblem,
  notFoundProblem,
  rateLimitProblem
} from '../src/lib/api/problem.js';

test('RFC 9457 createProblemDetails creates compliant error envelope', () => {
  const problem = createProblemDetails({
    status: 422,
    detail: 'Invalid query parameters',
    instance: '/api/v1/faculty?dept=unknown'
  });

  assert.strictEqual(problem.status, 422);
  assert.strictEqual(problem.code, 'VALIDATION_FAILED');
  assert.strictEqual(problem.title, 'Unprocessable Entity');
  assert.strictEqual(problem.type, 'https://gpcet.ac.in/problems/validation-error');
  assert.strictEqual(problem.instance, '/api/v1/faculty?dept=unknown');
  assert.ok(problem.timestamp);
});

test('formatZodError maps Zod validation issues to field error array', () => {
  const schema = z.object({
    email: z.string().email('Invalid email address'),
    age: z.number().min(18, 'Must be at least 18')
  });

  const result = schema.safeParse({ email: 'not-an-email', age: 16 });
  assert.strictEqual(result.success, false);

  const formatted = formatZodError(result.error);
  assert.strictEqual(formatted.length, 2);
  assert.strictEqual(formatted[0].field, 'email');
  assert.strictEqual(formatted[0].message, 'Invalid email address');
  assert.strictEqual(formatted[1].field, 'age');
  assert.strictEqual(formatted[1].message, 'Must be at least 18');
});

test('validationProblem generates HTTP 422 Problem Details with errors', () => {
  const schema = z.object({
    department: z.enum(['cse', 'ece'])
  });

  const result = schema.safeParse({ department: 'invalid' });
  assert.strictEqual(result.success, false);

  const problem = validationProblem(result.error, '/api/v1/faculty');
  assert.strictEqual(problem.status, 422);
  assert.strictEqual(problem.code, 'VALIDATION_FAILED');
  assert.ok(Array.isArray(problem.errors));
  assert.strictEqual(problem.errors[0].field, 'department');
});

test('notFoundProblem generates HTTP 404 Problem Details', () => {
  const problem = notFoundProblem('Faculty', 'unknown-slug', '/api/v1/faculty/unknown-slug');
  assert.strictEqual(problem.status, 404);
  assert.strictEqual(problem.code, 'NOT_FOUND');
  assert.ok(problem.detail.includes("unknown-slug"));
});

test('rateLimitProblem generates HTTP 429 Problem Details with retryAfter', () => {
  const problem = rateLimitProblem(45, '/api/v1/inquiries');
  assert.strictEqual(problem.status, 429);
  assert.strictEqual(problem.code, 'RATE_LIMIT_EXCEEDED');
  assert.ok(problem.detail.includes('45 seconds'));
});
