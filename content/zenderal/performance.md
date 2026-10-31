Zenderal's graphics are split across two mods, each with its own in-game menu.

| Press        | Opens                                | Use it for                                                         |
| ------------ | ------------------------------------ | ------------------------------------------------------------------ |
| **Insert** | **Bottled Shaders** (Community Shaders) | Upscaling (DLSS, FSR) and every lighting, shadow and weather feature |
| **End**      | **Theo's Render Pipeline** (TRP)     | Frame generation and Neural Rendering                              |

**Numpad \*** switches Bottled Shaders off and on for a quick before-and-after.

If DLSS or frame generation won't start at all, go through the [DLSS & Frame Gen](#dlss) page first.

---

## Recommended settings

Pick your graphics card's maker below, find your card and follow the steps, then fine-tune with the quick wins. They're starting points for **1440p**, not benchmarks: drop the upscaling one step at 4K, and raise it one step at 1080p.

The upscaling column is the **Upscale Preset**, with the share of your resolution the game renders at, as the menu shows it. At 1440p (2560 × 1440):

| Preset | Scale | Renders at, for 1440p | Looks |
| ------ | ----- | --------------------- | ----- |
| **DLAA / Native AA** | 1× | 2560 × 1440 | Sharpest. Costs the most |
| **Quality** | 0.67× | 1707 × 960 | Close to native |
| **Balanced** | 0.59× | 1510 × 850 | Zenderal's default. Slightly softer |
| **Performance** | 0.5× | 1280 × 720 | Softer, especially in motion |
| **Ultra Performance** | 0.33× | 853 × 480 | Visibly blurry. Last resort |

