import { useState } from 'react';
import { RACES } from './data.js';

const POOLS = [
  { key: 'health', label: 'Health', color: '#c25b4e' },
  { key: 'mana', label: 'Mana', color: '#5b84c4' },
  { key: 'stamina', label: 'Stamina', color: '#6fa35c' },
];

// Bars are scaled against the largest value any race has, so they compare across races.
const max = (group, key) => Math.max(...RACES.map((r) => r[group][key]));

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
                <Bar value={race.start[p.key]} of={max('start', p.key)} color={p.color} />
              </div>
            ))}
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
        <p className="g-note">Carry weight {race.carry}. Bars are relative to the highest value among the five races.</p>
      </div>

      <div className="md">
        <h2>All races at a glance</h2>
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
                  <td className="spells__num">{r.start.health}</td>
                  <td className="spells__num">{r.start.mana}</td>
                  <td className="spells__num">{r.start.stamina}</td>
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
