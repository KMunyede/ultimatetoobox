# GEMINI.md — apps/hilmost_corporate
## Hilmost Corporate Pages

> This file applies ONLY when working inside `apps/hilmost_corporate/`.
> It builds on the shared rules in the monorepo's root `AGENTS.md` (stack, Firebase project, design language, operating authority) — read that first if not already loaded.

---

## 1. PURPOSE OF THIS APP

This app holds the **corporate/informational pages** for Hilmost Software Corporation (HSC) — content such as About, Contact, Privacy Policy, Terms of Service, and any company/brand information that supports the main site and is required for AdSense approval across the HSC product portfolio.

---

## 2. CURRENT STATE & TASK

Before making changes:
1. Review what currently exists in this app and report a brief summary (which pages exist, how they're routed, whether they're standalone or shared via `packages/`).
2. Confirm with Keepy whether this app is meant to be a **separate deployable site** or whether these pages should eventually be **shared components** consumed by `hilmost_main`, `hilmost_toolbox_web`, and future apps (e.g., a shared Privacy Policy page used across all subdomains). This distinction affects whether content here should live in `packages/` instead.

---

## 3. DESIGN & SEO EXPECTATIONS

- Follow the shared "Enterprise-Calm" design language and responsive standards from the root `AGENTS.md` (mobile-first, 320px–1920px+, no horizontal scroll, WCAG 2.1 AA).
- Legal/policy pages (Privacy, Terms) should be plain, readable, and indexable — simple semantic HTML, no heavy interactivity needed.
- Keep consistent header/footer with the other Hilmost properties.

---

## 4. WHAT NOT TO DO

- Don't duplicate legal/policy content if it could be a single shared source consumed across apps — raise this with Keepy if you notice duplication risk.
- Don't introduce a different framework or styling approach than the rest of the monorepo.

---

**Acknowledge by confirming you've also loaded the root `AGENTS.md`, then summarize the current state of this app and ask whether shared-content extraction (via `packages/`) is in scope before proceeding.**
