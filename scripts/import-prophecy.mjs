// Regenerates src/zenderal/guide/prophecy.js from the game's ZenProphecyUI.json:
//   npm run import:prophecy [path]
// Default path: zenderal-patches' working tree (src/ProphecyV3/data/SKSE/Plugins/), which the installed list ships and
// is often ahead of any branch. Tree colours and banners are the site's own and are kept from the current
// prophecy.js; talent art is used when public/uploads/guide/prophecy/talents/<name>.webp exists.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { PROPHECY_TREES } from '../src/zenderal/guide/prophecy.js';

const SRC = process.argv[2] ?? '../zenderal-patches/src/ProphecyV3/data/SKSE/Plugins/ZenProphecyUI.json';
const OUT = 'src/zenderal/guide/prophecy.js';
const TALENTS = 'public/uploads/guide/prophecy/talents/';

const ui = JSON.parse(readFileSync(SRC, 'utf8'));
const r2 = (v) => Math.round(v * 100) / 100;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const old = Object.fromEntries(PROPHECY_TREES.map((t) => [t.id, t]));

// The routes are in the tree's own shape units; fit the shape-to-map similarity (scale, rotation, offset) from its
// nodes, which carry both.
function shapeToMap(t) {
  const pts = t.nodes.map((n) => [t.shape.nodes[n.index], [n.mx, n.my]]).filter(([s]) => s);
  const [s0, m0] = pts[0];
  const far = (p) => Math.hypot(p[0][0] - s0[0], p[0][1] - s0[1]);
  const [s1, m1] = pts.reduce((a, b) => (far(b) > far(a) ? b : a));
  const [sx, sy, mx, my] = [s1[0] - s0[0], s1[1] - s0[1], m1[0] - m0[0], m1[1] - m0[1]];
  const d = sx * sx + sy * sy;
  const [a, b] = [(mx * sx + my * sy) / d, (my * sx - mx * sy) / d];
  return ([x, y]) => [m0[0] + a * (x - s0[0]) - b * (y - s0[1]), m0[1] + b * (x - s0[0]) + a * (y - s0[1])];
}

const trees = ui.trees.map((t) => {
  const id = slug(t.name);
  const prev = old[id];
  if (!prev) console.warn(`New tree ${t.name}: give it a colour in ${OUT}.`);
  const map = shapeToMap(t);
  return {
    id,
    name: t.name,
    tagline: t.description,
    color: prev?.color ?? '#c9c5bd',
    ...(prev?.bg && { bg: prev.bg }),
    label: t.labelPos.map(r2),
    routes: t.shape.routes.map((r) => ({ from: r.from, to: r.to, via: r.via.map((p) => map(p).map(r2)) })),
    nodes: [...t.nodes].sort((a, b) => a.tier - b.tier || a.x - b.x).map((n) => {
      const img = n.image.split('\\').pop().replace(/^ZP_Prophecy_/, '').replace(/\.dds$/i, '').toLowerCase() + '.webp';
      if (!n.minor && !existsSync(TALENTS + img)) console.warn(`No art for ${t.name} / ${n.name} (${TALENTS}${img})`);
      return {
        id: n.index,
        name: n.name,
        desc: n.description,
        parents: n.parents,
        x: r2(n.mx),
        y: r2(n.my),
        side: n.labelSide,
        ...(n.minLevel && { level: n.minLevel }),
        ...(n.minor ? { stat: true } : existsSync(TALENTS + img) && { img }),
      };
    }),
  };
});

const head = readFileSync(OUT, 'utf8').split('export const')[0];
writeFileSync(
  OUT,
  `${head}export const PROPHECY_EXTENT = ${r2(ui.radial.extent)};\n\nexport const PROPHECY_TREES = ${JSON.stringify(trees, null, 1)};\n`,
);
console.log(`Wrote ${trees.length} trees, ${trees.reduce((s, t) => s + t.nodes.length, 0)} talents to ${OUT}`);
