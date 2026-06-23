# GA4 Analytics Integration Plan

As your Lead Architect, I have evaluated the provided GA4 integration prompts. To ensure we maintain high performance and clean architecture, I will implement these changes using the Next.js `Script` component with the `afterInteractive` strategy.

## Evaluated Changes

### 1. Hilmost Main (`hilmost.net`)
- **File**: `apps/hilmost_main/src/app/layout.tsx`
- **ID**: `G-SZH56NFNQP`
- **Refinement**: Will insert the scripts at the end of the `ThemeProvider` block to ensure they load after the primary UI is rendered.

### 2. Hilmost Toolbox (`hilmost-toolbox.hilmost.net`)
- **File**: `apps/hilmost_toolbox_web/src/app/layout.tsx`
- **ID**: `G-637S0R8TMZ`
- **Refinement**: Will place the scripts alongside the existing `AdSenseScript` for organizational consistency, but using the `afterInteractive` strategy to prioritize tool interactivity over tracking.

## Technical Alignment
- **Performance**: Using `strategy="afterInteractive"` ensures that analytics do not block the **First Contentful Paint (FCP)**.
- **Privacy**: The integration remains compliant with our privacy policy, which already discloses third-party tracking.
- **Safety**: Each site uses its own dedicated Measurement ID to prevent data pollution between the main site and the utility subdomains.

---

## Verification Plan

### Manual Verification
- Check the `<head>` and `<body>` of the rendered sites in the browser to ensure tags are present.
- Verify in the GA4 DebugView (if accessible) that hits are being recorded.

### Build Verification
- Run `npm run build` in both `hilmost_main` and `hilmost_toolbox_web` to ensure no syntax errors were introduced.
