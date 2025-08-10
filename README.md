# Afrofuturist Portfolio — GitHub Pages template

This repository is a minimal Afrofuturist-themed static website template ready for GitHub Pages.

Structure:
- `index.html` — Homepage
- `music.html` — Music page (SoundCloud embeds)
- `drawings.html` — Image gallery (replace /assets/images/*)
- `blog.html` — Blog index (loads `posts/index.json`)
- `posts/` — HTML posts and `index.json` used by blog.html
- `assets/css/style.css` — Styles and theme variables
- `assets/js/main.js` — Starfield animation, lightbox, blog loader
- `generator.py` — Optional script to auto-generate `posts/index.json` from HTML files in /posts/

How to use:
1. Replace "Your Name" in files with your artist name.
2. Replace the SoundCloud `YOUR_TRACK_ID` placeholders with your track IDs in `index.html` and `music.html`.
   - To grab a track ID: open the track on SoundCloud and use the API URL or embed code.
3. Add your drawings to `assets/images/` (keep filenames the same or update `drawings.html`).
4. For blog posts:
   - Add a new HTML file to `/posts/` named like `2025-08-11-your-title.html`.
   - Edit `/posts/index.json` to add an entry for the post. Or run `generator.py` (requires Python) to auto-build the index.
5. Push the repo to GitHub and enable GitHub Pages from the repository settings (branch: main or gh-pages).

Notes:
- Purely static folder-based auto-detection of posts requires a build step (the included `generator.py`) or a small CI action. The site ships with `generator.py` to help you update `posts/index.json` locally before pushing.
- Colors are set with CSS variables in `assets/css/style.css`.

Enjoy — modify freely and tell me if you'd like:
- a GitHub Action to auto-build `index.json` when you push,
- integration with a static-site generator (Jekyll/Eleventy),
- or a nicer MD → HTML post workflow.
