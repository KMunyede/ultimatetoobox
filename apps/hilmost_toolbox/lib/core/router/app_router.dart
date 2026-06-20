import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../seo/seo_engine.dart';
import '../../features/shell/shell_layout.dart';
import '../../features/home/home_page.dart';
import '../../features/tools/bmi/bmi_page.dart';
import '../../features/tools/units/unit_page.dart';
import '../../features/tools/currency/currency_page.dart';
import '../../features/tools/calculator/calculator_page.dart';
import '../../features/tools/physics/physics_page.dart';
import '../../features/tools/finance/finance_page.dart';
import '../../features/stub/stub_page.dart';
import '../../features/trust/privacy_policy_page.dart';
import '../../features/trust/terms_of_service_page.dart';
import '../../features/trust/contact_page.dart';
import '../../features/trust/about_page.dart';
import '../../features/tools/text/text_page.dart';
import '../../features/tools/text/word_unscrambler_page.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    // Global listener for SEO updates
    redirect: (context, state) {
      ToolSeoEngine.updateForPath(state.matchedLocation);
      return null;
    },
    routes: [
      ShellRoute(
        builder: (context, state, child) {
          return ShellLayout(child: child);
        },
        routes: [
          GoRoute(path: '/', builder: (context, state) => const HomePage()),
          GoRoute(path: '/bmi', builder: (context, state) => const BmiPage()),
          GoRoute(
            path: '/units',
            builder: (context, state) => const UnitPage(),
          ),
          GoRoute(
            path: '/finance',
            builder: (context, state) => const FinancePage(),
          ),
          GoRoute(
            path: '/calculator',
            builder: (context, state) => const CalculatorPage(),
          ),
          GoRoute(
            path: '/physics',
            builder: (context, state) => const PhysicsPage(),
          ),
          GoRoute(path: '/stub', builder: (context, state) => const StubPage()),
          GoRoute(path: '/text-and-data', builder: (context, state) => const TextPage()),
          GoRoute(
            path: '/text-and-data/word-unscrambler',
            builder: (context, state) => const WordUnscramblerPage(),
          ),
          GoRoute(
            path: '/privacy-policy',
            builder: (context, state) => const PrivacyPolicyPage(),
          ),
          GoRoute(
            path: '/about',
            builder: (context, state) => const AboutPage(),
          ),
          GoRoute(
            path: '/terms',
            builder: (context, state) => const TermsOfServicePage(),
          ),
          GoRoute(
            path: '/contact',
            builder: (context, state) => const ContactPage(),
          ),
        ],
      ),
    ],
  );
});
