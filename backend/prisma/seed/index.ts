import 'dotenv/config';
import { syncTeacher } from '../../src/modules/auth/teacher';
import { prisma as authPrisma } from '../../src/config/prisma';
import { Prisma, PrismaClient } from '@prisma/client';
import type { LText } from '../../src/lib/types';
import { activities, type AnalysisSpec, type ModernLinkSpec } from './activities.data';
import { comparisons } from './comparisons.data';
import { Registry, rotate, t } from './helpers';
import { periods } from './periods.data';
import { sources } from './sources.data';
import { sources2 } from './sources2.data';
import { diagnostics, tests, type QSeed } from './tests.data';
import { thinkers } from './thinkers.data';
import { timeline } from './timeline.data';
import { values } from './values.data';

const prisma = new PrismaClient();
const excerptOf = (content: string): string => {
  const lines = content.split('\n').filter((l) => l.trim().length > 0);
  const joined = lines.slice(0, 2).join(' / ');
  return joined.length > 240 ? `${joined.slice(0, 237)}...` : joined;
};

const concat = (a: LText, sep: string, b: LText): LText => ({
  uz: `${a.uz}${sep}${b.uz}`,
  kaa: `${a.kaa}${sep}${b.kaa}`,
});

async function reset(): Promise<void> {
  await prisma.activity.deleteMany();
  await prisma.test.deleteMany();
  await prisma.diagnostic.deleteMany();
  await prisma.comparisonEntry.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.thinkerValue.deleteMany();
  await prisma.sourceValue.deleteMany();
  await prisma.source.deleteMany();
  await prisma.thinker.deleteMany();
  await prisma.educationalValue.deleteMany();
  await prisma.period.deleteMany();
  await prisma.studentProgress.deleteMany();
}

