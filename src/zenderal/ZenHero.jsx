import { ZENDERAL_STAGE, stageLabel } from '../config.js';

// The Zenderal page header. `compact` is the shorter version used on the docs page.
export default function ZenHero({ eyebrow, desc, compact = false, children }) {
  return (
    <header className={`zhero${compact ? ' zhero--compact' : ''}`}>
      <img src={`${import.meta.env.BASE_URL}uploads/zenderal-bg.png`} alt="" className="zhero__bg" />
      <div className="zhero__shade" />
      <img src={`${import.meta.env.BASE_URL}uploads/zenderal-emblem.png`} alt="" className="zhero__emblem" />
      <div className="zhero__inner">
        <div className="eyebrow-row">
          <span className="eyebrow" style={{ color: '#c9c5bd' }}>{eyebrow}</span>
          <span className="stage-badge">{stageLabel(ZENDERAL_STAGE)}</span>
        </div>
        <h1 className="zhero__title">Zenderal</h1>
        <p className="zhero__desc">{desc}</p>
        {children}
      </div>
    </header>
  );
}
