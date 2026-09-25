# Pavan Kalyan Kama — Portfolio

React + Vite + TypeScript portfolio built from the designs in this folder (`Home.png`, `Projects.png`, `About.png`, `Contacts.png`, `Burger*.png`) with content from `Resume-Pavan-Updated-v2.docx`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Edit content

See **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)** for how to update every section: Home, skills, works, about me, contacts, the CV and the profile photo.

All text lives in `src/data/resume.ts`. To add a profile photo, put it in `public/` and set `profile.photo` (for example `'/profile.png'`).

## Pages

| Route       | Design         |
|-------------|----------------|
| `/`         | Home.png       |
| `/works`    | Projects.png   |
| `/about-me` | About.png      |
| `/contacts` | Contacts.png   |

Below 768px the nav collapses into the burger menu (Burger.png / Burger open.png).

When deploying to a static host, configure an SPA fallback so every route serves `index.html`.
