/**
 * Returns the canonical URL for a given path.
 */
export function getCanonicalUrl(path: string): string {
  const base = "https://hilmost-toolbox.hilmost.net";
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Sanitizes and formats page titles to be within 50-60 characters
 * and avoids duplicated suffixes.
 */
export function sanitizeTitle(title: string, suffix: string = "Hilmost Toolbox"): string {
  // Remove the suffix if it's already there to prevent duplicates
  let cleanTitle = title.replace(new RegExp(`\\s*\\|?\\s*${suffix}`, 'g'), '').trim();

  // If we have a very long title, truncate it nicely
  const targetLength = 60;
  const suffixPart = ` | ${suffix}`;
  const maxPrefixLength = targetLength - suffixPart.length;

  if (cleanTitle.length > maxPrefixLength) {
    cleanTitle = cleanTitle.substring(0, maxPrefixLength - 3).trim() + "...";
  }

  return `${cleanTitle}${suffixPart}`;
}
