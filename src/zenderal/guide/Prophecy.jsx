import { useState } from 'react';
import { PROPHECY_TREES } from './prophecy.js';
import ProphecyMap from './ProphecyMap.jsx';

const ART = `${import.meta.env.BASE_URL}uploads/guide/prophecy/`;
const TALENTS = PROPHECY_TREES.reduce((sum, t) => sum + t.nodes.length, 0);

// A Prophecy resource bar as the HUD draws it: Oxygen Meter 2's bar in the colours of ZenProphecyRage.json /
// ZenProphecyDarkness.json, filling from the left. It loops filling up and flashing at full
// (still at `value` with reduced motion).
function Meter({ name, bar, flash, value, max, note }) {
  return (
    <figure className="g-meter" style={{ '--bar': bar, '--flash': flash, '--fill': value / max }}>
      <div className="g-meter__frame">
        <span className="g-meter__fill" />
      </div>
      <figcaption>
        <strong style={{ color: flash }}>{name}</strong> {note}
      </figcaption>
    </figure>
  );
}

// The trees that run on a bar of their own: how it fills and what spends it, shown under the tree's banner.
const GAUGES = {
  rage: (
    <div className="md">
      <h3>
        <span className="g-gauge" style={{ background: '#e8400c' }} /> The Rage bar
      </h3>
      <p>Rage runs on a resource of its own, shown as a bar at the bottom of the screen while you have any.</p>
      <Meter name="Rage" bar="#e8400c" flash="#ff2a00" value={7} max={10} note="fills as you fight and flashes when Vehemence starts" />
      <ul>
        <li>
          <strong>Bloodied Fury</strong>, the tree's root, starts it. Every melee hit you land and every weapon hit you
          take adds a stack, up to <strong>10</strong>. Each stack makes your attacks 2% stronger.
        </li>
        <li>
          The orange-red bar sits between the compass and the health bar. After 6 seconds without a hit it fades by
          one stack every 3 seconds, and it empties when combat ends.
        </li>
        <li>
          The other talents spend it on power attacks, picked by the direction you attack in:
          <ul>
            <li>
              <strong>Sprinting:</strong> Heavenfall (8 Rage).
            </li>
            <li>
              <strong>Standing still:</strong> Shadowbringer (8 Rage).
            </li>
            <li>
              <strong>Forward:</strong> Shadow Carve (6 Rage).
            </li>
            <li>
              <strong>Back:</strong> Dark Deluge (6 Rage).
            </li>
            <li>
              <strong>Sideways:</strong> Bloodletter and Soulrender (6 Rage). With both, one hit does both for one
              cost.
            </li>
          </ul>
        </li>
        <li>
          A full bar buys one big action, so build it up before you spend. <strong>Untempered</strong> raises the cap
          to 15 and halves the fade.
        </li>
        <li>
          <strong>Vehemence</strong>, the capstone: when Rage hits its peak the bar flashes and for 15 seconds your
          power attacks cost no Stamina and their actions cost no Rage. Then the bar empties.
        </li>
      </ul>
    </div>
  ),
  shadow: (
    <div className="md">
      <h3>
        <span className="g-gauge" style={{ background: '#6b48c8' }} /> The Darkness bar
      </h3>
      <p>
        Shadow runs on a resource of its own, shown as a bar at the bottom of the screen while you have any.
      </p>
      <Meter name="Darkness" bar="#4e5180" flash="#6b48c8" value={4} max={10} note="fills in shadow and drains in light" />
      <ul>
        <li>
          <strong>Gather Shadows</strong>, the tree's root, starts it. Darkness builds while you stand in shadow, up
          to <strong>10</strong>, and the darker it is, the faster: a point a second in deep darkness, one every 3
          seconds in dim light. In bright light it drains a point every 4 seconds.
        </li>
        <li>
          Use the sneak eye as a guide: the less it's open, the faster you gather. <strong>Shade Veil</strong> doubles
          the rate while you sneak.
        </li>
        <li>
          The purple bar sits just below the Rage bar's spot, under your Stamina and Mana.
        </li>
        <li>
          Shadow spells cost Darkness <strong>instead of Mana</strong>: Darkness 2, Gather Shadows and Pull Through
          Shadows 3, Draining Shroud and Nightblade 4. Without enough, the cast fails with "Not enough Darkness."
        </li>
        <li>
          <strong>Nightblade</strong>'s dashes spend half your Darkness for extra damage, and <strong>Nightfall</strong>{' '}
          costs the whole bar.
        </li>
        <li>
          You keep your Darkness when you save and load. The spells' tomes from shops still work without the tree,
          but they cost Mana as usual.
        </li>
      </ul>
    </div>
  ),
};

