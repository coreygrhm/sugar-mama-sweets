# Sugar Mama Sweets — Website

A small, fast, photography-forward marketing site for **Sugar Mama Sweets**, the
custom decorated sugar-cookie business run by **Leslie Lewis** in **Scottsboro,
Alabama**. Three pages (Home, Gallery, Contact) plus an email signup. It's a
brand home base — not a store.

Built with [Astro](https://astro.build) (static output) and vanilla CSS. The
photography is the star; the UI stays quiet. Designed mobile-first since most
visitors arrive from Instagram/Facebook on their phones.

---

## Run it locally

```bash
npm install
npm run dev      # local dev server → http://localhost:4321
```

Other commands:

```bash
npm run build    # production build → ./dist (static, deploy-ready)
npm run preview  # preview the production build locally
```

Requires Node 18+ (developed on Node 20+).

---

## Where to edit content

**Almost everything lives in one file:** [`src/config/site.ts`](src/config/site.ts).
Business name, tagline, bio, contact links, ordering info, and the whole gallery
photo list are all there — edit the text between the quotes and save. A
non-developer can safely change copy and swap photos without touching any markup.

## Where to put photos

Drop image files into [`src/assets/`](src/assets/), then reference them by file
name only in `src/config/site.ts` (e.g. `hero.jpg`). Astro automatically
optimizes, resizes, and lazy-loads them — **feed it the full-resolution
originals; don't shrink them first.**

The supplied photos are **portrait (~4:5)**; the hero and gallery are designed
for vertical images.

### Placeholder images

The repo ships with on-brand **placeholder** images (clearly labeled
"PLACEHOLDER") so the site builds and looks complete before real photos arrive.
To replace one, drop a real photo with the **same file name** into `src/assets/`.
The generator lives at [`scripts/generate-placeholders.mjs`](scripts/generate-placeholders.mjs)
(`node scripts/generate-placeholders.mjs`) and can be deleted once real photos
are in.

> **Licensed-IP note:** designs featuring trademarked properties (sports logos,
> cartoon/book characters, branded themes) must **not** be the hero or share
> image, and should stay a small minority of the gallery. Mark any such photo
> with `licensedIp: true` in the config.

---

## Email signup endpoint

The signup form (on the home page + footer) and the optional contact form POST
the submitted data as JSON via `fetch` to a single configurable endpoint, read
from the **`PUBLIC_SIGNUP_ENDPOINT`** environment variable.

1. Copy `.env.example` to `.env`.
2. Set `PUBLIC_SIGNUP_ENDPOINT` to your endpoint URL.

```bash
cp .env.example .env
```

That endpoint should be a **separate Cloudflare Worker (not built in this repo)**
that forwards the email to an **email service provider** (Mailchimp, Buttondown,
ConvertKit, etc.) so the list is actually *sendable* later — not just dumped into
a database. See the `// TODO:` at the wiring point in
[`src/components/EmailSignup.astro`](src/components/EmailSignup.astro).

If the env var is unset, the form validates input and shows a clear "endpoint
not configured" message instead of failing silently.

---

## Deploy (Cloudflare Pages)

Static output, so any static host works. For Cloudflare Pages:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- Add `PUBLIC_SIGNUP_ENDPOINT` as an environment variable in the Pages project.

---

## ✅ Remaining TODOs

Fill these in — the site builds and looks complete with them unfilled, but
they're the real-world details still needed. Search the codebase for `TODO:` to
find each one in context.

- [ ] **Order email** — `contact.email` in `src/config/site.ts` (shows as
      "Email coming soon" until set).
- [ ] **Lead time** — `ordering.leadTime` in `src/config/site.ts` (how far ahead
      to order).
- [ ] **Fulfillment** — `ordering.fulfillment` in `src/config/site.ts` (local
      pickup / delivery details for the Scottsboro area).
- [x] **Domain** — set to `https://sugarmamasweets.shop` in `src/config/site.ts`,
      `astro.config.mjs`, and `public/robots.txt`. _(Register the domain + connect
      it in Cloudflare Pages.)_
- [ ] **Deploy the signup Worker** — see [`worker/README.md`](worker/README.md),
      then set `PUBLIC_SIGNUP_ENDPOINT` in `.env` (and in the Cloudflare Pages
      project) to the deployed Worker URL.
- [x] **Hero / portrait / teasers / share image** — added. _(Gallery photos still
      to come.)_
- [ ] **Gallery photos** — add to `src/assets/` + list them in `src/config/site.ts`.

---

## What's intentionally NOT here

No e-commerce/cart/checkout, no blog/CMS/admin, no login/auth, no database, no
analytics (just a commented-out placeholder tag in the layout `<head>`). This is
a marketing site, by design.
