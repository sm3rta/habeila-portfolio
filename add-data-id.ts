import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";

const COMPONENTS_TO_PROCESS = ["Box", "Flex", "Text", "List", "ListItem", "Grid", "Center", "Container", "Heading"];
const SOURCE_DIR = path.join(process.cwd(), "apps", "portfolio", "src");

function generateDataId(componentName: string, filePath: string, index: number): string {
  const fileName = path.basename(filePath, path.extname(filePath));
  const randomHex = Math.random().toString(16).substring(2, 8);
  return `${fileName}-${componentName.toLowerCase()}-${index}-${randomHex}`;
}

function addDataIdToComponents(content: string, filePath: string): string {
  let modifiedContent = content;
  const componentCounts: Record<string, number> = {};

  COMPONENTS_TO_PROCESS.forEach((component) => {
    componentCounts[component] = 0;
  });

  // Match opening tags for components
  COMPONENTS_TO_PROCESS.forEach((component) => {
    // This regex handles JSX tags with attributes including arrow functions
    const tagPattern = new RegExp(`<${component}(?![\\w-])([^>]*?(?:{[^}]*}[^>]*?)*)(?<!/)>`, "gs");

    modifiedContent = modifiedContent.replace(tagPattern, (match) => {
      // Skip if data-id already exists
      if (/data-id\s*=/.test(match)) {
        return match;
      }

      componentCounts[component]++;
      const dataId = generateDataId(component, filePath, componentCounts[component]);

      // Insert data-id before the closing >
      // Handle both <Component> and <Component ...props>
      const insertPosition = match.lastIndexOf(">");
      const beforeClosing = match.substring(0, insertPosition);

      // Check if there are existing props
      const hasProps = beforeClosing.trim().length > `<${component}`.length;

      if (hasProps) {
        return `${beforeClosing} data-id="${dataId}">`;
      } else {
        return `<${component} data-id="${dataId}">`;
      }
    });
  });

  return modifiedContent;
}

async function processFiles() {
  try {
    // Find all .tsx and .jsx files
    const files = await glob("**/*.{tsx,jsx}", {
      cwd: SOURCE_DIR,
      absolute: true,
      ignore: ["**/node_modules/**", "**/dist/**", "**/build/**"],
    });

    console.log(`Found ${files.length} files to process`);

    let filesModified = 0;

    for (const file of files) {
      const content = fs.readFileSync(file, "utf-8");
      const modifiedContent = addDataIdToComponents(content, file);

      if (content !== modifiedContent) {
        fs.writeFileSync(file, modifiedContent, "utf-8");
        filesModified++;
        console.log(`✓ Modified: ${path.relative(SOURCE_DIR, file)}`);
      }
    }

    console.log(`\nComplete! Modified ${filesModified} files.`);
  } catch (error) {
    console.error("Error processing files:", error);
    process.exit(1);
  }
}

processFiles();
