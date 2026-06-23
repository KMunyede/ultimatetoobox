import https from 'https';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * IndexNow Submission Script
 * Automatically fetches sitemap.xml and submits all URLs to Bing.
 */

const args = process.argv.slice(2);
const hostArg = args.indexOf('--host');
const keyArg = args.indexOf('--key');

if (hostArg === -1 || keyArg === -1) {
    console.error('❌ Error: Missing --host or --key arguments.');
    process.exit(1);
}

const host = args[hostArg + 1];
const key = args[keyArg + 1];
const sitemapUrl = `https://${host}/sitemap.xml`;

console.log(`\n🚀 Starting IndexNow submission for: ${host}`);
console.log(`📄 Fetching sitemap: ${sitemapUrl}`);

async function getSitemapUrls(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                const urls = [];
                const regex = /<loc>(.*?)<\/loc>/g;
                let match;
                while ((match = regex.exec(data)) !== null) {
                    urls.push(match[1]);
                }
                resolve(urls);
            });
        }).on('error', reject);
    });
}

async function submitToIndexNow(host, key, urlList) {
    const data = JSON.stringify({
        host: host,
        key: key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList: urlList
    });

    const options = {
        hostname: 'www.bing.com',
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve({ status: res.statusCode, body });
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${body}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

(async () => {
    try {
        const urls = await getSitemapUrls(sitemapUrl);

        if (urls.length === 0) {
            console.warn('⚠️ No URLs found in sitemap. Ensure the site is built and deployed.');
            return;
        }

        console.log(`🔗 Found ${urls.length} URLs. Submitting to IndexNow...`);

        const result = await submitToIndexNow(host, key, urls);
        console.log(`✅ Success! Bing accepted ${urls.length} URLs (Status: ${result.status})`);

    } catch (error) {
        console.error(`❌ IndexNow Error: ${error.message}`);
        // Don't fail the build if IndexNow fails, just log it.
    }
})();
