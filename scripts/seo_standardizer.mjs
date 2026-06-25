import fs from 'fs';
import path from 'path';

const APP_DIR = 'apps/hilmost_toolbox_web/src/app';

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file === 'page.tsx' || file.endsWith('Page.tsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const pages = getFiles(APP_DIR);
let updatedCount = 0;

pages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('const TOOL_NAME =')) {
    const newMetadata = `export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(TOOL_NAME);
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: TOOL_DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: TOOL_DESC,
      url: PATH,
      type: "website",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["/og/main.png"],
    }
  };
}`;

    // Standardized replacement for the metadata function
    const start = content.indexOf('export async function generateMetadata');
    if (start !== -1) {
      // Find the matching closing brace for the function
      let braceCount = 0;
      let end = -1;
      for (let i = start; i < content.length; i++) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;
        if (braceCount === 0 && end === -1 && i > start + 40) {
          // We found a closing brace that might be the function end
          // But generateMetadata returns an object, so we need to find the SECOND level of closing brace
        }
      }

      // Simpler approach: replace from function start to the next 'const TOOL_DESC' or similar
      // Or just replace the whole function block using a balanced brace matcher

      let i = content.indexOf('{', start);
      let count = 1;
      i++;
      while (count > 0 && i < content.length) {
        if (content[i] === '{') count++;
        if (content[i] === '}') count--;
        i++;
      }

      if (count === 0) {
        const oldFunction = content.substring(start, i);
        content = content.replace(oldFunction, newMetadata);

        // Fix imports
        if (!content.includes('import { formatTitle')) {
          // Remove old metadata import if it exists
          content = content.replace(/import { generatePageTitle, METADATA_BASE_URL } from "@\/lib\/metadata";/, '');

          // Add new import
          const importLine = 'import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";';
          const lastImport = content.lastIndexOf('import ');
          const endOfLastImport = content.indexOf('\n', lastImport) + 1;
          content = content.slice(0, endOfLastImport) + importLine + '\n' + content.slice(endOfLastImport);
        }

        fs.writeFileSync(filePath, content);
        updatedCount++;
      }
    }
  }
});

console.log(`Successfully standardized ${updatedCount} tool pages.`);
