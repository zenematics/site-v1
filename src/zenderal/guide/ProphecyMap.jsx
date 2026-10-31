import { useEffect, useRef, useState } from 'react';
import { PROPHECY_EXTENT } from './prophecy.js';
import { BG, EDGES, TREES } from './prophecyLayout.js';

const ART = `${import.meta.env.BASE_URL}uploads/guide/prophecy/`;
const MAX_POINTS = 30;
const GOLD = '#e8c46e';
const HOME = { cx: 0, cy: 0, s: PROPHECY_EXTENT + 15 };
const MIN_S = 4;
const MAX_S = BG;
const STORE = 'zen-prophecy-build';

// Every node, keyed `<tree id>:<node id>`, with its tree attached.
const NODES = new Map();
for (const t of TREES) for (const n of t.nodes) NODES.set(`${t.id}:${n.id}`, { ...n, key: `${t.id}:${n.id}`, tree: t });
const parentsOf = (n) => n.parents.map((p) => NODES.get(`${n.tree.id}:${p}`)).filter(Boolean);
const childrenOf = (n) => [...NODES.values()].filter((c) => c.tree === n.tree && c.parents.includes(n.id));

// The view box around one tree: its talents plus its name.
function treeView(t) {
  const xs = [...t.nodes.map((n) => n.x), t.label[0]];
  const ys = [...t.nodes.map((n) => n.y), t.label[1]];
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, s: Math.max(x1 - x0, y1 - y0) / 2 + 3 };
}

function loadBuild() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || '[]');
    return new Set(saved.filter((k) => NODES.has(k)));
  } catch {
    return new Set();
  }
}

