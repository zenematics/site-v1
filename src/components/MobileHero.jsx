import { useState } from 'react';
import { LINKS, PANEL_VIDEOS, stageLabel } from '../config.js';
import Logo from '../zenderal/Logo.jsx';
import YouTube from './YouTube.jsx';

const BASE = import.meta.env.BASE_URL;

// The home hero on phones: the desktop accordion turned on its side. The three
// sections share one screen as bands; tapping one grows it to show its content
// while the others shrink to slim bars with their name and mark. No page scroll.
//
// Each band is 'idle' (none open), 'on' (open) or 'off' (another is open).
function Band({ state, theme, label, accent, onOpen, back, mark, idle, children }) {
  const open = state === 'on';
  return (
    <section
      className={`mband mband--${theme} is-${state}`}
      style={{ '--accent': accent }}
      onClick={open ? undefined : onOpen}
      onKeyDown={open ? undefined : (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
      role={open ? undefined : 'button'}
      tabIndex={open ? undefined : 0}
      aria-expanded={open}
      aria-label={open ? undefined : label}
    >
      {back}
      {mark && <img src={mark.src} alt="" className="mband__mark" style={{ aspectRatio: mark.ratio }} />}
      <div className="mband__idle" aria-hidden="true">{idle}</div>
      <div className="mband__name" aria-hidden="true">{label}</div>
      <div className="mband__full" inert={!open}>{children}</div>
      <div className="mband__bar" />
    </section>
  );
}

function Idle({ eyebrow, title, meta }) {
  return (
    <>
      <span className="eyebrow mband__eyebrow">{eyebrow}</span>
      <span className="mband__title">{title}</span>
      <span className="mband__meta">
        <span className="mband__rule" />
        {meta}
      </span>
    </>
  );
}

export default function MobileHero({ zenderalStage = 'Beta' }) {
  const [active, setActive] = useState(null);
  const state = (i) => (active == null ? 'idle' : active === i ? 'on' : 'off');

  return (
    <header id="top" className="mhero">
      <Band
        state={state(0)}
        theme="content"
        label="Watch Zen"
        accent="#6a2fd6"
        onOpen={() => setActive(0)}
        back={<div className="mband__white" />}
        mark={{ src: `${BASE}uploads/zen-logo-black.png`, ratio: '1' }}
        idle={<Idle eyebrow="Content" title="Watch Zen" meta="Twitch · YouTube · Discord" />}
      >
        {PANEL_VIDEOS.content && (
          <div className="mband__video">
            <YouTube id={PANEL_VIDEOS.content} title="Zenematics video" on={state(0) === 'on'} />
          </div>
        )}
        <span className="eyebrow mband__eyebrow">Content</span>
        <h2 className="sr-only">Watch Zen</h2>
        <p className="mband__desc">
          Live modded playthroughs on Twitch, edited guides and showcases on YouTube, and a community on Discord.
        </p>
        <div className="actions actions--lead">
          <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn--dark-solid">Discord</a>
          <a href={LINKS.twitch} target="_blank" rel="noopener noreferrer" className="btn btn--dark-outline">Twitch</a>
          <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="btn btn--dark-outline">YouTube</a>
          <a href={LINKS.patreon} target="_blank" rel="noopener noreferrer" className="btn btn--dark-outline">Patreon</a>
        </div>
      </Band>

      <Band
        state={state(1)}
        theme="guides"
        label="Build Guides"
        accent="#e0953d"
        onOpen={() => setActive(1)}
        back={
          <>
            <img src={`${BASE}uploads/guides-bg-home.webp`} alt="" className="mband__bg" />
            <div className="mband__scrim" />
          </>
        }
        idle={<Idle eyebrow="Guides" title="Build Guides" meta="LoreRim · Star Citizen" />}
      >
        <span className="eyebrow mband__eyebrow">Guides</span>
        <h2 className="panel__title panel__title--metal mband__heading">Build Guides</h2>
        <p className="mband__desc">
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
            <span style={{ color: '#e0953d' }}>Coming soon</span>
          </span>
        </div>
      </Band>

      <Band
        state={state(2)}
        theme="zenderal"
        label="Zenderal"
        accent="#c9c5bd"
        onOpen={() => setActive(2)}
        back={
          <>
            <img src={`${BASE}uploads/zenderal/screenshots/backgrounds/ark.webp`} alt="" className="mband__bg" />
            <div className="mband__scrim" />
          </>
        }
        mark={{ src: `${BASE}uploads/zenderal-emblem.webp`, ratio: '1378 / 1141' }}
        idle={<Idle eyebrow="Modlist" title="Zenderal" meta={`${zenderalStage} · Enderal`} />}
      >
        {/* Remounts on each open, so the vines grow again. */}
        {state(2) === 'on' && <Logo className="panel__logo mband__logo" />}
        <h2 className="sr-only">Zenderal</h2>
        <div className="eyebrow-row">
          <span className="eyebrow mband__eyebrow">Modlist</span>
          <span className="stage-badge">{stageLabel(zenderalStage)}</span>
        </div>
        <p className="mband__desc">
          A Wabbajack modlist for Enderal: Forgotten Stories. Install steps and FAQs, plus gameplay guides for races,
          perks, spells, combat and controller support.
        </p>
        <div className="actions actions--lead">
          <a href={`${BASE}zenderal/`} className="btn btn--light-solid">Explore</a>
          <a href={`${BASE}zenderal/docs/#readme`} className="btn btn--light-outline">Install</a>
          <a href={`${BASE}zenderal/guide/`} className="btn btn--light-outline">Guides</a>
          <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn--light-outline">Support</a>
        </div>
      </Band>
    </header>
  );
}
