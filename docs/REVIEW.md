# Platforma tahlili va qayta ishlash

2026-10-11. Asos: `disertaciya/` ichidagi Word hujjati, `docs/CONTRACT.md`, frontend, backend, seed mazmuni va ishlayotgan mahalliy platforma.

## Mavzuga mosligi

Loyihaning asosiy tuzilmasi dissertatsiya mavzusiga mos: tarixiy davrlar, mutafakkirlar, asl manbalar, tarbiyaviy g‘oyalar, qiyosiy tahlil, amaliy topshiriqlar va diagnostika o‘zaro bog‘langan. Ularni olib tashlash o‘rganish jarayonini uzib qo‘yar edi. Asosiy muammo mazmunni taqdim etish va uning ilmiy maqomini tushuntirishda edi.

| Dissertatsiya | Platforma |
| --- | --- |
| I bob, 1.1–1.2-§: nazariy asoslar va madaniy hayot | Davrlar, mutafakkirlar, vaqt chizig‘i |
| II bob, 2.1–2.3-§: pedagogik mazmun, didaktik yondashuvlar, tarbiyaga tatbiq | Manbalar, tarbiyaviy g‘oyalar, qiyoslash, topshiriqlar |
| III bob, 3.1–3.2-§: tajriba-sinov va natijalar | Boshlang‘ich/yakuniy diagnostika, natijalar, o‘qituvchi tahlili |

`/guide` sahifasi ushbu bog‘lanishni, tavsiya etilgan mashg‘ulot tartibini va baholash chegaralarini ikki tilda tushuntiradi. Yo‘riqnoma platforma uchun yozilgan tavsiya sifatida belgilangan; dissertatsiyadan so‘zma-so‘z iqtibos sifatida ko‘rsatilmagan.

## Dizayn va o‘qish

- O‘quvchi sahifalari uchun och fon, yashil asosiy rang va kam miqdordagi oltin rangdan iborat yagona uslub yaratildi.
- O‘quvchi qismida yuqori navbar: bosh sahifa, o‘rganish va mashq bo‘limlari, manbalar va metodik yo‘riqnoma. Telefonda o‘ngdan ochiladigan Drawer; doimiy chap menyu faqat admin qismida.
- Foydalanuvchi taklifiga ko‘ra landing sahifa alohida qayta tuzildi: keng yashil birinchi ekran, yirik sarlavha, ikki davrni ifodalovchi dekorativ kitoblar, aniq boshlash tugmalari, ketma-ket mazmun bo‘limlari va to‘liq footer. Kitoblar haqiqiy tarixiy nashrlarning tasviri emas, interfeysdagi ramziy kompozitsiyadir.
- Bosh sahifadagi katta aylanuvchi medalyon, harakatlanuvchi ism lentasi, parallax, takrorlanuvchi reklama bloklari va API yuklanmagan paytdagi taxminiy statistika olib tashlandi.
- Bosh sahifa real davrlar va mutafakkirlar, o‘rganish ketma-ketligi va amaliy bo‘limlarga yo‘naltiradi. Yuklanish, bo‘sh ro‘yxat va xato holatlari ko‘rsatiladi.
- Matn sahifalarida 17–25 px o‘qish hajmi, saqlanadigan afzallik va chop etish tugmasi bor. Asl parcha, dissertatsiya talqini va zamonaviy talqin alohida ko‘rinadi.
- Manbalar nomi, asl matni va havolasi bo‘yicha qidiriladi; davr, mutafakkir va tur bo‘yicha filtrlash saqlangan.
- Test savollari navigatsiyasi klaviatura va ekran o‘quvchisiga ochildi. Javob yuborilayotganida variantlar o‘zgartirilmaydi.

## Admin

- Admin ham och rangli yagona dizaynga o‘tdi; asosiy amallar va jadvallar tartibga keltirildi.
- Boshqaruv panelida tekshirilmagan tarjimalar, havolasi va asl matni yetishmaydigan manbalar soni hamda tegishli filtrlangan ro‘yxatga havolalar bor. Bu mavjudlik tekshiruvi; havolaning ilmiy to‘g‘riligini avtomatik tasdiqlamaydi.
- Manba tahririda `DRAFT` / `REVIEWED` holati tanlanadi va mavjud backend orqali saqlanadi. Tekshiruvsiz avtomatik tasdiqlash yo‘q.
- Umumiy CRUD jadvallarida qidiruv, yozuvlar soni va sahifalash; formani yopish va sahifani qayta yuklashda saqlanmagan tahrir haqida ogohlantirish bor.
- Grafiklarda haqiqiy 0% va mavjud bo‘lmagan natija ajratildi. Alohida grafik so‘rovi xatosi bo‘sh statistikaga aylantirilmaydi.
- Maktab auditoriyasiga mos ravishda o‘zbek interfeysida “talaba” atamalari “o‘quvchi”ga almashtirildi.

