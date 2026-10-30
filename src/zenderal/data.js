export const DOCS = [
  { id: 'readme', title: 'Readme', group: 'Getting Started' },
  { id: 'dlss', title: 'DLSS & Frame Gen', group: 'Help' },
  { id: 'performance', title: 'Performance', group: 'Help' },
  { id: 'faq', title: 'FAQ', group: 'Help' },
];

export const GROUPS = ['Getting Started', 'Help'];

export const FAQ = [
  { q: 'Do I need Nexus Premium?', a: 'No. Without Premium, Wabbajack opens each download page and you click through them manually. Premium makes it fully automatic.' },
  { q: 'Can I add my own mods?', a: "Not during beta. Adding or removing mods is unsupported and bug reports from modified installs can't be investigated." },
  { q: 'The game crashes on startup.', a: 'Make sure Enderal SE has been launched once through Steam, then always start the game from Mod Organizer 2 using the provided launcher.' },
  { q: "DLSS or frame generation isn't working.", a: 'Check that your NVIDIA driver is up to date, hardware-accelerated GPU scheduling is on and the NVIDIA App isn\'t overriding DLSS for the game. The full checklist and fixes for common errors are on the', link: { doc: 'dlss', label: 'DLSS & Frame Gen page' } },
  { q: 'Will my saves survive updates?', a: 'Not guaranteed during beta. Each update notes whether a new game is required.' },
  { q: 'Where do I report bugs?', a: 'In the Zenderal beta channel on Discord — include your crash log if you have one.' },
];

// Controller layout from the Complete Controller Setup infographic. Each layer
// relabels the pad: `hold` is the button kept down for that layer. Per button,
// `in` lists its inputs ([how, action, keyboard equivalent]); `cat` matches the
// keyboard page's colours (src/zenderal/guide/data.js KEY_CATS).
export const PAD_LAYERS = [
  { id: 'play', label: 'Gameplay', desc: 'Out of menus, in the world.' },
  { id: 'b', label: 'Hold B', hold: 'B', desc: 'Hold B, then press a second button to open a menu.' },
  { id: 'a', label: 'Hold A', hold: 'A', desc: 'Hold A, then press LB.' },
  { id: 'wheel', label: 'Wheeler open', desc: 'While the item wheel is open (press X).' },
];

