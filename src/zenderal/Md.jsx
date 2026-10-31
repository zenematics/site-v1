import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { slugify } from './content.js';
import { DocIcon, HEADING_ICONS, stepIcon } from './DocIcons.jsx';

const textOf = (node) =>
  typeof node === 'string' ? node : Array.isArray(node) ? node.map(textOf).join('') : textOf(node?.props?.children ?? '');

// A `#### ` heading starts a fold-out: it and everything after it, up to the next heading of level 4 or above or
// a `---` rule, become a <details> with the heading as its summary. Used for troubleshooting entries, so a page
// reads as a list of symptoms.
function remarkFolds() {
  return (tree) => {
    const out = [];
    let fold = null;
    for (const node of tree.children) {
      const ends = (node.type === 'heading' && node.depth <= 4) || node.type === 'thematicBreak';
      if (fold && ends) fold = null;
      if (node.type === 'heading' && node.depth === 4) {
        fold = {
          type: 'fold',
          data: { hName: 'details', hProperties: { className: ['md-fold'] } },
          children: [{ type: 'paragraph', data: { hName: 'summary' }, children: node.children }],
        };
        out.push(fold);
      } else if (fold) {
        fold.children.push(node);
      } else {
        out.push(node);
      }
    }
    tree.children = out;
  };
}

// A run of `##### ` headings becomes a set of tabs, one per heading, each holding everything up to the next
// `##### ` heading, a heading of level 4 or above or a `---` rule. A heading that's just an image (a brand logo)
// shows that image on its button. Used for the Performance page's NVIDIA / AMD / Intel settings.
function remarkTabs() {
  return (tree) => {
    const out = [];
    let tabs = null;
    let panel = null;
    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === 5) {
        const img = node.children.find((c) => c.type === 'image');
        const label = img?.alt || node.children.map((c) => c.value ?? '').join('').trim();
        if (!tabs) {
          tabs = { type: 'tabs', data: { hName: 'md-tabs' }, children: [] };
          out.push(tabs);
        }
        panel = { type: 'tab', data: { hName: 'md-tab', hProperties: { label, logo: img?.url } }, children: [] };
        tabs.children.push(panel);
      } else if (tabs && ((node.type === 'heading' && node.depth <= 4) || node.type === 'thematicBreak')) {
        tabs = panel = null;
        out.push(node);
      } else if (panel) {
        panel.children.push(node);
      } else {
        out.push(node);
      }
    }
    tree.children = out;
  };
}

// Graphics card the browser reports (e.g. "ANGLE (NVIDIA, NVIDIA GeForce RTX 4070 ...)"), to preselect its tab.
function gpuName() {
  try {
    const gl = document.createElement('canvas').getContext('webgl');
    const ext = gl?.getExtension('WEBGL_debug_renderer_info');
    const name = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : '';
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return String(name);
  } catch {
    return '';
  }
}

// The tabs from remarkTabs. The pick is kept in this browser; with none saved, the graphics card the browser
// reports picks one, marked as detected so it's clear why.
function Tabs({ children }) {
  const panels = [children].flat().filter((c) => c?.props?.label);
  const labels = panels.map((p) => p.props.label);
  const key = `zen-tab:${slugify(labels.join(' '))}`;
  const [pick, setPick] = useState(null);
  const [detected, setDetected] = useState(null);
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(key);
    } catch {}
    const gpu = gpuName().toLowerCase();
    const found = labels.find((l) => gpu.includes(l.toLowerCase())) ?? null;
    setDetected(found);
    setPick(labels.includes(saved) ? saved : found);
  }, [key]);
  const choose = (label) => {
    setPick(label);
    try {
      localStorage.setItem(key, label);
    } catch {}
  };
  const current = panels.find((p) => p.props.label === pick);
  return (
    <div className="md-tabs">
      <div className="md-tabs__picks" role="tablist">
        {panels.map(({ props: { label, logo } }) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={label === pick}
            className={`md-tabs__pick md-tabs__pick--${slugify(label)}`}
            onClick={() => choose(label)}
          >
            {logo ? <img src={`${import.meta.env.BASE_URL}${logo}`} alt={label} /> : label}
            {label === detected && <span className="md-tabs__detected">Your GPU</span>}
          </button>
        ))}
      </div>
      {current ? (
        <div className="md-tabs__panel" role="tabpanel" aria-label={current.props.label}>
          {current.props.children}
        </div>
      ) : (
        <p className="md-tabs__hint">Pick your graphics card's maker to see its settings.</p>
      )}
    </div>
  );
}

// A task-list item (`- [ ] ...`) the reader can tick; the tick is kept in this browser, keyed by the item's text.
function CheckItem({ children }) {
  const key = `zen-check:${slugify(textOf(children)).slice(0, 60)}`;
  const title = textOf([children].flat().find((c) => c?.type === 'strong') ?? '');
  const icon = stepIcon(title);
  const [done, setDone] = useState(false);
  useEffect(() => {
    try {
      setDone(localStorage.getItem(key) === '1');
    } catch {}
  }, [key]);
  const toggle = () => {
    setDone(!done);
    try {
      localStorage.setItem(key, done ? '0' : '1');
    } catch {}
  };
  return (
    <li className={`md-check${done ? ' is-done' : ''}`}>
      <button type="button" className="md-check__box" aria-pressed={done} onClick={toggle}>
        <span className="sr-only">{done ? 'Mark as not done' : 'Mark as done'}</span>
      </button>
      {icon && <DocIcon name={icon} className="md-check__icon" />}
      <div className="md-check__body">{children}</div>
    </li>
  );
}

// `## ` headings get ids so the sidebar can link to them; external links open in a new tab;
// relative image paths (e.g. `uploads/foo.png`) resolve against the site's base path.
const mdComponents = {
  'md-tabs': ({ node, children }) => <Tabs>{children}</Tabs>,
  'md-tab': ({ node, children }) => children,
  a: ({ node, href, ...props }) =>
    /^https?:/.test(href ?? '') ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
  img: ({ node, src, alt, ...props }) => (
    <img
      src={/^(https?:|\/)/.test(src ?? '') ? src : `${import.meta.env.BASE_URL}${src}`}
      alt={alt}
      loading="lazy"
      {...props}
    />
  ),
  li: ({ node, className, children, ...props }) => {
    if (!className?.includes('task-list-item')) return <li className={className} {...props}>{children}</li>;
    // drop GFM's own disabled checkbox
    const rest = [children].flat().filter((c) => !(c?.type === 'input' || c?.props?.type === 'checkbox'));
    return <CheckItem>{rest}</CheckItem>;
  },
  h2: ({ node, children, ...props }) => {
    const id = slugify(textOf(children));
    return (
      <h2 id={id} {...props}>
        {HEADING_ICONS[id] && <DocIcon name={HEADING_ICONS[id]} className="md-h2-icon" />}
        {children}
      </h2>
    );
  },
};

export default function Md({ children }) {
  return (
    <div className="md">
      <Markdown remarkPlugins={[remarkGfm, remarkTabs, remarkFolds]} components={mdComponents}>
        {children}
      </Markdown>
    </div>
  );
}
