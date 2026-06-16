import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Hilmost Software Corporation",
  description: "Learn more about Hilmost Software Corporation (HSC) and our subsidiaries.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">About Hilmost Software Corporation</h1>
        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          Hilmost Software Corporation (HSC) is the operating entity for a diverse holding company. We leverage technology to drive innovation across multiple sectors.
        </p>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-6">Our Subsidiaries</h2>
            <p className="mb-4">Our corporate portfolio encompasses several key divisions:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Hilmost Software Corporation:</strong> Building digital platforms and SaaS solutions.</li>
              <li><strong>Hilmost Engineering:</strong> Delivering robust infrastructural and engineering solutions.</li>
              <li><strong>Hilmost Foods:</strong> Innovating in food processing and distribution.</li>
              <li><strong>Hilmost Health:</strong> Advancing digital and physical health services.</li>
              <li><strong>Hilmost Insurance:</strong> Providing comprehensive risk management and coverage.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-6">Our Mission</h2>
            <p>
              At HSC, we believe in building sustainable, scalable, and beautifully designed solutions that solve real-world problems. Whether it's through our suite of free online utilities or our enterprise services, we are committed to excellence.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
