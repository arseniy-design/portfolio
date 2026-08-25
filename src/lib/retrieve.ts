import chunks from '../data/chunks.json';
import { LESSONS, lessonByName, SPINE, type Lesson } from './course';

export { LESSONS, lessonByName, SPINE };
export type { Lesson };

export type Chunk = {
  lesson: string;
  section: string;
  vid: string | null;
  kind: string;
  t: number;
  text: string;
};

// Tests and exercises are not listed on the page, so the tutor must not cite them —
// a citation the visitor cannot find in the index reads as a broken link.
const SECTIONS = new Set(SPINE.map((s) => s.key));
export const CHUNKS = (chunks as Chunk[]).filter((c) => c.kind === 'lesson' && SECTIONS.has(c.section));

// Finance terms that a plain stemmer would split apart or under-weight.
const SYNONYMS: Record<string, string[]> = {
  pnl: ['income', 'statement', 'profit', 'loss'],
  'p&l': ['income', 'statement', 'profit', 'loss'],
  wacc: ['cost', 'capital', 'weighted', 'average'],
  npv: ['net', 'present', 'value', 'investment', 'analysis'],
  irr: ['internal', 'rate', 'return', 'investment', 'analysis'],
  roi: ['return', 'investment'],
  roe: ['return', 'equity', 'profitability'],
  roa: ['return', 'assets', 'profitability'],
  ofn: ['operational', 'funding', 'needs'],
  ebitda: ['earnings', 'operating', 'income', 'margin'],
  capex: ['capital', 'expenditure', 'investment'],
  opex: ['operating', 'expense', 'cost'],
  depreciate: ['depreciation'],
  amortization: ['depreciation'],
  liability: ['liabilities'],
  cashflow: ['cash', 'flow'],
  balancesheet: ['balance', 'sheet'],
};

const STOP = new Set(
  ('a an the and or but if of to in on for with is are was were be been am do does did i you he she it we they this that these those ' +
   'what why how when where which who whom my your his her its our their me him them not no yes so as at by from about into over under ' +
   'can could should would will shall may might must have has had get got want need know understand explain tell mean means').split(' ')
);

function tokenize(s: string): string[] {
  const raw = s
    .toLowerCase()
    .replace(/[^a-z0-9&\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const out: string[] = [];
  for (const w of raw) {
    const expanded = SYNONYMS[w];
    if (expanded) out.push(...expanded);
    if (STOP.has(w) || w.length < 3) continue;
    // crude stem: strip common plural/gerund endings so "ratios" matches "ratio"
    out.push(w.replace(/(ies)$/, 'y').replace(/(sses)$/, 'ss').replace(/([^s])s$/, '$1'));
  }
  return out;
}

// --- BM25 index, built once at module load (491 chunks, negligible cost) ---
const K1 = 1.4;
const B = 0.75;

const docs = CHUNKS.map((c) => tokenize(`${c.lesson} ${c.text}`));
const docLen = docs.map((d) => d.length);
const avgLen = docLen.reduce((a, b) => a + b, 0) / docLen.length;

const df = new Map<string, number>();
docs.forEach((d) => {
  for (const t of new Set(d)) df.set(t, (df.get(t) ?? 0) + 1);
});

const tf: Map<string, number>[] = docs.map((d) => {
  const m = new Map<string, number>();
  for (const t of d) m.set(t, (m.get(t) ?? 0) + 1);
  return m;
});

const N = docs.length;
const idf = (term: string) => {
  const n = df.get(term) ?? 0;
  return Math.log(1 + (N - n + 0.5) / (n + 0.5));
};

export type Hit = Chunk & { score: number; index: number };

export function search(query: string, k = 8): Hit[] {
  const q = tokenize(query);
  if (!q.length) return [];

  const scores = new Float64Array(N);
  for (const term of new Set(q)) {
    const w = idf(term);
    if (w <= 0) continue;
    for (let i = 0; i < N; i++) {
      const f = tf[i].get(term);
      if (!f) continue;
      scores[i] += (w * (f * (K1 + 1))) / (f + K1 * (1 - B + (B * docLen[i]) / avgLen));
    }
  }

  // Boost a chunk when the query names its lesson outright; damp tests and
  // exercises so a recap can't outrank the lesson that actually teaches the idea.
  const qJoined = ` ${q.join(' ')} `;
  for (let i = 0; i < N; i++) {
    if (scores[i] <= 0) continue;
    const c = CHUNKS[i];
    const nameTokens = tokenize(c.lesson);
    if (nameTokens.length && nameTokens.every((t) => qJoined.includes(` ${t} `))) scores[i] *= 1.35;
  }

  const ranked = Array.from(scores, (score, index) => ({ score, index }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  // Cap at two passages per lesson so one verbose lesson can't crowd out the rest.
  const perLesson = new Map<string, number>();
  const out: Hit[] = [];
  for (const r of ranked) {
    const c = CHUNKS[r.index];
    const used = perLesson.get(c.lesson) ?? 0;
    if (used >= 2) continue;
    perLesson.set(c.lesson, used + 1);
    out.push({ ...c, score: r.score, index: r.index });
    if (out.length >= k) break;
  }
  return out;
}

/**
 * Prerequisites of the lessons a search actually hit, strongest first.
 * Only the strongest hits contribute, and tests never do — a recap touches
 * every topic in its section, so its prerequisites are noise, not signal.
 */
export function prereqsFor(hits: Hit[]) {
  const hitLessons = new Set(hits.map((h) => h.lesson));
  const top = hits.slice(0, 3);
  if (!top.length) return [];
  const best = top[0].score;

  const tally = new Map<string, { weight: number; concepts: Set<string>; from: Set<string> }>();
  for (const hit of top) {
    // A hit scoring far below the leader shouldn't drag in its own prerequisites.
    const relevance = hit.score / best;
    if (relevance < 0.7) continue;
    for (const p of lessonByName(hit.lesson)?.prereqs ?? []) {
      if (hitLessons.has(p.lesson)) continue; // already on screen
      const e = tally.get(p.lesson) ?? { weight: 0, concepts: new Set(), from: new Set() };
      e.weight += p.weight * relevance;
      p.concepts.forEach((c) => e.concepts.add(c));
      e.from.add(hit.lesson);
      tally.set(p.lesson, e);
    }
  }
  return [...tally.entries()]
    .map(([lesson, e]) => ({
      lesson,
      weight: Math.round(e.weight * 10) / 10,
      concepts: [...e.concepts].slice(0, 3),
      neededBy: [...e.from],
      vid: lessonByName(lesson)?.vid ?? null,
      thumb: lessonByName(lesson)?.thumb ?? null,
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2);
}

