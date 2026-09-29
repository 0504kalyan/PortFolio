# Portfolio Content Guide

How to change what your portfolio says: Home, Skills, Works, About me, Contacts, the CV download and the profile photos.

**Short version:** almost everything lives in one file, `src/data/resume.ts`. Change a value there, save, and the site updates. You don't need to touch any other code for normal content changes.

---

## 1. Before you start

Open a terminal **in the project folder** (the folder name has a space, so keep the quotes):

```powershell
cd "D:\Mine\Portfolio\New folder"
npm run dev
```

Open http://localhost:5173. Leave it running. Every time you save a file, the page refreshes by itself.

> If you see `Could not read package.json`, you're in the wrong folder. Run the `cd` line above first.

---

## 2. Where everything lives

| What you want to change | File |
|---|---|
| All text: name, contacts, hero, skills, projects, jobs, education, facts | `src/data/resume.ts` |
| Profile photos (Home and About) | images in `public/` + `photo` / `aboutPhoto` in `src/data/resume.ts` |
| CV / resume download | `public/Resume-Pavan-Kalyan-Kama.docx` |
| Browser tab title and search description | `index.html` |
| Colours | `src/styles.css` (top of file) |
| Tab icon | `public/favicon.svg` |
| Menu labels, section headings, button labels | the page files (see [section 12](#12-less-common-changes-other-files)) |

---

## 3. Editing rules for `resume.ts` (read once)

The file is plain lists of text. Keep the punctuation around what you change and it will work.

- **Text goes inside quotes:** `'like this'`.
- **Apostrophes:** if the text contains `'` (for example `I'm`), wrap it in double quotes: `"I'm open to..."`.
- **Commas:** every item in a list ends with a comma. A missing comma is the most common mistake.
- **Lists use square brackets:** `['C#', 'T-SQL', 'SQL Server']`.
- **Order matters:** things show on the site in the same order they appear in the file.

If the page goes blank or shows an error after saving, look at the terminal. It names the line with the problem, which is usually a missing comma or quote. Undo your last change (`Ctrl+Z`) and try again.

To check everything is valid before publishing:

```powershell
npm run build
```

`✓ built` means you're good.

---

## 4. Profile (name, contacts, CV link, photos)

In `src/data/resume.ts`, the `profile` block at the top:

```ts
export const profile = {
  name: 'Pavan Kalyan Kama',
  shortName: 'Pavan',
  role: 'Dot Net Developer',
  email: 'pavankalyankama99@gmail.com',
  phone: '+91 8885394611',
  linkedin: 'https://www.linkedin.com/in/pavan-kalyan-743994280/',
  address: 'D.no:2-46, Pedanandipadu, Pedanandipadu, Guntur - 522235.',
  experience: '5.10',
  resumeFile: '/Resume-Pavan-Kalyan-Kama.docx',
  currentProject: 'CM-Core',
  photo: '/profile-home.jpg',
  aboutPhoto: '/profile.jpg',
};
```

| Setting | Where it shows on the site |
|---|---|
| `name` | "Hello, i'm …" (Home and About), code window in the Home hero, footer copyright line |
| `shortName` | Logo text (header and footer), first word of the Home headline ("**Pavan** is a …") |
| `role` | Footer line under the logo |
| `email` | Side icon rail, footer icons, mobile menu icons, Home contact box, Contacts page ("Message me here" and #all-media) |
| `linkedin` | Same places as `email`. Opens your LinkedIn profile in a new tab. The text shown is the address without `https://www.`. |
| `phone` | Same places as `email`. Clicking it starts a call on phones. |
| `address` | Contacts page, "Find me here" box. Shorten it here if you don't want the full address public. |
| `experience` | Code window in the hero ("Years => 5.10") and the big number on the Home #about-me section |
| `resumeFile` | The "CV" download link in the header and mobile menu |
| `currentProject` | "Currently working on **CM-Core**" bar under the hero |
| `photo` | Home hero photo. See [section 5](#5-profile-photos). |
| `aboutPhoto` | About me page photo. See [section 5](#5-profile-photos). |

> **Contacts are always shown as Email → LinkedIn → Phone**: in the side icon rail (which stays pinned to the left edge as you scroll, on wide screens), the footer, the mobile menu, the Home contact box and the Contacts page. They all read from the same three settings above, so a change there updates every place.

> **Note:** `experience` doesn't change your summary paragraphs, which also say "5.10 years". When you update your years, change both `experience` and the first `summary` paragraph.

---

## 5. Profile photos

There are two photo slots. Each is **one line** in `src/data/resume.ts`; you never need to touch code to change them.

| Setting | Where it shows | Current file |
|---|---|---|
| `photo` | **Home**, in the hero on the right: a framed print with a purple offset border, with the code window overlapping its lower-left corner | `public/profile-home.jpg` (you on the bike at night) |
| `aboutPhoto` | **About me**, at the top of the right column, above your work timeline | `public/profile.jpg` (portrait) |

```ts
photo: '/profile-home.jpg',
aboutPhoto: '/profile.jpg',
```

### Replace a photo

**Easiest:** save your new picture over the old file in `public/` with **exactly the same name** (`profile-home.jpg` or `profile.jpg`). Nothing else to change.

**With a new file name:**
1. Copy the image into the `public` folder, for example `D:\Mine\Portfolio\New folder\public\new-photo.jpg`.
2. Set the matching line to that name, with a `/` in front: `photo: '/new-photo.jpg',`
3. Save.

### Turn a photo off

- `photo: '',` → Home shows only the code window, with no photo behind it.
- `aboutPhoto: '',` → About me reuses the Home `photo`. If both are empty, About me shows no photo, just the timeline.

### Photo tips

- Square or portrait photos work best, ideally at least 700 px wide so they stay sharp on high-resolution screens. Your Home photo is 472 × 534, which is fine but a little soft on retina screens; the About photo is 1008 × 1046.
- JPG, PNG and WebP all work. Keep each file under about 500 KB so the page loads fast. (Your originals were about 1.4 MB, so the copies in `public/` were saved as JPEGs at about 140 KB.)
- Use a simple file name with no spaces, like `profile.jpg`. On most web hosts the name is case-sensitive, so `Profile.JPG` and `profile.jpg` are different files.
- Keep faces in the upper half. On Home, the code window covers roughly the bottom fifth of the photo, and very tall photos are trimmed from the bottom.
- On Home the photo is shown slightly desaturated so it sits with the dark theme, and it turns full colour on hover.
- On Home the photo and the code window work like a stack of cards: clicking the photo brings it to the front, and clicking the Developer.cs card brings the card back. This works with the keyboard too (Tab, then Enter). It only applies when `photo` is set; nothing needs configuring.

**If a photo doesn't show:** check the file is really in `public/` and the name matches exactly. A wrong name doesn't break the site: Home shows just the code window, and About me just shows the timeline.

---

## 6. Home page

In `src/data/resume.ts`, the `home` block:

```ts
export const home = {
  headline: 'is a [Dot Net developer] building [enterprise web applications]',
  lead: 'He crafts scalable solutions with ASP.NET Core, Web API, Angular, React and microservices',
  quote: { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  contactIntro: "I'm open to new opportunities. However, ...",
};
```

| Setting | What it controls |
|---|---|
| `headline` | Big title. It starts with `shortName` automatically. **Words in `[square brackets]` turn purple.** |
| `lead` | Smaller grey line under the title |
| `quote.text`, `quote.author` | Quote box under the hero |
| `contactIntro` | Text next to the contact box on Home, and on the Contacts page |

The rest of the Home page fills itself in from other sections:

| Home section | Comes from |
|---|---|
| #projects | The **first 3** entries in `projects` ([section 8](#8-works-page-projects)) |
| #skills | All of `skills` ([section 7](#7-skills-home-and-about)) |
| #about-me text | The first **2** paragraphs of `summary` |
| #about-me numbers | `experience`, the number of `projects`, the number of `experience` jobs (all counted automatically) |
| #contacts | `email`, `linkedin`, `phone`, `contactIntro` |

---

## 7. Skills (Home and About)

In `src/data/resume.ts`, the `skills` list. Each group becomes one box:

```ts
{ title: 'Databases', items: ['MS SQL', 'PostgreSQL', 'MongoDB'] },
```

- **Add a skill:** add it to `items`, for example `['MS SQL', 'PostgreSQL', 'MongoDB', 'Redis']`.
- **Add a new box:** copy a whole line, paste it below, and change `title` and `items`.
- **Remove a box:** delete its whole line.
- **Reorder boxes:** move the lines. Boxes follow the file order.

The same list is used on both the Home page and the About page.

### Skill icons

Every skill shows a small icon in front of its name. Icons are grey and switch to the brand's colour (for example red for Angular, blue for Docker) when a visitor hovers over the box.

- **Icons are matched by the skill's name**, so you don't set them in `resume.ts`.
- **Adding a new skill:** it gets an icon automatically. Names containing "SQL" or "database" get a database icon, "Azure" or "cloud" a cloud icon, "API" an API icon, ".NET" or "ASP" the .NET logo. Anything else gets a generic `</>` code icon.
- **Renaming a skill:** keep the same spelling to keep its icon. For example, changing `Docker` to `Docker Compose` drops back to the generic icon.
- **Giving a skill its own icon:** open `src/components/skillIcons.tsx` and add a line to the `byName` list, using the skill name in lowercase:

  ```ts
  'docker compose': { icon: TbBrandDocker, color: '#2496ED' },
  ```

  `icon` is any icon from [react-icons](https://react-icons.github.io/react-icons/) (the site mostly uses the outline `Tb…` set; add it to the `import` list at the top), and `color` is the hover colour.

---

## 8. Works page (projects)

In `src/data/resume.ts`, the `projects` list. Each project looks like this:

```ts
{
  slug: 'cm-core',
  name: 'CM-Core',
  tagline: 'Campaign Management Platform',
  duration: 'Jan 2025 - Present',
  tech: ['C#', 'ASP.NET Core 9', 'Web API', 'SQL Server', 'Angular 20'],
  description: 'CM-Core (CM 2.0) is an enterprise campaign management platform ...',
  responsibilities: [
    'Responsible for implementing publish configuration ...',
    'Responsible for multi-level approval policy integration ...',
  ],
  accent: '#C778DD',
},
```

| Setting | What it controls |
|---|---|
| `slug` | Short unique ID used in links (`/works#cm-core`). Lowercase, hyphens, no spaces. Every project needs a different one. |
| `name` | Title on the card and on the card's cover |
| `tagline` | One-line summary under the title |
| `duration` | Dates shown on the cover |
| `tech` | Technology strip on the card |
| `description` | Paragraph shown when "Details" is clicked |
| `responsibilities` | Bullet list shown when "Details" is clicked |
| `accent` | Cover colour. Any hex colour; the current ones are purple `#C778DD`, blue `#61AFEF`, green `#98C379`, yellow `#E5C07B`, red `#E06C75`. |

- **Add a project:** copy a whole `{ ... },` block, paste it where you want it, and change the values.
- **Choose what Home shows:** Home shows the first 3 projects, so move your best ones to the top.
- **Remove a project:** delete its whole `{ ... },` block.

**Work experience** (the "#work-experience" cards on Works and the timeline on About) comes from the `experience` list:

```ts
{ company: 'IBridge Techsoft', client: 'Warrous', period: 'November 2025 - Present', current: true },
{ company: 'Aspire Systems Private Limited', period: 'September 2023 - July 2025' },
```

- `client` is optional. Leave it out if there isn't one.
- `current: true` marks your present job: it gets the "Current" label and a filled purple marker on the timeline. Only put it on one job.
- **Newest job first.** When you change jobs, add the new one at the top, move `current: true` to it, and set an end date on the old one.

---

## 9. About me page

| Part of the page | Setting in `resume.ts` |
|---|---|
| "Who am i?" subtitle | `pageSubtitles.about` |
| Intro paragraphs | `summary`: one quoted item per paragraph. **All** are shown here; Home shows the first 2. |
| Photo (right column) | `profile.aboutPhoto` ([section 5](#5-profile-photos)) |
| Timeline (right column) | `experience` ([section 8](#8-works-page-projects)) |
| #skills | `skills` ([section 7](#7-skills-home-and-about)) |
| #education | `education` (`degree`, `university`, `year`, `score`) |
| #quick-facts | `quickFacts` (see below) |

**Quick facts** are the little boxes at the bottom:

```ts
{ text: 'Around 5.10 years of IT experience', highlights: ['5.10 years'] },
```

- `text` is the sentence.
- `highlights` lists words in that sentence to show in bright white. They must be copied **exactly** from `text`, including capital letters. `highlights` is optional.

---

## 10. Contacts page

| Part of the page | Setting in `resume.ts` |
|---|---|
| Subtitle | `pageSubtitles.contacts` |
| Intro text | `home.contactIntro` (shared with Home) |
| "Find me here" box | `profile.address` |
| "Message me here" box | `profile.email`, `profile.linkedin`, `profile.phone` |
| #all-media | `profile.email`, `profile.linkedin`, `profile.phone` |

The Works page subtitle ("List of my projects") is `pageSubtitles.works`.

---

## 11. CV / resume download

The downloadable file is:

```
public\Resume-Pavan-Kalyan-Kama.docx
```

- **Updating your CV (simplest):** replace that file with your new one and **keep exactly the same name**. Nothing else to change.
- **Using a different name or a PDF:** put the new file in `public/`, then update `resumeFile` in `src/data/resume.ts`, for example:

  ```ts
  resumeFile: '/Pavan-Kalyan-Kama-CV.pdf',
  ```

  A PDF is a good choice: anyone can open it in a browser, while a .docx needs Word.

- **Delete the old file** from `public/` if you're no longer linking to it. Anything in `public/` can be downloaded by visitors.

**Privacy reminder:** your CV includes your phone number and home address. Anyone who visits the site can download it.

**Links inside the CV:** the resume header lists your Portfolio (`https://portfolio-six-lyart-26.vercel.app/`) and LinkedIn as clickable links under E-mail and Mobile. When you make a new version of your CV in Word, keep those two lines, then replace the file in `public/` as above.

---

## 12. Less common changes (other files)

These are fixed labels rather than resume content, so they live in the page files. Change only the text between the quotes or tags.

| What | File | Look for |
|---|---|---|
| Menu labels (`#home`, `#works`, …) | `src/components/Header.tsx` | `const links = [` |
| Section headings (`#projects`, `#skills`, …) | `src/pages/Home.tsx`, `Works.tsx`, `About.tsx`, `Contacts.tsx` | `title="..."` |
| "Contact me!!" button | `src/pages/Home.tsx` | `Contact me!!` |
| "Message me here" / "Find me here" headings | `src/pages/Contacts.tsx` and `src/pages/Home.tsx` | `<h3>` |
| Code-window text in the Home hero | `src/components/HeroArt.tsx` | `public class Developer` |
| Browser tab title | `index.html` | `<title>` |
| Search-engine description | `index.html` | `name="description"` |
| Colours | `src/styles.css` | `:root {` at the top: `--bg` background, `--gray` text, `--primary` purple accent, `--white` headings |
| Tab icon | `public/favicon.svg` | replace the file |
| Skill icons and their hover colours | `src/components/skillIcons.tsx` | the `byName` list |

The footer's copyright year updates by itself.

---

## 13. Quick checklist: common updates

| I want to… | Do this |
|---|---|
| Update my years of experience | `profile.experience` **and** the first `summary` paragraph |
| Add a new job | Add it to the top of `experience`, move `current: true` to it, give the old job an end date |
| Add a new project | Copy a block in `projects`; give it a unique `slug` |
| Change which projects show on Home | Reorder `projects`: the first 3 show |
| Add a skill | Add it to the right group's `items` in `skills` |
| Replace my CV | Overwrite `public/Resume-Pavan-Kalyan-Kama.docx` with the same name |
| Change my photos | Overwrite `public/profile-home.jpg` (Home) or `public/profile.jpg` (About) with the same name |
| Change phone, email or LinkedIn | `profile.phone` / `profile.email` / `profile.linkedin` (updates everywhere) |
| Hide my full address | Shorten `profile.address` |
| Change the headline | `home.headline`: use `[brackets]` for purple words |

---

## 14. Publishing your changes

```powershell
cd "D:\Mine\Portfolio\New folder"
npm run build
```

This creates the finished site in the `dist` folder. Upload the **contents** of `dist` to your host (Netlify, Vercel, GitHub Pages, Azure Static Web Apps, etc.).

One host setting matters: turn on the "single-page app" / "rewrite all routes to `index.html`" option. Without it, opening a link like `/works` directly gives a 404.

After each content change, run `npm run build` again and upload the new `dist`.
