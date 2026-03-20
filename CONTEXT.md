---
name: Portfolio build — arseniygoldberg.com
description: Full technical context for Arseniy's personal portfolio site — stack, decisions, file locations, what's built, what's next
type: project
---

## What's built

Personal portfolio site for Arseniy Goldberg. Live at **arseniygoldberg.com**.

**Stack:** Astro + Tailwind CSS v4 + Vercel (server output mode)
**Repo:** github.com/arseniy-design/portfolio
**Local path:** /Users/arsen1/portfolio-astro
**Old static site (reference):** /Users/arsen1/portfolio/index.html

## Design system

- **Primary color:** Navy `#0D1B2A` (backgrounds, dark sections)
- **Accent:** Orange `#F4621F` (CTAs, highlights, logo crossbar)
- **Light background:** Warm white `#FAFAF8` / `#F4F1EC`
- **Display font:** Clash Display (Fontshare) — replaces generic Space Grotesk
- **Body font:** Satoshi (Fontshare) — replaces generic Inter
- **Logo:** Custom SVG mark — outlined A with orange crossbar + G. Located in Nav in index.astro

## Infrastructure

- **Domain:** arseniygoldberg.com — purchased on Cloudflare Registrar (~$10/yr, 3 years)
- **DNS:** Cloudflare (DNS only, grey cloud — proxy OFF). A record → 216.198.79.1, CNAME www → cname.vercel-dns.com
- **Hosting:** Vercel (free tier, auto-deploys from GitHub main branch)
- **Contact form:** Formspree (https://formspree.io/f/mgonnqob) — AJAX submit, inline success message, no redirect needed (free plan)
- **Video hosting decision:** YouTube Unlisted — decided. Start there, upgrade to Vimeo Pro later if the YouTube logo becomes a concern. Existing Google Drive video links in Finance tab need to be swapped to YouTube embeds.

## Pages

- `/` — main single-scroll portfolio (src/pages/index.astro)
- `/thanks` — thank you page for after form submit (src/pages/thanks.astro)

## Sections on the page (in order)

1. Nav (sticky, scroll effect, mobile menu)
2. Hero (photo: /public/hero.jpg, badge: 5× Teaching Excellence)
3. Stats bar (12 yrs, 5 continents, 30+ institutions, 15+ courses, 4 startups)
4. Work section — 4 tabs: Financial Thinking / Innovation & Ventures / AI & Digital Productivity / Human Behavior & Decisions
5. Cinematic break (photo: /public/speaking.jpg — Saudi Ministry of Finance)
6. Clients (18 logo names in a grid)
7. Brands (Flow, North, Stride cards)
8. Recognition (awards + testimonial carousel — 8 testimonials)
9. Contact form
10. Footer

## Content yet to be added (next sessions)

- LinkedIn posts section
- AI case studies section
- Blog / writing section
- Videos section (face-to-camera, screen walkthroughs, product demos)
- AI simulations & tutors section
- Headshot update (current one has no beard — Arseniy wants updated photo)
- Vimeo Pro decision for branded video embedding

## Deploy workflow

```bash
cd /Users/arsen1/portfolio-astro
# make changes
npm run build   # verify clean build
git add .
git commit -m "description"
git push        # Vercel auto-deploys in ~30 seconds
```
