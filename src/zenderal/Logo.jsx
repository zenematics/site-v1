import { useEffect, useRef, useState } from 'react';

const BASE = `${import.meta.env.BASE_URL}uploads/zenderal/`;

// The Zenderal wordmark. On load the vines grow around the Z (logo-grow.*,
// white on black, blended in with `screen`), then it hands over to the static
// PNG, which the video's last frame matches. Reduced motion, a failed or
// blocked autoplay, or a video that's slow to start all go straight to the PNG.
export default function Logo() {
  const video = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setDone(true);
    const finish = () => setDone(true);
    const slow = setTimeout(() => v.paused && finish(), 2500);
    v.addEventListener('ended', finish);
    v.addEventListener('error', finish);
    v.play().catch(finish);
    return () => {
      clearTimeout(slow);
      v.removeEventListener('ended', finish);
      v.removeEventListener('error', finish);
    };
  }, []);

  return (
    <span className={`zhero__logo${done ? ' is-done' : ''}`}>
      <img src={`${BASE}logo-white.png`} alt="Zenderal" />
      {!done && (
        <video ref={video} muted playsInline preload="auto" aria-hidden="true">
          <source src={`${BASE}logo-grow.webm`} type="video/webm" />
          <source src={`${BASE}logo-grow.mp4`} type="video/mp4" />
        </video>
      )}
    </span>
  );
}
