# Portfolio Content Guide

How to add, update and delete anything on <https://portfolio-of-pavan.vercel.app/>, entirely from the **Portfolio Admin** app: no code, JSON, Git commands or manual deploys.

**Short version:** open the Portfolio Admin, sign in, choose **Pavan Kalyan Kama**, open a section, make your change, press **Save**. Your portfolio updates within about 1–2 minutes. The status at the top of the admin shows **Updating portfolio…** and then **Portfolio is up to date**.

> Every action that changes content (Save, Delete, Restore, the Visible switch, ↑/↓) saves straight to the portfolio. Use **Preview** in any form to check a change before saving it. **Version History** can undo any save.

---

## 0. Getting in

1. Open the Portfolio Admin URL and sign in.
2. If your account manages more than one portfolio, choose **Pavan Kalyan Kama** (or switch with the **Portfolio** menu at the top of the sidebar).
3. The menu on the left lists this portfolio's sections; **Dashboard** shows what's on the site and whether it's up to date.

## 1. Add something

Example: a new project.

1. Admin → **Projects** → **+ Add project**.
2. Fill in the form. Required fields are marked `*` (for a project, only the title).
3. Optional: press **Preview** to see the portfolio with the new project, then **Close preview**.
4. Press **Add project**. You'll see *"Project added successfully."*
5. Wait for **Portfolio is up to date** (1–2 minutes). The project is live.

The same steps work for every list: **Skills** (pick the category), **Experience**, **Education**, **Certifications**, **Achievements**, and **About → Quick facts**. To show a project on the Home page too, turn on **Feature on Home**; Home shows the first three featured projects.

## 2. Update something

Example: change a project's technologies.

1. Admin → **Projects** → **Edit** on the project.
2. Change the fields. For **Technologies**, put one per line.
3. Optional: **Preview**.
4. Press **Save changes**. You'll see *"Project updated successfully."* The portfolio updates in 1–2 minutes.

For single sections (**Profile**, **About**, **Home & SEO**, **Social Links**), edit the fields and press that form's **Save**. **Undo changes** puts the form back as it was.

## 3. Delete something

1. Admin → the section → **Delete** on the entry.
2. Confirm: *"Are you sure you want to delete this …?"* → **Delete**.
3. It disappears from the portfolio after the next update (1–2 minutes) and moves to the section's **Deleted** tab.

**Undo a delete:** open the **Deleted** tab → **Restore**. It returns to the portfolio.

**Delete for good:** in the **Deleted** tab → **Delete permanently** → confirm. It can then only be recovered from Version History.

## 4. Hide, archive, reorder

| Action | How | Effect on the portfolio |
|---|---|---|
| Hide / show | The **Visible** switch on the row | Hidden entries stay in the admin but aren't shown |
| Archive | **Archive** on the row (undo: **Archived** tab → **Restore**) | Removed from the portfolio, kept for later |
| Reorder | **↑ / ↓** on the row | The portfolio shows entries in this order. Skills are ordered within their category. |

## 5. Roles: one link per kind of job

Admin → **Roles** → **+ Add role**, e.g. *Frontend Developer*. Each role is the same portfolio aimed at one job:

- **Job title, Home headline, Short bio, About paragraphs, Hero stack, CV file** replace the profile's when filled in.
- **Skills / Projects / Experience to show**: tick what matters for this job. Nothing ticked shows everything. The first three projects ticked are featured on Home.

Save, and the role is live at `https://portfolio-of-pavan.vercel.app/r/<role id>` (the ID is set when you add it, e.g. `frontend-developer`). Send that link with applications for that kind of job. Hide or archive a role to take its link down.

## 6. Portfolios for other people

Anyone can create their own portfolio from their resume at the Portfolio Admin's **/start** page, with no account. It's published on this site at `/p/<their name>`, with a link per role. They get a private edit link to change or delete it later. You can see and delete them from the admin **Dashboard → Portfolios created from resumes**.

## 7. Undo a change (Version History)

1. Admin → **Version History**. Every save is listed, newest first, with a description such as *"Update project: iPay-BillPay"*.
2. **View** shows that version in a preview and lists what restoring it would change.
3. **Restore** → confirm. The portfolio goes back to that version (saved as a new version, so nothing is lost and you can go forward again).

---

## Where each admin section shows on the portfolio

| Admin section | Portfolio |
|---|---|
| **Profile** | Name, short name (logo and first word of the headline), job title and footer tagline, email/phone (side rail, footer, menu, contact boxes), location ("Find me here" on Contacts), years of experience and "Currently working on" (Home), short bio, the code-window stack, both photos, the CV download. |
| **About** | The About page paragraphs (Home shows the first two) and the quick facts boxes. |
| **Home & SEO** | Headline (words in `[square brackets]` turn purple), quote (one of the Home "quote of the day" rotation, which changes daily from `src/content/quotes.ts`), contact intro, page subtitles, the browser-tab title and the search-engine description. |
| **Skills** | Categories are the boxes; skills are the entries inside them (Home and About). |
| **Experience** | #work-experience on Works and the timeline on About. |
| **Education** | The #education line on About. |
| **Projects** | Works shows all visible projects; Home shows the featured ones. |
| **Certifications** / **Achievements** | Sections on About, shown once you add an entry. |
| **Social Links** | LinkedIn, plus GitHub, X/Twitter and Website when filled in. Empty links are hidden. |
| **Roles** | Nothing on `/`; each role is its own version of the site at `/r/<role id>`. |

Fields marked *"not displayed by the current site design"* are saved but don't appear on the portfolio yet.

## Tips

- **Dates:** `YYYY-MM` (e.g. `2025-01`) or a year (`2020`). Tick **current job** / **ongoing** instead of an end date.
- **Photos and CV:** use the **Upload** button next to the field, then **Save**. JPG, PNG, WebP, GIF, PDF, DOC or DOCX, up to 3 MB. Uploaded files, including your CV with your phone and address, are public.
- **Skill icons** are matched from the name; choose one in the skill's **Icon** field to override.
- **Quick-fact highlights:** one per line, copied exactly from the fact text.
- **"The portfolio changed elsewhere":** another tab or device saved first. Press **Reload Latest** and make your change again; nothing was overwritten.
- **Status stays "Updating portfolio…" for more than 5 minutes:** check the portfolio project's latest deployment in Vercel.
