import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

const CONFIG = {
  host: 'hilmost-toolbox.hilmost.net',
  key: '9e7f4c9c1b3d4a2b8e0f6d8c9a7b5e4d',
  keyLocation: 'https://hilmost-toolbox.hilmost.net/9e7f4c9c1b3d4a2b8e0f6d8c9a7b5e4d.txt',
  sitemap: 'https://hilmost-toolbox.hilmost.net/sitemap.xml'
};

async function submitToIndexNow() {
  console.log(`[${new Date().toISOString()}] Starting IndexNow submission for ${CONFIG.host}...`);

  try {
    // 1. Fetch and parse sitemap
    const sitemapRes = await fetch(CONFIG.sitemap);
    const sitemapXml = await sitemapRes.text();
    const parsed = await parseStringPromise(sitemapXml);

    const urls = parsed.urlset.url.map(entry => entry.loc[0]);
    console.log(`Found ${urls.length} URLs in sitemap.`);

    // 2. Prepare payload
    const payload = {
      host: CONFIG.host,
      key: CONFIG.key,
      keyLocation: CONFIG.keyLocation,
      urlList: urls
    };

    // 3. Submit to IndexNow
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`✅ Success! Submitted ${urls.length} URLs to IndexNow.`);
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow Submission Failed: ${response.status} ${response.statusText}`);
      console.error(`Reason: ${errorText}`);
    }
  } catch (error) {
    console.error('❌ Critical Error during IndexNow submission:', error);
  }
}

submitToIndexNow();
