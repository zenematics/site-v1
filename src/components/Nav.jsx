import { useEffect, useState } from 'react';
import { LINKS } from '../config.js';
import Emblem from '../zenderal/Emblem.jsx';

// Phones show the Zenderal links as icons (see .nav__btn in index.css); the label stays for screen readers.
const ICONS = {
  // An arrow down into a tray.
  install: <path d="M12 3v12m0 0-5-5m5 5 5-5M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />,
  // An open book.
  guides: (
    <path d="M12 6.5C10.5 5 8 4.5 3 4.5v14c5 0 7.5.5 9 2m0-14c1.5-1.5 4-2 9-2v14c-5 0-7.5.5-9 2m0-14v14" />
  ),
  // A speech bubble (it links to the Discord).
  support: <path d="M4 5h16v11h-9l-5 4v-4H4z M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />,
};

function NavLink({ href, icon, children, external }) {
  return (
    <a
      href={href}
      className="btn btn--light-outline nav__btn"
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <svg className="nav__icon" viewBox="0 0 24 24" aria-hidden="true">
        {ICONS[icon]}
      </svg>
      <span className="nav__label">{children}</span>
    </a>
  );
}

// `blend`: invert against the content behind it until the page is scrolled (home hero).
// `intro`: fade in after the home hero panels have landed.
// `zenderal`: show the Zenderal emblem (linking to the overview) and links, minus the page
// you're on ('overview', 'install' or 'guides').
export default function Nav({ blend = false, intro = false, zenderal = null }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${intro ? ' nav--intro' : ''}`} style={{ mixBlendMode: blend && !scrolled ? 'difference' : 'normal' }}>
      <div className="nav__bg" style={{ opacity: scrolled ? 1 : 0 }} />
      <a href={import.meta.env.BASE_URL} className="nav__brand">
        <img src={`${import.meta.env.BASE_URL}uploads/zen-logo-white.png`} alt="Zenematics" className="nav__logo" />
        <span className="nav__name">Zenematics</span>
      </a>
      {zenderal && (
        <a href={`${import.meta.env.BASE_URL}zenderal/`} className="nav__zen" aria-label="Zenderal">
          <Emblem live className="nav__emblem" />
        </a>
      )}
      {zenderal && (
        <div className="nav__links">
          {zenderal !== 'install' && (
            <NavLink href={`${import.meta.env.BASE_URL}zenderal/docs/#readme`} icon="install">Install</NavLink>
          )}
          {zenderal !== 'guides' && (
            <NavLink href={`${import.meta.env.BASE_URL}zenderal/guide/`} icon="guides">Guides</NavLink>
          )}
          <NavLink href={LINKS.discord} icon="support" external>Support</NavLink>
        </div>
      )}
    </nav>
  );
}
