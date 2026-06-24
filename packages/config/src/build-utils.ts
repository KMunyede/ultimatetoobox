import { execSync } from "child_process";

/**
 * Gets the last modified date of a file from Git.
 * Falls back to current date if git command fails or file is not tracked.
 */
export function getFileLastUpdated(filePath: string): string {
  try {
    // Get the last commit date for the file
    const result = execSync(`git log -1 --format=%ai -- "${filePath}"`, {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (!result) {
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    return new Date(result).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

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
