# Content inventory — arseniygoldberg.com

Source of truth for the rebuild. Everything the site says, everything it's missing,
and everything waiting on Arseniy. Last audit: 2026-08-18.
Site last shipped 2026-05-25, so anything after that date is absent.

---

## 1. Corrections needed on the live site

**Baird.** The page says "Taught from the trading desk, not the textbook. Six years at
Baird managing $1.6B," dated 2014–2020, while the bio says five years. The corrected
record (nyc-job-search, 2026-08-13): Portland, Oregon, Jul 2015 – Dec 2019. Internal
title Client Specialist. Ran two practices, a corporate investment advisory book and a
private wealth book. Investment committee for 4 private and 40+ corporate portfolios.
$1.6B AUM, $1.5M recurring revenue, practice up 50%, 11 C-suite relationships at 97%
retention. Position as portfolio manager and institutional relationship owner. Never a
trading desk.

**Job title.** Bio says "Academic Director of AI-Powered Finance." CLAUDE.md says
"Academic Director of AI in Finance Initiatives." One is wrong — needs confirming.

**Footer.** Reads © 2025.

**Brands section.** Says "Two projects" and lists Flow and North. Stride exists
(`/Users/arsen1/Stride/`, with branding assets and a context file) and is absent.

**Flow's link** points to `udsskdlk.gensparkspace.com`. Flagged as a brand problem in
May, still live.

**Geography.** The site says 5+ continents and never says where he is now. New York
appears zero times.

---

## 2. What's on the site now

**Hero** — "12 Years. 5 Continents. One Obsession." / "What drives human decisions." /
chips: Finance, AI, Education / photo `/hero.jpg` (pre-beard) / 55-second intro video.

**Stats, 5×5** — 100+ Independent Projects · 70+ Institutions Reached · 300+ Sessions
Delivered · 5 Teaching Excellence Awards · 15+ Courses Designed · 5 Ventures Launched ·
4 Innovation Programs · 5+ Continents · 3 Languages (EN·RU·ES) · $1.6B AUM Managed.

**Bio** — three paragraphs, first person.

**The Journey** — two-panel toggle. Finance (2014–2020) and Entrepreneurship (2020–Now,
the BUILD / ADVISE / TEACH triad).

**The Work** — two panels, each with three sub-tabs.

| Panel | Sub-tab | Courses | Digital assets |
|---|---|---|---|
| Classroom | Finance | Capital Markets (flagship), Corporate Finance, Financial Consulting, AI-Powered Finance, Financial Markets & Fintech, Advanced Financial Management | Capital Markets Hub (22 activities) · 4 Vimeo sessions · 4 Claude valuation tutors |
| Classroom | Entrepreneurship | Entrepreneurial Journey (flagship), Design Thinking, Customer Experience, Ideation & Validation, AI as a Cofounder, Business & Financial Model Design | 4 Vimeo sessions |
| Classroom | Behavioral Sciences | Critical Skills for the Modern World (flagship), Critical Thinking, Decision Making, Financial Behavior, Human & Machine Intelligence, Flow Financial Behavior Series | 2 custom GPTs · The War Room (Claude artifact) |
| Field | Innovation Programs | RCU Scale-up Hub (Saudi), SABAH Hub (Azerbaijan), Changemakers (Switzerland), Science Connexion & Blue Lab (Mexico) | Zawya article · 2 PDF decks |
| Field | AI in Practice | 6 tools | 4 Vimeo walkthroughs · 4 Perplexity apps · Delta Dossier |
| Field | Digital Courses | 3 Rebundle WhatsApp courses (MAIA, DIANA, ELIZA) | 3 Vimeo embeds |

**Clients** — 42 logos. **Recognition** — 4 award PDFs (2024, 2025) + 18 testimonials
tagged Teaching / Consulting / Advisory / Mentorship.

**LinkedIn** — ~70 posts across 4 tabs: Top Posts, Human Behavior, Finance,
Entrepreneurship. Newest is from early 2026.

