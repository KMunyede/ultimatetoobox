# [Global UI] Thousand Separator Formatting for Calculators

Improve readability of large numerical values by implementing thousand separators (commas) for both inputs and results across all calculators.

## Proposed Changes

### [packages/ui] Shared Components

#### [NEW] [packages/ui/src/NumericInput.tsx](file:///M:/techprojects/UtilitiesSite/packages/ui/src/NumericInput.tsx)
- [NEW] Component to handle formatted numeric inputs (with commas).
- Converts between display string (e.g., "1,000,000") and state string (e.g., "1000000").

#### [packages/ui/src/index.ts](file:///M:/techprojects/UtilitiesSite/packages/ui/src/index.ts)
- Export the new `NumericInput` component.

---

### [hilmost_toolbox_web] Finance Category Updates

Replace `<input type="number">` with `NumericInput` and ensure results use `toLocaleString()` or `NumberTicker`.

- **EPS Calculator**
- **Loan Calculator**
- **Income Tax**
- **Compound Interest**
- **VAT & Tax**
- **Salary Converter**
- **Tip Calculator**
- **Retirement Planner**
- **Inflation Calculator**
- **Budget Planner**
- **WACC Calculator**
- **Currency Converter**

---

### [hilmost_toolbox_web] Calculators Category Updates

- **Standard & Scientific Calculators**: Update `CalculatorDisplay.tsx` to format results with commas.
- **Astrophysics Calculator**: Update inputs/results.
- **Equation Solver**: Update inputs/results.

---

## Verification Plan

### Automated Tests
- `npm run build` & `npm run lint`

### Manual Verification
- Verify that entering `1000000` in inputs displays as `1,000,000`.
- Verify that results display with commas (e.g., `$1,560.50`).
- Ensure no regressions in calculation logic.
