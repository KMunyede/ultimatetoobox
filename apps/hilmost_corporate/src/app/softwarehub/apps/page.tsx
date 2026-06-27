import { AppWindow, MonitorSmartphone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps | Hilmost Software Corporation",
  description: "Download powerful native applications for Windows, iOS, and Android devices.",
};

export default function AppsPage() {
  return (
    <>
      <div className="flex-1 bg-slate-50 dark:bg-slate-950">
        <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-24 pb-20">
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-950" />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <div className="mx-auto h-16 w-16 mb-8 flex items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <AppWindow size={32} />
            </div>
            <h1 className="font-extrabold tracking-tight text-slate-900 dark:text-white text-3xl sm:text-4xl">
              Hilmost <span className="text-blue-600 dark:text-blue-500">Apps</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              We are currently building our next generation of desktop and mobile applications. Check back soon for downloads on Windows, iOS, and Android.
            </p>
          </div>
        </section>

        <section className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mx-auto max-w-md bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
              <MonitorSmartphone size={48} className="mx-auto text-slate-400 dark:text-slate-600 mb-6" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Coming Soon</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Our engineering team is hard at work. Native apps for Windows, iOS, and Android will be available here when they launch.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
