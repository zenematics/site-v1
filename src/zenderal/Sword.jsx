import { useEffect, useRef, useState } from 'react';

// The combat section: Relentless, Zen's sword, in 3D (sword3d.js), and the combat clips it cuts between. The pin
// sticks over the run below it (.zsword__run::after). It opens on the section's label either side of the upright
// sword; the words part and fade, the sword turns level, its runes light and the heading fades in under it. Then four
// swings: each time the sword sweeps across the screen along a slanted line, with the next clip on the side it has
// passed (and a gold slash past its ends), until the clip fills the screen. The first swing winds up first, the sword
// rising off the top of the screen as the heading fades, then comes down; the rest alternate direction. A last swing
// cuts the whole section away to expanded magic, pinned under it by then (.zclips--bare + .zmagic). Reduced motion
// skips all of it: the sword shows settled and the clips follow as a grid (Zenderal.jsx).
// The run starts with the pin already stuck under "Modern visuals" as it wipes away (UNDER), and ends with the last
// swing (EXIT); t runs 0 → 1 between them, and on to 1 + the exit's share over the last swing.

const GUIDE_URL = `${import.meta.env.BASE_URL}zenderal/guide/`;
const CLIPS_AT = 0.32; // where the swings start, as a fraction of the run
const SWEEP = 0.45; // the part of each clip's slice its swing takes; it holds for the rest
const FIRST = 0.7; // the same for the first clip, whose swing includes the wind-up
const WINDUP = 0.3; // the part of the first swing spent rising
const ANGLES = [-0.21, 0.17, -0.15, 0.2]; // each cut's slant, radians clockwise on screen
const LAST = -0.18; // the slant of the swing out to expanded magic, which comes back down
const UNDER = 1; // screens of the run spent under "Modern visuals" (WIPE in Zenderal.jsx)
const EXIT = 1; // screens of the run the last swing takes; the CSS pulls expanded magic up to match

const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
const ease = (x) => x * x * (3 - 2 * x);

// The clip on screen and how far the swing into it has got, at run position t; for the first clip, up is how far
// the sword has risen before it swings.
function swingAt(t) {
  const slice = (1 - CLIPS_AT) / ANGLES.length;
  const k = Math.min(ANGLES.length - 1, Math.floor(Math.max(0, t - CLIPS_AT) / slice));
  if (t < CLIPS_AT) return { k, s: 0, up: 0 };
  const r = ramp(t - CLIPS_AT - k * slice, 0, slice * (k === 0 ? FIRST : SWEEP));
  if (k > 0) return { k, s: ease(r), up: 1 };
  return { k, s: ease(ramp(r, WINDUP, 1)), up: ease(ramp(r, 0, WINDUP)) };
}

