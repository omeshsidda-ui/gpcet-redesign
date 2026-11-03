-- ============================================================================
-- supabase/seed.sql: Institutional Dataset Seed (Departments, Faculty, Documents)
-- Generated deterministically from raw scraper snapshot
-- ============================================================================

-- 1. Seed Departments
INSERT INTO public.departments (code, name, short_name, established_year, intake_ug, intake_pg, nba_accredited, vision, mission, contact_email, contact_phone, is_active)
VALUES ('cse', 'Computer Science and Engineering', 'CSE', 2007, 180, 18, TRUE, 'To emerge as a Center of Excellence in Computer Science and Engineering by producing globally competent professionals.', '{"To provide quality education through innovative teaching-learning processes.","To promote research, entrepreneurship, and industry-institute collaboration.","To inculcate ethical values, leadership qualities, and lifelong learning."}', 'hodcse@gpcet.ac.in', '+91 9988776601', TRUE)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    intake_ug = EXCLUDED.intake_ug,
    intake_pg = EXCLUDED.intake_pg,
    nba_accredited = EXCLUDED.nba_accredited,
    vision = EXCLUDED.vision,
    mission = EXCLUDED.mission,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone;
INSERT INTO public.departments (code, name, short_name, established_year, intake_ug, intake_pg, nba_accredited, vision, mission, contact_email, contact_phone, is_active)
VALUES ('ai', 'Artificial Intelligence & Data Science', 'AI & DS', 2020, 60, 0, FALSE, 'To pioneer foundational and applied intelligence engineering solving modern societal challenges.', '{"To provide state-of-the-art computational infrastructure and curriculum in AI.","To foster interdisciplinary problem-solving and ethical algorithmic development."}', 'hodai@gpcet.ac.in', '+91 9988776602', TRUE)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    intake_ug = EXCLUDED.intake_ug,
    intake_pg = EXCLUDED.intake_pg,
    nba_accredited = EXCLUDED.nba_accredited,
    vision = EXCLUDED.vision,
    mission = EXCLUDED.mission,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone;
INSERT INTO public.departments (code, name, short_name, established_year, intake_ug, intake_pg, nba_accredited, vision, mission, contact_email, contact_phone, is_active)
VALUES ('ece', 'Electronics and Communication Engineering', 'ECE', 2007, 180, 18, TRUE, 'To produce highly skilled electronics and communication engineers meeting global industry standards.', '{"To deliver robust theoretical and practical training in communications and VLSI.","To encourage innovation and patents through dedicated project labs."}', 'hodece@gpcet.ac.in', '+91 9988776603', TRUE)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    intake_ug = EXCLUDED.intake_ug,
    intake_pg = EXCLUDED.intake_pg,
    nba_accredited = EXCLUDED.nba_accredited,
    vision = EXCLUDED.vision,
    mission = EXCLUDED.mission,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone;
INSERT INTO public.departments (code, name, short_name, established_year, intake_ug, intake_pg, nba_accredited, vision, mission, contact_email, contact_phone, is_active)
VALUES ('eee', 'Electrical and Electronics Engineering', 'EEE', 2007, 120, 0, TRUE, 'To lead the frontier of power systems, renewable energy, and electrical vehicle technology.', '{"To impart strong core engineering fundamentals and experimental skills.","To conduct active research in sustainable energy systems."}', 'hodeee@gpcet.ac.in', '+91 9988776604', TRUE)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    intake_ug = EXCLUDED.intake_ug,
    intake_pg = EXCLUDED.intake_pg,
    nba_accredited = EXCLUDED.nba_accredited,
    vision = EXCLUDED.vision,
    mission = EXCLUDED.mission,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone;
INSERT INTO public.departments (code, name, short_name, established_year, intake_ug, intake_pg, nba_accredited, vision, mission, contact_email, contact_phone, is_active)
VALUES ('me', 'Mechanical Engineering', 'ME', 2007, 60, 0, TRUE, 'To nurture world-class mechanical engineers adept in modern manufacturing, thermal systems, and robotics.', '{"To deliver high-impact engineering education with state-of-the-art machine shops.","To promote sustainability and energy efficiency in industrial applications."}', 'hodme@gpcet.ac.in', '+91 9988776605', TRUE)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    intake_ug = EXCLUDED.intake_ug,
    intake_pg = EXCLUDED.intake_pg,
    nba_accredited = EXCLUDED.nba_accredited,
    vision = EXCLUDED.vision,
    mission = EXCLUDED.mission,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone;
INSERT INTO public.departments (code, name, short_name, established_year, intake_ug, intake_pg, nba_accredited, vision, mission, contact_email, contact_phone, is_active)
VALUES ('civil', 'Civil Engineering', 'CIVIL', 2007, 60, 0, TRUE, 'To shape sustainable infrastructure leaders dedicated to societal welfare and modern structural design.', '{"To impart hands-on surveying, geotechnical, and environmental engineering training.","To foster smart city and green infrastructure research."}', 'hodcivil@gpcet.ac.in', '+91 9988776606', TRUE)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    intake_ug = EXCLUDED.intake_ug,
    intake_pg = EXCLUDED.intake_pg,
    nba_accredited = EXCLUDED.nba_accredited,
    vision = EXCLUDED.vision,
    mission = EXCLUDED.mission,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone;
INSERT INTO public.departments (code, name, short_name, established_year, intake_ug, intake_pg, nba_accredited, vision, mission, contact_email, contact_phone, is_active)
VALUES ('hs', 'Humanities and Sciences', 'H&S', 2007, 0, 0, FALSE, 'To provide a robust foundation in basic sciences, mathematics, and communicative English for engineering excellence.', '{"To cultivate scientific temper, critical thinking, and mathematical modeling ability.","To train students in professional communication and human values."}', 'hodhs@gpcet.ac.in', '+91 9988776607', TRUE)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    intake_ug = EXCLUDED.intake_ug,
    intake_pg = EXCLUDED.intake_pg,
    nba_accredited = EXCLUDED.nba_accredited,
    vision = EXCLUDED.vision,
    mission = EXCLUDED.mission,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone;
INSERT INTO public.departments (code, name, short_name, established_year, intake_ug, intake_pg, nba_accredited, vision, mission, contact_email, contact_phone, is_active)
VALUES ('mba', 'Master of Business Administration', 'MBA', 2008, 0, 120, FALSE, 'To develop ethical, innovative corporate leaders and entrepreneurs for dynamic global markets.', '{"To blend management theory with case study pedagogy and corporate internships.","To foster strategic vision, financial acumen, and leadership capabilities."}', 'hodmba@gpcet.ac.in', '+91 9988776608', TRUE)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    intake_ug = EXCLUDED.intake_ug,
    intake_pg = EXCLUDED.intake_pg,
    nba_accredited = EXCLUDED.nba_accredited,
    vision = EXCLUDED.vision,
    mission = EXCLUDED.mission,
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone;


