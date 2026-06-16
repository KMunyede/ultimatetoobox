import 'package:flutter/material.dart';

class PrivacyPolicyPage extends StatelessWidget {
  const PrivacyPolicyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Privacy Policy',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 16),
            const Text(
              'Effective Date: June 13, 2026\n\n'
              'At Hilmost Software Corporation ("we", "our", or "us"), we respect your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit the Hilmost Ultimate Toolbox website.\n\n'
              '1. Information We Collect\n'
              'We do not require you to create an account or provide any personally identifying information to use our calculators and tools. All mathematical calculations and tool inputs are processed locally in your browser and are never transmitted to or stored on our servers.\n\n'
              '2. Third-Party Advertising (Google AdSense)\n'
              'We use Google AdSense to serve ads when you visit our website. Google and its partners use cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google\'s Ads Settings.\n\n'
              '3. Cookies and Tracking Technologies\n'
              'We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. These are primarily used by third-party services like Google Analytics and Google AdSense to analyze traffic and deliver relevant advertising.\n\n'
              '4. Changes to This Privacy Policy\n'
              'We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons.\n\n'
              'If you have questions or comments about this Privacy Policy, please contact us at support@hilmost.net.',
              style: TextStyle(fontSize: 16, height: 1.5),
            ),
          ],
        ),
      ),
    );
  }
}
