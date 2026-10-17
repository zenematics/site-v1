import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { slugify } from './content.js';

const textOf = (node) =>
  typeof node === 'string' ? node : Array.isArray(node) ? node.map(textOf).join('') : textOf(node?.props?.children ?? '');

// `## ` headings get ids so the sidebar can link to them; external links open in a new tab;
// relative image paths (e.g. `uploads/foo.png`) resolve against the site's base path.
const mdComponents = {
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
  h2: ({ node, children, ...props }) => (
    <h2 id={slugify(textOf(children))} {...props}>
      {children}
    </h2>
  ),
};

export default function Md({ children }) {
  return (
    <div className="md">
      <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>{children}</Markdown>
    </div>
  );
}
