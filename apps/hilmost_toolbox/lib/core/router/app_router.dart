import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/shell/shell_layout.dart';
import '../../features/home/home_page.dart';
import '../../features/tools/bmi/bmi_page.dart';
import '../../features/tools/units/unit_page.dart';
import '../../features/tools/currency/currency_page.dart';
import '../../features/tools/calculator/calculator_page.dart';
import '../../features/tools/physics/physics_page.dart';
import '../../features/stub/stub_page.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      ShellRoute(
        builder: (context, state, child) {
          return ShellLayout(child: child);
        },
        routes: [
          GoRoute(
            path: '/',
            builder: (context, state) => const HomePage(),
          ),
          GoRoute(
            path: '/bmi',
            builder: (context, state) => const BmiPage(),
          ),
          GoRoute(
            path: '/units',
            builder: (context, state) => const UnitPage(),
          ),
          GoRoute(
            path: '/currency',
            builder: (context, state) => const CurrencyPage(),
          ),
          GoRoute(
            path: '/calculator',
            builder: (context, state) => const CalculatorPage(),
          ),
          GoRoute(
            path: '/physics',
            builder: (context, state) => const PhysicsPage(),
          ),
          GoRoute(
            path: '/stub',
            builder: (context, state) => const StubPage(),
          ),
        ],
      ),
    ],
  );
});
