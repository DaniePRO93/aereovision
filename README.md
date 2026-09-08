# AeroVision

Marketing site for **AeroVision** — professional drone aerial photography & videography services in Guatemala. Single-page or multi page  React app with a Supabase backend (contact email, newsletter signup, Instagram feed).

🌐 **Live:** [aerovision.gt](https://aerovision.gt) · 📓 **Build journal:** [DEVLOG.md](DEVLOG.md)

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **Framer Motion** for animation
- **Supabase** — Postgres + Edge Functions (Deno)
- **Resend** — transactional email
- **Cloudflare Pages** — hosting & deploy

## Local development

Requires Node.js 18+ and npm.

```sh
# Install dependencies
npm install

# Start the dev server (http://localhost:8080)
npm run dev

# Type-check + production build
npm run build

# Lint
npm run lint
```

## Environment variables

Copy `.env.example` to `.env` and fill in your Supabase project values:

```sh
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key (safe to ship to the browser) |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ref |

> `.env` is git-ignored. Never commit secrets. The Supabase anon key is public by design, but the service-role key and the Resend API key live only in the Supabase Edge Function secrets.

## Supabase backend

Edge functions live in `supabase/functions/`:

- `send-contact-email` — sends contact/booking emails via Resend
- `newsletter-subscribe` — stores newsletter signups + sends a confirmation
- `fetch-instagram-posts` — fetches recent Instagram posts (with fallback content)

Required Supabase Function secrets (set in the Supabase dashboard, **not** in this repo):

- `RESEND_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_URL`

Deploy a function with the Supabase CLI:

```sh
supabase functions deploy send-contact-email
```

## Deployment

The site is moving from Netlify to **Cloudflare Pages**. The full runbook,
including the DNS steps that still need doing, is in
[`docs/cloudflare-migration.md`](docs/cloudflare-migration.md).

**Right now:**

- `aerovision.gt` is still served by **Netlify** (DNS lives in AWS Route 53).
- The Cloudflare Pages project `aerovision` is live at
  <https://aerovision-f0w.pages.dev> and serves the current build.

**To deploy:**

```sh
npm run deploy
```

That builds and uploads `dist/` with `wrangler pages deploy`. The project is a
direct-upload one, so pushing to `main` does **not** deploy on its own.

SPA routing comes from `public/_redirects` (`/* /index.html 200`) and caching
plus security headers from `public/_headers` — both formats work unchanged on
Netlify and Cloudflare. Node version is pinned in `.nvmrc`.
