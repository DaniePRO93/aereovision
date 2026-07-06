# 📓 Devlog — AeroVision

The build journal of [aerovision.gt](https://aerovision.gt) — the website for my drone
photography & videography studio in Guatemala. From a rough prototype to a
custom-designed, deployed site that actually brings in clients.

**Stack:** Vite · React · TypeScript · custom CSS design system · Supabase · Netlify

---

## Aug 2025 — Day one: just ship *something*

Started with a generated Vite + React + shadcn template and hammered out the first
version in a single long day (~30 commits): hero section, services, pricing packages,
portfolio links, testimonials, contact info. Nothing fancy — the goal was to have a
URL I could put in my Instagram bio.

Lessons learned immediately:

- Buttons that don't do anything are worse than no buttons (`Fix: Make all buttons functional`)
- Real content beats placeholder content — swapped stats, testimonials and portfolio
  images the same day I wrote them.

## Aug 19–26, 2025 — Booking flow + Spanish

- Wired the booking/contact forms to **Supabase edge functions** so inquiries reach my email.
- Fixed a booking submission bug (`Fix booking sending error`) — first real debugging session.
- **Translated the entire site to Spanish.** My clients are in Guatemala; an English
  site was a silly default. This taught me to think about the *audience* before the code.
- Built out the package options page: tiered pricing (Inicial / Estándar / Pro) per service.

## Sep–Dec 2025 — Small iterations

Favicon, Instagram links, a hero media carousel. The site was "done" but I kept
tweaking. Looking back, this was the plateau phase — the site worked but didn't
*feel* like the footage I was selling.

## Jan 2026 — Partnerships

Added a partnership section after landing recurring work with a school (Acton
Academy). First time the website content followed the business instead of the
other way around.

## June 25–27, 2026 — Taking full ownership

The big cleanup week:

- **De-Lovable'd the project** — removed the site-builder scaffolding, fixed SEO and
  contact issues, and made the codebase fully mine.
- Added **Netlify deploy config** with proper SPA redirects.
- Implemented a full redesign from a design handoff (cream/amber editorial look).
- Built **multi-page work galleries** (`/work/:slug`) with hover-to-play video tiles.
- Replaced every stock/AI image with **real footage from my own shoots** — home tours,
  a bike-jump FPV clip, event coverage, a 24s aerial home tour as the gallery headline.
- Swapped placeholder logos for real clients (Acton, UFM, PrometheusFest).

The rule that came out of this week: **nothing fake on the site.** Every pixel of
media is footage I actually flew.

## July 2, 2026 — The "Golden Hour Cinema" redesign 🌅

The site was clean but read "brochure," not "aerial film studio." Complete art
direction rebuild:

- **Night-ink dark canvas** with warm bone text and a golden-hour gradient
  (amber → ember) as the accent system — like a screening room.
- **Typography with a spine:** Clash Display for headlines, Instrument Serif italics
  for accent words, Space Mono for drone-HUD details, General Sans for body.
- A **live video hero** with an image-crossfade fallback, framed by HUD telemetry
  (blinking REC dot, GPS coordinates, "4K/6K CINE").
- **Film grain overlay**, a scrolling services marquee, a giant ghost wordmark in
  the footer, and an on-brand 404 ("Señal perdida").
- Moved all styling into a scoped CSS design system (`redesign.css`) with custom
  properties instead of thousands of inline styles.

Same day, two hard-won fixes:

- **Video autoplay was broken.** Root cause: React sets `muted` as a JS *property*
  but never renders the HTML *attribute*, and browser autoplay policies check the
  attribute. Fixed with explicit muting via refs + `play()` retries on
  `canplay` and first touch. If autoplay is still blocked, the hero gracefully
  falls back to a rotating image crossfade.
- **Mobile polish:** the giant footer wordmark clipped on phones (scaled its floor
  down), stats went ragged (2×2 grid), added a `100vh` fallback for browsers
  without `svh`, and safe-area insets for notched iPhones.

## July 5, 2026 — Measure everything

- Added **Google Analytics 4** with UTM-tagged links per channel (Instagram bio,
  Facebook groups, DMs) so I know which network actually drives visits.
- Fixed the **og-image**: the metadata pointed at a file that didn't exist, so every
  link shared on WhatsApp — my entire booking funnel — showed a broken preview.
  Now it's a real 1200×630 aerial shot.

---

## Where it's at

- 🌐 Live at [aerovision.gt](https://aerovision.gt), deployed on Netlify from this repo
- 📱 Every inquiry funnels to WhatsApp with pre-filled messages (package configurator
  computes a live total and deep-links into the chat)
- 🎨 100% custom design system, zero UI-kit look
- 🎥 100% real aerial footage — the portfolio *is* the product

## What I'd tell past me

1. Ship the ugly version first — the URL in the bio mattered more than the design for months.
2. Translate for your actual audience on day one.
3. Browsers *really* don't want videos to autoplay. Read the autoplay policy before fighting it.
4. The share preview (og-image) is part of the product when your funnel lives on WhatsApp.
5. A design system file beats inline styles the moment you touch the second page.