export const PAD = {
  play: {
    LT: { cat: 'combat', in: [['Press', 'Dual-wield parry', 'Mouse 5']] },
    LB: { cat: 'combat', in: [['Press', 'Left attack / block', 'Right click']] },
    RT: { cat: 'combat', in: [['Press', 'Power attack', 'Mouse 4']] },
    RB: { cat: 'combat', in: [['Press', 'Right attack', 'Left click']] },
    LS: { cat: 'move', in: [['Click', 'Sneak', 'Left Ctrl']] },
    RS: { cat: 'combat', in: [['Click', 'Lock on to target', 'Middle click'], ['Hold', 'Change POV', 'Z']] },
    A: { cat: 'move', in: [['Press', 'Activate / interact', 'E']] },
    B: {
      cat: 'combat',
      in: [['Press', 'Dodge', 'Left Alt or tap Left Shift'], ['Hold', 'Sprint', 'Left Shift']],
      note: 'Also the modifier for the menu combos: see Hold B.',
    },
    X: { cat: 'combat', in: [['Press', 'Open Wheeler', 'Q']] },
    Y: { cat: 'move', in: [['Press', 'Jump', 'Space']] },
    Up: { cat: 'combat', in: [['Hold', 'High stance', 'F1']] },
    Down: { cat: 'combat', in: [['Hold', 'Low stance', 'F3']] },
    Left: { cat: 'combat', in: [['Hold', 'Neutral stance', 'F4'], ['Double tap', 'Quick light']] },
    Right: { cat: 'combat', in: [['Hold', 'Mid stance', 'F2'], ['Double tap', 'Call horse']] },
  },
  b: {
    Up: { cat: 'menu', in: [['B +', 'Hero menu', 'H']] },
    Down: { cat: 'menu', in: [['B +', 'Map', 'M']] },
    Left: { cat: 'menu', in: [['B +', 'Magic', 'Tab, then Magic']] },
    Right: { cat: 'menu', in: [['B +', 'Items', 'I']] },
    LS: { cat: 'move', in: [['B +', 'Auto-move', '.']] },
    View: { cat: 'menu', in: [['B +', 'Tween menu', 'Tab']] },
    Menu: { cat: 'menu', in: [['B +', 'Favourites menu', 'F']] },
  },
  a: {
    LB: { cat: 'combat', in: [['A +', 'Sheathe / unsheathe', 'R']] },
  },
  wheel: {
    LB: { cat: 'mod', in: [['Press', 'Left equip (remove)']] },
    RB: { cat: 'mod', in: [['Press', 'Right equip (add)']] },
    LT: { cat: 'mod', in: [['Press', 'Previous wheel', 'G']] },
    RT: { cat: 'mod', in: [['Press', 'Next wheel', 'E']] },
    A: { cat: 'mod', in: [['Press', 'Add item slot', 'M']] },
    Y: { cat: 'mod', in: [['Press', 'Add wheel', 'N']] },
    LS: { cat: 'mod', in: [['Click', 'Move wheel back']] },
    RS: { cat: 'mod', in: [['Click', 'Move wheel forward']] },
    Up: { cat: 'mod', in: [['Press', 'Move item slot back']] },
    Down: { cat: 'mod', in: [['Press', 'Move item slot forward']] },
    Left: { cat: 'mod', in: [['Press', 'Previous item']] },
    Right: { cat: 'mod', in: [['Press', 'Next item']] },
  },
};

