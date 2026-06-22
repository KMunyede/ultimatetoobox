/**
 * Web Worker for Word Unscrambler
 * Offloads heavy dictionary filtering from the main UI thread.
 */

function getCharFrequency(str: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

self.onmessage = (e: MessageEvent) => {
  const { letters, dictionary, options } = e.data;

  const normalizedLetters = letters.toLowerCase();
  const wildcardCount = (normalizedLetters.match(/[?*]/g) || []).length;
  const inputFreq = getCharFrequency(normalizedLetters.replace(/[?*]/g, ''));

  const matches = dictionary.filter((word: string) => {
    const w = word.toLowerCase();

    // Basic length and filter checks
    if (options.minLength && w.length < options.minLength) return false;
    if (options.maxLength && w.length > options.maxLength) return false;
    if (w.length > normalizedLetters.length) return false;
    if (options.startsWith && !w.startsWith(options.startsWith.toLowerCase())) return false;
    if (options.endsWith && !w.endsWith(options.endsWith.toLowerCase())) return false;
    if (options.contains && !w.includes(options.contains.toLowerCase())) return false;

    // Char frequency matching with wildcards
    const wordFreq = getCharFrequency(w);
    let neededWildcards = 0;

    for (const char in wordFreq) {
      const diff = wordFreq[char] - (inputFreq[char] || 0);
      if (diff > 0) {
        neededWildcards += diff;
      }
    }

    return neededWildcards <= wildcardCount;
  });

  self.postMessage(matches);
};

export {};
