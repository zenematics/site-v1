import { useState } from 'react';
import { BASE, RACES } from './data.js';

const PORTRAITS = `${import.meta.env.BASE_URL}uploads/zenderal/races/`;

const POOLS = [
  { key: 'health', label: 'Health', color: '#c25b4e' },
  { key: 'mana', label: 'Mana', color: '#5b84c4' },
  { key: 'stamina', label: 'Stamina', color: '#6fa35c' },
];

// A race's starting pool in its three parts: the race's own value, the base every character gets, and the part of
// the cultural bonus that adds to it.
const parts = (r, key) => [r.start[key], BASE[key], r.bonus.pools?.[key] ?? 0];
const total = (r, key) => parts(r, key).reduce((a, b) => a + b, 0);

// Bars are scaled against the largest value any race has, so they compare across races.
const max = (group, key) => Math.max(...RACES.map((r) => r[group][key]));
const maxTotal = (key) => Math.max(...RACES.map((r) => total(r, key)));

// Race, base and bonus as shades of the pool's colour.
const SHADES = [1, 0.4, 0.7];
const SEGMENTS = ['Race', 'Base', 'Cultural bonus'];

function StackBar({ values, of, color }) {
  return (
    <span className="g-bar">
      <span className="g-bar__track g-bar__track--stack">
        {values.map(
          (v, i) =>
            v > 0 && (
              <span
                key={i}
                className="g-bar__fill"
                title={`${SEGMENTS[i]} ${v}`}
                style={{ width: `${(v / of) * 100}%`, background: color, opacity: SHADES[i] }}
              />
            ),
        )}
      </span>
      <span className="g-bar__value">{values.reduce((a, b) => a + b, 0)}</span>
    </span>
  );
}

function Bar({ value, of, color, unit = '' }) {
  return (
    <span className="g-bar">
      <span className="g-bar__track">
        <span className="g-bar__fill" style={{ width: `${(value / of) * 100}%`, background: color }} />
      </span>
      <span className="g-bar__value">
        {value}
        {unit}
      </span>
    </span>
  );
}

export default function Races() {
  const [id, setId] = useState(RACES[0].id);
  const race = RACES.find((r) => r.id === id);

  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Zenderal has five playable cultures. Each one sets your starting Health, Mana and Stamina, how fast they
          refill, and a small <strong>cultural bonus</strong> to a few skills. The numbers come from EGO's Dark Souls
          movement and stamina races, so stamina pools and regen are much larger than in vanilla Enderal.
        </p>
        <p>Your starting Health, Mana and Stamina add up from three parts:</p>
        <ul>
          <li>
            <strong>Base attributes</strong> that every character gets, whatever their race.
          </li>
          <li>
            Your <strong>race's</strong> own starting values.
          </li>
          <li>
            Your <strong>cultural bonus</strong>, for the three races whose bonus adds to one of them.
          </li>
        </ul>
        <h2>Base attributes</h2>
      </div>

      <div className="g-base">
        {POOLS.map((p) => (
          <div key={p.key} className="g-base__item" style={{ borderTopColor: p.color }}>
            <span className="g-base__value">+{BASE[p.key]}</span>
            <span className="g-base__name">{p.label}</span>
          </div>
        ))}
        <div className="g-base__item" style={{ borderTopColor: '#c9ab76' }}>
          <span className="g-base__value">{BASE.skill}</span>
          <span className="g-base__name">Every skill</span>
        </div>
      </div>
      <p className="g-note">
        Every character gets these on top of their race. All skills start at {BASE.skill}, and your cultural bonus
        raises a few of them from there.
      </p>

      <div className="md">
        <h2>Racial bonuses</h2>
      </div>

      <div className="spells__chips" role="tablist" aria-label="Race">
        {RACES.map((r) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            aria-selected={r.id === id}
            className={`chip${r.id === id ? ' is-on' : ''}`}
            onClick={() => setId(r.id)}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="g-card">
        <img key={race.id} src={`${PORTRAITS}${race.id}.webp`} alt={race.name} className="g-race__art" />
        <div className="g-card__head">
          <h3 className="g-card__title">{race.name}</h3>
          <span className="g-card__meta">{race.origin}</span>
        </div>
        <p className="g-flavor">{race.flavor}</p>
        <p className="g-card__role">{race.role}</p>

        <div className="g-bonus">
          <span className="g-label">Cultural bonus · {race.bonus.name}</span>
          <span>{race.bonus.text}</span>
        </div>

        <div className="g-stats">
          <div className="g-stats__col">
            <span className="g-label">Starting attributes</span>
            {POOLS.map((p) => (
              <div key={p.key} className="g-stat">
                <span className="g-stat__name">{p.label}</span>
                <StackBar values={parts(race, p.key)} of={maxTotal(p.key)} color={p.color} />
              </div>
            ))}
            <span className="g-stat__split">
              {POOLS.map((p) => {
                const [r, b, x] = parts(race, p.key);
                return (
                  <span key={p.key}>
                    {p.label}: {r} race + {b} base{x ? ` + ${x} bonus` : ''}
                  </span>
                );
              })}
            </span>
          </div>
          <div className="g-stats__col">
            <span className="g-label">Regeneration (% of max per second)</span>
            {POOLS.map((p) => (
              <div key={p.key} className="g-stat">
                <span className="g-stat__name">{p.label}</span>
                <Bar value={race.regen[p.key]} of={max('regen', p.key)} color={p.color} unit="%" />
              </div>
            ))}
          </div>
        </div>
        <p className="g-note">
          Carry weight {race.carry}. Bars are relative to the highest value among the five races. In the starting
          bars, the bright part is the race, the dim part the base and the middle shade the cultural bonus.
        </p>
      </div>

      <div className="md">
        <h2>All races at a glance</h2>
        <p>Starting Health, Mana and Stamina, with the base attributes and cultural bonuses included.</p>
        <div className="spells__scroll">
          <table className="spells__table g-table">
            <thead>
              <tr>
                <th>Race</th>
                <th>Health</th>
                <th>Mana</th>
                <th>Stamina</th>
                <th>Regen H / M / S</th>
              </tr>
            </thead>
            <tbody>
              {RACES.map((r) => (
                <tr key={r.id}>
                  <td>
                    <span className="spells__name">{r.name}</span>
                    <span className="spells__desc">{r.bonus.text}</span>
                  </td>
                  {POOLS.map((p) => (
                    <td key={p.key} className="spells__num">
                      {total(r, p.key)}
                    </td>
                  ))}
                  <td className="spells__num">
                    {r.regen.health} / {r.regen.mana} / {r.regen.stamina}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <blockquote>
          <p>
            <strong>Regen in combat</strong>
            EGO lets stamina regenerate at its full rate in combat and mana at 80%, so a race's regen numbers matter
            mid-fight, not just between fights.
          </p>
        </blockquote>
      </div>
    </div>
  );
}
