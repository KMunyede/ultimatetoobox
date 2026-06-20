# SEO & Performance Optimization Plan — Phase 1: Converters

This plan outlines the refactoring of the **Converter Category** in `apps/hilmost_toolbox_web` to maximize SEO visibility, crawlability, and performance.

## User Review Required

> [!IMPORTANT]
> - **AdSense Units**: We will be enforcing explicit `minHeight` on all ad containers. I will use `280px` for standard mid-content rectangles and `90px` for top/bottom banners unless otherwise specified.
> - **Prerendering**: We are leveraging Next.js SSG (Static Site Generation) via `generateStaticParams`. This ensures crawlers see full semantic HTML.

## Proposed Changes

### [Packages: UI & Config]

Enhance shared components to support deeper semantic enrichment.

#### [SchemaMarkup.tsx](file:///M:/techprojects/UtilitiesSite/packages/ui/src/SchemaMarkup.tsx)
- Ensure `WebApplicationSchema` and `FAQSchema` are correctly typed for automated injection.

---

### [App: Toolbox Web — Converters]

Refactor `weight-mass` as the "Gold Standard" template for all other categories.

#### [WeightMassPageUI.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/weight-mass/WeightMassPageUI.tsx)
- Update to accept dynamic FAQs and Tutorial content.
- Implement explicit ad container sizing.

#### [[slug]/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/weight-mass/[slug]/page.tsx)
- Implement logic to generate tool-specific descriptions and FAQs.
- **Dynamic FAQ Generation**:
    - Example: "How many grams are in a kilogram?" vs "How many pounds are in a stone?".
- **Semantic HTML Injection**:
    - Ensure `ToolArticle` contains unique keywords for both units (e.g., "metric system", "imperial units").

---

### [Infrastructure: Deployment]

#### [firebase.json](file:///M:/techprojects/UtilitiesSite/firebase.json)
- Verify hosting headers for caching optimized static assets.

## Verification Plan

### Automated Tests
- `npm run build` in `apps/hilmost_toolbox_web` to verify SSG for all 200+ slugs.
- `npm run lint` to ensure TypeScript compliance.

### Manual Verification
- **SEO Audit**: Use `curl` to fetch a specific slug (e.g., `kilograms-to-pounds`) and verify that the `<title>`, `<meta description>`, and `JSON-LD` are present in the raw HTML response.
- **Core Web Vitals**: Local Lighthouse check to verify 0 CLS for ad containers.
- **Responsive Check**: Inspect 320px (Mobile) and 1920px (Desktop) layouts.
