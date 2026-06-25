import { execSync } from "child_process";

/**
 * Gets the last modified date of a file from Git.
 * Falls back to current date if git command fails or file is not tracked.
 * NOTE: This is server-side only and cannot be imported into Client Components.
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
