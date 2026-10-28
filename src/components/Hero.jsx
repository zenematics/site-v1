import { useEffect, useRef, useState } from 'react';
import { LINKS, PANEL_VIDEOS } from '../config.js';
import Logo from '../zenderal/Logo.jsx';
import YouTube from './YouTube.jsx';

const ACCENT = { content: '#a975ff', contentText: '#6a2fd6', guides: '#e0953d', zenderal: '#c9c5bd' };

// Visual state for one panel given which panel (if any) is active.
function panelState(i, active) {
  const idle = active == null;
  const on = active === i;
  return {
    on,
    grow: idle ? 1 : on ? 7 : 1,
    scale: on ? 1.06 : 1,
    filter: on ? 'brightness(.6) saturate(1)' : idle ? 'brightness(.55) saturate(.7)' : 'brightness(.3) saturate(.3)',
    bar: on ? 1 : 0,
    scrim: on ? 1 : idle ? 0.6 : 0,
    idleOp: idle ? 1 : 0,
    vertOp: !idle && !on ? 1 : 0,
    fullOp: on ? 1 : 0,
    fullY: on ? '0px' : '28px',
    delay: on ? '.35s' : '0s',
    events: on ? 'auto' : 'none',
  };
}

// Centered when idle/collapsed, pushed to the right edge when expanded.
function markLeft(expanded, width) {
  return expanded ? `calc(94% - ${width})` : `calc((100% - ${width}) / 2)`;
}

function useViewportWidth() {
  const [vw, setVw] = useState(() => (typeof window === 'undefined' ? 1400 : window.innerWidth));
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return vw;
}

// `enter`: intro slide direction — 'left' | 'bottom' | 'right'.
function Panel({ s, enter, onActivate, children }) {
  return (
    <div
      className={`panel panel--enter-${enter}`}
      onMouseEnter={onActivate}
      onClick={onActivate}
      style={{ flexGrow: s.grow }}
    >
      {children}
    </div>
  );
}

function IdleLabel({ s, eyebrow, eyebrowColor, title, titleColor, meta, metaColor, ruleColor }) {
  return (
    <div className="panel__idle" style={{ opacity: s.idleOp }}>
      <span className="eyebrow" style={{ color: eyebrowColor }}>{eyebrow}</span>
      <span className="panel__idle-title" style={{ color: titleColor }}>{title}</span>
      <span className="panel__idle-meta" style={{ color: metaColor }}>
        <span className="panel__idle-rule" style={{ background: ruleColor }} />
        {meta}
      </span>
    </div>
  );
}

function VerticalLabel({ s, label, color, accent }) {
  return (
    <div className="panel__vert" style={{ opacity: s.vertOp }}>
      <span className="panel__vert-label" style={{ color }}>{label}</span>
      <span className="panel__diamond" style={{ borderColor: accent }} />
    </div>
  );
}

