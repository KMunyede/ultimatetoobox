# AGENTS.md — HSC Monorepo Shared Rules
## (UtilitiesSite — applies to ALL apps unless an app's own GEMINI.md overrides it)

---

## 1. WHO YOU'RE WORKING FOR

You are assisting **Keepy (Keeplife Munyede)**, founder and solo developer at **Hilmost Software Corporation (HSC)**, based in Harare, Zimbabwe. Keepy has 15+ years of IT/banking systems experience but is a **no-code/low-code product owner for this monorepo** — explain build steps in plain language when something needs manual action (e.g., "run this command in your terminal", "go to this Firebase Console page"), don't assume familiarity with framework internals.

---

## 2. MONOREPO MAP

This monorepo (`UtilitiesSite`) contains multiple independently-deployed websites under the Hilmost brand:

| Folder | Subdomain (target) | Purpose | Status |
|---|---|---|---|
| `apps/hilmost_main/` | hilmost.net | Main company / landing site | Active |
| `apps/hilmost_corporate/` | (corporate pages, e.g. about/contact) | Corporate info pages | Active |
| `apps/hilmost_toolbox/` | — | **Legacy Flutter version of the toolbox — being retired** | Legacy, do not actively develop |
| `apps/hilmost_toolbox_web/` | hilmost-toolbox.hilmost.net | New Next.js rebuild of the Utilities Toolbox (SEO-first) | Active — primary focus |

> Note: `games.hilmost.net` and `usefulapps.hilmost.net` are planned subdomains not yet scaffolded as apps. When they are created, add a matching `apps/<name>/GEMINI.md` following the same pattern as this document.

---

## 3. SHARED TECHNOLOGY STACK (applies to every app)

| Layer | Choice |
|---|---|
| Framework | **Next.js (App Router, latest stable)** for all web apps |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** |
| Backend / Data | **Firebase** — single project: `hsc-platform-core` (Firestore, Auth, Hosting, Functions as needed) |
| DNS / CDN | **Cloudflare** sits in front of all subdomains |
| Analytics / Ads | Google AdSense, Google Analytics 4, Search Console |

All Firebase config (`firebase.json`, `.firebaserc`) at the monorepo root targets the `hsc-platform-core` project with **multiple hosting targets**, one per app/subdomain. When adding a new app, register it as a new hosting target rather than a new Firebase project.

---

## 4. SHARED DESIGN LANGUAGE — "ENTERPRISE-CALM"

Every Hilmost property should feel like part of the same family — visually consistent with **Google Search/Material 3, Microsoft Fluent 2, Stripe.com, and Barclays.co.uk**:

- Clean sans-serif typography (Inter or system-ui), clear size hierarchy
- Neutral background (white/near-white), dark slate text, one accent color for primary actions
- Centered content columns, generous whitespace, no busy gradients
- Mobile-first responsive layouts — every page usable from 320px wide up to 1920px+, no horizontal scroll
- WCAG 2.1 AA accessibility minimum (contrast, focus states, keyboard navigation, 44px tap targets)
- Consistent header/footer pattern across sites (logo, nav, footer with About/Privacy/Contact — required for AdSense)

---

## 5. OPERATING AUTHORITY (applies in every app folder)

You have standing authority, within whichever app folder is the active workspace, to:

1. Run build/lint/type-check commands (`npm run build`, `npm run lint`, `tsc --noEmit`) proactively after changes, without asking first.
2. Install/remove npm packages as needed — briefly justify new dependencies (bundle size, why needed).
3. Diagnose and fix build/runtime errors end-to-end — read the error, fix the root cause, re-run to confirm.
4. Run the local dev server to validate changes and report what you observed.
5. Edit Firebase config (`firebase.json`, hosting targets, Firestore rules) for the `hsc-platform-core` project, and Cloudflare-related config files.
6. **Escalate to Keepy only when**: a decision has real cost implications (paid services, DNS/domain changes), or a requirement is genuinely ambiguous between two valid approaches.

### Working style
- Be concise and accurate — verify syntax before presenting it as working code.
- When proposing architecture or fixes, give a short trade-off summary (2–4 bullets) then a clear recommendation.
- Work in phases for large tasks to avoid incomplete/truncated output.
- Explain any manual steps (terminal commands, Firebase Console actions, file moves) in plain numbered steps, since Keepy is operating in a no-code/low-code capacity for infrastructure tasks.

---

## 6. CROSS-APP RULES

- **Never** duplicate shared UI components, design tokens, or utility functions across apps if they could live in `packages/` instead. If `packages/` is empty and a piece of code is needed by 2+ apps, propose creating a shared package (e.g., `packages/ui`, `packages/config`) rather than copy-pasting.
- **Never** make changes to `apps/hilmost_toolbox/` (legacy Flutter) unless explicitly asked — it exists for reference only while `hilmost_toolbox_web/` is being built out.
- Each app's own `GEMINI.md` (inside its folder) takes priority over this file for anything specific to that app.
