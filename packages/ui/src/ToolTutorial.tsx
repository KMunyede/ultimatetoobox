"use client";

import { useEffect, useRef } from "react";
import { driver, DriveStep } from "driver.js";
import "driver.js/dist/driver.css";
import { HelpCircle, MessageSquareWarning } from "lucide-react";

export interface ToolTutorialProps {
  tourId: string;
  steps: DriveStep[];
  buttonText?: string;
}

export function ToolTutorial({ tourId, steps, buttonText = "How to use" }: ToolTutorialProps) {
  const driverRef = useRef<any>(null);

  useEffect(() => {
    driverRef.current = driver({
      showProgress: true,
      steps: steps,
      nextBtnText: "Next",
      prevBtnText: "Previous",
      doneBtnText: "Done",
      allowClose: true,
      overlayOpacity: 0,
    });

  }, [tourId, steps]);

  return (
    <div className="flex items-center gap-3">
      <a
        href={`mailto:support@hilmost.net?subject=Feedback for Tool: ${tourId}&body=Please describe your feedback or issue below:%0D%0A%0D%0A`}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
        title="Report a problem or suggest an improvement"
      >
        <MessageSquareWarning className="w-4 h-4" />
        Feedback
      </a>
      <button
        onClick={() => driverRef.current?.drive()}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-colors"
        title="Step-by-step guide on how to use this tool"
      >
        <HelpCircle className="w-4 h-4" />
        {buttonText}
      </button>
    </div>
  );
}
