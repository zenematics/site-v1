// Data for the Zenderal gameplay guide (/zenderal/guide/). Numbers come from the
// list's winning plugin records (zenderal-patches reference YAML and the installed
// .esp files), so they describe Zenderal, not vanilla Enderal.

export const SECTIONS = [
  { id: 'race', title: 'Races', group: 'Character' },
  { id: 'affinities', title: 'Affinities', group: 'Character' },
  { id: 'books', title: 'Learning Books', group: 'Character' },
  { id: 'perks', title: 'Perk Trees', group: 'Character' },
  { id: 'combat', title: 'For Honor Reforged', group: 'Combat' },
  { id: 'firearms', title: 'Firearms', group: 'Combat' },
  { id: 'magic', title: 'Magic & Spell Packs', group: 'Combat' },
  { id: 'spells', title: 'Spells', group: 'Combat' },
  { id: 'armor', title: 'Armor Sets', group: 'Gear' },
  { id: 'keys', title: 'Keybindings', group: 'Controls' },
];

export const SECTION_GROUPS = ['Character', 'Combat', 'Gear', 'Controls'];

// ---------------------------------------------------------------- Races
// Starting attributes and regen from `EGO SE - DS Movement Stamina UNIQUE RACES.esp`
// (Half Starling from `Zenderal - Half Starling DS Races.esp`); regen is % of the
// maximum per second. Cultural bonuses are the FS racial abilities as EGO and
// `EGO SE - Half Starling.esp` leave them.
export const RACES = [
  {
    id: 'arazealean',
    name: 'Half Arazealean',
    origin: 'Arazeal',
    flavor:
      'Originating in the barren and steppe-like continent Arazeal, the Arazealean are a divided people. While the nomadic natives in the steppes maintain their pantheistic traditions, the coastal inhabitants regard them as primitive and struggle for recognition as a fully-fledged part of the civilized world.',
    bonus: { name: 'Call of the Steppe', text: 'One-Handed, Two-Handed and Handicraft +2, Health +5.' },
    start: { health: 125, mana: 30, stamina: 180 },
    regen: { health: 0.35, mana: 3, stamina: 10 },
    carry: 130,
    role: 'Melee and crafting. The biggest health and stamina pools, the slowest mana.',
  },
  {
    id: 'kilean',
    name: 'Half Kiléan',
    origin: 'Kilé',
    flavor:
      'As a secluded people, the inhabitants of the "Belt of Kilé" are said to have a reclusive mind. Kiléans are deemed blessed businessmen, a rumor that can be ascribed to the "Blue Island Coalition", Vyn\'s biggest trading company, which is located in Kilé.',
    bonus: { name: 'Song of the Blue Isles', text: 'Rhetoric +5, Sleight of Hand +2, carry capacity +10.' },
    start: { health: 50, mana: 50, stamina: 90 },
    regen: { health: 0.125, mana: 6.3, stamina: 30 },
    carry: 130,
    role: 'Talkers, traders and thieves. Balanced pools with quick stamina recovery.',
  },
  {
    id: 'aeterna',
    name: 'Half Aeterna',
    origin: 'Myar-Aranath',
    flavor:
      'Native to the swampy continent Myar-Aranath, the destruction of the land caused by decades of war forced many Aeterna to escape to other countries, where various destinies awaited them. Some persecuted them for their innate magic talent, some revered them for it. Many Aeterna earn their living as travelling minstrels.',
    bonus: { name: 'Blood of the First Ones', text: 'Elementalism +3, mana regeneration +2, Mana +6.' },
    start: { health: 30, mana: 125, stamina: 70 },
    regen: { health: 0.1, mana: 9, stamina: 20 },
    carry: 130,
    role: 'Casters. The deepest mana pool and fast mana regen, but fragile.',
  },
  {
    id: 'qyranian',
    name: 'Half Qyranian',
    origin: 'Qyra',
    flavor:
      'Qyranians originate from the namesake desert continent, which is said to be both barren and inhospitable. At the same time it is known as the cradle of science, mysticism and culture. While many foreign countries admire Qyra for its advanced culture, Qyranians are often deemed heretical and immoral, especially on religious continents like Enderal.',
    bonus: { name: 'Breath of the Desert', text: 'Mentalism, Alchemy and Enchanting +2, Stamina +7.' },
    start: { health: 60, mana: 75, stamina: 40 },
    regen: { health: 0.2, mana: 7.5, stamina: 50 },
    carry: 130,
    role: 'Spellblades and alchemists. Small stamina pool that refills faster than any other.',
  },
  {
    id: 'starling',
    name: 'Half Starling',
    origin: 'Added by Enderal SE - Half Starling',
    flavor:
      'The Yalam-Rashâi, known to the people of Enderal as the Starlings, are a mysterious race that appeared on Vyn after the Starfall. All Starlings feel an urge to return to the stars, to reunite with something they lost, something not even the Starlings themselves can identify.',
    bonus: { name: 'Longing for the Stars', text: 'Heavy Armor and Mentalism +2, Enchanting and Handicraft +4.' },
    start: { health: 75, mana: 75, stamina: 60 },
    regen: { health: 0.3, mana: 8, stamina: 20 },
    carry: 130,
    role: 'Armoured hybrids. Even pools, strong health regen, crafting bonuses.',
  },
];

// ---------------------------------------------------------------- Affinities
// Perk-tree display names (see content/zenderal/perks.json).
export const TREES = [
  'Keeper',
  'Blade Dancer',
  'Elementalist',
  'Infiltrator',
  'Sinistrope',
  'Thaumaturge',
  'Vandal',
  'Trickster',
  'Vagrant',
  'Phasmalist',
  'Lycanthrope',
];

// Unlock rule (`TryUnlockAffinity` in KataPUMB's _00E_Game_SkillmenuSC): 10+ memory
// points in `main` and 10+ in any one of `any`. Effects are the winning ability text
// (EGO for base and Forgotten Stories, `EGO SE - KataPUMB New Affinities.esp` for Kata).
export const AFFINITY_SOURCES = [
  { id: 'enderal', label: 'Enderal' },
  { id: 'fs', label: 'Forgotten Stories' },
  { id: 'kata', label: 'KataPUMB New Affinities' },
];

