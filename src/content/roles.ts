// Job-based roles: a role is the same portfolio aimed at one kind of job. It replaces the job title,
// headline, bio, stack and CV, and shows only the skills, projects and experience it picks.
import type { BaseItem, PortfolioContent, Role } from './types.js';

/** The role with this id, if it's active and visible. */
export const findRole = (content: PortfolioContent, id: string): Role | undefined =>
  content.roles.find((r) => r.id === id && r.status === 'active' && r.isVisible);

/** Only the picked items stay visible, in the order they were picked. Nothing picked keeps everything. */
function pick<T extends BaseItem>(items: T[], ids: string[]): T[] {
  if (!ids.length) return items;
  const order = new Map(ids.map((id, i) => [id, i + 1]));
  return items.map((item) => ({ ...item, isVisible: item.isVisible && order.has(item.id), displayOrder: order.get(item.id) ?? item.displayOrder }));
}

export function applyRole(content: PortfolioContent, role: Role): PortfolioContent {
  const { profile, home, seo } = content;
  const title = role.title || role.name;
  const projects = pick(content.projects, role.projects);
  return {
    ...content,
    seo: { ...seo, title: `${profile.name} · ${title}` },
    profile: {
      ...profile,
      title,
      shortBio: role.shortBio || profile.shortBio,
      about: role.about.length ? role.about : profile.about,
      techStack: role.techStack.length ? role.techStack : profile.techStack,
      // A role's own CV replaces both of the profile's formats.
      ...(role.resumeUrl ? { resumeUrl: role.resumeUrl, resumeAltUrl: role.resumeAltUrl } : {}),
    },
    home: { ...home, headline: role.headline || home.headline },
    skills: pick(content.skills, role.skills),
    experience: pick(content.experience, role.experience),
    // A role's first three picked projects are its featured ones.
    projects: role.projects.length ? projects.map((p) => ({ ...p, featured: false })) : projects,
  };
}
