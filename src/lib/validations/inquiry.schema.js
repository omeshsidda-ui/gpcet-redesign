import { z } from 'zod';
import { DepartmentCodeEnum } from './faculty.schema.js';

export const InquirySubmissionSchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(150, 'Name must not exceed 150 characters'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please provide a valid email address')
    .max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9\s-]{10,15}$/, 'Please provide a valid 10-digit mobile number'),
  desiredDepartment: DepartmentCodeEnum,
  program: z.enum(['B.Tech', 'M.Tech', 'MBA']).default('B.Tech'),
  eamcetRank: z
    .number()
    .int('Rank must be an integer')
    .positive('Rank must be greater than zero')
    .optional()
    .nullable(),
  message: z
    .string()
    .trim()
    .max(2000, 'Message must not exceed 2000 characters')
    .optional(),
  // Anti-spam honeypot field: must remain empty when submitted by human users
  botCheck: z.string().max(0, 'Invalid submission detected').optional()
});
