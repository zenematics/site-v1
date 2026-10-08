import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { LINKS } from '../config.js';
import { DOCS } from '../zenderal/data.js';
import { overview } from '../zenderal/content.js';
import Md from '../zenderal/Md.jsx';
import ZenHero from '../zenderal/ZenHero.jsx';
import Sidebar from '../zenderal/Sidebar.jsx';

const DOCS_URL = `${import.meta.env.BASE_URL}zenderal/docs/`;

// The docs used to live on this page, so forward old links like #readme/installation.
if (location.hash.length > 1) location.replace(DOCS_URL + location.hash);

export default function Zenderal() {
  const first = DOCS[0];
  return (
    <div className="zen-page">
      <Nav />

      <ZenHero
        eyebrow="Wabbajack Modlist · Enderal SE"
        desc="A Wabbajack modlist for Enderal: Forgotten Stories — installed in one click and playable on keyboard or controller."
      >
        <div className="actions">
          <a href={DOCS_URL} className="btn btn--light-solid">Install guide</a>
          <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn--light-outline">Alpha support on Discord</a>
        </div>
      </ZenHero>

      <section className="docs">
        <Sidebar active="overview" href={(hash) => DOCS_URL + '#' + hash} />

        <article className="doc">
          <div className="doc__head">
            <span className="docs__label">Zenderal · Getting Started</span>
            <h2 className="doc__title">Overview</h2>
          </div>

          <Md>{overview}</Md>

          <div className="pager">
            <span style={{ flex: 1 }} />
            <a href={DOCS_URL + '#' + first.id} className="pager__link pager__link--next">
              <span className="pager__dir">Next →</span>
              <span className="pager__title">{first.title}</span>
            </a>
          </div>
        </article>
      </section>

      <Footer />
    </div>
  );
}
