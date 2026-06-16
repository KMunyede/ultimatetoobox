import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Hilmost Software Corporation",
  description: "Join Hilmost Software Corporation (HSC) and build the future with us.",
};

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">Careers at Hilmost</h1>
        <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
          Join a team of innovators, engineers, and visionaries. At Hilmost, we are always looking for passionate individuals to help us build sustainable, scalable, and beautifully designed solutions.
        </p>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-6">Why Join Us?</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Innovation First:</strong> Work on diverse projects spanning Software, Engineering, Foods, Health, and Insurance.</li>
              <li><strong>Impactful Work:</strong> Build tools and platforms used by thousands of people globally.</li>
              <li><strong>Growth Culture:</strong> We invest in our team members with continuous learning opportunities and career advancement paths.</li>
              <li><strong>Remote-Friendly:</strong> We believe in hiring the best talent, regardless of geography.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-6">Open Positions</h2>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-0">
                We currently don't have any open positions, but we are always interested in connecting with talented professionals.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-6">Speculative Applications</h2>
            <p>
              If you believe you'd be a great fit for Hilmost but don't see a relevant role, we'd still love to hear from you. Send your resume and a brief introduction to our team.
            </p>
            <p className="mt-4">
              <strong>Email us at:</strong> <a href="mailto:k.munyede@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@hilmost.net</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
