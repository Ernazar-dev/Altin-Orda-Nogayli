/* API smoke test: npm run smoke. Uses configured teacher and registers a fresh test student. */
import 'dotenv/config';
const BASE = process.env.API_URL ?? 'http://localhost:4000';
const TEACHER_PASSWORD = process.env.TEACHER_PASSWORD ?? '';
const TEACHER_USERNAME = process.env.TEACHER_USERNAME ?? '';
if (!TEACHER_PASSWORD || !TEACHER_USERNAME) throw new Error('TEACHER_USERNAME and TEACHER_PASSWORD are required.');
const studentUsername = 'qa' + Date.now();
const studentPassword = 'Test-' + crypto.randomUUID();

interface Res<T = unknown> {
  status: number;
  body: { data?: T; error?: { code: string; message: string } } & Record<string, unknown>;
}

let failed = 0;
const check = (name: string, ok: boolean, extra = ''): void => {
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  -> ' + extra : ''}`);
};

async function call<T = any>(method: string, path: string, token?: string, body?: unknown): Promise<Res<T>> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let parsed: Res<T>['body'] = {};
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { raw: text } as never;
  }
  return { status: res.status, body: parsed };
}

async function main(): Promise<void> {
  const tl = await call('POST', '/api/auth/login', undefined, { username: TEACHER_USERNAME, password: TEACHER_PASSWORD });
  check('teacher login', tl.status === 200 && !!tl.body.data?.token);
  const T: string = tl.body.data.token;
  const sl = await call('POST', '/api/auth/register', undefined, { fullName: 'QA Student', username: studentUsername, password: studentPassword, classLevel: 6 });
  check('student registration', sl.status === 201);
  const S: string = sl.body.data.token;
  const bad = await call('POST', '/api/auth/login', undefined, { username: studentUsername, password: 'wrong-pass' });
  check('wrong password -> 401', bad.status === 401);

  const username = `smoke${Date.now()}`;
  const reg = await call('POST', '/api/auth/register', undefined, { fullName: 'Smoke Student', username, password: 'Passw0rd!x', classLevel: 7 });
  check('register student', reg.status === 201 && reg.body.data.user.role === 'STUDENT');
  const regBad = await call('POST', '/api/auth/register', undefined, { fullName: 'x', username: 'x!', password: '1' });
  check('register validation -> 400', regBad.status === 400);
  const regT = await call('POST', '/api/auth/register', undefined, { fullName: 'Smoke Teacher', username: `t${username}`, password: 'Passw0rd!x' });
  check('register always creates a student (no invite code)', regT.body.data?.user.role === 'STUDENT');
  const me = await call('GET', '/api/auth/me', S);
  check('GET /auth/me', me.body.data?.username === studentUsername);
  check('no token -> 401', (await call('GET', '/api/periods')).status === 401);

  const periods = await call('GET', '/api/periods', S);
  check('GET periods', periods.body.data.length === 2);
  const p1 = periods.body.data[0];
  const pd = await call('GET', `/api/periods/${p1.id}`, S);
  check('GET period detail has thinkers+sources', Array.isArray(pd.body.data.thinkers) && Array.isArray(pd.body.data.sources));
  const thinkers = await call('GET', '/api/thinkers', S);
  check('GET thinkers', thinkers.body.data.length === 4);
  const asan = thinkers.body.data.find((t: any) => t.name.includes('Asan'));
  const td = await call('GET', `/api/thinkers/${asan.id}`, S);
  check('thinker detail values+works', td.body.data.values.length >= 8 && td.body.data.works.length >= 8);
  check('thinkers?periodId filter', (await call('GET', `/api/thinkers?periodId=${p1.id}`, S)).body.data.length === 1);
  const values = await call('GET', '/api/values', S);
  check('GET values', values.body.data.length >= 12);
  const vd = await call('GET', `/api/values/${values.body.data[0].id}`, S);
  check('value detail thinkers+sources', Array.isArray(vd.body.data.thinkers) && Array.isArray(vd.body.data.sources));
  const srcs = await call('GET', '/api/sources', S);
  check('GET sources', srcs.body.data.length >= 25 && Array.isArray(srcs.body.data[0].valueIds));
  check('sources?type=DOSTON', (await call('GET', '/api/sources?type=DOSTON', S)).body.data.length >= 1);
  check('sources?valueId', (await call('GET', `/api/sources?valueId=${values.body.data[0].id}`, S)).body.data.length >= 1);
  check('timeline', (await call('GET', '/api/timeline', S)).body.data.length >= 15);
  check('comparisons', (await call('GET', '/api/comparisons', S)).body.data.length >= 6);

  // CRUD (teacher)
  const created = await call('POST', '/api/periods', T, {
    name: { uz: 'Sinov davr', kaa: 'Sınaq dáwir' }, shortDescription: { uz: 'a', kaa: 'a' }, content: { uz: 'b', kaa: 'b' }, order: 99,
  });
  check('teacher create period', created.status === 201);
  check('student create period -> 403', (await call('POST', '/api/periods', S, { name: { uz: 'x', kaa: 'x' } })).status === 403);
  const upd = await call('PUT', `/api/periods/${created.body.data.id}`, T, { order: 98 });
  check('teacher update period', upd.body.data?.order === 98);
  check('teacher delete period', (await call('DELETE', `/api/periods/${created.body.data.id}`, T)).status === 200);
  check('deleted period -> 404', (await call('GET', `/api/periods/${created.body.data.id}`, T)).status === 404);
  const delRestrict = await call('DELETE', `/api/periods/${p1.id}`, T);
  check('delete period with children -> 409', delRestrict.status === 409);

  const nv = await call('POST', `/api/thinkers/${asan.id}/values`, T, { valueId: values.body.data.find((v: any) => v.name.uz.startsWith('Estetik')).id, description: { uz: 'sinov', kaa: 'sınaq' } });
  check('link thinker-value', nv.status === 201);
  const un = await call('DELETE', `/api/thinkers/${asan.id}/values/${nv.body.data.valueId}`, T);
  check('unlink thinker-value', un.status === 200);

  // Activities
  const acts = await call('GET', '/api/activities', S);
  check('GET activities >= 20', acts.body.data.length >= 20);
  check('student does not see isCorrect', acts.body.data[0].options.every((o: any) => o.isCorrect === undefined));
  const tAct = await call('GET', `/api/activities/${acts.body.data[0].id}`, T);
  check('teacher sees isCorrect', tAct.body.data.options.some((o: any) => o.isCorrect === true));
  const correct = tAct.body.data.options.find((o: any) => o.isCorrect);
  const wrong = tAct.body.data.options.find((o: any) => !o.isCorrect);
  const att1 = await call('POST', `/api/activities/${acts.body.data[0].id}/attempt`, S, { optionId: wrong.id });
  check('attempt wrong -> isCorrect false', att1.body.data.isCorrect === false && att1.body.data.correctOptionId === correct.id);
  const att2 = await call('POST', `/api/activities/${acts.body.data[0].id}/attempt`, S, { optionId: correct.id });
  check('attempt correct', att2.body.data.isCorrect === true && !!att2.body.data.explanation);
  check('attempt bad option -> 400', (await call('POST', `/api/activities/${acts.body.data[0].id}/attempt`, S, { optionId: 'zzz' })).status === 400);
  check('activities?type=MODERN_LINK', (await call('GET', '/api/activities?type=MODERN_LINK', S)).body.data.length >= 5);
  const newAct = await call('POST', '/api/activities', T, {
    type: 'SOURCE_ANALYSIS', title: { uz: 'a', kaa: 'a' }, prompt: { uz: 'p', kaa: 'p' }, criterion: 'COGNITIVE',
    options: [{ text: { uz: '1', kaa: '1' }, isCorrect: true }, { text: { uz: '2', kaa: '2' }, isCorrect: false }],
  });
  check('teacher create activity', newAct.status === 201);
  const twoCorrect = await call('POST', '/api/activities', T, {
    type: 'SOURCE_ANALYSIS', title: { uz: 'a', kaa: 'a' }, prompt: { uz: 'p', kaa: 'p' }, criterion: 'COGNITIVE',
    options: [{ text: { uz: '1', kaa: '1' }, isCorrect: true }, { text: { uz: '2', kaa: '2' }, isCorrect: true }],
  });
  check('activity with 2 correct -> 400', twoCorrect.status === 400);
  await call('DELETE', `/api/activities/${newAct.body.data.id}`, T);

  // Diagnostics
  const dInit = await call('GET', '/api/diagnostics?kind=INITIAL', S);
  const dFinal = await call('GET', '/api/diagnostics?kind=FINAL', S);
  check('diagnostics INITIAL/FINAL exist', dInit.body.data.length === 1 && dFinal.body.data.length === 1);
  const diInit = await call('GET', `/api/diagnostics/${dInit.body.data[0].id}`, S);
  check('diagnostic 20 questions, no isCorrect', diInit.body.data.questions.length === 20 && diInit.body.data.questions[0].options[0].isCorrect === undefined);
  const diInitT = await call('GET', `/api/diagnostics/${dInit.body.data[0].id}`, T);
  const diFinalT = await call('GET', `/api/diagnostics/${dFinal.body.data[0].id}`, T);

  const answerFrom = (d: any, ratio: number) =>
    d.questions.map((q: any, i: number) => {
      const pickCorrect = i < Math.round(d.questions.length * ratio);
      const opt = q.options.find((o: any) => o.isCorrect === pickCorrect) ?? q.options[0];
      return { questionId: q.id, optionId: opt.id };
    });
  const rInit = await call('POST', `/api/diagnostics/${dInit.body.data[0].id}/submit`, S, { answers: answerFrom(diInitT.body.data, 0.55) });
  check('submit initial diagnostic ~55%', rInit.status === 201 && rInit.body.data.percent === 55, `percent=${rInit.body.data?.percent} level=${rInit.body.data?.level}`);
  check('byCriterion has 4 keys', ['AXIOLOGICAL', 'COGNITIVE', 'ACTIVITY', 'REFLECTIVE'].every((k) => rInit.body.data.byCriterion[k] !== undefined));
  const rFinal = await call('POST', `/api/diagnostics/${dFinal.body.data[0].id}/submit`, S, { answers: answerFrom(diFinalT.body.data, 0.85) });
  check('submit final diagnostic 85% -> HIGH', rFinal.body.data.percent === 85 && rFinal.body.data.level === 'HIGH', `percent=${rFinal.body.data?.percent}`);
  check('student cannot submit as teacher', (await call('POST', `/api/diagnostics/${dInit.body.data[0].id}/submit`, T, { answers: [] })).status === 403);

  // Tests
  const tests = await call('GET', '/api/tests', S);
  check('GET tests', tests.body.data.length === 3 && tests.body.data[0].questionCount === 8);
  const testT = await call('GET', `/api/tests/${tests.body.data[0].id}`, T);
  const answersT = testT.body.data.questions.map((q: any, i: number) => ({ questionId: q.id, optionId: (i < 6 ? q.options.find((o: any) => o.isCorrect) : q.options.find((o: any) => !o.isCorrect)).id }));
  const tr = await call('POST', `/api/tests/${tests.body.data[0].id}/submit`, S, { answers: answersT });
  check('submit test 6/8 = 75% MEDIUM', tr.body.data.correct === 6 && tr.body.data.total === 8 && tr.body.data.percent === 75 && tr.body.data.level === 'MEDIUM', JSON.stringify([tr.body.data?.correct, tr.body.data?.percent, tr.body.data?.level]));
  check('test result answers have correctOptionId', tr.body.data.answers.every((a: any) => !!a.correctOptionId));
  const empty = await call('POST', `/api/tests/${tests.body.data[1].id}/submit`, S, { answers: [] });
  check('submit empty answers -> 0%', empty.body.data.percent === 0 && empty.body.data.level === 'LOW');
  check('wrong question id -> 400', (await call('POST', `/api/tests/${tests.body.data[0].id}/submit`, S, { answers: [{ questionId: 'x', optionId: 'y' }] })).status === 400);

  // Progress / results
  await call('POST', '/api/progress/view', S, { entityType: 'PERIOD', entityId: p1.id });
  await call('POST', '/api/progress/view', S, { entityType: 'THINKER', entityId: asan.id });
  await call('POST', '/api/progress/view', S, { entityType: 'THINKER', entityId: asan.id });
  const rm = await call('GET', '/api/results/me', S);
  check('results/me growth +30', rm.body.data.growth?.delta === 30, JSON.stringify(rm.body.data.growth));
  check('results/me progress counts', rm.body.data.progress.thinkersViewed === 1 && rm.body.data.progress.periodsViewed === 1);
  check('results/me tests/diagnostics/activities', rm.body.data.tests.length >= 2 && rm.body.data.diagnostics.length === 2 && rm.body.data.activities.total === 1);
  check('results/me as teacher -> 403', (await call('GET', '/api/results/me', T)).status === 403);

  // Teacher: students / analytics / levels
  const studs = await call('GET', '/api/students', T);
  check('GET students', studs.body.data.length >= 2);
  const student = studs.body.data.find((s: any) => s.username === studentUsername);
  check('student summary delta', student.delta === 30 && student.initialPercent === 55 && student.finalPercent === 85);
  check('students?q=', (await call('GET', '/api/students?q=qa', T)).body.data.length >= 1);
  check('students?classLevel=7', (await call('GET', '/api/students?classLevel=7', T)).body.data.every((s: any) => s.classLevel === 7));
  check('student list as student -> 403', (await call('GET', '/api/students', S)).status === 403);
  const feed = await call('GET', '/api/results/feed?limit=20', T);
  check('GET results/feed (teacher)', feed.status === 200 && Array.isArray(feed.body.data?.items));
  check('results/feed as student -> 403', (await call('GET', '/api/results/feed', S)).status === 403);
  const sr = await call('GET', `/api/students/${student.id}/results`, T);
  check('teacher views student results', sr.body.data.growth?.delta === 30);
  const ov = await call('GET', '/api/analytics/overview', T);
  check('analytics overview', ov.body.data.students >= 2 && ov.body.data.periods === 2 && ov.body.data.diagnosticAvg.final !== null, JSON.stringify(ov.body.data));
  check('analytics by-class', (await call('GET', '/api/analytics/by-class', T)).body.data.length >= 1);
  const bc = await call('GET', '/api/analytics/by-criterion', T);
  check('analytics by-criterion 4 rows', bc.body.data.length === 4);
  check('analytics by-criterion filter', (await call('GET', '/api/analytics/by-criterion?criterion=COGNITIVE', T)).body.data.length === 1);
  check('analytics by-test', (await call('GET', '/api/analytics/by-test', T)).body.data.length >= 1);
  const gr = await call('GET', '/api/analytics/diagnostic-growth', T);
  check('analytics diagnostic-growth', gr.body.data.summary.paired >= 1 && gr.body.data.summary.deltaAverage === 30, JSON.stringify(gr.body.data.summary));
  check('analytics levels', !!(await call('GET', '/api/analytics/levels?kind=INITIAL', T)).body.data.overall);
  check('analytics filter studentId', (await call('GET', `/api/analytics/overview?studentId=${student.id}`, T)).status === 200);
  check('analytics bad query -> 400', (await call('GET', '/api/analytics/overview?classLevel=abc', T)).status === 400);
  check('analytics as student -> 403', (await call('GET', '/api/analytics/overview', S)).status === 403);
  const csvRes = await fetch(`${BASE}/api/analytics/export.csv`, { headers: { authorization: `Bearer ${T}` } });
  const csvBuf = Buffer.from(await csvRes.arrayBuffer());
  const csv = csvBuf.toString('utf8');
  check('export.csv', csvRes.status === 200 && (csvRes.headers.get('content-type') ?? '').includes('text/csv') && csv.startsWith('﻿Student,Sinf') && csv.split('\r\n').length > 3);

  const lv = await call('GET', '/api/settings/levels', S);
  check('GET settings/levels', lv.body.data.length === 3);
  check('PUT levels invalid (high<=medium) -> 400', (await call('PUT', '/api/settings/levels', T, [{ level: 'HIGH', minPercent: 50 }, { level: 'MEDIUM', minPercent: 60 }, { level: 'LOW', minPercent: 0 }])).status === 400);
  const put = await call('PUT', '/api/settings/levels', T, [{ level: 'HIGH', minPercent: 90 }, { level: 'MEDIUM', minPercent: 70 }, { level: 'LOW', minPercent: 0 }]);
  check('PUT levels valid', put.body.data.find((l: any) => l.level === 'HIGH').minPercent === 90);
  await call('PUT', '/api/settings/levels', T, [{ level: 'HIGH', minPercent: 80 }, { level: 'MEDIUM', minPercent: 60 }, { level: 'LOW', minPercent: 0 }]);

  // Upload
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
  const fd = new FormData();
  fd.append('file', new Blob([png], { type: 'image/png' }), 'a.png');
  const up = await fetch(`${BASE}/api/uploads/image`, { method: 'POST', headers: { authorization: `Bearer ${T}` }, body: fd });
  const upBody = (await up.json()) as { data?: { url: string } };
  check('upload png', up.status === 201 && !!upBody.data?.url, upBody.data?.url);
  if (upBody.data?.url) check('uploaded file served', (await fetch(`${BASE}${upBody.data.url}`)).status === 200);
  const fd2 = new FormData();
  fd2.append('file', new Blob([Buffer.from('<?php echo 1; ?>')], { type: 'image/png' }), 'evil.png');
  check('fake image (bad magic bytes) -> 400', (await fetch(`${BASE}/api/uploads/image`, { method: 'POST', headers: { authorization: `Bearer ${T}` }, body: fd2 })).status === 400);
  const fd3 = new FormData();
  fd3.append('file', new Blob([png], { type: 'image/gif' }), 'a.gif');
  check('gif mime -> 400', (await fetch(`${BASE}/api/uploads/image`, { method: 'POST', headers: { authorization: `Bearer ${T}` }, body: fd3 })).status === 400);
  const fd4 = new FormData();
  fd4.append('file', new Blob([png], { type: 'image/png' }), 'a.png');
  check('student upload -> 403', (await fetch(`${BASE}/api/uploads/image`, { method: 'POST', headers: { authorization: `Bearer ${S}` }, body: fd4 })).status === 403);

  console.log(failed === 0 ? '\nBARCHA TEKSHIRUVLAR O\'TDI' : `\nXATOLAR: ${failed}`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
