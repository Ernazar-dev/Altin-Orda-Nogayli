# Frontend: Altın Orda hám Noǵaylı

React + Vite + TypeScript + Ant Design 6. UI ikki tilli: O'zbek (uz) va Qoraqalpoq (kaa), tanlov `localStorage` da.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173  (/api va /uploads -> http://localhost:4000)
npm run build      # tsc --noEmit + vite build
```

Backend bo'lmasa: `VITE_USE_MOCK=1 npm run dev` (kichik xotiradagi mock; haqiqiy kontent backend seed'ida).

PowerShell uchun: `$env:VITE_USE_MOCK='1'`, so‘ng `npm run dev`. Haqiqiy API bilan ishlashga qaytish uchun `Remove-Item Env:VITE_USE_MOCK` va dev serverni qayta ishga tushiring.

## Yangilangan o‘rganish muhiti

- O‘quvchi uchun yuqori navbar va keng landing sahifa; admin uchun yon menyu. Telefonda o‘ngdan ochiladigan o‘quvchi menyusi.
- `/guide`: dissertatsiya boblari, o‘rganish ketma-ketligi va baholash talqini.
- Matn sahifalarida saqlanadigan shrift hajmi va chop etish.
- `/sources`: asl matn va havola bo‘yicha qidiruv.
- `/teacher`: ilmiy kontent nazorati; `/teacher/sources?review=DRAFT`: tarjima tekshiruvi navbati.
- CRUD formalarini yopishda saqlanmagan o‘zgarishlarni himoyalash.

To‘liq tahlil va tekshiruv chegaralari: `../docs/REVIEW.md`. Mahalliy serverlar ishlab turganda, loyiha ildizidan `node docs/verify-ui.mjs` bilan Chrome tekshiruvini bajarish mumkin.

O'quvchilar /register orqali hisob ochadi. O'qituvchi /login orqali backend/.env dagi TEACHER_USERNAME va TEACHER_PASSWORD bilan kiradi.

## Tuzilma

- `src/api` axios mijoz, resurs modullari, `mock/`
- `src/components` umumiy komponentlar (kartalar, timeline, test runner, grafiklar, `forms/` — teacher CRUD)
- `src/layouts` public va app (sidebar/Drawer)
- `src/pages/{public,auth,student,teacher}` sahifalar (hammasi `React.lazy`)
- `src/routes` router, `ProtectedRoute` / `RoleRoute` / `GuestRoute`
- `src/i18n` `uz.ts`, `kaa.ts` (kalitlar tip darajasida majburiy mos), Ant Design locale
- `src/styles` tokenlar (`tokens.scss`), global stil

## Ilmiy qoidalar (UI darajasida)

- Manba (`Source.content`) o'zgartirilmaydi, asl kirilcha ko'rsatiladi; dissertatsiya talqini va zamonaviy talqin alohida bloklarda.
- Tarjimasi `DRAFT` bo'lgan kontentda "tekshirilmagan awdarma" belgisi chiqadi (qoraqalpoq tilida).
- Daraja chegaralari dissertatsiyada yo'q: o'qituvchi `Sazlawlar` sahifasida belgilaydi.
