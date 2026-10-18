Everything you need to know to install, run and update Zenderal, a Wabbajack modlist for Enderal: Forgotten Stories (Special Edition). Read it before you install.

> **Alpha build**
> Zenderal is in testing. Expect bugs and breaking changes between updates. Report anything you find in the [Discord](https://discord.com/invite/aunT9MdevX).

---

## Requirements

| Requirement   | Details                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| Enderal SE    | Enderal: Forgotten Stories (Special Edition) on **Steam**, set to English   |
| Skyrim SE     | You must also own Skyrim Special Edition on **Steam**                       |
| Platform      | Windows only. Steam Deck and Linux are not supported                        |
| Installer     | The latest [Wabbajack](https://www.wabbajack.org/)                          |
| Nexus account | Required. Premium is recommended but not needed                             |

**Steam only.** GOG and other versions of Enderal or Skyrim are not supported.

**Nexus Premium** lets Wabbajack download everything automatically. On a free account, Wabbajack opens each mod's download page and you click through them one by one. It works, it just takes much longer.

---

## Recommended specs

Zenderal runs an ENB, so the GPU matters most. These figures are a starting point while we gather data from testers.

| Component | Minimum                                    |
| --------- | ------------------------------------------ |
| CPU       | Intel Core i5 (recent generation) or equivalent |
| GPU       | NVIDIA RTX 30-series or equivalent         |
| Storage   | SSD                                        |

A performance profile for lower-end hardware is planned.

---

## Disk space

| Folder    | Size     | Notes                                       |
| --------- | -------- | ------------------------------------------- |
| Downloads | ~90 GB   | Any drive. Keep it if you want faster updates |
| Install   | ~140 GB  | Install on an **SSD**                       |
| Total     | ~230 GB  | Plus your Steam installs of Enderal SE and Skyrim SE |

You can delete the downloads folder once the game runs, but Wabbajack will then download everything again on the next update.

---

## Before you install

1. **Clean install Enderal SE.** Uninstall it through Steam, delete whatever is left in its game folder, then reinstall. Leftover files from earlier mods are the most common cause of a broken install, such as the [Dismembering Framework error](#readme/troubleshooting).
2. **Switch Enderal SE to version 2.0.12.4.** Zenderal currently runs on this older version, not the newer 2.1.4 that Steam installs by default. In your Steam library, right-click **Enderal: Forgotten Stories (Special Edition)**, open **Properties → Game Versions & Betas** and select **enderal_2.0.12.4**. Steam then downloads that version. Let it finish before you go on.

   ![Steam's Game Versions & Betas page for Enderal SE, with enderal_2.0.12.4 selected](uploads/steam-enderal-version.png)

   Steam lists this version as unsupported and pending removal in 2027. That's expected. Keep it selected until a Zenderal release tells you to switch.

3. **Set the language to English** for both Enderal SE and Skyrim SE in Steam (Properties → Language).
4. **Launch Enderal SE from Steam once.** Start it from Steam, let it reach the main menu, then quit. This creates the game's settings files and registry entries that Wabbajack needs to find the game.
5. **Keep your folders out of protected locations.** Don't put Wabbajack, the downloads or the install folder inside `Program Files`, `Downloads`, `Documents`, your Desktop or the game's own folder. Something like `C:\Wabbajack`, `D:\WJDownloads` and `D:\Zenderal` works well.
6. **Pause your antivirus** while Wabbajack runs, or add exclusions for those folders. Some antivirus programs block or quarantine files mid-install.

---

## Installation

Zenderal is listed in the Wabbajack gallery as a non-featured list, so it's hidden until you turn on unofficial lists.

1. Open Wabbajack and go to **Browse Modlists**.
2. Enable the filter to show unofficial (non-featured) lists, search for **Zenderal**, and choose it.
3. Log in to Nexus when Wabbajack asks.
4. Set the **download location** and the **install location** (on an SSD), then start the install.
5. When it finishes, Wabbajack gives you a link to the install folder. Open it and run **ModOrganizer.exe**.
6. In Mod Organizer 2, launch Zenderal from the executable dropdown at the top right.

---

## First launch

Always launch the game through Mod Organizer 2. Starting Enderal from Steam runs the unmodded game.

### The CRDW cache prompt

The first time you start the game, a window titled **Cache Recursive Directory Walk** asks whether to generate CRDW cache files. **Click Yes.**

![The Cache Recursive Directory Walk prompt, asking "Do you want to generate CRDW cache files?" with Yes and No buttons](uploads/crdw-prompt.png)

On every launch the game scans the whole `Data` folder to find its files. With a list as large as Zenderal that takes a long time. CRDW saves the results of that scan to a cache so later launches can skip it and start much faster.

The cache only helps if it matches what's actually installed. There's no cache yet on a fresh install, so **Yes** builds one from your files. Pressing **No** leaves the game without an up-to-date list of its files, which can mean missing content or a broken start.

Click **Yes** again whenever your files change:

- the first launch after installing or updating Zenderal
- after adding, removing or changing mods, or changing their order in Mod Organizer 2

Click **No** only when nothing has changed since the last time you clicked Yes. The game then reuses the cache and starts faster. If you're unsure, click **Yes**. It only costs a slower start that one time.

### Starting a new game

When you start a new game, Zenderal runs a few setup tasks in the background. **Let them finish before you enter a new cell**, meaning before you go through a door or into a new area. Moving on too early can leave parts of the list unconfigured.

---

## DLSS and frame generation

Zenderal comes with [Theo's Render Pipeline](#dlss) set up for DLSS and frame generation. It needs a few things from your PC that Wabbajack can't set for you. Check these before your first launch:

- **Update your GPU driver.** Install the latest NVIDIA Game Ready or Studio driver. Older drivers are the most common reason frame generation doesn't start.
- **Stop the NVIDIA App overriding the game.** Set every **DLSS Override** for `SkyrimSE.exe` to **Use the 3D application setting** and turn **Smooth Motion** off, in both its program and global settings.
- **Use only one source of DLSS or frame generation.** Close Lossless Scaling, AMD Fluid Motion Frames, OptiScaler, DLSS Swapper and similar tools, and don't turn on ENB's own anti-aliasing or frame generation.
- **Stay in borderless windowed mode.** Zenderal ships set to borderless. Frame generation doesn't work in exclusive fullscreen.
- **Let the game handle display scaling.** If Windows scaling is above 100%, set `SkyrimSE.exe` in the `Stock game` folder to override high DPI scaling with **Application**, and run the game at your monitor's native resolution.
- **Turn on hardware-accelerated GPU scheduling** in Windows graphics settings, then restart your PC.

Press **End** in game to open its settings. Step-by-step instructions, error messages and fixes are on the [DLSS & Frame Gen](#dlss) page.

---

## Updating

Whether saves carry over is decided **per release**. Each update says whether it keeps your saves or needs a new game.

1. Read the release notes in the Discord before you update.
2. Back up your saves. They live in your install folder under `profiles\<profile name>\saves`. Copy them somewhere outside the Zenderal folder.
3. Install the latest Zenderal from the Wabbajack gallery with the **same** download and install locations, and tick **Overwrite installation**.
4. If the release keeps saves, copy them back.

Updating wipes anything in the install folder that isn't part of the list, including mods you added yourself.

---

## Troubleshooting

### "Dismembering Framework.esm is missing"

The game closes on startup with a **DismemberingFramework: Fatal Error** saying the required plugin `Dismembering Framework.esm` is missing.

![DismemberingFramework fatal error: the required plugin "Dismembering Framework.esm" is missing, with details saying form "limbKeyword" was not found](uploads/dismembering-framework-error.png)

Despite what the message says, the mod is part of Zenderal and you don't need to install it by hand. Ignore the advice to redo a manual installation, and don't report it to the mod's author. The error means Zenderal was installed onto an Enderal SE setup that wasn't ready for it. There are two usual causes:

- **Enderal SE wasn't a clean install.** Leftover files from earlier mods in the game folder get mixed in with Zenderal's and break its plugins.
- **Enderal SE was never launched before installing.** Without that first run, the game's settings files and registry entries don't exist yet, so Wabbajack can't set the list up properly.

To fix it, redo the setup in order:

1. Uninstall Enderal SE in Steam, delete whatever is left in its game folder, and reinstall it.
2. Switch it to **enderal_2.0.12.4** under **Properties → Game Versions & Betas**.
3. Launch Enderal SE from Steam, let it reach the main menu, then quit.
4. Reinstall Zenderal in Wabbajack with the **same** download and install locations, and tick **Overwrite installation**. Your downloads are reused, so nothing is downloaded again.
5. Launch the game from Mod Organizer 2.

These are steps 1, 2 and 4 of [Before you install](#readme/before-you-install).

---

## Known issues

Nothing listed yet. The current list lives in the Discord's alpha channel and is updated with every release.

---

## Credits

Zenderal stands on the work of a lot of people.

- **SureAI**, for Enderal: Forgotten Stories.
- **The Wabbajack team**, for the tool that makes a list like this possible.
- **Every mod author in the list.** None of this exists without them.

And the people who helped build it:

| Who               | For                                                         |
| ----------------- | ----------------------------------------------------------- |
| AlaxoucheModding  | Sensei, and author of Wunduniik                              |
| Nithog            | Lead on UI, and author of Vel'dun, Norden and Oathvein       |
| WhisperDealer     | Patching, conversions and this website                       |
| shazdeh           | Trait maker. The GOAT himself                                |
