# 🛠️ Gemini Build Prompt — Hilmost Ultimate Toolbox
**Version:** 3.0
**Project:** Hilmost Ultimate Toolbox
**Frontend Site Target:** `hilmost-toolbox` (hosted under `hsc-platform-core`)
**Owner:** Hilmost Software Corporation (HSC)
**Firebase Project ID:** `hsc-platform-core` ← PERMANENT BACKEND IDENTIFIER
**Firebase Hosting Target:** `hilmost-toolbox`
**Live URL (initial):** `https://hilmost-toolbox.web.app`
**Future Domain:** `hilmost.net` (not yet purchased — Cloudflare provisions pre-built)
**DNS / CDN:** Cloudflare (Registrar + CDN + DNS + Analytics)
**Stack:** React 18 + Vite 5, Firebase Hosting (multi-site), Tailwind CSS v3

---

## 🎯 ROLE & MISSION

You are a senior full-stack web developer building a production-grade, ad-supported utility website called **"Hilmost Ultimate Toolbox"** for Hilmost Software Corporation (HSC).

This site is the first frontend property deployed under the **`hsc-platform-core`** Firebase backend — a scalable, multi-site platform that will eventually serve all HSC web and mobile products including MindOS, Sankofa, and future properties. The backend ID `hsc-platform-core` is permanent and must never be tied to any single product name.

This site generates passive AdSense revenue through high-volume, evergreen utility traffic. It must be fast, clean, SEO-optimised, and structured for maximum ad impressions without degrading user experience.

---

## 🏗️ BACKEND ARCHITECTURE — `hsc-platform-core`

### Firebase Project: `hsc-platform-core`

This single Firebase project powers ALL current and future HSC web properties via **Firebase Multi-Site Hosting**. Each HSC product is a named hosting target within the same project, sharing Auth, Firestore, Functions, and Storage.

```
Firebase Project: hsc-platform-core
│
├── 🌐 Hosting Targets (multi-site)
│   ├── hilmost-toolbox    →  hilmost.net          (this build)
│   ├── mindos             →  mindos.app           (future)
│   ├── sankofa            →  sankofa.app          (future)
│   └── hsc-main           →  hilmostsoftware.com  (future)
│
├── 🔐 Firebase Auth        — shared SSO across all HSC apps
├── 🗄️  Firestore           — user data, streaks, preferences
├── ⚡  Firebase Functions  — currency rate fetcher, AI proxy
├── 🗂️  Firebase Storage    — user uploads, generated content
└── 📊  Firebase Analytics  — unified dashboard all properties
```

### Monorepo Workspace Structure

The codebase is a pnpm/npm workspace monorepo under one repo:

```
hsc-platform/                        ← root monorepo
├── apps/
│   ├── hilmost-toolbox/              ← THIS BUILD (React + Vite)
│   ├── mindos/                       ← future
│   └── sankofa/                      ← future
├── packages/
│   └── hsc-ui/                       ← shared design tokens, components (future)
├── firebase.json                     ← multi-site hosting config (root)
├── .firebaserc                       ← project + target mappings
├── package.json                      ← workspace root
└── pnpm-workspace.yaml
```

> **For this build:** Focus entirely on `apps/hilmost-toolbox/`. Scaffold the monorepo root files so future apps slot in cleanly.

---

## 🔥 FIREBASE CONFIGURATION FILES (generate at monorepo root)

### `/firebase.json` — Multi-Site Hosting
```json
{
  "hosting": [
    {
      "target": "hilmost-toolbox",
      "public": "apps/hilmost-toolbox/dist",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [{ "source": "**", "destination": "/index.html" }],
      "headers": [
        {
          "source": "**/*.@(js|css|woff2)",
          "headers": [{ "key": "Cache-Control", "value": "max-age=31536000, immutable" }]
        },
        {
          "source": "**",
          "headers": [{ "key": "X-Frame-Options", "value": "SAMEORIGIN" }]
        }
      ]
    },
    {
      "target": "mindos",
      "public": "apps/mindos/dist",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [{ "source": "**", "destination": "/index.html" }]
    }
  ]
}
```

### `/.firebaserc` — Project + Target Mappings
```json
{
  "projects": {
    "default": "hsc-platform-core"
  },
  "targets": {
    "hsc-platform-core": {
      "hosting": {
        "hilmost-toolbox": ["hilmost-toolbox"],
        "mindos": ["mindos"]
      }
    }
  }
}
```

### Deploy Commands (include in README)
```bash
# Deploy only the Toolbox (most common during development)
npm run build --workspace=apps/hilmost-toolbox
firebase deploy --only hosting:hilmost-toolbox

# Deploy all sites
firebase deploy --only hosting

# First-time setup
firebase projects:create hsc-platform-core        # if project doesn't exist
firebase use hsc-platform-core
firebase hosting:sites:create hilmost-toolbox
firebase hosting:sites:create mindos
firebase target:apply hosting hilmost-toolbox hilmost-toolbox
firebase target:apply hosting mindos mindos
```