export const AFFINITIES = [
  { name: 'Battlemage', source: 'enderal', main: 'Elementalist', any: ['Blade Dancer', 'Vandal', 'Keeper'], effect: 'Two-Handed, Elementalism and Heavy Armor +6. Health and Mana +15. Killing an enemy with Shock Nova raises your spell and weapon damage by 8%, stacking up to 3 times.' },
  { name: 'Seraph', source: 'enderal', main: 'Thaumaturge', any: ['Keeper', 'Vandal'], effect: 'Light Magic, Heavy Armor and Block +7. Health and Mana +35.' },
  { name: 'Assassin', source: 'enderal', main: 'Infiltrator', any: ['Blade Dancer'], effect: 'Sneak and One-Handed +7. You move much quieter and your attacks have an extra 10% chance to critically hit.' },
  { name: 'Swashbuckler', source: 'enderal', main: 'Vagrant', any: ['Trickster'], effect: 'Stamina +20, Light Armor and Archery +7. Every fire arrow you shoot triggers a second, smaller explosion on impact.' },
  { name: 'Black Mage', source: 'enderal', main: 'Sinistrope', any: ['Elementalist'], effect: 'Mana +50, Elementalism and Entropy +10. Shock Nova absorbs part of your enemies\' Mana and Stamina.' },
  { name: 'Dark Keeper', source: 'enderal', main: 'Sinistrope', any: ['Keeper'], effect: 'Heavy Armor and Entropy +7, Health +20. Using Devour Soul briefly raises your entropy and summoned-weapon damage by 20%.' },
  { name: 'Blade Master', source: 'enderal', main: 'Blade Dancer', any: ['Vandal'], effect: 'Stamina and Health +30, One-Handed and Two-Handed +7. Melee damage permanently +5.' },
  { name: 'Blade Breaker', source: 'enderal', main: 'Blade Dancer', any: ['Keeper'], effect: 'Carry weight +30, One-Handed +7, Stamina +35, Health +25. Enemies you hit have 10% less damage resistance.' },
  { name: 'Shadow Dancer', source: 'enderal', main: 'Infiltrator', any: ['Sinistrope'], effect: 'Entropy, Sneak and Psionics +7. An enemy that dies under Psychosis is reanimated to fight for you for 90 seconds.' },
  { name: 'Arcane Archer', source: 'enderal', main: 'Trickster', any: ['Elementalist', 'Thaumaturge', 'Sinistrope'], effect: 'Archery, Elementalism and Light Magic +6. While Eye of the Storm is active every arrow fires a second, spectral arrow that paralyzes.' },

  { name: 'Spectralist', source: 'fs', main: 'Phasmalist', any: ['Sinistrope'], effect: 'Mana +20, Enchanting and Entropy +6. Your apparitions deal 20% more damage while you have a creature summoned.' },
  { name: 'Spectral Warrior', source: 'fs', main: 'Phasmalist', any: ['Vandal', 'Keeper', 'Blade Dancer'], effect: 'One-Handed, Two-Handed and Entropy +7. Combat stances also affect your apparition\'s speed or damage.' },
  { name: 'Ghostblade', source: 'fs', main: 'Phasmalist', any: ['Infiltrator', 'Trickster'], effect: 'Enchanting, Sneak and Archery +6. A successful sneak attack teleports your apparition to the target for an extra attack.' },
  { name: 'Brute', source: 'fs', main: 'Lycanthrope', any: ['Blade Dancer', 'Vandal'], effect: 'Claw damage +9. Each kill raises your damage by 5%, up to 25%; the bonus fades after 7 seconds without a kill.' },
  { name: 'Drifter', source: 'fs', main: 'Lycanthrope', any: ['Vagrant'], effect: 'Brewed chymica are more effective, and you can tolerate three at once.' },
  { name: 'Druid', source: 'fs', main: 'Lycanthrope', any: ['Elementalist'], effect: 'Brewed elemental chymica are stronger. Transforming releases a Frost Nova.' },
  { name: 'Throat Ripper', source: 'fs', main: 'Lycanthrope', any: ['Infiltrator'], effect: 'Stronger sneak attacks in wolf form, and you turn invisible on entering sneak (every 60 seconds).' },
  { name: 'Ravager', source: 'fs', main: 'Lycanthrope', any: ['Sinistrope'], effect: 'Ability: Massacre. Every hit in wolf form absorbs health for a short time; movement speed +7.' },
  { name: 'Scourge of the Woods', source: 'fs', main: 'Lycanthrope', any: ['Thaumaturge'], effect: '15% more Health and armor in wolf form. Ability: Colossus, growing briefly into a behemoth with more resistances, Stamina and Health.' },
  { name: 'Soulcaller', source: 'fs', main: 'Lycanthrope', any: ['Phasmalist'], effect: 'Alchemy and Enchanting +6. Ability: United Souls, turning your apparition into a werewolf for a while.' },

  { name: 'Acrobat', source: 'kata', main: 'Trickster', any: ['Blade Dancer'], effect: 'Stamina +30. Sleight of Hand, Archery and One-Handed +7. 10% chance to dodge incoming attacks.' },
  { name: 'Bard', source: 'kata', main: 'Vagrant', any: ['Phasmalist'], effect: 'Stamina +25. Light Armor, Enchanting and Rhetoric +8. Nearby allies won\'t flee and gain 15 Health, 5% damage and 10% damage reduction.' },
  { name: 'Berserker', source: 'kata', main: 'Vandal', any: ['Vagrant'], effect: 'Health and Stamina +15. Two-Handed and Light Armor +8. Below 50% Health you gain 60 armor and deal 10% more melee damage.' },
  { name: 'Champion', source: 'kata', main: 'Keeper', any: ['Vandal'], effect: 'Health +30. Two-Handed, Block and Heavy Armor +6. Blocking with a two-handed weapon is 10% more effective. Regenerate 1 Health out of combat.' },
  { name: 'Dragon Hunter', source: 'kata', main: 'Keeper', any: ['Trickster'], effect: 'Health and Stamina +20. Archery and Heavy Armor +8. Bow hits bleed for 1 point over 10 seconds.' },
  { name: 'Duelist', source: 'kata', main: 'Blade Dancer', any: ['Vagrant'], effect: 'Stamina +35. One-Handed and Light Armor +8. Blocking without a shield is 10% more effective; a charged shieldless bash can disarm (but deals no damage).' },
  { name: 'Enchanter', source: 'kata', main: 'Phasmalist', any: ['Elementalist', 'Thaumaturge'], effect: 'Mana +15. Elementalism and Mentalism +5, Enchanting +10. Staves are 20% stronger, and once a day you can recharge one staff.' },
  { name: 'Highlander', source: 'kata', main: 'Vandal', any: ['Trickster'], effect: 'Stamina +30. Archery and Two-Handed +8. Bow hits make the target take 25% more two-handed damage for 20 seconds (doesn\'t stack).' },
  { name: 'Lunatic', source: 'kata', main: 'Vandal', any: ['Lycanthrope'], effect: 'Stamina +40. Alchemy and Two-Handed +8. Attacks in werewolf form bleed for 1 point over 10 seconds.' },
  { name: 'Mercenary', source: 'kata', main: 'Keeper', any: ['Infiltrator'], effect: 'Stamina +20, Health +15. Heavy Armor, Sneak and Rhetoric +7. Heavy armor weighs 70% less.' },
  { name: 'Monk', source: 'kata', main: 'Infiltrator', any: ['Thaumaturge'], effect: 'Health, Stamina and Mana +10. Sneak, Mentalism and Light Magic +7. Unarmed attacks deal 15 more damage and knock out unaware targets.' },
  { name: 'Pack Leader', source: 'kata', main: 'Keeper', any: ['Lycanthrope'], effect: 'Health +20. Heavy Armor and Alchemy +8. Regenerate 1 Health per second in werewolf form. All wolves are friendly to you.' },
  { name: 'Poisoner', source: 'kata', main: 'Infiltrator', any: ['Vagrant'], effect: 'Stamina +25. Sleight of Hand, Sneak and Alchemy +6. Plant poisons in pockets to harm enemies silently; weapon poisons last 1 extra hit.' },
  { name: 'Rift Mage', source: 'kata', main: 'Sinistrope', any: ['Thaumaturge'], effect: 'One extra summon, but summoned creatures last 50% shorter.' },
  { name: 'Shadow Caster', source: 'kata', main: 'Elementalist', any: ['Infiltrator'], effect: 'Mana +20. Elementalism and Sneak +8. Elemental spells deal 1.75× damage to targets that haven\'t detected you.' },
  { name: 'Slayer', source: 'kata', main: 'Infiltrator', any: ['Vandal'], effect: 'Stamina +25. Sneak and Two-Handed +8. Move 5% faster. Two-handed sneak attacks deal 2.25× damage.' },
  { name: 'Soul Reaper', source: 'kata', main: 'Vandal', any: ['Sinistrope'], effect: 'Health +30, Mana +10. Entropy and Two-Handed +8. A killing blow has a 25% chance to raise the victim as a zombie.' },
  { name: 'Spell Sword', source: 'kata', main: 'Blade Dancer', any: ['Elementalist', 'Sinistrope', 'Thaumaturge'], effect: 'Stamina and Mana +15. Below 50% Mana you deal 15% more melee damage; above 50% your spells are 15% stronger.' },
  { name: 'Spirit Guardian', source: 'kata', main: 'Phasmalist', any: ['Keeper'], effect: 'Health +20. Heavy Armor and Enchanting +8. Once a day, fully restore an ally\'s Health, Mana and Stamina.' },
  { name: 'Thief', source: 'kata', main: 'Infiltrator', any: ['Trickster'], effect: 'Stamina +30. Sneak, Sleight of Hand and Rhetoric +6. Pickpocketing coins and gems is 10% easier; 10% more gold when selling in the Undercity.' },
  { name: 'Wanderer', source: 'kata', main: 'Vagrant', any: ['Elementalist', 'Sinistrope', 'Thaumaturge'], effect: 'Mana +25. Alchemy +10, every magic school +5. 25% chance to harvest an extra ingredient.' },
  { name: 'White Mage', source: 'kata', main: 'Elementalist', any: ['Thaumaturge'], effect: 'Mana +20. Elementalism +10, Mentalism and Light Magic +5. Novice and Apprentice Mentalism and Light Magic spells cost no mana.' },
  { name: 'Witcher', source: 'kata', main: 'Vagrant', any: ['Keeper'], effect: 'Stamina +30. Light Armor, Heavy Armor and Alchemy +6. Crafted buff potions are 10% stronger, and you take 5% less damage while one is active.' },
  { name: 'Wolf Hunter', source: 'kata', main: 'Trickster', any: ['Lycanthrope'], effect: 'Stamina +30. Archery and Alchemy +8. Deal 25% more damage to targets under 25% health.' },
];

