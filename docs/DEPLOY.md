# Render Free + Neon

Frontend: Render Static Site. Backend: Render Web Service, Free. Database: Neon PostgreSQL.
Repo ildizidagi `render.yaml` ikkala Render xizmatini sozlaydi.

## 1. Neon

Neon loyihasini oching, Connect oynasidan bir bazaning ikki ulanishini oling:

- `DATABASE_URL`: pooled, host nomida `-pooler` bor.
- `DIRECT_URL`: pooling o'chirilgan to'g'ridan-to'g'ri ulanish, migratsiyalar uchun.

Neon bergan SSL parametrlarini saqlang (`sslmode=require`). Sovuq ishga tushishda
ulanish uchun `connect_timeout=15` parametrini qo'shish mumkin.
Lokal `.env` dagi localhost ulanishini Renderga ko'chirmang.

## 2. Render

Loyihani GitHub repoga joylang. `.env` fayllari va `node_modules` repoga kirmasin;
ikkala `package-lock.json` va `backend/prisma/migrations` esa repoda bo'lsin.
Render: New > Blueprint, repozitoriyni tanlang.

Backend environment:

| Kalit | Qiymat |
| --- | --- |
| DATABASE_URL | Neon pooled URL |
| DIRECT_URL | Neon direct URL |
| TEACHER_USERNAME | O'qituvchi logini, masalan teacher |
| TEACHER_PASSWORD | 8–72 belgili maxfiy parol |
| TEACHER_NAME | Ustoz |
| CORS_ORIGIN | Frontendning haqiqiy HTTPS origin manzili, oxirida / bo'lmasin |
| JWT_SECRET | Blueprint avtomatik yaratadi |

Frontend environment:

| Kalit | Qiymat |
| --- | --- |
| VITE_API_URL | Backendning haqiqiy HTTPS origin manzili, /api qo'shmang |

Render bergan haqiqiy domenlarni ishlating: nom band bo'lsa domen o'zgarishi mumkin.
`VITE_API_URL` o'zgargach frontendni qayta build/deploy qiling.
`CORS_ORIGIN` o'zgargach backendni qayta deploy qiling.
Frontendga baza yoki o'qituvchi parolini bermang.

Backend start buyrug'i migratsiyalarni qo'llaydi va serverni ishga tushiradi.
Server environmentdagi o'qituvchi hisobini yaratadi yoki parolini yangilaydi.
Bu jarayon o'quv materiallarini yuklamaydi.

## 3. Yangi bazaga kontent yuklash (bir marta)

Render Free'da Shell yo'q. Seedni kompyuterdan Neon bazasiga qarata bajaring.
`backend/.env.example` asosida `backend/.env.production` yarating; yuqoridagi Neon,
o'qituvchi, JWT va HTTPS CORS qiymatlarini kiriting. NODE_ENV=production bo'lsin.
Bu fayl `.gitignore` orqali chiqarib tashlangan.

Seed mavjud kontent va unga bog'liq natijalarni o'chirib qayta yozadi.
Faqat yangi, bo'sh baza uchun ushbu faylga `SEED_CONFIRM=yes` qo'shing.
Node.js 22 bilan backend papkasida:

```powershell
node --env-file=.env.production node_modules/prisma/build/index.js migrate deploy
node --env-file=.env.production --import tsx prisma/seed/index.ts
```

Birinchi buyruq muvaffaqiyatli tugagandan keyin ikkinchisini bajaring.
Keyin fayldan `SEED_CONFIRM` ni olib tashlang. Uni Render environmentga qo'shmang.
Seedni har deployda avtomatik ishga tushirmang. Mavjud lokal hisoblar/natijalarni
ko'chirish kerak bo'lsa, seed o'rniga alohida baza migratsiyasi kerak.

## 4. Deploydan keyin

- Backend `/api/health`: `status: ok`.
- Frontendda materiallar ochiladi, `/login` sahifasini yangilash 404 bermaydi.
- O'qituvchi `/login` orqali kiradi, `/teacher` ochiladi.
- O'quvchi `/register` orqali ro'yxatdan o'tadi va o'z paneliga kiradi.
- O'qituvchi yuklagan rasm frontendda ko'rinadi.

Render Free backend 15 daqiqa so'rov bo'lmasa uyquga ketadi; keyingi ochilish
taxminan bir daqiqa olishi mumkin. Yuklangan rasmlar PostgreSQL'da saqlanadi,
shuning uchun Renderning vaqtinchalik diskiga bog'liq emas; ular Neon saqlash
kvotasidan foydalanadi.

Rasmiy manbalar:
- https://render.com/docs/free
- https://render.com/docs/blueprint-spec
- https://neon.com/docs/guides/prisma
