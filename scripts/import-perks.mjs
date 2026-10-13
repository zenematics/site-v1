// Slims the MagicExtract perks.json from zenderal-patches down to what the
// Perks doc draws: each memory tree's stars, where they sit in the meditation
// cell, and what each one requires.
//   node scripts/import-perks.mjs [path/to/perks.json]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const src = process.argv[2] ?? '../../zenderal-patches/arch-docs/perks/perks.json';
const out = fileURLToPath(new URL('../content/zenderal/perks.json', import.meta.url));

const data = JSON.parse(readFileSync(src, 'utf8'));

// EGO ships German titles on many of its message overrides. Fall back to base
// Enderal's English title for those, but keep EGO's English renames ("Battle Mage").
const GERMAN =
  /[äöüß]|^(Hüter|Klingentänzer|Elementarist|Sinistr?op|Thaumaturg|Vandale|Gauner|Vagabund|Lycantrop):|: (Fokus|Schatten|Eiserne|Klingentanz|Blutrausch|Arktiswind|Blattschuss|Kehlenschnitt|Krieger|Taschendieb|Blitzpulver|Geisterlauf|Psionischer|Seele|Archaische|Auge des|Feuerpfeil|Sternlings|Netz der|Entgiftung|Tragbares)/;
// Typos in the winning in-game titles.
const TYPOS = { 'Splintet Limbs': 'Splinted Limbs' };
const title = (p) => {
  const name = p.tree === 'root' || (p.nameInBaseEnderal && GERMAN.test(p.name)) ? p.nameInBaseEnderal : p.name;
  // "Keeper: Iron Will" → "Iron Will"; the tree is already the heading.
  const short = name.replace(/^[^:]+:\s*/, '');
  return TYPOS[short] ?? short;
};

const clean = (s) => s?.replace(/%%/g, '%').replace(/\r\n/g, '\n').trim() || undefined;

// Every rank's PERK → the star that teaches it.
const starOf = new Map();
data.perks.forEach((p) => p.rankDetails.forEach((r) => starOf.set(r.perk.formKey, { star: p, rank: r.rank })));
const ref = (x) => {
  const { star, rank } = starOf.get(x.formKey);
  return rank > 1 ? { id: star.star.refFormKey, rank } : { id: star.star.refFormKey };
};

const node = (p) => ({
  id: p.star.refFormKey,
  name: title(p),
  kind: p.kind,
  cost: p.rankDetails.reduce((n, r) => n + r.memoryPointCost, 0),
  ranks: p.ranks,
  desc: clean(p.description),
  allOf: p.prerequisites.allOf?.map(ref),
  anyOf: p.prerequisites.anyOf?.map((group) => group.map(ref)),
  ...(p.tree === 'root' ? { root: true } : p.countsTowardTreePoints ? {} : { noTreePoints: true }),
});

// The stars stand on the walls around the meditation cell. Look at each tree
// from the middle of the room: "right" is the wall's horizontal tangent, up is z.
const all = data.perks.map((p) => p.star.position);
const room = [0, 1].map((k) => all.reduce((n, p) => n + p[k], 0) / all.length);

const roots = data.perks.filter((p) => p.tree === 'root');
const trees = data.trees
  .filter((t) => t.code !== 'root')
  .map((t) => {
    const stars = data.perks.filter((p) => p.tree === t.code);
    const mid = [0, 1].map((k) => stars.reduce((n, p) => n + p.star.position[k], 0) / stars.length);
    const out = [mid[0] - room[0], mid[1] - room[1]];
    const len = Math.hypot(...out);
    const right = [out[1] / len, -out[0] / len];
    const raw = stars.map((p) => {
      const [x, y, z] = p.star.position;
      return { p, u: (x - mid[0]) * right[0] + (y - mid[1]) * right[1], z };
    });

    // The class root talent the tree grows from sits just below its first star.
    const ids = new Set(stars.map((p) => p.star.refFormKey));
    const rootIds = new Set(stars.flatMap((p) => p.prerequisites.allOf ?? []).map((x) => ref(x).id).filter((id) => !ids.has(id)));
    const zs = raw.map((r) => r.z);
    const [z0, z1] = [Math.min(...zs), Math.max(...zs)];
    for (const root of roots.filter((r) => rootIds.has(r.star.refFormKey))) {
      const children = raw.filter((r) => r.p.prerequisites.allOf?.some((x) => ref(x).id === root.star.refFormKey));
      raw.push({ p: root, u: children.reduce((n, r) => n + r.u, 0) / children.length, z: z0 - (z1 - z0) * 0.14 });
    }

    // Normalise to 0–1 (y down), each axis on its own: the walls are tall and narrow.
    const us = raw.map((r) => r.u);
    const [u0, u1] = [Math.min(...us), Math.max(...us)];
    const zMin = Math.min(...raw.map((r) => r.z));
    const round = (n) => Math.round(n * 1000) / 1000;
    const perks = raw
      .map(({ p, u, z }) => ({ ...node(p), x: round((u - u0) / (u1 - u0)), y: round(1 - (z - zMin) / (z1 - zMin)) }))
      .sort((a, b) => b.y - a.y || a.x - b.x);

    return { code: t.code, name: t.displayName, forgottenStoriesOnly: t.forgottenStoriesOnly, perks };
  });

// One perk per line so re-imports diff cleanly.
const tree = ({ perks, ...t }) =>
  `${JSON.stringify(t).slice(0, -1)},"perks":[\n${perks.map((p) => JSON.stringify(p)).join(',\n')}\n]}`;
writeFileSync(out, `{"profile":${JSON.stringify(data.profile)},"trees":[\n${trees.map(tree).join(',\n')}\n]}\n`);
console.log(`Wrote ${trees.length} trees, ${trees.reduce((n, t) => n + t.perks.length, 0)} stars to ${out}`);
