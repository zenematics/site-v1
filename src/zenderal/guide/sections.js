// The gameplay guide's sections. Kept apart from data.js (no Vite-only code) so
// scripts/gen-guide-pages.mjs can import it.

// Each section is its own page at /zenderal/guide/<id>/; `npm run gen:guide` writes their
// HTML (title and link-preview tags from `title` and `desc`). `desc` also fills the
// guide overview's cards and the page header, and `img` (under public/uploads/) is its card art;
// cards without one show the emblem as a placeholder. `bg` (in
// zenderal/screenshots/backgrounds/) and `bgPos` set the page's header shot (default: the Jespar shot).
export const SECTIONS = [
  { id: 'races', title: 'Races', group: 'Character', desc: 'The five cultures, their starting stats, regeneration and cultural bonuses.' },
  { id: 'affinities', title: 'Affinities', group: 'Character', img: 'zenderal/screenshots/backgrounds/affinities.webp', bg: 'affinities.webp', bgPos: 'center max(-2.7vw, 100%)', desc: 'What each affinity does and which skill trees unlock it.' },
  { id: 'books', title: 'Learning Books', group: 'Character', desc: 'How Learning and Crafting Points are spent, and what each book tier caps.' },
  { id: 'perks', title: 'Perk Trees', group: 'Character', desc: 'Every skill tree as its constellation, with each perk and its requirements.' },
  { id: 'prophecy', title: 'Prophecy Talents', group: 'Character', img: 'guide/prophecy/trees/radial.webp', desc: 'Seven talent trees, each built around a playstyle, with a build planner.' },
  { id: 'traits', title: 'Traits', group: 'Character', img: 'zenderal/screenshots/backgrounds/traits.webp', bg: 'traits.webp', desc: 'An upside and a downside each, chosen at the start and built around.' },
  { id: 'combat', title: 'For Honor Reforged', group: 'Combat', img: 'zenderal/screenshots/backgrounds/castle.webp', bg: 'castle.webp', desc: 'For Honor Reforged melee: timing, positioning, poise and status effects.' },
  { id: 'firearms', title: 'Firearms', group: 'Combat', img: 'zenderal/screenshots/backgrounds/musket.webp', bg: 'musket.webp', desc: 'Pistols and rifles: damage, how Archery scales them, and their recipes.' },
  { id: 'magic', title: 'Magic & Spell Packs', group: 'Combat', img: 'zenderal/screenshots/backgrounds/mage.webp', bg: 'mage.webp', bgPos: 'center 0%', desc: 'The spell packs, every tome-taught spell and the vendors that sell them.' },
  { id: 'armor-sets', title: 'Armor Sets', group: 'Gear', img: 'zenderal/screenshots/backgrounds/armor.webp', bg: 'armor.webp', bgPos: 'center 25%', desc: 'Heavy, light and mage sets, their pieces and their set bonuses.' },
  { id: 'keybindings', title: 'Keybindings', group: 'Controls', desc: 'The keyboard and mouse layout, on a map you can hover or tap.' },
  { id: 'controller', title: 'Controller Support', group: 'Controls', desc: 'Play on a controller out of the box, with the full button layout.' },
];

// Old section ids (and the folded-in Spells page), so links made before the rename still land.
export const SECTION_ALIASES = { race: 'races', armor: 'armor-sets', keys: 'keybindings', spells: 'magic' };

export const SECTION_GROUPS = ['Character', 'Combat', 'Gear', 'Controls'];
