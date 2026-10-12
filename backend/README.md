# Backend (Node.js + Express + TypeScript + Prisma + PostgreSQL)

## Ishga tushirish

```bash
# 1) PostgreSQL (root papkadan)
docker compose up -d            # port 5434

# 2) backend/
cp .env.example .env            # (.env gitga chiqmaydi)
npm install
npx prisma migrate deploy       # yoki: npm run prisma:migrate (dev)
npm run seed                    # dissertatsiyadan olingan kontent
npm run dev                     # http://localhost:4000
```

Admin/o'qituvchi login-paroli backend/.env ichidagi TEACHER_USERNAME, TEACHER_PASSWORD, TEACHER_NAME orqali sozlanadi. Ularni serverni ishga tushirishdan oldin to'ldiring. Backend har ishga tushganda hisobni yaratadi yoki parolini yangilaydi. Ishlayotgan server uchun npm run teacher:create ham shu sozlamalarni qo'llaydi. Kirish: /login, panel: /teacher.

O'quvchilar /register orqali o'zlari hisob ochadi; registratsiya faqat STUDENT rolini beradi.

Skriptlar: `dev`, `build`, `start`, `typecheck`, `seed`, `seed:verify <diss.txt>` (manba satrlari dissertatsiya matnida aynan borligini tekshiradi), `smoke` (API smoke test; avval `npm run seed`).

## Tuzilma

`src/modules/<modul>/{routes,controller,service,repository,schema}`, umumiy: `src/lib` (errors, scoring, crud helper), `src/middlewares` (auth/role, validate, upload, rate-limit, error). Prisma sxema: `prisma/schema.prisma`; seed: `prisma/seed/*` (har bir ma'lumot fayli alohida).

## Kontraktga kiritilgan KENGAYTIRISHLAR (`docs/CONTRACT.md` ni buzmaydi)

- Period: ro'yxatda `_count:{thinkers,sources}`; `startYear/endYear` `null` bo'lishi mumkin (Oltin O'rda uchun dissertatsiya aniq yil bermagan).
- Thinker ro'yxati: `_count:{values,works}`, `period` qisqa ma'lumoti. Thinker/Value/Source/Activity/Period/Comparison/Timeline: `reviewStatus`.
- Source: `dissertationNote` (muallif talqini), `valueIds`; Timeline: `sourceRef` (dissertatsiya havolasi).
- Activity: `modernExample` (THOUGHT_ANALYSIS uchun, faqat attempt javobida va teacher'ga); attempt javobida qo'shimcha `chosenExplanation`. `POST /activities/:id/attempt` faqat STUDENT.
- Test ro'yxati: `questionCount`, `lastPercent` (talabaning oxirgi natijasi yoki null). Test/diagnostika `submit` faqat STUDENT. Javob berilmagan savollar noto'g'ri hisoblanadi.
- Diagnostika ro'yxati: `questionCount`.
- `GET /results/me` faqat STUDENT; qo'shimcha `criterionGrowth:{initial,final}` (boshlang'ich vs yakuniy mezonlar bo'yicha), `level` natija yo'q bo'lsa `null`, `average` = test + diagnostika foizlari o'rtachasi.
- `GET /students` qo'shimcha: `testsCompleted, averagePercent, initialPercent, finalPercent, delta`.
- Analytics filtrlari: `classLevel, studentId, testId, criterion, kind(TEST|INITIAL|FINAL)`. `by-criterion` qatorlari: `{criterion, overall, tests, initial, final, delta}`; `diagnostic-growth`: `{students:[...], summary:{paired,initialAverage,finalAverage,deltaAverage}}`; `levels`: `{overall,tests,initial,final}`.
- `GET /api/health`.
- Ixtiyoriy daraja chegaralari: `GET/PUT /api/settings/levels` (boshlang'ich 80/60 — **dissertatsiyada ko'rsatilmagan, taxminiy**; `LOW` doim 0).
