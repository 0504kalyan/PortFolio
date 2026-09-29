// The portfolio content model. content/portfolio.json follows this shape, and the public site,
// the admin UI and the serverless API all share these types.

export const SCHEMA_VERSION = 1;

/** Lifecycle of a collection item. Only `active` + `isVisible` items appear on the public site. */
export type ItemStatus = 'active' | 'archived' | 'deleted';

export interface BaseItem {
  id: string;
  displayOrder: number;
  isVisible: boolean;
  status: ItemStatus;
}

export interface Seo {
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  /** Shown in the "Find me here" box on Contacts. */
  location: string;
  email: string;
  phone: string;
  /** Home hero photo. */
  profileImage: string;
  /** About page photo; falls back to profileImage when empty. */
  aboutImage: string;
  resumeUrl: string;
  yearsOfExperience: string;
  currentProject: string;
  /** Grey line under the Home headline. */
  shortBio: string;
  /** About paragraphs. Home shows the first two. */
  about: string[];
  /** The Stack array in the Home hero code window. */
  techStack: string[];
  /** Footer line after the title. */
  footerTagline: string;
}

export interface HomeContent {
  /** Words in [square brackets] are shown in the accent colour. */
  headline: string;
  quote: { text: string; author: string };
  contactIntro: string;
}

export interface PageSubtitles {
  works: string;
  about: string;
  contacts: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
}

export interface SkillCategory extends BaseItem {
  name: string;
}

export interface Skill extends BaseItem {
  name: string;
  /** SkillCategory id. */
  category: string;
  level: string;
  /** Icon key override; empty picks an icon from the name. */
  icon: string;
}

export interface Experience extends BaseItem {
  company: string;
  client: string;
  position: string;
  location: string;
  /** YYYY-MM or YYYY. */
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
}

export interface Education extends BaseItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
}

export interface Project extends BaseItem {
  title: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  /** Cover colour, #RRGGBB. */
  accent: string;
  /** Shown in the Home #projects section (first three). */
  featured: boolean;
}

export interface Certification extends BaseItem {
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  description: string;
}

export interface Achievement extends BaseItem {
  title: string;
  description: string;
  date: string;
  url: string;
}

export interface QuickFact extends BaseItem {
  text: string;
  /** Words copied exactly from `text` to show highlighted. */
  highlights: string[];
}

/** A job-based version of the portfolio, at /r/<id> (or /p/<profile>/<id>). Empty fields keep the profile's. */
export interface Role extends BaseItem {
  name: string;
  title: string;
  headline: string;
  shortBio: string;
  about: string[];
  techStack: string[];
  resumeUrl: string;
  /** Ids to show; empty shows all. */
  skills: string[];
  projects: string[];
  experience: string[];
}

export interface PortfolioContent {
  schemaVersion: number;
  seo: Seo;
  profile: Profile;
  home: HomeContent;
  pageSubtitles: PageSubtitles;
  socialLinks: SocialLinks;
  skillCategories: SkillCategory[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  quickFacts: QuickFact[];
  roles: Role[];
}

export type CollectionKey =
  | 'skillCategories'
  | 'skills'
  | 'experience'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'achievements'
  | 'quickFacts'
  | 'roles';

export type SingletonKey = 'seo' | 'profile' | 'home' | 'pageSubtitles' | 'socialLinks';

export type ItemOf<K extends CollectionKey> = PortfolioContent[K][number];

export interface ValidationIssue {
  /** Dotted path, e.g. `projects.cm-core.title` or `profile.email`. */
  path: string;
  message: string;
}
