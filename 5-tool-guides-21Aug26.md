# 5 Tool Guides — Drafted 21 Aug 2026
Status: DRAFT ONLY — do not deploy/submit until GSC recheck (22–23 Aug) confirms indexing pipeline fix held.

---

## 1. Compound Interest Calculator — How Compounding Actually Works
**Category:** Financial
**Target route:** /guides/compound-interest-explained

Compound interest is simple in concept and easy to underestimate in practice: interest earns interest. A deposit that grows at the same rate every year doesn't grow by the same amount every year — it grows by more, because each year's interest is calculated on a bigger base than the year before.

**The formula behind the tool:**
A = P(1 + r/n)^(nt) — where P is your starting principal, r is annual interest rate, n is how many times per year interest compounds, and t is time in years.

**Why compounding frequency matters:**
Two accounts at the same 5% annual rate won't grow identically if one compounds monthly and the other compounds annually. More frequent compounding means interest starts earning interest sooner. Over short timeframes the difference is small. Over 20-30 years, it's not.

**What the calculator shows you:**
- Final balance at your chosen time horizon
- Total interest earned vs. total contributed
- Year-by-year growth (so you can see the compounding curve, not just the endpoint)

**Common mistake:** treating a 12% "annual" return the same whether compounded annually or monthly. Monthly compounding at 12% APR yields more than a flat 12% once a year — always check what "APR" vs. "APY" actually means for the account you're comparing.

**When this matters most:** retirement savings, long-term investment comparisons, understanding why starting early beats starting with more money later.

---

## 2. Loan & Mortgage Payment Calculator — Reading Your Amortization Schedule
**Category:** Financial
**Target route:** /guides/loan-amortization-explained

Every loan payment is split two ways: part pays down the principal (what you borrowed), part pays interest (the cost of borrowing). Early in a loan, most of your payment goes to interest. Late in a loan, most goes to principal. This guide explains why — and how to read the schedule the calculator generates.

**The core formula:**
M = P [r(1+r)^n] / [(1+r)^n − 1] — where M is monthly payment, P is loan principal, r is monthly interest rate, n is number of payments.

**Why the interest/principal split shifts over time:**
Interest is charged on the remaining balance. Early on, the balance is high, so interest takes a bigger bite. As the balance shrinks, less of each payment goes to interest and more goes to principal — even though your total payment stays the same.

**What to look for in your schedule:**
- The month where principal finally overtakes interest as the larger portion of your payment
- Total interest paid over the full loan term vs. the amount borrowed
- The effect of one extra payment per year on total interest (often larger than people expect)

**Common mistake:** assuming a lower monthly payment always means a cheaper loan. A longer term lowers the payment but usually increases total interest paid — the calculator's "total interest paid" figure is the number that actually matters for cost comparison.

---

## 3. Data Storage Unit Converter — Why 1KB Isn't Always 1,000 Bytes
**Category:** Converters
**Target route:** /guides/data-storage-units-explained

This is one of the most persistently confusing unit conversions in computing, because two different standards have coexisted for decades.

**The two systems:**
- **Decimal (SI):** 1 KB = 1,000 bytes, 1 MB = 1,000,000 bytes — used by storage manufacturers (hard drives, SSDs) and network speeds
- **Binary (IEC):** 1 KiB = 1,024 bytes, 1 MiB = 1,048,576 bytes — used by operating systems reporting file sizes and RAM

**Why this matters practically:** it's the reason a "1TB" hard drive shows up as roughly 931GB in Windows File Explorer. The drive manufacturer used decimal (1TB = 1,000,000,000,000 bytes); Windows reports in binary (dividing by 1,024 repeatedly). Nothing is missing — it's two different definitions of the same word.

**What the converter handles:**
- Bit ↔ Byte conversions (remember: 8 bits = 1 byte, always, no ambiguity there)
- KB/MB/GB/TB in both decimal and binary modes
- Network speed conversions (Mbps vs MB/s — a very common mix-up, since network speeds are measured in bits, file sizes in bytes)

**Common mistake:** confusing Mbps (megabits per second, used for internet speed) with MB/s (megabytes per second, used for file transfer/download size). Divide Mbps by 8 to estimate real-world MB/s — an "100 Mbps" connection tops out around 12.5 MB/s, not 100 MB/s.

---

## 4. Cooking & Recipe Measurement Converter — Volume vs. Weight
**Category:** Converters
**Target route:** /guides/cooking-measurement-conversion

Recipe conversion trips people up for a reason that has nothing to do with math: volume and weight aren't interchangeable unless you know the ingredient's density.

**Why "1 cup of flour" isn't a fixed weight:**
A cup measures volume. Flour, sugar, and butter all pack differently — a cup of sifted flour weighs less than a cup of scooped-and-packed flour. This is why baking recipes that specify grams are more reliable than ones that specify cups: weight doesn't change based on how tightly the ingredient is packed.

**What the tool converts:**
- Standard volume units (tsp, tbsp, cup, mL, L, fl oz)
- Weight units (g, kg, oz, lb)
- Ingredient-specific density presets (flour, sugar, butter, water) so a "cup to grams" conversion is actually accurate per-ingredient, not a generic guess

**Common mistake:** using a single "cup to grams" conversion factor for every ingredient. 1 cup of water is ~240g. 1 cup of all-purpose flour is closer to 120-125g. Same volume, roughly half the weight — this is exactly why ingredient-specific conversion matters for baking precision.

**When this matters most:** scaling recipes up/down, converting between US and metric recipes, baking specifically (where precision affects texture more than in general cooking).

---

## 5. Percentage Calculator — The Three Percentage Problems People Actually Have
**Category:** Calculators
**Target route:** /guides/percentage-calculations-explained

"Percentage" sounds like one calculation. It's actually three different questions people confuse with each other, which is why percentage math feels harder than it should.

**Problem 1 — What is X% of Y?**
Straightforward: multiply. 20% of 150 = 0.20 × 150 = 30.

**Problem 2 — X is what percent of Y?**
This is a ratio question, not a multiplication question: (X ÷ Y) × 100. If 30 out of 150 people did something, that's (30 ÷ 150) × 100 = 20%.

**Problem 3 — Percentage change (increase/decrease)**
This is the one that causes the most real-world errors: ((New − Old) ÷ Old) × 100. A price that goes from $50 to $65 increased by ((65−50)÷50)×100 = 30%. Going back down from $65 to $50 is NOT a 30% decrease — it's ((50−65)÷65)×100 ≈ -23%. Percentage increases and decreases are not symmetric, because the base number changes.

**What the calculator handles:** all three problems as separate clearly-labeled modes, rather than one generic "percentage" box — this is the single biggest usability complaint about generic percentage calculators, and the reason this tool separates them explicitly.

**Common mistake:** assuming a 50% decrease can be undone by a 50% increase. It can't — you need a 100% increase to undo a 50% decrease, because the decrease shrinks the base you're calculating the increase from.
