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
 * Common Metadata base configuration
 */
export const METADATA_BASE_URL = 'https://hilmost-toolbox.hilmost.net';
