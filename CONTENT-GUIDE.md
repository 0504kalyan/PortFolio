# Portfolio Content Guide

How to change what your portfolio says: Home, Skills, Works, About me, Contacts, the CV download and the profile photo.

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
| Profile photo | image in `public/` + one line in `src/data/resume.ts` |
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

## 4. Profile (name, contacts, CV link, photo)

In `src/data/resume.ts`, the `profile` block at the top:

```ts
export const profile = {
  name: 'Pavan Kalyan Kama',
  shortName: 'Pavan',
  role: 'Dot Net Developer',
  email: 'pavankalyankama99@gmail.com',
  phone: '+91 8885394611',
  address: 'D.no:2-46, Pedanandipadu, Pedanandipadu, Guntur - 522235.',
  experience: '5.10',
  resumeFile: '/Resume-Pavan-Kalyan-Kama.docx',
  currentProject: 'CM-Core',
  photo: '',
};
```

| Setting | Where it shows on the site |
|---|---|
| `name` | "Hello, i'm …" (Home and About), code window in the Home hero, footer copyright line |
| `shortName` | Logo text (header and footer), first word of the Home headline ("**Pavan** is a …") |
| `role` | Footer line under the logo |
| `email` | Side icon rail, footer icons, mobile menu icons, Home contact box, Contacts page (both boxes and #all-media) |
| `phone` | Same places as `email`. Clicking it starts a call on phones. |
| `address` | Contacts page, "Find me here" box. Shorten it here if you don't want the full address public. |
| `experience` | Code window in the hero ("Years => 5.10") and the big number on the Home #about-me section |
| `resumeFile` | Every CV download: header "CV" link, mobile menu, side and footer icons, Contacts #all-media |
| `currentProject` | "Currently working on **CM-Core**" bar under the hero |
| `photo` | Profile photo. See [section 5](#5-profile-photo-add-it-later-no-code-changes). |

> **Note:** `experience` doesn't change your summary paragraphs, which also say "5.10 years". When you update your years, change both `experience` and the first `summary` paragraph.

---

## 5. Profile photo (add it later, no code changes)

The photo is **already built in and switched off**. Until you add one, the Home hero shows a C# code window instead. When you're ready, you only do two things:

**Step 1.** Copy your photo into the `public` folder, for example:

```
D:\Mine\Portfolio\New folder\public\profile.png
```

**Step 2.** In `src/data/resume.ts`, set the one `photo` line to that file name, with a `/` in front:

```ts
photo: '/profile.png',
```

Save. That's all: no other files, no code.

**Where the photo appears:**
- **Home:** in the hero on the right, in place of the code window, with the purple squares, dots and the "Currently working on" bar.
- **About me:** at the top of the right column, above your work timeline.

**Photo tips:**
- A portrait (taller than wide) works best, around 800 × 1000 px.
- A PNG with a transparent background looks closest to the original design. JPG and WebP also work.
- Keep it under about 500 KB so the page loads fast.
- Use a simple file name with no spaces, like `profile.png`. On most web hosts the name is case-sensitive, so `Profile.PNG` and `profile.png` are different files.
- Faces near the top are safest: very tall photos are cropped from the bottom.

**If it doesn't show:** check the file is really in `public/` and the name in `photo` matches exactly. A wrong name doesn't break the site; it just keeps showing the code window.

**To remove the photo again:** set it back to empty: `photo: '',`

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
| #contacts | `phone`, `email`, `contactIntro` |

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
| Photo (right column) | `profile.photo` ([section 5](#5-profile-photo-add-it-later-no-code-changes)) |
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
| "Message me here" box | `profile.phone`, `profile.email` |
| #all-media | `profile.email`, `profile.phone`, `profile.resumeFile` |

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

---

## 12. Less common changes (other files)

These are fixed labels rather than resume content, so they live in the page files. Change only the text between the quotes or tags.

| What | File | Look for |
|---|---|---|
| Menu labels (`#home`, `#works`, …) | `src/components/Header.tsx` | `const links = [` |
| Section headings (`#projects`, `#skills`, …) | `src/pages/Home.tsx`, `Works.tsx`, `About.tsx`, `Contacts.tsx` | `title="..."` |
| "Contact me!!" button | `src/pages/Home.tsx` | `Contact me!!` |
| "Message me here" / "Find me here" headings | `src/pages/Contacts.tsx` and `src/pages/Home.tsx` | `<h3>` |
| Code-window text (shown when there's no photo) | `src/components/HeroArt.tsx` | `public class Developer` |
| Browser tab title | `index.html` | `<title>` |
| Search-engine description | `index.html` | `name="description"` |
| Colours | `src/styles.css` | `:root {` at the top: `--bg` background, `--gray` text, `--primary` purple accent, `--white` headings |
| Tab icon | `public/favicon.svg` | replace the file |

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
| Add my photo | Put it in `public/`, set `profile.photo: '/profile.png'` |
| Change phone or email | `profile.phone` / `profile.email` (updates everywhere) |
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
