// Institutional notices data adapter with fallback circulars

const SEED_NOTICES = [
  {
    id: 'not_001',
    title: 'EAPCET / ECET 2026 Admissions Counseling Schedule & Helpline Centers',
    slug: 'eapcet-admissions-schedule-2026',
    summary: 'Detailed reporting dates, certificate verification centers, and B.Tech convenor quota seat intake matrix.',
    category: 'admissions',
    priority: 'urgent',
    isTicker: true,
    isPinned: true,
    attachmentUrl: 'https://www.gpcet.ac.in/wp-content/uploads/2026/10/admissions-notice.pdf',
    publishedAt: new Date().toISOString()
  },
  {
    id: 'not_002',
    title: 'JNTUA Autonomous End Semester Examinations Schedule (R20 & R23)',
    slug: 'jntua-autonomous-end-sem-exams-schedule',
    summary: 'Timetable for regular and supplementary examinations across all B.Tech branches.',
    category: 'examination',
    priority: 'high',
    isTicker: true,
    isPinned: true,
    attachmentUrl: 'https://www.gpcet.ac.in/wp-content/uploads/2026/10/exam-timetable.pdf',
    publishedAt: new Date().toISOString()
  },
  {
    id: 'not_003',
    title: 'National Level Technical Symposium & Hackathon - GPCET Invenio 2026',
    slug: 'gpcet-invenio-technical-symposium-2026',
    summary: 'Department of Computer Science & AI invites student registrations for 36-hour hackathon and paper presentations.',
    category: 'event',
    priority: 'normal',
    isTicker: false,
    isPinned: false,
    attachmentUrl: null,
    publishedAt: new Date().toISOString()
  }
];

export async function getActiveNotices({
  tickerOnly = false,
  category = 'all',
  limit = 10
} = {}) {
  let list = SEED_NOTICES;

  if (tickerOnly) {
    list = list.filter(n => n.isTicker);
  }

  if (category && category !== 'all') {
    list = list.filter(n => n.category === category);
  }

  return list.slice(0, limit);
}
