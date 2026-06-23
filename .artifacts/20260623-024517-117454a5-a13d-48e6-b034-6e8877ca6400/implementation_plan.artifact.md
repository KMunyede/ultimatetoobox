# [Corporate Finance] Earnings Per Share (EPS) Calculator Implementation

Scaffold and implement an Earnings Per Share (EPS) Calculator in the `hilmost_toolbox_web` app, including Basic and Diluted calculations, following the "Enterprise-Calm" design language and AdSense-ready architecture.

## Proposed Changes

### [hilmost_toolbox_web] Finance Tools

#### [apps/hilmost_toolbox_web/src/app/finance/earnings-per-share-calculator/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/finance/earnings-per-share-calculator/page.tsx)
- [NEW] Server component for SEO, Metadata, Breadcrumb Schema, and the detailed article content.

#### [apps/hilmost_toolbox_web/src/app/finance/earnings-per-share-calculator/EPSCalculatorClient.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/finance/earnings-per-share-calculator/EPSCalculatorClient.tsx)
- [NEW] Client component for interactive calculation logic, handling Basic and Diluted EPS inputs and outputs.
- Uses `useUrlState` for state management.
- Integrates `NumberTicker`, `Tooltip`, and `ToolTutorial`.

#### [apps/hilmost_toolbox_web/src/app/finance/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/finance/page.tsx)
- Update the finance tools index to include the new EPS Calculator.

---

### [packages/config] Knowledge Base

#### [packages/config/src/knowledge-base.ts](file:///M:/techprojects/UtilitiesSite/packages/config/src/knowledge-base.ts)
- Add a new `KBArticle` for "Earnings Per Share (EPS)" explaining Basic and Diluted concepts.

---

## Verification Plan

### Automated Tests
- Run `npm run build` in `apps/hilmost_toolbox_web` to ensure no type errors or build breakages.
- Run `npm run lint` to verify code quality.

### Manual Verification
- Verify the calculation logic manually:
    - Basic EPS = (Net Income - Preferred Dividends) / Weighted Average Shares Outstanding.
    - Diluted EPS = (Net Income - Preferred Dividends) / (Weighted Average Shares Outstanding + Dilutive Potential Common Shares).
- Inspect the generated JSON-LD schema in the page source.

