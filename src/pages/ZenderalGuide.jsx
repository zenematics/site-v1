import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import ZenHero from '../zenderal/ZenHero.jsx';
import { OVERVIEW_URL } from '../zenderal/Sidebar.jsx';
import { SECTIONS, SECTION_GROUPS } from '../zenderal/guide/data.js';
import Races from '../zenderal/guide/Races.jsx';
import Affinities from '../zenderal/guide/Affinities.jsx';
import Books from '../zenderal/guide/Books.jsx';
import Combat from '../zenderal/guide/Combat.jsx';
import Firearms from '../zenderal/guide/Firearms.jsx';
import Magic from '../zenderal/guide/Magic.jsx';
import ArmorSets from '../zenderal/guide/ArmorSets.jsx';
import Keybinds from '../zenderal/guide/Keybinds.jsx';
import Controller from '../zenderal/guide/Controller.jsx';
import Perks from '../zenderal/Perks.jsx';
import Prophecy from '../zenderal/guide/Prophecy.jsx';
import Traits from '../zenderal/guide/Traits.jsx';

const DOCS_URL = `${import.meta.env.BASE_URL}zenderal/docs/`;

const BODY = {
  race: Races,
  affinities: Affinities,
  books: Books,
  perks: Perks,
  prophecy: Prophecy,
  traits: Traits,
  combat: Combat,
  firearms: Firearms,
  magic: Magic,
  armor: ArmorSets,
  keys: Keybinds,
  controller: Controller,
};

// Sections folded into another; old links land on the new one.
const ALIASES = { spells: 'magic' };

// Hash routes: #<section-id>.
function readHash() {
  const hash = decodeURIComponent(location.hash.slice(1));
  const id = ALIASES[hash] ?? hash;
  return SECTIONS.some((s) => s.id === id) ? id : SECTIONS[0].id;
}

function scrollToGuide() {
  const el = document.getElementById('guide');
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
}

export default function ZenderalGuide() {
  const [section, setSection] = useState(readHash);

  useEffect(() => {
    const onHash = () => setSection(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const pick = (id) => (e) => {
    e.preventDefault();
    setSection(id);
    history.replaceState(null, '', `#${id}`);
    scrollToGuide();
  };

  const i = SECTIONS.findIndex((s) => s.id === section);
  const cur = SECTIONS[i];
  const prev = SECTIONS[i - 1];
  const next = SECTIONS[i + 1];
  const Body = BODY[section];

  return (
    <div className="zen-page">
      <Nav zenderal="guides" />

      <ZenHero
        eyebrow="Gameplay Guide"
        desc="Races, affinities, perk trees, combat, firearms, magic, gear and controls: how Zenderal plays, with the numbers from the list's own records."
        compact
        bg="ark-with-jespar.webp"
        bgPos="45% 78%"
      />

      <section id="guide" className="docs">
        <aside className="side">
          <span className="docs__label">Guide</span>
          {SECTION_GROUPS.map((g, gi) => (
            <div key={g} className="side__group">
              <span className="side__group-name">{g}</span>
              {SECTIONS.filter((s) => s.group === g).map((s) => (
                <a key={s.id} href={`#${s.id}`} onClick={pick(s.id)} className={`side__link${s.id === section ? ' is-active' : ''}`}>
                  <span className="side__dot" />
                  {s.title}
                </a>
              ))}
              {gi === SECTION_GROUPS.length - 1 && (
                <a href={DOCS_URL} className="side__link">
                  <span className="side__dot" />
                  Documentation
                </a>
              )}
            </div>
          ))}
        </aside>

        {/* Keyed so switching sections remounts it and replays the fade-in. */}
        <article key={section} className="doc">
          <div className="doc__head">
            <span className="docs__label">Zenderal · {cur.group}</span>
            <h2 className="doc__title">{cur.title}</h2>
          </div>

          <Body />

          <div className="pager">
            {prev ? (
              <a href={`#${prev.id}`} onClick={pick(prev.id)} className="pager__link">
                <span className="pager__dir">← Previous</span>
                <span className="pager__title">{prev.title}</span>
              </a>
            ) : (
              <a href={OVERVIEW_URL} className="pager__link">
                <span className="pager__dir">← Previous</span>
                <span className="pager__title">Overview</span>
              </a>
            )}
            <span style={{ flex: 1 }} />
            {next && (
              <a href={`#${next.id}`} onClick={pick(next.id)} className="pager__link pager__link--next">
                <span className="pager__dir">Next →</span>
                <span className="pager__title">{next.title}</span>
              </a>
            )}
          </div>
        </article>
      </section>

      <Footer />
    </div>
  );
}
