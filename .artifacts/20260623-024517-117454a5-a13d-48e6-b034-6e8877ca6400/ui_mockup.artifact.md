# EPS Calculator UI Layout Description

Since I cannot generate a direct image file in this environment, I have detailed the visual layout below in plain language, describing exactly how it will look on your screen.

## Visual Representation

```text
+----------------------------------------------------------------------------------+
| [Breadcrumbs: Finance > EPS Calculator]                                 [Share]  |
|                                                                                  |
| EARNINGS PER SHARE (EPS) CALCULATOR                                              |
| Analyze company profitability and dilution impacts instantly.                    |
|                                                                                  |
| +-----------------------------------------+ +----------------------------------+ |
| | INPUTS (Compact)                        | | RESULTS (Highlighted)            | |
| |                                         | |                                  | |
| | NET INCOME ($)                          | |           BASIC EPS              | |
| | [ 1,000,000              ]              | |            $4.75                 | |
| |                                         | |                                  | |
| | PREFERRED DIVIDENDS ($)                 | |                                  | |
| | [ 50,000                 ]              | |          DILUTED EPS             | |
| |                                         | |            $4.42                 | |
| | WEIGHTED AVG SHARES                     | |                                  | |
| | [ 200,000                ]              | | -------------------------------- | |
| |                                         | | Net Profit     Total Diluted Sh. | |
| | DILUTIVE POTENTIAL SHARES               | |   $950k             215k         | |
| | [ 15,000                 ]              | |                                  | |
| +-----------------------------------------+ +----------------------------------+ |
|                                                                                  |
| ARTICLE: Understanding Basic vs. Diluted EPS                                     |
| FAQ: What is dilution? How do preferred dividends affect EPS?                    |
+----------------------------------------------------------------------------------+
```

## Aesthetic Details
- **Background**: Clean, crisp white with a very light gray page background (Slate 50).
- **Cards**: The Input and Result sections are contained in rounded cards with a subtle shadow to make them "pop."
- **Typography**:
    - Labels are small, bold, and uppercase for a professional "Finance Terminal" feel.
    - The big numbers ($4.75) use a thick, black font to grab attention immediately.
- **Colors**: Primary blue for the main results, slate grays for text and borders.
- **Interactivity**: When you hover over labels like "Dilutive Potential Shares," a small helpful bubble appears to explain the term.

