import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

/**
 * CLI arguments parsing
 * Usage: node submit-indexnow.mjs --host <host> --key <key> --sitemap <sitemap_url>
 */
const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.indexOf(name);
  return index !== -1 ? args[index + 1] : null;
};

const argHost = getArg('--host');
const argKey = getArg('--key');
const argSitemap = getArg('--sitemap');

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

async function submitToIndexNow(config) {
  console.log(`[${new Date().toISOString()}] Starting IndexNow submission for ${config.host}...`);

  try {
    // 1. Fetch and parse sitemap
    const sitemapRes = await fetch(config.sitemap, { signal: AbortSignal.timeout(15000) });
    const sitemapXml = await sitemapRes.text();
    const parsed = await parseStringPromise(sitemapXml);

    const urls = parsed.urlset.url.map(entry => entry.loc[0]);
    console.log(`Found ${urls.length} URLs in sitemap for ${config.host}.`);

    // 2. Prepare payload
    const payload = {
      host: config.host,
      key: config.key,
      keyLocation: config.keyLocation,
      urlList: urls
    };

    // 3. Submit to IndexNow
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000)
    });

    if (response.ok) {
      console.log(`✅ Success! Submitted ${urls.length} URLs for ${config.host} to IndexNow.`);
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow Submission Failed for ${config.host}: ${response.status} ${response.statusText}`);
      console.error(`Reason: ${errorText}`);
    }
  } catch (error) {
    console.error(`❌ Critical Error during IndexNow submission for ${config.host}:`, error);
  }
}

async function run() {
  if (argHost && argKey) {
    // Single submission via CLI args
    const config = {
      host: argHost,
      key: argKey,
      sitemap: argSitemap || `https://${argHost}/sitemap.xml`,
      keyLocation: `https://${argHost}/${argKey}.txt`
    };
    await submitToIndexNow(config);
  } else {
    // Batch submission for all default configs
    for (const config of DEFAULT_CONFIGS) {
      await submitToIndexNow(config);
    }
  }
  console.log('--- IndexNow Submission Complete ---');
}

await run();
