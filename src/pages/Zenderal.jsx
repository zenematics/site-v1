import { useEffect, useRef, useState } from 'react';
import Nav from '../components/Nav.jsx';
import { OVERVIEW } from '../zenderal/data.js';
import ZenHero from '../zenderal/ZenHero.jsx';
import Grimoire from '../zenderal/Grimoire.jsx';
import Sword from '../zenderal/Sword.jsx';
import { BG as PROPHECY_BG, EDGES as PROPHECY_EDGES, TREES as PROPHECY_TREES } from '../zenderal/guide/prophecyLayout.js';
import { TRAITS } from '../zenderal/guide/data.js';

const DOCS_URL = `${import.meta.env.BASE_URL}zenderal/docs/`;
const GUIDE_URL = `${import.meta.env.BASE_URL}zenderal/guide/`;
// Parallax backdrops: a shot split into depth layers, far to near, as
// public/uploads/zenderal/<layers>-back/mid/front.webp.
const LAYERS = ['back', 'mid', 'front'];
// "Modern visuals" opens out of the emblem: its silhouette (the art's alpha with the holes filled) masks
// the section. `ratio` is the art's height / width; the sphere's centre is a fraction of the art's
// width/height and its radius a fraction of the width. ART_W is the emblem <img>'s unscaled CSS width.
const EMBLEM_MASK = `${import.meta.env.BASE_URL}uploads/zenderal/emblem-mask.png`;
const EMBLEM = { ratio: 1141 / 1378, cx: 0.494, cy: 0.486, radius: 0.22 };
const ART_W = 1000;
// The closing section opens out of the Zenematics mark the same way in reverse: its alpha masks the
// scene, which grows until the head (the largest solid circle in it, as fractions of the square art)
// covers the screen; top and boxCy are the top and middle of the mark itself. LOGO_W is the logo <img>'s unscaled CSS width.
const ZEN_LOGO = `${import.meta.env.BASE_URL}uploads/zen-logo-white.png`;
const ZEN = { cx: 0.491, cy: 0.446, radius: 0.125, top: 0.21, boxCy: 0.529, bottom: 0.848 };
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
// The "What Zenderal is" crossroads' two roads, left then right, keys into OVERVIEW.welcome.
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
  // The crossroads: the road taken (null at the fork), the one the scene leans towards (kept after the
  // pointer leaves, so the zoom's origin doesn't jump), and which of the road's picture panels is open.
  const [audience, setAudience] = useState(null);
  const [side, setSide] = useState('newcomers');
  const [lean, setLean] = useState(false);
  const [panel, setPanel] = useState(0);
  const backRef = useRef(null);
  const takeRoad = (a) => {
    setSide(a);
    setAudience(a);
    setPanel(0);
  };
  useEffect(() => {
    if (audience) backRef.current?.focus({ preventScroll: true });
  }, [audience]);
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

  // "Modern visuals", opening out of the emblem, then the before/after wipe. The solid emblem sits under the
  // crossroads and scrolls up with the pin; once the pin sticks at the top (over the run below it,
  // .zcompare::after) the art fades as the section shows through its silhouette, which grows until the
  // sphere covers the pin, and the heading fades in. Then the divider sweeps right to left, uncovering
  // Zenderal's shot over base Enderal's. The mask is on from the start, so its image has loaded before it
  // shows. Reduced motion leaves a plain section split down the middle.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = document.querySelector('.zcompare');
    const pin = section.querySelector('.zcompare__pin');
    const head = pin.querySelector('.zcompare__head');
    const art = pin.querySelector('.zcompare__emblem');
    const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const ease = (x) => x * x * (3 - 2 * x);
    let frame = 0;
    const update = () => {
      frame = 0;
      const t = ramp(-section.getBoundingClientRect().top, 0, section.offsetHeight - pin.offsetHeight);
      pin.style.setProperty('--split', `${(100 * (1 - ease(ramp(t, 0.42, 0.95)))).toFixed(2)}%`);
      head.style.opacity = ease(ramp(t, 0.28, 0.4));
      const open = ease(ramp(t, 0.02, 0.34));
      if (open === 1) {
        pin.style.maskImage = pin.style.maskSize = pin.style.maskPosition = '';
        art.style.opacity = '0';
        return;
      }
      // In the pin's own coordinates, centred as it is once stuck, so it scrolls in with the pin first.
      // From its resting size up to where the sphere covers the pin's farthest corner.
      const W = pin.offsetWidth;
      const H = pin.offsetHeight;
      const w0 = Math.min(innerWidth * 0.7, (innerHeight * 0.5) / EMBLEM.ratio);
      const cx = W / 2;
      const cy = H / 2;
      const w1 = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) / EMBLEM.radius;
      const w = w0 * (w1 / w0) ** open;
      const h = w * EMBLEM.ratio;
      const x = cx - EMBLEM.cx * w;
      const y = cy - EMBLEM.cy * h;
      pin.style.maskImage = `url(${EMBLEM_MASK})`;
      pin.style.maskSize = `${w}px ${h}px`;
      pin.style.maskPosition = `${x}px ${y}px`;
      art.style.opacity = 1 - ease(ramp(t, 0.04, 0.2));
      art.style.transform = `translate(${x}px, ${y}px) scale(${w / ART_W})`;
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
    const portraits = [...pin.querySelectorAll('.zbuild__portrait')];
    const veil = pin.querySelector('.zbuild__veil');
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
      for (const f of featured) f.style.width = `${Math.min(500, (ring - icon) * 1.6)}px`;
      // The hole has opened once it reaches the farthest corner from the circle's middle.
      const open = Math.hypot(Math.max(c.x, W - c.x), Math.max(c.y, H - c.y));
      // The trait art fills the circle, or stops inside the ring where it sits inside the circle.
      const inner = ring - icon * 0.7;
      L = { start, peak, end, ring, inner, open };
      onScroll();
    };
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!L) return;
      const t = reduce ? 1 : ramp(-section.getBoundingClientRect().top, 0, section.offsetHeight - pin.offsetHeight);
      const { start, peak, end, ring, inner, open } = L;
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
      // Its art fills the dark circle behind the text, crossfading as the ring turns.
      const pr = Math.min(r, inner);
      portraits.forEach((p, i) => {
        p.style.width = p.style.height = `${2 * pr}px`;
        p.style.transform = `translate(${x - pr}px, ${y - pr}px)`;
        p.style.opacity = shown * Math.max(0, 1 - Math.abs(i - turn));
      });
      // The blur behind the text covers the same circle and stays put while the art crossfades under it.
      veil.style.width = veil.style.height = `${2 * pr}px`;
      veil.style.transform = `translate(${x - pr}px, ${y - pr}px)`;
      veil.style.opacity = shown;

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

  // The closing portal. The Zenematics mark arrives as the pin reaches the
  // top, the scene shows through it as its art fades, and it grows over the run (.zcta::after)
  // until the head covers the screen; then the text fades in. Its mark rests GAP below the build-crafting
  // section (the last before it), so the pin is pulled up over that section's end to match.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cta = document.querySelector('.zcta');
    const pin = cta.querySelector('.zcta__pin');
    const portal = pin.querySelector('.zcta__portal');
    const body = pin.querySelector('.zcta__body');
    const art = pin.querySelector('.zcta__logo');
    const byline = pin.querySelector('.zcta__byline');
    const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const ease = (x) => x * x * (3 - 2 * x);
    const last = document.querySelector('.zbuild');
    const compare = document.querySelector('.zcompare');
    const GAP = 240;
    const pageTop = (el) => el.getBoundingClientRect().top + scrollY;
    const rest = () => {
      const W = pin.offsetWidth;
      const H = pin.offsetHeight;
      const w0 = Math.min(W * 0.6, H * 0.5);
      return { W, H, w0, by: W <= 860 ? H * 0.34 : H / 2 };
    };
    const layout = () => {
      const { w0, by } = rest();
      const logoTop = by - (ZEN.boxCy - ZEN.top) * w0;
      const end = last.getBoundingClientRect().bottom + scrollY;
      const margin = parseFloat(getComputedStyle(cta).marginTop);
      cta.style.marginTop = `${end + GAP - logoTop - (pageTop(cta) - margin)}px`;
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
        art.style.opacity = byline.style.opacity = '0';
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
      // The byline sits centred under the mark and goes with its art.
      byline.style.opacity = art.style.opacity;
      byline.style.transform = `translate(${ax}px, ${y + ZEN.bottom * w + 48}px) translateX(-50%)`;
      body.style.opacity = ramp(t, 0.85, 1);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // The sections above reflow as the fonts and the spell list load.
    const ro = new ResizeObserver(layout);
    ro.observe(document.querySelector('.znew'));
    ro.observe(compare);
    for (const el of document.querySelectorAll('.zclips')) ro.observe(el);
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

      <section className="znew">
        {/* The crossroads, full width: the heading sits on the scene over the two roads' signs, and both go
            when a road is taken. Each sign leans the scene towards its road; taking it zooms down the road
            and brings up that road's picture panels. The heading and signs and both roads' views share one
            grid cell, so the scene keeps the tallest one's height. */}
        <div
          className={`zfork zfork--${side}${audience ? ' is-taken' : ''}${lean && !audience ? ' is-leaning' : ''}`}
          style={{
            '--road-x': `${OVERVIEW.welcome[side].road.x}%`,
            '--road-y': `${OVERVIEW.welcome[side].road.y}%`,
          }}
        >
          <div className="zfork__backdrop">
            <div className="zfork__scene zparallax">
              {/* Back is the sky, mountains and valley, mid the village and castle cliff, front the travellers,
                  the signpost and the near ground. */}
              <Layers src={OVERVIEW.welcome.art} />
            </div>
            <div className="zfork__shade" />
          </div>
          <div className="zfork__roads" aria-hidden={audience ? true : undefined}>
            <div className="znew__head">
              <span className="docs__label">{OVERVIEW.welcome.label}</span>
              <h2 className="znew__title">{OVERVIEW.welcome.title}</h2>
              <p className="znew__text">{OVERVIEW.welcome.text}</p>
            </div>
            <div className="zfork__signs">
              {AUDIENCES.map((a) => (
                <button
                  key={a}
                  type="button"
                  id={`znew-road-${a}`}
                  className={`zfork__sign zfork__sign--${a}`}
                  tabIndex={audience ? -1 : undefined}
                  onMouseEnter={() => {
                    setSide(a);
                    setLean(true);
                  }}
                  onMouseLeave={() => setLean(false)}
                  onFocus={() => {
                    setSide(a);
                    setLean(true);
                  }}
                  onBlur={() => setLean(false)}
                  onClick={() => takeRoad(a)}
                >
                  <span className="zfork__kicker">{OVERVIEW.welcome[a].kicker}</span>
                  <span className="zfork__label">{OVERVIEW.welcome[a].label}</span>
                  <span className="zfork__take">
                    {OVERVIEW.welcome[a].take ?? OVERVIEW.welcome[a].title} <span aria-hidden="true">{a === 'newcomers' ? '←' : '→'}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="zfork__views">
            {AUDIENCES.map((a) => {
              const view = OVERVIEW.welcome[a];
              const on = audience === a;
              return (
                <div key={a} className={`znew__view${on ? ' is-on' : ''}`} aria-hidden={on ? undefined : true}>
                  <div className="znew__view-head">
                    <button
                      ref={on ? backRef : undefined}
                      type="button"
                      className="zfork__back"
                      tabIndex={on ? undefined : -1}
                      onClick={() => {
                        setAudience(null);
                        requestAnimationFrame(() => document.getElementById(`znew-road-${a}`)?.focus({ preventScroll: true }));
                      }}
                    >
                      <span aria-hidden="true">←</span> {OVERVIEW.welcome.back}
                    </button>
                    <h3 className="znew__panel-title">{view.title}</h3>
                  </div>
                  {/* Picture panels: the open one (hovered, focused or tapped) widens to show its line and links. */}
                  <ul className="zpanels">
                    {view.panels.map((p, i) => {
                      const open = on && panel === i;
                      return (
                        <li
                          key={p.title}
                          className={`zpanels__item${open ? ' is-open' : ''}`}
                          style={{ '--n': i }}
                          onMouseEnter={() => setPanel(i)}
                        >
                          <img src={`${import.meta.env.BASE_URL}uploads/${p.art}`} alt="" loading="lazy" className="zpanels__art" style={p.focus && { objectPosition: p.focus }} />
                          <div className="zpanels__foot">
                            <button
                              type="button"
                              className="zpanels__head"
                              aria-expanded={open}
                              tabIndex={on ? undefined : -1}
                              onClick={() => setPanel(i)}
                              onFocus={() => setPanel(i)}
                            >
                              <span className="zpanels__n">{String(i + 1).padStart(2, '0')}</span>
                              <span className="zpanels__title">{p.title}</span>
                            </button>
                            <div className="zpanels__body">
                              <div className="zpanels__inner">
                                <p className="zpanels__text">{p.text}</p>
                                {p.road && (
                                  <div className="zpanels__links">
                                    <button type="button" className="zpanels__link" tabIndex={open ? undefined : -1} onClick={() => takeRoad(p.road)}>
                                      {OVERVIEW.welcome[p.road].title} <span aria-hidden="true">→</span>
                                    </button>
                                  </div>
                                )}
                                {p.links && (
                                  <div className="zpanels__links">
                                    {p.links.map((l) => (
                                      <a
                                        key={l.label}
                                        href={l.href ?? resolve(l).href}
                                        className="zpanels__link"
                                        tabIndex={open ? undefined : -1}
                                        {...(l.href && { target: '_blank', rel: 'noopener noreferrer' })}
                                      >
                                        {l.label} <span aria-hidden="true">{l.href ? '↗' : '→'}</span>
                                        {l.href && <span className="sr-only"> (opens in a new tab)</span>}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="zcompare">
        <div className="zcompare__pin">
          <img src={`${import.meta.env.BASE_URL}uploads/zenderal-emblem.webp`} alt="" className="zcompare__emblem" />
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

      {/* The sword carries the combat heading and cuts between the clips; the grid stands in with reduced motion. */}
      <Sword {...OVERVIEW.combat} />
      <Clips {...OVERVIEW.combat} bare />

      <Grimoire />

      <Clips {...OVERVIEW.firearms} />

      <section className="zbuild">
        <div className="zbuild__pin">
          <img
            src={`${import.meta.env.BASE_URL}uploads/zenderal/screenshots/perks-overview.webp`}
            alt=""
            className="zbuild__shot"
          />
          <div className="zbuild__dark" />
          {/* The trait ring, round the stone circle; the trait it stops on fills the middle with its art and text. */}
          <div className="zbuild__ring" aria-hidden="true">
            {FEATURED.map((t) => (
              <img key={t.name} src={`${TRAIT_ART}${t.img}`} alt="" className="zbuild__portrait" />
            ))}
            <div className="zbuild__veil" />
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
              {PROPHECY_EDGES.map((e) => (
                <polyline
                  key={e.key}
                  points={e.pts.map(([x, y]) => `${x},${-y}`).join(' ')}
                  fill="none"
                  stroke={e.tree.color}
                  strokeOpacity={e.spoke ? 0.35 : 0.55}
                  strokeWidth="1.25"
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
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
          <p className="zcta__byline eyebrow">A Modlist By Zen</p>
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

// A row of gameplay clips under a heading, each linking to its guide section. Placeholder
// clips (the logo video) sit letterboxed until real ones are recorded. `bare` leaves the heading out.
function Clips({ label, title, text, clips, bare }) {
  return (
    <section className={`zclips${bare ? ' zclips--bare' : ''}`}>
      {!bare && (
        <div className="zclips__head">
          <span className="docs__label">{label}</span>
          <h2 className="zclips__title">{title}</h2>
          <p className="zclips__text">{text}</p>
        </div>
      )}
      <div className="zclips__grid">
        {clips.map((clip) => (
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
  );
}
