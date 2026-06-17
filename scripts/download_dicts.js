const fs = require('fs');
const https = require('https');
const path = require('path');

const BASE_OUT_DIR = path.join(__dirname, '../apps/hilmost_toolbox_web/public/dictionaries');

const DICTS = {
  en: 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt',
  de: 'https://raw.githubusercontent.com/enz/german-wordlist/master/words',
  fr: 'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/fr/fr_full.txt',
  it: 'https://raw.githubusercontent.com/napolux/paroleitaliane/master/paroleitaliane/660000_parole_italiane.txt',
  es: 'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/es/es_full.txt',
  pt: 'https://raw.githubusercontent.com/pythonprobr/palavras/master/palavras.txt'
};

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function processAndSplitWords(lang, rawText) {
  // Handle space-separated or newline-separated lists
  const lines = rawText.split(/\s+/);
  const wordGroups = {};
  
  // Frequency lists (fr, es) have "word count"
  // The split above will put "word" and "count" as separate elements in the array
  // So we need to iterate carefully.
  const isFrequencyList = ['fr', 'es'].includes(lang);

  for (let i = 0; i < lines.length; i++) {
    let word = lines[i].trim().toLowerCase();

    // Skip numbers (frequency counts) if it's a frequency list
    if (isFrequencyList && /^\d+$/.test(word)) continue;

    word = removeAccents(word);
    
    // Only accept basic a-z, length between 2 and 15
    if (word.length >= 2 && word.length <= 15 && /^[a-z]+$/.test(word)) {
      if (!wordGroups[word.length]) wordGroups[word.length] = new Set();
      wordGroups[word.length].add(word);
    }
  }

  const langDir = path.join(BASE_OUT_DIR, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }

  let totalCount = 0;
  for (const [length, wordSet] of Object.entries(wordGroups)) {
    const sortedWords = Array.from(wordSet).sort();
    const outPath = path.join(langDir, `${length}.json`);
    fs.writeFileSync(outPath, JSON.stringify(sortedWords));
    totalCount += sortedWords.length;
  }
  
  return totalCount;
}

async function downloadAndProcess(lang, url) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${lang} from ${url}...`);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${lang}: HTTP ${res.statusCode}`));
        return;
      }
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          console.log(`Processing and splitting ${lang}...`);
          const count = processAndSplitWords(lang, data);
          console.log(`Saved ${lang} split dictionaries with ${count} total words.`);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const argLang = process.argv[2];

  // Only clean up the specific language if provided, or everything if not
  if (!argLang && fs.existsSync(BASE_OUT_DIR)) {
    // If no lang provided, clean up everything inside BASE_OUT_DIR?
    // Maybe too aggressive. Let's just clean up the folders we touch.
  }

  const targets = argLang ? { [argLang]: DICTS[argLang] } : DICTS;

  for (const [lang, url] of Object.entries(targets)) {
    if (!url) {
      console.error(`Language ${lang} not found in dictionary list.`);
      continue;
    }
    try {
      await downloadAndProcess(lang, url);
    } catch (err) {
      console.error(`Error processing ${lang}:`, err.message);
    }
  }
  console.log("All done!");
}

main();
