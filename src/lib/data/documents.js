import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

let cachedManifest = null;
let supabaseClient = null;

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    supabaseClient = createClient(url, key);
    return supabaseClient;
  }
  return null;
}

function loadOfflineManifest(workspaceRoot = process.cwd()) {
  if (cachedManifest) return cachedManifest;
  const manifestPath = path.join(workspaceRoot, 'src', 'data', 'media-manifest.json');
  const raw = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  cachedManifest = raw;
  return raw;
}

function matchDepartment(title = '', filename = '', department = '') {
  if (!department || department === 'all') return true;
  const target = department.toLowerCase();
  const text = `${title} ${filename}`.toLowerCase();
  if (target === 'cse') return text.includes('cse') || text.includes('computer science');
  if (target === 'ai') return text.includes('ai') || text.includes('artificial') || text.includes('cai');
  if (target === 'ece') return text.includes('ece') || text.includes('electronics') || text.includes('communication');
  if (target === 'eee') return text.includes('eee') || text.includes('electrical');
  if (target === 'me') return text.includes('mech') || text.includes('mechanical') || text.includes('me-');
  if (target === 'civil') return text.includes('civil') || text.includes('ce-');
  if (target === 'mba') return text.includes('mba') || text.includes('management');
  if (target === 'hs') return text.includes('h&s') || text.includes('humanities') || text.includes('basic science');
  return text.includes(target);
}

function matchRegulation(title = '', filename = '', regulation = '') {
  if (!regulation || regulation === 'all') return true;
  const target = regulation.toUpperCase().replace(/[-_]/g, '');
  const text = `${title} ${filename}`.toUpperCase().replace(/[-_]/g, '');
  return text.includes(target);
}

/**
 * Fail-Safe Hybrid Search for Academic Documents
 * Uses PostgreSQL tsvector GIN index when Supabase is available,
 * falling back transparently to offline media manifest.
 */
export async function searchDocuments({
  q = '',
  category = 'all',
  department = 'all',
  regulation = 'all',
  limit = 25,
  offset = 0
} = {}) {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      let query = supabase
        .from('academic_documents')
        .select('*', { count: 'exact' })
        .eq('is_published', true);

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (department && department !== 'all') {
        query = query.eq('department_code', department.toLowerCase());
      }

      if (q && q.trim().length > 0) {
        // Use PostgreSQL tsvector GIN index (idx_docs_fts)
        query = query.textSearch('fts_vector', q.trim(), {
          type: 'websearch',
          config: 'english'
        });
      }

      query = query.range(offset, offset + limit - 1);
      const { data, error, count } = await query;

      if (!error && data) {
        const total = count ?? data.length;
        return {
          data: data.map(doc => ({
            id: doc.id,
            title: doc.title,
            slug: doc.slug,
            category: doc.category,
            departmentCode: doc.department_code,
            regulation: doc.regulation_id,
            academicYear: doc.academic_year,
            fileUrl: doc.file_url,
            fileSizeBytes: doc.file_size_bytes,
            mimeType: doc.mime_type
          })),
          meta: {
            total,
            limit,
            offset,
            hasMore: offset + limit < total
          }
        };
      }
    } catch {
      // Graceful fallback to offline manifest on any database error
    }
  }

  // Transparent Offline JSON Fallback
  const manifest = loadOfflineManifest();
  let items = manifest.items;

  if (category && category !== 'all') {
    items = items.filter(item => item.category === category);
  }

  if (department && department !== 'all') {
    items = items.filter(item => matchDepartment(item.title, item.filename, department));
  }

  if (regulation && regulation !== 'all') {
    items = items.filter(item => matchRegulation(item.title, item.filename, regulation));
  }

  if (q && q.trim().length > 0) {
    const query = q.toLowerCase().trim();
    items = items.filter(item =>
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.filename && item.filename.toLowerCase().includes(query))
    );
  }

  const total = items.length;
  const paginated = items.slice(offset, offset + limit).map(item => ({
    id: `doc_${item.id}`,
    title: item.title,
    filename: item.filename,
    category: item.category,
    fileUrl: item.sourceUrl,
    fileSizeBytes: item.fileSize,
    mimeType: item.mimeType || 'application/pdf',
    date: item.date
  }));

  return {
    data: paginated,
    meta: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    }
  };
}

/**
 * Get cataloged document category statistics
 */
export async function getDocumentStats() {
  const manifest = loadOfflineManifest();
  return {
    totalMediaCount: manifest.totalMediaCount,
    categories: manifest.categories
  };
}
