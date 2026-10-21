# MARP Presentations

Each folder is a deck: `presentation.md` + `assets/` + `diagrams/`, styled by
`themes/sgpgi-scholar.css`.

## Local live preview (replacement for the VS Code Marp preview)

```bash
node scripts/preview.mjs                # all decks, http://localhost:8123/
node scripts/preview.mjs "Real World Evidence"   # a single deck
PORT=9000 node scripts/preview.mjs      # custom port
```

- Watches `presentation.md` and `themes/*.css`; re-renders on save
- Injects an auto-reload snippet, so your browser tab refreshes automatically
- In the browser: **S** = slide mode, **P** = presenter view (speaker notes +
  next slide — same as the VS Code Marp presenter)

Uses `@marp-team/marp-cli` via npx (cached after first run). To speed up
re-renders: `npm init -y && npm i -D @marp-team/marp-cli` — the scripts
automatically prefer the local install when present.

## One-shot render to static HTML (same layout as the GitHub Pages CI)

```bash
node scripts/render.mjs                # all decks -> _site/
node scripts/render.mjs "Real World Evidence"
npx serve _site                        # browse locally
```

## Deploy

Push to `main` — `.github/workflows/deploy-pages.yml` rebuilds everything and
publishes to GitHub Pages.