// ---------------------------------------------------------------- Learning books
export const BOOK_TIERS = [
  { tier: 'Apprentice', range: '0 – 25', learning: 15, crafting: 10 },
  { tier: 'Adept', range: '26 – 50', learning: 30, crafting: 20 },
  { tier: 'Expert', range: '51 – 75', learning: 75, crafting: 55 },
  { tier: 'Master', range: '76 – 100', learning: 200, crafting: 150 },
];

export const LEARNING_SKILLS = [
  'One-Handed', 'Two-Handed', 'Archery', 'Block', 'Light Armor', 'Heavy Armor', 'Sneak',
  'Elementalism', 'Entropy', 'Light Magic', 'Mentalism', 'Psionics',
];
export const CRAFTING_SKILLS = ['Alchemy', 'Enchanting', 'Handicraft', 'Lockpicking', 'Sleight of Hand', 'Rhetoric'];

// ---------------------------------------------------------------- Firearms
// Pistols: A Gentleman's Flintlock Armoury as reworked by Zenderal - Flintlock Overhaul.
// `shot` is the shot's magnitude (1.2 × the pistol's Damage stat), before Archery scaling.
export const PISTOLS = [
  { name: 'Flintlock Pistol', shot: 10.8, weight: 8, value: 400, recipe: '2 Iron Ingot, 2 Steel Ingot, 1 Wood, 2 Spare Parts', skill: 20 },
  { name: 'Ancient Dueling Pistol', shot: 10.8, weight: 7, value: 500, recipe: '2 Steel Ingot, 2 Corundum Ingot, 1 Wood, 2 Spare Parts', skill: 23 },
  { name: "Priest's Dueling Pistol", shot: 14.4, weight: 7, value: 700, recipe: '2 Steel Ingot, 2 Corundum Ingot, 1 Quicksilver Ingot, 1 Wood, 2 Spare Parts', skill: 28 },
  { name: "Officer's Dueling Pistol", shot: 18, weight: 7, value: 900, recipe: '2 Steel Ingot, 1 Gold Ingot, 2 Quicksilver Ingot, 1 Wood, 2 Spare Parts', skill: 33 },
  { name: "Aristocrat's Dueling Pistol", shot: 21.6, weight: 7, value: 1500, recipe: '1 Silver Ingot, 2 Shadow Steel Ingot, 2 Gold Ingot, 2 Spare Parts', skill: 40 },
  { name: 'Starling Flintlock Pistol', shot: 24, weight: 7.5, value: 2000 },
  { name: 'Guardian Flintlock Pistol', shot: 28.8, weight: 8, value: 2500 },
  { name: "Guardian's Blunderbuss Pistol", shot: 36, weight: 8, value: 2800 },
];

