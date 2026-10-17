import { useState } from 'react';
import { AFFINITIES, AFFINITY_SOURCES, TREES } from './data.js';

// One affinity: the header shows the trees it needs, the body opens with what it does.
function Affinity({ a, open, onToggle }) {
  return (
    <div className="faq__item">
      <button type="button" className="faq__q" aria-expanded={open} onClick={onToggle}>
        <span className="g-aff__head">
          <span>{a.name}</span>
          <span className="g-aff__req">
            {a.main} + {a.any.join(' / ')}
          </span>
        </span>
        <span className="faq__chev" style={{ transform: `rotate(${open ? '-135deg' : '45deg'})` }} />
      </button>
      <div className="faq__a" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div>
          <div className="g-aff__body">
            <p>{a.effect}</p>
            <p className="g-note">
              Needs 10 points in <strong>{a.main}</strong> and 10 in{' '}
              {a.any.length > 1 ? 'any one of ' : ''}
              <strong>{a.any.join(', ')}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Affinities() {
  const [picked, setPicked] = useState([]);
  const [open, setOpen] = useState(null);

  // Up to two trees, in either order: one tree lists every affinity it's part of,
  // two answer "what does Keeper + Vandal give me?".
  const toggle = (t) =>
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t].slice(-2)));

  const uses = (a, t) => a.main === t || a.any.includes(t);
  const matches = (a) => {
    if (picked.length === 0) return true;
    if (picked.length === 1) return uses(a, picked[0]);
    const [x, y] = picked;
    return (a.main === x && a.any.includes(y)) || (a.main === y && a.any.includes(x));
  };

  return (
    <div className="g-stack">
      <div className="md">
        <h2>What are they?</h2>
        <p>
          An affinity is a hybrid class. Once you've invested in two memory trees that fit together, Enderal turns you
          into something between them, a Battlemage or a Ghostblade, and grants a permanent ability: skill and attribute
          bonuses plus a unique effect, often tied to a talent from one of the two trees. Your class name in the Hero
          Menu changes to match.
        </p>
        <h2>How to get one</h2>
        <ul>
          <li>
            Spend at least <strong>10 memory points in the affinity's main tree</strong> and at least{' '}
            <strong>10 in one of its partner trees</strong>, counted from the perks you've bought in each.
          </li>
          <li>It unlocks the moment you buy the perk that crosses the line. Nothing to find or read.</li>
          <li>
            You can only have one active. If your trees qualify for more than one, the game asks you to choose. Zenderal
            includes KataPUMB New Affinities, so most tree pairs have an option.
          </li>
        </ul>
      </div>

      <div className="spells__filter">
        <span className="spells__filter-name">Your trees (pick up to two)</span>
        <div className="spells__chips">
          <button type="button" className={`chip${picked.length ? '' : ' is-on'}`} onClick={() => setPicked([])}>
            All
          </button>
          {TREES.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip${picked.includes(t) ? ' is-on' : ''}`}
              aria-pressed={picked.includes(t)}
              onClick={() => toggle(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {AFFINITY_SOURCES.map((src) => {
        const list = AFFINITIES.filter((a) => a.source === src.id && matches(a));
        if (!list.length) return null;
        return (
          <div key={src.id} className="g-stack g-stack--tight">
            <h3 className="doc-h3">
              {src.label} <span className="g-count">{list.length}</span>
            </h3>
            <div className="faq">
              {list.map((a) => (
                <Affinity
                  key={a.name}
                  a={a}
                  open={open === a.name}
                  onToggle={() => setOpen(open === a.name ? null : a.name)}
                />
              ))}
            </div>
          </div>
        );
      })}
      {AFFINITY_SOURCES.every((src) => !AFFINITIES.some((a) => a.source === src.id && matches(a))) && (
        <p className="spells__empty">No affinity pairs those two trees.</p>
      )}
    </div>
  );
}
