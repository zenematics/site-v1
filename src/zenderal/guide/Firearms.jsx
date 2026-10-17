import { useState } from 'react';
import { AMMO, MUSKETS, PISTOLS } from './data.js';

// Flintlock Overhaul's hidden perk: ×0.5·(1 + Archery × 0.02), before Fortify Archery and bow talents.
const pistolMult = (archery) => 0.5 * (1 + archery * 0.02);
const fmt = (n) => (Math.round(n * 10) / 10).toString();

function Recipes({ list }) {
  const craftable = list.filter((w) => w.recipe);
  return (
    <div className="spells__scroll">
      <table className="spells__table g-table">
        <thead>
          <tr>
            <th>Weapon</th>
            <th>Handicraft</th>
          </tr>
        </thead>
        <tbody>
          {craftable.map((w) => (
            <tr key={w.name}>
              <td>
                <span className="spells__name">{w.name}</span>
                <span className="g-table__text">{w.recipe}</span>
              </td>
              <td className="spells__num">{w.skill}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Firearms() {
  const [archery, setArchery] = useState(50);
  const mult = pistolMult(archery);

  return (
    <div className="g-stack">
      <div className="md">
        <h2>Why Zenderal has them</h2>
        <p>
          To make Enderal more distinct, Zen has chosen to include basic firearms, to further reinforce that you are not
          playing Skyrim, but something set in its own time period and world. In Enderal lore, civilizations reach a
          certain point in technology and are wiped out by something. Firearms technology exists and has done before.
          Zenderal just makes that playable.
        </p>
        <p>
          Two mods supply them: <strong>Ordo Legionis</strong> adds muskets and <strong>A Gentleman's Flintlock
          Armoury</strong> adds pistols. Zenderal's own Flintlock Overhaul ties both into Enderal's balance, ammo, loot
          and animations.
        </p>
      </div>

      <div className="g-compare">
        <div className="g-card">
          <h3 className="g-card__title">Pistols</h3>
          <ul className="g-list">
            <li>One-handed, either hand. Pair one with a sword, a spell or a second pistol.</li>
            <li>One shot, then an automatic 2-second reload that uses a <strong>Flintlock Bullet</strong>.</li>
            <li>
              The shot is a spell, so bow talents don't touch it directly. The Flintlock Overhaul scales it with
              Archery and the main bow bonuses instead.
            </li>
            <li>Equipping loads a bullet; unequipping gives it back.</li>
          </ul>
        </div>
        <div className="g-card">
          <h3 className="g-card__title">Muskets</h3>
          <ul className="g-list">
            <li>Two-handed, aimed and reloaded like a crossbow.</li>
            <li>
              Damage is the musket's plus the ball's, and every bow talent and Archery bonus applies, just as with a
              bow.
            </li>
            <li>Any musket ammo fits any musket.</li>
            <li>
              <strong>Silver Musket Balls</strong> get EGO's silver-arrow bonuses: huge damage to ghosts, extra
              damage to undead.
            </li>
          </ul>
        </div>
      </div>

      <div className="md">
        <h2>How damage scales</h2>
        <p>
          A pistol shot deals its base damage × 0.5 × (1 + Archery × 0.02): half at Archery 0, full at 50, 1.5× at
          100. Fortify Archery gear, Strong Bowstring and EGO's other bow bonuses multiply on top. A musket's damage is
          bow damage, so it grows the same way a bow does.
        </p>
      </div>

      <div className="g-card">
        <label className="g-slider">
          <span className="g-label">Archery {archery}</span>
          <input type="range" min="0" max="100" value={archery} onChange={(e) => setArchery(+e.target.value)} />
          <span className="g-note">Pistol shots × {fmt(mult)}</span>
        </label>
        <div className="spells__scroll">
          <table className="spells__table g-table">
            <thead>
              <tr>
                <th>Pistol</th>
                <th>Base</th>
                <th>At Archery {archery}</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {PISTOLS.map((p) => (
                <tr key={p.name}>
                  <td>
                    <span className="spells__name">{p.name}</span>
                    {!p.recipe && <span className="spells__desc">Found, not crafted</span>}
                  </td>
                  <td className="spells__num">{fmt(p.shot)}</td>
                  <td className="spells__num g-strong">{fmt(p.shot * mult)}</td>
                  <td className="spells__num">{p.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md">
        <h2>Muskets</h2>
        <div className="spells__scroll">
          <table className="spells__table g-table">
            <thead>
              <tr>
                <th>Musket</th>
                <th>Damage</th>
                <th>Weight</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {MUSKETS.map((m) => (
                <tr key={m.name}>
                  <td>
                    <span className="spells__name">{m.name}</span>
                    {!m.recipe && <span className="spells__desc">Found, not crafted</span>}
                  </td>
                  <td className="spells__num">{m.damage}</td>
                  <td className="spells__num">{m.weight}</td>
                  <td className="spells__num">{m.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md">
        <h2>Crafting recipes</h2>
        <p>Everything is made at a forge. Pistols also need their blueprint in your inventory.</p>
        <h3>Pistols</h3>
        <Recipes list={PISTOLS} />
        <h3>Muskets</h3>
        <Recipes list={MUSKETS} />
        <h3>Ammunition</h3>
        <div className="spells__scroll">
          <table className="spells__table g-table">
            <thead>
              <tr>
                <th>Ammo</th>
                <th>For</th>
                <th>Damage</th>
                <th>Makes</th>
              </tr>
            </thead>
            <tbody>
              {AMMO.map((a) => (
                <tr key={a.name}>
                  <td>
                    <span className="spells__name">{a.name}</span>
                    <span className="g-table__text">{a.recipe}</span>
                  </td>
                  <td>{a.use}</td>
                  <td className="spells__num">{a.damage}</td>
                  <td className="spells__num">{a.makes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="g-note">Ammo also turns up in Enderal's loot chests, and gun-carrying enemies drop theirs.</p>
      </div>
    </div>
  );
}
