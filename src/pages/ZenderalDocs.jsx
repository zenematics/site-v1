import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { DOCS, CONTROLLER_SETUP, FAQ } from '../zenderal/data.js';
import { readme, readmeSections, questIntro, quests } from '../zenderal/content.js';
import Md from '../zenderal/Md.jsx';
import ZenHero from '../zenderal/ZenHero.jsx';
import Sidebar, { OVERVIEW_URL } from '../zenderal/Sidebar.jsx';

// Hash routes: #<doc-id>, #readme/<section> for a readme heading, or
// #quests/<slug> for a single quest guide.
function readHash() {
  const [doc, sub] = decodeURIComponent(location.hash.slice(1)).split('/');
  if (!DOCS.some((d) => d.id === doc)) return { doc: 'readme', quest: null, section: null };
  const q = doc === 'quests' && quests.find((g) => g.slug === sub && g.body);
  const section = doc === 'readme' && readmeSections.some((s) => s.id === sub) ? sub : null;
  return { doc, quest: q ? q.slug : null, section };
}

function scrollToDocs() {
  const el = document.getElementById('docs');
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
}

function Controller() {
  return (
    <div className="doc-stack">
      <p>Zenderal is set up to play fully on a gamepad. Connect your controller before launching through Mod Organizer 2.</p>
      <h3 className="doc-h3">Setup</h3>
      <div className="bullets">
        {CONTROLLER_SETUP.map((t) => (
          <div key={t} className="bullet">
            <span className="bullet__dot" />
            <span>{t}</span>
          </div>
        ))}
      </div>
      <h3 className="doc-h3">Bindings</h3>
      <p>The full binding map will be published here with the next alpha.</p>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {FAQ.map((f, k) => {
        const isOpen = open === k;
        return (
          <div key={f.q} className="faq__item">
            <button type="button" className="faq__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : k)}>
              <span>{f.q}</span>
              <span className="faq__chev" style={{ transform: `rotate(${isOpen ? '-135deg' : '45deg'})` }} />
            </button>
            <div className="faq__a" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuestIndex({ onOpen }) {
  return (
    <div className="doc-stack">
      {questIntro && <Md>{questIntro}</Md>}
      <div className="quest-grid">
        {quests.map((q) =>
          q.body ? (
            <a key={q.slug} href={`#quests/${q.slug}`} className="quest-card quest-card--link" onClick={onOpen(q.slug)}>
              <span className="quest-card__title">{q.title}</span>
              <span className="quest-card__status">{q.status || 'Read guide'}</span>
            </a>
          ) : (
            <div key={q.slug} className="quest-card">
              <span className="quest-card__title">{q.title}</span>
              <span className="quest-card__status">{q.status}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// Scroll spy: the readme heading currently being read — the last one scrolled
// past the top of the viewport, or the final one once the page bottoms out.
function useReadingSection(enabled) {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    if (!enabled) return setCurrent(null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const heads = readmeSections.map((s) => document.getElementById(s.id)).filter(Boolean);
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
      const line = innerHeight * 0.3;
      const passed = heads.filter((h) => h.getBoundingClientRect().top <= line);
      setCurrent((atBottom ? heads.at(-1) : passed.at(-1))?.id ?? null);
    };
    const onScroll = () => frame || (frame = requestAnimationFrame(update));
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, [enabled]);
  return current;
}

export default function ZenderalDocs() {
  const [route, setRoute] = useState(readHash);
  const { doc, quest, section } = route;

  useEffect(() => {
    const onHash = () => setRoute(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (hash, next) => (e) => {
    e?.preventDefault();
    setRoute(next);
    history.replaceState(null, '', `#${hash}`);
    scrollToDocs();
  };
  const pick = (id) => go(id, { doc: id, quest: null, section: null });
  const openQuest = (slug) => go(`quests/${slug}`, { doc: 'quests', quest: slug, section: null });
  const pickSection = (id) => (e) => {
    e.preventDefault();
    setRoute({ doc: 'readme', quest: null, section: id });
    history.replaceState(null, '', `#readme/${id}`);
  };

  // Scroll to a readme heading once it has rendered (also on first load, and
  // again when the same link is clicked twice — each click is a new route object).
  useEffect(() => {
    const el = section && document.getElementById(section);
    if (!el) return;
    // Measure past the doc's fade-up offset so a freshly mounted doc doesn't overshoot.
    const lift = new DOMMatrix(getComputedStyle(el.closest('.doc')).transform).m42;
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    scrollTo({ top: el.getBoundingClientRect().top + scrollY - lift - margin, behavior: 'smooth' });
  }, [route, section]);

  const reading = useReadingSection(doc === 'readme');

  const i = DOCS.findIndex((d) => d.id === doc);
  const cur = DOCS[i];
  const prev = i > 0 ? DOCS[i - 1] : null;
  const next = i < DOCS.length - 1 ? DOCS[i + 1] : null;
  const questDoc = quest ? quests.find((q) => q.slug === quest) : null;

  return (
    <div className="zen-page">
      <Nav />

      <ZenHero eyebrow="Documentation" desc="Everything you need to install, set up and play Zenderal." compact />

      <section id="docs" className="docs">
        <Sidebar
          active={doc}
          href={(hash) => `#${hash}`}
          onPick={pick}
          reading={reading}
          onPickSection={pickSection}
        />

        {/* Keyed so switching docs remounts it and replays the fade-in. */}
        <article key={`${doc}/${quest ?? ""}`} className="doc">
          <div className="doc__head">
            {questDoc ? (
              <a href="#quests" onClick={pick('quests')} className="doc__back">← All quest guides</a>
            ) : (
              <span className="docs__label">Zenderal · {cur.group}</span>
            )}
            <h2 className="doc__title">{questDoc ? questDoc.title : cur.title}</h2>
          </div>

          {doc === 'readme' && <Md>{readme}</Md>}
          {doc === 'controller' && <Controller />}
          {doc === 'quests' && (questDoc ? <Md>{questDoc.body}</Md> : <QuestIndex onOpen={openQuest} />)}
          {doc === 'faq' && <Faq key={doc} />}

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
