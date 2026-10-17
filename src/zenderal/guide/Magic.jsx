import { useEffect, useMemo, useState } from 'react';
import { SPELL_SOURCES, SPELL_TIERS } from './data.js';

// Same lazy load as the Spells doc; the file is shared.
const loadSpells = () => import('../../../content/zenderal/spells.json').then((m) => m.default);

const SCHOOLS = ['Elementalism', 'Entropy', 'Light Magic', 'Mentalism', 'Psionics'];

// Triumvirate splits its stock: Novice–Adept tomes in one set of shops, Expert/Master in another.
const TRI_HIGH = ['Expert', 'Master'];

function Where({ source, tier }) {
  if (source.vendors) {
    return (
      <div className="g-where">
        <span className="g-label">{tier} tomes</span>
        <span>{source.vendors[tier]}</span>
      </div>
    );
  }
  if (source.archetypes) {
    const band = TRI_HIGH.includes(tier) ? 'high' : 'low';
    return (
      <div className="g-where">
        <span className="g-label">{tier} tomes, by archetype</span>
        {Object.entries(source.archetypes).map(([arch, v]) => (
          <span key={arch}>
            <strong>{arch}</strong>: {v[band]}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="g-where">
      <span className="g-label">Where to buy</span>
      <span>{source.where}</span>
    </div>
  );
}

export default function Magic() {
  const [spells, setSpells] = useState(null);
  const [sourceId, setSourceId] = useState('Apocalypse');
  const [tier, setTier] = useState('Novice');

  useEffect(() => {
    loadSpells().then(setSpells);
  }, []);

  const source = SPELL_SOURCES.find((s) => s.id === sourceId);
  const counts = useMemo(() => {
    const m = {};
    for (const s of spells ?? []) m[`${s.source}/${s.tier}`] = (m[`${s.source}/${s.tier}`] ?? 0) + 1;
    return m;
  }, [spells]);
  const total = (id) => SPELL_TIERS.reduce((n, t) => n + (counts[`${id}/${t}`] ?? 0), 0);

  const list = (spells ?? []).filter((s) => s.source === sourceId && s.tier === tier);

  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Zenderal's spellbook comes from Enderal plus four spell packs. Every spell is learned from a{' '}
          <strong>spell tome</strong>, and every tome has a tier from Novice to Master, the same tier as the perk that
          halves its cost. Pick a pack and a tier to see what it adds and where to buy it. The full searchable list is
          on the <a href="#spells">Spells</a> page.
        </p>
      </div>

      <div className="spells__filter">
        <span className="spells__filter-name">Spell pack</span>
        <div className="spells__chips">
          {SPELL_SOURCES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`chip${s.id === sourceId ? ' is-on' : ''}`}
              aria-pressed={s.id === sourceId}
              onClick={() => setSourceId(s.id)}
            >
              {s.label}
              {spells && <span className="chip__count">{total(s.id)}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="spells__filter">
        <span className="spells__filter-name">Tier</span>
        <div className="spells__chips">
          {SPELL_TIERS.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip${t === tier ? ' is-on' : ''}`}
              aria-pressed={t === tier}
              onClick={() => setTier(t)}
            >
              {t}
              {spells && <span className="chip__count">{counts[`${sourceId}/${t}`] ?? 0}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="g-card">
        <div className="g-card__head">
          <h3 className="g-card__title">{source.label}</h3>
          <span className="g-card__meta">{source.blurb}</span>
        </div>
        <Where source={source} tier={tier} />
        {source.vendors || source.archetypes ? <p className="g-note">{source.where}</p> : null}
      </div>

      {!spells ? (
        <p className="spells__empty">Loading spells…</p>
      ) : list.length === 0 ? (
        <p className="spells__empty">
          {source.label} has no {tier} spells.
        </p>
      ) : (
        <div className="g-schools">
          {SCHOOLS.map((school) => {
            const inSchool = list.filter((s) => s.school === school).sort((a, b) => a.name.localeCompare(b.name));
            if (!inSchool.length) return null;
            return (
              <div key={school} className="g-school">
                <span className="g-label">
                  {school} · {inSchool.length}
                </span>
                <ul className="g-spells">
                  {inSchool.map((s) => (
                    <li key={s.id} title={s.desc || s.effects.join(' · ')}>
                      <span className="spells__name">{s.name}</span>
                      {s.archetype && <span className="spells__desc">{s.archetype}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
