# Polish Me Pretty Gang — Launch Checklist & Asset Guide

Everything on the site works as-is using `assets/logo.jpg`. The items below are the
final production polish steps before pointing a real domain at it.

---

## 1. Favicons (recommended)

The site currently uses the salon logo (`assets/logo.jpg`) as the favicon and
Apple touch icon — this works immediately. For crisp icons at every size, generate
a proper set **from the same logo**:

1. Go to <https://realfavicongenerator.net> (or <https://favicon.io>).
2. Upload `assets/logo.jpg`.
3. Download the package and place these files in the project root / `assets/`:
   - `favicon.ico`
   - `apple-touch-icon.png` (180×180)
   - `assets/icon-192.png` (192×192)
   - `assets/icon-512.png` (512×512)
4. The `<link rel="icon">` and `site.webmanifest` already reference the logo — once
   you add the PNGs above, the manifest icons resolve automatically. Optionally add
   to each page `<head>`:
   ```html
   <link rel="icon" href="favicon.ico" sizes="any">
   <link rel="apple-touch-icon" href="apple-touch-icon.png">
   ```

> The logo is a circular pink medallion. Keep it on its pink background — it reads
> well as a small round icon.

---

## 2. Social sharing image (Open Graph / Twitter)

Every page already sets `og:image` / `twitter:image` to `assets/logo.jpg`, so links
will preview with the logo. For a richer share card, create a **1200×630 px** image:

- Logo on the left, the words **"Polish Me Pretty Gang — Luxury Nail Care, Durban"**
  on the right, on a soft blush/rose-gold background (match `#fdf3f6` / `#b5677d`).
- Save as `assets/og-image.jpg` (keep under ~300 KB).
- Then update the two lines in **every** HTML `<head>`:
  ```html
  <meta property="og:image" content="https://YOURDOMAIN/assets/og-image.jpg" />
  <meta name="twitter:image" content="https://YOURDOMAIN/assets/og-image.jpg" />
  ```

---

## 3. Replace placeholders before go-live

Search-and-replace these across all files:

| Placeholder | Replace with |
|---|---|
| `https://polishmeprettygang.co.za` | the real domain (canonical, OG, sitemap, robots, JSON-LD) |
| `instagram.com/polishmeprettygang` | the real Instagram handle |
| `tiktok.com/@polishmeprettygang` | the real TikTok handle (or remove the link) |
| Postal code `4001` | confirm the correct code |
| `geo` lat/long `-29.8230, 31.0120` | exact coordinates (right-click the pin in Google Maps → copy) |
| Opening hours (Mon–Fri 9–18, Sat 8:30–16, Sun closed) | confirm real hours — update `contact.html`, footers, CTAs **and** the JSON-LD on `index.html` |
| `aggregateRating` 5.0 / 48 reviews | use real numbers, or remove the `aggregateRating`/`review` blocks if you can't substantiate them (Google requires genuine reviews) |

**Phone & WhatsApp are already correct:** `068 568 9449` / `wa.me/27685689449`.

---

## 4. Activate the Google Map (contact page)

`contact.html` ships with a styled map placeholder + an "Open in Google Maps" button
(works now). To embed a live map:

1. Google Maps → search `481 Lilian Ngoyi Road, Morningside, Durban`.
2. **Share → Embed a map →** copy the `<iframe>`.
3. In `contact.html`, replace the `<div class="map-placeholder">…</div>` inside
   `.map-frame` with the iframe, and add `loading="lazy"` plus
   `title="Map to Polish Me Pretty Gang"` to it.

---

## 5. Replace stock photos with real work

Gallery, hero, about and before/after currently use Unsplash stock for layout.
Swap in real salon photos (square, ~600 px for thumbnails, ~1100 px for lightbox):

- Save to `assets/` and update `src` / `data-full` attributes.
- Keep the `width`/`height` attributes (they prevent layout shift / protect CLS).
- Compress to WebP/JPEG (TinyPNG / Squoosh) for best Lighthouse performance.

---

## 6. Pre-launch QA

- [ ] Test on 320 / 375 / 390 / 768 px and desktop.
- [ ] Validate structured data: <https://search.google.com/test/rich-results>.
- [ ] Check OG previews: <https://www.opengraph.xyz>.
- [ ] Run Lighthouse (mobile) — target Perf 90+, A11y 95+, Best Practices 95+, SEO 95+.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Create / claim the **Google Business Profile** (huge for local "nails near me" searches).
- [ ] Confirm every WhatsApp button opens a chat to `068 568 9449`.
