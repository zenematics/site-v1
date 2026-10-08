Zenderal is a Wabbajack modlist for Enderal: Forgotten Stories (Special Edition). It delivers modern combat, graphics and gameplay with room for rich build crafting, and it's a welcoming way into Enderal for new players.

> **Alpha build**
> Zenderal is in testing. Expect bugs and breaking changes between updates. Report anything you find in the [Discord](https://discord.com/invite/aunT9MdevX).

## What Zenderal is

Zenderal's goal is to deliver a modern combat, graphics and gameplay experience that enables rich build crafting, while introducing new players to the world of Enderal.

| Goal              | What it means                                                                           |
| ----------------- | --------------------------------------------------------------------------------------- |
| Modern combat     | Combat that feels current and responsive, built around Enderal's talents and progression |
| Modern graphics   | A current-generation look through ENB, textures and meshes that suit Enderal's art direction |
| Modern gameplay   | Deeper systems, new spells, gear and traits, and the fixes that keep it all running      |
| Rich build crafting | Room to plan and experiment with characters that play very differently                 |
| New to Enderal    | A great first playthrough, with the story and world kept intact                         |

You don't need to have played Enderal before. The [Quest Guides](#quests) cover how Zenderal's changes affect each quest.

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

## Recommended specs

Zenderal runs an ENB, so the GPU matters most. These figures are a starting point while we gather data from testers.

| Component | Minimum                                    |
| --------- | ------------------------------------------ |
| CPU       | Intel Core i5 (recent generation) or equivalent |
| GPU       | NVIDIA RTX 30-series or equivalent         |
| Storage   | SSD                                        |

A performance profile for lower-end hardware is planned.

## Disk space

| Folder    | Size     | Notes                                       |
| --------- | -------- | ------------------------------------------- |
| Downloads | ~90 GB   | Any drive. Keep it if you want faster updates |
| Install   | ~140 GB  | Install on an **SSD**                       |
| Total     | ~230 GB  | Plus your Steam installs of Enderal SE and Skyrim SE |

You can delete the downloads folder once the game runs, but Wabbajack will then download everything again on the next update.

## Before you install

1. **Clean install Enderal SE.** Uninstall it through Steam, delete whatever is left in its game folder, then reinstall. Leftover files from earlier mods are the most common cause of a broken install.
2. **Set the language to English** for both Enderal SE and Skyrim SE in Steam (Properties → Language).
3. **Keep your folders out of protected locations.** Don't put Wabbajack, the downloads or the install folder inside `Program Files`, `Downloads`, `Documents`, your Desktop or the game's own folder. Something like `C:\Wabbajack`, `D:\WJDownloads` and `D:\Zenderal` works well.
4. **Pause your antivirus** while Wabbajack runs, or add exclusions for those folders. Some antivirus programs block or quarantine files mid-install.

## Installation

During alpha, the `.wabbajack` file is shared through the [Zenderal Discord](https://discord.com/invite/aunT9MdevX). A Wabbajack gallery release is coming soon.

1. Download the latest `Zenderal.wabbajack` from the Discord.
2. Open Wabbajack and choose **Install from disk**, then select the file.
3. Log in to Nexus when Wabbajack asks.
4. Set the **download location** and the **install location** (on an SSD), then start the install.
5. When it finishes, Wabbajack gives you a link to the install folder. Open it and run **ModOrganizer.exe**.
6. In Mod Organizer 2, launch Zenderal from the executable dropdown at the top right.

## First launch

When you start a new game, Zenderal runs a few setup tasks in the background. **Let them finish before you enter a new cell**, meaning before you go through a door or into a new area. Moving on too early can leave parts of the list unconfigured.

Always launch the game through Mod Organizer 2. Starting Enderal from Steam runs the unmodded game.

## Controller support

Zenderal supports Xbox controllers, but controller support is **off by default**. Follow the [Controller Support](#controller) guide to turn it on.

## Updating

Whether saves carry over is decided **per release**. Each update says whether it keeps your saves or needs a new game.

1. Read the release notes in the Discord before you update.
2. Back up your saves. They live in your install folder under `profiles\<profile name>\saves`. Copy them somewhere outside the Zenderal folder.
3. Run the new `.wabbajack` file with the **same** download and install locations, and tick **Overwrite installation**.
4. If the release keeps saves, copy them back.

Updating wipes anything in the install folder that isn't part of the list, including mods you added yourself.

## Known issues

Nothing listed yet. The current list lives in the Discord's alpha channel and is updated with every release.

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
