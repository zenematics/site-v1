Zenderal's graphics run on two mods, each with its own in-game menu. This page covers what each setting costs, where to get frames back and what to do about stutter.

- **[Theo's Render Pipeline](https://www.nexusmods.com/skyrimspecialedition/mods/191382)** (TRP) handles anti-aliasing and upscaling (DLAA or DLSS), frame generation, NVIDIA Reflex and Neural Rendering.
- **[Bottled Shaders](https://www.nexusmods.com/skyrimspecialedition/mods/192816)**, a Community Shaders fork, handles lighting, shadows, water, grass, snow and weather. It also runs Zenderal's ENB-style look through its **Effects 11** feature, so there's no separate ENB to tune.

If DLSS or frame generation won't start at all, work through the [DLSS & Frame Gen](#dlss) page first. This page assumes they're running.

---

## Opening the menus

| Key                | Opens                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| **End**            | Theo's Render Pipeline: DLSS/DLAA, frame generation, Reflex, Neural Rendering |
| **Insert**         | Community Shaders (Bottled Shaders): every lighting and shader feature    |
| **Numpad \***      | Switches Community Shaders off and on, for a quick before-and-after       |
| **Shift + Enter**  | The Effects 11 editor, for the ENB-style look                             |

Both mods use **End** by default. Zenderal moves Community Shaders to **Insert** so the two don't clash. To use another key, change it in the Community Shaders menu under **General → Keybindings**.

---

## Where to start

If the game runs below what you want, try these in order. Each is a bigger gain than the one after it.

1. **Switch from DLAA to DLSS Quality** in the End menu. It renders at about two thirds of your resolution and is usually the biggest single gain. Restart the game afterwards.
2. **Turn Neural Rendering off** if it's on. It's the most expensive thing in TRP.
3. **Turn off the heaviest Community Shaders features** (see [What costs the most](#performance/community-shaders)).
4. **Drop to DLSS Balanced or Performance**, especially at 1440p and 4K, where it still looks good.
5. **Use frame generation** once the game runs at about 60 FPS without it. It smooths motion but can't fix a low base frame rate.

---

## Theo's Render Pipeline

Press **End** to open it. The panel shows live FPS beside the settings, and the bar above the tabs shows what's running.

- **Apply** changes settings for this session only. **Save as default** keeps them for next time.
- Changing the **DLAA/DLSS mode** or the **render scale** needs a game restart. Everything else applies straight away.

### DLAA or DLSS

Both replace the game's own anti-aliasing. The difference is the resolution the game renders at before TRP builds the final image.

| Mode                 | Renders at          | Use it when                                                |
| -------------------- | ------------------- | ---------------------------------------------------------- |
| **DLAA**             | Your full resolution | You have headroom. The sharpest image, at the highest cost |
| **DLSS Quality**     | About 67%           | The best balance for most PCs                              |
| **DLSS Balanced**    | About 58%           | 1440p or 4K on a mid-range card                            |
| **DLSS Performance** | 50%                 | 4K, or a card below the recommended specs                  |

Keep the game itself at your monitor's native resolution and let DLSS lower the render resolution. Running the game window at a lower resolution makes the image soft and can break frame generation.

**Sharpening** is on by default. Lower it if edges look crunchy, raise it if DLSS looks soft.

### Frame generation

Frame generation adds AI-generated frames between the ones your GPU renders. It makes motion smoother, but it doesn't make the game respond faster, and it needs a decent base frame rate to look and feel right.

- Aim for **about 60 FPS before frame generation**. Below that, generated frames smear and the game feels floaty.
- Start with **x2**. RTX 50-series cards can go higher, and RTX 40-series cards reach x3 and x4 through the Universal edition. Higher multipliers add more artifacts.
- The FPS counter includes generated frames, so it can read high while the game still feels uneven. Judge by how it plays.
- On RTX 20 and 30-series cards, frame generation is experimental. If it causes problems, turn it off and use DLSS on its own.

### Reflex and the frame limit

**NVIDIA Reflex** keeps input lag down, and it matters more with frame generation on. Leave it on.

TRP's **Frame limit** setting has three options:

- **Off**: no limit from TRP.
- **Fixed**: caps the final output at the FPS you set.
- **Steady**: evens out the time between rendered frames. **Try this first if the game feels uneven** even when the FPS looks fine.

Don't stack several frame limiters. Use TRP's limit or your driver's, not both, and leave RivaTuner's limiter off while frame generation is on.

### Neural Rendering

Neural Rendering, the NVIDIA feature people call "DLSS 5", runs an AI pass over the finished image that refines lighting, tone and skin. It looks great but costs more than anything else in TRP.

- If you use it, keep it to **one pass, placed before DLSS**. That's the cheapest setup.
- Two or more passes after DLSS are very expensive, even on high-end cards.
- On RTX 20 and 30-series cards, leave it off.
- **NR model rate** set to **every other frame** halves its cost, with some ghosting in fast motion. It works best with x2 frame generation.

---

## Community Shaders

Press **Insert** to open it. Search finds individual settings, not just feature names, and **Ctrl + S** saves.

### What costs the most

These features cost the most. Turn them off or lower them first, one at a time, and watch the FPS.

| Feature                        | What it does                                     | Cost                |
| ------------------------------ | ------------------------------------------------ | ------------------- |
| **Screen Space GI**            | Bounced light and contact shadows                | High                |
| **Volumetric Lighting / Shadows** | God rays and light through fog                 | High                |
| **Effects 11**                 | Zenderal's ENB-style look: bloom, lens, depth of field | Medium to high |
| **Screen Space Shadows**       | Fine shadows under small objects                 | Medium              |
| **Skylighting**                | Open-sky lighting and shade under cover          | Medium              |
| **Snow Cover / Snow Deformation** | Snow building up, footprints in snow         | Medium, in snow     |
| **Terrain Shadows**            | Distant hills casting shadows                    | Medium              |
| **Wetness Effects**            | Wet surfaces in rain                             | Low to medium       |

Effects 11 is the biggest change to how the game looks. Turn it off only if nothing else gets you enough frames. **Shift + Numpad \*** switches it off and on so you can compare.

### Disable at boot

To take a feature out completely, open **Disable at Boot** in the Community Shaders menu, tick it and restart. It's then never loaded, which also saves video memory. Untick it to bring it back.

### Shader compilation

Community Shaders builds its shaders on your PC. The first time you start Zenderal, and again after a driver or Zenderal update, it compiles them before and during the first load. A progress overlay shows while it works.

- **Let it finish.** Compiling uses most of your CPU, so the game hitches until it's done. Stand somewhere quiet or wait at the main menu.
- **Don't press Esc** on the compile screen at startup. That skips compilation, and the shaders then compile while you play, which causes hitching.
- The results are saved in a `ShaderCache` folder in MO2's **Overwrite** folder, so later launches are quick.

---

## Stuttering

Stutter is different from low FPS. The frame rate looks fine, but the game hitches or the motion feels uneven. Work through this list.

### It stutters on the first launch, or after an update

That's shader compilation. Let it finish, as above. If it keeps stuttering after several launches, or something looks wrong after an update, close the game, delete the `ShaderCache` folder from MO2's **Overwrite** folder and let it rebuild.

### It hitches when entering new areas or cities

- **Install on an SSD.** Zenderal is too big to stream well from a hard drive. An NVMe drive is best.
- **Video memory.** Hitching that gets worse the longer you play is often your GPU running out of video memory. Check it in Task Manager under **Performance → GPU → Dedicated GPU memory**. On 8 GB cards, turn off some of the [features that cost the most](#performance/community-shaders), disable them at boot, and leave Neural Rendering off.
- **System memory.** Close browsers and other heavy apps. With 16 GB of RAM, make sure Windows manages the page file.

### Motion feels uneven, even at high FPS

- Set TRP's **Frame limit** to **Steady**.
- Turn on **G-Sync** or **FreeSync** for your monitor in the NVIDIA App or AMD Software, if your monitor supports it.
- Make sure only **one** frame limiter is active, and turn off any frame generation outside TRP: Lossless Scaling, AMD Fluid Motion Frames, NVIDIA Smooth Motion.
- If you're using frame generation below about 60 FPS, lower the DLSS mode or turn some features off until the base frame rate is higher.

### It hitches at a steady rhythm, even standing still

Overlays and monitoring tools are the usual cause. Close or disable **RivaTuner / MSI Afterburner**, the **Discord** and **Steam** overlays, the **NVIDIA App overlay**, and RGB or hardware-monitoring software, then test again.

If you've added mods to Zenderal, **Object Impact Framework** and **Detailed Mini Map** are known to cause this kind of stutter with Bottled Shaders. Zenderal doesn't include either.

### Other things to check

- **NVIDIA shader cache size.** In the NVIDIA Control Panel, under **Manage 3D settings**, set **Shader Cache Size** to **Unlimited** or at least **10 GB**.
- **Power.** Use a **Balanced** or **High performance** power plan, and keep laptops plugged in.
- **Laptops.** Make sure the game runs on the dedicated GPU (see [step 7 of Before you start](#dlss/before-you-start)).
- **Updates.** Keep your GPU driver and Windows up to date.

---

## AMD and Intel GPUs

DLSS, DLAA, NVIDIA frame generation, Reflex and Neural Rendering need an NVIDIA RTX card. Zenderal still runs on AMD Radeon and Intel Arc cards. It just takes a different route.

### What happens automatically

On a non-NVIDIA GPU, TRP switches to Intel's **XeSS** for anti-aliasing and upscaling by itself, and offers Intel's **XeFG** frame generation. You don't need to change anything to get started. Both are **experimental** in TRP, so expect rougher edges than on NVIDIA.

### What to do

1. **Update your driver** from AMD Software: Adrenalin Edition, or Intel's Arc driver.
2. **Turn off AMD Fluid Motion Frames (AFMF)** and **Radeon Super Resolution** for the game in AMD Software. They clash with TRP's upscaling and frame generation.
3. Open TRP with **End** and pick an **XeSS quality level**, the same way you'd pick a DLSS mode. Quality is a good start.
4. Try **XeFG** frame generation only once the game runs at about 60 FPS without it. If it causes flicker, stutter or crashes, turn it off.
5. Tune Community Shaders the same way as on NVIDIA: start with the [features that cost the most](#performance/community-shaders).

### If XeSS gives you trouble

If XeSS or XeFG crashes, flickers or performs badly on your card, you can turn TRP off and use the upscaler built into Community Shaders, which supports **AMD FSR**:

1. In Mod Organizer 2, untick **TheosRenderPipeline Standard** and **TheosRenderPipeline Universal** in the **DLSS 5 - FrameGen - NR** section.
2. Start the game, press **Insert**, open **Upscaling** and choose **FSR**, with Quality as a starting point. RX 9000-series cards can use **FSR 4**.
3. Save, then restart the game.

This isn't Zenderal's default setup, so mention it if you report a problem. To go back, tick both TRP mods again and set Community Shaders' **Upscaling** back to how it was.

---

## Reporting a problem

Ask in the Zenderal [Discord](https://discord.com/invite/aunT9MdevX). Include:

- Your **GPU**, **CPU**, **RAM** and **driver version**, and your **resolution**.
- Screenshots of the **End** menu and the **Insert** menu showing your settings.
- Where it happens (a city, a dungeon, everywhere) and whether it's low FPS or stutter.
- Your logs, from `Documents\My Games\Skyrim Special Edition\SKSE`: **`TheosRenderPipeline.log`** and **`BottledShaders.log`**. Copy them **before** you launch the game again, because each launch overwrites them.
