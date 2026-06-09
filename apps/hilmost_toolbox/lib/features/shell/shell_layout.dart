import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_theme.dart';
import '../../shared/widgets/ad_slot_widget.dart';
import '../../core/providers/global_settings_provider.dart';
import '../tools/calculator/calculator_state.dart';

class ShellLayout extends ConsumerWidget {
  final Widget child;

  const ShellLayout({super.key, required this.child});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final screenWidth = MediaQuery.of(context).size.width;
    final bool isDesktop = screenWidth >= 1200; // Show side rails on typical desktop screens
    final bool isTablet = screenWidth >= 800 && screenWidth < 1200;
    final bool isMobile = screenWidth < 800;

    final double safeHeight = MediaQuery.of(context).size.height - (isMobile ? 120 : 60);
    final double finalHeight = safeHeight > 600 ? safeHeight : 600;

    return Scaffold(
      backgroundColor: AppTheme.offWhite,
      drawer: isMobile ? _buildMobileDrawer(context) : null,
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildTopBar(context, ref, screenWidth),
            const SizedBox(height: 10),
            SizedBox(
              height: finalHeight,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Left Sidebar Navigation
                  if (screenWidth >= 1000)
                    Container(
                      width: 240,
                      padding: const EdgeInsets.only(right: 24),
                      child: _buildSidebar(context),
                    ),

                  // Left Rail Advert
                  if (isDesktop)
                    const Padding(
                      padding: EdgeInsets.only(right: 20.0),
                      child: Align(
                        alignment: Alignment.topCenter,
                        child: AdSlotWidget(
                          slotId: 'ad_left_rail',
                          adUnitPath: '/1234567/toolbox_left_rail',
                          width: 160,
                          height: 600,
                        ),
                      ),
                    ),

                  // Center Content
                  Expanded(
                    child: Container(
                      constraints: const BoxConstraints(maxWidth: 1400),
                      padding: EdgeInsets.symmetric(horizontal: isDesktop || isTablet ? 0 : 16),
                      child: child,
                    ),
                  ),

                  // Right Rail (only on very large screens)
                  if (isDesktop)
                    const Padding(
                      padding: EdgeInsets.only(left: 20.0),
                      child: Align(
                        alignment: Alignment.topCenter,
                        child: AdSlotWidget(
                          slotId: 'ad_right_rail',
                          adUnitPath: '/1234567/toolbox_right_rail',
                          width: 160,
                          height: 600,
                        ),
                      ),
                    ),
                    
                  // Right Visual Balance Spacer
                  if (screenWidth >= 1000)
                    const SizedBox(width: 24),
                ],
              ),
            ),
            const SizedBox(height: 64),
            _buildFooter(screenWidth),
          ],
        ),
      ),
    );
  }

  Widget _buildTopBar(BuildContext context, WidgetRef ref, double screenWidth) {
    final bool isMobile = screenWidth < 800;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      color: AppTheme.offWhite,
      child: isMobile
          ? Column(
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.menu),
                      onPressed: () => Scaffold.of(context).openDrawer(),
                    ),
                    _buildLogoRow(context),
                  ]
                ),
                const SizedBox(height: 16),
                const SizedBox(height: 16),
                _buildSearchBar(context, ref),
                const SizedBox(height: 16),
                _buildSciFiToggle(ref),
                const SizedBox(height: 16),
                _buildTopLinks(context),
              ],
            )
          : Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildLogoRow(context),
                const SizedBox(width: 32),
                _buildSearchBar(context, ref),
                const SizedBox(width: 32),
                _buildSciFiToggle(ref),
              ],
            ),
    );
  }

  Widget _buildSciFiToggle(WidgetRef ref) {
    final isSciFi = ref.watch(sciFiProvider);
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Text('Sci-Fi', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.black54)),
        Switch(
          value: isSciFi,
          onChanged: (_) => ref.read(sciFiProvider.notifier).toggle(),
        ),
      ],
    );
  }

  Widget _buildSearchBar(BuildContext context, WidgetRef ref) {
    final List<Map<String, dynamic>> searchOptions = [
      {'name': 'Standard Calculator', 'route': '/calculator', 'calcMode': CalculatorMode.standard},
      {'name': 'Scientific Calculator', 'route': '/calculator', 'calcMode': CalculatorMode.scientific},
      {'name': 'Graph Plotter', 'route': '/calculator', 'calcMode': CalculatorMode.graphPlotter},
      {'name': 'Astrophysics Calculator', 'route': '/calculator', 'calcMode': CalculatorMode.astroPhysics},
      {'name': 'Science Equation Calculator', 'route': '/calculator', 'calcMode': CalculatorMode.scienceEquation},
      {'name': 'Currency Converter', 'route': '/currency'},
      {'name': 'Unit Converter', 'route': '/units'},
      {'name': 'BMI Calculator', 'route': '/bmi'},
    ];

    return Container(
      width: 325,
      height: 48,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.grey.withAlpha(50)),
      ),
      child: Autocomplete<Map<String, dynamic>>(
        optionsBuilder: (TextEditingValue textEditingValue) {
          if (textEditingValue.text.isEmpty) {
            return const Iterable<Map<String, dynamic>>.empty();
          }
          return searchOptions.where((option) {
            return option['name']!.toLowerCase().contains(textEditingValue.text.toLowerCase());
          });
        },
        displayStringForOption: (option) => option['name']!,
        onSelected: (option) {
          if (option.containsKey('calcMode')) {
            ref.read(calculatorControllerProvider.notifier).setMode(option['calcMode']);
          }
          context.go(option['route']!);
        },
        fieldViewBuilder: (context, textEditingController, focusNode, onFieldSubmitted) {
          return TextField(
            controller: textEditingController,
            focusNode: focusNode,
            decoration: const InputDecoration(
              hintText: 'Search tools...',
              prefixIcon: Icon(Icons.search, size: 20, color: Colors.grey),
              border: InputBorder.none,
              contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            ),
            onSubmitted: (String value) {
              // Autocomplete's onFieldSubmitted triggers onSelected IF an item is highlighted.
              // To ensure Enter always works even if they just typed a partial match without highlighting:
              final matches = searchOptions.where((opt) => opt['name']!.toLowerCase().contains(value.toLowerCase()));
              if (matches.isNotEmpty) {
                final option = matches.first;
                if (option.containsKey('calcMode')) {
                  ref.read(calculatorControllerProvider.notifier).setMode(option['calcMode']);
                }
                context.go(option['route']!);
              } else {
                onFieldSubmitted();
              }
            },
          );
        },
        optionsViewBuilder: (context, onSelected, options) {
          return Align(
            alignment: Alignment.topLeft,
            child: Material(
              elevation: 4,
              borderRadius: BorderRadius.circular(8),
              child: SizedBox(
                width: 325,
                child: ListView.builder(
                  padding: EdgeInsets.zero,
                  shrinkWrap: true,
                  itemCount: options.length,
                  itemBuilder: (context, index) {
                    final option = options.elementAt(index);
                    return ListTile(
                      title: Text(option['name']!),
                      onTap: () => onSelected(option),
                    );
                  },
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildLogoRow(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Padding(
          padding: const EdgeInsets.only(right: 8.0),
          child: IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.black54),
            onPressed: () {
              if (context.canPop()) {
                context.pop();
              } else {
                context.go('/');
              }
            },
            tooltip: 'Go Back',
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(right: 8.0),
          child: IconButton(
            icon: const Icon(Icons.home_outlined, color: Colors.black54),
            onPressed: () => context.go('/'),
            tooltip: 'Home',
          ),
        ),
        Container(
          padding: const EdgeInsets.all(6),
          decoration: BoxDecoration(
            color: AppTheme.primaryPurpleDark,
            borderRadius: BorderRadius.circular(8),
          ),
          child: const Text('H', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
        ),
        const SizedBox(width: 12),
        const Text(
          'HILMOST',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black54),
        ),
        const SizedBox(width: 8),
        const Text(
          'Ultimate Toolbox',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.black87),
        ),
      ],
    );
  }

  Widget _buildTopLinks(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        _buildTopLink(context, 'Home', true),
        _buildTopLink(context, 'Categories', false),
        _buildTopLink(context, 'Popular', false),
        _buildTopLink(context, 'New', false),
        _buildTopLink(context, 'About', false),
      ],
    );
  }

  Widget _buildTopLink(BuildContext context, String text, bool isActive) {
    return InkWell(
      onTap: () {
        if (text == 'Home') {
          context.go('/');
        }
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0),
        child: Text(
          text,
          style: TextStyle(
            color: isActive ? Colors.black87 : Colors.black54,
            fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
            fontSize: 15,
          ),
        ),
      ),
    );
  }

  Widget _buildSidebar(BuildContext context) {
    return ListView(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      children: [
        const Text('TOOLS', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.black38, letterSpacing: 1.2)),
        const SizedBox(height: 16),
        _buildSidebarItem(context, 'Home', Icons.home_outlined, '/'),
        _buildSidebarItem(context, 'Calculators', Icons.calculate, '/calculator'),
        _buildSidebarItem(context, 'Converters', Icons.swap_horiz, '/units'),
        _buildSidebarItem(context, 'Finance', Icons.bar_chart, '/currency'),
        _buildSidebarItem(context, 'Weather', Icons.cloud_outlined, '/stub'),
        _buildSidebarItem(context, 'Health & Fitness', Icons.favorite_border, '/bmi'),
        _buildSidebarItem(context, 'Developer', Icons.code, '/stub'),
        _buildSidebarItem(context, 'AI Utilities', Icons.smart_toy_outlined, '/stub'),
        _buildSidebarItem(context, 'Text & Writing', Icons.edit_outlined, '/stub'),
      ],
    );
  }

  Widget _buildSidebarItem(BuildContext context, String title, IconData icon, String route) {
    final bool isActive = GoRouterState.of(context).uri.toString() == route ||
        (route != '/' && GoRouterState.of(context).uri.toString().startsWith(route));
    
    return ListTile(
      leading: Icon(icon, color: isActive ? AppTheme.primaryPurpleDark : Colors.black54),
      title: Text(
        title,
        style: TextStyle(
          fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
          color: isActive ? AppTheme.primaryPurpleDark : Colors.black87,
        ),
      ),
      selected: isActive,
      selectedTileColor: AppTheme.primaryPurpleDark.withValues(alpha: 0.1),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      onTap: () {
        if (MediaQuery.of(context).size.width < 800) {
          Navigator.of(context).pop(); // Close the mobile drawer
        }
        context.go(route);
      },
    );
  }

  Widget _buildMobileDrawer(BuildContext context) {
    return Drawer(
      backgroundColor: AppTheme.offWhite,
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildLogoRow(context),
              const SizedBox(height: 32),
              _buildSidebar(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFooter(double screenWidth) {
    final bool isMobile = screenWidth < 800;
    return Container(
      width: double.infinity,
      color: AppTheme.offWhite,
      padding: const EdgeInsets.only(bottom: 32),
      child: Column(
        children: [
          AdSlotWidget(
            slotId: 'ad_footer',
            adUnitPath: '/1234567/toolbox_footer',
            width: isMobile ? 320 : 728,
            height: isMobile ? 50 : 90,
          ),
          const SizedBox(height: 16),
          const Text(
            '© 2026 Hilmost Software Corporation. All tools are free.',
            style: TextStyle(color: Colors.black54, fontSize: 13, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }
}
