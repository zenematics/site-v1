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

// Overview page (/zenderal/). `body` and `facts` sit under the lede in the intro.
export const OVERVIEW = {
  headline: 'Enderal, rebuilt for today.',
  lede: "Zenderal's goal is to deliver a modern combat, graphics and gameplay experience that enables rich build crafting, while introducing new players to the world of Enderal.",
  body: "It's built on Enderal: Forgotten Stories, SureAI's total conversion for Skyrim, and keeps its story, quests and world as they were made. Around them it brings combat, visuals and character systems up to date, and tunes everything to work together, so you can start a new journey without spending weeks on a load order.",
  facts: [
    { label: 'One-click install', text: 'Wabbajack downloads, patches and sets up the whole list for you.' },
    { label: 'Current visuals', text: 'Community Shaders lighting and weather, with DLSS and frame generation support.' },
    { label: 'Keyboard or controller', text: 'A full controller layout, so every action works on both.' },
    { label: 'In beta', text: 'Playable now and changing fast. Feedback goes through Discord.' },
  ],
  // "New to Enderal" under the intro: a switch between first-time players (a first-hour path) and
  // players who know Enderal (what Zenderal changes), each over its own `art` (under uploads/zenderal/).
  // `label` is the switch's text. Links are { guide: id } or { doc: id }.
  welcome: {
    label: 'New to Enderal',
    title: 'Made for first-timers and veterans.',
    text: "Whether this is your first trip to Vyn or your fifth, here's where to start.",
    newcomers: {
      label: 'New to Enderal',
      art: 'screenshots/backgrounds/ark-with-jespar.webp',
      title: 'Your first hour',
      text: "Enderal is SureAI's free total conversion for Skyrim, with its own world and story. You don't need to know Skyrim to play it.",
      steps: [
        { doc: 'readme', title: 'Install', text: 'Wabbajack downloads and sets up the whole list. Read the readme first.' },
        { guide: 'races', title: 'Pick your culture', text: 'Five cultures, each with its own starting stats and bonuses.' },
        { guide: 'traits', title: 'Choose a trait', text: 'An upside and a downside, picked at the start and built around.' },
        { guide: 'combat', title: 'Learn to fight', text: 'Directional melee: parries, guard breaks and poise.' },
        { guide: 'books', title: 'Grow your skills', text: 'Spend Learning and Crafting Points, capped by the books you read.' },
      ],
    },
    veterans: {
      label: 'Played Enderal before',
      art: 'screenshots/backgrounds/warrior.webp',
      title: 'What Zenderal changes',
      text: 'The story, quests and world are as SureAI made them. Around them:',
      changes: [
        { guide: 'combat', area: 'Combat', text: 'For Honor Reforged: directional, poise-driven duels.' },
        { guide: 'prophecy', area: 'Prophecy', text: 'Eleven talent trees on top of the perk trees, with a build planner.' },
        { doc: 'performance', area: 'Visuals', text: 'Community Shaders lighting, shadows, water and weather, with DLSS and frame generation.' },
        { guide: 'firearms', area: 'Arsenal', text: 'Pistols and muskets, new spell packs and armor sets with set bonuses.' },
        { guide: 'controller', area: 'Controls', text: 'Full controller support, with every action on the pad.' },
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
      { title: 'Parry', text: 'Back + attack hits through their swing and knocks them down if their poise breaks.', video: 'logo-grow', placeholder: true, guide: 'combat' },
      { title: 'Guard break', text: 'Back + power attack slides a raised guard and opens a follow-up.', video: 'logo-grow', placeholder: true, guide: 'combat' },
      { title: 'Poise and stumbles', text: 'Chip their poise away, then punish the stumble.', video: 'logo-grow', placeholder: true, guide: 'combat' },
      { title: 'Firearms', text: 'Pistols and muskets that scale with Archery.', video: 'logo-grow', placeholder: true, guide: 'firearms' },
    ],
  },
  // The build-crafting section: the in-game perk screen zooms into its stone circle, which opens
  // into the Prophecy radial map. `links` point at guide sections.
  build: {
    label: 'Rich build crafting',
    title: 'Build it your way.',
    text: 'Perk trees for every skill, then eleven Prophecy talent trees on top, each built around a playstyle.',
    links: [
      { guide: 'perks', title: 'Perk trees' },
      { guide: 'prophecy', title: 'Prophecy planner' },
    ],
  },
  // The link cards under the intro, in groups. Each points at a guide section ({ guide: id })
  // or a doc ({ doc: id }).
  explore: [
    {
      label: 'Get set up',
      links: [
        { doc: 'readme', title: 'Readme', text: 'Requirements, install steps and updates. Read it before you install.' },
        { doc: 'dlss', title: 'DLSS & Frame Gen', text: 'Set up upscaling and frame generation, and fix the common errors.' },
        { guide: 'keybindings', title: 'Keybindings', text: 'The keyboard and mouse layout, on a map you can hover or tap.' },
        { guide: 'controller', title: 'Controller Support', text: 'Play on a controller out of the box, with the full button layout.' },
      ],
    },
    {
      label: 'Learn the game',
      links: [
        { guide: 'races', title: 'Character', text: 'The five cultures, their stats and bonuses, and where a build starts.' },
        { guide: 'combat', title: 'Combat', text: 'For Honor Reforged melee: timing, positioning and poise.' },
        { guide: 'traits', title: 'Traits', text: 'An upside and a downside each, chosen at the start and built around.' },
        { guide: 'prophecy', title: 'Prophecy', text: 'Seven talent trees, each built around a playstyle, with a build planner.' },
      ],
    },
  ],
};
