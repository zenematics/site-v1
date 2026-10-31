import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

function NavLink({ href, icon, children, external, hero }) {
  const ext = external && { target: '_blank', rel: 'noopener noreferrer' };
  // The hero's version is larger, with no icons (there's room for the labels on phones).
  if (hero) {
    return (
      <a href={href} className="btn btn--light-outline" {...ext}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className="btn btn--light-outline nav__btn" {...ext}>
      <svg className="nav__icon" viewBox="0 0 24 24" aria-hidden="true">
        {ICONS[icon]}
      </svg>
      <span className="nav__label">{children}</span>
    </a>
  );
}

// The Zenderal Install / Guides / Support links, minus the page you're on ('overview', 'install'
// or 'guides'). `hero` is the larger row under the overview hero's intro (see Nav's `dock`).
export function ZenLinks({ page, hero = false, className = '', ...rest }) {
  return (
    <div className={`${hero ? 'zhero__links' : 'nav__links'} ${className}`.trim()} {...rest}>
      {page !== 'install' && (
        <NavLink href={`${import.meta.env.BASE_URL}zenderal/docs/#readme`} icon="install" hero={hero}>Install</NavLink>
      )}
      {page !== 'guides' && (
        <NavLink href={`${import.meta.env.BASE_URL}zenderal/guide/`} icon="guides" hero={hero}>Guides</NavLink>
      )}
      <NavLink href={LINKS.discord} icon="support" external hero={hero}>Support</NavLink>
    </div>
  );
}

// `blend`: invert against the content behind it until the page is scrolled (home hero).
// `intro`: fade in after the home hero panels have landed.
// `zenderal`: show the Zenderal emblem (linking to the overview) and links, minus the page
// you're on ('overview', 'install' or 'guides').
// `dock`: a selector for a row of the same links on the page (the overview hero's). The nav's
// own links stay hidden until the nav's background comes in (on the first scroll), then fly up
// out of it into place (and back down into it when you scroll back up).
export default function Nav({ blend = false, intro = false, zenderal = null, dock = null }) {
  const [scrolled, setScrolled] = useState(false);
  const [docked, setDocked] = useState(false);
  // The nav's links are hidden: docking, and not yet back from undocking.
  const [away, setAway] = useState(!!dock);
  const links = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (dock) setDocked(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dock]);

  // Fly each nav button between its own box and its twin's in the page row: it's drawn in the nav,
  // transformed to sit over the twin, with the twin's colours. The twin is re-measured every frame
  // so the flight keeps hold of it while the page scrolls, and `p` (0 in the row, 1 in the nav)
  // just turns round if you change direction mid-flight. The page row is hidden while the nav's
  // buttons show, so there's only ever one of each.
  const flight = useRef({ p: 0, frame: 0 });
  useLayoutEffect(() => {
    const row = dock && document.querySelector(dock);
    if (!row) return;
    const f = flight.current;
    const buttons = [...links.current.children];
    const twins = [...row.children];
    const target = docked ? 1 : 0;
    const icons = buttons.map((b) => b.querySelector('.nav__icon'));
    const reset = () => {
      for (const b of buttons) b.removeAttribute('style');
      for (const icon of icons) icon?.removeAttribute('style');
    };
    const land = () => {
      reset();
      if (!target) {
        row.classList.remove('is-docked');
        setAway(true);
      }
    };
    if (docked) {
      row.classList.add('is-docked');
      setAway(false);
    }
    cancelAnimationFrame(f.frame);
    if (first.current || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      first.current = false;
      f.p = target;
      land();
      return;
    }

    // The nav is fixed, so each button's own box and colours hold still: measure them untransformed.
    reset();
    const rgba = (c) => (c.match(/[\d.]+/g) || []).map(Number).concat(1).slice(0, 4);
    const ends = buttons.map((b, i) => {
      const own = getComputedStyle(b);
      const look = getComputedStyle(twins[i]);
      return {
        box: b.getBoundingClientRect(),
        colours: ['backgroundColor', 'borderColor', 'color'].map((k) => [k, rgba(look[k]), rgba(own[k])]),
      };
    });
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
    const mix = (a, b, t) => a + (b - a) * t;
    let last = performance.now();
    const step = (now) => {
      const dt = (now - last) / 550;
      last = now;
      f.p = target ? Math.min(1, f.p + dt) : Math.max(0, f.p - dt);
      buttons.forEach((b, i) => {
        // A slight stagger: later buttons leave a little after the first.
        const t = ease(Math.min(1, Math.max(0, f.p * 1.15 - i * 0.075)));
        const to = ends[i].box;
        const from = twins[i].getBoundingClientRect();
        const sx = mix(from.width / to.width, 1, t);
        const sy = mix(from.height / to.height, 1, t);
        b.style.transform = `translate(${mix(from.left - to.left, 0, t)}px, ${mix(from.top - to.top, 0, t)}px) scale(${sx}, ${sy})`;
        b.style.transformOrigin = '0 0';
        // Phones' icon-only buttons are much squarer than their wide twins, so the box's uneven scale
        // would stretch the icon: undo it so the icon scales evenly, and fade it in, as the twin has none.
        const icon = icons[i];
        if (icon) {
          const s = Math.min(sx, sy);
          icon.style.transform = `scale(${s / sx}, ${s / sy})`;
          icon.style.opacity = t;
        }
        for (const [k, a, z] of ends[i].colours) b.style[k] = `rgba(${a.map((v, j) => mix(v, z[j], t)).join(',')})`;
      });
      if (f.p === target) land();
      else f.frame = requestAnimationFrame(step);
    };
    step(last);
    return () => cancelAnimationFrame(f.frame);
  }, [docked, dock]);

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
      {zenderal && <ZenLinks ref={links} page={zenderal} className={away ? 'is-away' : ''} inert={away ? true : undefined} />}
    </nav>
  );
}
