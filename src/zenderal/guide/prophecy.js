// Prophecy talent trees, generated from zenderal-patches' src/ProphecyV3/data/SKSE/Plugins/ZenProphecyUI.json
// (feat/enderal-paired-anims, the build in the installed list). Nodes are in unlock order; `id` and `parents`
// are the game's node indexes. x/y are radial-map units (y up, start point at 0,0); `side` places the label
// (0 below, 1 above, 2 right, 3 left); `routes` bend a prerequisite line through waypoints. Art:
// public/uploads/guide/prophecy/.
export const PROPHECY_EXTENT = 33.53;

export const PROPHECY_TREES = [
 {
  "id": "faith",
  "name": "Faith",
  "tagline": "Holy light, sacred wards and smiting.",
  "color": "#e8c46e",
  "bg": "faith.webp",
  "label": [
   0.0,
   25.54
  ],
  "routes": [
   {
    "from": 1,
    "to": 3,
    "via": [
     [
      0.0,
      18.84
     ]
    ]
   },
   {
    "from": 1,
    "to": 5,
    "via": [
     [
      0.0,
      18.84
     ]
    ]
   },
   {
    "from": 3,
    "to": 9,
    "via": [
     [
      0.0,
      18.84
     ]
    ]
   },
   {
    "from": 5,
    "to": 9,
    "via": [
     [
      0.0,
      18.84
     ]
    ]
   },
   {
    "from": 7,
    "to": 8,
    "via": [
     [
      0.0,
      21.24
     ]
    ]
   }
  ],
  "nodes": [
   {
    "id": 0,
    "name": "Consecrate Dead",
    "desc": "Grants the \"Consecrate Dead\" spell: cast it on a corpse to burn it to ash with holy light and restore 30 Health, Mana and Stamina. Undead it strikes take 15 damage and stagger.",
    "parents": [],
    "x": 0.0,
    "y": 13.24,
    "side": 0,
    "img": "consecratedead.webp"
   },
   {
    "id": 2,
    "name": "Inner Light",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     0
    ],
    "x": 0.0,
    "y": 10.84,
    "side": 0,
    "stat": true
   },
   {
    "id": 1,
    "name": "Devotion",
    "desc": "Your Light Magic skill is increased by 10.",
    "parents": [
     0
    ],
    "x": 0.0,
    "y": 16.04,
    "side": 0,
    "stat": true
   },
   {
    "id": 3,
    "name": "Righteous Path",
    "desc": "While you block with a spell or nothing in your left hand, a ward of sunlight surrounds you: you gain 25% resistance to magic and immunity to disease, and each attacker you block is struck by a beam of light that leaps between enemies for 20 damage, for 10 Mana (with less, you simply block).",
    "parents": [
     1
    ],
    "x": -2.6,
    "y": 18.84,
    "side": 0,
    "img": "righteouspath.webp"
   },
   {
    "id": 5,
    "name": "Smite",
    "desc": "Your hits with silver weapons have a 15% chance to call down a pillar of holy light on the target: 40 damage, while beams of light strike the enemies around it for 10 each. Undead take double damage.",
    "parents": [
     1
    ],
    "x": 2.6,
    "y": 18.84,
    "side": 0,
    "img": "smite.webp"
   },
   {
    "id": 4,
    "name": "Blessed Vigour",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     3
    ],
    "x": -5.2,
    "y": 18.84,
    "side": 1,
    "stat": true
   },
   {
    "id": 9,
    "name": "Templar",
    "desc": "Once every 90 seconds, dropping below 25% Health makes you immune to damage for 6 seconds, then heals you for 100 Health.",
    "parents": [
     3,
     5
    ],
    "x": 0.0,
    "y": 21.24,
    "side": 0,
    "img": "templar.webp"
   },
   {
    "id": 6,
    "name": "Mending Grace",
    "desc": "Your Health regenerates 25 percent faster.",
    "parents": [
     5
    ],
    "x": 5.2,
    "y": 18.84,
    "side": 1,
    "stat": true
   },
   {
    "id": 10,
    "name": "Serenity",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     9
    ],
    "x": -1.9,
    "y": 21.24,
    "side": 3,
    "stat": true
   },
   {
    "id": 7,
    "name": "Warding Faith",
    "desc": "You gain 10% resistance to magic.",
    "parents": [
     9
    ],
    "x": 1.9,
    "y": 21.24,
    "side": 2,
    "stat": true
   },
   {
    "id": 8,
    "name": "Wrath of the Lightborn",
    "desc": "Grants the \"Wrath of the Lightborn\" spell (no Mana, 50% Arcane Fever): for 60 seconds, bolts of sunlight strike enemies within 20 feet of you for 40 damage each. Undead take double damage. It cannot be cast at 50% Arcane Fever or more.",
    "parents": [
     7
    ],
    "x": 0.0,
    "y": 23.64,
    "side": 0,
    "level": 30,
    "img": "wrathofthelightborn.webp"
   }
  ]
 },
 {
  "id": "sharpshooter",
  "name": "Sharpshooter",
  "tagline": "Muskets, powder and lead.",
  "color": "#cd8c50",
  "bg": "sharpshooter.webp",
  "label": [
   22.62,
   18.04
  ],
  "routes": [],
  "nodes": [
   {
    "id": 11,
    "name": "Quick Reload",
    "desc": "You reload muskets 30% faster.",
    "parents": [],
    "x": 8.39,
    "y": 6.69,
    "side": 0,
    "img": "quickreload.webp"
   },
   {
    "id": 13,
    "name": "Powder Lungs",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     11
    ],
    "x": 10.16,
    "y": 4.34,
    "side": 0,
    "stat": true
   },
   {
    "id": 12,
    "name": "Steady Aim",
    "desc": "Your Archery skill is increased by 10.",
    "parents": [
     11
    ],
    "x": 10.62,
    "y": 8.38,
    "side": 1,
    "stat": true
   },
   {
    "id": 14,
    "name": "Elemental Rounds",
    "desc": "Your musket hits deal 10 extra fire damage.",
    "parents": [
     12
    ],
    "x": 12.69,
    "y": 10.29,
    "side": 2,
    "img": "elementalrounds.webp"
   },
   {
    "id": 16,
    "name": "Bleeding Shot",
    "desc": "Your musket hits make living targets bleed for 50 damage over 5 seconds.",
    "parents": [
     12
    ],
    "x": 14.36,
    "y": 8.74,
    "side": 2,
    "img": "bleedingshot.webp"
   },
   {
    "id": 15,
    "name": "Quick Breath",
    "desc": "Your Stamina regenerates 25 percent faster.",
    "parents": [
     14
    ],
    "x": 10.54,
    "y": 11.3,
    "side": 3,
    "stat": true
   },
   {
    "id": 18,
    "name": "Run and Gun",
    "desc": "You move at full speed while aiming a musket.",
    "parents": [
     14,
     16
    ],
    "x": 15.05,
    "y": 12.14,
    "side": 1,
    "img": "runandgun.webp"
   },
   {
    "id": 17,
    "name": "Leather Duster",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     16
    ],
    "x": 16.42,
    "y": 7.67,
    "side": 0,
    "stat": true
   },
   {
    "id": 19,
    "name": "Bandolier",
    "desc": "Your carry weight is increased by 25.",
    "parents": [
     18
    ],
    "x": 19.85,
    "y": 13.42,
    "side": 0,
    "stat": true
   },
   {
    "id": 20,
    "name": "Hardened Nerves",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     18
    ],
    "x": 17.71,
    "y": 14.26,
    "side": 3,
    "stat": true
   },
   {
    "id": 21,
    "name": "Deadeye",
    "desc": "A musket shot at a target you haven't shot in the last 10 seconds is a critical strike that deals triple critical damage, and its weapon enchantments are twice as strong.",
    "parents": [
     20
    ],
    "x": 20.9,
    "y": 16.67,
    "side": 0,
    "level": 30,
    "img": "deadeye.webp"
   }
  ]
 },
 {
  "id": "gadgets",
  "name": "Gadgets",
  "tagline": "Traps, smoke and clockwork.",
  "color": "#bea569",
  "bg": "gadgets.webp",
  "label": [
   23.69,
   -5.41
  ],
  "routes": [],
  "nodes": [
   {
    "id": 22,
    "name": "Explosive Tripwire",
    "desc": "Grants the \"Explosive Tripwire\" power: at will, set a tripwire in front of you that lasts 120 seconds. When tripped, it snaps and knocks everyone it hits to the ground, and an enemy who trips it sets off an explosion that deals 40 damage.",
    "parents": [],
    "x": 12.31,
    "y": -2.81,
    "side": 0,
    "img": "tripwire.webp"
   },
   {
    "id": 24,
    "name": "Toolbelt",
    "desc": "Your carry weight is increased by 30.",
    "parents": [
     22
    ],
    "x": 9.97,
    "y": -2.28,
    "side": 1,
    "stat": true
   },
   {
    "id": 23,
    "name": "Tinkerer",
    "desc": "Your Handicraft skill is increased by 10.",
    "parents": [
     22
    ],
    "x": 14.65,
    "y": -3.34,
    "side": 1,
    "stat": true
   },
   {
    "id": 25,
    "name": "Smokescreen",
    "desc": "Grants the \"Smokescreen\" power: once a day, create a 35-foot cloud of smoke for 180 seconds and turn invisible for 10 seconds. Those inside the cloud are blinded and cannot see sneaking targets, and your sneak attacks against them deal 50% more damage.",
    "parents": [
     23
    ],
    "x": 17.14,
    "y": -1.45,
    "side": 1,
    "img": "smokescreen.webp"
   },
   {
    "id": 28,
    "name": "Utility Droid",
    "desc": "Grants the \"Utility Droid\" power: throw out a mechanical spider that follows you, heals you and staggers enemies around it. It lasts until destroyed, and using the power again calls it back to you. Your first droid is free; each new one costs 10 Spare Parts.",
    "parents": [
     23
    ],
    "x": 16.07,
    "y": -6.13,
    "side": 0,
    "img": "utilitydroid.webp"
   },
   {
    "id": 29,
    "name": "Riveted Plating",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     28
    ],
    "x": 19.9,
    "y": -7.31,
    "side": 0,
    "stat": true
   },
   {
    "id": 26,
    "name": "Fume Mask",
    "desc": "You gain 15% resistance to poison.",
    "parents": [
     25
    ],
    "x": 21.1,
    "y": -2.05,
    "side": 2,
    "stat": true
   },
   {
    "id": 30,
    "name": "Clockwork Turret",
    "desc": "You can build Clockwork Turrets at a forge, and you receive one when you learn this. The \"Clockwork Turret\" power deploys it for 30 seconds: it turns and fires at your target, or the nearest enemy in combat, dealing damage equal to 30% of your Handicraft skill.",
    "parents": [
     25,
     28
    ],
    "x": 17.19,
    "y": -3.92,
    "side": 0,
    "img": "clockworkturret.webp"
   },
   {
    "id": 27,
    "name": "Chaff",
    "desc": "Your Smokescreen cloud also blinds automatons: mechanical spiders, spheres and centurions inside it can no longer see you.",
    "parents": [
     25
    ],
    "x": 17.65,
    "y": 0.79,
    "side": 1
   },
   {
    "id": 31,
    "name": "Insulated Gloves",
    "desc": "You gain 15% resistance to lightning.",
    "parents": [
     30
    ],
    "x": 18.56,
    "y": -5.57,
    "side": 3,
    "stat": true
   },
   {
    "id": 32,
    "name": "Steady Hands",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     30
    ],
    "x": 19.13,
    "y": -3.03,
    "side": 2,
    "stat": true
   },
   {
    "id": 33,
    "name": "Overclock",
    "desc": "Your Clockwork Turret power deploys two turrets side by side, and they fire 2% faster with every shot, up to 200%.",
    "parents": [
     32
    ],
    "x": 20.5,
    "y": -4.68,
    "side": 1,
    "level": 30,
    "img": "overclock.webp"
   }
  ]
 },
 {
  "id": "martial-arts",
  "name": "Martial Arts",
  "tagline": "Fists, footwork and timing.",
  "color": "#6ebeaf",
  "bg": "martial-arts.webp",
  "label": [
   11.2,
   -23.26
  ],
  "routes": [],
  "nodes": [
   {
    "id": 34,
    "name": "Iron Fist",
    "desc": "Your unarmed attacks deal extra damage equal to 15% of your current Stamina. Requires both hands to be empty.",
    "parents": [],
    "x": 6.3,
    "y": -13.08,
    "side": 0,
    "img": "ironfist.webp"
   },
   {
    "id": 36,
    "name": "Iron Knuckles",
    "desc": "Your unarmed attacks deal 5 more damage.",
    "parents": [
     34
    ],
    "x": 5.34,
    "y": -11.1,
    "side": 0,
    "stat": true
   },
   {
    "id": 35,
    "name": "Conditioning",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     34
    ],
    "x": 7.25,
    "y": -15.06,
    "side": 0,
    "stat": true
   },
   {
    "id": 37,
    "name": "Hissing Dragon",
    "desc": "Choose a damage type (fire, frost, shock, poison, disease or sun): your unarmed attacks unleash a shockwave that deals it to everyone in front of you. Requires both hands to be empty, and does not trigger while sneaking.",
    "parents": [
     35
    ],
    "x": 10.64,
    "y": -16.1,
    "side": 0,
    "img": "hissingdragon.webp"
   },
   {
    "id": 39,
    "name": "Stunning Blows",
    "desc": "Your unarmed attacks have a 15% chance to stagger enemies, and deal 25% more damage to staggered enemies.",
    "parents": [
     35
    ],
    "x": 5.95,
    "y": -18.35,
    "side": 0,
    "img": "stunningblows.webp"
   },
   {
    "id": 38,
    "name": "Breath Control",
    "desc": "Your Stamina regenerates 25 percent faster.",
    "parents": [
     37
    ],
    "x": 12.37,
    "y": -14.15,
    "side": 0,
    "stat": true
   },
   {
    "id": 41,
    "name": "Breaking Waves",
    "desc": "Your unarmed attacks have a 15% chance to land a critical strike that deals damage equal to 40% of your current Stamina. Requires both hands to be empty.",
    "parents": [
     37,
     39
    ],
    "x": 8.73,
    "y": -18.12,
    "side": 2,
    "img": "breakingwaves.webp"
   },
   {
    "id": 40,
    "name": "Toughened Body",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     39
    ],
    "x": 3.36,
    "y": -18.49,
    "side": 0,
    "stat": true
   },
   {
    "id": 42,
    "name": "Unbroken",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     41
    ],
    "x": 10.59,
    "y": -19.23,
    "side": 2,
    "stat": true
   },
   {
    "id": 43,
    "name": "Inner Calm",
    "desc": "You gain 10% resistance to magic.",
    "parents": [
     41
    ],
    "x": 8.43,
    "y": -20.27,
    "side": 0,
    "stat": true
   },
   {
    "id": 44,
    "name": "Flow State",
    "desc": "Dodging in combat briefly slows time to a crawl (once every 10 seconds) and releases a Shock Nova that deals 40 shock damage to nearby enemies (once every 15 seconds).",
    "parents": [
     43
    ],
    "x": 10.38,
    "y": -21.55,
    "side": 2,
    "level": 30,
    "img": "flowstate.webp"
   }
  ]
 },
 {
  "id": "glory",
  "name": "Glory",
  "tagline": "Charges, banners and hard-won grit.",
  "color": "#d75a4b",
  "bg": "glory.webp",
  "label": [
   -11.53,
   -23.94
  ],
  "routes": [
   {
    "from": 46,
    "to": 48,
    "via": [
     [
      -7.58,
      -15.74
     ]
    ]
   },
   {
    "from": 46,
    "to": 50,
    "via": [
     [
      -7.58,
      -15.74
     ]
    ]
   },
   {
    "from": 48,
    "to": 52,
    "via": [
     [
      -7.58,
      -15.74
     ]
    ]
   },
   {
    "from": 50,
    "to": 52,
    "via": [
     [
      -7.58,
      -15.74
     ]
    ]
   },
   {
    "from": 54,
    "to": 55,
    "via": [
     [
      -8.53,
      -17.72
     ]
    ]
   }
  ],
  "nodes": [
   {
    "id": 45,
    "name": "Seismic Stomp",
    "desc": "Grants the \"Seismic Stomp\" power: stomp the ground to send out a shockwave that hurls every enemy within 19 feet into the air and makes them bleed for 50 damage over 5 seconds, while time briefly slows. Usable once every 30 seconds.",
    "parents": [],
    "x": -6.1,
    "y": -12.67,
    "side": 2,
    "img": "seismicstomp.webp"
   },
   {
    "id": 47,
    "name": "Shield Discipline",
    "desc": "Your Blocking skill is increased by 10.",
    "parents": [
     45
    ],
    "x": -5.24,
    "y": -10.87,
    "side": 1,
    "stat": true
   },
   {
    "id": 46,
    "name": "Battle-Hardened",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     45
    ],
    "x": -6.88,
    "y": -14.3,
    "side": 2,
    "stat": true
   },
   {
    "id": 48,
    "name": "Second Wind",
    "desc": "While you are at or below half Health, every hit you take restores 20 Stamina.",
    "parents": [
     46
    ],
    "x": -5.42,
    "y": -16.78,
    "side": 1,
    "img": "secondwind.webp"
   },
   {
    "id": 50,
    "name": "Dragon Scale",
    "desc": "You gain 25% resistance to fire, frost and lightning.",
    "parents": [
     46
    ],
    "x": -9.74,
    "y": -14.7,
    "side": 3,
    "img": "dragonscale.webp"
   },
   {
    "id": 49,
    "name": "Thick Hide",
    "desc": "Your armor rating is increased by 60.",
    "parents": [
     48
    ],
    "x": -3.09,
    "y": -17.01,
    "side": 0,
    "stat": true
   },
   {
    "id": 52,
    "name": "Surrounded",
    "desc": "While 3 or more enemies are near you, you regenerate 2 Stamina per second.",
    "parents": [
     48,
     50
    ],
    "x": -8.53,
    "y": -17.72,
    "side": 0,
    "img": "deathorglory.webp"
   },
   {
    "id": 51,
    "name": "War Cry",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     50
    ],
    "x": -11.38,
    "y": -13.02,
    "side": 1,
    "stat": true
   },
   {
    "id": 53,
    "name": "Veteran",
    "desc": "Your One-handed and Two-handed skills are increased by 10.",
    "parents": [
     52
    ],
    "x": -6.82,
    "y": -18.54,
    "side": 0,
    "stat": true
   },
   {
    "id": 54,
    "name": "Iron Constitution",
    "desc": "Your Health regenerates 25 percent faster.",
    "parents": [
     52
    ],
    "x": -10.25,
    "y": -16.9,
    "side": 3,
    "stat": true
   },
   {
    "id": 55,
    "name": "War Banner",
    "desc": "Grants the \"War Banner\" power: plant a banner for 15 seconds. While you stand near it, you heal 20 Health per second, and enemies who come close are bound in chains, as by a Stave of Binding. Usable once every 5 minutes.",
    "parents": [
     54
    ],
    "x": -10.7,
    "y": -22.22,
    "side": 1,
    "level": 30,
    "img": "warbanner.webp"
   }
  ]
 },
 {
  "id": "arcane-archery",
  "name": "Arcane Archery",
  "tagline": "Arrows, wards and spellcraft.",
  "color": "#6e9be6",
  "bg": "arcane-archery.webp",
  "label": [
   -29.65,
   -6.77
  ],
  "routes": [
   {
    "from": 65,
    "to": 66,
    "via": [
     [
      -20.98,
      -4.79
     ]
    ]
   }
  ],
  "nodes": [
   {
    "id": 56,
    "name": "Arcane Arsenal",
    "desc": "Grants the \"Arcane Arsenal\" power: choose Fire, Frost or Lightning, and your bow hits deal 10 extra damage of that element.",
    "parents": [],
    "x": -15.91,
    "y": -3.63,
    "side": 0,
    "img": "arcanearsenal.webp"
   },
   {
    "id": 58,
    "name": "Fletcher's Eye",
    "desc": "Your Archery skill is increased by 10.",
    "parents": [
     56
    ],
    "x": -13.96,
    "y": -3.19,
    "side": 1,
    "stat": true
   },
   {
    "id": 57,
    "name": "Arcane Focus",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     56
    ],
    "x": -17.66,
    "y": -4.03,
    "side": 1,
    "stat": true
   },
   {
    "id": 59,
    "name": "No Distractions",
    "desc": "While you aim a bow, a Spell Ward (Rank II) surrounds you. It fades when you fire or lower the bow.",
    "parents": [
     57
    ],
    "x": -18.57,
    "y": -8.14,
    "side": 3,
    "img": "nodistractions.webp"
   },
   {
    "id": 61,
    "name": "Ice Shot",
    "desc": "Grants the \"Ice Shot\" power: with a bow equipped, add 3 ice arrows to your quiver for 50 Magicka. They deal 25 frost damage and freeze the target solid for 8 seconds, and your next arrow shatters it.",
    "parents": [
     57
    ],
    "x": -20.26,
    "y": -0.73,
    "side": 0,
    "img": "iceshot.webp"
   },
   {
    "id": 60,
    "name": "Mana Spring",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     59
    ],
    "x": -16.55,
    "y": -8.91,
    "side": 0,
    "stat": true
   },
   {
    "id": 63,
    "name": "Andrasta's Owl",
    "desc": "Your bow hits send a barn owl to attack the target. It fights at your side until it is killed, each later hit sends it after that target, and each of its strikes drains 10 Magicka from its target and gives it to you. While it is out, you regenerate 2 Magicka per second. Only one owl can be out at a time.",
    "parents": [
     59,
     61
    ],
    "x": -20.98,
    "y": -4.79,
    "side": 0,
    "img": "sendaraven.webp"
   },
   {
    "id": 62,
    "name": "Frostbound",
    "desc": "You gain 15% resistance to frost.",
    "parents": [
     61
    ],
    "x": -18.78,
    "y": 0.84,
    "side": 1,
    "stat": true
   },
   {
    "id": 64,
    "name": "Owl's Vigil",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     63
    ],
    "x": -20.55,
    "y": -6.64,
    "side": 2,
    "stat": true
   },
   {
    "id": 65,
    "name": "Spellward",
    "desc": "You gain 10% resistance to magic.",
    "parents": [
     63
    ],
    "x": -21.4,
    "y": -2.94,
    "side": 2,
    "stat": true
   },
   {
    "id": 66,
    "name": "Arcane Echo",
    "desc": "Grants the \"Arcane Echo\" power: use it while dual casting a spell to store that spell. Your fully drawn bow shots in combat then also release the stored spell toward your crosshair. Only works with spells cast at others.",
    "parents": [
     65
    ],
    "x": -24.29,
    "y": -5.54,
    "side": 1,
    "level": 30,
    "img": "lionsarrow.webp"
   }
  ]
 },
 {
  "id": "necromancy",
  "name": "Necromancy",
  "tagline": "Summons, sacrifice and the restless dead.",
  "color": "#a56ed2",
  "bg": "necromancy.webp",
  "label": [
   -25.83,
   20.6
  ],
  "routes": [],
  "nodes": [
   {
    "id": 67,
    "name": "Corpse Fever",
    "desc": "You can command one more summon for every 25% Arcane Fever you have.",
    "parents": [],
    "x": -15.97,
    "y": 12.74,
    "side": 0,
    "img": "corpsefever.webp"
   },
   {
    "id": 69,
    "name": "Grave Pact",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     67
    ],
    "x": -15.41,
    "y": 10.4,
    "side": 0,
    "stat": true
   },
   {
    "id": 68,
    "name": "Dark Studies",
    "desc": "Your Entropy skill is increased by 10.",
    "parents": [
     67
    ],
    "x": -16.58,
    "y": 15.27,
    "side": 0,
    "stat": true
   },
   {
    "id": 70,
    "name": "Dark Effigy",
    "desc": "Grants the \"Dark Effigy\" spell (100 Magicka): raise a dark totem for 60 seconds. You and your undead summons near it heal 2 Health per second, and you and your allies near it gain 250 armor.",
    "parents": [
     68
    ],
    "x": -14.82,
    "y": 16.51,
    "side": 2,
    "img": "darkeffigy.webp"
   },
   {
    "id": 72,
    "name": "A Willing Sacrifice",
    "desc": "Grants the \"A Willing Sacrifice\" power: every summon you command explodes, dealing damage equal to half its maximum Health to each enemy within 14 feet of it. Usable once every 15 seconds.",
    "parents": [
     68
    ],
    "x": -17.28,
    "y": 18.18,
    "side": 1,
    "img": "willingsacrifice.webp"
   },
   {
    "id": 71,
    "name": "Corpse Ward",
    "desc": "You gain 15% resistance to poison.",
    "parents": [
     70
    ],
    "x": -12.99,
    "y": 17.46,
    "side": 2,
    "stat": true
   },
   {
    "id": 74,
    "name": "The Dead Don't Forget",
    "desc": "A Willing Sacrifice restores 50 Magicka for every enemy it hits.",
    "parents": [
     72
    ],
    "x": -17.97,
    "y": 21.1,
    "side": 2,
    "img": "deaddontforget.webp"
   },
   {
    "id": 73,
    "name": "Death's Patience",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     72
    ],
    "x": -15.3,
    "y": 19.38,
    "side": 2,
    "stat": true
   },
   {
    "id": 75,
    "name": "Cold Blood",
    "desc": "You gain 15% resistance to frost.",
    "parents": [
     74
    ],
    "x": -16.36,
    "y": 22.52,
    "side": 1,
    "stat": true
   },
   {
    "id": 76,
    "name": "Bone Armour",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     74
    ],
    "x": -21.19,
    "y": 21.67,
    "side": 1,
    "stat": true
   },
   {
    "id": 77,
    "name": "Legion of the Damned",
    "desc": "Grants the \"Legion of the Damned\" power: at the cost of 50% Arcane Fever, raise six skeletons (two warriors, two archers and two mages) that fight at your side for 5 minutes. They do not count against your summon limit, and A Willing Sacrifice can explode them. A new Legion replaces the old one.",
    "parents": [
     76
    ],
    "x": -24.11,
    "y": 19.22,
    "side": 0,
    "level": 30,
    "img": "legiondamned.webp"
   }
  ]
 }
];
