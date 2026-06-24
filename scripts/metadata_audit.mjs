import fs from 'fs';
import path from 'path';

const TOOLBOX_APP_DIR = 'apps/hilmost_toolbox_web/src/app';

function getToolPages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getToolPages(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function analyzeMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Basic regex to find TOOL_NAME and TOOL_DESC which are common patterns in this repo
  const nameMatch = content.match(/const TOOL_NAME = "(.*?)";/);
  const descMatch = content.match(/const TOOL_DESC = "(.*?)";/);

  // Regex to find generateMetadata return object
  const titleMatch = content.match(/title: `(.*?)`,/);
  const descriptionMatch = content.match(/description: (TOOL_DESC|"(.*?)"),/);

  let description = '';
  if (descMatch) {
    description = descMatch[1];
  } else if (descriptionMatch && descriptionMatch[2]) {
    description = descriptionMatch[2];
  }

  return {
    path: filePath.replace(TOOLBOX_APP_DIR, ''),
    title: nameMatch ? nameMatch[1] : (titleMatch ? titleMatch[1] : 'MISSING'),
    description: description || 'MISSING',
    descLength: description.length
  };
}

const pages = getToolPages(TOOLBOX_APP_DIR);
const results = pages.map(analyzeMetadata);

console.log('--- METADATA AUDIT REPORT ---');
console.log(`Total Pages Scanned: ${results.length}`);

const missingDesc = results.filter(r => r.description === 'MISSING');
const longDesc = results.filter(r => r.descLength > 160);
const shortDesc = results.filter(r => r.descLength < 50 && r.description !== 'MISSING');

console.log(`Missing Descriptions: ${missingDesc.length}`);
console.log(`Overly Long (>160 chars): ${longDesc.length}`);
console.log(`Overly Short (<50 chars): ${shortDesc.length}`);

if (longDesc.length > 0) {
    console.log('\n--- Long Descriptions ---');
    longDesc.forEach(r => console.log(`[${r.descLength}] ${r.path}: ${r.description.substring(0, 50)}...`));
}

if (missingDesc.length > 0) {
    console.log('\n--- Missing Descriptions ---');
    missingDesc.forEach(r => console.log(r.path));
}