### Environment Variables — `apps/hilmost-toolbox/.env`
```env
VITE_FIREBASE_PROJECT_ID=hsc-platform-core
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=hsc-platform-core.firebaseapp.com
VITE_FIREBASE_STORAGE_BUCKET=hsc-platform-core.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_EXCHANGE_RATE_API_KEY=your_exchange_rate_key
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXXX
```

---

## 🌐 DOMAIN & DNS STRATEGY — CLOUDFLARE + FIREBASE

> **Status:** Domain `hilmost.net` not yet purchased. All provisions are pre-built into the codebase so domain activation requires zero code changes — DNS configuration only.

---

### Why Cloudflare (document this in README)

| Benefit | SEO / Performance Impact |
|---|---|
| Global CDN edge network (300+ cities) | Lower TTFB → better Core Web Vitals → ranking boost |
| World's fastest DNS (~11ms resolution) | Faster DNS lookup → lower page load time |
| DDoS protection + bot filtering | Blocks bad bots that inflate bounce rate in Search Console |
| Free SSL at edge (instant provisioning) | HTTPS ranking signal, no 24–48hr wait |
| Cloudflare Web Analytics (cookieless) | GDPR-compliant analytics, no cookie banner needed |
| Page Rules & Bulk Redirects | Clean 301 SEO equity transfer when domain goes live |
| `hilmost.net` at-cost registration (~$9.77/yr) | No renewal markup — same price every year |

---

### Phase 1 — Firebase Only (Current, No Domain Needed)

```
Deploy → https://hilmost-toolbox.web.app
```

- Zero cost, Firebase CDN active immediately
- Submit `hilmost-toolbox.web.app` to Google Search Console now
- Submit `sitemap.xml` at: `https://hilmost-toolbox.web.app/sitemap.xml`
- Every week indexed on this URL builds SEO equity that transfers later via 301

**Pre-build requirement:** Generate `public/robots.txt` with:
```txt
User-agent: *
Allow: /

Sitemap: https://hilmost-toolbox.web.app/sitemap.xml
```

> When domain goes live, this file updates to reference `hilmost.net` — make the sitemap URL a `VITE_SITE_URL` env variable so it's a one-line `.env` change:

```env
# .env (current — no domain)
VITE_SITE_URL=https://hilmost-toolbox.web.app

# .env (after domain live)
VITE_SITE_URL=https://hilmost.net
```

Use `import.meta.env.VITE_SITE_URL` everywhere a canonical or sitemap URL is constructed. Never hardcode either URL.

---

### Phase 2 — Register `hilmost.net` via Cloudflare Registrar

**Steps (document in README, no code changes required):**

```
1. Go to: cloudflare.com → Register a Domain
2. Search: hilmost.net → ~$9.77/yr (at-cost, same every renewal)
3. Complete purchase — DNS is automatically managed in Cloudflare
4. Cloudflare nameservers assigned automatically (e.g. ava.ns.cloudflare.com)
```

> **Note for future HSC domains:** Register ALL HSC domains (mindos.app, sankofa.app, hilmostsoftware.com) through Cloudflare Registrar for unified DNS management under one dashboard.

---

### Phase 3 — Connect `hilmost.net` to Firebase (DNS Configuration)

**Step A — Get Firebase DNS records:**
```
Firebase Console
→ Hosting
→ hilmost-toolbox (site)
→ Add custom domain
→ Enter: hilmost.net
→ Firebase provides: TXT verification record + two A records
```

Firebase will give you values like:
```
Type    Name          Value
TXT     hilmost.net   firebase=xxxxxxxxxxxxxxxx   ← ownership verification
A       hilmost.net   151.101.1.195
A       hilmost.net   151.101.65.195
```

**Step B — Add records in Cloudflare DNS dashboard:**
```
Cloudflare Dashboard → hilmost.net → DNS → Records

Add TXT record:
  Type: TXT | Name: @ | Content: firebase=xxxxxxxx | TTL: Auto

Add A records:
  Type: A | Name: @ | IPv4: 151.101.1.195  | Proxy: ✅ Proxied (orange cloud)
  Type: A | Name: @ | IPv4: 151.101.65.195 | Proxy: ✅ Proxied (orange cloud)

Add www redirect:
  Type: CNAME | Name: www | Target: hilmost.net | Proxy: ✅ Proxied
```

> **Critical:** Set proxy status to **Proxied** (orange cloud ☁️) on all A records — this activates Cloudflare CDN. DNS-only (grey cloud) bypasses it.

**Step C — Cloudflare SSL/TLS Mode:**
```
Cloudflare Dashboard → hilmost.net → SSL/TLS → Overview
Set encryption mode to: Full
```
> ⚠️ Do NOT use "Flexible" (causes redirect loops with Firebase) or "Full (Strict)" during initial setup (may error during Firebase cert provisioning). **Full** is the correct setting.

