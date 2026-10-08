import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Zenderal from './pages/Zenderal.jsx';
import './index.css';
import './zenderal.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Zenderal />
  </StrictMode>
);