async function main(): Promise<void> {
  // Seed butun kontentni o'chirib qayta yozadi: masofaviy (lokal bo'lmagan) bazaga faqat ochiq tasdiq bilan.
  const local = /@(localhost|127\.0\.0\.1)[:/]/.test(process.env.DATABASE_URL ?? '');
  if (!local && process.env.SEED_CONFIRM !== 'yes') {
    throw new Error('Masofaviy bazaga seed: bu kontentni qayta yozadi. Davom etish uchun SEED_CONFIRM=yes qo‘ying.');
  }
  const teacherId = (await syncTeacher()).id;
  await reset();

  for (const [level, minPercent] of [['HIGH', 80], ['MEDIUM', 60], ['LOW', 0]] as const) {
    await prisma.levelThreshold.upsert({ where: { level }, update: { minPercent }, create: { level, minPercent } });
  }

  const periodIds = new Registry<string>();
  for (const p of periods) {
    const row = await prisma.period.create({
      data: {
        name: p.name, startYear: p.startYear, endYear: p.endYear,
        shortDescription: p.shortDescription, content: p.content, order: p.order, reviewStatus: 'DRAFT',
      },
    });
    periodIds.set(p.key, row.id);
  }

  const valueIds = new Registry<string>();
  const valueNames = new Registry<LText>();
  for (const v of values) {
    const row = await prisma.educationalValue.create({
      data: {
        name: v.name, category: v.category, description: v.description,
        modernInterpretation: v.modern, reviewStatus: 'DRAFT',
      },
    });
    valueIds.set(v.key, row.id);
    valueNames.set(v.key, v.name);
  }

  const thinkerIds = new Registry<string>();
  for (const th of thinkers) {
    const row = await prisma.thinker.create({
      data: {
        name: th.name, periodId: periodIds.get(th.period), birthYear: th.birthYear, deathYear: th.deathYear,
        biography: th.biography, mainIdeas: th.mainIdeas, educationalViews: th.educationalViews,
        modernImportance: th.modernImportance, reviewStatus: 'DRAFT',
      },
    });
    thinkerIds.set(th.key, row.id);
  }

  const allSources = [...sources, ...sources2];
  const sourceIds = new Registry<string>();
  const sourceMeta = new Registry<{ title: LText; period: string; thinker?: string }>();
  for (const s of allSources) {
    const row = await prisma.source.create({
      data: {
        title: s.title, type: s.type, periodId: periodIds.get(s.period),
        thinkerId: s.thinker ? thinkerIds.get(s.thinker) : null,
        content: s.content, excerpt: excerptOf(s.content),
        description: s.description, educationalMeaning: s.educationalMeaning,
        dissertationNote: s.note, reference: s.reference, reviewStatus: 'DRAFT',
        values: { create: s.values.map((v) => ({ valueId: valueIds.get(v) })) },
      },
    });
    sourceIds.set(s.key, row.id);
    sourceMeta.set(s.key, { title: s.title, period: s.period, thinker: s.thinker });
  }

  // Mutafakkir-qadriyat: bir xil qadriyat takrorlansa tavsiflar birlashtiriladi
  for (const th of thinkers) {
    const merged = new Map<string, { desc: LText; source?: string }>();
    for (const link of th.values) {
      const prev = merged.get(link.value);
      if (!prev) merged.set(link.value, { desc: link.description, source: link.source });
      else prev.desc = concat(prev.desc, '; ', link.description);
    }
    for (const [valueKey, m] of merged) {
      await prisma.thinkerValue.create({
        data: {
          thinkerId: thinkerIds.get(th.key), valueId: valueIds.get(valueKey),
          description: m.desc, sourceId: m.source ? sourceIds.get(m.source) : null,
        },
      });
    }
  }

  // Topshiriqlar
  let aIndex = 0;
  for (const a of activities) {
    const meta = sourceMeta.get(a.source);
    const base = {
      sourceId: sourceIds.get(a.source),
      periodId: periodIds.get(meta.period),
      thinkerId: meta.thinker ? thinkerIds.get(meta.thinker) : null,
      criterion: a.criterion,
      createdById: teacherId,
      reviewStatus: 'DRAFT' as const,
    };
    if (a.kind === 'MODERN_LINK') {
      const m: ModernLinkSpec = a;
      const opts = rotate(m.situations.map((text, i) => ({ text, isCorrect: i === 0 })), aIndex % 4);
      await prisma.activity.create({
        data: {
          ...base, type: 'MODERN_LINK',
          title: concat(t("Bugungi hayot bilan bog'la | Búgingi ómir menen baylanıstır"), ' — ', meta.title),
          prompt: concat(m.thought, ' ', t("Bugungi hayotdagi qaysi vaziyat bu fikrga eng mos? | Búgingi ómirdegi qaysı jaǵday bul pikirge eń say?")),
          options: {
            create: opts.map((o, order) => ({
              text: o.text, isCorrect: o.isCorrect, order,
              explanation: o.isCorrect ? m.explanation : Prisma.DbNull,
            })),
          },
        },
      });
    } else {
      const s: AnalysisSpec = a;
      const names = [s.correct, ...s.wrong].map((k, i) => ({ text: valueNames.get(k), isCorrect: i === 0 }));
      const opts = rotate(names, aIndex % 4);
      const isSource = s.kind === 'SOURCE_ANALYSIS';
      await prisma.activity.create({
        data: {
          ...base, type: s.kind,
          title: concat(
            isSource ? t("Manbani tahlil qil | Derekti analizle") : t("Fikrni tahlil qil | Pikirdi analizle"),
            ' — ', meta.title,
          ),
          prompt: isSource
            ? t("Ushbu parchada qaysi tarbiyaviy g'oya ifodalangan? | Bul úzindide qaysı tárbiyalıq ideya ańlatılǵan?")
            : t("Bu fikr qanday tarbiyaviy qadriyatni anglatadi? | Bul pikir qanday tárbiyalıq qádiriyattı ańlatadı?"),
          modernExample: s.modern ?? Prisma.DbNull,
          options: {
            create: opts.map((o, order) => ({
              text: o.text, isCorrect: o.isCorrect, order,
              explanation: o.isCorrect ? s.explanation : Prisma.DbNull,
            })),
          },
        },
      });
    }
    aIndex += 1;
  }

  const questionRows = (qs: QSeed[], offset: number) =>
    qs.map(([criterion, q, opts], qi) => ({
      question: t(q), criterion, order: qi,
      options: {
        create: rotate(opts.map((text, i) => ({ text: t(text), isCorrect: i === 0 })), (qi + offset) % 4)
          .map((o, order) => ({ ...o, order })),
      },
    }));

  let tIndex = 0;
  for (const test of tests) {
    await prisma.test.create({
      data: {
        title: t(test.title), description: t(test.description), createdById: teacherId,
        periodId: test.period ? periodIds.get(test.period) : null,
        thinkerId: test.thinker ? thinkerIds.get(test.thinker) : null,
        questions: { create: questionRows(test.questions, tIndex) },
      },
    });
    tIndex += 1;
  }

  for (const d of diagnostics) {
    await prisma.diagnostic.create({
      data: {
        kind: d.kind, title: t(d.title),
        questions: { create: questionRows(d.questions, d.kind === 'INITIAL' ? 0 : 2) },
      },
    });
  }

  for (const c of comparisons) {
    await prisma.comparisonEntry.create({
      data: {
        aspect: c.aspect, goldenHorde: c.goldenHorde, nogai: c.nogai,
        similarity: c.similarity, difference: c.difference, sourceRef: c.sourceRef,
        order: comparisons.indexOf(c), reviewStatus: 'DRAFT',
      },
    });
  }

  let lastYear = 0;
  const withKey = timeline.map((e, i) => {
    if (e.year !== null) lastYear = e.year;
    return { e, i, key: e.kind === 'GOYA' ? 100000 + i : (e.year ?? lastYear) };
  });
  withKey.sort((a, b) => a.key - b.key || a.i - b.i);
  let order = 0;
  for (const { e } of withKey) {
    let refId: string | null = null;
    if (e.ref) {
      refId =
        e.ref.type === 'PERIOD' ? periodIds.get(e.ref.key)
        : e.ref.type === 'THINKER' ? thinkerIds.get(e.ref.key)
        : e.ref.type === 'VALUE' ? valueIds.get(e.ref.key)
        : sourceIds.get(e.ref.key);
    }
    await prisma.timelineEvent.create({
      data: {
        kind: e.kind, year: e.year, yearLabel: e.yearLabel, title: e.title, description: e.description,
        periodId: periodIds.get(e.period), refType: e.ref?.type ?? null, refId,
        sourceRef: e.sourceRef, order: order++, reviewStatus: 'DRAFT',
      },
    });
  }

  const [pc, thc, vc, sc, ac, tc, qc, dc, dqc, tlc, cc] = await Promise.all([
    prisma.period.count(), prisma.thinker.count(), prisma.educationalValue.count(), prisma.source.count(),
    prisma.activity.count(), prisma.test.count(), prisma.testQuestion.count(), prisma.diagnostic.count(),
    prisma.diagnosticQuestion.count(), prisma.timelineEvent.count(), prisma.comparisonEntry.count(),
  ]);
  console.log(
    `Seed tayyor: davr=${pc}, mutafakkir=${thc}, qadriyat=${vc}, manba=${sc}, topshiriq=${ac}, ` +
      `test=${tc} (savol=${qc}), diagnostika=${dc} (savol=${dqc}), timeline=${tlc}, taqqoslash=${cc}`,
  );
  console.log('Seed tugadi. Ustoz hisobi tayyor (login: ' + process.env.TEACHER_USERNAME + ').');
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => { await prisma.$disconnect(); await authPrisma.$disconnect(); });
