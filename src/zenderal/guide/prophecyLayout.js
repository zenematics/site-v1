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
// overlap the stars once eleven trees share the circle.
export const TREES = PROPHECY_TREES.map(onRing).map((t) => {
  const xs = t.nodes.map((n) => n.x);
  const ys = t.nodes.map((n) => n.y);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const root = t.nodes.find((n) => n.parents.length === 0);
  const d = Math.hypot(root.x, root.y);
  const [cos, sin] = [root.x / d, root.y / d];
  if (sin < -0.3) return { ...t, anchor: 'middle', baseline: 'hanging', label: [(x0 + x1) / 2, y0 - 2.2] };
  if (Math.abs(cos) > 0.3 && Math.abs(cos) < 0.9)
    return { ...t, anchor: cos < 0 ? 'end' : 'start', baseline: 'alphabetic', label: [cos < 0 ? x0 - 1 : x1 + 1, y1] };
  return { ...t, anchor: 'middle', baseline: 'alphabetic', label: [(x0 + x1) / 2, y1 + 2.2] };
});
