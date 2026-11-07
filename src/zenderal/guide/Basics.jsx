import { useEffect, useState } from 'react';
import { DocIcon } from '../DocIcons.jsx';
import {
  BOUNTY_NOTES,
  FEVER_SOURCES,
  FEVER_STAGES,
  FOODS,
  LEVEL_UP,
  STAMINA_BANDS,
  STAMINA_DRAINS,
} from './data.js';

const GUIDE = `${import.meta.env.BASE_URL}zenderal/guide/`;
const SHOTS = `${import.meta.env.BASE_URL}uploads/zenderal/screenshots/backgrounds/`;

// The big buttons to the pages a new player wants next.
const LINKS = [
  { id: 'keybindings', icon: 'keyboard', title: 'Keybindings', text: 'Every key, on a map' },
  { id: 'traits', icon: 'mask', title: 'Traits', text: 'Pick your two at the start' },
  { id: 'prophecy', icon: 'constellation', title: 'Prophecy Talents', text: 'Plan a build' },
];

function GuideLinks() {
  return (
    <nav className="bx-links" aria-label="More guides">
      {LINKS.map((l) => (
        <a key={l.id} href={`${GUIDE}${l.id}/`} className="bx-link">
          <DocIcon name={l.icon} className="bx-link__icon" />
          <span>
            <span className="bx-link__title">{l.title}</span>
            <span className="bx-link__text">{l.text}</span>
          </span>
        </a>
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------- Stamina
function Stamina() {
  const [value, setValue] = useState(100);
  const [drain, setDrain] = useState(0);
  const band = STAMINA_BANDS.find((b) => value >= b.from);
  return (
    <>
      <p className="bx-lead">
        Stamina is your damage. Every swing, block, dodge and sprint spends it, and the lower it runs, the weaker you hit.
        Enemies play by the same rule.
      </p>
      <div className="bx-meter">
        <div className="bx-meter__head">
          <span className="g-label">Your Stamina</span>
          <span className="bx-meter__value">{value}%</span>
        </div>
        <div className="bx-stamina">
          <div className="bx-stamina__fill" style={{ width: `${value}%` }} />
          {STAMINA_BANDS.slice(0, -1).map((b) => (
            <span key={b.from} className="bx-stamina__tick" style={{ left: `${b.from}%` }}>
              {b.from}%
            </span>
          ))}
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(+e.target.value)}
            aria-label="Stamina"
          />
        </div>
        <p className="bx-hint">Drag the bar.</p>
        <div className={`bx-readout${band.mult < 1 ? ' is-low' : band.mult > 1 ? ' is-high' : ''}`}>
          <span className="bx-readout__big">×{band.mult.toFixed(1)}</span>
          <span>
            <strong>melee damage</strong>
            <br />
            {band.note}
          </span>
        </div>
      </div>

      <span className="g-label">What spends it</span>
      <div className="spells__chips">
        {STAMINA_DRAINS.map((d, k) => (
          <button key={d.name} type="button" className={`chip${k === drain ? ' is-on' : ''}`} onClick={() => setDrain(k)}>
            {d.name}
          </button>
        ))}
      </div>
      <p className="bx-answer">{STAMINA_DRAINS[drain].text}</p>

      <ul className="bx-tips">
        <li>Fight in short bursts: hit, step back, let the bar refill, go again.</li>
        <li>
          Dodge with <kbd>Left Alt</kbd> or a tap of <kbd>Left Shift</kbd>. Poise, parries and guard breaks are in{' '}
          <a href={`${GUIDE}combat/`}>For Honor Reforged</a>.
        </li>
        <li>Your race sets how much Stamina you start with and how fast it comes back.</li>
      </ul>
    </>
  );
}

// ---------------------------------------------------------------- Food
const KINDS = ['Cooked', 'Baked', 'Soup', 'Raw', 'Drink'];
const MAX_SAT = Math.max(...FOODS.map((f) => f.sat || 0));
const minutes = (s) => (s >= 120 ? `${Math.round(s / 60)} minutes` : `${s} seconds`);

function Food() {
  const [kind, setKind] = useState('Cooked');
  const [pick, setPick] = useState(FOODS.find((f) => f.kind === 'Cooked').name);
  const food = FOODS.find((f) => f.name === pick);
  const choose = (k) => {
    setKind(k);
    setPick(FOODS.find((f) => f.kind === k).name);
  };
  return (
    <>
      <p className="bx-lead">
        In Enderal your Health doesn't come back on its own. It only regenerates <strong>out of combat</strong> while you're{' '}
        <strong>Satiated</strong>, and only cooked food makes you Satiated. Eat before you set out, and again after a
        fight.
      </p>
      <div className="spells__chips">
        {KINDS.map((k) => (
          <button key={k} type="button" className={`chip${k === kind ? ' is-on' : ''}`} onClick={() => choose(k)}>
            {k}
          </button>
        ))}
      </div>
      <div className="bx-pantry">
        <div className="bx-pantry__list">
          {FOODS.filter((f) => f.kind === kind).map((f) => (
            <button
              key={f.name}
              type="button"
              className={`bx-dish${f.name === pick ? ' is-on' : ''}`}
              onClick={() => setPick(f.name)}
            >
              {f.name}
            </button>
          ))}
        </div>
        <div key={food.name} className="bx-plate">
          <h3 className="g-card__title">{food.name}</h3>
          {food.sat ? (
            <>
              <div className="bx-plate__row">
                <span className="g-label">Satiated for</span>
                <span className="bx-plate__num">{minutes(food.sat)}</span>
              </div>
              <div className="bx-bar">
                <div style={{ width: `${(food.sat / MAX_SAT) * 100}%` }} />
              </div>
              <div className="bx-plate__row">
                <span className="g-label">Health regeneration</span>
                <span className="bx-plate__num">+{food.regen}%</span>
              </div>
              {food.extra && <p className="bx-plate__extra">{food.extra}</p>}
            </>
          ) : (
            <>
              <p className="bx-plate__extra">{food.heal}</p>
              <p className="g-note">{food.note}</p>
            </>
          )}
        </div>
      </div>
      <ul className="bx-tips">
        <li>Cook at any cooking pot. Raw meat from hunting turns into much better meals.</li>
        <li>Soups and stews add a buff on top: more Stamina, Mana regeneration, frost resistance, or a disease cure.</li>
        <li>Drinks restore Mana, but alcohol slows you down for a minute. Not before a fight.</li>
      </ul>
    </>
  );
}

// ---------------------------------------------------------------- Arcane Fever
function Fever() {
  const [fever, setFever] = useState(0);
  const add = (n) => setFever((f) => Math.min(100, Math.max(0, f + n)));
  const reached = FEVER_STAGES.filter((s) => fever >= s.at);
  const stage = reached.at(-1);
  return (
    <>
      <p className="bx-lead">
        Magic has a price. Healing spells and Mana and Stamina potions raise your <strong>Arcane Fever</strong>. It
        never goes down on its own. Let it climb and it weakens you, and at 100% it kills you.
      </p>
      <div className="bx-meter">
        <div className="bx-meter__head">
          <span className="g-label">Arcane Fever</span>
          <span className={`bx-meter__value${fever >= 70 ? ' is-hot' : ''}`}>{fever}%</span>
        </div>
        <div className="bx-fever">
          {/* The gradient spans the whole bar, so the fill only turns red as it nears 100. */}
          <div className="bx-fever__fill" style={{ width: `${fever}%`, backgroundSize: `${fever ? 10000 / fever : 100}% 100%` }} />
          {FEVER_STAGES.map((s) => (
            <span key={s.at} className={`bx-fever__mark${fever >= s.at ? ' is-on' : ''}`} style={{ left: `${s.at}%` }}>
              {s.at}
            </span>
          ))}
        </div>
        <div className="bx-doses">
          {FEVER_SOURCES.map((s) => (
            <button key={s.name} type="button" className={`bx-dose${s.add < 0 ? ' is-cure' : ''}`} onClick={() => add(s.add)} disabled={fever >= 100 && s.add >= 0}>
              <span>{s.name}</span>
              <span className="bx-dose__n">{s.add > 0 ? `+${s.add}%` : s.add < 0 ? `${s.add}%` : '+0%'}</span>
            </button>
          ))}
          <button type="button" className="bx-dose bx-dose--reset" onClick={() => setFever(0)}>
            Reset
          </button>
        </div>
      </div>
      <div className={`bx-stage${stage ? ` is-${stage.at}` : ''}`} aria-live="polite">
        {stage ? (
          <>
            <span className="g-label">{stage.title}</span>
            <ul>
              {reached.flatMap((s) => s.effects).map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>No symptoms yet. The first ones start at 40%.</p>
        )}
      </div>
      <ul className="bx-tips">
        <li>
          <strong>Health potions</strong> cost no fever. Healing magic does: every Flash Heal adds 5%.
        </li>
        <li>
          <strong>Ambrosia</strong> lowers it by 20%. Carry some before heavy casting or a long trip.
        </li>
        <li>
          Some <a href={`${GUIDE}traits/`}>traits</a> are built around the fever, and Thaumaturgy's Mental Expert perk cuts
          what healing spells add by a third.
        </li>
      </ul>
    </>
  );
}

// ---------------------------------------------------------------- Progression
function Progression() {
  const [level, setLevel] = useState(1);
  const [stats, setStats] = useState({ Health: 0, Mana: 0, Stamina: 0 });
  const [fresh, setFresh] = useState(null);
  const ups = level - 1;
  const prophecy = Math.min(30, Math.floor(level / 3));
  const levelUp = (stat) => {
    setLevel((l) => l + 1);
    setStats((s) => ({ ...s, [stat]: s[stat] + 1 }));
    setFresh(level + 1);
  };
  return (
    <>
      <p className="bx-lead">
        Skills don't grow by using them. You earn <strong>EP</strong> from quests, fights and discoveries, and each level
        hands you points to spend. You choose where your character grows.
      </p>
      <div className="bx-level">
        <div className="bx-level__head">
          <span className="g-label">Level</span>
          <span key={level} className="bx-level__num">{level}</span>
        </div>
        <div className="bx-level__pick">
          <span className="g-note">Level up, and choose a stat:</span>
          <div className="bx-doses">
            {LEVEL_UP.stats.map((s) => (
              <button key={s.name} type="button" className="bx-dose" onClick={() => levelUp(s.name)}>
                <span>{s.name}</span>
                <span className="bx-dose__n">+{s.n}</span>
              </button>
            ))}
            <button
              type="button"
              className="bx-dose bx-dose--reset"
              onClick={() => {
                setLevel(1);
                setStats({ Health: 0, Mana: 0, Stamina: 0 });
                setFresh(null);
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="bx-points">
          {LEVEL_UP.points.map((p) => (
            <a key={p.name} href={`${GUIDE}${p.link}/`} className="bx-point">
              <span key={`${p.name}${fresh}`} className={`bx-point__n${fresh ? ' is-fresh' : ''}`}>{p.n * ups}</span>
              <span className="bx-point__name">{p.name}</span>
              <span className="bx-point__spend">+{p.n} a level. {p.spend}.</span>
            </a>
          ))}
          <a href={`${GUIDE}prophecy/`} className="bx-point">
            <span className="bx-point__n">{prophecy}</span>
            <span className="bx-point__name">Prophecy points</span>
            <span className="bx-point__spend">One every 3 levels, for Prophecy talents.</span>
          </a>
        </div>
        <p className="g-note">
          Stats so far: Health +{stats.Health * 9}, Mana +{stats.Mana * 8}, Stamina +{stats.Stamina * 11}.
        </p>
      </div>
      <ul className="bx-tips">
        <li>
          <strong>Learning and Crafting Points</strong> are spent by reading a skill book. Each book raises its skill by 1,
          up to its tier's cap. See <a href={`${GUIDE}books/`}>Learning Books</a>.
        </li>
        <li>
          <strong>Memory Points</strong> buy perks in the memory trees. Ten perks in two trees unlock an{' '}
          <a href={`${GUIDE}affinities/`}>affinity</a>.
        </li>
        <li>
          Open the <strong>Hero Menu</strong> with <kbd>H</kbd> to see your skills, points and progress to the next level.
        </li>
        <li>A level-up waits until you're out of combat and out of a conversation, so don't worry if it's late.</li>
      </ul>
    </>
  );
}

// ---------------------------------------------------------------- Bounty boards
function Bounties() {
  const [open, setOpen] = useState(new Set());
  const flip = (k) =>
    setOpen((o) => {
      const n = new Set(o);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  return (
    <>
      <p className="bx-lead">
        Short of coin? The notice boards in the cities post bounties: a target, a place and a reward. They're quick, they
        pay, and they send you to corners of the map you'd miss.
      </p>
      <div className="bx-board">
        {BOUNTY_NOTES.map((n, k) => (
          <button
            key={n.title}
            type="button"
            className={`bx-note${open.has(k) ? ' is-open' : ''}`}
            style={{ '--tilt': `${[-2.5, 1.8, -1.2, 2.4][k % 4]}deg` }}
            onClick={() => flip(k)}
            aria-expanded={open.has(k)}
          >
            <span className="bx-note__face">
              <span className="bx-note__wanted">Notice</span>
              <span className="bx-note__title">{n.title}</span>
            </span>
            <span className="bx-note__back">{n.text}</span>
          </button>
        ))}
      </div>
      <p className="bx-hint">Tap a note to read it.</p>
    </>
  );
}

// ---------------------------------------------------------------- Loot and death
const LOOT = [
  {
    title: 'Gear falls where they fall',
    text: "When someone dies, their weapon and shield fly off and land in the world. Pick them up off the ground, or loot them from the body as usual. A sheathed weapon stays on its owner's back or hip.",
  },
  {
    title: 'Corpses rot',
    text: 'Some creatures decompose into a lootable skeleton about 12 hours after they die. Loot what you want first.',
  },
  {
    title: 'Loot without the menu',
    text: 'Look at a body or a chest and its contents show on screen. Take what you want without opening it.',
  },
  {
    title: 'Gold weighs nothing',
    text: 'Carry as many pennies as you like. Your carry weight is for gear, food and loot.',
  },
];

function Loot() {
  return (
    <>
      <p className="bx-lead">A few things work differently from the base game when it comes to bodies and what they carry.</p>
      <div className="bx-cards">
        {LOOT.map((c) => (
          <div key={c.title} className="g-card">
            <h3 className="g-card__title">{c.title}</h3>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------- The hub
const TOPICS = [
  { id: 'stamina', title: 'Stamina', tag: 'Your damage', icon: 'zap', img: 'warrior.webp', Body: Stamina },
  { id: 'food', title: 'Food', tag: 'Your healing', icon: 'bowl', img: 'meeting.webp', Body: Food },
  { id: 'arcane-fever', title: 'Arcane Fever', tag: 'The price of magic', icon: 'flame', img: 'crystal-forest.webp', Body: Fever },
  { id: 'progression', title: 'Progression', tag: 'Levels, points, books', icon: 'book', img: 'reading.webp', Body: Progression },
  { id: 'bounties', title: 'Bounty Boards', tag: 'Coin and EP', icon: 'pin', img: 'ark.webp', Body: Bounties },
  { id: 'loot', title: 'Loot & Death', tag: 'Bodies and their gear', icon: 'skull', img: 'thief.webp', Body: Loot },
];

const fromHash = () => TOPICS.find((t) => t.id === location.hash.slice(1))?.id ?? TOPICS[0].id;

export default function Basics() {
  const [id, setId] = useState(fromHash);
  const topic = TOPICS.find((t) => t.id === id);

  useEffect(() => {
    const onHash = () => setId(fromHash());
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  const pick = (t) => (e) => {
    e.preventDefault();
    setId(t);
    history.replaceState(null, '', `#${t}`);
    document.getElementById('bx-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Zenderal changes how a lot of everyday things work, on top of Enderal's own rules. Here's what to know in your
          first hours. Pick a topic and try it.
        </p>
      </div>

      <GuideLinks />

      <div className="bx-hub" role="tablist" aria-label="Topics">
        {TOPICS.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            role="tab"
            aria-selected={t.id === id}
            className={`bx-tile${t.id === id ? ' is-on' : ''}`}
            onClick={pick(t.id)}
          >
            <img className="bx-tile__art" src={`${SHOTS}${t.img}`} alt="" loading="lazy" />
            <DocIcon name={t.icon} className="bx-tile__icon" />
            <span className="bx-tile__title">{t.title}</span>
            <span className="bx-tile__tag">{t.tag}</span>
          </a>
        ))}
      </div>

      <section id="bx-panel" key={id} className="bx-panel" role="tabpanel" aria-label={topic.title}>
        <h2 className="bx-panel__title">
          <DocIcon name={topic.icon} className="bx-panel__icon" />
          {topic.title}
        </h2>
        <topic.Body />
      </section>

      <GuideLinks />
    </div>
  );
}
