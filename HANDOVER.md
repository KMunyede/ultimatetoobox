# Hilmost Handover & Continuation Document
**Updated:** August 15, 2026
**Project:** UtilitiesSite Monorepo

---

## 🔍 1. Tool Count Investigation (Latest Task)

### **Context**
Investigated reported incorrect tool counts ("370+" and "39") on the `/about` pages and header banners.

### **Findings**
- **No Hardcoded Strings:** Exhaustive searches for "370" and "39" in source code yielded no results. These likely represent ghost strings from a previous deployment.
- **Dynamic Logic:** The codebase now uses a dynamic `{displayCount}` variable derived from `TOOL_CATEGORIES`.
- **Current Total:** The actual tool count in `packages/config/src/categories.ts` is **50**, which renders as **"50+"** across all sites.
- **Implementation Inconsistency:**
    - `packages/ui/src/NavigationMenu.tsx`: Uses `cat.tools.length` (dynamic).
    - `apps/hilmost_main/src/app/about/page.tsx`: Uses `cat.count` (hardcoded property in config).
- **Recommendation:** Refactor `TOOL_CATEGORIES` to remove the manual `count` property and use `tools.length` exclusively to prevent future drift.

---

## 🏗 2. Architectural Source of Truth

### **Single Source of Truth (SSOT)**
- **Tool Data:** `packages/config/src/categories.ts`. Controls the directory, total counts, and featured tools.
- **Components:** Shared UI lives in `packages/ui`.
- **Apps:** 
    - `hilmost_main`: Maps to `hilmost.net` (Consumer Hub).
    - `hilmost_toolbox_web`: Maps to `hilmost-toolbox.hilmost.net` (Advanced Tools).
    - `hilmost_corporate`: Maps to `hilmost.net/corporate` context (B2B/Holdings).

### **Result Formatting Engine**
- **Component:** `packages/ui/src/ScientificNumber.tsx`
- **Format:** Standardized "Lab Standard" layout for large/small numbers used across all converters and calculators.

---

## 🚀 3. Active Development State

### **Key Deployment Command**
- **Command:** `npm run ship`
- **Action:** Builds all apps, deploys to Firebase (Production & Staging), commits, and pushes.
- **Mapping:**
    - `hosting:hilmost-toolbox` -> Toolbox Web
    - `hosting:hsc-platform-core` -> Main Site

---

## 🛠 4. Next Steps for New Chat
1. **Refactor Categories:** Remove `count: number` from `ToolCategory` interface and object literals in `categories.ts`.
2. **Update Components:** Ensure all components use `cat.tools.length` or the exported `TOTAL_TOOL_COUNT` constant.
3. **Verify Deployment:** Trigger a fresh `npm run build` to confirm static pages reflect the "50+" count correctly.

---
*Reference this document and AGENTS.md at the start of every new session.*
