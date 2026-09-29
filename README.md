# Pavan Kalyan Kama — Portfolio

React 18 + Vite + TypeScript portfolio, live at <https://portfolio-of-pavan.vercel.app/>.

Content is managed from the separate **Portfolio Admin** app (`D:\Mine\Portfolio\portfolio-admin`, its own repository and Vercel project), which also manages Koti's portfolio. This repository has no admin code, no API and no secrets, and there is no database: all content lives in [`content/portfolio.json`](content/portfolio.json), and the admin edits it by committing to this repository, which redeploys the site. How to add, update and delete content: [CONTENT-GUIDE.md](CONTENT-GUIDE.md).

## What connects this site to the admin

| Path | What it is |
|---|---|
| `content/portfolio.json` | **The single source of truth** for all content. Written by the admin; don't hand-edit it. |
| `content/schema.json` | Describes that content for the admin: sections, fields, labels, hints, validation rules and the admin menu. The admin builds its forms from it. |
| `preview.html`, `src/preview.tsx` | Renders the site with unsaved content sent from the admin (its Preview button). Accepts messages only from `VITE_ADMIN_ORIGIN`. |
| `/version.json` | Emitted at build time (`vite.config.ts`): the content file's Git blob SHA, so the admin can show when a save is live. |
| `src/content/` | Types, normalization and `usePortfolio()`: the only place components get content from. |
| `content/profiles/<name>.json` | Portfolios other people created from their resumes in the admin (`<admin>/start`). Written by the admin, never by hand. `<name>.owner.json` next to each holds only the hash of its edit link and is never published. |
| `/profiles/<name>.json` | Emitted at build time (`vite.config.ts`) from each profile: its content and Git blob SHA, fetched by the site at `/p/<name>` and by the admin's "up to date" check. |

## Roles and profile URLs

`src/main.tsx` picks the content from the URL, then runs the normal app under that prefix (React Router `basename`), so `/works`, `/about-me` and `/contacts` work under every prefix:

| URL | Shows |
|---|---|
| `/` | This portfolio |
| `/r/<role>` | This portfolio as one role (Admin → **Roles**) |
| `/p/<name>` | A profile created from a resume |
| `/p/<name>/<role>` | That profile as one of its roles |

A role (`src/content/roles.ts`) replaces the job title, headline, short bio, About text, stack and CV when set, and shows only the skills, projects and experience it picks (nothing picked shows everything; its first three projects are featured on Home). Unknown roles redirect to the portfolio without a role. Role ids can't be `works`, `about-me` or `contacts`. Profiles are fetched at runtime, so they don't grow the bundle, and they carry this site's SEO title in the HTML until the page runs.

**Adding a new field:** add it to `content/schema.json` (so the admin shows and keeps it), to `src/content/types.ts` and `src/content/normalize.ts`, then use it in a component. Fields that aren't in the schema are dropped when the admin saves.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

To edit content locally, run the Portfolio Admin alongside it with `CONTENT_STORE=local` (see its README). Its saves write `content/portfolio.json` here and this dev server reloads.

## How a save reaches the site

1. The admin validates the content against `content/schema.json` and commits `content/portfolio.json` to `main` (e.g. `Update project: iPay-BillPay`).
2. Vercel's Git integration builds the site (30–90 s). Content is bundled at build time, so visitors never wait for an API. The SEO title and description are written into `index.html`.
3. The new `/version.json` matches what the admin saved, and the admin shows **Portfolio is up to date**.

Usually **1–2 minutes** end to end. HTML isn't cached long-term and assets have content-hashed names, so visitors get the new version on their next load. If a build fails, Vercel keeps serving the previous version.

## Vercel settings

- Framework **Vite** (from `vercel.json`: build `npm run build`, output `dist`). `vercel.json` also adds the SPA fallback, so deep links like `/works` load correctly (they returned 404 before), and sets CORS on `/version.json`.
- Environment variable **`VITE_ADMIN_ORIGIN`** = the Portfolio Admin URL, e.g. `https://portfolio-admin.vercel.app`. Not a secret; it only lets the admin's Preview talk to `preview.html`.

## SEO

A client-rendered Vite SPA: content is bundled (not fetched), the `<title>` and meta description are in the HTML, and Google renders the rest. If full-text indexing by non-JavaScript crawlers ever matters, add build-time prerendering of the four routes; every save already triggers a build.

## Design pieces that live in code

Menu labels, section headings, button labels, colours (`src/styles.css`), the tab icon (`public/favicon.svg`) and the skill icon set (`src/components/skillIcons.tsx`). When you add an icon there, add its key to the skills `icon` options in `content/schema.json` so the admin offers it.
