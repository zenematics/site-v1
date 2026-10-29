import { useEffect } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { OVERVIEW } from '../zenderal/data.js';
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
// The closing section opens out of the Zenematics mark the same way in reverse: its alpha masks the
// scene, which grows until the head (the largest solid circle in it, as fractions of the square art)
// covers the screen; top and boxCy are the top and middle of the mark itself. LOGO_W is the logo <img>'s unscaled CSS width.
const ZEN_LOGO = `${import.meta.env.BASE_URL}uploads/zen-logo-white.png`;
const ZEN = { cx: 0.491, cy: 0.446, radius: 0.125, top: 0.21, boxCy: 0.529 };
const LOGO_W = 1000;

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

// { guide: id } / { doc: id } → the page link and which page it's on.
function resolve(link) {
  if (link.guide) return { href: GUIDE_URL + link.guide + '/', page: 'Guide' };
  return { href: DOCS_URL + '#' + link.doc, page: 'Docs' };
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

  // The closing portal: the intro's in reverse. The Zenematics mark arrives as the pin reaches the
  // top, the scene shows through it as its art fades, and it grows over the run (.zcta::after)
  // until the head covers the screen; then the text fades in. It rests as far below the cards as
  // the intro's emblem does above them, so the pin is pulled up over the cards' end to match.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cta = document.querySelector('.zcta');
    const pin = cta.querySelector('.zcta__pin');
    const portal = pin.querySelector('.zcta__portal');
    const body = pin.querySelector('.zcta__body');
    const art = pin.querySelector('.zcta__logo');
    const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const ease = (x) => x * x * (3 - 2 * x);
    const stage = document.querySelector('.zstage');
    const stagePin = stage.querySelector('.zstage__pin');
    const cards = document.querySelectorAll('.zcard');
    const pageTop = (el) => el.getBoundingClientRect().top + scrollY;
    const rest = () => {
      const W = pin.offsetWidth;
      const H = pin.offsetHeight;
      const w0 = Math.min(W * 0.6, H * 0.5);
      return { W, H, w0, by: W <= 860 ? H * 0.34 : H / 2 };
    };
    const layout = () => {
      // Where the emblem ends: centred in the viewport once the intro's run is scrolled through.
      const stick = Math.min(0, innerHeight - stagePin.offsetHeight);
      const end = pageTop(stage) - stick + stage.offsetHeight - stagePin.offsetHeight;
      const ew = Math.min(innerWidth * 0.7, (innerHeight * 0.5) / EMBLEM.ratio) * EMBLEM.ratio;
      const gap = pageTop(cards[0]) - (end + innerHeight / 2 + (1 - EMBLEM.cy) * ew);
      const { w0, by } = rest();
      const logoTop = by - (ZEN.boxCy - ZEN.top) * w0;
      const last = cards[cards.length - 1].getBoundingClientRect().bottom + scrollY;
      const margin = parseFloat(getComputedStyle(cta).marginTop);
      cta.style.marginTop = `${last + gap - logoTop - (pageTop(cta) - margin)}px`;
      onScroll();
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      const t = ramp(-cta.getBoundingClientRect().top, 0, cta.offsetHeight - pin.offsetHeight);
      // The run is long enough that after the mark has opened the layers keep pulling apart for
      // a while before the text arrives. The portal's own steps keep the pace they had over 120vh.
      pin.style.setProperty('--t', ease(ramp(t, 0, 0.85)).toFixed(4));
      // Hidden until it fades in, so it can't catch clicks meant for the cards under the pin.
      body.style.visibility = t < 0.85 ? 'hidden' : '';
      if (t === 1) {
        portal.style.maskImage = portal.style.maskSize = portal.style.maskPosition = '';
        body.style.opacity = '';
        art.style.opacity = '0';
        return;
      }
      // In the pin's own coordinates, so the mark scrolls in with it before it sticks. From its
      // resting size up to where the head covers the farthest corner. It grows from the head, placed
      // so the mark's box is centred (in the top part on narrow screens, over the knight).
      const { W, H, w0, by } = rest();
      const ax = W / 2;
      const ay = by - (ZEN.boxCy - ZEN.cy) * w0;
      const w1 = Math.hypot(Math.max(ax, W - ax), Math.max(ay, H - ay)) / ZEN.radius;
      const w = w0 * (w1 / w0) ** ease(ramp(t, 0.03, 0.55));
      const x = ax - ZEN.cx * w;
      const y = ay - ZEN.cy * w;
      portal.style.maskImage = `url(${ZEN_LOGO})`;
      portal.style.maskSize = `${w}px ${w}px`;
      portal.style.maskPosition = `${x}px ${y}px`;
      art.style.opacity = 0.9 * (1 - ease(ramp(t, 0.06, 0.28)));
      art.style.transform = `translate(${x}px, ${y}px) scale(${w / LOGO_W})`;
      body.style.opacity = ramp(t, 0.85, 1);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // The cards and the intro reflow as the fonts load.
    const ro = new ResizeObserver(layout);
    ro.observe(stagePin);
    ro.observe(document.querySelector('.zexplore'));
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
      <Nav zenderal="overview" />

      <ZenHero
        live
        emblem={false}
        eyebrow="Wabbajack Modlist · Enderal SE"
        desc="A Wabbajack modlist for Enderal: Forgotten Stories — installed in one click and playable on keyboard or controller."
      />

      <section className="zstage">
        <div className="zstage__pin zparallax">
          <div className="zstage__scene">
            {/* The river landscape: back is the sky and mountains, mid the forest, front the rocks and water. */}
            <Layers src="layers/river" />
            <div className="zstage__shade" />
            <img src={`${import.meta.env.BASE_URL}uploads/zenderal-emblem.webp`} alt="" className="zstage__emblem" />
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

      <section className="zexplore">
        {OVERVIEW.explore.map((group) => (
          <div key={group.label} className="zexplore__group">
            <span className="docs__label">{group.label}</span>
            <div className="zexplore__grid">
              {group.links.map((link) => {
                const { href, page } = resolve(link);
                return (
                  <a key={href} href={href} className="zcard">
                    <span className="zcard__page">{page}</span>
                    <h3 className="zcard__title">{link.title}</h3>
                    <p className="zcard__text">{link.text}</p>
                    <span className="zcard__go" aria-hidden="true">→</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="zcta">
        <div className="zcta__pin zparallax">
          <div className="zcta__portal">
            <div className="zcta__scene">
              {/* The crystal forest: back is the forest and water, mid the crystal creature, front the knight. */}
              <div className="zcta__art">
                <Layers src="layers/crystal" />
              </div>
              <div className="zcta__shade" />
            </div>
          </div>
          <img src={ZEN_LOGO} alt="" className="zcta__logo" />
          <div className="zcta__body">
            <h2 className="zcta__title">Ready to play?</h2>
            <p className="zcta__text">Read the install guide before you start, then dive into the gameplay guide.</p>
            <div className="actions">
              <a href={DOCS_URL + '#readme'} className="btn btn--light-solid">Install guide</a>
              <a href={GUIDE_URL} className="btn btn--light-outline">Gameplay guide</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