**Step D — Verify in Firebase Console:**
Firebase detects the TXT record and marks the domain as verified. SSL certificate provisions automatically. Done.

---

### Phase 4 — SEO Equity Transfer (301 Redirect)

Once `hilmost.net` is live, redirect the old Firebase URL to the new domain so all accumulated SEO equity transfers cleanly.

**In Cloudflare Dashboard → hilmost.net → Rules → Redirect Rules:**
```
Rule name: Redirect Firebase default URL
When: hostname equals hilmost-toolbox.web.app
Then: Redirect to https://hilmost.net/[path] (301 Permanent)
Preserve path: ✅ Yes
```

> This is a Cloudflare-level redirect — no Firebase config change, no redeployment. Google transfers all link equity and ranking signals from the old URL to the new one within 1–4 weeks of the 301 being live.

**Also update `.env` after domain is live:**
```env
VITE_SITE_URL=https://hilmost.net
```

Rebuild and redeploy — this updates `robots.txt` sitemap URL and all canonical tags automatically.

---

### Phase 5 — Cloudflare Performance Optimisations (Post-Launch)

Enable these in Cloudflare Dashboard after domain is live — all free on Cloudflare Free plan:

```
Speed → Optimization:
  ✅ Auto Minify (JS, CSS, HTML)
  ✅ Brotli compression
  ✅ Rocket Loader (async JS loading — test with AdSense first)

Caching → Configuration:
  Browser Cache TTL: 1 year (static assets already cache-busted by Vite hashing)
  Caching Level: Standard

Security → Settings:
  Security Level: Medium
  Bot Fight Mode: ✅ On (blocks scraper bots that inflate bounce rate)

Analytics → Web Analytics:
  ✅ Enable Cloudflare Web Analytics (cookieless, GDPR-safe)
  Add the <script> snippet to index.html (see below)
```

**Cloudflare Web Analytics snippet — add to `index.html`:**
```html
<!-- Cloudflare Web Analytics — cookieless, add after domain is live -->
<!-- Replace TOKEN with value from Cloudflare Dashboard → Analytics → Web Analytics -->
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "CLOUDFLARE_ANALYTICS_TOKEN"}'
></script>
```

Add `VITE_CF_ANALYTICS_TOKEN` to `.env` and `.env.example`. Inject conditionally so it only loads in production:
```html
<% if (import.meta.env.VITE_CF_ANALYTICS_TOKEN) { %>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "<%= import.meta.env.VITE_CF_ANALYTICS_TOKEN %>"}'></script>
<% } %>
```

---

### Updated Environment Variables — `apps/hilmost-toolbox/.env.example`

```env
# Firebase — hsc-platform-core project
VITE_FIREBASE_PROJECT_ID=hsc-platform-core
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=hsc-platform-core.firebaseapp.com
VITE_FIREBASE_STORAGE_BUCKET=hsc-platform-core.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Site URL — change to https://hilmost.net when domain is live
VITE_SITE_URL=https://hilmost-toolbox.web.app

# Google AdSense
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXXX

# Exchange Rate API
VITE_EXCHANGE_RATE_API_KEY=your_exchange_rate_key

# Cloudflare Web Analytics — add token after domain + Cloudflare connected
VITE_CF_ANALYTICS_TOKEN=
```

---

### Domain Activation Checklist (zero-code, ops only)

Generate this checklist in `README.md` under "Going Live with hilmost.net":

```
PRE-LAUNCH
[ ] hilmost.net registered at Cloudflare Registrar
[ ] Firebase custom domain added in Console → hilmost-toolbox site
[ ] TXT verification record added in Cloudflare DNS
[ ] Both A records added, Proxy status = Proxied (orange cloud)
[ ] www CNAME added, Proxy status = Proxied
[ ] SSL/TLS mode set to Full in Cloudflare
[ ] Firebase confirms domain verified + SSL provisioned

POST-LAUNCH
[ ] Browse https://hilmost.net — confirm loads correctly
[ ] Check https://www.hilmost.net → redirects to https://hilmost.net (no www)
[ ] Cloudflare 301 redirect rule created for hilmost-toolbox.web.app
[ ] .env updated: VITE_SITE_URL=https://hilmost.net
[ ] Rebuild + redeploy: npm run build && firebase deploy --only hosting:hilmost-toolbox
[ ] Google Search Console: Add hilmost.net as new property
[ ] Submit updated sitemap.xml at https://hilmost.net/sitemap.xml
[ ] Cloudflare Web Analytics token added to .env + redeployed
[ ] Cloudflare Bot Fight Mode enabled
[ ] Auto Minify + Brotli enabled in Cloudflare Speed settings
```

---

### Firebase Spark Free Tier Limits (for reference)

