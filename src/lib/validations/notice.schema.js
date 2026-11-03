import { z } from 'zod';
import { DepartmentCodeEnum } from './faculty.schema.js';

export const NoticeCategoryEnum = z.enum([
  'circular',
  'examination',
  'admissions',
  'recruitment',
  'academic_calendar',
  'event',
  'tender',
  'statutory'
], {
  errorMap: () => ({ message: 'Invalid notice category.' })
});

export const NoticePriorityEnum = z.enum(['urgent', 'high', 'normal']);

export const NoticeQuerySchema = z.object({
  tickerOnly: z.enum(['true', 'false']).transform(v => v === 'true').or(z.boolean()).default(false),
  category: NoticeCategoryEnum.or(z.literal('all')).default('all'),
  department: DepartmentCodeEnum.or(z.literal('all')).default('all'),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  offset: z.coerce.number().int().min(0).default(0)
});

export const NoticeCreateSchema = z.object({
  departmentCode: DepartmentCodeEnum.optional().nullable(),
  title: z.string().trim().min(5, 'Title must be at least 5 characters').max(500),
  slug: z.string().trim().min(3).max(500).regex(/^[a-z0-9-]+$/).optional(),
  summary: z.string().trim().max(500).optional().nullable(),
  contentMarkdown: z.string().min(10, 'Content markdown must be at least 10 characters'),
  category: NoticeCategoryEnum.default('circular'),
  priority: NoticePriorityEnum.default('normal'),
  isTicker: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  attachmentUrl: z.string().url().optional().nullable(),
  attachmentSizeBytes: z.number().int().min(0).optional().nullable(),
  publishedAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional().nullable()
});
