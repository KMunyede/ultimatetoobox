export function TermsOfServiceContent() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8">
        Welcome to the Hilmost Software Corporation (HSC) network. By accessing or using our websites, tools, and services, you agree to be bound by these Terms of Service.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">1. Use of Services</h2>
          <p>
            HSC provides various online tools, applications, and informational services (collectively, the "Services"). You agree to use these Services only for lawful purposes and in a manner that does not infringe upon the rights of, restrict, or inhibit anyone else's use and enjoyment of the Services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">2. Disclaimer of Warranties</h2>
          <p className="mb-4">
            Our Services, including tools like calculators and converters, are provided on an "as is" and "as available" basis. While we strive for accuracy, HSC makes no representations or warranties of any kind, express or implied, as to the operation of the Services or the information, content, or results provided by them. 
          </p>
          <p>
            <strong>Financial and Health Tools:</strong> Any financial or health-related calculators (e.g., Currency Converters, BMI Calculators, Loan Estimators) are for informational purposes only and do not constitute professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">3. Limitation of Liability</h2>
          <p>
            In no event shall HSC or its directors, employees, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our Services or with the delay or inability to use our Services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">4. Intellectual Property</h2>
          <p>
            All content included on our sites, such as text, graphics, logos, and software, is the property of HSC or its content suppliers and protected by international copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">5. Modifications to Terms</h2>
          <p>
            HSC reserves the right to revise these Terms of Service at any time without notice. By using our websites you are agreeing to be bound by the then-current version of these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white border-b pb-2 mb-4">6. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about these Terms of Service, please contact us at:
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
