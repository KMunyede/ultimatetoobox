# Strategy for Low Usage & RPM Overrun Prevention

To ensure the Utilities Toolbox remains within free tier limits and avoids RPM (Requests Per Minute) overruns, the following multi-layered strategy is proposed.

## 1. Client-Side Heavy Architecture (Current & Future)
The app is built with **Next.js (Static Export)**. Most tools already run entirely in the browser.
- **Pure Logic**: Converters and basic text tools (Word Count, MD5) use zero server resources after initial load.
- **Web Workers**: CPU-intensive tasks like Word Unscrambling use Web Workers to avoid blocking the UI thread without needing server-side processing.

## 2. Aggressive Caching
- **Firebase Hosting Headers**: Static assets (JS, CSS, Images) are served with `Cache-Control: public, max-age=31536000, immutable`.
- **Browser Persistence**: Utilize `localStorage` or `IndexedDB` for tool history and user preferences to minimize repetitive state fetching (already implemented via `useHistory` hook).

## 3. Rate Limiting at the Edge (Cloudflare)
Since Cloudflare sits in front of all Hilmost subdomains:
- **WAF Rules**: Implement Cloudflare WAF rules to block aggressive bots and scrapers that could inflate hosting bandwidth.
- **Rate Limiting**: Configure Cloudflare Rate Limiting to restrict the number of requests per IP address for dynamic endpoints (like currency conversion if it ever moves to a backend).

## 4. Resource Minimization
- **Tree Shaking**: Ensure only necessary parts of libraries like `lucide-react` and `crypto-js` are bundled.
- **Lazy Loading**: Use `dynamic()` imports for heavy components (e.g., `WordResults`) to reduce initial bundle size and parsing time.

## 5. Monitoring and Alerts
- **Firebase Usage Alerts**: Set up budget alerts in the Google Cloud Console to notify when 50%, 75%, and 90% of free tier limits are reached.
- **Search Console / Analytics**: Monitor traffic spikes. Unexpected surges can be analyzed to determine if they are legitimate users or bot attacks.

## 6. Fallback Strategies
- **Graceful Degradation**: If an API-dependent tool (like real-time currency) hits its limit, fallback to cached data or show a "Service Temporarily Busy" message rather than crashing.
- **Static Dictionaries**: Keep dictionary files as static JSON in the `public/` folder (already done for Word Unscrambler) to leverage CDN caching.
