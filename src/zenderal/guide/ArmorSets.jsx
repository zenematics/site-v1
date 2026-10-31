import { useState } from 'react';
import { ARMOR_SETS } from './data.js';

const TYPES = ['Heavy', 'Light', 'Mage'];

// Each set rendered as worn (Blender with PyNifly, from the meshes and textures that win in the installed list,
// arms lowered from the bind pose); one file per set, named after it.
const ART = `${import.meta.env.BASE_URL}uploads/guide/armor/`;
const slug = (name) =>
  name
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const ROMAN = ['I', 'II', 'III', 'IV'];

function SetCard({ set }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="g-card g-set">
      <div className="g-set__art">
        <img src={`${ART}${slug(set.name)}.webp`} alt={`The ${set.name} set, worn`} loading="lazy" />
      </div>
      <div className="g-card__head">
        <h3 className="g-card__title">{set.name}</h3>
        <span className="g-card__meta">
          {set.type} · level {set.level}+ · {set.pieces.length} pieces
        </span>
      </div>

      <ol className="g-set__bonuses">
        {set.bonuses.map((b, k) => (
          <li key={b}>
            <span className="g-set__count">
              {k + 2} pieces <span className="g-set__rank">{ROMAN[k]}</span>
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ol>

      <div className="g-set__pieces">
        <span className="g-label">Pieces</span>
        <ul className="g-set__list">
          {set.pieces.map((p) => (
            <li key={p.name}>
              <span className="spells__name">{p.name}</span>
              {shown && <span className="spells__desc">{p.where.join(' · ')}</span>}
            </li>
          ))}
        </ul>
        <button type="button" className="g-reveal" aria-expanded={shown} onClick={() => setShown(!shown)}>
          {shown ? 'Hide locations' : set.crafted ? 'Show how to get them' : 'Show locations'}
        </button>
      </div>
    </div>
  );
}

export default function ArmorSets() {
  const [types, setTypes] = useState([]);
  const toggle = (t) => setTypes((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  const sets = ARMOR_SETS.filter((s) => !types.length || types.includes(s.type));

  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Enderal's named armor sets carry a <strong>set bonus</strong> on top of their normal enchantments. Wear two
          pieces of the same set and the first bonus switches on; each extra piece adds the next one, up to four (five
          for Selna's Legacy and Inodan's Vestment). Bonuses stack, so a full set has all of them. Mixing sets is fine:
          two pieces each of two sets gives both first-tier bonuses.
        </p>
        <p>
          Every set below exists in Zenderal. The level is the set's tier, roughly when it starts turning up. Most
          pieces have a fixed spot in the world, often several, and unique enemies wear some of them too. The level-50
          sets are crafted from blueprints. Locations are hidden until you ask, so nothing gets spoiled.
        </p>
      </div>

      <div className="spells__filter">
        <span className="spells__filter-name">Armor type</span>
        <div className="spells__chips">
          <button type="button" className={`chip${types.length ? '' : ' is-on'}`} onClick={() => setTypes([])}>
            All
          </button>
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip${types.includes(t) ? ' is-on' : ''}`}
              aria-pressed={types.includes(t)}
              onClick={() => toggle(t)}
            >
              {t}
              <span className="chip__count">{ARMOR_SETS.filter((s) => s.type === t).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="g-sets">
        {sets.map((s) => (
          <SetCard key={s.name} set={s} />
        ))}
      </div>
    </div>
  );
}
