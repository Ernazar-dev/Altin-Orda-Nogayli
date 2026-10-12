import { t } from './helpers';
import type { LText } from '../../src/lib/types';

export type CriterionSeed = 'AXIOLOGICAL' | 'COGNITIVE' | 'ACTIVITY' | 'REFLECTIVE';

export interface AnalysisSpec {
  kind: 'SOURCE_ANALYSIS' | 'THOUGHT_ANALYSIS';
  source: string;
  correct: string;
  wrong: [string, string, string];
  explanation: LText;
  /** Faqat THOUGHT_ANALYSIS: fikrning zamonaviy hayotdagi ko'rinishi (zamonaviy talqin). */
  modern?: LText;
  criterion: CriterionSeed;
}

export interface ModernLinkSpec {
  kind: 'MODERN_LINK';
  source: string;
  thought: LText;
  /** Birinchisi to'g'ri; seed paytida aralashtiriladi. */
  situations: [LText, LText, LText, LText];
  explanation: LText;
  criterion: CriterionSeed;
}

export type ActivitySpec = AnalysisSpec | ModernLinkSpec;

export const activities: ActivitySpec[] = [
  // ---- Manbani tahlil qil ----
  {
    kind: 'SOURCE_ANALYSIS', source: 'sipira-boy', correct: 'katta', wrong: ['jasorat', 'tabiat', 'estetik'], criterion: 'COGNITIVE',
    explanation: t(
      "Parchada bola oilada va atrofda ko'rgan muhitiga o'xshab ulg'ayishi aytilgan — bu oila tarbiyasi va ota-ona namunasi g'oyasi (2.1-§). | Úzindide bala shańaraqta hám átirapta kórgen ortasına usap ósiwi aytılǵan — bul shańaraq tárbiyası hám ata-ana úlgisi ideyası (2.1-§).",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'sipira-kenjembay', correct: 'insonparvar', wrong: ['mehnat', 'estetik', 'tabiat'], criterion: 'COGNITIVE',
    explanation: t(
      "Beva xotin va yetim o'g'illarning ahvoliga e'tiborsizlik tanqid qilinadi; shoir hukmdordan insonparvarlik bilan munosabat talab etadi. | Jesir hayal hám jetim ullardıń jaǵdayına itibarsızlıq synlanadı; shayır húkimdardan insanparwarlıq penen qatnas talap etedi.",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'sipira-el', correct: 'vatan', wrong: ['rost', 'nutq', 'tabiat'], criterion: 'COGNITIVE',
    explanation: t(
      "«Elning nurli bo'lgani — botirning tug'ilgani»: yoshlarning mard bo'lib yetishishi el ichiga baxt keltiradi; xalqqa xizmat — vatanparvarlik. | «Eldiń nurlı bolǵanı — batırdıń tuwılǵanı»: jaslardıń márt bolıp jetisiwi el ishine baxıt alıp keledi; xalıqqa xızmet — watanparwarlıq.",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'sipira-tora', correct: 'adolat', wrong: ['mehnat', 'tabiat', 'estetik'], criterion: 'AXIOLOGICAL',
    explanation: t(
      "Biyning to'rasini (adolatini) buzishi yomon deb baholanadi — rahbarlar adolatli bo'lishi kerak. | Biydiń tórasin (ádalatın) buzıwı jaman dep bahalanadı — basshılar ádalatlı bolıwı kerek.",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'asan-soliq', correct: 'adolat', wrong: ['mehnat', 'estetik', 'tabiat'], criterion: 'AXIOLOGICAL',
    explanation: t(
      "Xonning xalqni o'ylamasdan ortiqcha soliq undirishi tanqid qilinadi; adolat hamma uchun baravar bo'lishi va xalqni adolatli boshqarish zarurligi Asan qayg'ining asosiy pedagogik fikri (1.3.1-jadval). | Xannıń xalıqtı oylamastan artıqsha salıq jıynawı synlanadı; ádalat hámme ushın birdey bolıwı hám xalıqtı ádalatlı basqarıw zárúrligi Asan qayǵınıń tiykarǵı pedagogikalıq pikiri (1.3.1-keste).",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'asan-qaz', correct: 'tabiat', wrong: ['katta', 'mehnat', 'nutq'], criterion: 'COGNITIVE',
    explanation: t(
      "Qirda yurgan va ko'lda o'tirgan jonzotlar o'z yashash joyining qadrini biladi — tabiat va inson uyg'unligi, tabiatning qadriga yetish. | Qırda júrgen hám kólde otırǵan jánzatlar óz jasaw ornınıń qádirin biledi — tábiyat hám insan sáykesligi, tábiyattıń qádirine jetiw.",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'asan-olmos', correct: 'insonparvar', wrong: ['mehnat', 'tabiat', 'jasorat'], criterion: 'AXIOLOGICAL',
    explanation: t(
      "Xalq ichida oqsuyak xon-biylardan ham aqlli kishilar bor: insonni nasabiga emas, aql va fazilatiga qarab baholash kerak. | Xalıq ishinde aqsúyek xan-biylerden de aqıllı adamlar bar: insandı nasiline emes, aqıl hám pazıyletine qarap bahalaw kerek.",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'asan-hunar', correct: 'mehnat', wrong: ['adolat', 'nutq', 'estetik'], criterion: 'COGNITIVE',
    explanation: t(
      "Yoshlikda hunar o'rganmasang, ulg'ayganda bilmaysan: kasb-hunarni kichikdan o'rganish — mehnat tarbiyasi. | Jaslıqta hunar úyrenbeseń, úlkeyiwde bilmeysen: káspi-hunardı kishkeneden úyreniw — miynet tárbiyası.",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'asan-dost', correct: 'dostlik', wrong: ['mehnat', 'vatan', 'tabiat'], criterion: 'COGNITIVE',
    explanation: t(
      "Do'stni yaxshidan tanlash va do'stga yomon so'zlamaslik — do'stlik va ahillik g'oyasi (1.3-§). | Dostı jaqsıdan saylaw hám dosqa jaman sóylemew — dosliq hám awızbirshilik ideyası (1.3-§).",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'asan-xavotir', correct: 'rost', wrong: ['mehnat', 'tabiat', 'estetik'], criterion: 'COGNITIVE',
    explanation: t(
      "Barcha gapni rost deb qabul qilmaslik, yolg'on va g'iybatga tanqidiy qarash — rostgo'ylik va halollik. | Barlıq sózdi shın dep qabıllamaw, jalǵan hám gıybatqa synlı qaraw — rastgóylik hám hádlik.",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'asan-gazab', correct: 'sabr', wrong: ['vatan', 'mehnat', 'estetik'], criterion: 'REFLECTIVE',
    explanation: t(
      "G'azab aql bilan do'st emas, uning oqibati noto'g'ri qarorga olib kelishi mumkin; shuning uchun o'zini tiyish kerak (1.3-§). | Gázep aqıl menen dos emes, onıń aqıbeti nadurıs sheshimge alıp keliwi múmkin; sonlıqtan ózin tıyıw kerek (1.3-§).",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'jiy-boyqush', correct: 'nutq', wrong: ['mehnat', 'tabiat', 'estetik'], criterion: 'COGNITIVE',
    explanation: t(
      "Jiyrenshe xonning zulmini boyqushlar suhbati ramzi orqali topqirlik bilan aytadi — sheshenlik va haqiqatni aytish madaniyati. | Jiyrenshe xannıń zulımın bayquslar sóylesiwi ramzi arqalı tapqırlıq penen aytadı — sheshenlik hám haqıyqattı aytıw mádeniyatı.",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'dos-vatan', correct: 'vatan', wrong: ['mehnat', 'rost', 'estetik'], criterion: 'COGNITIVE',
    explanation: t(
      "Idil bo'yiga bostirib kelgan dushmanga qarshi otlanish voqeasi bilan bog'liq «Vatanimdan ayrilmaslik» to'lg'ovi — vatanparvarlik. | Edil boyına basıp kelgen dushpanǵa qarsı atlanıw waqıyası menen baylanıslı «Watanımnan ayırılmaslıq» tolǵawı — watanparwarlıq.",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'dos-saqlan', correct: 'dostlik', wrong: ['mehnat', 'tabiat', 'estetik'], criterion: 'REFLECTIVE',
    explanation: t(
      "Jirov do'st va dushman o'rtasidagi farqni, kulib kirib xiyonat qilishi mumkin bo'lgan «do'st»lardan ehtiyot bo'lishni eslatadi. | Jıraw dos hám dushpan arasındaǵı parıqtı, külip kirip hıyanat etiwi múmkin bolǵan «dos»lardan abaylawdı eske túsiredi.",
    ),
  },
  {
    kind: 'SOURCE_ANALYSIS', source: 'jiy-yosh', correct: 'manaviy', wrong: ['mehnat', 'vatan', 'tabiat'], criterion: 'REFLECTIVE',
    explanation: t(
      "Umrning sakkiz davri orqali odamning ruhiyati va xulqi yoshga qarab o'zgarishi haqida o'ylashga undaydi — o'zini va o'z xulqini tahlil qilish. | Ómirdiń segiz dáwiri arqalı adamnıń ruwxıyatı hám minez-qulqı jasqa qarap ózgeriwi haqqında oylawǵa úndeydi — ózin hám óz minez-qulqın analizlew.",
    ),
  },
  // ---- Fikrni tahlil qil ----
  {
    kind: 'THOUGHT_ANALYSIS', source: 'sipira-ulug', correct: 'katta', wrong: ['adolat', 'mehnat', 'jasorat'], criterion: 'AXIOLOGICAL',
    explanation: t(
      "Bu fikr kattalar oldida odob saqlash va hurmat ko'rsatishni bildiradi; dissertatsiyada u iboli, tarbiyali yoshlarga xos fazilat deb baholanadi (1.1-§). | Bul pikir úlkenler aldında ádep saqlaw hám húrmet kórsetiwdi bildiredi; dissertaciyada ol ibalı, tárbiyalı jaslarǵa tán pazıylet dep bahalanadı (1.1-§).",
    ),
    modern: t(
      "Zamonaviy talqin: dars yoki oilaviy suhbatda kattaning gapini bo'lmay tinglash, o'z fikrini navbat bilan va hurmat bilan aytish. | Házirgi zaman túsindirmesi: sabaq yamasa shańaraqlıq sóylesiwde úlkenniń sózin bólmey tıńlaw, óz pikirin kezek penen hám húrmet penen aytıw.",
    ),
  },
  {
    kind: 'THOUGHT_ANALYSIS', source: 'jiy-zolim', correct: 'adolat', wrong: ['sabr', 'estetik', 'tabiat'], criterion: 'AXIOLOGICAL',
    explanation: t(
      "«Zolimlik qonunsizlikdan» — adolatli boshqaruv qonunga asoslanishi kerak, «ezilish ongsizlikdan» — xalq savodli bo'lishi lozim. | «Zulımlıq nızamsızlıqtan» — ádalatlı basqarıw nızamǵa tiykarlanıwı kerek, «ezilıw sanasızlıqtan» — xalıq sawatlı bolıwı lazım.",
    ),
    modern: t(
      "Zamonaviy talqin: qoidalar hamma uchun bir xil bo'lishi va o'z huquq-burchlarini bilish. | Házirgi zaman túsindirmesi: qaǵıydalar hámme ushın birdey bolıwı hám óz huqıq-minnetlerin biliw.",
    ),
  },
  {
    kind: 'THOUGHT_ANALYSIS', source: 'asan-ogayin', correct: 'dostlik', wrong: ['mehnat', 'jasorat', 'tabiat'], criterion: 'AXIOLOGICAL',
    explanation: t(
      "Og'ayin bo'lsang totuv bo'l: yoshlarni totuvlik va ahil ittifoqdan ajralmaslikka o'rgatadi. | Aǵayin bolsań tınısh bol: jaslardı tınıshlıq hám awızbir ittifaqtan ajıralmawǵa úyretedi.",
    ),
    modern: t(
      "Zamonaviy talqin: sinf jamoasida kelishmovchilikni muloqot bilan hal qilish. | Házirgi zaman túsindirmesi: klass toparında kelispewshilikti sóylesiw menen sheshiw.",
    ),
  },
  {
    kind: 'THOUGHT_ANALYSIS', source: 'asan-ilm', correct: 'ustoz', wrong: ['vatan', 'jasorat', 'tabiat'], criterion: 'AXIOLOGICAL',
    explanation: t(
      "«Ilmim yurtdan oshdi deb maslahatsiz so'z boshlama» — olimga xos odob, maslahatlashib ish ko'rish va ustoz-shogird o'zaro tushunishi. | «Ilimim jurttan ashtı dep másláhátsiz sóz baslama» — ilimpazǵa tán ádep, másláhátlesip is kóriw hám ustaz-shákirt ózara túsiniwi.",
    ),
    modern: t(
      "Zamonaviy talqin: loyiha ishini boshlashdan oldin o'qituvchi va guruh bilan maslahatlashish. | Házirgi zaman túsindirmesi: joybar jumısın baslawdan aldın oqıtıwshı hám topar menen másláhátlesiw.",
    ),
  },
  {
    kind: 'THOUGHT_ANALYSIS', source: 'asan-soz', correct: 'ilim', wrong: ['jasorat', 'katta', 'estetik'], criterion: 'COGNITIVE',
    explanation: t(
      "Toza, nuqsonsiz so'z o'y tubida yotadi: benuqson fikr teran o'ylash va qiyoslash orqali hosil bo'ladi. | Taza, kemsiz sóz oy túbinde jatadı: kemsiz pikir tereń oylaw hám salıstırıw arqalı payda boladı.",
    ),
    modern: t(
      "Zamonaviy talqin: javob berishdan oldin o'ylash, manbalarni solishtirib xulosa qilish. | Házirgi zaman túsindirmesi: juwap beriwden aldın oylaw, derekler salıstırıp juwmaq shıǵarıw.",
    ),
  },
  {
    kind: 'THOUGHT_ANALYSIS', source: 'dos-aymedet', correct: 'insonparvar', wrong: ['mehnat', 'nutq', 'tabiat'], criterion: 'AXIOLOGICAL',
    explanation: t(
      "Xon va biy o'g'lidan nimasi kam: insonni nasabiga emas, insoniy kamolotiga qarab baholash — insonparvarlik. | Xan hám biy ulınan nesi kem: insandı nasiline emes, insanlıq kamalatına qarap bahalaw — insanparwarlıq.",
    ),
    modern: t(
      "Zamonaviy talqin: sinfdoshni oilasining boyligi yoki kelib chiqishiga emas, xulqi va harakatiga qarab baholash. | Házirgi zaman túsindirmesi: klasslasın shańaraǵınıń baylıǵına yamasa kelip shıǵıwına emes, minez-qulqı hám is-háreketine qarap bahalaw.",
    ),
  },
  // ---- Bugungi hayot bilan bog'la ----
  {
    kind: 'MODERN_LINK', source: 'sipira-ulug', criterion: 'ACTIVITY',
    thought: t(
      "Tarixiy fikr (Sipira jirov nasihati): kattalar oldida odob saqlash va hurmat ko'rsatish. | Tariyxıy pikir (Sipira jıraw násiyatı): úlkenler aldında ádep saqlaw hám húrmet kórsetiw.",
    ),
    situations: [
      t("Bobosi gapirayotganda sinfdosh uni bo'lmay tinglaydi, keyin fikrini hurmat bilan aytadi. | Atası sóylep atırǵanda klasslas oni bólmey tıńlaydı, keyin pikirin húrmet penen aytadı."),
      t("Oilaviy suhbatda hamma gapni bo'lib, birinchi bo'lib gapirishga shoshiladi. | Shańaraqlıq sóylesiwde hámme sózdi bólip, birinshi bolıp sóylewge asıǵadı."),
      t("Katta kishi gapirayotganda telefonda o'ynab o'tiradi. | Úlken adam sóylep atırǵanda telefonda oynap otıradı."),
      t("Kattaning fikri eskirgan deb uning gapini bo'ladi. | Úlkenniń pikiri eskirgen dep onıń sózin bóledi."),
    ],
    explanation: t(
      "Birinchi vaziyatda kattaga hurmat va suhbat odobi saqlanadi — bu «ulug'dan oldin kichikning gapirishi yo'q» fikrining zamonaviy ko'rinishi (zamonaviy talqin). | Birinshi jaǵdayda úlkenge húrmet hám sóylesiw ádebi saqlanadı — bul «ulıǵdan aldın kishiniń sóylewi joq» pikiriniń házirgi kórinisi (házirgi zaman túsindirmesi).",
    ),
  },
  {
    kind: 'MODERN_LINK', source: 'asan-qisganda', criterion: 'ACTIVITY',
    thought: t(
      "Tarixiy fikr (Asan qayg'i): adolat hamma uchun baravar bo'lishi kerak. | Tariyxıy pikir (Asan qayǵı): ádalat hámme ushın birdey bolıwı kerek.",
    ),
    situations: [
      t("Sinf sardori vazifalarni hammaga teng taqsimlaydi va har kimning fikrini eshitadi. | Klass basshısı wazıypalardı hámmege teń bóledi hám hár kimniń pikirin esitedi."),
      t("Sardor do'stlariga yengil, boshqalarga og'ir vazifa beradi. | Basshı doslarına jeńil, basqalarǵa awır wazıypa beredi."),
      t("O'qituvchi faqat a'lochilardan so'rab, boshqalarni e'tiborsiz qoldiradi. | Oqıtıwshı tek a'lashılardan sorap, basqalardı itibarsız qaldıradı."),
      t("Qoida faqat zaif o'quvchilarga qo'llanadi. | Qaǵıyda tek álsiz oqıwshılarǵa qollanıladı."),
    ],
    explanation: t(
      "Birinchi vaziyatda adolat va tenglik saqlanadi — Asan qayg'ining adolat haqidagi fikrining zamonaviy ko'rinishi (zamonaviy talqin). | Birinshi jaǵdayda ádalat hám teńlik saqlanadı — Asan qayǵınıń ádalat haqqındaǵı pikiriniń házirgi kórinisi (házirgi zaman túsindirmesi).",
    ),
  },
  {
    kind: 'MODERN_LINK', source: 'asan-hunar', criterion: 'ACTIVITY',
    thought: t(
      "Tarixiy fikr (Asan qayg'i): hunarni yoshlikdan o'rganish kerak. | Tariyxıy pikir (Asan qayǵı): hunardı jaslıqtan úyreniw kerek.",
    ),
    situations: [
      t("Maktabdan keyin to'garakda hunar o'rganadi va uyda ishlarga yordam beradi. | Mektepten keyin úyirmede hunar úyrenedi hám úyde jumıslarǵa járdemlesedi."),
      t("Barcha ishni ota-onasiga qoldirib, vaqtini o'yin bilan o'tkazadi. | Barlıq jumıstı ata-anasına qaldırıp, waqtın oyın menen ótkeredi."),
      t("Uy vazifasini boshqadan ko'chirib oladi. | Úy wazıypasın basqadan kóshirip aladı."),
      t("Hunar o'rganishni «keyinroq» deb doim kechiktiradi. | Hunar úyreniwdi «keyinirek» dep hámme waqıt keshiktiredi."),
    ],
    explanation: t(
      "Birinchi vaziyatda yoshlikdan hunar va mehnatga e'tibor bor — Asan qayg'i g'oyasining zamonaviy ko'rinishi (zamonaviy talqin). | Birinshi jaǵdayda jaslıqtan hunar hám miynetke itibar bar — Asan qayǵı ideyasınıń házirgi kórinisi (házirgi zaman túsindirmesi).",
    ),
  },
  {
    kind: 'MODERN_LINK', source: 'asan-xavotir', criterion: 'ACTIVITY',
    thought: t(
      "Tarixiy fikr (Asan qayg'i): har bir gapni rost deb ishonma, yolg'on-g'iybatga tanqidiy qara. | Tariyxıy pikir (Asan qayǵı): hár bir sózdi shın dep isenbe, jalǵan-gıybatqa synlı qara.",
    ),
    situations: [
      t("Ijtimoiy tarmoqdagi xabarni ishonchli manbada tekshirmay boshqalarga yubormaydi. | Sociallıq tarmaqtaǵı xabardı isenimli derekte tekspey basqalarǵa jibermeydi."),
      t("Eshitgan gapini darhol hammaga tarqatadi. | Esitken sózin derhal hámmege tarqatadı."),
      t("Do'sti haqida kelgan g'iybatga ishonib, undan yuz o'giradi. | Dosı haqqında kelgen gıybatqa isenip, onnan júz buradı."),
      t("Xabar rostmi-yo'qmi o'ylamasdan «like» bosadi. | Xabar shınmı-joqpa dep oylamastan «like» basadı."),
    ],
    explanation: t(
      "Birinchi vaziyatda axborotni tekshirish va tanqidiy qarash saqlanadi — Asan qayg'i nasihatining zamonaviy ko'rinishi (zamonaviy talqin). | Birinshi jaǵdayda maǵlıwmattı tekseriw hám synlı qaraw saqlanadı — Asan qayǵı násiyatınıń házirgi kórinisi (házirgi zaman túsindirmesi).",
    ),
  },
  {
    kind: 'MODERN_LINK', source: 'dos-vatan', criterion: 'ACTIVITY',
    thought: t(
      "Tarixiy fikr (Dospambet jirov): vatan va el-yurt uchun sadoqat. | Tariyxıy pikir (Dospambet jıraw): watan hám el-jurt ushın sadıqlıq.",
    ),
    situations: [
      t("«Vatan ostonadan boshlanadi» tadbirida mahalla tarixini o'rganib, hamyurtlariga taqdim etadi. | «Watan bosaǵadan baslanadı» ilajında mahalla tariyxın úyrenip, watandaslarına usınadı."),
      t("Yurt tarixiga befarq, mahalla ishlariga qo'shilmaydi. | Jurt tariyxına beparwa, mahalla jumıslarına qosılmaydı."),
      t("Atrofni ifloslantirib, tozalashni boshqalarning ishi deb biladi. | Átirapın lastlap, tazalawdı basqalardıń isi dep biledi."),
      t("Umumiy ishlarda faqat shaxsiy manfaatni o'ylaydi. | Ulıwma jumıslarda tek jeke payda haqqında oylaydı."),
    ],
    explanation: t(
      "Birinchi vaziyatda yurt tarixini bilish va el uchun faol ishtirok bor — vatanparvarlik g'oyasining zamonaviy ko'rinishi (zamonaviy talqin; tadbir nomi dissertatsiyadagi 3.1-§ dagi tarbiyaviy tadbirlardan olingan). | Birinshi jaǵdayda jurt tariyxın biliw hám el ushın aktiv qatnasıw bar — watanparwarlıq ideyasınıń házirgi kórinisi (házirgi zaman túsindirmesi; ilaj atı dissertaciyadaǵı 3.1-§ degi tárbiyalıq ilajlardan alınǵan).",
    ),
  },
  {
    kind: 'MODERN_LINK', source: 'asan-gazab', criterion: 'REFLECTIVE',
    thought: t(
      "Tarixiy fikr (Asan qayg'i): g'azabni tiy, xatosini tan olganni kechir. | Tariyxıy pikir (Asan qayǵı): gázepti tıy, qátesin moyınlaǵandı keshir.",
    ),
    situations: [
      t("Bahsda jahli chiqsa ham to'xtab o'ylaydi va xatosini tan olgan sinfdoshini kechiradi. | Bahsta ashıwı shıqsa da toqtap oylaydı hám qátesin moyınlaǵan klasslasın keshiredi."),
      t("Jahl ustida do'stini haqorat qiladi. | Ashıw ústinde dosın haqaratlaydı."),
      t("Xatosini tan olgan sinfdoshidan o'ch oladi. | Qátesin moyınlaǵan klasslasınan óshin aladı."),
      t("Nizoni qichqiriq bilan hal qilishga urinadi. | Nızanı qıshqırıq penen sheshiwge urınadı."),
    ],
    explanation: t(
      "Birinchi vaziyatda g'azab jilovlanadi va kechirimlilik ko'rsatiladi — Asan qayg'i fikrining zamonaviy ko'rinishi (zamonaviy talqin). | Birinshi jaǵdayda gázep tıyıladı hám keshirimlilik kórsetiledi — Asan qayǵı pikiriniń házirgi kórinisi (házirgi zaman túsindirmesi).",
    ),
  },
];
