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

  const isDryRun = process.argv.includes('--dry-run');

  if (!CONFIG.credentials && !isDryRun) {
    console.error('❌ Missing Google Credentials. Set GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable.');
    process.exit(1);
  }

  try {
    let jwtClient = null;
    if (!isDryRun) {
      // 1. Authenticate
      jwtClient = new google.auth.JWT({
        email: CONFIG.credentials.client_email,
        key: CONFIG.credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/indexing']
      });
      await jwtClient.authorize();
    }

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

    // --- REWRITE: Priority Logic ---
    const HUB_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "NZD", "ZAR", "NGN", "KES", "GHS", "AED"];
    const HUB_UNITS = ["meters", "kilometers", "miles", "feet", "inches", "kilograms", "pounds", "ounces", "celsius", "fahrenheit", "square-meter", "hectare", "acre"];

    const normalize = (u) => u.replace(/\/$/, '');

    const homepages = allUrls.filter(url =>
      normalize(url) === 'https://hilmost-toolbox.hilmost.net' ||
      normalize(url) === 'https://hilmost.net'
    );
    const guides = allUrls.filter(url => url.includes('/guides/'));
    const blogPosts = allUrls.filter(url => url.includes('/blog/'));

    // Core Tools: Non-programmatic category/tool pages
    const coreTools = allUrls.filter(url =>
      !url.includes('-to-') &&
      !guides.includes(url) &&
      !blogPosts.includes(url) &&
      !homepages.includes(url) &&
      !url.includes('/privacy-policy') &&
      !url.includes('/terms-of-service') &&
      !url.includes('/cookie-policy') &&
      !url.includes('/robots.txt') &&
      !url.includes('/sitemap.xml')
    );

    // Programmatic Hub-involved pairs (High value)
    const programmaticHubs = allUrls.filter(url => {
      if (!url.includes('-to-')) return false;
      const parts = url.split('/').pop().split('-to-');
      if (parts.length !== 2) return false;
      const [from, to] = parts.map(p => p.toUpperCase());
      return HUB_CURRENCIES.includes(from) || HUB_CURRENCIES.includes(to) ||
             HUB_UNITS.includes(from.toLowerCase()) || HUB_UNITS.includes(to.toLowerCase());
    });

    // Rotation Logic for Programmatic: Use Day of Year as offset
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const offset = (dayOfYear * 50) % (programmaticHubs.length || 1);
    const rotatedProgrammatic = [...programmaticHubs.slice(offset), ...programmaticHubs.slice(0, offset)];

    // Final Prioritized List
    const prioritizedUrls = [
      ...homepages,
      ...guides,
      ...blogPosts,
      ...coreTools,
      ...rotatedProgrammatic
    ];

    // Remove duplicates and cap at 100
    const finalSelection = [...new Set(prioritizedUrls)].slice(0, 100);

    console.log(`Found ${allUrls.length} total URLs.`);
    console.log(`Priority Breakdown: Home: ${homepages.length}, Guides: ${guides.length}, Blog: ${blogPosts.length}, Core Tools: ${coreTools.length}`);
    console.log(`Selected ${finalSelection.length} URLs for submission (including rotating hubs).`);

    if (process.argv.includes('--dry-run')) {
      console.log('--- DRY RUN: URLS TO SUBMIT ---');
      finalSelection.forEach(u => console.log(u));
      process.exit(0);
    }

    // 3. Submit each URL
    for (const url of finalSelection) {
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
