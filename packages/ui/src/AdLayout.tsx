import { ReactNode } from "react";
import { AdUnit } from "./AdUnit";

interface AdLayoutProps {
  children: ReactNode;
  publisherId: string;
  leftSlotId?: string;
  rightSlotId?: string;
  bottomSlotId?: string;
}

export function AdLayout({
  children,
  publisherId,
  leftSlotId = "4408382392",
  rightSlotId = "8526461509",
  bottomSlotId = "2372116691",
}: AdLayoutProps) {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-8">
      {/* Mobile Top Ad (Visible only on small screens) */}
      <div className="block lg:hidden mb-8 w-full">
        <AdUnit 
          publisherId={publisherId} 
          slotId={bottomSlotId} 
          format="horizontal" 
          className="bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
          style={{ width: "100%", minHeight: "90px" }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start justify-center">
        {/* Left Sidebar Ad (Hidden on mobile) */}
        <div className="hidden lg:block w-[160px] xl:w-[300px] shrink-0 sticky top-24">
          <AdUnit 
            publisherId={publisherId} 
            slotId={leftSlotId} 
            format="vertical" 
            className="bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
            style={{ width: "100%", minHeight: "600px" }}
          />
        </div>

        {/* Center Content */}
        <div className="flex-1 w-full max-w-3xl min-w-0 mx-auto">
          {children}

          {/* Bottom Horizontal Ad */}
          <div className="mt-12 w-full">
            <AdUnit 
              publisherId={publisherId} 
              slotId={bottomSlotId} 
              format="horizontal" 
              className="bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
              style={{ width: "100%", minHeight: "90px" }}
            />
          </div>
        </div>

        {/* Right Sidebar Ad (Hidden on mobile) */}
        <div className="hidden lg:block w-[160px] xl:w-[300px] shrink-0 sticky top-24">
          <AdUnit 
            publisherId={publisherId} 
            slotId={rightSlotId} 
            format="vertical" 
            className="bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
            style={{ width: "100%", minHeight: "600px" }}
          />
        </div>
      </div>
    </div>
  );
}
