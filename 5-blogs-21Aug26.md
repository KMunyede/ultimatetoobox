# 5 Blog Posts — Drafted 21 Aug 2026
Status: DRAFT ONLY — do not deploy/submit until GSC recheck (22–23 Aug) confirms indexing pipeline fix held.

---

## 1. Why Compound Interest Feels Like a Trick (Tool Deep-Dive)
**Slug:** why-compound-interest-feels-like-a-trick

Compound interest is one of the few places in finance where the math is genuinely simple and the intuition is genuinely wrong. Most people, asked to guess how much $10,000 grows to at 7% over 30 years, guess low — often by half or more. Linear thinking is the default; compounding is exponential, and our instincts aren't built for exponential curves.

That's the actual reason the Compound Interest Calculator shows a year-by-year table instead of just a final number. A single answer ("$76,123") doesn't correct the intuition. Watching the curve bend upward — slow at first, then visibly steeper in the later years — does.

There's a second reason we built it this way: the same curve works in reverse as a warning. Credit card debt compounds too. The tool doesn't moralize about that, but showing the mechanism plainly does more work than a warning label would.

None of this needed to be complicated. It needed to stop hiding the shape of the curve behind a single output field.

---

## 2. Building Financial Tools Without Being a Financial Advisor (Founder's Notes)
**Slug:** building-financial-tools-without-being-an-advisor

There's a specific discomfort in building a loan calculator, a compound interest tool, or anything touching money: the gap between "this shows you the math" and "this tells you what to do." I'm not a financial advisor, and every tool on Hilmost that touches money says so explicitly, not as legal boilerplate but because it's true.

The line I try to hold is: show the mechanism, never the recommendation. A mortgage calculator can show you exactly how much of your payment goes to interest in year one versus year twenty — that's just arithmetic, and arithmetic doesn't need a disclaimer to be trusted. What it shouldn't do is tell you whether a 15-year or 30-year mortgage is "better" for you, because that depends on things a calculator can't know: your job stability, your risk tolerance, what else you'd do with the difference.

This is also, honestly, the easier position to build from as a solo founder. I don't have to get financial advice right. I have to get the math right, and let people draw their own conclusions from numbers they can verify themselves. That's a narrower promise, but it's one I can actually keep.

---

## 3. The Percentage Mistake Everyone Makes at Least Once (Tool Deep-Dive)
**Slug:** the-percentage-mistake-everyone-makes

Here's a question that trips up almost everyone the first time: a shirt goes up 20% in price, then goes on sale for 20% off. Is it back to the original price?

No. And the reason why is the entire idea behind why the Percentage Calculator treats "increase" and "decrease" as genuinely different operations, not mirror images of each other.

If a $100 shirt goes up 20%, it's $120. Take 20% off $120, and you get $96 — not $100. The second 20% is calculated on a bigger number than the first one was, so it removes more in absolute terms than the first increase added... except it doesn't, because percentages of different base numbers aren't comparable the way flat amounts are. This asymmetry is the single most common source of percentage-math errors we see reflected in how people use the tool — repeatedly checking "did I get this right?" on decrease-then-increase or increase-then-decrease sequences.

The fix wasn't a better explanation. It was separating "percentage of," "percentage change," and "what percent is X of Y" into three distinct, clearly labeled calculator modes, so the tool never lets you accidentally use the wrong formula for the question you're actually asking.

---

## 4. Why I Think in Probabilities, Not Certainties (Founder's Notes)
**Slug:** why-i-think-in-probabilities-not-certainties

I've spent a fair amount of time reading about the measurement problem in quantum mechanics — not as a physicist, just as someone who finds it genuinely unsettling in a productive way. The idea that a system exists in superposition until observed, that measurement itself changes the outcome rather than just revealing it, has quietly changed how I think about decisions that have nothing to do with physics.

Most of the decisions I make building Hilmost aren't certain until they're tested. A sitemap priority change might fix an indexing stall — or it might not, and the real cause is something else entirely. I don't know which until I measure it: deploy, wait, check the data. Before that measurement, both outcomes are live possibilities, and treating either one as certain in advance is just guessing dressed up as confidence.

What I've taken from this, loosely, is a discipline: hold multiple explanations open at once, resist collapsing to one story too early, and let the actual measurement — the GSC report, the build log, the user behavior — do the collapsing for you. It's a strange place to find a working philosophy, in a physics problem nobody's fully solved. But it's made me a more patient debugger, if nothing else.

---

## 5. Binary vs. Decimal: The Storage Math Nobody Explains Well (Tool Deep-Dive)
**Slug:** binary-vs-decimal-storage-math

Buy a "1TB" hard drive, plug it in, and Windows tells you it has about 931GB. Nothing is broken and nothing was stolen — you've just run into one of computing's oldest unresolved naming conflicts, and it's the entire reason the Data Storage Converter has a binary/decimal toggle instead of a single fixed answer.

Storage manufacturers use decimal: 1TB = 1,000,000,000,000 bytes, because it's a clean round number and matches how every other unit of measurement in the world works (a kilometer is 1,000 meters, not 1,024). Operating systems, on the other hand, historically report storage in binary, where 1KB = 1,024 bytes, because computers fundamentally count in powers of two.

Neither convention is wrong. They're just answering "how big is a kilobyte" differently, and almost no consumer-facing product tells you which one it's using. The result is millennia of "where did my storage go" support tickets that have nothing to do with lost data.

The fix isn't complicated — it's just making the two systems visible instead of picking one silently and hoping nobody asks. The converter shows both side by side specifically so the gap stops being mysterious.