## Ilmiy mazmun tekshiruvi

Word faylidagi paragraflar ajratilib, seed va ishlayotgan bazadagi 31 manbaning har bir bo‘sh bo‘lmagan asl satri dissertatsiya matnidan qidirildi. Tekshiruv ketma-ket bo‘shliqlarni birlashtiradi; tarixiy da’volarning haqiqatligini yoki birlamchi adabiyot bilan mosligini isbotlamaydi.

`book-nahj` parchasida `1358 йили` matni hujjatdagi `1358йили` shakliga, bo‘shliqlar esa asl nusxaga qaytarildi. Seed hamda bazada aynan eski matnga teng kelgan bitta yozuv tuzatildi. Bazani to‘liq qayta seed qilish bajarilmadi.

Takrorlash:

```powershell
powershell -File docs/extract-dissertation.ps1
cd backend
npm run seed:verify -- ../docs/dissertation-extracted.txt
# Tuzatish zarurligini o‘zgartirishsiz tekshirish:
npx tsx scripts/repair-source-quote.ts
```

`seed:verify` nomuvofiqlik topilsa endi muvaffaqiyatsiz chiqish kodi qaytaradi.

## Tekshiruvlar va chegaralar

- Frontend TypeScript va production build muvaffaqiyatli.
- Backend TypeScript/build muvaffaqiyatli.
- Seed asl satrlari va ishlayotgan bazadagi 31 manba: nomuvofiq satrlar 0 ta.
- Haqiqiy Chrome’da desktop va mobil sahifalar, ikki til, o‘quvchi/admin kabinetlari, qidiruv, o‘qish sozlamasi, filtrlar, saqlanmagan tahrir va grafikdagi 0% holati tekshirildi. Skript: `node docs/verify-ui.mjs`; natijalar va rasmlar: `docs/qa/`.
- Brauzer tekshiruvi demo hisoblar bilan kiradi, lekin topshiriq topshirmaydi va tahrirlarni bazaga saqlamaydi. To‘liq CRUD yaratish/o‘chirish, CSV mazmunining statistik auditi va barcha savollarning pedagogik validatsiyasi bu tekshiruvga kirmaydi.

## Ilmiy rahbar bilan ko‘rib chiqiladigan jihatlar

1. Hozirgi bazadagi 31 manba tarjimasi `DRAFT`. Qoraqalpoqcha tarjimalar va tarixiy nomlar mutaxassis tomonidan tekshirilishi kerak.
2. `[17;119]` kabi havolalar dissertatsiya ichki bibliografiyasiga tegishli. Raqamlar, nashr va sahifalarni birlamchi adabiyotlar bilan tekshirish alohida ilmiy ishdir.
3. Daraja chegaralari o‘qituvchi tomonidan belgilanadi; ularni dissertatsiya tasdiqlagan standart deb talqin qilish mumkin emas.
4. Test foizi o‘quvchining axloqiy shaxsiyatini to‘liq o‘lchamaydi. Kuzatuv, suhbat va mustaqil izoh bilan birga talqin qilish kerak.
5. Platforma statistikasi dissertatsiyadagi tajriba-sinov natijalaridan alohida. Eksperimental/nazorat guruhlarini ajratish, ishtirokchilarni kodlash va statistik ahamiyatni hisoblash tizimi qo‘shilmadi; mavjud foizlar ilmiy samaradorlik isboti deb ko‘rsatilmaydi.

## Dizaynni yakunlash (2026-10-11, kechqurun)

- Admin formalarida eski yozuv qiymatlari keyingi yozuvga o‘tib qolish xatosi tuzatildi: `CrudPage` endi har ochilishda yangi `Form` nusxasini (`EditorForm`) yaratadi.
- Bosh sahifadagi yuqori yorliq (`.kicker`) noto‘g‘ri o‘ralishi, sarlavha va mazmun kengligi (1240px) tengsizligi tuzatildi.
- Natijalar sahifasida radar bo‘lmaganda mezon kartalari tor ustunga tushib qolishi tuzatildi; radar ranglari yangi palitraga o‘tkazildi.
- Muallif rasmi shaffof/yuklanmasa ham ko‘rinadi (fon, ramka, bosh harflarga qaytish).
- Bosish nishonlari (footer, “Ashıw”, “Bárshesi”) kamida 40px; Ant Design `blue` preseti yashil palitraga moslandi.
- Ant Design v6 eskirgan proplar almashtirildi (`Tag bordered`, `Drawer width/destroyOnClose`, `Alert message`, `InputNumber addonAfter`).
- `node docs/verify-ui.mjs`: 56 tekshiruv, 0 ta muvaffaqiyatsiz.
