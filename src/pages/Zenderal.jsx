import { useEffect } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { DOCS, OVERVIEW } from '../zenderal/data.js';
import { SECTIONS } from '../zenderal/guide/data.js';
import ZenHero from '../zenderal/ZenHero.jsx';

const DOCS_URL = `${import.meta.env.BASE_URL}zenderal/docs/`;
const GUIDE_URL = `${import.meta.env.BASE_URL}zenderal/guide/`;
// Parallax backdrops: a shot split into depth layers, far to near, as
// public/uploads/zenderal/<layers>-back/mid/front.webp.
const LAYERS = ['back', 'mid', 'front'];

function Layers({ src }) {
  return LAYERS.map((l) => (
    <img
      key={l}
      src={`${import.meta.env.BASE_URL}uploads/zenderal/${src}-${l}.webp`}
      alt=""
      className={`zlayer zlayer--${l}`}
    />
  ));
}

// The docs used to live on this page, so forward old links like #readme/installation.
if (location.hash.length > 1) location.replace(DOCS_URL + location.hash);

// { guide: id } / { doc: id } → the page link and its title.
function resolve(link) {
  if (link.guide) return { href: GUIDE_URL + '#' + link.guide, title: SECTIONS.find((s) => s.id === link.guide).title };
  return { href: DOCS_URL + '#' + link.doc, title: DOCS.find((d) => d.id === link.doc).title };
}

// An in-game screenshot, or a placeholder frame until one is added.
function Shot({ src, label }) {
  if (src) return <img src={`${import.meta.env.BASE_URL}uploads/zenderal/${src}`} alt={label} className="zshot" />;
  return (
    <div className="zshot zshot--empty" role="img" aria-label={`${label} screenshot coming soon`}>
      <span className="zshot__label">Screenshot</span>
      <span className="zshot__name">{label}</span>
    </div>
  );
}

export default function Zenderal() {
  // Feed each parallax backdrop its distance from the viewport centre (px) as --p.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = [...document.querySelectorAll('.zparallax')];
    let frame = 0;
    const update = () => {
      frame = 0;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--p', (innerHeight / 2 - (r.top + r.height / 2)).toFixed(1));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="zen-page">
      <Nav zenderal="install" />

      <ZenHero
        live
        logo
        eyebrow="Wabbajack Modlist · Enderal SE"
        desc="A Wabbajack modlist for Enderal: Forgotten Stories — installed in one click and playable on keyboard or controller."
      />

      <section className="zstage zparallax">
        {/* The river landscape: back is the sky and mountains, mid the forest, front the rocks and water. */}
        <Layers src="layers/river" />
        <div className="zstage__shade" />
        <div className="zintro">
          <span className="docs__label">What Zenderal is</span>
          <h2 className="zintro__title">{OVERVIEW.headline}</h2>
          <p className="zintro__lede">{OVERVIEW.lede}</p>
          <p className="zintro__body">{OVERVIEW.body}</p>
          <dl className="zintro__facts">
            {OVERVIEW.facts.map((f) => (
              <div key={f.label} className="zintro__fact">
                <dt>{f.label}</dt>
                <dd>{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="zgoals">
        <span className="docs__label">The goals</span>
        {OVERVIEW.goals.map((g, i) => (
          <article key={g.title} className={`zgoal${i % 2 ? ' zgoal--flip' : ''}`}>
            {g.layers && (
              <div className="zgoal__backdrop zparallax">
                <Layers src={g.layers} />
              </div>
            )}
            <div className="zgoal__body">
              <span className="zgoal__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="zgoal__title">{g.title}</h3>
              <p className="zgoal__text">{g.text}</p>
              <div className="zgoal__links">
                {g.links.map(resolve).map((l) => (
                  <a key={l.href} href={l.href} className="zgoal__link">
                    {l.title} →
                  </a>
                ))}
              </div>
            </div>
            <Shot src={g.shot} label={g.title} />
          </article>
        ))}
      </section>

      <section className="zcta">
        <h2 className="zcta__title">Ready to play?</h2>
        <p className="zcta__text">Read the install guide before you start, then dive into the gameplay guide.</p>
        <div className="actions">
          <a href={DOCS_URL + '#readme'} className="btn btn--light-solid">Install guide</a>
          <a href={GUIDE_URL} className="btn btn--light-outline">Gameplay guide</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
