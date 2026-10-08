import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import { ZENDERAL_STAGE } from '../config.js';

export default function Home() {
  return (
    <div style={{ background: '#07080a', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Nav blend intro />
      <Hero zenderalStage={ZENDERAL_STAGE} />
    </div>
  );
}
