# Google AdSense & Quality Compliance Plan

This plan addresses the non-compliance issues reported by Google, focusing on high-value content and safe ad placement.

## 1. Eliminate "Thin Content" (Guidelines #1 & #3)
Tool-only pages are often flagged as thin content because they lack sufficient text for indexers.

### Actions:
- **Expanded Tool Articles**: Every tool page will be mandated to have a minimum of 300 words. We will update the `ToolArticle` component to support structured sections:
    - **Introduction**: Problem-solution context.
    - **Methodology/Formula**: Technical breakdown of the calculation.
    - **Step-by-Step Guide**: How to use the interface.
    - **Real-World Examples**: Concrete scenarios.
- **Dynamic FAQ Enrichment**: Increase the number of FAQs per tool from 3 to 5+, focusing on human-centric questions (long-tail keywords).
- **Interlinking**: Ensure the `RelatedTools` and `KnowledgeCard` components are used aggressively to reduce bounce rates.

## 2. Prevent "Scraped Content" Flags (Guideline #2)
Google penalizes sites that provide no unique value over existing tools.

### Actions:
- **Unique Visualizations**: Continue adding interactive charts (like the Portfolio Growth chart in Compound Interest) and unique UX features (like the '2nd' toggle in Scientific Calc) that aren't available on generic sites.
- **Authority & E-E-A-T**:
    - Implement a `SourceReference` component to cite academic or financial sources.
    - Add "Expert Tips" specific to each category (e.g., "Tax-saving tips" for VAT).

## 3. Ad Placement Compliance (Guideline #4)
Prevent accidental clicks and ensure clear distinction between content and ads.

### Actions:
- **Explicit Labels**: Move the "Advertisement" label from *behind* the ad to *above* the ad container.
- **Standardized Spacing**:
    - Enforce a minimum 32px vertical margin between ad units and any interactive elements (buttons/inputs).
    - Increase mobile top ad margin to prevent accidental clicks during navigation.
- **Ad Resilience**: Add `px` hardcoded boundaries to avoid any layout shifts during loading.

## 4. Implementation Phases
- **Phase 1**: Update `packages/ui` (`AdLayout`, `AdUnit`, `ToolHeader`) for placement compliance.
- **Phase 2**: Massive content injection for the "Top 10" most visited tools.
- **Phase 3**: Audit programmatic unit-to-unit pages to ensure they aren't just empty templates.
