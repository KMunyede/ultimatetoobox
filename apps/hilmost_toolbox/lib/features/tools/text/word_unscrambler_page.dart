import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'word_dictionary.dart';

class WordUnscramblerPage extends ConsumerStatefulWidget {
  const WordUnscramblerPage({super.key});

  @override
  ConsumerState<WordUnscramblerPage> createState() => _WordUnscramblerPageState();
}

class _WordUnscramblerPageState extends ConsumerState<WordUnscramblerPage> {
  final TextEditingController _controller = TextEditingController();
  List<String> _results = [];

  void _unscramble() {
    final text = _controller.text;
    setState(() {
      _results = WordDictionary.unscramble(text);
    });
  }

  void _copyToClipboard(String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Copied: $text'),
        duration: const Duration(seconds: 1),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _copyAll() {
    final text = _results.join(', ');
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Copied all words!'),
        duration: Duration(seconds: 1),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Simulated SEO H1 Heading
          Text(
            'Word Unscrambler',
            style: theme.textTheme.headlineMedium?.copyWith(
              color: Colors.black87,
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
            semanticsLabel: 'Word Unscrambler main heading',
          ),
          const SizedBox(height: 8),
          Text(
            'simple, easy and fast word unscrambler!',
            style: theme.textTheme.titleMedium?.copyWith(
              color: Colors.black54,
              fontStyle: FontStyle.italic,
            ),
          ),
          const SizedBox(height: 32),

          // Main Input Box
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(color: Colors.grey.shade200),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.02),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Enter letters (max: 15, use ? or ^ for blank)',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: Colors.black87,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _controller,
                  onSubmitted: (_) => _unscramble(),
                  decoration: InputDecoration(
                    hintText: 'e.g., tra',
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(4),
                      borderSide: BorderSide(color: Colors.grey.shade300),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(4),
                      borderSide: BorderSide(color: Colors.grey.shade300),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(4),
                      borderSide: BorderSide(color: Colors.red.shade600, width: 2),
                    ),
                    filled: true,
                    fillColor: Colors.white,
                  ),
                  style: const TextStyle(fontSize: 18),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: _unscramble,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green.shade700,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        elevation: 0,
                      ),
                      child: const Text('Unscramble It', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton(
                      onPressed: () {}, // Stub for options
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.purple.shade600,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        elevation: 0,
                      ),
                      child: const Text('Options', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Short descriptive text with left border
          Container(
            padding: const EdgeInsets.only(left: 16, top: 4, bottom: 4),
            decoration: BoxDecoration(
              border: Border(
                left: BorderSide(color: Colors.brown.shade400, width: 4),
              ),
            ),
            child: Text(
              'Word Unscrambler is a simple online tool for unscrambling and solving scrambled words, often useful in discovering top scoring words for Scrabble, Words with Friends, Wordle, Wordscapes, Wordfeud, TextTwist, Word Cookies, Anagrams etc.',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: Colors.black87,
                height: 1.5,
              ),
            ),
          ),

          const SizedBox(height: 32),
          const Divider(color: Colors.black12),
          const SizedBox(height: 32),

          // Results section
          if (_results.isNotEmpty) ...[
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(4),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Found ${_results.length} words:',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: Colors.blue.shade800,
                          fontSize: 18,
                        ),
                      ),
                      TextButton.icon(
                        onPressed: _copyAll,
                        icon: Icon(Icons.copy, size: 18, color: Colors.blue.shade800),
                        label: Text('Copy All', style: TextStyle(fontSize: 14, color: Colors.blue.shade800)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: _results.asMap().entries.map((entry) {
                      int idx = entry.key;
                      String word = entry.value;
                      
                      final bgColors = [Colors.green.shade50, Colors.blue.shade50, Colors.red.shade50, Colors.purple.shade50, Colors.brown.shade50];
                      final textColors = [Colors.green.shade900, Colors.blue.shade900, Colors.red.shade900, Colors.purple.shade900, Colors.brown.shade900];
                      final borderColors = [Colors.green.shade200, Colors.blue.shade200, Colors.red.shade200, Colors.purple.shade200, Colors.brown.shade200];
                      
                      Color bgColor = bgColors[idx % bgColors.length];
                      Color textColor = textColors[idx % textColors.length];
                      Color borderColor = borderColors[idx % borderColors.length];

                      return InkWell(
                        onTap: () => _copyToClipboard(word),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: bgColor,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: borderColor),
                          ),
                          child: Text(
                            word,
                            style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16, color: textColor),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),
          ] else if (_controller.text.isNotEmpty) ...[
            const Text(
              'No words found. Try different letters.',
              style: TextStyle(color: Colors.redAccent, fontSize: 16),
            ),
          ],

          const SizedBox(height: 48),

          Text(
            'What is the use of Word Unscrambler?',
            style: theme.textTheme.headlineSmall?.copyWith(
              color: Colors.black87,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            '''Have you ever stared at a jumbled string of letters and wondered what hidden words lie within? Our Word Unscrambler tool is designed to solve exactly that problem with incredible speed and accuracy.

Under the hood, the tool employs a sophisticated anagram and frequency-map algorithm. When you input your scrambled letters, the system first normalizes the text and calculates the exact frequency of each character you provided. It then rapidly scans through an extensive, built-in dictionary of valid English words. For every word in the database, the algorithm checks if its character frequencies are a subset of your input. This means it doesn't just find exact anagrams; it discovers every possible shorter word you can form with those tiles.

Unlike brute-force permutation generators which crash on longer strings due to factorial complexity, our frequency-matching approach ensures instantaneous results. Whether you are stuck in a game of Scrabble, solving a complex anagram puzzle, or just trying to expand your vocabulary, this logic guarantees that you'll see every valid combination instantly. Once the matching words are found, the tool conveniently sorts them by length so you can find the highest-scoring options first.''',
            style: theme.textTheme.bodyMedium?.copyWith(
              height: 1.6,
              color: Colors.black87,
            ),
          ),
          const SizedBox(height: 48),
        ],
      ),
    );
  }
}