| Resource | Free Limit | Sufficient Until |
|---|---|---|
| Hosting storage | 10 GB | Very long — static assets are small |
| Hosting bandwidth | 360 MB/day | ~500K pageviews/month |
| Firestore reads | 50K/day | Currency rate caching, user prefs |
| Functions invocations | 125K/month | Scheduled rate fetcher |

> At scale, upgrade to Firebase Blaze (pay-as-you-go) — static hosting bandwidth is ~$0.026/GB beyond free, negligible for a utility site.

---

## 🏗️ PROJECT OVERVIEW — HILMOST ULTIMATE TOOLBOX

**Site Name:** Hilmost Ultimate Toolbox
**Tagline:** "Every calculation. One place."
**Brand Colours:**
- Primary: Deep Navy `#0D1B2A`
- Accent: Electric Teal `#00C9A7`
- Background: Off-White `#F7F9FC`
- Dark Mode Background: `#111827`
- Text: `#1A1A2E` (light) / `#E5E7EB` (dark)
- Border subtle: `#E2E8F0` (light) / `#1F2937` (dark)

**Typography:**
- Display Font: `Sora` (Google Fonts) — headings and logo
- Body Font: `DM Sans` (Google Fonts) — clean, readable utility font
- Monospace Font: `JetBrains Mono` (Google Fonts) — calculator outputs, programmer mode, code

**Design Tone:** Refined utility — like a premium Swiss instrument. Clean grids, generous whitespace, teal accent on deep navy. Think Notion meets Wolfram Alpha. Every pixel intentional, nothing decorative without purpose.

**Theme:** Light/Dark toggle. Default: system preference (`prefers-color-scheme`). Persist in `localStorage`.

---

## 📐 LAYOUT ARCHITECTURE

Persistent shell layout with 5 fixed ad zones:

```
┌─────────────────────────────────────────────────────────────┐
│           AD_TOP — Leaderboard 728×90 (sticky, below nav)    │
├──────────┬────────────────────────────────────┬─────────────┤
│          │   NAVBAR (fixed 64px, z-50)         │             │
│          ├────────────────────────────────────┤             │
│ AD_LEFT  │                                    │  AD_RIGHT   │
│ 160×600  │    MAIN CONTENT AREA               │  160×600    │
│ desktop  │    (Tool / Calculator / Home)      │  desktop    │
│ only     │                                    │  only       │
│          ├────────────────────────────────────┤             │
│          │  AD_BOTTOM_L (336×280) │ AD_BOTTOM_R (336×280)   │
├──────────┴────────────────────────────────────┴─────────────┤
│                         FOOTER                               │
└─────────────────────────────────────────────────────────────┘
```

**5 Ad Placements:**
| ID | Format | Dimensions | Visibility |
|---|---|---|---|
| `AD_TOP` | Leaderboard | 728×90 | All breakpoints (320px wide on mobile) |
| `AD_LEFT` | Wide Skyscraper | 160×600 | Desktop only (≥1280px) |
| `AD_RIGHT` | Wide Skyscraper | 160×600 | Desktop only (≥1280px) |
| `AD_BOTTOM_LEFT` | Medium Rectangle | 336×280 | Tablet + Desktop |
| `AD_BOTTOM_RIGHT` | Medium Rectangle | 336×280 | Tablet + Desktop |

**Responsive Breakpoints:**
- `≥1280px`: 3-column (AD_LEFT | content | AD_RIGHT) + AD_TOP + both bottom ads
- `768–1279px`: 1-column content + AD_TOP + both bottom ads (left/right ads hidden)
- `<768px`: AD_TOP only — max 1 ad on mobile (AdSense policy compliance)

**Reusable AdSlot Component:**
```jsx
// src/components/layout/AdSlot.jsx
import { useEffect } from 'react';

export const AdSlot = ({ slotId, size, className = '' }) => {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
    catch (e) { console.warn('AdSense push failed:', e); }
  }, []);

  return (
    <div
      className={`ad-slot ad-slot--${size} ${className}`}
      data-ad-slot={slotId}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
```

---

## 🧭 NAVIGATION

**Top Navbar** — fixed, 64px height, `z-50`
- Left: HSC logo mark + "Hilmost Ultimate Toolbox" wordmark (Sora font)
- Centre: Category dropdown nav (desktop) / hamburger (mobile)
- Right: Search icon, Light/Dark toggle, (future) Sign In button

**Left Sidebar** — 240px, collapsible drawer on mobile
- Expandable category tree with icons:
  - 🔢 Calculators
  - 🔬 Science & Physics
  - 📐 Unit Converters
  - 💱 Currency
  - 📝 Text Tools
  - 🎨 Colour Tools
  - 🌐 Web & Dev Tools
  - 📅 Date & Time
  - 🏥 Health & Fitness
  - 💰 Finance Tools
  - 🎲 Fun & Misc
- Active tool highlighted with teal left border
- Phase 2 tools show grey "Coming Soon" pill badge

---

## ⚙️ PHASE 1 TOOLS — FULL IMPLEMENTATION REQUIRED

