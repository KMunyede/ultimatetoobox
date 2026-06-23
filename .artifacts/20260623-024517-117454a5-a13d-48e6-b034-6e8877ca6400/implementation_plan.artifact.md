# [UI Refinement] Astrophysics Calculator Dashboard Improvements

Enhance the layout and readability of the Astrophysics Calculator based on user feedback regarding component width, result box height, and button spacing.

## Proposed Changes

### [hilmost_toolbox_web] Astrophysics Tool

#### [apps/hilmost_toolbox_web/src/app/calculators/astrophysics/AstrophysicsCalculatorClient.tsx](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app/calculators/astrophysics/AstrophysicsCalculatorClient.tsx)

- **Layout (75% Input Width)**:
    - Change the main grid from `lg:grid-cols-2` to `lg:grid-cols-4`.
    - Assign `lg:col-span-1` to the "Calculation Type" controls (25% width).
    - Assign `lg:col-span-3` to the "Dynamic Inputs" (masses, distance, etc.) to occupy 75% of the width.
- **Dropdown (Text Wrap/Truncate)**:
    - Add `max-w-full` and ensure the text size is optimized to prevent horizontal overflow.
- **Result Box (Height Reduction)**:
    - Reduce vertical padding of the result card by 50% (from `p-8 md:p-10` to `p-4 md:p-5`).
    - Adjust internal margins for a tighter vertical profile.
- **Action Buttons (Spacing)**:
    - Change the button container from `flex flex-wrap` to `grid grid-cols-1 sm:grid-cols-2 gap-4`.
    - This ensures each button has ample space and prevents text cutoff.

---

## Verification Plan

### Automated Tests
- `npm run build` to ensure no UI-breaking changes.

### Manual Verification
- Verify the 25/75 split on desktop screens.
- Verify the result box height is significantly reduced.
- Check that "Copy For Paper" and "Copy as Python" text is fully visible on all screen sizes.
