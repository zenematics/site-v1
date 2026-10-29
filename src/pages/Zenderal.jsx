import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { OVERVIEW } from '../zenderal/data.js';
import ZenHero from '../zenderal/ZenHero.jsx';
import { BG as PROPHECY_BG, TREES as PROPHECY_TREES } from '../zenderal/guide/prophecyLayout.js';

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
// Build crafting: the perk screen zooms into its stone floor circle, which opens into the Prophecy radial art with
// the circles matched. SHOT is the screenshot's aspect, its circle's centre (fractions of width/height) and radius
// (of the width); RADIAL is the art's dark middle as a fraction of its width. Both are drawn 1000px wide and scaled.
const SHOT = { ratio: 1440 / 3360, cx: 0.5104, cy: 0.554, radius: 0.0946 };
const RADIAL = { void: 0.23 };
const BUILD_W = 1000;
// The "New to Enderal" switch's two sides, keys into OVERVIEW.welcome.
const AUDIENCES = ['newcomers', 'veterans'];

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
  const [audience, setAudience] = useState('newcomers');
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

  // The before/after wipe. The pin sticks at the top over the run below it (.zcompare::after) and
  // the divider sweeps right to left, uncovering Zenderal's shot over base Enderal's. Reduced
  // motion leaves it split down the middle.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = document.querySelector('.zcompare');
    const pin = section.querySelector('.zcompare__pin');
    const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const ease = (x) => x * x * (3 - 2 * x);
    let frame = 0;
    const update = () => {
      frame = 0;
      const t = ramp(-section.getBoundingClientRect().top, 0, section.offsetHeight - pin.offsetHeight);
      pin.style.setProperty('--split', `${(100 * (1 - ease(ramp(t, 0.1, 0.9)))).toFixed(2)}%`);
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

  // The gameplay loops play only while at least half on screen, so off-screen ones cost nothing.
  // Reduced motion leaves them paused on their first frame.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.play().catch(() => {});
          else e.target.pause();
        }
      },
      { threshold: 0.5 },
    );
    for (const v of document.querySelectorAll('.zclip__video')) io.observe(v);
    return () => io.disconnect();
  }, []);

  // Build crafting. The pin sticks over the run below it (.zbuild::after). The screenshot zooms in until its stone
  // circle is centred and large while its floor sinks into darkness; the radial art fades in over it, its dark middle
  // locked to the circle; then the art pulls back to rest under the heading, and the tree names and the heading fade in.
  // `r` is the circle's on-screen radius throughout, so both layers follow the one value. Reduced motion shows the end.
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = document.querySelector('.zbuild');
    const pin = section.querySelector('.zbuild__pin');
    const shot = pin.querySelector('.zbuild__shot');
    const dark = pin.querySelector('.zbuild__dark');
    const art = pin.querySelector('.zbuild__art');
    const names = art.querySelector('.zbuild__trees');
    const head = pin.querySelector('.zbuild__head');
    const shade = pin.querySelector('.zbuild__shade');
    const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const ease = (x) => x * x * (3 - 2 * x);
    const mix = (a, b, k) => a + (b - a) * k;
    let L = null;
    // The start (the screenshot covering the pin), the peak of the zoom, and the end (the art under the heading,
    // as big as fits with its names: they reach about 0.26 of its width from the middle, up and down, and to the
    // sides Necromancy ends 0.19 out, its name about 9 font sizes long beyond that).
    const layout = () => {
      const W = pin.offsetWidth;
      const H = pin.offsetHeight;
      const sw = Math.max(W, H / SHOT.ratio);
      const start = { x: (W - sw) / 2 + SHOT.cx * sw, y: (H - sw * SHOT.ratio) / 2 + SHOT.cy * sw * SHOT.ratio, r: SHOT.radius * sw };
      const peak = { x: W / 2, y: H / 2, r: Math.max(0.6 * Math.min(W, H), 1.5 * start.r) };
      const top = head.offsetTop + head.offsetHeight;
      // Clear of the bottom fade (.zbuild__pin).
      const room = H - top - 0.16 * H;
      const font = W < 600 ? 11 : 13;
      const size = Math.min(room / 0.6, (W / 2 - 12 - 9 * font) / 0.19, 1200);
      // The heading sits on the page colour, fading into the art below it.
      shade.style.background = `linear-gradient(180deg, rgba(7, 8, 10, 0.94) ${top - 70}px, transparent ${top + 24}px)`;
      const end = { x: W / 2, y: top + room / 2, r: RADIAL.void * size };
      // SVG text is sized in the art's own units.
      names.style.fontSize = `${(font * 2 * PROPHECY_BG) / size}px`;
      L = { start, peak, end };
      onScroll();
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!L) return;
      const t = reduce ? 1 : ramp(-section.getBoundingClientRect().top, 0, section.offsetHeight - pin.offsetHeight);
      const { start, peak, end } = L;
      const zin = ease(ramp(t, 0.02, 0.45));
      const zout = ease(ramp(t, 0.5, 0.82));
      const from = zout ? peak : start;
      const to = zout ? end : peak;
      const k = zout || zin;
      // Zooms in proportion, so the scale moves at an even pace.
      const r = from.r * (to.r / from.r) ** k;
      const x = mix(from.x, to.x, k);
      const y = mix(from.y, to.y, k);
      const sw = r / SHOT.radius;
      shot.style.transform = `translate(${x - SHOT.cx * sw}px, ${y - SHOT.cy * sw * SHOT.ratio}px) scale(${sw / BUILD_W})`;
      shot.style.opacity = 1 - ease(ramp(t, 0.42, 0.6));
      dark.style.background = `radial-gradient(circle ${r}px at ${x}px ${y}px, #07080a 55%, transparent 100%)`;
      dark.style.opacity = 0.95 * ease(ramp(t, 0.15, 0.42));
      const aw = r / RADIAL.void;
      art.style.transform = `translate(${x - aw / 2}px, ${y - aw / 2}px) scale(${aw / BUILD_W})`;
      art.style.opacity = ease(ramp(t, 0.3, 0.55));
      names.style.opacity = ease(ramp(t, 0.78, 0.92));
      head.style.opacity = shade.style.opacity = ease(ramp(t, 0.82, 0.96));
      // Hidden until it fades in, so its links can't be clicked while invisible.
      head.style.visibility = t < 0.82 ? 'hidden' : '';
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const ro = new ResizeObserver(layout);
    ro.observe(pin);
    ro.observe(head);
    if (!reduce) addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // The closing portal: the intro's in reverse. The Zenematics mark arrives as the pin reaches the
  // top, the scene shows through it as its art fades, and it grows over the run (.zcta::after)
  // until the head covers the screen; then the text fades in. It rests as far below the cards as
  // the intro's emblem does above the "New to Enderal" heading, so the pin is pulled up over the
  // cards' end to match.
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
    const compare = document.querySelector('.zcompare');
    const welcome = document.querySelector('.znew__head');
    const pageTop = (el) => el.getBoundingClientRect().top + scrollY;
    const rest = () => {
      const W = pin.offsetWidth;
      const H = pin.offsetHeight;
      const w0 = Math.min(W * 0.6, H * 0.5);
      return { W, H, w0, by: W <= 860 ? H * 0.34 : H / 2 };
    };
    const layout = () => {
      // Where the emblem ends: centred in the viewport once the intro's run is scrolled through.
      // The gap is from it to the "New to Enderal" heading under it.
      const stick = Math.min(0, innerHeight - stagePin.offsetHeight);
      const end = pageTop(stage) - stick + stage.offsetHeight - stagePin.offsetHeight;
      const ew = Math.min(innerWidth * 0.7, (innerHeight * 0.5) / EMBLEM.ratio) * EMBLEM.ratio;
      const gap = pageTop(welcome) - (end + innerHeight / 2 + (1 - EMBLEM.cy) * ew);
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
    ro.observe(document.querySelector('.znew'));
    ro.observe(compare);
    ro.observe(document.querySelector('.zclips'));
    ro.observe(document.querySelector('.zbuild'));
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

      <section className="znew">
        <div className="znew__head">
          <span className="docs__label">{OVERVIEW.welcome.label}</span>
          <h2 className="znew__title">{OVERVIEW.welcome.title}</h2>
          <p className="znew__text">{OVERVIEW.welcome.text}</p>
        </div>
        {/* One panel, switched between the two audiences; both views share one grid cell so the panel
            keeps the taller one's height and doesn't jump when switching. */}
        <div className={`znew__panel znew__panel--${audience}`}>
          {AUDIENCES.map((a) => (
            <img
              key={a}
              src={`${import.meta.env.BASE_URL}uploads/zenderal/${OVERVIEW.welcome[a].art}`}
              alt=""
              className={`znew__art znew__art--${a}${audience === a ? ' is-on' : ''}`}
            />
          ))}
          <div className="znew__shade" />
          <div className="znew__switch" role="tablist" aria-label="Who's playing">
            {AUDIENCES.map((a) => (
              <button
                key={a}
                type="button"
                role="tab"
                id={`znew-tab-${a}`}
                aria-controls={`znew-view-${a}`}
                aria-selected={audience === a}
                tabIndex={audience === a ? 0 : -1}
                className={`znew__option${audience === a ? ' is-on' : ''}`}
                onClick={() => setAudience(a)}
                onKeyDown={(e) => {
                  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
                  const next = AUDIENCES[(AUDIENCES.indexOf(a) + 1) % AUDIENCES.length];
                  setAudience(next);
                  document.getElementById(`znew-tab-${next}`).focus();
                }}
              >
                {OVERVIEW.welcome[a].label}
              </button>
            ))}
          </div>
          <div className="znew__views">
            {AUDIENCES.map((a) => {
              const view = OVERVIEW.welcome[a];
              const rows = a === 'newcomers'
                ? view.steps.map((s) => ({ ...s, key: s.title }))
                : view.changes.map((c) => ({ ...c, key: c.area, title: c.area }));
              const List = a === 'newcomers' ? 'ol' : 'ul';
              return (
                <div
                  key={a}
                  id={`znew-view-${a}`}
                  role="tabpanel"
                  aria-labelledby={`znew-tab-${a}`}
                  className={`znew__view${audience === a ? ' is-on' : ''}`}
                >
                  <h3 className="znew__panel-title">{view.title}</h3>
                  <p className="znew__panel-text">{view.text}</p>
                  <List className={a === 'newcomers' ? 'znew__steps' : 'znew__changes'}>
                    {rows.map((r) => (
                      <li key={r.key}>
                        <a href={resolve(r).href} className="znew__row">
                          <span className="znew__row-title">{r.title}</span>
                          <span className="znew__row-text">{r.text}</span>
                          <span className="znew__go" aria-hidden="true">→</span>
                        </a>
                      </li>
                    ))}
                  </List>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="zcompare">
        <div className="zcompare__pin">
          <div className="zcompare__head">
            <span className="docs__label">{OVERVIEW.compare.label}</span>
            <h2 className="zcompare__title">{OVERVIEW.compare.title}</h2>
            <p className="zcompare__text">{OVERVIEW.compare.text}</p>
          </div>
          <div className="zcompare__stage">
            <figure className="zcompare__frame">
              <img
                src={`${import.meta.env.BASE_URL}uploads/zenderal/${OVERVIEW.compare.before.src}`}
                alt={`${OVERVIEW.compare.before.label}: a lookout over a river valley at sunset`}
                className="zcompare__img"
              />
              <span className="zcompare__tag" aria-hidden="true">{OVERVIEW.compare.before.label}</span>
              {/* Its tag is clipped with it, so each tag is covered as the divider passes it. */}
              <div className="zcompare__after">
                <img
                  src={`${import.meta.env.BASE_URL}uploads/zenderal/${OVERVIEW.compare.after.src}`}
                  alt={`${OVERVIEW.compare.after.label}: the same lookout`}
                  className="zcompare__img"
                />
                <span className="zcompare__tag zcompare__tag--after" aria-hidden="true">{OVERVIEW.compare.after.label}</span>
              </div>
              <span className="zcompare__divider" aria-hidden="true" />
            </figure>
          </div>
        </div>
      </section>

      <section className="zclips">
        <div className="zclips__head">
          <span className="docs__label">{OVERVIEW.combat.label}</span>
          <h2 className="zclips__title">{OVERVIEW.combat.title}</h2>
          <p className="zclips__text">{OVERVIEW.combat.text}</p>
        </div>
        <div className="zclips__grid">
          {OVERVIEW.combat.clips.map((clip) => (
            <a
              key={clip.title}
              href={GUIDE_URL + clip.guide + '/'}
              className={`zclip${clip.placeholder ? ' zclip--placeholder' : ''}`}
            >
              <div className="zclip__media">
                <video className="zclip__video" muted loop playsInline preload="metadata" aria-hidden="true">
                  <source src={`${import.meta.env.BASE_URL}uploads/zenderal/${clip.video}.webm`} type="video/webm" />
                  <source src={`${import.meta.env.BASE_URL}uploads/zenderal/${clip.video}.mp4`} type="video/mp4" />
                </video>
              </div>
              <div className="zclip__body">
                <h3 className="zclip__title">{clip.title}</h3>
                <p className="zclip__text">{clip.text}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="zbuild">
        <div className="zbuild__pin">
          <img
            src={`${import.meta.env.BASE_URL}uploads/zenderal/screenshots/perks-overview.webp`}
            alt=""
            className="zbuild__shot"
          />
          <div className="zbuild__dark" />
          <div className="zbuild__art">
            <img src={`${import.meta.env.BASE_URL}uploads/guide/prophecy/trees/radial.webp`} alt="" className="zbuild__radial" />
            <svg
              className="zbuild__trees"
              viewBox={`${-PROPHECY_BG} ${-PROPHECY_BG} ${2 * PROPHECY_BG} ${2 * PROPHECY_BG}`}
              role="img"
              aria-label={`The Prophecy talent trees: ${PROPHECY_TREES.map((t) => t.name).join(', ')}`}
            >
              {PROPHECY_TREES.map((t) => (
                <g key={t.id} fill={t.color}>
                  {t.nodes.map((n) => (
                    <circle key={n.id} cx={n.x} cy={-n.y} r={n.level ? 0.75 : 0.5} opacity="0.85" />
                  ))}
                  <text x={t.label[0]} y={-t.label[1]} textAnchor={t.anchor} dominantBaseline={t.baseline}>
                    {t.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className="zbuild__shade" />
          <div className="zbuild__head">
            <span className="docs__label">{OVERVIEW.build.label}</span>
            <h2 className="zbuild__title">{OVERVIEW.build.title}</h2>
            <p className="zbuild__text">{OVERVIEW.build.text}</p>
            <div className="actions">
              {OVERVIEW.build.links.map((l, i) => (
                <a
                  key={l.guide}
                  href={GUIDE_URL + l.guide + '/'}
                  className={`btn ${i === 0 ? 'btn--light-solid' : 'btn--light-outline'}`}
                >
                  {l.title}
                </a>
              ))}
            </div>
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

    </div>
  );
}
