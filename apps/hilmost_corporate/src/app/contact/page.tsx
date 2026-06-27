import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Hilmost Software Corporation",
  description: "Get in touch with Hilmost Software Corporation.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
        <h1>Contact Us</h1>
        <p className="lead">
          Have a question or need support? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Company Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Company Address</h3>
            <address className="not-italic text-slate-600 dark:text-slate-400 space-y-1">
              <p>84 Broughton Drive</p>
              <p>Sunridge</p>
              <p>Harare</p>
              <p>Harare Metropolitan</p>
              <p>Zimbabwe</p>
            </address>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Contact Details</h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                <strong className="block text-slate-900 dark:text-white text-sm mb-1">Email</strong>
                <a href="mailto:k.munyede@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">support@hilmost.net</a>
              </p>
              <p>
                <strong className="block text-slate-900 dark:text-white text-sm mb-1">Phone</strong>
                <a href="tel:+263772934762" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+263 772 934 762</a>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm h-full">
            <form className="space-y-6" action="mailto:k.munyede@gmail.com" method="POST" encType="text/plain">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                  <input type="text" name="firstName" className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                  <input type="text" name="lastName" className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Doe" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input type="email" name="email" className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" required />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                <textarea name="message" className="w-full p-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px]" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-blue-500/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
