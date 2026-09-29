import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ContentUnavailable, ErrorBoundary } from './components/ErrorBoundary';
import { PortfolioProvider } from './content/PortfolioContext';
import { publishedContent } from './content/published';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ContentUnavailable />}>
      <PortfolioProvider content={publishedContent}>
        <App />
      </PortfolioProvider>
    </ErrorBoundary>
  </StrictMode>,
);
