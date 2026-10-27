export const DOCS = [
  { id: 'readme', title: 'Readme', group: 'Getting Started' },
  { id: 'dlss', title: 'DLSS & Frame Gen', group: 'Help' },
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
    Left: { cat: 'menu', in: [['B +', 'Magic', 'P']] },
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