// Muskets: Ordo Legionis (Muskets of the Enderal). `damage` is the weapon's base damage;
// the ball adds its own on top.
export const MUSKETS = [
  { name: 'Old Flintlock Musket', damage: 6, weight: 10, value: 250 },
  { name: 'Old Qyranian Flintlock Musket', damage: 7, weight: 10, value: 500 },
  { name: 'Kiléan Rifled Flintlock Fusil', damage: 13, weight: 8, value: 300, recipe: '1 Silver Ingot, 3 Iron Ingot, 2 Steel Ingot, 1 Wood, 1 Lube Oil', skill: 40 },
  { name: 'Trooper Flintlock Blunderbuss', damage: 16, weight: 8, value: 499, recipe: '3 Iron Ingot, 2 Steel Ingot, 1 Corundum Ingot, 1 Wood', skill: 25 },
  { name: 'Imperial Flintlock Fucile', damage: 18, weight: 9, value: 300, recipe: '3 Iron Ingot, 2 Steel Ingot, 1 Wood, 1 Lube Oil', skill: 40 },
  { name: 'Heavy Wheellock Arquebus', damage: 18, weight: 11, value: 300, recipe: '3 Iron Ingot, 1 Corundum Ingot, 1 Wood, 1 Scrap Metal of an Ancient Nation, 1 Lube Oil', skill: 40 },
  { name: 'Qyranian Matchlock Raifuru', damage: 18, weight: 8, value: 1000, recipe: '4 Steel Ingot, 1 Corundum Ingot, 1 Glowing Thorium Ingot, 1 Scrap Metal of an Ancient Nation, 1 Lube Oil', skill: 40 },
  { name: 'Wheellock Caliver', damage: 19, weight: 11, value: 450, recipe: '3 Iron Ingot, 2 Steel Ingot, 1 Wood, 1 Lube Oil', skill: 30 },
  { name: 'Nehrimese Flintlock Fucile', damage: 20, weight: 9, value: 666 },
  { name: 'Officer Flintlock Musketoon', damage: 20, weight: 8, value: 750, recipe: '3 Iron Ingot, 2 Steel Ingot, 1 Wood, 1 Lube Oil', skill: 25 },
  { name: 'Double-barrel Flintlock Gewehr', damage: 23, weight: 8, value: 1500, recipe: '4 Steel Ingot, 2 Shadow Steel Ingot, 1 Gold Ingot, 1 Wood, 1 Lube Oil', skill: 60 },
  { name: 'Double-barrel Gewehr, ivory stock', damage: 26, weight: 8, value: 3000, recipe: '1 Ivory, 4 Steel Ingot, 1 Gold Ingot, 1 Wood, 1 Metal Ingot of an Ancient Nation, 1 Lube Oil', skill: 50 },
  { name: 'Penitus Flintlock Musketoon', damage: 27, weight: 8, value: 2700, recipe: '4 Steel Ingot, 1 Gold Ingot, 1 Wood, 1 Lube Oil', skill: 35 },
  { name: 'Double-barrel Gewehr, dragonbone stock', damage: 35, weight: 8, value: 5666, recipe: '2 Dragon Bone, 3 Shadow Steel Ingot, 2 Gold Ingot, 1 Lube Oil, the ivory-stock Gewehr', skill: 75 },
];

export const AMMO = [
  { name: 'Flintlock Bullets', use: 'Pistols', damage: '—', makes: 5, recipe: '1 Iron Ingot' },
  { name: 'Musket Balls', use: 'Muskets', damage: 6, makes: 10, recipe: '2 Iron Ingot' },
  { name: 'Blunderbuss Shrapnel', use: 'Muskets', damage: 8, makes: 5, recipe: '3 Iron Ingot, 2 Steel Ingot, 1 Corundum Ingot' },
  { name: 'Minié Balls', use: 'Muskets', damage: 10, makes: 3, recipe: '1 filled Petty Soul Gem, 2 Iron Ingot, 1 Steel Ingot' },
  { name: 'Silver Musket Balls', use: 'Muskets', damage: 6, makes: 10, recipe: '1 Silver Ingot (Handicraft 40)' },
];

// ---------------------------------------------------------------- Magic
export const SPELL_TIERS = ['Novice', 'Apprentice', 'Adept', 'Expert', 'Master'];

