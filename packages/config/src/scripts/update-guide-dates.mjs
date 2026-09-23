import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const GUIDES_FILE = path.resolve('packages/config/src/guides.ts');

function getSlugDate(slug) {
  try {
    const cmd = `git log -1 --format=%aI -S"slug: \\"${slug}\\"" -- packages/config/src/guides.ts`;
    const result = execSync(cmd, { encoding: 'utf8' }).trim();
    if (!result) return 'August 16, 2026';
    const dateObj = new Date(result);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (err) {
    return 'August 16, 2026';
  }
}

export function updateAllGuideDates() {
  let content = fs.readFileSync(GUIDES_FILE, 'utf8');

  // Extract all slugs
  const slugRegex = /slug:\s*"([^"]+)"/g;
  let match;
  const slugDates = {};

  while ((match = slugRegex.exec(content)) !== null) {
    const slug = match[1];
    slugDates[slug] = getSlugDate(slug);
  }

  // Update content by inserting or updating lastUpdated for each guide
  // Matching each guide block starting with slug: "xxx"
  const updatedContent = content.replace(/(slug:\s*"([^"]+)"[\s\S]*?)(content:)/g, (fullMatch, prefix, slug, contentKey) => {
    const date = slugDates[slug] || 'August 16, 2026';
    // Remove existing lastUpdated if present in prefix
    const cleanPrefix = prefix.replace(/\s*lastUpdated:\s*"[^"]*",?/g, '');
    return `${cleanPrefix}  lastUpdated: "${date}",\n    ${contentKey}`;
  });

  fs.writeFileSync(GUIDES_FILE, updatedContent, 'utf8');
  return slugDates;
}

if (process.argv[1].endsWith('update-guide-dates.mjs')) {
  const dates = updateAllGuideDates();
  console.log('Update complete. Total guides updated:', Object.keys(dates).length);
}
