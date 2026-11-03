// Prophecy talent trees, generated from ZenProphecyUI.json in the installed list's MO2 mod
// `Zenderal - Prophecy v3 (Constellation)` (zenderal-patches src/ProphecyV3/data/SKSE/Plugins/). Nodes are in unlock
// order; `id` and `parents` are the game's node indexes. x/y are radial-map units (y up, start point at 0,0); `side`
// places the label (0 below, 1 above, 2 right, 3 left); `routes` bend a prerequisite line through waypoints. Art:
// public/uploads/guide/prophecy/ (`bg` only for trees with their own banner).
export const PROPHECY_EXTENT = 55;

export const PROPHECY_TREES = [
 {
  "id": "faith",
  "name": "Faith",
  "tagline": "Holy light, sacred wards and smiting.",
  "color": "#e8c46e",
  "bg": "faith.webp",
  "label": [
   0,
   47.99
  ],
  "routes": [
   {
    "from": 1,
    "to": 3,
    "via": [
     [
      0,
      39.49
     ]
    ]
   },
   {
    "from": 1,
    "to": 5,
    "via": [
     [
      0,
      39.49
     ]
    ]
   },
   {
    "from": 3,
    "to": 9,
    "via": [
     [
      0,
      39.49
     ]
    ]
   },
   {
    "from": 5,
    "to": 9,
    "via": [
     [
      0,
      39.49
     ]
    ]
   },
   {
    "from": 7,
    "to": 8,
    "via": [
     [
      0,
      41.89
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
    "x": 0,
    "y": 33.89,
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
    "x": 0,
    "y": 31.49,
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
    "x": 0,
    "y": 36.69,
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
    "y": 39.49,
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
    "y": 39.49,
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
    "y": 39.49,
    "side": 3,
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
    "x": 0,
    "y": 41.89,
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
    "y": 39.49,
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
    "y": 41.89,
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
    "y": 41.89,
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
    "x": 0,
    "y": 44.29,
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
   29.3,
   45.6
  ],
  "routes": [],
  "nodes": [
   {
    "id": 11,
    "name": "Quick Reload",
    "desc": "You reload muskets 30% faster.",
    "parents": [],
    "x": 18.32,
    "y": 28.51,
    "side": 3,
    "img": "quickreload.webp"
   },
   {
    "id": 13,
    "name": "Powder Lungs",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     11
    ],
    "x": 20.75,
    "y": 26.86,
    "side": 0,
    "stat": true
   },
   {
    "id": 12,
    "name": "Steady Aim",
    "desc": "Your Marksman skill is increased by 10.",
    "parents": [
     11
    ],
    "x": 19.9,
    "y": 30.83,
    "side": 3,
    "stat": true
   },
   {
    "id": 14,
    "name": "Elemental Rounds",
    "desc": "Your musket hits deal 10 extra fire damage.",
    "parents": [
     12
    ],
    "x": 21.24,
    "y": 33.3,
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
    "x": 23.32,
    "y": 32.37,
    "side": 3,
    "img": "bleedingshot.webp"
   },
   {
    "id": 18,
    "name": "Ricochet Rounds",
    "desc": "Your pistol shots have a 25% chance to ricochet off their target into another enemy up to 45 feet away, hitting it with the same shot.",
    "parents": [
     12
    ],
    "x": 22.33,
    "y": 29.17,
    "side": 2
   },
   {
    "id": 15,
    "name": "Quick Breath",
    "desc": "Your Stamina regenerates 25 percent faster.",
    "parents": [
     14
    ],
    "x": 18.89,
    "y": 33.57,
    "side": 1,
    "stat": true
   },
   {
    "id": 24,
    "name": "Run and Gun",
    "desc": "You move at full speed while aiming a musket.",
    "parents": [
     14,
     16
    ],
    "x": 22.88,
    "y": 35.81,
    "side": 3,
    "img": "runandgun.webp"
   },
   {
    "id": 19,
    "name": "Hair Trigger",
    "desc": "You reload pistols in 1.2 seconds instead of 2, and Elemental Rounds and Bleeding Shot work with your pistols too.",
    "parents": [
     18
    ],
    "x": 25.42,
    "y": 29.49,
    "side": 2
   },
   {
    "id": 17,
    "name": "Leather Duster",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     16
    ],
    "x": 25.62,
    "y": 32.02,
    "side": 2,
    "stat": true
   },
   {
    "id": 25,
    "name": "Bandolier",
    "desc": "Your carry weight is increased by 25.",
    "parents": [
     24
    ],
    "x": 27.02,
    "y": 38.56,
    "side": 2,
    "stat": true
   },
   {
    "id": 26,
    "name": "Hardened Nerves",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     24
    ],
    "x": 24.73,
    "y": 38.67,
    "side": 3,
    "stat": true
   },
   {
    "id": 20,
    "name": "Point Blank",
    "desc": "Your pistol hits on an enemy within 12 feet deal 50% more damage and stagger it.",
    "parents": [
     19
    ],
    "x": 27.81,
    "y": 31.25,
    "side": 2
   },
   {
    "id": 21,
    "name": "Blade and Barrel",
    "desc": "A melee hit reloads your pistols at once (once every 15 seconds), and a pistol hit makes your next melee hit within 3 seconds deal 25% more damage.",
    "parents": [
     19
    ],
    "x": 27.09,
    "y": 33.68,
    "side": 2
   },
   {
    "id": 27,
    "name": "Deadeye",
    "desc": "A musket shot at a target you haven't shot in the last 10 seconds is a critical strike that deals triple critical damage, and its weapon enchantments are twice as strong.",
    "parents": [
     26
    ],
    "x": 26.98,
    "y": 41.98,
    "side": 0,
    "level": 30,
    "img": "deadeye.webp"
   },
   {
    "id": 22,
    "name": "Coup de Grace",
    "desc": "Your pistol hits deal double damage to enemies that are staggered, knocked down, bleeding out or below 25% Health.",
    "parents": [
     20,
     21
    ],
    "x": 29.61,
    "y": 33.9,
    "side": 2
   },
   {
    "id": 23,
    "name": "Fan the Hammer",
    "desc": "Grants the \"Fan the Hammer\" power (no Mana, 50% Arcane Fever): for 6 seconds time slows around you, your pistols reload at once and every pistol hit ricochets into another enemy. It cannot be used at 50% Arcane Fever or more.",
    "parents": [
     22
    ],
    "x": 30.37,
    "y": 36.76,
    "side": 2,
    "level": 30
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
   46.28,
   21.14
  ],
  "routes": [],
  "nodes": [
   {
    "id": 28,
    "name": "Explosive Tripwire",
    "desc": "Grants the \"Explosive Tripwire\" power: at will, set a tripwire in front of you that lasts 120 seconds. When tripped, it snaps and knocks everyone it hits to the ground, and an enemy who trips it sets off an explosion that deals 40 damage.",
    "parents": [],
    "x": 30.83,
    "y": 14.08,
    "side": 3,
    "img": "tripwire.webp"
   },
   {
    "id": 30,
    "name": "Toolbelt",
    "desc": "Your carry weight is increased by 30.",
    "parents": [
     28
    ],
    "x": 28.65,
    "y": 13.08,
    "side": 0,
    "stat": true
   },
   {
    "id": 29,
    "name": "Tinkerer",
    "desc": "Your Handicraft skill is increased by 10.",
    "parents": [
     28
    ],
    "x": 33.01,
    "y": 15.08,
    "side": 0,
    "stat": true
   },
   {
    "id": 31,
    "name": "Smokescreen",
    "desc": "Grants the \"Smokescreen\" power: once a day, create a 35-foot cloud of smoke for 180 seconds and turn invisible for 10 seconds. Those inside the cloud are blinded and cannot see sneaking targets, and your sneak attacks against them deal 50% more damage.",
    "parents": [
     29
    ],
    "x": 33.84,
    "y": 18.09,
    "side": 3,
    "img": "smokescreen.webp"
   },
   {
    "id": 34,
    "name": "Utility Droid",
    "desc": "Grants the \"Utility Droid\" power: throw out a mechanical spider that follows you, heals you and staggers enemies around it. It lasts until destroyed, and using the power again calls it back to you. Your first droid is free; each new one costs 10 Spare Parts.",
    "parents": [
     29
    ],
    "x": 35.83,
    "y": 13.72,
    "side": 0,
    "img": "utilitydroid.webp"
   },
   {
    "id": 35,
    "name": "Riveted Plating",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     34
    ],
    "x": 39.59,
    "y": 15.11,
    "side": 2,
    "stat": true
   },
   {
    "id": 32,
    "name": "Fume Mask",
    "desc": "You gain 15% resistance to poison.",
    "parents": [
     31
    ],
    "x": 37.35,
    "y": 20.03,
    "side": 2,
    "stat": true
   },
   {
    "id": 36,
    "name": "Clockwork Turret",
    "desc": "You can build Clockwork Turrets at a forge, and you receive one when you learn this. The \"Clockwork Turret\" power deploys it for 30 seconds: it turns and fires at your target, or the nearest enemy in combat, dealing damage equal to 30% of your Handicraft skill.",
    "parents": [
     31,
     34
    ],
    "x": 35.38,
    "y": 16.16,
    "side": 3,
    "img": "clockworkturret.webp"
   },
   {
    "id": 33,
    "name": "Chaff",
    "desc": "Your Smokescreen cloud also blinds automatons: mechanical spiders, spheres and centurions inside it can no longer see you.",
    "parents": [
     31
    ],
    "x": 32.88,
    "y": 20.18,
    "side": 1
   },
   {
    "id": 37,
    "name": "Insulated Gloves",
    "desc": "You gain 15% resistance to lightning.",
    "parents": [
     36
    ],
    "x": 37.47,
    "y": 15.68,
    "side": 2,
    "stat": true
   },
   {
    "id": 38,
    "name": "Steady Hands",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     36
    ],
    "x": 36.39,
    "y": 18.05,
    "side": 2,
    "stat": true
   },
   {
    "id": 39,
    "name": "Overclock",
    "desc": "Your Clockwork Turret power deploys two turrets side by side, and they fire 2% faster with every shot, up to 200%.",
    "parents": [
     38
    ],
    "x": 38.47,
    "y": 17.57,
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
   51.36,
   -7.39
  ],
  "routes": [
   {
    "from": 51,
    "to": 52,
    "via": [
     [
      38.89,
      -5.59
     ]
    ]
   }
  ],
  "nodes": [
   {
    "id": 40,
    "name": "Gather Shadows",
    "desc": "Darkness gathers in you while you stand in shadow, up to 10: the darker it is, the faster. In light it slowly fades. Your Shadow talents spend Darkness instead of Mana. Grants the \"Gather Shadows\" spell (3 Darkness): for 60 seconds, your melee attacks and Shadow spells are up to 50% stronger in darkness.",
    "parents": [],
    "x": 33.55,
    "y": -4.82,
    "side": 3,
    "img": "gathershadows.webp"
   },
   {
    "id": 42,
    "name": "Dark Reservoir",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     40
    ],
    "x": 31.57,
    "y": -4.54,
    "side": 3,
    "stat": true
   },
   {
    "id": 41,
    "name": "Silent Step",
    "desc": "Your Sneak skill is increased by 10.",
    "parents": [
     40
    ],
    "x": 35.53,
    "y": -5.11,
    "side": 3,
    "stat": true
   },
   {
    "id": 43,
    "name": "Draining Shroud",
    "desc": "Grants the \"Draining Shroud\" spell (4 Darkness): for 60 seconds, you absorb 10 Health per second from nearby enemies, and every 4 seconds of draining an enemy builds 1 Darkness.",
    "parents": [
     41
    ],
    "x": 37.09,
    "y": -2.71,
    "side": 3,
    "img": "drainingshroud.webp"
   },
   {
    "id": 45,
    "name": "Nightblade",
    "desc": "Grants the \"Nightblade\" spell (4 Darkness): for 60 seconds, your power attacks can reach targets up to 50 feet away, dashing you to them for 45 magic damage. Each dash spends half your Darkness, dealing 15 more magic damage per point spent.",
    "parents": [
     41
    ],
    "x": 36.35,
    "y": -7.85,
    "side": 3,
    "img": "nightblade.webp"
   },
   {
    "id": 47,
    "name": "Shade Veil",
    "desc": "While you sneak, your body is wrapped in black and grey mist, you are 50% harder to detect, and Darkness gathers twice as fast.",
    "parents": [
     41
    ],
    "x": 37.21,
    "y": -5.35,
    "side": 2,
    "img": "shadeveil.webp"
   },
   {
    "id": 48,
    "name": "Darkness",
    "desc": "Grants the \"Darkness\" spell (2 Darkness): a bolt that leaves a pool of black mist and darkness where it strikes for 30 seconds.",
    "parents": [
     47
    ],
    "x": 38.1,
    "y": -5.48,
    "side": 2,
    "img": "darkness.webp"
   },
   {
    "id": 44,
    "name": "Soul Siphon",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     43
    ],
    "x": 40.54,
    "y": -1.18,
    "side": 1,
    "stat": true
   },
   {
    "id": 49,
    "name": "Pull Through Shadows",
    "desc": "Grants the \"Pull Through Shadows\" spell (3 Darkness): pull a target up to 150 feet away to you, lowering its armor by 100 for 10 seconds.",
    "parents": [
     43,
     45
    ],
    "x": 38.89,
    "y": -5.59,
    "side": 2,
    "img": "pullthroughshadows.webp"
   },
   {
    "id": 46,
    "name": "Umbral Edge",
    "desc": "Your One-handed skill is increased by 10.",
    "parents": [
     45
    ],
    "x": 39.23,
    "y": -10.29,
    "side": 0,
    "stat": true
   },
   {
    "id": 50,
    "name": "Whispering Mind",
    "desc": "Your Psionics skill is increased by 10.",
    "parents": [
     49
    ],
    "x": 39.16,
    "y": -3.71,
    "side": 2,
    "stat": true
   },
   {
    "id": 51,
    "name": "Unseen",
    "desc": "Your Sneak skill is increased by 10.",
    "parents": [
     49
    ],
    "x": 38.62,
    "y": -7.47,
    "side": 2,
    "stat": true
   },
   {
    "id": 52,
    "name": "Nightfall",
    "desc": "Grants the \"Nightfall\" power (a full Darkness meter): for 60 seconds, a pool of darkness follows you and every Shadow spell you know is cast on you at once.",
    "parents": [
     51
    ],
    "x": 43.25,
    "y": -6.22,
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
   36.88,
   -31.95
  ],
  "routes": [],
  "nodes": [
   {
    "id": 53,
    "name": "Iron Fist",
    "desc": "Your unarmed attacks deal extra damage equal to 15% of your current Stamina. Requires both hands to be empty.",
    "parents": [],
    "x": 25.62,
    "y": -22.2,
    "side": 3,
    "img": "ironfist.webp"
   },
   {
    "id": 55,
    "name": "Iron Knuckles",
    "desc": "Your unarmed attacks deal 5 more damage.",
    "parents": [
     53
    ],
    "x": 23.95,
    "y": -20.75,
    "side": 1,
    "stat": true
   },
   {
    "id": 54,
    "name": "Conditioning",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     53
    ],
    "x": 27.28,
    "y": -23.64,
    "side": 0,
    "stat": true
   },
   {
    "id": 58,
    "name": "Invoker",
    "desc": "Every 5th unarmed hit unleashes fire, frost or lightning on the enemy, at random: a fireball explosion, a freeze that holds it for 4 seconds, or chain lightning that leaps to nearby enemies. Each deals 60 damage.",
    "parents": [
     54
    ],
    "x": 33.01,
    "y": -22.52,
    "side": 1,
    "img": "invoker.webp"
   },
   {
    "id": 56,
    "name": "Hissing Dragon",
    "desc": "Choose a damage type (fire, frost, shock, poison, disease or sun): your unarmed attacks unleash a shockwave that deals it to everyone in front of you. Requires both hands to be empty, and does not trigger while sneaking.",
    "parents": [
     54
    ],
    "x": 30.79,
    "y": -23.24,
    "side": 2,
    "img": "hissingdragon.webp"
   },
   {
    "id": 59,
    "name": "Stunning Blows",
    "desc": "Your unarmed attacks have a 15% chance to stagger enemies, and deal 25% more damage to staggered enemies.",
    "parents": [
     54
    ],
    "x": 27.39,
    "y": -27.17,
    "side": 3,
    "img": "stunningblows.webp"
   },
   {
    "id": 57,
    "name": "Breath Control",
    "desc": "Your Stamina regenerates 25 percent faster.",
    "parents": [
     56
    ],
    "x": 31.61,
    "y": -20.77,
    "side": 1,
    "stat": true
   },
   {
    "id": 61,
    "name": "Breaking Waves",
    "desc": "Your unarmed attacks have a 15% chance to land a critical strike that deals damage equal to 40% of your current Stamina. Requires both hands to be empty.",
    "parents": [
     56,
     59
    ],
    "x": 29.85,
    "y": -25.86,
    "side": 2,
    "img": "breakingwaves.webp"
   },
   {
    "id": 60,
    "name": "Toughened Body",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     59
    ],
    "x": 25.06,
    "y": -28.33,
    "side": 0,
    "stat": true
   },
   {
    "id": 62,
    "name": "Unbroken",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     61
    ],
    "x": 31.99,
    "y": -26.13,
    "side": 2,
    "stat": true
   },
   {
    "id": 63,
    "name": "Inner Calm",
    "desc": "You gain 10% resistance to magic.",
    "parents": [
     61
    ],
    "x": 30.42,
    "y": -27.95,
    "side": 0,
    "stat": true
   },
   {
    "id": 64,
    "name": "Flow State",
    "desc": "Dodging in combat briefly slows time to a crawl (once every 8 seconds) and releases a Shock Nova that deals 40 shock damage to nearby enemies and sends chain lightning into your foe (once every 8 seconds).",
    "parents": [
     63
    ],
    "x": 32.72,
    "y": -28.35,
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
   14.62,
   -49.8
  ],
  "routes": [
   {
    "from": 66,
    "to": 68,
    "via": [
     [
      10.84,
      -36.92
     ]
    ]
   },
   {
    "from": 66,
    "to": 70,
    "via": [
     [
      10.84,
      -36.92
     ]
    ]
   },
   {
    "from": 68,
    "to": 72,
    "via": [
     [
      10.84,
      -36.92
     ]
    ]
   },
   {
    "from": 70,
    "to": 72,
    "via": [
     [
      10.84,
      -36.92
     ]
    ]
   },
   {
    "from": 74,
    "to": 75,
    "via": [
     [
      11.68,
      -39.77
     ]
    ]
   }
  ],
  "nodes": [
   {
    "id": 65,
    "name": "Seismic Stomp",
    "desc": "Grants the \"Seismic Stomp\" power: stomp the ground to send out a shockwave that makes every enemy within 19 feet bleed for 50 damage over 5 seconds, while time briefly slows. Enemies of your level or lower are hurled into the air; stronger and unique enemies are staggered for 3 seconds instead. Usable once every 30 seconds.",
    "parents": [],
    "x": 9.55,
    "y": -32.52,
    "side": 2,
    "img": "seismicstomp.webp"
   },
   {
    "id": 67,
    "name": "Shield Discipline",
    "desc": "Your Blocking skill is increased by 10.",
    "parents": [
     65
    ],
    "x": 8.79,
    "y": -29.93,
    "side": 1,
    "stat": true
   },
   {
    "id": 66,
    "name": "Battle-Hardened",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     65
    ],
    "x": 10.23,
    "y": -34.85,
    "side": 3,
    "stat": true
   },
   {
    "id": 68,
    "name": "Second Wind",
    "desc": "While you are at or below half Health, every hit you take restores 20 Stamina.",
    "parents": [
     66
    ],
    "x": 13.95,
    "y": -36.01,
    "side": 0,
    "img": "secondwind.webp"
   },
   {
    "id": 70,
    "name": "Dragon Scale",
    "desc": "You gain 25% resistance to fire, frost and lightning.",
    "parents": [
     66
    ],
    "x": 7.73,
    "y": -37.84,
    "side": 1,
    "img": "dragonscale.webp"
   },
   {
    "id": 69,
    "name": "Thick Hide",
    "desc": "Your armor rating is increased by 60.",
    "parents": [
     68
    ],
    "x": 16.5,
    "y": -34.14,
    "side": 2,
    "stat": true
   },
   {
    "id": 72,
    "name": "Surrounded",
    "desc": "While 3 or more enemies are near you, you regenerate 2 Stamina per second.",
    "parents": [
     68,
     70
    ],
    "x": 11.68,
    "y": -39.77,
    "side": 0,
    "img": "deathorglory.webp"
   },
   {
    "id": 71,
    "name": "War Cry",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     70
    ],
    "x": 4.58,
    "y": -37.64,
    "side": 0,
    "stat": true
   },
   {
    "id": 73,
    "name": "Veteran",
    "desc": "Your One-handed and Two-handed skills are increased by 10.",
    "parents": [
     72
    ],
    "x": 14.14,
    "y": -39.05,
    "side": 2,
    "stat": true
   },
   {
    "id": 74,
    "name": "Iron Constitution",
    "desc": "Your Health regenerates 25 percent faster.",
    "parents": [
     72
    ],
    "x": 9.22,
    "y": -40.5,
    "side": 0,
    "stat": true
   },
   {
    "id": 75,
    "name": "War Banner",
    "desc": "Grants the \"War Banner\" power: plant a banner for 15 seconds. While you stand near it, you heal 20 Health per second, and enemies who come close are bound in chains, as by a Stave of Binding. Usable once every 5 minutes.",
    "parents": [
     74
    ],
    "x": 13.58,
    "y": -46.25,
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
   -15.16,
   -51.61
  ],
  "routes": [],
  "nodes": [
   {
    "id": 76,
    "name": "Bloodied Fury",
    "desc": "Rage builds as you fight: every melee hit you land and every hit you take adds a stack, up to 10. Each stack makes your attacks 2% stronger. After 6 seconds without a hit, Rage fades by one stack every 3 seconds, and it is gone when combat ends.",
    "parents": [],
    "x": -9.55,
    "y": -32.52,
    "side": 2,
    "img": "bloodiedfury.webp"
   },
   {
    "id": 78,
    "name": "Iron Lungs",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     76
    ],
    "x": -8.79,
    "y": -29.93,
    "side": 1,
    "stat": true
   },
   {
    "id": 77,
    "name": "Blood Oath",
    "desc": "Your maximum Health is increased by 25.",
    "parents": [
     76
    ],
    "x": -10.31,
    "y": -35.11,
    "side": 2,
    "stat": true
   },
   {
    "id": 79,
    "name": "Heavenfall",
    "desc": "Your sprinting power attacks with at least 8 Rage tear a burning line through the ground: 80 damage to everyone in it, 4 more per second for 10 seconds, and a stagger. Spends 8 Rage.",
    "parents": [
     77
    ],
    "x": -8.14,
    "y": -38.28,
    "side": 3,
    "img": "heavenfall.webp"
   },
   {
    "id": 83,
    "name": "Shadowbringer",
    "desc": "Your standing power attacks with at least 8 Rage raise a pillar of dark fire: 60 damage, knocking down everyone it strikes. Spends 8 Rage.",
    "parents": [
     77
    ],
    "x": -13.84,
    "y": -36.61,
    "side": 2,
    "img": "shadowbringer.webp"
   },
   {
    "id": 84,
    "name": "Scarred Hide",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     83
    ],
    "x": -16.05,
    "y": -34.55,
    "side": 1,
    "stat": true
   },
   {
    "id": 80,
    "name": "Tempered Steel",
    "desc": "Your One-handed and Two-handed skills are increased by 10.",
    "parents": [
     79
    ],
    "x": -5.17,
    "y": -37.74,
    "side": 1,
    "stat": true
   },
   {
    "id": 81,
    "name": "Shadow Carve",
    "desc": "Your forward power attacks with at least 6 Rage send a wave of darkness in a straight line: 40 damage, and 20 more to targets further away. Spends 6 Rage.",
    "parents": [
     79
    ],
    "x": -6.16,
    "y": -41.11,
    "side": 2,
    "img": "shadowcarve.webp"
   },
   {
    "id": 85,
    "name": "Bloodletter",
    "desc": "Your sideways power attacks with at least 6 Rage drain 40 Health from the target into you. Spends 6 Rage.",
    "parents": [
     83
    ],
    "x": -17.04,
    "y": -37.92,
    "side": 3,
    "img": "bloodletter.webp"
   },
   {
    "id": 82,
    "name": "Dark Deluge",
    "desc": "Your backward power attacks with at least 6 Rage pierce the target for 40 damage and lower its magic resistance by 25% for 30 seconds. Spends 6 Rage.",
    "parents": [
     79
    ],
    "x": -8.87,
    "y": -41.72,
    "side": 0,
    "img": "darkdeluge.webp"
   },
   {
    "id": 87,
    "name": "Soulrender",
    "desc": "Your sideways power attacks with at least 6 Rage drain 40 Mana and 40 Stamina from the target into you. With Bloodletter, one hit does both for one cost. Spends 6 Rage.",
    "parents": [
     83
    ],
    "x": -15.09,
    "y": -39.9,
    "side": 2,
    "img": "soulrender.webp"
   },
   {
    "id": 86,
    "name": "Bloodthirst",
    "desc": "Your Health regenerates 25 percent faster.",
    "parents": [
     85
    ],
    "x": -17.88,
    "y": -40.77,
    "side": 0,
    "stat": true
   },
   {
    "id": 88,
    "name": "Untempered",
    "desc": "Your Rage can reach 15 stacks, and fades half as fast.",
    "parents": [
     81,
     85
    ],
    "x": -12.36,
    "y": -42.11,
    "side": 3,
    "img": "untempered.webp"
   },
   {
    "id": 89,
    "name": "Unending Fury",
    "desc": "Your Stamina regenerates 25 percent faster.",
    "parents": [
     88
    ],
    "x": -13.2,
    "y": -44.96,
    "side": 2,
    "stat": true
   },
   {
    "id": 90,
    "name": "Vehemence",
    "desc": "When your Rage reaches its peak you enter Vehemence for 15 seconds: your power attacks cost no Stamina, and their Rage actions spend no Rage. When it ends, your Rage is spent.",
    "parents": [
     89
    ],
    "x": -14.11,
    "y": -48.06,
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
   -38.39,
   -33.26
  ],
  "routes": [],
  "nodes": [
   {
    "id": 91,
    "name": "Druidcraft",
    "desc": "Grants the \"Druidcraft\" spell: cast it on a corpse and nature reclaims it, growing a plant you can harvest, and you heal 20 Health and gather a Goodberry.",
    "parents": [],
    "x": -25.61,
    "y": -22.2,
    "side": 1,
    "img": "druidcraft.webp"
   },
   {
    "id": 93,
    "name": "Barkskin",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     91
    ],
    "x": -24.1,
    "y": -20.89,
    "side": 1,
    "stat": true
   },
   {
    "id": 92,
    "name": "Green Wellspring",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     91
    ],
    "x": -27.13,
    "y": -23.51,
    "side": 2,
    "stat": true
   },
   {
    "id": 98,
    "name": "Twister",
    "desc": "Grants the \"Twister\" spell (97 Mana): a column of deadly wind that deals 40 damage per second for 10 seconds and staggers those caught in it.",
    "parents": [
     92
    ],
    "x": -29.39,
    "y": -25.47,
    "side": 3,
    "img": "twister.webp"
   },
   {
    "id": 94,
    "name": "The Hunt",
    "desc": "Grants \"The Hunt\" power: spend 5 Goodberries to call a Gray Wolf to your side. It stays until it is killed.",
    "parents": [
     92
    ],
    "x": -26.78,
    "y": -26.65,
    "side": 1,
    "img": "thehunt.webp"
   },
   {
    "id": 99,
    "name": "Water Totem",
    "desc": "Grants the \"Create Water Totem\" spell: a totem stands for 60 seconds, heals 5 Health and Mana per second and cures disease. An Elementalism spell.",
    "parents": [
     92
    ],
    "x": -29.76,
    "y": -22.61,
    "side": 2,
    "img": "watertotem.webp"
   },
   {
    "id": 100,
    "name": "Deep Roots",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     99
    ],
    "x": -30.59,
    "y": -20.42,
    "side": 1,
    "stat": true
   },
   {
    "id": 95,
    "name": "Wolf Pack",
    "desc": "The Hunt calls two Gray Wolves instead of one.",
    "parents": [
     94
    ],
    "x": -24.61,
    "y": -27.94,
    "side": 2,
    "img": "wolfpack.webp"
   },
   {
    "id": 97,
    "name": "Bramble Growth",
    "desc": "Grants the \"Bramble Growth\" spell: a bed of brambles that deals 10 bleed and poison damage for 15 seconds. A target that dies on it sprouts a Goodberry.",
    "parents": [
     94
    ],
    "x": -29.2,
    "y": -28.74,
    "side": 0,
    "img": "bramblegrowth.webp"
   },
   {
    "id": 101,
    "name": "Tree Totem",
    "desc": "Grants the \"Create Tree Totem\" spell: a totem stands for 60 seconds and deals 10 poison damage per second to nearby enemies in combat. An Elementalism spell.",
    "parents": [
     99
    ],
    "x": -33.27,
    "y": -22.21,
    "side": 3,
    "img": "treetotem.webp"
   },
   {
    "id": 96,
    "name": "Sap of Life",
    "desc": "Your Health regenerates 25 percent faster.",
    "parents": [
     94
    ],
    "x": -26.38,
    "y": -28.95,
    "side": 0,
    "stat": true
   },
   {
    "id": 102,
    "name": "Thornhide",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     101
    ],
    "x": -34.5,
    "y": -23.54,
    "side": 3,
    "stat": true
   },
   {
    "id": 104,
    "name": "Earth Totem",
    "desc": "Grants the \"Create Earth Totem\" spell: a totem stands for 60 seconds and casts tremors that deal 120 damage every 7 seconds in combat. An Elementalism spell.",
    "parents": [
     101
    ],
    "x": -32.91,
    "y": -25.08,
    "side": 3,
    "img": "earthtotem.webp"
   },
   {
    "id": 103,
    "name": "Nature's Way",
    "desc": "You can have one more totem standing at a time.",
    "parents": [
     101
    ],
    "x": -34.15,
    "y": -20.59,
    "side": 1,
    "img": "naturesway.webp"
   },
   {
    "id": 105,
    "name": "Heart of the Grove",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     97,
     104
    ],
    "x": -32.42,
    "y": -28.09,
    "side": 3,
    "stat": true
   },
   {
    "id": 106,
    "name": "Force of Nature",
    "desc": "Grants the \"Force of Nature\" power (no Mana, 50% Arcane Fever): for 60 seconds you take the form of a Horned Lord, whose power attacks steal Mana, and a raven, a snow leopard and two rattlesnakes fight at your side until they are killed or the form ends. It cannot be used when the fever would reach 100%.",
    "parents": [
     105
    ],
    "x": -34.23,
    "y": -29.66,
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
   -52.85,
   -7.6
  ],
  "routes": [
   {
    "from": 116,
    "to": 117,
    "via": [
     [
      -38.7,
      -5.56
     ]
    ]
   }
  ],
  "nodes": [
   {
    "id": 107,
    "name": "Arcane Arsenal",
    "desc": "Grants the \"Arcane Arsenal\" power: choose Fire, Frost or Lightning, and your bow hits deal 10 extra damage of that element.",
    "parents": [],
    "x": -33.55,
    "y": -4.82,
    "side": 1,
    "img": "arcanearsenal.webp"
   },
   {
    "id": 109,
    "name": "Fletcher's Eye",
    "desc": "Your Marksman skill is increased by 10.",
    "parents": [
     107
    ],
    "x": -31.57,
    "y": -4.54,
    "side": 2,
    "stat": true
   },
   {
    "id": 108,
    "name": "Arcane Focus",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     107
    ],
    "x": -35.33,
    "y": -5.08,
    "side": 2,
    "stat": true
   },
   {
    "id": 110,
    "name": "No Distractions",
    "desc": "While you aim a bow, a Spell Ward (Rank II) surrounds you. It fades when you fire or lower the bow.",
    "parents": [
     108
    ],
    "x": -36.57,
    "y": -9.1,
    "side": 0,
    "img": "nodistractions.webp"
   },
   {
    "id": 112,
    "name": "Ice Shot",
    "desc": "Grants the \"Ice Shot\" talent (110 seconds cooldown): with a bow equipped, add 3 ice arrows to your quiver. They deal 25 frost damage and freeze a weak target - no higher level than you, never a unique foe - solid for 8 seconds, and your next arrow shatters it.",
    "parents": [
     108
    ],
    "x": -37.65,
    "y": -1.57,
    "side": 2,
    "img": "iceshot.webp"
   },
   {
    "id": 111,
    "name": "Mana Spring",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     110
    ],
    "x": -34.62,
    "y": -10.03,
    "side": 0,
    "stat": true
   },
   {
    "id": 114,
    "name": "Andrasta's Owl",
    "desc": "Your bow hits send a barn owl to attack the target. It fights at your side until it is killed, each later hit sends it after that target, and each of its strikes drains 10 Magicka from its target and gives it to you. While it is out, you regenerate 2 Magicka per second. Only one owl can be out at a time.",
    "parents": [
     110,
     112
    ],
    "x": -38.7,
    "y": -5.56,
    "side": 3,
    "img": "sendaraven.webp"
   },
   {
    "id": 113,
    "name": "Frostbound",
    "desc": "You gain 15% resistance to frost.",
    "parents": [
     112
    ],
    "x": -36.04,
    "y": -0.13,
    "side": 1,
    "stat": true
   },
   {
    "id": 115,
    "name": "Owl's Vigil",
    "desc": "Your maximum Stamina is increased by 25.",
    "parents": [
     114
    ],
    "x": -38.43,
    "y": -7.44,
    "side": 2,
    "stat": true
   },
   {
    "id": 116,
    "name": "Spellward",
    "desc": "You gain 10% resistance to magic.",
    "parents": [
     114
    ],
    "x": -38.97,
    "y": -3.68,
    "side": 3,
    "stat": true
   },
   {
    "id": 117,
    "name": "Arcane Echo",
    "desc": "Grants the \"Arcane Echo\" power: use it while dual casting a spell to store that spell. Your fully drawn bow shots in combat then also release the stored spell toward your crosshair. Only works with spells cast at others.",
    "parents": [
     116
    ],
    "x": -42.06,
    "y": -6.05,
    "side": 3,
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
   -46.9,
   21.42
  ],
  "routes": [],
  "nodes": [
   {
    "id": 118,
    "name": "Corpse Fever",
    "desc": "You can command one more summon for every 25% Arcane Fever you have.",
    "parents": [],
    "x": -30.83,
    "y": 14.08,
    "side": 2,
    "img": "corpsefever.webp"
   },
   {
    "id": 120,
    "name": "Grave Pact",
    "desc": "Your maximum Mana is increased by 25.",
    "parents": [
     118
    ],
    "x": -30.11,
    "y": 12.7,
    "side": 0,
    "stat": true
   },
   {
    "id": 119,
    "name": "Dark Studies",
    "desc": "Your Entropy skill is increased by 10.",
    "parents": [
     118
    ],
    "x": -31.61,
    "y": 15.58,
    "side": 0,
    "stat": true
   },
   {
    "id": 121,
    "name": "Dark Effigy",
    "desc": "Grants the \"Dark Effigy\" spell (100 Magicka): raise a dark totem for 60 seconds. You and your undead summons near it heal 2 Health per second, and you and your allies near it gain 250 armor.",
    "parents": [
     119
    ],
    "x": -30.7,
    "y": 16.64,
    "side": 2,
    "img": "darkeffigy.webp"
   },
   {
    "id": 123,
    "name": "A Willing Sacrifice",
    "desc": "Grants the \"A Willing Sacrifice\" power: every summon you command explodes, dealing damage equal to half its maximum Health to each enemy within 14 feet of it. Usable once every 15 seconds.",
    "parents": [
     119
    ],
    "x": -32.51,
    "y": 17.31,
    "side": 3,
    "img": "willingsacrifice.webp"
   },
   {
    "id": 122,
    "name": "Corpse Ward",
    "desc": "You gain 15% resistance to poison.",
    "parents": [
     121
    ],
    "x": -29.69,
    "y": 17.53,
    "side": 2,
    "stat": true
   },
   {
    "id": 125,
    "name": "The Dead Don't Forget",
    "desc": "A Willing Sacrifice restores 50 Magicka for every enemy it hits.",
    "parents": [
     123
    ],
    "x": -33.41,
    "y": 19.04,
    "side": 3,
    "img": "deaddontforget.webp"
   },
   {
    "id": 124,
    "name": "Death's Patience",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     123
    ],
    "x": -31.45,
    "y": 18.37,
    "side": 2,
    "stat": true
   },
   {
    "id": 126,
    "name": "Cold Blood",
    "desc": "You gain 15% resistance to frost.",
    "parents": [
     125
    ],
    "x": -32.61,
    "y": 20.19,
    "side": 1,
    "stat": true
   },
   {
    "id": 127,
    "name": "Bone Armour",
    "desc": "Your armor rating is increased by 40.",
    "parents": [
     125
    ],
    "x": -35.53,
    "y": 18.89,
    "side": 3,
    "stat": true
   },
   {
    "id": 128,
    "name": "Legion of the Damned",
    "desc": "Grants the \"Legion of the Damned\" power: at the cost of 50% Arcane Fever, raise six skeletons (two warriors, two archers and two mages) that fight at your side for 5 minutes. They do not count against your summon limit, and A Willing Sacrifice can explode them. A new Legion replaces the old one.",
    "parents": [
     127
    ],
    "x": -36.98,
    "y": 16.89,
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
   -28.33,
   44.08
  ],
  "routes": [],
  "nodes": [
   {
    "id": 129,
    "name": "Blink Step",
    "desc": "Grants the \"Blink Step\" lesser power (35 Mana): you shatter like glass and re-form up to 33 feet ahead.",
    "parents": [],
    "x": -18.32,
    "y": 28.51,
    "side": 2,
    "img": "blinkstep.webp"
   },
   {
    "id": 131,
    "name": "Mana Font",
    "desc": "Your maximum Mana is increased by 75.",
    "parents": [
     129
    ],
    "x": -17.24,
    "y": 26.83,
    "side": 0,
    "stat": true
   },
   {
    "id": 130,
    "name": "Arcane Study",
    "desc": "Your Elementalism skill is increased by 10.",
    "parents": [
     129
    ],
    "x": -19.51,
    "y": 30.36,
    "side": 2,
    "stat": true
   },
   {
    "id": 132,
    "name": "Orbit Ward",
    "desc": "While you cast a spell, five glass wards orbit you. Each absorbs one whole weapon, arrow or claw hit, then breaks. They fall away when you stop casting.",
    "parents": [
     130
    ],
    "x": -22.45,
    "y": 30.86,
    "side": 2,
    "img": "orbitward.webp"
   },
   {
    "id": 138,
    "name": "Starlance",
    "desc": "Grants the \"Starlance\" spell: beams of pure Mana fall from the night sky on a single target for 80 damage.",
    "parents": [
     130
    ],
    "x": -18.74,
    "y": 33.24,
    "side": 2,
    "img": "starlance.webp"
   },
   {
    "id": 139,
    "name": "Storm Ward",
    "desc": "You gain 15% resistance to lightning.",
    "parents": [
     138
    ],
    "x": -16.69,
    "y": 33.37,
    "side": 2,
    "stat": true
   },
   {
    "id": 133,
    "name": "Ember Ward",
    "desc": "You gain 15% resistance to fire.",
    "parents": [
     132
    ],
    "x": -23.42,
    "y": 29.04,
    "side": 0,
    "stat": true
   },
   {
    "id": 134,
    "name": "Frost Spires",
    "desc": "Grants the \"Frost Spires\" spell: spires of ice burst from the ground, dealing 30 damage to Health and Stamina - up to four times that the more spires strike - and staggering.",
    "parents": [
     132
    ],
    "x": -24.28,
    "y": 33.72,
    "side": 3,
    "img": "frostspires.webp"
   },
   {
    "id": 140,
    "name": "Twin Effigies",
    "desc": "Grants the \"Twin Effigies\" spell: two copies of you, one on each side, draw your enemies' attacks for 30 seconds and hurl chain lightning at them every 6 seconds, 40 damage a bolt. Each shatters after taking a third of your Health in damage. They grow with your Psionics: at 50 they last 40 seconds and take almost half your Health, at 75 50 seconds and two thirds, at 100 a full minute and more than your whole Health.",
    "parents": [
     138
    ],
    "x": -20.58,
    "y": 36.1,
    "side": 1,
    "img": "twineffigies.webp"
   },
   {
    "id": 137,
    "name": "Wildfire",
    "desc": "Grants the \"Wildfire\" spell: a bolt of flame strikes for 40 damage and leaves a fire that chases your targets for 10 seconds, burning 12 damage each time it catches them.",
    "parents": [
     132
    ],
    "x": -25.21,
    "y": 31.46,
    "side": 3,
    "img": "wildfire.webp"
   },
   {
    "id": 141,
    "name": "Gravity Well",
    "desc": "Grants the \"Gravity Well\" spell: a well of gravity pulls nearby enemies into it and staggers them, and drains 20 Health from each into you.",
    "parents": [
     138
    ],
    "x": -18.14,
    "y": 36,
    "side": 2,
    "img": "gravitywell.webp"
   },
   {
    "id": 135,
    "name": "Rime Ward",
    "desc": "You gain 15% resistance to frost.",
    "parents": [
     134
    ],
    "x": -26.55,
    "y": 33.92,
    "side": 3,
    "stat": true
   },
   {
    "id": 142,
    "name": "Falling Star",
    "desc": "Grants the \"Falling Star\" spell: a falling star strikes for 60 damage and staggers; a target with more Mana than Health also loses Mana.",
    "parents": [
     134,
     140
    ],
    "x": -23.3,
    "y": 36.25,
    "side": 1,
    "img": "fallingstar.webp"
   },
   {
    "id": 136,
    "name": "Drowning Orb",
    "desc": "Grants the \"Drowning Orb\" spell: a 15-foot sphere of water slows everyone inside it and drains 30 Stamina and Mana per second. Each enemy inside it gives you 10 of its Mana per second, and you restore 10 Mana per second while you stand in it. An Elementalism spell: water is frost, so Elementalist talents strengthen it.",
    "parents": [
     134
    ],
    "x": -25.91,
    "y": 36.24,
    "side": 3,
    "img": "drowningorb.webp"
   },
   {
    "id": 143,
    "name": "Arcane Tide",
    "desc": "Your Mana regenerates 10 percent faster.",
    "parents": [
     142
    ],
    "x": -24.6,
    "y": 38.27,
    "side": 3,
    "stat": true
   },
   {
    "id": 144,
    "name": "Veil Wyrm",
    "desc": "Grants the \"Veil Wyrm\" shout, all three words: a wyrm of glass forms over your shoulder and roars. Its shockwaves cut and stagger every enemy around you and slow time; two words bring a Veilblade - a copy of you with your weapons - out of the burst to fight for you, three words two of them and throw your enemies back, and you vanish in the shards for 10 seconds. Then blue flames of Mana burn around you for 20 seconds: your spells cost half as much Mana and you restore 10 Mana per second. One word recovers in 40 seconds, two in 70, three in 100.",
    "parents": [
     143
    ],
    "x": -26,
    "y": 40.46,
    "side": 2,
    "level": 30,
    "img": "veilwyrm.webp"
   }
  ]
 }
];
