import { useEffect, useRef } from 'react';
import { DOCS, GROUPS } from './data.js';
import { docSections } from './content.js';

export const OVERVIEW_URL = `${import.meta.env.BASE_URL}zenderal/`;

// Scrolls a sideways row so its active item sits in the middle, without
// moving the page (scrollIntoView would also scroll the window).
function useCentreActive(dep) {
  const ref = useRef(null);
  useEffect(() => {
    const row = ref.current;
    const el = row?.querySelector('.is-active');
    if (!el) return;
    const left = el.offsetLeft - (row.clientWidth - el.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [dep]);
  return ref;
}

// Small screens: a bar pinned under the nav. The top row links the docs; the
// second lists the active doc's sections and follows the one being read.
function DocBar({ active, href, click, onPick, reading, onPickSection }) {
  const subs = docSections[active];
  const pages = useCentreActive(active);
  const sections = useCentreActive(`${active}/${reading}`);
  return (
    <nav className="docbar" aria-label="Documentation">
      <div className="docbar__row" ref={pages}>
        {DOCS.map((d) => (
          <a
            key={d.id}
            href={href(d.id)}
            onClick={click(onPick, d.id)}
            className={`docbar__link${d.id === active ? ' is-active' : ''}`}
            aria-current={d.id === active ? 'page' : undefined}
          >
            {d.title}
          </a>
        ))}
      </div>
      {subs && (
        <div className="docbar__row docbar__row--subs" ref={sections}>
          {subs.map((s) => (
            <a
              key={s.id}
              href={href(`${active}/${s.id}`)}
              onClick={click(onPickSection, `${active}/${s.id}`)}
              className={`docbar__sub${s.id === reading ? ' is-active' : ''}`}
              aria-current={s.id === reading ? 'location' : undefined}
            >
              {s.title}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// The docs page navigation: a sidebar on wide screens, DocBar on small ones.
// `href(hash)` builds each link; `onPick` / `onPickSection`, when given, switch
// docs in place instead of following the link. `reading` is the section of the
// active doc currently on screen; only the active doc's sections are listed.
export default function Sidebar({ active, href, onPick, reading, onPickSection }) {
  const click = (handler, id) => (handler ? handler(id) : undefined);
  return (
    <>
      <DocBar active={active} href={href} click={click} onPick={onPick} reading={reading} onPickSection={onPickSection} />
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
                {d.id === active && docSections[d.id] && (
                  <div className="side__subs">
                    {docSections[d.id].map((s) => (
                      <a
                        key={s.id}
                        href={href(`${d.id}/${s.id}`)}
                        onClick={click(onPickSection, `${d.id}/${s.id}`)}
                        className={`side__sub${s.id === reading ? ' is-active' : ''}`}
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
    </>
  );
}
