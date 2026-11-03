-- ============================================================================
-- 20261102000004_triggers.sql: Maintenance & Audit Triggers
-- Target: PostgreSQL 15+ (Supabase)
-- ============================================================================

-- A. Generic updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS trg_dept_updated_at ON public.departments;
CREATE TRIGGER trg_dept_updated_at BEFORE UPDATE ON public.departments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_faculty_updated_at ON public.faculty;
CREATE TRIGGER trg_faculty_updated_at BEFORE UPDATE ON public.faculty FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_docs_updated_at ON public.academic_documents;
CREATE TRIGGER trg_docs_updated_at BEFORE UPDATE ON public.academic_documents FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_notices_updated_at ON public.notices;
CREATE TRIGGER trg_notices_updated_at BEFORE UPDATE ON public.notices FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_inquiries_updated_at ON public.admissions_inquiries;
CREATE TRIGGER trg_inquiries_updated_at BEFORE UPDATE ON public.admissions_inquiries FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- B. Audit logging trigger function (Universal for UUID and natural string PKs)
CREATE OR REPLACE FUNCTION public.handle_audit_log()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_record_id TEXT;
    v_old_data JSONB := NULL;
    v_new_data JSONB := NULL;
BEGIN
    IF (TG_OP = 'DELETE') THEN
        v_old_data := to_jsonb(OLD);
        v_record_id := COALESCE(v_old_data->>'id', v_old_data->>'code', 'unknown');
    ELSIF (TG_OP = 'UPDATE') THEN
        v_old_data := to_jsonb(OLD);
        v_new_data := to_jsonb(NEW);
        v_record_id := COALESCE(v_new_data->>'id', v_new_data->>'code', 'unknown');
    ELSIF (TG_OP = 'INSERT') THEN
        v_new_data := to_jsonb(NEW);
        v_record_id := COALESCE(v_new_data->>'id', v_new_data->>'code', 'unknown');
    END IF;

    INSERT INTO public.audit_logs (
        table_name,
        record_id,
        action,
        old_data,
        new_data,
        performed_by
    ) VALUES (
        TG_TABLE_NAME,
        v_record_id,
        TG_OP,
        v_old_data,
        v_new_data,
        auth.uid()
    );

    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Apply audit triggers to institutional tables
DROP TRIGGER IF EXISTS trg_audit_departments ON public.departments;
CREATE TRIGGER trg_audit_departments AFTER INSERT OR UPDATE OR DELETE ON public.departments FOR EACH ROW EXECUTE FUNCTION public.handle_audit_log();

DROP TRIGGER IF EXISTS trg_audit_faculty ON public.faculty;
CREATE TRIGGER trg_audit_faculty AFTER INSERT OR UPDATE OR DELETE ON public.faculty FOR EACH ROW EXECUTE FUNCTION public.handle_audit_log();

DROP TRIGGER IF EXISTS trg_audit_docs ON public.academic_documents;
CREATE TRIGGER trg_audit_docs AFTER INSERT OR UPDATE OR DELETE ON public.academic_documents FOR EACH ROW EXECUTE FUNCTION public.handle_audit_log();

DROP TRIGGER IF EXISTS trg_audit_notices ON public.notices;
CREATE TRIGGER trg_audit_notices AFTER INSERT OR UPDATE OR DELETE ON public.notices FOR EACH ROW EXECUTE FUNCTION public.handle_audit_log();

DROP TRIGGER IF EXISTS trg_audit_inquiries ON public.admissions_inquiries;
CREATE TRIGGER trg_audit_inquiries AFTER INSERT OR UPDATE OR DELETE ON public.admissions_inquiries FOR EACH ROW EXECUTE FUNCTION public.handle_audit_log();
