# Custom Wrapping Dropdown Plan

Standard browser dropdowns (`<select>`) cannot wrap text into multiple lines. To solve the issue where titles like "Luminosity (Stefan-Boltzmann)" are cut off, I will replace the native dropdown with a custom UI component.

## Proposed Solution: The "Smart Wrap" Selector

1.  **Custom Dropdown UI**: Built using `Framer Motion` for smooth opening/closing.
2.  **Text Wrapping**: Each option will use `whitespace-normal`, allowing long titles to flow into 2 or 3 lines automatically within the fixed 25% width.
3.  **Active State**: Clear visual indicator of the selected calculation type.
4.  **Accessibility**: Ensures the component is still usable via keyboard navigation.

---

## Visual Change

| Current (Standard Select) | New (Custom Wrapper) |
|---|---|
| Text is cut off or uses "..." | Text wraps to next line |
| Single line only | Multi-line support |
| Limited styling | Matches Enterprise-Calm design exactly |

---

## Verification Plan
1. Check "Luminosity (Stefan-Boltzmann)" on a small laptop screen.
2. Verify it wraps to 2 lines and is fully readable.
3. Ensure the "CALCULATE" button still functions correctly.
