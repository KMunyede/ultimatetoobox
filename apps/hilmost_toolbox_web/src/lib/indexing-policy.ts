export const NOINDEX_PATHS: ReadonlySet<string> = new Set([
  "/calculators/astrophysics/gravitational-force",
  "/calculators/astrophysics/orbital-velocity",
  "/calculators/astrophysics/escape-velocity",
  "/calculators/astrophysics/luminosity-calculator",
  "/calculators/astrophysics/hubble-distance",
  "/text-data/base64-encode/base64-encode",
  "/text-data/base64-encode/base64-decode"
]);

export const NOINDEX_APP_SCREEN = {
  robots: { index: false, follow: true },
} as const;

export function isNoIndexPath(path: string): boolean {
  if (!path) return false;
  const cleanPath = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return NOINDEX_PATHS.has(cleanPath);
}