### 1. 🏥 BMI Calculator (`/tools/bmi`)

- Toggle: Metric (kg / cm) ↔ Imperial (lbs / ft + in)
- Output: BMI value (2 decimal places), WHO category label with colour coding:
  - 🔵 Underweight < 18.5
  - 🟢 Normal 18.5–24.9
  - 🟡 Overweight 25–29.9
  - 🔴 Obese ≥ 30
- Visual: Animated arc gauge (SVG, teal needle), category zone coloured segments
- Show: Healthy weight range for entered height
- Disclaimer footer: "For informational purposes only. Consult a healthcare professional."
- SEO meta: "Free BMI Calculator — Metric & Imperial | Hilmost Ultimate Toolbox"

---

### 2. 🔢 Math Calculator (`/tools/calculator`) — 4 Mode Tab Switcher

**Mode A — Standard**
- Full keypad: 0–9, +, −, ×, ÷, %, ±, decimal, =, C, CE, backspace
- Two-line display: expression line (top, smaller) + result line (bottom, large, JetBrains Mono)
- History panel: last 20 entries, click to restore, clear all button
- Full keyboard support (numpad + standard keys)

**Mode B — Scientific**
- All Standard features PLUS:
- Trig: sin, cos, tan, sin⁻¹, cos⁻¹, tan⁻¹
- Logs: log₁₀, ln, log₂
- Powers: xʸ, x², x³, √x, ∛x, eˣ, 10ˣ
- Constants: π, e, φ
- n!, |x|, parentheses ()
- DEG / RAD toggle (pill toggle, affects all trig functions)
- ANS key (last result)

**Mode C — Programmer**
- Base display: DEC / HEX / OCT / BIN — all four shown simultaneously, active base is editable
- Input in any base, all others update live
- Bitwise: AND, OR, XOR, NOT, LSHIFT (<<), RSHIFT (>>)
- Word size selector: BYTE (8) / WORD (16) / DWORD (32) / QWORD (64)
- Two's complement shown for negative values
- All values in JetBrains Mono, uppercase hex

**Mode D — Graphing**
- f(x) input field (e.g. `sin(x)`, `x^2 - 4x + 3`, `log(x)`)
- Up to 4 simultaneous functions — colour coded: teal, slate, coral, amber (all muted/monochromatic)
- Canvas/SVG render:
  - Cartesian grid with numbered axis labels
  - Configurable X range (min/max inputs) and Y range (auto or manual)
  - Zero-crossing markers (small teal dots)
  - Local min/max annotations
  - Pan and zoom (mouse wheel / pinch)
- Resolution/step slider
- "Export as PNG" button (canvas.toDataURL)
- Parser: `math.js` — no external graphing API
- Error display if expression is invalid (red underline + message)

---

### 3. 📐 Unit Converter (`/tools/units`)

Tab-per-category layout. Each tab: FROM dropdown + number input → live result → TO dropdown. SWAP button between. Conversion formula shown beneath.

| Category | Key Units |
|---|---|
| Length | mm, cm, m, km, in, ft, yd, mi, nautical mile, light-year |
| Weight / Mass | mg, g, kg, tonne, oz, lb, stone, US ton, metric ton |
| Volume | ml, cl, l, m³, tsp, tbsp, fl oz (US), cup, pint, quart, gallon (US & UK) |
| Temperature | °C, °F, K, °R (Rankine) |
| Area | mm², cm², m², km², in², ft², yd², acre, hectare |
| Speed | m/s, km/h, mph, knots, ft/s, Mach (≈343m/s) |
| Time | ms, s, min, hr, day, week, month (avg), year |
| Data Storage | bit, B, KB, MB, GB, TB, PB — both SI (1000) and binary (1024) with toggle |
| Data Transfer | bps, Kbps, Mbps, Gbps, Tbps |
| Energy | J, kJ, cal, kcal, Wh, kWh, BTU, eV, MJ |
| Power | W, kW, MW, GW, hp (mech), hp (metric), BTU/hr |
| Pressure | Pa, kPa, MPa, bar, mbar, psi, atm, mmHg, inHg |
| Angle | °, rad, grad, turn, arcmin, arcsec |
| Frequency | Hz, kHz, MHz, GHz, THz, rpm |
| Fuel Economy | L/100km, mpg (US), mpg (UK), km/L |

All conversions: pure JS constants in `conversionData.js` — no API, works fully offline.

---

### 4. 💱 Currency Converter (`/tools/currency`)

**Primary converter:**
- Amount input (numeric, formatted with commas)
- FROM: Searchable dropdown — flag emoji + ISO code + currency name (e.g. 🇺🇸 USD — US Dollar)
- TO: Same searchable dropdown
- SWAP button (animated icon rotation)
- Result: Large display with rate line below: "1 USD = 358.20 ZWL"
- Last updated timestamp: "Rates updated: 04 Jun 2026 08:00 UTC"

