# SEO and UI Fixes for Hilmost Toolbox

Fix multiple SEO metadata issues, broken OpenGraph tags, and UI inconsistencies across the Toolbox web application in a single pass.

## User Review Required

- **Navbar Links**: I am moving the "Guides" link inside the main `nav` element in `NavigationMenu.tsx` to ensure it's always grouped with other navigation items and consistently visible.
- **Metadata Overrides**: I am ensuring all tool pages provide a complete `openGraph` object in `generateMetadata` to prevent Next.js from partially merging with layout defaults which can cause broken URLs or titles.

## Proposed Changes

### Global Layout & Homepage

#### [layout.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/layout.tsx)
- Update `title.default` and `openGraph.title` to `"Hilmost Toolbox | Free Online Calculators"`.
- Keep `title.template` as `"%s | Hilmost Toolbox"`.

#### [page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/page.tsx)
- Remove `title` from `metadata` to allow the default title from `layout.tsx` to take effect without double-appending the suffix.
- Set `openGraph.title` to `"Hilmost Toolbox | Free Online Calculators"`.

---

### Category Hub Pages

Update `generateMetadata` in the following files to use the target titles (without suffix, as template appends it), full absolute OG URLs, and specific descriptions.

#### [finance/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/finance/page.tsx)
- Title: `"Financial Calculators"` (Template appends suffix)
- OG Title: `"Financial Calculators | Hilmost Toolbox"`
- OG URL: `"https://hilmost-toolbox.hilmost.net/finance"`

#### [calculators/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/calculators/page.tsx)
- Title: `"Math & Science Calculators"`
- OG Title: `"Math & Science Calculators | Hilmost Toolbox"`
- OG URL: `"https://hilmost-toolbox.hilmost.net/calculators"`

#### [converters/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/page.tsx)
- Title: `"Unit Converters"`
- OG Title: `"Unit Converters | Hilmost Toolbox"`
- OG URL: `"https://hilmost-toolbox.hilmost.net/converters"`

#### [text-data/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/text-data/page.tsx)
- Title: `"Text & Data Tools"`
- OG Title: `"Text & Data Tools | Hilmost Toolbox"`
- OG URL: `"https://hilmost-toolbox.hilmost.net/text-data"`

#### [health/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/health/page.tsx)
- Title: `"Health & Wellness Tools"`
- OG Title: `"Health & Wellness Tools | Hilmost Toolbox"`
- OG URL: `"https://hilmost-toolbox.hilmost.net/health"`

#### [dx/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/dx/page.tsx)
- Title: `"Developer Experience Tools"`
- OG Title: `"Developer Experience Tools | Hilmost Toolbox"`
- OG URL: `"https://hilmost-toolbox.hilmost.net/dx"`

#### [pdf-tools/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/pdf-tools/page.tsx)
- Title: `"PDF Tools"`
- OG Title: `"PDF Tools | Hilmost Toolbox"`
- OG URL: `"https://hilmost-toolbox.hilmost.net/pdf-tools"`

---

### Guides Index

#### [guides/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/guides/page.tsx)
- Title: `"Utility Guides"` (43 chars with template)
- OG Title: `"Utility Guides | Hilmost Toolbox"`
- OG URL: `"https://hilmost-toolbox.hilmost.net/guides"`
- OG Description: `"In-depth guides on finance, health, and unit conversion tools."`
- Alternates.canonical: `"https://hilmost-toolbox.hilmost.net/guides"`

---

### Tool Pages Metadata Overrides

#### [app/[category]/[tool]/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/finance/loan-calculator/page.tsx) (and others)
- Ensure `generateMetadata` returns a full `openGraph` object including:
    - `title`: `"{Tool Name} | {Category} | Hilmost"` (keep existing tool title pattern)
    - `description`: `TOOL_DESC`
    - `url`: Full canonical URL
- Add `twitter` object with same title and description.
- I will apply this to `loan-calculator`, `compound-interest`, and other key tool pages found during execution.

---

### Navigation & Footer

#### [NavigationMenu.tsx](file:///M:/techprojects/UtilitiesSite/packages/ui/src/NavigationMenu.tsx)
- Move "Guides" link inside the desktop `nav` container to ensure consistent layout.
- Use relative path `"/guides"` for the link as it's within the same subdomain.

#### [Footer.tsx](file:///M:/techprojects/UtilitiesSite/packages/ui/src/Footer.tsx)
- Confirm "Utility Guides" link is present in the "Platform" section (it is already there, I will just verify the path is correct).

---

### UI Cleanup (Date Removal)

#### [ToolHeader.tsx](file:///M:/techprojects/UtilitiesSite/packages/ui/src/ToolHeader.tsx)
- Remove unused `Calendar` import.
- Double-check for any hidden or commented-out code that might be rendering the date and ensure it is completely removed.

## Verification Plan

### Automated Tests
- Run `npm run build` in `apps/hilmost_toolbox_web` to ensure no metadata or type errors were introduced.
- Command: `cd apps/hilmost_toolbox_web && npm run build`

### Manual Verification
- **Metadata Check**: Use a script or manual inspection (View Source) to verify `<title>`, `<meta property="og:title">`, and `<meta property="og:url">` on:
    - Homepage (`/`)
    - Finance Hub (`/finance`)
    - Loan Calculator (`/finance/loan-calculator`)
    - Guides Index (`/guides`)
- **UI Check**:
    - Verify "Guides" link appears in Navbar on `/finance/loan-calculator`.
    - Verify no date appears beneath H1 on `/finance/loan-calculator`.
- **Social Debugger**: Test key URLs with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) if internet access allows, otherwise simulate OG tag verification.
