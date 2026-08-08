import fetch from 'node-fetch';
import { google } from 'googleapis';
import { parseStringPromise } from 'xml2js';

// Configuration
const CONFIG = {
  sitemap: 'https://hilmost-toolbox.hilmost.net/sitemap.xml',
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

  console.log('DEBUG: credentials object keys:', Object.keys(CONFIG.credentials));
  console.log('DEBUG: client_email present:', !!CONFIG.credentials.client_email);
  console.log('DEBUG: client_email value:', CONFIG.credentials.client_email);
  console.log('DEBUG: private_key present:', !!CONFIG.credentials.private_key);
  console.log('DEBUG: private_key type:', typeof CONFIG.credentials.private_key);
  console.log('DEBUG: private_key length:', CONFIG.credentials.private_key ? CONFIG.credentials.private_key.length : 0);
  console.log('DEBUG: private_key starts with:', CONFIG.credentials.private_key ? CONFIG.credentials.private_key.substring(0, 30) : 'N/A');

  try {
    // 1. Authenticate
    const jwtClient = new google.auth.JWT(
      CONFIG.credentials.client_email,
      null,
      CONFIG.credentials.private_key,
      ['https://www.googleapis.com/auth/indexing']
    );

    await jwtClient.authorize();

    // 2. Fetch and parse sitemap
    const sitemapRes = await fetch(CONFIG.sitemap, { signal: AbortSignal.timeout(15000) });
    const sitemapXml = await sitemapRes.text();
    const parsed = await parseStringPromise(sitemapXml);
    const urls = parsed.urlset.url.map(entry => entry.loc[0]);

    // Google Indexing API limit is 200 per day.
    // We prioritize the first 100 to stay safe.
    const subset = urls.slice(0, 100);
    console.log(`Found ${urls.length} URLs. Submitting a subset of ${subset.length} to stay within rate limits.`);

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
