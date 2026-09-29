import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { PortfolioContent } from './types.js';
import { buildView, type PortfolioView } from './view';

const PortfolioContext = createContext<PortfolioView | null>(null);

/** Supplies content to the public components: published content on the site, unsaved content in the admin preview. */
export function PortfolioProvider({ content, children }: Readonly<{ content: PortfolioContent; children: ReactNode }>) {
  const view = useMemo(() => buildView(content), [content]);
  return <PortfolioContext.Provider value={view}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio(): PortfolioView {
  const view = useContext(PortfolioContext);
  if (!view) throw new Error('usePortfolio must be used inside <PortfolioProvider>');
  return view;
}
