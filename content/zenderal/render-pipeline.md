Zenderal ships with [Theo's Render Pipeline](https://www.nexusmods.com/skyrimspecialedition/mods/191382) (TRP) by theosw. It replaces the game's anti-aliasing with **NVIDIA DLSS or DLAA** and adds **frame generation**, **NVIDIA Reflex** and optional **Neural Rendering**, the NVIDIA runtime people call "DLSS 5". Menus and the HUD stay at your screen's full resolution.

It's installed and set up already, so you don't need the download or DLL steps from the mod page. This page covers what your PC needs and what to do when it doesn't work.

> **Early release**
> TRP is an early test release and some of its features are still experimental. If something on this page doesn't fix your problem, see **Reporting a problem** at the bottom.

---

## What your GPU can run

DLSS, frame generation and Neural Rendering need an **NVIDIA RTX** card. Zenderal installs both TRP editions, Standard and Universal, so each card gets the best route it supports.

| GPU                     | DLSS / DLAA | Frame generation                                    | Neural Rendering                 |
| ----------------------- | ----------- | --------------------------------------------------- | -------------------------------- |
| RTX 50-series           | Yes         | Yes, multi-frame (x3, x4 and up)                    | Yes                              |
| RTX 40-series           | Yes         | Yes. x2 natively, x3 and x4 through Universal       | Yes                              |
| RTX 30-series           | Yes         | Experimental                                        | Experimental, and costly         |
| RTX 2060, 2070, 2080    | Yes         | Experimental                                        | Very costly                      |
| GTX 16-series and older | No          | No                                                  | No                               |
| AMD and Intel           | No          | Experimental Intel XeFG instead                     | No                               |

On an **AMD or Intel GPU**, TRP switches to Intel's experimental XeSS upscaling and XeFG frame generation by itself. You don't need to change anything.

Our [recommended specs](#readme/recommended-specs) still apply. Frame generation can't make up for a GPU that's too weak to run the list.

---

## Before you start

Most problems come from one of these. Work through the list before trying anything else.

### 1. Update your NVIDIA driver

Install the latest **Game Ready** or **Studio** driver from the NVIDIA App or [nvidia.com](https://www.nvidia.com/en-us/drivers/). TRP uses DLSS 4 runtimes, and drivers from before the 572 series (January 2025) don't support them. An old driver is the most common reason frame generation doesn't start.

If an update doesn't help, reinstall the driver and tick **Clean install** (called **Perform a clean installation** in the NVIDIA installer).

### 2. Turn on hardware-accelerated GPU scheduling

DLSS frame generation won't run without it. In Windows, open **Settings → System → Display → Graphics**, then open the default (or advanced) graphics settings and turn on **Hardware-accelerated GPU scheduling**. **Restart your PC** afterwards. It doesn't take effect until you do.

### 3. Stop the NVIDIA App overriding the game

If the NVIDIA App forces DLSS or frame generation on the game, the driver swaps out TRP's files while you play and frame generation fails.

1. In the NVIDIA App, open **Graphics → Program Settings** and pick the game. Zenderal runs `SkyrimSE.exe` from its `Stock game` folder. If it's not listed, add it with **Add**.
2. Set every **DLSS Override** option (frame generation, super resolution and model presets) to **Use the 3D application setting**.
3. Turn **Smooth Motion** off.
4. Check **Global Settings** too, in case you've set an override there.

Tools that override DLSS for every game, such as global profiles in NVIDIA Profile Inspector, cause the same problem. Turn them off for this game.

### 4. Turn off other frame generation

Only one thing can generate frames. Close or disable **Lossless Scaling**, **AMD Fluid Motion Frames**, **NVIDIA Smooth Motion**, **OptiScaler** and any other upscaler or frame-generation injector. Zenderal's look comes from Community Shaders, not an ENB, so don't add an ENB on top: its anti-aliasing and frame generation clash with Zenderal's.

### 5. Play in borderless or windowed mode

Zenderal ships set to borderless. Frame generation doesn't work in exclusive fullscreen, so don't switch to it in the launcher or SSE Display Tweaks.

### 6. Let the game handle display scaling

If Windows display scaling is above 100% (**Settings → System → Display → Scale**), Windows can stretch the game window. DLSS and frame generation then get the wrong output size, so the image looks soft or offset, the HUD sits in the wrong place, or frame generation won't start.

1. In Zenderal's `Stock game` folder, right-click `SkyrimSE.exe` and open **Properties → Compatibility → Change high DPI settings**.
2. Tick **Override high DPI scaling behavior** and set **Scaling performed by** to **Application**.
3. Make sure the game's resolution matches your monitor's native resolution. In borderless mode a lower resolution is stretched, which has the same effect. Use the DLSS render scale to lower the cost instead.

You can keep your desktop scaling as it is. This only changes how Windows treats the game.

### 7. Laptops: run the game on the NVIDIA GPU

On a laptop with two GPUs, open **Settings → System → Display → Graphics**, add `SkyrimSE.exe` from Zenderal's `Stock game` folder and set it to **High performance**.

---

## Checking it works

Launch Zenderal from Mod Organizer 2 as usual and press **End** in game to open TRP's settings. The panel shows live FPS beside the settings, and the bar above the tabs shows what's running and in what order.

Zenderal starts with **DLSS at 67% render scale**, **frame generation at x2** and **Neural Rendering off**.

- **Apply** changes settings for this session only.
- **Save as default** keeps them for next time.
- **Changing the DLSS/DLAA mode or the render scale needs a restart** of the game. Everything else applies straight away.

If **End** clashes with another mod, change the key under **Advanced → Menu key**.

---

## Common problems

### End doesn't open anything

TRP didn't load. In Mod Organizer 2, open the **DLSS 5 - FrameGen - NR** section and check that both **TheosRenderPipeline Standard** and **TheosRenderPipeline Universal** are ticked, with Universal below Standard in the left pane. Then launch the game from MO2 again, not from Steam.

### An error appears when the game starts

TRP explains startup problems in its error message, under **Likely causes and what to try**. The most common ones:

| The message mentions                                  | What to do                                                                                                                                         |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| A frame-generation override, or frame gen unavailable | Work through steps 1 to 3 of **Before you start**: driver, GPU scheduling and NVIDIA App overrides                                                    |
| Another mod loaded NVIDIA Streamline first            | Something else is loading DLSS. Usually an added mod, an added ENB's DLAA/FSR anti-aliasing, or a DLSS injector. Disable it                        |
| Swapchain ownership was not acquired                  | Another frame-generation tool got there first, such as an added ENB's frame generation, OptiScaler or Lossless Scaling. Disable it                    |
| The driver did not identify the GPU                   | Update your NVIDIA driver. On a laptop, set the game to use the NVIDIA GPU                                                                          |
| The runtime files differ from the supported version   | Something replaced TRP's NVIDIA files, such as DLSS Swapper or a DLL copied in by hand. Undo that, or reinstall Zenderal                           |

### "nvngx_dlssg.dll was not loaded"

This is the most common startup error. A box titled **TheosRenderPipeline.dll** says TRP **could not start rendering**, then the game closes when you click OK.

![TRP's startup error: nvngx_dlssg.dll was not loaded from the configured Streamline directory, because NVIDIA reported a DLSS Frame Generation override](uploads/trp-dlssg-error.png)

`nvngx_dlssg.dll` is NVIDIA's frame-generation file. TRP ships its own copy, but the NVIDIA App has a **DLSS Frame Generation override** turned on for Skyrim, so the driver tries to swap in a different version. TRP can't load its file and stops rather than run with the wrong one. The `HRESULT 0x80004005` codes just mean the load failed.

To fix it:

1. Follow [step 3 of Before you start](#dlss/before-you-start): in the NVIDIA App, set **DLSS Override - Model Presets** and **DLSS Override - Frame Generation** to **Use the 3D application setting** for `SkyrimSE.exe` in Zenderal's `Stock game` folder. Check **Global Settings** too.
2. Fully close the game, then launch it again from Mod Organizer 2.
3. If it still appears, check that **TheosRenderPipeline Standard** and **TheosRenderPipeline Universal** are both ticked in MO2, with Universal below Standard. Make sure nothing else, such as DLSS Swapper or a DLL you copied in by hand, has replaced TRP's NVIDIA files.

If none of that helps, send `TheosRenderPipeline.log` as described in **Reporting a problem**. It lists every folder TRP tried to load the file from.

### Frame generation multipliers are greyed out

The multipliers you can pick depend on your card. See **What your GPU can run** above. On RTX 20 and 30-series cards frame generation is experimental and may not work on every card.

### Neural Rendering is greyed out or tanks performance

Neural Rendering needs an NVIDIA RTX card, and its file ships in the **TheosRenderPipeline Standard** mod, so keep that ticked. It's off by default because it's demanding. If you turn it on:

- Use **one pass**, placed **before DLSS**. That's the cheapest setup.
- Two passes after DLSS are very expensive, even on high-end cards.
- On RTX 20 and 30-series cards, expect a large hit.

### Frame generation feels laggy or the image smears

Frame generation adds frames between the ones your GPU renders. It doesn't make the game respond faster. It feels best when the game already runs at around **60 FPS or more** before frame generation. Below that, lower the DLSS render scale or other graphics settings first, or use x2 instead of a higher multiplier.

The FPS shown with frame generation counts the generated frames too, so it can read high while the game still feels uneven.

### Black screen or the game freezes on a GPU error

If the screen goes black or the game stops responding after a loading screen, restart the game. TRP writes a `[GPUFailure]` entry to its log when this happens, so send the log along with your report (see below).

### Starting over with the default settings

Your TRP settings are saved to `SKSE\Plugins\TheosRenderPipeline.User.ini` in MO2's **Overwrite** folder. Delete that file to go back to Zenderal's defaults.

---

## Reporting a problem

Report TRP problems in the Zenderal [Discord](https://discord.com/invite/aunT9MdevX) first, since some issues are specific to the list. Include:

- Your **GPU** and **NVIDIA driver version**.
- **`TheosRenderPipeline.log`**, from `Documents\My Games\Skyrim Special Edition\SKSE`. Zenderal writes its logs to the **Skyrim** Special Edition folder, not the Enderal one. Copy the log **before** you launch the game again, because each launch overwrites it.
- A screenshot of the **End** menu showing your settings.
- What you were doing when it happened, and whether it happens every time.

For more on the mod itself, see its [Nexus page](https://www.nexusmods.com/skyrimspecialedition/mods/191382) and [GitHub](https://github.com/theosw/theosrenderpipeline).
