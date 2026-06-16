import Link from "next/link";
import { ArrowRight, Code2, HeartPulse, ShieldCheck, Utensils, Wrench, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
            <main className="flex-1 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* Section 1: Digital & Health */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h1 className="font-extrabold tracking-tight text-slate-900 dark:text-white text-3xl sm:text-4xl">
              Building the future <span className="text-blue-600 dark:text-blue-500">across industries</span>
            </h1>
            <p className="mt-4 text-lg leading-7 text-slate-600 dark:text-slate-400">
              Hilmost is a diversified holdings company operating excellence-driven subsidiaries. Explore our active digital and health divisions.
            </p>
          </div>

          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none md:grid-cols-2 max-w-4xl mx-auto">
            {/* Subsidiary 1 */}
            <Link href="/softwarehub" className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-xl hover:-translate-y-1 hover:ring-blue-500/50 block">
              <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-900 dark:text-white">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Code2 size={24} />
                </div>
                Hilmost Software Corporation
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                <p className="flex-auto">
                  Developing high-quality digital products, from the Hilmost Toolbox to MindOS and casual games, empowering users globally.
                </p>
                <p className="mt-6">
                  <span className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 flex items-center gap-1 transition-all">
                    Visit Software Hub <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </p>
              </dd>
            </Link>

            {/* Subsidiary 2 */}
            <Link href="/healthhub" className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-xl hover:-translate-y-1 hover:ring-rose-500/50 block">
              <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-900 dark:text-white">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                  <HeartPulse size={24} />
                </div>
                Hilmost Health
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-400">
                <p className="flex-auto">
                  Advancing medical care and wellness services. Home of the Daily Wisdom app.
                </p>
                <p className="mt-6">
                  <span className="text-sm font-semibold leading-6 text-rose-600 dark:text-rose-400 flex items-center gap-1 transition-all">
                    Visit Health Hub <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </p>
              </dd>
            </Link>
          </div>

          {/* Section 2: Engineering */}
          <div className="text-center max-w-3xl mx-auto mt-24 mb-6">
            <h2 className="font-extrabold tracking-tight text-slate-900 dark:text-white text-3xl sm:text-4xl">
              Engineering <span className="text-blue-600 dark:text-blue-500">Tomorrow's Infrastructure</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              Delivering robust infrastructural, mechanical, and civil engineering solutions designed to stand the test of time.
            </p>
          </div>

          <div className="grid max-w-xl grid-cols-1 mx-auto">
            <div className="relative flex flex-col bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-8 border border-slate-200 dark:border-slate-800/50 opacity-60 cursor-not-allowed">
              <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                Future Division
              </div>
              <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-700 dark:text-slate-300 cursor-text">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  <Wrench size={24} />
                </div>
                Hilmost Engineering
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-500 dark:text-slate-500 cursor-text select-text">
                <p className="flex-auto">
                  Designing robust mechanical and civil solutions that lay the groundwork for modern society and industrial advancement.
                </p>
              </dd>
            </div>
          </div>

          {/* Section 3: Foods & Insurance */}
          <div className="text-center max-w-3xl mx-auto mt-24 mb-6">
            <h2 className="font-extrabold tracking-tight text-slate-900 dark:text-white text-3xl sm:text-4xl">
              Nourishing & <span className="text-blue-600 dark:text-blue-500">Protecting</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              Securing futures through sustainable agriculture and comprehensive insurance coverage.
            </p>
          </div>

          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none md:grid-cols-2 max-w-4xl mx-auto">
            <div className="relative flex flex-col bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-8 border border-slate-200 dark:border-slate-800/50 opacity-60 cursor-not-allowed">
              <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                Future Division
              </div>
              <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-700 dark:text-slate-300 cursor-text">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  <Utensils size={24} />
                </div>
                Hilmost Foods
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-500 dark:text-slate-500 cursor-text select-text">
                <p className="flex-auto">
                  Committed to sustainable agriculture, food processing, and distribution, bringing quality nutrition to tables everywhere.
                </p>
              </dd>
            </div>

            <div className="relative flex flex-col bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-8 border border-slate-200 dark:border-slate-800/50 opacity-60 cursor-not-allowed">
              <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                Future Division
              </div>
              <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-700 dark:text-slate-300 cursor-text">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  <ShieldCheck size={24} />
                </div>
                Hilmost Insurance
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-500 dark:text-slate-500 cursor-text select-text">
                <p className="flex-auto">
                  Providing comprehensive protection and peace of mind with tailored insurance products for individuals and businesses alike.
                </p>
              </dd>
            </div>
          </div>

        </div>
        
        {/* Call to Action */}
        <section className="bg-slate-50 dark:bg-slate-900/30 py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-600 dark:bg-blue-900 rounded-3xl px-6 py-16 sm:p-20 lg:p-24 shadow-xl overflow-hidden relative">
              <div className="absolute -top-24 -right-24 text-blue-500/20 dark:text-blue-800/20">
                <Sparkles size={256} />
              </div>
              <div className="relative max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Explore our ecosystem
                </h2>
                <p className="mt-6 text-lg leading-8 text-blue-100">
                  Discover the wide array of products and services offered across the Hilmost Holdings network.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Link
                    href="/softwarehub"
                    className="rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
                  >
                    Software Hub
                  </Link>
                  <Link
                    href="/healthhub"
                    className="text-base font-semibold text-white hover:text-blue-100 transition-colors"
                  >
                    Health Hub <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
          </>
  );
}
