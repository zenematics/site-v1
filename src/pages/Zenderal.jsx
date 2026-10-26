import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { DOCS, OVERVIEW } from '../zenderal/data.js';
import { SECTIONS } from '../zenderal/guide/data.js';
import ZenHero from '../zenderal/ZenHero.jsx';

const DOCS_URL = `${import.meta.env.BASE_URL}zenderal/docs/`;
const GUIDE_URL = `${import.meta.env.BASE_URL}zenderal/guide/`;

// The docs used to live on this page, so forward old links like #readme/installation.
if (location.hash.length > 1) location.replace(DOCS_URL + location.hash);

// { guide: id } / { doc: id } → the page link and its title.
function resolve(link) {
  if (link.guide) return { href: GUIDE_URL + '#' + link.guide, title: SECTIONS.find((s) => s.id === link.guide).title };
  return { href: DOCS_URL + '#' + link.doc, title: DOCS.find((d) => d.id === link.doc).title };
}

// An in-game screenshot, or a placeholder frame until one is added.
function Shot({ src, label, wide = false }) {
  const cls = `zshot${wide ? ' zshot--wide' : ''}`;
  if (src) return <img src={`${import.meta.env.BASE_URL}uploads/zenderal/${src}`} alt={label} className={cls} />;
  return (
    <div className={`${cls} zshot--empty`} role="img" aria-label={`${label} screenshot coming soon`}>
      <span className="zshot__label">Screenshot</span>
      <span className="zshot__name">{label}</span>
    </div>
  );
}

export default function Zenderal() {
  return (
    <div className="zen-page">
      <Nav zenderal="install" />

      <ZenHero
        live
        logo
        eyebrow="Wabbajack Modlist · Enderal SE"
        desc="A Wabbajack modlist for Enderal: Forgotten Stories — installed in one click and playable on keyboard or controller."
      />

      <section className="zintro">
        <span className="docs__label">What Zenderal is</span>
        <h2 className="zintro__title">{OVERVIEW.headline}</h2>
        <p className="zintro__lede">{OVERVIEW.lede}</p>
        <Shot src={OVERVIEW.shot} label="Zenderal" wide />
      </section>

      <section className="zgoals">
        <span className="docs__label">The goals</span>
        {OVERVIEW.goals.map((g, i) => (
          <article key={g.title} className={`zgoal${i % 2 ? ' zgoal--flip' : ''}`}>
            <div className="zgoal__body">
              <span className="zgoal__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="zgoal__title">{g.title}</h3>
              <p className="zgoal__text">{g.text}</p>
              <div className="zgoal__links">
                {g.links.map(resolve).map((l) => (
                  <a key={l.href} href={l.href} className="zgoal__link">
                    {l.title} →
                  </a>
                ))}
              </div>
            </div>
            <Shot src={g.shot} label={g.title} />
          </article>
        ))}
      </section>

      <section className="zcta">
        <h2 className="zcta__title">Ready to play?</h2>
        <p className="zcta__text">Read the install guide before you start, then dive into the gameplay guide.</p>
        <div className="actions">
          <a href={DOCS_URL + '#readme'} className="btn btn--light-solid">Install guide</a>
          <a href={GUIDE_URL} className="btn btn--light-outline">Gameplay guide</a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
