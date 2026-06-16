import React from "react";

export function CookiePolicyContent() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">1. What Are Cookies</h2>
          <p>
            Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">2. How We Use Cookies</h2>
          <p className="mb-4">
            When you use and access our websites, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To enable certain functions of the Service</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
            <li>To enable advertisement delivery, including behavioral advertising</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">3. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on. Specifically, we use Google AdSense to serve ads. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">4. Your Choices Regarding Cookies</h2>
          <p className="mb-4">
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. You can also manage your consent preferences using the consent management prompt provided on our website.
          </p>
          <p>
            Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
          </p>
        </section>
      </div>

      <p className="text-sm text-slate-500 mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  );
}
