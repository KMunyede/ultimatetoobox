# SEO Optimization: Calculators Category Metadata Cleanup

Extending the "High-Density" metadata strategy to the **Calculators** category to resolve "Title too long" errors and improve Bing/Google indexing.

## Strategy: 60-Character Precision

I will apply the following optimized titles across the Calculators category:

| Tool | Old Title (Estimate) | New Title |
|---|---|---|
| **Standard** | `Standard Calculator — Quick & Simple Math | Hilmost Toolbox` | `Standard Calculator | Quick & Simple Math | Hilmost` |
| **Scientific** | `Scientific Calculator — Advanced Math for Engineering | Hilmost Toolbox` | `Scientific Calculator | Advanced Math & Physics | Hilmost` |
| **Astrophysics** | `Astrophysics Calculator — Space & Universe Physics | Hilmost Toolbox` | `Astrophysics Calculator | Space & Physics Tools | Hilmost` |
| **Equation Solver**| `Science Equation Solver — Physics & Chemistry Formulas | Hilmost Toolbox` | `Equation Solver | Physics & Science Formulas | Hilmost` |

### Handling Dynamic Routes (`[slug]`)
For tools like Astrophysics and Equation Solver that have sub-pages (e.g., `/calculators/astrophysics/orbital-velocity`), I will ensure the dynamic title generation also adheres to the short format:
- **Example**: `Orbital Velocity | Astrophysics | Hilmost`

---

## Verification Plan
1. Update all `page.tsx` files in the `calculators` folder.
2. Run `npm run build` to verify.
3. Push to Staging and Production.
