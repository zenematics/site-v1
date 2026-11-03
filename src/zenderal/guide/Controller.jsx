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
          Zenderal supports controllers. Its controller layout ships as one mod,{' '}
          <strong>Zenderal - Controller Layout</strong>, which is <strong>off by default</strong>. Turn it on before
          you play (see below); the layout on this page only applies while it's enabled.
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

        <h3>2. Enable Zenderal - Controller Layout</h3>
        <p>
          In Mod Organizer 2, tick <strong>Zenderal - Controller Layout</strong> in the left pane. It's off by default.
          Then make sure its plugin, <strong>Zenderal - Controller Layout.esp</strong>, is ticked in the right pane.
          Leave the mod where it is in the list: it sits at the bottom of the left pane so it wins over every other
          input mod. The rest of the <strong>Controller Support</strong> section (Auto Input Switch, Gamepad++, Complete
          Controller Setup) is enabled by default; keep those ticked too.
        </p>
        <p>
          It works on new and existing saves. About 15 seconds after you load in, it sets up the D-pad gestures.
        </p>
        <blockquote>
          <p>
            <strong>Rebinding</strong>
            While the mod is on, changes you make in the game's Controls menu don't survive a restart. To rebind,
            turn the mod off. It also moves two keyboard keys: Quick Light to <strong>K</strong> and the Ammo Wheel
            to <strong>U</strong>.
          </p>
        </blockquote>

        <h2>Every binding</h2>
      </div>
      <GamepadLists />
    </div>
  );
}
