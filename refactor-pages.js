const fs = require('fs');
const path = require('path');

const files = [
  'app/visit/page.tsx',
  'app/gallery/page.tsx',
  'app/experience/page.tsx',
  'app/about/page.tsx'
];

files.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Add import { getSiteData } from '@/lib/data'; if not present
  if (!content.includes('getSiteData')) {
    content = content.replace(
      "import { Metadata } from 'next';",
      "import { Metadata } from 'next';\nimport { getSiteData } from '@/lib/data';"
    );
  }

  // Replace generateMetadata logic
  content = content.replace(
    /const filePath = path\.join\(process\.cwd\(\), 'data', 'content\.json'\);\s+const data = JSON\.parse\(fs\.readFileSync\(filePath, 'utf8'\)\);\s+seo = data\.pages\?\.([a-zA-Z]+)\?\.seo \|\| \{\};/,
    "const data = await getSiteData();\n      seo = data?.pages?.$1?.seo || {};"
  );

  // Replace default export data fetching logic
  content = content.replace(
    /const filePath = path\.join\(process\.cwd\(\), 'data', 'content\.json'\);\s+const data = JSON\.parse\(fs\.readFileSync\(filePath, 'utf8'\)\);\s+if \(data\?\.pages\?\.([a-zA-Z]+)\?\.content\) \{\s+pageData = data\.pages\.$1\.content;\s+\}/,
    "const data = await getSiteData();\n    if (data?.pages?.$1?.content) {\n      pageData = data.pages.$1.content;\n    }"
  );
  
  // Just for experience page where it uses 'experience' directly
  content = content.replace(
    /const filePath = path\.join\(process\.cwd\(\), 'data', 'content\.json'\);\s+const fileContents = fs\.readFileSync\(filePath, 'utf8'\);\s+const data = JSON\.parse\(fileContents\);\s+if \(data\?.pages\?\.experience\?\.content\) \{\s+content = data\.pages\.experience\.content;\s+\}/,
    "const data = await getSiteData();\n    if (data?.pages?.experience?.content) {\n      content = data.pages.experience.content;\n    }"
  );

  // Remove fs and path imports if they are no longer needed
  content = content.replace(/import fs from 'fs';\n/, '');
  content = content.replace(/import path from 'path';\n/, '');

  fs.writeFileSync(fullPath, content);
  console.log('Refactored ' + file);
});
