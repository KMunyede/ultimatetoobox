import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const baseDir = 'm:/techprojects/UtilitiesSite/apps/hilmost_toolbox_web/src/app';

walkDir(baseDir, (filePath) => {
  if (filePath.endsWith('page.tsx')) {
    // Skip non-tools and already done pages
    if (filePath.includes('health\\daily-wisdom')) return;
    if (filePath.includes('privacy-policy')) return;
    if (filePath.includes('cookie-policy')) return;
    if (filePath.includes('terms-of-service')) return;
    if (filePath === path.join(baseDir, 'page.tsx')) return; // Skip home

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has schema to avoid duplicates
    if (content.includes('<WebApplicationSchema')) return;

    // Extract title and description
    let titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    let descMatch = content.match(/description:\s*["']([^"']+)["']/);

    if (titleMatch && descMatch) {
      let title = titleMatch[1];
      let description = descMatch[1];
      
      // Calculate URL
      let relativePath = path.dirname(filePath).replace(baseDir.replace(/\//g, '\\'), '').replace(/\\/g, '/');
      let url = `https://hilmost-toolbox.hilmost.net${relativePath}`;
      
      // Inject import
      if (!content.includes('WebApplicationSchema')) {
        content = 'import { WebApplicationSchema } from "@utilitiessite/ui";\n' + content;
      }

      // Inject component inside the first main wrapper (usually <div className="max-w-...)
      // Find the first return statement of a functional component
      let returnIndex = content.indexOf('return (');
      if (returnIndex !== -1) {
        let insertPos = content.indexOf('>', returnIndex) + 1; // After the opening tag of the wrapper
        let schemaString = `\n      <WebApplicationSchema name="${title}" description="${description}" url="${url}" />`;
        content = content.slice(0, insertPos) + schemaString + content.slice(insertPos);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
      }
    }
  }
});
