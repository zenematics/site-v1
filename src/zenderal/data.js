export const DOCS = [
  { id: 'readme', title: 'Readme', group: 'Getting Started' },
  { id: 'controller', title: 'Controller Support', group: 'Playing' },
  { id: 'quests', title: 'Quest Guides', group: 'Playing' },
  { id: 'faq', title: 'FAQ', group: 'Help' },
];

export const GROUPS = ['Getting Started', 'Playing', 'Help'];

export const CONTROLLER_SETUP = [
  'Xbox and PlayStation controllers work out of the box.',
  'If inputs double up, disable Steam Input for Enderal SE.',
  'Enable Gamepad in the in-game Controls menu.',
];

export const FAQ = [
  { q: 'Do I need Nexus Premium?', a: 'No. Without Premium, Wabbajack opens each download page and you click through them manually. Premium makes it fully automatic.' },
  { q: 'Can I add my own mods?', a: "Not during alpha. Adding or removing mods is unsupported and bug reports from modified installs can't be investigated." },
  { q: 'The game crashes on startup.', a: 'Make sure Enderal SE has been launched once through Steam, then always start the game from Mod Organizer 2 using the provided launcher.' },
  { q: 'Will my saves survive updates?', a: 'Not guaranteed during alpha. Each update notes whether a new game is required.' },
  { q: 'Where do I report bugs?', a: 'In the Zenderal alpha channel on Discord — include your crash log if you have one.' },
];
