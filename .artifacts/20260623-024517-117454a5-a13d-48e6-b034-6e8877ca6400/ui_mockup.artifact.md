# WACC Calculator (Professional+) UI Layout

This tool uses a "Dashboard" approach, organizing complex financial inputs into logical zones to prevent user overwhelm.

## Visual Representation

```text
+----------------------------------------------------------------------------------+
| [Breadcrumbs: Finance > WACC Calculator]                                [Share]  |
|                                                                                  |
| WEIGHTED AVERAGE COST OF CAPITAL (WACC)                                          |
| Determine your company's hurdle rate and capital structure efficiency.           |
|                                                                                  |
| +-----------------------------------------+ +----------------------------------+ |
| | 1. EQUITY & CAPM (Blue Zone)            | |       WACC DASHBOARD             | |
| |                                         | |                                  | |
| | MARKET CAP ($)        BETA              | |          TOTAL WACC              | |
| | [ 500,000,000  ]      [ 1.2    ]        | |            8.42%                 | |
| |                                         | |        (Optimal Range)           | |
| | RISK-FREE RATE (%)    EQUITY RISK PREM  | |                                  | |
| | [ 4.2      ]          [ 5.5    ]        | |                                  | |
| |                                         | | COST OF EQUITY    COST OF DEBT   | |
| | 2. DEBT & TAXES (Red Zone)              | |     10.80%            4.50%      | |
| |                                         | |                                  | |
| | TOTAL DEBT ($)        INTEREST RATE (%) | | -------------------------------- | |
| | [ 250,000,000  ]      [ 6.0    ]        | |    TAX SHIELD SAVINGS (YEARLY)   | |
| |                                         | |            $3,750,000            | |
| | TAX RATE (%)                            | |                                  | |
| | [ 25.0     ]                            | |                                  | |
| +-----------------------------------------+ +----------------------------------+ |
|                                                                                  |
| [!] INSIGHT: Your capital structure is 67% Equity and 33% Debt.                  |
|                                                                                  |
| ARTICLE: How to use WACC to evaluate new business projects.                      |
+----------------------------------------------------------------------------------+
```

## Unique "Beneficial" Features:
1.  **CAPM Integration**: The "Cost of Equity" (10.80%) is calculated *for* the user based on their Beta and Risk-Free inputs.
2.  **Tax Shield Counter**: A dedicated result showing the dollar amount saved in taxes due to debt interest—this is a "Lightbulb" moment for many business owners.
3.  **Color Zoning**:
    - **Blue Section**: Equity/Shareholder focus.
    - **Red Section**: Debt/Lender focus.
    - **Green/Gold Results**: The final weighted average.
4.  **Smart Insights**: A small text area below the calculator that explains *why* the number is what it is (e.g., "Your high Beta is driving up your cost of equity").

---
**Does this 3-zone dashboard layout meet your expectations for a "professional+" tool?**

