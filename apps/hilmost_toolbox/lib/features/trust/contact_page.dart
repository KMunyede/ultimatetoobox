import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher_string.dart';

class ContactPage extends StatefulWidget {
  const ContactPage({super.key});

  @override
  State<ContactPage> createState() => _ContactPageState();
}

class _ContactPageState extends State<ContactPage> {
  late TapGestureRecognizer _emailTapRecognizer;

  @override
  void initState() {
    super.initState();
    _emailTapRecognizer = TapGestureRecognizer()
      ..onTap = () {
        launchUrlString('mailto:k.munyede@gmail.com');
      };
  }

  @override
  void dispose() {
    _emailTapRecognizer.dispose();
    super.dispose();
  }

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
              'Contact Us',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 16),
            Text.rich(
              TextSpan(
                style: const TextStyle(fontSize: 16, height: 1.5),
                children: [
                  const TextSpan(
                    text: 'If you have any questions, suggestions, or concerns regarding the Hilmost Ultimate Toolbox or any of our calculators, please don\'t hesitate to reach out to us.\n\n'
                        'Company: Hilmost Software Corporation\n'
                        'Address:\n'
                        '84 Broughton Drive\n'
                        'Sunridge\n'
                        'Harare\n'
                        'Harare Metropolitan\n'
                        'Zimbabwe\n\n'
                        'Phone: +263772934762\n'
                        'Email: ',
                  ),
                  TextSpan(
                    text: 'support@hilmost.net',
                    style: TextStyle(
                      color: Theme.of(context).primaryColor,
                      decoration: TextDecoration.underline,
                    ),
                    recognizer: _emailTapRecognizer,
                  ),
                  const TextSpan(
                    text: '\n\nWe strive to respond to all inquiries within 24-48 business hours.',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

