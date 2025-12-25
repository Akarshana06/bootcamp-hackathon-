const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const rename = promisify(fs.rename);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function processDirectory(directory) {
  const files = await readdir(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await processDirectory(filePath);
    } else if (file.endsWith('.tsx')) {
      // Rename .tsx to .jsx
      const newPath = filePath.replace(/\.tsx$/, '.jsx');
      await rename(filePath, newPath);
      console.log(`Renamed: ${filePath} -> ${newPath}`);
      
      // Remove TypeScript types from the file
      await removeTypeScriptTypes(newPath);
    } else if (file.endsWith('.ts')) {
      // Rename .ts to .js
      const newPath = filePath.replace(/\.ts$/, '.js');
      await rename(filePath, newPath);
      console.log(`Renamed: ${filePath} -> ${newPath}`);
      
      // Remove TypeScript types from the file
      await removeTypeScriptTypes(newPath);
    }
  }
}

async function removeTypeScriptTypes(filePath) {
  try {
    let content = await readFile(filePath, 'utf8');
    
    // Remove type annotations (simplified - might need adjustments based on your code)
    content = content
      .replace(/\b(?:const|let|var|function|interface|type|enum)\s+([a-zA-Z0-9_$]+)\s*:\s*([^{;=]+?)(?=[;={\n])/g, '$1 $2')
      .replace(/<([a-zA-Z0-9_$]+)\s*:\s*([^>]+)>/g, '<$1>')
      .replace(/import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"];?/g, (match, imports, module) => {
        // Remove type imports
        const cleanedImports = imports.replace(/\s*as\s+[^,]+/g, '')
          .replace(/\s*{[^}]*\btype\s+[^}]*}/g, '')
          .replace(/,\s*,/g, ',')
          .replace(/^\s*,|,\s*$|\s+/g, '');
          
        return cleanedImports ? `import ${cleanedImports} from '${module}';` : `import '${module}';`;
      });
      
    await writeFile(filePath, content, 'utf8');
    console.log(`Removed TypeScript types from: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Start processing from the project root
const projectRoot = path.join(__dirname);
processDirectory(projectRoot).then(() => {
  console.log('Conversion to JSX complete!');
}).catch(console.error);
