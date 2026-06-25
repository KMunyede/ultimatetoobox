import fs from 'fs';
import path from 'path';

const APP_DIR = 'apps/hilmost_toolbox_web/src/app';

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
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
  if (content.includes('getFileLastUpdated')) {
    // Replace: import { ..., getFileLastUpdated, ... } from "@utilitiessite/config"
    content = content.replace(/import\s*{([^}]+)}\s*from\s*"@utilitiessite\/config"/g, (match, p1) => {
      let imports = p1.split(',').map(i => i.trim()).filter(Boolean);
      let serverImports = imports.filter(i => i === 'getFileLastUpdated');
      let clientImports = imports.filter(i => i !== 'getFileLastUpdated');

      let res = '';
      if (clientImports.length > 0) {
        res += `import { ${clientImports.join(', ')} } from "@utilitiessite/config";\n`;
      }
      if (serverImports.length > 0) {
        res += `import { getFileLastUpdated } from "@utilitiessite/config/server";`;
      }
      return res;
    });
    fs.writeFileSync(filePath, content);
    updatedCount++;
  }
});

console.log(`Successfully fixed imports in ${updatedCount} pages.`);
