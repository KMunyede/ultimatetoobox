# SEO Optimization: Finance Category Metadata Cleanup

Following the success of the Text-Data cleanup, I will now shorten the titles for all **Finance** tools to resolve the "Title too long" errors flagged by Bing.

## Strategy: 60-Character Precision

I will apply the following high-density titles across the Finance tools:

| Tool | Old Title | New Title |
|---|---|---|
| **WACC** | `WACC Calculator (Professional+) — Cost of Capital & CAPM Dashboard | Hilmost Toolbox` | `WACC Calculator | Cost of Capital & CAPM | Hilmost` |
| **EPS** | `Earnings Per Share (EPS) Calculator — Basic & Diluted EPS Analysis | Hilmost Toolbox` | `EPS Calculator | Basic & Diluted Profit Analysis | Hilmost` |
| **Loan** | `Loan Calculator — Monthly Payments & Amortization Schedule | Hilmost Toolbox` | `Loan Calculator | Monthly Payments & Amortization | Hilmost` |
| **Income Tax** | `Income Tax — Free Online Income Tax Tool | Hilmost Toolbox` | `Income Tax Calculator | Take-Home Pay Estimator | Hilmost` |
| **Compound Int.** | `Compound Interest — Free Online Investment Tool | Hilmost Toolbox` | `Compound Interest Calculator | Investment Growth | Hilmost` |
| **VAT & Tax** | `VAT & Tax Calculator — Free Online Tax Tool | Hilmost Toolbox` | `VAT & Tax Calculator | Simple Sales Tax Tool | Hilmost` |
| **Salary Conv.** | `Salary Converter — Free Online Wage Tool | Hilmost Toolbox` | `Salary Converter | Hourly to Annual Wage Tool | Hilmost` |
| **Tip Calc.** | `Tip Calculator — Free Online Gratuity Tool | Hilmost Toolbox` | `Tip Calculator | Easy Bill Split & Gratuity | Hilmost` |
| **Retirement** | `Retirement Planner — Free Online Savings Tool | Hilmost Toolbox` | `Retirement Planner | Savings & Future Growth | Hilmost` |
| **Inflation** | `Inflation Calculator — Free Online Value Tool | Hilmost Toolbox` | `Inflation Calculator | Purchasing Power Tracker | Hilmost` |
| **Budget** | `Budget Planner — Free Online Budgeting Tool | Hilmost Toolbox` | `Budget Planner | Monthly Expense & Income Tracker | Hilmost` |

## Addressing the "Discovered but not crawled" Error
The error you saw for WACC (*"Discovered but not crawled"*) is often caused by search engines prioritizing pages with high-quality, unique metadata. By shortening these titles, we make the pages more "inviting" to the Bing crawler.

---

## Verification Plan
1. Update all 11 `page.tsx` files in the Finance folder.
2. Run `npm run build` to verify.
3. Suggest a manual re-index request in Bing Webmaster Tools.