**Multi-currency panel:**
- "Convert to multiple currencies" toggle
- Select up to 5 target currencies
- Show all conversions in a clean table below

**190 currencies:** Full ISO 4217 list including ZWL, ZAR, USD, EUR, GBP, JPY, CNY, BTC (if supported by API), and all major + minor world currencies.

**API:** `https://v6.exchangerate-api.com/v6/{VITE_EXCHANGE_RATE_API_KEY}/latest/{base}`
- Cache rates in `localStorage` with timestamp key `hsc_rates_{base}_{date}`
- Refresh only if >24hrs old
- Fallback: display last cached rates with stale warning banner
- Debounce input: 500ms minimum before recalculation

**Firebase Function (stub):** Create `functions/src/fetchRates.ts` — a scheduled Cloud Function that fetches rates daily and writes to Firestore `rates/{base}` collection. Toolbox reads from Firestore instead of direct API on high-traffic days.

---

### 5. 🔬 Physics Equations Solver (`/tools/physics`)

Structured equation library with interactive solve-for-any-variable UI.

**UI Pattern per equation:**
1. Category header with domain name
2. Equation title
3. KaTeX-rendered formula (beautiful LaTeX display)
4. Variable inputs — all known variables with unit labels
5. "Solve for:" dropdown — select unknown variable
6. [Solve] button → result with unit + step-by-step working shown in expandable panel
7. [Clear] button

**Equation Library:**

**⚙️ Mechanics**
- Newton's Second Law: `F = ma`
- Kinematics 1: `v = u + at`
- Kinematics 2: `s = ut + ½at²`
- Kinematics 3: `v² = u² + 2as`
- Momentum: `p = mv`
- Impulse: `J = FΔt = Δp`
- Work: `W = Fd·cosθ`
- Kinetic Energy: `KE = ½mv²`
- Gravitational PE: `PE = mgh`
- Power: `P = W/t`
- Centripetal Force: `F = mv²/r`
- Gravitational Force: `F = Gm₁m₂/r²`

**🌊 Waves & Optics**
- Wave speed: `v = fλ`
- Period/Frequency: `T = 1/f`
- Snell's Law: `n₁sinθ₁ = n₂sinθ₂`
- Thin Lens: `1/f = 1/v + 1/u`
- Magnification: `m = v/u`

**⚡ Electricity**
- Ohm's Law: `V = IR`
- Power (3 forms): `P = VI`, `P = I²R`, `P = V²/R`
- Charge: `Q = It`
- Capacitance: `Q = CV`
- Electric PE: `E = QV`
- Coulomb's Law: `F = kq₁q₂/r²`
- Series resistance: `R_total = R₁ + R₂ + ...`
- Parallel resistance: `1/R_total = 1/R₁ + 1/R₂ + ...`

**🌡️ Thermodynamics**
- Ideal Gas Law: `PV = nRT`
- Heat transfer: `Q = mcΔT`
- Thermal expansion: `ΔL = αL₀ΔT`

**✨ Relativity**
- Mass-energy equivalence: `E = mc²`
- Time dilation: `t' = t / √(1 - v²/c²)`
- Length contraction: `L' = L√(1 - v²/c²)`

Constants used: `G = 6.674×10⁻¹¹`, `g = 9.81 m/s²`, `c = 3×10⁸ m/s`, `k = 8.99×10⁹`, `R = 8.314`

---

## 🚀 PHASE 2 — STUB PAGES (route + shell + Coming Soon UI, no tool logic)

Build navigable shells for all of these. Each stub shows: category icon, title, description, "Coming Soon — We're building this!" card with teal accent, and an optional email signup field ("Notify me when ready").

### 📝 Text Tools (`/tools/text/*`)
Word Counter, Character Counter, Case Converter (7 cases), Text Diff, Lorem Ipsum Generator, Duplicate Line Remover, Markdown Previewer, Slug Generator, Text Reverser, Morse Code Translator

### 🎨 Colour Tools (`/tools/colour/*`)
HEX↔RGB↔HSL↔CMYK Converter, Colour Palette Generator, Contrast Checker (WCAG AA/AAA), Gradient Generator, Tint & Shade Generator

### 🌐 Web & Dev Tools (`/tools/dev/*`)
JSON Formatter, Base64 Encode/Decode, URL Encode/Decode, Hash Generator (MD5/SHA-1/SHA-256/SHA-512), Password Generator, QR Code Generator, UUID Generator, Regex Tester, JWT Decoder, HTML Entity Encoder

### 📅 Date & Time (`/tools/datetime/*`)
Age Calculator, Date Difference, Timezone Converter (all IANA zones), Countdown to Date, Unix Timestamp Converter, Week Number Calculator, Business Days Calculator

### 🏥 Health & Fitness (`/tools/health/*`)
Calorie/TDEE Calculator, Body Fat % (US Navy Method), Ideal Weight (5 formulas), Macro Calculator, Pregnancy Due Date, Water Intake, Sleep Cycle Calculator, Running Pace Calculator

