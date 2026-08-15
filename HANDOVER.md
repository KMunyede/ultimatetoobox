# Hilmost Handover & Continuation Document
**Updated:** August 15, 2026
**Project:** UtilitiesSite Monorepo

---

## 🔍 1. Completed Tasks (This Session)

### **A. Tool Count Refactor (SSOT)**
- **Refactor:** Removed the manual `count: number` property from the `ToolCategory` interface and all category definitions in `packages/config/src/categories.ts`.
- **Logic Sync:** Updated all consumer components to use the dynamic `TOTAL_TOOL_COUNT` constant or `cat.tools.length`.
- **Files Impacted:**
    - `packages/config/src/categories.ts`
    - `packages/ui/src/CategoryGrid.tsx`
    - `packages/ui/src/NavigationMenu.tsx`
    - `apps/hilmost_toolbox_web/src/components/ToolboxDirectory.tsx`
    - `apps/hilmost_main/src/app/about/page.tsx`
    - `apps/hilmost_main/src/app/page.tsx`
    - `apps/hilmost_corporate/src/app/about/page.tsx`

### **B. Ad Gating (Build-time Flag)**
- **New Flag:** Introduced `NEXT_PUBLIC_ADS_ENABLED` (boolean string).
- **Implementation:** Wrapped all 4 ad slots in `packages/ui/src/AdLayout.tsx` with this flag.
- **Default State:** Set to `false` in all build scripts (`package.json`) and local environments.
- **Turbo Config:** Added to `globalEnv` in `turbo.json` to ensure cache busting on flag changes.

### **C. Deployment**
- **Commit:** `94b9ea17f781aa16a0fd3648fd6ac6ddedd3ce28` ("chore: gate ad slots behind NEXT_PUBLIC_ADS_ENABLED flag").
- **Staging:** Successfully deployed to all staging targets via `npm run deploy:test`.
- **Status:** Staging sites currently show **0 ad slots** (clean layout).

---

## 🏗 2. Architectural Source of Truth

- **Single Source of Truth (SSOT) for Tools:** `packages/config/src/categories.ts`.
- **Ad Rendering Hub:** `packages/ui/src/AdLayout.tsx` (now gated).
- **Build Orchestration:** `turbo.json` and `package.json` at root.

---

## 🚀 3. Active Development State

### **Deployment Targets**
- **Main Site:** `hilmost.net` / `hsc-platform-core`
- **Toolbox:** `hilmost-toolbox.hilmost.net`
- **Corporate:** `hilmost.net` (various paths)

### **Key Command**
- **Command:** `npm run deploy:test` (Deploys gated ads version to staging).

---

## 🛠 4. Next Steps for New Chat
1. **Production Deployment:** Once Keepy verifies the ad-free layout on staging, trigger a production deploy (`npm run ship` or `deploy:live`).
2. **Feature Development:** Resume building out new tool categories or individual tools in `hilmost_toolbox_web`.
3. **SEO Audit:** Monitor Lighthouse scores to ensure ad-gating improved CLS/LCP as expected.

---
*Reference this document and AGENTS.md at the start of every new session.*
