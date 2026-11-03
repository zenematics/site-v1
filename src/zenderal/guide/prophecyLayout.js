import { PROPHECY_EXTENT, PROPHECY_TREES } from './prophecy.js';

// Where the Prophecy trees and their names sit on the radial map, shared by the guide's map (ProphecyMap.jsx) and
// the overview's build-crafting section. Units are radial-map units (y up, start point at 0,0).

// The art spans more than the talents, as in game (extent × 1.45 on a square canvas).
export const BG = PROPHECY_EXTENT * 1.45;

// Every tree's root sits on one circle this far from the start point. The game places them anywhere from 19 to 36
// units out; each tree slides along its own spoke, so it keeps its angle and stays over its wedge of the art.
const RING = 26;

function onRing(t) {
  const root = t.nodes.find((n) => n.parents.length === 0);
  const d = Math.hypot(root.x, root.y);
  const [dx, dy] = [(root.x / d) * (RING - d), (root.y / d) * (RING - d)];
  return {
    ...t,
    routes: t.routes.map((r) => ({ ...r, via: r.via.map(([x, y]) => [x + dx, y + dy]) })),
    nodes: t.nodes.map((n) => ({ ...n, x: n.x + dx, y: n.y + dy })),
  };
}

// Each tree's name sits just clear of its stars: above them for the top and sideways trees, on the outer side for the
// upper diagonals (so it doesn't run into the next tree), below them for the lower ones. The game's own label spots
// overlap the stars once eleven trees share the circle. A name that would cover another tree's stars (Gadgets' under
// Firearms' pistol branch) takes the next spot that's clear.
const PLACED = PROPHECY_TREES.map(onRing);

// The name's box [left, bottom, right, top] at the whole-map zoom, where a letter is about 2.4 units wide and 3 tall.
function box({ name, anchor, baseline, label: [x, y] }) {
  const w = name.length * 2.4;
  const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  const bottom = baseline === 'hanging' ? y - 3 : y;
  return [left, bottom, left + w, bottom + 3];
}
const meets = (a, b) => a[0] < b[2] + 1 && b[0] < a[2] + 1 && a[1] < b[3] + 1 && b[1] < a[3] + 1;

const names = [];
export const TREES = PLACED.map((t) => {
  const xs = t.nodes.map((n) => n.x);
  const ys = t.nodes.map((n) => n.y);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const root = t.nodes.find((n) => n.parents.length === 0);
  const d = Math.hypot(root.x, root.y);
  const [cos, sin] = [root.x / d, root.y / d];
  const above = { anchor: 'middle', baseline: 'alphabetic', label: [(x0 + x1) / 2, y1 + 2.2] };
  const below = { anchor: 'middle', baseline: 'hanging', label: [(x0 + x1) / 2, y0 - 2.2] };
  const outer = { anchor: cos < 0 ? 'end' : 'start', baseline: 'alphabetic', label: [cos < 0 ? x0 - 1 : x1 + 1, y1] };
  const spots =
    sin < -0.3 ? [below, outer, above] : Math.abs(cos) > 0.3 && Math.abs(cos) < 0.9 ? [outer, above, below] : [above, below, outer];
  const taken = [
    ...PLACED.filter((o) => o !== t).flatMap((o) => o.nodes.map((n) => [n.x, n.y, n.x, n.y])),
    ...names,
  ];
  const spot = spots.find((s) => !taken.some((b) => meets(box({ name: t.name, ...s }), b))) ?? spots[0];
  names.push(box({ name: t.name, ...spot }));
  return { ...t, ...spot };
});

// The lines between the stars: a spoke from the start point to each tree's root, then each talent to its parents
// (along the game's route when it bends). `a` and `b` are the `<tree id>:<node id>` keys at each end (`a` is null
// for a spoke).
export const EDGES = TREES.flatMap((t) => {
  const root = t.nodes.find((n) => n.parents.length === 0);
  const spoke = { key: `${t.id}:spoke`, tree: t, pts: [[0, 0], [root.x, root.y]], a: null, b: `${t.id}:${root.id}`, spoke: true };
  return [
    spoke,
    ...t.nodes.flatMap((n) =>
      n.parents.map((p) => {
        const from = t.nodes.find((m) => m.id === p);
        const route = t.routes.find((r) => r.from === p && r.to === n.id);
        return {
          key: `${t.id}:${p}-${n.id}`,
          tree: t,
          pts: [[from.x, from.y], ...(route ? route.via : []), [n.x, n.y]],
          a: `${t.id}:${p}`,
          b: `${t.id}:${n.id}`,
        };
      }),
    ),
  ];
});
