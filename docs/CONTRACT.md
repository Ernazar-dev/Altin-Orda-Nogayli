# Loyiha kontrakti (frontend <-> backend)

Platforma: "Qoraqalpoq xalqining Oltin O'rda va No'g'oyli davridagi ta'lim-tarbiyaviy fikrlari" PhD dissertatsiyasining (Reymova N.A., QDU 2026) raqamli pedagogik platformasi.
Dissertatsiya: `disertaciya/*.docx` (o'zbek kirili). Matnni ajratish: docx = zip, `word/document.xml` ichidan `</w:p>` -> yangi qator, teglarni olib tashlash (PowerShell/Node bilan; Python yo'q).

## Ilmiy qoidalar (MAJBURIY)
1. Dissertatsiyada yo'q tarixiy fakt kiritilmaydi. Yillari berilmagan shaxslarda `birthYear/deathYear = null`.
2. Uch qatlam ajratiladi: `Source.content` (asl parcha, O'ZGARTIRILMAYDI, asl kirilcha) / `dissertationNote` (muallif talqini) / `modernInterpretation` (zamonaviy talqin, UI da alohida belgi bilan).
3. Har bir manba `reference` da dissertatsiya havolasini saqlaydi (masalan `[17;119]`) va qaysi paragraf (1.2-§, 2.1-§...) ekanini ko'rsatadi.
4. Daraja chegaralari dissertatsiyada yo'q -> `LevelThreshold` jadvali, o'qituvchi sozlaydi. Boshlang'ich 80/60 vaqtincha; UI da "dissertatsiyada ko'rsatilmagan, taxminiy" yozuvi bilan.
5. Baholash mezonlari (4 ta, dissertatsiya 2-bob 7-xulosa): AXIOLOGICAL, COGNITIVE, ACTIVITY, REFLECTIVE.
6. Auditoriya: 6-7 sinf (`classLevel` 1..11 ruxsat, default 6).
7. XP/coin/level/badge/chat/forum/sertifikat YO'Q.

## Ikki tilli kontent
UI tillari: `uz` (O'zbek lotin) va `kaa` (Qoraqalpoq lotin). Tarjima qilinadigan matn maydonlari JSON: `{ "uz": "...", "kaa": "..." }` (tip `LText`). Frontend `pick(lt, lang)` bilan oladi; tanlangan til bo'sh bo'lsa ikkinchisiga qaytadi.
`LText` maydonlar: Period.{name,shortDescription,content}, Thinker.{biography,mainIdeas,educationalViews,modernImportance}, EducationalValue.{name,description,modernInterpretation}, Source.{title,description,educationalMeaning,dissertationNote}, Activity.{title,prompt}, ActivityOption.{text,explanation}, Test.{title,description}, TestQuestion.question, TestOption.text, Diagnostic.title, DiagnosticQuestion.question, DiagnosticOption.text, ComparisonEntry.*, TimelineEvent.{title,description}.
Oddiy string: Thinker.name, Source.content (asl), Source.reference.
Tarjima nusxalar `reviewStatus: DRAFT|REVIEWED` bilan belgilanadi (UI da DRAFT uchun kichik "tekshirilmagan tarjima" belgisi, ayniqsa kaa).

## Texnologiya
- Backend: Node 24, Express, TypeScript, Prisma, PostgreSQL (docker compose, port **5434**, ishlab turibdi), JWT, bcrypt, multer, Zod, helmet, cors, express-rate-limit, dotenv. Port **4000**. Qatlam: routes -> controller -> service -> repository(prisma). `any` yo'q.
- Frontend: React, Vite, TypeScript, Ant Design 5, React Router, Axios, SCSS modules, React.lazy+Suspense, Skeleton/Spin. Dev port **5173**, Vite proxy `/api` va `/uploads` -> `localhost:4000`.
- DB URL: `postgresql://altin:<POSTGRES_PASSWORD>@localhost:5434/altin_orda`
- Root'da faqat `frontend/`, `backend/` (+ `docker-compose.yml`, `docs/`, `disertaciya/`).

## Javob formati
Muvaffaqiyat: `{ "data": <T>, "meta"?: {...} }`. Xato: `{ "error": { "code": string, "message": string, "details"?: unknown } }` + HTTP status.
Auth: `Authorization: Bearer <jwt>`. JWT `{ sub: userId, role }`, 7 kun. Hamma id: `string` (cuid).

## Enumlar
Role: TEACHER | STUDENT
Criterion: AXIOLOGICAL | COGNITIVE | ACTIVITY | REFLECTIVE  (UI: Aksiologik / Kognitiv / Faoliyatli / Refleksiv)
Level: HIGH | MEDIUM | LOW (yuqori / o'rta / past)
SourceType: DOSTON | TOLGOV | RIVOYAT | TARIXIY_ASAR | OGZAKI_IJOD | ADABIY_ASAR | BOSHQA
ActivityType: SOURCE_ANALYSIS | THOUGHT_ANALYSIS | MODERN_LINK
DiagnosticKind: INITIAL | FINAL
TimelineKind: DAVR | VOQEA | MUTAFAKKIR | ASAR | GOYA
ReviewStatus: DRAFT | REVIEWED
ValueCategory: AXIOLOGICAL | INTELLECTUAL | PATRIOTIC | FAMILY | LABOR | COMMUNICATIVE | AESTHETIC | REFLECTIVE | SOCIAL

## Endpointlar (prefiks /api)
Hammasi login talab qiladi. POST/PUT/DELETE faqat TEACHER (403).

### Auth
- POST /auth/register {fullName,username(3–32: a–z 0–9 . _ -),password(min 8),classLevel?} -> {data:{token,user}}. Har doim STUDENT; ustoz hisobi `npm run teacher:create` bilan ochiladi.
- POST /auth/login {username,password} -> {data:{token,user}}
- GET /auth/me -> {data:User}   User: {id,fullName,username,role,classLevel,createdAt,updatedAt}
- GET /results/feed?kind=TEST|DIAGNOSTIC|ACTIVITY&classLevel=&q=&limit=(1–500, def 100) -> faqat TEACHER: {data:{items:[{id,kind:TEST|INITIAL|FINAL|ACTIVITY,student:{id,fullName,username,classLevel},title:LText,refId,correct,total,percent,level|null,createdAt}],totals:{tests,diagnostics,activities}}}

### Kontent (har birida GET list, GET :id, POST, PUT :id, DELETE :id)
- /periods  Period{id,name:LText,startYear,endYear,shortDescription:LText,content:LText,image?,order}; GET :id ichida thinkers[], sources[] (qisqa).
- /thinkers Thinker{id,name,periodId,period?,birthYear?,deathYear?,biography,mainIdeas,educationalViews,modernImportance,image?,reviewStatus,values:[{value,description:LText?,source?}],works:Source[]}. Filtr ?periodId=
- /values EducationalValue{id,name,description,modernInterpretation,category,thinkers:[{thinker,description?,source?}],sources:Source[]}
- /sources Source{id,title,type,periodId,thinkerId?,content,excerpt,description,educationalMeaning,dissertationNote?,reference,image?,valueIds?}. Filtr ?periodId=&thinkerId=&type=&valueId=
- POST /thinkers/:id/values {valueId,description?:LText,sourceId?}; DELETE /thinkers/:id/values/:valueId
- /activities Activity{id,type,title,prompt,sourceId?,source?,periodId?,thinkerId?,criterion,options:[{id,text,isCorrect?,explanation?}],attempted?:boolean}. Studentga GET da isCorrect/explanation berilmaydi.
  POST /activities/:id/attempt {optionId} -> {data:{isCorrect,correctOptionId,explanation:LText,modernExample?:LText}} (ball yo'q). Filtr ?type=&periodId=&thinkerId=
- /tests Test{id,title,description,periodId?,thinkerId?,questionCount,createdBy,questions?}; student uchun isCorrect yashiriladi. POST /tests/:id/submit {answers:[{questionId,optionId}]} -> {data:TestResult}
- /diagnostics Diagnostic{id,kind,title,questions}; ?kind=INITIAL|FINAL; POST /diagnostics/:id/submit {answers} -> {data:DiagnosticResult}
- /timeline TimelineEvent{id,kind,year?,yearLabel?,title,description,periodId?,refType?,refId?,order}
- /comparisons ComparisonEntry{id,aspect,goldenHorde,nogai,similarity,difference (hammasi LText),sourceRef?,order}
- POST /uploads/image (multipart `file`; jpg/jpeg/png/webp, <=5MB, MIME + magic bytes) -> {data:{url:"/uploads/xxx.webp"}}

TestResult/DiagnosticResult: {id,userId,testId|diagnosticId,kind?,correct,total,percent,level,byCriterion:{AXIOLOGICAL:{correct,total,percent}|null,...},answers:[{questionId,optionId,isCorrect,correctOptionId}],createdAt}

### Natijalar / progress
- GET /results/me -> {data:{tests:TestResult[],diagnostics:DiagnosticResult[],activities:{total,correct},growth?:{initial,final,delta},byCriterion,average,level,progress:{periodsViewed,periodsTotal,thinkersViewed,thinkersTotal,valuesViewed,valuesTotal}}}
- POST /progress/view {entityType:"PERIOD"|"THINKER"|"VALUE"|"SOURCE",entityId}
- GET /students ?classLevel=&q= ; GET /students/:id ; GET /students/:id/results (me bilan bir xil shakl)

### Sozlamalar
- GET /settings/levels -> [{level,minPercent}] ; PUT /settings/levels (teacher) (HIGH>MEDIUM>LOW=0 tekshiruv)

### Analytics (teacher). Filtr: classLevel, studentId, testId, criterion, kind
- GET /analytics/overview -> {students,periods,thinkers,values,sources,tests,testsCompleted,averagePercent,diagnosticAvg:{initial,final},levelDistribution:{HIGH,MEDIUM,LOW}}
- GET /analytics/by-class, /by-criterion, /by-test, /diagnostic-growth, /levels
- GET /analytics/export.csv (UTF-8 BOM; ustunlar: student, sinf, test/diagnostika, tur, %, daraja, 4 mezon %, sana)

## Baholash mantiqi
percent = round(correct/total*100). Mezon bo'yicha faqat shu mezonli savollar. Daraja: percent >= HIGH.minPercent -> HIGH; >= MEDIUM.minPercent -> MEDIUM; aks holda LOW.
O'sish = oxirgi FINAL.percent - oxirgi INITIAL.percent.

## Seed (backend), `npm run seed`
Dissertatsiyadan: 2 davr (Oltin O'rda; No'g'oyli), 4 mutafakkir (Sopbaslı Sipira jırov, Asan qayǵı, Jiyrenshe sheshen, Dospambet jırov), qadriyatlar (2.1.1-jadval, 2-bob 1-xulosa, 3.1-§), manbalar (to'lg'ov parchalari VERBATIM + kitoblar + dostonlar), mutafakkir-qadriyat bog'lanishlari (har biriga manba), har tur uchun kamida 4 ta topshiriq per mutafakkir imkon qadar, testlar, boshlang'ich/yakuniy diagnostika (parallel shakl, 4 mezonga savol), timeline, qiyosiy tahlil (faqat dissertatsiya matniga tayanib), o'qituvchi: backend/.env; o'quvchi: /register orqali hisob ochadi.
Dissertatsiyada ma'lumoti yo'q maydon -> null yoki "Dissertatsiyada ko'rsatilmagan". Hech narsa to'qilmaydi.
