import { useEffect, useRef } from 'react';

// The combat section's opener: Relentless, Zen's sword, in 3D (sword3d.js). The pin sticks over the run below it
// (.zsword__run::after): it opens on the section's label either side of the upright sword, the words part and fade,
// then the sword turns level, its runes light, and the heading fades in under it. Reduced motion shows it settled,
// without the pin.
export default function Sword({ label, title, text }) {
  const box = useRef(null);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = box.current.closest('.zsword__run');
    const pin = run.querySelector('.zsword__pin');
    const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    let sword;
    let cancelled = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      const t = reduce ? 1 : ramp(-run.getBoundingClientRect().top, 0, run.offsetHeight - pin.offsetHeight);
      sword?.set(ramp(t, 0.15, 0.75), ramp(t, 0.6, 0.85));
      pin.style.setProperty('--words', ramp(t, 0.03, 0.22).toFixed(3));
      pin.style.setProperty('--head', ramp(t, 0.75, 0.92).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    import('./sword3d.js')
      .then(({ mount }) => {
        if (cancelled) return;
        sword = mount(box.current, () => pin.classList.add('is-live'));
        update();
      })
      .catch(() => {});
    update();
    if (!reduce) addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelled = true;
      sword?.dispose();
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="zsword">
      <div className="zsword__run">
        <div className="zsword__pin">
          <div ref={box} className="zsword__stage" aria-hidden="true" />
          {/* The label's two words, either side of the sword. */}
          <p className="zsword__words">
            {label.split(' ').map((w) => (
              <span key={w} className="zsword__word">
                {w}
              </span>
            ))}
          </p>
          <div className="zsword__head">
            <h2 className="zclips__title">{title}</h2>
            <p className="zclips__text">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