// Where each source's tomes are sold. Apocalypse and Triumvirate stock comes from
// their Enderal patches' `<Merchant>_CustomMerchandise` hook lists.
export const SPELL_SOURCES = [
  {
    id: 'Enderal',
    label: 'Enderal',
    blurb: 'The base game\'s spells, rebalanced by EGO.',
    where: 'Random stock at Enderal\'s spell merchants, plus tomes in dungeon loot. Stock re-rolls every two in-game days.',
  },
  {
    id: 'EGO',
    label: 'EGO',
    blurb: 'Spells added by the Enderal Gameplay Overhaul.',
    where: 'Mixed into the same merchant and loot lists as Enderal\'s own tomes.',
  },
  {
    id: 'Apocalypse',
    label: 'Apocalypse',
    blurb: '175 spells across all five schools, 35 per school.',
    where: 'Every tome is always in stock at exactly one shop, by tier.',
    vendors: {
      Novice: 'Milbert Foxhand, Ark',
      Apprentice: 'Tarhutie Leklerk, Riverville',
      Adept: 'Barnabas, Undercity (Mentalism, Entropy, Elementalism) · Ora Stonehand, Ark (Psionics, Light Magic)',
      Expert: 'Torius Flameling, Sun Temple',
      Master: 'Gabrielle Emberlord, Emberlord and Fireflash, Ark',
    },
  },
  {
    id: 'Triumvirate',
    label: 'Triumvirate',
    blurb: '75 spells across five mage archetypes: Cleric, Druid, Shadow, Shaman and Warlock.',
    where: 'Each archetype has its own merchants. Novice to Adept tomes and Expert/Master tomes are sold in different places.',
    archetypes: {
      Cleric: { low: 'Court Blacksmith (Ark) · Librarian Marius (Ark) · Vexin (Riverville)', high: 'Court Blacksmith (Ark) · Librarian Marius (Ark)' },
      Druid: { low: 'Vexin (Riverville) · Shrouded Mage (Duneville) · Shrouded Mage (Frostcliff Tavern)', high: 'Librarian Marius (Ark) · Shrouded Mage (Undercity)' },
      Shadow: { low: 'Librarian Marius (Ark) · Sister Envy (Rhalata) · Fence (Undercity) · Shrouded Mage (Undercity)', high: 'Librarian Marius (Ark) · Fence (Undercity) · Shrouded Mage (Undercity)' },
      Shaman: { low: 'Akatyr Scheenhair (Duneville) · Shrouded Mage (Duneville) · Shrouded Mage (Frostcliff Tavern)', high: 'Librarian Marius (Ark) · Shrouded Mage (Undercity)' },
      Warlock: { low: 'Waif at the Bash Hole (Undercity) · Sister Envy (Rhalata) · Shrouded Mage (Undercity)', high: 'Waif at the Bash Hole (Undercity) · Shrouded Mage (Undercity)' },
    },
  },
  {
    id: 'KataPUMB Spell Pack',
    label: 'KataPUMB',
    blurb: 'Ranked spell lines (Rank I to IV) for every school.',
    where: 'Gabrielle Emberlord at Emberlord and Fireflash in Ark sells every KataPUMB tome.',
  },
  {
    id: 'xxOpenSpells',
    label: 'Open Spells',
    blurb: 'A handful of utility spells.',
    where: 'Emberlord and Fireflash (Ark), Torius Flameling (Sun Temple) and Tarhutie Leklerk (Riverville).',
  },
];

