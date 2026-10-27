import { useState } from 'react';
import { PROPHECY_TREES } from './prophecy.js';
import ProphecyMap from './ProphecyMap.jsx';

const ART = `${import.meta.env.BASE_URL}uploads/guide/prophecy/`;

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
          Prophecy is Zenderal's own talent system, separate from Enderal's memory trees. Seven trees sit around one
          starting point, each built around a playstyle, from holy light to muskets to the restless dead. Each tree has
          five or six main talents that change how you play, joined by small stat talents.
        </p>
        <h2>How it works</h2>
        <ul>
          <li>
            You earn <strong>one Prophecy point every 3 levels</strong>, up to <strong>30 at level 90</strong>. There
            are 78 talents, so you can't take them all. Pick a tree or two and go deep, and try a build on the map
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

      <div className="g-tree-banner" style={{ backgroundImage: `url(${ART}trees/${tree.bg})`, borderColor: tree.color }}>
        <div className="g-tree-banner__text">
          <h2 className="g-tree-banner__name" style={{ color: tree.color }}>
            {tree.name}
          </h2>
          <p>{tree.tagline}</p>
        </div>
      </div>

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
