import { Metadata } from "next";
import Link from "next/link";
import { GitBranch, Mail, Globe, MapPin, Phone } from "lucide-react";
import { CategoryGrid } from "@utilitiessite/ui";

export const metadata: Metadata = {
  title: "About Hilmost | Innovation in Utility Engineering",
  description: "Hilmost Corporation (HSC) is dedicated to creating free, accessible tools that empower global problem solvers and researchers.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-8 uppercase">
          About <span className="text-brand-primary">Hilmost</span>
        </h1>
        
        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-12 border-l-4 border-brand-primary pl-6">
          Hilmost Corporation (HSC) is an innovation-driven software company dedicated to creating free, accessible tools that empower students, researchers, scientists, financial analysts, and hobbyists to solve problems and explore the universe of knowledge.
        </p>

        <section className="mb-16">
          <p>
            Founded with the vision of democratizing technology, HSC develops utilities that remove barriers to discovery and make advanced problem-solving available to everyone.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Our Subsidiaries & Portfolio</h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400 font-medium">
            Our portfolio spans multiple categories, each designed to address real-world needs:
          </p>
          <CategoryGrid limit={6} />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Our Mission</h2>
          <p>
            At HSC, our mission is to build sustainable, scalable, and beautifully designed solutions that solve real-world problems. We believe technology should be a force for good—helping people learn, innovate, and grow. Whether through our suite of free online utilities or enterprise services, we are committed to excellence, transparency, and accessibility.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Our Impact</h2>
          <p>
            Hilmost tools are used daily by thousands of learners and professionals worldwide. From assisting students in completing research projects to enabling scientists to process data faster, our solutions are designed to make a measurable difference. We are proud to contribute to the advancement of knowledge across disciplines.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Looking Ahead</h2>
          <p>
            We are continuously expanding our portfolio, with upcoming projects in artificial intelligence, quantum computing, and advanced data visualization. Our goal is to remain at the forefront of innovation, offering tools that inspire curiosity and drive progress.
          </p>
        </section>

        <section className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800 not-prose">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-slate-600 dark:text-slate-400">
                Hilmost Corporation welcomes collaboration and feedback. Reach out to our engineering team or follow our open-source journey.
              </p>
              <div className="flex flex-col gap-4">
                <a href="mailto:k.munyede@gmail.com" className="flex items-center gap-3 text-slate-900 dark:text-white font-bold hover:text-brand-primary transition-colors group">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-brand-primary/10 transition-colors">
                    <Mail size={18} className="text-brand-primary" />
                  </div>
                  support@hilmost.net
                </a>
                <Link href="https://github.com/KMunyede/ultimatetoobox" target="_blank" className="flex items-center gap-3 text-slate-900 dark:text-white font-bold hover:text-brand-primary transition-colors group">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-brand-primary/10 transition-colors">
                    <GitBranch size={18} className="text-brand-primary" />
                  </div>
                  Engineering Repository
                </Link>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <MapPin size={10} className="text-brand-primary" />
                Global Headquarters
              </h3>
              <address className="not-italic text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <strong className="text-slate-900 dark:text-white block mb-2">Hilmost Software Corporation</strong>
                84 Broughton Drive<br />
                Sunridge<br />
                Harare, Zimbabwe
              </address>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-400">
                <Phone size={12} />
                +263 772 934 762
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
