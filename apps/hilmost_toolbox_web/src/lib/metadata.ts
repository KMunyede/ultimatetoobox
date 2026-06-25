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

  // 1. Remove suffix if it exists
  let clean = pageTitle.replace(new RegExp(`\\s*\\|?\\s*${suffix}`, 'gi'), '').trim();

  // 2. SEO "Sweet Spot" is 50-60 chars
  const suffixFull = `${separator}${suffix}`;
  const maxLength = 60 - suffixFull.length;

  // 3. Intelligent Shortening:
  // If the title is too long, we try to preserve the first few words (The "Money" Keywords)
  if (clean.length > maxLength) {
    // If there's a separator in the prefix (like "Tool | Description"),
    // we drop the description and just keep the Tool Name.
    if (clean.includes(separator)) {
      clean = clean.split(separator)[0].trim();
    }

    // If still too long, hard truncate
    if (clean.length > maxLength) {
      clean = clean.substring(0, maxLength - 3).trim() + "...";
    }
  }

  return `${clean}${suffixFull}`;
}

/**
 * Common Metadata base configuration
 */
export const METADATA_BASE_URL = 'https://hilmost-toolbox.hilmost.net';
