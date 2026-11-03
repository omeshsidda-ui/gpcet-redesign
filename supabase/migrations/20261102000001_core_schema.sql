-- ============================================================================
-- 20261102000001_core_schema.sql: GPCET Institutional Web Portal Schema
-- Target: PostgreSQL 15+ (Supabase)
-- ============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";     -- Native gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";      -- Trigram similarity search
CREATE EXTENSION IF NOT EXISTS "unaccent";     -- Accent-insensitive search
CREATE EXTENSION IF NOT EXISTS "btree_gist";   -- Advanced exclusion constraints

-- 2. Enumerated Types
DO $$ BEGIN
    CREATE TYPE public.faculty_cadre AS ENUM (
        'professor_hod',
        'professor',
        'associate_professor',
        'assistant_professor',
        'adjunct_faculty',
        'technical_staff',
        'administrative'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.notice_category AS ENUM (
        'circular',
        'examination',
        'admissions',
        'recruitment',
        'academic_calendar',
        'event',
        'tender',
        'statutory'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.notice_priority AS ENUM ('urgent', 'high', 'normal');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.inquiry_status AS ENUM ('new', 'contacted', 'verified', 'admitted', 'rejected', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Departments Table (Institutional Core)
CREATE TABLE IF NOT EXISTS public.departments (
    code VARCHAR(10) PRIMARY KEY, -- 'cse', 'ai', 'ece', 'eee', 'me', 'civil', 'hs', 'mba'
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    established_year INT NOT NULL CHECK (established_year >= 1990 AND established_year <= 2100),
    intake_ug INT DEFAULT 0 CHECK (intake_ug >= 0),
    intake_pg INT DEFAULT 0 CHECK (intake_pg >= 0),
    nba_accredited BOOLEAN DEFAULT FALSE,
    nba_valid_upto DATE,
    hod_faculty_id UUID, -- Foreign key linked below
    vision TEXT NOT NULL,
    mission TEXT[] NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 4. Academic Regulations Table
CREATE TABLE IF NOT EXISTS public.academic_regulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL, -- 'R20', 'R19', 'R18', 'R15'
    name VARCHAR(100) NOT NULL,
    program_type VARCHAR(20) NOT NULL CHECK (program_type IN ('UG', 'PG', 'MBA')),
    effective_from_year INT NOT NULL,
    effective_to_year INT,
    is_current BOOLEAN DEFAULT FALSE NOT NULL,
    syllabus_summary_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 5. Faculty Profiles Table (452 Verified Records)
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_code VARCHAR(10) REFERENCES public.departments(code) ON UPDATE CASCADE ON DELETE RESTRICT NOT NULL,
    sno INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    cadre public.faculty_cadre DEFAULT 'assistant_professor' NOT NULL,
    designation VARCHAR(150) NOT NULL,
    highest_qualification VARCHAR(255) DEFAULT '' NOT NULL,
    experience_years NUMERIC(4, 1) DEFAULT 0.0 CHECK (experience_years >= 0),
    email VARCHAR(255),
    phone VARCHAR(50),
    photo_url TEXT,
    profile_route TEXT, -- Nullable: 242/452 records lack dedicated individual profile pages
    is_hod BOOLEAN DEFAULT FALSE NOT NULL,
    bio TEXT,
    specializations TEXT[] DEFAULT '{}',
    degrees JSONB DEFAULT '[]'::jsonb, -- Array of { degree, field, institution, year }
    publications JSONB DEFAULT '[]'::jsonb, -- Array of { title, journal, year, doi, citationUrl }
    patents JSONB DEFAULT '[]'::jsonb, -- Array of { title, patentNumber, status, year }
    subjects_taught TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    CONSTRAINT uq_faculty_dept_slug UNIQUE (department_code, slug)
);

-- Add deferred foreign key to departments
ALTER TABLE public.departments 
    ADD CONSTRAINT fk_dept_hod 
    FOREIGN KEY (hod_faculty_id) 
    REFERENCES public.faculty(id) 
    ON DELETE SET NULL;

-- 6. Academic Documents & Media Manifest (5,822 Cataloged Files)
CREATE TABLE IF NOT EXISTS public.academic_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_code VARCHAR(10) REFERENCES public.departments(code) ON UPDATE CASCADE ON DELETE SET NULL,
    regulation_id UUID REFERENCES public.academic_regulations(id) ON UPDATE CASCADE ON DELETE SET NULL,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'syllabus', 'general_pdf', 'academic_calendar', 'general_image', 
        'campus_photo', 'faculty_photo', 'logo_badge', 'accreditation_doc', 
        'video', 'other', 'form_affidavit', 'circular', 'exam_timetable', 
        'lecture_presentation', 'regulation', 'governance', 'placement'
    )),
    academic_year VARCHAR(20), -- e.g. '2026-2027'
    semester VARCHAR(20),      -- e.g. 'I-I', 'IV-II'
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT CHECK (file_size_bytes >= 0),
    mime_type VARCHAR(100) DEFAULT 'application/pdf' NOT NULL,
    download_count INT DEFAULT 0 NOT NULL,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    -- Generated full-text search vector combining title and category
    fts_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(category, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(academic_year, '')), 'C')
    ) STORED,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 7. Institutional Notices, Circulars & Marquee Ticker
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_code VARCHAR(10) REFERENCES public.departments(code) ON UPDATE CASCADE ON DELETE SET NULL,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    summary VARCHAR(500),
    content_markdown TEXT NOT NULL,
    category public.notice_category DEFAULT 'circular' NOT NULL,
    priority public.notice_priority DEFAULT 'normal' NOT NULL,
    is_ticker BOOLEAN DEFAULT FALSE NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE NOT NULL,
    attachment_url TEXT,
    attachment_size_bytes BIGINT,
    published_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    expires_at TIMESTAMPTZ,
    author_id UUID,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    -- Full-text search vector
    fts_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(content_markdown, '')), 'C')
    ) STORED,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 8. Admissions Inquiries (Protected Submissions)
CREATE TABLE IF NOT EXISTS public.admissions_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(150) NOT NULL CHECK (char_length(trim(student_name)) >= 2),
    email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone VARCHAR(30) NOT NULL CHECK (char_length(trim(phone)) >= 10),
    desired_department VARCHAR(10) REFERENCES public.departments(code) ON UPDATE CASCADE ON DELETE RESTRICT NOT NULL,
    program VARCHAR(20) DEFAULT 'B.Tech' NOT NULL CHECK (program IN ('B.Tech', 'M.Tech', 'MBA')),
    eamcet_rank INT CHECK (eamcet_rank IS NULL OR eamcet_rank > 0),
    message TEXT CHECK (char_length(message) <= 2000),
    ip_hash VARCHAR(64) NOT NULL, -- SHA-256 hash of client IP for rate limiting / abuse detection
    user_agent VARCHAR(500),
    status public.inquiry_status DEFAULT 'new' NOT NULL,
    internal_notes TEXT,
    assigned_counselor_id UUID,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 9. Append-Only System Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100) NOT NULL,
    record_id TEXT NOT NULL, -- TEXT accommodates both UUIDs and string keys (e.g. departments.code)
    action VARCHAR(20) NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'RESTORE')),
    old_data JSONB,
    new_data JSONB,
    performed_by UUID,
    client_ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);
