import { t } from './helpers';
import type { LText } from '../../src/lib/types';

export type SourceTypeSeed =
  | 'DOSTON'
  | 'TOLGOV'
  | 'RIVOYAT'
  | 'TARIXIY_ASAR'
  | 'OGZAKI_IJOD'
  | 'ADABIY_ASAR'
  | 'BOSHQA';

export interface SourceSeed {
  key: string;
  title: LText;
  type: SourceTypeSeed;
  period: string;
  thinker?: string;
  /** Dissertatsiyadagi asl (o'zbek kirili) matn, o'zgartirilmaydi. */
  content: string;
  description: LText;
  educationalMeaning: LText;
  note: LText;
  reference: string;
  values: string[];
}

const L = (...lines: string[]): string => lines.join('\n');

export const sources: SourceSeed[] = [
  {
    key: 'sipira-boy',
    title: t("«Bir deganda ne yomon» to'lg'ovidan parcha | «Bir degende ne jaman» tolǵawınan úzindi"),
    type: 'TOLGOV',
    period: 'golden-horde',
    thinker: 'sipira',
    content: L(
      'Бой боласи бойга ўхшар,',
      'Боғланмай ўсган тойга ўхшар.',
      'Бий боласи бийга ўхшар,',
      'Баланд - баланд чўққига ўхшар.',
      'Хон боласи хонга ўхшар,',
      'Қул боласи қулга ўхшар...',
    ),
    description: t(
      "Dissertatsiyada Sipira jirovning «Bir deganda ne yomon» to'lg'ovi sifatida keltirilgan parcha (2.1-§). | Dissertaciyada Sipira jırawdıń «Bir degende ne jaman» tolǵawı retinde keltirilgen úzindi (2.1-§).",
    ),
    educationalMeaning: t(
      "Bola yashab turgan muhit va tarbiya ta'sirida shakllanadi; oiladagi tarbiyaviy an'analar yoshlarning shakllanishiga katta ta'sir qiladi. | Bala jasap atırǵan orta hám tárbiya tásirinde qáliplesedi; shańaraqtaǵı tárbiyalıq dástúrler jaslardıń qáliplesiwine úlken tásir kórsetedi.",
    ),
    note: t(
      "Muallif izohi: Sipira jirov o'g'ilni aqlli-bilimli, qizni odobli-iboli qilib tarbiyalashga e'tibor qaratgan; ota-ona namuna bo'lishi bolaning kelajagini belgilaydi. | Avtor túsindirmesi: Sipira jıraw ulandı aqıllı-bilimli, qızdı ádepli-ibalı etip tárbiyalawǵa itibar qaratqan; ata-ana úlgi bolıwı balanıń keleshegin belgileydi.",
    ),
    reference: '[28;56]; dissertatsiya 2.1-§',
    values: ['katta'],
  },
  {
    key: 'sipira-kenjembay',
    title: t("«Otangga la'nat Kenjembay» to'lg'ovidan parcha | «Ataǵa lánet Kenjembay» tolǵawınan úzindi"),
    type: 'TOLGOV',
    period: 'golden-horde',
    thinker: 'sipira',
    content: L(
      'Ўзининг юртини булдирган,',
      'Эл омонга келтирган.',
      'Қўзғолон солган юртига,',
      'Бева хотин, етим ўғил,',
      'Тингламай додин, йиғлатган,',
      'Шайтон йўлдан чиқарган,',
      'Оқибатини сўрасанг,',
      'Сизларни кўрган чолман',
    ),
    description: t(
      "Kenjembay — To'xtamishning bosh vaziri. To'lg'ovda jamiyat hayoti va uni boshqaruvchi shaxslarning roli yoritiladi (1.1-§, 2.1-§, 3.1-§). | Kenjembay — Toqtamıstıń bas wázirı. Tolǵawda jámiyet ómiri hám onı basqarıwshı shaxslardıń roli jarıtıladı (1.1-§, 2.1-§, 3.1-§).",
    ),
    educationalMeaning: t(
      "Beva xotin va yetim bolalarning ahvoliga e'tiborsizlik tanqid qilinadi; hukmdordan insonparvarlik bilan munosabat talab etiladi. | Jesir hayal hám jetim balalardıń jaǵdayına itibarsızlıq synlanadı; húkimdardan insanparwarlıq penen qatnas talap etiledi.",
    ),
    note: t(
      "Muallif izohi: shoir yetim, qarovsiz bolalarning insoniy quvonchi va insonparvarlik ruhi oyoq osti bo'lmasligi uchun xonlik g'amxo'rlik qilishi kerakligini ta'kidlagan. | Avtor túsindirmesi: shayır jetim, qarawsız balalardıń insanlıq quwanıshı hám insanparwarlıq ruwxı ayaq asti bolmawı ushın xanlıq ǵamxorlıq qılıwı kerekligin atap ótken.",
    ),
    reference: '[17;119]; dissertatsiya 3.1-§',
    values: ['insonparvar', 'adolat'],
  },
  {
    key: 'sipira-el',
    title: t("Sipira jirov: «Elning nurli bo'lgani...» | Sipira jıraw: «Eldiń nurlı bolǵanı...»"),
    type: 'TOLGOV',
    period: 'golden-horde',
    thinker: 'sipira',
    content: L('Элнинг нурли бўлгани,', 'Ботирнинг туғилгани...'),
    description: t(
      "Dissertatsiyada (1.1-§) Sipira jirov so'zi sifatida keltirilgan satrlar. | Dissertaciyada (1.1-§) Sipira jıraw sózi retinde keltirilgen qatarlar.",
    ),
    educationalMeaning: t(
      "Yoshlarning mard, botir bo'lib tarbiyalanishi el ichiga baxt va yorug' kun olib keladi. | Jaslardıń márt, batır bolıp tárbiyalanıwı el ishine baxıt hám jaqtı kún alıp keledi.",
    ),
    note: t(
      "Muallif izohi: insonning hayotdagi asosiy maqsadi — xalqqa xizmat qilish, yaxshilik keltirish, uning taqdiriga sherik bo'lish. | Avtor túsindirmesi: insannıń ómirdegi tiykarǵı maqseti — xalıqqa xızmet etiw, jaqsılıq alıp keliw, onıń táǵdirine sherik bolıw.",
    ),
    reference: '[42;112]; dissertatsiya 1.1-§',
    values: ['vatan', 'jasorat'],
  },
  {
    key: 'sipira-tora',
    title: t("Sipira jirov: «To'rasin buzsa biy yomon» | Sipira jıraw: «Tórasin buzsa biy jaman»"),
    type: 'TOLGOV',
    period: 'golden-horde',
    thinker: 'sipira',
    content: 'Тўрасин бузса бий ёмон…',
    description: t(
      "Dissertatsiyada (1.1-§) adolatsizlik haqida keltirilgan bir satr. | Dissertaciyada (1.1-§) ádalatsızlıq haqqında keltirilgen bir qatar.",
    ),
    educationalMeaning: t(
      "Rahbarlardagi adolatsizlik xalqqa zarar keltiradi va yoshlarning adolatni ko'rib ulg'ayishiga salbiy ta'sir qiladi. | Basshılardaǵı ádalatsızlıq xalıqqa zıyan keltiredi hám jaslardıń ádalattı kórip ósiwine unamsız tásir etedi.",
    ),
    note: t(
      "Muallif izohi: shoir adolatsizlik hukumat rahbarlarida ko'p uchrashini tanqid qilgan. | Avtor túsindirmesi: shayır ádalatsızlıq húkimet basshılarında kóp ushırasıwın synlaǵan.",
    ),
    reference: '[17;116]; dissertatsiya 1.1-§',
    values: ['adolat'],
  },
  {
    key: 'sipira-ulug',
    title: t("Sipira jirov nasihati: «ulug'dan oldin kichikning gapirishi yo'q» | Sipira jıraw násiyatı: «ulıǵdan aldın kishiniń sóylewi joq»"),
    type: 'BOSHQA',
    period: 'golden-horde',
    thinker: 'sipira',
    content: 'улуғдан олдин кичикнинг гапириши йўқ',
    description: t(
      "Dissertatsiyada (1.1-§) Sipira jirov nasihati mazmunida keltirilgan ibora; bu parcha to'lg'ovdan to'liq satr sifatida emas, muallifning bayoni ichida berilgan. | Dissertaciyada (1.1-§) Sipira jıraw násiyatı mazmunında keltirilgen ibara; bul úzindi tolǵawdan tolıq qatar retinde emes, avtordıń bayanı ishinde berilgen.",
    ),
    educationalMeaning: t(
      "Yoshlar kattalar oldida odob saqlashi, hurmat ko'rsatishi — iboli, tarbiyali yoshlarga xos fazilat. | Jaslar úlkenler aldında ádep saqlawı, húrmet kórsetiwi — ibalı, tárbiyalı jaslarǵa tán pazıylet.",
    ),
    note: t(
      "Muallif izohi: sabrsiz, kattaga hurmat ko'rsatmaslik yomon odat; donishmandning bu fikrlari hozir ham katta ahamiyatga ega. | Avtor túsindirmesi: sabırsız, úlkenge húrmet kórsetpewshilik jaman ádet; danıshpannıń bul pikirleri házir de úlken áhmiyetke iye.",
    ),
    reference: 'Dissertatsiya 1.1-§ (havola raqami ko\'rsatilmagan)',
    values: ['katta'],
  },
  {
    key: 'asan-soliq',
    title: t("Asan qayg'i: «Men aytmasam bilmaysan...» | Asan qayǵı: «Men aytpasam bilmeysen...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L(
      'Мен айтмасам билмайсан,',
      'Айтганимга кўнмасанг,',
      'Қимиз ичиб қизишиб,',
      'Қизаришиб терласанг,',
      'Ўзингдан бошқа хон йўқдай,',
      'Эзмалап нега гапирасан.',
      'Халқинг қандай чидайди,',
      'Бехосдан келган бу ишга,',
      'Ноўрин келган солиқдан,',
      'ҳазинангни тўлдирдинг,',
      'Олтин билан кумушга',
    ),
    description: t(
      "Dissertatsiyada (2.1-§) Asan qayg'ining Janibek xonga qaratilgan to'lg'ovidan parcha. | Dissertaciyada (2.1-§) Asan qayǵınıń Janibek xanǵa qaratılǵan tolǵawınan úzindi.",
    ),
    educationalMeaning: t(
      "Xalqni o'ylamasdan ortiqcha soliq undirish tanqid qilinadi; rahbar xalqning ahvolidan xabardor bo'lishi kerak. | Xalıqtı oylamastan artıqsha salıq jıynaw synlanadı; basshı xalıqtıń jaǵdayınan xabardar bolıwı kerek.",
    ),
    note: t(
      "Muallif izohi: bu satrlarda xonning xalqni o'ylamasdan haddan ziyod soliq undirgani tanqidiy bayon qilinadi. | Avtor túsindirmesi: bul qatarlarda xannıń xalıqtı oylamastan haddinen zıyat salıq jıynaǵanı synlı bayanlanadı.",
    ),
    reference: '[6;171]; dissertatsiya 2.1-§',
    values: ['adolat', 'insonparvar'],
  },
  {
    key: 'asan-qaz',
    title: t("Asan qayg'i: «Ko'lda o'tirgan qo'ng'ir g'oz...» | Asan qayǵı: «Kólde otırǵan qońır qaz...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L(
      'Кўлда ўтирган қўнғир ғоз,',
      'Қир қадрини нима билсин,',
      'Қирда юрган тувалоқ,',
      'Сув қадрини нима билсин.',
      'Қўш қўллаб ўргимчак ўрмаган,',
      'Овнинг қадрини нима билсин,',
      'Чўққиларга чиқиб кўрмаган,',
      'Тоғ қадрини нима билади',
    ),
    description: t(
      "Dissertatsiyada (2.1-§) har bir mavjudot o'zi yashayotgan joy tabiatiga moslashgani haqida keltirilgan to'lg'ov parchasi. | Dissertaciyada (2.1-§) hár bir jándik ózi jasap atırǵan jer tábiyatına beyimleskeni haqqında keltirilgen tolǵaw úzindisi.",
    ),
    educationalMeaning: t(
      "Tabiatni insonning hayotiy muhiti sifatida tushunish va uning qadriga yetish. | Tábiyattı insannıń turmıs ortası retinde túsiniw hám onıń qádirine jetiw.",
    ),
    note: t(
      "Muallif izohi: Asan qayg'i nafaqat shoir, balki geograf-sayyoh sifatida tabiat haqida tushuncha bergan. | Avtor túsindirmesi: Asan qayǵı tek shayır emes, bálki geograf-sayaxatshı retinde tábiyat haqqında túsinik bergen.",
    ),
    reference: '[6;175]; dissertatsiya 2.1-§',
    values: ['tabiat'],
  },
  {
    key: 'asan-olmos',
    title: t("Asan qayg'i: «Olmosga bermas ora bor...» | Asan qayǵı: «Almasqa bermes ara bar...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L('Олмосга бермас ора бор.', 'Хонга бермас қора бор'),
    description: t(
      "Dissertatsiyada (2.1-§) xalq ichida oqsuyak xon-biylardan ham aqlli kishilar borligini eslatuvchi satrlar. | Dissertaciyada (2.1-§) xalıq ishinde aqsúyek xan-biylerden de aqıllı adamlar barlıǵın eske túsiriwshi qatarlar.",
    ),
    educationalMeaning: t(
      "Inson qadri nasl-nasabga emas, aql va fazilatga bog'liq; tarbiyada nasl hal qiluvchi emas. | Insan qádiri nasil-nasepke emes, aqıl hám pazıyletke baylanıslı; tárbiyada nasil sheshiwshi emes.",
    ),
    note: t(
      "Muallif izohi: Asan odamlarni nasl-nasabiga qarab baholashni noto'g'ri deb hisoblagan. | Avtor túsindirmesi: Asan adamlardı nasil-nasebine qarap bahalawdı nadurıs dep esaplaǵan.",
    ),
    reference: '[17;104]; dissertatsiya 2.1-§',
    values: ['insonparvar', 'ilim'],
  },
  {
    key: 'asan-hunar',
    title: t("Asan qayg'i: «Yoshligingda hunar bilmasang...» | Asan qayǵı: «Jaslıǵıńda hunar bilmeseń...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L('Ёшлигингда ҳунар билмасанг ,', 'Улғайгач ҳунар билмайсан'),
    description: t(
      "Dissertatsiyada (1.3-§) yoshlikdan kasb-hunar o'rganish haqida keltirilgan satrlar. | Dissertaciyada (1.3-§) jaslıqtan káspi-hunar úyreniw haqqında keltirilgen qatarlar.",
    ),
    educationalMeaning: t(
      "Ta'lim-tarbiya va hunar o'rgatishni kichik yoshdan boshlash zarur. | Tálim-tárbiya hám hunar úyretiwdi kishi jastan baslaw zárúr.",
    ),
    note: t(
      "Muallif izohi: Asan yoshlarning bolalikdan kasb-hunarni o'rganishi tarafdori bo'lgan. | Avtor túsindirmesi: Asan jaslardıń balalıqtan káspi-hunardı úyreniwi tárepdarı bolǵan.",
    ),
    reference: '[54;105]; dissertatsiya 1.3-§',
    values: ['mehnat'],
  },
  {
    key: 'asan-dost',
    title: t("Asan qayg'i: do'stlik haqida | Asan qayǵı: dosliq haqqında"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L(
      'Яхшидан танлаб дўст тутинг',
      '',
      'Дўстингга ёмон гапирма.',
      'Дўстингга ёмон сўзласанг,',
      'Ўзингни ўзинг урганинг',
    ),
    description: t(
      "Dissertatsiyada (1.1-§, 1.3-§) Asan qayg'ining do'stlik haqidagi nasihati. | Dissertaciyada (1.1-§, 1.3-§) Asan qayǵınıń dosliq haqqındaǵı násiyatı.",
    ),
    educationalMeaning: t(
      "Do'st qiyinchilikni yengishda kerak; do'stni to'g'ri tanlash va uning ko'nglini og'ritmaslik lozim. | Dos qıyınshılıqtı jeńiwde kerek; dostı dóris saylaw hám onıń kewlin awırtpaw lazım.",
    ),
    note: t(
      "Muallif izohi: do'stga yomon so'zlash — o'zingni o'zing urishdir, deb ogohlantiriladi. | Avtor túsindirmesi: dosqa jaman sóylew — ózińdi ózińiz urıw, dep eskertiledi.",
    ),
    reference: '[17;105]; [6;248]; dissertatsiya 1.1-§, 1.3-§',
    values: ['dostlik'],
  },
  {
    key: 'asan-bir',
    title: t("Asan qayg'i: «Bir bo'linglar barchangiz» | Asan qayǵı: «Bir bolıńlar barlıǵıńız»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L('Улғайганингда - тиригингда,', 'Бир бўлинглар барчангиз.'),
    description: t(
      "Dissertatsiyada (1.1-§) hamjihatlik va ittifoqqa chaqiruvchi satrlar. | Dissertaciyada (1.1-§) hámjıllıq hám ittifaqqa shaqırıwshı qatarlar.",
    ),
    educationalMeaning: t(
      "Ahil, uyushgan holda yashash xalqning baxt-iqbolini oshiradi. | Awızbirshilik penen, uyısqan halda jasaw xalıqtıń baxıt-ıqbalın asırıwǵa xızmet etedi.",
    ),
    note: t(
      "Muallif izohi: birlashib, bir ittifoqda yashash insonlarni yutuqlarga boyitadi. | Avtor túsindirmesi: birlesip, bir ittifaqta jasaw insanlardı jetiskenliklerge bayıtadı.",
    ),
    reference: '[7;65]; dissertatsiya 1.1-§',
    values: ['dostlik'],
  },
  {
    key: 'asan-ilm',
    title: t("Asan qayg'i: «Ilmim yurtdan oshdi deb...» | Asan qayǵı: «Ilimim jurttan ashtı dep...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L('Илмим юртдан ошди деб', 'Маслаҳатсиз сўз бошлама'),
    description: t(
      "Dissertatsiyada (1.1-§) olimlarga xos odob va maslahatlashib ish ko'rish haqida. | Dissertaciyada (1.1-§) ilimpazlarǵa tán ádep hám másláhátlesip is kóriw haqqında.",
    ),
    educationalMeaning: t(
      "Ustoz-shogird o'zaro tushunishi, olimga xos odob va maslahatlashib ish ko'rish donolik yechimini topishga yordam beradi. | Ustaz-shákirt ózara túsiniwi, ilimpazǵa tán ádep hám másláhátlesip is kóriw danalıq sheshimin tabıwǵa járdem beredi.",
    ),
    note: t(
      "Muallif izohi: Asan maslahatlashib ish qilishni o'z hayot yo'li bilan ham isbotlagan (Ormambet bi va Janibek xonga maslahatgo'y). | Avtor túsindirmesi: Asan másláhátlesip is islewdi óz ómir jolı menen de dálillegen (Ormambet bi hám Janibek xanǵa másláhátgóy).",
    ),
    reference: '[7;63]; dissertatsiya 1.1-§',
    values: ['ustoz', 'ilim'],
  },
  {
    key: 'asan-qisganda',
    title: t("Asan qayg'i: «Xon bilan biylar qisganda...» | Asan qayǵı: «Xan menen biyler qısqanda...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L(
      'Хон билан бийлар қисганда,',
      'Халқ қандай кун кўрар.',
      'Унда халқ қораяди,',
      'Халқнинг қасоси кучига кирар.',
    ),
    description: t(
      "Dissertatsiyada (1.3-§) xon-biylarning zulmi oqibati haqida. | Dissertaciyada (1.3-§) xan-biylerdiń zulımı aqıbeti haqqında.",
    ),
    educationalMeaning: t(
      "Adolatsizlik va ijtimoiy tengsizlik xalq noroziligini kuchaytiradi; rahbar adolatli bo'lishi kerak. | Ádalatsızlıq hám sociallıq teńsizlik xalıq narazılıǵın kúsheytedi; basshı ádalatlı bolıwı kerek.",
    ),
    note: t(
      "Muallif izohi: Asan tengsizlikka chidamagan xalq zulmga norozilik bildirishi mumkinligini isbotlaydi. | Avtor túsindirmesi: Asan teńsizlikke shıdamaǵan xalıq zulımǵa narazılıq bildiriwi múmkinligin dálillegen.",
    ),
    reference: '[29;105]; dissertatsiya 1.3-§',
    values: ['adolat'],
  },
  {
    key: 'asan-el',
    title: t("Asan qayg'i: «El bor yerda uning bor...» | Asan qayǵı: «El bar jerde onıń bar...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L('Эл бор ерда унинг бор,', 'Эл бор ерда кунинг бор:', 'Халқинг бўлса шуҳратинг бор'),
    description: t(
      "Dissertatsiyada (1.3-§) xon va amaldorlarning xalqdan o'zini ajratmasligi haqida. | Dissertaciyada (1.3-§) xan hám ámeldarlardıń xalıqtan ózin ajıratpawı haqqında.",
    ),
    educationalMeaning: t(
      "Rahbar xalq bilan bir niyatda bo'lsa, xalqning ulug' kuchiga suyansa, ezgu ishlarga erishadi. | Basshı xalıq penen bir niyette bolsa, xalıqtıń uluǵ kúshine súyense, ezgi islerge erisedi.",
    ),
    note: t(
      "Muallif izohi: shoir xonlarga xalqdan o'zlarini ajratmaslik, xalqqa g'amxo'r bo'lish va taqdiriga sherik bo'lishni taklif etgan. | Avtor túsindirmesi: shayır xanlarǵa xalıqtan ózlerin ajıratpawdı, xalıqqa ǵamxor bolıwdı hám táǵdirine sherik bolıwdı usınıs etken.",
    ),
    reference: '[29;105]; dissertatsiya 1.3-§',
    values: ['vatan'],
  },
  {
    key: 'asan-gazab',
    title: t("Asan qayg'i: «G'azab dushman...» | Asan qayǵı: «Gázep dushpan...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L('Ғазаб душман, ортидан,', 'Тушиб кетсанг нима қиласан,', 'Туби чуқур бўшлиққа.'),
    description: t(
      "Dissertatsiyada (1.3-§) g'azabning oqibati haqida keltirilgan satrlar. | Dissertaciyada (1.3-§) gázeptiń aqıbeti haqqında keltirilgen qatarlar.",
    ),
    educationalMeaning: t(
      "G'azabli his-tuyg'uga berilganda aql o'z xizmatini to'g'ri bajara olmaydi; o'zini tiyish va xatosini tan olganni kechirish ijobiy xulq belgisi. | Gázepli sezimge berilgende aqıl óz xızmetin dúrıs atqara almaydı; ózin tıyıw hám qátesin moyınlaǵandı keshiriw unamlı minez belgisi.",
    ),
    note: t(
      "Muallif izohi: g'azab aql bilan do'st emas, uning oqibati noto'g'ri qarorga olib kelishi mumkin. | Avtor túsindirmesi: gázep aqıl menen dos emes, onıń aqıbeti nadurıs sheshimge alıp kelıwi múmkin.",
    ),
    reference: '[7;62]; dissertatsiya 1.3-§',
    values: ['sabr'],
  },
  {
    key: 'asan-soz',
    title: t("Asan qayg'i: «Toza nuqsonsiz asil so'z...» | Asan qayǵı: «Taza kemsiz asıl sóz...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L('Тоза нуқсонсиз асил сўз,', 'Ўй тубида ётади'),
    description: t(
      "Dissertatsiyada (1.1-§) aqliylik va teran fikrlash haqida. | Dissertaciyada (1.1-§) aqıllılıq hám tereń pikirlew haqqında.",
    ),
    educationalMeaning: t(
      "Benuqson fikrlar teran o'ylash orqali hosil bo'ladi; yoshlarning o'ylash va qiyoslash qobiliyatini o'stirish zarur. | Kemsiz pikirler tereń oylaw arqalı payda boladı; jaslardıń oylaw hám salıstırıw qábiletin ósiriw zárúr.",
    ),
    note: t(
      "Muallif izohi: aqlning ijodiy kuchi bilan bog'liq fikr. | Avtor túsindirmesi: aqıldıń dóretiwshilik kúshi menen baylanıslı pikir.",
    ),
    reference: '[7;59]; dissertatsiya 1.1-§',
    values: ['ilim'],
  },
  {
    key: 'asan-xavotir',
    title: t("Asan qayg'i: «Xavotir so'z oz bo'lmas...» | Asan qayǵı: «Xawotır sóz az bolmas...»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: L('Хавотир сўз оз бўлмас,', 'Кўнглингни бузма'),
    description: t(
      "Dissertatsiyada (1.3-§) yolg'on va g'iybatga ishonmaslik haqida. | Dissertaciyada (1.3-§) jalǵan hám gıybatqa isenbew haqqında.",
    ),
    educationalMeaning: t(
      "Voqeani o'z ko'zing bilan ko'rmasang rost deb ishonma; yolg'on va rostni solishtirib xulosa qilish muhim. | Waqıyanı óz kózińiz benen kórmeseń shın dep isenbe; jalǵan menen shındı salıstırıp juwmaq shıǵarıw áhmiyetli.",
    ),
    note: t(
      "Muallif izohi: Asan yoshlarga yolg'on-g'iybat so'zlarga tanqidiy ko'z bilan qarashni nasihat qilgan. | Avtor túsindirmesi: Asan jaslarǵa jalǵan-gıybat sózlerge synlı kóz benen qarawdı násiyat etken.",
    ),
    reference: '[40;128]; dissertatsiya 1.3-§',
    values: ['rost'],
  },
  {
    key: 'asan-ogayin',
    title: t("Asan qayg'i: «Og'ayin bo'lsang totuv bo'l» | Asan qayǵı: «Aǵayin bolsań tınısh bol»"),
    type: 'TOLGOV',
    period: 'nogai',
    thinker: 'asan',
    content: 'Оғайин бўлсанг тотув бўл',
    description: t(
      "Dissertatsiyada (1.3-§) Asan nasihati sifatida keltirilgan satr. | Dissertaciyada (1.3-§) Asan násiyatı retinde keltirilgen qatar.",
    ),
    educationalMeaning: t(
      "Yoshlarni totuvlik va birlashgan ittifoqdan ajralib ketmaslikka o'rgatish. | Jaslardı tınıshlıq hám birlesken ittifaqtan ajıralıp ketpewge úyretiw.",
    ),
    note: t(
      "Muallif izohi: ushbu nasihat yoshlarni shu an'anaga ko'ra tarbiyalashni nazarda tutadi. | Avtor túsindirmesi: usı násiyat jaslardı usı dástúrge say tárbiyalawdı názerde tutadı.",
    ),
    reference: '[17;106]; dissertatsiya 1.3-§',
    values: ['dostlik'],
  },
];
