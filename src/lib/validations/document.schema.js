import { z } from 'zod';
import { DepartmentCodeEnum } from './faculty.schema.js';

export const DocumentCategoryEnum = z.enum([
  'syllabus',
  'general_pdf',
  'academic_calendar',
  'general_image',
  'campus_photo',
  'faculty_photo',
  'logo_badge',
  'accreditation_doc',
  'video',
  'other',
  'form_affidavit',
  'circular',
  'exam_timetable',
  'lecture_presentation',
  'regulation',
  'governance',
  'placement'
], {
  errorMap: () => ({ message: 'Invalid document category.' })
});

export const DocumentQuerySchema = z.object({
  q: z.string().trim().max(100, 'Search query must not exceed 100 characters').optional(),
  category: DocumentCategoryEnum.or(z.literal('all')).default('all'),
  department: DepartmentCodeEnum.or(z.literal('all')).default('all'),
  regulation: z.string().trim().max(20).optional(),
  limit: z.coerce.number().int().min(1, 'Limit must be at least 1').max(100, 'Limit cannot exceed 100').default(25),
  offset: z.coerce.number().int().min(0, 'Offset cannot be negative').default(0)
});
