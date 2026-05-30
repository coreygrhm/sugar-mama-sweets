/**
 * Sugar Mama Sweets — signup / contact Worker
 * ============================================================================
 * A tiny Cloudflare Worker that the website's forms POST to (the URL goes in
 * the site's PUBLIC_SIGNUP_ENDPOINT env var).
 *
 * It does two things:
 *   1. Email list signups  → adds the address to an email service provider
 *      (Buttondown by default) so the list is actually *sendable* later.
 *   2. Contact-form messages (body.type === 'contact') → emails Leslie via
 *      Resend; if email isn't configured, it still captures the address on the
 *      list so nothing is lost.
 *
 * No database. No framework. Just a fetch handler.
 *
 * Configure (see worker/README.md):
 *   vars     : ALLOWED_ORIGIN, NOTIFY_EMAIL, FROM_EMAIL
 *   secrets  : BUTTONDOWN_API_KEY, RESEND_API_KEY
 * ============================================================================
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Local dev origins are always allowed so `npm run dev` works against the Worker.
const DEV_ORIGINS = ['http://localhost:4321', 'http://127.0.0.1:4321'];

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGIN || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .concat(DEV_ORIGINS);
  const allow = allowed.includes(origin) ? origin : allowed[0] || '*';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

const json = (data, status, headers) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405, cors);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: 'Invalid request.' }, 400, cors);
    }

    // Honeypot: real users never fill a hidden "company" field — bots do.
    // Silently accept so the bot thinks it succeeded.
    if (body.company) return json({ ok: true }, 200, cors);

    const email = String(body.email || '').trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return json({ ok: false, error: 'Please enter a valid email address.' }, 400, cors);
    }

    try {
      if (body.type === 'contact') {
        await handleContact(
          { email, name: String(body.name || '').trim(), message: String(body.message || '').trim() },
          env
        );
      } else {
        await addSubscriber(email, { source: String(body.source || '') }, env);
      }
      return json({ ok: true }, 200, cors);
    } catch (err) {
      // Log the real reason in the Worker tail; return a friendly message.
      console.error('[signup-worker]', err && err.message);
      return json({ ok: false, error: 'Something went wrong. Please try again.' }, 502, cors);
    }
  },
};

/**
 * Add an email to the list provider.
 * Default: Buttondown (https://docs.buttondown.email/api-reference).
 * To switch providers, replace the fetch() below — see README for Mailchimp /
 * ConvertKit snippets.
 */
async function addSubscriber(email, meta, env) {
  if (!env.BUTTONDOWN_API_KEY) {
    throw new Error('Email list not configured (set BUTTONDOWN_API_KEY).');
  }

  const res = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      tags: meta.source ? [meta.source] : [],
    }),
  });

  if (res.status === 201) return; // created
  const text = await res.text();
  // Already on the list? That's a success from the visitor's point of view.
  if (res.status === 400 && /already|exists/i.test(text)) return;
  throw new Error(`Buttondown ${res.status}: ${text.slice(0, 200)}`);
}

/**
 * Handle a contact-form message.
 * Preferred: email Leslie via Resend (https://resend.com/docs).
 * Fallback: if Resend isn't configured, capture the address on the list so the
 * lead isn't lost.
 */
async function handleContact({ email, name, message }, env) {
  if (env.RESEND_API_KEY && env.NOTIFY_EMAIL && env.FROM_EMAIL) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [env.NOTIFY_EMAIL],
        reply_to: email,
        subject: `New cookie inquiry from ${name || email}`,
        text: `Name:  ${name || '(not given)'}\nEmail: ${email}\n\n${message || '(no message)'}`,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Resend ${res.status}: ${text.slice(0, 200)}`);
    }
    return;
  }

  // Fallback so a message is never silently dropped.
  if (env.BUTTONDOWN_API_KEY) {
    await addSubscriber(email, { source: 'contact-form' }, env);
    return;
  }

  throw new Error('Contact form not configured (set RESEND_* or BUTTONDOWN_API_KEY).');
}
