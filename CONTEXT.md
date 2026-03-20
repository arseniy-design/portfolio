# Portfolio Context — arseniygoldberg.com

## Stack
- **Framework:** Astro v6 (server/SSR output)
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel (free tier, auto-deploys from GitHub `main`)
- **Domain:** arseniygoldberg.com — DNS on Cloudflare (grey cloud, proxy OFF)
- **Contact form:** Formspree `https://formspree.io/f/mgonnqob` — AJAX, inline success
- **Repo:** github.com/arseniy-design/portfolio
- **Local path:** /Users/arsen1/portfolio-astro

## Deploy workflow
```bash
cd /Users/arsen1/portfolio-astro
npm run build   # verify clean
git add -A
git commit -m "description"
git push        # Vercel deploys in ~30s
```

---

## Design system
- **Primary:** Navy `#0D1B2A`
- **Accent:** Orange `#F4621F`
- **Light bg:** `#FAFAF8` / `#F4F1EC`
- **Display font:** Clash Display (`var(--font-display)`) — headings, labels, stats
- **Body font:** Satoshi (`var(--font-body)`) — paragraphs
- **Logo:** "AG." — Clash Display Bold, white letters, orange period. SVG `<text>` element in Nav.

---

## Brand identity
- **Site tagline:** How humans grow — through Finance, Artificial Intelligence, and Education.
- **LinkedIn tagline:** Discussing Human Behavior in Finance, AI, and Education
- **Three-word descriptor:** Professor · Consultant · Entrepreneur (maps to TEACH / ADVISE / BUILD)

---

## Page structure (in order)
1. **Nav** — sticky, scroll effect, mobile menu, AG. logo
2. **Hero** — `/public/hero.jpg`, headline, tagline, two CTAs, 55-second intro video button
3. **Stats bar** — 25+ Independent Projects · 4 Innovation Programs Launched · 5th Venture in Progress · 5 Teaching Excellence Awards · 35+ Institutions Reached
4. **Credibility strip** — single Agil Zakariya / P&G quote (lightweight, no awards mention)
5. **Work section** — BUILD/ADVISE/TEACH manifesto + 6 tabs:
   Finance · Startups · Innovation Programs · AI Productivity · Digital Courses · Human Behavior
6. **Cinematic break** — `/public/speaking.jpg` (Saudi Ministry of Finance)
7. **Clients** — 18 logo grid
8. **Brands** — Flow · North · Stride (three projects, no status badges)
9. **Recognition** — 2 award cards (expandable PDFs) + 12-testimonial carousel
10. **LinkedIn** — featured posts section
11. **Contact** — intentional form with engagement-type selector
12. **Footer**

---

## BUILD / ADVISE / TEACH strips
| Strip | Tagline | Chips | Stats |
|-------|---------|-------|-------|
| BUILD | Ventures built from scratch — in Azerbaijan, Spain, and the US. | SABAH Hub · Flow Strategy · North · Stride | 4 Innovation Programs · Finance · EdTech · AI · Azerbaijan · Spain · US |
| ADVISE | Strategy to implementation. Built around real company challenges. | Kyowa Kirin · IE Law School · TEC de Monterrey · Royal Commission for AlUla | AI Implementation · Digital Strategy · Financial Modeling · GTM |
| TEACH | Classrooms, boardrooms, briefing rooms. The standard doesn't change. | STC · PIF Saudi Arabia · Qatari Police · IE Business School · Oregon State · Leonardo | 4.9 / 5 Rating · NPS 70 · 5× Teaching Excellence |

---

## Three projects (Brands section)
| Project | Description | Tags | Link |
|---------|-------------|------|------|
| Flow | Strategy and operations consulting for organizations unlocking AI — sovereign wealth funds, financial institutions, and tech companies navigating what comes next. | Strategy · Operations · AI Implementation | udsskdlk.gensparkspace.com |
| North | Financial education platform built around behavioral change, not just financial knowledge. | Personal Finance · Behavioral Change | findyournorth.net |
| Stride | AI workflow academy built from 150+ real-world use cases. | AI Workflows · Prompting · Productivity | Coming soon |

---

## Recognition
- **2023–24:** 2 Teaching Excellence Awards — IE University
- **2024–25:** 3 Teaching Excellence Awards — IE University
- PDFs: `/public/recognition/award-2024.pdf`, `diploma-2024.pdf`, `award-2025.pdf`, `diploma-2025.pdf`
- Carousel: 12 testimonials (Astrid Thornberry/Amazon, Anuja Bhatnagar/JPMorgan, Agil Zakariya/P&G, etc.)

---

## Videos
- **Finance Session Samples** (Vimeo, vumbnail.com thumbnails):
  - Time Value of Money: `vimeo.com/1175592384`
  - Working Capital: `vimeo.com/1175592202`
  - Dynamic Valuation: `vimeo.com/1175592624?v=2` (cache-busted)
  - Sources of Corporate Financing: `vimeo.com/1175592738?v=2` (cache-busted)
- **Intro video:** YouTube lightbox (`openIntroVideo()`)
- **AI tab:** Vimeo embeds via `playAiVideo()`
- **Videos folder excluded from git** (`videos/` in .gitignore — MP4s exceed GitHub 100MB limit)

---

## Key JS window functions
| Function | Purpose |
|----------|---------|
| `switchTab(tab)` | Work section tab switching |
| `openIntroVideo()` | Hero intro video lightbox |
| `playAiVideo(key, vid)` | AI tab video player |
| `toggleJourney(id)` | Capital Markets accordion |
| `toggleAward(year)` | Recognition award panel expand/collapse |
| `selectEngagement(val, btn)` | Contact form engagement type pill selector |
| `carouselPrev/Next()` | Testimonial carousel navigation |

---

## Contact form engagement types
- Teaching / Course Design
- Strategy & Consulting
- AI Implementation
- Something else

Fields: engagement type (pill selector) → Name → Email → Organization → Message ("What's the challenge you're trying to solve?")

---

## Next session priorities
- [ ] **Stage photos** — Arseniy to send best on-stage photos → incorporate into page (speaking section or replace cinematic break)
- [ ] **LinkedIn redesign** — screenshot-style cards (avatar, name, snippet, engagement count, click to open)
- [ ] **Hero headline** — reconcile "Three Disciplines" with Finance / AI / Education framing
- [ ] **"Professor · Consultant · Entrepreneur"** — consider adding to hero as descriptor
- [ ] **Headshot** — current hero.jpg is pre-beard; update when a powerful photo is available
- [ ] **Vimeo thumbnails** — verify ?v=2 cache-bust worked for videos 3 & 4
