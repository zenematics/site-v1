import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { OVERVIEW } from '../zenderal/data.js';
import ZenHero from '../zenderal/ZenHero.jsx';
import Grimoire from '../zenderal/Grimoire.jsx';
import { BG as PROPHECY_BG, TREES as PROPHECY_TREES } from '../zenderal/guide/prophecyLayout.js';
import { TRAITS } from '../zenderal/guide/data.js';

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
// The trait ring: the featured traits first, in the order the ring stops on them, then the rest.
const FEATURED = OVERVIEW.build.traits.map((n) => TRAITS.find((t) => t.name === n));
const RING = [...FEATURED, ...TRAITS.filter((t) => !FEATURED.includes(t))];
const TRAIT_ART = `${import.meta.env.BASE_URL}uploads/guide/traits/`;
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

  // Build crafting, in three chapters that the rail (.zbuild__rail) lights in turn as the pin sticks over the run
  // below it (.zbuild::after). Perk trees: the perk screen zooms in until its stone circle is centred in the space
  // beside the rail, and its floor sinks into darkness. Traits: the trait medallions fade in round the circle and the
  // ring turns, stopping on each featured trait with its upside and downside in the middle. Prophecy: the ring fades,
  // the radial art's dark middle fades in over the circle's, then a widening circle reveals the rest of it, pulls back
  // to rest, and the tree names fade in. `r` is the circle's on-screen radius throughout, so the layers all follow the one value. Reduced motion
  // shows the end.
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = document.querySelector('.zbuild');
    const pin = section.querySelector('.zbuild__pin');
    const shot = pin.querySelector('.zbuild__shot');
    const dark = pin.querySelector('.zbuild__dark');
    const art = pin.querySelector('.zbuild__art');
    const names = art.querySelector('.zbuild__trees');
    const rail = pin.querySelector('.zbuild__rail');
    const stages = [...rail.querySelectorAll('.zbuild__stage')];
    const medals = [...pin.querySelectorAll('.zbuild__medal')];
    const featured = [...pin.querySelectorAll('.zbuild__feature')];
    const rim = pin.querySelector('.zbuild__rim');
    const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const ease = (x) => x * x * (3 - 2 * x);
    const mix = (a, b, k) => a + (b - a) * k;
    const step = (2 * Math.PI) / medals.length;
    let L = null;
    // The space beside the rail (above it on phones) that the circle, the ring and the art centre in. The start is
    // the screenshot covering the pin; the peak leaves room round the circle for the ring; the end is the art as
    // big as fits with its names (they reach about 0.26 of its width from the middle up and down, and to the sides
    // Necromancy ends 0.19 out, its name about 9 font sizes long beyond that).
    const layout = () => {
      const W = pin.offsetWidth;
      const H = pin.offsetHeight;
      const phone = W <= 860;
      const box = { x0: phone ? 0 : rail.offsetLeft + rail.offsetWidth + 24, x1: W, y0: phone ? 64 : 80, y1: phone ? rail.offsetTop - 8 : H - 24 };
      const aw = box.x1 - box.x0;
      const ah = box.y1 - box.y0;
      const c = { x: (box.x0 + box.x1) / 2, y: (box.y0 + box.y1) / 2 };
      const sw = Math.max(W, H / SHOT.ratio);
      const start = { x: (W - sw) / 2 + SHOT.cx * sw, y: (H - sw * SHOT.ratio) / 2 + SHOT.cy * sw * SHOT.ratio, r: SHOT.radius * sw };
      const icon = phone ? 34 : 56;
      const fit = Math.min(aw, ah) / 2 - icon / 2 - 6;
      const peak = { ...c, r: Math.max(fit / 1.16, start.r * 1.15) };
      const font = phone ? 11 : 13;
      const size = Math.min((ah - 24) / 0.56, (aw / 2 - 12 - 9 * font) / 0.19, 1200);
      const end = { ...c, r: RADIAL.void * size };
      // SVG text is sized in the art's own units.
      names.style.fontSize = `${(font * 2 * PROPHECY_BG) / size}px`;
      // The ring sits just outside the stone circle, or inside it where the screen is too small.
      const ring = Math.min(peak.r * 1.16, fit);
      for (const m of medals) m.style.width = m.style.height = `${icon}px`;
      for (const f of featured) f.style.width = `${Math.min(360, (ring - icon) * 1.6)}px`;
      // The hole has opened once it reaches the farthest corner from the circle's middle.
      const open = Math.hypot(Math.max(c.x, W - c.x), Math.max(c.y, H - c.y));
      L = { start, peak, end, ring, open };
      onScroll();
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!L) return;
      const t = reduce ? 1 : ramp(-section.getBoundingClientRect().top, 0, section.offsetHeight - pin.offsetHeight);
      const { start, peak, end, ring, open } = L;
      // Most of the run is the trait ring (0.2 to 0.66), so each trait stays readable for a while.
      const zin = ease(ramp(t, 0.03, 0.2));
      const zout = ease(ramp(t, 0.84, 0.95));
      const from = zout ? peak : start;
      const to = zout ? end : peak;
      const k = zout || zin;
      // Zooms in proportion, so the scale moves at an even pace.
      const r = from.r * (to.r / from.r) ** k;
      const x = mix(from.x, to.x, k);
      const y = mix(from.y, to.y, k);
      const sw = r / SHOT.radius;
      shot.style.transform = `translate(${x - SHOT.cx * sw}px, ${y - SHOT.cy * sw * SHOT.ratio}px) scale(${sw / BUILD_W})`;
      // Hidden once the iris has opened past it.
      shot.style.opacity = 1 - ease(ramp(t, 0.8, 0.84));
      dark.style.background = `radial-gradient(circle ${r}px at ${x}px ${y}px, #07080a 55%, transparent 100%)`;
      dark.style.opacity = 0.95 * ease(ramp(t, 0.1, 0.22));
      // The Prophecy art sits with its own dark middle on the darkened circle. It fades in through a hole the same
      // shape as the darkness (solid to 0.55 of the circle, gone at its edge), so the two dark middles swap in place,
      // then the hole widens over the same-sized art until it passes the farthest corner, its edge lit as it goes.
      // Sizes in the art's own units are the screen's divided by its scale.
      const aw = r / RADIAL.void;
      art.style.transform = `translate(${x - aw / 2}px, ${y - aw / 2}px) scale(${aw / BUILD_W})`;
      art.style.opacity = reduce ? 1 : ease(ramp(t, 0.66, 0.7));
      const g = reduce ? 1 : ease(ramp(t, 0.7, 0.83));
      const soft = 0.45 * r;
      const iris = r * ((open + soft) / r) ** g;
      const unit = BUILD_W / aw;
      art.style.maskImage = g < 1
        ? `radial-gradient(circle ${iris * unit}px at 50% 50%, #000 ${(iris - soft) * unit}px, transparent ${iris * unit}px)`
        : '';
      const edge = iris - soft / 2;
      rim.style.width = rim.style.height = `${2 * edge}px`;
      rim.style.transform = `translate(${x - edge}px, ${y - edge}px)`;
      rim.style.opacity = g > 0 && g < 1 ? 0.8 * Math.min(ramp(g, 0, 0.1), 1 - ramp(g, 0.6, 1)) : 0;
      names.style.opacity = ease(ramp(t, 0.92, 0.99));

      // The ring turns one place per featured trait, resting on each for the first three quarters of its slice
      // and turning only in the last quarter.
      const seg = (featured.length - 0.25) * ramp(t, 0.24, 0.66);
      const turn = Math.min(Math.floor(seg), featured.length - 1) + (seg < featured.length - 1 ? ease(ramp(seg % 1, 0.75, 1)) : 0);
      const shown = ease(ramp(t, 0.19, 0.25)) * (1 - ease(ramp(t, 0.65, 0.69)));
      medals.forEach((m, i) => {
        const a = -Math.PI / 2 + (i - turn) * step;
        const near = Math.max(0, 1 - Math.abs(i - turn));
        m.style.transform = `translate(${x + ring * Math.cos(a)}px, ${y + ring * Math.sin(a)}px) translate(-50%, -50%) scale(${1 + 0.45 * near})`;
        m.style.opacity = shown * (0.45 + 0.55 * near);
        m.classList.toggle('is-on', near > 0.5);
      });
      featured.forEach((f, i) => {
        f.style.left = `${x}px`;
        f.style.top = `${y}px`;
        f.style.opacity = shown * Math.max(0, 1 - Math.abs(i - turn) * 2);
      });

      const on = t < 0.19 ? 0 : t < 0.68 ? 1 : 2;
      stages.forEach((s, i) => s.classList.toggle('is-on', i === on));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const ro = new ResizeObserver(layout);
    ro.observe(pin);
    ro.observe(rail);
    if (!reduce) addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // The closing portal: the intro's in reverse. The Zenematics mark arrives as the pin reaches the
  // top, the scene shows through it as its art fades, and it grows over the run (.zcta::after)
  // until the head covers the screen; then the text fades in. It rests as far below the magic section as
  // the intro's emblem does above the "New to Enderal" heading, so the pin is pulled up over the
  // magic section's end to match.
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
    const magic = document.querySelector('.zmagic');
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
      const last = magic.getBoundingClientRect().bottom + scrollY;
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
      // Hidden until it fades in, so it can't catch clicks meant for the page under the pin.
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
    // The sections above reflow as the fonts and the spell list load.
    const ro = new ResizeObserver(layout);
    ro.observe(stagePin);
    ro.observe(document.querySelector('.znew'));
    ro.observe(compare);
    ro.observe(document.querySelector('.zclips'));
    ro.observe(document.querySelector('.zbuild'));
    ro.observe(document.querySelector('.zmagic'));
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
          {/* The trait ring, round the stone circle; the trait it stops on is described in the middle. */}
          <div className="zbuild__ring" aria-hidden="true">
            {RING.map((t) => (
              <img key={t.name} src={`${TRAIT_ART}${t.img}`} alt="" className="zbuild__medal" />
            ))}
            {FEATURED.map((t) => (
              <div key={t.name} className="zbuild__feature">
                <span className="zbuild__feature-name">{t.name}</span>
                <span className="zbuild__feature-up">+ {t.up}</span>
                <span className="zbuild__feature-down">− {t.down}</span>
              </div>
            ))}
          </div>
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
          <div className="zbuild__rim" aria-hidden="true" />
          <div className="zbuild__shade" />
          {/* The chapter rail: the current stage is lit and shows its text (Zenderal.jsx sets .is-on). */}
          <div className="zbuild__rail">
            <span className="docs__label">{OVERVIEW.build.label}</span>
            <h2 className="zbuild__title">{OVERVIEW.build.title}</h2>
            <ol className="zbuild__stages">
              {OVERVIEW.build.stages.map((s, i) => (
                <li key={s.title} className={`zbuild__stage${i === 0 ? ' is-on' : ''}`}>
                  <span className="zbuild__stage-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="zbuild__stage-title">{s.title}</span>
                  <div className="zbuild__stage-body">
                    <div>
                      <p className="zbuild__stage-text">{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Grimoire />

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