export default function Sword({ label, title, text, clips }) {
  const box = useRef(null);
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = box.current.closest('.zsword__run');
    const pin = run.querySelector('.zsword__pin');
    const frameEl = pin.querySelector('.zsword__clips');
    const layers = [...pin.querySelectorAll('.zsword__clip')];
    const videos = layers.map((l) => l.querySelector('video'));
    const slash = pin.querySelector('.zsword__slash');
    const back = pin.querySelector('.zsword__back');
    const captionEl = pin.querySelector('.zsword__caption');
    let sword;
    let cancelled = false;
    let frame = 0;
    let shown = 0;
    let on = false;
    let shownK = -2;
    // The scroll between the two ends, and the last swing's share of it.
    const span = () => run.offsetHeight - pin.offsetHeight - (UNDER + EXIT) * innerHeight;
    const tail = () => (EXIT * innerHeight) / span();
    const target = () => {
      if (reduce) return 1;
      const t = (-run.getBoundingClientRect().top - UNDER * innerHeight) / span();
      return Math.min(1 + tail(), Math.max(0, t));
    };

    const draw = (t) => {
      const W = pin.clientWidth;
      const H = pin.clientHeight;
      // How far the cut line must travel from the middle to clear the screen with the sword's crossguard.
      const reach = Math.hypot(W, H) / 2 + 0.12 * W;
      const { k, s, up } = swingAt(t);
      const out = reduce ? 0 : ease(ramp(t, 1, 1 + tail()));
      const swinging = t >= CLIPS_AT;
      const fr = frameEl.getBoundingClientRect();
      const pr = pin.getBoundingClientRect();
      // Even swings travel down the normal, odd ones back up, and the last one out down again from where the fourth
      // left it, off the top. The first rises from the middle, where the sword rests, tilting into its slant, just
      // until its line clears the frame's top corner, then comes down.
      const dir = out > 0 || k % 2 === 0 ? 1 : -1;
      let from = -dir * reach;
      if (k === 0) {
        const n0 = [-Math.sin(ANGLES[0]), Math.cos(ANGLES[0])];
        const corners = [fr.left, fr.right].flatMap((x) => [fr.top, fr.bottom].map((y) => [x - pr.left, y - pr.top]));
        from = Math.min(...corners.map(([x, y]) => (x - W / 2) * n0[0] + (y - H / 2) * n0[1])) - 0.02 * H;
      }
      const p = out > 0 ? from + (reach - from) * out : !swinging ? 0 : k === 0 && s === 0 ? from * up : from + (dir * reach - from) * s;
      const a = out > 0 ? LAST : swinging ? ANGLES[k] * (k === 0 ? up : 1) : 0;
      const u = [Math.cos(a), Math.sin(a)];
      const n = [-Math.sin(a), Math.cos(a)];
      const cx = W / 2 + n[0] * p;
      const cy = H / 2 + n[1] * p;

      // Clip k shows on the side the sword has passed (behind it, against dir); earlier clips fill the rest, the
      // latest of them on top. The clips sit in a frame, so the cut is drawn in the frame's own coordinates (or those
      // of whatever element sits at ox, oy in the pin).
      const L = 4 * Math.max(W, H);
      const half = (side, ox = fr.left - pr.left, oy = fr.top - pr.top) => {
        const fx = cx - ox;
        const fy = cy - oy;
        const pts = [
          [fx + u[0] * L, fy + u[1] * L],
          [fx - u[0] * L, fy - u[1] * L],
          [fx - u[0] * L + side * n[0] * L, fy - u[1] * L + side * n[1] * L],
          [fx + u[0] * L + side * n[0] * L, fy + u[1] * L + side * n[1] * L],
        ];
        return `polygon(${pts.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(',')})`;
      };
      layers.forEach((l, i) => {
        const vis = !swinging || (k === 0 && s === 0) ? 'hidden' : i < k ? (i === k - 1 ? 'full' : 'hidden') : i === k ? 'cut' : 'hidden';
        l.style.visibility = vis === 'hidden' ? 'hidden' : 'visible';
        l.style.clipPath = vis === 'cut' && s < 1 ? half(-dir) : 'none';
      });
      // On the last swing everything but the sword and the slash is cut away on the side it has passed, down to
      // expanded magic underneath; by the end the line is off the screen and none of it is left.
      const cr = out > 0 && captionEl.getBoundingClientRect();
      back.style.clipPath = out > 0 ? half(dir, 0, 0) : '';
      frameEl.style.clipPath = out > 0 ? half(dir) : '';
      captionEl.style.clipPath = out > 0 ? half(dir, cr.left - pr.left, cr.top - pr.top) : '';
      // The slash runs along the cut, visible only mid-swing.
      const cut = out > 0 ? out : s;
      slash.style.opacity = swinging && cut > 0 && cut < 1 ? Math.min(1, Math.sin(Math.PI * cut) * 2).toFixed(3) : 0;
      slash.style.transform = `translate(${cx}px, ${cy}px) rotate(${a}rad)`;

      // As the first swing starts the sword comes closer and slides along the cut towards its hilt, so the blade
      // spans the screen and the grip is off the right-hand edge, with the crossguard at it.
      const close = ease(ramp(t, CLIPS_AT, CLIPS_AT + 0.03));
      const along = 0.06 * W * close;
      sword?.set({
        turn: ramp(t, 0.06, 0.24),
        glow: ramp(t, 0.18, 0.28),
        x: n[0] * p + u[0] * along,
        y: n[1] * p + u[1] * along,
        angle: a,
        zoom: 1 + 0.65 * close,
      });
      pin.style.setProperty('--words', ramp(t, 0.01, 0.08).toFixed(3));
      // The heading fades as the sword rises for the first swing, before that clip's caption comes in.
      const head = ramp(t, 0.22, 0.28) * (1 - (t >= CLIPS_AT && k === 0 ? ramp(up, 0, 0.6) : t >= CLIPS_AT ? 1 : 0));
      pin.style.setProperty('--head', head.toFixed(3));

      // The clip in view plays (and the one being cut away, mid-swing); the rest wait.
      const live = swinging ? k : -1;
      videos.forEach((v, i) => {
        const want = on && (i === live || (i === live - 1 && s < 1));
        if (want && v.paused) v.play().catch(() => {});
        else if (!want && !v.paused) v.pause();
      });
      const caption = swinging && s >= 0.5 ? k : swinging && k > 0 ? k - 1 : -1;
      if (caption !== shownK) setCurrent((shownK = caption));
    };

    // Eased towards the scroll, so a flick of the wheel glides rather than jumps; the sword and the cut share it.
    const loop = () => {
      const goal = target();
      shown += (goal - shown) * 0.14;
      if (Math.abs(goal - shown) < 0.0005) shown = goal;
      draw(shown);
      frame = shown === goal ? 0 : requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const seen = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      kick();
    });
    seen.observe(pin);

    import('./sword3d.js')
      .then(({ mount }) => {
        if (cancelled) return;
        sword = mount(box.current, () => pin.classList.add('is-live'));
        draw(shown);
      })
      .catch(() => {});
    shown = target();
    draw(shown);
    if (!reduce) addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', kick);
    return () => {
      cancelled = true;
      sword?.dispose();
      seen.disconnect();
      removeEventListener('scroll', kick);
      removeEventListener('resize', kick);
      cancelAnimationFrame(frame);
    };
  }, []);

  // A rail step jumps to where its clip has just been cut in.
  const jump = (i) => {
    const run = box.current.closest('.zsword__run');
    const pin = run.querySelector('.zsword__pin');
    const slice = (1 - CLIPS_AT) / clips.length;
    const t = CLIPS_AT + (i + (i ? SWEEP : FIRST) + 0.05) * slice;
    const span = run.offsetHeight - pin.offsetHeight - (UNDER + EXIT) * innerHeight;
    scrollTo({ top: run.getBoundingClientRect().top + scrollY + UNDER * innerHeight + t * span, behavior: 'smooth' });
  };

  return (
    <section className="zsword">
      <div className="zsword__run">
        <div className="zsword__pin">
          {/* The section's own backdrop, so expanded magic, pinned under it, only shows once the last swing cuts it away. */}
          <div className="zsword__back" />
          <div className="zsword__head">
            <h2 className="zclips__title">{title}</h2>
            <p className="zclips__text">{text}</p>
          </div>
          <div className="zsword__clips" aria-hidden="true">
            {clips.map((clip) => (
              <div key={clip.title} className="zsword__clip">
                <video className="zsword__video" muted loop playsInline preload="metadata">
                  <source src={`${import.meta.env.BASE_URL}uploads/zenderal/${clip.video}.webm`} type="video/webm" />
                  <source src={`${import.meta.env.BASE_URL}uploads/zenderal/${clip.video}.mp4`} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
          <div className="zsword__slash" aria-hidden="true" />
          <div ref={box} className="zsword__stage" aria-hidden="true" />
          {/* The label's two words, either side of the sword. */}
          <p className="zsword__words">
            {label.split(' ').map((w) => (
              <span key={w} className="zsword__word">
                {w}
              </span>
            ))}
          </p>
          <div className={`zsword__caption${current >= 0 ? ' is-on' : ''}`}>
            {clips.map((clip, i) => (
              <div key={clip.title} className={`zsword__about${i === current ? ' is-on' : ''}`} aria-hidden={i !== current}>
                <h3 className="zclip__title">{clip.title}</h3>
                <p className="zclip__text">{clip.text}</p>
                <a href={GUIDE_URL + clip.guide + '/'} className="zsword__guide" tabIndex={i === current ? 0 : -1}>
                  Read the guide →
                </a>
              </div>
            ))}
            <ol className="zsword__rail">
              {clips.map((clip, i) => (
                <li key={clip.title}>
                  <button
                    type="button"
                    className={`zsword__step${i === current ? ' is-on' : ''}`}
                    onClick={() => jump(i)}
                    aria-label={clip.title}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
