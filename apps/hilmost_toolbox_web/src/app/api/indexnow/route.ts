import { NextResponse } from 'next/server';

/**
 * API Route to trigger IndexNow submission.
 * Secure this with a simple token to prevent spam.
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  // Simple security check (Set this in your environment variables)
  if (token !== process.env.INDEXNOW_TRIGGER_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const host = 'hilmost-toolbox.hilmost.net';
  const key = '9e7f4c9c1b3d4a2b8e0f6d8c9a7b5e4d';
  const sitemapUrl = `https://${host}/sitemap.xml`;

  try {
    // 1. Fetch URLs from sitemap
    const sitemapRes = await fetch(sitemapUrl);
    const xml = await sitemapRes.text();

    // Simple regex extraction for speed in Edge runtime
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

    // 2. Prepare IndexNow payload
    const payload = {
      host: host,
      key: key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: urls
    };

    // 3. Submit to IndexNow API
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Success', urlsSubmitted: urls.length });
    } else {
      const err = await response.text();
      return NextResponse.json({ error: 'IndexNow API Error', details: err }, { status: 500 });
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Critical Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
