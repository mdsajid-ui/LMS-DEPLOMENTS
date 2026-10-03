import fs from 'fs';
import path from 'path';

const hooks = ['useState', 'useEffect', 'useMemo', 'useCallback', 'useRef', 'useContext', 'useReducer'];

function checkDir(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) checkDir(p);
    else if (p.endsWith('.jsx') || p.endsWith('.js')) {
      const content = fs.readFileSync(p, 'utf8');
      
      // Extract what's imported from 'react'
      const reactImports = new Set();
      const reactMatch = content.match(/import\s+(?:React\s*,?\s*)?(?:\{([^}]+)\})?\s*from\s*['"]react['"]/);
      if (reactMatch && reactMatch[1]) {
        reactMatch[1].split(',').forEach(item => {
          const name = item.trim().split(/\s+as\s+/)[0].trim();
          if (name) reactImports.add(name);
        });
      }

      hooks.forEach(h => {
        // Find if h( is called directly (not React.h() and not obj.h())
        const hookCalls = content.match(new RegExp('(?<![\\w.]|React\\.)' + h + '\\s*\\(', 'g'));
        if (hookCalls && hookCalls.length > 0) {
          if (!reactImports.has(h)) {
            console.log(`REAL HOOK MISSING IN ${p}: ${h}`);
          }
        }
      });
    }
  }
}

checkDir('src');
console.log('Precise hooks scan complete.');
