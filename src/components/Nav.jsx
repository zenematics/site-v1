import { useEffect, useState } from 'react';

// `blend`: invert against the content behind it until the page is scrolled (home hero).
// `intro`: fade in after the home hero panels have landed.
export default function Nav({ blend = false, intro = false }) {
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
      <a href="/" className="nav__brand">
        <img src="/uploads/zen-logo-white.png" alt="Zenematics" className="nav__logo" />
        <span className="nav__name">Zenematics</span>
      </a>
    </nav>
  );
}
