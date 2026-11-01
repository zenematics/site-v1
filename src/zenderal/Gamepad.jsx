import { useState } from 'react';
import { PAD, PAD_LAYERS } from './data.js';
import { KEY_CATS } from './guide/data.js';

// Pad geometry: buttons are drawn in pad units, then the whole pad is scaled by
// PAD_SCALE about (CX, CY) to leave room for the callout columns. `side`/`cy`
// place each button's callout; leader lines run from the callout to the button.
const BTN = {
  LT: { name: 'LT', x: 380, y: 112, side: 'l', cy: 50 },
  LB: { name: 'LB', x: 386, y: 147, side: 'l', cy: 106 },
  View: { name: 'View', x: 462, y: 222, side: 'l', cy: 162 },
  LS: { name: 'LS', x: 378, y: 250, side: 'l', cy: 218 },
  Up: { name: 'D-pad ↑', x: 440, y: 304, side: 'l', cy: 274 },
  Left: { name: 'D-pad ←', x: 412, y: 332, side: 'l', cy: 330 },
  Right: { name: 'D-pad →', x: 468, y: 332, side: 'l', cy: 402 },
  Down: { name: 'D-pad ↓', x: 440, y: 360, side: 'l', cy: 474 },
  RT: { name: 'RT', x: 620, y: 112, side: 'r', cy: 50 },
  RB: { name: 'RB', x: 614, y: 147, side: 'r', cy: 106 },
  Menu: { name: 'Menu', x: 538, y: 222, side: 'r', cy: 162 },
  Y: { name: 'Y', x: 628, y: 212, side: 'r', cy: 218 },
  B: { name: 'B', x: 660, y: 244, side: 'r', cy: 274 },
  X: { name: 'X', x: 596, y: 244, side: 'r', cy: 346 },
  A: { name: 'A', x: 628, y: 276, side: 'r', cy: 402 },
  RS: { name: 'RS', x: 572, y: 338, side: 'r', cy: 458 },
};
const PAD_SCALE = 0.85;
const CX = 500;
const CY = 290;
const PAD_TRANSFORM = `translate(${CX} ${CY}) scale(${PAD_SCALE}) translate(${-CX} ${-CY})`;
const scaled = (x, y) => [CX + (x - CX) * PAD_SCALE, CY + (y - CY) * PAD_SCALE];
const ORDER = Object.keys(BTN);
const FACE = new Set(['A', 'B', 'X', 'Y']);
const DPAD = {
  Up: 'M0 -10 L8 2 H-8 Z',
  Down: 'M0 10 L8 -2 H-8 Z',
  Left: 'M-10 0 L2 -8 V8 Z',
  Right: 'M10 0 L-2 -8 V8 Z',
};

const BODY =
  'M318 170 C350 150 430 156 470 168 L530 168 C570 156 650 150 682 170 C735 205 772 310 792 410 C804 470 778 500 742 492 C708 484 682 440 652 412 C620 400 380 400 348 412 C318 440 292 484 258 492 C222 500 196 470 208 410 C228 310 265 205 318 170 Z';

// The button's own shape, drawn at its position.
function Shape({ id }) {
  const { x, y } = BTN[id];
  if (id === 'LT' || id === 'RT') return <rect x={x - 30} y={y - 15} width={60} height={28} rx={10} />;
  if (id === 'LB' || id === 'RB')
    return (
      <rect
        x={x - 48}
        y={y - 8}
        width={96}
        height={16}
        rx={8}
        transform={`rotate(${id === 'LB' ? -6 : 6} ${x} ${y})`}
      />
    );
  if (id === 'LS' || id === 'RS') return <circle cx={x} cy={y} r={34} />;
  if (id === 'View' || id === 'Menu') return <circle cx={x} cy={y} r={11} />;
  if (DPAD[id]) return <rect x={x - 13} y={y - 13} width={26} height={26} rx={4} />;
  return <circle cx={x} cy={y} r={16} />;
}

function Glyph({ id }) {
  const { x, y } = BTN[id];
  if (DPAD[id]) return <path className="pad__glyph" d={DPAD[id]} transform={`translate(${x} ${y})`} />;
  if (FACE.has(id))
    return (
      <text className={`pad__face pad__face--${id}`} x={x} y={y + 6}>
        {id}
      </text>
    );
  if (id === 'LS' || id === 'RS')
    return (
      <>
        <circle className="pad__stick" cx={BTN[id].x} cy={BTN[id].y} r={22} />
        <text className="pad__tag" x={x} y={y + 4}>
          {id}
        </text>
      </>
    );
  const label = id === 'View' ? '⧉' : id === 'Menu' ? '≡' : id;
  return (
    <text className="pad__tag" x={x} y={y + 4}>
      {label}
    </text>
  );
}

