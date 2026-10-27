// Markdown-driven docs content. Edit the files under /content/zenderal — no code changes needed.
//   readme.md            → Readme doc
//   render-pipeline.md   → DLSS & Frame Gen doc (Theo's Render Pipeline troubleshooting)

const files = import.meta.glob('../../content/zenderal/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const PREFIX = '../../content/zenderal/';

// Minimal frontmatter parser: `key: value` lines between leading `---` fences.
function parse(src) {
  const text = src.replace(/\r\n/g, '\n');
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!m) return { data: {}, body: text.trim() };
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return { data, body: text.slice(m[0].length).trim() };
}

const get = (path) => (files[PREFIX + path] != null ? parse(files[PREFIX + path]) : { data: {}, body: '' });

export const readme = get('readme.md').body;
export const renderPipeline = get('render-pipeline.md').body;

// Heading text → anchor id, shared by the markdown renderer and the sidebar.
export const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const sectionsOf = (body) =>
  [...body.matchAll(/^## +(.+)$/gm)].map(([, title]) => ({ id: slugify(title), title: title.trim() }));

// Each markdown doc's `## ` headings, listed under it in the sidebar. Keyed by doc id.
export const docSections = {
  readme: sectionsOf(readme),
  dlss: sectionsOf(renderPipeline),
};
