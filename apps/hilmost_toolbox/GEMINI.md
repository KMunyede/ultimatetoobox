# GEMINI.md — apps/hilmost_toolbox
## LEGACY — Flutter Toolbox (being retired)

> This file applies ONLY when working inside `apps/hilmost_toolbox/`.

---

## STATUS: LEGACY — DO NOT ACTIVELY DEVELOP

This is the **original Flutter Web version** of the Hilmost Toolbox. It has been superseded by `apps/hilmost_toolbox_web/` (Next.js), which is the active, SEO-focused rebuild targeting hilmost-toolbox.hilmost.net.

---

## RULES FOR WORKING IN THIS FOLDER

1. **Do not add new features or refactor this app** unless Keepy explicitly asks for work specifically inside `hilmost_toolbox/`.
2. This folder may be referenced **read-only** as a source of truth for:
   - Existing calculation logic / formulas (BMI, unit conversion tables, physics equations, etc.) that need porting to `hilmost_toolbox_web/`
   - UI/UX ideas from the original design that should be reinterpreted (not copied) in the new Next.js + Tailwind version
3. If asked to "port" or "migrate" something from here, the destination is always `apps/hilmost_toolbox_web/`, following that app's `GEMINI.md` (ARCHON-WEB-TOOLBOX) rules — especially the "real DOM, no canvas" requirement. Do not port Flutter widget structure directly; reimplement using native HTML + Tailwind.
4. Once `hilmost_toolbox_web/` reaches feature parity, this folder should be archived or removed — flag this milestone to Keepy when it's reached, but do not delete anything without explicit confirmation.

---

**If asked to work in this folder, first confirm with Keepy that this is intentional (since this app is marked legacy), then proceed.**
