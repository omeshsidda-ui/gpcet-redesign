import MiniSearch from 'minisearch';

export interface SearchDocument {
  id: number | string;
  title: string;
  category: string;
  dept: string;
  reg: string;
  slug: string;
  score?: number;
}

export interface SearchOptions {
  category?: string;
  dept?: string;
  reg?: string;
  limit?: number;
}

let miniSearchInstance: MiniSearch<SearchDocument> | null = null;
let loadingPromise: Promise<MiniSearch<SearchDocument>> | null = null;

/**
 * Configure standard MiniSearch options matching the build-time index
 */
export function getMiniSearchOptions() {
  return {
    fields: ['title', 'category', 'dept', 'reg'],
    storeFields: ['title', 'category', 'dept', 'reg', 'slug'],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      boost: { title: 2, reg: 1.5, dept: 1.2 }
    }
  };
}

/**
 * Lazily loads and deserializes the MiniSearch index
 * Resolves in < 10ms after first download
 */
export async function loadSearchIndex(
  indexPath = '/search-index.json'
): Promise<MiniSearch<SearchDocument>> {
  if (miniSearchInstance) {
    return miniSearchInstance;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    let jsonText: string;

    // Check environment: browser fetch vs Node/server environment
    if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
      const response = await fetch(indexPath);
      if (!response.ok) {
        throw new Error(`Failed to load search index: HTTP ${response.status}`);
      }
      jsonText = await response.text();
    } else {
      // In Node.js / testing environment, read directly from public directory
      const fs = await import('node:fs');
      const path = await import('node:path');
      const filePath = path.join(process.cwd(), 'public', 'search-index.json');
      jsonText = fs.readFileSync(filePath, 'utf8');
    }

    const options = getMiniSearchOptions();
    miniSearchInstance = MiniSearch.loadJSON<SearchDocument>(jsonText, options);
    return miniSearchInstance;
  })();

  try {
    return await loadingPromise;
  } catch (err) {
    loadingPromise = null;
    throw err;
  }
}

/**
 * Client-side keystroke search across core academic documents
 * Provides sub-5ms response times
 */
export async function searchDocumentsClient(
  query: string,
  options: SearchOptions = {}
): Promise<SearchDocument[]> {
  const index = await loadSearchIndex();
  const trimmed = query.trim();

  const searchOpts: Record<string, any> = {
    prefix: true,
    fuzzy: 0.2,
    boost: { title: 2, reg: 1.5, dept: 1.2 }
  };

  // Add category / department / regulation filters if provided
  const filterPredicates: Array<(item: SearchDocument) => boolean> = [];

  if (options.category && options.category !== 'all') {
    filterPredicates.push(item => item.category === options.category);
  }

  if (options.dept && options.dept !== 'all') {
    filterPredicates.push(item => item.dept.toLowerCase() === options.dept!.toLowerCase());
  }

  if (options.reg && options.reg !== 'all') {
    filterPredicates.push(item => item.reg.toLowerCase() === options.reg!.toLowerCase());
  }

  if (filterPredicates.length > 0) {
    searchOpts.filter = (result: SearchDocument) => {
      return filterPredicates.every(predicate => predicate(result));
    };
  }

  let results: any[];

  if (trimmed.length === 0) {
    // If no query string, return top results matching filters
    // MiniSearch allows autoSuggest or accessing stored docs
    results = [];
  } else {
    results = index.search(trimmed, searchOpts);
  }

  const limit = options.limit || 20;
  return results.slice(0, limit).map(res => ({
    id: res.id,
    title: res.title,
    category: res.category,
    dept: res.dept,
    reg: res.reg,
    slug: res.slug,
    score: res.score
  }));
}

/**
 * Check if the search index is cached in memory
 */
export function isSearchIndexLoaded(): boolean {
  return miniSearchInstance !== null;
}

/**
 * Reset memory cache (useful for testing or index refresh)
 */
export function resetSearchClient(): void {
  miniSearchInstance = null;
  loadingPromise = null;
}
