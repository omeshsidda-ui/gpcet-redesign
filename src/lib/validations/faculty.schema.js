import { z } from 'zod';

export const DepartmentCodeEnum = z.enum([
  'cse',
  'ai',
  'ece',
  'eee',
  'me',
  'civil',
  'hs',
  'mba'
], {
  errorMap: () => ({ message: 'Invalid department code. Must be one of: cse, ai, ece, eee, me, civil, hs, mba.' })
});

export const FacultyCadreEnum = z.enum([
  'professor_hod',
  'professor',
  'associate_professor',
  'assistant_professor',
  'adjunct_faculty',
  'technical_staff',
  'administrative'
], {
  errorMap: () => ({ message: 'Invalid cadre. Must be one of: professor_hod, professor, associate_professor, assistant_professor, adjunct_faculty, technical_staff, administrative.' })
});

export const FacultyQuerySchema = z.object({
  department: DepartmentCodeEnum.or(z.literal('all')).default('all'),
  cadre: FacultyCadreEnum.or(z.literal('all')).default('all'),
  q: z.string().trim().max(100, 'Search query must not exceed 100 characters').optional(),
  limit: z.coerce.number().int().min(1, 'Limit must be at least 1').max(100, 'Limit cannot exceed 100').default(50),
  offset: z.coerce.number().int().min(0, 'Offset cannot be negative').default(0)
});

export const FacultyCreateSchema = z.object({
  departmentCode: DepartmentCodeEnum,
  sno: z.number().int().positive().optional(),
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(255),
  slug: z.string().trim().min(2).max(255).regex(/^[a-z0-9-]+$/, 'Slug must be lower-case alphanumeric with dashes').optional(),
  cadre: FacultyCadreEnum.default('assistant_professor'),
  designation: z.string().trim().min(2).max(150),
  highestQualification: z.string().trim().max(255).default(''),
  experienceYears: z.number().min(0).max(60).default(0),
  email: z.string().trim().email('Invalid email address').max(255).optional().nullable(),
  phone: z.string().trim().max(50).optional().nullable(),
  photoUrl: z.string().url('Invalid photo URL').optional().nullable(),
  profileRoute: z.string().startsWith('/').optional().nullable(),
  isHod: z.boolean().default(false),
  bio: z.string().max(5000).optional().nullable(),
  specializations: z.array(z.string().trim()).default([]),
  degrees: z.array(z.object({
    degree: z.string(),
    field: z.string().optional(),
    institution: z.string(),
    year: z.number().int().optional()
  })).default([]),
  publications: z.array(z.object({
    title: z.string(),
    journal: z.string().optional(),
    year: z.number().int().optional(),
    doi: z.string().optional()
  })).default([]),
  subjectsTaught: z.array(z.string().trim()).default([])
});
