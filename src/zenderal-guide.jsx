import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ZenderalGuide from './pages/ZenderalGuide.jsx';
import './index.css';
import './zenderal.css';

// The overview and every section page share this entry; a section page names itself in
// #root's data-section (see scripts/gen-guide-pages.mjs).

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ZenderalGuide section={document.getElementById('root').dataset.section} />
  </StrictMode>
);