Cards below the [recommended specs](#readme/recommended-specs) may need Ultra Performance and a few [heavy features](#performance/bottled-shaders) turned off.

##### ![NVIDIA](uploads/brands/nvidia.svg)

**Your card**

| Card | Upscaling (Insert → Upscaling) | Frame generation (End) | Neural Rendering (End) |
| ---- | ------------------------------ | ---------------------- | ---------------------- |
| **RTX 5090, 5080** | DLSS **Quality** (0.67×) | **x2**. x3 or x4 on a 240 Hz screen | **On**, one pass after upscaling |
| **RTX 5070 Ti, 5070** | DLSS **Balanced** (0.59×) | **x2** | **On**, Placement **Before upscaling** |
| **RTX 5060 Ti, 5060** | DLSS **Performance** (0.5×) | **x2** | **Off** |
| **RTX 4090, 4080** | DLSS **Quality** (0.67×) | **x2** | **On**, one pass after upscaling |
| **RTX 4070 Ti, 4070** | DLSS **Balanced** (0.59×) | **x2** | **On**, Placement **Before upscaling** |
| **RTX 4060 Ti, 4060** | DLSS **Performance** (0.5×) | **x2** | **Off** |
| **RTX 3090, 3080** | DLSS **Balanced** (0.59×) | **Off**. Experimental on 30-series | **Off** |
| **RTX 3070, 3060 Ti** | DLSS **Performance** (0.5×) | **Off** | **Off** |
| **RTX 3060 and below** | DLSS **Performance** (0.5×), at 1080p | **Off** | **Off** |

**Set it up**

1. **Update your driver** in the NVIDIA app.
2. In the NVIDIA app, **turn off Smooth Motion** for the game if you've turned it on. It's a second frame generation, on top of TRP's.
3. Insert → **Upscaling** → set **Method** to **NVIDIA DLSS** and **Upscale Preset** to your card's row. Leave Bottled Shaders' own **Frame Generation** off (TRP does it) and **Low Latency Mode** on. Press **Ctrl + S**.
4. End → **Frame generation** → keep **Provider** on **NVIDIA DLSS-G** and set the **Multiplier** from your card's row. Leave **Reflex** on **Low latency**.
5. End → **Neural Rendering** → set it as in your card's row. Still short of FPS? Set **Model rate** to **Every other frame** before turning it off.
6. Press **Apply**, check it plays well, then **Save as default**.

On RTX 20-series cards, use the RTX 30-series rows for upscaling and leave frame generation and Neural Rendering off. GTX cards can't run DLSS: follow the AMD steps with **AMD FSR**.

##### ![AMD](uploads/brands/amd.svg)

**Your card**

| Card | Upscaling (Insert → Upscaling) | Frame generation (Insert → Upscaling) | Neural Rendering |
| ---- | ------------------------------ | ------------------------------------- | ---------------- |
| **RX 9070 XT, 9070** | AMD FSR **Balanced** (0.59×), tick **Use Runtime FSR4** | **On** | Not available |
| **RX 9060 XT** | AMD FSR **Performance** (0.5×), tick **Use Runtime FSR4** | On at 60 FPS or more | Not available |
| **RX 7900 XTX, 7900 XT** | AMD FSR **Quality** (0.67×) | **On** | Not available |
| **RX 7800 XT, 7700 XT** | AMD FSR **Balanced** (0.59×) | On at 60 FPS or more | Not available |
| **RX 6950 XT to 6800** | AMD FSR **Balanced** (0.59×) | **Off** | Not available |
| **RX 6750 XT and below** | AMD FSR **Performance** (0.5×) | **Off** | Not available |

DLSS, NVIDIA frame generation, Reflex and Neural Rendering need an NVIDIA RTX card. Everything else in Zenderal runs on Radeon.

**Set it up**

1. **Update your driver** in AMD Software.
2. In AMD Software, **turn off AMD Fluid Motion Frames (AFMF)** and **Radeon Super Resolution** for the game.
3. Insert → **Upscaling** → set **Method** to **AMD FSR** and **Upscale Preset** to your card's row. On RX 9000-series cards, also tick **Use Runtime FSR4**.
4. For frame generation, tick **Frame Generation** on the same page (AMD FSR, fixed x2). It needs windowed or borderless mode, and on screens under 120 Hz also tick **Allow frame generation below 120 Hz**. Press **Ctrl + S**.
5. Use **one** frame generation only. If TRP shows Intel XeFG frame generation in its **Frame generation** tab (End), turn it off there.
6. Tune the shader features as on NVIDIA. Start with [what costs the most](#performance/bottled-shaders).

##### ![Intel](uploads/brands/intel.svg)

**Your card**

| Card | Upscaling (Insert → Upscaling) | Frame generation | Neural Rendering |
| ---- | ------------------------------ | ---------------- | ---------------- |
| **Arc B580, A770 and others** | AMD FSR **Performance** (0.5×) | **Off** | Not available |

DLSS, NVIDIA frame generation, Reflex and Neural Rendering need an NVIDIA RTX card. Everything else in Zenderal runs on Arc.

**Set it up**

1. **Update your driver** in Intel Graphics Software.
2. Insert → **Upscaling** → set **Method** to **AMD FSR** and **Upscale Preset** to **Performance**. Press **Ctrl + S**.
3. Leave frame generation **off** at first. If the game runs at 60 FPS or more, you can try Bottled Shaders' **Frame Generation** on the same page (AMD FSR, x2), in windowed or borderless mode.
4. Use **one** frame generation only. If TRP shows Intel XeFG frame generation in its **Frame generation** tab (End), turn it off there.
5. Tune the shader features. Start with [what costs the most](#performance/bottled-shaders).

---

## Quick wins

Low FPS? Try these in order. Each one gains more than the next.

1. **Lower the upscale preset.** Insert → **Upscaling** → **Upscale Preset**: Balanced → Performance.
2. **Make Neural Rendering cheaper.** End → **Neural Rendering** → set **Placement** to **Before upscaling**, or untick it.
3. **Turn off a heavy shader feature.** See [what costs the most](#performance/bottled-shaders).
4. **Keep frame generation at x2**, and only use it when the game already runs at about 60 FPS.

Hitching rather than low FPS? Go to [Stuttering](#performance/stuttering).

---

## Upscaling

Upscaling is done by **Bottled Shaders**, not TRP. Open it with **Insert**, then **Display → Upscaling**.

| Setting            | What to pick                                                                 |
| ------------------ | ---------------------------------------------------------------------------- |
| **Method**         | **NVIDIA DLSS** on an RTX card. **AMD FSR** on AMD, Intel or older NVIDIA cards |
| **Upscale Preset** | How far below your resolution the game renders. Zenderal ships **Balanced** |
| **Frame Generation** | Leave **off** on NVIDIA. TRP does frame generation                         |
| **Low Latency Mode** | Leave **on** (NVIDIA Reflex). It cuts input lag                             |

| Preset                 | Renders at | Pick it when                                   |
| ---------------------- | ---------- | ---------------------------------------------- |
| **DLAA / Native AA**   | 1×         | You have plenty of headroom                    |
| **Quality**            | 0.67×      | 1080p, or a fast card at 1440p                 |
| **Balanced** (default) | 0.59×      | Most PCs at 1440p                              |
| **Performance**        | 0.5×       | 4K, or when you need the frames                |
| **Ultra Performance**  | 0.33×      | Last resort. It looks soft                     |

Press **Ctrl + S** (or **Save Settings**) to keep your changes. Keep the game itself at your monitor's native resolution and let the preset lower the render resolution.

---

## Theo's Render Pipeline

![Theo's Render Pipeline menu, Neural Rendering tab, with the pipeline bar along the top](uploads/trp-menu.webp)

*Press End. The bar along the top shows what's running: the world rendered at 1976 × 847, Bottled Shaders upscaling it (59%), one Neural Rendering pass, then frame generation x2 to the 3360 × 1440 output.*

- **Apply** changes settings for this session. **Save as default** keeps them.
- The green **Healthy** in the top right means everything loaded. If it says something else, see the [DLSS & Frame Gen](#dlss/common-problems) page.
- The graph on the left shows **frame time**. A flat line feels smooth. Spikes are hitches.

The menu has four tabs: **Image**, **Neural Rendering**, **Frame generation** and **Advanced**. Upscaling, render scale and sharpening belong to Bottled Shaders, so the Image tab points you to its menu.

### Neural Rendering

Neural Rendering, the NVIDIA feature people call "DLSS 5", runs an AI pass that refines lighting, tone and skin. Zenderal ships it **on**, as one pass after upscaling. It's the most expensive setting in either menu. **NR per frame**, in the left column, shows what it costs you in milliseconds.

| Option | Choices | What it does |
| ------ | ------- | ------------ |
| **Neural Rendering** | On or off, plus the runtime | **Automatic** picks the newest NVIDIA model your card can run. Leave it on Automatic |
| **Placement** | **Before upscaling** | Runs on the smaller rendered image (1976 × 847 in the screenshot), before Bottled Shaders upscales it. Much cheaper, a little less fine detail |
| | **After upscaling** (Zenderal's default) | Runs on the full output image (3360 × 1440). Best result, costs the most |
| **Model rate** | **Every frame** (default) | The model runs on every rendered frame |
| | **Every other frame** | The model runs on alternate frames, and the frames between reuse its result, moved with the scene. About half NR's cost, with some ghosting in fast motion. Pairs best with x2 frame generation |
| **Passes** | 1 to 5 (the **+** beside Pass 1) | Each extra pass runs NR again on the previous pass's result, for a stronger effect. Every pass costs about as much as the first |
| **One pass in** | **Combat**, **Weapons drawn** | Drops to one pass while you're fighting or have a weapon out, then goes back a few seconds after. Only matters with 2 or more passes |
| **Style** | **Default**, **Natural**, **Cinematic**, **Custom** | The look of each pass, with **Intensity**, **Local tone**, **Local structure** and **Skin structure** sliders. Changes the image, not the FPS |
| **Compare** | **Split**, **Freeze frame** | Split shows NR on one side of the screen only. Freeze frame holds one frame so you can compare settings on identical content (needs After upscaling, and works best with frame generation off). Neither is saved |

> **Before upscaling not allowed?**
> If the menu says this NR runtime can't run before CS upscaling, leave Placement on After upscaling and use Every other frame to save FPS instead.

**To save FPS, from the smallest loss in quality to the biggest:**

| Step | Where | Saves |
| ---- | ----- | ----- |
| 1 | **Model rate → Every other frame** | About half of NR's cost |
| 2 | **Placement → Before upscaling** | Most of NR's cost, more at 4K |
| 3 | Untick **Neural Rendering** | All of it |

On RTX 20 and 30-series cards, turn it off. Don't add a second pass unless you have a high-end card.

### Frame generation

Frame generation adds generated frames between the real ones. It smooths motion but doesn't make the game respond faster.

- Use it only when the game runs at **about 60 FPS or more** without it. Below that it smears and feels floaty.
- Stay at **x2**. RTX 50-series cards can go higher, at the cost of more artefacts.
- The FPS counter includes generated frames. Judge by how it plays, not the number. **Raster FPS**, top left, is the real frame rate.
- On RTX 20 and 30-series cards it's experimental. If it misbehaves, turn it off.

| Option | Choices | What it does |
| ------ | ------- | ------------ |
| **Provider** | **NVIDIA DLSS-G** (default) | NVIDIA's frame generation. Needs an RTX card |
| | **Intel XeFG** (experimental) | Intel's, meant for non-NVIDIA cards. It costs noticeably more than DLSS-G on NVIDIA. On AMD and Intel, Bottled Shaders' own FSR frame generation is the tested route |
| **Multiplier** | **x2** (default), x3, x4 | How many frames you see per real one. x3 and x4 are official on RTX 50-series and experimental on 40 and 30-series |
| | **Use fixed multiplier** or **Dynamic** | Dynamic lets NVIDIA pick the multiplier to reach a **Target FPS** (0 follows your refresh rate). Not every runtime supports it |
| **Preset** | **A: Standard** | The HUD is generated together with the scene |
| | **B: UI recomposition** | The scene and HUD are generated separately, so the HUD ghosts less in motion. Small GPU and VRAM cost |
| | **C: Lite blending** (beta) | NVIDIA's lighter blending, without UI recomposition |
| **Frame limit** | **Off** (default) | No cap from TRP. Other mods' limits still apply |
| | **Output cap** | Caps the final FPS, generated frames included |
| | **Steady** | Evens out the time between real frames. Try it if the game feels uneven at a good FPS |
| **Reflex** | **Off**, **Low latency** (default), **Low latency + GPU boost** | NVIDIA Reflex cuts input lag, which frame generation adds to. Boost keeps the GPU clocks up for a little less lag and a little more power |
| **VSync** | **Auto** (default), **Off**, **On** | Leave it on Auto. NVIDIA frame generation needs VSync off on some systems, and Auto handles that |

If you see tearing, set **Frame limit → Output cap** a few FPS below your screen's refresh rate.

---

## Bottled Shaders

Bottled Shaders, a Community Shaders fork, handles lighting, shadows, water, grass, snow and weather. It also runs Zenderal's ENB-style look through **Effects 11**. Press **Insert**. Search finds individual settings, and **Ctrl + S** saves.

### "Feature Issues" in red is expected

![Bottled Shaders' Feature Issues page listing Overrides under Baseline Preset Failures](uploads/cs-feature-issues.webp)

*The menu opens on Feature Issues, with "Overrides" listed under Baseline Preset Failures.*

> **This is not a bug**
> Zenderal sets Bottled Shaders up with its own override files rather than a baseline preset, so this notice shows every time. Your shaders are working. **Don't press Delete** next to Overrides, and you don't need to report it.

### What costs the most

Turn these off one at a time and watch the FPS. Each feature's page has a **Load at Boot** switch in its top right. Turn it off and restart to remove the feature completely, which also frees video memory.

| Feature                           | What it does                                   | Cost            |
| --------------------------------- | ---------------------------------------------- | --------------- |
| **Screen Space GI**               | Bounced light and contact shadows              | High            |
| **Volumetric Lighting**           | God rays and light through fog                 | High            |
| **Effects 11**                    | The ENB-style look: bloom, lens, depth of field | Medium to high |
| **Screen Space Shadows**          | Fine shadows under small objects               | Medium          |
| **Skylighting**                   | Open-sky light and shade under cover           | Medium          |
| **Snow Cover / Snow Deformation** | Snow building up, footprints                   | Medium, in snow |
| **Terrain Shadows**               | Distant hills casting shadows                  | Medium          |

Effects 11 changes the look the most, so turn it off last. **Shift + Numpad \*** switches it off and on to compare.

### Shader compilation

Bottled Shaders builds its shaders on your PC on the first launch, and again after a driver or Zenderal update. The bottom-left corner of the menu counts them ("4 shaders ready").

- **Let it finish.** The game hitches while it compiles.
- **Don't press Esc** on the compile screen at startup. That skips it, and the shaders then compile while you play.
- **Clear Shader Cache** (top of the menu) forces a full rebuild. Use it only if something looks wrong after an update.

---

## Stuttering

Stutter is when the FPS looks fine but the game hitches. Open the one that matches.

#### It stutters on the first launch or after an update

That's shader compilation. Let it finish. If it keeps stuttering after several launches, press **Clear Shader Cache** in the Bottled Shaders menu and restart.

#### It hitches when entering new areas or cities

- **Install on an SSD.** An NVMe drive is best. Zenderal is too big to stream from a hard drive.
- **Video memory.** Hitching that gets worse the longer you play usually means the GPU is full. Check **Task Manager → Performance → GPU → Dedicated GPU memory**. On 8 GB cards, turn Neural Rendering off and switch off a few [heavy features](#performance/bottled-shaders) with **Load at Boot**.
- **System memory.** Close browsers and other heavy apps. With 16 GB of RAM, let Windows manage the page file.

#### Motion feels uneven even at high FPS

- In TRP, set **Frame limit** to **Steady**.
- Turn on **G-Sync** or **FreeSync** if your monitor has it.
- Use only **one** frame limiter, and no frame generation outside Zenderal: Lossless Scaling, AMD Fluid Motion Frames, NVIDIA Smooth Motion.
- If the base frame rate is under about 60 FPS, lower the upscale preset first.

#### It hitches at a steady rhythm, even standing still

Overlays are the usual cause. Close **RivaTuner / MSI Afterburner**, the **Discord**, **Steam** and **NVIDIA App** overlays, and RGB or monitoring software, then test again.

If you've added mods, **Object Impact Framework** and **Detailed Mini Map** are known to cause this with Bottled Shaders. Zenderal doesn't include either.

#### Other things to check

- **NVIDIA shader cache:** NVIDIA Control Panel → **Manage 3D settings** → **Shader Cache Size** → **Unlimited**.
- **Power:** a **Balanced** or **High performance** power plan, and laptops plugged in.
- **Laptops:** run the game on the dedicated GPU ([step 7 of Before you start](#dlss/before-you-start)).
- **Drivers:** keep your GPU driver and Windows up to date.

---

## Reporting a problem

Ask in the Zenderal [Discord](https://discord.com/invite/aunT9MdevX) with:

- Your **GPU**, **CPU**, **RAM**, **driver version** and **resolution**.
- Screenshots of the **End** and **Insert** menus.
- Where it happens and whether it's low FPS or stutter.
- **`TheosRenderPipeline.log`** and **`BottledShaders.log`** from `Documents\My Games\Skyrim Special Edition\SKSE`. Copy them **before** relaunching, since each launch overwrites them.
