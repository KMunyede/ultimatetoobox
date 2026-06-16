"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function useUrlState<T extends Record<string, string | number>>(
  initialState: T
): [T, (newState: Partial<T>) => void] {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [state, setState] = useState<T>(() => {
    const defaultState = { ...initialState };
    if (searchParams) {
      Object.keys(defaultState).forEach((key) => {
        const urlVal = searchParams.get(key);
        if (urlVal !== null) {
          if (typeof defaultState[key] === "number") {
            const parsed = Number(urlVal);
            if (!isNaN(parsed)) {
              (defaultState as Record<string, string | number>)[key] = parsed;
            }
          } else {
            (defaultState as Record<string, string | number>)[key] = urlVal;
          }
        }
      });
    }
    return defaultState;
  });

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
          return prev; // Bail out!
        }

        const merged = { ...prev, ...newState };
        const params = new URLSearchParams(searchParams?.toString() || "");
        
        Object.keys(merged).forEach((key) => {
          params.set(key, String(merged[key]));
        });

        // Use window.history.replaceState to avoid Next.js remounting loops on static pages
        window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
        
        return merged;
      });
    },
    [pathname, searchParams]
  );

  return [state, setUrlState];
}
