import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// One page per guide section, written by `npm run gen:guide` to zenderal/guide/<id>/.
const guidePages = Object.fromEntries(
  readdirSync(resolve(import.meta.dirname, 'zenderal/guide'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => [`zenderalGuide-${d.name}`, resolve(import.meta.dirname, 'zenderal/guide', d.name, 'index.html')])
);

export default defineConfig({
  // GitHub Pages serves the site under /<repo>/; the deploy workflow sets BASE_PATH
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        zenderal: resolve(import.meta.dirname, 'zenderal/index.html'),
        zenderalDocs: resolve(import.meta.dirname, 'zenderal/docs/index.html'),
        zenderalGuide: resolve(import.meta.dirname, 'zenderal/guide/index.html'),
        ...guidePages,
      },
    },
  },
});
