# SEO Title Audit - Length Check (> 70 Characters)

I have audited the page titles across the monorepo to ensure compliance with Bing and IndexNow requirements. Here are the pages where the `<title>` tag (Metadata) exceeds 70 characters.

## Non-Compliant Titles Found

| Category | File Path | Current Title | Length | Proposed New Title |
| :--- | :--- | :--- | :---: | :--- |
| **Calculators** | [page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/calculators/page.tsx) | `${TITLE} — Free Standard, Scientific & Specialized Tools \| Hilmost Toolbox` | ~74 | `Calculators — Standard, Scientific & Specialized Tools \| Hilmost` |
| **Converters** | [page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/time/page.tsx) | `Time Converter — Convert Hours, Days, Weeks Instantly \| Hilmost Toolbox` | 71 | `Time Converter — Instant Unit Conversions \| Hilmost Toolbox` |
| **Converters** | [page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/converters/time-zone/page.tsx) | `Time Zone Converter & Global Clock — Compare Multiple Cities \| Hilmost Toolbox` | 78 | `Time Zone Converter & Global Clock \| Hilmost Toolbox` |
| **Knowledge Base** | [page.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/knowledge-base/page.tsx) | `Knowledge Base — Deep Insights into Utility Engineering \| Hilmost Digital Labs` | 78 | `Knowledge Base — Utility Engineering Insights \| Hilmost Labs` |

## Note on Dynamic Pages
Some pages like `apps/hilmost_toolbox_web/src/app/finance/salary-converter/[slug]/page.tsx` generate titles dynamically (e.g., `Hourly to Salary Converter`). These are currently compliant but were close to the limit. I have verified they stay under 70 characters for all expected inputs.

## Note on EPS Tool
The EPS tool title is:
`EPS Analysis Engine | Basic & Diluted Calculations | Hilmost` (56 characters)
It is **compliant**.

---

# Troubleshooting: EPS Tool Failure

I have investigated why the EPS tool changes might not be reflecting as expected.

## Findings:
1.  **Code exists**: The logic in `EPSCalculatorClient.tsx` is correct and mathematically sound.
2.  **Static Export**: The site uses Next.js static export (`next build`).
3.  **Potential Culprit: Browser Caching**: I noticed that your `firebase.json` has a very aggressive cache policy for HTML files in some targets:
    ```json
    "headers": [
      {
        "source": "**",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
        ]
      }
    ]
    ```
    While `max-age=0` should force a check, if Cloudflare (which sits in front) is configured differently, it might serve an old version.
4.  **EPS Input Initialization**: I see that the `NumericInput` value is initialized from `state.netIncome`. If the URL contains old parameters, it will load those instead of the defaults.

## Next Steps for EPS Tool:
- I will perform a "Hard Rebuild" and "Cache Busting" deployment once you approve the SEO title changes.
- I will verify the live URL with a cache-busting query parameter (e.g., `?v=1`).
