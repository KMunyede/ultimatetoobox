import 'package:flutter/material.dart';

class AdaptiveToolShell extends StatelessWidget {
  final Widget toolContent;
  final Widget navigationList;
  final Widget utilityPanel;
  final String title;

  const AdaptiveToolShell({
    super.key,
    required this.toolContent,
    required this.navigationList,
    required this.utilityPanel,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return OrientationBuilder(
          builder: (context, orientation) {
            final isMobile = constraints.maxWidth < 600;
            final isDesktop = constraints.maxWidth >= 1025;

            if (isMobile) {
              // Mobile / Portrait Layout
              return Scaffold(
                appBar: AppBar(
                  title: Text(
                    title,
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  centerTitle: true,
                ),
                drawer: Drawer(
                  child: Column(
                    children: [
                      const DrawerHeader(
                        decoration: BoxDecoration(color: Colors.blueAccent),
                        child: Center(
                          child: Text(
                            'Toolbox Menu',
                            style: TextStyle(color: Colors.white, fontSize: 24),
                          ),
                        ),
                      ),
                      Expanded(child: navigationList),
                    ],
                  ),
                ),
                body: SafeArea(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(16.0),
                    child: toolContent,
                  ),
                ),
              );
            } else if (isDesktop) {
              // Landscape Desktop / Three-Column Matrix
              return Scaffold(
                body: Row(
                  children: [
                    // Left Fixed Selector Panel
                    SizedBox(
                      width: 300,
                      child: Container(
                        decoration: BoxDecoration(
                          border: Border(
                            right: BorderSide(
                              color: Colors.grey.withOpacity(0.2),
                            ),
                          ),
                        ),
                        child: Column(
                          children: [
                            const Padding(
                              padding: EdgeInsets.all(24.0),
                              child: Text(
                                'Navigation',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Expanded(child: navigationList),
                          ],
                        ),
                      ),
                    ),

                    // Central Flexible Main Layout Area
                    Expanded(
                      flex: 3,
                      child: Container(
                        color: Colors.grey.withOpacity(0.02),
                        child: Center(
                          child: ConstrainedBox(
                            constraints: const BoxConstraints(maxWidth: 900),
                            child: SingleChildScrollView(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 40,
                                vertical: 24,
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    title,
                                    style: Theme.of(context)
                                        .textTheme
                                        .headlineMedium
                                        ?.copyWith(
                                          fontWeight: FontWeight.w900,
                                          color: const Color(0xFF0F172A), // slate-900
                                        ),
                                  ),
                                  const SizedBox(height: 24),
                                  toolContent,
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),

                    // Right-Aligned Utility Column
                    SizedBox(
                      width: 320,
                      child: Container(
                        decoration: BoxDecoration(
                          border: Border(
                            left: BorderSide(
                              color: Colors.grey.withOpacity(0.2),
                            ),
                          ),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(24.0),
                          child: utilityPanel,
                        ),
                      ),
                    ),
                  ],
                ),
              );
            } else {
              // Tablet / Mid-range Layout (Two Column)
              return Scaffold(
                appBar: AppBar(title: Text(title)),
                body: Row(
                  children: [
                    SizedBox(width: 250, child: navigationList),
                    Expanded(
                      child: SingleChildScrollView(
                        padding: const EdgeInsets.all(24.0),
                        child: toolContent,
                      ),
                    ),
                  ],
                ),
              );
            }
          },
        );
      },
    );
  }
}
