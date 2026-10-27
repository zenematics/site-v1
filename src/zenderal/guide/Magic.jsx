import { useEffect, useMemo, useState } from 'react';
import { SPELL_SOURCES, SPELL_TIERS, VENDORS } from './data.js';

// Same lazy load as the Spells page; the file is shared.
const loadSpells = () => import('../../../content/zenderal/spells.json').then((m) => m.default);

const TOWNS = [...new Set(VENDORS.map((v) => v.town))];
const label = (id) => SPELL_SOURCES.find((s) => s.id === id)?.label ?? id;

const matches = (line, s) =>
  s.source === line.source &&
  (!line.tiers || line.tiers.includes(s.tier)) &&
  (!line.schools || line.schools.includes(s.school)) &&
  (!line.archetype || s.archetype === line.archetype);

// "Apocalypse · Adept · Psionics, Light Magic", "Triumvirate · Druid · Expert–Master".
function lineTitle(line) {
  const parts = [label(line.source)];
  if (line.archetype) parts.push(line.archetype);
  if (line.tiers) parts.push(line.tiers.length > 1 ? `${line.tiers[0]}–${line.tiers.at(-1)}` : line.tiers[0]);
  else if (line.source !== 'xxOpenSpells') parts.push('every tier');
  if (line.schools) parts.push(line.schools.join(', '));
  return parts.join(' · ');
}

const byTier = (a, b) => SPELL_TIERS.indexOf(a.tier) - SPELL_TIERS.indexOf(b.tier) || a.name.localeCompare(b.name);

function StockLine({ line, spells, query, open }) {
  const [shown, setShown] = useState(false);
  const all = spells.filter((s) => matches(line, s)).sort(byTier);
  const hits = query ? all.filter((s) => s.name.toLowerCase().includes(query)) : all;
  const expanded = shown || (open && hits.length > 0);
  return (
    <li className="g-stock">
      <button type="button" className="g-stock__head" aria-expanded={expanded} onClick={() => setShown(!expanded)}>
        <span>{lineTitle(line)}</span>
        <span className="g-count">
          {query ? `${hits.length} of ${all.length}` : all.length} tomes
          <span className="faq__chev" style={{ transform: `rotate(${expanded ? '-135deg' : '45deg'})` }} />
        </span>
      </button>
      {expanded && (
        <ul className="g-stock__spells">
          {(query ? hits : all).map((s) => (
            <li key={s.id} title={s.desc || s.effects.join(' · ')}>
              <span className="spells__name">{s.name}</span>
              <span className="spells__desc">
                {s.tier} · {s.school}
              </span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Magic() {
  const [spells, setSpells] = useState(null);
  const [town, setTown] = useState(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    loadSpells().then(setSpells);
  }, []);

  const query = q.trim().toLowerCase();
  const shown = useMemo(() => {
    if (!spells) return [];
    return VENDORS.filter((v) => !town || v.town === town).filter(
      (v) => !query || v.stock.some((line) => spells.some((s) => matches(line, s) && s.name.toLowerCase().includes(query))),
    );
  }, [spells, town, query]);

  // Enderal and EGO tomes are random stock, so a search for one points at the random shops instead.
  const randomHit =
    query && spells?.some((s) => (s.source === 'Enderal' || s.source === 'EGO') && s.name.toLowerCase().includes(query));

  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Every spell in Zenderal is learned from a <strong>spell tome</strong>, and every tome has a tier from Novice to
          Master. Below is every shop that sells them, by town, with what each one stocks. Search for a spell to see who
          sells it. The full list, with costs and effects, is on the <a href="#spells">Spells</a> page.
        </p>
        <ul>
          <li>
            <strong>Spell pack tomes</strong> (Apocalypse, Triumvirate, KataPUMB, Open Spells) are always in stock at
            the shops listed.
          </li>
          <li>
            <strong>Enderal and EGO tomes</strong> are random stock at the shops marked <em>Random Enderal tomes</em>,
            re-rolled every two in-game days, and also turn up in dungeon loot.
          </li>
        </ul>
      </div>

      <div className="spells__filter">
        <span className="spells__filter-name">Find a spell</span>
        <input
          type="search"
          className="spells__search"
          placeholder="Spell name, e.g. Fireball"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="spells__filter">
        <span className="spells__filter-name">Town</span>
        <div className="spells__chips">
          <button type="button" className={`chip${town ? '' : ' is-on'}`} onClick={() => setTown(null)}>
            All
          </button>
          {TOWNS.map((t) => (
            <button key={t} type="button" className={`chip${t === town ? ' is-on' : ''}`} onClick={() => setTown(t)}>
              {t}
              <span className="chip__count">{VENDORS.filter((v) => v.town === t).length}</span>
            </button>
          ))}
        </div>
      </div>

      {randomHit && (
        <p className="g-note">
          Some matches are Enderal or EGO tomes. Those are random stock: try the shops marked Random Enderal tomes, or
          dungeon loot.
        </p>
      )}

      {!spells ? (
        <p className="spells__empty">Loading spells…</p>
      ) : shown.length === 0 ? (
        <p className="spells__empty">No shop sells a spell matching “{q}”{town ? ` in ${town}` : ''}.</p>
      ) : (
        <div className="g-sets">
          {shown.map((v) => (
            <div key={`${v.name}/${v.place}`} className="g-card g-vendor">
              <div className="g-card__head">
                <h3 className="g-card__title">{v.name}</h3>
                <span className="g-card__meta">{v.place === v.town ? v.town : `${v.place}, ${v.town}`}</span>
              </div>
              {v.random && <span className="g-tag g-vendor__random">Random Enderal tomes</span>}
              {v.stock.length > 0 && (
                <ul className="g-stock__list">
                  {v.stock.map((line, i) => (
                    <StockLine key={i} line={line} spells={spells} query={query} open={Boolean(query)} />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
