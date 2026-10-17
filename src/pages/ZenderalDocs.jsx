import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { DOCS, FAQ } from '../zenderal/data.js';
import { readme, docSections, renderPipeline } from '../zenderal/content.js';
import Md from '../zenderal/Md.jsx';
import Gamepad, { GamepadLists } from '../zenderal/Gamepad.jsx';
import ZenHero from '../zenderal/ZenHero.jsx';
import Sidebar, { OVERVIEW_URL } from '../zenderal/Sidebar.jsx';

// Docs that moved to the gameplay guide; old links are sent on to it.
const MOVED = ['spells', 'perks'];
const GUIDE_URL = `${import.meta.env.BASE_URL}zenderal/guide/`;

// Hash routes: #<doc-id>, or #<doc-id>/<section> for a heading in a sectioned doc.
function readHash() {
  const [doc, sub] = decodeURIComponent(location.hash.slice(1)).split('/');
  if (MOVED.includes(doc)) location.replace(`${GUIDE_URL}#${doc}`);
  if (!DOCS.some((d) => d.id === doc)) return { doc: 'readme', section: null };
  const section = docSections[doc]?.some((s) => s.id === sub) ? sub : null;
  return { doc, section };
}

function scrollToDocs() {
  const el = document.getElementById('docs');
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
}

// Screenshot that opens full size in a new tab.
function Shot({ file, alt }) {
  const src = `${import.meta.env.BASE_URL}uploads/controller/${file}`;
  return (
    <a href={src} target="_blank" rel="noopener noreferrer" className="doc-shot">
      <img src={src} alt={alt} loading="lazy" />
    </a>
  );
}

// Uses the markdown styles so it reads like the readme; the interactive pad and
// binding lists sit outside .md so its list styles don't reach them.
function Controller() {
  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Zenderal supports controllers <strong>out of the box</strong>. There's nothing extra to install, just two
          things to check before you play.
        </p>

        <h2>Button layout</h2>
      </div>
      <Gamepad />
      <div className="md">
        <blockquote>
          <p>
            <strong>Character creation</strong>
            Character creation needs a mouse and keyboard. Once your character is made, you can switch to the controller.
          </p>
        </blockquote>

        <h2>Before you play</h2>
        <h3>1. Enable Steam Input for Enderal</h3>
        <p>
          In your Steam library, open the controller settings for <strong>Enderal: Forgotten Stories (Special
          Edition)</strong>. The top should read <strong>Using Steam Input Translation</strong>. If it offers to enable
          Steam Input instead, turn it on.
        </p>
        <Shot file="zenderal-steam-input.png" alt="Enderal SE controller settings in Steam showing Using Steam Input Translation" />
        <blockquote>
          <p>
            <strong>Set it per game</strong>
            Steam Input should be on for Enderal only, not across Steam. In Steam's <strong>Settings → Controller</strong>,
            under the advanced options, turn off the global toggles such as <strong>Enable Steam Input for Xbox
            controllers</strong>, then enable it for Enderal from the game's own controller settings as above.
          </p>
        </blockquote>

        <h3>2. Keep the controller mods enabled</h3>
        <p>
          In Mod Organizer 2, the <strong>Controller Support</strong> section holds the mods that make it work. They're
          enabled by default, so just make sure all four are still ticked.
        </p>
        <Shot file="zenderal-controller-mods.png" alt="Controller Support mods in Mod Organizer 2: Auto Input Switch, Gamepad++, Complete Controller Setup, Zenderal - Controller Tweaks" />

        <h2>Every binding</h2>
      </div>
      <GamepadLists />
      <div className="md">
        <p>
          Prefer one image?{' '}
          <a
            href={`${import.meta.env.BASE_URL}uploads/controller/zenderal-controller-mapping.png`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the full controller sheet
          </a>
          .
        </p>
      </div>
    </div>
  );
}

// An answer's optional `link` points at another doc and ends the answer.
function Faq({ onPick }) {
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
                <p>
                  {f.a}
                  {f.link && (
                    <>
                      {' '}
                      <a href={`#${f.link.doc}`} onClick={onPick(f.link.doc)}>{f.link.label}</a>.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Scroll spy: the doc heading currently being read — the last one scrolled
// past the top of the viewport, or the final one once the page bottoms out.
function useReadingSection(sections) {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    if (!sections) return setCurrent(null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const heads = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
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
  }, [sections]);
  return current;
}

export default function ZenderalDocs() {
  const [route, setRoute] = useState(readHash);
  const { doc, section } = route;

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
  const pick = (id) => go(id, { doc: id, section: null });
  // `path` is `<doc-id>/<section-id>`.
  const pickSection = (path) => (e) => {
    e.preventDefault();
    const [id, sub] = path.split('/');
    setRoute({ doc: id, section: sub });
    history.replaceState(null, '', `#${path}`);
  };

  // Scroll to a doc heading once it has rendered (also on first load, and
  // again when the same link is clicked twice — each click is a new route object).
  useEffect(() => {
    const el = section && document.getElementById(section);
    if (!el) return;
    // Measure past the doc's fade-up offset so a freshly mounted doc doesn't overshoot.
    const lift = new DOMMatrix(getComputedStyle(el.closest('.doc')).transform).m42;
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    scrollTo({ top: el.getBoundingClientRect().top + scrollY - lift - margin, behavior: 'smooth' });
  }, [route, section]);

  const reading = useReadingSection(docSections[doc]);

  const i = DOCS.findIndex((d) => d.id === doc);
  const cur = DOCS[i];
  const prev = i > 0 ? DOCS[i - 1] : null;
  const next = i < DOCS.length - 1 ? DOCS[i + 1] : null;

  return (
    <div className="zen-page">
      <Nav zenderal="install" />

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
        <article key={doc} className="doc">
          <div className="doc__head">
            <span className="docs__label">Zenderal · {cur.group}</span>
            <h2 className="doc__title">{cur.title}</h2>
          </div>

          {doc === 'readme' && <Md>{readme}</Md>}
          {doc === 'controller' && <Controller />}
          {doc === 'dlss' && <Md>{renderPipeline}</Md>}
          {doc === 'faq' && <Faq key={doc} onPick={pick} />}

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
