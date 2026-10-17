import { FHR_ARROWS, FHR_COMBOS, FHR_MOVES, FHR_STATUS } from './data.js';

function Icon({ item }) {
  return (
    <div className="g-icon">
      <img src={item.icon} alt="" className="g-icon__img" width="48" height="48" loading="lazy" />
      <div className="g-icon__text">
        <span className="g-icon__name">{item.name}</span>
        <span>{item.text}</span>
      </div>
    </div>
  );
}

export default function Combat() {
  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Melee in Zenderal runs on <strong>For Honor Reforged</strong>: timing, positioning and poise instead of
          button mashing. Every attack has a job. Light attacks keep pressure on, side attacks control poise, the back
          attacks are your parry and guard break, and knockdowns open follow-ups. Keep the enemy's{' '}
          <strong>poise bar</strong> under their health bar in view: emptying it is how you win trades.
        </p>
        <blockquote>
          <p>
            <strong>In-game help</strong>
            The mod's own help pages are in the game's Help menu under <em>Advanced Combat</em>, with the same icons.
          </p>
        </blockquote>
      </div>

      <div className="md">
        <h2>What the icons mean</h2>
        <p>
          The arrows show an enemy's <strong>empowered attacks</strong>. Enemies randomly charge a left or right, light
          or heavy buff as they fight. While it's up they hit harder and take less damage, and they're more likely to
          use that attack. Throw the same attack back at them to strip it before they cash it in. Let an enemy collect
          all four and they get a large damage boost.
        </p>
      </div>
      <div className="g-icons">
        <div className="g-icon g-icon--pair">
          <img src={FHR_ARROWS[0].icon} alt="" className="g-icon__img" width="48" height="48" />
          <img src={FHR_ARROWS[0].icon.replace('left', 'right')} alt="" className="g-icon__img" width="48" height="48" />
          <div className="g-icon__text">
            <span className="g-icon__name">Left / right</span>
            <span>The arrow's side is the side the empowered attack comes from. Colour says which attack.</span>
          </div>
        </div>
        {FHR_ARROWS.map((a) => (
          <Icon key={a.name} item={a} />
        ))}
      </div>

      <div className="md">
        <p>The other icons are knockdown states and cooldowns on the target:</p>
      </div>
      <div className="g-icons">
        {FHR_STATUS.map((s) => (
          <Icon key={s.name} item={s} />
        ))}
      </div>

      <div className="md">
        <h2>Types of attack</h2>
        <p>
          Directions are your movement keys while you attack. In Zenderal the directional moves work without lock-on;
          follow-ups need it.
        </p>
        <div className="spells__scroll">
          <table className="spells__table g-table">
            <thead>
              <tr>
                <th>Input</th>
                <th>Move</th>
              </tr>
            </thead>
            <tbody>
              {FHR_MOVES.map((m) => (
                <tr key={m.move}>
                  <td className="g-table__key">{m.input}</td>
                  <td>
                    <span className="spells__name">{m.move}</span>
                    <span className="g-table__text">{m.text}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="g-note">
          Zenderal raises the parry's poise damage (60 with a weapon, 40 with a shield) so a clean parry can actually
          break a human's poise.
        </p>
      </div>

      <div className="md">
        <h2>Combos</h2>
        <p>Every move cancels into every other, so these are loops to build fights around, not fixed strings.</p>
      </div>
      <div className="g-combos">
        {FHR_COMBOS.map((c) => (
          <div key={c.name} className="g-combo">
            <span className="g-combo__name">{c.name}</span>
            <ol className="g-combo__steps">
              {c.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
