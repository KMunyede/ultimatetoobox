# Hilmost Handover & Continuation Document
**Date:** June 24, 2026
**Project:** UtilitiesSite Monorepo

---

## 🏗 1. Architectural Source of Truth

### SEO & Metadata Engine
- **Utility:** `apps/hilmost_toolbox_web/src/lib/metadata.ts`
- **Function:** `formatTitle(TOOL_NAME)` intelligently removes duplicate suffixes, prioritizes keywords, and enforces a < 60 character limit for SERP visibility.
- **Freshness:** `firebase.json` is configured with `max-age=0, must-revalidate`. This forces Cloudflare/Firebase to serve fresh metadata to crawlers immediately on every deployment.

### Navigation Standards
- **Breadcrumbs:** Misleading icons have been replaced with the text **"Hilmost Toolbox"**. The path is normalized across all pages: `Hilmost Toolbox > [Category] > [Tool Name]`.
- **Consistency:** `AutoBreadcrumbs` has been removed in favor of page-level specific breadcrumbs to prevent double-rendering. Redundant JSON-LD schema has been purged globally (46+ pages).

### Dynamic Configuration
- **Categories:** `packages/config/src/categories.ts` is the single source of truth.
- **Automation:** The `CategoryGrid` component (`packages/ui`) dynamically renders categories on the "About" pages of both `hilmost.net` and `hilmost-toolbox.hilmost.net`. It includes "Smart Truncation" (shows 6, then a "View All" link).

### Monetization Strategy
- **Strategy:** "Sidebar-First".
- **Implementation:** Uses the `AdLayout` component. On desktop, ads are sticky sidebars to keep the central "Trust" column readable. On mobile, they use bottom-anchored safe placements. This preserves E-E-A-T (Trust) signals for SEO while maximizing revenue.

---

## 🚀 2. Active Development State

### Key Locations
- **Toolbox App:** `apps/hilmost_toolbox_web/`
- **Main App:** `apps/hilmost_main/`
- **Corporate App:** `apps/hilmost_corporate/`
- **Shared Config:** `packages/config/`
- **Shared UI:** `packages/ui/`

### Deployment Targets
- **LIVE:** `https://hilmost-toolbox.hilmost.net` (Mapped to target `hilmost-toolbox`)
- **TEST:** `https://hilmost-toolbox-staging.web.app` (Mapped to target `hilmost-toolbox-staging`)
- **Git Repo:** `https://github.com/KMunyede/ultimatetoobox.git`

---

## 🛠 3. Technical Constraints & Styles
- **Design Language:** "Enterprise-Calm" (Clean sans-serif, White/Neutral bg, Slate text, Brand blue accents).
- **Architecture:** Client-Side First (100% browser-side processing for privacy).
- **Communication:** Explain manual terminal or console steps in plain language for Keepy (Founder/Product Owner).

---
*Reference this document and AGENTS.md at the start of every new session.*
