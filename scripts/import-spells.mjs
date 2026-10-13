// Slims the MagicExtract spells.json from zenderal-patches down to the
// player-learnable spells (those taught by a spell tome) for the Spells doc.
//   node scripts/import-spells.mjs [path/to/spells.json]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const src = process.argv[2] ?? '../../zenderal-patches/arch-docs/magic/data/spells.json';
const out = fileURLToPath(new URL('../content/zenderal/spells.json', import.meta.url));

// Plugin that first defined the record → the source shown in the filter.
function sourceOf(plugin) {
  if (/^(Skyrim|Update|Enderal - Forgotten Stories)\.esm$|^Enderal SE - Bug Fixes/.test(plugin)) return 'Enderal';
  if (/^Apocalypse/.test(plugin)) return 'Apocalypse';
  if (/^Triumvirate/.test(plugin)) return 'Triumvirate';
  if (/KataPUMB/.test(plugin)) return 'KataPUMB Spell Pack';
  if (/^Enderal SE - Gameplay Overhaul|^EGO/.test(plugin)) return 'EGO';
  return plugin.replace(/\.(esp|esm|esl)$/i, '');
}

// "<Teleport> to aimed location. (max <24>ft)" — the angle brackets mark
// highlighted values in-game.
const clean = (s) => s?.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim() || undefined;

const { records } = JSON.parse(readFileSync(src, 'utf8'));
const spells = records
  // EGO retires some vanilla spells by renaming them ">Fireball (Rank I)" etc.
  .filter((r) => r.name && !r.name.startsWith('>') && r.taughtBy?.length)
  .map((r) => ({
    id: r.formKey,
    name: r.name,
    school: r.school?.displayName ?? '',
    source: sourceOf(r.provenance.definedIn),
    plugin: r.provenance.definedIn,
    cost: r.cost.baseCost,
    cast: r.castType,
    target: r.targetType,
    desc: clean(r.description),
    // Arcane Fever rides along on nearly every Enderal spell, so it's just noise here.
    effects: [...new Set(r.effects.map((e) => e.baseEffect?.name))].filter((n) => n && n !== 'Arcane Fever'),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// One spell per line so re-imports diff cleanly.
writeFileSync(out, `[\n${spells.map((s) => JSON.stringify(s)).join(',\n')}\n]\n`);
console.log(`Wrote ${spells.length} spells to ${out}`);
