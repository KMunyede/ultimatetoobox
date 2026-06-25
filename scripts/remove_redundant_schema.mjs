import fs from 'fs';
import path from 'path';

const APP_DIR = 'apps/hilmost_toolbox_web/src/app';

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file === 'page.tsx' || file.endsWith('PageUI.tsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const pages = getFiles(APP_DIR);
let updatedCount = 0;

pages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('BreadcrumbSchema')) {
    // 1. Remove the component usage
    // Matches <BreadcrumbSchema items={...} />
    content = content.replace(/<BreadcrumbSchema\s+items=\{[^}]+\}\s*\/>\n?/g, '');

    // 2. Clean up imports
    // Matches BreadcrumbSchema in named imports
    content = content.replace(/BreadcrumbSchema,\s*/g, '');
    content = content.replace(/,\s*BreadcrumbSchema/g, '');
    content = content.replace(/import\s*{\s*BreadcrumbSchema\s*}\s*from\s*"@utilitiessite\/ui";\n?/g, '');

    fs.writeFileSync(filePath, content);
    updatedCount++;
  }
});

console.log(`Successfully removed redundant BreadcrumbSchema from ${updatedCount} pages.`);
