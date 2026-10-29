import { useEffect, useMemo, useState } from 'react';
import { SPELL_SOURCES } from './guide/data.js';

// The overview's expanded-magic section. A pinned "grimoire": the spell count starts at the base game's and climbs as
// each spell pack lights up and its spells' names fade in around it.

// Loaded on mount, in its own chunk, so the rest of the page doesn't wait for it (the Magic guide loads it the same way).
const loadSpells = () => import('../../content/zenderal/spells.json').then((m) => m.default);

const BACKDROP = `${import.meta.env.BASE_URL}uploads/zenderal/screenshots/backgrounds/mage.webp`;
// Base Enderal and EGO count as the starting point; the packs light up in this order.
const BASE = ['Enderal', 'EGO'];
const PACKS = ['KataPUMB Spell Pack', 'Apocalypse', 'Triumvirate', 'xxOpenSpells'];
const SCHOOLS = [
  { id: 'Elementalism', color: '#e0896a' },
  { id: 'Light Magic', color: '#e8c46e' },
  { id: 'Mentalism', color: '#b7a6e0' },
  { id: 'Entropy', color: '#8fbf7f' },
  { id: 'Psionics', color: '#7fa7c9' },
];
const colorOf = (school) => SCHOOLS.find((s) => s.id === school)?.color ?? '#c9c5bd';
const label = (id) => SPELL_SOURCES.find((s) => s.id === id)?.label ?? id;

// A seeded random, so the names land in the same places on every visit.
function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A name's box as fractions of the pin, from its spot, anchor and an average letter width (`em`, as a fraction of
// the pin's width per pixel of font size) and line height (`line`, a fraction of its height).
function box(x, y, anchor, name, size, em, line) {
  const w = name.length * size * em;
  const x0 = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2;
  return { x0, x1: x0 + w, y0: y - line / 2, y1: y + line / 2 };
}
const hit = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
// The counter and the pack steps, at desktop size and on phones.
const CENTER = { x0: 0.25, x1: 0.75, y0: 0.3, y1: 0.75 };
const PHONE_MID = { x0: 0, x1: 1, y0: 0.27, y1: 0.78 };

// About one name in ten per source, placed clear of the counter in the middle and of each other on a desktop-sized
// pin. Positions are fractions of the pin; names near the sides run inwards from their spot so they stay on screen.
// Phones are narrow, so a second pass picks the names that fit there without touching (`phone`).
function scatter(spells) {
  const rand = rng(7);
  const placed = [];
  for (const source of [...BASE, ...PACKS]) {
    const pool = [...new Set(spells.filter((s) => s.source === source && s.school).map((s) => s.name))];
    const want = Math.max(2, Math.round(pool.length / 10));
    const names = [];
    while (names.length < want && pool.length) names.push(...pool.splice(Math.floor(rand() * pool.length), 1));
    names.forEach((name, i) => {
      const size = 11 + Math.round(rand() * 6);
      for (let tries = 0; tries < 300; tries++) {
        const x = 0.05 + rand() * 0.9;
        const y = 0.14 + rand() * 0.78;
        const anchor = x < 0.3 ? 'start' : x > 0.7 ? 'end' : 'middle';
        const b = box(x, y, anchor, name, size, 0.00045, 0.04);
        if (b.x0 < 0.02 || b.x1 > 0.98 || hit(b, CENTER) || placed.some((p) => hit(b, p.box))) continue;
        const spell = spells.find((s) => s.name === name && s.source === source);
        placed.push({
          name, source, x, y, anchor, size, box: b, color: colorOf(spell.school),
          alpha: 0.4 + rand() * 0.45,
          delay: names.length > 1 ? (i / (names.length - 1)) * 0.65 : 0,
        });
        break;
      }
    });
  }
  const phone = [];
  for (const p of placed) {
    const b = box(p.x, p.y, p.anchor, p.name, 11, 0.0016, 0.03);
    if (b.x0 < 0.02 || b.x1 > 0.98 || hit(b, PHONE_MID) || phone.some((q) => hit(b, q))) continue;
    phone.push(b);
    p.phone = true;
  }
  return placed;
}

export default function Grimoire() {
  const [spells, setSpells] = useState(null);
  useEffect(() => {
    loadSpells().then(setSpells);
  }, []);

  const count = (ids) => (spells ? spells.filter((s) => ids.includes(s.source)).length : 0);
  const names = useMemo(() => (spells ? scatter(spells) : []), [spells]);
  const steps = useMemo(
    () => [{ id: 'base', ids: BASE, label: 'Enderal & EGO' }, ...PACKS.map((id) => ({ id, ids: [id], label: label(id) }))],
    [],
  );

  // The scroll run (.zmagic__run::after): each pack lights up in its own slice of it. --p on a pack's names and chip
  // runs 0 → 1 over its slice; the counter adds the pack's spells as it goes.
  useEffect(() => {
    if (!spells) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = document.querySelector('.zmagic__run');
    const pin = run.querySelector('.zmagic__pin');
    const counter = pin.querySelector('.zmagic__count');
    const groups = PACKS.map((id) => [...pin.querySelectorAll(`[data-pack="${id}"]`)]);
    const sizes = PACKS.map((id) => count([id]));
    const base = count(BASE);
    const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
    const ease = (x) => x * x * (3 - 2 * x);
    let frame = 0;
    const update = () => {
      frame = 0;
      const t = reduce ? 1 : ramp(-run.getBoundingClientRect().top, 0, run.offsetHeight - pin.offsetHeight);
      pin.style.setProperty('--t', t.toFixed(4));
      let total = base;
      PACKS.forEach((_, i) => {
        const slice = 0.7 / PACKS.length;
        const p = ease(ramp(t, 0.08 + i * slice, 0.08 + (i + 1) * slice));
        for (const el of groups[i]) el.style.setProperty('--p', p.toFixed(3));
        total += sizes[i] * p;
      });
      counter.textContent = Math.round(total);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    if (!reduce) addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [spells]);

  return (
    <section className="zmagic">
      <div className="zmagic__run">
        <div className="zmagic__pin">
          <img src={BACKDROP} alt="" className="zmagic__backdrop" />
          <div className="zmagic__shade" />
          <div className="zmagic__names" aria-hidden="true">
            {names.map((n) => (
              <span
                key={`${n.source}:${n.name}`}
                data-pack={BASE.includes(n.source) ? undefined : n.source}
                className={`zmagic__name zmagic__name--${n.anchor}${n.phone ? '' : ' zmagic__name--wide'}`}
                style={{
                  left: `${(n.x * 100).toFixed(2)}%`,
                  top: `${(n.y * 100).toFixed(2)}%`,
                  color: n.color,
                  fontSize: n.size,
                  '--a': n.alpha.toFixed(2),
                  '--d': n.delay.toFixed(2),
                }}
              >
                {n.name}
              </span>
            ))}
          </div>
          <div className="zmagic__center">
            <span className="docs__label">Expanded magic</span>
            <span className="zmagic__count">{spells ? count(BASE) : ''}</span>
            <p className="zmagic__sub">spells to learn from tomes, across five schools</p>
            <ul className="zmagic__steps">
              {steps.map((s) => (
                <li key={s.id} data-pack={s.id === 'base' ? undefined : s.id} className={`zmagic__step${s.id === 'base' ? ' is-base' : ''}`}>
                  <span className="zmagic__step-n">{s.id === 'base' ? count(s.ids) : `+${count(s.ids)}`}</span>
                  <span className="zmagic__step-label">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
