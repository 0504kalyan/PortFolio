import type { IconType } from 'react-icons';
import {
  TbApi,
  TbBolt,
  TbBrandAngular,
  TbBrandAzure,
  TbBrandCSharp,
  TbBrandCss3,
  TbBrandDocker,
  TbBrandGit,
  TbBrandGithubCopilot,
  TbBrandHtml5,
  TbBrandJavascript,
  TbBrandMongodb,
  TbBrandReact,
  TbBrandTailwind,
  TbBrandTypescript,
  TbBrandVisualStudio,
  TbBrandVscode,
  TbBuildingSkyscraper,
  TbCloudComputing,
  TbCode,
  TbDatabase,
  TbDatabaseCog,
  TbFileTypeSql,
  TbFilter,
  TbGauge,
  TbHexagons,
  TbLayoutBoardSplit,
  TbLayoutGrid,
  TbPlugConnected,
  TbPuzzle,
  TbRepeat,
  TbShieldLock,
  TbSql,
  TbTable,
  TbTimeline,
  TbUsersGroup,
  TbVersions,
  TbWebhook,
  TbWorldWww,
} from 'react-icons/tb';
import { SiClaude, SiCursor, SiDotnet, SiNx, SiPostgresql, SiPostman } from 'react-icons/si';

/** An icon plus the brand colour it turns on hover (colours lightened where needed for the dark background). */
export type SkillIcon = { icon: IconType; color: string };

const PURPLE = '#C778DD';

/** Exact skill name (case-insensitive) → icon. Add an entry here to give a new skill its own icon. */
const byName: Record<string, SkillIcon> = {
  // Languages
  'c#': { icon: TbBrandCSharp, color: '#B77DDB' },
  't-sql': { icon: TbSql, color: '#E0525A' },
  'pl/sql': { icon: TbFileTypeSql, color: '#F29111' },
  javascript: { icon: TbBrandJavascript, color: '#F7DF1E' },
  typescript: { icon: TbBrandTypescript, color: '#4A9BE8' },
  // Databases
  'ms sql': { icon: TbDatabase, color: '#E0525A' },
  postgresql: { icon: SiPostgresql, color: '#5B8DEF' },
  mongodb: { icon: TbBrandMongodb, color: '#47A248' },
  // Frameworks
  'dot net core': { icon: SiDotnet, color: '#8C6CF2' },
  'asp.net': { icon: TbWorldWww, color: '#8C6CF2' },
  'asp.net mvc': { icon: TbLayoutBoardSplit, color: '#8C6CF2' },
  'asp.net core': { icon: SiDotnet, color: '#8C6CF2' },
  'web api': { icon: TbApi, color: '#8C6CF2' },
  'entity framework': { icon: TbTable, color: '#8C6CF2' },
  dapper: { icon: TbDatabaseCog, color: '#8C6CF2' },
  linq: { icon: TbFilter, color: '#8C6CF2' },
  wcf: { icon: TbPlugConnected, color: '#8C6CF2' },
  // Front-end
  'angular 16, 18 & 20': { icon: TbBrandAngular, color: '#E23237' },
  react: { icon: TbBrandReact, color: '#61DAFB' },
  rxjs: { icon: TbTimeline, color: '#E535AB' },
  nx: { icon: SiNx, color: '#FFFFFF' },
  'module federation': { icon: TbPuzzle, color: PURPLE },
  html: { icon: TbBrandHtml5, color: '#E34F26' },
  css: { icon: TbBrandCss3, color: '#3D8FD6' },
  'tailwind css': { icon: TbBrandTailwind, color: '#38BDF8' },
  // Architecture
  microservices: { icon: TbHexagons, color: PURPLE },
  'micro-frontend': { icon: TbLayoutGrid, color: PURPLE },
  'rest apis': { icon: TbWebhook, color: PURPLE },
  'multi-tenant': { icon: TbBuildingSkyscraper, color: PURPLE },
  rbac: { icon: TbShieldLock, color: PURPLE },
  'caching (imemorycache)': { icon: TbBolt, color: '#E5C07B' },
  'performance tuning & query optimization': { icon: TbGauge, color: '#98C379' },
  // DevOps
  tfs: { icon: TbVersions, color: '#3D8FD6' },
  git: { icon: TbBrandGit, color: '#F05032' },
  'azure devops ci/cd': { icon: TbBrandAzure, color: '#3D8FD6' },
  docker: { icon: TbBrandDocker, color: '#2496ED' },
  'azure container apps': { icon: TbCloudComputing, color: '#3D8FD6' },
  // Tools
  'visual studio .net': { icon: TbBrandVisualStudio, color: '#A77BF3' },
  'sql server management studio': { icon: TbDatabase, color: '#E0525A' },
  pgadmin: { icon: SiPostgresql, color: '#5B8DEF' },
  'visual studio code': { icon: TbBrandVscode, color: '#23A9F2' },
  postman: { icon: SiPostman, color: '#FF6C37' },
  'github copilot': { icon: TbBrandGithubCopilot, color: '#FFFFFF' },
  cursor: { icon: SiCursor, color: '#FFFFFF' },
  claude: { icon: SiClaude, color: '#D97757' },
  // Methodologies
  agile: { icon: TbRepeat, color: '#98C379' },
  scrum: { icon: TbUsersGroup, color: '#98C379' },
};

/** Keyword fallbacks so new skills still get a sensible icon without a code change. */
const byKeyword: [RegExp, SkillIcon][] = [
  [/sql|database|db\b/i, { icon: TbDatabase, color: PURPLE }],
  [/azure|cloud/i, { icon: TbCloudComputing, color: '#3D8FD6' }],
  [/api|rest|graphql/i, { icon: TbApi, color: PURPLE }],
  [/\.net|asp/i, { icon: SiDotnet, color: '#8C6CF2' }],
];

const fallback: SkillIcon = { icon: TbCode, color: PURPLE };

export function getSkillIcon(skill: string): SkillIcon {
  const key = skill.trim().toLowerCase();
  return byName[key] ?? byKeyword.find(([re]) => re.test(key))?.[1] ?? fallback;
}
