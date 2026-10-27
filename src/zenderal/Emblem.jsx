import { useEffect, useRef, useState } from 'react';

// The Zenderal emblem. `live` swaps the flat image for the 3D model once it has
// loaded; it stays flat with reduced motion or if WebGL isn't available.
// `className` / `style` place it (hero emblem on the Zenderal pages, panel mark on home).
export default function Emblem({ live = false, className, style }) {
  const box = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!live || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cleanup;
    let cancelled = false;
    import('./emblem3d.js')
      .then(({ mount }) => {
        if (!cancelled) cleanup = mount(box.current, () => setReady(true));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [live]);

  return (
    <div ref={box} className={`emblem ${className}${ready ? ' is-live' : ''}`} style={style}>
      <img src={`${import.meta.env.BASE_URL}uploads/zenderal-emblem.webp`} alt="" />
    </div>
  );
}
