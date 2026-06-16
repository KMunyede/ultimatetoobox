const fs = require('fs');
const https = require('https');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../apps/hilmost_toolbox_web/public/dictionaries');

const DICTS = {
  fr: 'https://raw.githubusercontent.com/words/an-array-of-french-words/master/index.json',
  es: 'https://raw.githubusercontent.com/words/an-array-of-spanish-words/master/index.json'
};

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function processWords(rawJsonString) {
  let words = [];
  try {
    words = JSON.parse(rawJsonString);
  } catch(e) {
    console.error("Failed to parse JSON");
    return [];
  }
  
  const validWords = new Set();
  
  for (let word of words) {
    word = String(word).trim().toLowerCase();
    word = removeAccents(word);
    
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
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
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
    await downloadAndProcess(lang, url);
  }
}

main();
