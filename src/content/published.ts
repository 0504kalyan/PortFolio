// The published content, bundled at build time from content/portfolio.json (the single source of truth).
// The admin app (a separate project) commits that file to GitHub, and Vercel rebuilds the site with it.
import raw from '../../content/portfolio.json';
import type { PortfolioContent } from './types';

export const publishedContent = raw as unknown as PortfolioContent;
