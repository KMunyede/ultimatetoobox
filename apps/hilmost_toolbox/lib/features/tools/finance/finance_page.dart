import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'finance_state.dart';
import '../currency/currency_page.dart';
import 'loan_calculator/loan_calculator_page.dart';
import 'compound_interest/compound_interest_page.dart';
import 'vat_calculator/vat_page.dart';
import 'salary_converter/salary_page.dart';
import 'tip_calculator/tip_page.dart';
import 'retirement_calculator/retirement_page.dart';
import 'income_tax_calculator/income_tax_page.dart';
import '../../../shared/widgets/ad_slot_widget.dart';
import '../../../shared/widgets/seo_text_accordion.dart';

class FinancePage extends ConsumerStatefulWidget {
  const FinancePage({super.key});

  @override
  ConsumerState<FinancePage> createState() => _FinancePageState();
}

class _FinancePageState extends ConsumerState<FinancePage> {
  final ScrollController _tabScrollController = ScrollController();

  @override
  void dispose() {
    _tabScrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(financeControllerProvider);
    final controller = ref.read(financeControllerProvider.notifier);
    final theme = Theme.of(context);

    String activeName = '';
    switch (state.mode) {
      case FinanceMode.currency:
        activeName = 'Currency Converter';
        break;
      case FinanceMode.loan:
        activeName = 'Loan/EMI Calculator';
        break;
      case FinanceMode.compound:
        activeName = 'Compound Interest';
        break;
      case FinanceMode.vat:
        activeName = 'VAT/Tax Calculator';
        break;
      case FinanceMode.salary:
        activeName = 'Salary Converter';
        break;
      case FinanceMode.tip:
        activeName = 'Tip Calculator';
        break;
      case FinanceMode.retirement:
        activeName = 'Retirement Planner';
        break;
      case FinanceMode.incomeTax:
        activeName = 'Income Tax';
        break;
    }

    Widget breadcrumbsAndTabs = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          children: [
            TextButton(
              onPressed: () => context.go('/'),
              child: Text(
                'Home',
                style: theme.textTheme.bodySmall?.copyWith(color: Colors.blue),
              ),
            ),
            Text(' / ', style: theme.textTheme.bodySmall),
            Text(
              'Finance',
              style: theme.textTheme.bodySmall?.copyWith(color: Colors.grey),
            ),
            Text(' / ', style: theme.textTheme.bodySmall),
            Text(
              activeName,
              style: theme.textTheme.bodySmall?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () => context.go('/'),
              tooltip: 'Back to Home',
            ),
            const SizedBox(width: 8),
            Text(
              activeName,
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Scrollbar(
          controller: _tabScrollController,
          thumbVisibility: true,
          child: SingleChildScrollView(
            controller: _tabScrollController,
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Row(
              children: FinanceMode.values.map((mode) {
                final isSelected = state.mode == mode;
                String name;
                switch (mode) {
                  case FinanceMode.currency:
                    name = 'Currency Converter';
                    break;
                  case FinanceMode.loan:
                    name = 'Loan/EMI Calculator';
                    break;
                  case FinanceMode.compound:
                    name = 'Compound Interest';
                    break;
                  case FinanceMode.vat:
                    name = 'VAT/Tax Calculator';
                    break;
                  case FinanceMode.salary:
                    name = 'Salary Converter';
                    break;
                  case FinanceMode.tip:
                    name = 'Tip Calculator';
                    break;
                  case FinanceMode.retirement:
                    name = 'Retirement Planner';
                    break;
                  case FinanceMode.incomeTax:
                    name = 'Income Tax';
                    break;
                }
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: ChoiceChip(
                    label: Text(name),
                    labelPadding: const EdgeInsets.symmetric(
                      horizontal: 12.0,
                      vertical: 2.0,
                    ),
                    labelStyle: const TextStyle(fontSize: 14),
                    selected: isSelected,
                    onSelected: (selected) {
                      if (selected) controller.setMode(mode);
                    },
                  ),
                );
              }).toList(),
            ),
          ),
        ),
        const SizedBox(height: 16),
      ],
    );

