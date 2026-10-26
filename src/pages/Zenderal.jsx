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
// The intro closes into the emblem: its silhouette (the art's alpha with the holes filled) masks
// the scene. `ratio` is the art's height / width; the sphere's centre is a fraction of the art's
// width/height and its radius a fraction of the width. ART_W is the emblem <img>'s unscaled CSS width.
const EMBLEM_MASK = `${import.meta.env.BASE_URL}uploads/zenderal/emblem-mask.png`;
const EMBLEM = { ratio: 1141 / 1378, cx: 0.494, cy: 0.486, radius: 0.22 };
const ART_W = 1000;

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

  // The emblem portal. The intro pins with its bottom on the viewport's, then over the scroll run
  // below it (.zstage::after) the text fades, the scene shrinks into the emblem's silhouette and
  // the emblem art fades in over it. The emblem then scrolls away with the page.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stage = document.querySelector('.zstage');
    const pin = stage.querySelector('.zstage__pin');
    const scene = pin.querySelector('.zstage__scene');
    const intro = pin.querySelector('.zintro');
    const art = pin.querySelector('.zstage__emblem');
    const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const ease = (x) => x * x * (3 - 2 * x);
    let frame = 0;
    let stick = 0;
    const update = () => {
      frame = 0;
      const t = ramp(stick - stage.getBoundingClientRect().top, 0, stage.offsetHeight - pin.offsetHeight);
      if (t === 0) {
        scene.style.maskImage = scene.style.maskSize = scene.style.maskPosition = '';
        intro.style.opacity = art.style.opacity = '';
        return;
      }
      // Placed in the scene's own coordinates as they are while pinned (its top at `stick`),
      // so once the run ends the emblem scrolls away with it.
      const left = scene.getBoundingClientRect().left;
      // From wide enough that the sphere covers the screen, down to its resting size.
      const w0 = Math.hypot(innerWidth, innerHeight) / 2 / EMBLEM.radius;
      const w1 = Math.min(innerWidth * 0.7, (innerHeight * 0.5) / EMBLEM.ratio);
      const w = w0 * (w1 / w0) ** ease(ramp(t, 0.1, 0.85));
      const h = w * EMBLEM.ratio;
      const x = innerWidth / 2 - left - EMBLEM.cx * w;
      const y = innerHeight / 2 - stick - EMBLEM.cy * h;
      scene.style.maskImage = `url(${EMBLEM_MASK})`;
      scene.style.maskSize = `${w}px ${h}px`;
      scene.style.maskPosition = `${x}px ${y}px`;
      intro.style.opacity = 1 - ramp(t, 0, 0.22);
      art.style.opacity = ease(ramp(t, 0.55, 0.9));
      art.style.transform = `translate(${x}px, ${y}px) scale(${w / ART_W})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Sticks once its bottom reaches the viewport's.
    const layout = () => {
      stick = Math.min(0, innerHeight - pin.offsetHeight);
      pin.style.top = `${stick}px`;
      onScroll();
    };
    const ro = new ResizeObserver(layout);
    ro.observe(pin);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', layout);
    return () => {
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', layout);
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

      <section className="zstage">
        <div className="zstage__pin zparallax">
          <div className="zstage__scene">
            {/* The river landscape: back is the sky and mountains, mid the forest, front the rocks and water. */}
            <Layers src="layers/river" />
            <div className="zstage__shade" />
            <img src={`${import.meta.env.BASE_URL}uploads/zenderal-emblem.png`} alt="" className="zstage__emblem" />
          </div>
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
