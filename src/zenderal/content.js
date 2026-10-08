// Markdown-driven docs content. Edit the files under /content/zenderal — no code changes needed.
//   readme.md            → Readme page
//   quests/_intro.md     → intro paragraph above the quest guide cards
//   quests/<slug>.md     → one quest guide; frontmatter: title, status, order.
//                          A guide with body text becomes a readable page; an empty one is a "coming soon" card.

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

// Heading text → anchor id, shared by the markdown renderer and the sidebar.
export const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// The readme's `## ` headings, listed under Readme in the sidebar.
export const readmeSections = [...readme.matchAll(/^## +(.+)$/gm)].map(([, title]) => ({
  id: slugify(title),
  title: title.trim(),
}));

export const questIntro = get('quests/_intro.md').body;

export const quests = Object.entries(files)
  .filter(([path]) => path.startsWith(PREFIX + 'quests/') && !path.endsWith('/_intro.md'))
  .map(([path, src]) => {
    const slug = path.slice((PREFIX + 'quests/').length, -'.md'.length);
    const { data, body } = parse(src);
    return {
      slug,
      title: data.title || slug,
      status: data.status || '',
      order: Number(data.order ?? Infinity),
      body,
    };
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
