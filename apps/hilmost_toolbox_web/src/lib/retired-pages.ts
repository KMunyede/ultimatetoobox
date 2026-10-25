export const RETIRED_PATH_PREFIXES = [
  '/converters/length/',
  '/converters/weight-mass/',
  '/converters/area/',
  '/converters/temperature/',
  '/finance/salary-converter/',
] as const;

export function isRetiredPath(path: string): boolean {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return RETIRED_PATH_PREFIXES.some(prefix => normalized.startsWith(prefix));
}
