import { DOCS, GROUPS } from './data.js';
import { docSections } from './content.js';

export const OVERVIEW_URL = `${import.meta.env.BASE_URL}zenderal/`;

// The docs navigation, shared by the overview page and the docs page.
// `href(hash)` builds each link; `onPick` / `onPickSection`, when given, switch
// docs in place instead of following the link. `reading` is the section of the
// active doc currently on screen. The overview lives on its own page, so it's always a plain link.
export default function Sidebar({ active, href, onPick, reading, onPickSection }) {
  const click = (handler, id) => (handler ? handler(id) : undefined);
  return (
    <aside className="side">
      <span className="docs__label">Documentation</span>
      {GROUPS.map((g, gi) => (
        <div key={g} className="side__group">
          <span className="side__group-name">{g}</span>
          {gi === 0 && (
            <a href={OVERVIEW_URL} className={`side__link${active === 'overview' ? ' is-active' : ''}`}>
              <span className="side__dot" />
              Overview
            </a>
          )}
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