// Primary action on the first line; the button and how it's pressed underneath;
// a second input (hold / double tap) on a third line.
function Callout({ id, bind, held }) {
  const { side, cy } = BTN[id];
  const [x, y] = scaled(BTN[id].x, BTN[id].y);
  const l = side === 'l';
  const tx = l ? 236 : 764;
  const elbow = l ? 262 : 738;
  const [first, second] = bind?.in ?? [];
  const how = first && !['Press', 'Click', 'B +', 'A +'].includes(first[0]) ? ` · ${first[0]}` : '';
  return (
    <g className="pad__callout">
      <polyline className="pad__lead" points={`${l ? 244 : 756},${cy} ${elbow},${cy} ${x},${y}`} />
      <circle className="pad__dot" cx={x} cy={y} r={3} />
      <text x={tx} y={cy + 5} textAnchor={l ? 'end' : 'start'}>
        <tspan className="pad__act">{held ? 'Hold down' : first[1]}</tspan>
        <tspan className="pad__sub" x={tx} dy={24}>
          {BTN[id].name}
          {held ? ' · modifier' : how}
        </tspan>
        {second && (
          <tspan className="pad__sub pad__sub--alt" x={tx} dy={19}>
            {second[0]}: {second[1]}
          </tspan>
        )}
      </text>
    </g>
  );
}

export default function Gamepad() {
  const [layer, setLayer] = useState('play');
  const [focus, setFocus] = useState('B');
  const L = PAD_LAYERS.find((l) => l.id === layer);
  const map = PAD[layer];
  const bind = map[focus];

  const pickLayer = (id) => {
    setLayer(id);
    if (!PAD[id][focus]) setFocus(ORDER.find((k) => PAD[id][k]));
  };

  return (
    <div className="g-stack g-stack--tight">
      <div className="spells__chips" role="tablist" aria-label="Controller layer">
        {PAD_LAYERS.map((l) => (
          <button
            key={l.id}
            type="button"
            role="tab"
            aria-selected={layer === l.id}
            className={`chip${layer === l.id ? ' is-on' : ''}`}
            onClick={() => pickLayer(l.id)}
          >
            {l.label}
            <span className="chip__count">{Object.keys(PAD[l.id]).length}</span>
          </button>
        ))}
      </div>
      <p className="g-note">{L.desc} Hover or tap a button to see what it does.</p>

      <div className="pad__scroll">
        <svg className="pad" viewBox="-70 0 1140 520" role="group" aria-label={`Controller layout: ${L.label}`}>
          <g transform={PAD_TRANSFORM}>
            <path className="pad__body" d={BODY} />
            <circle className="pad__logo" cx={500} cy={196} r={14} />
            <rect className="pad__dpad" x={399} y={291} width={82} height={82} rx={8} />
          </g>
          {ORDER.map((id) => {
            const b = map[id];
            const held = L.hold === id;
            return (b || held) && <Callout key={id} id={id} bind={b} held={held} />;
          })}
          <g transform={PAD_TRANSFORM}>
            {ORDER.map((id) => {
              const b = map[id];
              const held = L.hold === id;
              const cls = [
                'pad__btn',
                b && `pad__btn--${b.cat}`,
                held && 'is-held',
                !b && !held && 'is-dim',
                focus === id && b && 'is-focus',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <g
                  key={id}
                  className={cls}
                  tabIndex={b ? 0 : -1}
                  role={b ? 'button' : undefined}
                  aria-label={b ? `${BTN[id].name}: ${b.in.map((i) => i[1]).join(', ')}` : undefined}
                  onMouseEnter={() => b && setFocus(id)}
                  onFocus={() => b && setFocus(id)}
                  onClick={() => b && setFocus(id)}
                >
                  <Shape id={id} />
                  <Glyph id={id} />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {bind && (
        <div className={`kb__detail kb__detail--${bind.cat}`} aria-live="polite">
          <span className="kb__detail-key">
            {L.hold ? `${L.hold} + ` : ''}
            {BTN[focus].name}
          </span>
          <ul className="pad__inputs">
            {bind.in.map(([how, action, kb]) => (
              <li key={how + action}>
                {bind.in.length > 1 && <span className="pad__how">{how}</span>}
                <span className="kb__detail-act">{action}</span>
                {kb && (
                  <span className="g-note">
                    Keyboard: <kbd className="g-kbd">{kb}</kbd>
                  </span>
                )}
              </li>
            ))}
          </ul>
          {bind.note && <span className="g-note">{bind.note}</span>}
        </div>
      )}

      <div className="pad__legend">
        {KEY_CATS.map((c) => (
          <span key={c.id} className={`kb__legend--${c.id}`}>
            <span className="kb__swatch" /> {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Every layer's bindings as plain lists, for reading or searching the page.
export function GamepadLists() {
  return (
    <div className="g-keylists pad__lists">
      {PAD_LAYERS.map((l) => (
        <div key={l.id} className="g-keylist">
          <span className="g-label">{l.label}</span>
          <ul>
            {ORDER.filter((id) => PAD[l.id][id]).flatMap((id) =>
              PAD[l.id][id].in.map(([how, action]) => (
                <li key={id + action} className={`kb__legend--${PAD[l.id][id].cat}`}>
                  <kbd className="g-kbd">
                    {l.hold ? `${l.hold} + ` : ''}
                    {BTN[id].name}
                    {['Hold', 'Double tap', 'Tap'].includes(how) ? ` (${how.toLowerCase()})` : ''}
                  </kbd>
                  <span>{action}</span>
                </li>
              )),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
