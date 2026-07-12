import { ReactNode } from "react";
import { AdUnit } from "./AdUnit";

interface AdLayoutProps {
  children: ReactNode;
  publisherId: string;
  leftSlotId?: string;
  rightSlotId?: string;
  bottomSlotId?: string;
  showInnerAds?: boolean;
}

export function AdLayout({
  children,
  publisherId,
  leftSlotId = "4408382392",
  rightSlotId = "8526461509",
  bottomSlotId = "2372116691",
  showInnerAds = true,
}: AdLayoutProps) {
  return (
    <div className="w-full max-w-[1750px] mx-auto px-4 py-0">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 justify-center">
        {/* Left Sidebar Ad (Hidden on mobile) */}
        <div className="hidden lg:block w-[160px] xl:w-[250px] shrink-0 pt-8">
          <div className="sticky top-24">
            <AdUnit
              publisherId={publisherId}
              slotId={leftSlotId}
              format="vertical"
              className="bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
              style={{ width: "100%", minHeight: "600px" }}
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 w-full max-w-5xl min-w-0 mx-auto">
          {/* Mobile Top Ad - Moved lower and with more margin to prevent accidental clicks */}
          {showInnerAds && (
            <div className="block lg:hidden mb-2 w-full">
              <AdUnit
                publisherId={publisherId}
                slotId={bottomSlotId}
                format="horizontal"
                responsive={false}
                className="bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                style={{ width: "100%", minHeight: "60px" }}
              />
            </div>
          )}

          {children}

          {/* Bottom Horizontal Ad - Significant margin for safety */}
          {showInnerAds && (
            <div className="mt-8 w-full">
              <AdUnit
                publisherId={publisherId}
                slotId={bottomSlotId}
                format="horizontal"
                responsive={false}
                className="bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                style={{ width: "100%", minHeight: "60px", maxHeight: "100px" }}
              />
            </div>
          )}
        </div>

        {/* Right Sidebar Ad (Hidden on mobile) */}
        <div className="hidden lg:block w-[160px] xl:w-[250px] shrink-0 pt-8">
          <div className="sticky top-24">
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
    </div>
  );
}

