import { useEffect, useMemo, useRef, useState } from 'react';

// Regenerate with `node scripts/import-perks.mjs`. Loaded on demand so the
// other docs don't pay for it.
const loadPerks = () => import('../../content/zenderal/perks.json').then((m) => m.default);

// SVG units. Star x/y come in as 0–1 (y down) from the importer.
const W = 640;
const H = 820;
const PAD_X = 64;
const PAD_TOP = 36;
const PAD_BOTTOM = 56;
const px = (p) => PAD_X + p.x * (W - PAD_X * 2);
const py = (p) => PAD_TOP + p.y * (H - PAD_TOP - PAD_BOTTOM);

const KIND = { perk: 'Memory', rankedPerk: 'Ranked memory', talent: 'Talent' };

// Prerequisite edges: from the required star up to the star it unlocks.
function edgesOf(tree) {
  return tree.perks.flatMap((p) => [
    ...(p.allOf ?? []).map((r) => ({ from: r.id, to: p.id, any: false })),
    ...(p.anyOf ?? []).flat().map((r) => ({ from: r.id, to: p.id, any: true })),
  ]);
}

// Everything a star needs, all the way down to the class root.
function chainOf(id, byId) {
  const seen = new Set();
  const walk = (k) => {
    if (seen.has(k) || !byId[k]) return;
    seen.add(k);
    const p = byId[k];
    [...(p.allOf ?? []), ...(p.anyOf ?? []).flat()].forEach((r) => walk(r.id));
  };
  walk(id);
  return seen;
}

// Straight line between two stars.
function line(a, b) {
  return `M${px(a)},${py(a)} L${px(b)},${py(b)}`;
}

function anchor(p) {
  if (p.x < 0.1) return { textAnchor: 'start', dx: -10 };
  if (p.x > 0.9) return { textAnchor: 'end', dx: 10 };
  return { textAnchor: 'middle', dx: 0 };
}

function PerkRef({ r, byId, onPick }) {
  const p = byId[r.id];
  return (
    <button type="button" className="chip" onClick={() => onPick(r.id)}>
      {p.name}
      {r.rank && <span className="chip__count">rank {r.rank}</span>}
    </button>
  );
}