### 💰 Finance Tools (`/tools/finance/*`)
Loan/EMI Calculator, Compound Interest, VAT/Tax Calculator, Salary Converter (hourly↔annual), Tip Calculator, Discount Calculator, Break-Even Calculator, ROI Calculator, Inflation Calculator

### 🎲 Fun & Misc (`/tools/fun/*`)
Random Number Generator, Coin Flipper, Dice Roller (D4–D20), Roman Numeral Converter, Number to Words, Zodiac Sign Calculator, Name to Numerology, IP Address Lookup, Screen Resolution Detector

---

## 🗂️ FILE STRUCTURE — `apps/hilmost-toolbox/`

```
apps/hilmost-toolbox/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── og-image.png                   # Open Graph share image
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Shell.jsx              # Root layout: navbar + sidebars + ad slots
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx            # Collapsible tool category tree
│   │   │   ├── Footer.jsx
│   │   │   └── AdSlot.jsx             # Reusable AdSense slot component
│   │   └── ui/
│   │       ├── ThemeToggle.jsx
│   │       ├── SearchBar.jsx
│   │       ├── ToolCard.jsx           # Homepage grid card
│   │       ├── ComingSoonPage.jsx     # Reusable stub for Phase 2 tools
│   │       ├── Breadcrumb.jsx
│   │       └── ErrorBoundary.jsx      # Wrap every tool
│   ├── tools/
│   │   ├── bmi/
│   │   │   ├── BMICalculator.jsx
│   │   │   └── bmi.utils.js
│   │   ├── calculator/
│   │   │   ├── Calculator.jsx         # Tab switcher parent
│   │   │   ├── StandardMode.jsx
│   │   │   ├── ScientificMode.jsx
│   │   │   ├── ProgrammerMode.jsx
│   │   │   ├── GraphingMode.jsx
│   │   │   └── calculator.utils.js
│   │   ├── units/
│   │   │   ├── UnitConverter.jsx
│   │   │   └── conversionData.js      # All conversion factors, pure JS
│   │   ├── currency/
│   │   │   ├── CurrencyConverter.jsx
│   │   │   ├── currency.service.js    # API fetch + localStorage cache
│   │   │   └── currencyList.js        # All 190 ISO 4217 currencies
│   │   ├── physics/
│   │   │   ├── PhysicsEquations.jsx
│   │   │   ├── EquationSolver.jsx     # Reusable solve-for-variable UI
│   │   │   └── equations.data.js      # All equations + metadata
│   │   └── stubs/                     # Phase 2 shells
│   │       ├── TextTools.jsx
│   │       ├── ColourTools.jsx
│   │       ├── DevTools.jsx
│   │       ├── DateTime.jsx
│   │       ├── Health.jsx
│   │       ├── Finance.jsx
│   │       └── FunMisc.jsx
│   ├── hooks/
│   │   ├── useTheme.js                # System pref + localStorage persist
│   │   ├── useCurrencyRates.js        # Fetch + cache + stale logic
│   │   └── useKeyboardInput.js        # Calculator keyboard handler
│   ├── firebase/
│   │   └── firebaseConfig.js          # Init app with env vars
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css              # CSS custom properties / design tokens
│   ├── pages/
│   │   └── HomePage.jsx               # Tool grid landing page
│   ├── App.jsx
│   ├── routes.jsx
│   └── main.jsx
├── .env                               # VITE_ env vars (gitignored)
├── .env.example                       # Committed template
├── index.html                         # AdSense script tag here
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 📦 DEPENDENCIES — `apps/hilmost-toolbox/package.json`

```json
{
  "name": "@hsc/hilmost-toolbox",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "^6",
    "mathjs": "^12",
    "katex": "^0.16",
    "react-select": "^5",
    "date-fns": "^3",
    "lucide-react": "^0.383",
    "firebase": "^10"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-react": "^4",
    "tailwindcss": "^3",
    "autoprefixer": "^10",
    "postcss": "^8"
  }
}
```

---

## 🎨 UI DESIGN SPECIFICATIONS

### Homepage (`/`)
- Hero: "Hilmost Ultimate Toolbox" (Sora, 48px bold) + tagline, animated teal underline on load
- Global search bar ("Search 50+ tools...") — filters tool grid live
- Tool Category Grid: 3-col desktop / 2-col tablet / 1-col mobile
- Each card: category icon (large, teal), name, tool count, short description, "Explore →" button
- Hover: card lifts (translateY -4px), teal left border 3px appears
- Featured tools row at top: BMI, Calculator, Currency, Unit Converter, Physics

### Tool Pages
- Breadcrumb: Home › Category › Tool Name (linked)
- Page `<h1>` = Tool Name (Sora font)
- Tool container: `bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6`
- Result output: teal `border-l-4` accent, slightly different background, JetBrains Mono font
- Error states: red-50 bg, red-500 border, clear message

### Dark Mode
- NOT just CSS invert — purpose-designed dark palette
- Backgrounds: `#111827` (page), `#1F2937` (cards), `#374151` (inputs)
- Borders: `#374151`
- Teal accent stays `#00C9A7` — same brand colour, works on dark
- Text: `#F9FAFB` (primary), `#9CA3AF` (secondary)

