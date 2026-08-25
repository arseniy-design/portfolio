import lessons from '../data/lessons.json';

/**
 * Lesson metadata only. Kept separate from `retrieve.ts` on purpose: the page
 * needs names, runtimes and thumbnails, while the 491-passage search corpus and
 * its index are only ever needed by the tutor API route. Importing them into the
 * page would drag ~590KB into the render bundle and rebuild the index on every
 * cold start for nothing.
 */
export type Lesson = {
  n: number;
  name: string;
  section: string;
  order: number;
  kind: string;
  vid: string | null;
  runtime: number;
  words: number;
  prereqs: { lesson: string; concepts: string[]; weight: number }[];
  slides: number;
  thumb?: string;
};

export const LESSONS = lessons as Lesson[];

const BY_NAME = new Map(LESSONS.map((l) => [l.name, l]));
export const lessonByName = (n: string) => BY_NAME.get(n);

export const SPINE = [
  { key: '1. Introduction to Accounting', verb: 'Record it', blurb: 'Where the numbers come from' },
  { key: '2. From Accounting to Taxation', verb: 'Tax it', blurb: 'What the state takes' },
  { key: '3. Analysis of Financial Statements', verb: 'Read it', blurb: 'What the numbers say' },
  { key: '4. Investments & Company Assessment', verb: 'Value it', blurb: 'What a business is worth' },
  { key: '5. Sources of Financing', verb: 'Fund it', blurb: 'Where the money comes from' },
  { key: '6. Wallbox Chargers Case', verb: 'Do it', blurb: 'One real company, end to end' },
];
