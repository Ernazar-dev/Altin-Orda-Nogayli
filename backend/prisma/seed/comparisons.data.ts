import { t } from './helpers';
import type { LText } from '../../src/lib/types';

export interface ComparisonSeed {
  aspect: LText;
  goldenHorde: LText;
  nogai: LText;
  similarity: LText;
  difference: LText;
  sourceRef: string;
}

/** Dissertatsiya matniga tayanib tuzilgan qiyosiy sintez (har bir qator uchun havola ko'rsatilgan). */
export const comparisons: ComparisonSeed[] = [
  {
    aspect: t("Tarixiy sharoit | Tariyxıy jaǵday"),
    goldenHorde: t(
      "Jo'shi vafotidan (1227) so'ng Botuxon yerlarni birlashtirib davlat tuzgan; poytaxt Saroy Botu, keyin Saroy Berke; Xorazm davlat tarkibida; Berkexon islomni qabul qilgan. | Joshı qaytıs bolǵannan (1227) keyin Batıxan jerlerdi birlestirip mámleket qurǵan; paytaxt Saray Bátu, keyin Saray Berke; Xorezm mámleket quramında; Berkexan islamdı qabıllaǵan.",
    ),
    nogai: t(
      "XV asrning 40-yillarida tashkil topgan xonlik; poytaxt Saroyshiq; XVI asr o'rtalarida qulagan; ko'chmanchi va yarim ko'chmanchi turmush. | XV ásirdiń 40-jıllarında quralǵan xanlıq; paytaxt Sarayshıq; XVI ásir ortalarında qulaǵan; kóshpeli hám yarım kóshpeli turmıs.",
    ),
    similarity: t(
      "Ikkala davrda ham qoraqalpoqlar turkiy qipchoq muhitida yashagan va siyosiy ittifoq tarkibida bo'lgan. | Eki dáwirde de qaraqalpaqlar túrkiy qıpshaq ortasında jasaǵan hám siyasiy ittifaq quramında bolǵan.",
    ),
    difference: t(
      "Oltin O'rda — yirik davlat va shahar markazlari (Urganch va boshqalar); No'g'oyli — ko'proq ko'chmanchi o'rda va qabilaviy tuzilma. | Altın Orda — iri mámleket hám qala orayları (Úrgenish hám basqalar); Noǵaylı — kóbirek kóshpeli orda hám tayparalıq dúzilis.",
    ),
    sourceRef: '1.2-§',
  },
  {
    aspect: t("Mutafakkirlar | Oyshıllar"),
    goldenHorde: t(
      "Sopbasli Sipira jirov (XIV asr) — jirovlar maktabi asoschisi; To'xtamish davri xon saroyi bilan bog'liq. | Sopbaslı Sipira jıraw (XIV ásir) — jıraw mektebi tiykarshısı; Toqtamıs dáwiri xan sarayı menen baylanıslı.",
    ),
    nogai: t(
      "Asan qayg'i va Jiyrenshe sheshen (XV asr), Dospambet jirov (XV asr oxiri – XVI asr boshi). | Asan qayǵı hám Jiyrenshe sheshen (XV ásir), Dospambet jıraw (XV ásir aqırı – XVI ásir basları).",
    ),
    similarity: t(
      "Hammasi xon va xalqqa maslahatchi, murabbiy bo'lgan jirov-shoir yoki sheshen; ular o'zlarini «No'g'oyli» deb atagan, qozoq va qoraqalpoq adabiyotida tengdosh tarqalgan. | Hámmesi xan hám xalıqqa másláhátshi, tárbiyashı bolǵan jıraw-shayır yamasa sheshen; olar ózlerin «Noǵaylı» dep atagan, qazaq hám qaraqalpaq ádebiyatında teń tarqalǵan.",
    ),
    difference: t(
      "Dissertatsiya davrlar bo'yicha taqsimlaydi: Sipira — XIV, Asan va Jiyrenshe — XV, Dospambet — XVI asr (1.1-§). | Dissertaciya dáwirler boyınsha bóledi: Sipira — XIV, Asan hám Jiyrenshe — XV, Dospambet — XVI ásir (1.1-§).",
    ),
    sourceRef: '1.1-§',
  },
  {
    aspect: t("Ta'lim shakllari | Tálim formaları"),
    goldenHorde: t(
      "Maktab va madrasa; yozma kitoblar («Nahj al-faradis», «Sayf al-muluk», «Ummi Kamol»); hunarmandchilik (kulolchilik, zargarlik) shogirdlik; astronomik bilimlar. | Mektep hám medrese; jazba kitaplar («Nahj al-faradis», «Sayf al-muluk», «Ummi Kamol»); hunarmentshilik (kulalshılıq, zergerlik) shákirtlik; astronomiyalıq bilimler.",
    ),
    nogai: t(
      "Oilada va jamoada hunar o'rgatish (chorvachilik, ov, to'quvchilik, teri ishlash), jang hunari; jirov-shoirlarning og'zaki maslahat va to'lg'ovlari. | Shańaraqta hám jámáátte hunar úyretiw (shorvashılıq, awshılıq, toqımashılıq, teri ıshlew), urıs hunerı; jıraw-shayırlardıń awızeki másláhát hám tolǵawları.",
    ),
    similarity: t(
      "Ikkalasida ham yoshlarga hunar o'rgatish va og'zaki ijod (to'lg'ov, doston) ta'lim-tarbiya vositasi bo'lgan. | Ekewinde de jaslarǵa hunar úyretiw hám awızeki dóretpe (tolǵaw, dástan) tálim-tárbiya quralı bolǵan.",
    ),
    difference: t(
      "Oltin O'rdada yozma kitob va shahar hunarmandchiligi ko'proq tilga olinadi; No'g'oylida ko'chmanchi mehnat va jang hunari ustun. | Altın Ordada jazba kitap hám qala hunarmentshiligi kóbirek atap ótiledi; Noǵaylıda kóshpeli miynet hám urıs hunerı ústen.",
    ),
    sourceRef: '1.2-§',
  },
  {
    aspect: t("Tarbiyaviy qarashlar | Tárbiyalıq qarawlar"),
    goldenHorde: t(
      "Sipira jirov: insonparvarlik, adolat, kattalarga hurmat, oila tarbiyasi, mehnat, do'stlik; hukmdorga ham haqiqatni aytish. | Sipira jıraw: insanparwarlıq, ádalat, úlkenlerge húrmet, shańaraq tárbiyası, miynet, dosliq; húkimdarǵa da haqıyqattı aytıw.",
    ),
    nogai: t(
      "Asan: adolat, ilm, do'stlik, rostgo'ylik, sabr; Jiyrenshe: qonun va ongning ahamiyati, nutq, oila; Dospambet: vatan, jasorat, insonparvarlik. | Asan: ádalat, ilim, dosliq, rastgóylik, sabır; Jiyrenshe: nızam hám sananıń áhmiyeti, sóylew, shańaraq; Dospambet: watan, jasorat, insanparwarlıq.",
    ),
    similarity: t(
      "Barchasi insonni nasabiga emas, fazilatiga qarab baholash va adolatli rahbarlik g'oyasini ilgari suradi. | Barlıǵı insandı nasiline emes, pazıyletine qarap bahalaw hám ádalatlı basshılıq ideyasın ilgeri súredi.",
    ),
    difference: t(
      "Nogai davrida ilm-ma'rifat, rostgo'ylik, sabr hamda jang va qahramonlik mavzulari ko'proq alohida ajralib turadi. | Noǵaylı dáwirinde ilim-aǵartıwshılıq, rastgóylik, sabır hám urıs hám qaharmanlıq temaları kóbirek ayrıqsha kórinedi.",
    ),
    sourceRef: '1.1-§, 1.3-§, 2.1-§',
  },
  {
    aspect: t("Qadriyatlar | Qádiriyatlar"),
    goldenHorde: t(
      "Vatanparvarlik, insonparvarlik, adolat, kattalarga hurmat, oila tarbiyasi, mehnat. | Watanparwarlıq, insanparwarlıq, ádalat, úlkenlerge húrmet, shańaraq tárbiyası, miynet.",
    ),
    nogai: t(
      "Adolat, jamoaviylik/ahillik, ilm, tabiat bilan uyg'unlik, rostgo'ylik, sabr, jasorat, qarindoshlik. | Ádalat, jámáátshilik/awızbirshilik, ilim, tábiyat penen sáykeslik, rastgóylik, sabır, jasorat, tuwısqanlıq.",
    ),
    similarity: t(
      "Adolat, insonparvarlik va vatanparvarlik ikkala davr mutafakkirlarida uchraydi (mutafakkirlar va qadriyatlar bo'limlariga qarang). | Ádalat, insanparwarlıq hám watanparwarlıq eki dáwir oyshıllarında ushırasadı (oyshıllar hám qádiriyatlar bólimlerine qarań).",
    ),
    difference: t(
      "Dissertatsiya Asan qayg'ining pedagogik fikrlarini alohida jadvalda (1.3.1) kengroq tasniflaydi: adolat, ma'naviy taraqqiyot, tabiat uyg'unligi, ilm, xalqni birlashtirish, vatanparvarlik. | Dissertaciya Asan qayǵınıń pedagogikalıq pikirlerin ayrıqsha keste (1.3.1) boyınsha keńirek klassifikaciyalaydı: ádalat, ruwxıy rawajlanıw, tábiyat sáykesligi, ilim, xalıqtı birlestiriw, watanparwarlıq.",
    ),
    sourceRef: '2.1.1-jadval; 1.3.1-jadval',
  },
  {
    aspect: t("Manbalar | Derekler"),
    goldenHorde: t(
      "Yozma kitoblar: «Nahj al-faradis» (1358), «Sayf al-muluk», «Ummi Kamol» (1412); Sipira jirov to'lg'ovlari («Bir deganda ne yomon», «Otangga la'nat Kenjembay»). | Jazba kitaplar: «Nahj al-faradis» (1358), «Sayf al-muluk», «Ummi Kamol» (1412); Sipira jıraw tolǵawları («Bir degende ne jaman», «Ataǵa lánet Kenjembay»).",
    ),
    nogai: t(
      "Asan qayg'i, Dospambet jirov to'lg'ovlari; Jiyrenshe sheshenning sheshenlik so'zlari va rivoyatlari; «Edige» va boshqa qahramonlik dostonlari. | Asan qayǵı, Dospambet jıraw tolǵawları; Jiyrenshe sheshenniń sheshenlik sózleri hám rawayatları; «Edige» hám basqa qaharmanlıq dástanları.",
    ),
    similarity: t(
      "Ikkalasida ham og'zaki ijod (to'lg'ov, doston, rivoyat) asosiy ta'lim-tarbiya manbasi bo'lgan. | Ekewinde de awızeki dóretpe (tolǵaw, dástan, rawayat) tiykarǵı tálim-tárbiya deregi bolǵan.",
    ),
    difference: t(
      "Yozma ta'limiy kitoblar ko'proq Oltin O'rda davriga oid manbalar ro'yxatida keltiriladi. | Jazba tálimiy kitaplar kóbirek Altın Orda dáwirine tiyisli derekler dizimde keltiriledi.",
    ),
    sourceRef: '1.2-§',
  },
  {
    aspect: t("O'xshash va farqli tomonlar (xulosa) | Uqsas hám ayırmashılıqlı tárepleri (juwmaq)"),
    goldenHorde: t(
      "Islom axloqi va ma'rifat qo'llab-quvvatlangan, yozma ta'limiy adabiyot tarqalgan davr. | Islam ahlaqı hám aǵartıwshılıq qollap-quwatlanǵan, jazba tálimiy ádebiyat tarqalǵan dáwir.",
    ),
    nogai: t(
      "Jirov-shoirlar, sheshenlar xon va xalq o'rtasida murabbiy bo'lgan; ko'chmanchi mehnat va birlik tarbiya asosi. | Jıraw-shayırlar, sheshenler xan hám xalıq arasında tárbiyashı bolǵan; kóshpeli miynet hám birlik tárbiya tiykarı.",
    ),
    similarity: t(
      "Dissertatsiya ikkala davrni birgalikda «qoraqalpoq xalqining ta'lim-tarbiyaviy fikrlari» merosi sifatida o'rganadi va ularni yagona milliy-pedagogik meros deb baholaydi. | Dissertaciya eki dáwirdi birgelikte «qaraqalpaq xalqınıń tálim-tárbiyalıq pikirleri» miyrası retinde úyrenedi hám olardı birden-bir milliy-pedagogikalıq miyras dep bahalaydı.",
    ),
    difference: t(
      "Farqlar asosan manba turi (yozma kitob / og'zaki to'lg'ov) va ijtimoiy tuzilishda (shahar / ko'chmanchi) namoyon bo'ladi. | Parıqlar tiykarınan derek túri (jazba kitap / awızeki tolǵaw) hám sociallıq dúzilisinde (qala / kóshpeli) kórinedi.",
    ),
    sourceRef: '1.2-§, 1.3-§',
  },
];
