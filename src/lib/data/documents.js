import fs from 'node:fs';
import path from 'node:path';

let cachedManifest = null;

function loadOfflineManifest(workspaceRoot = process.cwd()) {
  if (cachedManifest) return cachedManifest;
  const manifestPath = path.join(workspaceRoot, 'src', 'data', 'media-manifest.json');
  const raw = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  cachedManifest = raw;
  return raw;
}

/**
 * Fail-Safe Hybrid Search for Academic Documents
 */
export async function searchDocuments({
  q = '',
  category = 'all',
  limit = 25,
  offset = 0
} = {}) {
  const manifest = loadOfflineManifest();
  let items = manifest.items;

  if (category && category !== 'all') {
    items = items.filter(item => item.category === category);
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
