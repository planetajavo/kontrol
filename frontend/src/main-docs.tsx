import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsApp from './DocsApp';
import './styles/globals.css';

createRoot(document.getElementById('docs-root')!).render(
  <StrictMode>
    <DocsApp />
  </StrictMode>
);
