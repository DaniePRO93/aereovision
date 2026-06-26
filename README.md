# AeroVision

Marketing site for **AeroVision** — professional drone aerial photography & videography services in Guatemala. Single-page or multi page  React app with a Supabase backend (contact email, newsletter signup, Instagram feed).

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

## Deployment (Cloudflare Pages)

The site deploys to Cloudflare Pages and serves the production domain.

**One-time setup:**

1. In the Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**, select this repository.
2. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Add the `VITE_*` environment variables (from `.env`) under **Settings → Environment variables**.
4. Under **Custom domains**, add `aerovision.gt` (and `www`). Cloudflare provisions TLS automatically.

After that, **every push to `main` auto-builds and deploys.** SPA routing is handled by `public/_redirects` (`/* /index.html 200`).

To deploy manually instead of via Git integration:

```sh
npm run build
npx wrangler pages deploy dist --project-name aerovision
```
