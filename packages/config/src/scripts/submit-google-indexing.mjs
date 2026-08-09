import fetch from 'node-fetch';
import { google } from 'googleapis';
import { parseStringPromise } from 'xml2js';

// Configuration
const SITEMAPS = [
  'https://hilmost-toolbox.hilmost.net/sitemap.xml',
  'https://hilmost.net/sitemap.xml'
];

const CONFIG = {
  // Required: Set GOOGLE_APPLICATION_CREDENTIALS_JSON as an env variable (raw JSON string)
  credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
    : null
};

async function submitToGoogle() {
  console.log(`[${new Date().toISOString()}] Starting Google Indexing API submission...`);

  if (!CONFIG.credentials) {
    console.error('❌ Missing Google Credentials. Set GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable.');
    process.exit(1);
  }

  try {
    // 1. Authenticate
    const jwtClient = new google.auth.JWT({
      email: CONFIG.credentials.client_email,
      key: CONFIG.credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/indexing']
    });

    await jwtClient.authorize();

    let allUrls = [];

    // 2. Fetch and parse all sitemaps
    for (const sitemapUrl of SITEMAPS) {
      try {
        const sitemapRes = await fetch(sitemapUrl, { signal: AbortSignal.timeout(15000) });
        const sitemapXml = await sitemapRes.text();
        const parsed = await parseStringPromise(sitemapXml);
        const urls = parsed.urlset.url.map(entry => entry.loc[0]);
        allUrls = [...allUrls, ...urls];
      } catch (err) {
        console.error(`❌ Failed to fetch/parse sitemap ${sitemapUrl}:`, err);
      }
    }

    // Google Indexing API limit is 200 per day.
    // We prioritize the NEWEST URLs, specifically the 1,260 new currency pairs.
    const currencyPairs = allUrls.filter(url => url.includes('/finance/currency/'));
    const otherUrls = allUrls.filter(url => !url.includes('/finance/currency/'));

    // Combine: New currency pairs first (reversed for recency), then others (reversed)
    const prioritizedUrls = [...currencyPairs.reverse(), ...otherUrls.reverse()];

    const subset = prioritizedUrls.slice(0, 100);
    console.log(`Found ${allUrls.length} total URLs (${currencyPairs.length} currency pairs).`);
    console.log(`Submitting a subset of ${subset.length} (prioritizing currency pairs) to stay within rate limits.`);

    // 3. Submit each URL
    for (const url of subset) {
      const options = {
        url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        auth: jwtClient,
        body: JSON.stringify({
          url: url,
          type: 'URL_UPDATED'
        })
      };

      const res = await fetch(options.url, {
        method: options.method,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${(await jwtClient.getAccessToken()).token}`
        },
        body: options.body,
        signal: AbortSignal.timeout(10000)
      });

      if (res.ok) {
        console.log(`✅ Indexed: ${url}`);
      } else {
        const err = await res.text();
        console.error(`❌ Failed: ${url} (${res.status}) - ${err}`);
        if (res.status === 429) {
          console.warn('⚠️ Rate limit hit. Stopping batch.');
          break;
        }
      }
    }

    console.log('--- Google Submission Complete ---');
  } catch (error) {
    console.error('❌ Critical Error during Google submission:', error);
    process.exit(1);
  }
}

await submitToGoogle();
