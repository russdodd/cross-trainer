// Re-renders the README charts from the numbers the last full analysis emitted.
//
// analyze-cross-ranking.mjs --all --emit-charts writes both the SVGs and
// cross-ranker-impact.json in one validated pass; that is the command to run when
// the DATA should change. This one exists for when only the PICTURE changes - a
// restyle, a reworded subtitle - so a typo costs a second rather than a 10-minute
// re-run over all 8000 scrambles.
//
// Usage: node scripts/render-impact-charts.mjs [dir]   (default docs/img)

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { renderImpactChart } from './impact-chart.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dir = join(root, process.argv[2] || 'docs/img');
const dataPath = join(dir, 'cross-ranker-impact.json');

const { generated, perLevel } = JSON.parse(readFileSync(dataPath, 'utf8'));
if (!perLevel?.length) {
  throw new Error(`no perLevel data in ${dataPath} - run analyze-cross-ranking.mjs --all --emit-charts first`);
}

for (const mode of ['light', 'dark']) {
  const path = join(dir, `cross-ranker-impact-${mode}.svg`);
  writeFileSync(path, renderImpactChart(perLevel, mode));
  console.log(`wrote ${path}`);
}
console.log(`(re-rendered from data generated ${generated}; run analyze-cross-ranking.mjs --all --emit-charts to refresh the numbers)`);
