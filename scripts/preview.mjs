#!/usr/bin/env node
// Live preview for MARP decks: watches presentation.md + themes, re-renders to
// _site/, and serves them with browser auto-reload. This is the Orca/CLI
// replacement for the VS Code Marp extension's live preview.
//
// Usage:
//   node scripts/preview.mjs              # preview all decks
//   node scripts/preview.mjs <deck>...    # preview specific deck folder(s)
//   PORT=9000 node scripts/preview.mjs    # custom port (default 8123)
//
// In the browser: press S for slide mode, P for presenter view (notes + next slide).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const theme = path.join(root, 'themes', 'sgpgi-scholar.css');
const site = path.join(root, '_site');
const port = Number(process.env.PORT || 8123);
const localBin = path.join(root, 'node_modules', '.bin', 'marp');
const useLocal = fs.existsSync(localBin);
const AUTO_RELOAD = `<script>(function(){var b=-1;function t(){fetch('/__build').then(function(r){return r.text()}).then(function(c){if(b>=0&&c!==b)location.reload();b=c}).catch(function(){})}t();setInterval(t,1500);})();</script>`;

const args = process.argv.slice(2);
let decks;
if (args.length) {
  decks = args.map((a) => path.resolve(a, 'presentation.md').replace(/\/presentation\.md$/, ''));
} else {
  decks = fs.readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && e.name !== '_site' && e.name !== 'node_modules')
    .map((e) => e.name)
    .filter((n) => fs.existsSync(path.join(root, n, 'presentation.md')))
    .map((n) => path.join(root, n));
}

let buildId = 0;
const pending = new Set();

function renderDeck(name) {
  if (pending.has(name)) return;
  pending.add(name);
  const src = path.join(name, 'presentation.md');
  const destDir = path.join(site, path.basename(name));
  fs.mkdirSync(destDir, { recursive: true });
  for (const a of ['assets', 'diagrams']) {
    const srcA = path.join(name, a);
    if (fs.existsSync(srcA)) fs.cpSync(srcA, path.join(destDir, a), { recursive: true });
  }
  const out = path.join(destDir, 'index.html');
  const label = path.basename(name);
  const started = Date.now();
  console.log(`[render] ${name} ...`);
  const cmd = useLocal ? localBin : 'npx';
  const argv = useLocal
    ? [localBin, '--theme-set', theme, '--html', src, '-o', out]
    : ['-y', '@marp-team/marp-cli', '--theme-set', theme, '--html', src, '-o', out];
  const child = spawn(cmd, argv, { stdio: ['ignore', 'pipe', 'inherit'] });
  child.stdout.on('data', () => {}); // keep the INFO lines quiet
  child.on('close', (code) => {
    pending.delete(name);
    if (code === 0) {
      buildId += 1;
      console.log(`[render] ${label} done in ${Date.now() - started}ms (build ${buildId})`);
    } else {
      console.error(`[render] ${label} failed (exit ${code})`);
    }
  });
}

// --- watch -----------------------------------------------------------------
function watch(dir) {
  let t;
  fs.watch(dir, { recursive: true }, (event, file) => {
    if (!file) return;
    const f = String(file);
    if (!f.endsWith('presentation.md') && !f.endsWith('.css')) return;
    clearTimeout(t);
    t = setTimeout(() => {
      // theme change -> re-render everything; otherwise just the deck in this dir
      if (f.endsWith('.css') && path.dirname(f) !== dir) for (const d of decks) renderDeck(d);
      else renderDeck(dir);
    }, 300);
  });
}
for (const name of decks) watch(name);
watch(path.join(root, 'themes'));

// --- http server ------------------------------------------------------------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/__build') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end(String(buildId));
    return;
  }
  let p = decodeURIComponent(url.pathname);
  if (p === '/') p = '/index.html';
  const file = path.normalize(path.join(site, p));
  if (!file.startsWith(site)) { res.writeHead(403); res.end('forbidden'); return; }
  const target = fs.existsSync(file) && fs.statSync(file).isDirectory() ? path.join(file, 'index.html') : file;
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) { res.writeHead(404); res.end('not found'); return; }
  let body = fs.readFileSync(target);
  if (target.endsWith('.html')) {
    // inject auto-reload snippet before </body>
    const html = body.toString('utf8');
    const i = html.indexOf('</body>');
    body = Buffer.from(i === -1 ? html + AUTO_RELOAD : html.slice(0, i) + AUTO_RELOAD + html.slice(i));
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(target).toLowerCase()] || 'application/octet-stream' });
  res.end(body);
});

// initial render, then start serving
fs.mkdirSync(site, { recursive: true });
for (const d of decks) renderDeck(d);
server.listen(port, () => {
  console.log(`\n  Live preview: http://localhost:${port}/`);
  for (const d of decks) console.log(`   http://localhost:${port}/${encodeURIComponent(path.basename(d))}/`);
  console.log('  (S = slide mode, P = presenter view in the browser; auto-reloads on save)\n');
});
