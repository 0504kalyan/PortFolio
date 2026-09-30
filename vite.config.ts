import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { renderJob, resumeJobs, type ResumeJob } from './resume/generate';

const root = __dirname;
const contentFile = path.join(root, 'content/portfolio.json');
const profilesDir = path.join(root, 'content/profiles');
/** Same algorithm as a Git blob SHA, so the admin can compare it with what it committed. */
const blobSha = (bytes: Buffer) => createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
const escapeHtml =(s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Writes the published SEO title and description into index.html, so crawlers see them without JS. */
function seoFromContent(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (!ctx.filename.endsWith('index.html')) return html;
        const { seo } = JSON.parse(readFileSync(contentFile, 'utf8'));
        if (!seo?.title) return html;
        return html
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(seo.description ?? '')}$2`);
      },
    },
  };
}

/**
 * /version.json: the Git blob SHA of the content this build contains. The admin portal compares it
 * with the SHA it just committed to show when a saved change is live.
 */
function contentVersion(): Plugin {
  const version = () => {
    const contentSha = blobSha(readFileSync(contentFile));
    return JSON.stringify({ contentSha, builtAt: new Date().toISOString() });
  };
  return {
    name: 'portfolio-content-version',
    configureServer(server) {
      server.middlewares.use('/version.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-store');
        res.end(version());
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'version.json', source: version() });
    },
  };
}

/**
 * /profiles/<name>.json: portfolios people created from their resumes in the admin portal, served at
 * /p/<name>. The source is content/profiles/<name>.json; <name>.owner.json (the edit-link hash) is
 * never published. Like /version.json, each file carries its source's Git blob SHA for the admin's
 * "up to date" check. Fetched at runtime, so profiles don't grow the main bundle.
 */
function profiles(): Plugin {
  const NAME = /^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$/;
  const read = (name: string) => {
    const file = path.join(profilesDir, `${name}.json`);
    if (!NAME.test(name) || !existsSync(file)) return null;
    const bytes = readFileSync(file);
    return JSON.stringify({ contentSha: blobSha(bytes), content: JSON.parse(bytes.toString('utf8')) });
  };
  const names = () =>
    existsSync(profilesDir)
      ? readdirSync(profilesDir)
          .filter((f) => f.endsWith('.json') && !f.endsWith('.owner.json'))
          .map((f) => f.slice(0, -5))
      : [];
  return {
    name: 'portfolio-profiles',
    configureServer(server) {
      server.middlewares.use('/profiles', (req, res, next) => {
        const name = (req.url ?? '').split('?')[0].replace(/^\//, '').replace(/\.json$/, '');
        const body = read(name);
        if (!body) return next();
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-store');
        res.end(body);
      });
    },
    generateBundle() {
      for (const name of names()) {
        const source = read(name);
        if (source) this.emitFile({ type: 'asset', fileName: `profiles/${name}.json`, source });
      }
    },
  };
}

/**
 * Automatic CVs (profile.resumeAuto): /Resume-<Name>.pdf and .docx built from the content, plus one
 * pair per role (/Resume-<Name>-<role>.*) and per profile (/profiles/<name>/Resume-*.*). Because they
 * are rebuilt on every deploy, a save in the admin updates the CV too. In dev they're generated on
 * request from the current files. SITE_URL (or Vercel's production URL) is the "Portfolio:" link.
 */
function resumes(): Plugin {
  const productionUrl = () =>
    (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') || 'https://portfolio-of-pavan.vercel.app').replace(/\/+$/, '');
  const profileNames = () =>
    existsSync(profilesDir) ? readdirSync(profilesDir).filter((f) => f.endsWith('.json') && !f.endsWith('.owner.json')).map((f) => f.slice(0, -5)) : [];
  const jobs = (siteUrl: string): ResumeJob[] => [
    ...resumeJobs(JSON.parse(readFileSync(contentFile, 'utf8')), { siteUrl }),
    ...profileNames().flatMap((profile) => resumeJobs(JSON.parse(readFileSync(path.join(profilesDir, `${profile}.json`), 'utf8')), { siteUrl, profile })),
  ];
  const TYPES = { pdf: 'application/pdf', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' } as const;
  return {
    name: 'portfolio-resumes',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const m = decodeURIComponent((req.url ?? '').split('?')[0]).match(/^(\/.*Resume-[^/]+)\.(pdf|docx)$/);
        if (!m) return next();
        try {
          const job = jobs(`http://${req.headers.host}`).find((j) => j.path === m[1]);
          if (!job) return next();
          const ext = m[2] as 'pdf' | 'docx';
          const body = await renderJob(job, ext);
          res.setHeader('Content-Type', TYPES[ext]);
          res.setHeader('Cache-Control', 'no-store');
          res.end(body);
        } catch (err) {
          next(err);
        }
      });
    },
    async generateBundle() {
      for (const job of jobs(productionUrl())) {
        for (const ext of ['pdf', 'docx'] as const) {
          this.emitFile({ type: 'asset', fileName: `${job.path.slice(1)}.${ext}`, source: await renderJob(job, ext) });
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), seoFromContent(), contentVersion(), profiles(), resumes()],
  build: {
    rollupOptions: {
      input: {
        main: path.join(root, 'index.html'),
        preview: path.join(root, 'preview.html'),
      },
    },
  },
});
