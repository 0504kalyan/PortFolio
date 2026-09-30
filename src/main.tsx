import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContentUnavailable, ErrorBoundary } from './components/ErrorBoundary';
import { PortfolioProvider } from './content/PortfolioContext';
import { normalizeContent } from './content/normalize.js';
import { publishedContent } from './content/published';
import { withGeneratedResume } from './content/resume.js';
import { applyRole, findRole } from './content/roles.js';
import type { PortfolioContent } from './content/types.js';
import './styles.css';

/**
 * Which portfolio this URL shows. The site's own content is at /, a role of it at /r/<role>, and a
 * profile created from a resume (in the Portfolio Admin) at /p/<name>, with its roles at /p/<name>/<role>.
 * Everything after that prefix is the usual routes (/works, /about-me, /contacts).
 */
const PAGES = new Set(['works', 'about-me', 'contacts']);

function locate(pathname: string) {
  const [first, second, third] = pathname.split('/').filter(Boolean).map(decodeURIComponent);
  if (first === 'p' && second) {
    const role = third && !PAGES.has(third) ? third : '';
    return { profile: second, role, prefix: `/p/${second}` };
  }
  if (first === 'r' && second) return { profile: '', role: second, prefix: '' };
  return { profile: '', role: '', prefix: '' };
}

const where = locate(window.location.pathname);

/**
 * The content with the URL's role applied, or null when there's no such role. With automatic CVs on,
 * the CV links point at the files the build generated for exactly this profile and role, unless the
 * role has its own uploaded CV.
 */
function withRole(content: PortfolioContent, roleId: string, profile = '') {
  if (!roleId) return withGeneratedResume(content, { profile });
  const role = findRole(content, roleId);
  if (!role) return null;
  const applied = applyRole(content, role);
  return role.resumeUrl ? applied : withGeneratedResume(applied, { profile, roleId });
}

function setDocumentMeta({ seo }: PortfolioContent) {
  if (seo.title) document.title = seo.title;
  if (seo.description) document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
}

function Site({ content, basename }: Readonly<{ content: PortfolioContent; basename: string }>) {
  useEffect(() => setDocumentMeta(content), [content]);
  return (
    <PortfolioProvider content={content}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </PortfolioProvider>
  );
}

function NotFound({ message }: Readonly<{ message: string }>) {
  useEffect(() => {
    document.title = 'Portfolio not found';
  }, []);
  return (
    <main className="container main">
      <p style={{ padding: '64px 0' }}>{message}</p>
    </main>
  );
}

/** A profile's content is fetched at runtime from /profiles/<name>.json, emitted by the build (vite.config.ts). */
function Profile({ name, roleId }: Readonly<{ name: string; roleId: string }>) {
  const [state, setState] = useState<{ content: PortfolioContent } | 'loading' | 'missing'>('loading');
  useEffect(() => {
    fetch(`/profiles/${encodeURIComponent(name)}.json`, { cache: 'no-cache' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { content?: unknown }) => setState({ content: normalizeContent(data.content) }))
      .catch(() => setState('missing'));
  }, [name]);

  if (state === 'loading') return null;
  if (state === 'missing') return <NotFound message="This portfolio doesn't exist (yet). If it was just published, try again in a minute." />;
  const content = withRole(state.content, roleId, name);
  if (!content) {
    window.location.replace(`/p/${encodeURIComponent(name)}`);
    return null;
  }
  return <Site content={content} basename={`${where.prefix}${roleId ? `/${roleId}` : ''}`} />;
}

function Root() {
  if (where.profile) return <Profile name={where.profile} roleId={where.role} />;
  const content = withRole(publishedContent, where.role);
  if (!content) {
    window.location.replace('/');
    return null;
  }
  return <Site content={content} basename={where.role ? `/r/${where.role}` : ''} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ContentUnavailable />}>
      <Root />
    </ErrorBoundary>
  </StrictMode>,
);
