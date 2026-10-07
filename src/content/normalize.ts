// Normalizes content/portfolio.json into the typed model the components use: known fields only,
// with defaults for anything missing. Validation happens in the admin app before content is saved.
import { SCHEMA_VERSION, type BaseItem, type CollectionKey, type ItemOf, type ItemStatus, type PortfolioContent, type SingletonKey } from './types.js';

/* ---------- Field specs ---------- */

/** How each field is coerced: text, boolean or string list. */
type Kind = 'short' | 'text' | 'bool' | 'list';

type FieldSpec<T> = { [F in Exclude<keyof T, keyof BaseItem>]-?: Kind };

const ITEM_FIELDS: { [K in CollectionKey]: FieldSpec<ItemOf<K>> } = {
  skillCategories: { name: 'short' },
  skills: { name: 'short', category: 'short', level: 'short', icon: 'short' },
  experience: {
    company: 'short',
    client: 'short',
    position: 'short',
    location: 'short',
    startDate: 'short',
    endDate: 'short',
    isCurrent: 'bool',
    description: 'text',
    technologies: 'list',
  },
  education: {
    institution: 'short',
    degree: 'short',
    field: 'short',
    startDate: 'short',
    endDate: 'short',
    grade: 'short',
    description: 'text',
  },
  projects: {
    title: 'short',
    tagline: 'short',
    description: 'text',
    responsibilities: 'list',
    startDate: 'short',
    endDate: 'short',
    isCurrent: 'bool',
    technologies: 'list',
    image: 'short',
    liveUrl: 'short',
    githubUrl: 'short',
    accent: 'short',
    featured: 'bool',
  },
  certifications: { name: 'short', issuer: 'short', issueDate: 'short', credentialUrl: 'short', description: 'text' },
  achievements: { title: 'short', description: 'text', date: 'short', url: 'short' },
  quickFacts: { text: 'short', highlights: 'list' },
  quotes: { text: 'text', author: 'short' },
  roles: {
    name: 'short',
    title: 'short',
    headline: 'short',
    shortBio: 'text',
    about: 'list',
    techStack: 'list',
    resumeUrl: 'short',
    resumeAltUrl: 'short',
    skills: 'list',
    projects: 'list',
    experience: 'list',
  },
};

const SINGLETON_FIELDS: { [K in Exclude<SingletonKey, 'home'>]: FieldSpec<PortfolioContent[K]> } = {
  seo: { title: 'short', description: 'text' },
  profile: {
    name: 'short',
    shortName: 'short',
    title: 'short',
    location: 'short',
    email: 'short',
    phone: 'short',
    profileImage: 'short',
    aboutImage: 'short',
    resumeAuto: 'bool',
    resumeUrl: 'short',
    resumeAltUrl: 'short',
    yearsOfExperience: 'short',
    currentProject: 'short',
    shortBio: 'text',
    about: 'list',
    techStack: 'list',
    footerTagline: 'short',
  },
  pageSubtitles: { works: 'short', about: 'short', contacts: 'short' },
  socialLinks: { linkedin: 'short', github: 'short', twitter: 'short', website: 'short' },
};

const COLLECTION_KEYS = Object.keys(ITEM_FIELDS) as CollectionKey[];
const STATUSES: ItemStatus[] = ['active', 'archived', 'deleted'];

/* ---------- Normalization ---------- */

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : typeof v === 'number' ? String(v) : '');

function coerce(kind: Kind, v: unknown): unknown {
  if (kind === 'bool') return v === true;
  if (kind === 'list') return Array.isArray(v) ? v.map(str).filter(Boolean) : [];
  return str(v);
}

function pickFields(raw: Obj, spec: Record<string, Kind>) {
  const out: Obj = {};
  for (const [field, kind] of Object.entries(spec)) out[field] = coerce(kind, raw[field]);
  return out;
}

function normalizeItem<K extends CollectionKey>(key: K, raw: unknown, index: number): ItemOf<K> {
  const r = isObj(raw) ? raw : {};
  const order = Number(r.displayOrder);
  return {
    id: str(r.id),
    displayOrder: Number.isFinite(order) ? order : index + 1,
    isVisible: r.isVisible !== false,
    status: STATUSES.includes(r.status as ItemStatus) ? (r.status as ItemStatus) : 'active',
    ...pickFields(r, ITEM_FIELDS[key] as Record<string, Kind>),
  } as ItemOf<K>;
}

/**
 * Rebuilds content from untrusted input: keeps only known fields, coerces their types and fills
 * missing ones with defaults. Unknown keys are dropped. Run validateContent on the result.
 */
export function normalizeContent(input: unknown): PortfolioContent {
  const r = isObj(input) ? input : {};
  const section = (k: string) => (isObj(r[k]) ? (r[k] as Obj) : {});
  const home = section('home');
  const quote = isObj(home.quote) ? home.quote : {};

  const single = (k: keyof typeof SINGLETON_FIELDS) => pickFields(section(k), SINGLETON_FIELDS[k] as Record<string, Kind>);
  // Key order here is the order written to content/portfolio.json.
  const out = {
    schemaVersion: SCHEMA_VERSION,
    seo: single('seo'),
    profile: single('profile'),
    home: { headline: str(home.headline), quote: { text: str(quote.text), author: str(quote.author) }, contactIntro: str(home.contactIntro) },
    pageSubtitles: single('pageSubtitles'),
    socialLinks: single('socialLinks'),
  } as unknown as PortfolioContent;
  for (const k of COLLECTION_KEYS) {
    const list = Array.isArray(r[k]) ? (r[k] as unknown[]) : [];
    (out as unknown as Obj)[k] = list.map((item, i) => normalizeItem(k, item, i));
  }
  return out;
}