// ---------------------------------------------------------------- Armor sets
// Set bonuses are the `_<lvl>E_<type>Set_*Pieces` spells (EGO's text where it overrides
// them); pieces come from each set's `_SetList` FormList. Locations are where the
// pieces are placed in the world; most sets have several copies of a piece.
export const ARMOR_SETS = [
  {
    name: 'Rat Catcher', type: 'Heavy', level: 10,
    bonuses: ['Health +9.', 'Heavy Armor +5. Two-handed attacks deal 5% more damage.', 'Block 5% more damage with a shield. One-handed attacks deal 5% more damage.'],
    pieces: [
      { name: 'Cold Glance of the Rat Catcher', where: ['Castle Goldenford, Keep', 'Fortress Rockwatch'] },
      { name: 'Grasp of the Rat Catcher', where: ['Shimmering Grove', 'the open world'] },
      { name: 'Silent Step of the Rat Catcher', where: ['Abandoned Customs Facilities', 'the open world (Sun Coast)'] },
      { name: 'Skin of the Rat Catcher', where: ['Clearwater Cave'] },
    ],
  },
  {
    name: 'Mysterious Nomad', type: 'Mage', level: 10,
    bonuses: ['Mana +12.', 'Mentalism and Elementalism spells cost 5% less.', 'Entropy and Light Magic spells cost 5% less.'],
    pieces: [
      { name: 'Nimbus of the Mysterious Nomad', where: ["Riverville, Tannerman's House"] },
      { name: 'Veil of the Mysterious Nomad', where: ['Old Cemetery Crypt'] },
      { name: 'Garb of the Mysterious Nomad', where: ['Old Borderwatch'] },
      { name: 'Footfalls of the Mysterious Nomad', where: ['Deserted Ruin', 'Old Tunnel'] },
    ],
  },
  {
    name: 'Swashbuckler', type: 'Light', level: 10,
    bonuses: ['Light Armor +5, Stamina +5.', 'Sneak is 5% more effective, lockpicking 5% easier.', 'Bows and one-handed attacks deal 5% more damage.'],
    pieces: [
      { name: 'Glance of the Swashbuckler', where: ['Abandoned Customs Facilities', "the open world (Sullevan's estate)"] },
      { name: 'Heart of the Swashbuckler', where: ['Ark, Crypt'] },
      { name: 'Fists of the Swashbuckler', where: ['Abandoned Customs Facilities', 'the open world'] },
      { name: 'Footprints of the Swashbuckler', where: ['the open world'] },
    ],
  },
  {
    name: "Selna's Legacy", type: 'Heavy', level: 15,
    bonuses: ['Health +12.', 'Heavy Armor +5.', 'Block 5% more damage with a shield.', 'Melee damage +5.'],
    pieces: [
      { name: "Selna's Ventail", where: ['Fogmine'] },
      { name: "Selna's Bastion", where: ["Castle Dal'Galar, Kitchen", 'Grimlight Gallery'] },
      { name: "Selna's Fists", where: ['Fogwatch, Laboratory'] },
      { name: "Selna's March", where: ['Fogwatch', "Old Aisolon, Princess' Hall", 'The Living Temple'] },
      { name: "Selna's Wings", where: ['Fogwatch'] },
    ],
  },
  {
    name: 'Call of the North', type: 'Light', level: 15,
    bonuses: ['Stamina +4, Health +10.', 'Sneak is 4% more effective. One-handed attacks deal 5% more damage.', 'Pickpocketing 3% easier, prices 3% better, Mentalism spells cost 3% less.'],
    pieces: [
      { name: 'Eyes of the North', where: ['Fogwatch', 'Throatstone Woodworks', 'the open world'] },
      { name: 'Heart of the North', where: ['Grimlight Gallery'] },
      { name: 'Fists of the North', where: ['Old Garagatha'] },
      { name: 'Traces of the North', where: ['Throatstone, old hut basement'] },
    ],
  },
  {
    name: 'Nemesis', type: 'Mage', level: 15,
    bonuses: ['Mana +8.', 'Mana regenerates 3 points faster.', 'Mana regenerates 5 points faster.'],
    pieces: [
      { name: 'Nemesis Circlet', where: ['the open world'] },
      { name: 'Nemesis Garb', where: ['the open world (two copies)'] },
      { name: 'Nemesis Gauntlets', where: ['Castle Bleakstar', 'Castle Firerock', 'Keltyzar', "Old Aisolon, Princess' Hall"] },
      { name: 'Nemesis Shoes', where: ['Fogville, Sewers', 'Grimlight Gallery', 'the open world'] },
    ],
  },
  {
    name: 'Elegy of the Fallen', type: 'Heavy', level: 25,
    bonuses: ['Block 7% more damage with a shield.', 'Health +15.', 'Melee damage +5.'],
    pieces: [
      { name: 'Mask of the Fallen', where: ['Northwind Mine', 'Old Soltyris, The Void'] },
      { name: 'Shroud of the Fallen', where: ['Carried by unique enemies: Maruk Darkhand, Ishmartep'] },
      { name: 'Claws of the Fallen', where: ['the open world (two copies)'] },
      { name: 'Echo of the Fallen', where: ['Castle Bleakstar', 'Castle Firerock', 'Keltyzar', 'Lightgrove'] },
    ],
  },
  {
    name: 'Armor of the Tracker', type: 'Light', level: 25,
    bonuses: ['Light Armor +7.', 'Sneak is 8% more effective.', 'Bows deal 7% more damage, Health +5.'],
    pieces: [
      { name: 'Face of the Tracker', where: ["Duneville's Crypt"] },
      { name: 'Leather Skin of the Tracker', where: ['the open world (desert coast)'] },
      { name: 'Fortune of the Tracker', where: ['Lightgrove', 'Old Myrad Hall, Quarters', 'on the corpse of a priest in a spider nest'] },
      { name: 'Silent Step of the Tracker', where: ["Family Crypt of the Dal'Marak", 'Mossy Mud Pit'] },
    ],
  },
  {
    name: 'Regalia of the Tribunal', type: 'Mage', level: 25,
    bonuses: ['Mana regenerates 6 points faster.', 'Magic resistance +4%, Elementalism spells cost 4% less.', 'Mana +20.'],
    pieces: [
      { name: 'Hood of the Tribunal', where: ['Carried by unique enemies: Maruk Darkhand, Ishmartep, the Archivist'] },
      { name: 'Robe of the Tribunal', where: ['Carried by unique enemies: Eschtak Darkhand, Yogosh, the Mighty Starling Centurion'] },
      { name: 'Judging Hand of the Tribunal', where: ['Northwind Mine', "Princess Dal'Marak's Grave"] },
      { name: 'Boots of the Tribunal', where: ['Old Myrad Hall, Quarters', 'Thalgard, Quarters'] },
    ],
  },
  {
    name: 'Scarlet Night', type: 'Light', level: 30,
    bonuses: ['Lockpicking and Sleight of Hand +5.', 'Critical hit chance +7%.', 'You move silently while sneaking.'],
    pieces: [
      { name: 'Eye of the Scarlet Night', where: ["Forgotten Stories' mythic loot (random rare drop)"] },
      { name: 'Soul of the Scarlet Night', where: ["Forgotten Stories' mythic loot (random rare drop)"] },
      { name: 'Touch of the Scarlet Night', where: ["Forgotten Stories' mythic loot (random rare drop)"] },
      { name: 'Trace of the Scarlet Night', where: ["Forgotten Stories' mythic loot (random rare drop)"] },
    ],
  },
  {
    name: 'Armor of the Skaragg', type: 'Heavy', level: 40,
    bonuses: ['Block 9% more damage with a shield.', 'Health +20.', 'Melee damage +8.'],
    pieces: [
      { name: 'Skaragg Helmet', where: ["Deep Diggers' Hollow, Diggers' Luck Mine", 'Destroyed Abbey, Quarters', 'Old Starling Workshop'] },
      { name: 'Skaragg Cuirass', where: ['the open world'] },
      { name: 'Skaragg Gauntlets', where: ["Deep Diggers' Hollow, Shed", 'Destroyed Abbey, Library', 'Old Iniath'] },
      { name: 'Skaragg Shoes', where: ['Old Hatolis, Summit Halls', 'the open world'] },
    ],
  },
  {
    name: 'Ash Warrior', type: 'Light', level: 40,
    bonuses: ['Light Armor +9.', 'Sneak is 10% more effective.', 'Bows deal 10% more damage, Health +11.'],
    pieces: [
      { name: 'Veil of the Ash Warrior', where: ['Frostwater Chasm'] },
      { name: 'Shell of the Ash Warrior', where: ["Deep Diggers' Hollow, Storehouse"] },
      { name: 'Claws of the Ash Warrior', where: ['Old Hatolis, Summit Halls', 'Old Starling Mine', "Yerai's strongbox"] },
      { name: 'Traces of the Ash Warrior', where: ['Storm Mill, Warehouse'] },
    ],
  },
  {
    name: 'Regalia of the Wandering Mages', type: 'Mage', level: 40,
    bonuses: ['Mentalism spells cost 5% less, Entropy and Light Magic spells 4% less.', 'Mana regenerates 4% faster, Elementalism spells cost 5% less.', 'Mana +20, armor rating +5.'],
    pieces: [
      { name: 'Shadow of the Wandering Mage', where: ['Carried by unique enemies: Modruk Darkhand, Momog, the Colossus'] },
      { name: 'Soul of the Wandering Mage', where: ['the open world'] },
      { name: 'Hand of the Wandering Mage', where: ['Frostwater Chasm', 'Northcliff Hold'] },
      { name: 'Echo of the Wandering Mage', where: ["Deep Diggers' Hollow, Shed", 'the open world'] },
    ],
  },
  {
    name: "Skybreaker's Armor", type: 'Heavy', level: 50, crafted: true,
    bonuses: ['Heavy Armor +7.', 'Health +25.', 'Iron Maiden deals double damage.'],
    pieces: [
      { name: 'Ventail of the Skybreaker', where: ['Crafted: blueprint + Handicraft 75'] },
      { name: 'Bulwark of the Skybreaker', where: ['Crafted: blueprint + Handicraft 80'] },
      { name: 'Fists of the Skybreaker', where: ['Crafted: blueprint + Handicraft 75'] },
      { name: 'Wings of the Skybreaker', where: ['Crafted: blueprint + Handicraft 75'] },
    ],
  },
  {
    name: "Venturer's Armor", type: 'Light', level: 50, crafted: true,
    bonuses: ['Sleight of Hand +9.', 'Critical hit chance +10%.', 'Vagabond: High Dexterity\'s chance to fully negate damage rises from 10% to 20%.'],
    pieces: [
      { name: 'Hood of the Venturer', where: ['Crafted: blueprint + Handicraft 75'] },
      { name: 'Heart of the Venturer', where: ['Crafted: blueprint + Handicraft 80'] },
      { name: 'Finger of the Venturer', where: ['Crafted: blueprint + Handicraft 75'] },
      { name: 'Traces of the Venturer', where: ['Crafted: blueprint + Handicraft 75'] },
    ],
  },
  {
    name: "Inodan's Vestment", type: 'Mage', level: 50, crafted: true,
    bonuses: ['Mana regenerates 8% faster, magic resistance +6%.', 'All spells cost 7% less.', 'Health and Mana +25.', 'Well of Life also damages a nearby enemy for the health it restores.'],
    pieces: [
      { name: "Inodan's Watching Eye", where: ['Crafted: blueprint + Handicraft 75'] },
      { name: "Inodan's Legacy", where: ['Crafted: blueprint + Handicraft 80'] },
      { name: "Inodan's Judging Hand", where: ['Crafted: blueprint + Handicraft 75'] },
      { name: "Inodan's Traces", where: ['Crafted: blueprint + Handicraft 75'] },
      { name: "Inodan's Wings", where: ['Crafted: blueprint + Handicraft 75'] },
    ],
  },
];

