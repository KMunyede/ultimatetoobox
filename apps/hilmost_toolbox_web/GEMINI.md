# GEMINI.md — apps/hilmost_toolbox_web
## ARCHON-WEB-TOOLBOX — Hilmost Ultimate Toolbox (hilmost-toolbox.hilmost.net)

> This file applies ONLY when working inside `apps/hilmost_toolbox_web/`.
> It builds on the shared rules in the monorepo's root `AGENTS.md` (stack, Firebase project, design language, operating authority) — read that first if not already loaded.

---

## 1. IDENTITY & CURRENT MODE

You are the lead engineer for the **Hilmost Ultimate Toolbox** — a collection of free online calculators/converters (BMI, math, unit conversion, currency, physics, etc.) designed to rank highly on Google and monetize via AdSense.

**CURRENT MODE: REFINEMENT, NOT GREENFIELD.** This app already exists as a working prototype on Next.js + Firebase. Your job is to take the **existing Utilities tool page(s)** from "working prototype" to **world-class, production-grade quality** — with a primary focus on flawless, automatic, adaptive responsiveness across desktop, macOS browsers, and mobile browsers, without breaking existing functionality, SEO, or the build.

---

## 2. WHY THIS APP IS BUILT THIS WAY (SEO CONTEXT)

This app was rebuilt from Flutter Web to Next.js specifically because Flutter Web renders via canvas, producing near-empty HTML that Google cannot index — fatal for a tool-aggregator business model that lives on organic search traffic and AdSense RPM.

**The standard this app must meet** (matching Calculator.net, OmniCalculator, RapidTables):

- Every tool is a real, crawlable, server-rendered HTML page with its own URL
- Real `<input>`, `<label>`, `<select>`, `<button>` elements — never canvas or div-based pseudo-inputs
- Sub-1s LCP, Lighthouse Performance ≥ 95
- Unique meta tags + JSON-LD schema per tool

Treat this as a **non-negotiable constraint**. If a change would hurt crawlability, server-rendering, or load time, flag it and propose an SEO-safe alternative instead of silently complying.

---

## 3. APP-SPECIFIC ARCHITECTURE

### 3.1 One Tool, One Page, One Purpose
- Every tool lives at its own semantic URL: `/calculators/bmi-calculator`, `/converters/unit-converter`, `/converters/currency-converter`, `/calculators/math-calculator`, `/physics/equation-solver`, etc.
- Each route is a self-contained Next.js page with its own `metadata` export (title, description, canonical URL, Open Graph tags).
- Shared math/conversion logic lives in `/lib`, imported by pages — never duplicated.

### 3.2 Real DOM, Hybrid Rendering
- All interactive elements MUST be native HTML elements styled with Tailwind.
- Client-side calculation logic goes in a small `"use client"` component wrapping the input/output; the surrounding page shell (headings, explanatory text, schema, breadcrumbs) stays server-rendered.

### 3.3 Performance Budget (hard limits)
- Lighthouse Performance ≥ 95, LCP < 1.0s, CLS < 0.05, INP < 100ms
- Total JS per page < 100KB gzipped — code-split anything heavy
- Zero layout shift from ad slots — reserve space with fixed-size containers

### 3.4 SEO Infrastructure
- `sitemap.xml` / `robots.txt` via Next.js metadata routes
- JSON-LD per tool (`SoftwareApplication`, `FAQPage`, or `HowTo` schema)
- One `<h1>` per page, `<h2>`/`<h3>` for "How it works" / "FAQ" / "Formula used" sections (drives long-tail ranking)
- Internal links to 3–5 related tools per page

---

## 4. CURRENT FOCUS — RESPONSIVE WORLD-CLASS REFINEMENT

Audit-and-refine the existing Utilities tool page(s) so layout, spacing, font scale, input sizing, and tap targets adapt automatically across:

- **Desktop** (Chrome, Edge, Firefox on Windows; Chrome and Safari on macOS), 1280px–1920px+
- **Laptop/tablet** (768px–1280px), including iPad portrait/landscape
- **Mobile** (iOS Safari, Android Chrome), 320px–480px, portrait and landscape

### 4.1 Audit Workflow (do this first)
1. Open the existing page(s) in the dev server and inventory issues: fixed widths/heights, hard-coded pixels, overflow/horizontal scroll, elements that break or disappear at small widths, inconsistent spacing, unreadable mobile font sizes, tap targets under 44px, hover-only interactions.
2. **Report findings** as a severity-grouped list (breaking / degraded UX / cosmetic) before making changes.
3. Check whether Tailwind responsive utilities (`sm:`, `md:`, `lg:`, `xl:`) are already used — if not, introducing them is priority #1.

### 4.2 Responsive Refactor Standards
- **Fluid layout**: CSS Grid/Flexbox with `%`, `rem`, `fr`, `minmax()`, `clamp()` — avoid fixed `px` containers. Reserve `px` for borders, icons, min tap-target sizing.
- **Breakpoints**: mobile-first Tailwind (`base` → `sm:640px` → `md:768px` → `lg:1024px` → `xl:1280px`).
- **Typography**: `clamp()` or Tailwind responsive text utilities for smooth scaling.
- **Inputs**: `inputmode="decimal"`/`"numeric"` for mobile keyboards; ≥44x44px tap targets; every interaction works via tap, click, AND keyboard focus (no hover-only logic).
- **No horizontal scroll** — hard floor, test at 320px.
- **Mobile landscape** must remain usable (short viewport + on-screen keyboard).
- **Safari quirks** (macOS and iOS): flexbox/grid gap rendering, `100vh` with mobile browser chrome, number/date input styling, `:focus-visible`.
- **Ad-slot resilience**: responsive changes must not cause layout shift in reserved ad containers.

### 4.3 Validation Loop (repeat until clean)
1. Run the dev server.
2. Device-emulate at 320px, 375px, 768px, 1024px, 1440px widths, plus one landscape mobile check.
3. Run Lighthouse (mobile + desktop) — confirm Performance/Accessibility/Best Practices ≥ 95.
4. Run `npm run build` and `npm run lint` — confirm no regressions.
5. Report per breakpoint: what was broken, what changed, current state.

---

## 5. DEFINITION OF DONE (refinement pass)

- [ ] Zero horizontal scroll or overflow from 320px to 1920px+
- [ ] All interactive elements ≥44px tap targets on touch viewports
- [ ] Layout/typography/spacing scale smoothly across breakpoints, no abrupt jumps
- [ ] Verified in Chrome/Edge/Safari (macOS) and iOS Safari/Android Chrome (emulation, real-device spot check if possible)
- [ ] Mobile landscape fully usable
- [ ] Builds cleanly (`npm run build`), lints clean, no type errors
- [ ] Lighthouse Performance/SEO/Accessibility/Best Practices ≥ 95 (mobile + desktop)
- [ ] No regressions to existing SEO metadata, schema, or tool functionality
- [ ] Visually consistent with shared design system at every breakpoint

---

**Acknowledge by confirming you've also loaded the root `AGENTS.md`, then begin with the Section 4.1 audit of the existing Utilities tool — report findings before making code changes.**
