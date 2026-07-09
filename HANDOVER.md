# Hilmost Handover & Continuation Document
**Date:** July 5, 2026
**Project:** UtilitiesSite Monorepo

---

## 🏗 1. Architectural Source of Truth

### Date/Time Infrastructure
- **Component:** `packages/ui/src/DateTimePicker.tsx`
- **Optimization:** Time dials are isolated into memoized sub-components (`TimeDial`). Infinite scrolling uses "Silent Loop" logic with `overscroll-contain`.
- **Usage:** Standardized across Age Calculator, Sleep Cycle Calculator, Time Zone Hub, and Unix Time.

### Result Formatting Engine
- **Component:** `packages/ui/src/ScientificNumber.tsx`
- **Format:** Supports a 2-line "Lab Standard" layout for large/small numbers.
    - **Line 1:** Mantissa with currency/symbol prefix.
    - **Line 2:** Scale factor (`x 10 ^ exponent`) + Units.
- **Trigger:** Salaries >= $100M automatically switch to this format to prevent UI overlap in result cards.

---

## 🚀 2. Active Development State

### Latest Wins (Performance & UI)
- **High-Frequency State Isolation:** Live clocks (Sleep Cycle, Unix Time) and interactive lists (Time Zone Hub) now isolate their render cycles. This fixed the "scrolling lag" and browser jitter observed in previous versions.
- **Salary Converter Overhaul:** Widened layout to `max-w-4xl`. Implemented high-precision scientific notation (7 decimal places) for extreme financial values.
- **Scientific Equation Correctness:** Fixed the placement of exponents in physics equations; they now correctly sit as superscripts on the base-10 scale.

### Key Deployment Command
- **Command:** `npm run ship`
- **Action:** Runs `turbo build`, deploys to all **7 Firebase Hosting targets** (Live & Staging), commits changes, and pushes to GitHub in a single sequence.

---

## 🛠 3. Project Configuration
- **Design Language:** "Enterprise-Calm".
- **Architecture:** Zero-Server / Browser-Side.
- **Hosting Target Mapping:**
    - `hilmost-toolbox` (Next.js Rebuild)
    - `hsc-platform-core` (Main Site)
    - `hilmost-corporate` (Corporate Site)
    - `hilmost-wisdom` (PWA Extension)

---
*Reference this document and AGENTS.md at the start of every new session.*
