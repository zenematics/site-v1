// Prophecy talent trees, generated from ZenProphecyUI.json in the installed list's MO2 mod
// `Zenderal - Prophecy v3 (Constellation)` (zenderal-patches src/ProphecyV3/data/SKSE/Plugins/). Nodes are in unlock
// order; `id` and `parents` are the game's node indexes. x/y are radial-map units (y up, start point at 0,0); `side`
// places the label (0 below, 1 above, 2 right, 3 left); `routes` bend a prerequisite line through waypoints. Art:
// public/uploads/guide/prophecy/ (`bg` only for trees with their own banner).
export const PROPHECY_EXTENT = 55.04;

export const PROPHECY_TREES = [
 {
  "id": "faith",
  "name": "Faith",
  "tagline": "Holy light, sacred wards and smiting.",
  "color": "#e8c46e",
  "bg": "faith.webp",
  "label": [
   0.0,
   40.2
  ],
  "routes": [
   {
    "from": 1,
    "to": 3,
    "via": [
     [
      0.0,
      32.0
     ]
    ]
   },
   {
    "from": 1,
    "to": 5,
    "via": [
     [
      0.0,
      32.0
     ]
    ]
   },
   {
    "from": 3,
    "to": 9,
    "via": [
     [
      0.0,
      32.0
     ]
    ]
   },
   {
    "from": 5,
    "to": 9,
    "via": [
     [
      0.0,
      32.0
     ]
    ]
   },
   {
    "from": 7,
    "to": 8,
    "via": [
     [
      0.0,
      34.4
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
    "y": 26.4,
    "side": 2,
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
    "y": 24.0,
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
    "y": 29.2,
    "side": 3,
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
    "y": 32.0,
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
    "y": 32.0,
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
    "y": 32.0,
    "side": 0,
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
    "y": 34.4,
    "side": 2,
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
    "y": 32.0,
    "side": 2,
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
    "y": 34.4,
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
    "y": 34.4,
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
    "y": 36.8,
    "side": 2,
    "level": 30,
    "img": "wrathofthelightborn.webp"
   }
  ]
 },
 {
  "id": "firearms",
  "name": "Firearms",
  "tagline": "Muskets, powder and lead.",
  "color": "#cd8c50",
  "bg": "firearms.webp",
  "label": [
   20.06,
   33.7
  ],
  "routes": [],
  "nodes": [
   {
    "id": 11,
    "name": "Quick Reload",
    "desc": "You reload muskets 30% faster.",
    "parents": [],
    "x": 9.83,
    "y": 16.51,
    "side": 2,
    "img": "quickreload.webp"
   },
   {
    "id": 13,
    "name": "Powder Lungs",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     11
    ],
    "x": 12.31,
    "y": 14.94,
    "side": 3,
    "stat": true
   },
   {
    "id": 12,
    "name": "Steady Aim",
    "desc": "Your Archery skill is increased by 10.",
    "parents": [
     11
    ],
    "x": 11.32,
    "y": 18.88,
    "side": 2,
    "stat": true
   },
   {
    "id": 14,
    "name": "Elemental Rounds",
    "desc": "Your musket hits deal 10 extra fire damage.",
    "parents": [
     12
    ],
    "x": 12.58,
    "y": 21.39,
    "side": 1,
    "img": "elementalrounds.webp"
   },
   {
    "id": 16,
    "name": "Bleeding Shot",
    "desc": "Your musket hits make living targets bleed for 50 damage over 5 seconds.",
    "parents": [
     12
    ],
    "x": 14.69,
    "y": 20.53,
    "side": 0,
    "img": "bleedingshot.webp"
   },
   {
    "id": 15,
    "name": "Quick Breath",
    "desc": "Your Stamina regenerates 25 percent faster.",
    "parents": [
     14
    ],
    "x": 10.22,
    "y": 21.58,
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
    "x": 14.14,
    "y": 23.96,
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
    "x": 17.0,
    "y": 20.26,
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
    "x": 18.18,
    "y": 26.85,
    "side": 2,
    "stat": true
   },
   {
    "id": 20,
    "name": "Hardened Nerves",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     18
    ],
    "x": 15.88,
    "y": 26.88,
    "side": 1,
    "stat": true
   },
   {
    "id": 21,
    "name": "Deadeye",
    "desc": "A musket shot at a target you haven't shot in the last 10 seconds is a critical strike that deals triple critical damage, and its weapon enchantments are twice as strong.",
    "parents": [
     20
    ],
    "x": 18.02,
    "y": 30.26,
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
   35.19,
   19.08
  ],
  "routes": [],
  "nodes": [
   {
    "id": 22,
    "name": "Explosive Tripwire",
    "desc": "Grants the \"Explosive Tripwire\" power: at will, set a tripwire in front of you that lasts 120 seconds. When tripped, it snaps and knocks everyone it hits to the ground, and an enemy who trips it sets off an explosion that deals 40 damage.",
    "parents": [],
    "x": 21.56,
    "y": 11.69,
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
    "x": 19.45,
    "y": 10.54,
    "side": 0,
    "stat": true
   },
   {
    "id": 23,
    "name": "Tinkerer",
    "desc": "Your Handicraft skill is increased by 10.",
    "parents": [
     22
    ],
    "x": 23.67,
    "y": 12.83,
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
    "x": 24.28,
    "y": 15.89,
    "side": 3,
    "img": "smokescreen.webp"
   },
   {
    "id": 28,
    "name": "Utility Droid",
    "desc": "Grants the \"Utility Droid\" power: throw out a mechanical spider that follows you, heals you and staggers enemies around it. It lasts until destroyed, and using the power again calls it back to you. Your first droid is free; each new one costs 10 Spare Parts.",
    "parents": [
     23
    ],
    "x": 26.57,
    "y": 11.67,
    "side": 2,
    "img": "utilitydroid.webp"
   },
   {
    "id": 29,
    "name": "Riveted Plating",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     28
    ],
    "x": 30.23,
    "y": 13.32,
    "side": 2,
    "stat": true
   },
   {
    "id": 26,
    "name": "Fume Mask",
    "desc": "You gain 15% resistance to poison.",
    "parents": [
     25
    ],
    "x": 27.65,
    "y": 18.06,
    "side": 1,
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
    "x": 25.95,
    "y": 14.07,
    "side": 3,
    "img": "clockworkturret.webp"
   },
   {
    "id": 27,
    "name": "Chaff",
    "desc": "Your Smokescreen cloud also blinds automatons: mechanical spiders, spheres and centurions inside it can no longer see you.",
    "parents": [
     25
    ],
    "x": 23.18,
    "y": 17.91,
    "side": 1
   },
   {
    "id": 31,
    "name": "Insulated Gloves",
    "desc": "You gain 15% resistance to lightning.",
    "parents": [
     30
    ],
    "x": 28.07,
    "y": 13.74,
    "side": 2,
    "stat": true
   },
   {
    "id": 32,
    "name": "Steady Hands",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     30
    ],
    "x": 26.83,
    "y": 16.02,
    "side": 1,
    "stat": true
   },
   {
    "id": 33,
    "name": "Overclock",
    "desc": "Your Clockwork Turret power deploys two turrets side by side, and they fire 2% faster with every shot, up to 200%.",
    "parents": [
     32
    ],
    "x": 28.94,
    "y": 15.69,
    "side": 2,
    "level": 30,
    "img": "overclock.webp"
   }
  ]
 },
 {
  "id": "shadow",
  "name": "Shadow",
  "tagline": "Darkness, stealth and stolen strength.",
  "color": "#828caa",
  "label": [
   39.27,
   -1.58
  ],
  "routes": [
   {
    "from": 45,
    "to": 46,
    "via": [
     [
      27.28,
      -1.1
     ]
    ]
   }
  ],
  "nodes": [
   {
    "id": 34,
    "name": "Gather Shadows",
    "desc": "Darkness gathers in you while you stand in shadow, up to 10: the darker it is, the faster. In light it slowly fades. Your Shadow talents spend Darkness instead of Mana. Grants the \"Gather Shadows\" spell (3 Darkness): for 60 seconds, your melee attacks and Shadow spells are up to 50% stronger in darkness.",
    "parents": [],
    "x": 21.89,
    "y": -0.88,
    "side": 3,
    "img": "gathershadows.webp"
   },
   {
    "id": 36,
    "name": "Dark Reservoir",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     34
    ],
    "x": 19.89,
    "y": -0.8,
    "side": 3,
    "stat": true
   },
   {
    "id": 35,
    "name": "Silent Step",
    "desc": "Your Sneak skill is increased by 10.",
    "parents": [
     34
    ],
    "x": 23.89,
    "y": -0.96,
    "side": 3,
    "stat": true
   },
   {
    "id": 37,
    "name": "Draining Shroud",
    "desc": "Grants the \"Draining Shroud\" spell (4 Darkness): for 60 seconds, you absorb 10 Health and Mana per second from nearby enemies.",
    "parents": [
     35
    ],
    "x": 25.19,
    "y": 1.59,
    "side": 3,
    "img": "drainingshroud.webp"
   },
   {
    "id": 39,
    "name": "Nightblade",
    "desc": "Grants the \"Nightblade\" spell (4 Darkness): for 60 seconds, your power attacks can reach targets up to 50 feet away, dashing you to them for 45 magic damage. Each dash spends half your Darkness, dealing 15 more magic damage per point spent.",
    "parents": [
     35
    ],
    "x": 24.98,
    "y": -3.61,
    "side": 3,
    "img": "nightblade.webp"
   },
   {
    "id": 41,
    "name": "Shade Veil",
    "desc": "While you sneak, your body is wrapped in black and grey mist, you are 50% harder to detect, and Darkness gathers twice as fast.",
    "parents": [
     35
    ],
    "x": 25.58,
    "y": -1.03,
    "side": 0,
    "img": "shadeveil.webp"
   },
   {
    "id": 42,
    "name": "Darkness",
    "desc": "Grants the \"Darkness\" spell (2 Darkness): a bolt that leaves a pool of black mist and darkness where it strikes for 30 seconds.",
    "parents": [
     41
    ],
    "x": 26.48,
    "y": -1.07,
    "side": 2,
    "img": "darkness.webp"
   },
   {
    "id": 38,
    "name": "Soul Siphon",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     37
    ],
    "x": 28.47,
    "y": 3.46,
    "side": 1,
    "stat": true
   },
   {
    "id": 43,
    "name": "Pull Through Shadows",
    "desc": "Grants the \"Pull Through Shadows\" spell (3 Darkness): pull a target up to 150 feet away to you, lowering its armor by 100 for 10 seconds.",
    "parents": [
     37,
     39
    ],
    "x": 27.28,
    "y": -1.1,
    "side": 2,
    "img": "pullthroughshadows.webp"
   },
   {
    "id": 40,
    "name": "Umbral Edge",
    "desc": "Your One-handed skill is increased by 10.",
    "parents": [
     39
    ],
    "x": 28.1,
    "y": -5.74,
    "side": 0,
    "stat": true
   },
   {
    "id": 44,
    "name": "Whispering Mind",
    "desc": "Your Psionics skill is increased by 10.",
    "parents": [
     43
    ],
    "x": 27.36,
    "y": 0.8,
    "side": 2,
    "stat": true
   },
   {
    "id": 45,
    "name": "Unseen",
    "desc": "Your Sneak skill is increased by 10.",
    "parents": [
     43
    ],
    "x": 27.21,
    "y": -3.0,
    "side": 0,
    "stat": true
   },
   {
    "id": 46,
    "name": "Nightfall",
    "desc": "Grants the \"Nightfall\" power (a full Darkness meter): for 60 seconds, a pool of darkness follows you and every Shadow spell you know is cast on you at once.",
    "parents": [
     45
    ],
    "x": 31.68,
    "y": -1.28,
    "side": 0,
    "level": 30,
    "img": "nightfall.webp"
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
   36.0,
   -23.45
  ],
  "routes": [],
  "nodes": [
   {
    "id": 47,
    "name": "Iron Fist",
    "desc": "Your unarmed attacks deal extra damage equal to 15% of your current Stamina. Requires both hands to be empty.",
    "parents": [],
    "x": 22.76,
    "y": -14.83,
    "side": 0,
    "img": "ironfist.webp"
   },
   {
    "id": 49,
    "name": "Iron Knuckles",
    "desc": "Your unarmed attacks deal 5 more damage.",
    "parents": [
     47
    ],
    "x": 20.92,
    "y": -13.63,
    "side": 3,
    "stat": true
   },
   {
    "id": 48,
    "name": "Conditioning",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     47
    ],
    "x": 24.61,
    "y": -16.03,
    "side": 3,
    "stat": true
   },
   {
    "id": 52,
    "name": "Invoker",
    "desc": "Every 5th unarmed hit unleashes fire, frost or lightning on the enemy, at random: a fireball explosion, a freeze that holds it for 4 seconds, or chain lightning that leaps to nearby enemies. Each deals 60 damage.",
    "parents": [
     48
    ],
    "x": 30.13,
    "y": -14.14,
    "side": 1,
    "img": "invoker.webp"
   },
   {
    "id": 50,
    "name": "Hissing Dragon",
    "desc": "Choose a damage type (fire, frost, shock, poison, disease or sun): your unarmed attacks unleash a shockwave that deals it to everyone in front of you. Requires both hands to be empty, and does not trigger while sneaking.",
    "parents": [
     48
    ],
    "x": 28.04,
    "y": -15.16,
    "side": 2,
    "img": "hissingdragon.webp"
   },
   {
    "id": 53,
    "name": "Stunning Blows",
    "desc": "Your unarmed attacks have a 15% chance to stagger enemies, and deal 25% more damage to staggered enemies.",
    "parents": [
     48
    ],
    "x": 25.2,
    "y": -19.52,
    "side": 3,
    "img": "stunningblows.webp"
   },
   {
    "id": 51,
    "name": "Breath Control",
    "desc": "Your Stamina regenerates 25 percent faster.",
    "parents": [
     50
    ],
    "x": 28.51,
    "y": -12.6,
    "side": 1,
    "stat": true
   },
   {
    "id": 55,
    "name": "Breaking Waves",
    "desc": "Your unarmed attacks have a 15% chance to land a critical strike that deals damage equal to 40% of your current Stamina. Requires both hands to be empty.",
    "parents": [
     50,
     53
    ],
    "x": 27.46,
    "y": -17.88,
    "side": 3,
    "img": "breakingwaves.webp"
   },
   {
    "id": 54,
    "name": "Toughened Body",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     53
    ],
    "x": 23.05,
    "y": -20.98,
    "side": 0,
    "stat": true
   },
   {
    "id": 56,
    "name": "Unbroken",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     55
    ],
    "x": 29.62,
    "y": -17.86,
    "side": 2,
    "stat": true
   },
   {
    "id": 57,
    "name": "Inner Calm",
    "desc": "You gain 10% resistance to magic.",
    "parents": [
     55
    ],
    "x": 28.31,
    "y": -19.87,
    "side": 0,
    "stat": true
   },
   {
    "id": 58,
    "name": "Flow State",
    "desc": "Dodging in combat briefly slows time to a crawl (once every 8 seconds) and releases a Shock Nova that deals 40 shock damage to nearby enemies and sends chain lightning into your foe (once every 8 seconds).",
    "parents": [
     57
    ],
    "x": 30.64,
    "y": -19.96,
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
   15.11,
   -39.83
  ],
  "routes": [
   {
    "from": 60,
    "to": 62,
    "via": [
     [
      10.35,
      -27.28
     ]
    ]
   },
   {
    "from": 60,
    "to": 64,
    "via": [
     [
      10.35,
      -27.28
     ]
    ]
   },
   {
    "from": 62,
    "to": 66,
    "via": [
     [
      10.35,
      -27.28
     ]
    ]
   },
   {
    "from": 64,
    "to": 66,
    "via": [
     [
      10.35,
      -27.28
     ]
    ]
   },
   {
    "from": 68,
    "to": 69,
    "via": [
     [
      11.4,
      -30.06
     ]
    ]
   }
  ],
  "nodes": [
   {
    "id": 59,
    "name": "Seismic Stomp",
    "desc": "Grants the \"Seismic Stomp\" power: stomp the ground to send out a shockwave that hurls every enemy within 19 feet into the air and makes them bleed for 50 damage over 5 seconds, while time briefly slows. Usable once every 30 seconds.",
    "parents": [],
    "x": 8.72,
    "y": -22.99,
    "side": 3,
    "img": "seismicstomp.webp"
   },
   {
    "id": 61,
    "name": "Shield Discipline",
    "desc": "Your Blocking skill is increased by 10.",
    "parents": [
     59
    ],
    "x": 7.76,
    "y": -20.47,
    "side": 1,
    "stat": true
   },
   {
    "id": 60,
    "name": "Battle-Hardened",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     59
    ],
    "x": 9.58,
    "y": -25.26,
    "side": 3,
    "stat": true
   },
   {
    "id": 62,
    "name": "Second Wind",
    "desc": "While you are at or below half Health, every hit you take restores 20 Stamina.",
    "parents": [
     60
    ],
    "x": 13.38,
    "y": -26.14,
    "side": 0,
    "img": "secondwind.webp"
   },
   {
    "id": 64,
    "name": "Dragon Scale",
    "desc": "You gain 25% resistance to fire, frost and lightning.",
    "parents": [
     60
    ],
    "x": 7.32,
    "y": -28.43,
    "side": 1,
    "img": "dragonscale.webp"
   },
   {
    "id": 63,
    "name": "Thick Hide",
    "desc": "Your armor rating is increased by 60.",
    "parents": [
     62
    ],
    "x": 15.77,
    "y": -24.07,
    "side": 1,
    "stat": true
   },
   {
    "id": 66,
    "name": "Surrounded",
    "desc": "While 3 or more enemies are near you, you regenerate 2 Stamina per second.",
    "parents": [
     62,
     64
    ],
    "x": 11.4,
    "y": -30.06,
    "side": 0,
    "img": "deathorglory.webp"
   },
   {
    "id": 65,
    "name": "War Cry",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     64
    ],
    "x": 4.16,
    "y": -28.48,
    "side": 0,
    "stat": true
   },
   {
    "id": 67,
    "name": "Veteran",
    "desc": "Your One-handed and Two-handed skills are increased by 10.",
    "parents": [
     66
    ],
    "x": 13.8,
    "y": -29.15,
    "side": 2,
    "stat": true
   },
   {
    "id": 68,
    "name": "Iron Constitution",
    "desc": "Your Health regenerates 25 percent faster.",
    "parents": [
     66
    ],
    "x": 9.0,
    "y": -30.97,
    "side": 0,
    "stat": true
   },
   {
    "id": 69,
    "name": "War Banner",
    "desc": "Grants the \"War Banner\" power: plant a banner for 15 seconds. While you stand near it, you heal 20 Health per second, and enemies who come close are bound in chains, as by a Stave of Binding. Usable once every 5 minutes.",
    "parents": [
     68
    ],
    "x": 13.79,
    "y": -36.37,
    "side": 1,
    "level": 30,
    "img": "warbanner.webp"
   }
  ]
 },
 {
  "id": "rage",
  "name": "Rage",
  "tagline": "Fury, blood and the strength of the fallen.",
  "color": "#f0781e",
  "label": [
   -14.81,
   -39.06
  ],
  "routes": [],
  "nodes": [
   {
    "id": 70,
    "name": "Bloodied Fury",
    "desc": "Rage builds as you fight: every melee hit you land and every hit you take adds a stack, up to 10. Each stack makes your attacks 2% stronger. After 6 seconds without a hit, Rage fades by one stack every 3 seconds, and it is gone when combat ends.",
    "parents": [],
    "x": -7.76,
    "y": -20.46,
    "side": 2,
    "img": "bloodiedfury.webp"
   },
   {
    "id": 72,
    "name": "Iron Lungs",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     70
    ],
    "x": -6.8,
    "y": -17.93,
    "side": 1,
    "stat": true
   },
   {
    "id": 71,
    "name": "Blood Oath",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     70
    ],
    "x": -8.72,
    "y": -22.98,
    "side": 2,
    "stat": true
   },
   {
    "id": 73,
    "name": "Heavenfall",
    "desc": "Your sprinting power attacks with at least 8 Rage tear a burning line through the ground: 80 damage to everyone in it, 4 more per second for 10 seconds, and a stagger. Spends 8 Rage.",
    "parents": [
     71
    ],
    "x": -6.8,
    "y": -26.31,
    "side": 1,
    "img": "heavenfall.webp"
   },
   {
    "id": 77,
    "name": "Shadowbringer",
    "desc": "Your standing power attacks with at least 8 Rage raise a pillar of dark fire: 60 damage, knocking down everyone it strikes. Spends 8 Rage.",
    "parents": [
     71
    ],
    "x": -12.35,
    "y": -24.2,
    "side": 3,
    "img": "shadowbringer.webp"
   },
   {
    "id": 78,
    "name": "Scarred Hide",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     77
    ],
    "x": -14.4,
    "y": -21.98,
    "side": 1,
    "stat": true
   },
   {
    "id": 74,
    "name": "Tempered Steel",
    "desc": "Your One-handed and Two-handed skills are increased by 10.",
    "parents": [
     73
    ],
    "x": -3.8,
    "y": -26.0,
    "side": 1,
    "stat": true
   },
   {
    "id": 75,
    "name": "Shadow Carve",
    "desc": "Your forward power attacks with at least 6 Rage send a wave of darkness in a straight line: 40 damage, and 20 more to targets further away. Spends 6 Rage.",
    "parents": [
     73
    ],
    "x": -5.04,
    "y": -29.28,
    "side": 0,
    "img": "shadowcarve.webp"
   },
   {
    "id": 79,
    "name": "Bloodletter",
    "desc": "Your sideways power attacks with at least 6 Rage drain 40 Health from the target into you. Spends 6 Rage.",
    "parents": [
     77
    ],
    "x": -15.64,
    "y": -25.26,
    "side": 3,
    "img": "bloodletter.webp"
   },
   {
    "id": 76,
    "name": "Dark Deluge",
    "desc": "Your backward power attacks with at least 6 Rage pierce the target for 40 damage and lower its magic resistance by 25% for 30 seconds. Spends 6 Rage.",
    "parents": [
     73
    ],
    "x": -7.79,
    "y": -29.68,
    "side": 0,
    "img": "darkdeluge.webp"
   },
   {
    "id": 81,
    "name": "Soulrender",
    "desc": "Your sideways power attacks with at least 6 Rage drain 40 Mana and 40 Stamina from the target into you. With Bloodletter, one hit does both for one cost. Spends 6 Rage.",
    "parents": [
     77
    ],
    "x": -13.85,
    "y": -27.39,
    "side": 2,
    "img": "soulrender.webp"
   },
   {
    "id": 80,
    "name": "Bloodthirst",
    "desc": "Your Health regenerates 25 percent faster.",
    "parents": [
     79
    ],
    "x": -16.7,
    "y": -28.04,
    "side": 3,
    "stat": true
   },
   {
    "id": 82,
    "name": "Untempered",
    "desc": "Your Rage can reach 15 stacks, and fades half as fast.",
    "parents": [
     75,
     79
    ],
    "x": -11.3,
    "y": -29.8,
    "side": 3,
    "img": "untempered.webp"
   },
   {
    "id": 83,
    "name": "Unending Fury",
    "desc": "Your Stamina regenerates 25 percent faster.",
    "parents": [
     82
    ],
    "x": -12.35,
    "y": -32.57,
    "side": 3,
    "stat": true
   },
   {
    "id": 84,
    "name": "Vehemence",
    "desc": "When your Rage reaches its peak you enter Vehemence for 15 seconds: your power attacks cost no Stamina, and their Rage actions spend no Rage. When it ends, your Rage is spent.",
    "parents": [
     83
    ],
    "x": -13.5,
    "y": -35.6,
    "side": 2,
    "level": 30,
    "img": "vehemence.webp"
   }
  ]
 },
 {
  "id": "druidic",
  "name": "Druidic",
  "tagline": "Roots, totems and the wild.",
  "color": "#73b45f",
  "label": [
   -45.45,
   -29.6
  ],
  "routes": [],
  "nodes": [
   {
    "id": 85,
    "name": "Druidcraft",
    "desc": "Grants the \"Druidcraft\" spell: cast it on a corpse and nature reclaims it, growing a plant you can harvest, and you heal 20 Health and gather a Goodberry.",
    "parents": [],
    "x": -30.54,
    "y": -19.89,
    "side": 0,
    "img": "druidcraft.webp"
   },
   {
    "id": 87,
    "name": "Barkskin",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     85
    ],
    "x": -28.86,
    "y": -18.8,
    "side": 1,
    "stat": true
   },
   {
    "id": 86,
    "name": "Green Wellspring",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     85
    ],
    "x": -32.21,
    "y": -20.98,
    "side": 2,
    "stat": true
   },
   {
    "id": 92,
    "name": "Twister",
    "desc": "Grants the \"Twister\" spell (97 Mana): a column of deadly wind that deals 40 damage per second for 10 seconds and staggers those caught in it.",
    "parents": [
     86
    ],
    "x": -34.73,
    "y": -22.62,
    "side": 0,
    "img": "twister.webp"
   },
   {
    "id": 88,
    "name": "The Hunt",
    "desc": "Grants \"The Hunt\" power: spend 5 Goodberries to call a Gray Wolf to your side. It stays until it is killed.",
    "parents": [
     86
    ],
    "x": -32.3,
    "y": -24.14,
    "side": 2,
    "img": "thehunt.webp"
   },
   {
    "id": 93,
    "name": "Water Totem",
    "desc": "Grants the \"Create Water Totem\" spell: a totem stands for 60 seconds, heals 5 Health and Mana per second and cures disease. An Elementalism spell.",
    "parents": [
     86
    ],
    "x": -34.7,
    "y": -19.73,
    "side": 3,
    "img": "watertotem.webp"
   },
   {
    "id": 94,
    "name": "Deep Roots",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     93
    ],
    "x": -35.23,
    "y": -17.45,
    "side": 2,
    "stat": true
   },
   {
    "id": 89,
    "name": "Wolf Pack",
    "desc": "The Hunt calls two Gray Wolves instead of one.",
    "parents": [
     88
    ],
    "x": -30.32,
    "y": -25.72,
    "side": 0,
    "img": "wolfpack.webp"
   },
   {
    "id": 91,
    "name": "Bramble Growth",
    "desc": "Grants the \"Bramble Growth\" spell: a bed of brambles that deals 10 bleed and poison damage for 15 seconds. A target that dies on it sprouts a Goodberry.",
    "parents": [
     88
    ],
    "x": -34.98,
    "y": -25.89,
    "side": 0,
    "img": "bramblegrowth.webp"
   },
   {
    "id": 95,
    "name": "Tree Totem",
    "desc": "Grants the \"Create Tree Totem\" spell: a totem stands for 60 seconds and deals 10 poison damage per second to nearby enemies in combat. An Elementalism spell.",
    "parents": [
     93
    ],
    "x": -38.13,
    "y": -18.86,
    "side": 1,
    "img": "treetotem.webp"
   },
   {
    "id": 90,
    "name": "Sap of Life",
    "desc": "Your Health regenerates 25 percent faster.",
    "parents": [
     88
    ],
    "x": -32.22,
    "y": -26.47,
    "side": 0,
    "stat": true
   },
   {
    "id": 96,
    "name": "Thornhide",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     95
    ],
    "x": -39.52,
    "y": -20.01,
    "side": 3,
    "stat": true
   },
   {
    "id": 98,
    "name": "Earth Totem",
    "desc": "Grants the \"Create Earth Totem\" spell: a totem stands for 60 seconds and casts tremors that deal 120 damage every 7 seconds in combat. An Elementalism spell.",
    "parents": [
     95
    ],
    "x": -38.16,
    "y": -21.75,
    "side": 3,
    "img": "earthtotem.webp"
   },
   {
    "id": 97,
    "name": "Nature's Way",
    "desc": "You can have one more totem standing at a time.",
    "parents": [
     95
    ],
    "x": -38.77,
    "y": -17.14,
    "side": 1,
    "img": "naturesway.webp"
   },
   {
    "id": 99,
    "name": "Heart of the Grove",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     91,
     98
    ],
    "x": -38.08,
    "y": -24.8,
    "side": 3,
    "stat": true
   },
   {
    "id": 100,
    "name": "Force of Nature",
    "desc": "Grants the \"Force of Nature\" power (no Mana, 50% Arcane Fever): for 60 seconds you take the form of a Horned Lord, whose power attacks steal Mana, and a raven, a snow leopard and two rattlesnakes fight at your side until they are killed or the form ends. It cannot be used when the fever would reach 100%.",
    "parents": [
     99
    ],
    "x": -40.09,
    "y": -26.11,
    "side": 3,
    "level": 30,
    "img": "forceofnature.webp"
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
   -48.43,
   -1.95
  ],
  "routes": [
   {
    "from": 110,
    "to": 111,
    "via": [
     [
      -34.14,
      -1.38
     ]
    ]
   }
  ],
  "nodes": [
   {
    "id": 101,
    "name": "Arcane Arsenal",
    "desc": "Grants the \"Arcane Arsenal\" power: choose Fire, Frost or Lightning, and your bow hits deal 10 extra damage of that element.",
    "parents": [],
    "x": -28.94,
    "y": -1.17,
    "side": 2,
    "img": "arcanearsenal.webp"
   },
   {
    "id": 103,
    "name": "Fletcher's Eye",
    "desc": "Your Archery skill is increased by 10.",
    "parents": [
     101
    ],
    "x": -26.94,
    "y": -1.09,
    "side": 1,
    "stat": true
   },
   {
    "id": 102,
    "name": "Arcane Focus",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     101
    ],
    "x": -30.74,
    "y": -1.24,
    "side": 3,
    "stat": true
   },
   {
    "id": 104,
    "name": "No Distractions",
    "desc": "While you aim a bow, a Spell Ward (Rank II) surrounds you. It fades when you fire or lower the bow.",
    "parents": [
     102
    ],
    "x": -32.39,
    "y": -5.11,
    "side": 3,
    "img": "nodistractions.webp"
   },
   {
    "id": 106,
    "name": "Ice Shot",
    "desc": "Grants the \"Ice Shot\" talent (110 seconds cooldown): with a bow equipped, add 3 ice arrows to your quiver. They deal 25 frost damage and freeze the target solid for 8 seconds, and your next arrow shatters it.",
    "parents": [
     102
    ],
    "x": -32.69,
    "y": 2.49,
    "side": 2,
    "img": "iceshot.webp"
   },
   {
    "id": 105,
    "name": "Mana Spring",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     104
    ],
    "x": -30.54,
    "y": -6.23,
    "side": 0,
    "stat": true
   },
   {
    "id": 108,
    "name": "Andrasta's Owl",
    "desc": "Your bow hits send a barn owl to attack the target. It fights at your side until it is killed, each later hit sends it after that target, and each of its strikes drains 10 Magicka from its target and gives it to you. While it is out, you regenerate 2 Magicka per second. Only one owl can be out at a time.",
    "parents": [
     104,
     106
    ],
    "x": -34.14,
    "y": -1.38,
    "side": 0,
    "img": "sendaraven.webp"
   },
   {
    "id": 107,
    "name": "Frostbound",
    "desc": "You gain 15% resistance to frost.",
    "parents": [
     106
    ],
    "x": -30.94,
    "y": 3.76,
    "side": 1,
    "stat": true
   },
   {
    "id": 109,
    "name": "Owl's Vigil",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     108
    ],
    "x": -34.06,
    "y": -3.27,
    "side": 2,
    "stat": true
   },
   {
    "id": 110,
    "name": "Spellward",
    "desc": "You gain 10% resistance to magic.",
    "parents": [
     108
    ],
    "x": -34.22,
    "y": 0.52,
    "side": 2,
    "stat": true
   },
   {
    "id": 111,
    "name": "Arcane Echo",
    "desc": "Grants the \"Arcane Echo\" power: use it while dual casting a spell to store that spell. Your fully drawn bow shots in combat then also release the stored spell toward your crosshair. Only works with spells cast at others.",
    "parents": [
     110
    ],
    "x": -37.54,
    "y": -1.51,
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
   -37.9,
   20.55
  ],
  "routes": [],
  "nodes": [
   {
    "id": 112,
    "name": "Corpse Fever",
    "desc": "You can command one more summon for every 25% Arcane Fever you have.",
    "parents": [],
    "x": -22.38,
    "y": 12.13,
    "side": 2,
    "img": "corpsefever.webp"
   },
   {
    "id": 114,
    "name": "Grave Pact",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     112
    ],
    "x": -21.76,
    "y": 10.7,
    "side": 0,
    "stat": true
   },
   {
    "id": 113,
    "name": "Dark Studies",
    "desc": "Your Entropy skill is increased by 10.",
    "parents": [
     112
    ],
    "x": -23.05,
    "y": 13.68,
    "side": 3,
    "stat": true
   },
   {
    "id": 115,
    "name": "Dark Effigy",
    "desc": "Grants the \"Dark Effigy\" spell (100 Magicka): raise a dark totem for 60 seconds. You and your undead summons near it heal 2 Health per second, and you and your allies near it gain 250 armor.",
    "parents": [
     113
    ],
    "x": -22.07,
    "y": 14.68,
    "side": 2,
    "img": "darkeffigy.webp"
   },
   {
    "id": 117,
    "name": "A Willing Sacrifice",
    "desc": "Grants the \"A Willing Sacrifice\" power: every summon you command explodes, dealing damage equal to half its maximum Health to each enemy within 14 feet of it. Usable once every 15 seconds.",
    "parents": [
     113
    ],
    "x": -23.83,
    "y": 15.47,
    "side": 3,
    "img": "willingsacrifice.webp"
   },
   {
    "id": 116,
    "name": "Corpse Ward",
    "desc": "You gain 15% resistance to poison.",
    "parents": [
     115
    ],
    "x": -21.01,
    "y": 15.49,
    "side": 2,
    "stat": true
   },
   {
    "id": 119,
    "name": "The Dead Don't Forget",
    "desc": "A Willing Sacrifice restores 50 Magicka for every enemy it hits.",
    "parents": [
     117
    ],
    "x": -24.61,
    "y": 17.26,
    "side": 1,
    "img": "deaddontforget.webp"
   },
   {
    "id": 118,
    "name": "Death's Patience",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     117
    ],
    "x": -22.71,
    "y": 16.46,
    "side": 2,
    "stat": true
   },
   {
    "id": 120,
    "name": "Cold Blood",
    "desc": "You gain 15% resistance to frost.",
    "parents": [
     119
    ],
    "x": -23.74,
    "y": 18.34,
    "side": 1,
    "stat": true
   },
   {
    "id": 121,
    "name": "Bone Armour",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     119
    ],
    "x": -26.74,
    "y": 17.25,
    "side": 3,
    "stat": true
   },
   {
    "id": 122,
    "name": "Legion of the Damned",
    "desc": "Grants the \"Legion of the Damned\" power: at the cost of 50% Arcane Fever, raise six skeletons (two warriors, two archers and two mages) that fight at your side for 5 minutes. They do not count against your summon limit, and A Willing Sacrifice can explode them. A new Legion replaces the old one.",
    "parents": [
     121
    ],
    "x": -28.32,
    "y": 15.35,
    "side": 3,
    "level": 30,
    "img": "legiondamned.webp"
   }
  ]
 },
 {
  "id": "sorcery",
  "name": "Sorcery",
  "tagline": "Elements, stars and raw arcane might.",
  "color": "#5ac8e6",
  "label": [
   -20.27,
   34.04
  ],
  "routes": [],
  "nodes": [
   {
    "id": 123,
    "name": "Blink Step",
    "desc": "Grants the \"Blink Step\" lesser power (35 Mana): you shatter like glass and re-form up to 33 feet ahead.",
    "parents": [],
    "x": -10.95,
    "y": 18.4,
    "side": 2,
    "img": "blinkstep.webp"
   },
   {
    "id": 125,
    "name": "Mana Font",
    "desc": "Your maximum Mana is increased by 75.",
    "parents": [
     123
    ],
    "x": -9.93,
    "y": 16.68,
    "side": 0,
    "stat": true
   },
   {
    "id": 124,
    "name": "Arcane Study",
    "desc": "Your Elementalism skill is increased by 10.",
    "parents": [
     123
    ],
    "x": -12.08,
    "y": 20.29,
    "side": 2,
    "stat": true
   },
   {
    "id": 126,
    "name": "Orbit Ward",
    "desc": "While you cast a spell, five glass wards orbit you. Each absorbs one whole weapon, arrow or claw hit, then breaks. They fall away when you stop casting.",
    "parents": [
     124
    ],
    "x": -14.99,
    "y": 20.88,
    "side": 2,
    "img": "orbitward.webp"
   },
   {
    "id": 132,
    "name": "Starlance",
    "desc": "Grants the \"Starlance\" spell: beams of pure Mana fall from the night sky on a single target for 120 damage.",
    "parents": [
     124
    ],
    "x": -11.21,
    "y": 23.13,
    "side": 2,
    "img": "starlance.webp"
   },
   {
    "id": 133,
    "name": "Storm Ward",
    "desc": "You gain 15% resistance to lightning.",
    "parents": [
     132
    ],
    "x": -9.15,
    "y": 23.19,
    "side": 2,
    "stat": true
   },
   {
    "id": 127,
    "name": "Ember Ward",
    "desc": "You gain 15% resistance to fire.",
    "parents": [
     126
    ],
    "x": -16.03,
    "y": 19.1,
    "side": 0,
    "stat": true
   },
   {
    "id": 128,
    "name": "Frost Spires",
    "desc": "Grants the \"Frost Spires\" spell: spires of ice burst from the ground, dealing 80 damage to Health and Stamina - up to four times that the more spires strike - and staggering.",
    "parents": [
     126
    ],
    "x": -16.73,
    "y": 23.8,
    "side": 3,
    "img": "frostspires.webp"
   },
   {
    "id": 134,
    "name": "Twin Effigies",
    "desc": "Grants the \"Twin Effigies\" spell: two copies of you, one on each side, draw your enemies' attacks for 30 seconds and cast the spells you held when you cast it. Each shatters after taking a third of your Health in damage. They grow with your Psionics: at 50 they last 40 seconds and take almost half your Health, at 75 50 seconds and two thirds, at 100 a full minute and more than your whole Health.",
    "parents": [
     132
    ],
    "x": -12.95,
    "y": 26.05,
    "side": 2,
    "img": "twineffigies.webp"
   },
   {
    "id": 131,
    "name": "Wildfire",
    "desc": "Grants the \"Wildfire\" spell: a torrent of flame chases your targets, dealing 80 damage per second.",
    "parents": [
     126
    ],
    "x": -17.74,
    "y": 21.58,
    "side": 3,
    "img": "wildfire.webp"
   },
   {
    "id": 135,
    "name": "Gravity Well",
    "desc": "Grants the \"Gravity Well\" spell: a well of gravity pulls nearby enemies into it and staggers them, and drains 20 Health from each into you.",
    "parents": [
     132
    ],
    "x": -10.52,
    "y": 25.87,
    "side": 2,
    "img": "gravitywell.webp"
   },
   {
    "id": 129,
    "name": "Rime Ward",
    "desc": "You gain 15% resistance to frost.",
    "parents": [
     128
    ],
    "x": -19.0,
    "y": 24.09,
    "side": 3,
    "stat": true
   },
   {
    "id": 136,
    "name": "Falling Star",
    "desc": "Grants the \"Falling Star\" spell: a falling star strikes for 60 damage and staggers; a target with more Mana than Health also loses Mana.",
    "parents": [
     128,
     134
    ],
    "x": -15.66,
    "y": 26.3,
    "side": 1,
    "img": "fallingstar.webp"
   },
   {
    "id": 130,
    "name": "Drowning Orb",
    "desc": "Grants the \"Drowning Orb\" spell: a 15-foot sphere of water slows everyone inside it and drains 60 Stamina and Mana per second. Each enemy inside it gives you 10 of its Mana per second, and you restore 10 Mana per second while you stand in it. An Elementalism spell: water is frost, so Elementalist talents strengthen it.",
    "parents": [
     128
    ],
    "x": -18.27,
    "y": 26.38,
    "side": 3,
    "img": "drowningorb.webp"
   },
   {
    "id": 137,
    "name": "Arcane Tide",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     136
    ],
    "x": -16.89,
    "y": 28.37,
    "side": 2,
    "stat": true
   },
   {
    "id": 138,
    "name": "Veil Wyrm",
    "desc": "Grants the \"Veil Wyrm\" shout, all three words: a wyrm of glass forms over your shoulder and roars. Its shockwaves cut and stagger every enemy around you and slow time; two words bring a Veilblade - a copy of you with your weapons - out of the burst to fight for you, three words two of them and throw your enemies back, and you vanish in the shards for 10 seconds. Then blue flames of Mana burn around you for 20 seconds: your spells cost half as much Mana and you restore 10 Mana per second. One word recovers in 40 seconds, two in 70, three in 100.",
    "parents": [
     137
    ],
    "x": -18.22,
    "y": 30.6,
    "side": 2,
    "level": 30,
    "img": "veilwyrm.webp"
   }
  ]
 }
];
