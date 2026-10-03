const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('lucide-react')) return;

  const importBlocks = content.match(/import\s*\{[\s\S]*?\}\s*from\s*['"]lucide-react['"]/g) || [];
  const imported = new Set();
  importBlocks.forEach(b => {
    const inside = b.replace(/import\s*\{/, '').replace(/\}\s*from\s*['"]lucide-react['"]/, '');
    inside.split(',').forEach(name => {
      const trimmed = name.trim().split(/\s+as\s+/)[0].trim();
      if (trimmed) imported.add(trimmed);
    });
  });

  const matches = content.matchAll(/<([A-Z][a-zA-Z0-9]+)/g);
  for (const m of matches) {
    const tag = m[1];
    if (['Logo', 'Header', 'Sidebar', 'App', 'BarChart', 'Bar', 'XAxis', 'YAxis', 
         'Tooltip', 'ResponsiveContainer', 'RadialBarChart', 'RadialBar', 
         'PolarAngleAxis', 'CartesianGrid', 'AreaChart', 'Area', 'PieChart', 
         'Pie', 'Cell', 'LineChart', 'Line', 'RadialGauge', 'DvAssistant',
         'ErrorBoundary', 'Fragment'].some(k => tag.includes(k) || tag.endsWith('Page') || tag.endsWith('Modal') || tag.endsWith('View') || tag.endsWith('Assistant'))) {
      continue;
    }

    // Check if imported from another file
    const otherImport = new RegExp('\\bimport\\s+(?:[\\s\\S]*?\\b' + tag + '\\b|' + tag + '\\b)', 'm');
    const isDeclaredLocally = new RegExp('\\b(?:const|let|var|function|class)\\s+' + tag + '\\b', 'm');

    if (!imported.has(tag) && !otherImport.test(content) && !isDeclaredLocally.test(content)) {
      console.log(`MISSING: ${tag} in ${filePath}`);
    }
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.jsx') || p.endsWith('.js')) checkFile(p);
  });
}

walk('src');