    Widget content;
    switch (state.mode) {
      case FinanceMode.currency:
        content = const CurrencyPage();
        break;
      case FinanceMode.loan:
        content = const LoanCalculatorPage();
        break;
      case FinanceMode.compound:
        content = const CompoundInterestPage();
        break;
      case FinanceMode.vat:
        content = const VatCalculatorPage();
        break;
      case FinanceMode.salary:
        content = const SalaryConverterPage();
        break;
      case FinanceMode.tip:
        content = const TipCalculatorPage();
        break;
      case FinanceMode.retirement:
        content = const RetirementCalculatorPage();
        break;
      case FinanceMode.incomeTax:
        content = const IncomeTaxCalculatorPage();
        break;
    }

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 1200),
        child: Padding(
          padding: const EdgeInsets.only(
            left: 16.0,
            right: 16.0,
            top: 0.0,
            bottom: 8.0,
          ),
          child: LayoutBuilder(
            builder: (context, constraints) {
              return SingleChildScrollView(
                child: ConstrainedBox(
                  constraints: BoxConstraints(
                    minHeight: constraints.maxHeight,
                  ),
                  child: IntrinsicHeight(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        breadcrumbsAndTabs,
                        Expanded(child: content),
                        const SizedBox(height: 16),
                        const Center(
                          child: AdSlotWidget(
                            slotId: 'ad_finance_inline',
                            adUnitPath: '/1234567/toolbox_finance_inline',
                            width: 320,
                            height: 50,
                          ),
                        ),
                        const SizedBox(height: 16),
                        _buildSeoText(state.mode),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  Widget _buildSeoText(FinanceMode mode) {
    String title = '';
    String text = '';

    switch (mode) {
      case FinanceMode.compound:
        title = 'About the Compound Interest Calculator';
        text = 'Discover the true power of your investments with the Hilmost Compound Interest Calculator. Designed for investors, savers, and financial planners, this free online tool helps you visualize how your wealth grows over time through the magic of compounding. Whether you are forecasting a high-yield savings account, stock market returns, or a retirement fund, our calculator provides instant, precise projections.\n\nHow to use it: Simply enter your initial principal amount, the expected annual interest rate, and the duration of the investment in years. You can also specify the compounding frequency—whether interest is calculated daily, monthly, or annually—and add any regular monthly contributions you plan to make. The calculator immediately processes these variables to display your total future balance, breaking down the exact amount earned purely from accumulated interest. This essential financial planning utility allows you to make informed decisions about your financial future without needing complex spreadsheet formulas.';
        break;
      case FinanceMode.incomeTax:
        title = 'About the Income Tax Calculator';
        text = 'Take the guesswork out of your paycheck with the Hilmost Income Tax Calculator. Built for freelancers, employees, and independent contractors, this online utility instantly estimates your net take-home pay by deducting estimated federal, state, and local taxes. Understanding your true disposable income is critical for budgeting, and this tool provides a clear, transparent breakdown of where your gross earnings go.\n\nHow to use it: Input your gross annual, monthly, or hourly salary. You can then specify your exact tax brackets or apply an average flat tax rate depending on your local tax laws. The tool rapidly calculates your gross vs. net income, itemizing your total tax burden. By offering real-time adjustments without annoying page reloads, you can experiment with different salary offers to negotiate better compensation packages. This fast, secure, and completely free application runs entirely in your browser without requiring you to submit any personal financial data.';
        break;
      case FinanceMode.loan:
        title = 'About the Loan Amortization Calculator';
        text = 'Make smarter borrowing decisions with the Hilmost Loan Calculator. Whether you are shopping for a mortgage, financing a new car, or consolidating personal debt, this powerful online tool helps you determine your exact monthly payments and total interest costs over the lifespan of the loan. Uncovering the true cost of debt empowers you to negotiate better rates and avoid overextending your budget.\n\nHow to use it: Enter your total loan amount, the annual interest rate (APR), and the loan term in years or months. The tool instantly generates your fixed monthly payment. Beyond just the monthly figure, the calculator provides a comprehensive summary of the total interest you will pay over the entire term, as well as the absolute total cost of the loan. This utility allows you to simulate paying off the loan faster by adjusting the term length, all within a clean, ad-free interface that requires no software installation.';
        break;
      case FinanceMode.retirement:
        title = 'About the Retirement Savings Calculator';
        text = 'Plan for a secure financial future with the Hilmost Retirement Calculator. Preparing for retirement requires foresight, and this free online tool is designed to help you determine exactly how much you need to save today to maintain your lifestyle tomorrow. It is perfect for tracking your 401(k), IRA, or personal portfolio growth over decades.\n\nHow to use it: Input your current age, your target retirement age, your current savings balance, and your expected monthly contributions. You can also define a conservative or aggressive estimated annual return rate. The calculator projects your portfolio\'s future value at retirement, taking compound growth into account. By experimenting with different monthly contribution amounts or delaying retirement by a few years, you can see the massive impact on your final nest egg. It is a fast, visually intuitive way to ensure your golden years are financially stress-free.';
        break;
      case FinanceMode.salary:
        title = 'About the Salary Converter';
        text = 'Quickly translate your wages across different timeframes with the Hilmost Salary Converter. Ideal for job seekers, HR professionals, and gig workers, this free utility breaks down how much you earn per hour, day, week, month, and year. When evaluating a new job offer or setting your freelance hourly rate, understanding these conversions is essential for accurate financial planning.\n\nHow to use it: Enter a base value in any of the available fields—for instance, input your \\\$60,000 annual salary or your \\\$30 hourly rate. The tool instantaneously calculates and auto-fills the remaining fields. It automatically accounts for standard working hours (typically 40 hours per week and 52 weeks per year), giving you an immediate, realistic breakdown of your gross income schedule. Fast, responsive, and completely private, it is the ultimate tool for negotiating your worth and understanding your paycheck.';
        break;
      case FinanceMode.tip:
        title = 'About the Tip Calculator & Splitter';
        text = 'Avoid the post-dinner math headache with the Hilmost Tip Calculator. Designed for quick, on-the-go use, this mobile-friendly web app helps you calculate exact gratuity amounts and effortlessly split the bill among large groups. Whether you are dining at a restaurant, paying a delivery driver, or tipping a service worker, this tool ensures you always leave the correct amount.\n\nHow to use it: Input the total bill amount and use the intuitive sliders or text fields to select your desired tip percentage (e.g., 15%, 18%, 20%). The calculator instantly displays the exact tip amount and the final total bill. If you are dining with friends, simply enter the number of people in your party, and the tool will perfectly divide the final cost, showing exactly how much each person owes. It is lightning-fast, ad-unobtrusive, and functions perfectly on all smartphone browsers.';
        break;
      case FinanceMode.vat:
        title = 'About the VAT & Sales Tax Calculator';
        text = 'Streamline your accounting and shopping with the Hilmost VAT & Sales Tax Calculator. This versatile tool is built for consumers traveling abroad, small business owners setting prices, and accountants verifying invoices. It allows you to rapidly add tax to a net price, or perform a "reverse tax" calculation to extract the tax amount from a gross, tax-inclusive total.\n\nHow to use it: Enter your base monetary amount and input the local tax rate (Value Added Tax, GST, or regional Sales Tax percentage). Select whether you want to "Add Tax" (calculating the final price a consumer pays) or "Remove Tax" (determining the pre-tax base price from a total receipt). The utility processes the math in real-time, providing a crystal-clear breakdown of the net amount, the exact tax charged, and the final gross amount. Free, fast, and highly reliable for everyday commerce.';
        break;
      case FinanceMode.currency:
        return const SizedBox.shrink();
    }

    return SeoTextAccordion(title: title, content: text);
  }
}
