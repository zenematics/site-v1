import { useEffect, useMemo, useState } from 'react';

// Regenerate with `node scripts/import-spells.mjs`. Loaded on demand so the
// other docs don't pay for it.
const loadSpells = () => import('../../content/zenderal/spells.json').then((m) => m.default);

const SOURCE_ORDER = ['Enderal', 'EGO', 'Apocalypse', 'Triumvirate', 'KataPUMB Spell Pack'];
const SCHOOL_ORDER = ['Elementalism', 'Entropy', 'Light Magic', 'Mentalism', 'Psionics'];

const CAST = { FireAndForget: 'Fire and forget', Concentration: 'Concentration', ConstantEffect: 'Constant' };
const TARGET = { TargetActor: 'Target', TargetLocation: 'Location' };

const COLUMNS = [
  { key: 'name', label: 'Spell' },
  { key: 'school', label: 'School' },
  { key: 'source', label: 'Source' },
  { key: 'cost', label: 'Cost' },
  { key: 'cast', label: 'Casting' },
];

// Known sources/schools first in a fixed order, anything else after, alphabetically.
function ordered(values, order) {
  const rank = (v) => (order.includes(v) ? order.indexOf(v) : order.length);
  return [...new Set(values)].filter(Boolean).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
}

// Toggle chips; an empty selection means "all".
function Chips({ label, options, selected, onChange, counts }) {
  const toggle = (v) => onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);
  return (
    <div className="spells__filter">
      <span className="spells__filter-name">{label}</span>
      <div className="spells__chips">
        <button type="button" className={`chip${selected.length ? '' : ' is-on'}`} onClick={() => onChange([])}>
          All
        </button>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={`chip${selected.includes(o) ? ' is-on' : ''}`}
            aria-pressed={selected.includes(o)}
            onClick={() => toggle(o)}
          >
            {o}
            <span className="chip__count">{counts[o] ?? 0}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Spells() {
  const [spells, setSpells] = useState(null);
  const [query, setQuery] = useState('');
  const [sources, setSources] = useState([]);
  const [schools, setSchools] = useState([]);
  const [sort, setSort] = useState({ key: 'name', dir: 1 });

  useEffect(() => {
    loadSpells().then(setSpells);
  }, []);

  const sourceOptions = useMemo(() => ordered(spells?.map((s) => s.source) ?? [], SOURCE_ORDER), [spells]);
  const schoolOptions = useMemo(() => ordered(spells?.map((s) => s.school) ?? [], SCHOOL_ORDER), [spells]);

  const q = query.trim().toLowerCase();
  const matchesQuery = (s) =>
    !q || s.name.toLowerCase().includes(q) || s.effects.some((e) => e.toLowerCase().includes(q)) || s.desc?.toLowerCase().includes(q);

  // Each filter's counts reflect the other filters, so the numbers say what you'd get by picking it.
  const count = (list, key) => list.reduce((m, s) => ((m[s[key]] = (m[s[key]] ?? 0) + 1), m), {});
  const bySearch = (spells ?? []).filter(matchesQuery);
  const sourceCounts = count(bySearch.filter((s) => !schools.length || schools.includes(s.school)), 'source');
  const schoolCounts = count(bySearch.filter((s) => !sources.length || sources.includes(s.source)), 'school');

  const rows = bySearch
    .filter((s) => (!sources.length || sources.includes(s.source)) && (!schools.length || schools.includes(s.school)))
    .sort((a, b) => {
      const x = a[sort.key];
      const y = b[sort.key];
      const d = typeof x === 'number' ? x - y : String(x).localeCompare(String(y));
      return d * sort.dir || a.name.localeCompare(b.name);
    });

  const sortBy = (key) => setSort((s) => ({ key, dir: s.key === key ? -s.dir : 1 }));

  if (!spells) return <p className="spells__empty">Loading spells…</p>;

  return (
    <div className="spells">
      <p className="spells__intro">
        Every spell you can learn from a spell tome in Zenderal, and which mod it comes from. Costs are base costs,
        before perks and skill.
      </p>

      <div className="spells__filters">
        <input
          type="search"
          className="spells__search"
          placeholder="Search spells or effects"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Chips label="Source" options={sourceOptions} selected={sources} onChange={setSources} counts={sourceCounts} />
        <Chips label="School" options={schoolOptions} selected={schools} onChange={setSchools} counts={schoolCounts} />
      </div>

      <p className="spells__count">
        {rows.length} of {spells.length} spells
      </p>

      <div className="spells__scroll">
        <table className="spells__table">
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c.key} aria-sort={sort.key === c.key ? (sort.dir > 0 ? 'ascending' : 'descending') : undefined}>
                  <button type="button" onClick={() => sortBy(c.key)}>
                    {c.label}
                    <span className="spells__arrow">{sort.key === c.key ? (sort.dir > 0 ? '↑' : '↓') : ''}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>
                  <span className="spells__name">{s.name}</span>
                  {s.desc ? (
                    <span className="spells__desc">{s.desc}</span>
                  ) : (
                    s.effects.length > 0 && <span className="spells__desc">{s.effects.join(' · ')}</span>
                  )}
                </td>
                <td>{s.school || '—'}</td>
                <td title={s.plugin}>{s.source}</td>
                <td className="spells__num">{s.cost}</td>
                <td>
                  {CAST[s.cast] ?? s.cast}
                  <span className="spells__desc">{TARGET[s.target] ?? s.target}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="spells__empty">No spells match those filters.</p>}
      </div>
    </div>
  );
}
