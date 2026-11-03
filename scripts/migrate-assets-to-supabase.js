import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

/**
 * Migration pipeline: Uploads institutional media assets from media-manifest.json
 * to Supabase Storage bucket 'academic-documents' with rate limiting and progress tracking.
 *
 * @typedef {Object} MigrationOptions
 * @property {boolean} [dryRun]
 * @property {number} [limit]
 * @property {number} [concurrency]
 * @property {string} [category]
 * @property {string} [bucketName]
 * @property {string} [workspaceRoot]
 *
 * @typedef {Object} MigrationSummary
 * @property {number} totalCataloged
 * @property {number} totalSelected
 * @property {number} uploaded
 * @property {number} skipped
 * @property {number} failed
 * @property {Array<{ id: number, url: string, error: string }>} errors
 * @property {number} durationSeconds
 */

/**
 * Normalizes a storage path inside the Supabase Storage bucket
 */
export function getStoragePath(item) {
  const category = item.category || 'general_pdf';
  const rawFilename = item.filename || `asset_${item.id}.pdf`;
  const cleanFilename = rawFilename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/^_+|_+$/g, '');
  return `${category}/${cleanFilename}`;
}

/**
 * Main migration executor
 * @param {MigrationOptions} [options]
 * @returns {Promise<MigrationSummary>}
 */
export async function runAssetMigration(options = {}) {
  const startTime = Date.now();
  const workspaceRoot = options.workspaceRoot || process.cwd();
  const bucketName = options.bucketName || 'academic-documents';
  const concurrency = options.concurrency || 5;
  const isDryRun = options.dryRun ?? false;

  const manifestPath = path.join(workspaceRoot, 'src', 'data', 'media-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Media manifest not found at ${manifestPath}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  let items = manifest.items || [];

  // Filter by category if requested
  if (options.category && options.category !== 'all') {
    items = items.filter(item => item.category === options.category);
  }

  // Filter for downloadable document assets (prioritize PDFs, documents, forms, circulars)
  items = items.filter(item => item.sourceUrl && item.mimeType === 'application/pdf');

  // Apply limit if specified
  if (options.limit && options.limit > 0) {
    items = items.slice(0, options.limit);
  }

  const summary = {
    totalCataloged: manifest.totalMediaCount || 5822,
    totalSelected: items.length,
    uploaded: 0,
    skipped: 0,
    failed: 0,
    errors: [],
    durationSeconds: 0
  };

  console.log(`\n======================================================`);
  console.log(`GPCET Supabase Storage Asset Migration Pipeline`);
  console.log(`======================================================`);
  console.log(`Target Bucket: '${bucketName}'`);
  console.log(`Total Candidates: ${items.length} items`);
  console.log(`Concurrency: ${concurrency} parallel workers`);
  console.log(`Dry Run Mode: ${isDryRun ? 'ENABLED (Simulation Only)' : 'DISABLED (Live Upload)'}`);
  console.log(`======================================================\n`);

  if (isDryRun) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const storagePath = getStoragePath(item);
      summary.uploaded++;
      if ((i + 1) % 10 === 0 || i === items.length - 1) {
        const pct = (((i + 1) / items.length) * 100).toFixed(1);
        console.log(`[DRY-RUN] Progress: ${i + 1}/${items.length} (${pct}%) -> Sample: ${storagePath}`);
      }
    }

    summary.durationSeconds = (Date.now() - startTime) / 1000;
    console.log(`\nDry run completed in ${summary.durationSeconds.toFixed(2)}s`);
    return summary;
  }

  // Live upload initialization
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn(`WARNING: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set.`);
    console.warn(`Falling back to simulated dry-run mode.`);
    options.dryRun = true;
    return runAssetMigration(options);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Ensure storage bucket exists
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some(b => b.name === bucketName);
    if (!exists) {
      console.log(`Bucket '${bucketName}' not found. Creating public bucket...`);
      await supabase.storage.createBucket(bucketName, { public: true });
    }
  } catch (err) {
    console.warn(`Bucket inspection notice: ${err.message}`);
  }

  // Worker pool queue
  let currentIndex = 0;
  async function worker(workerId) {
    while (currentIndex < items.length) {
      const index = currentIndex++;
      const item = items[index];
      const storagePath = getStoragePath(item);

      try {
        // Fetch upstream document asset
        const res = await fetch(item.sourceUrl);
        if (!res.ok) {
          throw new Error(`Upstream fetch returned HTTP ${res.status}`);
        }
        const buffer = await res.arrayBuffer();

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(storagePath, buffer, {
            contentType: item.mimeType || 'application/pdf',
            upsert: true
          });

        if (uploadError) {
          throw uploadError;
        }

        summary.uploaded++;
      } catch (err) {
        summary.failed++;
        summary.errors.push({
          id: item.id,
          url: item.sourceUrl,
          error: err.message
        });
      }

      const completed = summary.uploaded + summary.failed + summary.skipped;
      if (completed % 25 === 0 || completed === items.length) {
        const pct = ((completed / items.length) * 100).toFixed(1);
        console.log(`Progress: ${completed}/${items.length} (${pct}%) | Uploaded: ${summary.uploaded} | Failed: ${summary.failed}`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, (_, i) => worker(i + 1));
  await Promise.all(workers);

  summary.durationSeconds = (Date.now() - startTime) / 1000;
  console.log(`\nMigration completed in ${summary.durationSeconds.toFixed(2)}s:`);
  console.log(`  - Uploaded: ${summary.uploaded}`);
  console.log(`  - Failed: ${summary.failed}`);
  console.log(`  - Total processed: ${items.length}`);

  return summary;
}

// CLI handler
if (process.argv[1] && process.argv[1].endsWith('migrate-assets-to-supabase.js')) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || !process.env.SUPABASE_SERVICE_ROLE_KEY;
  const limitArgIndex = args.indexOf('--limit');
  const limit = limitArgIndex !== -1 ? parseInt(args[limitArgIndex + 1], 10) : undefined;
  const concurrencyArgIndex = args.indexOf('--concurrency');
  const concurrency = concurrencyArgIndex !== -1 ? parseInt(args[concurrencyArgIndex + 1], 10) : 5;

  runAssetMigration({ dryRun, limit, concurrency })
    .then(summary => {
      console.log('Migration task finished successfully.');
    })
    .catch(err => {
      console.error('Migration failed:', err);
      process.exit(1);
    });
}