// One main talent: card art, what unlocks it, and what it does.
function Talent({ t, color }) {
  return (
    <div className="g-card g-talent">
      {t.img ? (
        <img className="g-talent__art" src={`${ART}talents/${t.img}`} alt="" loading="lazy" />
      ) : (
        <div className="g-talent__art g-talent__art--none" style={{ background: `${color}22` }} />
      )}
      <div className="g-talent__body">
        <div className="g-card__head">
          <h3 className="g-card__title">{t.name}</h3>
          {t.level && <span className="g-card__meta">Level {t.level}</span>}
        </div>
        <span className="g-talent__req">{t.requires.length ? `Requires ${t.requires.join(' or ')}` : 'Root talent'}</span>
        <p>{t.desc}</p>
      </div>
    </div>
  );
}

export default function Prophecy() {
  const [id, setId] = useState(PROPHECY_TREES[0].id);
  const [focus, setFocus] = useState(null);
  const tree = PROPHECY_TREES.find((t) => t.id === id);
  const talents = tree.nodes.filter((n) => !n.stat);
  const stats = tree.nodes.filter((n) => n.stat);
  const nameOf = (i) => tree.nodes.find((n) => n.id === i)?.name;
  // `fly` moves the map too (chips, tree names); a star click only switches the list below.
  const pickTree = (t, fly = true) => {
    setId(t);
    if (fly) setFocus({ id: t });
  };

  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Prophecy is Zenderal's own talent system, separate from Enderal's memory trees. {PROPHECY_TREES.length} trees
          sit around one starting point, each built around a playstyle, from holy light and muskets to shadow magic,
          battle rage and the restless dead. Each tree has five to ten main talents that change how you play, joined by
          small stat talents.
        </p>
        <h2>How it works</h2>
        <ul>
          <li>
            You earn <strong>one Prophecy point every 3 levels</strong>, up to <strong>30 at level 90</strong>. There
            are {TALENTS} talents, so you can't take them all. Pick a tree or two and go deep, and try a build on the map
            below first.
          </li>
          <li>
            Open the tree with the <strong>Prophecy</strong> power or press <strong>P</strong>. It also opens by
            itself when you earn your first point.
          </li>
          <li>
            Each tree starts from its root talent. A talent unlocks once you have the one before it, and where two
            branches meet, either one is enough.
          </li>
          <li>
            Every tree ends in a capstone that needs <strong>level 30</strong>.
          </li>
        </ul>

      </div>

      <ProphecyMap treeId={id} focus={focus} onTree={pickTree} />

      <div className="spells__filter">
        <span className="spells__filter-name">Tree</span>
        <div className="spells__chips">
          {PROPHECY_TREES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`chip${t.id === id ? ' is-on' : ''}`}
              onClick={() => pickTree(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div
        className="g-tree-banner"
        style={{
          // Trees without their own art get a wash of their colour.
          backgroundImage: tree.bg
            ? `url(${ART}trees/${tree.bg})`
            : `radial-gradient(ellipse at 70% 40%, ${tree.color}55, transparent 70%)`,
          borderColor: tree.color,
        }}
      >
        <div className="g-tree-banner__text">
          <h2 className="g-tree-banner__name" style={{ color: tree.color }}>
            {tree.name}
          </h2>
          <p>{tree.tagline}</p>
        </div>
      </div>

      {GAUGES[tree.id]}

      <div className="g-stack g-stack--tight">
        <span className="g-label">Talents, in unlock order</span>
        <div className="g-talents">
          {talents.map((t) => (
            <Talent key={t.name} t={{ ...t, requires: t.parents.map(nameOf) }} color={tree.color} />
          ))}
        </div>
      </div>

      <div className="g-stack g-stack--tight">
        <span className="g-label">Stat talents</span>
        <div className="g-icons">
          {stats.map((s) => (
            <div key={s.name} className="g-icon">
              <div className="g-icon__text">
                <span className="g-icon__name">{s.name}</span>
                <span>{s.desc}</span>
                <span className="g-note">Requires {s.parents.map(nameOf).join(' or ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