// ---------------------------------------------------------------- For Honor Reforged
const FHR = (file) => `${import.meta.env.BASE_URL}uploads/guide/fhr/${file}.svg`;

export const FHR_ARROWS = [
  { icon: FHR('leftLight'), name: 'Light', text: 'The enemy has an empowered light attack ready on that side. When it lands it drains your stamina. Strip it with your own light attack from the same side.' },
  { icon: FHR('leftHeavy'), name: 'Heavy', text: 'An empowered heavy attack on that side: it deals extra health damage. Strip it with a heavy (power) attack from the same side.' },
  { icon: FHR('leftBoth'), name: 'Both', text: 'Light and heavy are both empowered on that side.' },
];

export const FHR_STATUS = [
  { icon: FHR('unstable'), name: 'Unstable', text: 'Your back power attack hit a target that wasn\'t blocking. For 3 seconds, emptying its poise knocks it into a stumble you can follow up on.' },
  { icon: FHR('staggerKnockdownCooldown'), name: 'Stagger knockdown cooldown', text: 'The target was just stumble-knocked down and can\'t be again for 10 seconds. Meanwhile it has 10% less armor.' },
  { icon: FHR('parryKnockdownCooldown'), name: 'Parry knockdown cooldown', text: 'The target was knocked down by a parry and can\'t be again for 10 seconds. Meanwhile it deals 10% less damage.' },
  { icon: FHR('blockSlideCooldown'), name: 'Block slide cooldown', text: 'A back power attack broke the target\'s guard. For 10 seconds it blocks less, takes more poise damage while blocking, can still be made Unstable, and its empowered buffs can be stripped through its block.' },
  { icon: FHR('shieldFlipCooldown'), name: 'Shield flip cooldown', text: 'The target was just knocked down by a shield flip and is immune to another for a while.' },
];

export const FHR_MOVES = [
  { input: 'Attack', move: 'Light attack', text: 'Your basic strike. Cheap, and every move can cancel into the next, so it keeps combos going.' },
  { input: 'Power attack', move: 'Heavy attack', text: 'More damage and poise damage, at more stamina.' },
  { input: 'Left / right + attack', move: 'Side light', text: '75% of the stamina, damage and poise damage of a light. Strips left/right light buffs and chips poise down without emptying it.' },
  { input: 'Left / right + power attack', move: 'Side heavy', text: 'Directional power attack. Strips left/right heavy buffs.' },
  { input: 'Back + attack', move: 'Parry', text: 'A counterattack: hits through the enemy\'s swing for 50% damage plus a chunk of poise damage, and you take no poise damage. If it empties their poise they drop into a parry knockdown. The window, damage reduction and poise damage grow with Block.' },
  { input: 'Back + power attack', move: 'Guard break', text: 'Costs half a power attack and deals 25% damage and poise damage. On an open target it applies Unstable for 3 seconds; on a blocking target it forces a block slide. Either way you get a follow-up.' },
  { input: 'Attack after a knockdown', move: 'Follow-up', text: 'After any knockdown or block slide, a light or heavy attack triggers a follow-up: half stamina, up to 25% more damage with Block. You must be locked on (middle mouse).' },
  { input: 'Shield and limb strikes', move: 'Bashes and kicks', text: 'Lower damage, but they hit stamina and deal extra poise damage. Shield strikes scale with Block.' },
];

export const FHR_COMBOS = [
  { name: 'Guard break → stumble', steps: ['Back + power attack (Unstable)', 'Light or side-light hits until poise breaks', 'Follow-up while they stumble'] },
  { name: 'Turtle opener', steps: ['Back + power attack into a blocking enemy', 'Follow-up on the block slide', 'Hit their poise while the cooldown icon is up; strip buffs through the block'] },
  { name: 'Parry finisher', steps: ['Side lights to bring poise low, not empty', 'Back + attack into their next swing', 'Follow-up on the parry knockdown'] },
  { name: 'Buff strip', steps: ['Watch the arrows by their health bar', 'Answer with the same side and weight (left heavy for left heavy)', 'A stripped heavy deals bonus damage to them; a stripped light drains them'] },
];

// ---------------------------------------------------------------- Keybindings
// The list's defaults: `Zenderal - Input Defaults` (decoded ControlMap_Custom.txt,
// TK Dodge, OCPA, Wheeler, Stances, SKSE Menu Framework) and `Zenderal - Settings`
// (MCM keybinds, SmoothCam). `cat` picks the colour on the keyboard.
export const KEY_CATS = [
  { id: 'move', label: 'Movement' },
  { id: 'combat', label: 'Combat' },
  { id: 'menu', label: 'Menus' },
  { id: 'mod', label: 'Mods & toggles' },
];

