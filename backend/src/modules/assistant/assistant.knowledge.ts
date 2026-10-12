import { prisma } from '../../config/prisma';

type Lang = 'uz' | 'kaa';

const TTL_MS = 10 * 60_000;
/** Bitta tilda to'plangan bilim bazasi uchun yuqori chegara (belgi). Gemini kontekstidan ancha kichik. */
const MAX_CHARS = 180_000;

const cache = new Map<Lang, { at: number; text: string }>();

/** {uz, kaa} ko'rinishidagi Json maydonidan tanlangan tildagi (yo'q bo'lsa ikkinchi) matnni oladi. */
const lt = (v: unknown, lang: Lang): string => {
  if (typeof v === 'string') return v.trim();
  if (!v || typeof v !== 'object') return '';
  const o = v as Record<string, unknown>;
  const other: Lang = lang === 'uz' ? 'kaa' : 'uz';
  for (const k of [lang, other]) {
    const x = o[k];
    if (typeof x === 'string' && x.trim()) return x.trim();
  }
  return '';
};

const years = (a?: number | null, b?: number | null): string => (a || b ? ` (${a ?? '?'}–${b ?? '?'})` : '');
const line = (label: string, v: string): string => (v ? `${label}: ${v}\n` : '');

async function build(lang: Lang): Promise<string> {
  const [periods, thinkers, values, sources, timeline, comparisons, tests, activities] = await Promise.all([
    prisma.period.findMany({ orderBy: { order: 'asc' } }),
    prisma.thinker.findMany({ include: { period: { select: { name: true } } }, orderBy: { createdAt: 'asc' } }),
    prisma.educationalValue.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.source.findMany({
      include: { period: { select: { name: true } }, thinker: { select: { name: true } } },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.timelineEvent.findMany({ orderBy: [{ order: 'asc' }, { year: 'asc' }] }),
    prisma.comparisonEntry.findMany({ orderBy: { order: 'asc' } }),
    prisma.test.findMany({ select: { title: true, description: true, _count: { select: { questions: true } } } }),
    prisma.activity.findMany({ select: { type: true, title: true } }),
  ]);

  const parts: string[] = [];

  parts.push('## TARIXIY DAVRLAR');
  for (const p of periods) {
    parts.push(
      `### ${lt(p.name, lang)}${years(p.startYear, p.endYear)}\n` +
        line('Qisqacha', lt(p.shortDescription, lang)) +
        line('Batafsil', lt(p.content, lang)),
    );
  }

  parts.push('## MUTAFAKKIRLAR');
  for (const t of thinkers) {
    parts.push(
      `### ${t.name}${years(t.birthYear, t.deathYear)} — davr: ${lt(t.period.name, lang)}\n` +
        line('Tarjimai hol', lt(t.biography, lang)) +
        line("Asosiy g'oyalar", lt(t.mainIdeas, lang)) +
        line('Tarbiyaviy qarashlar', lt(t.educationalViews, lang)) +
        line('Bugungi ahamiyati', lt(t.modernImportance, lang)),
    );
  }

  parts.push("## TA'LIMIY-TARBIYAVIY QADRIYATLAR");
  for (const v of values) {
    parts.push(
      `### ${lt(v.name, lang)} (${v.category})\n` +
        line('Mazmuni', lt(v.description, lang)) +
        line('Zamonaviy talqin', lt(v.modernInterpretation, lang)),
    );
  }

  parts.push('## MANBALAR');
  for (const s of sources) {
    parts.push(
      `### ${lt(s.title, lang)} [${s.type}] — davr: ${lt(s.period.name, lang)}${s.thinker ? `, muallif/mutafakkir: ${s.thinker.name}` : ''}\n` +
        line('Parcha', s.excerpt.trim()) +
        line('Tavsif', lt(s.description, lang)) +
        line("Ta'limiy ma'nosi", lt(s.educationalMeaning, lang)) +
        line('Dissertatsiya izohi', lt(s.dissertationNote, lang)) +
        line('Havola', s.reference.trim()),
    );
  }

  parts.push('## XRONOLOGIYA');
  for (const e of timeline) {
    parts.push(`- ${e.yearLabel ?? e.year ?? ''} [${e.kind}] ${lt(e.title, lang)}: ${lt(e.description, lang)}`);
  }

  parts.push("## TAQQOSLASH: OLTIN O'RDA VA NO'G'AY DAVRI");
  for (const c of comparisons) {
    parts.push(
      `### ${lt(c.aspect, lang)}\n` +
        line("Oltin O'rda", lt(c.goldenHorde, lang)) +
        line("No'g'ay davri", lt(c.nogai, lang)) +
        line("O'xshashlik", lt(c.similarity, lang)) +
        line('Farq', lt(c.difference, lang)),
    );
  }

  parts.push('## TESTLAR VA TOPSHIRIQLAR');
  for (const t of tests) parts.push(`- Test: ${lt(t.title, lang)} (${t._count.questions} savol) — ${lt(t.description, lang)}`);
  for (const a of activities) parts.push(`- Topshiriq [${a.type}]: ${lt(a.title, lang)}`);

  const text = parts.join('\n\n');
  return text.length > MAX_CHARS ? `${text.slice(0, MAX_CHARS)}\n[...qisqartirildi]` : text;
}

/** Platforma kontentidan matnli bilim bazasi (har til uchun 10 daqiqa keshlanadi). */
export async function getKnowledge(lang: Lang): Promise<string> {
  const hit = cache.get(lang);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.text;
  const text = await build(lang);
  cache.set(lang, { at: Date.now(), text });
  return text;
}
