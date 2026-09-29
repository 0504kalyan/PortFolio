import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const root = __dirname;
const contentFile = path.join(root, 'content/portfolio.json');
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

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
    const bytes = readFileSync(contentFile);
    const contentSha = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
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

export default defineConfig({
  plugins: [react(), seoFromContent(), contentVersion()],
  build: {
    rollupOptions: {
      input: {
        main: path.join(root, 'index.html'),
        preview: path.join(root, 'preview.html'),
      },
    },
  },
});
