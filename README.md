# Ibrahim Salihu — Developer Portfolio

A modern, dark-themed, fully responsive personal portfolio built with **HTML5, CSS3, and Vanilla JavaScript**. No frameworks, no build step — deploy it anywhere as a static site.

---

## 📁 Project Structure

```
portfolio/
│
├── index.html        # All page content & structure
├── style.css         # All styling (CSS variables at the top)
├── script.js         # Navigation, animations, modal, contact form
│
├── assets/
│   ├── images/       # Profile photo, general images
│   ├── icons/        # Favicons / custom icons
│   └── projects/     # Project screenshots
│
└── README.md
```

---

## 🚀 Run Locally

No build tools needed. Either:

1. Double-click `index.html`, **or**
2. Use a local server (recommended):
   ```bash
   # Python
   python -m http.server 8000
   # then open http://localhost:8000
   ```
   Or use the "Live Server" extension in VS Code.

---

## 🌍 Deployment

### GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under *Source*, select the `main` branch and `/ (root)` folder.
4. Your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/`.

### Netlify
1. Go to [netlify.com](https://netlify.com) → **Add new site → Deploy manually**.
2. Drag and drop the entire project folder.
3. Done. (Or connect your GitHub repo for automatic deploys.)

### Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**.
2. Import your GitHub repository.
3. Framework preset: **Other** (static). Deploy.

---

## ✏️ Placeholders You MUST Replace

Search each of these strings across `index.html` and `script.js` and replace them with your real information:

| Placeholder | Where | Replace with |
|---|---|---|
| `YOUR_GITHUB_URL` | index.html (hero, contact, footer) | Your GitHub profile URL |
| `YOUR_LINKEDIN_URL` | index.html (hero, contact, footer) | Your LinkedIn profile URL |
| `YOUR_X_URL` | index.html (hero, contact, footer) | Your X/Twitter profile URL |
| `YOUR_EMAIL` | index.html (mailto links, contact list) **and** script.js (mailto handler ×2) | Your email address |
| `YOUR_PROFILE_IMAGE` | index.html (hero) | Path to your photo, e.g. `assets/images/profile.jpg` |
| `YOUR_WEBSITE_URL` | index.html (`og:url` meta tag and `<link rel="canonical">`) | Your deployed site URL |
| `YOUR_OG_IMAGE` | index.html (`og:image` meta tag) | A social preview image URL |
| `assets/icons/favicon.png` | index.html (`<link rel="icon">`) | Your own favicon file (any size works, but 32×32 or 48×48 PNG is typical) |
| `PROJECT_IMAGE_1` | index.html (project 1 card) | e.g. `assets/projects/hostel-system.png` |
| `PROJECT_IMAGE_2` | index.html (project 2 card) | e.g. `assets/projects/cgpa-calculator.png` |
| `PROJECT_1_LIVE_URL` | index.html (project 1 card + modal) | Live URL of the hostel system |
| `PROJECT_1_GITHUB_URL` | index.html (project 1 card + modal) | GitHub repo of the hostel system |
| `PROJECT_2_LIVE_URL` | index.html (project 2 card) | Live URL of the CGPA calculator |
| `PROJECT_2_GITHUB_URL` | index.html (project 2 card) | GitHub repo of the CGPA calculator |

> 💡 Tip: use your editor's "Find in Files" (Ctrl+Shift+F in VS Code) to find every occurrence quickly.

**Note:** If an image placeholder is left unset, the site automatically shows a styled fallback (initials in the hero, an icon placeholder on project cards) — nothing breaks.

---

## ➕ Adding a New Project Later

1. Add your screenshot to `assets/projects/`.
2. In `index.html`, find the `<!-- PROJECT 3: Placeholder -->` card (or duplicate any existing `<article class="project-card">` block inside `.projects-grid`).
3. Update:
   - the `<img src="...">` and `alt` text (keep `loading="lazy"`),
   - the `<h3 class="project-title">`,
   - the `<p class="project-desc">`,
   - the `<ul class="project-tech">` tags,
   - the button `href` values.
4. **Optional — add a details modal:**
   - Copy the `<div class="modal" id="modal-hostel">…</div>` block at the bottom of `index.html`, give it a new unique `id` (e.g. `modal-myapp`), and edit its content.
   - On your new project card, set `data-modal="modal-myapp"`, plus `tabindex="0" role="button" aria-haspopup="dialog"`.
   - The JavaScript picks it up automatically — no JS changes needed.

---

## 📬 Connecting the Contact Form to a Real Service

The form currently opens the visitor's email app (mailto). To upgrade:

**Formspree** (easiest):
1. Create a free form at [formspree.io](https://formspree.io) and copy your endpoint.
2. In `index.html`, change the form tag to:
   `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form" id="contactForm">`
3. In `script.js`, delete the entire "CONTACT FORM (mailto)" section.

**Netlify Forms** (if hosted on Netlify):
1. Add `data-netlify="true" name="contact"` to the `<form>` tag.
2. Remove the mailto handler from `script.js` as above.

---

## 🎨 Customizing the Design

All colors, fonts, and spacing tokens live at the top of `style.css` in the `:root` block. Change `--accent` to instantly re-theme the entire site.

---

© 2026 Ibrahim Salihu. Designed & Built by Ibrahim.
