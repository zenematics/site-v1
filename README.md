# Zenematics site

Website for [Zenematics](https://www.youtube.com/@Zenematics) and **Zenderal**, an Enderal SE modlist. Live at **[zenematics.com](https://zenematics.com/)**. It's a static React 19 + Vite multi-page site, deployed to GitHub Pages.

![Zenematics home page: Watch Zen, Build Guides and Zenderal panels](docs/screenshot.webp)

## Pages

| URL | What it is |
| --- | --- |
| `/` | Home: hero panels, socials |
| `/zenderal/` | Zenderal modlist overview |
| `/zenderal/docs/` | Docs: readme, controller support, DLSS & Frame Gen, FAQ |

## Getting started

Requires Node 22 (the version CI uses).

```sh
npm install
npm run dev       # Vite dev server
npm run build     # production build to dist/
npm run preview   # serve the built dist/
```

Fonts (Futura PT) load from Adobe Fonts. To use them locally, create a `.env` file in the project root (it's gitignored):

```
VITE_TYPEKIT_ID=your_kit_id
```

Without it the site falls back to Futura / Trebuchet MS.

## Project layout

```
content/zenderal/     Markdown docs, generated spells.json / perks.json
public/uploads/       Static images and other assets
scripts/              Importers for spell and perk data
src/pages/            Page components (Home, Zenderal, ZenderalDocs)
src/zenderal/         Zenderal components, content loader, structured data
src/config.js         Release stage, social links, home hero video IDs
index.html, zenderal/ HTML entry points (registered in vite.config.js)
```

## Editing content

- **Docs and guides:** edit the Markdown in `content/zenderal/`. It's loaded at build time.
- **FAQ, controller setup, doc list:** `src/zenderal/data.js`. A new entry in `DOCS` also needs rendering in `src/pages/ZenderalDocs.jsx`.
- **Release stage, socials, hero videos:** `src/config.js`.
- **Spells and perk trees:** generated from the sibling `zenderal-patches` repo:

  ```sh
  npm run import:spells [path/to/spells.json]
  npm run import:perks  [path/to/perks.json]
  ```

### Adding a page

1. Add an HTML file and register it in `rollupOptions.input` in `vite.config.js`.
2. Add an entry script in `src/` and a page component in `src/pages/`.

### Links and assets

The base path comes from the Pages config at build time (it is a sub-path when there is no custom domain), so build internal links and asset URLs from `import.meta.env.BASE_URL`, never hard-coded absolute paths:

```jsx
<img src={`${import.meta.env.BASE_URL}uploads/foo.png`} />
```

## Deployment

Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`. The workflow sets `BASE_PATH` from the Pages config and reads `VITE_TYPEKIT_ID` from the repo variable of the same name.
