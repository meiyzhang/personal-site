# Megan Zhang — Personal Site

A static, multi-page personal site in the "poetic simplicity" theme.
No build step — plain HTML/CSS/JS, ready to deploy on GitHub Pages.

This is a **jumpstart**: every page is filled with editable *filler* text
and open *image slots*, plus a set of custom in-theme graphics so the site
already looks finished before you add a single photo or word.

## Structure

```
index.html        Main page — hero, intro, "now" card, explore
projects.html     Gallery-style cards (image + title + See More) — ART-inspired
writing.html      Essays / academic / poetics, with category filter
stories.html      Diary feed — Tokyo-blog inspired (now-playing, swatches, notebook)
bookshelf.html    Interactive spines + review modal, featured currently-reading
assets/
  css/  main.css (backbone + all shared components) + one file per page
  js/   main.js (loader/nav/reveal), projects.js, writing.js, bookshelf.js
  img/  custom graphics (see below) + hero-beach.jpg (your photo, ready to use)
.nojekyll
```

## The custom graphics (already developed, in-palette)

All generated specifically for this site, in the blue/grey/white palette:

- **flow-hero.svg / flow-band.svg / flow-corner.svg** — the signature motif:
  flowing contour-line fields that read as both topographic (mathematical)
  and like wind or water (poetic). `flow-hero` is the faint backdrop on the
  main page; the other two are spares you can drop into any section header
  or corner (`<img src="assets/img/flow-band.svg" alt="">`).
- **constellation.svg** — a scatter-and-line motif, used as the header accent
  on the Writing page.
- **sprig.svg** — a delicate botanical line-branch, for use as a small accent
  wherever you'd like one.
- **rabbit.svg** — the little seated rabbit that hops in the loading screen.

To recolor any of them, open the `.svg` in a text editor and change the hex
values (`#5C7A8A` steel, `#8B98A0` mist, `#2B3A4A` slate).

## Filler text & image slots — how to fill it in

**Filler text:** all body copy is placeholder prose, with a few bracketed
cues like `[ author ]` or `[ month, year ]` at the spots that need a specific
detail. Search the HTML for `[` to find every cue, and replace the
placeholder paragraphs with your own words. Your name is already in the
wordmark and hero — change it there if you ever want to.

**Image slots:** every spot meant for a photo is an `.img-slot` — a soft
gradient placeholder with a little image mark and a label. To drop in a real
photo, replace the contents of the slot with an `<img>`:

```html
<!-- before -->
<div class="img-slot" style="--ratio: 4 / 5;">
  <svg class="img-slot-mark" ...></svg>
  <span class="img-slot-label">your photo</span>
</div>

<!-- after -->
<div class="img-slot" style="--ratio: 4 / 5;">
  <img src="assets/img/my-photo.jpg" alt="description of the photo">
</div>
```

The `--ratio` controls the slot's shape (`4 / 5` portrait, `16 / 6` wide
banner, `1 / 1` square, etc.). Your beach photo is already in
`assets/img/hero-beach.jpg` — to use it as the main hero portrait, just
point that slot's `<img>` at it.

## Editing each page

- **Projects:** each `<article class="gallery-card">` is one project — image
  slot on top, title, `[ category · year ]`, and a **See More** pill that
  expands the detail (description, tags, link pills). Copy a whole `<article>`
  to add another; the JS auto-wires any `.see-more` button.
- **Writing:** each piece is a `.writing-card` inside a
  `<section data-category="essays|academic|poetics">` — the `data-category`
  drives the filter buttons. Poetics are styled as epigraphs (serif italic).
- **Recent Stories:** the richest page. The big overlapping title, the
  now-playing card, the three rounded photo cards, the palette-swatch strip,
  the Notebook block (text + photo + quote bubble + hashtags), and the diary
  feed at the bottom are all independent blocks you can fill or duplicate.
- **Bookshelf:** each book is a `<button class="book-spine">` carrying its own
  `data-title`, `data-author`, `data-status`, `data-rating`, `data-review` —
  the modal reads straight from those, so adding a book needs no JS edit.
  Spines wrap into new rows automatically as you add more.

## Socials

Every page repeats the footer with five links (Beli, GitHub, Goodreads,
Letterboxd, Substack) currently pointing at `#`. Replace those `href="#"`
values with your real profile URLs.

## Deploying on GitHub Pages

1. Create a repo named `<your-username>.github.io` (for a root personal site).
2. Push this folder's contents to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
4. Your site goes live at `https://<your-username>.github.io/` in a minute or two.

`.nojekyll` is included so GitHub serves `assets/` as-is without Jekyll.
