export function PrivacyPolicyContent() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
        At Hilmost Software Corporation (HSC), we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your information across our network of applications and services.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            When you use our services (such as Hilmost Toolbox or Hilmost Main), we may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Data:</strong> We collect non-personally identifiable information such as browser type, operating system, and pages visited to improve our services.</li>
            <li><strong>Cookies:</strong> We use cookies to store your preferences (such as Dark/Light mode) and for analytics purposes.</li>
            <li><strong>Advertising:</strong> Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            The information we collect is used in the following ways:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To personalize your user experience and improve our applications.</li>
            <li>To provide core functionality for our tools without transmitting sensitive data to our servers (most of our toolbox processing is done locally on your device).</li>
            <li>To serve relevant advertisements through networks like Google AdSense.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">3. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Our websites use secure SSL encryption to protect data transmitted between your browser and our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">4. Third-Party Links</h2>
          <p>
            Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">5. Changes to this Policy</h2>
          <p>
            HSC reserves the right to update this privacy policy at any time. We encourage users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">6. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 not-prose">
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="font-semibold text-slate-900 dark:text-white min-w-[80px]">Email:</span> 
                <a href="mailto:k.munyede@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@hilmost.net</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-semibold text-slate-900 dark:text-white min-w-[80px]">Phone:</span> 
                <span className="text-slate-600 dark:text-slate-400">263772934762</span>
              </li>
              <li className="flex items-start gap-3 pt-2">
                <span className="font-semibold text-slate-900 dark:text-white min-w-[80px]">Address:</span>
                <address className="not-italic text-slate-600 dark:text-slate-400">
                  84 Broughton Drive<br />
                  Sunridge<br />
                  Harare<br />
                  Harare Metropolitan<br />
                  Zimbabwe
                </address>
              </li>
            </ul>
          </div>
        </section>
      </div>
      
      <p className="text-sm text-slate-500 mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  );
}