// `focus` ({ id }) flies the map to a tree; a new object each time, so picking the same tree again works.
export default function ProphecyMap({ treeId, focus, onTree }) {
  const [view, setView] = useState(HOME);
  const [width, setWidth] = useState(700);
  const [learned, setLearned] = useState(loadBuild);
  const [selected, setSelected] = useState(null);
  const [hover, setHover] = useState(null);
  // Leaving a star clears the hover only after a moment, so the name and panel don't vanish the instant the
  // pointer slips off a small star, and there's time to reach the panel (which keeps it while pointed at).
  const hoverOff = useRef(0);
  const hoverOn = (k) => {
    clearTimeout(hoverOff.current);
    setHover(k);
  };
  const hoverLeave = () => {
    clearTimeout(hoverOff.current);
    hoverOff.current = setTimeout(() => setHover(null), 600);
  };
  useEffect(() => () => clearTimeout(hoverOff.current), []);
  const box = useRef(null);
  const svg = useRef(null);
  const anim = useRef(0);
  const drag = useRef(null);
  const viewRef = useRef(view);
  viewRef.current = view;

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify([...learned]));
    } catch {
      /* private mode: the build just isn't kept */
    }
  }, [learned]);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width || 700));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  const clamp = (v) => {
    const s = Math.min(MAX_S, Math.max(MIN_S, v.s));
    const lim = BG - s;
    return { s, cx: Math.max(-lim, Math.min(lim, v.cx)), cy: Math.max(-lim, Math.min(lim, v.cy)) };
  };

  // Ease to a view (tree buttons, whole map).
  const flyTo = (to) => {
    cancelAnimationFrame(anim.current);
    const from = viewRef.current;
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 350);
      const e = 1 - (1 - k) ** 3;
      setView(clamp({ cx: from.cx + (to.cx - from.cx) * e, cy: from.cy + (to.cy - from.cy) * e, s: from.s + (to.s - from.s) * e }));
      if (k < 1) anim.current = requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
  };

  // Picking a tree outside the map (the chips) flies there.
  useEffect(() => {
    const t = focus && TREES.find((x) => x.id === focus.id);
    if (t) flyTo(treeView(t));
  }, [focus]);

  // Screen point → map units (y up).
  const toMap = (clientX, clientY) => {
    const r = svg.current.getBoundingClientRect();
    const v = viewRef.current;
    return { x: v.cx - v.s + ((clientX - r.left) / r.width) * 2 * v.s, y: v.cy + v.s - ((clientY - r.top) / r.height) * 2 * v.s };
  };
  const zoomAt = (clientX, clientY, factor) => {
    const p = toMap(clientX, clientY);
    const v = viewRef.current;
    const s = Math.min(MAX_S, Math.max(MIN_S, v.s * factor));
    const k = s / v.s;
    setView(clamp({ s, cx: p.x + (v.cx - p.x) * k, cy: p.y + (v.cy - p.y) * k }));
  };

  // Wheel zoom needs a non-passive listener to keep the page from scrolling.
  useEffect(() => {
    const el = svg.current;
    const onWheel = (e) => {
      e.preventDefault();
      cancelAnimationFrame(anim.current);
      zoomAt(e.clientX, e.clientY, Math.exp(e.deltaY * 0.0015));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Drag to pan, two fingers to pinch. A press that barely moves is a click.
  const pointers = useRef(new Map());
  const onDown = (e) => {
    cancelAnimationFrame(anim.current);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    drag.current = { moved: false, start: { x: e.clientX, y: e.clientY }, pinch: null };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      drag.current.pinch = Math.hypot(a.x - b.x, a.y - b.y);
    }
  };
  const onMove = (e) => {
    if (!pointers.current.has(e.pointerId) || !drag.current) return;
    const prev = pointers.current.get(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const d = drag.current;
    // Capture only once it's a drag, so a plain click still reaches the star under it.
    if (!d.moved && Math.hypot(e.clientX - d.start.x, e.clientY - d.start.y) > 4) {
      d.moved = true;
      svg.current.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    if (pointers.current.size === 2 && d.pinch) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, d.pinch / dist);
      d.pinch = dist;
      return;
    }
    const r = svg.current.getBoundingClientRect();
    const v = viewRef.current;
    const k = (2 * v.s) / r.width;
    setView(clamp({ ...v, cx: v.cx - (e.clientX - prev.x) * k, cy: v.cy + (e.clientY - prev.y) * k }));
  };
  const onUp = (e) => {
    pointers.current.delete(e.pointerId);
    if (!drag.current) return;
    if (pointers.current.size === 0 && drag.current && !drag.current.moved) setSelected(null);
    if (pointers.current.size < 2 && drag.current) drag.current.pinch = null;
  };

  const used = learned.size;
  const canLearn = (n) =>
    !learned.has(n.key) && used < MAX_POINTS && (n.parents.length === 0 || parentsOf(n).some((p) => learned.has(p.key)));
  const learn = (n) => canLearn(n) && setLearned(new Set([...learned, n.key]));
  // Unlearning also drops whatever no longer has a learned path back to its root.
  const unlearn = (n) => {
    const next = new Set(learned);
    next.delete(n.key);
    for (let changed = true; changed; ) {
      changed = false;
      for (const k of next) {
        const m = NODES.get(k);
        if (m.parents.length && !parentsOf(m).some((p) => next.has(p.key))) {
          next.delete(k);
          changed = true;
        }
      }
    }
    setLearned(next);
  };

  // Sizes stay steady on screen, grow a little when zoomed in and shrink on narrow screens.
  const upp = (2 * view.s) / width; // map units per pixel
  const grow = Math.min(1.7, Math.max(1, Math.pow(HOME.s / view.s, 0.35)));
  const fit = Math.min(1, Math.max(0.55, width / 720));
  const px = (v) => v * grow * fit * upp;

  const state = (n) => (learned.has(n.key) ? 'learned' : canLearn(n) ? 'open' : 'locked');
  const active = (hover && NODES.get(hover)) || (selected && NODES.get(selected));
  // The panel opens on the side away from the star, so it never covers what you're pointing at.
  const panelLeft = active && active.x > view.cx;

  const vb = `${view.cx - view.s} ${-view.cy - view.s} ${2 * view.s} ${2 * view.s}`;

  return (
    <div className="pmap">
      <div className="pmap__bar">
        <button type="button" className="chip" onClick={() => flyTo(HOME)}>
          Whole map
        </button>
        <button type="button" className="chip" aria-label="Zoom in" onClick={() => flyTo(clamp({ ...view, s: view.s / 1.5 }))}>
          +
        </button>
        <button type="button" className="chip" aria-label="Zoom out" onClick={() => flyTo(clamp({ ...view, s: view.s * 1.5 }))}>
          −
        </button>
        <span className="pmap__points">
          <strong>{used}</strong> / {MAX_POINTS} points
        </span>
        <button type="button" className="chip" disabled={!used} onClick={() => setLearned(new Set())}>
          Reset
        </button>
      </div>

      <div className="pmap__layout">
        <div className="pmap__canvas" ref={box}>
          <svg
            ref={svg}
            viewBox={vb}
            className="pmap__svg"
            role="img"
            aria-label="Prophecy talent map. Drag to pan, scroll or pinch to zoom, click a star for details."
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <image href={`${ART}trees/radial.webp`} x={-BG} y={-BG} width={2 * BG} height={2 * BG} />
            <rect x={-BG} y={-BG} width={2 * BG} height={2 * BG} fill="rgba(7, 8, 10, 0.38)" />

            {EDGES.map((e) => {
              const on = (e.a === null || learned.has(e.a)) && learned.has(e.b);
              return (
                <polyline
                  key={e.key}
                  points={e.pts.map(([x, y]) => `${x},${-y}`).join(' ')}
                  fill="none"
                  stroke={e.tree.color}
                  strokeOpacity={on ? 0.95 : e.spoke ? 0.35 : 0.55}
                  strokeWidth={on ? 2.5 : 1.5}
                  strokeDasharray={on ? undefined : '4 4'}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            <circle r={px(6)} fill="#f4f2ee" opacity="0.9" />
            <circle r={px(14)} fill="none" stroke="#f4f2ee" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />

            {TREES.map((t) => (
              <text
                key={t.id}
                x={t.label[0]}
                y={-t.label[1]}
                className="pmap__tree"
                fill={t.color}
                fontSize={px(15)}
                textAnchor={t.anchor}
                dominantBaseline={t.baseline}
                onClick={() => onTree(t.id, true)}
              >
                {t.name}
              </text>
            ))}

            {[...NODES.values()].map((n) => {
              const st = state(n);
              const r = px(n.stat ? 4 : n.level ? 8 : 6.5);
              const color = n.tree.color;
              return (
                <g
                  key={n.key}
                  transform={`translate(${n.x} ${-n.y})`}
                  className={`pmap__node is-${st}${n.key === selected ? ' is-selected' : ''}`}
                  onPointerEnter={() => hoverOn(n.key)}
                  onPointerLeave={hoverLeave}
                  onPointerUp={(e) => {
                    if (drag.current && drag.current.moved) return;
                    e.stopPropagation();
                    pointers.current.delete(e.pointerId);
                    drag.current = null;
                    setSelected(n.key);
                    if (n.tree.id !== treeId) onTree(n.tree.id, false);
                  }}
                >
                  <circle r={r + px(11)} fill="transparent" />
                  {st === 'learned' && <circle r={r * 2} fill={color} opacity="0.25" />}
                  <circle
                    r={r}
                    fill={st === 'learned' ? color : '#07080a'}
                    stroke={st === 'open' ? GOLD : color}
                    strokeOpacity={st === 'locked' ? 0.6 : 1}
                    strokeWidth={st === 'open' ? 2 : 1.25}
                    vectorEffect="non-scaling-stroke"
                  />
                  {n.level && <circle r={r + px(4)} fill="none" stroke={color} strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />}
                  {n.key === selected && (
                    <circle r={r + px(7)} fill="none" stroke="#ffffff" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  )}
                </g>
              );
            })}

            {/* Talent names stay hidden until you point at a star (or pick one), drawn above every star. */}
            {[...new Set([selected, hover])].filter(Boolean).map((k) => {
              const n = NODES.get(k);
              const st = state(n);
              const r = px(n.stat ? 4 : n.level ? 8 : 6.5);
              const gap = r + px(5);
              const [lx, ly, anchor, base] = [
                [0, gap, 'middle', 'hanging'],
                [0, -gap, 'middle', 'auto'],
                [gap, 0, 'start', 'middle'],
                [-gap, 0, 'end', 'middle'],
              ][n.side] || [0, gap, 'middle', 'hanging'];
              return (
                <text
                  key={k}
                  x={n.x + lx}
                  y={-n.y + ly}
                  fontSize={px(13)}
                  textAnchor={anchor}
                  dominantBaseline={base}
                  className="pmap__label"
                  fill={st === 'open' ? GOLD : '#ffffff'}
                >
                  {n.name}
                </text>
              );
            })}
          </svg>
          <span className="pmap__hint">Drag to move · scroll or pinch to zoom · click a star</span>

        {active && (
          <aside
            className={`pmap__info${panelLeft ? ' is-left' : ''}`}
            aria-live="polite"
            onPointerEnter={() => clearTimeout(hoverOff.current)}
            onPointerLeave={hoverLeave}
          >
            <Detail
              n={active}
              st={state(active)}
              onLearn={() => learn(active)}
              onUnlearn={() => unlearn(active)}
              onClose={selected ? () => setSelected(null) : null}
              full={used >= MAX_POINTS}
            />
          </aside>
        )}
        </div>
      </div>

      <ul className="pmap__legend">
        <li>
          <span className="pmap__dot is-learned" /> Learned
        </li>
        <li>
          <span className="pmap__dot is-open" /> Can learn next
        </li>
        <li>
          <span className="pmap__dot is-locked" /> Locked
        </li>
        <li>
          <span className="pmap__dot is-capstone" /> Capstone, level 30
        </li>
        <li className="pmap__legend-note">Your plan is kept in this browser.</li>
      </ul>
    </div>
  );
}

function Detail({ n, st, onLearn, onUnlearn, onClose, full }) {
  const needs = parentsOf(n).map((p) => p.name);
  const children = childrenOf(n);
  return (
    <div className="pmap__detail">
      {onClose && (
        <button type="button" className="pmap__close" aria-label="Close" onClick={onClose}>
          ×
        </button>
      )}
      {n.img && <img className="pmap__art" src={`${ART}talents/${n.img}`} alt="" />}
      <span className="g-label" style={{ color: n.tree.color }}>
        {n.tree.name}
        {n.stat ? ' · Stat talent' : n.level ? ' · Capstone' : ''}
      </span>
      <h3 className="g-card__title">{n.name}</h3>
      <p>{n.desc}</p>
      <p className="g-note">
        {needs.length ? `Requires ${needs.join(' or ')}.` : 'The first talent of the tree.'}
        {n.level ? ` Needs level ${n.level}.` : ''}
        {children.length ? ` Leads to ${children.map((c) => c.name).join(', ')}.` : ''}
      </p>
      {st === 'learned' ? (
        <button type="button" className="chip" onClick={onUnlearn}>
          Unlearn
        </button>
      ) : (
        <button type="button" className="chip is-on" disabled={st !== 'open'} onClick={onLearn}>
          {st === 'open' ? 'Learn' : full ? 'No points left' : `Learn ${needs.length ? needs.join(' or ') : ''} first`}
        </button>
      )}
    </div>
  );
}
