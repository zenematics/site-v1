import { useEffect, useState } from 'react';
import { LINKS } from '../config.js';

// `blend`: invert against the content behind it until the page is scrolled (home hero).
// `intro`: fade in after the home hero panels have landed.
// `zenderal`: show the Zenderal links, minus the page you're on ('install' or 'guides').
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
        <div className="nav__links">
          {zenderal !== 'install' && (
            <a href={`${import.meta.env.BASE_URL}zenderal/`} className="btn btn--light-outline nav__btn">Install</a>
          )}
          {zenderal !== 'guides' && (
            <a href={`${import.meta.env.BASE_URL}zenderal/guide/`} className="btn btn--light-outline nav__btn">Guides</a>
          )}
          <a href={LINKS.discord} target="_blank" rel="noopener noreferrer" className="btn btn--light-outline nav__btn">Support</a>
        </div>
      )}
    </nav>
  );
}
