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
  // The Discord logo (it links to the Discord), filled rather than stroked.
  support: (
    <path
      className="nav__icon-fill"
      d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
    />
  ),
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
