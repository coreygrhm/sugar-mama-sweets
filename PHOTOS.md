# Photo Checklist — Sugar Mama Sweets

Everything the site needs **except the gallery**. Drop final files into
`src/assets/` using the **exact file names** below to replace the placeholders.

> Feed full-resolution originals — **don't pre-shrink them.** Astro
> automatically resizes, optimizes, and lazy-loads. Bigger source = sharper site.

---

## The 7 slots (6 unique photos — the share image can reuse the hero)

### 1. `hero.jpg` — the star of the homepage
- **Where:** top of the home page, the first thing visitors see.
- **Orientation:** **Portrait, 4:5** (tall). e.g. 1600 × 2000 px (min 1000 × 1250).
- **Subject:** her single best **signature** set — soft blush/cream, bows,
  monograms, baby-shower style. This *is* the brand.
- **Framing:** cookies roughly **centered** with a little breathing room — the
  site center-crops to 4:5, so don't put the subject at the very edge.
- **Rules:** original work only. **No** licensed/character/sports designs here.

### 2. `portrait.jpg` — the "Meet Leslie" photo
- **Where:** the bio section on the home page.
- **Orientation:** **Portrait, 4:5** (tall).
- **Subject:** **Leslie herself** — ideally holding a tray, decorating, or in her
  kitchen. Warm and personal; this builds trust.
- **No photo of her yet?** Good stand-ins until she's ready: her hands piping
  icing, or an over-the-shoulder "in progress" shot. (We can swap later.)

### 3–6. `teaser-1.jpg` … `teaser-4.jpg` — the homepage "taste of my work" strip
- **Where:** a 4-photo strip on the home page that links to the gallery.
- **Orientation:** **Portrait, 4:5** each (min ~800 × 1000).
- **Subject:** her **4 strongest sets** — lead with signature blush style, but a
  little variety (a wedding set, a birthday set) shows range.
- **Note:** these will *also* appear in the gallery later, so pick favorites.
- Displayed small (2 across on phones, 4 across on desktop), so even slightly
  cropped IG images work fine here.

### 7. `og-default.jpg` — the social share / link-preview image
- **Where:** the thumbnail that shows when the link is posted to Facebook,
  Messenger, or texted. (Not shown on the site itself.)
- **Orientation:** **Landscape, 1.91:1 → 1200 × 630 px.** ⚠️ This is the only
  **wide** one.
- **Subject:** her best signature shot, framed **horizontally** so cookies
  aren't cut off in the wide crop.
- **Shortcut:** can be the **same set as the hero**, just a wider/landscape
  framing. If you only have a portrait shot, give it to me anyway — I'll produce
  the 1200 × 630 version.
- **Rules:** original work only. **No** licensed designs (it's the most public
  image).

---

## Working from cropped Instagram/Facebook images (for now)

You're pulling from her public profiles, so here's what actually works:

| IG/FB source | Fits which slots? | Notes |
|---|---|---|
| **Portrait post (4:5, 1080×1350)** | hero, portrait, teasers | 🎯 Perfect — matches the layout exactly |
| **Square post (1080×1080)** | teasers (good), hero (ok) | Slight top/bottom crop to 4:5 |
| **Landscape post** | `og-default.jpg` | 🎯 Ideal for the share image |
| **Story / Reel cover (9:16)** | avoid | Too tall — heavy cropping |

**Rules of thumb for placeholders-from-IG:**
- Aim for at least **~1000 px** on the short side; sharper is better.
- Keep the cookies **reasonably centered** (we crop from the center).
- Avoid heavily filtered, watermarked, or blurry grabs — they'll look soft.
- These are fine to launch with; swap in her **phone originals** later for the
  best quality (have her AirDrop/text the full-res files).

---

## Replacing a placeholder
1. Save the photo with the matching name (e.g. `hero.jpg`) into `src/assets/`.
2. If your file is a `.png` or `.jpeg`, either rename it to `.jpg` **or** update
   the filename in `src/config/site.ts` to match.
3. Update its `alt` text in `src/config/site.ts` to describe the real photo.
4. Save — the dev server hot-reloads.

## Summary checklist
- [ ] `hero.jpg` — best signature set, portrait 4:5
- [ ] `portrait.jpg` — Leslie (or hands/in-progress stand-in), portrait 4:5
- [ ] `teaser-1.jpg` — favorite set #1, portrait 4:5
- [ ] `teaser-2.jpg` — favorite set #2, portrait 4:5
- [ ] `teaser-3.jpg` — favorite set #3, portrait 4:5
- [ ] `teaser-4.jpg` — favorite set #4, portrait 4:5
- [ ] `og-default.jpg` — best signature shot, **landscape 1200×630** (can reuse hero)
- [ ] _(gallery photos — separate, gather from Leslie later)_
