import { useEffect, useState } from 'react';
import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import MobileHero from '../components/MobileHero.jsx';
import { ZENDERAL_STAGE } from '../config.js';

// Phones have no hover to drive the desktop accordion, so they get their own hero.
const PHONE = '(max-width: 759px)';

function usePhone() {
  const [phone, setPhone] = useState(() => matchMedia(PHONE).matches);
  useEffect(() => {
    const mq = matchMedia(PHONE);
    const onChange = () => setPhone(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return phone;
}

export default function Home() {
  const phone = usePhone();
  return (
    <div style={{ background: '#07080a', minHeight: '100vh', overflow: 'clip', position: 'relative' }}>
      <Nav blend intro />
      {phone ? <MobileHero zenderalStage={ZENDERAL_STAGE} /> : <Hero zenderalStage={ZENDERAL_STAGE} />}
    </div>
  );
}
