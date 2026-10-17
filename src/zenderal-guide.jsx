import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ZenderalGuide from './pages/ZenderalGuide.jsx';
import './index.css';
import './zenderal.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ZenderalGuide />
  </StrictMode>
);
