# Implementation Plan - IndexNow Integration

Implement the IndexNow protocol to automate URL submission to Microsoft Bing and other participating search engines. This will ensure that new and updated content (like the recent EPS and WACC tools) are indexed immediately.

## User Review Required

> [!IMPORTANT]
> - **API Keys**: I have generated unique API keys for `hilmost.net` and `hilmost-toolbox.hilmost.net`. These keys will be public via the `{key}.txt` verification files as required by the protocol.
> - **Automation**: The submission script is designed to be run manually or as part of a deployment workflow.

## Proposed Changes

### [Shared Infrastructure]

#### [NEW] [submit-indexnow.mjs](file:///M:/techprojects/UtilitiesSite/packages/config/src/scripts/submit-indexnow.mjs)
- A standalone Node.js script that:
    - Fetches the site's `sitemap.xml`.
    - Parses all URLs from the sitemap.
    - Sends a POST request to `https://www.bing.com/indexnow`.
    - Reports success/failure for each submission.

---

### [hilmost.net (Main Site)]

#### [NEW] [4e24174360e241858852e1f2536c6411.txt](file:///M:/techprojects/UtilitiesSite/apps/hilmost_main/public/4e24174360e241858852e1f2536c6411.txt)
- IndexNow verification file.

#### [package.json](file:///M:/techprojects/UtilitiesSite/apps/hilmost_main/package.json)
- Add `"indexnow": "node ../../packages/config/src/scripts/submit-indexnow.mjs --host hilmost.net --key 4e24174360e241858852e1f2536c6411"`

---

### [hilmost-toolbox.hilmost.net (Toolbox)]

#### [NEW] [97f26d8330774a38b58406f0e4b75249.txt](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/public/97f26d8330774a38b58406f0e4b75249.txt)
- IndexNow verification file.

#### [package.json](file:///M:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/package.json)
- Add `"indexnow": "node ../../packages/config/src/scripts/submit-indexnow.mjs --host hilmost-toolbox.hilmost.net --key 97f26d8330774a38b58406f0e4b75249"`

## Verification Plan

### Automated Tests
1. **Verification File Check**: Run `curl -I https://hilmost.net/4e24174360e241858852e1f2536c6411.txt` (post-deployment) to ensure it returns 200 OK.
2. **Script Execution**: Run `npm run indexnow` in each app folder and verify the output shows successful submission (HTTP 200/202).

### Manual Verification
- Check **Bing Webmaster Tools** -> **IndexNow** tab after a few hours to confirm URLs were received and processed.
