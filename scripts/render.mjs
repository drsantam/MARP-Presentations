#!/usr/bin/env node
// Render presentation decks to _site/ (same output layout as the GitHub Pages CI).
// Usage:
//   node scripts/render.mjs            # render all decks
//   node scripts/render.mjs <deck>...  # render specific deck folder(s)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const theme = path.join(root, 'themes', 'sgpgi-scholar.css');
const site = path.join(root, '_site');
const cli = path.join(root, 'node_modules', '.bin', 'marp');
const useLocal = fs.existsSync(cli);

function findDecks() {
  const args = process.argv.slice(2);
  if (args.length) return args.map((a) => path.resolve(a, 'presentation.md').replace(/\/presentation\.md$/, ''));
  const out = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === '_site' || entry.name === 'node_modules') continue;
    if (fs.existsSync(path.join(root, entry.name, 'presentation.md'))) out.push(entry.name);
  }
  return out;
}

for (const name of findDecks()) {
  const src = path.join(name, 'presentation.md');
  if (!fs.existsSync(src)) {
    console.error(`skip: ${src} not found`);
    continue;
  }
  const destDir = path.join(site, path.basename(name));
  fs.mkdirSync(destDir, { recursive: true });
  for (const a of ['assets', 'diagrams']) {
    const srcA = path.join(name, a);
    if (fs.existsSync(srcA)) fs.cpSync(srcA, path.join(destDir, a), { recursive: true });
  }
  const out = path.join(destDir, 'index.html');
  console.log(`Rendering ${name} ...`);
  const cmd = useLocal ? cli : 'npx';
  const argv = useLocal
    ? [cli, '--theme-set', theme, '--html', src, '-o', out]
    : ['-y', '@marp-team/marp-cli', '--theme-set', theme, '--html', src, '-o', out];
  execFileSync(cmd, argv, { stdio: ['ignore', 'inherit', 'inherit'] });
  console.log(`  -> _site/${path.basename(name)}/index.html`);
}
console.log(`Done. Serve with:  npx serve ${path.relative(root, site)}`);