---

## ♿ SEO & PERFORMANCE REQUIREMENTS

**SEO per page:**
- Unique `<title>`: `[Tool Name] — Free Online [Category] | Hilmost Ultimate Toolbox`
- `<meta name="description">` per tool (150 chars, include primary keyword)
- `<meta property="og:*">` tags (title, description, image, url)
- `<h1>` = tool name (one per page)
- Semantic HTML: `<main>`, `<nav>`, `<aside>`, `<section>`, `<article>`, `<header>`
- `robots.txt`: allow all crawlers
- `sitemap.xml`: auto-generated listing all tool URLs
- Canonical URLs on all pages

**Performance:**
- Code-split every tool route (`React.lazy` + `Suspense`)
- Lazy-load ad slots (IntersectionObserver)
- Fonts: `display=swap`, preconnect to `fonts.googleapis.com`
- Images: WebP format, explicit width/height to prevent CLS
- Target: Lighthouse score ≥90 on all four metrics

---

## 🧪 DELIVERABLES CHECKLIST

Generate the following complete, working files:

**Monorepo Root**
- [ ] `/firebase.json` — multi-site hosting config
- [ ] `/.firebaserc` — `hsc-platform-core` project + target mappings
- [ ] `/package.json` — workspace root
- [ ] `/pnpm-workspace.yaml`
- [ ] `/README.md` — full setup, build, deploy, domain connection guide

**App: hilmost-toolbox**
- [ ] `src/App.jsx` — router with all routes + lazy imports
- [ ] `src/routes.jsx` — all route definitions
- [ ] `src/pages/HomePage.jsx` — tool grid landing page
- [ ] `src/components/layout/Shell.jsx` — full layout with all 5 ad slots
- [ ] `src/components/layout/Navbar.jsx`
- [ ] `src/components/layout/Sidebar.jsx`
- [ ] `src/components/layout/AdSlot.jsx`
- [ ] `src/components/layout/Footer.jsx`
- [ ] `src/components/ui/ComingSoonPage.jsx`
- [ ] `src/components/ui/ErrorBoundary.jsx`
- [ ] `src/tools/bmi/BMICalculator.jsx` — full implementation
- [ ] `src/tools/calculator/Calculator.jsx` + all 4 mode files
- [ ] `src/tools/units/UnitConverter.jsx` + `conversionData.js`
- [ ] `src/tools/currency/CurrencyConverter.jsx` + `currency.service.js` + `currencyList.js`
- [ ] `src/tools/physics/PhysicsEquations.jsx` + `equations.data.js`
- [ ] All Phase 2 stub pages in `src/tools/stubs/`
- [ ] `src/hooks/useTheme.js` + `useCurrencyRates.js`
- [ ] `src/firebase/firebaseConfig.js`
- [ ] `src/styles/globals.css` + `variables.css`
- [ ] `index.html` — with AdSense `<script>` placeholder + Google Fonts preconnect
- [ ] `vite.config.js` — with React plugin + manual chunk splitting
- [ ] `tailwind.config.js` — with HSC brand colours and Sora/DM Sans/JetBrains Mono fonts
- [ ] `.env.example`
- [ ] `package.json`

---

## ⚠️ CONSTRAINTS & QUALITY GATES

1. **Firebase project ID is `hsc-platform-core`** — never `hilmost-toolbox` at the project level; `hilmost-toolbox` is only the hosting target name
2. **No external API calls on keystroke** — debounce all remote fetches ≥500ms
3. **Unit conversions are pure JS** — `conversionData.js` only, zero API dependency
4. **Graphing calculator offline-capable** — `math.js` only, no remote graphing service
5. **Physics solver** — show step-by-step algebraic working, not just final answer
6. **Mobile first** — every tool functional at 375px viewport
7. **AdSense compliance** — max 3 ads visible on mobile simultaneously
8. **No hardcoded secrets** — all keys via `VITE_` env vars
9. **Error boundaries** — wrap every tool; one crash must not break the shell
10. **Loading states** — every async operation shows spinner with descriptive text
11. **Dark mode** — fully designed, not inverted; test both modes explicitly
12. **`@hsc/` package namespace** — all HSC packages prefixed for future monorepo expansion
13. **Scalability first** — every architectural decision must support adding new HSC sites without restructuring

---

*End of Gemini Build Prompt — Hilmost Ultimate Toolbox v2.0*
*Firebase Backend: `hsc-platform-core` | Hosting Target: `hilmost-toolbox`*
*DNS: Cloudflare | Domain: hilmost.net (pending) | Generated by Claude for HSC*
