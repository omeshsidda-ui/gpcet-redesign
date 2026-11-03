#!/usr/bin/env node

import { verifyEndpoints, scrapeAllCache, fetchHomepageWidgets } from './raw-fetcher.js';
import { organizeAndParseContent } from './content-organizer.js';
import { generateMediaManifest, downloadCoreBrandAssets } from './asset-downloader.js';

async function main() {
  const args = process.argv.slice(2);
  const options = {
    force: args.includes('--force') || args.includes('-f')
  };

  if (args.includes('--verify-endpoints') || args.includes('-v')) {
    await verifyEndpoints();
    process.exit(0);
  }

  if (args.includes('--scrape-cache') || args.includes('-c')) {
    await scrapeAllCache(options);
    process.exit(0);
  }

  if (args.includes('--homepage-only')) {
    await fetchHomepageWidgets(options);
    process.exit(0);
  }

  if (args.includes('--parse-content') || args.includes('-p')) {
    await organizeAndParseContent();
    process.exit(0);
  }

  if (args.includes('--generate-manifest') || args.includes('-m')) {
    await generateMediaManifest();
    process.exit(0);
  }

  if (args.includes('--download-assets') || args.includes('-a')) {
    await downloadCoreBrandAssets();
    process.exit(0);
  }

  if (args.includes('--scrape-all')) {
    console.log('Running Full Pipeline: Stage 1 -> Stage 2 -> Stage 3...\n');
    await scrapeAllCache(options);
    await organizeAndParseContent();
    await generateMediaManifest();
    await downloadCoreBrandAssets();
    console.log('\n========================================');
    console.log('ALL STAGES COMPLETED SUCCESSFULLY!');
    console.log('========================================');
    process.exit(0);
  }

  // Help / fallback
  console.log(`
GPCET College Website Scraper CLI
=================================
Commands available:
  npm run scrape:verify    (--verify-endpoints)   Verify all REST endpoints and print total counts
  npm run scrape:cache     (--scrape-cache)       Stage 1: Download & cache all raw endpoints to /cache
  npm run scrape:parse     (--parse-content)      Stage 2: Parse Avada HTML, BFS classify, extract tables & write Markdown
  npm run scrape:manifest  (--generate-manifest)  Stage 3: Generate media-manifest.json for all PDFs & uploads
  npm run scrape:assets    (--download-assets)    Stage 3: Download brand logos, badges, and campus photos
  npm run scrape:all       (--scrape-all)         Run full end-to-end pipeline
  `);
}

main().catch(err => {
  console.error('\n[FATAL ERROR]:', err);
  process.exit(1);
});
