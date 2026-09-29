// Turns raw content into what the public components render: only active + visible items,
// sorted by displayOrder, with dates formatted.
import { formatRange, yearOf } from './format.js';
import type { BaseItem, PortfolioContent, Project } from './types.js';

export type ProjectView = Project & { duration: string };
export type SkillGroupView = { id: string; title: string; items: { id: string; name: string; icon: string }[] };
export type ContactKind = 'email' | 'linkedin' | 'phone' | 'github' | 'twitter' | 'website';
export type ContactView = { key: ContactKind; label: string; text: string; href: string; external?: boolean };

const live = <T extends BaseItem>(items: T[]) =>
  items.filter((i) => i.status === 'active' && i.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);

const bareUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function buildContacts({ profile, socialLinks: s }: PortfolioContent): ContactView[] {
  const list: (ContactView | false)[] = [
    Boolean(profile.email) && { key: 'email', label: 'Email', text: profile.email, href: `mailto:${profile.email}` },
    Boolean(s.linkedin) && { key: 'linkedin', label: 'LinkedIn', text: bareUrl(s.linkedin), href: s.linkedin, external: true },
    Boolean(profile.phone) && { key: 'phone', label: 'Phone', text: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    Boolean(s.github) && { key: 'github', label: 'GitHub', text: bareUrl(s.github), href: s.github, external: true },
    Boolean(s.twitter) && { key: 'twitter', label: 'X / Twitter', text: bareUrl(s.twitter), href: s.twitter, external: true },
    Boolean(s.website) && { key: 'website', label: 'Website', text: bareUrl(s.website), href: s.website, external: true },
  ];
  return list.filter((c): c is ContactView => Boolean(c));
}

export function buildView(content: PortfolioContent) {
  const projects: ProjectView[] = live(content.projects).map((p) => ({
    ...p,
    duration: formatRange(p.startDate, p.endDate, p.isCurrent, 'short'),
  }));
  const featured = projects.filter((p) => p.featured);
  const skills = live(content.skills);

  return {
    content,
    profile: content.profile,
    home: content.home,
    pageSubtitles: content.pageSubtitles,
    contacts: buildContacts(content),
    projects,
    /** Home #projects: featured projects, or the first ones when none are featured. */
    featuredProjects: (featured.length ? featured : projects).slice(0, 3),
    skillGroups: live(content.skillCategories)
      .map<SkillGroupView>((c) => ({
        id: c.id,
        title: c.name,
        items: skills.filter((s) => s.category === c.id).map(({ id, name, icon }) => ({ id, name, icon })),
      }))
      .filter((g) => g.items.length > 0),
    experience: live(content.experience).map((e) => ({ ...e, period: formatRange(e.startDate, e.endDate, e.isCurrent) })),
    education: live(content.education).map((e) => ({ ...e, year: e.endDate ? yearOf(e.endDate) : e.startDate ? yearOf(e.startDate) : '' })),
    certifications: live(content.certifications),
    achievements: live(content.achievements),
    quickFacts: live(content.quickFacts),
  };
}

export type PortfolioView = ReturnType<typeof buildView>;
