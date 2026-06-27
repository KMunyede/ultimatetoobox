# Hilmost Handover & Continuation Document
**Date:** June 26, 2026
**Project:** UtilitiesSite Monorepo

---

## 🏗 1. Architectural Source of Truth

### SEO & Metadata Engine
- **Utility:** `apps/hilmost_toolbox_web/src/lib/metadata.ts`
- **Function:** `formatTitle(TOOL_NAME)` intelligently removes duplicate suffixes, prioritizes keywords, and enforces a < 60 character limit for SERP visibility.
- **AI Discoverability:** `llms.txt` files created in both `/apps/hilmost_main/public` and `/apps/hilmost_toolbox_web/public` for modern AI crawler optimization.

### Navigation & UI Standards
- **Breadcrumbs:** Path is normalized: `Hilmost Toolbox > [Category] > [Tool Name]`.
- **Mobile Navigation:** High-impact 3-row stacked Header in `packages/ui/src/Header.tsx`.
    - Row 1: Brand + Search + Theme.
    - Row 2: Quick Link Pills (Guides, About, Contact).
    - Row 3: Full-width "Browse Tools" button.
- **Scroll Stability:** Global `overflow-x: hidden` in `globals.css` and smart body-lock during mobile menu usage.

### Tool Implementation Pattern
- **Route:** `app/[category]/[tool-name]/page.tsx` (Metadata + Structural SEO).
- **Client:** `app/[category]/[tool-name]/[ToolName]Tool.tsx` (Business Logic + React State).
- **Security:** 100% Client-Side processing (Zero-Server Architecture). Uses `crypto.getRandomValues()` for randomness.

---

## 🚀 2. Active Development State

### Latest Major Updates
- **QR Code Generator:** Live at `/dx/qr-code-generator`. Supports URL, Text, Email, Phone, Wi-Fi. Features PNG/SVG download and Copy to Clipboard.
- **Password Generator (Upgraded):** Entropy-based strength meter, bulk generation (up to 10), ambiguous character filtering, and long-form SEO content block.
- **DX Category:** Expanded to 5 tools (JSON Formatter, Password Gen, QR Code Gen, Regex Tester, JWT Decoder).

### Key Locations
- **Toolbox App:** `apps/hilmost_toolbox_web/`
- **Main App:** `apps/hilmost_main/`
- **Shared UI:** `packages/ui/`
- **Shared Config:** `packages/config/`

---

## 🛠 3. Technical Constraints & Styles
- **Design Language:** "Enterprise-Calm" (Clean, Slate/Neutral, Emerald/Brand Blue accents).
- **Automation:** Use `npm run deploy:all` from the monorepo root to push everything to Firebase (Live & Staging) in one step.
- **Privacy:** NO data uploads. All tool processing must happen in the browser.

---
*Reference this document and AGENTS.md at the start of every new session.*
