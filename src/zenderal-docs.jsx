import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ZenderalDocs from './pages/ZenderalDocs.jsx';
import './index.css';
import './zenderal.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ZenderalDocs />
  </StrictMode>
);
