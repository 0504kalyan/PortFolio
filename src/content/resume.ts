// Generated CVs: when profile.resumeAuto is on, the build writes the CV (PDF and Word) from the
// portfolio's own content (see resume/generate.ts), so edits made in the admin appear in the CV on
// the next deploy. This module names those files; the site and the build both use it.
import type { PortfolioContent } from './types.js';

/** "Pavan Kalyan Kama" + role "frontend" → "Resume-Pavan-Kalyan-Kama-frontend". */
export function resumeBaseName(name: string, roleId = ''): string {
  const person = name
    .normalize('NFKD')
    .split(/\s+/)
    .map((w) => w.replace(/[^A-Za-z0-9]/g, ''))
    .filter(Boolean)
    .join('-');
  return `Resume-${person || 'CV'}${roleId ? `-${roleId}` : ''}`;
}

/** Site path (without extension) of a generated CV: at the root for this site, under /profiles/<name>/ for a profile. */
export const resumePath = (name: string, where: { profile?: string; roleId?: string } = {}) =>
  `${where.profile ? `/profiles/${where.profile}/` : '/'}${resumeBaseName(name, where.roleId)}`;

/** Points the CV links at the generated files when the profile uses automatic CVs. */
export function withGeneratedResume(content: PortfolioContent, where: { profile?: string; roleId?: string } = {}): PortfolioContent {
  if (!content.profile.resumeAuto) return content;
  const base = resumePath(content.profile.name, where);
  return { ...content, profile: { ...content.profile, resumeUrl: `${base}.pdf`, resumeAltUrl: `${base}.docx` } };
}
