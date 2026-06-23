# [Corporate Finance] WACC Calculator (Professional+)

Scaffold and implement a high-authority **Weighted Average Cost of Capital (WACC)** Calculator. Since the user is new to WACC, we will prioritize simplicity, step-by-step guidance, and clear explanations of all financial terms.

## Phase 1: Engine & Logic (The "Brain")
- **WACC Formula**: `(E/V * Re) + (D/V * Rd * (1-T))`
- **Integrated CAPM Engine**: Automatically calculates Cost of Equity (Re) based on Beta and Risk-Free rates.
- **Tax Shield Savings**: Calculates the yearly dollar amount saved on taxes due to debt interest.

## Phase 2: Simplified UI & Guidance (The "User Experience")
- **Step-by-Step Layout**: Divided into 3 logical zones: Equity (Blue), Debt (Red), and Results Dashboard.
- **Explanatory Tooltips**: Every input label will have a tooltip explaining *what* to enter and *where* to find that number (e.g., "Find this on your Balance Sheet").
- **Smart Insights**: Real-time text analysis explaining the result (e.g., "Your debt is relatively low, which lowers your risk but increases your total WACC").

## Phase 3: Authority Content & SEO (The "Knowledge")
- **How-to-Use Guide**: A simplistic 3-step guide embedded directly on the page.
- **Knowledge Base**: Detailed article: "The Beginner's Guide to WACC: Understanding your Business's Hurdle Rate."

---

## Proposed Changes

### [hilmost_toolbox_web] Finance Tools

#### [NEW] [apps/hilmost_toolbox_web/src/app/finance/wacc-calculator/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/finance/wacc-calculator/page.tsx)
- Server component for SEO and the "Beginner's Guide" article.

#### [NEW] [apps/hilmost_toolbox_web/src/app/finance/wacc-calculator/WACCCalculatorClient.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/finance/wacc-calculator/WACCCalculatorClient.tsx)
- Client component with 3-zone layout and simplistic help prompts.

#### [apps/hilmost_toolbox_web/src/app/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/page.tsx)
- Add WACC to the homepage Finance category.

#### [apps/hilmost_toolbox_web/src/app/finance/page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/finance/page.tsx)
- Add WACC to the Finance collection.

---

### [packages/config] Knowledge Base

#### [packages/config/src/knowledge-base.ts](file:///M:/techprojects/UtilitiesSite/packages/config/src/knowledge-base.ts)
- Add "The Beginner's Guide to WACC" article.

---

## Verification Plan

### Automated Tests
- `npm run build` & `npm run lint`

### Manual Verification
- **Scenario Test**: $500k Equity, $250k Debt, 1.2 Beta, 4.2% Risk-Free, 5.5% Premium, 6% Interest, 25% Tax.
- **Expected Result**: Cost of Equity = 10.8%, Cost of Debt = 4.5%, WACC = 8.70%.
