import { useEffect, useRef } from 'react';

// The firearms section: a flintlock gun in 3D (musket3d.js). The pin sticks over the run below it
// (.zmusket__run::after). It opens on the gun aimed at the viewer over the section's label; the label fades, the gun
// swings round to lie level in profile and the heading fades in under it. Then it braces and fires (a muzzle flash and
// a recoil kick) and a flash whites out the screen. The white is fixed over the page. The build-crafting section is
// pulled up behind the end of the run (.zmusket + .zbuild) so that it pins just as the white is full, and is hidden
// until then; the white then thins over it, revealing it where it stands. The pin fades out under the full white, so
// none of it shows through. Everything
// moves by transform and opacity, written straight to the elements. Reduced motion shows the gun settled.

const SHOT = 0.5; // where in the run the gun fires
const WHITE = 0.64; // where the white is full; the CSS pulls the next section up to pin here

const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
const ease = (x) => x * x * (3 - 2 * x);

export default function Musket({ label, title, text }) {
  const box = useRef(null);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = box.current.closest('.zmusket');
    const run = section.querySelector('.zmusket__run');
    const pin = run.querySelector('.zmusket__pin');
    const word = pin.querySelector('.zmusket__word');
    const head = pin.querySelector('.zmusket__head');
    const flashEl = pin.querySelector('.zmusket__flash');
    const whiteEl = section.querySelector('.zmusket__white');
    const next = section.nextElementSibling;
    let gun;
    let cancelled = false;
    let frame = 0;
    let shown = 0;
    // With reduced motion the pin doesn't stick, so it rests with the gun settled and the heading up.
    const target = () => (reduce ? 0.45 : ramp(-run.getBoundingClientRect().top, 0, run.offsetHeight - pin.offsetHeight));

    const draw = (t) => {
      // Read before writing, so the frame doesn't force a second layout.
      const vh = innerHeight;
      const top = next ? next.getBoundingClientRect().top : vh;
      const kick = ramp(t, SHOT, SHOT + 0.025) * (1 - ease(ramp(t, SHOT + 0.025, SHOT + 0.2)));
      const flash = ramp(t, SHOT - 0.01, SHOT + 0.01) * (1 - ramp(t, SHOT + 0.01, SHOT + 0.09));
      gun?.set({ turn: ramp(t, 0.03, 0.3), zoom: 1 + 0.08 * ease(ramp(t, 0.38, SHOT)), kick });

      const w = ramp(t, 0.01, 0.15);
      word.style.opacity = (0.9 * (1 - w)).toFixed(3);
      word.style.transform = `scale(${(1 + 0.15 * w).toFixed(3)})`;
      const h = ramp(t, 0.25, 0.38);
      head.style.opacity = h.toFixed(3);
      head.style.transform = `translateY(${((1 - h) * 20).toFixed(1)}px)`;

      flashEl.style.opacity = flash.toFixed(3);
      flashEl.style.visibility = flash > 0 ? 'visible' : 'hidden';
      if (flash > 0 && gun) {
        const m = gun.muzzle();
        flashEl.style.transform = `translate(${m.x.toFixed(1)}px, ${m.y.toFixed(1)}px) scale(${(0.6 + 0.5 * flash).toFixed(3)})`;
      }
      // The whiteout rises after the shot; the next section has pinned under it by then, and it thins over the first
      // half screen of that section's run.
      const rise = reduce ? 0 : ease(ramp(t, SHOT + 0.03, WHITE));
      whiteEl.style.opacity = (rise * (1 - ease(ramp(-top, 0, 0.5 * vh)))).toFixed(3);
      if (next && !reduce) next.style.visibility = rise < 1 ? 'hidden' : '';
      // Under the full whiteout the gun and heading go, so nothing of them shows as it thins.
      pin.style.opacity = (1 - ramp(rise, 0.8, 1)).toFixed(3);
    };

    // Eased towards the scroll, as with the sword, so a flick of the wheel glides.
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

    import('./musket3d.js')
      .then(({ mount }) => {
        if (cancelled) return;
        gun = mount(box.current, () => pin.classList.add('is-live'));
        draw(shown);
      })
      .catch(() => {});
    shown = target();
    draw(shown);
    if (!reduce) addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', kick);
    return () => {
      cancelled = true;
      gun?.dispose();
      removeEventListener('scroll', kick);
      removeEventListener('resize', kick);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="zmusket">
      <div className="zmusket__run">
        <div className="zmusket__pin">
          <p className="zmusket__word" aria-hidden="true">
            {label}
          </p>
          <div ref={box} className="zmusket__stage" aria-hidden="true" />
          <div className="zmusket__flash" aria-hidden="true" />
          <div className="zmusket__head">
            <span className="docs__label">{label}</span>
            <h2 className="zclips__title">{title}</h2>
            <p className="zclips__text">{text}</p>
          </div>
        </div>
      </div>
      <div className="zmusket__white" aria-hidden="true" />
    </section>
  );
}
