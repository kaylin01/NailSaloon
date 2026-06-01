# Polish Me Pretty Gang — Site Overview

> Production static website for **Polish Me Pretty Gang**, a boutique nail studio at
> 481 Lilian Ngoyi Road, Morningside, Durban. Primary conversion goal: **bookings via WhatsApp**.

## 1. Stack

- Hand-written HTML5, CSS3 (custom properties), vanilla JS (IIFEs, no libraries, no build step).
- Google Fonts: Playfair Display (display serif) + Poppins (body sans).
- Brand: soft luxury — white / blush / rose-gold, rounded cards, mobile-first.
- Logo: `assets/logo.jpg` (the pink embossed medallion), used in navbar, footer, favicon,
  about badge, OG/social image, and manifest.
- No backend. Bookings happen on WhatsApp: `https://wa.me/27685689449`.

## 2. File inventory

| File | Purpose |
|------|---------|
| `index.html` | Home: hero, intro, why-choose-us (4 cards), featured services, 4-step process, testimonials carousel, Instagram CTA, booking CTA |
| `pricing.html` | Full price list — Acrylic / Gel / Extras cards with per-item booking CTAs |
| `gallery.html` | Filterable portfolio (All / Acrylic / Gel / Nail Art / Toes) + accessible lightbox |
| `reviews.html` | Aggregate rating, 6 review cards, before/after transformations, CTA |
| `about.html` | Story, 6 "why us" reasons, philosophy quote, CTA |
| `contact.html` | Contact info cards, opening hours (today highlighted), map placeholder, FAQ accordion |
| `styles.css` | Single design-token-driven stylesheet (incl. reduced-motion + print) |
| `script.js` | Navbar, smooth scroll, carousel, gallery filter, lightbox, FAQ, hours highlight, scroll-reveal, footer year |
| `assets/logo.jpg` | Salon logo |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | SEO / PWA basics |
| `LAUNCH-CHECKLIST.md` | Favicon, share image, placeholder replacement, map embed, QA steps |

## 3. Business data (single source of truth)

- **Name:** Polish Me Pretty Gang
- **Address:** 481 Lilian Ngoyi Road, Morningside, Durban, 4001
- **Phone / WhatsApp:** 068 568 9449 · `tel:+27685689449` · `https://wa.me/27685689449`
- **Hours:** Mon–Fri 09:00–18:00 · Sat 08:30–16:00 · Sun closed
- **Domain (placeholder):** `https://polishmeprettygang.co.za` — replace before launch.
- **Social (placeholder handles):** instagram.com/polishmeprettygang, tiktok.com/@polishmeprettygang

## 4. Conversion (every page drives to WhatsApp)

- Navbar "Book" CTA, hero CTA, per-service CTAs (pricing), footer WhatsApp, floating
  WhatsApp button, and a **sticky mobile booking bar** (mobile only).
- All WhatsApp links carry a pre-filled message.

## 5. SEO

- Unique `<title>` + meta description per page; canonical URLs; `robots`.
- Open Graph + Twitter Card tags on every page.
- JSON-LD: `NailSalon` LocalBusiness (home + reviews), `BreadcrumbList` (sub-pages),
  `FAQPage` (contact), `OfferCatalog` (pricing), `AggregateRating` + `Review` (reviews).
- `sitemap.xml` + `robots.txt`. Locale `en_ZA`, service area Durban.

## 6. Accessibility (WCAG AA target)

- Skip-to-content link, semantic landmarks (`<main>`, `<nav>`, `<address>`), real headings.
- Keyboard-operable: gallery uses `<button>` triggers, lightbox traps focus + Esc/arrows,
  FAQ uses `aria-expanded`, mobile nav closes on Esc, visible `:focus-visible` rings.
- `prefers-reduced-motion` disables animations, autoplay, blur, and scroll behavior.
- Decorative SVGs `aria-hidden`; star ratings have text `aria-label`s.

## 7. Performance

- `preconnect` to fonts + images, `font-display: swap`, deferred-friendly single JS file.
- Images carry `width`/`height` (CLS), `loading="lazy"` + `decoding="async"` (below-fold).
- See `LAUNCH-CHECKLIST.md` to swap Unsplash stock for compressed real photos.

## 8. Known pre-launch tasks
See `LAUNCH-CHECKLIST.md`: real domain, favicons, og-image, live map embed, real photos,
confirm hours/coords, genuine review counts, Google Business Profile.
