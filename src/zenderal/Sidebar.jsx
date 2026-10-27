import { DOCS, GROUPS } from './data.js';
import { docSections } from './content.js';

export const OVERVIEW_URL = `${import.meta.env.BASE_URL}zenderal/`;

// The docs page navigation.
// `href(hash)` builds each link; `onPick` / `onPickSection`, when given, switch
// docs in place instead of following the link. `reading` is the section of the
// active doc currently on screen.
export default function Sidebar({ active, href, onPick, reading, onPickSection }) {
  const click = (handler, id) => (handler ? handler(id) : undefined);
  return (
    <aside className="side">
      <span className="docs__label">Documentation</span>
      {GROUPS.map((g) => (
        <div key={g} className="side__group">
          <span className="side__group-name">{g}</span>
          {DOCS.filter((d) => d.group === g).map((d) => (
            <div key={d.id}>
              <a href={href(d.id)} onClick={click(onPick, d.id)} className={`side__link${d.id === active ? ' is-active' : ''}`}>
                <span className="side__dot" />
                {d.title}
              </a>
              {docSections[d.id] && (
                <div className="side__subs">
                  {docSections[d.id].map((s) => (
                    <a
                      key={s.id}
                      href={href(`${d.id}/${s.id}`)}
                      onClick={click(onPickSection, `${d.id}/${s.id}`)}
                      className={`side__sub${d.id === active && s.id === reading ? ' is-active' : ''}`}
                    >
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}
