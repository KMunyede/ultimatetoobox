import 'package:flutter/material.dart';

class AdSenseCompliantShell extends StatelessWidget {
  final Widget toolUi;
  final String explanationText;
  final String slotId;

  const AdSenseCompliantShell({
    super.key,
    required this.toolUi,
    required this.explanationText,
    required this.slotId,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // 1. Tool UI mounts at the top
          toolUi,

          const SizedBox(height: 24),

          // 2. Explicitly sized Ad Slot (CLS Prevention)
          // Note: In a real implementation, the platform view 'ad-slot-$slotId' 
          // must be registered in main.dart or during app initialization.
          Center(
            child: Container(
              width: double.infinity,
              constraints: const BoxConstraints(maxWidth: 728),
              child: Column(
                children: [
                  const Text(
                    'ADVERTISEMENT',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: Colors.grey,
                      letterSpacing: 1.5,
                    ),
                  ),
                  const SizedBox(height: 4),
                  SizedBox(
                    height: 90,
                    child: HtmlElementView(
                      viewType: 'ad-slot-$slotId',
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 32),

          // 3. Rich Text Content (AdSense Compliance & SEO)
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.grey.withOpacity(0.05),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.grey.withOpacity(0.1)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(Icons.info_outline, size: 20, color: Colors.blueGrey),
                    SizedBox(width: 8),
                    Text(
                      'Information & Documentation',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.blueGrey,
                      ),
                    ),
                  ],
                ),
                const Divider(height: 32),
                Text(
                  explanationText,
                  style: TextStyle(
                    fontSize: 15,
                    height: 1.6,
                    color: Colors.black.withOpacity(0.8),
                  ),
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 48),
        ],
      ),
    );
  }
}
