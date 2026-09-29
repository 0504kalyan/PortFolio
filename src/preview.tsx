// Preview (preview.html). The portfolio admin app embeds this in an iframe and posts unsaved content
// to it; it renders the real page with that content. Nothing here is saved or published.
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ContentUnavailable, ErrorBoundary } from './components/ErrorBoundary';
import { PortfolioProvider } from './content/PortfolioContext';
import type { PortfolioContent } from './content/types';
import './styles.css';

/** The admin app's origin, e.g. https://portfolio-admin.vercel.app (set VITE_ADMIN_ORIGIN in Vercel). */
const ADMIN_ORIGINS = [import.meta.env.VITE_ADMIN_ORIGIN, import.meta.env.DEV && 'http://localhost:5174']
  .filter((o): o is string => Boolean(o))
  .map((o) => o.replace(/\/+$/, ''));

/** `path` is a section anchor such as "#expertise". */
type PreviewMessage = { type: 'portfolio-preview'; content: PortfolioContent; path: string; nonce: number };

function Preview() {
  const [message, setMessage] = useState<PreviewMessage | null>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      // Only accept content from the admin app that embeds us.
      if (!ADMIN_ORIGINS.includes(e.origin) || e.source !== window.parent) return;
      if (e.data?.type === 'portfolio-preview') setMessage(e.data);
    };
    window.addEventListener('message', onMessage);
    for (const origin of ADMIN_ORIGINS) window.parent.postMessage({ type: 'portfolio-preview-ready' }, origin);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Jump to the requested section once it has rendered.
  useEffect(() => {
    if (!message) return;
    const id = message.path.replace(/^#/, '') || 'top';
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      // Scroll only this window (scrollIntoView would also scroll the admin page around the iframe),
      // instantly (the site's CSS uses smooth scrolling), below the sticky header.
      const margin = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || (document.querySelector('header')?.offsetHeight ?? 0);
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - margin, behavior: 'instant' });
    });
  }, [message]);

  if (!ADMIN_ORIGINS.length) return <p style={{ padding: 24 }}>Preview is not configured: set VITE_ADMIN_ORIGIN on this portfolio's Vercel project.</p>;
  if (!message) return <p style={{ padding: 24 }}>Loading preview…</p>;
  return (
    <ErrorBoundary key={message.nonce} fallback={<ContentUnavailable />}>
      <PortfolioProvider content={message.content}>
        <App />
      </PortfolioProvider>
    </ErrorBoundary>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preview />
  </StrictMode>,
);
