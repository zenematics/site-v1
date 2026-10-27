import Gamepad, { GamepadLists } from '../Gamepad.jsx';

// Screenshot that opens full size in a new tab.
function Shot({ file, alt }) {
  const src = `${import.meta.env.BASE_URL}uploads/controller/${file}`;
  return (
    <a href={src} target="_blank" rel="noopener noreferrer" className="doc-shot">
      <img src={src} alt={alt} loading="lazy" />
    </a>
  );
}

// Uses the markdown styles so it reads like the readme; the interactive pad and
// binding lists sit outside .md so its list styles don't reach them.
export default function Controller() {
  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Zenderal supports controllers <strong>out of the box</strong>. There's nothing extra to install, just two
          things to check before you play.
        </p>

        <h2>Button layout</h2>
      </div>
      <Gamepad />
      <div className="md">
        <blockquote>
          <p>
            <strong>Character creation</strong>
            Character creation needs a mouse and keyboard. Once your character is made, you can switch to the controller.
          </p>
        </blockquote>

        <h2>Before you play</h2>
        <h3>1. Enable Steam Input for Enderal</h3>
        <p>
          In your Steam library, open the controller settings for <strong>Enderal: Forgotten Stories (Special
          Edition)</strong>. The top should read <strong>Using Steam Input Translation</strong>. If it offers to enable
          Steam Input instead, turn it on.
        </p>
        <Shot file="zenderal-steam-input.png" alt="Enderal SE controller settings in Steam showing Using Steam Input Translation" />
        <blockquote>
          <p>
            <strong>Set it per game</strong>
            Steam Input should be on for Enderal only, not across Steam. In Steam's <strong>Settings → Controller</strong>,
            under the advanced options, turn off the global toggles such as <strong>Enable Steam Input for Xbox
            controllers</strong>, then enable it for Enderal from the game's own controller settings as above.
          </p>
        </blockquote>

        <h3>2. Keep the controller mods enabled</h3>
        <p>
          In Mod Organizer 2, the <strong>Controller Support</strong> section holds the mods that make it work. They're
          enabled by default, so just make sure all four are still ticked.
        </p>
        <Shot file="zenderal-controller-mods.png" alt="Controller Support mods in Mod Organizer 2: Auto Input Switch, Gamepad++, Complete Controller Setup, Zenderal - Controller Tweaks" />

        <h2>Every binding</h2>
      </div>
      <GamepadLists />
      <div className="md">
        <p>
          Prefer one image?{' '}
          <a
            href={`${import.meta.env.BASE_URL}uploads/controller/zenderal-controller-mapping.png`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the full controller sheet
          </a>
          .
        </p>
      </div>
    </div>
  );
}
