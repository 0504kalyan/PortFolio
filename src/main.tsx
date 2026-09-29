import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContentUnavailable, ErrorBoundary } from './components/ErrorBoundary';
import { PortfolioProvider } from './content/PortfolioContext';
import { publishedContent } from './content/published';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ContentUnavailable />}>
      <PortfolioProvider content={publishedContent}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PortfolioProvider>
    </ErrorBoundary>
  </StrictMode>,
);