export const KEYS = {
  Esc: { cat: 'menu', action: 'Pause menu' },
  F1: { cat: 'combat', action: 'Stance: high' },
  F2: { cat: 'combat', action: 'Stance: mid' },
  F3: { cat: 'combat', action: 'Stance: low' },
  F4: { cat: 'combat', action: 'Stance: neutral' },
  F5: { cat: 'menu', action: 'Quicksave' },
  F7: { cat: 'mod', action: 'SKSE Menu Framework' },
  PrtSc: { cat: 'mod', action: 'Screenshot' },
  Pause: { cat: 'menu', action: 'Quickload' },
  '1': { cat: 'combat', action: 'Favourite hotkey 1' },
  '2': { cat: 'combat', action: 'Favourite hotkey 2' },
  '3': { cat: 'combat', action: 'Favourite hotkey 3' },
  '4': { cat: 'combat', action: 'Favourite hotkey 4' },
  '5': { cat: 'combat', action: 'Favourite hotkey 5' },
  '6': { cat: 'combat', action: 'Favourite hotkey 6' },
  '7': { cat: 'combat', action: 'Favourite hotkey 7' },
  '8': { cat: 'combat', action: 'Favourite hotkey 8' },
  '`': { cat: 'mod', action: 'Console' },
  Tab: { cat: 'menu', action: 'Character menu' },
  Q: { cat: 'combat', action: 'Wheeler (item wheel)', note: 'Tap to open; while open, E/G switch wheels, N adds a wheel and M an empty slot.' },
  W: { cat: 'move', action: 'Forward' },
  E: { cat: 'move', action: 'Activate' },
  R: { cat: 'combat', action: 'Draw / sheathe weapon' },
  T: { cat: 'menu', action: 'Wait' },
  Y: { cat: 'menu', action: 'Meditate' },
  I: { cat: 'menu', action: 'Inventory' },
  P: { cat: 'menu', action: 'Magic' },
  CapsLock: { cat: 'move', action: 'Toggle always run' },
  A: { cat: 'move', action: 'Strafe left' },
  S: { cat: 'move', action: 'Back' },
  D: { cat: 'move', action: 'Strafe right' },
  F: { cat: 'menu', action: 'Favourites' },
  G: { cat: 'mod', action: 'Wheeler: previous wheel', note: 'Only while the wheel is open.' },
  H: { cat: 'menu', action: 'Hero Menu' },
  J: { cat: 'menu', action: 'Journal' },
  L: { cat: 'mod', action: 'Lantern on / off' },
  LShift: { cat: 'move', action: 'Sprint' },
  Z: { cat: 'mod', action: 'Toggle first / third person' },
  X: { cat: 'combat', action: 'Talents and powers' },
  C: { cat: 'combat', action: 'Dual power attack' },
  V: { cat: 'mod', action: 'Hide / show the HUD' },
  B: { cat: 'mod', action: 'Helmet on / off' },
  N: { cat: 'mod', action: 'Wheeler: add wheel', note: 'Only while the wheel is open.' },
  M: { cat: 'menu', action: 'Map' },
  ',': { cat: 'mod', action: 'Swap camera shoulder' },
  '.': { cat: 'move', action: 'Auto-move' },
  LCtrl: { cat: 'move', action: 'Sneak' },
  LAlt: { cat: 'move', action: 'Jump' },
  Space: { cat: 'combat', action: 'Dodge', note: 'TK Dodge. Holding it also walks instead of runs.' },
  Arrows: { cat: 'mod', action: 'Wheeler: move entries', note: 'Reorder slots and wheels while the wheel is open.' },
};

// `part` is the button on the mouse diagram it lights up.
export const MOUSE = [
  { input: 'Left click', action: 'Right-hand attack', cat: 'combat', part: 'left' },
  { input: 'Right click', action: 'Left-hand attack / block', cat: 'combat', part: 'right' },
  { input: 'Middle click', action: 'Lock on to target', cat: 'combat', part: 'wheel', note: 'Follow-up attacks only work while you are locked on.' },
  { input: 'Mouse 4', action: 'Power attack', cat: 'combat', part: 'm4', note: 'The rear side button. Combine it with a direction for side and back power attacks (guard break).' },
  { input: 'Mouse 5', action: 'Dual-wield parry', cat: 'combat', part: 'm5', note: 'The front side button. Only with a weapon in each hand.' },
  { input: 'Wheel', action: 'Zoom camera · cycle wheel items', cat: 'move', part: 'wheel', note: 'Scroll all the way in for first person. While the Wheeler wheel is open it cycles items instead.' },
  { input: 'Shift + wheel', action: 'Cycle what you\'re about to activate', cat: 'mod', part: 'wheel', note: 'Better Third Person Selection: picks between several nearby things you could activate.' },
];

// Keyboard rows: [label, width in key units, KEYS id when it differs from the label].
// A null label is a gap. The main block is 15 units wide; NAV_CLUSTER sits to its right.
export const KEYBOARD = [
  [['Esc', 1], [null, 1], ['F1', 1], ['F2', 1], ['F3', 1], ['F4', 1], [null, 0.5], ['F5', 1], ['F6', 1], ['F7', 1], ['F8', 1], [null, 0.5], ['F9', 1], ['F10', 1], ['F11', 1], ['F12', 1]],
  [['`', 1], ['1', 1], ['2', 1], ['3', 1], ['4', 1], ['5', 1], ['6', 1], ['7', 1], ['8', 1], ['9', 1], ['0', 1], ['-', 1], ['=', 1], ['Backspace', 2]],
  [['Tab', 1.5], ['Q', 1], ['W', 1], ['E', 1], ['R', 1], ['T', 1], ['Y', 1], ['U', 1], ['I', 1], ['O', 1], ['P', 1], ['[', 1], [']', 1], ['\\', 1.5]],
  [['Caps', 1.75, 'CapsLock'], ['A', 1], ['S', 1], ['D', 1], ['F', 1], ['G', 1], ['H', 1], ['J', 1], ['K', 1], ['L', 1], [';', 1], ["'", 1], ['Enter', 2.25]],
  [['Shift', 1.25, 'LShift'], ['ISO', 1], ['Z', 1], ['X', 1], ['C', 1], ['V', 1], ['B', 1], ['N', 1], ['M', 1], [',', 1], ['.', 1], ['/', 1], ['Shift', 2.75, 'RShift']],
  [['Ctrl', 1.25, 'LCtrl'], ['Win', 1.25], ['Alt', 1.25, 'LAlt'], ['Space', 6.25], ['Alt', 1.25, 'RAlt'], ['Fn', 1.25], ['Menu', 1.25], ['Ctrl', 1.25, 'RCtrl']],
];

export const NAV_CLUSTER = [
  [['PrtSc', 1], ['ScrLk', 1], ['Pause', 1]],
  [['Ins', 1], ['Home', 1], ['PgUp', 1]],
  [['Del', 1], ['End', 1], ['PgDn', 1]],
  [[null, 3]],
  [[null, 1], ['↑', 1, 'Arrows'], [null, 1]],
  [['←', 1, 'Arrows'], ['↓', 1, 'Arrows'], ['→', 1, 'Arrows']],
];
