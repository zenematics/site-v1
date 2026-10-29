import { useEffect, useRef } from 'react';
import { ZENDERAL_STAGE, stageLabel } from '../config.js';
import Emblem from './Emblem.jsx';
import Logo from './Logo.jsx';

const UPLOADS = `${import.meta.env.BASE_URL}uploads/`;
const BACKGROUNDS = `${UPLOADS}zenderal/screenshots/backgrounds/`;

// The Ark shot split into depth layers, far to near (public/uploads/zenderal/hero/):
// back is the filled sky, peaks and water; mid the castle, statue and cliffs; front the bridge and town.
const LAYERS = ['back', 'mid', 'front'];

// The Zenderal page header, titled with the Zenderal wordmark. `compact` is the shorter
// version used on the docs and guide pages; `live` shows the scroll parallax background
// (and the 3D emblem, if shown), and `emblem={false}` drops the emblem so the wordmark
// can go full width (overview page).
// `bg` names the still background in screenshots/backgrounds/, or a path under uploads/ if it
// has a slash (not used with `live`), and
// `bgPos` overrides which part of it the crop keeps (CSS object-position).
export default function ZenHero({ eyebrow, desc, compact = false, live = false, emblem = true, bg = 'ark.webp', bgPos, children }) {
  const hero = useRef(null);

  // Feed the scroll offset (clamped to the hero's height) to the CSS as --s.
  useEffect(() => {
    if (!live || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = hero.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.setProperty('--s', Math.min(scrollY, el.offsetHeight).toFixed(1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [live]);

  return (
    <header ref={hero} className={`zhero${compact ? ' zhero--compact' : ''}${live ? ' zhero--parallax' : ''}`}>
      {live ? (
        LAYERS.map((l) => (
          <img
            key={l}
            src={`${import.meta.env.BASE_URL}uploads/zenderal/hero/ark-${l}.webp`}
            alt=""
            className={`zhero__bg zhero__layer zhero__layer--${l}`}
          />
        ))
      ) : (
        <img src={`${bg.includes('/') ? UPLOADS : BACKGROUNDS}${bg}`} alt="" className="zhero__bg" style={{ objectPosition: bgPos }} />
      )}
      <div className="zhero__shade" />
      {emblem && <Emblem live={live} className="zhero__emblem" />}
      <div className="zhero__inner">
        <div className="eyebrow-row">
          <span className="eyebrow" style={{ color: '#c9c5bd' }}>{eyebrow}</span>
          <span className="stage-badge">{stageLabel(ZENDERAL_STAGE)}</span>
        </div>
        <h1 className="zhero__title">
          <Logo />
        </h1>
        <p className="zhero__desc">{desc}</p>
        {children}
      </div>
    </header>
  );
}
