// Preview (preview.html). The admin portal, a separate app, embeds this in an iframe and posts unsaved
// content to it; it renders the real public app with that content. Nothing here is saved or published.
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { ContentUnavailable, ErrorBoundary } from './components/ErrorBoundary';
import { PortfolioProvider } from './content/PortfolioContext';
import { normalizeContent } from './content/normalize.js';
import type { PortfolioContent } from './content/types.js';
import './styles.css';

/** The admin portal's origin, e.g. https://pavan-portfolio-admin.vercel.app (set VITE_ADMIN_ORIGIN in Vercel). */
const ADMIN_ORIGINS = [import.meta.env.VITE_ADMIN_ORIGIN, import.meta.env.DEV && 'http://localhost:5174']
  .filter((o): o is string => Boolean(o))
  .map((o) => o.replace(/\/+$/, ''));

export type PreviewMessage = { type: 'portfolio-preview'; content: PortfolioContent; path: string; nonce: number };

function Preview() {
  const [message, setMessage] = useState<PreviewMessage | null>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      // Only accept content from the admin portal that embeds us.
      if (!ADMIN_ORIGINS.includes(e.origin) || e.source !== window.parent) return;
      if (e.data?.type === 'portfolio-preview') {
        setMessage({ ...e.data, content: normalizeContent(e.data.content) });
      }
    };
    window.addEventListener('message', onMessage);
    for (const origin of ADMIN_ORIGINS) window.parent.postMessage({ type: 'portfolio-preview-ready' }, origin);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (!ADMIN_ORIGINS.length) return <p style={{ padding: 24 }}>Preview is not configured: set VITE_ADMIN_ORIGIN on the portfolio's Vercel project.</p>;
  if (!message) return <p style={{ padding: 24 }}>Loading preview…</p>;
  return (
    <ErrorBoundary key={message.nonce} fallback={<ContentUnavailable />}>
      <PortfolioProvider content={message.content}>
        {/* Remount on page change so the chosen page opens; content edits keep the current page. */}
        <MemoryRouter key={message.path} initialEntries={[message.path]}>
          <App />
        </MemoryRouter>
      </PortfolioProvider>
    </ErrorBoundary>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preview />
  </StrictMode>,
);
