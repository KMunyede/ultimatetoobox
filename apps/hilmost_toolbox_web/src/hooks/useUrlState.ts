"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

/**
 * A hook to manage state synchronized with URL search parameters.
 * Optimized for SEO: It avoids 'useSearchParams' during the initial render
 * to prevent Next.js from triggering a Suspense fallback during static export.
 * This ensures the 'initialState' is rendered in the static HTML for bots.
 */
export function useUrlState<T extends Record<string, string | number>>(
  initialState: T
): [T, (newState: Partial<T>) => void] {
  const pathname = usePathname();

  // Initialize state with the provided initialState.
  // This will be used for the first render (including SSR/Build).
  const [state, setState] = useState<T>(initialState);

  // Sync state from URL on mount only (client-side)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newState = { ...initialState };
    let hasChanges = false;

    Object.keys(initialState).forEach((key) => {
      const urlVal = params.get(key);
      if (urlVal !== null) {
        if (typeof initialState[key] === "number") {
          const parsed = Number(urlVal);
          if (!isNaN(parsed)) {
            (newState as any)[key] = parsed;
            hasChanges = true;
          }
        } else {
          (newState as any)[key] = urlVal;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      setState(newState);
    }
  }, []); // Run once on mount

  const setUrlState = useCallback(
    (newState: Partial<T>) => {
      setState((prev) => {
        // Check if any value actually changed to prevent infinite loops
        let hasChanges = false;
        for (const key in newState) {
          if (prev[key] !== newState[key]) {
            hasChanges = true;
            break;
          }
        }

        if (!hasChanges) {
          return prev;
        }

        const merged = { ...prev, ...newState };
        const params = new URLSearchParams(window.location.search);
        
        Object.keys(merged).forEach((key) => {
          params.set(key, String(merged[key]));
        });

        // Use window.history.replaceState to update URL without triggerring a full page reload or Next.js router overhead
        window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
        
        return merged;
      });
    },
    [pathname]
  );

  return [state, setUrlState];
}
