import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../shared/widgets/ad_slot_widget.dart';
import '../../shared/widgets/pop_out_tile.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final bool isMobile = screenWidth < 800;

    // The maximum width for the centered home content
    final double maxContentWidth = 800;

    return Center(
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: maxContentWidth),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 32),
              
              _buildCategories(context, isMobile ? 2 : 3),
              const SizedBox(height: 48),
              
              _buildFeatured(context, isMobile ? 1 : 2),
              const SizedBox(height: 48),
              
              _buildTrendingSidebar(),
              const SizedBox(height: 48),
              
              // Bottom Advert
              const AdSlotWidget(
                slotId: 'ad_home_bottom',
                adUnitPath: '/1234567/home_bottom',
                width: 728,
                height: 90,
              ),
              const SizedBox(height: 48),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCategories(BuildContext context, int crossAxisCount) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'CATEGORIES',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, letterSpacing: 1.2, color: Colors.black87),
        ),
        const SizedBox(height: 16),
        GridView.count(
          crossAxisCount: crossAxisCount,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
          childAspectRatio: 2.2, // Adjusted for 3 columns to maintain proportional height
          children: [
            _buildCategoryTile('Calculators', '38 tools', Icons.calculate, const Color(0xFFE8F0FE), () => context.go('/calculator')),
            _buildCategoryTile('Converters', '45 tools', Icons.swap_horiz, const Color(0xFFFEF3E8), () => context.go('/units')),
            _buildCategoryTile('Finance', '22 tools', Icons.bar_chart, const Color(0xFFE8F5E9), () => context.go('/currency')),
            _buildCategoryTile('Weather', '8 tools', Icons.cloud_outlined, const Color(0xFFE1F5FE), () => context.go('/stub')),
            _buildCategoryTile('Health & Fitness', '19 tools', Icons.favorite_border, const Color(0xFFFFEBEE), () => context.go('/bmi')),
            _buildCategoryTile('Developer', '31 tools', Icons.code, const Color(0xFFF3E5F5), () => context.go('/stub')),
            _buildCategoryTile('AI Utilities', '14 tools', Icons.smart_toy_outlined, const Color(0xFFE8EAF6), () => context.go('/stub')),
            _buildCategoryTile('Text & Writing', '26 tools', Icons.edit_outlined, const Color(0xFFFCE4EC), () => context.go('/stub')),
          ],
        ),
      ],
    );
  }

  Widget _buildCategoryTile(String title, String subtitle, IconData icon, Color iconBg, VoidCallback onTap) {
    Widget titleWidget;
    if (title.contains(' ')) {
      titleWidget = Text(
        title.replaceAll(' ', '\n'),
        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.black87, height: 1.1),
      );
    } else {
      titleWidget = FittedBox(
        fit: BoxFit.scaleDown,
        alignment: Alignment.centerLeft,
        child: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Colors.black87),
        ),
      );
    }

    return PopOutTile(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(color: iconBg, borderRadius: BorderRadius.circular(8)),
              child: Icon(icon, color: Colors.black87, size: 24),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: SingleChildScrollView(
                physics: const NeverScrollableScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    titleWidget,
                    const SizedBox(height: 4),
                    Text(subtitle, style: const TextStyle(fontSize: 12, color: Colors.black54)),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeatured(BuildContext context, int crossAxisCount) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'FEATURED',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, letterSpacing: 1.2, color: Colors.black87),
        ),
        const SizedBox(height: 16),
        GridView.count(
          crossAxisCount: crossAxisCount,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
          childAspectRatio: 1.8, // Decreased aspect ratio to make tile taller and allow text wrapping
          children: [
            _buildFeaturedTile('Currency converter', '180+ live exchange rates', Icons.currency_exchange, const Color(0xFFFFEBEE), 'HOT', Colors.red, () => context.go('/currency')),
            _buildFeaturedTile('Mortgage calculator', 'Monthly payments & amortization', Icons.calculate_outlined, const Color(0xFFE8F5E9), 'HOT', Colors.grey, () => context.go('/calculator')),
            _buildFeaturedTile('AI text summariser', 'Condense any article instantly', Icons.subject, const Color(0xFFE8EAF6), 'NEW', Colors.green, () => context.go('/stub')),
            _buildFeaturedTile('Unit converter', 'Length, mass, temp, volume', Icons.straighten, const Color(0xFFFFEBEE), 'HOT', Colors.grey, () => context.go('/units')),
            _buildFeaturedTile('BMI calculator', 'With health classification', Icons.monitor_weight_outlined, const Color(0xFFE1F5FE), 'NEW', Colors.green, () => context.go('/bmi')),
            _buildFeaturedTile('Compound interest', 'Investment growth projections', Icons.trending_up, const Color(0xFFFEF3E8), 'NEW', Colors.green, () => context.go('/stub')),
          ],
        ),
      ],
    );
  }

  Widget _buildFeaturedTile(String title, String subtitle, IconData icon, Color iconBg, String badgeText, Color badgeColor, VoidCallback onTap) {
    return PopOutTile(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(color: iconBg, borderRadius: BorderRadius.circular(8)),
              child: Icon(icon, color: Colors.black87, size: 24),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: SingleChildScrollView(
                physics: const NeverScrollableScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      children: [
                        // Removed TextOverflow.ellipsis to let the text wrap
                        Expanded(child: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.black87))),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(color: badgeColor.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(4)),
                          child: Text(badgeText, style: TextStyle(color: badgeColor, fontSize: 10, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    // Removed TextOverflow.ellipsis to let the text wrap
                    Text(subtitle, style: const TextStyle(fontSize: 12, color: Colors.black54)),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTrendingSidebar() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Trending today',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.black87),
        ),
        const SizedBox(height: 16),
        _buildTrendingItem('UV index', Icons.wb_sunny_outlined, Colors.orange),
        _buildTrendingItem('PDF to Word', Icons.picture_as_pdf_outlined, Colors.blue),
        _buildTrendingItem('Password gen', Icons.lock_outline, Colors.green),
        _buildTrendingItem('Age calc', Icons.cake_outlined, Colors.red),
        _buildTrendingItem('Electricity cost', Icons.bolt_outlined, Colors.orange),
        _buildTrendingItem('VAT / tax calc', Icons.percent, Colors.green),
      ],
    );
  }

  Widget _buildTrendingItem(String title, IconData icon, Color color) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Icon(icon, size: 16, color: color),
          ),
          const SizedBox(width: 12),
          Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500, color: Colors.black87)),
        ],
      ),
    );
  }
}
