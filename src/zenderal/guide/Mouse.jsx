import { useState } from 'react';
import { MOUSE } from './data.js';

// The diagram's buttons, keyed by MOUSE[].part. Side buttons sit on the left flank:
// Mouse 5 (forward) above Mouse 4 (back), as on most mice.
const PARTS = {
  left: { d: 'M96 13 C56 16 24 46 21 110 L21 124 L96 124 Z' },
  right: { d: 'M104 13 C144 16 176 46 179 110 L179 124 L104 124 Z' },
  wheel: { rect: { x: 90, y: 38, width: 20, height: 50, rx: 10 } },
  m5: { rect: { x: 11, y: 148, width: 14, height: 36, rx: 6 } },
  m4: { rect: { x: 11, y: 190, width: 14, height: 36, rx: 6 } },
};

// Which part a category highlight touches: a part lights up if any of its bindings is in that category.
const partCats = (part) => MOUSE.filter((m) => m.part === part).map((m) => m.cat);

// One clickable button on the diagram.
function Part({ id, cur, cat, pick }) {
  const p = PARTS[id];
  const cats = partCats(id);
  // The first binding of a part is the one its colour and click select.
  const first = MOUSE.findIndex((m) => m.part === id);
  const on = cur.part === id;
  const dim = cat && !cats.includes(cat);
  const props = {
    className: `ms__part kb__key--${MOUSE[first].cat}${on ? ' is-focus' : ''}${dim ? ' is-dim' : ''}`,
    role: 'button',
    tabIndex: 0,
    'aria-label': MOUSE.filter((m) => m.part === id).map((m) => `${m.input}: ${m.action}`).join('; '),
    onMouseEnter: pick(first),
    onFocus: pick(first),
    onClick: pick(first),
  };
  return p.d ? <path d={p.d} {...props} /> : <rect {...p.rect} {...props} />;
}

export default function Mouse({ cat }) {
  const [focus, setFocus] = useState(0);
  const cur = MOUSE[focus];
  const pick = (k) => () => setFocus(k);

  return (
    <div className="ms">
      <svg className="ms__svg" viewBox="0 0 200 300" role="group" aria-label="Mouse layout">
        <path
          className="ms__body"
          d="M100 10 C152 10 182 46 182 112 L182 200 C182 256 146 292 100 292 C54 292 18 256 18 200 L18 112 C18 46 48 10 100 10 Z"
        />
        <Part id="left" cur={cur} cat={cat} pick={pick} />
        <Part id="right" cur={cur} cat={cat} pick={pick} />
        <Part id="wheel" cur={cur} cat={cat} pick={pick} />
        {/* Wheel ridges, purely decorative. */}
        {[50, 58, 66, 74].map((y) => (
          <line key={y} x1="95" x2="105" y1={y} y2={y} className="ms__ridge" />
        ))}
        <Part id="m5" cur={cur} cat={cat} pick={pick} />
        <Part id="m4" cur={cur} cat={cat} pick={pick} />
        <text x="18" y="142" className="ms__tag">5</text>
        <text x="18" y="242" className="ms__tag">4</text>
      </svg>

      <div className="ms__side">
        <ul className="ms__list">
          {MOUSE.map((m, k) => (
            <li key={m.input}>
              <button
                type="button"
                className={`ms__row kb__legend--${m.cat}${k === focus ? ' is-focus' : ''}${cat && m.cat !== cat ? ' is-dim' : ''}`}
                onMouseEnter={pick(k)}
                onFocus={pick(k)}
                onClick={pick(k)}
              >
                <span className="kb__swatch" />
                <span className="ms__input">{m.input}</span>
                <span className="ms__action">{m.action}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className={`kb__detail kb__detail--${cur.cat}`} aria-live="polite">
          <span className="kb__detail-key">{cur.input}</span>
          <span className="kb__detail-act">{cur.action}</span>
          {cur.note && <span className="g-note">{cur.note}</span>}
        </div>
      </div>
    </div>
  );
}