// Overview page (/zenderal/).
export const OVERVIEW = {
  // "What Zenderal is", under the hero (WD-111): a crossroads (`art`, parallax layers under uploads/zenderal/) whose two roads are
  // the choice between first-time players (what Enderal is) and players who know it (what Zenderal changes).
  // Each side's `road` is where its road disappears (percent of the art), which the scene leans and zooms
  // towards; `kicker`, `label` and `take` (else `title`) are its sign. Taking a road opens its `panels`: pictures (`art`, under
  // uploads/, with an optional `focus` object-position to keep the subject centred) with a title and a short paragraph, kept brief because the pictures do the work. `links` are
  // { guide: id }, { doc: id } or { href } (another site, opened in a new tab) with a `label`.
  welcome: {
    label: 'What Zenderal is',
    title: 'A Modern Enderal Modlist',
    text: 'Whether this is your first trip to Vyn or your fifth, Zenderal delivers a modern combat, graphics and gameplay experience that enables rich build crafting, while introducing new players to the world of Enderal.',
    art: 'layers/crossroads',
    back: 'Back to the crossroads',
    // A panel with `road` ends its row by switching to the other road's panels.
    newcomers: {
      kicker: 'First time in Vyn',
      label: 'New to Enderal?',
      road: { x: 31, y: 62 },
      title: 'Welcome to Vyn',
      panels: [
        { title: 'A new world', art: 'zenderal/screenshots/backgrounds/crystal-forest.webp', text: "Enderal is SureAI's free total conversion for Skyrim: a whole new game on its engine, with its own continent, creatures, soundtrack and fully voiced story. You don't need to know Skyrim to play it, and nothing from Tamriel carries over.", links: [{ href: 'https://sureai.net/games/enderal/', label: 'Enderal by SureAI' }] },
        { title: 'The setting', art: 'zenderal/screenshots/backgrounds/meeting.webp', focus: '38% 50%', text: "Vyn is ruled by the Holy Order and its Lightborn priests, built on the ruins of older civilisations. Whispers of the Cleansing, the catastrophe that ended them, are spreading again. You arrive as a stowaway, haunted by nightmares you can't explain.", links: [{ href: 'https://wiki.en.sureai.net/Lore:Enderal', label: 'Read the lore' }] },
        { title: 'Races', art: 'zenderal/screenshots/backgrounds/races-collage.webp', text: 'Five cultures, from the steppes of Arazeal to the Starlings. Each sets your starting Health, Mana and Stamina and how fast they regenerate, and gives a cultural bonus to a few skills. It nudges a build without locking you in.', links: [{ guide: 'races', label: 'Races' }] },
        { title: 'New mechanics', art: 'zenderal/screenshots/backgrounds/sun-temple.webp', text: 'Magic has a price: Arcane Fever builds as you lean on it, and at 100% it kills you, so it has to be kept in check. Food and rest matter more than in Skyrim, and your companions have their own pasts and opinions, with bonds that grow from how you treat them.' },
        { title: 'Progression', art: 'zenderal/screenshots/backgrounds/perks.webp', text: "Skills don't level by use. Experience earns Learning Points for the combat and magic skills and Crafting Points for the crafting ones, and the books you read, from Apprentice to Master, cap how far each can go. Perk trees take Memory Points, and the trees you invest in unlock affinities: 44 bonus profiles that reward a focused build.", links: [{ guide: 'books', label: 'Learning books' }, { guide: 'perks', label: 'Perk trees' }, { guide: 'affinities', label: 'Affinities' }] },
        { title: 'The story', art: 'zenderal/screenshots/backgrounds/calia-wide.webp', focus: '42% 50%', text: "The story is Enderal's heart: dark, personal and psychological, about fate, memory and what drives people. Its characters, from your companion Jespar onwards, have their own doubts and secrets, and the main quest has more than one ending." },
        { title: 'What Zenderal changes', art: 'zenderal/screenshots/backgrounds/combat.webp', text: 'Played Enderal before, or know the basics now? See what Zenderal adds on top: visuals, combat, magic, firearms, traits and Prophecy.', road: 'veterans' },
      ],
    },
    veterans: {
      kicker: 'Back for more',
      label: 'What Zenderal changes',
      take: 'Played Enderal before',
      road: { x: 82, y: 60 },
      title: 'What Zenderal changes',
      panels: [
        { title: 'Visuals', art: 'zenderal/screenshots/before-and-after/after.webp', text: 'Community Shaders rebuilds the lighting, shadows, water and weather, and improved textures sharpen Vyn up close. DLSS 5 upscaling and frame generation keep it running smoothly on supported cards.', links: [{ doc: 'performance', label: 'Performance' }] },
        { title: 'Combat', art: 'zenderal/screenshots/backgrounds/warrior.webp', text: 'Modern Combat Overhaul and For Honor Reforged turn melee into duels. Attacks come from a direction, every move cancels into the next, and poise decides who staggers. Back + attack parries, back + power attack breaks a guard, and a tap of Left Shift dodges out of a swing.', links: [{ guide: 'combat', label: 'Combat' }] },
        { title: 'Magic', art: 'zenderal/screenshots/backgrounds/mage-cast-lightning.webp', text: "Hundreds of new tome-taught spells: Apocalypse's 175 across all five schools, Triumvirate's 75 built around five mage archetypes, and KataPUMB's ranked spell lines. They're sold by spell vendors across Vyn, and fitted into Enderal's schools and tiers.", links: [{ guide: 'magic', label: 'Magic' }] },
        { title: 'Firearms', art: 'zenderal/screenshots/backgrounds/musket.webp', text: 'Eight pistols and fourteen muskets, scaling with Archery and crafted at the forge, with their own ammunition.', links: [{ guide: 'firearms', label: 'Firearms' }] },
        { title: 'Traits', art: 'zenderal/screenshots/backgrounds/traits.webp', text: 'Pick up to two of 27 traits at the start, through Biggie Traits: 18 made for Zenderal and 9 from Zen Traits. Every trait has an upside and a downside, so it shapes a build rather than just adding to it.', links: [{ guide: 'traits', label: 'Traits' }] },
        { title: 'Prophecy', art: 'guide/prophecy/trees/radial.webp', text: "Eleven Prophecy talent trees sit on top of Enderal's perk trees, each built around a playstyle, from Faith and Necromancy to Firearms and Martial Arts. Plan a build on the interactive map before you play.", links: [{ guide: 'prophecy', label: 'Prophecy' }] },
        { title: 'New to Enderal?', art: 'zenderal/screenshots/backgrounds/ark.webp', text: "Never set foot in Vyn, or want a refresher? Start with the world, its people, how it plays and its story.", road: 'newcomers' },
      ],
    },
  },
  // The before/after wipe under the intro: the same view in base Enderal and in Zenderal.
  compare: {
    label: 'Modern visuals',
    title: 'The same world, seen anew.',
    text: 'Community Shaders lighting, shadows, water and weather, with a cinematic grade on top. Scroll to see the change.',
    before: { src: 'screenshots/before-and-after/before.webp', label: 'Enderal' },
    after: { src: 'screenshots/before-and-after/after.webp', label: 'Zenderal' },
  },
  // The gameplay loops under the before/after: short muted clips that play while on screen.
  // `video` is a path under public/uploads/zenderal/ without the extension; each needs a .webm
  // and an .mp4. `placeholder` shows the clip letterboxed (the logo video stands in until the
  // real footage is recorded, into clips/<name>.webm/.mp4). `guide` links the tile to a guide section.
  combat: {
    label: 'Modern combat',
    title: 'Every fight is a duel.',
    text: 'For Honor Reforged turns melee into directional, poise-driven duels, with parries, guard breaks and follow-ups. Firearms and spell packs round it out.',
    clips: [
      { title: 'Combos and power attacks', text: 'Every move cancels into the next. Chain lights into directional power attacks for more damage and poise damage.', video: 'clips/combos', guide: 'combat' },
      { title: 'Knockdown and parry', text: 'Back + attack hits through their swing and knocks them down if their poise breaks.', video: 'clips/parry', guide: 'combat' },
      { title: 'First person overhaul', text: 'Fight from your own eyes, with reworked first-person animations and a full body under the camera.', video: 'clips/first-person', guide: 'keybindings' },
      { title: 'Dodge', text: 'Tap Left Shift or press Left Alt to dodge out of a swing.', video: 'clips/dodge', guide: 'keybindings' },
    ],
  },
  // Placeholder until the firearms clips are recorded.
  firearms: {
    label: 'Firearms',
    title: 'Powder and steel.',
    text: 'Flintlock pistols and muskets, scaled by Archery and crafted at the forge, from old matchlocks to double-barrel Gewehrs.',
    clips: [
      { title: 'Pistols', text: 'A shot at close range, quick to draw between swings.', video: 'logo-grow', placeholder: true, guide: 'firearms' },
      { title: 'Muskets', text: 'Heavy, slow to reload and devastating when they land.', video: 'logo-grow', placeholder: true, guide: 'firearms' },
    ],
  },
  // The build-crafting section: the in-game perk screen zooms into its stone circle, which opens
  // into the Prophecy radial map. `links` point at guide sections.
  // `stages` are the chapter rail's steps, lit in turn as the section plays: the perk screen, the trait ring
  // round its stone circle, then the Prophecy map. `traits` are the ones the ring stops on (by name, from the
  // guide's TRAITS), in order; the rest fill the ring.
  build: {
    label: 'Rich build crafting',
    title: 'Build it your way.',
    stages: [
      { title: 'Perk trees', text: 'Every skill has its own memory tree. Unlock its stars with Memory Points in the meditation space, choosing the ones your build needs.' },
      { title: 'Traits', text: 'Pick a trait at the start: 27 to choose from, 18 of them made for Zenderal, each with an upside and a downside to build around.' },
      { title: 'Prophecy', text: 'Eleven Prophecy talent trees sit on top, each built around a playstyle. Plan your build before you play.' },
    ],
    traits: ['Overcharged', 'Cornered Wolf', 'Gravecaller', 'Gunslinger', 'Nightwalker'],
  },
};
