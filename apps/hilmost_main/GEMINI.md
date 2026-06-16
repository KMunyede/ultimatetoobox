# GEMINI.md — apps/hilmost_main
## Hilmost Main Site (hilmost.net)

> This file applies ONLY when working inside `apps/hilmost_main/`.
> It builds on the shared rules in the monorepo's root `AGENTS.md` (stack, Firebase project, design language, operating authority) — read that first if not already loaded.

---

## 1. PURPOSE OF THIS APP

This is the **main company website for hilmost.net** — the primary landing page and front door for the HSC product ecosystem (MindOS, Daily Stoic, Hilmost Toolbox, games, and any other HSC apps). Its job is to:

- Introduce visitors to the Hilmost brand and product portfolio
- Drive traffic to the Toolbox (hilmost-toolbox.hilmost.net), games (games.hilmost.net), and any other subdomains
- Present HSC as a credible, modern software company (this is often the first impression for partners, users, or recruiters)

---

## 2. CURRENT STATE & TASK

Before making changes:
1. Review the current pages/components in this app and report a brief summary of what exists (homepage, nav, footer, any product pages).
2. Confirm with Keepy what the priority task is for this session (e.g., new landing page section, navigation update, linking to the Toolbox subdomain, performance pass) — do not assume a large rebuild is wanted unless asked.

---

## 3. DESIGN & SEO EXPECTATIONS

- Follow the shared "Enterprise-Calm" design language from the root `AGENTS.md` — this site sets the visual tone that other Hilmost properties should feel consistent with.
- Even though this site isn't a tool-aggregator like the Toolbox, basic SEO hygiene still matters: unique page titles/meta descriptions, semantic headings, fast load times, mobile-first responsive layout (320px–1920px+, no horizontal scroll).
- Cross-link clearly to the other subdomains (Toolbox, games, useful apps) with clear calls to action.

---

## 4. WHAT NOT TO DO

- Don't introduce a different framework, styling system, or design language than what's already used elsewhere in the monorepo — consistency across `hilmost_main`, `hilmost_corporate`, and `hilmost_toolbox_web` matters for brand trust.
- Don't duplicate components/utilities that could live in `packages/` — flag and propose moving shared code there instead.

---

**Acknowledge by confirming you've also loaded the root `AGENTS.md`, then summarize the current state of this app before proposing or making changes.**