**Work With Me** — 4 cards: University/Business School, Company/Executive Team,
Startup/Founder, Event/Conference. **Contact** — Formspree, engagement-type selector.

**Cinematic breaks** — baird-team.jpg, speaking.jpg (Saudi Ministry of Finance),
baku-stage.jpg, lecture-hall.jpg (Baku).

---

## 3. Missing: work done since May 2026

None of this appears on the site.

| Work | What it is | Assets that exist |
|---|---|---|
| Business Applications of AI (BAAI) | IE NYC course. 12 teams, 40 students. Two graded labs, weekly AI Toolkit, PRD-driven Week 3 | Notion toolkit page, lab kits, grading workbooks |
| Santander Innovators 90 (SI90) | 90-participant program, bilingual | AI Toolkit Notion page · Discovery Agent (`~/si90-discovery-agent`) · Gate Check (`https://si90-gate-check.onrender.com`) |
| AI Agents in Finance | IE × bank. 15 students, real bank problems, working agent prototypes | Named in CLAUDE.md as active |
| Oregon State | Professor + Advisory Board, Career Services | Logo already in the grid |
| Critical Thinking in the Age of AI | Professor group rethinking teaching frameworks | — |
| Efecto Mariposa | Finance academy for women, Claude-in-Excel demo | Synthetic statement, Spanish Notion page |
| DP World finance program | `~/dp-world-finance-program/index.html` | Built, unlinked |
| Open Table Now · SoHo | Class demo prototype | `~/soho-tables` |
| Capital markets dashboard | Live market data for teaching | Linked as `/capital-markets` |

---

## 4. Assets on the machine, unused

- **Stage photos** — 51 files in `stage photos/`, 5 in use. The strongest unused one is
  `WhatsApp Image 2024-07-23 at 12.17.23.jpeg` (microphone, Financial Leaders Program
  banner), flagged as the best single photo back in March and still not on the page.
  Also `pif photo.jpeg` (IE-PIF, "AI in Practice by Arseniy Goldberg" on screen) and
  `IE Andrea Prencipe visit group photo.jpeg`.
- **Videos** — `videos/` holds MAIA, DIANA, ELIZA and a full IE electives recording
  (Financial Markets and Fintech, with Alejandra Dito). Folder is gitignored; MP4s
  exceed GitHub's limit. The electives recording is not published anywhere.
- **Resume** — `~/nyc-career-search/Arseniy_Goldberg_Resume_August_2026.pdf`. The site
  has no CV or resume download at all.
- **Innovation Programs** — two PDFs already copied to `/public`, both linked.

---

## 5. Answered 2026-08-18

1. **Title confirmed:** Academic Director of AI-Powered Finance. The bio on the site is
   correct. CLAUDE.md is the file that's wrong.
   Program: https://www.ie.edu/lifelong-learning/programs/ai-powered-finance/
2. **Purpose:** the site serves the New York search and the next phase of his career.
   Baird correction, geography, and a resume download all follow from this.
3. **Stride:** leave off. Still developing, and the shape is changing to consulting-led
   with explanatory video underneath.
4. **Flow:** landing page still on Genspark, to be rebuilt from scratch. Important
   structural change: Flow becomes general consulting and stays open. The AI advising,
   consulting, and implementation work moves to a **separate brand, not yet named**,
   with its own positioning and digital assets. The current Flow copy on the site
   describes it as AI consulting, which will be wrong once this splits.
5. **Santander:** cleared. No NDA. Logo goes in the client grid, plus a demo of the app
   built for the program.
6. **Headshot:** new event photos with beard exist, Arseniy to supply.
7. **Artifacts:** all Perplexity apps and Claude artifacts stay public.

## 6. Still open

- The new AI advisory brand has no name yet. This gates the Brands section and arguably
  the whole rebuild.
- Which app from the Santander program to show, and where it's hosted.
- The beard photos need to land in `/public`.