function Detail({ perk, byId, unlocks, onPick }) {
  const meta = [
    perk.root ? 'Class root talent' : KIND[perk.kind],
    perk.ranks > 1 && `${perk.ranks} ranks`,
    `${perk.cost} memory point${perk.cost === 1 ? '' : 's'}`,
  ].filter(Boolean);
  const needs = perk.allOf?.length || perk.anyOf?.length;
  return (
    <div className="ptree__detail" aria-live="polite">
      <span className="ptree__meta">{meta.join(' · ')}</span>
      <h4 className="ptree__name">{perk.name}</h4>
      {perk.desc && <p className="ptree__desc">{perk.desc}</p>}
      {perk.noTreePoints && <p className="ptree__note">Doesn't count toward this tree's points.</p>}

      <div className="ptree__links">
        <div className="spells__filter">
          <span className="spells__filter-name">Requires</span>
          {needs ? (
            <div className="spells__chips">
              {perk.allOf?.map((r) => <PerkRef key={r.id} r={r} byId={byId} onPick={onPick} />)}
              {perk.anyOf?.map((group, k) => (
                <div key={k} className="ptree__any">
                  <span className="ptree__any-label">One of</span>
                  {group.map((r) => <PerkRef key={r.id} r={r} byId={byId} onPick={onPick} />)}
                </div>
              ))}
            </div>
          ) : (
            <span className="ptree__none">Nothing, it's where the tree starts.</span>
          )}
        </div>
        {unlocks.length > 0 && (
          <div className="spells__filter">
            <span className="spells__filter-name">Leads to</span>
            <div className="spells__chips">
              {unlocks.map((id) => <PerkRef key={id} r={{ id }} byId={byId} onPick={onPick} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Tree({ tree }) {
  const byId = useMemo(() => Object.fromEntries(tree.perks.map((p) => [p.id, p])), [tree]);
  const edges = useMemo(() => edgesOf(tree), [tree]);
  const [selected, setSelected] = useState(tree.perks[0].id);
  const chain = useMemo(() => chainOf(selected, byId), [selected, byId]);
  const unlocks = [...new Set(edges.filter((e) => e.from === selected).map((e) => e.to))];
  // The class root is shared between trees, so it isn't counted here.
  const points = tree.perks.filter((p) => !p.root).reduce((n, p) => n + p.cost, 0);
  const pick = (id) => setSelected(id);

  return (
    <section id={`tree-${tree.code}`} className="ptree">
      <div className="ptree__head">
        <h3 className="ptree__title">{tree.name}</h3>
        <span className="ptree__meta">
          {tree.perks.length} stars · {points} memory points
          {tree.forgottenStoriesOnly && ' · Forgotten Stories'}
        </span>
      </div>

      <div className="ptree__map">
        <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label={`${tree.name} memory tree`}>
          {edges.map((e) => {
            const on = chain.has(e.from) && chain.has(e.to);
            return (
              <path
                key={`${e.from}>${e.to}`}
                d={line(byId[e.from], byId[e.to])}
                className={`ptree__edge${e.any ? ' ptree__edge--any' : ''}${on ? ' is-on' : ''}`}
              />
            );
          })}
          {tree.perks.map((p) => {
            const a = anchor(p);
            const r = p.kind === 'talent' ? 9 : 6;
            const cls = `ptree__star ptree__star--${p.kind}${chain.has(p.id) ? ' is-chain' : ''}${p.id === selected ? ' is-selected' : ''}`;
            return (
              <g
                key={p.id}
                className={cls}
                transform={`translate(${px(p)},${py(p)})`}
                role="button"
                tabIndex={0}
                aria-pressed={p.id === selected}
                aria-label={p.name}
                onClick={() => pick(p.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), pick(p.id))}
              >
                <circle className="ptree__hit" r={22} />
                <circle className="ptree__halo" r={r + 7} />
                <circle className="ptree__dot" r={r} />
                {p.ranks > 1 && (
                  <text className="ptree__ranks" y={-r - 6} textAnchor="middle">
                    {'•'.repeat(p.ranks)}
                  </text>
                )}
                <text className="ptree__label" y={r + 16} dx={a.dx} textAnchor={a.textAnchor}>
                  {p.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <Detail perk={byId[selected]} byId={byId} unlocks={unlocks} onPick={pick} />
    </section>
  );
}

// The tree whose section is currently at the top of the screen.
function useCurrentTree(trees) {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    if (!trees) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const passed = trees.filter((t) => document.getElementById(`tree-${t.code}`)?.getBoundingClientRect().top <= innerHeight * 0.4);
      setCurrent(passed.at(-1)?.code ?? trees[0].code);
    };
    const onScroll = () => frame || (frame = requestAnimationFrame(update));
    update();
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', onScroll);
    };
  }, [trees]);
  return current;
}

export default function Perks() {
  const [data, setData] = useState(null);
  const nav = useRef(null);
  const trees = data?.trees;
  const current = useCurrentTree(trees);

  useEffect(() => {
    loadPerks().then(setData);
  }, []);

  // Keep the active tree's chip in view as the row scrolls sideways on phones.
  useEffect(() => {
    const chip = current && nav.current?.querySelector(`[data-tree="${current}"]`);
    chip?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [current]);

  if (!data) return <p className="spells__empty">Loading memory trees…</p>;

  const total = trees.flatMap((t) => t.perks).reduce((m, p) => m.set(p.id, p.cost), new Map());
  const jump = (code) => document.getElementById(`tree-${code}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="perks">
      <p>
        Every memory you can unlock with Memory Points in the meditation space, laid out the way the stars sit in
        game. Select a star to see what it does and what it needs; the path back to the class root lights up. Maxing
        everything takes {[...total.values()].reduce((a, b) => a + b, 0)} Memory Points.
      </p>

      <nav ref={nav} className="perks__nav" aria-label="Memory trees">
        {trees.map((t) => (
          <button
            key={t.code}
            type="button"
            data-tree={t.code}
            className={`chip${t.code === current ? ' is-on' : ''}`}
            onClick={() => jump(t.code)}
          >
            {t.name}
          </button>
        ))}
      </nav>

      {trees.map((t) => (
        <Tree key={t.code} tree={t} />
      ))}
    </div>
  );
}
