import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';
import fs from 'fs';
import path from 'path';

/**
 * CLI arguments parsing
 * Usage: node submit-indexnow.mjs --host <host> --key <key> --sitemap <sitemap_url> [--dry-run]
 */
const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.indexOf(name);
  return index !== -1 ? args[index + 1] : null;
};

const isDryRun = args.includes('--dry-run') || process.env.DRY_RUN === 'true';
const argHost = getArg('--host');
const argKey = getArg('--key');
const argSitemap = getArg('--sitemap');

const STATE_FILE = path.resolve('packages/config/src/scripts/indexnow-state.json');

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = fs.readFileSync(STATE_FILE, 'utf8');
      return JSON.parse(data || '{}');
    }
  } catch (err) {
    console.warn('⚠️ Warning loading indexnow-state.json, treating as empty:', err.message);
  }
  return {};
}

function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.error('❌ Error saving indexnow-state.json:', err.message);
  }
}

// Default configurations if no CLI args provided
const DEFAULT_CONFIGS = [
  {
    host: 'hilmost-toolbox.hilmost.net',
    key: '9e7f4c9c1b3d4a2b8e0f6d8c9a7b5e4d',
    keyLocation: 'https://hilmost-toolbox.hilmost.net/9e7f4c9c1b3d4a2b8e0f6d8c9a7b5e4d.txt',
    sitemap: 'https://hilmost-toolbox.hilmost.net/sitemap.xml'
  },
  {
    host: 'hilmost.net',
    key: '4e24174360e241858852e1f2536c6411',
    keyLocation: 'https://hilmost.net/4e24174360e241858852e1f2536c6411.txt',
    sitemap: 'https://hilmost.net/sitemap.xml'
  }
];

async function submitToIndexNow(config, state) {
  console.log(`[${new Date().toISOString()}] Starting IndexNow processing for ${config.host}...`);

  try {
    // 1. Fetch and parse sitemap
    const sitemapRes = await fetch(config.sitemap, { signal: AbortSignal.timeout(15000) });
    const sitemapXml = await sitemapRes.text();
    const parsed = await parseStringPromise(sitemapXml);

    const sitemapEntries = parsed.urlset.url.map(entry => ({
      loc: entry.loc[0],
      lastmod: entry.lastmod ? entry.lastmod[0] : null
    }));

    // Prioritize homepage
    const rootUrl = `https://${config.host}/`;
    const sortedEntries = [
      ...sitemapEntries.filter(e => e.loc === rootUrl),
      ...sitemapEntries.filter(e => e.loc !== rootUrl)
    ];

    // Filter toSubmit: modified or new URLs
    const toSubmit = sortedEntries.filter(item => {
      const storedLastmod = state[item.loc];
      return !storedLastmod || storedLastmod !== item.lastmod;
    });

    console.log(`Total URLs in sitemap for ${config.host}: ${sitemapEntries.length}`);
    console.log(`URLs toSubmit (new or modified): ${toSubmit.length}`);

    if (isDryRun) {
      console.log(`--- DRY RUN MODE FOR ${config.host} ---`);
      console.log(`First 15 URLs in toSubmit:`);
      toSubmit.slice(0, 15).forEach((item, idx) => {
        console.log(`  ${idx + 1}. ${item.loc} (lastmod: ${item.lastmod || 'none'})`);
      });
      return;
    }

    if (toSubmit.length === 0) {
      console.log(`✅ No new or modified URLs to submit for ${config.host}.`);
      return;
    }

    // 2. Submit in batches of 50
    const BATCH_SIZE = 50;
    const urlItems = toSubmit.map(i => i.loc);

    for (let i = 0; i < urlItems.length; i += BATCH_SIZE) {
      const batchUrls = urlItems.slice(i, i + BATCH_SIZE);
      const payload = {
        host: config.host,
        key: config.key,
        keyLocation: config.keyLocation,
        urlList: batchUrls
      };

      console.log(`Submitting batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(urlItems.length / BATCH_SIZE)} (${batchUrls.length} URLs)...`);

      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000)
      });

      if (response.ok) {
        console.log(`  ✅ Batch ${Math.floor(i / BATCH_SIZE) + 1} submitted successfully.`);
        // Record new lastmod for submitted batch
        toSubmit.slice(i, i + BATCH_SIZE).forEach(item => {
          state[item.loc] = item.lastmod || new Date().toISOString();
        });
      } else {
        const errorText = await response.text();
        console.error(`  ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} Failed: ${response.status} ${response.statusText}`);
        console.error(`  Reason: ${errorText}`);
      }

      // 1 second pause between batches
      if (i + BATCH_SIZE < urlItems.length) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    saveState(state);
  } catch (error) {
    console.error(`❌ Critical Error during IndexNow processing for ${config.host}:`, error);
  }
}

async function run() {
  const state = loadState();

  if (argHost && argKey) {
    const config = {
      host: argHost,
      key: argKey,
      sitemap: argSitemap || `https://${argHost}/sitemap.xml`,
      keyLocation: `https://${argHost}/${argKey}.txt`
    };
    await submitToIndexNow(config, state);
  } else {
    for (const config of DEFAULT_CONFIGS) {
      await submitToIndexNow(config, state);
    }
  }
  console.log('--- IndexNow Processing Complete ---');
}

await run();
