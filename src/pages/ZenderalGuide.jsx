import { lazy, Suspense } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import ZenHero from '../zenderal/ZenHero.jsx';
import { SECTIONS, SECTION_GROUPS, SECTION_ALIASES } from '../zenderal/guide/sections.js';

const GUIDE_URL = `${import.meta.env.BASE_URL}zenderal/guide/`;
const DOCS_URL = `${import.meta.env.BASE_URL}zenderal/docs/`;
const UPLOADS = `${import.meta.env.BASE_URL}uploads/`;
const pageUrl = (id) => `${GUIDE_URL}${id}/`;

// Loaded per page, so the overview and each section only fetch their own code and data.
const BODY = {
  races: lazy(() => import('../zenderal/guide/Races.jsx')),
  affinities: lazy(() => import('../zenderal/guide/Affinities.jsx')),
  books: lazy(() => import('../zenderal/guide/Books.jsx')),
  perks: lazy(() => import('../zenderal/Perks.jsx')),
  prophecy: lazy(() => import('../zenderal/guide/Prophecy.jsx')),
  traits: lazy(() => import('../zenderal/guide/Traits.jsx')),
  combat: lazy(() => import('../zenderal/guide/Combat.jsx')),
  firearms: lazy(() => import('../zenderal/guide/Firearms.jsx')),
  magic: lazy(() => import('../zenderal/guide/Magic.jsx')),
  'armor-sets': lazy(() => import('../zenderal/guide/ArmorSets.jsx')),
  keybindings: lazy(() => import('../zenderal/guide/Keybinds.jsx')),
  controller: lazy(() => import('../zenderal/guide/Controller.jsx')),
};

// The guide used hash routes (#<section-id>) before each section got its own page.
function redirectOldHash() {
  const hash = decodeURIComponent(location.hash.slice(1));
  const id = SECTION_ALIASES[hash] ?? hash;
  if (SECTIONS.some((s) => s.id === id)) location.replace(pageUrl(id));
}

function Overview() {
  redirectOldHash();
  return (
    <section className="zexplore guide-index">
      {SECTION_GROUPS.map((g) => (
        <div key={g} className="zexplore__group">
          <span className="docs__label">{g}</span>
          <div className="zexplore__grid">
            {SECTIONS.filter((s) => s.group === g).map((s) => (
              <a key={s.id} href={pageUrl(s.id)} className="zcard gcard">
                <span className={`gcard__art${s.img ? '' : ' gcard__art--none'}`}>
                  <img src={`${UPLOADS}${s.img ?? 'zenderal-emblem.webp'}`} alt="" loading="lazy" />
                </span>
                <h3 className="zcard__title">{s.title}</h3>
                <p className="zcard__text">{s.desc}</p>
                <span className="zcard__go" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function Section({ id }) {
  const i = SECTIONS.findIndex((s) => s.id === id);
  const cur = SECTIONS[i];
  const prev = SECTIONS[i - 1];
  const next = SECTIONS[i + 1];
  const Body = BODY[id];

  return (
    <section className="docs docs--single">
      <article className="doc">
        <div className="doc__head">
          <span className="docs__label">
            <a href={GUIDE_URL} className="doc__crumb">Guide</a> · {cur.group}
          </span>
          <h2 className="doc__title">{cur.title}</h2>
        </div>

        <Suspense fallback={null}>
          <Body />
        </Suspense>

        <div className="pager">
          <a href={prev ? pageUrl(prev.id) : GUIDE_URL} className="pager__link">
            <span className="pager__dir">← Previous</span>
            <span className="pager__title">{prev ? prev.title : 'All guides'}</span>
          </a>
          <span style={{ flex: 1 }} />
          <a href={next ? pageUrl(next.id) : DOCS_URL} className="pager__link pager__link--next">
            <span className="pager__dir">Next →</span>
            <span className="pager__title">{next ? next.title : 'Documentation'}</span>
          </a>
        </div>
      </article>
    </section>
  );
}

// `section`: the guide page this is (an id from SECTIONS), or none for the overview.
export default function ZenderalGuide({ section }) {
  const cur = SECTIONS.find((s) => s.id === section);
  return (
    <div className="zen-page">
      {/* Section pages keep the Guides link, back to the overview. */}
      <Nav zenderal={cur ? 'guide' : 'guides'} />

      <ZenHero
        eyebrow={cur ? 'Gameplay Guide' : 'Gameplay Guides'}
        desc={
          cur
            ? cur.desc
            : 'Races, affinities, perk trees, combat, firearms, magic, gear and controls: how Zenderal plays, with the numbers from the list\'s own records.'
        }
        compact
        bg={cur?.bg ?? 'ark-with-jespar.webp'}
        bgPos={cur?.bg ? cur.bgPos : '45% 78%'}
      />

      {cur ? <Section id={cur.id} /> : <Overview />}

      <Footer />
    </div>
  );
}
