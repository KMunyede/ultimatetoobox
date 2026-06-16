# Wisdom Tool Refinement Plan

Refine the Daily Wisdom tool to improve quote display, text wrapping, and navigation.

## Proposed Changes

### UI Package

#### [QuoteCard.tsx](file:///M:/techprojects/UtilitiesSite/packages/ui/src/QuoteCard.tsx)
- Remove `max-h-64 overflow-y-auto` from the quote text to allow the card to expand naturally with long quotes.
- Ensure `break-words` and `whitespace-pre-wrap` are effectively wrapping long strings.
- Adjust padding and font sizes for better responsiveness.

---

### Wisdom Tool (App)

#### [DailyQuoteClient.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/health/daily-wisdom/DailyQuoteClient.tsx)
- Refine the positioning of the `<` and `>` arrows to ensure they are clearly detached from the `QuoteCard`.
- Ensure the horizontal scroll experience is smooth on all devices.
- Improve the mobile layout for arrows to match the "detached" requirement.

#### [useRandomQuotes.ts](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/hooks/wisdom/useRandomQuotes.ts)
- (Optional) Verify if the user wants real Firestore integration. For now, stick with the robust `fallbackQuotes` "database" but ensure it picks a fresh set if needed.

## Verification Plan

### Manual Verification
- Run `npm run dev` in `apps/hilmost_toolbox_web`.
- Navigate to `/health/daily-wisdom`.
- Verify 5 random quotes are displayed.
- Test horizontal scrolling using both touch/swipe and the `<` / `>` buttons.
- Test with very long quotes (I'll add a temporary long quote to `fallbackQuotes` for testing) to ensure they wrap and expand the card.
- Verify arrows are clearly separate from the card on desktop and mobile.
