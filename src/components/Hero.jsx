import { useEffect, useRef, useState } from 'react';

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

function Expanded({ s, children }) {
  return (
    <div
      className="panel__full"
      style={{
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

function Bar({ s, color }) {
  return <div className="panel__bar" style={{ background: color, transform: `scaleX(${s.bar})` }} />;
}

// While active, drift the image top ↔ bottom on a loop. On leave, pick the pan up
// from wherever it is and ease it back to the top instead of snapping.
function usePan(ref, on, enabled) {
  useEffect(() => {
    const img = ref.current;
    if (!enabled || !img || !on || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    img.style.objectPosition = 'center 0%';
    const anim = img.animate([{ objectPosition: 'center 0%' }, { objectPosition: 'center 100%' }], {
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
      img.style.objectPosition = 'center 0%';
    };
  }, [ref, on, enabled]);
}

// `showcase`: for artwork meant to be seen. No zoom, brighter when active, a scrim
// that only shadows the bottom-left corner behind the text, and the image pans up
// and down to reveal what the wide panel crops off.
function PhotoLayers({ s, src, showcase = false }) {
  const ref = useRef(null);
  usePan(ref, s.on, showcase);
  const img = showcase
    ? {
        transform: 'scale(1)',
        filter: s.on ? 'brightness(.9) saturate(1.05)' : s.filter,
        objectPosition: 'center 0%',
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

export default function Hero({ zenderalStage = 'Alpha' }) {
  const [active, setActive] = useState(null);
  const vw = useViewportWidth();
  const wide = vw >= 1200;
  // Phones: no hover to drive the accordion, so the panels stack and each shows
  // its full content.
  const stacked = vw < 760;

  const activate = (i) => () => !stacked && setActive((cur) => (cur === i ? cur : i));
  const [p0, p1, p2] = [0, 1, 2].map((i) => panelState(i, stacked ? i : active));

  const stageLabel = zenderalStage + (zenderalStage === 'Release' ? '' : ' · In testing');

  const logoW = stacked ? 'min(44vw,200px)' : p0.on ? 'min(46vh,34%)' : 'min(70vh,90%)';
  const emblemW = stacked ? 'min(56vw,260px)' : p2.on ? 'min(52vh,36%)' : 'min(60vh,86%)';
  // Stacked marks sit centred in the space the panel reserves above the text.
  const markPos = (w, ratio, expanded) =>
    stacked
      ? { top: `calc(var(--mark-top) + ${w} * ${ratio / 2})`, left: markLeft(false, w), opacity: 1 }
      : { left: markLeft(expanded, w) };

  return (
    <header id="top" className={`hero${stacked ? ' hero--stacked' : ''}`} onMouseLeave={() => setActive(null)}>
      {/* ---- Content ---- */}
      <Panel s={p0} enter={stacked ? 'bottom' : 'left'} onActivate={activate(0)}>
        <div
          className="panel__white"
          style={{ filter: p0.on || active == null ? 'brightness(1)' : 'brightness(.85)' }}
        >
          <img
            src="/uploads/zen-logo-black.png"
            alt=""
            className="panel__mark"
            style={{
              top: '44%',
              width: logoW,
              aspectRatio: '1',
              opacity: p0.on && !wide ? 0.14 : 1,
              ...markPos(logoW, 1, p0.on),
            }}
          />
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
        <Expanded s={p0}>
          <span className="eyebrow" style={{ color: ACCENT.contentText }}>Content</span>
          <h2 className="panel__title" style={{ color: '#0b0c0f' }}>Watch Zen</h2>
          <p className="panel__desc" style={{ color: '#3a3833' }}>
            Live modded playthroughs on Twitch, edited guides and showcases on YouTube, and a community on Discord.
          </p>
          <div className="actions">
            <a href="#content" className="btn btn--dark-outline">Twitch</a>
            <a href="#content" className="btn btn--dark-outline">YouTube</a>
            <a href="#content" className="btn btn--dark-solid">Discord</a>
          </div>
        </Expanded>
      </Panel>

      {/* ---- Guides ---- */}
      <Panel s={p1} enter="bottom" onActivate={activate(1)}>
        <PhotoLayers s={p1} src="/uploads/guides-bg-home.png" showcase />
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
      <Panel s={p2} enter={stacked ? 'bottom' : 'right'} onActivate={activate(2)}>
        <PhotoLayers s={p2} src="/uploads/zenderal-bg.png" />
        <img
          src="/uploads/zenderal-emblem.png"
          alt=""
          className="panel__mark"
          style={{
            top: '42%',
            width: emblemW,
            aspectRatio: '1378 / 1141',
            opacity: p2.on && !wide ? 0.3 : 1,
            ...markPos(emblemW, 1141 / 1378, p2.on),
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.6)) brightness(1)',
          }}
        />
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
        <Expanded s={p2}>
          <div className="eyebrow-row">
            <span className="eyebrow" style={{ color: ACCENT.zenderal }}>Modlist</span>
            <span className="stage-badge">{stageLabel}</span>
          </div>
          <h2 className="panel__title panel__title--metal">Zenderal</h2>
          <p className="panel__desc" style={{ color: '#c2beb6' }}>
            A Wabbajack modlist for Enderal: Forgotten Stories. Readme, install steps, controller support, FAQs and
            quest guides.
          </p>
          <div className="actions">
            <a href="/zenderal/" className="btn btn--light-solid">Read the docs</a>
            <a href="/zenderal/#readme/installation" className="btn btn--light-outline">Install guide</a>
          </div>
        </Expanded>
      </Panel>
    </header>
  );
}
