// Writes src/app/version.ts with the build time and commit, so the deployed page
// can show when it was built. Runs as an npm `prebuild` step, so every `npm run
// build` (including Cloudflare's) regenerates it. Local `ng serve` / `ng test`
// don't trigger it, so they keep the committed stub — that's fine, it's only a
// deploy marker.

import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function shortSha() {
  // Cloudflare's build env exposes the commit SHA; fall back to git (the repo is
  // cloned, so this works too), then to nothing rather than failing the build.
  const fromEnv =
    process.env.WORKERS_CI_COMMIT_SHA ||
    process.env.CF_PAGES_COMMIT_SHA ||
    process.env.GIT_COMMIT;
  if (fromEnv) {
    return fromEnv.slice(0, 7);
  }
  try {
    return execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
  } catch {
    return '';
  }
}

const builtAt = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
const commit = shortSha();

writeFileSync(
  join(root, 'src/app/version.ts'),
  `// GENERATED at build time by scripts/gen-version.mjs — do not edit by hand.\n` +
    `// The committed copy is a placeholder; \`npm run build\` overwrites it.\n` +
    `export const VERSION: { builtAt: string; commit: string } = ${JSON.stringify({ builtAt, commit })};\n`
);
console.log(`version.ts: builtAt="${builtAt}" commit="${commit || '(none)'}"`);
