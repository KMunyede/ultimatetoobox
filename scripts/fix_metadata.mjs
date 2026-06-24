import fs from 'fs';
import path from 'path';

const TOOLBOX_APP_DIR = 'apps/hilmost_toolbox_web/src/app';

function getToolPages(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
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

const pages = getToolPages(TOOLBOX_APP_DIR);

// Filter for tool pages (exclude index pages, policy pages, guides, etc.)
const EXCLUDED_DIRS = [
  'api', 'cookie-policy', 'privacy-policy', 'terms-of-service', 'guides', 'knowledge-base',
  'calculators', 'converters', 'finance', 'text-data', 'pdf-tools', 'health' // The category root pages themselves
];

const toolPages = pages.filter(p => {
  const relPath = p.replace(TOOLBOX_APP_DIR, '');
  const segments = relPath.split(path.sep).filter(Boolean);

  // It's a tool if it's deeper than the category root (segments.length >= 2)
  // and not in an excluded directory
  if (segments.length < 2) return false;
  if (EXCLUDED_DIRS.includes(segments[0])) return true; // segments[0] is the category
  return false;
}).filter(p => {
    const relPath = p.replace(TOOLBOX_APP_DIR, '');
    const segments = relPath.split(path.sep).filter(Boolean);
    // Exclude category roots again just to be sure
    if (segments.length === 1) return false;
    // Exclude daily-wisdom subpages
    if (segments.includes('daily-wisdom') && segments.length > 2) return false;
    return true;
});

console.log(`Found ${toolPages.length} tool pages to update.`);

toolPages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Extract TOOL_NAME, TOOL_DESC, PATH
  const nameMatch = content.match(/const TOOL_NAME = "(.*?)";/);
  const descMatch = content.match(/const TOOL_DESC = "(.*?)";/);
  const pathMatch = content.match(/const PATH = "(.*?)";/);

  // Skip if we can't find the necessary info (might be a manual page like length/page.tsx)
  if (!nameMatch || !descMatch || !pathMatch) {
    // Check if it's a special page like length/page.tsx
    if (content.includes('generateMetadata') && content.includes('canonical')) {
        // Fix duplicate site name in title
        content = content.replace(/title: "(.*?) \| Hilmost Toolbox"/, 'title: "$1"');
        content = content.replace(/title: `(.*?) \| Hilmost Toolbox`/, 'title: `$1`');

        // Add OG tags and JSON-LD if missing
        // This is harder to automate perfectly for manual pages without knowing the variable names
        // We'll handle manual pages separately if needed.
    }
    return;
  }

  const TOOL_NAME = nameMatch[1];
  const TOOL_DESC = descMatch[1];
  const PATH = pathMatch[1];

  // 2. Update generateMetadata
  const newMetadata = `export async function generateMetadata(): Promise<Metadata> {
  return {
    title: \`\${TOOL_NAME}\`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
    openGraph: {
      title: \`\${TOOL_NAME} | Hilmost Toolbox\`,
      description: TOOL_DESC,
      url: getCanonicalUrl(PATH),
      type: "website",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    },
    twitter: {
      title: \`\${TOOL_NAME} | Hilmost Toolbox\`,
      description: TOOL_DESC,
      images: ["/og/main.png"],
    },
  };
}`;

  content = content.replace(/export async function generateMetadata\(\)[\s\S]*?\}\n\}/, newMetadata);

  // 3. Add JSON-LD if missing
  if (!content.includes('WebApplicationSchema')) {
      // Need to add import and component
      // This part is also tricky to automate perfectly without breaking JSX
  }

  // fs.writeFileSync(filePath, content);
});

console.log('Metadata fix script prepared.');