// Publishes its height on the panel as `--text-h`, so the video slot can fill
// the space between the nav and the text.
// `room`: the panel's video room (as PanelVideo), so on big screens the text can
// span the video's width with the buttons on the right (.panel__full--split);
// `minWidth` keeps room for the description beside the buttons.
function Expanded({ s, room, minWidth, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(() => el.parentElement.style.setProperty('--text-h', `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`panel__full${room ? ' panel__full--split' : ''}`}
      style={{
        ...(room && { '--video-room': room, '--split-min': minWidth }),
        opacity: s.fullOp,
        transform: `translateY(${s.fullY})`,
        pointerEvents: s.events,
        transitionDelay: s.delay,
      }}
    >
      {children}
    </div>
  );
}

// Fills the space between the nav and the expanded text. Nothing loads until
// the panel opens (see YouTube).
function PanelVideo({ s, id, title, room }) {
  if (!id) return null;
  return (
    <div
      className="panel__video"
      style={{
        ...(room && { '--video-room': room }),
        opacity: s.fullOp,
        pointerEvents: s.events,
        transitionDelay: s.delay,
      }}
    >
      <YouTube id={id} title={title} on={s.on} />
    </div>
  );
}

// The Zenderal wordmark in the video slot: its vines grow each time the panel opens
// (it remounts), then it holds on the still logo.
function PanelLogo({ s, room }) {
  return (
    <div
      className="panel__video panel__video--logo"
      style={{
        ...(room && { '--video-room': room }),
        opacity: s.fullOp,
        transitionDelay: s.delay,
      }}
    >
      {s.on && <Logo className="panel__logo" />}
    </div>
  );
}

function Bar({ s, color }) {
  return <div className="panel__bar" style={{ background: color, transform: `scaleX(${s.bar})` }} />;
}

// Pan endpoints. Wide panels crop the image top and bottom, so it drifts vertically.
const PAN = ['center 0%', 'center 100%'];

// While active, drift the image between its crop edges on a loop. On leave, pick
// the pan up from wherever it is and ease it back to the start instead of snapping.
function usePan(ref, on, enabled) {
  useEffect(() => {
    const img = ref.current;
    if (!enabled || !img || !on || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const [from, to] = PAN;
    img.style.objectPosition = from;
    const anim = img.animate([{ objectPosition: from }, { objectPosition: to }], {
      duration: 9000,
      delay: 400,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'cubic-bezier(.45,0,.55,1)',
    });
    return () => {
      img.style.objectPosition = getComputedStyle(img).objectPosition;
      anim.cancel();
      void img.offsetWidth; // commit the frozen position so the return trip transitions
      img.style.objectPosition = from;
    };
  }, [ref, on, enabled]);
}

// `showcase`: for artwork meant to be seen. No zoom, brighter when active, a scrim
// that only shadows the bottom-left corner behind the text, and the image pans up
// and down to reveal what the panel crops off.
function PhotoLayers({ s, src, showcase = false }) {
  const ref = useRef(null);
  usePan(ref, s.on, showcase);
  const img = showcase
    ? {
        transform: 'scale(1)',
        filter: s.on ? 'brightness(.9) saturate(1.05)' : s.filter,
        objectPosition: PAN[0],
        transition: 'object-position .9s cubic-bezier(.7,0,.2,1), filter .9s ease',
      }
    : { transform: `scale(${s.scale})`, filter: s.filter };
  return (
    <>
      <img ref={ref} src={src} alt="" className="panel__bg" style={img} />
      <div className="panel__shade" style={showcase && s.on ? { opacity: 0 } : undefined} />
      <div className={`panel__scrim${showcase ? ' panel__scrim--light' : ''}`} style={{ opacity: s.scrim }} />
    </>
  );
}

// Desktop and tablet; phones get MobileHero (see Home).
export default function Hero({ zenderalStage = 'Beta' }) {
  const [active, setActive] = useState(null);
  const vw = useViewportWidth();
  const wide = vw >= 1200;

  const activate = (i) => () => setActive((cur) => (cur === i ? cur : i));
  const [p0, p1, p2] = [0, 1, 2].map((i) => panelState(i, active));

  // Widest a panel video can get before reaching the expanded mark: from the
  // text's 56px inset to the mark's left edge (see markLeft), less a gutter.
  // Below `wide` the mark fades to a watermark, so the video can span the panel.
  const videoRoom = (markW) => (wide ? `calc(94cqw - ${markW} - 56px - 40px)` : null);

  const stageLabel = zenderalStage + (zenderalStage === 'Release' ? '' : ' · In testing');

  // Open, the Zenematics mark grows into a faint watermark coming in from the top
  // right, its right side cut off by the panel edge (as on the mobile hero).
  const logoW = p0.on ? '125vh' : 'min(70vh,90%)';
  const emblemW = p2.on ? 'min(52vh,36%)' : 'min(60vh,86%)';
  // Marks are placed absolutely and slide right when their panel expands.
  const markPos = (top, w, expanded) => ({ top, left: markLeft(expanded, w) });

  const logo = (
    <img
      src={`${import.meta.env.BASE_URL}uploads/zen-logo-black.png`}
      alt=""
      className="panel__mark"
      style={{
        width: logoW,
        aspectRatio: '1',
        opacity: p0.on ? 0.07 : 1,
        ...(p0.on ? { top: '24%', left: 'calc(100% - 62vh)' } : markPos('44%', logoW, false)),
      }}
    />
  );
  const emblem = (
    <img
      src={`${import.meta.env.BASE_URL}uploads/zenderal-emblem.webp`}
      alt=""
      className="panel__mark"
      style={{
        width: emblemW,
        aspectRatio: '1378 / 1141',
        opacity: p2.on && !wide ? 0.3 : 1,
        ...markPos('42%', emblemW, p2.on),
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.6)) brightness(1)',
      }}
    />
  );

  return (
    <header id="top" className="hero" onMouseLeave={() => setActive(null)}>
      {/* ---- Content ---- */}
      <Panel s={p0} enter="left" onActivate={activate(0)}>
        <div
          className="panel__white"
          style={{ filter: p0.on || active == null ? 'brightness(1)' : 'brightness(.85)' }}
        >
          {logo}
        </div>
        <Bar s={p0} color={ACCENT.content} />
        <IdleLabel
          s={p0}
          eyebrow="Content"
          eyebrowColor={ACCENT.contentText}
          title="Watch Zen"
          titleColor="#0b0c0f"
          meta="Twitch · YouTube · Discord"
          metaColor="#3a3833"
          ruleColor="#9b968d"
        />
        <VerticalLabel s={p0} label="Content" color="#1a1a1d" accent={ACCENT.contentText} />
        <PanelVideo s={p0} id={PANEL_VIDEOS.content} title="Zenematics video" room={wide ? '60cqw' : null} />
        <Expanded s={p0} room={wide ? '60cqw' : null} minWidth="860px">
          <span className="eyebrow" style={{ color: ACCENT.contentText }}>Content</span>
          <h2 className="sr-only">Watch Zen</h2>
          <p className="panel__desc" style={{ color: '#3a3833' }}>
            Live modded playthroughs on Twitch, edited guides and showcases on YouTube, and a community on Discord.
          </p>
          <div className="actions actions--lead">
            <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn--dark-solid">Discord</a>
            <a href={LINKS.twitch} target="_blank" rel="noopener noreferrer" className="btn btn--dark-outline">Twitch</a>
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn--dark-outline">YouTube</a>
            <a href={LINKS.patreon} target="_blank" rel="noopener noreferrer" className="btn btn--dark-outline">Patreon</a>
          </div>
        </Expanded>
      </Panel>

      {/* ---- Guides ---- */}
      <Panel s={p1} enter="bottom" onActivate={activate(1)}>
        <PhotoLayers s={p1} src={`${import.meta.env.BASE_URL}uploads/guides-bg-home.webp`} showcase />
        <Bar s={p1} color={ACCENT.guides} />
        <IdleLabel
          s={p1}
          eyebrow="Guides"
          eyebrowColor={ACCENT.guides}
          title="Build Guides"
          titleColor="#ece9e2"
          meta="LoreRim · Star Citizen"
          metaColor="#b8b4ac"
          ruleColor="#6f6a62"
        />
        <VerticalLabel s={p1} label="Build Guides" color="#d9d6d0" accent={ACCENT.guides} />
        <Expanded s={p1}>
          <span className="eyebrow" style={{ color: ACCENT.guides }}>Guides</span>
          <h2 className="panel__title panel__title--metal">Build Guides</h2>
          <p className="panel__desc" style={{ color: '#c2beb6' }}>
            Video and written walkthroughs for modlists and games — perks, spells, gear and the order to take them.
          </p>
          <div className="tags">
            {['LoreRim', 'Enderal', 'Star Citizen'].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div className="actions">
            <span aria-disabled="true" className="btn btn--disabled">
              Browse guides
              <span className="btn__divider" />
              <span style={{ color: ACCENT.guides }}>Coming soon</span>
            </span>
          </div>
        </Expanded>
      </Panel>

      {/* ---- Zenderal ---- */}
      <Panel s={p2} enter="right" onActivate={activate(2)}>
        <PhotoLayers s={p2} src={`${import.meta.env.BASE_URL}uploads/zenderal/screenshots/backgrounds/ark.webp`} />
        {emblem}
        <Bar s={p2} color={ACCENT.zenderal} />
        <IdleLabel
          s={p2}
          eyebrow="Modlist"
          eyebrowColor={ACCENT.zenderal}
          title="Zenderal"
          titleColor="#ece9e2"
          meta={`${zenderalStage} · Enderal`}
          metaColor="#b8b4ac"
          ruleColor="#6f6a62"
        />
        <VerticalLabel s={p2} label="Zenderal" color="#d9d6d0" accent={ACCENT.zenderal} />
        <PanelLogo s={p2} room={videoRoom('min(52vh, 36cqw)')} />
        <Expanded s={p2} room={videoRoom('min(52vh, 36cqw)')} minWidth="1000px">
          <div className="eyebrow-row">
            <span className="eyebrow" style={{ color: ACCENT.zenderal }}>Modlist</span>
            <span className="stage-badge">{stageLabel}</span>
          </div>
          {/* The wordmark above (PanelLogo) stands in for the title. */}
          <h2 className="sr-only">Zenderal</h2>
          <p className="panel__desc" style={{ color: '#c2beb6' }}>
            A Wabbajack modlist for Enderal: Forgotten Stories. Install steps and FAQs, plus gameplay guides for
            races, perks, spells, combat and controller support.
          </p>
          <div className="actions actions--lead">
            <a href={`${import.meta.env.BASE_URL}zenderal/`} className="btn btn--light-solid">Explore</a>
            <a href={`${import.meta.env.BASE_URL}zenderal/docs/#readme`} className="btn btn--light-outline">Install</a>
            <a href={`${import.meta.env.BASE_URL}zenderal/guide/`} className="btn btn--light-outline">Guides</a>
            <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn--light-outline">Support</a>
          </div>
        </Expanded>
      </Panel>
    </header>
  );
}
