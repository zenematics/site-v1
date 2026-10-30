import { useState } from 'react';
import { KEYBOARD, KEYS, KEY_CATS, NAV_CLUSTER, NUMPAD } from './data.js';
import Mouse from './Mouse.jsx';

// A row of keys; widths are in key units (--u), so the whole board scales with its container.
function Row({ row, focus, setFocus, cat }) {
  return (
    <div className="kb__row">
      {row.map(([label, w, id], k) => {
        if (!label) return <span key={k} className="kb__gap" style={{ '--w': w }} />;
        const key = id ?? label;
        const bind = KEYS[key];
        const dim = cat && bind?.cat !== cat;
        return (
          <button
            key={k}
            type="button"
            className={`kb__key${bind ? ` kb__key--${bind.cat}` : ''}${focus === key ? ' is-focus' : ''}${dim ? ' is-dim' : ''}`}
            style={{ '--w': w }}
            disabled={!bind}
            aria-label={bind ? `${label}: ${bind.action}` : label}
            onMouseEnter={() => bind && setFocus(key)}
            onFocus={() => bind && setFocus(key)}
            onClick={() => bind && setFocus(key)}
          >
            <span className="kb__cap">{label}</span>
            {bind && <span className="kb__act">{bind.action}</span>}
          </button>
        );
      })}
    </div>
  );
}

const LABEL = { LShift: 'Left Shift', LCtrl: 'Left Ctrl', LAlt: 'Left Alt', CapsLock: 'Caps Lock', Arrows: 'Arrow keys', Ins: 'Insert' };

export default function Keybinds() {
  const [focus, setFocus] = useState('LAlt');
  const [cat, setCat] = useState(null);
  const bind = KEYS[focus];

  const list = (c) =>
    Object.entries(KEYS)
      .filter(([, b]) => b.cat === c)
      .map(([k, b]) => ({ key: LABEL[k] ?? k, ...b }));

  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Zenderal's default keyboard and mouse layout. It's built around For Honor Reforged: power attack and parry
          live on the side mouse buttons, lock-on on the middle button, and dodge on Left Alt or a tap of Left Shift, with jump on Space.
          Hover or tap a key to see what it does.
        </p>
      </div>

      <div className="spells__chips" aria-label="Highlight a category">
        <button type="button" className={`chip${cat ? '' : ' is-on'}`} onClick={() => setCat(null)}>
          All
        </button>
        {KEY_CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`chip kb__legend kb__legend--${c.id}${cat === c.id ? ' is-on' : ''}`}
            aria-pressed={cat === c.id}
            onClick={() => setCat(cat === c.id ? null : c.id)}
          >
            <span className="kb__swatch" />
            {c.label}
          </button>
        ))}
      </div>

      <div className="kb__scroll">
        <div className="kb" role="group" aria-label="Keyboard layout">
          <div className="kb__main">
            {KEYBOARD.map((row, r) => (
              <Row key={r} row={row} focus={focus} setFocus={setFocus} cat={cat} />
            ))}
          </div>
          <div className="kb__nav">
            {NAV_CLUSTER.map((row, r) => (
              <Row key={r} row={row} focus={focus} setFocus={setFocus} cat={cat} />
            ))}
          </div>
          <div className="kb__nav">
            {NUMPAD.map((row, r) => (
              <Row key={r} row={row} focus={focus} setFocus={setFocus} cat={cat} />
            ))}
          </div>
        </div>
      </div>

      <div className={`kb__detail kb__detail--${bind.cat}`} aria-live="polite">
        <span className="kb__detail-key">{LABEL[focus] ?? focus}</span>
        <span className="kb__detail-act">{bind.action}</span>
        {bind.note && <span className="g-note">{bind.note}</span>}
      </div>

      <div className="md">
        <h2>Mouse</h2>
      </div>
      <Mouse cat={cat} />

      <div className="md">
        <h2>Every binding</h2>
      </div>
      <div className="g-keylists">
        {KEY_CATS.map((c) => (
          <div key={c.id} className={`g-keylist kb__legend--${c.id}`}>
            <span className="g-label">
              <span className="kb__swatch" /> {c.label}
            </span>
            <ul>
              {list(c.id).map((b) => (
                <li key={b.key + b.action}>
                  <kbd className="g-kbd">{b.key}</kbd>
                  <span>{b.action}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="md">
        <blockquote>
          <p>
            <strong>Changing keys</strong>
            Rebind the vanilla controls in the game's own Controls menu. Mod hotkeys live in each mod's MCM page. For
            dodge and dual-wield parry, enable the <strong>Custom Keybinds</strong> mod in Mod Organizer 2: it holds
            those config files with instructions at the top. Using a controller? See{' '}
            <a href={`${import.meta.env.BASE_URL}zenderal/guide/controller/`}>Controller Support</a>.
          </p>
        </blockquote>
      </div>
    </div>
  );
}
