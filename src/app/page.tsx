import React from 'react';
import AsymmetricHeroSpread from '@/components/home/AsymmetricHeroSpread';
import DepartmentalMatrix from '@/components/home/DepartmentalMatrix';
import LeadershipDiscourse from '@/components/home/LeadershipDiscourse';
import ResearchExcellenceBand from '@/components/home/ResearchExcellenceBand';
import { getActiveNotices } from '@/lib/data/notices.js';
import { searchDocuments, getDocumentStats } from '@/lib/data/documents.js';
import { decodeHtmlEntities, getEnrichedDepartments } from '@/lib/institutional-content';

export default async function HomePage() {
  const [notices, examDocs, calendarDocs, departments, docStats] = await Promise.all([
    getActiveNotices({ limit: 4 }),
    searchDocuments({ category: 'exam_timetable', limit: 2 }),
    searchDocuments({ category: 'academic_calendar', limit: 2 }),
    getEnrichedDepartments(),
    getDocumentStats(),
  ]);

  const totalFacultyCount = departments.reduce((sum, d) => sum + d.facultyCount, 0);
  const keyDocuments = [...(examDocs.data || []), ...(calendarDocs.data || [])].map((doc: any) => ({
    id: String(doc.id),
    title: decodeHtmlEntities(doc.title || doc.filename || 'Academic Document'),
    category: doc.category || 'circular',
    fileUrl: doc.fileUrl || '',
    fileSizeBytes: doc.fileSizeBytes,
    date: doc.date,
  }));

  return (
    <div>
      <AsymmetricHeroSpread
        notices={notices}
        keyDocuments={keyDocuments}
        totalFacultyCount={totalFacultyCount}
        totalDocumentCount={docStats.totalMediaCount || 5822}
      />
      <DepartmentalMatrix departments={departments} />
      <LeadershipDiscourse />
      <ResearchExcellenceBand />
    </div>
  );
}
