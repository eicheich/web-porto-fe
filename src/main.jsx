import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Dismiss the iconic Win98 boot splash once React has mounted
(() => {
  const bootEl = document.getElementById('win98-boot-screen');
  if (!bootEl) return;

  let dismissed = false;
  const dismissBoot = () => {
    if (dismissed) return;
    dismissed = true;
    bootEl.classList.add('is-hiding');
    window.removeEventListener('keydown', onKeySkip);
    setTimeout(() => bootEl.remove(), 380);
  };

  const onKeySkip = (e) => {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      dismissBoot();
    }
  };

  bootEl.addEventListener('click', dismissBoot);
  window.addEventListener('keydown', onKeySkip);

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const minBootMs = reducedMotion ? 0 : 1200;
  const remaining = Math.max(0, minBootMs - performance.now());

  setTimeout(dismissBoot, remaining);
})();
