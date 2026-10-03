import fs from 'fs';
import path from 'path';

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) scan(p);
    else if (p.endsWith('.jsx')) {
      const code = fs.readFileSync(p, 'utf8');

      // 1. Get all imported tokens in the file
      const importedTokens = new Set();
      const importRegex = /import\s+(?:([\w$]+)\s*,?\s*)?(?:\{([\s\S]*?)\})?\s*from/g;
      let m;
      while ((m = importRegex.exec(code)) !== null) {
        if (m[1]) importedTokens.add(m[1].trim());
        if (m[2]) {
          m[2].split(',').forEach(item => {
            const parts = item.trim().split(/\s+as\s+/);
            parts.forEach(p => { if (p.trim()) importedTokens.add(p.trim()); });
          });
        }
      }

      // 2. Get all locally declared tokens
      const localTokens = new Set();
      const declRegex = /(?:const|let|var|function|class)\s+([\w$]+)/g;
      while ((m = declRegex.exec(code)) !== null) {
        localTokens.add(m[1].trim());
      }

      // 3. Find all JSX tags <TagName
      const tagRegex = /<([A-Z][a-zA-Z0-9]+)/g;
      while ((m = tagRegex.exec(code)) !== null) {
        const tag = m[1];
        if (['React', 'Fragment', 'ErrorBoundary'].includes(tag)) continue;
        if (!importedTokens.has(tag) && !localTokens.has(tag)) {
          console.log(`UNDECLARED JSX TAG in ${p}: ${tag}`);
        }
      }
    }
  }
}

scan('src');
console.log('Strict scan finished.');
