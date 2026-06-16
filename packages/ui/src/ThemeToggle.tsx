"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Tooltip } from "./Tooltip";


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to avoid layout shift
  }

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-full border border-gray-200 dark:border-gray-700">
      <Tooltip content="Switch to light theme" position="bottom">
        <button
          onClick={() => setTheme("light")}
          className={`p-1.5 rounded-full transition-colors ${
            theme === "light"
              ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
          }`}
          aria-label="Light theme"
        >
          <Sun size={16} />
        </button>
      </Tooltip>
      <Tooltip content="Use system theme setting" position="bottom">
        <button
          onClick={() => setTheme("system")}
          className={`p-1.5 rounded-full transition-colors ${
            theme === "system"
              ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
          }`}
          aria-label="System theme"
        >
          <Monitor size={16} />
        </button>
      </Tooltip>
      <Tooltip content="Switch to dark theme" position="bottom">
        <button
          onClick={() => setTheme("dark")}
          className={`p-1.5 rounded-full transition-colors ${
            theme === "dark"
              ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
          }`}
          aria-label="Dark theme"
        >
          <Moon size={16} />
        </button>
      </Tooltip>
    </div>
  );
}
