const fs = require('fs');
const https = require('https');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../apps/hilmost_toolbox_web/public/dictionaries');

// Ensure output directory exists
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const DICTS = {
  de: 'https://raw.githubusercontent.com/enz/german-wordlist/master/words',
  fr: 'https://raw.githubusercontent.com/hbenbel/French-Dictionary/master/dictionary/dictionary.txt',
  it: 'https://raw.githubusercontent.com/napolux/paroleitaliane/master/paroleitaliane/660000_parole_italiane.txt',
  es: 'https://raw.githubusercontent.com/lorenbrasseur/spanish-words/master/words.txt',
  pt: 'https://raw.githubusercontent.com/pythonprobr/palavras/master/palavras.txt'
};

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function processWords(rawText) {
  const words = rawText.split(/\r?\n/);
  const validWords = new Set();
  
  for (let word of words) {
    word = word.trim().toLowerCase();
    word = removeAccents(word);
    
    // Only accept basic a-z, length between 2 and 15
    if (word.length >= 2 && word.length <= 15 && /^[a-z]+$/.test(word)) {
      validWords.add(word);
    }
  }
  
  return Array.from(validWords).sort();
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
          console.log(`Processing ${lang}...`);
          const words = processWords(data);
          const outPath = path.join(OUT_DIR, `${lang}.json`);
          fs.writeFileSync(outPath, JSON.stringify(words));
          console.log(`Saved ${lang}.json with ${words.length} words.`);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  for (const [lang, url] of Object.entries(DICTS)) {
    try {
      await downloadAndProcess(lang, url);
    } catch (err) {
      console.error(`Error processing ${lang}:`, err.message);
    }
  }
  console.log("All done!");
}

main();