-- 2. Seed Faculty Records (452 profiles)
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 1, 'Mr. M JAYABABU', 'm-jayababu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 2, 'Mrs. N S SWAPNA', 'n-s-swapna', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 3, 'Mr. MD ASIM', 'md-asim', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 4, 'Mr. K VINOD KUMAR REDDY', 'k-vinod-kumar-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 5, 'Mrs.K SANDHYA RANI', 'k-sandhya-rani', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 6, 'Mr.P SANDEEP KUMAR REDDY', 'p-sandeep-kumar-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 7, 'Mr. S NOOR MOHAMMED', 's-noor-mohammed', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 8, 'Mrs. B SWARAJYA LAKSHMI', 'b-swarajya-lakshmi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 9, 'Mr. N SOMANNA', 'n-somanna', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 10, 'Mr. A DAVID DONALD', 'a-david-donald', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 11, 'Mr. A RANJITH KUMAR', 'a-ranjith-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 12, 'Ms.B KAVITHA', 'b-kavitha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 13, 'Mrs. A PRATHIMA', 'a-prathima', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 14, 'Mr. SHAIK SADDAM HUSSAIN', 'shaik-saddam-hussain', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 15, 'Mr. M RAMU', 'm-ramu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 16, 'Mr. NARLA MAHENDRA', 'narla-mahendra', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 17, 'Mrs. K THEJESWARI', 'k-thejeswari', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 18, 'Mr. D LAKSHMI NARAYANA', 'd-lakshmi-narayana', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 19, 'Mrs. VARADA SUJATHA', 'varada-sujatha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 20, 'Ms. P SADIA KHANAM', 'p-sadia-khanam', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 21, 'Mr. S RUMANA FIRDOSE', 's-rumana-firdose', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 22, 'Mr. B SAHADEVA REDDY', 'b-sahadeva-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 23, 'Mrs. V NEELIMA', 'v-neelima', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 24, 'Ms. P SNIGDHASREE', 'p-snigdhasree', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 25, 'Ms. M MADHU LATHA', 'm-madhu-latha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 26, 'Mrs. G PRATHIBHA PRIYADARSHINI', 'g-prathibha-priyadarshini', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 27, 'Mr. N PARASHURAM', 'n-parashuram', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 28, 'Mrs. L SANDHYA REKHA', 'l-sandhya-rekha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 29, 'Mr. G VAMSIDHAR', 'g-vamsidhar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ai', 30, 'Mr. G GOPINATH', 'g-gopinath', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 1, 'P. Malathi', 'p-malathi', 'assistant_professor', 'Assistant Professor', 'M.SC, B.ED, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/P-Malathi.jpg', '/departments/civil/faculty/p-malathi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 2, 'Syeda Ayesha Jahan', 'syeda-ayesha-jahan', 'assistant_professor', 'Assistant Professor', '', 'https://www.gpcet.ac.in/wp-content/uploads/2020/10/SYEDA-AYESHA-JAHAN.jpg', '/departments/civil/faculty/syeda-ayesha-jahan', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 3, 'K.Santhosh Reddy', 'k-santhosh-reddy', 'assistant_professor', 'Assistant Professor', 'B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2020/10/K-SANTHOSH-REDDY.jpg', '/departments/civil/faculty/k-santhosh-reddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 4, 'K. Vijayabhaskar', 'k-vijayabhaskar', 'assistant_professor', 'Assistant Professor', '', 'https://www.gpcet.ac.in/wp-content/uploads/2020/10/K-VIJAYA-BHASKAR.jpg', '/departments/civil/faculty/k-vijayabhaskar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 5, 'Mohammad Faruk', 'mohammad-faruk', 'assistant_professor', 'Assistant Professor', '', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/Md.Faruq-Photo.jpg', '/departments/civil/faculty/mohammad-faruk', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 6, 'Ravi Kumar', 'ravi-kumar', 'assistant_professor', 'Assistant Professor', 'M.SC, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/M.RAVI_.jpg', '/departments/civil/faculty/ravi-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 7, 'Mithli Kiranmai', 'mithli-kiranmai', 'assistant_professor', 'Assistant Professor', 'M.SC, M.PHIL, PH.D, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-19-at-10.21.41-1.jpeg', '/departments/civil/faculty/mithli-kiranmai', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 8, 'A G GOPINATH', 'a-g-gopinath', 'assistant_professor', 'Assistant Professor', 'M.SC, B.ED, M.PHIL', 'https://www.gpcet.ac.in/wp-content/uploads/2022/05/A-G-Gopinath.jpg', '/departments/civil/faculty/a-g-gopinath', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 9, 'C.MANASA', 'c-manasa', 'assistant_professor', 'Assistant Professor', 'B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2022/05/C-Manasa.jpeg', '/departments/civil/faculty/c-manasa', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 10, 'C Venkateswaramma', 'c-venkateswaramma', 'assistant_professor', 'Assistant Professor', 'M.SC, B.ED, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2020/11/C.Venkateswaramma-Photo.jpg', '/departments/civil/faculty/c-venkateswaramma', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 11, 'Hari Krishna', 'hari-krishna', 'assistant_professor', 'Assistant Professor', 'B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2023/03/Photo-from-Hari.jpg', '/departments/civil/faculty/hari-krishna', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 12, 'Uzma', 'uzma', 'assistant_professor', 'Assistant Professor', '', 'https://www.gpcet.ac.in/wp-content/uploads/2023/03/uzma-1-1.jpg', '/departments/civil/faculty/uzma', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 13, 'Kadiyala Vijaya  Kumar', 'kadiyala-vijaya-kumar', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2022/12/vijaya-kumar-1.jpg', '/departments/civil/faculty/kadiyala-vijaya-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 14, 'N S SWAPNA', 'n-s-swapna', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2022/09/swapna-photo.jpg', '/departments/civil/faculty/n-s-swapna', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 15, 'Deena', 'deena', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/01/Deena-Photo.jpg', '/departments/civil/faculty/deena', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 16, 'HimaBindhu', 'himabindhu', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/01/Hima-Bindu-Photo-150x150.jpg', '/departments/civil/faculty/himabindhu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 17, 'Vijay Babu', 'vijay-babu', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/01/Y-Vijay-Babu-150x150.jpg', '/departments/civil/faculty/vijay-babu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 18, 'Venkateshwarlu', 'venkateshwarlu', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/01/K-Venka-teswarlu-CSE-150x150.jpeg', '/departments/civil/faculty/venkateshwarlu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 19, 'Raghavendra_CSE', 'raghavendra_cse', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH, PHD', 'https://www.gpcet.ac.in/wp-content/uploads/2021/12/Rahavendra-150x150.jpg', '/departments/civil/faculty/raghavendra-cse', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 20, 'Kamsali Sirisha', 'kamsali-sirisha', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/Sirisha-121x150.jpg', '/departments/civil/faculty/kamsali-sirisha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 21, 'Roja Ramani', 'roja-ramani', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/Roja-Ramani-128x150.jpg', '/departments/civil/faculty/roja-ramani', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 22, 'M Jayasunitha', 'm-jayasunitha', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/M-Jaya-Sunitha--127x150.jpg', '/departments/civil/faculty/m-jayasunitha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 23, 'B Sowjanya', 'b-sowjanya', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/B-Sowjanya.jpg', '/departments/civil/faculty/b-sowjanya', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 24, 'Sai Niveditha', 'sai-niveditha', 'assistant_professor', 'Assistant Professor', 'M.SC, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/Sai-Niveditha-Photo-150x150.jpg', '/departments/civil/faculty/sai-niveditha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 25, 'Ramakrishna', 'ramakrishna', 'assistant_professor', 'Assistant Professor', 'M.SC, M.PHIL, PHD, B.SC, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/G.Ramakrisha-Photo-150x150.jpeg', '/departments/civil/faculty/ramakrishna', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 26, 'T Sarala Devi', 't-sarala-devi', 'assistant_professor', 'Assistant Professor', 'MBA', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/sarala.png', '/departments/civil/faculty/t-sarala-devi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 27, 'Kalyani', 'kalyani', 'assistant_professor', 'Assistant Professor', '', 'https://www.gpcet.ac.in/wp-content/uploads/2021/03/Kalyani-232x300.jpg', '/departments/civil/faculty/kalyani', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 28, 'Hussainy', 'hussainy', 'assistant_professor', 'Assistant Professor', 'M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/03/Hussainy-240x300.jpg', '/departments/civil/faculty/hussainy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 29, 'Bramarambika', 'bramarambika', 'assistant_professor', 'Assistant Professor', 'M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/09/Bramarambika-photo-150x150.jpeg', '/departments/civil/faculty/bramarambika', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 30, 'Sunanda', 'sunanda', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/image-rotated-e1613475358479-150x150.jpeg', '/departments/civil/faculty/sunanda', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 31, 'K Varun Kumar Reddy', 'k-varun-kumar-reddy', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/12/Photo-150x150.jpg', '/departments/civil/faculty/k-varun-kumar-reddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 32, 'P.Chandrakalavathi', 'p-chandrakalavathi', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/12/chandrakala-150x150.jpeg', '/departments/civil/faculty/p-chandrakalavathi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 33, 'M Ebenezar', 'm-ebenezar', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/12/Ebenezar-150x150.jpeg', '/departments/civil/faculty/m-ebenezar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 34, 'T Aditya Sai Srinivas', 't-aditya-sai-srinivas', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/12/Aditya-150x150.jpeg', '/departments/civil/faculty/t-aditya-sai-srinivas', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 35, 'R Sandeep Kumar', 'r-sandeep-kumar', 'assistant_professor', 'Assistant Professor', 'M.TECH, PHD, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/10/R-Sandeep-Kumar-150x150.jpeg', '/departments/civil/faculty/r-sandeep-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 36, 'E Sravanthi', 'e-sravanthi', 'assistant_professor', 'Assistant Professor', 'MBA', 'https://www.gpcet.ac.in/wp-content/uploads/2020/11/T-Sai-Vasavi.jpeg', '/departments/civil/faculty/e-sravanthi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 37, 'GSreenuvasulu', 'gsreenuvasulu', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/10/sreenivasulu.jpg', '/departments/civil/faculty/gsreenuvasulu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 38, 'P Siva Kumar', 'p-siva-kumar', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/10/P-Siva-Kumar.jpg', '/departments/civil/faculty/p-siva-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 39, 'USupriya', 'usupriya', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/09/USupriya.png', '/departments/civil/faculty/usupriya', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 40, 'Vamsi', 'vamsi', 'associate_professor', 'Associate Professor', 'M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/09/vamsi.jpg', '/departments/civil/faculty/vamsi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 41, 'G Gopinath', 'g-gopinath', 'associate_professor', 'Associate Professor', 'M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/09/gopi-1.jpg', '/departments/civil/faculty/g-gopinath', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 42, 'Lavayna', 'lavayna', 'assistant_professor', 'Assistant Professor', 'M.SC, B.ED, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/B-Lavanya.jpg', '/departments/civil/faculty/lavayna', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 43, 'K Radha', 'k-radha', 'assistant_professor', 'Assistant Professor', 'MBA, M.B.A, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/K-Radha1.jpg', '/departments/civil/faculty/k-radha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 44, 'L V V Nagaraju', 'l-v-v-nagaraju', 'assistant_professor', 'Assistant Professor', 'MBA', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/L-V-V-NAGARAJU.jpg', '/departments/civil/faculty/l-v-v-nagaraju', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 45, 'J Usha Sree', 'j-usha-sree', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/USHA-MAM.jpg', '/departments/civil/faculty/j-usha-sree', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 46, 'Sivanandareddy.Y', 'sivanandareddy-y', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/Y-Sivananda-Reddy-photo1.jpg', '/departments/civil/faculty/sivanandareddy-y', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 47, 'A.Vinod Kumar', 'a-vinod-kumar', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/Vinod-photo1.jpg', '/departments/civil/faculty/a-vinod-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 48, 'VALICSE', 'valicse', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/IMG_20190608_093654-1.jpg', '/departments/civil/faculty/valicse', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 49, 'sravani', 'sravani', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/07/sravani.jpg', '/departments/civil/faculty/sravani', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 50, 'shashikala', 'shashikala', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/07/SASHIKALA.jpg', '/departments/civil/faculty/shashikala', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 51, 'ameenayasmeen', 'ameenayasmeen', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/07/yasmin.png', '/departments/civil/faculty/ameenayasmeen', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 52, 'ramarao', 'ramarao', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/IMG_20190608_144104.jpg', '/departments/civil/faculty/ramarao', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 53, 'K.SANDHYARANI', 'k-sandhyarani', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/07/sandhya-1.jpg', '/departments/civil/faculty/k-sandhyarani', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 54, 'supriyareddy', 'supriyareddy', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/07/supriya.png', '/departments/civil/faculty/supriyareddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 55, 'K.GAYATHRI', 'k-gayathri', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/07/gayi.jpg', '/departments/civil/faculty/k-gayathri', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 56, 'S.Loka Raghavendra', 's-loka-raghavendra', 'professor', 'Professor', 'M.SC, B.ED, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/S-Lokaraghavendra.jpg', '/departments/civil/faculty/s-loka-raghavendra', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 57, 'M.Sridevi', 'm-sridevi', 'professor', 'Professor', '', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/M-Sridevi.jpg', '/departments/civil/faculty/m-sridevi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 58, 'Shahina Nikhath', 'shahina-nikhath', 'assistant_professor', 'Assistant Professor', 'M.SC, M.PHIL, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/SHAHINA-NIKHATH-PHOTO.jpg', '/departments/civil/faculty/shahina-nikhath', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 59, 'N.Janaki', 'n-janaki', 'assistant_professor', 'Assistant Professor', 'M.SC, B.ED, B.SC, M.PHIL', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/N-JANAKI.jpg', '/departments/civil/faculty/n-janaki', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 60, 'Dr. S. Naga Chandrudu', 's-naga-chandrudu', 'assistant_professor', 'Assistant Professor', 'M.SC, PH.D, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/SNC.jpg', '/departments/civil/faculty/dr-s-naga-chandrudu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 61, 'Dr.Syeda Jeelani Basri', 'syeda-jeelani-basri', 'assistant_professor', 'Assistant Professor', 'M.SC, PH.D, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Dr-T-Syeda-Jeelani-Basri.jpg', '/departments/civil/faculty/dr-syeda-jeelani-basri', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 62, 'B.SUNEETHA', 'b-suneetha', 'assistant_professor', 'Assistant Professor', 'M.SC, M.PHIL, PH.D, B.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/B.Suneetha.jpg', '/departments/civil/faculty/b-suneetha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 63, 'Dr. T.Sujatha', 't-sujatha', 'assistant_professor', 'Assistant Professor', 'PH.D, B.SC, B.ED', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Dr-T-Sujatha.jpg', '/departments/civil/faculty/dr-t-sujatha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 64, 'G. Sashi Kumar', 'g-sashi-kumar', 'professor', 'Professor', '', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/G.SASHI-KUMAR.jpg', '/departments/civil/faculty/g-sashi-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 65, 'T. Sudheshna Devi', 't-sudheshna-devi', 'assistant_professor', 'Assistant Professor', 'MBA, M.B.A', 'https://www.gpcet.ac.in/wp-content/uploads/2020/11/S-Revathi.jpeg', '/departments/civil/faculty/t-sudheshna-devi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 66, 'Ruhi Afreen', 'ruhi-afreen', 'assistant_professor', 'Assistant Professor', 'MBA, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/RUHI.jpg', '/departments/civil/faculty/ruhi-afreen', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 67, 'N.Rajitha', 'n-rajitha', 'assistant_professor', 'Assistant Professor', 'MBA', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/N-Rajitha-P.jpg', '/departments/civil/faculty/n-rajitha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 68, 'M.Y.Naidu', 'm-y-naidu', 'assistant_professor', 'Assistant Professor', 'MBA, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Naidu.jpg', '/departments/civil/faculty/m-y-naidu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 69, 'C. NAGA GANESH', 'c-naga-ganesh', 'assistant_professor', 'Assistant Professor', 'M.B.A, MBA, M.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/C-Naga-Ganesh.jpg', '/departments/civil/faculty/c-naga-ganesh', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 70, 'Dr. H. S. ABZAL BASHA', 'h-s-abzal-basha', 'assistant_professor', 'Assistant Professor', 'M.B.A, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Dr-H-S-Abzal-Basha.jpg', '/departments/civil/faculty/dr-h-s-abzal-basha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 71, 'Dr. K. Nagaraju', 'k-nagaraju', 'assistant_professor', 'Assistant Professor', 'MBA, PH.D, B.SC, M.B.A', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/nagaraju1.jpg', '/departments/civil/faculty/dr-k-nagaraju', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 72, 'Dr. M. GIRIDHAR KUMAR,', 'm-giridhar-kumar', 'assistant_professor', 'Assistant Professor', 'MBA, B.ED, PH.D, PHD, M.B.A', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/M-Giridhar-Kumar-2.jpg', '/departments/civil/faculty/dr-m-giridhar-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 73, 'S Akhil Tej', 's-akhil-tej', 'assistant_professor', 'Assistant Professor', 'M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/AKHIL.jpg', '/departments/civil/faculty/s-akhil-tej', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 74, 'S Venkata Mahesh', 's-venkata-mahesh', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/MAHESH-PHOTO.jpg', '/departments/civil/faculty/s-venkata-mahesh', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 75, 'Mrs.P.Pavithra', 'p-pavithra', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/pavithra.jpg', '/departments/civil/faculty/mrs-p-pavithra', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 76, 'KONDURU ANAND', 'konduru-anand', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/ANAND-PIC.jpg', '/departments/civil/faculty/konduru-anand', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 77, 'C G Mohan Babu', 'c-g-mohan-babu', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/mohan.jpg', '/departments/civil/faculty/c-g-mohan-babu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 78, 'S.Vinay Babu', 's-vinay-babu', 'associate_professor', 'Associate Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/VINAY-PHOTO.jpg', '/departments/civil/faculty/s-vinay-babu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 79, 'Syed Afzal Basha', 'syed-afzal-basha', 'associate_professor', 'Associate Professor', 'PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/S.Afzal_.jpg', '/departments/civil/faculty/syed-afzal-basha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 80, 'Mr.K.Jagadeesh', 'k-jagadeesh', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/K.Jagadeesh.jpg', '/departments/civil/faculty/mr-k-jagadeesh', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 81, 'D. Farooq Basha', 'd-farooq-basha', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/farooq.jpg', '/departments/civil/faculty/d-farooq-basha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 82, 'ayeshashariff', 'ayeshashariff', 'assistant_professor', 'Assistant Professor', 'M.TECH, PHD, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2019/07/ayesha.jpg', '/departments/civil/faculty/ayeshashariff', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 83, 'R.Varaprasad', 'r-varaprasad', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/IMG_20190608_143652.jpg', '/departments/civil/faculty/r-varaprasad', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 84, 'K.Lakshmi', 'k-lakshmi', 'assistant_professor', 'Assistant Professor', 'M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/k.lakshmi.jpg', '/departments/civil/faculty/k-lakshmi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 85, 'D.JAYANARAYANA REDDY', 'd-jayanarayana-reddy', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/DSC_02661.png', '/departments/civil/faculty/d-jayanarayana-reddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 86, 'P Kiran Rao', 'p-kiran-rao', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/IMG_20190608_143546.jpg', '/departments/civil/faculty/p-kiran-rao', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 87, 'N.Parashuram', 'n-parashuram', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/IMG_20190608_140316-1.jpg', '/departments/civil/faculty/n-parashuram', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 88, 'M.Sri Lakshmi', 'm-sri-lakshmi', 'assistant_professor', 'Assistant Professor', 'M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/07/srilakshmi.jpg', '/departments/civil/faculty/m-sri-lakshmi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 89, 'P.Suman Prakash', 'p-suman-prakash', 'associate_professor', 'Associate Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/IMG_20190604_145431-1.jpg', '/departments/civil/faculty/p-suman-prakash', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 90, 'M.Janarhan', 'm-janarhan', 'associate_professor', 'Associate Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/janardhan.jpg', '/departments/civil/faculty/m-janarhan', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 91, 'Dr. K. Seshadri Ramana', 'k-seshadri-ramana', 'professor', 'Professor', 'M.TECH, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/IMG_20190604_145455.jpg', '/departments/civil/faculty/dr-k-seshadri-ramana', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 92, 'Dr.  S. Prem Kumar', 's-prem-kumar', 'professor', 'Professor', 'M.TECH, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/premkumar.jpg', '/departments/civil/faculty/dr-s-prem-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 93, 'Mr. SALE AKHIL TEJ', 'sale-akhil-tej', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 94, 'Mr.C G MOHAN BABU', 'c-g-mohan-babu-94', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 95, 'T SUHARIKA PAUL', 't-suharika-paul', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('civil', 96, 'Mr.M LOKANATHA REDDY', 'm-lokanatha-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 1, 'Jaswinder Kaur', 'jaswinder-kaur', 'assistant_professor', 'Assistant Professor', 'M.B.A', 'https://www.gpcet.ac.in/wp-content/uploads/2022/02/jaswander-kaur1-150x150.jpg', '/departments/cse/faculty/jaswinder-kaur', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 2, 'DR. M SRILAKSHMI', 'm-srilakshmi', 'professor_hod', 'PROFESSOR & DEAN', '', NULL, NULL, TRUE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 3, 'DR S PREM KUMAR', 'dr-s-prem-kumar', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 4, 'DR C RANJEETH KUMAR', 'dr-c-ranjeeth-kumar', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 5, 'DR P SUMAN PRAKASH', 'dr-p-suman-prakash', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 6, 'DR M JANARDAN', 'dr-m-janardan', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 7, 'DR. K SESHADRI RAMANA', 'k-seshadri-ramana', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 8, 'DR. T ADITYA SAI SRINIVAS', 't-aditya-sai-srinivas', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 9, 'DR. SABEENA B', 'sabeena-b', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 10, 'DR. B NAGALAKSHMI', 'b-nagalakshmi', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 11, 'DR C MADDILETY', 'dr-c-maddilety', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 12, 'DR. M KIRAN MAYEE', 'm-kiran-mayee', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 13, 'DR T GIRIBABU', 'dr-t-giribabu', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 14, 'DR B SURESH KUMAR', 'dr-b-suresh-kumar', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 15, 'Mr. K VIJAY KUMAR', 'k-vijay-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 16, 'Mrs. K LAKSHMI', 'k-lakshmi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 17, 'Mr. R VARA PRASAD', 'r-vara-prasad', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 18, 'Mrs. AMEENA YASMEEN', 'ameena-yasmeen', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 19, 'Mrs. B DEENA DIVYA NAYOMI', 'b-deena-divya-nayomi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 20, 'Mrs. M JAYASUNITHA', 'm-jayasunitha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 21, 'Ms. B ROJA RAMANI', 'b-roja-ramani', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 22, 'Mr. K VENKATESWARLU', 'k-venkateswarlu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 23, 'Mrs. D NAVYA DEVI', 'd-navya-devi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 24, 'Mrs. B CHANDRAKALA', 'b-chandrakala', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 25, 'Mrs. V LILLY GRACE', 'v-lilly-grace', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 26, 'Mr. U PREM SAGAR', 'u-prem-sagar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 27, 'Mrs. K MANJUSHA', 'k-manjusha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 28, 'Mrs. M HARITHA', 'm-haritha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 29, 'Mr. S HUPESH NAGA KETHAN', 's-hupesh-naga-kethan', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 30, 'Mrs. P RAJYA LAKSHMI', 'p-rajya-lakshmi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 31, 'Mr. V RAJASEKHAR', 'v-rajasekhar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 32, 'Mr. K SRINIVASULU ACHARI', 'k-srinivasulu-achari', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 33, 'Mrs. A SREEPRADHA', 'a-sreepradha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 34, 'Mr. K MAHESH BABU', 'k-mahesh-babu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 35, 'Mr. D K SHAREEF', 'd-k-shareef', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 36, 'Mr. KUMMARI NAGENDRUDU', 'kummari-nagendrudu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 37, 'Mr. Y SURENDRA', 'y-surendra', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 38, 'Mrs. B THULASI', 'b-thulasi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 39, 'Mr. G LOKESH', 'g-lokesh', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 40, 'Mrs. V SRAVANI', 'v-sravani', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 41, 'Mr. T N BALAKRISHNA', 't-n-balakrishna', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 42, 'Mrs. P VIJAYA KUMARI', 'p-vijaya-kumari', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 43, 'Mrs. P NAGA SHRUTHI', 'p-naga-shruthi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 44, 'Mrs. SYED SUHANA BEGUM', 'syed-suhana-begum', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 45, 'Mrs. D SWARNA', 'd-swarna', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 46, 'Ms. SHILPA', 'shilpa', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 47, 'Mr. T NISHANTH', 't-nishanth', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 48, 'Mrs. U CHAITHANYA', 'u-chaithanya', 'assistant_professor', 'TEACHING ASST', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 49, 'Mr. C V SATHEESH KUMAR', 'c-v-satheesh-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 50, 'Mr. D MOHAMMED ZILANI', 'd-mohammed-zilani', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 51, 'Mr. M NAVEEN BABU', 'm-naveen-babu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 52, 'Ms. S AZRA TABASUM', 's-azra-tabasum', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 53, 'Ms. KALVA NAGASWATHI', 'kalva-nagaswathi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 54, 'Mr. A S AFFAAN SAFI', 'a-s-affaan-safi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 55, 'Ms. A JAYANTHI', 'a-jayanthi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 56, 'Ms. GAJJALA PRIYANKA', 'gajjala-priyanka', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 57, 'Mr. DASARI AYYASWAMY', 'dasari-ayyaswamy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 58, 'Mr. KANDRA RAMA KRISHNA', 'kandra-rama-krishna', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 59, 'Mr. C PRAVEEN KUMAR', 'c-praveen-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 60, 'Mr. S RAJASEKHAR', 's-rajasekhar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 61, 'Mrs. ALLURI DAMAYANTHI', 'alluri-damayanthi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 62, 'Mr. G SREENIVASULU', 'g-sreenivasulu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 63, 'Mr. P SIVA KUMAR', 'p-siva-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 64, 'Mrs. Y INDIRA PRIYADARSHINI', 'y-indira-priyadarshini', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 65, 'Mr. S ASLAM SHAREEF', 's-aslam-shareef', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 66, 'Mrs. MACHAPURAM SAILAJA', 'machapuram-sailaja', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 67, 'Mrs. A SAI REKHA', 'a-sai-rekha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 68, 'Mrs. M SHAHEDA BEGUM', 'm-shaheda-begum', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 69, 'Mrs. G LUCY', 'g-lucy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 70, 'Mrs. S SARITHA', 's-saritha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 71, 'Mrs. SAMEENA YOUSUFF', 'sameena-yousuff', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('cse', 72, 'Mrs. V ROHINI', 'v-rohini', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 1, 'C. Lokanath Reddy', 'c-lokanath-reddy', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2023/03/C.Lokanath-Reddy.jpeg', '/departments/ece/faculty/c-lokanath-reddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 2, 'A.SWETHA RANI', 'a-swetha-rani', 'assistant_professor', 'Assistant Professor', 'B.TECH, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2023/02/A.Swetharani-Photo.jpg', '/departments/ece/faculty/a-swetha-rani', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 3, 'K.MAHESWARI', 'k-maheswari', 'assistant_professor', 'Assistant Professor', 'B.TECH, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/09/K.MAHESWARI.jpg', '/departments/ece/faculty/k-maheswari', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 4, 'Syed IshrathMoin', 'syed-ishrathmoin', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/09/ISHRATH-MOIN.jpg', '/departments/ece/faculty/syed-ishrathmoin', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 5, 'Y Bhanu Priya', 'y-bhanu-priya', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/Y.Bhanu-Priya-Photo-127x150.jpg', '/departments/ece/faculty/y-bhanu-priya', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 6, 'V Priyanka', 'v-priyanka', 'assistant_professor', 'Assistant Professor', 'M.TECH, MTECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/V.Priyanka-Photo-150x150.jpg', '/departments/ece/faculty/v-priyanka', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 7, 'CHANDRA LINGAMAIAH', 'chandra-lingamaiah', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/S.Chandra-Lingamaiah-Photo-150x150.jpg', '/departments/ece/faculty/chandra-lingamaiah', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 8, 'B Venkatesu', 'b-venkatesu', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/B.Venkatesu-Photo-150x150.jpeg', '/departments/ece/faculty/b-venkatesu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 9, 'A.SREEVANI', 'a-sreevani', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/A.Sreevani-Photo-150x150.jpg', '/departments/ece/faculty/a-sreevani', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 10, 'N.Hari Priya', 'n-hari-priya', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/N.Hari-Priya-Photo-144x150.jpg', '/departments/ece/faculty/n-hari-priya', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 11, 'M.Rachana', 'm-rachana', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/M.Rachana-Photo-133x150.jpg', '/departments/ece/faculty/m-rachana', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 12, 'Mary Swetha', 'mary-swetha', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/P.Mary-Swetha-Photo-150x150.jpg', '/departments/ece/faculty/mary-swetha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 13, 'CV Satheesh', 'cv-satheesh', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/12/Satish-Photo-150x150.jpeg', '/departments/ece/faculty/cv-satheesh', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 14, 'T N Balue', 't-n-balue', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/10/TN-Balu.jpg', '/departments/ece/faculty/t-n-balue', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 15, 'SHarika', 'sharika', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/10/4.a.-S.Harika-Photo-150x150.jpeg', '/departments/ece/faculty/sharika', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 16, 'TSuman', 'tsuman', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/10/3.a.-T.Suman-Photo-e1601971543721-150x150.jpg', '/departments/ece/faculty/tsuman', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 17, 'U.AshokKumar', 'u-ashokkumar', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/39.-U.Ashok-Kumar-150x150.jpg', '/departments/ece/faculty/u-ashokkumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 18, 'K.Kalyani', 'k-kalyani', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/38.-K.Kalyani-150x150.jpg', '/departments/ece/faculty/k-kalyani', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 19, 'GRajasekar', 'grajasekar', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/35.-G.Rajasekhar-150x150.jpg', '/departments/ece/faculty/grajasekar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 20, 'G.Mahalakshi', 'g-mahalakshi', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/33.-G.Mahalaxmi-150x150.jpg', '/departments/ece/faculty/g-mahalakshi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 21, 'S.Rukshana', 's-rukshana', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/32.-S.Ruksana-150x150.jpg', '/departments/ece/faculty/s-rukshana', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 22, 'B.Praveena', 'b-praveena', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/25.-B.Praveena-150x150.jpeg', '/departments/ece/faculty/b-praveena', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 23, 'T.SWETHA', 't-swetha', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/19.-T.SWETHA.jpg', '/departments/ece/faculty/t-swetha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 24, 'D.Imran', 'd-imran', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/D.Imran-photo.jpg', '/departments/ece/faculty/d-imran', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 25, 'S Sofia Saba', 's-sofia-saba', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/S.Sofia-Saba-photo.jpg', '/departments/ece/faculty/s-sofia-saba', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 26, 'Syed Shanawaz', 'syed-shanawaz', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/Syed-Shanawaz.jpg', '/departments/ece/faculty/syed-shanawaz', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 27, 'B.ERAMMA', 'b-eramma', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/B-ERAMMA.jpg', '/departments/ece/faculty/b-eramma', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 28, 'K.Vanitha', 'k-vanitha', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/K.Vanitha-photo.jpg', '/departments/ece/faculty/k-vanitha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 29, 'P. BinduSwetha', 'p-binduswetha', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/P.Binduswetha-photo.jpg', '/departments/ece/faculty/p-binduswetha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 30, 'K.Anil Kumar', 'k-anil-kumar', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/ANIL-KUMAR.jpg', '/departments/ece/faculty/k-anil-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 31, 'K. Uma Maheswari', 'k-uma-maheswari', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/UMA-MAHESHWARI.jpg', '/departments/ece/faculty/k-uma-maheswari', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 32, 'Ms.S.Fowzia Sultana', 's-fowzia-sultana', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/FOWZIA-SULTHANA.jpg', '/departments/ece/faculty/ms-s-fowzia-sultana', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 33, 'Kalva pushpakala', 'kalva-pushpakala', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/K-Pushpakala.jpg', '/departments/ece/faculty/kalva-pushpakala', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 34, 'K Vinod Kumar', 'k-vinod-kumar', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/K-VINOD-KUMAR.jpg', '/departments/ece/faculty/k-vinod-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 35, 'P. Vishnu Kumar', 'p-vishnu-kumar', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Vishnu-Kumar-Photo.jpg', '/departments/ece/faculty/p-vishnu-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 36, 'B.GEETHA RANI', 'b-geetha-rani', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/B-GEETHA-RANI.jpg', '/departments/ece/faculty/b-geetha-rani', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 37, 'Mr. Shravan Kumar Hulsoor', 'shravan-kumar-hulsoor', 'associate_professor', 'Associate Professor', 'B.TECH, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/shravan.jpg', '/departments/ece/faculty/mr-shravan-kumar-hulsoor', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 38, 'Dr. D.Rajasekhar', 'd-rajasekhar', 'associate_professor', 'Associate Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Dr.-D-RAJASEKHAR.jpg', '/departments/ece/faculty/dr-d-rajasekhar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 39, 'Dr. K.E.Sreenivasa Murthy', 'k-e-sreenivasa-murthy', 'professor', 'Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/KESM.jpg', '/departments/ece/faculty/dr-k-e-sreenivasa-murthy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 40, 'A. Swetha', 'a-swetha', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/A-SWETHA.jpg', '/departments/ece/faculty/a-swetha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 41, 'Ms.A.Parvathi', 'a-parvathi', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/A-PARVATHI.jpg', '/departments/ece/faculty/ms-a-parvathi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 42, 'Dr. TALARI TIRUPAL', 'talari-tirupal', 'professor_hod', 'PROFESSOR & DEAN', '', NULL, NULL, TRUE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 43, 'Dr. K C T SWAMY', 'k-c-t-swamy', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 44, 'Dr. B RAVI CHANDRA', 'b-ravi-chandra', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 45, 'Dr. NALUBOLU GEETHA RANI', 'nalubolu-geetha-rani', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 46, 'DR Y MADHU KEERTHANA', 'dr-y-madhu-keerthana', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 47, 'DR K RAJKUMAR', 'dr-k-rajkumar', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 48, 'Mr. GUDE RAMARAO', 'gude-ramarao', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 49, 'Mr.P VISHNU KUMAR', 'p-vishnu-kumar-49', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 50, 'Mrs. SOWDAGAR FOWZIA SULTHANA', 'sowdagar-fowzia-sulthana', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 51, 'Mrs. KUMMARI UMA MAHESWARI', 'kummari-uma-maheswari', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 52, 'Mrs. ALLURU SREEVANI', 'alluru-sreevani', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 53, 'Mrs. BODA ERAMMA', 'boda-eramma', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 54, 'Mrs. VANDAVASI PRIYANKA', 'vandavasi-priyanka', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 55, 'Mrs. KOTLA MAHESWARI', 'kotla-maheswari', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 56, 'Ms. YEDDULAMALA BHANU PRIYA', 'yeddulamala-bhanu-priya', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 57, 'Mr. CHILAKALA LOKANATH REDDY', 'chilakala-lokanath-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 58, 'Mr. TALARI KISHORE', 'talari-kishore', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 59, 'Mrs. T RANJITHA DEVI', 't-ranjitha-devi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 60, 'Mrs. BOGGULA SULOCHANA', 'boggula-sulochana', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 61, 'Mr .TOWSEEF AHMED', 'mr-towseef-ahmed', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 62, 'Ms. A BHARGAVI', 'a-bhargavi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 63, 'Ms. M LALITHA MEGHANA', 'm-lalitha-meghana', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 64, 'Ms. D ANUSHA', 'd-anusha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 65, 'Mr. K VENKATA SIVA REDDY', 'k-venkata-siva-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 66, 'Mr. P KISHOR KUMAR', 'p-kishor-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 67, 'Mrs. C AHALYA', 'c-ahalya', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 68, 'Mr G ASHOK KUMAR', 'mr-g-ashok-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 69, 'Ms.SHAIK ZEBA MEHREEN', 'shaik-zeba-mehreen', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('ece', 70, 'Mrs P IPSHITHA', 'mrs-p-ipshitha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 1, 'Dr.D.VeerabhadraBabu', 'd-veerabhadrababu', 'professor', 'Professor', 'PH.D, M.TECH, PHD', 'https://www.gpcet.ac.in/wp-content/uploads/2023/02/Dr.D.Veerabhadrababu.jpg', '/departments/eee/faculty/dr-d-veerabhadrababu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 2, 'MADDIKERA KRISHNA REDDY', 'maddikera-krishna-reddy', 'assistant_professor', 'Assistant Professor', 'B.TECH, M.TECH, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2022/09/M.KRISHNA-REDDY.jpg', '/departments/eee/faculty/maddikera-krishna-reddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 3, 'B. Ravi Chandra', 'b-ravi-chandra', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, PHD, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/09/B.RAVI-CHANDRA.jpg', '/departments/eee/faculty/b-ravi-chandra', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 4, 'Zaheer Pasha', 'zaheer-pasha', 'associate_professor', 'Associate Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/09/Dr.-Jahir-pasha-232x300.jpg', '/departments/eee/faculty/zaheer-pasha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 5, 'M Rudra Kumar', 'm-rudra-kumar', 'professor', 'Professor', 'PH.D, B.TECH, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/01/Dr-Rudra-150x150.jpg', '/departments/eee/faculty/m-rudra-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 6, 'Mohammad Riyaz Belgaum', 'mohammad-riyaz-belgaum', 'associate_professor', 'Associate Professor', 'PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/Riyaz.jpg', '/departments/eee/faculty/mohammad-riyaz-belgaum', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 7, 'Indira', 'indira', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/Indira-jpeg-150x150.jpeg', '/departments/eee/faculty/indira', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 8, 'S, TOWSEEF AHMED', 's-towseef-ahmed', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/S.Towseef-Ahmed-Photo-150x150.jpeg', '/departments/eee/faculty/s-towseef-ahmed', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 9, 'Siva', 'siva', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/SHIVA-234x300.jpg', '/departments/eee/faculty/siva', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 10, 'Raziya', 'raziya', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/RAZIYA-229x300.jpg', '/departments/eee/faculty/raziya', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 11, 'Praveen', 'praveen', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/PRAVEEN-224x300.jpg', '/departments/eee/faculty/praveen', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 12, 'Nishanth', 'nishanth', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/Nishanth-243x300.jpg', '/departments/eee/faculty/nishanth', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 13, 'Dr. SANDIP SWARNAKAR', 'sandip-swarnakar', 'professor', 'Professor', 'M.TECH, PHD, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/02/swarnakar-150x150.jpg', '/departments/eee/faculty/dr-sandip-swarnakar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 14, 'V.Sowmya Sree', 'v-sowmya-sree', 'professor', 'Professor', 'M.TECH, PHD, B.TECH, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/sowmya-sree.jpg', '/departments/eee/faculty/v-sowmya-sree', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 15, 'LNeelu', 'lneelu', 'associate_professor', 'Associate Professor', 'M.TECH, PHD, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/Pass-Pic-150x150.jpg', '/departments/eee/faculty/lneelu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 16, 'MDFaruq', 'mdfaruq', 'assistant_professor', 'Assistant Professor', '', 'https://www.gpcet.ac.in/wp-content/uploads/2021/02/Md.Faruq-Photo-150x150.jpg', '/departments/eee/faculty/mdfaruq', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 17, 'Ipshitha', 'ipshitha', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/12/ipshitha-150x150.jpg', '/departments/eee/faculty/ipshitha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 18, 'EEE_Girija', 'eee_girija', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/Girija-150x150.jpg', '/departments/eee/faculty/eee-girija', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 19, 'EEE_Pradeep', 'eee_pradeep', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/P-PRADEEP-KUMAR-150x150.jpeg', '/departments/eee/faculty/eee-pradeep', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 20, 'EEE_Pravallika', 'eee_pravallika', 'professor', 'Professor', 'B.TECH, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/Pravallika-150x150.jpg', '/departments/eee/faculty/eee-pravallika', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 21, 'EEE_SivaDeepthi', 'eee_sivadeepthi', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/Siva-Deepthi-150x150.jpg', '/departments/eee/faculty/eee-sivadeepthi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 22, 'EEE_Sivaram', 'eee_sivaram', 'professor', 'Professor', 'B.TECH, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/Siva-ram-150x150.jpg', '/departments/eee/faculty/eee-sivaram', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 23, 'EEE_Urmila', 'eee_urmila', 'professor', 'Professor', 'B.TECH, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/03/Urmila-150x150.jpg', '/departments/eee/faculty/eee-urmila', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 24, 'Dr. K. Sathish Babu', 'k-sathish-babu', 'professor', 'Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/Photo-Dr.-K-Sathish-Babu1.jpg', '/departments/eee/faculty/dr-k-sathish-babu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 25, 'P.A.Irfan Khan', 'p-a-irfan-khan', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/PA-Irfan-Khan.jpg', '/departments/eee/faculty/p-a-irfan-khan', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 26, 'Dr. K.MALLIKARJUNA', 'k-mallikarjuna', 'professor', 'Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/Dr.-K.-MALLIKARJUNA-PHOTO.jpg', '/departments/eee/faculty/dr-k-mallikarjuna', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 27, 'K. Venkateswaramma', 'k-venkateswaramma', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/K.Venkateswaramma-photo-1.jpg', '/departments/eee/faculty/k-venkateswaramma', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 28, 'P.Anusha', 'p-anusha', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/P.Anusha-photo-1.jpg', '/departments/eee/faculty/p-anusha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 29, 'B.Vishala', 'b-vishala', 'professor', 'Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/B.Vishala-photo-2.jpg', '/departments/eee/faculty/b-vishala', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 30, 'K.SWARNA MADHURI', 'k-swarna-madhuri', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/SWARNA-MADHURI.jpg', '/departments/eee/faculty/k-swarna-madhuri', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 31, 'Mohammed Abdul Farida', 'mohammed-abdul-farida', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/M-A-FARIDA.jpg', '/departments/eee/faculty/mohammed-abdul-farida', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 32, 'Mr.E.Upendranath Goud', 'e-upendranath-goud', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/UPENDRA.jpg', '/departments/eee/faculty/mr-e-upendranath-goud', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 33, 'Gude Ramarao', 'gude-ramarao', 'associate_professor', 'Associate Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/GUDE-RAMARAO.jpg', '/departments/eee/faculty/gude-ramarao', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 34, 'Mr.B.Obulesu', 'b-obulesu', 'associate_professor', 'Associate Professor', 'M.TECH, PH.D, B.TECH, BED', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/B-OBULESU.jpg', '/departments/eee/faculty/mr-b-obulesu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 35, 'Dr. T. TIRUPAL', 't-tirupal', 'associate_professor', 'Associate Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Dr-T-TIRUPAL.jpg', '/departments/eee/faculty/dr-t-tirupal', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 36, 'Dr. K.C.T.Swamy', 'k-c-t-swamy', 'associate_professor', 'Associate Professor', 'PH.D, B.TECH, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Dr.-K-C-T-SWAMY.jpg', '/departments/eee/faculty/dr-k-c-t-swamy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 37, 'Dr.C.Srinivasarao', 'c-srinivasarao', 'professor', 'Professor', 'PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/principal-1.jpg', '/departments/eee/faculty/dr-c-srinivasarao', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 38, 'Dr. N.Ramamurthy', 'n-ramamurthy', 'professor', 'Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Dr-N-Rammurthy.jpg', '/departments/eee/faculty/dr-n-ramamurthy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 39, 'Mr. A.SREEKANTH', 'a-sreekanth', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/A-Sreekanth.jpg', '/departments/eee/faculty/mr-a-sreekanth', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 40, 'Y.Hazarathaiah', 'y-hazarathaiah', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/Y.Hazarathaiah.jpg', '/departments/eee/faculty/y-hazarathaiah', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 41, 'U CHAITHANYA', 'u-chaithanya', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/U.Chaithanya.jpg', '/departments/eee/faculty/u-chaithanya', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 42, 'S.Sankara Prasad', 's-sankara-prasad', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/SANKARAPRASAD-PHOTO.jpg', '/departments/eee/faculty/s-sankara-prasad', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 43, 'S Divya', 's-divya', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/divya-1.jpg', '/departments/eee/faculty/s-divya', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 44, 'Mrs. R. Vasudha', 'r-vasudha', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/VASUDHA-PHOTO.jpg', '/departments/eee/faculty/mrs-r-vasudha', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 45, 'Ms. R. Sheba Rani', 'r-sheba-rani', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/R-SHEBA-RANI-PHOTO.jpg', '/departments/eee/faculty/ms-r-sheba-rani', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 46, 'Venkateswarlu', 'venkateswarlu', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/M-VENKATESWARLU-PHOTO.jpg', '/departments/eee/faculty/venkateswarlu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 47, 'K JAYA SREE', 'k-jaya-sree', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/jayasree-1.jpg', '/departments/eee/faculty/k-jaya-sree', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 48, 'K DEEPAK', 'k-deepak', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/K.Deepak.jpg', '/departments/eee/faculty/k-deepak', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 49, 'Dr.G.Pandu Ranga Reddy', 'g-pandu-ranga-reddy', 'associate_professor', 'Associate Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/G-PANDURANGA-REDDY-PHOTO-1.jpg', '/departments/eee/faculty/dr-g-pandu-ranga-reddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 50, 'E.Jyothirmai', 'e-jyothirmai', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/E.Jyothirmai-Photo-graph.jpg', '/departments/eee/faculty/e-jyothirmai', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 51, 'M. Bhagya Lakshmi', 'm-bhagya-lakshmi', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/M.Bhagyalakshmi.jpg', '/departments/eee/faculty/m-bhagya-lakshmi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 52, 'Dr.B.V.Rami Reddy', 'b-v-rami-reddy', 'professor', 'Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/RAMIREDDY-PHOTO.jpg', '/departments/eee/faculty/dr-b-v-rami-reddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 53, 'A.Suresh Kumar', 'a-suresh-kumar', 'professor', 'Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/A.Suresh-Kumar-Photo-graph.jpg', '/departments/eee/faculty/a-suresh-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 54, 'Dr. V.Vijaya Kishore', 'v-vijaya-kishore', 'professor', 'Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/07/DSC_6358.jpg', '/departments/eee/faculty/dr-v-vijaya-kishore', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 55, 'Dr.M.Rama Prasad Reddy', 'm-rama-prasad-reddy', 'professor', 'Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/Dr.jpg', '/departments/eee/faculty/dr-m-rama-prasad-reddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 56, 'Dr K Sreenivasulu', 'dr-k-sreenivasulu', 'professor', 'Professor', 'PH.D, B.TECH, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Sreenivasulu.jpeg', '/departments/eee/faculty/dr-k-sreenivasulu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 57, 'Dr. COPPISETTY SRINIVASA RAO', 'coppisetty-srinivasa-rao', 'professor', 'PRINCIPAL', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 58, 'Dr. G PANDURANGA REDDY', 'g-panduranga-reddy', 'professor_hod', 'PROFESSOR & DEAN', '', NULL, NULL, TRUE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 59, 'DR. M RAMA PRASAD REDDY', 'm-rama-prasad-reddy-59', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 60, 'DR B V RAMIREDDY', 'dr-b-v-ramireddy', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 61, 'DR M VENKATESHWARLU', 'dr-m-venkateshwarlu', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 62, 'Dr. KARANAM DEEPAK', 'karanam-deepak', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 63, 'Mrs.M BHAGYA LAKSHMI', 'm-bhagya-lakshmi-63', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 64, 'Mr.S SANKARA PRASAD', 's-sankara-prasad-64', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('eee', 65, 'Mrs.D RAZIYA', 'd-raziya', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 1, 'S.N.Chandrika', 's-n-chandrika', 'assistant_professor', 'Assistant Professor', 'MSC, B.SC, M.SC', 'https://www.gpcet.ac.in/wp-content/uploads/2020/10/s-n-chandrika.jpg', '/departments/hs/faculty/s-n-chandrika', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 2, 'DR M GIRIDHAR KUMAR', 'dr-m-giridhar-kumar', 'professor', 'VICE PRINCIPAL', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 3, 'DR B SUNEETHA', 'dr-b-suneetha', 'professor_hod', 'PROFESSOR & DEAN', '', NULL, NULL, TRUE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 4, 'DR J MAMATHA', 'dr-j-mamatha', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 5, 'DR M YELLAIAH NAIDU', 'dr-m-yellaiah-naidu', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 6, 'DR SYEDA JEELANI BASRI', 'dr-syeda-jeelani-basri', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 7, 'DR K MAITHILI KIRANMAI', 'dr-k-maithili-kiranmai', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 8, 'DR A UMA RAVI SANKAR', 'dr-a-uma-ravi-sankar', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 9, 'DR SHAHAB KHAN P', 'dr-shahab-khan-p', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 10, 'DR M YELLAPPA', 'dr-m-yellappa', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 11, 'DR H S ABZAL BASHA', 'dr-h-s-abzal-basha', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 12, 'Mr. G SASHI KUMAR', 'g-sashi-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 13, 'Mr. S LOKA RAGHAVENDRA', 's-loka-raghavendra', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 14, 'Mr. M RAVI', 'm-ravi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 15, 'Mrs. B LAVANYA', 'b-lavanya', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 16, 'Mrs. M SRIDEVI', 'm-sridevi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 17, 'Mr. MD FARUK', 'md-faruk', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 18, 'Mrs. N RAJITHA', 'n-rajitha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 19, 'Mrs. N JANAKI', 'n-janaki', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 20, 'Ms. SYEDA AYESHA JAHAN', 'syeda-ayesha-jahan', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 21, 'Mr. K VIJAYA BHASKAR', 'k-vijaya-bhaskar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 22, 'Ms. C MANASA', 'c-manasa', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 23, 'Mrs. Y APARNA', 'y-aparna', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 24, 'DR M MADHU SEKHAR', 'dr-m-madhu-sekhar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 25, 'Ms. B SRAVANTHI', 'b-sravanthi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 26, 'Mr. V DIVAKAR NAIDU', 'v-divakar-naidu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 27, 'Mr. M GOPINATH REDDY', 'm-gopinath-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 28, 'Mr. A M PRASANNA KUMAR', 'a-m-prasanna-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 29, 'Mr. K HARINATH REDDY', 'k-harinath-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 30, 'Mr. V NARASIMHA REDDY', 'v-narasimha-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 31, 'Mr. K RAMACHANDRUDU', 'k-ramachandrudu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 32, 'Mr. D SURENDRANATHA REDDY', 'd-surendranatha-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 33, 'Mr. B VENKATA KRISHNA REDDY', 'b-venkata-krishna-reddy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 34, 'Mr. B SIVA', 'b-siva', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 35, 'Ms. M GURU DEVI', 'm-guru-devi', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 36, 'Mr. M VEERESH', 'm-veeresh', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 37, 'Ms. R ARCHANA', 'r-archana', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 38, 'Mrs. DEENA GRACE ABIGAEL', 'deena-grace-abigael', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 39, 'Mr. G RAJARAO', 'g-rajarao', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 40, 'Mr. V SHIVASHANKARA ACHARI', 'v-shivashankara-achari', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 41, 'Ms. B RAJESWARI', 'b-rajeswari', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 42, 'Mr. K SREENIVASULU', 'k-sreenivasulu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 43, 'Mr. P SIDDIQ', 'p-siddiq', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 44, 'Mr. K B RAJESWAR', 'k-b-rajeswar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 45, 'Ms. PUSHPALATHA', 'pushpalatha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 46, 'Ms. SUREKHA', 'surekha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 47, 'Ms. M T NAGAMANI', 'm-t-nagamani', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 48, 'Ms. E NAGAMANI', 'e-nagamani', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 49, 'Ms. T SUJATHA', 't-sujatha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 50, 'Ms. LALITHA', 'lalitha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 51, 'Mr. M JAYAKRISHNA', 'm-jayakrishna', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 52, 'Mr. CHANDRASEKHAR', 'chandrasekhar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 53, 'Mr. VIJAYUDU', 'vijayudu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 54, 'Ms. B PARVATHAMMA', 'b-parvathamma', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 55, 'Ms. T SOWMYA', 't-sowmya', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 56, 'Ms. P UMA MAHESWARI', 'p-uma-maheswari', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 57, 'Ms. A SREELEKHA', 'a-sreelekha', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 58, 'Mr. C BALA HUSSAINY', 'c-bala-hussainy', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 59, 'Mr. M JAYARAMUDU', 'm-jayaramudu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 60, 'Ms. GHANSHYAMBHAI GOVINDBHAI TEJANI', 'ghanshyambhai-govindbhai-tejani', 'professor', 'PROFESSOR', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 61, 'Ms. B GEETHA RANI', 'b-geetha-rani', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 62, 'Mr. S ANIL KUMAR', 's-anil-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 63, 'Dr. G Ramachandra Reddy', 'g-ramachandra-reddy', 'professor', 'Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 64, 'Dr. V Suresh Babu', 'v-suresh-babu', 'professor', 'Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 65, 'Dr. D R Venkatesh', 'd-r-venkatesh', 'professor', 'Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 66, 'Dr. S. Naga Chandrudu', 's-naga-chandrudu', 'associate_professor', 'Associate Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 67, 'Dr. K Rama Krishna', 'k-rama-krishna', 'associate_professor', 'Associate Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 68, 'Dr. K Tanveer', 'k-tanveer', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 69, 'Dr. C Pavan Kumar', 'c-pavan-kumar', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 70, 'Dr.T Syeda Jeelani Basari', 't-syeda-jeelani-basari', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 71, 'E Swarna Gowri', 'e-swarna-gowri', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 72, 'P Ramakrishna', 'p-ramakrishna', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 73, 'L.Tayseen khanam', 'l-tayseen-khanam', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 74, 'G.Siddesh Babu', 'g-siddesh-babu', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 75, 'P Malathi', 'p-malathi', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 76, 'R.Simon', 'r-simon', 'assistant_professor', 'Librarian', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 77, 'G.Durga prasad', 'g-durga-prasad', 'assistant_professor', 'Assistant Librarian', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 78, 'J Venkataramana Murthy', 'j-venkataramana-murthy', 'assistant_professor', 'P.D.', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 79, 'Neela Kantha Reddy', 'neela-kantha-reddy', 'assistant_professor', 'Asst Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('hs', 80, 'G HARSHA VARDHANREDDY', 'g-harsha-vardhanreddy', 'assistant_professor', 'Asst Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 1, 'DR. C NAGA GANESH', 'c-naga-ganesh', 'professor_hod', 'PROFESSOR & DEAN', '', NULL, NULL, TRUE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 2, 'DR NAGARAJU KOLLA', 'dr-nagaraju-kolla', 'associate_professor', 'ASSOCIATE PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 3, 'Mr. M MADDILETY', 'm-maddilety', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 4, 'Mr. L V V NAGARAJU', 'l-v-v-nagaraju', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 5, 'Mrs. M SWAROOPA RANI', 'm-swaroopa-rani', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 6, 'Mr.M VENKATESWARLU', 'm-venkateswarlu', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 7, 'Dr M.Giridhar Kumar', 'dr-m-giridhar-kumar', 'professor_hod', 'Professor & HOD', '', NULL, NULL, TRUE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 8, 'Dr H S Abzal Basha', 'dr-h-s-abzal-basha', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 9, 'O Sridhar', 'o-sridhar', 'associate_professor', 'Associate Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 10, 'Dr Nagaraju', 'dr-nagaraju', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 11, 'Dr P Sravan', 'dr-p-sravan', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 12, 'M.Yellaiah Naidu', 'm-yellaiah-naidu', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 13, 'Ruhi Afreen', 'ruhi-afreen', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 14, 'M Maddulety', 'm-maddulety', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 15, 'E.Sravanthi', 'e-sravanthi', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('mba', 16, 'N.Rajitha', 'n-rajitha', 'assistant_professor', 'Assistant Professor', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 1, 'Dr S M Ravi Kumar', 'dr-s-m-ravi-kumar', 'associate_professor', 'Associate Professor', 'PH.D, MTECH, PHD, B.TECH, M.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/09/Dr-S.M.RAVI-KUMAR-289x300.jpg', '/departments/me/faculty/dr-s-m-ravi-kumar', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 2, 'Dr L Jaykishan Nayak', 'dr-l-jaykishan-nayak', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/09/Dr.L-.-J-.-Nayak-240x300.jpg', '/departments/me/faculty/dr-l-jaykishan-nayak', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 3, 'CHINNAVEERESH', 'chinnaveeresh', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2022/01/photo.jpg', '/departments/me/faculty/chinnaveeresh', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 4, 'veena', 'veena', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, PHD', 'https://www.gpcet.ac.in/wp-content/uploads/2021/11/C-THEJASWINI-VEENA--144x150.jpg', '/departments/me/faculty/veena', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 5, 'M.Nagaraju', 'm-nagaraju', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/nagaraju-150x150.jpg', '/departments/me/faculty/m-nagaraju', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 6, 'Krishna Chaitanya', 'krishna-chaitanya', 'assistant_professor', 'Assistant Professor', 'PHD, B.TECH, M.TECH, PH.D', 'https://www.gpcet.ac.in/wp-content/uploads/2021/10/chaitanya-150x150.jpg', '/departments/me/faculty/krishna-chaitanya', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 7, 'V.Viswanatha Chari', 'v-viswanatha-chari', 'assistant_professor', 'Assistant Professor', 'B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/V-VISWANATHA-CHARI-PHOTO.jpg', '/departments/me/faculty/v-viswanatha-chari', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 8, 'A.Srinivas', 'a-srinivas', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2020/02/A-SRINIVAS-PHOTO.jpg', '/departments/me/faculty/a-srinivas', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 9, 'Mr G Siva Prasad', 'mr-g-siva-prasad', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/08/siva-photo.jpg', '/departments/me/faculty/mr-g-siva-prasad', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 10, 'K.Nirmala', 'k-nirmala', 'associate_professor', 'Associate Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/07/nirmala.jpg', '/departments/me/faculty/k-nirmala', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 11, 'Dr. A.KRISHNA SUDHEER', 'a-krishna-sudheer', 'professor', 'Professor', 'MBA, M.PHIL, PH.D, PHD, M.B.A', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/AKS.jpg', '/departments/me/faculty/dr-a-krishna-sudheer', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 12, 'N.Govinda Rao', 'n-govinda-rao', 'associate_professor', 'Associate Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/N-Govinda-Rao.jpg', '/departments/me/faculty/n-govinda-rao', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 13, 'Mr. A. RAMANJANEYA REDDY', 'a-ramanjaneya-reddy', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/A-Ramanjaneya-Reddy.jpg', '/departments/me/faculty/mr-a-ramanjaneya-reddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 14, 'Mr. SHAIK JAVEED', 'shaik-javeed', 'assistant_professor', 'Assistant Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/S-Javeed.jpg', '/departments/me/faculty/mr-shaik-javeed', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 15, 'B.Sreelakshmi', 'b-sreelakshmi', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/B-Sreelakshmi.jpg', '/departments/me/faculty/b-sreelakshmi', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 16, 'Dr. S.Venkateswarlu', 's-venkateswarlu', 'professor', 'Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/Dr.-S-Venkateswarlu.jpg', '/departments/me/faculty/dr-s-venkateswarlu', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 17, 'K MALLIKARJUNA REDDY', 'k-mallikarjuna-reddy', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/05/MALLIKARJUNA.jpg', '/departments/me/faculty/k-mallikarjuna-reddy', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 18, 'C.Thejaswini Veena', 'c-thejaswini-veena', 'professor', 'Professor', 'M.TECH, PH.D, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2019/06/IMG_2624.jpg', '/departments/me/faculty/c-thejaswini-veena', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 19, 'A. David Donald', 'a-david-donald', 'assistant_professor', 'Assistant Professor', 'M.TECH, B.TECH', 'https://www.gpcet.ac.in/wp-content/uploads/2021/09/SEKHAR-150x150.jpg', '/departments/me/faculty/a-david-donald', FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 20, 'DR G PRAVEEN KUMAR', 'dr-g-praveen-kumar', 'professor_hod', 'ASSOCIATE PROF & DEAN', '', NULL, NULL, TRUE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 21, 'DR C NAGA KUMAR', 'dr-c-naga-kumar', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 22, 'Mr. K CHINNA VEERESH', 'k-chinna-veeresh', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;
INSERT INTO public.faculty (department_code, sno, name, slug, cadre, designation, highest_qualification, photo_url, profile_route, is_hod, is_active)
VALUES ('me', 23, 'Mr. M. JOHNSON', 'm-johnson', 'assistant_professor', 'ASSISTANT PROF', '', NULL, NULL, FALSE, TRUE)
ON CONFLICT (department_code, slug) DO UPDATE SET
    sno = EXCLUDED.sno,
    name = EXCLUDED.name,
    cadre = EXCLUDED.cadre,
    designation = EXCLUDED.designation,
    highest_qualification = EXCLUDED.highest_qualification,
    photo_url = EXCLUDED.photo_url,
    profile_route = EXCLUDED.profile_route,
    is_hod = EXCLUDED.is_hod;


