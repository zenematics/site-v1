# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/`

There are no tests or linters configured.

## Architecture

Static React 19 + Vite multi-page site (no router library) for Zenematics and its Zenderal modlist (an Enderal SE modlist). Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

### Pages / entry points

Each page is a separate HTML entry registered in `vite.config.js` `rollupOptions.input`; adding a page means adding an HTML file there plus an entry script:

| URL | HTML | Entry script | Page component |
| --- | --- | --- | --- |
| `/` | `index.html` | `src/main.jsx` | `src/pages/Home.jsx` |
| `/zenderal/` | `zenderal/index.html` | `src/zenderal.jsx` | `src/pages/Zenderal.jsx` (overview) |
| `/zenderal/docs/` | `zenderal/docs/index.html` | `src/zenderal-docs.jsx` | `src/pages/ZenderalDocs.jsx` |

The docs page uses hash routing (`#<doc-id>`, `#readme/<section>`, `#quests/<slug>`) parsed in `readHash()`. `src/zenderal/Sidebar.jsx` is shared by the overview and docs pages: on the overview it renders plain links into the docs page; on the docs page it switches docs in place via `onPick`/`onPickSection`.

### Base path

GitHub Pages serves under `/<repo>/`, so the deploy sets `BASE_PATH` and Vite's `base`. Internal links and asset URLs in JSX must be built from `import.meta.env.BASE_URL` (e.g. `` `${import.meta.env.BASE_URL}uploads/foo.png` ``), never hard-coded absolute paths. Static assets live in `public/uploads/`.

### Content

- **Markdown content** lives in `content/zenderal/` and is loaded at build time by `src/zenderal/content.js` via `import.meta.glob(..., { query: '?raw', eager: true })` with a minimal hand-rolled frontmatter parser (`key: value` lines only). The file header comment there documents what each file maps to. Quest guides in `quests/<slug>.md` use frontmatter `title`, `status`, `order`; an empty body renders as a "coming soon" card.
- Readme `## ` headings become sidebar sub-links; `slugify` in `content.js` must stay shared between `Md.jsx` (heading ids) and the sidebar.
- **Structured data** (doc list/groups, controller setup, FAQ) is in `src/zenderal/data.js`. Adding a doc to `DOCS` also requires rendering it in `ZenderalDocs.jsx`.
- **Site config** in `src/config.js`: Zenderal release stage, social links, and YouTube IDs for the home hero panel videos.

### Styling and fonts

Plain CSS: `src/index.css` (global + home) and `src/zenderal.css` (Zenderal pages), BEM-ish class names. Futura PT is loaded from Adobe Fonts using `VITE_TYPEKIT_ID`, substituted into each HTML file via `%VITE_TYPEKIT_ID%` — set locally in `.env` (gitignored) and in CI via the repo variable `vars.VITE_TYPEKIT_ID`.
