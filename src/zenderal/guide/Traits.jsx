import { TRAITS } from './data.js';

const ART = `${import.meta.env.BASE_URL}uploads/guide/traits/`;

const GROUPS = [
  { source: 'zenderal', title: 'Zenderal traits', note: "Made for Zenderal, around Enderal's own schools, places and enemies." },
  { source: 'zen', title: 'Zen Traits', note: 'From the Zen Traits mod, mostly built around Arcane Fever.' },
];

function Trait({ t }) {
  return (
    <div className="g-card g-trait">
      <img className="g-trait__art" src={`${ART}${t.img}`} alt="" loading="lazy" />
      <div className="g-trait__body">
        <h3 className="g-card__title">{t.name}</h3>
        <p className="g-trait__up">
          <span className="g-trait__sign">+</span>
          {t.up}
        </p>
        <p className="g-trait__down">
          <span className="g-trait__sign">−</span>
          {t.down}
        </p>
      </div>
    </div>
  );
}

export default function Traits() {
  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Traits shape your character from the start. Each one gives you an upside and a downside, and the downside
          works against the trait's own playstyle, so a trait is a commitment rather than a free bonus.
        </p>
        <h2>Choosing traits</h2>
        <ul>
          <li>
            Use the <strong>Select Traits</strong> power to open the trait menu and pick <strong>up to two</strong>.
            It's a one-time choice.
          </li>
          <li>
            An <strong>Elixir of Hidden Potential</strong> lets you choose one more trait later in the game.
          </li>
          <li>You can also pick none and play without traits.</li>
        </ul>
      </div>

      {GROUPS.map((g) => (
        <div key={g.source} className="g-stack g-stack--tight">
          <span className="g-label">{g.title}</span>
          <p className="g-note">{g.note}</p>
          <div className="g-traits">
            {TRAITS.filter((t) => t.source === g.source).map((t) => (
              <Trait key={t.name} t={t} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
