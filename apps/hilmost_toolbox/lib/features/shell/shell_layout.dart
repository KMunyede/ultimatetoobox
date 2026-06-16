import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_theme.dart';
import '../../shared/widgets/ad_slot_widget.dart';
import '../../core/providers/global_settings_provider.dart';
import '../tools/calculator/calculator_state.dart';
import '../tools/finance/finance_state.dart';

class ShellLayout extends ConsumerWidget {
  final Widget child;

  const ShellLayout({super.key, required this.child});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final screenWidth = MediaQuery.of(context).size.width;
    final bool isDesktop =
        screenWidth >= 1200; // Show side rails on typical desktop screens
    final bool isTablet = screenWidth >= 800 && screenWidth < 1200;
    final bool isMobile = screenWidth < 800;

    final double safeHeight =
        MediaQuery.of(context).size.height - (isMobile ? 120 : 60);
    final double finalHeight = safeHeight > 600 ? safeHeight : 600;

    return Scaffold(
      backgroundColor: AppTheme.bgLight,
      drawer: isMobile ? _buildMobileDrawer(context) : null,
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
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
                      constraints: const BoxConstraints(maxWidth: 1000),
                      padding: EdgeInsets.symmetric(
                        horizontal: isDesktop || isTablet ? 0 : 16,
                      ),
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
                  if (screenWidth >= 1000) const SizedBox(width: 24),
                ],
              ),
            ),
            const SizedBox(height: 64),
            _buildFooter(context, screenWidth),
          ],
        ),
      ),
          ),
        ],
      ),
    );
  }

  Widget _buildTopBar(BuildContext context, WidgetRef ref, double screenWidth) {
    final bool isMobile = screenWidth < 800;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      color: const Color(0xFF1b638f),
      child: isMobile
          ? Column(
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.menu),
                      onPressed: () => Scaffold.of(context).openDrawer(),
                    ),
                    Expanded(child: _buildLogoRow(context, isMobile: true)),
                  ],
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
                _buildLogoRow(context, isMobile: false),
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
        const Text(
          'Sci-Fi',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Colors.white70,
          ),
        ),
        Switch(
          value: isSciFi,
          onChanged: (_) => ref.read(sciFiProvider.notifier).toggle(),
        ),
      ],
    );
  }

  Widget _buildSearchBar(BuildContext context, WidgetRef ref) {
    final List<Map<String, dynamic>> searchOptions = [
      {
        'name': 'Standard Calculator',
        'route': '/calculator',
        'calcMode': CalculatorMode.standard,
      },
      {
        'name': 'Scientific Calculator',
        'route': '/calculator',
        'calcMode': CalculatorMode.scientific,
      },
      {
        'name': 'Astrophysics Calculator',
        'route': '/calculator',
        'calcMode': CalculatorMode.astroPhysics,
      },
      {
        'name': 'Science Equation Calculator',
        'route': '/calculator',
        'calcMode': CalculatorMode.scienceEquation,
      },
      {
        'name': 'Currency Converter',
        'route': '/finance',
        'financeMode': FinanceMode.currency,
      },
      {
        'name': 'Loan/EMI Calculator',
        'route': '/finance',
        'financeMode': FinanceMode.loan,
      },
      {
        'name': 'Compound Interest',
        'route': '/finance',
        'financeMode': FinanceMode.compound,
      },
      {'name': 'Unit Converter', 'route': '/units'},
      {'name': 'BMI Calculator', 'route': '/bmi'},
      {'name': 'Word Unscrambler', 'route': '/text-and-data/word-unscrambler'},
      {'name': 'Text, Data & Files Tools', 'route': '/text-and-data'},
    ];

    return Container(
      constraints: const BoxConstraints(maxWidth: 325),
      width: double.infinity,
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
            return option['name']!.toLowerCase().contains(
              textEditingValue.text.toLowerCase(),
            );
          });
        },
        displayStringForOption: (option) => option['name']!,
        onSelected: (option) {
          if (option.containsKey('calcMode')) {
            ref
                .read(calculatorControllerProvider.notifier)
                .setMode(option['calcMode']);
          } else if (option.containsKey('financeMode')) {
            ref
                .read(financeControllerProvider.notifier)
                .setMode(option['financeMode']);
          }
          context.go(option['route']!);
        },
        fieldViewBuilder:
            (context, textEditingController, focusNode, onFieldSubmitted) {
              return TextField(
                controller: textEditingController,
                focusNode: focusNode,
                decoration: const InputDecoration(
                  hintText: 'Search tools...',
                  prefixIcon: Icon(Icons.search, size: 20, color: Colors.grey),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                ),
                onSubmitted: (String value) {
                  // Autocomplete's onFieldSubmitted triggers onSelected IF an item is highlighted.
                  // To ensure Enter always works even if they just typed a partial match without highlighting:
                  final matches = searchOptions.where(
                    (opt) => opt['name']!.toLowerCase().contains(
                      value.toLowerCase(),
                    ),
                  );
                  if (matches.isNotEmpty) {
                    final option = matches.first;
                    if (option.containsKey('calcMode')) {
                      ref
                          .read(calculatorControllerProvider.notifier)
                          .setMode(option['calcMode']);
                    } else if (option.containsKey('financeMode')) {
                      ref
                          .read(financeControllerProvider.notifier)
                          .setMode(option['financeMode']);
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

  Widget _buildLogoRow(BuildContext context, {required bool isMobile}) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: IconButton(
              icon: const Icon(Icons.arrow_back, color: Colors.white70),
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
              icon: const Icon(Icons.home_outlined, color: Colors.white70),
              onPressed: () => context.go('/'),
              tooltip: 'Home',
            ),
          ),
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: Colors.white24,
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Text(
              'H',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
          ),
          const SizedBox(width: 12),
          const Text(
            'HILMOST',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.white70,
            ),
          ),
          const SizedBox(width: 8),
          const Text(
            'Ultimate Toolbox',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTopLinks(BuildContext context) {
    return Wrap(
      alignment: WrapAlignment.center,
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
            color: isActive ? Colors.white : Colors.white70,
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
        const Text(
          'TOOLS',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.black38,
            letterSpacing: 1.2,
          ),
        ),
        const SizedBox(height: 16),
        _buildSidebarItem(context, 'Home', Icons.home_outlined, '/'),
        _buildSidebarItem(
          context,
          'Calculators',
          Icons.calculate,
          '/calculator',
        ),
        _buildSidebarItem(context, 'Converters', Icons.swap_horiz, '/units'),
        _buildSidebarItem(context, 'Finance', Icons.bar_chart, '/finance'),
        _buildSidebarItem(context, 'Weather', Icons.cloud_outlined, '/stub'),
        _buildSidebarItem(
          context,
          'Health & Fitness',
          Icons.favorite_border,
          '/bmi',
        ),
        _buildSidebarItem(context, 'Developer', Icons.code, '/stub'),
        _buildSidebarItem(
          context,
          'AI Utilities',
          Icons.smart_toy_outlined,
          '/stub',
        ),
        _buildSidebarItem(
          context,
          'Text, Data & Files',
          Icons.edit_outlined,
          '/text-and-data',
        ),
      ],
    );
  }

  Widget _buildSidebarItem(
    BuildContext context,
    String title,
    IconData icon,
    String route,
  ) {
    final bool isActive =
        GoRouterState.of(context).uri.toString() == route ||
        (route != '/' &&
            GoRouterState.of(context).uri.toString().startsWith(route));

    return ListTile(
      leading: Icon(
        icon,
        color: isActive ? AppTheme.primaryBrand : Colors.black54,
      ),
      title: Text(
        title,
        style: TextStyle(
          fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
          color: isActive ? AppTheme.primaryBrand : Colors.black87,
        ),
      ),
      selected: isActive,
      selectedTileColor: AppTheme.primaryBrand.withValues(alpha: 0.1),
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
      backgroundColor: AppTheme.bgLight,
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildLogoRow(context, isMobile: true),
              const SizedBox(height: 32),
              _buildSidebar(context),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFooter(BuildContext context, double screenWidth) {
    final bool isMobile = screenWidth < 800;
    return Container(
      width: double.infinity,
      color: AppTheme.bgLight,
      padding: const EdgeInsets.only(bottom: 32),
      child: Column(
        children: [
          AdSlotWidget(
            slotId: 'ad_footer',
            adUnitPath: '/1234567/toolbox_footer',
            width: isMobile ? 320 : 728,
            height: isMobile ? 50 : 90,
          ),
          const SizedBox(height: 24),
          Wrap(
            alignment: WrapAlignment.center,
            spacing: 16,
            children: [
              TextButton(
                onPressed: () => context.go('/about'),
                child: const Text(
                  'About Us',
                  style: TextStyle(color: Colors.black54),
                ),
              ),
              TextButton(
                onPressed: () => context.go('/privacy-policy'),
                child: const Text(
                  'Privacy Policy',
                  style: TextStyle(color: Colors.black54),
                ),
              ),
              TextButton(
                onPressed: () => context.go('/terms'),
                child: const Text(
                  'Terms of Service',
                  style: TextStyle(color: Colors.black54),
                ),
              ),
              TextButton(
                onPressed: () => context.go('/contact'),
                child: const Text(
                  'Contact Us',
                  style: TextStyle(color: Colors.black54),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          const Text(
            '© 2026 Hilmost Software Corporation. All tools are free.',
            style: TextStyle(
              color: Colors.black54,
              fontSize: 13,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
