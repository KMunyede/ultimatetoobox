# SEO Consistency and Schema Completion (Converters)

This plan focuses on completing the SEO enhancements for the `hilmost_toolbox_web` app, specifically ensuring all tool pages have consistent schema markup and "last updated" signals as outlined in the original [implementation_plan.md](file:///M:/techprojects/UtilitiesSite/implementation_plan.md).

## User Review Required

> [!IMPORTANT]
> **Schema Unification:** I will be adding `BreadcrumbSchema` to several pages that currently only have visual `Breadcrumbs`. This is critical for search engines to understand the site hierarchy.
>
> **"Last Updated" verification:** I have verified that `getFileLastUpdated` is working via `git log` and will ensure it's consistently passed to `ToolHeader` across all converter pages.

## Proposed Changes

### [Apps/Toolbox Web] (hilmost_toolbox_web)

I will update the following pages to add missing `BreadcrumbSchema` and fix minor syntax issues (double semicolons).

#### [MODIFY] [converters/age-calculator/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/age-calculator/page.tsx)
- Add `<BreadcrumbSchema items={breadcrumbItems} />`.
- Remove double semicolon in import.

#### [MODIFY] [converters/percentage/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/percentage/page.tsx)
- Add `<BreadcrumbSchema items={breadcrumbItems} />`.
- Remove double semicolon in import.

#### [MODIFY] [converters/unix-time/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/unix-time/page.tsx)
- Add `<BreadcrumbSchema items={breadcrumbItems} />`.
- Remove double semicolon in import.

#### [MODIFY] [converters/time-zone/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/time-zone/page.tsx)
- Add `<BreadcrumbSchema items={breadcrumbItems} />`.
- Remove double semicolon in import.

#### [MODIFY] [converters/temperature/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/temperature/page.tsx)
- Add `<BreadcrumbSchema items={breadcrumbItems} />` (Verify in `TemperaturePageUI`).

---

### [Verification of Other Converters]

I will perform a final check on `area`, `length`, `time`, `weight-mass`, and `aspect-ratio` to ensure they are 100% compliant with the schema requirements.

## Verification Plan

### Automated Tests
- Run `npm run build` in `apps/hilmost_toolbox_web` to verify static generation and schema injection.
- Check for any linting errors.

### Manual Verification
- Inspect the generated HTML for `<script type="application/ld+json">` containing `BreadcrumbList`.
- Verify the "Last updated" date is correctly rendered in the `ToolHeader`.
