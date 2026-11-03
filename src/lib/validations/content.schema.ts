import { z } from 'zod';

/**
 * Frontmatter schema for ingested academic markdown pages.
 * Validates frontmatter attributes extracted from gray-matter.
 */
export const ContentFrontmatterSchema = z.object({
  id: z.coerce.number().int().positive({ message: 'Page ID must be a positive integer.' }),
  title: z.string().trim().min(1, { message: 'Title is required.' }),
  slug: z.string().trim().min(1, { message: 'Slug is required.' }),
  wp_slug: z.string().trim().min(1, { message: 'WordPress slug is required.' }),
  section: z.string().trim().min(1, { message: 'Section category is required.' }),
  route: z.string().trim().min(1, { message: 'Route is required.' })
    .transform((val) => (val.startsWith('/') ? val : `/${val}`)),
  date: z.string().trim(),
  modified: z.string().trim(),
  canonical_url: z.string().trim(),
  tables_count: z.coerce.number().int().min(0).default(0),
  pdfs_count: z.coerce.number().int().min(0).default(0),
});

/**
 * TypeScript contract inferred from ContentFrontmatterSchema.
 */
export type ContentFrontmatter = z.infer<typeof ContentFrontmatterSchema>;

/**
 * Schema for an anchor link item in the Table of Contents.
 */
export const TableOfContentsItemSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  level: z.union([z.literal(2), z.literal(3)]),
});

export type TableOfContentsItem = z.infer<typeof TableOfContentsItemSchema>;

/**
 * Schema for navigation breadcrumbs.
 */
export const BreadcrumbItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export type BreadcrumbItem = z.infer<typeof BreadcrumbItemSchema>;

/**
 * Full page representation containing validated metadata,
 * extracted body content, and navigation artifacts.
 */
export const ContentPageSchema = z.object({
  frontmatter: ContentFrontmatterSchema,
  content: z.string(),
  filePath: z.string(),
  slugPath: z.array(z.string()),
  toc: z.array(TableOfContentsItemSchema).default([]),
  breadcrumbs: z.array(BreadcrumbItemSchema).default([]),
});

export type ContentPage = z.infer<typeof ContentPageSchema>;

/**
 * Validates raw frontmatter object and throws detailed Zod error if invalid.
 */
export function validateContentFrontmatter(data: unknown): ContentFrontmatter {
  return ContentFrontmatterSchema.parse(data);
}

/**
 * Safe validation returning Zod result object.
 */
export function safeValidateContentFrontmatter(data: unknown) {
  return ContentFrontmatterSchema.safeParse(data);
}
