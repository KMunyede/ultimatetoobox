import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../shared/widgets/ad_slot_widget.dart';
import '../../shared/widgets/pop_out_tile.dart';
import '../../core/theme/app_theme.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final bool isMobile = screenWidth < 800;

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(vertical: 32),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 900),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildSectionTitle('CATEGORIES'),
              const SizedBox(height: 16),
              _buildCategories(context, isMobile),
              const SizedBox(height: 48),

              _buildSectionTitle('FEATURED TOOLS'),
              const SizedBox(height: 16),
              _buildFeatured(context, isMobile),
              const SizedBox(height: 48),

              _buildSectionTitle('TRENDING TODAY'),
              const SizedBox(height: 16),
              _buildTrending(context, isMobile),
              const SizedBox(height: 48),

              const Center(
                child: AdSlotWidget(
                  slotId: 'ad_home_bottom',
                  adUnitPath: '/1234567/home_bottom',
                  width: 728,
                  height: 90,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w800,
        letterSpacing: 1.2,
        color: AppTheme.textSecondaryLight,
      ),
    );
  }

  Widget _buildCategories(BuildContext context, bool isMobile) {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      children: [
        _buildCategoryCard(context, isMobile, 'Calculators', '38 tools', Icons.calculate, '/calculator'),
        _buildCategoryCard(context, isMobile, 'Converters', '45 tools', Icons.swap_horiz, '/units'),
        _buildCategoryCard(context, isMobile, 'Finance', '22 tools', Icons.bar_chart, '/finance'),
        _buildCategoryCard(context, isMobile, 'Weather', '8 tools', Icons.cloud_outlined, '/stub'),
        _buildCategoryCard(context, isMobile, 'Health & Fitness', '19 tools', Icons.favorite_border, '/bmi'),
        _buildCategoryCard(context, isMobile, 'Developer', '31 tools', Icons.code, '/stub'),
        _buildCategoryCard(context, isMobile, 'AI Utilities', '14 tools', Icons.smart_toy_outlined, '/stub'),
        _buildCategoryCard(context, isMobile, 'Text & Data', '26 tools', Icons.edit_outlined, '/text-and-data'),
      ],
    );
  }

  Widget _buildCategoryCard(BuildContext context, bool isMobile, String title, String subtitle, IconData icon, String route) {
    final width = isMobile ? double.infinity : 280.0;
    
    return SizedBox(
      width: width,
      child: PopOutTile(
        onTap: () => context.go(route),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: AppTheme.surfaceLight,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppTheme.borderLight),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.02),
                blurRadius: 10,
                offset: const Offset(0, 4),
              )
            ],
          ),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.primaryBrand.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: AppTheme.primaryBrand, size: 28),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                        color: AppTheme.textPrimaryLight,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      subtitle,
                      style: const TextStyle(
                        fontSize: 13,
                        color: AppTheme.textSecondaryLight,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFeatured(BuildContext context, bool isMobile) {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      children: [
        _buildFeaturedCard(context, isMobile, 'Currency Converter', '180+ live exchange rates', Icons.currency_exchange, 'HOT', AppTheme.accentColor, '/finance'),
        _buildFeaturedCard(context, isMobile, 'Mortgage Calculator', 'Monthly payments & amortization', Icons.home_work_outlined, 'HOT', AppTheme.accentColor, '/finance'),
        _buildFeaturedCard(context, isMobile, 'AI Text Summariser', 'Condense any article instantly', Icons.auto_awesome, 'NEW', AppTheme.secondaryBrand, '/stub'),
        _buildFeaturedCard(context, isMobile, 'Unit Converter', 'Length, mass, temp, volume', Icons.straighten, 'HOT', AppTheme.accentColor, '/units'),
      ],
    );
  }

  Widget _buildFeaturedCard(BuildContext context, bool isMobile, String title, String subtitle, IconData icon, String badge, Color badgeColor, String route) {
    final width = isMobile ? double.infinity : 430.0;
    
    return SizedBox(
      width: width,
      child: PopOutTile(
        onTap: () => context.go(route),
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: AppTheme.surfaceLight,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppTheme.borderLight),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.04),
                blurRadius: 15,
                offset: const Offset(0, 5),
              )
            ],
          ),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: badgeColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Icon(icon, color: badgeColor, size: 32),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            title,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                              color: AppTheme.textPrimaryLight,
                            ),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: badgeColor.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            badge,
                            style: TextStyle(
                              color: badgeColor,
                              fontSize: 10,
                              fontWeight: FontWeight.w900,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      subtitle,
                      style: const TextStyle(
                        fontSize: 14,
                        color: AppTheme.textSecondaryLight,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTrending(BuildContext context, bool isMobile) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        _buildTrendingChip('UV index', Icons.wb_sunny_outlined),
        _buildTrendingChip('PDF to Word', Icons.picture_as_pdf_outlined),
        _buildTrendingChip('Password gen', Icons.lock_outline),
        _buildTrendingChip('Age calc', Icons.cake_outlined),
        _buildTrendingChip('Electricity calc', Icons.bolt_outlined),
        _buildTrendingChip('VAT calc', Icons.percent),
      ],
    );
  }

  Widget _buildTrendingChip(String title, IconData icon) {
    return InkWell(
      onTap: () {},
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: AppTheme.surfaceLight,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppTheme.borderLight),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 18, color: AppTheme.primaryBrand),
            const SizedBox(width: 8),
            Text(
              title,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: AppTheme.textPrimaryLight,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
