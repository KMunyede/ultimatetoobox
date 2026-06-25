/**
 * Generates a sanitized page title for SEO.
 * Targets 50-60 characters and avoids duplicated suffixes.
 */
export function generatePageTitle(title: string): string {
  const suffix = "Hilmost Toolbox";
  const separator = " | ";

  // Clean title: remove any existing suffix variations
  let cleanTitle = title.replace(new RegExp(`\\s*\\|?\\s*${suffix}`, 'g'), '').trim();

  // If suffix is missing, we intend to add it
  // But first, let's check length to keep it under 60
  const combinedSuffix = `${separator}${suffix}`;
  const maxTitleLength = 60 - combinedSuffix.length;

  if (cleanTitle.length > maxTitleLength) {
    // Truncate to fit if necessary
    cleanTitle = cleanTitle.substring(0, maxTitleLength - 3).trim() + "...";
  }

  return `${cleanTitle}${combinedSuffix}`;
}

/**
 * Cleanup utility to sanitize page titles and ensure they are < 60 chars.
 * This version specifically handles the "template" logic requested.
 */
export function formatTitle(pageTitle: string): string {
  const suffix = "Hilmost Toolbox";
  const separator = " | ";

  // 1. Remove suffix if it exists (case-insensitive, handles various spacing)
  let clean = pageTitle.replace(new RegExp(`\\s*\\|?\\s*${suffix}`, 'gi'), '').trim();

  // 2. Enforce length < 60 (subtracting suffix length)
  const suffixFull = `${separator}${suffix}`;
  const maxLength = 60 - suffixFull.length;

  if (clean.length > maxLength) {
    clean = clean.substring(0, maxLength - 3).trim() + "...";
  }

  // 3. Return the specific page title part only
  // NOTE: If using Next.js template: '%s | Hilmost Toolbox',
  // we return JUST the 'clean' part.
  // But the request says "Append ' | Hilmost Toolbox' only once" in the utility.
  // So I will return the full string, and we will update layout.tsx to NOT use a template
  // OR we return just the prefix and let layout handle it.

  // Given the instruction "Append ... only once", I'll make the utility return the FULL string.
  return `${clean}${suffixFull}`;
}

/**
 * Common Metadata base configuration
 */
export const METADATA_BASE_URL = 'https://hilmost-toolbox.hilmost.net';