-- 3. Seed Core Academic Documents Manifest
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('I MBA Academic Calendar 2026-27 (1)', 'i-mba-academic-calendar-2026-27-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/10/I-MBA-Academic-Calendar-2026-27-1.pdf', 435916, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('I MBA Academic Calendar 2026-27', 'i-mba-academic-calendar-2026-27', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/10/I-MBA-Academic-Calendar-2026-27.pdf', 426909, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('ME R 26 Regulations & Syllabus (I Year)', 'me-r-26-regulations-syllabus-i-year', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/09/ME-R-26-Regulations-Syllabus-I-Year.pdf', 2627810, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('ECE R 26 Regulations &Syllabus(FINAL)', 'ece-r-26-regulations-syllabusfinal', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/09/ECE-R-26-Regulations-SyllabusFINAL.pdf', 2776909, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CAI R 26 Regulations & Syllabus(FINAL)', 'cai-r-26-regulations-syllabusfinal', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/09/CAI-R-26-Regulations-SyllabusFINAL.pdf', 2448102, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CSE R 26 Regulations & Syllabus(FINAL)', 'cse-r-26-regulations-syllabusfinal', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/09/CSE-R-26-Regulations-SyllabusFINAL.pdf', 2547606, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CE R 26 Regulation & Syllabus (1) (1)', 'ce-r-26-regulation-syllabus-1-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/09/CE-R-26-Regulation-Syllabus-1-1.pdf', 2464567, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('EEE R 26 Regulations & Syllabus (I Year)', 'eee-r-26-regulations-syllabus-i-year', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/09/EEE-R-26-Regulations-Syllabus-I-Year.pdf', 2586850, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('I B.Tech Academic Calendar 2026-27', 'i-b-tech-academic-calendar-2026-27', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/09/I-B.Tech-Academic-Calendar-2026-27.pdf', 513520, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('II M.Tech Academic calendar (1)', 'ii-m-tech-academic-calendar-1', 'academic_calendar', 'https://www.gpcet.ac.in/wp-content/uploads/2026/09/II-M.Tech-Academic-calendar-1.pdf', 442833, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('jntua', 'jntua', 'accreditation_doc', 'https://www.gpcet.ac.in/wp-content/uploads/2026/07/jntua.jpg', 23367, 'image/jpeg', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('EPS_R25 Syllabus on 09.07.26 – Final', 'eps_r25-syllabus-on-09-07-26-final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/07/EPS_R25-Syllabus-on-09.07.26-Final.pdf', 1735409, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('II B.Tech Academic Calendar 2026-27', 'ii-b-tech-academic-calendar-2026-27', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/07/II-B.Tech-Academic-Calendar-2026-27.pdf', 518229, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('GPCET-DECS-R25 Regulations and Syllabus (1) (1)', 'gpcet-decs-r25-regulations-and-syllabus-1-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/07/GPCET-DECS-R25-Regulations-and-Syllabus-1-1.pdf', 4398244, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('GPCET-DECS-R25 Regulations and Syllabus (2)', 'gpcet-decs-r25-regulations-and-syllabus-2', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/07/GPCET-DECS-R25-Regulations-and-Syllabus-2.pdf', 4094450, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('II MBA Academic Calendar (2025-26)', 'ii-mba-academic-calendar-2025-26', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/07/II-MBA-Academic-Calendar-2025-26.pdf', 457081, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('III B.Tech Academic Calendar (2026-27)', 'iii-b-tech-academic-calendar-2026-27', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/07/III-B.Tech-Academic-Calendar-2026-27.pdf', 456562, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('IV B.Tech Academic Calendar 2026-27', 'iv-b-tech-academic-calendar-2026-27', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/06/IV-B.Tech-Academic-Calendar-2026-27.pdf', 282620, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 REGULATIONS & SYLABBUS OF CSE', 'r23-regulations-sylabbus-of-cse', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/01/R23-REGULATIONS-SYLABBUS-OF-CSE.pdf', 7767720, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('I B.Tech I & II Sem Academic Calendar', 'i-b-tech-i-ii-sem-academic-calendar', 'academic_calendar', 'https://www.gpcet.ac.in/wp-content/uploads/2026/01/I-B.Tech-I-II-Sem-Academic-Calendar.pdf', 384795, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CIV – R23 Syllabus', 'civ-r23-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/01/CIV-R23-Syllabus.pdf', 6935659, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('ME-R23-All 4 Yrs Syllabus', 'me-r23-all-4-yrs-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2026/01/ME-R23-All-4-Yrs-Syllabus.pdf', 4535679, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('GPCET-DECS-R25 Regulations and Syllabus (1)', 'gpcet-decs-r25-regulations-and-syllabus-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/12/GPCET-DECS-R25-Regulations-and-Syllabus-1.pdf', 2556726, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('GPCET_M.Tech_R25_(EPS) Syllabus on 29.10.25 (1)', 'gpcet_m-tech_r25_eps-syllabus-on-29-10-25-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/12/GPCET_M.Tech_R25_EPS-Syllabus-on-29.10.25-1.pdf', 824589, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('I M.Tech I Sem Academic Calendar 2025-26', 'i-m-tech-i-sem-academic-calendar-2025-26-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/11/I-M.Tech-I-Sem-Academic-Calendar-2025-26-1.pdf', 294624, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('I M.Tech I Sem Academic Calendar 2025-26', 'i-m-tech-i-sem-academic-calendar-2025-26', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/11/I-M.Tech-I-Sem-Academic-Calendar-2025-26.pdf', 294624, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('M.Tech CSE Syllabus -R25 Regulation', 'm-tech-cse-syllabus-r25-regulation', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/11/M.Tech-CSE-Syllabus-R25-Regulation.pdf', 774790, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('GPCET_M.Tech_R25_(EPS) Syllabus on 29.10.25', 'gpcet_m-tech_r25_eps-syllabus-on-29-10-25', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/10/GPCET_M.Tech_R25_EPS-Syllabus-on-29.10.25.pdf', 824589, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('GPCET-DECS-R25 Regulations and Syllabus', 'gpcet-decs-r25-regulations-and-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/10/GPCET-DECS-R25-Regulations-and-Syllabus.pdf', 2556726, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('II M.Tech Academic Calendar', 'ii-m-tech-academic-calendar', 'academic_calendar', 'https://www.gpcet.ac.in/wp-content/uploads/2025/10/II-M.Tech-Academic-Calendar.pdf', 339861, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23-regulations-CSE-syllabus-updated', 'r23-regulations-cse-syllabus-updated', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/10/R23-regulations-CSE-syllabus-updated.pdf', 8232654, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('AI-ML R20 Syllabus', 'ai-ml-r20-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/09/AI-ML-R20-Syllabus.pdf', 2948347, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('I MBA Academic Calendar (2025-26)', 'i-mba-academic-calendar-2025-26', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/09/I-MBA-Academic-Calendar-2025-26.pdf', 364761, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('I B.Tech Academic Calendar (2025-26)', 'i-b-tech-academic-calendar-2025-26', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/09/I-B.Tech-Academic-Calendar-2025-26.pdf', 373582, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CE-R23 FINAL SYLLABUS (1)', 'ce-r23-final-syllabus-1-2', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/CE-R23-FINAL-SYLLABUS-1-2.pdf', 2303308, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 regulations CSE syllabus updated', 'r23-regulations-cse-syllabus-updated-33435', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/R23-regulations-CSE-syllabus-updated.pdf', 8600010, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23_EEE_Syllabus Final', 'r23_eee_syllabus-final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/R23_EEE_Syllabus-Final.pdf', 3728452, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('ME-R23-All 4 Yrs Syllabus', 'me-r23-all-4-yrs-syllabus-33428', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/ME-R23-All-4-Yrs-Syllabus.pdf', 6626422, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-CSE-DS FINAL', 'r20-cse-ds-final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/R20-CSE-DS-FINAL.pdf', 73170626, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CE-R23 FINAL SYLLABUS 1', 'ce-r23-final-syllabus-1-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/CE-R23-FINAL-SYLLABUS-1-1.pdf', 2302924, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-CSE-IOT FINAL', 'r20-cse-iot-final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/R20-CSE-IOT-FINAL.pdf', 82067732, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-CSE-AI FINAL', 'r20-cse-ai-final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/R20-CSE-AI-FINAL.pdf', 57761598, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-ME-syllabus_Updated', 'r20-me-syllabus_updated', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/R20-ME-syllabus_Updated.pdf', 4289197, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 ECE', 'r20-ece', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/R20-ECE.pdf', 35315890, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CSE Syllabus(R20 regulations', 'cse-syllabusr20-regulations', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/CSE-SyllabusR20-regulations.pdf', 3146519, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CSE syllabus (R23 Regulations)', 'cse-syllabus-r23-regulations', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/CSE-syllabus-R23-Regulations.pdf', 4304774, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('AI &ML Syllabus(R20 Regulations)', 'ai-ml-syllabusr20-regulations', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/AI-ML-SyllabusR20-Regulations.pdf', 2604536, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CE-R20-Final Syllalbus 1', 'ce-r20-final-syllalbus-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/CE-R20-Final-Syllalbus-1.pdf', 75335686, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CE-R23 FINAL SYLLABUS', 'ce-r23-final-syllabus-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/CE-R23-FINAL-SYLLABUS-1.pdf', 2340085, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23_EEE_Syllabus', 'r23_eee_syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/R23_EEE_Syllabus.pdf', 3902638, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20_EEE_Syllabus', 'r20_eee_syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/R20_EEE_Syllabus.pdf', 6279052, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CE-R23 FINAL SYLLABUS', 'ce-r23-final-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/CE-R23-FINAL-SYLLABUS.pdf', 2340085, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('II M.Tech I Semester Academic Calendar 2025-26', 'ii-m-tech-i-semester-academic-calendar-2025-26', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/II-M.Tech-I-Semester-Academic-Calendar-2025-26.pdf', 267598, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('II MBA I Semester Academic Calendar 2025-26', 'ii-mba-i-semester-academic-calendar-2025-26', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/II-MBA-I-Semester-Academic-Calendar-2025-26.pdf', 362459, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('IV B.Tech Academic Calendar 2025-26', 'iv-b-tech-academic-calendar-2025-26', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/IV-B.Tech-Academic-Calendar-2025-26.pdf', 328060, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('II & III B.Tech Academic Calendar 2025-26', 'ii-iii-b-tech-academic-calendar-2025-26', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/07/II-III-B.Tech-Academic-Calendar-2025-26.pdf', 382287, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('NBA-Accreditation_merged', 'nba-accreditation_merged', 'accreditation_doc', 'https://www.gpcet.ac.in/wp-content/uploads/2025/06/NBA-Accreditation_merged.pdf', 3239696, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('NBA', 'nba', 'accreditation_doc', 'https://www.gpcet.ac.in/wp-content/uploads/2025/03/NBA.pdf', 512697, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus-Updated-final', 'r23-syllabus-updated-final-5', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/02/R23-Syllabus-Updated-final-5.pdf', 3261722, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus-Updated-final', 'r23-syllabus-updated-final-4', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/02/R23-Syllabus-Updated-final-4.pdf', 3261722, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus-Updated-final', 'r23-syllabus-updated-final-3', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/02/R23-Syllabus-Updated-final-3.pdf', 3261722, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus-Updated-final', 'r23-syllabus-updated-final-2', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/02/R23-Syllabus-Updated-final-2.pdf', 3261722, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus-Updated-final', 'r23-syllabus-updated-final-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/02/R23-Syllabus-Updated-final-1.pdf', 3261722, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus-Updated-final', 'r23-syllabus-updated-final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/02/R23-Syllabus-Updated-final.pdf', 3261722, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('B.Tech II Semester Academic Calendar', 'b-tech-ii-semester-academic-calendar', 'academic_calendar', 'https://www.gpcet.ac.in/wp-content/uploads/2025/01/B.Tech-II-Semester-Academic-Calendar.pdf', 329644, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Final_R20_Syllabus_23.01.25', 'final_r20_syllabus_23-01-25-3', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/01/Final_R20_Syllabus_23.01.25-3.pdf', 3423246, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Final_R20_Syllabus_23.01.25', 'final_r20_syllabus_23-01-25-2', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/01/Final_R20_Syllabus_23.01.25-2.pdf', 3423246, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Final_R20_Syllabus_23.01.25', 'final_r20_syllabus_23-01-25', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/01/Final_R20_Syllabus_23.01.25.pdf', 3423246, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Final_R20_Syllabus_23.01.25-', 'final_r20_syllabus_23-01-25-33023', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/01/Final_R20_Syllabus_23.01.25-.pdf', 3423246, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Final_R20_Syllabus_23.01.25- (1)', 'final_r20_syllabus_23-01-25-1-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/01/Final_R20_Syllabus_23.01.25-1-1.pdf', 3423246, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Final_R20_Syllabus_23.01.25- (1)', 'final_r20_syllabus_23-01-25-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2025/01/Final_R20_Syllabus_23.01.25-1.pdf', 3423246, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('AIML-SYLLABUS (2)', 'aiml-syllabus-2', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/AIML-SYLLABUS-2.pdf', 4604275, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23-SYLLABUS-ME', 'r23-syllabus-me', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R23-SYLLABUS-ME.pdf', 2514526, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Final_R20_Syllabus_10.12.24-Final (1)', 'final_r20_syllabus_10-12-24-final-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/Final_R20_Syllabus_10.12.24-Final-1.pdf', 3420377, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('AIML-SYLLABUS_merged (1)', 'aiml-syllabus_merged-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/AIML-SYLLABUS_merged-1.pdf', 4507598, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Detail R20-AI & ML Syllabus – Upto VI SEMS (1) (1) (Autosaved)', 'detail-r20-ai-ml-syllabus-upto-vi-sems-1-1-autosaved', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/Detail-R20-AI-ML-Syllabus-Upto-VI-SEMS-1-1-Autosaved.pdf', 1800482, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-ME-syllabus_Updated', 'r20-me-syllabus_updated-32895', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R20-ME-syllabus_Updated.pdf', 4096937, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CE – R20 Syllalbus (1)', 'ce-r20-syllalbus-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/CE-R20-Syllalbus-1.pdf', 75335686, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-ME-syllabus', 'r20-me-syllabus-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R20-ME-syllabus-1.pdf', 4113296, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-ME-syllabus', 'r20-me-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R20-ME-syllabus.pdf', 4113296, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23-SYLLABUS-ME_Updated', 'r23-syllabus-me_updated', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R23-SYLLABUS-ME_Updated.pdf', 2510994, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-CSE-AI FINAL (2)', 'r20-cse-ai-final-2', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R20-CSE-AI-FINAL-2.pdf', 41223929, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-CSE-DS UPTO 3-2 (2)', 'r20-cse-ds-upto-3-2-2', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R20-CSE-DS-UPTO-3-2-2.pdf', 39922486, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-CSE-IOT FINAL (3)', 'r20-cse-iot-final-3', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R20-CSE-IOT-FINAL-3.pdf', 48812499, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('ECE R20 Final Syllabus Copy 10-12-2024', 'ece-r20-final-syllabus-copy-10-12-2024', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/ECE-R20-Final-Syllabus-Copy-10-12-2024.pdf', 59577478, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 syllabus-new-final (1)..', 'r20-syllabus-new-final-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R20-syllabus-new-final-1.pdf', 6517479, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('ME_R23 SYLLABUS', 'me_r23-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/ME_R23-SYLLABUS.pdf', 2515823, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 EEE I-I to II-II – Final Syllabus on 9.12.24', 'r23-eee-i-i-to-ii-ii-final-syllabus-on-9-12-24', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R23-EEE-I-I-to-II-II-Final-Syllabus-on-9.12.24.pdf', 1567916, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('ECE -R23 curriculum Structure 1-1,2,2-1,2 SEM final copy 08-12-2024-pages (1)', 'ece-r23-curriculum-structure-1-122-12-sem-final-copy-08-12-2024-pages-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/ECE-R23-curriculum-Structure-1-122-12-SEM-final-copy-08-12-2024-pages-1.pdf', 2026844, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CE-R23 syllabus upto II-II', 'ce-r23-syllabus-upto-ii-ii-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/CE-R23-syllabus-upto-II-II-1.pdf', 3349557, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 CSE Syllabus', 'r23-cse-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R23-CSE-Syllabus.pdf', 4092856, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 CES-Syllabus', 'r23-ces-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R23-CES-Syllabus.pdf', 4087710, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 syllabus-new-final (3)', 'r20-syllabus-new-final-3', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R20-syllabus-new-final-3.pdf', 6535861, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus-CSE-Final', 'r23-syllabus-cse-final-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R23-Syllabus-CSE-Final-1.pdf', 4089139, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus -CSE-Final', 'r23-syllabus-cse-final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R23-Syllabus-CSE-Final.pdf', 4085498, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Final_R20_Syllabus_07.12.24-new', 'final_r20_syllabus_07-12-24-new', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/Final_R20_Syllabus_07.12.24-new.pdf', 3455916, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus-EEE 7.12.24', 'r23-syllabus-eee-7-12-24', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R23-Syllabus-EEE-7.12.24.pdf', 1589018, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('ME_R23 SYLLABUS-1', 'me_r23-syllabus-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/ME_R23-SYLLABUS-1.pdf', 2512403, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('ECE -R23 curriculum Structure 1-1,2,2-1,2 SEM final copy 08-12-2024', 'ece-r23-curriculum-structure-1-122-12-sem-final-copy-08-12-2024', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/ECE-R23-curriculum-Structure-1-122-12-SEM-final-copy-08-12-2024.pdf', 1723273, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CE-R23 syllabus upto II-II', 'ce-r23-syllabus-upto-ii-ii', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/CE-R23-syllabus-upto-II-II.pdf', 3349520, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus upto II-II-CSE', 'r23-syllabus-upto-ii-ii-cse', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/12/R23-Syllabus-upto-II-II-CSE.pdf', 4085498, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('M.Tech R-24 ECE FInal SYllabus Copy 09-11-2024', 'm-tech-r-24-ece-final-syllabus-copy-09-11-2024', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/11/M.Tech-R-24-ECE-FInal-SYllabus-Copy-09-11-2024.pdf', 2593782, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('M.TECH CSE R24 REGUALATION AND SYLLABUS', 'm-tech-cse-r24-regualation-and-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/11/M.TECH-CSE-R24-REGUALATION-AND-SYLLABUS.pdf', 10022962, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('M.Tech (EPS) R24 Syllabus 9.11.24', 'm-tech-eps-r24-syllabus-9-11-24', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/11/M.Tech-EPS-R24-Syllabus-9.11.24.pdf', 8865688, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Final_R20_Syllabus_07.11.24-new', 'final_r20_syllabus_07-11-24-new', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/11/Final_R20_Syllabus_07.11.24-new.pdf', 3408393, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('AQAR-2023-24-21-09-2024', 'aqar-2023-24-21-09-2024', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/11/AQAR-2023-24-21-09-2024.pdf', 950465, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 syllabus-new-final (2)', 'r20-syllabus-new-final-2', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/11/R20-syllabus-new-final-2.pdf', 6515451, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 syllabus-new-final (1)', 'r20-syllabus-new-final-1-32792', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/11/R20-syllabus-new-final-1.pdf', 6528657, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 Syllabus-Updated-final', 'r23-syllabus-updated-final-32790', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/11/R23-Syllabus-Updated-final.pdf', 4090955, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('AIML-SYLLABUS_merged', 'aiml-syllabus_merged', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/11/AIML-SYLLABUS_merged.pdf', 4537918, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R-23- MBA COURSE STRUCTURE I, II, III & IV SEMESTERS SYLLABUS FINAL COPY', 'r-23-mba-course-structure-i-ii-iii-iv-semesters-syllabus-final-copy', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/10/R-23-MBA-COURSE-STRUCTURE-I-II-III-IV-SEMESTERS-SYLLABUS-FINAL-COPY.pdf', 3436077, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 syllabus-new-final', 'r20-syllabus-new-final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/10/R20-syllabus-new-final.pdf', 6500767, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 syllabus-new (2)', 'r20-syllabus-new-2', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/10/R20-syllabus-new-2.pdf', 6463427, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('AIML-SYLLABUS', 'aiml-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/AIML-SYLLABUS.pdf', 3852242, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20- ECE – syllabus_Final', 'r20-ece-syllabus_final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/R20-ECE-syllabus_Final.pdf', 108980656, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R-20 – Civil – syllabus_Final', 'r-20-civil-syllabus_final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/R-20-Civil-syllabus_Final.pdf', 127227171, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-ME-syllabus_Final', 'r20-me-syllabus_final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/R20-ME-syllabus_Final.pdf', 4078902, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-IOT -syllabus final', 'r20-iot-syllabus-final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/R20-IOT-syllabus-final.pdf', 35344876, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-DS-syllabus_final', 'r20-ds-syllabus_final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/R20-DS-syllabus_final.pdf', 32240372, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-AI – syllabus FINAL (1)', 'r20-ai-syllabus-final-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/R20-AI-syllabus-FINAL-1.pdf', 33600429, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 CSE SYLLABUS_Final', 'r20-cse-syllabus_final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/R20-CSE-SYLLABUS_Final.pdf', 6464210, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 – EEE -syllabus -Final', 'r20-eee-syllabus-final', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/R20-EEE-syllabus-Final.pdf', 3433446, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('MBA III & IV Semesters Academic Calendar 2024-25', 'mba-iii-iv-semesters-academic-calendar-2024-25', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/MBA-III-IV-Semesters-Academic-Calendar-2024-25.pdf', 494767, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('B.Tech VII & VIII Semesters Academic Calendar 2024-25', 'b-tech-vii-viii-semesters-academic-calendar-2024-25', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/B.Tech-VII-VIII-Semesters-Academic-Calendar-2024-25.pdf', 581795, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('B.Tech V & VI Semesters Academic Calendar 2024-25', 'b-tech-v-vi-semesters-academic-calendar-2024-25', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/B.Tech-V-VI-Semesters-Academic-Calendar-2024-25.pdf', 538272, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('B.Tech III & IV Semesters Academic Calendar 2024-25', 'b-tech-iii-iv-semesters-academic-calendar-2024-25', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/B.Tech-III-IV-Semesters-Academic-Calendar-2024-25.pdf', 513509, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('B.Tech I & II Semesters Academic Calendar 2024-25', 'b-tech-i-ii-semesters-academic-calendar-2024-25', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/B.Tech-I-II-Semesters-Academic-Calendar-2024-25.pdf', 506333, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('1-1 and 1-2 Academic Calender 2024 (2)', '1-1-and-1-2-academic-calender-2024-2', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/09/1-1-and-1-2-Academic-Calender-2024-2.pdf', 471862, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('1-1 and 1-2 Academic Calender 2024 (2)', '1-1-and-1-2-academic-calender-2024-2-32723', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/08/1-1-and-1-2-Academic-Calender-2024-2.pdf', 471862, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R-23, I-I&II,II-I&II AI Course Structure and Syllabus (3)', 'r-23-i-iiiii-iii-ai-course-structure-and-syllabus-3', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/08/R-23-I-IIIII-III-AI-Course-Structure-and-Syllabus-3.pdf', 17373327, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R-23, I-I&II,II-I&II ECE Course Structure and syllabus (1)', 'r-23-i-iiiii-iii-ece-course-structure-and-syllabus-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/08/R-23-I-IIIII-III-ECE-Course-Structure-and-syllabus-1.pdf', 47692887, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R23 EEE I-I to II-II – Final Syllabus (1)', 'r23-eee-i-i-to-ii-ii-final-syllabus-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/08/R23-EEE-I-I-to-II-II-Final-Syllabus-1.pdf', 1626244, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('ME-R23-SYLLABUS-REG (1)', 'me-r23-syllabus-reg-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/08/ME-R23-SYLLABUS-REG-1.pdf', 2630456, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CE R23 Syllabus (1)', 'ce-r23-syllabus-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/08/CE-R23-Syllabus-1.pdf', 3681460, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('II B.Tech I Semester Academic Calendar', 'ii-b-tech-i-semester-academic-calendar', 'academic_calendar', 'https://www.gpcet.ac.in/wp-content/uploads/2024/07/II-B.Tech-I-Semester-Academic-Calendar.pdf', 261870, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('III & IV B.Tech I SEM Academic Calendar 2024-25', 'iii-iv-b-tech-i-sem-academic-calendar-2024-25', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/06/III-IV-B.Tech-I-SEM-Academic-Calendar-2024-25.pdf', 118772, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Application-for-PC-and-CGM (1)', 'application-for-pc-and-cgm-1', 'form_affidavit', 'https://www.gpcet.ac.in/wp-content/uploads/2024/06/Application-for-PC-and-CGM-1.pdf', 84410, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('faculty information 2022-23', 'faculty-information-2022-23', 'form_affidavit', 'https://www.gpcet.ac.in/wp-content/uploads/2024/04/faculty-information-2022-23.pdf', 916649, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('MBA R23 Modified Syllabus', 'mba-r23-modified-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/04/MBA-R23-Modified-Syllabus.pdf', 2740646, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('I M.TECH II SEM ACADEMIC CALENDAR 2023-24', 'i-m-tech-ii-sem-academic-calendar-2023-24', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/04/I-M.TECH-II-SEM-ACADEMIC-CALENDAR-2023-24.pdf', 278976, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('NBA Accreditation', 'nba-accreditation', 'accreditation_doc', 'https://www.gpcet.ac.in/wp-content/uploads/2024/03/NBA-Accreditation.pdf', 2727623, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('4.2.1 Library Information', '4-2-1-library-information', 'form_affidavit', 'https://www.gpcet.ac.in/wp-content/uploads/2024/03/4.2.1-Library-Information.pdf', 6205848, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Final R18 M.Tech EPS Syllabus', 'final-r18-m-tech-eps-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/03/Final-R18-M.Tech-EPS-Syllabus.pdf', 828625, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('MBA Regulations and Syllabi-R-23 Final Copy', 'mba-regulations-and-syllabi-r-23-final-copy', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/03/MBA-Regulations-and-Syllabi-R-23-Final-Copy.pdf', 2740646, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('3.5.2 Additional information', '3-5-2-additional-information', 'form_affidavit', 'https://www.gpcet.ac.in/wp-content/uploads/2024/03/3.5.2-Additional-information.pdf', 1435899, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('7.1.3 naac (1)', '7-1-3-naac-1', 'accreditation_doc', 'https://www.gpcet.ac.in/wp-content/uploads/2024/03/7.1.3-naac-1.pdf', 1235198, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('grievance policy', 'grievance-policy', 'form_affidavit', 'https://www.gpcet.ac.in/wp-content/uploads/2024/03/grievance-policy.pdf', 1300012, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('nirf 2023', 'nirf-2023', 'accreditation_doc', 'https://www.gpcet.ac.in/wp-content/uploads/2024/03/nirf-2023.pdf', 70150, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('NAAC 4.1.1 INFRASTRUCTURES', 'naac-4-1-1-infrastructures', 'accreditation_doc', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/NAAC-4.1.1-INFRASTRUCTURES.pdf', 26538037, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('EEE-R-18-19-20', 'eee-r-18-19-20', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/EEE-R-18-19-20.pdf', 2164633, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('POs H&S (R18)_merged', 'pos-hs-r18_merged', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/POs-HS-R18_merged.pdf', 20288631, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 Course outcomes_ME', 'r20-course-outcomes_me', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-Course-outcomes_ME.pdf', 821052, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R19_Course_outcomes_ME', 'r19_course_outcomes_me', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R19_Course_outcomes_ME.pdf', 829220, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R18 Course outcomes_ME', 'r18-course-outcomes_me', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R18-Course-outcomes_ME.pdf', 926915, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R18 CO-PO MAPPING', 'r18-co-po-mapping', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R18-CO-PO-MAPPING.pdf', 798259, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R 20 Course Outcomes', 'r-20-course-outcomes', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R-20-Course-Outcomes.pdf', 938879, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R 19 I B.Tech Course Outcomes', 'r-19-i-b-tech-course-outcomes', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R-19-I-B.Tech-Course-Outcomes.pdf', 869302, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 co''s -EEE', 'r20-cos-eee', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-cos-EEE.pdf', 655233, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R18 Co''s-EEE', 'r18-cos-eee', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R18-Cos-EEE.pdf', 940138, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R 19 COs-EEE', 'r-19-cos-eee', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R-19-COs-EEE.pdf', 678878, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('MBA R-18', 'mba-r-18', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/MBA-R-18.pdf', 689403, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('MBA R-19', 'mba-r-19', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/MBA-R-19.pdf', 778534, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R-19 MBA Course Structure for 2022-2024 Batch', 'r-19-mba-course-structure-for-2022-2024-batch', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R-19-MBA-Course-Structure-for-2022-2024-Batch.pdf', 2693031, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R18 Course Outcomes-ECE', 'r18-course-outcomes-ece', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R18-Course-Outcomes-ECE.pdf', 621664, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 Course Outcomes-ECE', 'r20-course-outcomes-ece', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-Course-Outcomes-ECE.pdf', 634386, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R19 Course Outcomes-ECE', 'r19-course-outcomes-ece', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R19-Course-Outcomes-ECE.pdf', 642318, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R-20 CSE', 'r-20-cse', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R-20-CSE.pdf', 647288, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R-19 CSE', 'r-19-cse', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R-19-CSE.pdf', 696279, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R-18 CSE', 'r-18-cse', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R-18-CSE.pdf', 582102, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20_course_outcomes_AI[1]', 'r20_course_outcomes_ai1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20_course_outcomes_AI1.pdf', 958480, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R19 Course Outcomes (1)', 'r19-course-outcomes-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R19-Course-Outcomes-1.pdf', 654448, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 course outcomes (1)', 'r20-course-outcomes-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-course-outcomes-1.pdf', 1026316, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R19 course outcomes', 'r19-course-outcomes', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R19-course-outcomes.pdf', 1146352, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R18 course outcomes (1)', 'r18-course-outcomes-1', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R18-course-outcomes-1.pdf', 1056923, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('AI&ML SYLLABUS', 'aiml-syllabus-31716', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/AIML-SYLLABUS.pdf', 3011090, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20 syllabus-CSE updated', 'r20-syllabus-cse-updated', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-syllabus-CSE-updated.pdf', 5145405, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R19 syllabus -CSE updated', 'r19-syllabus-cse-updated', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R19-syllabus-CSE-updated.pdf', 5438189, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R18 CSE updated', 'r18-cse-updated', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R18-CSE-updated.pdf', 1072368, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('M.Tech-CSE (R18 Regulations)', 'm-tech-cse-r18-regulations', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/M.Tech-CSE-R18-Regulations.pdf', 2746043, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-CSE-DS', 'r20-cse-ds', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-CSE-DS.pdf', 3702681, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CIV R18-Syllabus', 'civ-r18-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/CIV-R18-Syllabus.pdf', 6710918, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CIV R19 Syllabus', 'civ-r19-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/CIV-R19-Syllabus.pdf', 54450498, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('CIV R20 Syllabus', 'civ-r20-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/CIV-R20-Syllabus.pdf', 66454027, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R19-EEE-Academic Regulations-Curriculum Structure-Syllabus', 'r19-eee-academic-regulations-curriculum-structure-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R19-EEE-Academic-Regulations-Curriculum-Structure-Syllabus.pdf', 5984684, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R18-EEE-Academic Regulations-Curriculum Structure-Syllabus', 'r18-eee-academic-regulations-curriculum-structure-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R18-EEE-Academic-Regulations-Curriculum-Structure-Syllabus.pdf', 4653683, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('M.Tech-EPS – R18 Syllabus', 'm-tech-eps-r18-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/M.Tech-EPS-R18-Syllabus.pdf', 1664105, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-EEE-Academic Regulations-Curriculum Structure-Syllabus', 'r20-eee-academic-regulations-curriculum-structure-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-EEE-Academic-Regulations-Curriculum-Structure-Syllabus.pdf', 3098679, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-CSE-IOT FINAL', 'r20-cse-iot-final-31698', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-CSE-IOT-FINAL.pdf', 11579007, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-CSE-AI FINAL', 'r20-cse-ai-final-31697', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-CSE-AI-FINAL.pdf', 11640563, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-ME-syllabuS', 'r20-me-syllabus-31682', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-ME-syllabuS.pdf', 8799546, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R19-ME-Syllabus', 'r19-me-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R19-ME-Syllabus.pdf', 6602268, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R18-ME-Syllabus', 'r18-me-syllabus', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R18-ME-Syllabus.pdf', 5857829, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R20-ECE', 'r20-ece-31679', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R20-ECE.pdf', 2693270, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R19-ECE', 'r19-ece', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R19-ECE.pdf', 2675572, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R18-ECE', 'r18-ece', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R18-ECE.pdf', 1516898, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('R18 M.Tech-DECS Syllabus & Regulation', 'r18-m-tech-decs-syllabus-regulation', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/R18-M.Tech-DECS-Syllabus-Regulation.pdf', 2642790, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Committes framed for 2023-24 (3)', 'committes-framed-for-2023-24-3', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/Committes-framed-for-2023-24-3.pdf', 916651, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Committes framed for 2023-24 (3)', 'committes-framed-for-2023-24-3-31651', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/Committes-framed-for-2023-24-3.docx', 68344, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('Committes framed for 2023-24', 'committes-framed-for-2023-24', 'syllabus', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/Committes-framed-for-2023-24.pdf', 913735, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;
INSERT INTO public.academic_documents (title, slug, category, file_url, file_size_bytes, mime_type, is_published)
VALUES ('GPCET API Form', 'gpcet-api-form', 'form_affidavit', 'https://www.gpcet.ac.in/wp-content/uploads/2024/02/GPCET-API-Form.pdf', 328576, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;