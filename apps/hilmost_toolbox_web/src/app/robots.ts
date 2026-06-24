import { MetadataRoute } from 'next';

export const dynamic = "force-static";

/**
 * Optimized robots.txt for Hilmost Toolbox
 * Ensures full access for Search Engines and AI Crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Explicitly allow all AI bots to ensure Cloudflare/WAF doesn't block them by default
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'PerplexityBot', 'CCBot'],
        allow: '/',
      },
      {
        // Standard rule for Google, Bing, and all other crawlers
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://hilmost-toolbox.hilmost.net/sitemap.xml',
  };
}
