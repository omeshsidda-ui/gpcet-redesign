-- ============================================================================
-- 20261102000002_indexes.sql: Indexing & Query Acceleration
-- Target: PostgreSQL 15+ (Supabase)
-- ============================================================================

-- A. Foreign Key B-Tree Indexes (prevents sequential scans during joins and deletes)
CREATE INDEX IF NOT EXISTS idx_faculty_dept ON public.faculty(department_code);
CREATE INDEX IF NOT EXISTS idx_docs_dept ON public.academic_documents(department_code);
CREATE INDEX IF NOT EXISTS idx_docs_reg ON public.academic_documents(regulation_id);
CREATE INDEX IF NOT EXISTS idx_notices_dept ON public.notices(department_code);
CREATE INDEX IF NOT EXISTS idx_inquiries_dept ON public.admissions_inquiries(desired_department);

-- B. Selective Partial Indexes (optimized for high-traffic hot paths)
-- Ticker circulars for instant homepage marquee
CREATE INDEX IF NOT EXISTS idx_notices_ticker_active 
    ON public.notices (published_at DESC) 
    WHERE is_ticker = TRUE AND is_active = TRUE;

-- Active pinned notices
CREATE INDEX IF NOT EXISTS idx_notices_pinned_active 
    ON public.notices (priority, published_at DESC) 
    WHERE is_pinned = TRUE AND is_active = TRUE;

-- Active faculty ordering
CREATE INDEX IF NOT EXISTS idx_faculty_active_sort 
    ON public.faculty (department_code, cadre, sno ASC) 
    WHERE is_active = TRUE;

-- Document categorization index
CREATE INDEX IF NOT EXISTS idx_docs_cat_year 
    ON public.academic_documents (category, academic_year DESC) 
    WHERE is_published = TRUE;

-- Recent inquiries requiring counselor review
CREATE INDEX IF NOT EXISTS idx_inquiries_pending 
    ON public.admissions_inquiries (created_at DESC) 
    WHERE status = 'new';

-- C. Native Full-Text Search (GIN) Indexes
CREATE INDEX IF NOT EXISTS idx_docs_fts ON public.academic_documents USING GIN (fts_vector);
CREATE INDEX IF NOT EXISTS idx_notices_fts ON public.notices USING GIN (fts_vector);

-- D. Trigram (pg_trgm) Indexes for Substring Autocomplete
CREATE INDEX IF NOT EXISTS idx_faculty_name_trgm ON public.faculty USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_docs_title_trgm ON public.academic_documents USING GIN (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_notices_title_trgm ON public.notices USING GIN (title gin_trgm_ops);
