# SEO Audit and Fix Implementation Plan

Perform a comprehensive SEO audit and fix across the `hilmost_toolbox_web` codebase to improve crawlability, visibility, and search engine ranking.

## User Review Required

- **"Last Updated" Date:** I will implement a dynamic solution using `git log` during the build process to extract the actual last-modified date for each tool page. This ensures "freshness" signals are accurate without manual updates.
- **JSON-LD Injection:** I will use `<script type="application/ld+json">` within Server Components. This is the industry-standard for Next.js App Router and is fully optimized for SEO visibility and searchability.
- **Breadcrumb Consolidation:** `AutoBreadcrumbs` is currently a client component in the root layout. I will optimize it to ensure JSON-LD is present in the initial static HTML response.

## Proposed Changes

### [Packages/UI] (@utilitiessite/ui)

Enhance schema markup and fix footer links.

#### [SchemaMarkup.tsx](file:///M:/techprojects/UtilitiesSite/packages/ui/src/SchemaMarkup.tsx)
- Update `WebApplicationSchema` to match exact requirements:
    - `applicationCategory`: "UtilityApplication"
    - `operatingSystem`: "All"
    - `offers.price`: "0"
- Add `BreadcrumbSchema` component (Already exists, will be used by server components).

#### [Footer.tsx](file:///M:/techprojects/UtilitiesSite/packages/ui/src/Footer.tsx)
- Replace `href="#"` with plain text or `rel="nofollow"` for Engineering, Foods, and Insurance links to prevent crawler traps.

#### [AutoBreadcrumbs.tsx](file:///M:/techprojects/UtilitiesSite/packages/ui/src/AutoBreadcrumbs.tsx)
- Optimize for SEO: Ensure `BreadcrumbSchema` is rendered in a way that is visible to search engine bots in the initial HTML.

---

### [Packages/Config] (@utilitiessite/config)

Centralized utilities for build-time metadata.

#### [build-utils.ts](file:///M:/techprojects/UtilitiesSite/packages/config/src/build-utils.ts)
- Implement `getFileLastUpdated(filePath: string)` using `git log`.
- Implement `getCanonicalUrl(path: string)` helper.

---

### [Apps/Toolbox Web] (hilmost_toolbox_web)

Fix metadata, category content, and cross-linking, starting with the **Converters** category.

#### [converters/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/page.tsx)
- Replace static `metadata` with `generateMetadata()`.
- Add tool card descriptions (2 sentences each) to eliminate "thin content" flags.

#### [converters/*/page.tsx] (e.g., length, weight-mass, etc.)
- Replace static `metadata` with `generateMetadata()` for top-level tools.
- Add "Last updated" line using `getFileLastUpdated()` from `@utilitiessite/config`.
- Ensure canonical URLs are correctly set in `generateMetadata`.

#### [converters/*/[slug]/page.tsx] (Programmatic SEO)
- Enhance `generateMetadata` to include canonical URLs.
- Pass "Last updated" data to the UI components.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure static export still works and metadata is generated.
- Run `npm run lint` to check for any accessibility or syntax issues.

### Manual Verification
- Check generated HTML for correct meta tags (title, og:url, description).
- Validate JSON-LD in Google's Rich Results Test (simulated).
- Verify footer links and category page descriptions.
- Confirm "Last updated" date appears on tool pages.
