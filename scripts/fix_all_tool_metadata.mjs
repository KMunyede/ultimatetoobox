import fs from 'fs';
import path from 'path';

// Root directory of the toolbox app
const TOOLBOX_APP_DIR = path.join(process.cwd(), 'apps/hilmost_toolbox_web/src/app');

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allPages = getFiles(TOOLBOX_APP_DIR);
console.log(`Scanned ${allPages.length} pages in ${TOOLBOX_APP_DIR}`);

const CATEGORIES = ['calculators', 'converters', 'finance', 'text-data', 'pdf-tools', 'health'];

const toolPages = allPages.filter(p => {
    // Normalize path to use forward slashes for easier logic
    const relPath = p.replace(TOOLBOX_APP_DIR, '').replace(/^\\|^\//, '').replace(/\\/g, '/');
    const segments = relPath.split('/');

    // Must be in a category and at least 2 levels deep (e.g., finance/loan-calculator/page.tsx)
    if (segments.length < 2) return false;
    if (!CATEGORIES.includes(segments[0])) return false;

    // Exclude category roots (e.g., finance/page.tsx)
    if (segments.length === 2 && segments[1] === 'page.tsx') return false;

    // Special case for daily-wisdom which has subfolders
    if (segments.includes('daily-wisdom') && segments.length > 3) return false;

    return true;
});

console.log(`Found ${toolPages.length} tool pages to check.`);

toolPages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // 1. Fix duplicate site name in title
  const titleRegex = /title:\s*["`](.*?) \| Hilmost Toolbox["`]/g;
  if (titleRegex.test(content)) {
    content = content.replace(titleRegex, (match, title) => {
        console.log(`Fixing title duplicate in ${filePath}: ${title}`);
        return `title: \`${title}\``;
    });
    changed = true;
  }

  // 2. Add/Fix OpenGraph and Twitter in generateMetadata
  const metadataMatch = content.match(/export async function generateMetadata\(\)[\s\S]*?return \{([\s\S]*?)\};\n\}/);
  if (metadataMatch) {
    const existingFields = metadataMatch[1];

    if (!existingFields.includes('openGraph') || !existingFields.includes('twitter')) {
        console.log(`Adding OG/Twitter metadata to ${filePath}`);

        const nameMatch = content.match(/const TOOL_NAME = "(.*?)";/);
        const descMatch = content.match(/const TOOL_DESC = "(.*?)";/);
        const pathMatch = content.match(/const PATH = "(.*?)";/);

        if (nameMatch && descMatch && pathMatch) {
            const TOOL_NAME = nameMatch[1];
            const TOOL_DESC = descMatch[1];
            const PATH = pathMatch[1];

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
            changed = true;
        } else if (filePath.includes('length')) {
             const newMetadata = `export async function generateMetadata(): Promise<Metadata> {
  const TITLE = "Length & Distance Converter — Metric to Imperial";
  const DESC = "Free online length converter. Instantly convert between meters, kilometers, feet, inches, miles, and centimeters with high precision.";
  const PATH = "/converters/length";
  return {
    title: TITLE,
    description: DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
    openGraph: {
      title: \`\${TITLE} | Hilmost Toolbox\`,
      description: DESC,
      url: getCanonicalUrl(PATH),
      type: "website",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    },
    twitter: {
      title: \`\${TITLE} | Hilmost Toolbox\`,
      description: DESC,
      images: ["/og/main.png"],
    },
  };
}`;
            content = content.replace(/export async function generateMetadata\(\)[\s\S]*?\}\n\}/, newMetadata);
            changed = true;
        }
    }
  }

  // 3. Add WebApplicationSchema if missing
  if (!content.includes('WebApplicationSchema')) {
      console.log(`Adding WebApplicationSchema to ${filePath}`);

      if (!content.includes('WebApplicationSchema') && content.includes('@utilitiessite/ui')) {
          content = content.replace(/import \{ (.*?) \} from "@utilitiessite\/ui";/, (match, imports) => {
              if (!imports.includes('WebApplicationSchema')) {
                  return `import { WebApplicationSchema, ${imports} } from "@utilitiessite/ui";`;
              }
              return match;
          });
      }

      const nameMatch = content.match(/const TOOL_NAME = "(.*?)";/) || content.match(/title: \`(.*?)\`/) || content.match(/const TITLE = "(.*?)";/);
      const descMatch = content.match(/const TOOL_DESC = "(.*?)";/) || content.match(/description: (TOOL_DESC|"(.*?)")/) || content.match(/const DESC = "(.*?)";/);
      const pathMatch = content.match(/const PATH = "(.*?)";/) || content.match(/canonical: getCanonicalUrl\("(.*?)"\)/) || content.match(/const PATH = "(.*?)";/);

      if (nameMatch && descMatch && pathMatch) {
          const name = nameMatch[1];
          const desc = descMatch[1] === 'TOOL_DESC' ? 'TOOL_DESC' : descMatch[2] || descMatch[1];
          const pathVal = pathMatch[1];

          const schemaCall = `
      <WebApplicationSchema
        name={${content.includes('const TOOL_NAME') ? 'TOOL_NAME' : (content.includes('const TITLE') ? 'TITLE' : `"${name}"`) }}
        description={${desc === 'TOOL_DESC' ? 'TOOL_DESC' : (desc === 'DESC' ? 'DESC' : `"${desc}"`) }}
        url={\`https://hilmost-toolbox.hilmost.net\${${content.includes('const PATH') ? 'PATH' : `"${pathVal}"` }}\`}
        image="https://hilmost-toolbox.hilmost.net/og/main.png"
      />`;

          if (content.includes('<Breadcrumbs')) {
              content = content.replace(/(<Breadcrumbs.*?\/>)/, `$1${schemaCall}`);
              changed = true;
          } else if (content.includes('return (')) {
               content = content.replace(/(return \(\s*<div.*?>)/, `$1${schemaCall}`);
               changed = true;
          }
      }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
});

console.log('Done.');
