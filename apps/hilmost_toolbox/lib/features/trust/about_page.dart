import 'package:flutter/material.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

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
              'About Us',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 16),
            const Text(
              'Hilmost Ultimate Toolbox is developed and maintained by Hilmost Software Corporation. Our mission is to provide free, high-quality, and completely private online tools for everyone.\n\n'
              'Why we built it:\n'
              'We believe that fundamental utilities—like calculators, currency converters, and physics solvers—should be universally accessible, lightning-fast, and completely secure. That means no sign-ups, no tracking of your mathematical inputs, and no paywalls. We created this suite of tools to serve students, professionals, and everyday users who need quick answers without the friction of bloated software.\n\n'
              'Whether you\'re checking your BMI, splitting a bill at a restaurant, or converting complex scientific units, Hilmost Software Corporation is dedicated to giving you the best possible digital experience.',
              style: TextStyle(fontSize: 16, height: 1.5),
            ),
          ],
        ),
      ),
    );
  }
}
