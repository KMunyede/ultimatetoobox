/**
 * Word Unscrambler Logic
 * Supports wildcards (?, *), sub-word matching, and Scrabble scoring.
 */

export const SCRABBLE_POINTS: Record<string, number> = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3,
  n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
};

export function calculateScrabblePoints(word: string): number {
  return word.toLowerCase().split('').reduce((acc, char) => acc + (SCRABBLE_POINTS[char] || 0), 0);
}

export interface UnscrambleOptions {
  startsWith?: string;
  endsWith?: string;
  contains?: string;
  minLength?: number;
  maxLength?: number;
}

export function findMatches(
  letters: string,
  dictionary: string[],
  options: UnscrambleOptions = {}
): string[] {
  const normalizedLetters = letters.toLowerCase();
  const wildcardCount = (normalizedLetters.match(/[?*]/g) || []).length;
  const inputFreq = getCharFrequency(normalizedLetters.replace(/[?*]/g, ''));

  return dictionary.filter(word => {
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
}

function getCharFrequency(str: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}

export function groupWordsByLength(words: string[]): Record<number, string[]> {
  const grouped: Record<number, string[]> = {};
  words.forEach(word => {
    const len = word.length;
    if (!grouped[len]) grouped[len] = [];
    grouped[len].push(word);
  });

  // Sort words within each group by Scrabble points (desc) then alpha (asc)
  Object.keys(grouped).forEach(len => {
    grouped[Number(len)].sort((a, b) => {
      const scoreA = calculateScrabblePoints(a);
      const scoreB = calculateScrabblePoints(b);
      if (scoreB !== scoreA) return scoreB - scoreA;
      return a.localeCompare(b);
    });
  });

  return grouped;
}
