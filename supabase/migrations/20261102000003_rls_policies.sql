-- ============================================================================
-- 20261102000003_rls_policies.sql: Hardened Row Level Security Policies
-- Target: PostgreSQL 15+ (Supabase)
-- ============================================================================

-- 1. Enable RLS across all institutional tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 2. Security Context Helpers
-- Read role exclusively from app_metadata (never raw_user_meta_data which is client-editable)
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
    SELECT COALESCE(
        auth.jwt() -> 'app_metadata' ->> 'role',
        'anon'
    );
$$;

-- Staff privilege validator
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
    SELECT public.current_user_role() IN ('admin', 'editor', 'counselor', 'hod');
$$;

-- 3. Public Read Policies with Staff Visibility Bypasses (Prevents RLS update/select lockouts)
CREATE POLICY "Public and staff can view departments" 
    ON public.departments FOR SELECT 
    TO anon, authenticated 
    USING (is_active = TRUE OR public.is_staff());

CREATE POLICY "Public can view regulations" 
    ON public.academic_regulations FOR SELECT 
    TO anon, authenticated 
    USING (TRUE);

CREATE POLICY "Public and staff can view faculty" 
    ON public.faculty FOR SELECT 
    TO anon, authenticated 
    USING (is_active = TRUE OR public.is_staff());

CREATE POLICY "Public and staff can view documents" 
    ON public.academic_documents FOR SELECT 
    TO anon, authenticated 
    USING (is_published = TRUE OR public.is_staff());

CREATE POLICY "Public and staff can view notices" 
    ON public.notices FOR SELECT 
    TO anon, authenticated 
    USING (
        (
            is_active = TRUE 
            AND published_at <= TIMEZONE('utc', NOW())
            AND (expires_at IS NULL OR expires_at > TIMEZONE('utc', NOW()))
        ) 
        OR public.is_staff()
    );

-- 4. Admissions Inquiries Security
CREATE POLICY "Public can submit inquiries" 
    ON public.admissions_inquiries FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (
        status = 'new' 
        AND char_length(student_name) >= 2 
        AND char_length(phone) >= 10
    );

CREATE POLICY "Counselors and admins can view inquiries" 
    ON public.admissions_inquiries FOR SELECT 
    TO authenticated 
    USING (public.current_user_role() IN ('admin', 'counselor'));

CREATE POLICY "Counselors and admins can update inquiries" 
    ON public.admissions_inquiries FOR UPDATE 
    TO authenticated 
    USING (public.current_user_role() IN ('admin', 'counselor'))
    WITH CHECK (public.current_user_role() IN ('admin', 'counselor'));

CREATE POLICY "Admins can delete inquiries" 
    ON public.admissions_inquiries FOR DELETE 
    TO authenticated 
    USING (public.current_user_role() = 'admin');

-- 5. Administrative Mutation Policies (Staff Only)
CREATE POLICY "Admins can manage departments" 
    ON public.departments FOR ALL 
    TO authenticated 
    USING (public.current_user_role() = 'admin')
    WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY "Staff can manage regulations" 
    ON public.academic_regulations FOR ALL 
    TO authenticated 
    USING (public.current_user_role() IN ('admin', 'editor'))
    WITH CHECK (public.current_user_role() IN ('admin', 'editor'));

CREATE POLICY "Staff can manage faculty" 
    ON public.faculty FOR ALL 
    TO authenticated 
    USING (public.current_user_role() IN ('admin', 'editor', 'hod'))
    WITH CHECK (public.current_user_role() IN ('admin', 'editor', 'hod'));

CREATE POLICY "Staff can manage documents" 
    ON public.academic_documents FOR ALL 
    TO authenticated 
    USING (public.current_user_role() IN ('admin', 'editor'))
    WITH CHECK (public.current_user_role() IN ('admin', 'editor'));

CREATE POLICY "Staff can manage notices" 
    ON public.notices FOR ALL 
    TO authenticated 
    USING (public.current_user_role() IN ('admin', 'editor'))
    WITH CHECK (public.current_user_role() IN ('admin', 'editor'));

-- 6. Audit Log Security (Append-only by trigger, viewable strictly by super-admin)
CREATE POLICY "Only admins can view audit logs" 
    ON public.audit_logs FOR SELECT 
    TO authenticated 
    USING (public.current_user_role() = 'admin');
