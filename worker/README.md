# Signup / Contact Worker

A small Cloudflare Worker that the website's forms POST to. It's **separate from
the website** — deploy it on its own, then put its URL in the site's
`PUBLIC_SIGNUP_ENDPOINT` env var.

What it does:
- **Email signups** → adds the address to your email provider (**Buttondown** by
  default) so the list is sendable later.
- **Contact messages** (`type: "contact"`) → emails Leslie via **Resend**; if
  Resend isn't set up, it falls back to capturing the address on the list.

It includes CORS, email validation, and a bot honeypot. No database.

---

## Deploy

```bash
cd worker
npm install
npx wrangler login          # one-time, opens a browser
```

### 1. Set the secrets

For email signups (required for the list to work):

```bash
npx wrangler secret put BUTTONDOWN_API_KEY
# paste your Buttondown API key (Buttondown → Settings → Programming → API)
```

For the contact form (optional — skip if you only want the signup list):

```bash
npx wrangler secret put RESEND_API_KEY
# paste your Resend API key (resend.com)
```

### 2. Set the non-secret vars

Edit `wrangler.toml`:
- `ALLOWED_ORIGIN` — already set to `https://sugarmamasweets.shop`.
- For contact email, uncomment + set `NOTIFY_EMAIL` (where messages go) and
  `FROM_EMAIL` (a sender on a domain you've verified in Resend).

### 3. Deploy

```bash
npx wrangler deploy
```

Wrangler prints the live URL, e.g.
`https://sugar-mama-signup.<your-subdomain>.workers.dev`.

### 4. Point the website at it

Put that URL in the site's env var (root `.env` for local, and in the Cloudflare
Pages project settings for production):

```
PUBLIC_SIGNUP_ENDPOINT=https://sugar-mama-signup.<your-subdomain>.workers.dev
```

Rebuild/redeploy the site and the forms are live.

---

## Local testing

```bash
cd worker
npx wrangler dev          # serves the Worker at http://localhost:8787
```

Put `PUBLIC_SIGNUP_ENDPOINT=http://localhost:8787` in the site's `.env`, run the
site's `npm run dev`, and submit the form. Use `npx wrangler tail` to watch logs
on the deployed Worker.

---

## Switching email providers

The list logic lives in one function, `addSubscriber()`, in `src/index.js`.
Replace the `fetch()` call to use a different provider:

- **Mailchimp** — `POST https://<dc>.api.mailchimp.com/3.0/lists/<id>/members`
  with `{ email_address, status: "subscribed" }` and Basic auth.
- **ConvertKit** — `POST https://api.convertkit.com/v3/forms/<id>/subscribe`
  with `{ api_key, email }`.

Keep the function's name/signature and the rest of the Worker keeps working.
