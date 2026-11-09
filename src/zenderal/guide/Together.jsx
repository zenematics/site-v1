import { useEffect, useRef, useState } from 'react';
import { DocIcon } from '../DocIcons.jsx';
import { TOGETHER as T } from './data.js';

const BASE = import.meta.env.BASE_URL;
const GUIDE = `${BASE}zenderal/guide/`;
const DOCS = `${BASE}zenderal/docs/`;
const DISCORD = 'https://discord.com/invite/aunT9MdevX';

// ---------------------------------------------------------------- Small pieces
function Copy({ text, label }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard blocked: the text is still selectable */
    }
  };
  return (
    <div className="tg-copy">
      {label && <span className="tg-copy__label">{label}</span>}
      <code className="tg-copy__text">{text}</code>
      <button type="button" className={`tg-copy__btn${done ? ' is-done' : ''}`} onClick={copy}>
        <DocIcon name={done ? 'check' : 'copy'} className="tg-copy__icon" />
        {done ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

function Button({ href, icon, children, primary }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={`tg-btn${primary ? ' tg-btn--primary' : ''}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <DocIcon name={icon} className="tg-btn__icon" />
      {children}
      {external && <DocIcon name="external" className="tg-btn__ext" />}
    </a>
  );
}

const Key = ({ children }) => <kbd className="tg-key">{children}</kbd>;

// The friend types the host's Radmin address; this builds the line for the overlay's Address box.
function Address() {
  const [ip, setIp] = useState('');
  const clean = ip.trim();
  const valid = /^(\d{1,3}\.){3}\d{1,3}$/.test(clean);
  const addr = `${valid ? clean : '26.x.x.x'}:${T.port}`;
  return (
    <div className="tg-addr">
      <label className="tg-addr__field">
        <span className="g-label">The host's Radmin address</span>
        <input
          type="text"
          inputMode="decimal"
          placeholder="26.123.45.67"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          spellCheck="false"
        />
      </label>
      <span className="tg-addr__arrow" aria-hidden="true">→</span>
      <div className="tg-addr__out">
        <Copy text={addr} label="Type this in Address" />
        {valid && !clean.startsWith('26.') && (
          <p className="bx-hint">Radmin addresses start with 26. Check you copied the host's Radmin one.</p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- The steps
const INSTALL = {
  icon: 'download',
  title: 'Install the same list',
  short: 'Same Zenderal version',
  body: (
    <>
      <p>
        Everyone needs Zenderal <strong>{T.version} or later</strong>, on the <strong>same version</strong>. Co-op ships
        with the list, so there's nothing extra to download. If one of you updates in Wabbajack, you all update.
      </p>
    </>
  ),
  actions: [{ href: `${DOCS}#readme/installation`, icon: 'download', label: 'Install guide' }],
};

const RADMIN = {
  icon: 'network',
  title: 'Install Radmin VPN',
  short: 'Free virtual LAN',
  body: (
    <p>
      Radmin VPN puts your PCs on one private network over the internet, as if you were all on the same router. It's
      free and needs no account and no router setup. Install it and open it.
    </p>
  ),
  actions: [{ href: T.radmin, icon: 'download', label: 'Download Radmin VPN', primary: true }],
};

const LAUNCH = {
  icon: 'play',
  title: 'Start the co-op game',
  short: 'Co-op profile',
  body: (
    <>
      <p>In Mod Organizer 2, pick the co-op profile at the top left, then the co-op executable at the top right, and Run.</p>
      <Copy text={T.profile} label="Profile" />
      <Copy text={T.exe} label="Executable" />
      <p>
        Load a save, or start a new game and play until you <strong>wake up at Jespar's camp</strong>. Never connect
        during the prologue.
      </p>
    </>
  ),
};

const HOST = [
  INSTALL,
  RADMIN,
  {
    icon: 'users',
    title: 'Create a network',
    short: 'Name and password',
    body: (
      <>
        <p>
          In Radmin VPN, click <strong>Create Network</strong> (or <strong>Network → Create Network</strong>). Give it a
          name and a password, and send both to your friends.
        </p>
        <p>
          Your <strong>Radmin address</strong> is at the top of the window, under your PC's name. It starts with{' '}
          <strong>26.</strong> Send that to your friends too: it's where they connect.
        </p>
      </>
    ),
  },
  {
    icon: 'server',
    title: 'Start the server',
    short: 'SkyrimTogetherServer.exe',
    body: (
      <>
        <p>In your Zenderal folder, run the server. Keep its window open while you play.</p>
        <Copy text={T.server} label="In your Zenderal folder" />
        <p>
          The first time, Windows Firewall asks about it: tick <strong>both Private and Public</strong> and allow it.
          Radmin's network counts as public, so friends can't reach you without that.
        </p>
      </>
    ),
    extra: 'settings',
  },
  LAUNCH,
  {
    icon: 'plug',
    title: 'Connect',
    short: 'Your own server',
    body: (
      <>
        <p>
          In game, press <Key>Right Ctrl</Key> or <Key>Numpad 7</Key> to open the overlay and click <strong>Connect</strong>.
          The server is on your own PC, so the address is:
        </p>
        <Copy text={`127.0.0.1:${T.port}`} label="Address" />
        <p>
          Type the password if you set one, and Connect. Friends who join land in your party on their own. Press{' '}
          <Key>Esc</Key> to close the overlay.
        </p>
      </>
    ),
  },
];

const JOIN = [
  INSTALL,
  RADMIN,
  {
    icon: 'users',
    title: "Join the host's network",
    short: 'Name and password',
    body: (
      <>
        <p>
          Click <strong>Join Network</strong> (or <strong>Network → Join Network</strong>) and type the network name and
          password the host sent you.
        </p>
        <p>
          The host shows up in the list with a <strong>green dot</strong> when you can reach them. Right-click them and
          choose <strong>Ping</strong> to check.
        </p>
      </>
    ),
  },
  LAUNCH,
  {
    icon: 'plug',
    title: 'Connect',
    short: "The host's address",
    body: (
      <>
        <p>
          Wait until the host's server is running. In game, press <Key>Right Ctrl</Key> or <Key>Numpad 7</Key> to open the
          overlay and click <strong>Connect</strong>.
        </p>
        <Address />
        <p>
          Type the server password the host gave you (not the Radmin one, unless they made them the same), and Connect.
          You join the host's party on your own.
        </p>
      </>
    ),
  },
];

const ROLES = {
  host: { title: "I'm hosting", text: 'Run the server, invite friends', icon: 'server', steps: HOST },
  join: { title: "I'm joining", text: "Connect to a friend's game", icon: 'users', steps: JOIN },
};

function Settings() {
  return (
    <details className="tg-fold">
      <summary>Server settings (optional)</summary>
      <p>
        Close the server, edit <code>{T.config}</code> in the same mod folder in a text editor, then start it again.
      </p>
      <dl className="tg-settings">
        {T.settings.map((s) => (
          <div key={s.key}>
            <dt>
              <code>{s.key}</code>
            </dt>
            <dd>{s.text}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

function Steps({ role }) {
  const { steps } = ROLES[role];
  const [at, setAt] = useState(0);
  const rail = useRef(null);
  useEffect(() => setAt(0), [role]);
  // On small screens the rail scrolls sideways: keep the open step in it.
  useEffect(() => {
    const r = rail.current;
    const b = r?.children[at];
    if (r && b && r.scrollWidth > r.clientWidth) {
      r.scrollTo({ left: b.offsetLeft - (r.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' });
    }
  }, [at]);
  const step = steps[at];
  return (
    <div className="tg-flow">
      <ol className="tg-rail" ref={rail}>
        {steps.map((s, k) => (
          <li key={s.title}>
            <button
              type="button"
              className={`tg-rail__step${k === at ? ' is-on' : ''}${k < at ? ' is-done' : ''}`}
              onClick={() => setAt(k)}
              aria-current={k === at ? 'step' : undefined}
            >
              <span className="tg-rail__n">{k < at ? <DocIcon name="check" className="tg-rail__tick" /> : k + 1}</span>
              <span>
                <span className="tg-rail__title">{s.title}</span>
                <span className="tg-rail__short">{s.short}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <article className="tg-step" key={`${role}-${at}`}>
        <span className="g-label">
          Step {at + 1} of {steps.length}
        </span>
        <h3 className="tg-step__title">
          <DocIcon name={step.icon} className="tg-step__icon" />
          {step.title}
        </h3>
        <div className="tg-step__body">{step.body}</div>
        {step.extra === 'settings' && <Settings />}
        {step.actions && (
          <div className="tg-step__actions">
            {step.actions.map((a) => (
              <Button key={a.href} href={a.href} icon={a.icon} primary={a.primary}>
                {a.label}
              </Button>
            ))}
          </div>
        )}
        <div className="tg-step__nav">
          <button type="button" className="tg-nav" disabled={at === 0} onClick={() => setAt(at - 1)}>
            ← Back
          </button>
          {at < steps.length - 1 ? (
            <button type="button" className="tg-nav tg-nav--next" onClick={() => setAt(at + 1)}>
              Next: {steps[at + 1].title} →
            </button>
          ) : (
            <span className="tg-step__done">
              <DocIcon name="check" className="tg-step__done-icon" /> You're in. Have fun.
            </span>
          )}
        </div>
      </article>
    </div>
  );
}

// ---------------------------------------------------------------- How it connects
function Diagram({ role, pick }) {
  return (
    <div className="tg-map" aria-label="How the PCs connect">
      <button type="button" className={`tg-node${role === 'host' ? ' is-on' : ''}`} onClick={() => pick('host')}>
        <DocIcon name="server" className="tg-node__icon" />
        <span className="tg-node__title">Host</span>
        <span className="tg-node__text">Runs the server and plays</span>
        <code className="tg-node__ip">26.x.x.1 : {T.port}</code>
      </button>
      <span className="tg-wire" aria-hidden="true" />
      <div className="tg-hub">
        <DocIcon name="network" className="tg-hub__icon" />
        <span className="tg-node__title">Radmin VPN</span>
        <span className="tg-node__text">One private network</span>
      </div>
      <span className="tg-wire tg-wire--back" aria-hidden="true" />
      <button type="button" className={`tg-node tg-node--friends${role === 'join' ? ' is-on' : ''}`} onClick={() => pick('join')}>
        <DocIcon name="users" className="tg-node__icon" />
        <span className="tg-node__title">Friends</span>
        <span className="tg-node__text">Up to {T.players - 1} more</span>
        <code className="tg-node__ip">26.x.x.2, .3 …</code>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------- Good to know / fixes
const NOTES = [
  {
    icon: 'book',
    title: 'Quests are your own',
    text: "Quests don't sync in Zenderal: each of you advances them in your own game. Do the quest steps together, each talking to the NPC, so you stay in step.",
  },
  {
    icon: 'alert',
    title: 'Not during the prologue',
    text: "Connecting before you wake up at Jespar's camp breaks the opening. Play the prologue alone, then connect.",
  },
  {
    icon: 'refresh',
    title: 'Same version, always',
    text: 'A different list version or a different profile is refused, or worse, desyncs. Update together and all use the co-op profile.',
  },
  {
    icon: 'pulse',
    title: 'It is in testing',
    text: 'Co-op is new and may crash. Save often, and tell us what happened in the Discord.',
  },
  {
    icon: 'globe',
    title: 'No Radmin?',
    text: `The host can forward UDP port ${T.port} on their router instead, and friends connect to the host's public IP. Radmin is easier and needs no router access.`,
  },
];

const FIXES = [
  {
    q: '"Could not connect to the specified server"',
    a: [
      "Is the host's server window open?",
      'Is the host in your Radmin list with a green dot? Right-click → Ping.',
      `Did the address end with :${T.port}?`,
      'Host: allow SkyrimTogetherServer.exe on Public networks in Windows Firewall (Windows Security → Firewall → Allow an app).',
    ],
  },
  {
    q: '"Skyrim Together is not running!" on the main menu',
    a: [`You started the normal executable. Quit and run "${T.exe}" from the co-op profile.`],
  },
  {
    q: '"Not the same version of Skyrim Together"',
    a: ['Someone is on an older Zenderal. Update everyone in Wabbajack to the same version.'],
  },
  {
    q: 'No sound',
    a: [
      'Windows routes sound per program, and the game now runs inside SkyrimTogether.exe. While it runs, open the Volume mixer and set its output to your headset or speakers. Windows remembers it.',
    ],
  },
  {
    q: 'The game crashes after connecting',
    a: [
      'In the co-op profile, tick "Zenderal - Engine Fixes Memory Off (testing)" in the left pane and try again.',
      'Still crashing? Send your crash log and the server\'s logs folder (next to SkyrimTogetherServer.exe) in the Discord.',
    ],
  },
];

function Cards() {
  const [open, setOpen] = useState(0);
  return (
    <div className="tg-notes">
      <div className="tg-notes__tabs" role="tablist" aria-label="Good to know">
        {NOTES.map((n, k) => (
          <button
            key={n.title}
            type="button"
            role="tab"
            aria-selected={k === open}
            className={`tg-note${k === open ? ' is-on' : ''}`}
            onClick={() => setOpen(k)}
          >
            <DocIcon name={n.icon} className="tg-note__icon" />
            {n.title}
          </button>
        ))}
      </div>
      <p className="bx-answer" key={open} role="tabpanel">
        {NOTES[open].text}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------- Page
const fromHash = () => (location.hash === '#join' ? 'join' : 'host');

export default function Together() {
  const [role, setRole] = useState(fromHash);

  const pick = (r) => {
    setRole(r);
    history.replaceState(null, '', `#${r}`);
    document.getElementById('tg-steps')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="g-stack">
      <div className="md">
        <p>
          Play Zenderal with friends. Zenderal Together is Skyrim Together Reborn rebuilt for Enderal, and it ships with
          the list. One of you hosts a small server, the others join over Radmin VPN.
        </p>
      </div>

      <div className="tg-facts">
        <div>
          <strong>{T.players}</strong>
          <span>players at most</span>
        </div>
        <div>
          <strong>{T.version}+</strong>
          <span>Zenderal version</span>
        </div>
        <div>
          <strong>
            <Key>Right Ctrl</Key>
          </strong>
          <span>or Numpad 7 opens the overlay</span>
        </div>
        <div>
          <strong className="tg-facts__tag">Testing</strong>
          <span>expect rough edges</span>
        </div>
      </div>

      <section className="bx-panel">
        <h2 className="bx-panel__title">
          <DocIcon name="network" className="bx-panel__icon" />
          How it connects
        </h2>
        <p className="bx-lead">
          The host runs <strong>SkyrimTogetherServer.exe</strong> and plays on the same PC. Radmin VPN gives every PC an
          address starting with <strong>26.</strong>, and friends connect to the host's. Pick your side.
        </p>
        <Diagram role={role} pick={pick} />
      </section>

      <div className="tg-roles" id="tg-steps" role="tablist" aria-label="Your role">
        {Object.entries(ROLES).map(([id, r]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={role === id}
            className={`tg-role${role === id ? ' is-on' : ''}`}
            onClick={() => pick(id)}
          >
            <DocIcon name={r.icon} className="tg-role__icon" />
            <span>
              <span className="tg-role__title">{r.title}</span>
              <span className="tg-role__text">{r.text}</span>
            </span>
          </button>
        ))}
      </div>

      <Steps role={role} />

      <section className="bx-panel">
        <h2 className="bx-panel__title">
          <DocIcon name="keyboard" className="bx-panel__icon" />
          Co-op keys
        </h2>
        <div className="tg-keys">
          {T.keys.map((k) => (
            <div key={k.text} className="tg-keys__row">
              <span className="tg-keys__caps">
                {k.keys.map((c) => (
                  <Key key={c}>{c}</Key>
                ))}
                {k.alt && (
                  <>
                    <span className="tg-keys__or">or</span>
                    <Key>{k.alt}</Key>
                  </>
                )}
              </span>
              <span>{k.text}</span>
            </div>
          ))}
        </div>
        <p className="bx-hint">They work with Num Lock on or off. F1 to F4 stay Zenderal's stance keys.</p>
      </section>

      <section className="bx-panel">
        <h2 className="bx-panel__title">
          <DocIcon name="book" className="bx-panel__icon" />
          Good to know
        </h2>
        <Cards />
      </section>

      <section className="bx-panel">
        <h2 className="bx-panel__title">
          <DocIcon name="lifebuoy" className="bx-panel__icon" />
          If it doesn't work
        </h2>
        <div className="tg-fixes">
          {FIXES.map((f) => (
            <details key={f.q} className="tg-fold">
              <summary>{f.q}</summary>
              <ul>
                {f.a.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <nav className="bx-links" aria-label="Links">
        <a href={T.radmin} className="bx-link" target="_blank" rel="noreferrer">
          <DocIcon name="network" className="bx-link__icon" />
          <span>
            <span className="bx-link__title">Radmin VPN</span>
            <span className="bx-link__text">Free download</span>
          </span>
        </a>
        <a href={DISCORD} className="bx-link" target="_blank" rel="noreferrer">
          <DocIcon name="message" className="bx-link__icon" />
          <span>
            <span className="bx-link__title">Discord</span>
            <span className="bx-link__text">Find players, report bugs</span>
          </span>
        </a>
        <a href={`${GUIDE}keybindings/`} className="bx-link">
          <DocIcon name="keyboard" className="bx-link__icon" />
          <span>
            <span className="bx-link__title">Keybindings</span>
            <span className="bx-link__text">Every other key</span>
          </span>
        </a>
      </nav>

      <p className="bx-hint tg-credit">
        Built on{' '}
        <a href="https://github.com/tiltedphoques/TiltedEvolution" target="_blank" rel="noreferrer">
          Skyrim Together Reborn
        </a>{' '}
        by Tilted Phoques and Frelm's{' '}
        <a href="https://github.com/Frelm/EnderalTogetherReborn" target="_blank" rel="noreferrer">
          Enderal Together
        </a>
        , GPL-3.0.
      </p>
    </div>
  );
}
