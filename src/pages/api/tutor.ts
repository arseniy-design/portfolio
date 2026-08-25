import type { APIRoute } from 'astro';
import { search, prereqsFor, lessonByName, LESSONS } from '../../lib/retrieve';

export const prerender = false;

const MODEL = 'claude-opus-5';
const MAX_QUESTION = 400;

// Crude per-IP throttle. The page is unlisted, so this only has to stop a
// forwarded link from being hammered — not survive a real attack.
const RATE = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (RATE.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  RATE.set(ip, hits);
  if (RATE.size > 500) for (const [k, v] of RATE) if (!v.some((t) => now - t < WINDOW_MS)) RATE.delete(k);
  return hits.length > MAX_PER_WINDOW;
}

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const SYSTEM = `You are the tutor for a finance and accounting course taught by Arseniy Goldberg: 47 video lessons recorded for ThePowerMBA, covering accounting through valuation and financing.

You answer ONLY from the passages given to you. They are transcripts of what Arseniy actually said on camera.

Rules:
1. Never state a fact that is not in the passages. If the passages do not answer the question, say so plainly and name the closest lesson.
2. Every substantive claim must be traceable to a passage you were given.
3. Write the way he teaches: direct, concrete, second person, short sentences. No preamble, no "great question", no summary paragraph at the end.
4. Never invent a lesson name or a timestamp. Use only the ones supplied.
5. Two to five sentences for "answer". This is a pointer into a video, not a replacement for it.

The learner's real problem is usually that they cannot see how the pieces connect. When prerequisites are supplied, "underneath" should say what they actually need to understand first and why it makes this question hard — one sentence, in plain language. Leave it null when nothing is supplied.`;

const SCHEMA = {
  type: 'json_schema',
  schema: {
    type: 'object',
    properties: {
      answer: { type: 'string' },
      cite: {
        type: 'object',
        properties: {
          lesson: { type: 'string' },
          seconds: { type: 'number' },
        },
        required: ['lesson', 'seconds'],
        additionalProperties: false,
      },
      underneath: { type: ['string', 'null'] },
      answered: { type: 'boolean' },
    },
    required: ['answer', 'cite', 'underneath', 'answered'],
    additionalProperties: false,
  },
} as const;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

  const key = import.meta.env.ANTHROPIC_API_KEY;
  if (!key) return json({ error: 'The tutor is not configured yet.' }, 503);

  if (rateLimited(clientAddress ?? 'unknown'))
    return json({ error: 'Too many questions at once. Give it a minute.' }, 429);

  let question = '';
  try {
    question = String(((await request.json()) as { question?: string }).question ?? '').trim();
  } catch {
    return json({ error: 'Bad request.' }, 400);
  }
  if (question.length < 3) return json({ error: 'Ask a longer question.' }, 400);
  question = question.slice(0, MAX_QUESTION);

  const hits = search(question, 8);
  if (!hits.length)
    return json({
      answered: false,
      answer: "Nothing in the course covers that. It runs from bookkeeping through valuation and financing, so try something inside that range.",
      cite: null,
      underneath: null,
      sources: [],
      prereqs: [],
    });

  const prereqs = prereqsFor(hits);

  const passages = hits
    .map(
      (h, i) =>
        `[${i + 1}] lesson: "${h.lesson}" | section: ${h.section} | timestamp: ${h.t} seconds (${clock(h.t)})\n${h.text}`
    )
    .join('\n\n');

  const prereqBlock = prereqs.length
    ? `\n\nPREREQUISITES the course itself establishes for these lessons (drawn from moments where Arseniy points back to earlier material):\n` +
      prereqs.map((p) => `- "${p.lesson}"${p.concepts.length ? ` — ${p.concepts.join('; ')}` : ''}`).join('\n')
    : '';

  const body = {
    model: MODEL,
    max_tokens: 1200,
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    output_config: { format: SCHEMA, effort: 'medium' },
    messages: [
      {
        role: 'user',
        content: `QUESTION: ${question}\n\nPASSAGES:\n\n${passages}${prereqBlock}\n\nAnswer from the passages. "cite" must name one of the lessons above and a timestamp in seconds drawn from that lesson's passage.`,
      },
    ],
  };

  let data: any;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(60_000),
    });
    data = await res.json();
    if (data?.type === 'error') return json({ error: 'The tutor is having a moment. Try again.' }, 502);
  } catch {
    return json({ error: 'The tutor timed out. Try again.' }, 504);
  }

  let out: any;
  try {
    out = JSON.parse(data.content.find((b: any) => b.type === 'text').text);
  } catch {
    return json({ error: 'The tutor returned something unreadable.' }, 502);
  }

  // Trust nothing about the citation — resolve it against real data or drop it.
  let cite = null;
  const cited = lessonByName(out.cite?.lesson);
  if (cited?.vid && cited.kind === 'lesson') {
    const within = hits.filter((h) => h.lesson === cited.name);
    const claimed = Number(out.cite.seconds);
    const seconds =
      within.some((h) => Math.abs(h.t - claimed) < 90) && claimed >= 0 && claimed <= cited.runtime
        ? Math.floor(claimed)
        : Math.floor(within[0]?.t ?? 0);
    cite = {
      lesson: cited.name,
      section: cited.section,
      vid: cited.vid,
      thumb: cited.thumb ?? null,
      runtime: cited.runtime,
      seconds,
      clock: clock(seconds),
    };
  }

  return json({
    answered: Boolean(out.answered) && Boolean(cite),
    answer: String(out.answer ?? ''),
    underneath: out.underneath ?? null,
    cite,
    prereqs: prereqs.map((p) => ({ ...p, section: lessonByName(p.lesson)?.section ?? null })),
    sources: hits.map((h) => ({
      lesson: h.lesson,
      section: h.section,
      vid: h.vid,
      seconds: Math.floor(h.t),
      clock: clock(h.t),
      score: Math.round(h.score * 10) / 10,
      preview: h.text.slice(0, 240),
    })),
    total: LESSONS.filter((l) => l.vid && l.kind === 'lesson').length,
  });
};
